<?php

namespace bigreja\bragalotto\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use bigreja\bragalotto\Api\Serializer\SeasonSerializer;
use bigreja\bragalotto\Season;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListPublicSeasonsController extends AbstractListController
{
    public $serializer = SeasonSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        // Use 'bragalotto.view' permission instead of 'bragalotto.manage'
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('bragalotto.view');

        return Season::orderBy('start_date', 'desc')->get();
    }
}