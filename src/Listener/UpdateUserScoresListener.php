<?php

namespace HuseyinFiliz\Pickem\Listener;

use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Pick;
use HuseyinFiliz\Pickem\UserScore;
use Illuminate\Database\Eloquent\Events\Saved;

/**
 * Event result set edildiğinde pick'leri ve score'ları günceller
 * NOT: EnterEventResultController zaten bu işi yapıyor,
 * bu listener sadece başka yollarla (UpdateEventController gibi) 
 * result güncellenirse çalışır
 */
class UpdateUserScoresListener
{
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

        $this->updatePicksForEvent($eventModel);
        $this->updateUserScoresForEvent($eventModel);
    }

    /**
     * Event için tüm pick'lerin doğruluğunu güncelle
     */
    protected function updatePicksForEvent(Event $event): void
    {
        Pick::where('event_id', $event->id)->get()->each(function (Pick $pick) use ($event) {
            $pick->is_correct = ($pick->selected_outcome === $event->result);
            $pick->saveQuietly(); // Event tetikleme
        });
    }

    /**
     * Bu event için pick yapan kullanıcıların score'larını güncelle
     */
    protected function updateUserScoresForEvent(Event $event): void
    {
        $picks = Pick::where('event_id', $event->id)
            ->with('user')
            ->get();

        // Event'in season'ını bul
        $seasonId = $event->week ? $event->week->season_id : null;

        // Benzersiz user_id'leri al
        $userIds = $picks->pluck('user_id')->unique();

        foreach ($userIds as $userId) {
            $this->recalculateUserScore($userId, $seasonId);
        }
    }

    /**
     * Kullanıcının score'unu yeniden hesapla
     */
    protected function recalculateUserScore(int $userId, ?int $seasonId): void
    {
        // Bu kullanıcı + season için tek bir kayıt
        $userScore = UserScore::firstOrNew([
            'user_id' => $userId,
            'season_id' => $seasonId,
        ]);

        // Bu season'daki tüm pick'leri getir
        $query = Pick::where('user_id', $userId)
            ->whereNotNull('is_correct');

        if ($seasonId) {
            // Belirli bir season
            $query->whereHas('event.week', function ($q) use ($seasonId) {
                $q->where('season_id', $seasonId);
            });
        } else {
            // Season olmayan event'ler veya week olmayan event'ler
            $query->whereHas('event', function ($q) {
                $q->whereNull('week_id');
            })->orWhereHas('event.week', function ($q) {
                $q->whereNull('season_id');
            });
        }

        $picks = $query->get();
        
        // Hesaplama
        $userScore->total_picks = $picks->count();
        $userScore->correct_picks = $picks->where('is_correct', true)->count();
        $userScore->total_points = $userScore->correct_picks;

        $userScore->save();
    }
}