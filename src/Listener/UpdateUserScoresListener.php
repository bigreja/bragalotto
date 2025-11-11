<?php

namespace HuseyinFiliz\Pickem\Listener;

use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Pick;
use HuseyinFiliz\Pickem\UserScore;
use Illuminate\Database\Eloquent\Events\Saved;

/**
 * Listener to update user scores when an event is updated with results
 */
class UpdateUserScoresListener
{
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
        // Only process if the event has a result
        if ($event->result === null) {
            return;
        }

        // Get all picks for this event
        $picks = Pick::where('event_id', $event->id)->get();

        foreach ($picks as $pick) {
            $this->updateUserScore($pick, $event);
        }
    }

    protected function updateUserScore(Pick $pick, Event $event)
    {
        // Determine the season (from event's week)
        $seasonId = $event->week ? $event->week->season_id : null;

        // Find or create user score record
        $userScore = UserScore::firstOrNew([
            'user_id' => $pick->user_id,
            'season_id' => $seasonId,
        ]);

        // If this is a new record, initialize it
        if (!$userScore->exists) {
            $userScore->total_points = 0;
            $userScore->total_picks = 0;
            $userScore->correct_picks = 0;
        }

        // Recalculate scores for this user and season
        $this->recalculateUserScore($userScore, $seasonId);

        $userScore->save();
    }

    protected function recalculateUserScore(UserScore $userScore, $seasonId)
    {
        $query = Pick::where('user_id', $userScore->user_id)
            ->whereNotNull('is_correct');

        // Filter by season if we have one
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

        $userScore->total_picks = $picks->count();
        $userScore->correct_picks = $picks->where('is_correct', true)->count();
        $userScore->total_points = $userScore->correct_picks; // 1 point per correct pick
    }
}
