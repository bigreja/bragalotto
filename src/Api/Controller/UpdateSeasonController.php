<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\SeasonSerializer;
use HuseyinFiliz\Pickem\Season;
use HuseyinFiliz\Pickem\Validator\SeasonValidator; // YENİ
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Carbon\Carbon;

class UpdateSeasonController extends AbstractShowController
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

        $id = Arr::get($request->getQueryParams(), 'id');
        $season = Season::findOrFail($id);

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        // YENİ: Sadece gönderilen veriyi doğrula
        $this->validator->for($season)->assertValid($data);

        // Alanlar 'data' dizisinde varsa güncelle
        if (Arr::has($data, 'name')) {
            $season->name = Arr::get($data, 'name');
        }
        if (Arr::has($data, 'slug')) {
            $season->slug = Arr::get($data, 'slug');
        }
        if (Arr::has($data, 'startDate')) {
            $season->start_date = Arr::get($data, 'startDate') ? Carbon::parse(Arr::get($data, 'startDate')) : null;
        }
        if (Arr::has($data, 'endDate')) {
            $season->end_date = Arr::get($data, 'endDate') ? Carbon::parse(Arr::get($data, 'endDate')) : null;
        }

        $season->save();

        return $season;
    }
}