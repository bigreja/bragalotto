<?php

namespace HuseyinFiliz\Pickem\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use HuseyinFiliz\Pickem\Event;

class EventSerializer extends AbstractSerializer
{
    protected $type = 'pickem-events';

    /**
     * Get the default set of serialized attributes for a model.
     *
     * @param Event $event
     * @return array
     */
    protected function getDefaultAttributes($event)
    {
        return [
            'id' => $event->id,
            'weekId' => $event->week_id,
            'homeTeamId' => $event->home_team_id,
            'awayTeamId' => $event->away_team_id,
            'matchDate' => $this->formatDate($event->match_date),
            'cutoffDate' => $this->formatDate($event->cutoff_date),
            'allowDraw' => $event->allow_draw,
            'status' => $event->status,
            'homeScore' => $event->home_score,
            'awayScore' => $event->away_score,
            'result' => $event->result,
            'canPick' => $event->canPick(),
            'createdAt' => $this->formatDate($event->created_at),
            'updatedAt' => $this->formatDate($event->updated_at),
        ];
    }

    /**
     * Get week relationship
     */
    public function week($event)
    {
        return $this->hasOne($event, WeekSerializer::class);
    }

    /**
     * Get home team relationship
     */
    public function homeTeam($event)
    {
        return $this->hasOne($event, TeamSerializer::class);
    }

    /**
     * Get away team relationship
     */
    public function awayTeam($event)
    {
        return $this->hasOne($event, TeamSerializer::class);
    }

    /**
     * Get picks relationship
     */
    public function picks($event)
    {
        return $this->hasMany($event, PickSerializer::class);
    }
}
