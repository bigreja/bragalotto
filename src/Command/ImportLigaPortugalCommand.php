<?php

namespace Bigreja\Bragalotto\Command;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Support\Str;
use Bigreja\Bragalotto\Service\LigaPortugalApiService;
use Bigreja\Bragalotto\Season;
use Bigreja\Bragalotto\Team;
use Bigreja\Bragalotto\Week;
use Bigreja\Bragalotto\Event;
use Bigreja\Bragalotto\Job\ProcessEventResultsJob;

class ImportLigaPortugalCommand extends Command
{
    protected $signature = 'bragalotto:import
        {--season=            : Liga Portugal season ID (e.g. 20262027). Defaults to current.}
        {--competition=ligaportugalbetclic : Competition slug.}
        {--round=             : Import only this specific round number.}
        {--results-only       : Only update scores/status for events already in DB (no structure changes).}';

    protected $description = 'Import seasons, teams, rounds and matches from the Liga Portugal API.';

    private LigaPortugalApiService $api;
    private Dispatcher $bus;

    public function __construct(LigaPortugalApiService $api, Dispatcher $bus)
    {
        parent::__construct();
        $this->api = $api;
        $this->bus = $bus;
    }

    public function handle(): int
    {
        $competition  = (string) $this->option('competition');
        $roundFilter  = $this->option('round') !== null ? (int) $this->option('round') : null;
        $resultsOnly  = (bool) $this->option('results-only');

        // ── 1. Resolve season ──────────────────────────────────────────────
        $seasonExternalId = $this->resolveSeasonId();
        if (!$seasonExternalId) {
            $this->error('Could not resolve a season. Use --season=YYYYYYY (e.g. 20262027).');
            return 1;
        }

        $this->info("► Season: {$seasonExternalId}  Competition: {$competition}");

        // ── 2. Upsert local Season record ──────────────────────────────────
        $season = $this->upsertSeason($seasonExternalId);

        // ── 3. Teams ───────────────────────────────────────────────────────
        if (!$resultsOnly) {
            $this->importTeams($competition, $seasonExternalId);
            $this->importRounds($competition, $seasonExternalId, $season);
        }

        // ── 4. Matches ─────────────────────────────────────────────────────
        $this->importMatches($competition, $seasonExternalId, $season, $roundFilter, $resultsOnly);

        $this->info('✓ Import complete.');
        return 0;
    }

    // ─────────────────────────────────────────────────────────────────────────

    private function resolveSeasonId(): ?int
    {
        if ($this->option('season') !== null) {
            return (int) $this->option('season');
        }

        $this->line('  Fetching current season from API…');

        try {
            $seasons = $this->api->getSeasons();
        } catch (\Exception $e) {
            $this->error('  Seasons API failed: ' . $e->getMessage());
            return null;
        }

        // Prefer the season flagged as current
        foreach ($seasons as $s) {
            if (!empty($s['current'])) {
                return (int) $s['id'];
            }
        }

        // Fallback: first item
        return !empty($seasons[0]['id']) ? (int) $seasons[0]['id'] : null;
    }

    private function upsertSeason(int $externalId): Season
    {
        // Re-use seasons list already fetched to get the label
        try {
            $seasons = $this->api->getSeasons();
        } catch (\Exception $e) {
            $seasons = [];
        }

        $label = (string) $externalId;
        foreach ($seasons as $s) {
            if ((int) $s['id'] === $externalId) {
                $label = $s['label'] ?? $label;
                break;
            }
        }

        $season = Season::updateOrCreate(
            ['external_id' => (string) $externalId],
            [
                'name' => $label,
                'slug' => Str::slug($label),
            ]
        );

        $this->line("  Season: {$season->name} (local id={$season->id})");
        return $season;
    }

    private function importTeams(string $competition, int $seasonId): void
    {
        $this->line('  Importing teams…');

        try {
            $teams = $this->api->getTeams($competition, $seasonId);
        } catch (\Exception $e) {
            $this->warn('  Teams API failed: ' . $e->getMessage());
            return;
        }

        $count = 0;
        foreach ($teams as $t) {
            if (empty($t['id'])) {
                continue;
            }

            $name = $t['name'] ?? ('Team ' . $t['id']);
            // Try common logo field names returned by the API
            $logo = $t['logoUrl'] ?? $t['logo'] ?? $t['crest'] ?? $t['image'] ?? null;

            Team::updateOrCreate(
                ['external_id' => (string) $t['id']],
                [
                    'name'      => $name,
                    'slug'      => Str::slug($name),
                    'logo_path' => $logo,
                ]
            );
            $count++;
        }

        $this->line("  Teams upserted: {$count}");
    }

    private function importRounds(string $competition, int $seasonId, Season $season): void
    {
        $this->line('  Importing rounds…');

        try {
            $rounds = $this->api->getRounds($competition, $seasonId);
        } catch (\Exception $e) {
            $this->warn('  Rounds API failed: ' . $e->getMessage());
            return;
        }

        $count = 0;
        foreach ($rounds as $r) {
            if (empty($r['id'])) {
                continue;
            }

            $name = $r['label'] ?? ('Jornada ' . $r['id']);

            Week::updateOrCreate(
                ['external_id' => (string) $r['id'], 'season_id' => $season->id],
                [
                    'name'        => $name,
                    'week_number' => (int) $r['id'],
                    'season_id'   => $season->id,
                ]
            );
            $count++;
        }

        $this->line("  Rounds upserted: {$count}");
    }

