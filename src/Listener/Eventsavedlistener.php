<?php

namespace HuseyinFiliz\Pickem\Listener;

use HuseyinFiliz\Pickem\Event;
use Illuminate\Database\Eloquent\Events\Saved;

/**
 * Listener for Event saved event
 * Handles automatic pick correctness updates when event result is set
 */
class EventSavedListener
{
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
     * Process when an Event is saved
     *
     * @param Event $event
     */
    protected function whenEventSaved(Event $event): void
    {
        // Only process if result was changed
        if (!$event->wasChanged('result')) {
            return;
        }

        // Only process if result is set
        if ($event->result === null) {
            return;
        }

        // Pick correctness is already updated by Event model's boot method
        // This listener can be used for additional actions like notifications
        
        // Trigger notification if needed
        if ($event->isFinished()) {
            $this->sendResultNotifications($event);
        }
    }

    /**
     * Send notifications to users who made picks
     *
     * @param Event $event
     */
    protected function sendResultNotifications(Event $event): void
    {
        // Check if notifications are enabled
        $notificationsEnabled = (bool) app('flarum.settings')->get(
            'huseyinfiliz-pickem.enable_notifications', 
            true
        );

        if (!$notificationsEnabled) {
            return;
        }

        // Get all users who made picks for this event
        $picks = $event->picks()->with('user')->get();

        foreach ($picks as $pick) {
            if ($pick->user) {
                // Send notification (handled by Flarum's notification system)
                app('events')->dispatch(
                    new \HuseyinFiliz\Pickem\Event\EventResultAnnounced($event, $pick)
                );
            }
        }
    }
}