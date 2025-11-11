<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use HuseyinFiliz\Pickem\Api\Serializer\UserScoreSerializer;
use HuseyinFiliz\Pickem\UserScore;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListLeaderboardController extends AbstractListController
{
    public $serializer = UserScoreSerializer::class;

    public $include = ['user', 'season'];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $query = UserScore::query();

        // Filter by season if provided
        if ($seasonId = Arr::get($request->getQueryParams(), 'filter.season')) {
            $query->where('season_id', $seasonId);
        }

        // Order by total points descending
        $query->orderBy('total_points', 'desc')
              ->orderBy('correct_picks', 'desc');

        // Eager load relationships
        $query->with(['user', 'season']);

        return $query->get();
    }
}
