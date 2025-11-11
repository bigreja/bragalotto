<?php

namespace HuseyinFiliz\Pickem;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\User\User;

/**
 * @property int $id
 * @property int $user_id
 * @property int $event_id
 * @property string $selected_outcome
 * @property bool|null $is_correct
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Pick extends AbstractModel
{
    use ScopeVisibilityTrait;

    protected $table = 'pickem_picks';

    protected $fillable = ['user_id', 'event_id', 'selected_outcome', 'is_correct'];

    protected $casts = [
        'is_correct' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user who made this pick
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the event this pick is for
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Check if this pick is correct based on event result
     */
    public function checkCorrectness()
    {
        if ($this->event->result === null) {
            return null;
        }

        return $this->selected_outcome === $this->event->result;
    }
}