    private function importMatches(
        string  $competition,
        int     $seasonId,
        Season  $season,
        ?int    $roundFilter,
        bool    $resultsOnly
    ): void {
        // Determine which rounds to process
        if ($roundFilter !== null) {
            $roundIds = [$roundFilter];
        } else {
            try {
                $rounds   = $this->api->getRounds($competition, $seasonId);
                $roundIds = array_values(array_filter(array_column($rounds, 'id')));
            } catch (\Exception $e) {
                $this->warn('  Could not fetch rounds for match import: ' . $e->getMessage());
                return;
            }
        }

        // Build lookup maps: external_id → local id
        $teamMap = Team::whereNotNull('external_id')
            ->pluck('id', 'external_id')
            ->all();

        $weekMap = Week::where('season_id', $season->id)
            ->whereNotNull('external_id')
            ->pluck('id', 'external_id')
            ->all();

        $matchCount  = 0;
        $resultCount = 0;
        $skipCount   = 0;

        foreach ($roundIds as $roundId) {
            $roundId = (int) $roundId;
            $this->line("  Round {$roundId}…");

            try {
                $matches = $this->api->getMatches($competition, $seasonId, $roundId);
            } catch (\Exception $e) {
                $this->warn("  Matches API failed for round {$roundId}: " . $e->getMessage());
                continue;
            }

            foreach ($matches as $m) {
                if (empty($m['id'])) {
                    continue;
                }

                $externalId    = (string) $m['id'];
                $homeExtId     = (string) ($m['homeTeam']['id'] ?? '');
                $awayExtId     = (string) ($m['awayTeam']['id'] ?? '');
                $homeTeamId    = $teamMap[$homeExtId] ?? null;
                $awayTeamId    = $teamMap[$awayExtId] ?? null;
                $weekId        = $weekMap[(string) $roundId] ?? null;

                if (!$homeTeamId || !$awayTeamId) {
                    $this->warn("  Match {$externalId}: teams not found (home={$homeExtId}, away={$awayExtId}). Run without --results-only first.");
                    $skipCount++;
                    continue;
                }

                // ── Upsert or find event ────────────────────────────────
                if ($resultsOnly) {
                    $event = Event::where('external_id', $externalId)->first();
                    if (!$event) {
                        $skipCount++;
                        continue;
                    }
                } else {
                    $matchDate = !empty($m['date']) ? Carbon::parse($m['date']) : Carbon::now();

                    $event = Event::updateOrCreate(
                        ['external_id' => $externalId],
                        [
                            'week_id'      => $weekId,
                            'home_team_id' => $homeTeamId,
                            'away_team_id' => $awayTeamId,
                            'match_date'   => $matchDate,
                            'cutoff_date'  => $matchDate,
                            'allow_draw'   => true,
                            'status'       => Event::STATUS_SCHEDULED,
                        ]
                    );
                    $matchCount++;
                }

                // ── Resolve status and goals ────────────────────────────
                $homeGoals = $m['homeTeamGoals'] ?? null;
                $awayGoals = $m['awayTeamGoals'] ?? null;
                $status    = $m['status'] ?? null;

                // If status is missing from the match list, fetch details
                if ($status === null || $status === 'FINISHED') {
                    try {
                        $details   = $this->api->getMatchDetails($competition, $seasonId, $roundId, (int) $m['id']);
                        $status    = $details['status'] ?? $status;
                        $homeGoals = $details['homeTeamGoals'] ?? $homeGoals;
                        $awayGoals = $details['awayTeamGoals'] ?? $awayGoals;
                    } catch (\Exception $e) {
                        // Non-fatal; proceed with what we have
                    }
                }

                // ── Apply result if finished ────────────────────────────
                if ($status === 'FINISHED' && $homeGoals !== null && $awayGoals !== null) {
                    if ($this->applyResult($event, (int) $homeGoals, (int) $awayGoals)) {
                        $resultCount++;
                    }
                }
            }
        }

        $this->line("  Matches upserted: {$matchCount}");
        if ($resultCount > 0) {
            $this->line("  Results applied:  {$resultCount}");
        }
        if ($skipCount > 0) {
            $this->warn("  Skipped:          {$skipCount}");
        }
    }

    /**
     * Apply a finished result to an event and trigger scoring.
     * Returns true if the event was actually changed.
     */
    private function applyResult(Event $event, int $homeGoals, int $awayGoals): bool
    {
        // Skip if nothing changed
        if (
            $event->status === Event::STATUS_FINISHED &&
            (int) $event->home_score === $homeGoals &&
            (int) $event->away_score === $awayGoals
        ) {
            return false;
        }

        // The Event model's saving observer auto-calculates result and
        // sets status=finished when scores are set. We force STATUS_FINISHED
        // here to also cover events that were STATUS_CLOSED (past cutoff).
        $event->home_score = $homeGoals;
        $event->away_score = $awayGoals;
        $event->status     = Event::STATUS_FINISHED;
        $event->save();

        // Fire the same scoring job used by the admin UI
        $this->bus->dispatch(new ProcessEventResultsJob($event->id));

        return true;
    }
}
