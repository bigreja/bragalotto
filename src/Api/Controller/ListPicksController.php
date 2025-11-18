<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Flarum\Http\UrlGenerator;
use HuseyinFiliz\Pickem\Api\Serializer\PickSerializer;
use HuseyinFiliz\Pickem\Pick;
use Illuminate\Support\Arr;
use Illuminate\Support\Str; // YENİ EKLENDİ: Bu import gerekli
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListPicksController extends AbstractListController
{
    public $serializer = PickSerializer::class;
    public $include = ['event', 'event.homeTeam', 'event.awayTeam', 'event.week', 'user'];
    
    public $limit = 100;
    public $sort = ['createdAt' => 'desc'];
    public $sortFields = ['createdAt', 'updatedAt'];

    protected $url;

    public function __construct(UrlGenerator $url)
    {
        $this->url = $url;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('pickem.makePicks');

        $query = Pick::query();

        if ($userId = Arr::get($request->getQueryParams(), 'filter.user')) {
            if ($actor->hasPermission('pickem.manage') || $actor->id == $userId) {
                $query->where('user_id', $userId);
            } else {
                $query->where('user_id', $actor->id);
            }
        } else {
            $query->where('user_id', $actor->id);
        }

        if ($eventId = Arr::get($request->getQueryParams(), 'filter.event')) {
            $query->where('event_id', $eventId);
        }

        // --- SAYFALAMA MANTIĞI ---
        
        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);
        $sort = $this->extractSort($request);

        foreach ($sort as $field => $order) {
            // DÜZELTME: snake_case() yerine Str::snake() kullanıldı
            $query->orderBy(Str::snake($field), $order);
        }

        $total = $query->count();

        $results = $query->with(['event', 'event.homeTeam', 'event.awayTeam', 'event.week', 'user'])
                         ->limit($limit)
                         ->offset($offset)
                         ->get();

        $document->addPaginationLinks(
            $this->url->to('api')->route('pickem.picks.index'),
            $request->getQueryParams(),
            $offset,
            $limit,
            $total
        );
        
        $document->setMeta(['total' => $total]);

        return $results;
    }
}