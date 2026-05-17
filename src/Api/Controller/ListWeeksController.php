<?php

namespace bigreja\bragalotto\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use bigreja\bragalotto\Api\Serializer\WeekSerializer;
use bigreja\bragalotto\Week;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListWeeksController extends AbstractListController
{
    public $serializer = WeekSerializer::class;

    public $include = ['season'];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('bragalotto.manage');

        $query = Week::query();
        
        // DÜZELTME: Sezon ilişkisini peşin yükle
        $query->with('season');

        if ($seasonId = Arr::get($request->getQueryParams(), 'filter.season')) {
            $query->where('season_id', $seasonId);
        }

        return $query->orderBy('start_date', 'desc')->get();
    }
}