<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\SeasonSerializer;
use HuseyinFiliz\Pickem\Season;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Carbon\Carbon;

class CreateSeasonController extends AbstractCreateController
{
    public $serializer = SeasonSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        $season = Season::create([
            'name' => Arr::get($data, 'name'),
            'slug' => Arr::get($data, 'slug') ?: Str::slug(Arr::get($data, 'name')),
            'start_date' => Arr::get($data, 'startDate') ? Carbon::parse(Arr::get($data, 'startDate')) : null,
            'end_date' => Arr::get($data, 'endDate') ? Carbon::parse(Arr::get($data, 'endDate')) : null,
        ]);

        return $season;
    }
}
