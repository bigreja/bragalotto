<?php

namespace Bigreja\Bragalotto;

use Flarum\Foundation\AbstractServiceProvider;
use Flarum\User\User;

class BragalottoServiceProvider extends AbstractServiceProvider
{
    public function boot(): void
    {
        // Runs after core registers driver preferences, which default push to off for non-email types.
        User::registerPreference(
            User::getNotificationPreferenceKey(Notification\WeekStartingBlueprint::getType(), 'push'),
            boolval(...),
            true
        );
    }
}
