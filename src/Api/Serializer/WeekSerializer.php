<?php

namespace bigreja\bragalotto\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use bigreja\bragalotto\Week;

class WeekSerializer extends AbstractSerializer
{
    protected $type = 'bragalotto-weeks';

    protected function getDefaultAttributes($week)
    {
        return [
            'id' => (string) $week->id,
            'name' => $week->name,
            'seasonId' => $week->season_id,
            'weekNumber' => $week->week_number,
            'startDate' => $this->formatDate($week->start_date),
            'endDate' => $this->formatDate($week->end_date),
            'createdAt' => $this->formatDate($week->created_at),
            'updatedAt' => $this->formatDate($week->updated_at),
        ];
    }

    public function season($week)
    {
        if (!$week->season) {
            return null;
        }
        return $this->hasOne($week, SeasonSerializer::class);
    }

    public function events($week)
    {
        if (!$week->events) {
            return null;
        }
        return $this->hasMany($week, EventSerializer::class);
    }
}