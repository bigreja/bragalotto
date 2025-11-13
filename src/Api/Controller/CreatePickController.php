<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\PickSerializer;
use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Pick;
use HuseyinFiliz\Pickem\PickemScoringService;
use Illuminate\Contracts\Translation\Translator;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreatePickController extends AbstractCreateController
{
    public $serializer = PickSerializer::class;
    public $include = ['event', 'event.homeTeam', 'event.awayTeam', 'user'];

    protected $scoringService;
    protected $translator;

    public function __construct(PickemScoringService $scoringService, Translator $translator) // Translator eklendi
    {
        $this->scoringService = $scoringService;
        $this->translator = $translator; // EKLENDİ
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertCan('pickem.makePicks'); // assertCan olarak güncellendi

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);
        
        $eventId = Arr::get($data, 'eventId');
        $selectedOutcome = Arr::get($data, 'selectedOutcome');

        if (!$eventId || !$selectedOutcome) {
            throw new ValidationException([
                'message' => $this->translator->trans('huseyinfiliz-pickem.validation.errors.unauthorized') // Çeviri anahtarı kullanıldı
            ]);
        }

        $event = Event::with(['homeTeam', 'awayTeam', 'week'])->findOrFail($eventId);

        if (!$event->canPick()) {
            throw new ValidationException([
                'message' => $this->translator->trans('huseyinfiliz-pickem.validation.errors.pick_after_cutoff') // Çeviri anahtarı kullanıldı
            ]);
        }

        if ($selectedOutcome === Event::RESULT_DRAW && !$event->allow_draw) {
            throw new ValidationException([
                'message' => $this->translator->trans('huseyinfiliz-pickem.validation.errors.invalid_outcome') // Çeviri anahtarı kullanıldı
            ]);
        }

        $validOutcomes = [Event::RESULT_HOME, Event::RESULT_AWAY, Event::RESULT_DRAW];
        if (!in_array($selectedOutcome, $validOutcomes)) {
            throw new ValidationException([
                'message' => $this.translator->trans('huseyinfiliz-pickem.validation.errors.invalid_outcome') // Çeviri anahtarı kullanıldı
            ]);
        }

        $pick = Pick::firstOrNew([
            'user_id' => $actor->id,
            'event_id' => $eventId,
        ]);

        $isUpdate = $pick->exists;
        $recalculateScore = false; 

        $pick->selected_outcome = $selectedOutcome;

        if ($isUpdate && $pick->isDirty('selected_outcome')) {
            $pick->is_correct = null;
            
            if ($event->isFinished() || $event->isClosed()) {
                 $recalculateScore = true;
            }
        }

        $pick->save();

        if ($recalculateScore) {
            $this->scoringService->recalculateUserScore($actor->id);
        }

        $pick->load(['event.homeTeam', 'event.awayTeam', 'event.week', 'user']);

        return $pick;
    }
}