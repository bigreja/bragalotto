<?php

namespace HuseyinFiliz\Pickem\Listener;

use HuseyinFiliz\Pickem\Event;
// use HuseyinFiliz\Pickem\Pick; // Artık burada gerekmiyor
// use HuseyinFiliz\Pickem\UserScore; // Artık burada gerekmiyor
use HuseyinFiliz\Pickem\PickemScoringService; // YENİ: Servisi import et
use Illuminate\Database\Eloquent\Events\Saved;

/**
 * Event result set edildiğinde pick'leri ve score'ları günceller
 * NOT: EnterEventResultController zaten bu işi yapıyor,
 * bu listener sadece başka yollarla (UpdateEventController gibi) 
 * result güncellenirse çalışır
 */
class UpdateUserScoresListener
{
    protected $scoringService; // YENİ: Servis için özellik

    public function __construct(PickemScoringService $scoringService) // YENİ: Servisi enjekte et
    {
        $this->scoringService = $scoringService;
    }

    public function handle(Saved $event)
    {
        // Sadece Event modellerini işle
        if (!($event->model instanceof Event)) {
            return;
        }

        $eventModel = $event->model;

        // Sadece result değiştiyse ve result varsa işle
        if (!$eventModel->wasChanged(['result', 'home_score', 'away_score'])) {
            return;
        }

        if ($eventModel->result === null) {
            return;
        }
        
        // DÜZELTME: Yinelenen mantık yerine servisi çağır
        $this->scoringService->updateScoresForEvent($eventModel);
    }
    
    // DÜZELTME: Bu metodlar artık Scoring Service'te olduğu için kaldırıldı
    // protected function updatePicksForEvent(Event $event): void { ... }
    // protected function updateUserScoresForEvent(Event $event): void { ... }
    // protected function recalculateUserScore(int $userId, ?int $seasonId): void { ... }
}