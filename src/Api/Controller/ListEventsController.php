<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\UrlGenerator;
use HuseyinFiliz\Pickem\Api\Serializer\EventSerializer;
use HuseyinFiliz\Pickem\Event;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListEventsController extends AbstractListController
{
    public $serializer = EventSerializer::class;

    public $include = ['homeTeam', 'awayTeam', 'week'];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $query = Event::query();

        // Filter by week if provided
        if ($weekId = Arr::get($request->getQueryParams(), 'filter.week')) {
            $query->where('week_id', $weekId);
        }

        // Filter by status if provided
        if ($status = Arr::get($request->getQueryParams(), 'filter.status')) {
            $query->where('status', $status);
        }

        // Order by match date
        $query->orderBy('match_date', 'asc');

        return $query->get();
    }
}
