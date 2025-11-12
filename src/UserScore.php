<?php

namespace HuseyinFiliz\Pickem;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\User\User;

/**
 * @property int $id
 * @property int $user_id
 * @property int|null $season_id
 * @property int $total_points
 * @property int $total_picks
 * @property int $correct_picks
 * @property float $accuracy
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * * @property-read User $user
 * @property-read Season|null $season
 */
class UserScore extends AbstractModel
{
    use ScopeVisibilityTrait;

    protected $table = 'pickem_user_scores';

    protected $fillable = [
        'user_id',
        'season_id',
        'total_points',
        'total_picks',
        'correct_picks',
        'accuracy',
    ];

    protected $casts = [
        'total_points' => 'integer',
        'total_picks' => 'integer',
        'correct_picks' => 'integer',
        'accuracy' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Boot the model
     */
    public static function boot()
    {
        parent::boot();

        // Auto-calculate accuracy when saving
        static::saving(function (UserScore $userScore) {
            if ($userScore->total_picks > 0) {
                $userScore->accuracy = round(
                    ($userScore->correct_picks / $userScore->total_picks) * 100,
                    2
                );
            } else {
                $userScore->accuracy = 0;
            }
        });
    }

    /**
     * Relationships
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function season()
    {
        return $this->belongsTo(Season::class);
    }

    /**
     * Query Scopes
     */
    public function scopeForUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeForSeason($query, ?int $seasonId)
    {
        return $query->where('season_id', $seasonId);
    }

    public function scopeTopScorers($query, int $limit = 10)
    {
        return $query->orderBy('total_points', 'desc')
                     ->orderBy('correct_picks', 'desc')
                     ->orderBy('total_picks', 'asc')
                     ->limit($limit);
    }

    /**
     * Helper Methods
     */
    public function getIncorrectPicks(): int
    {
        return $this->total_picks - $this->correct_picks;
    }

    public function getAccuracyPercentage(): float
    {
        return $this->accuracy;
    }

    public function hasAnyPicks(): bool
    {
        return $this->total_picks > 0;
    }

    // getRank() metodu kaldırıldı.
    // Sıralama (rank) JavaScript tarafında (client-side) 
    // LeaderboardPage.js ve PickemPage.js içinde .sort() ile yapılıyor.
    // Bu, modeli sadeleştirir ve "ölü kod" (dead code) kaldırılmış olur.

    /**
     * Get formatted accuracy string
     */
    public function getFormattedAccuracy(): string
    {
        return number_format($this->accuracy, 1) . '%';
    }
}