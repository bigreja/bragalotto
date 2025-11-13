<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\UrlGenerator;
use Flarum\Http\RequestUtil; // Added for permission check
use HuseyinFiliz\Pickem\Api\Serializer\EventSerializer;
use HuseyinFiliz\Pickem\Event;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListEventsController extends AbstractListController
{
    public $serializer = EventSerializer::class;
    public $include = ['homeTeam', 'awayTeam', 'week'];
    public $limit = 10;
    public $maxLimit = 50;

    protected $url;

    public function __construct(UrlGenerator $url)
    {
        $this->url = $url;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        // Permission check added
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('pickem.view');

        $query = Event::query();

        // Filter by week if provided
        if ($weekId = Arr::get($request->getQueryParams(), 'filter.week')) {
            $query->where('week_id', $weekId);
        }

        // Filter by status if provided
        if ($status = Arr::get($request->getQueryParams(), 'filter.status')) {
            $query->where('status', $status);
        }

        // Sıralama - Yeni maçlar üstte (DESC)
        $query->orderBy('match_date', 'desc');

        // Pagination
        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);
        
        // Total count for pagination metadata
        $total = $query->count();
        
        // Apply limit and offset
        $results = $query->limit($limit)->offset($offset)->get();
        
        // Add pagination metadata to document
        $document->addPaginationLinks(
            $this->url->to('api')->route('pickem.events.index'),
            $request->getQueryParams(),
            $offset,
            $limit,
            $total
        );

        return $results;
    }
}