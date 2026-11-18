<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('bragalotto_weeks', function (Blueprint $table) {
            $table->timestamp('reminder_sent_at')->nullable();
            $table->unsignedInteger('reminder_last_user_id')->default(0);
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('bragalotto_weeks', function (Blueprint $table) {
            $table->dropColumn(['reminder_sent_at', 'reminder_last_user_id']);
        });
    },
];