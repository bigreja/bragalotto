<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\EventSerializer;
use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Validator\EventValidator;
use Illuminate\Support\Arr;
use Illuminate\Support\Str; // EKLENDİ
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Carbon\Carbon;

class CreateEventController extends AbstractCreateController
{
    public $serializer = EventSerializer::class;
    public $include = ['homeTeam', 'awayTeam', 'week'];

    protected $validator;

    public function __construct(EventValidator $validator)
    {
        $this->validator = $validator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('pickem.manage');

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        // --- YENİ MANTIK BAŞLANGICI ---

        // 1. Gelen camelCase (weekId) veriyi snake_case (week_id) veriye dönüştür
        $attributes = [];
        foreach ($data as $key => $value) {
            $attributes[Str::snake($key)] = $value;
        }

        // 2. Tarih alanlarını Carbon nesnesine dönüştür
        if ($matchDate = Arr::get($attributes, 'match_date')) {
            $attributes['match_date'] = Carbon::parse($matchDate);
        }
        if ($cutoffDate = Arr::get($attributes, 'cutoff_date')) {
            $attributes['cutoff_date'] = Carbon::parse($cutoffDate);
        }

        // 3. Varsayılan değerleri ayarla (eğer API'den gelmediyse)
        $attributes['allow_draw'] = Arr::get($attributes, 'allow_draw', false);
        $attributes['status'] = Arr::get($attributes, 'status', 'scheduled');

        // 4. Dönüştürülmüş veriyi doğrula
        $this->validator->assertValid($attributes);

        // 5. Modeli $fillable kullanarak oluştur
        $event = Event::create($attributes);

        // --- ESKİ MANUEL EŞLEŞTİRME SİLİNDİ ---
        
        // --- YENİ MANTIK SONU ---

        return $event;
    }
}