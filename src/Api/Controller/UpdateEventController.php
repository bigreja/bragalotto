<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\EventSerializer;
use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Validator\EventValidator;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Carbon\Carbon;

class UpdateEventController extends AbstractShowController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = EventSerializer::class;

    /**
     * {@inheritdoc}
     */
    public $include = ['homeTeam', 'awayTeam', 'week'];

    /**
     * @var EventValidator
     */
    protected $validator;

    /**
     * @param EventValidator $validator
     */
    public function __construct(EventValidator $validator)
    {
        $this->validator = $validator;
    }

    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        // Check admin permission
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        // Get event ID from route
        $id = Arr::get($request->getQueryParams(), 'id');
        $event = Event::with(['homeTeam', 'awayTeam', 'week'])->findOrFail($id);

        // Get request data
        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        // Prepare data for validation (only validate fields that are present)
        $validationData = array_filter([
            'homeTeamId' => Arr::get($data, 'homeTeamId', $event->home_team_id),
            'awayTeamId' => Arr::get($data, 'awayTeamId', $event->away_team_id),
            'matchDate' => Arr::get($data, 'matchDate', $event->match_date),
            'cutoffDate' => Arr::get($data, 'cutoffDate', $event->cutoff_date),
            'weekId' => Arr::has($data, 'weekId') ? Arr::get($data, 'weekId') : $event->week_id,
            'allowDraw' => Arr::has($data, 'allowDraw') ? Arr::get($data, 'allowDraw') : $event->allow_draw,
            'status' => Arr::get($data, 'status', $event->status),
            'homeScore' => Arr::has($data, 'homeScore') ? Arr::get($data, 'homeScore') : $event->home_score,
            'awayScore' => Arr::has($data, 'awayScore') ? Arr::get($data, 'awayScore') : $event->away_score,
        ], function ($value) {
            return $value !== null;
        });

        // Validate
        $this->validator->assertValid($validationData);

        // Track if we're updating scores
        $updatingScores = false;

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
            $event->allow_draw = (bool) Arr::get($data, 'allowDraw');
        }

        if (Arr::has($data, 'status')) {
            $newStatus = Arr::get($data, 'status');
            
            // Validate status transition
            $this->validateStatusTransition($event, $newStatus);
            
            $event->status = $newStatus;
        }

        // Handle score updates
        if (Arr::has($data, 'homeScore') || Arr::has($data, 'awayScore')) {
            // Both scores must be provided together
            if (!Arr::has($data, 'homeScore') || !Arr::has($data, 'awayScore')) {
                throw new ValidationException([
                    'message' => app('translator')->trans('huseyinfiliz-pickem.api.errors.scores_must_be_together')
                ]);
            }

            $event->home_score = (int) Arr::get($data, 'homeScore');
            $event->away_score = (int) Arr::get($data, 'awayScore');
            $updatingScores = true;

            // Result will be auto-calculated in model's boot method
            // Status will be auto-set to finished in model's boot method
        }

        // Save the event (triggers boot method which updates picks)
        $event->save();

        // Reload relationships for response
        $event->load(['homeTeam', 'awayTeam', 'week']);

        return $event;
    }

    /**
     * Validate status transition
     *
     * @param Event $event
     * @param string $newStatus
     * @throws ValidationException
     */
    protected function validateStatusTransition(Event $event, string $newStatus): void
    {
        $currentStatus = $event->status;

        // Cannot change status of cancelled event
        if ($currentStatus === Event::STATUS_CANCELLED && $newStatus !== Event::STATUS_CANCELLED) {
            throw new ValidationException([
                'message' => app('translator')->trans('huseyinfiliz-pickem.api.errors.cannot_uncancel')
            ]);
        }

        // Cannot go back to scheduled from finished
        if ($currentStatus === Event::STATUS_FINISHED && $newStatus === Event::STATUS_SCHEDULED) {
            throw new ValidationException([
                'message' => app('translator')->trans('huseyinfiliz-pickem.api.errors.cannot_unfinish')
            ]);
        }
    }
}