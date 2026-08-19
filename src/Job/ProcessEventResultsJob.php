<?php

namespace Bigreja\Bragalotto\Job;

use Flarum\Queue\AbstractJob;
use Bigreja\Bragalotto\Event;
use Bigreja\Bragalotto\PickemScoringService;

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

    public function handle(PickemScoringService $scoringService)
    {
        $event = Event::find($this->eventId);

        if (!$event || !$event->isFinished()) {
            return;
        }

        // Recalculate points only. Notifications are sent by the Saved listener
        // when result/status actually changes.
        $scoringService->updateScoresForEvent($event);
    }
}