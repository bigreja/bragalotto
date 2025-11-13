<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
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
    public $serializer = EventSerializer::class;
    public $include = ['homeTeam', 'awayTeam', 'week'];

    /**
     * @var EventValidator
     */
    protected $validator;

    public function __construct(EventValidator $validator)
    {
        $this->validator = $validator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('pickem.manage');

        $id = Arr::get($request->getQueryParams(), 'id');
        $event = Event::with(['homeTeam', 'awayTeam', 'week'])->findOrFail($id);

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        // DÜZELTME: Model, 'model' özelliğine (property) atanmalıdır.
        $this->validator->model = $event;
        $this->validator->assertValid($data);

        // Temel alanları güncelle
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
            $event->status = Arr::get($data, 'status');
        }

        if (Arr::has($data, 'homeScore') && Arr::has($data, 'awayScore')) {
            $event->home_score = (int) Arr::get($data, 'homeScore');
            $event->away_score = (int) Arr::get($data, 'awayScore');
        }

        $event->save();
        $event->load(['homeTeam', 'awayTeam', 'week']);

        return $event;
    }
}