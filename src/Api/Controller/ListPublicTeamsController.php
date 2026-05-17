<?php

namespace bigreja\bragalotto\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use bigreja\bragalotto\Api\Serializer\TeamSerializer;
use bigreja\bragalotto\Team;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListPublicTeamsController extends AbstractListController
{
    public $serializer = TeamSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        // Use 'bragalotto.view' permission instead of 'bragalotto.manage'
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('bragalotto.view');

        return Team::all();
    }
}