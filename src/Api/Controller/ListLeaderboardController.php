<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\UserScoreSerializer;
use HuseyinFiliz\Pickem\UserScore;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListLeaderboardController extends AbstractListController
{
    public $serializer = UserScoreSerializer::class;

    public $include = ['user'];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('pickem.view');
        $query = UserScore::query();
        $query->whereNull('season_id');
        $query->orderBy('total_points', 'desc')
              ->orderBy('correct_picks', 'desc');
        $query->with(['user']);

        return $query->get();
    }
}