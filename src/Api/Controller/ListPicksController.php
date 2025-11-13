<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\PickSerializer;
use HuseyinFiliz\Pickem\Pick;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListPicksController extends AbstractListController
{
    public $serializer = PickSerializer::class;

    public $include = ['event', 'event.homeTeam', 'event.awayTeam', 'event.week', 'user'];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);

        // isGuest() kontrolü yerine standart Flarum izni kullanıldı.
        $actor->assertCan('pickem.makePicks');

        $query = Pick::query();

        // Filter by user (show only current user's picks unless admin)
        if ($userId = Arr::get($request->getQueryParams(), 'filter.user')) {
            // Adminler başkalarınınkini görebilir (veya 'pickem.manage' izni olanlar)
            if ($actor->hasPermission('pickem.manage') || $actor->id == $userId) {
                $query->where('user_id', $userId);
            } else {
                $query->where('user_id', $actor->id);
            }
        } else {
            // Default to current user's picks
            $query->where('user_id', $actor->id);
        }

        // Filter by event if provided
        if ($eventId = Arr::get($request->getQueryParams(), 'filter.event')) {
            $query->where('event_id', $eventId);
        }

        // Eager load relationships for nested includes
        $query->with(['event', 'event.homeTeam', 'event.awayTeam', 'event.week', 'user']);

        return $query->get();
    }
}