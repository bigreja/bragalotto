<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractListController;
use HuseyinFiliz\Pickem\Api\Serializer\TeamSerializer;
use HuseyinFiliz\Pickem\Team;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListTeamsController extends AbstractListController
{
    public $serializer = TeamSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        return Team::all();
    }
}
