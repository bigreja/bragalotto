<?php

/*
 * This file is part of huseyinfiliz/pickem.
 *
 * Copyright (c) 2024 Huseyin Filiz.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace HuseyinFiliz\Pickem;

use Flarum\Extend;
use Flarum\User\User;
use HuseyinFiliz\Pickem\Access\PickemPolicy;
use HuseyinFiliz\Pickem\Api\Controller;
use HuseyinFiliz\Pickem\Api\Serializer;

return [
    // Register frontend assets
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less')
        ->route('/pickem', 'pickem'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),

    // Register locale
    new Extend\Locales(__DIR__.'/resources/locale'),

    // Register API routes
    (new Extend\Routes('api'))
        // Teams
        ->get('/pickem-teams', 'pickem.teams.index', Controller\ListTeamsController::class)
        ->post('/pickem-teams', 'pickem.teams.create', Controller\CreateTeamController::class)
        ->patch('/pickem-teams/{id}', 'pickem.teams.update', Controller\UpdateTeamController::class)
        ->delete('/pickem-teams/{id}', 'pickem.teams.delete', Controller\DeleteTeamController::class)

        // Seasons
        ->get('/pickem-seasons', 'pickem.seasons.index', Controller\ListSeasonsController::class)
        ->post('/pickem-seasons', 'pickem.seasons.create', Controller\CreateSeasonController::class)

        // Weeks
        ->get('/pickem-weeks', 'pickem.weeks.index', Controller\ListWeeksController::class)
        ->post('/pickem-weeks', 'pickem.weeks.create', Controller\CreateWeekController::class)

        // Events
        ->get('/pickem-events', 'pickem.events.index', Controller\ListEventsController::class)
        ->post('/pickem-events', 'pickem.events.create', Controller\CreateEventController::class)
        ->patch('/pickem-events/{id}', 'pickem.events.update', Controller\UpdateEventController::class)

        // Picks
        ->get('/pickem-picks', 'pickem.picks.index', Controller\ListPicksController::class)
        ->post('/pickem-picks', 'pickem.picks.create', Controller\CreatePickController::class)

        // Leaderboard
        ->get('/pickem-user-scores', 'pickem.leaderboard.index', Controller\ListLeaderboardController::class),

    // Register API serializers
    (new Extend\ApiSerializer(\Flarum\Api\Serializer\ForumSerializer::class))
        ->attributes(function ($serializer) {
            return [
                'pickem.canManage' => $serializer->getActor()->isAdmin(),
            ];
        }),

    // Register models for API
    (new Extend\Model(User::class))
        ->relationship('pickemPicks', function ($model) {
            return $model->hasMany(Pick::class, 'user_id');
        })
        ->relationship('pickemScores', function ($model) {
            return $model->hasMany(UserScore::class, 'user_id');
        }),

    // Register model observers
    (new Extend\ServiceProvider())
        ->register(Provider\PickemServiceProvider::class),

    // Register notification type
    (new Extend\Notification())
        ->type(Notification\EventResultBlueprint::class, Serializer\EventSerializer::class, ['alert', 'email']),

    // Register permissions
    (new Extend\Policy())
        ->modelPolicy(User::class, PickemPolicy::class),

    // Register console commands (optional, for future use)
    // (new Extend\Console())
    //     ->command(Console\CalculateScoresCommand::class),
];