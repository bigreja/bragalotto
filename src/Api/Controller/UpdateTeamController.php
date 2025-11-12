<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\TeamSerializer;
use HuseyinFiliz\Pickem\Team;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UpdateTeamController extends AbstractShowController
{
    public $serializer = TeamSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        // assertAdmin() yerine standart Flarum izni kullanıldı.
        $actor->assertPermission('pickem.manage');

        $id = Arr::get($request->getQueryParams(), 'id');
        $team = Team::findOrFail($id);

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        if ($name = Arr::get($data, 'name')) {
            $team->name = $name;
        }

        if ($slug = Arr::get($data, 'slug')) {
            $team->slug = $slug;
        }

        if (Arr::has($data, 'logoPath')) {
            $team->logo_path = Arr::get($data, 'logoPath');
        }

        $team->save();

        return $team;
    }
}