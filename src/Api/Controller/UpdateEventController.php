<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
// use Flarum\Foundation\ValidationException; // Artık buna gerek yok
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\EventSerializer;
use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Validator\EventValidator; // YENİ: Validator'ı import et
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Carbon\Carbon;

class UpdateEventController extends AbstractShowController
{
    public $serializer = EventSerializer::class;
    public $include = ['homeTeam', 'awayTeam', 'week'];

    /**
     * @var EventValidator
     */
    protected $validator; // YENİ: Validator için özellik

    /**
     * @param EventValidator $validator
     */
    public function __construct(EventValidator $validator) // YENİ: Validator'ı enjekte et
    {
        $this->validator = $validator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertPermission('pickem.manage');

        $id = Arr::get($request->getQueryParams(), 'id');
        $event = Event::with(['homeTeam', 'awayTeam', 'week'])->findOrFail($id);

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        // YENİ: Gelen veriyi Flarum Validator ile doğrula
        // Validator, 'homeTeamId' 'awayTeamId'den farklı mı diye de kontrol edecek
        // 'ignore($event)' ekleyerek mevcut modelin kendisini benzersizlik kontrolünden muaf tutarız
        $this->validator->for($event)->assertValid($data);

        // KALDIRILDI: Manuel doğrulama blokları kaldırıldı

        // Temel alanları güncelle
        if (Arr::has($data, 'weekId')) {
            $event->week_id = Arr::get($data, 'weekId');
        }
        if (Arr::has($data, 'homeTeamId')) {
            $event->home_team_id = Arr::get($data, 'homeTeamId');
        }
        if (Arr::has($data, 'awayTeamId')) {
            $event->away_team_id = Arr::get($data, 'awayTeamId');
        }
        if (Arr::has($data, 'matchDate')) {
            $event->match_date = Carbon::parse(Arr::get($data, 'matchDate'));
        }
        if (Arr::has($data, 'cutoffDate')) {
            $event->cutoff_date = Carbon::parse(Arr::get($data, 'cutoffDate'));
        }
        if (Arr::has($data, 'allowDraw')) {
            $event->allow_draw = (bool) Arr::get($data, 'allowDraw');
        }
        if (Arr::has($data, 'status')) {
            $event->status = Arr::get($data, 'status');
        }

        // Skor güncellemesi (Validator zaten ikisinin de girilmesini zorunlu kıldı)
        if (Arr::has($data, 'homeScore') && Arr::has($data, 'awayScore')) {
            $event->home_score = (int) Arr::get($data, 'homeScore');
            $event->away_score = (int) Arr::get($data, 'awayScore');
        }

        $event->save();
        $event->load(['homeTeam', 'awayTeam', 'week']);

        return $event;
    }
}