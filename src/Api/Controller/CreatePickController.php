<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\PickSerializer;
use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Pick;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreatePickController extends AbstractCreateController
{
    public $serializer = PickSerializer::class;

    public $include = ['event', 'user'];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertRegistered();
        $actor->assertCan('pickem.makePicks');

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);
        $eventId = Arr::get($data, 'eventId');
        $selectedOutcome = Arr::get($data, 'selectedOutcome');

        // Load the event
        $event = Event::findOrFail($eventId);

        // Validate: check if picks are still allowed
        if (!$event->canPick()) {
            throw new ValidationException([
                'message' => 'Picks are no longer allowed for this event. The cutoff time has passed or the event is not in scheduled status.'
            ]);
        }

        // Validate: check if draw is allowed
        if ($selectedOutcome === 'draw' && !$event->allow_draw) {
            throw new ValidationException([
                'message' => 'Draw picks are not allowed for this event.'
            ]);
        }

        // Validate: check valid outcome
        if (!in_array($selectedOutcome, ['home', 'away', 'draw'])) {
            throw new ValidationException([
                'message' => 'Invalid outcome. Must be "home", "away", or "draw".'
            ]);
        }

        // Check for existing pick
        $existingPick = Pick::where('user_id', $actor->id)
            ->where('event_id', $eventId)
            ->first();

        if ($existingPick) {
            // Update existing pick
            $existingPick->selected_outcome = $selectedOutcome;
            $existingPick->save();
            return $existingPick;
        }

        // Create new pick
        $pick = Pick::create([
            'user_id' => $actor->id,
            'event_id' => $eventId,
            'selected_outcome' => $selectedOutcome,
        ]);

        return $pick;
    }
}
