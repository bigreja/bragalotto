<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\PickSerializer;
use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Pick;
use HuseyinFiliz\Pickem\PickemScoringService; // YENİ: Scoring Service'i import et
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreatePickController extends AbstractCreateController
{
    public $serializer = PickSerializer::class;
    public $include = ['event', 'event.homeTeam', 'event.awayTeam', 'user'];

    /**
     * @var PickemScoringService
     */
    protected $scoringService; // YENİ: Servis için özellik

    /**
     * @param PickemScoringService $scoringService
     */
    public function __construct(PickemScoringService $scoringService) // YENİ: Servisi enjekte et
    {
        $this->scoringService = $scoringService;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertPermission('pickem.makePicks');

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);
        
        $eventId = Arr::get($data, 'eventId');
        $selectedOutcome = Arr::get($data, 'selectedOutcome');

        if (!$eventId || !$selectedOutcome) {
            throw new ValidationException([
                'message' => 'Event ID and selected outcome are required'
            ]);
        }

        $event = Event::with(['homeTeam', 'awayTeam', 'week'])->findOrFail($eventId);

        if (!$event->canPick()) {
            throw new ValidationException([
                'message' => 'Picks are no longer allowed for this event'
            ]);
        }

        if ($selectedOutcome === Event::RESULT_DRAW && !$event->allow_draw) {
            throw new ValidationException([
                'message' => 'Draw picks are not allowed for this event'
            ]);
        }

        $validOutcomes = [Event::RESULT_HOME, Event::RESULT_AWAY, Event::RESULT_DRAW];
        if (!in_array($selectedOutcome, $validOutcomes)) {
            throw new ValidationException([
                'message' => 'Invalid outcome selected'
            ]);
        }

        $pick = Pick::firstOrNew([
            'user_id' => $actor->id,
            'event_id' => $eventId,
        ]);

        $isUpdate = $pick->exists;
        $recalculateScore = false; // YENİ: Puan hesaplama bayrağı

        $pick->selected_outcome = $selectedOutcome;

        if ($isUpdate && $pick->isDirty('selected_outcome')) {
            // Eğer tahmin değiştirildiyse 'is_correct' sıfırla
            $pick->is_correct = null;
            
            // YENİ: Eğer bu maçın sonucu zaten belliyse (yani puanı etkiliyorsa)
            // skoru yeniden hesaplamamız gerekiyor.
            if ($event->isFinished() || $event->isClosed()) {
                 $recalculateScore = true;
            }
        }

        $pick->save();

        // YENİ: Eğer bayrak true ise, bu kullanıcının puanını yeniden hesapla
        if ($recalculateScore) {
            $this->scoringService->recalculateUserScore($actor->id);
        }

        $pick->load(['event.homeTeam', 'event.awayTeam', 'event.week', 'user']);

        return $pick;
    }
}