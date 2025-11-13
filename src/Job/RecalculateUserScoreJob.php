<?php

namespace HuseyinFiliz\Pickem\Job;

use Flarum\Queue\AbstractJob;
use HuseyinFiliz\Pickem\Pick;
use HuseyinFiliz\Pickem\UserScore;
use Flarum\User\User;
use Illuminate\Database\DatabaseManager;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Carbon; // Carbon::now() kullanmayacağımız için bu satır silinebilir de

class RecalculateUserScoreJob extends AbstractJob
{
    /**
     * @var int
     */
    protected $userId;

    public function __construct(int $userId)
    {
        $this->userId = $userId;
    }

    public function handle(DatabaseManager $db)
    {
        if (User::find($this->userId) === null) {
            return;
        }

        $allPicksQuery = Pick::query()
            ->where('user_id', $this->userId)
            ->whereNotNull('is_correct');

        $totalPicks = $allPicksQuery->count();
        $correctPicks = $allPicksQuery->clone()->where('is_correct', true)->count();

        UserScore::where('user_id', $this->userId)->delete();

        if ($totalPicks > 0) {
            // DÜZELTME: created_at ve updated_at kaldırıldı.
            // Model (public $timestamps = true sayesinde) bunları
            // 'create' metodu içinde otomatik olarak halledecek.
            UserScore::create([
                'user_id' => $this->userId,
                'season_id' => null, 
                'total_picks' => $totalPicks,
                'correct_picks' => $correctPicks,
                'total_points' => $correctPicks,
            ]);
        }
    }
}