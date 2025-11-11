<?php

namespace HuseyinFiliz\Pickem\Access;

use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

class PickemPolicy extends AbstractPolicy
{
    /**
     * Check if user can manage Pick'em (teams, seasons, events)
     */
    public function manage(User $actor)
    {
        if ($actor->hasPermission('pickem.manage')) {
            return $this->allow();
        }
    }

    /**
     * Check if user can make picks
     */
    public function makePicks(User $actor)
    {
        // All authenticated users can make picks by default
        return $this->allow();
    }

    /**
     * Check if user can view picks
     */
    public function viewPicks(User $actor)
    {
        // All authenticated users can view their own picks
        return $this->allow();
    }
}
