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
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class UserScore extends AbstractModel
{
    use ScopeVisibilityTrait;

    protected $table = 'pickem_user_scores';

    protected $fillable = ['user_id', 'season_id', 'total_points', 'total_picks', 'correct_picks'];

    protected $casts = [
        'total_points' => 'integer',
        'total_picks' => 'integer',
        'correct_picks' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user this score belongs to
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the season this score is for
     */
    public function season()
    {
        return $this->belongsTo(Season::class);
    }

    /**
     * Calculate accuracy percentage
     */
    public function getAccuracyAttribute()
    {
        if ($this->total_picks === 0) {
            return 0;
        }

        return round(($this->correct_picks / $this->total_picks) * 100, 2);
    }
}
