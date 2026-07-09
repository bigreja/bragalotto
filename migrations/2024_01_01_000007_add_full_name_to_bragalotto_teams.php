<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('bragalotto_teams', function (Blueprint $table) {
            $table->string('full_name')->nullable()->after('name');
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('bragalotto_teams', function (Blueprint $table) {
            $table->dropColumn('full_name');
        });
    }
];
