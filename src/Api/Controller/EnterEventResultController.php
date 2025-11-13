<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Flarum\Notification\NotificationSyncer;
use HuseyinFiliz\Pickem\Api\Serializer\EventSerializer;
use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Pick;
// use HuseyinFiliz\Pickem\UserScore; // Artık burada gerekmiyor
use HuseyinFiliz\Pickem\Notification\EventResultBlueprint;
use HuseyinFiliz\Pickem\PickemScoringService; // YENİ: Servisi import et
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class EnterEventResultController extends AbstractShowController
{
    public $serializer = EventSerializer::class;
    public $include = ['homeTeam', 'awayTeam', 'week'];

    protected $notifications;
    protected $scoringService; // YENİ: Servis için özellik

    public function __construct(NotificationSyncer $notifications, PickemScoringService $scoringService) // YENİ: Servisi enjekte et
    {
        $this->notifications = $notifications;
        $this->scoringService = $scoringService; // YENİ: Servisi ata
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertPermission('pickem.manage');

        $id = Arr::get($request->getQueryParams(), 'id');
        $event = Event::with(['homeTeam', 'awayTeam', 'week'])->findOrFail($id);

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);

        $homeScore = Arr::get($data, 'homeScore');
        $awayScore = Arr::get($data, 'awayScore');

        if ($homeScore === null || $awayScore === null) {
            throw new \Exception('Both home and away scores are required');
        }

        // Skorları set et
        $event->home_score = (int) $homeScore;
        $event->away_score = (int) $awayScore;
        
        // Result'ı hesapla
        if ($event->home_score > $event->away_score) {
            $event->result = Event::RESULT_HOME;
        } elseif ($event->away_score > $event->home_score) {
            $event->result = Event::RESULT_AWAY;
        } else {
            $event->result = Event::RESULT_DRAW;
        }
        
        // Status'u finished yap
        $event->status = Event::STATUS_FINISHED;
        
        // SaveQuietly - Listener'ı tetikleme (çünkü biz zaten aşağıda yapıyoruz)
        $event->saveQuietly();

        // DÜZELTME: Yinelenen mantık yerine servisi çağır
        $this->scoringService->updateScoresForEvent($event);
        
        // BİLDİRİMLER GÖNDER
        $this->sendNotifications($event);

        $event->load(['homeTeam', 'awayTeam', 'week']);

        return $event;
    }

    // DÜZELTME: Bu metodlar artık Scoring Service'te olduğu için kaldırıldı
    // protected function updatePicksForEvent(Event $event): void { ... }
    // protected function updateUserScoresForEvent(Event $event): void { ... }
    // protected function recalculateUserScore(int $userId, ?int $seasonId): void { ... }

    protected function sendNotifications(Event $event): void
    {
        $picks = Pick::where('event_id', $event->id)
            ->with('user')
            ->get();

        $users = $picks->pluck('user')->filter();

        if ($users->isEmpty()) {
            return;
        }

        $this->notifications->sync(
            new EventResultBlueprint($event),
            $users->all()
        );
    }
}