<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use HuseyinFiliz\Pickem\Api\Serializer\WeekSerializer;
use HuseyinFiliz\Pickem\Week;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListWeeksController extends AbstractListController
{
    public $serializer = WeekSerializer::class;

    public $include = ['season'];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $query = Week::query();

        // Filter by season if provided
        if ($seasonId = Arr::get($request->getQueryParams(), 'filter.season')) {
            $query->where('season_id', $seasonId);
        }

        return $query->orderBy('start_date', 'desc')->get();
    }
}
