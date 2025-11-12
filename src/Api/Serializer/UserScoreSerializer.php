<?php

namespace HuseyinFiliz\Pickem\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use Flarum\Api\Serializer\BasicUserSerializer;
use HuseyinFiliz\Pickem\UserScore;

class UserScoreSerializer extends AbstractSerializer
{
    protected $type = 'pickem-user-scores';

    /**
     * Get the default set of serialized attributes for a model.
     *
     * @param UserScore $score
     * @return array
     */
    protected function getDefaultAttributes($score)
    {
        // Accuracy'yi anlık hesapla
        $accuracy = 0;
        if ($score->total_picks > 0) {
            $accuracy = round(($score->correct_picks / $score->total_picks) * 100, 2);
        }

        return [
            'id' => (string) $score->id,
            'userId' => $score->user_id,
            'seasonId' => $score->season_id,
            'totalPoints' => (int) $score->total_points,
            'totalPicks' => (int) $score->total_picks,
            'correctPicks' => (int) $score->correct_picks,
            'accuracy' => $accuracy, // Hesaplanmış değer
            'createdAt' => $this->formatDate($score->created_at),
            'updatedAt' => $this->formatDate($score->updated_at),
        ];
    }

    /**
     * Get user relationship
     */
    public function user($score)
    {
        if (!$score->user) {
            return null;
        }
        return $this->hasOne($score, BasicUserSerializer::class, 'user');
    }

    /**
     * Get season relationship
     */
    public function season($score)
    {
        if (!$score->season) {
            return null;
        }
        return $this->hasOne($score, SeasonSerializer::class, 'season');
    }
}