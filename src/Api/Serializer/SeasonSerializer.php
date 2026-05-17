<?php

namespace bigreja\bragalotto\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use bigreja\bragalotto\Season;

class SeasonSerializer extends AbstractSerializer
{
    protected $type = 'bragalotto-seasons';

    protected function getDefaultAttributes($season)
    {
        return [
            'id' => (string) $season->id,
            'name' => $season->name,
            'slug' => $season->slug,
            'startDate' => $this->formatDate($season->start_date),
            'endDate' => $this->formatDate($season->end_date),
            'createdAt' => $this->formatDate($season->created_at),
            'updatedAt' => $this->formatDate($season->updated_at),
        ];
    }

    public function weeks($season)
    {
        if (!$season->weeks) {
            return null;
        }
        return $this->hasMany($season, WeekSerializer::class);
    }
}