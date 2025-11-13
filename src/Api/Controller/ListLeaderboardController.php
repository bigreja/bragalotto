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

    public $include = ['user']; // 'season' ilişkisine artık gerek yok

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertPermission('pickem.viewLeaderboard');

        $query = UserScore::query();

        // DÜZELTME: Sezon filtresi mantığı tamamen kaldırıldı.
        // Her zaman 'season_id'si olmayan (genel toplam) puanları getir.
        $query->whereNull('season_id');

        // Puana göre sırala
        $query->orderBy('total_points', 'desc')
              ->orderBy('correct_picks', 'desc');

        // İlişkisel veriyi yükle
        $query->with(['user']);

        return $query->get();
    }
}