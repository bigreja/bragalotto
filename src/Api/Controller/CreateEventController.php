<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\EventSerializer;
use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Validator\EventValidator; // YENİ: Validator'ı import et
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Carbon\Carbon;

class CreateEventController extends AbstractCreateController
{
    public $serializer = EventSerializer::class;
    public $include = ['homeTeam', 'awayTeam', 'week'];

    /**
     * @var EventValidator
     */
    protected $validator; // YENİ: Validator için özellik

    /**
     * @param EventValidator $validator
     */
    public function __construct(EventValidator $validator) // YENİ: Validator'ı enjekte et
    {
        $this->validator = $validator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('pickem.manage');

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        // YENİ: Veriyi Flarum Validator ile doğrula
        $this->validator->assertValid($data);

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