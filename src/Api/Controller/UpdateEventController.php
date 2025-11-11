<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\EventSerializer;
use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Pick;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Carbon\Carbon;

class UpdateEventController extends AbstractShowController
{
    public $serializer = EventSerializer::class;

    public $include = ['homeTeam', 'awayTeam', 'week'];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $id = Arr::get($request->getQueryParams(), 'id');
        $event = Event::findOrFail($id);

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        // Update basic fields
        if (Arr::has($data, 'weekId')) {
            $event->week_id = Arr::get($data, 'weekId');
        }

        if (Arr::has($data, 'homeTeamId')) {
            $event->home_team_id = Arr::get($data, 'homeTeamId');
        }

        if (Arr::has($data, 'awayTeamId')) {
            $event->away_team_id = Arr::get($data, 'awayTeamId');
        }

        if (Arr::has($data, 'matchDate')) {
            $event->match_date = Carbon::parse(Arr::get($data, 'matchDate'));
        }

        if (Arr::has($data, 'cutoffDate')) {
            $event->cutoff_date = Carbon::parse(Arr::get($data, 'cutoffDate'));
        }

        if (Arr::has($data, 'allowDraw')) {
            $event->allow_draw = Arr::get($data, 'allowDraw');
        }

        if (Arr::has($data, 'status')) {
            $event->status = Arr::get($data, 'status');
        }

        // Handle score updates and result calculation
        if (Arr::has($data, 'homeScore') && Arr::has($data, 'awayScore')) {
            $event->home_score = Arr::get($data, 'homeScore');
            $event->away_score = Arr::get($data, 'awayScore');

            // Calculate result
            $event->result = $event->calculateResult();

            // Update pick correctness
            $this->updatePickCorrectness($event);

            // Mark event as finished
            if ($event->status !== 'finished') {
                $event->status = 'finished';
            }
        }

        $event->save();

        return $event;
    }

    /**
     * Update correctness of all picks for this event
     */
    protected function updatePickCorrectness(Event $event)
    {
        if ($event->result === null) {
            return;
        }

        $picks = Pick::where('event_id', $event->id)->get();

        foreach ($picks as $pick) {
            $pick->is_correct = ($pick->selected_outcome === $event->result);
            $pick->save();
        }
    }
}
