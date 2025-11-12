<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\PickSerializer;
use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Pick;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreatePickController extends AbstractCreateController
{
    public $serializer = PickSerializer::class;
    public $include = ['event', 'event.homeTeam', 'event.awayTeam', 'user'];

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        // assertRegistered() yerine standart Flarum izni kullanıldı.
        $actor->assertPermission('pickem.makePicks');

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);
        
        // Basit validation
        $eventId = Arr::get($data, 'eventId');
        $selectedOutcome = Arr::get($data, 'selectedOutcome');

        if (!$eventId || !$selectedOutcome) {
            throw new ValidationException([
                'message' => 'Event ID and selected outcome are required'
            ]);
        }

        // Event yükle
        $event = Event::with(['homeTeam', 'awayTeam', 'week'])->findOrFail($eventId);

        // Pick yapılabilir mi kontrol et
        if (!$event->canPick()) {
            throw new ValidationException([
                'message' => 'Picks are no longer allowed for this event'
            ]);
        }

        // Draw kontrolü
        if ($selectedOutcome === Event::RESULT_DRAW && !$event->allow_draw) {
            throw new ValidationException([
                'message' => 'Draw picks are not allowed for this event'
            ]);
        }

        // Outcome geçerli mi
        $validOutcomes = [Event::RESULT_HOME, Event::RESULT_AWAY, Event::RESULT_DRAW];
        if (!in_array($selectedOutcome, $validOutcomes)) {
            throw new ValidationException([
                'message' => 'Invalid outcome selected'
            ]);
        }

        // Pick oluştur veya güncelle
        $pick = Pick::firstOrNew([
            'user_id' => $actor->id,
            'event_id' => $eventId,
        ]);

        $isUpdate = $pick->exists;

        $pick->selected_outcome = $selectedOutcome;

        // Eğer değişiklik yapılıyorsa correctness'i temizle
        if ($isUpdate && $pick->isDirty('selected_outcome')) {
            $pick->is_correct = null;
        }

        $pick->save();
        $pick->load(['event.homeTeam', 'event.awayTeam', 'event.week', 'user']);

        return $pick;
    }
}