<?php

namespace HuseyinFiliz\Pickem\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use HuseyinFiliz\Pickem\Week;

class WeekSerializer extends AbstractSerializer
{
    protected $type = 'pickem-weeks';

    /**
     * Get the default set of serialized attributes for a model.
     *
     * @param Week $week
     * @return array
     */
    protected function getDefaultAttributes($week)
    {
        return [
            'id' => $week->id,
            'name' => $week->name,
            'seasonId' => $week->season_id,
            'weekNumber' => $week->week_number,
            'startDate' => $this->formatDate($week->start_date),
            'endDate' => $this->formatDate($week->end_date),
            'createdAt' => $this->formatDate($week->created_at),
            'updatedAt' => $this->formatDate($week->updated_at),
        ];
    }

    /**
     * Get season relationship
     */
    public function season($week)
    {
        // EKLENDİ: İlişki null ise (yani haftanın sezonu yoksa)
        // Flarum'un çökmemesi için null döndür.
        if (!$week->season) {
            return null;
        }
        return $this->hasOne($week, SeasonSerializer::class);
    }

    /**
     * Get events relationship
     */
    public function events($week)
    {
        // DÜZELTME: Bu ilişki de null olabilir, 
        // en iyi pratik olarak buraya da kontrol ekleyelim.
        if (!$week->events) {
            return null;
        }
        return $this->hasMany($week, EventSerializer::class);
    }
}