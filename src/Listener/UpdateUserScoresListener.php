<?php

namespace HuseyinFiliz\Pickem\Listener;

use Flarum\Settings\SettingsRepositoryInterface;
use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Pick;
use HuseyinFiliz\Pickem\UserScore;
use Illuminate\Database\Eloquent\Events\Saved;

/**
 * Listener to update user scores when an event result is set
 */
class UpdateUserScoresListener
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    /**
     * Handle the Eloquent saved event
     *
     * @param Saved $event
     */
    public function handle(Saved $event)
    {
        // Only process Event models
        if (!($event->model instanceof Event)) {
            return;
        }

        $this->whenEventSaved($event->model);
    }

    /**
     * Process when an Event is saved with a result
     *
     * @param Event $event
     */
    protected function whenEventSaved(Event $event): void
    {
        // Only process if result is set and event is finished
        if ($event->result === null || !$event->isFinished()) {
            return;
        }

        // Only process if result was just changed
        if (!$event->wasChanged(['result', 'status'])) {
            return;
        }

        $this->updateScoresForEvent($event);
    }

    /**
     * Update scores for all users who made picks for this event
     *
     * @param Event $event
     */
    protected function updateScoresForEvent(Event $event): void
    {
        $picks = Pick::where('event_id', $event->id)
            ->with('user')
            ->get();

        $seasonId = $event->week ? $event->week->season_id : null;

        foreach ($picks as $pick) {
            if ($pick->user) {
                $this->updateUserScore($pick->user_id, $seasonId);
            }
        }
    }

    /**
     * Recalculate and update user's score
     *
     * @param int $userId
     * @param int|null $seasonId
     */
    protected function updateUserScore(int $userId, ?int $seasonId): void
    {
        $userScore = UserScore::firstOrNew([
            'user_id' => $userId,
            'season_id' => $seasonId,
        ]);

        $query = Pick::where('user_id', $userId)
            ->whereNotNull('is_correct');

        // Filter by season
        if ($seasonId) {
            $query->whereHas('event.week', function ($q) use ($seasonId) {
                $q->where('season_id', $seasonId);
            });
        } else {
            // Only count picks for events without a season
            $query->whereHas('event', function ($q) {
                $q->whereDoesntHave('week');
            })->orWhereHas('event.week', function ($q) {
                $q->whereNull('season_id');
            });
        }

        $picks = $query->get();
        
        // Get points per correct pick from settings
        $pointsPerCorrect = (int) $this->settings->get(
            'huseyinfiliz-pickem.points_per_correct', 
            1
        );

        $userScore->total_picks = $picks->count();
        $userScore->correct_picks = $picks->where('is_correct', true)->count();
        $userScore->total_points = $userScore->correct_picks * $pointsPerCorrect;

        // Calculate accuracy percentage
        if ($userScore->total_picks > 0) {
            $userScore->accuracy = round(($userScore->correct_picks / $userScore->total_picks) * 100, 2);
        } else {
            $userScore->accuracy = 0;
        }

        $userScore->save();
    }

    /**
     * Recalculate all user scores (useful for data fixes)
     *
     * @param int|null $seasonId
     */
    public function recalculateAllScores(?int $seasonId = null): void
    {
        $query = UserScore::query();

        if ($seasonId !== null) {
            $query->where('season_id', $seasonId);
        }

        $userScores = $query->get();

        foreach ($userScores as $userScore) {
            $this->updateUserScore($userScore->user_id, $userScore->season_id);
        }
    }
}