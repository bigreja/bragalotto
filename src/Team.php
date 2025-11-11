<?php

namespace HuseyinFiliz\Pickem;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;

/**
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $logo_path
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Team extends AbstractModel
{
    use ScopeVisibilityTrait;

    protected $table = 'pickem_teams';

    protected $fillable = ['name', 'slug', 'logo_path'];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get home events for this team
     */
    public function homeEvents()
    {
        return $this->hasMany(Event::class, 'home_team_id');
    }

    /**
     * Get away events for this team
     */
    public function awayEvents()
    {
        return $this->hasMany(Event::class, 'away_team_id');
    }
}
