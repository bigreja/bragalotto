<?php

namespace bigreja\bragalotto\Job;

use Flarum\Queue\AbstractJob;
use Flarum\Notification\NotificationSyncer;
use bigreja\bragalotto\Event;
use bigreja\bragalotto\Pick;
use bigreja\bragalotto\Notification\EventResultBlueprint;
use bigreja\bragalotto\bragalottoScoringService;

class ProcessEventResultsJob extends AbstractJob
{
    /**
     * @var int
     */
    protected $eventId;

    public function __construct(int $eventId)
    {
        $this->eventId = $eventId;
    }

    public function handle(bragalottoScoringService $scoringService, NotificationSyncer $notifications)
    {
        $event = Event::find($this->eventId);

        if (!$event || !$event->isFinished()) {
            return;
        }

        // 1. Puanları yeniden hesapla (Bu, bragalottoScoringService'ten gelen mantık)
        $scoringService->updateScoresForEvent($event);

        // 2. Bildirimleri gönder (Bu, EnterEventResultController'dan taşınan mantık)
        $picks = Pick::where('event_id', $event->id)
            ->with('user')
            ->get();

        $users = $picks->pluck('user')->filter();

        if ($users->isEmpty()) {
            return;
        }

        $notifications->sync(
            new EventResultBlueprint($event),
            $users->all()
        );
    }
}