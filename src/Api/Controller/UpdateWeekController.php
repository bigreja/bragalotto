<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\WeekSerializer;
use HuseyinFiliz\Pickem\Week;
use HuseyinFiliz\Pickem\Validator\WeekValidator;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UpdateWeekController extends AbstractShowController
{
    public $serializer = WeekSerializer::class;

    protected $validator;

    public function __construct(WeekValidator $validator)
    {
        $this->validator = $validator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('pickem.manage');

        $id = Arr::get($request->getQueryParams(), 'id');
        $week = Week::findOrFail($id);

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        // DÜZELTME: Model, 'model' özelliğine (property) atanmalıdır.
        $this.validator->model = $week;
        $this->validator->assertValid($data);

        if (Arr::has($data, 'name')) {
            $week->name = Arr::get($data, 'name');
        }
        if (Arr::has($data, 'weekNumber')) {
            $week->week_number = Arr::get($data, 'weekNumber');
        }
        if (Arr::has($data, 'seasonId')) {
            $week->season_id = Arr::get($data, 'seasonId');
        }

        $week->save();

        return $week;
    }
}