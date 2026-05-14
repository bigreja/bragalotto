<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('pickem_events', function (Blueprint $table) {
            $table->index('status');
            $table->index('match_date');
            $table->index('cutoff_date');
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('pickem_events', function (Blueprint $table) {
            $table->dropIndex(['status']);
            $table->dropIndex(['match_date']);
            $table->dropIndex(['cutoff_date']);
        });
    },
];
