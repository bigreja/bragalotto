<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use Flarum\Http\UrlGenerator;
use HuseyinFiliz\Pickem\Api\Serializer\UserScoreSerializer;
use HuseyinFiliz\Pickem\UserScore;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListLeaderboardController extends AbstractListController
{
    public $serializer = UserScoreSerializer::class;

    public $include = ['user'];
    
    public $limit = 20;

    protected $url;

    public function __construct(UrlGenerator $url)
    {
        $this->url = $url;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('pickem.view');
        
        $query = UserScore::query();
        $query->whereNull('season_id');
        
        // YENİ: Kullanıcı filtresi eklendi
        $filters = $this->extractFilter($request);
        if ($userId = Arr::get($filters, 'user')) {
            $query->where('user_id', $userId);
        }

        $query->orderBy('total_points', 'desc')
              ->orderBy('correct_picks', 'desc');
        
        $query->with(['user']);

        $limit = $this->extractLimit($request);
        $offset = $this->extractOffset($request);

        $total = $query->count();

        $results = $query->limit($limit)
                         ->offset($offset)
                         ->get();

        $document->addPaginationLinks(
            $this->url->to('api')->route('pickem.leaderboard.index'),
            $request->getQueryParams(),
            $offset,
            $limit,
            $total
        );
        
        $document->setMeta(['total' => $total]);

        return $results;
    }
}