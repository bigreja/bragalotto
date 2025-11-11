<?php

namespace HuseyinFiliz\Pickem\Observer;

use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Listener\UpdateUserScoresListener;
use HuseyinFiliz\Pickem\Listener\SendResultNotificationsListener;

class EventObserver
{
    protected $updateScoresListener;
    protected $notificationsListener;

    public function __construct(
        UpdateUserScoresListener $updateScoresListener,
        SendResultNotificationsListener $notificationsListener
    ) {
        $this->updateScoresListener = $updateScoresListener;
        $this->notificationsListener = $notificationsListener;
    }

    /**
     * Handle the Event "saved" event.
     */
    public function saved(Event $event)
    {
        // Only process when result-related fields change
        if ($event->wasChanged(['home_score', 'away_score', 'result']) && $event->result !== null) {
            // Update user scores
            $this->updateScoresListener->whenEventSaved($event);
            
            // Send notifications
            $this->notificationsListener->whenEventSaved($event);
        }
    }
}