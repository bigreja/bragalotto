<?php

namespace HuseyinFiliz\Pickem\Listener;

use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Pick;

class CalculateEventResultListener
{
    public function handle(Event $event)
    {
        // Only process if scores are set
        if ($event->home_score === null || $event->away_score === null) {
            return;
        }

        // Result is auto-calculated in model's boot method
        // Update pick correctness
        $this->updatePickCorrectness($event);
    }

    protected function updatePickCorrectness(Event $event): void
    {
        if ($event->result === null) {
            return;
        }

        Pick::where('event_id', $event->id)->get()->each(function (Pick $pick) use ($event) {
            $pick->is_correct = ($pick->selected_outcome === $event->result);
            $pick->saveQuietly(); // Don't trigger events
        });
    }
}