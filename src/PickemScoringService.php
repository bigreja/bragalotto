<?php

namespace HuseyinFiliz\Pickem;

use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Pick;
use HuseyinFiliz\Pickem\UserScore;

/**
 * Skorlama mantığını merkezileştiren servis sınıfı
 */
class PickemScoringService
{
    /**
     * Bir maçın sonucu girildiğinde tüm tahminleri ve skorları günceller
     */
    public function updateScoresForEvent(Event $event): void
    {
        $this->updatePicksForEvent($event);
        $this->updateUserScoresForEvent($event);
    }

    /**
     * Event için tüm pick'lerin doğruluğunu güncelle
     */
    protected function updatePicksForEvent(Event $event): void
    {
        Pick::where('event_id', $event->id)->get()->each(function (Pick $pick) use ($event) {
            $pick->is_correct = ($pick->selected_outcome === $event->result);
            $pick->save();
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

        // DÜZELTME: Sezon ID'si mantığı kaldırıldı.
        // $seasonId = $event->week ? $event->week->season_id : null;

        // Benzersiz user_id'leri al
        $userIds = $picks->pluck('user_id')->unique();

        foreach ($userIds as $userId) {
            // DÜZELTME: Artık sezon ID'si göndermiyoruz.
            $this->recalculateUserScore($userId);
        }
    }

    /**
     * Kullanıcının score'unu yeniden hesapla
     * Artık SADECE genel toplamı (sezondan bağımsız) hesaplar.
     */
    public function recalculateUserScore(int $userId): void
    {
        // 1. Bu kullanıcıya ait TÜM (sezondan bağımsız) doğrulanmış tahminleri al
        $allPicksQuery = Pick::where('user_id', $userId)
            ->whereNotNull('is_correct');

        // 2. Toplam tahmin sayısını ve doğru tahmin sayısını al
        $totalPicks = $allPicksQuery->count();
        $correctPicks = $allPicksQuery->clone()->where('is_correct', true)->count(); // clone() önemli

        // 3. Kullanıcının tek, genel skor kaydını bul veya oluştur
        $userScore = UserScore::firstOrNew([
            'user_id' => $userId,
            'season_id' => null, // Her zaman null
        ]);

        // 4. Puanları güncelle
        $userScore->total_picks = $totalPicks;
        $userScore->correct_picks = $correctPicks;
        $userScore->total_points = $correctPicks; // Puanlama: 1 doğru tahmin = 1 puan

        $userScore->save();
    }
}