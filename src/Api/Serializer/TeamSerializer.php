<?php

namespace HuseyinFiliz\Pickem\Api\Serializer;

use Flarum\Api\Serializer\AbstractSerializer;
use HuseyinFiliz\Pickem\Team;

class TeamSerializer extends AbstractSerializer
{
    protected $type = 'pickem-teams';

    /**
     * Get the default set of serialized attributes for a model.
     *
     * @param Team $team
     * @return array
     */
    protected function getDefaultAttributes($team)
    {
        return [
            'id' => $team->id,
            'name' => $team->name,
            'slug' => $team->slug,
            'logoPath' => $team->logo_path,
            // Mantık artık Model'deki getLogoUrlAttribute() metodu tarafından yönetiliyor.
            // Bu, hem daha temiz hem de frontend'deki mantıkla tutarlı.
            'logoUrl' => $team->logo_url, 
            'createdAt' => $this->formatDate($team->created_at),
            'updatedAt' => $this->formatDate($team->updated_at),
        ];
    }
}