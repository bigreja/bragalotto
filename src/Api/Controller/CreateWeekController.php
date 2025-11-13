<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\WeekSerializer;
use HuseyinFiliz\Pickem\Week;
use HuseyinFiliz\Pickem\Validator\WeekValidator; // YENİ
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Carbon\Carbon;

class CreateWeekController extends AbstractCreateController
{
    public $serializer = WeekSerializer::class;

    /**
     * @var WeekValidator
     */
    protected $validator; // YENİ

    /**
     * @param WeekValidator $validator
     */
    public function __construct(WeekValidator $validator) // YENİ
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

        $week = Week::create([
            'name' => Arr::get($data, 'name'),
            'season_id' => Arr::get($data, 'seasonId'),
            'week_number' => Arr::get($data, 'weekNumber'),
            'start_date' => Arr::get($data, 'startDate') ? Carbon::parse(Arr::get($data, 'startDate')) : null,
            'end_date' => Arr::get($data, 'endDate') ? Carbon::parse(Arr::get($data, 'endDate')) : null,
        ]);

        return $week;
    }
}