<?php

namespace HuseyinFiliz\Pickem;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;

/**
 * @property int $id
 * @property int|null $week_id
 * @property int $home_team_id
 * @property int $away_team_id
 * @property \Carbon\Carbon $match_date
 * @property \Carbon\Carbon $cutoff_date
 * @property bool $allow_draw
 * @property string $status
 * @property int|null $home_score
 * @property int|null $away_score
 * @property string|null $result
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Event extends AbstractModel
{
    use ScopeVisibilityTrait;

    protected $table = 'pickem_events';

    protected $fillable = [
        'week_id', 'home_team_id', 'away_team_id',
        'match_date', 'cutoff_date', 'allow_draw',
        'status', 'home_score', 'away_score', 'result'
    ];

    protected $casts = [
        'match_date' => 'datetime',
        'cutoff_date' => 'datetime',
        'allow_draw' => 'boolean',
        'home_score' => 'integer',
        'away_score' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the week this event belongs to
     */
    public function week()
    {
        return $this->belongsTo(Week::class);
    }

    /**
     * Get the home team
     */
    public function homeTeam()
    {
        return $this->belongsTo(Team::class, 'home_team_id');
    }

    /**
     * Get the away team
     */
    public function awayTeam()
    {
        return $this->belongsTo(Team::class, 'away_team_id');
    }

    /**
     * Get picks for this event
     */
    public function picks()
    {
        return $this->hasMany(Pick::class);
    }

    /**
     * Check if picks are still allowed for this event
     */
    public function canPick()
    {
        return Carbon::now()->isBefore($this->cutoff_date) && $this->status === 'scheduled';
    }

    /**
     * Calculate the result based on scores
     */
    public function calculateResult()
    {
        if ($this->home_score === null || $this->away_score === null) {
            return null;
        }

        if ($this->home_score > $this->away_score) {
            return 'home';
        } elseif ($this->away_score > $this->home_score) {
            return 'away';
        } else {
            return 'draw';
        }
    }
}
