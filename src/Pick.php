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
 * 
 * @property-read User $user
 * @property-read Event $event
 */
class Pick extends AbstractModel
{
    use ScopeVisibilityTrait;

    protected $table = 'pickem_picks';

    protected $fillable = [
        'user_id', 
        'event_id', 
        'selected_outcome', 
        'is_correct'
    ];

    protected $casts = [
        'is_correct' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Boot the model
     */
    public static function boot()
    {
        parent::boot();

        // Auto-check correctness when saved if event has result
        static::saved(function (Pick $pick) {
            if ($pick->event && $pick->event->result !== null && $pick->is_correct === null) {
                $pick->checkAndUpdateCorrectness();
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

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Query Scopes
     */
    public function scopeForUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeForEvent($query, int $eventId)
    {
        return $query->where('event_id', $eventId);
    }

    public function scopeCorrect($query)
    {
        return $query->where('is_correct', true);
    }

    public function scopeIncorrect($query)
    {
        return $query->where('is_correct', false);
    }

    public function scopePending($query)
    {
        return $query->whereNull('is_correct');
    }

    /**
     * Helper Methods
     */
    public function isCorrect(): bool
    {
        return $this->is_correct === true;
    }

    public function isIncorrect(): bool
    {
        return $this->is_correct === false;
    }

    public function isPending(): bool
    {
        return $this->is_correct === null;
    }

    public function hasResult(): bool
    {
        return $this->is_correct !== null;
    }

    /**
     * Check if this pick is correct based on event result
     */
    public function checkCorrectness(): ?bool
    {
        if (!$this->event || $this->event->result === null) {
            return null;
        }

        return $this->selected_outcome === $this->event->result;
    }

    /**
     * Check and update correctness
     */
    public function checkAndUpdateCorrectness(): bool
    {
        $isCorrect = $this->checkCorrectness();
        
        if ($isCorrect !== null && $this->is_correct !== $isCorrect) {
            $this->is_correct = $isCorrect;
            $this->saveQuietly(); // Use saveQuietly to avoid triggering events
            return true;
        }

        return false;
    }

    /**
     * Get the outcome display name
     */
    public function getOutcomeDisplayName(): string
    {
        return match($this->selected_outcome) {
            Event::RESULT_HOME => $this->event?->homeTeam?->name ?? 'Home',
            Event::RESULT_AWAY => $this->event?->awayTeam?->name ?? 'Away',
            Event::RESULT_DRAW => 'Draw',
            default => 'Unknown',
        };
    }

    /**
     * Check if pick can be changed
     */
    public function canBeChanged(): bool
    {
        return $this->event && $this->event->canPick();
    }

    /**
     * Check if pick can be deleted
     */
    public function canBeDeleted(): bool
    {
        return $this->event && $this->event->canPick();
    }
}