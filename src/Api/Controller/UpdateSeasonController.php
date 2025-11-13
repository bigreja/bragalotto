<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\SeasonSerializer;
use HuseyinFiliz\Pickem\Season;
use HuseyinFiliz\Pickem\Validator\SeasonValidator;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Carbon\Carbon;

class UpdateSeasonController extends AbstractShowController
{
    public $serializer = SeasonSerializer::class;

    protected $validator;

    public function __construct(SeasonValidator $validator)
    {
        $this->validator = $validator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('pickem.manage');

        $id = Arr::get($request->getQueryParams(), 'id');
        $season = Season::findOrFail($id);

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        // DÜZELTME: Model, 'model' özelliğine (property) atanmalıdır.
        $this->validator->model = $season;
        $this->validator->assertValid($data);

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