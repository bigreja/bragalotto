<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\TeamSerializer;
use HuseyinFiliz\Pickem\Team;
use HuseyinFiliz\Pickem\Validator\TeamValidator;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UpdateTeamController extends AbstractShowController
{
    public $serializer = TeamSerializer::class;

    protected $validator;

    public function __construct(TeamValidator $validator)
    {
        $this->validator = $validator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('pickem.manage');

        $id = Arr::get($request->getQueryParams(), 'id');
        $team = Team::findOrFail($id);

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        // DÜZELTME: Model, 'model' özelliğine (property) atanmalıdır.
        $this->validator->model = $team;
        $this->validator->assertValid($data);

        if (Arr::has($data, 'name')) {
            $team->name = Arr::get($data, 'name');
        }
        if (Arr::has($data, 'slug')) {
            $team->slug = Arr::get($data, 'slug');
        }
        if (Arr::has($data, 'logoPath')) {
            $team->logo_path = Arr::get($data, 'logoPath');
        }

        $team->save();

        return $team;
    }
}