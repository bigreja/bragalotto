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
        // DÜZELTME: Manuel hesaplama kaldırıldı.
        // $accuracy = 0;
        // if ($score->total_picks > 0) {
        //     $accuracy = round(($score->correct_picks / $score->total_picks) * 100, 2);
        // }

        return [
            'id' => (string) $score->id, // String olarak döndür
            'userId' => $score->user_id,
            'seasonId' => $score->season_id,
            'totalPoints' => (int) $score->total_points,
            'totalPicks' => (int) $score->total_picks,
            'correctPicks' => (int) $score->correct_picks,
            'accuracy' => $score->getAccuracyPercentage(),
			'rank' => (int) $score->calculateRank(),
            'createdAt' => $score->created_at ? $this->formatDate($score->created_at) : null,
            'updatedAt' => $score->updated_at ? $this->formatDate($score->updated_at) : null,
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