<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\EventSerializer;
use HuseyinFiliz\Pickem\Event;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Carbon\Carbon;

class CreateEventController extends AbstractCreateController
{
    public $serializer = EventSerializer::class;

    public $include = ['homeTeam', 'awayTeam', 'week'];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        $event = Event::create([
            'week_id' => Arr::get($data, 'weekId'),
            'home_team_id' => Arr::get($data, 'homeTeamId'),
            'away_team_id' => Arr::get($data, 'awayTeamId'),
            'match_date' => Carbon::parse(Arr::get($data, 'matchDate')),
            'cutoff_date' => Carbon::parse(Arr::get($data, 'cutoffDate')),
            'allow_draw' => Arr::get($data, 'allowDraw', false),
            'status' => Arr::get($data, 'status', 'scheduled'),
        ]);

        return $event;
    }
}
