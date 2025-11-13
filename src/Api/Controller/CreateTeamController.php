<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\TeamSerializer;
use HuseyinFiliz\Pickem\Team;
use HuseyinFiliz\Pickem\Validator\TeamValidator; // YENİ: Validator'ı import et
use Illuminate.Support\Arr;
use Illuminate.Support\Str;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreateTeamController extends AbstractCreateController
{
    public $serializer = TeamSerializer::class;

    /**
     * @var TeamValidator
     */
    protected $validator; // YENİ: Validator için özellik

    /**
     * @param TeamValidator $validator
     */
    public function __construct(TeamValidator $validator) // YENİ: Validator'ı enjekte et
    {
        $this->validator = $validator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('pickem.manage');

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);
        
        // YENİ: Slug'ı, isimden otomatik oluştur (eğer boşsa)
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug(Arr::get($data, 'name'));
        }
        
        // YENİ: Veriyi Flarum Validator ile doğrula
        $this->validator->assertValid($data);

        $team = Team::create([
            'name' => Arr::get($data, 'name'),
            'slug' => Arr::get($data, 'slug'),
            'logo_path' => Arr::get($data, 'logoPath'),
        ]);

        return $team;
    }
}