<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\WeekSerializer;
use HuseyinFiliz\Pickem\Week;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UpdateWeekController extends AbstractShowController
{
    public $serializer = WeekSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertPermission('pickem.manage');

        $id = Arr::get($request->getQueryParams(), 'id');
        $week = Week::findOrFail($id);

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        if ($name = Arr::get($data, 'name')) {
            $week->name = $name;
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