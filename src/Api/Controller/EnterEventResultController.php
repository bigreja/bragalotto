<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Flarum\Foundation\ValidationException;
use Illuminate\Contracts\Translation\Translator;
use HuseyinFiliz\Pickem\Api\Serializer\EventSerializer;
use HuseyinFiliz\Pickem\Event;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Contracts\Bus\Dispatcher;
use HuseyinFiliz\Pickem\Job\ProcessEventResultsJob;

class EnterEventResultController extends AbstractShowController
{
    public $serializer = EventSerializer::class;
    public $include = ['homeTeam', 'awayTeam', 'week'];

    protected $translator;
    protected $bus; 

    public function __construct(Translator $translator, Dispatcher $bus)
    {
        $this->translator = $translator;
        $this->bus = $bus;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('pickem.manage');

        $id = Arr::get($request->getQueryParams(), 'id');
        $event = Event::with(['homeTeam', 'awayTeam', 'week'])->findOrFail($id);

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        $homeScore = Arr::get($data, 'homeScore');
        $awayScore = Arr::get($data, 'awayScore');

        if ($homeScore === null || $awayScore === null) {
            throw new ValidationException([
                'scores' => $this->translator->trans('huseyinfiliz-pickem.lib.messages.scores_required')
            ]);
        }

        $event->home_score = (int) $homeScore;
        $event->away_score = (int) $awayScore;
        
        // DÜZELTME: Sonuç hesaplama mantığı buradan kaldırıldı.
        // Event::booted() içindeki "saving" listener'ı bunu otomatik yapacak.
        
        // Durumu manuel olarak finished yapabiliriz veya modelin bunu yapmasına izin verebiliriz.
        // Modelde "Eğer skorlar girildiyse ve status scheduled ise finished yap" mantığı var.
        // Ancak admin kapalı (closed) bir maça sonuç giriyorsa model onu finished yapmayabilir.
        // Bu yüzden burada zorlamak daha güvenli:
        $event->status = Event::STATUS_FINISHED;
        
        $event->save(); 

        // Bildirim ve puan hesaplama işini kuyruğa at
        $this->bus->dispatch(
            new ProcessEventResultsJob($event->id)
        );

        // Güncel veriyi döndür
        $event->load(['homeTeam', 'awayTeam', 'week']);

        return $event;
    }
}