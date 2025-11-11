<?php

namespace HuseyinFiliz\Pickem\Listener;

use Flarum\Notification\NotificationSyncer;
use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Notification\EventResultBlueprint;
use HuseyinFiliz\Pickem\Pick;
use Illuminate\Database\Eloquent\Events\Saved;

/**
 * Listener to send notifications when event results are posted
 */
class SendResultNotificationsListener
{
    protected $notifications;

    public function __construct(NotificationSyncer $notifications)
    {
        $this->notifications = $notifications;
    }

    /**
     * Handle the Eloquent saved event
     */
    public function __invoke(Saved $event)
    {
        // Only process Event models
        if (!($event->model instanceof Event)) {
            return;
        }

        $this->whenEventSaved($event->model);
    }

    public function whenEventSaved(Event $event)
    {
        // Only send notifications when result is set and status is finished
        if ($event->result === null || $event->status !== 'finished') {
            return;
        }

        // Check if result or status just changed
        $changes = $event->getChanges();
        if (!isset($changes['result']) && !isset($changes['status'])) {
            return;
        }

        // Get all users who made picks for this event
        $picks = Pick::where('event_id', $event->id)
            ->with('user')
            ->get();

        $users = $picks->pluck('user')->filter();

        // Send notification to all users who picked
        if ($users->isNotEmpty()) {
            $this->notifications->sync(
                new EventResultBlueprint($event),
                $users->all()
            );
        }
    }
}
