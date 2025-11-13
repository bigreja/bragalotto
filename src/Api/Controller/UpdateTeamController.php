<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\TeamSerializer;
use HuseyinFiliz\Pickem\Team;
use HuseyinFiliz\Pickem\Validator\TeamValidator; // YENİ
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UpdateTeamController extends AbstractShowController
{
    public $serializer = TeamSerializer::class;

    /**
     * @var TeamValidator
     */
    protected $validator; // YENİ

    /**
     * @param TeamValidator $validator
     */
    public function __construct(TeamValidator $validator) // YENİ
    {
        $this->validator = $validator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertPermission('pickem.manage');

        $id = Arr::get($request->getQueryParams(), 'id');
        $team = Team::findOrFail($id);

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        // YENİ: Sadece gönderilen veriyi doğrula
        $this->validator->for($team)->assertValid($data);

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