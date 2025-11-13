<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\SeasonSerializer;
use HuseyinFiliz\Pickem\Season;
use HuseyinFiliz\Pickem\Validator\SeasonValidator; // YENİ
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Carbon\Carbon;

class CreateSeasonController extends AbstractCreateController
{
    public $serializer = SeasonSerializer::class;

    /**
     * @var SeasonValidator
     */
    protected $validator; // YENİ

    /**
     * @param SeasonValidator $validator
     */
    public function __construct(SeasonValidator $validator) // YENİ
    {
        $this->validator = $validator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertPermission('pickem.manage');

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        // Slug boşsa, isimden otomatik oluştur
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug(Arr::get($data, 'name'));
        }

        // YENİ: Veriyi Flarum Validator ile doğrula
        $this->validator->assertValid($data);

        $season = Season::create([
            'name' => Arr::get($data, 'name'),
            'slug' => Arr::get($data, 'slug'),
            'start_date' => Arr::get($data, 'startDate') ? Carbon::parse(Arr::get($data, 'startDate')) : null,
            'end_date' => Arr::get($data, 'endDate') ? Carbon::parse(Arr::get($data, 'endDate')) : null,
        ]);

        return $season;
    }
}