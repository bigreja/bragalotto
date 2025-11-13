<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use Flarum\Notification\NotificationSyncer;
use HuseyinFiliz\Pickem\Api\Serializer\EventSerializer;
use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Pick;
use HuseyinFiliz\Pickem\UserScore;
use HuseyinFiliz\Pickem\Notification\EventResultBlueprint;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class EnterEventResultController extends AbstractShowController
{
    public $serializer = EventSerializer::class;
    public $include = ['homeTeam', 'awayTeam', 'week'];

    protected $notifications;

    public function __construct(NotificationSyncer $notifications)
    {
        $this->notifications = $notifications;
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

        // PICKS'LERİ GÜNCELLE
        $this->updatePicksForEvent($event);
        
        // SCORES'LARI GÜNCELLE
        $this->updateUserScoresForEvent($event);

        // BİLDİRİMLER GÖNDER
        $this->sendNotifications($event);

        $event->load(['homeTeam', 'awayTeam', 'week']);

        return $event;
    }

    protected function updatePicksForEvent(Event $event): void
    {
        Pick::where('event_id', $event->id)->get()->each(function (Pick $pick) use ($event) {
            $pick->is_correct = ($pick->selected_outcome === $event->result);
            $pick->save();
        });
    }

    protected function updateUserScoresForEvent(Event $event): void
    {
        $picks = Pick::where('event_id', $event->id)
            ->with('user')
            ->get();

        $seasonId = $event->week ? $event->week->season_id : null;

        // Benzersiz user_id'leri al
        $userIds = $picks->pluck('user_id')->unique();

        foreach ($userIds as $userId) {
            $this->recalculateUserScore($userId, $seasonId);
        }
    }

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
        
        $userScore->total_picks = $picks->count();
        $userScore->correct_picks = $picks->where('is_correct', true)->count();
        $userScore->total_points = $userScore->correct_picks;

        $userScore->save();
    }

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