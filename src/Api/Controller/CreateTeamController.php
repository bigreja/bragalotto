<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\TeamSerializer;
use HuseyinFiliz\Pickem\Team;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreateTeamController extends AbstractCreateController
{
    public $serializer = TeamSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        // assertAdmin() yerine standart Flarum izni kullanıldı.
        $actor->assertPermission('pickem.manage');

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        $team = Team::create([
            'name' => Arr::get($data, 'name'),
            'slug' => Arr::get($data, 'slug') ?: Str::slug(Arr::get($data, 'name')),
            'logo_path' => Arr::get($data, 'logoPath'),
        ]);

        return $team;
    }
}