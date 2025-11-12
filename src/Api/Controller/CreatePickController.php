<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\PickSerializer;
use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Pick;
use HuseyinFiliz\Pickem\Validator\PickValidator;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreatePickController extends AbstractCreateController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = PickSerializer::class;

    /**
     * {@inheritdoc}
     */
    public $include = ['event', 'event.homeTeam', 'event.awayTeam', 'user'];

    /**
     * @var PickValidator
     */
    protected $validator;

    /**
     * @param PickValidator $validator
     */
    public function __construct(PickValidator $validator)
    {
        $this->validator = $validator;
    }

    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        // Get authenticated user
        $actor = RequestUtil::getActor($request);
        $actor->assertRegistered();
        $actor->assertCan('pickem.makePicks');

        // Get request data
        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);
        
        // Validate input
        $this->validator->assertValid($data);

        $eventId = Arr::get($data, 'eventId');
        $selectedOutcome = Arr::get($data, 'selectedOutcome');

        // Load the event with teams
        $event = Event::with(['homeTeam', 'awayTeam', 'week'])->findOrFail($eventId);

        // Business logic validation
        $this->validatePickRules($event, $selectedOutcome, $actor->id);

        // Find existing pick or create new one
        $pick = Pick::firstOrNew([
            'user_id' => $actor->id,
            'event_id' => $eventId,
        ]);

        // Check if this is an update
        $isUpdate = $pick->exists;

        // Update or set the selected outcome
        $pick->selected_outcome = $selectedOutcome;

        // Clear correctness if changing pick (will be recalculated if event has result)
        if ($isUpdate && $pick->isDirty('selected_outcome')) {
            $pick->is_correct = null;
        }

        // Save the pick
        $pick->save();

        // Load relationships for response
        $pick->load(['event.homeTeam', 'event.awayTeam', 'event.week', 'user']);

        return $pick;
    }

    /**
     * Validate business rules for making a pick
     *
     * @param Event $event
     * @param string $selectedOutcome
     * @param int $userId
     * @throws ValidationException
     */
    protected function validatePickRules(Event $event, string $selectedOutcome, int $userId): void
    {
        // Check if picks are still allowed
        if (!$event->canPick()) {
            throw new ValidationException([
                'message' => app('translator')->trans(
                    'huseyinfiliz-pickem.api.errors.pick_closed',
                    ['cutoff' => $event->cutoff_date->diffForHumans()]
                )
            ]);
        }

        // Check if draw is allowed
        if ($selectedOutcome === Event::RESULT_DRAW && !$event->allow_draw) {
            throw new ValidationException([
                'message' => app('translator')->trans('huseyinfiliz-pickem.api.errors.draw_not_allowed')
            ]);
        }

        // Validate outcome is valid
        if (!in_array($selectedOutcome, [Event::RESULT_HOME, Event::RESULT_AWAY, Event::RESULT_DRAW])) {
            throw new ValidationException([
                'message' => app('translator')->trans('huseyinfiliz-pickem.api.errors.invalid_outcome')
            ]);
        }

        // Check if event is cancelled
        if ($event->status === Event::STATUS_CANCELLED) {
            throw new ValidationException([
                'message' => app('translator')->trans('huseyinfiliz-pickem.api.errors.event_cancelled')
            ]);
        }
    }
}