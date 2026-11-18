<?php

namespace Bigreja\Bragalotto\Command;

use Bigreja\Bragalotto\Event;
use Bigreja\Bragalotto\Notification\WeekStartingBlueprint;
use Bigreja\Bragalotto\Week;
use Carbon\Carbon;
use Flarum\Notification\Event\Sent;
use Flarum\Notification\Notification;
use Flarum\Notification\NotificationSyncer;
use Flarum\User\User;
use Illuminate\Console\Command;
use Illuminate\Contracts\Events\Dispatcher;

class SendWeekRemindersCommand extends Command
{
    protected $signature = 'bragalotto:send-week-reminders';

    protected $description = 'Notify all users of Bragalotto weeks starting in the next 24 hours.';

    public function __construct(private Dispatcher $events)
    {
        parent::__construct();
    }

    public function handle(): int
    {
        $now = Carbon::now();
        $lastUserId = (int) User::max('id');

        Week::whereNull('reminder_sent_at')
            ->whereHas('events', function ($query) use ($now) {
                $query->where('status', Event::STATUS_SCHEDULED)
                    ->where('match_date', '>', $now)
                    ->where('match_date', '<=', $now->copy()->addDay())
                    ->where('cutoff_date', '>', $now);
            })
            ->whereDoesntHave('events', fn ($query) => $query->where('match_date', '<=', $now))
            ->chunkById(100, function ($weeks) use ($lastUserId) {
                foreach ($weeks as $week) {
                    $this->sendReminder($week->id, $lastUserId);
                }
            });

        $this->info('Upcoming Bragalotto week reminders processed.');

        return 0;
    }

    private function sendReminder(int $weekId, int $lastUserId): void
    {
        $connection = (new Week())->getConnection();

        do {
            [$hasMore, $sentTo, $batchUsers, $sentWeek] = $connection->transaction(function () use ($weekId, $lastUserId) {
                $week = Week::whereKey($weekId)->lockForUpdate()->first();

                if (!$week || $week->reminder_sent_at !== null) {
                    return [false, [], [], null];
                }

                $now = Carbon::now();
                $firstMatch = $week->events()->min('match_date');

                if (!$firstMatch || Carbon::parse($firstMatch)->lessThanOrEqualTo($now)
                    || Carbon::parse($firstMatch)->greaterThan($now->copy()->addDay())
                    || !$week->events()->where('status', Event::STATUS_SCHEDULED)
                        ->where('cutoff_date', '>', $now)->exists()) {
                    return [false, [], [], null];
                }

                $users = User::where('id', '>', $week->reminder_last_user_id)
                    ->where('id', '<=', $lastUserId)
                    ->orderBy('id')
                    ->limit(200)
                    ->get();

                if ($users->isEmpty()) {
                    $week->reminder_sent_at = $now;
                    $week->save();

                    return [false, [], [], null];
                }

                $recipients = $users->filter(fn (User $user) => $user->shouldAlert(WeekStartingBlueprint::getType()))->values()->all();

                if ($recipients !== []) {
                    Notification::notify($recipients, new WeekStartingBlueprint($week));
                }

                $week->reminder_last_user_id = $users->last()->id;
                $week->save();

                return [true, $recipients, $users->all(), $week];
            });

            // Dispatched after commit so listeners and queued drivers can find the inserted rows.
            if ($sentWeek) {
                $blueprint = new WeekStartingBlueprint($sentWeek);

                if ($sentTo !== []) {
                    $this->events->dispatch(new Sent($blueprint, $sentTo));
                }

                // Email/push drivers apply each user's own preferences; alerts were inserted above.
                foreach (NotificationSyncer::getNotificationDrivers() as $name => $driver) {
                    if ($name !== 'alert') {
                        $driver->send($blueprint, $batchUsers);
                    }
                }
            }
        } while ($hasMore);
    }
}