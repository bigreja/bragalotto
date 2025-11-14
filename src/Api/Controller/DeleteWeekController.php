<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use HuseyinFiliz\Pickem\Week;

class DeleteWeekController extends AbstractDeleteControllerWithRelationCheck
{
    /**
     * {@inheritdoc}
     */
    protected function getModelClass(): string
    {
        return Week::class;
    }

    /**
     * {@inheritdoc}
     */
    protected function getRelationName(): string
    {
        // Week modelindeki 'events' ilişkisinin adı
        return 'events';
    }

    /**
     * {@inheritdoc}
     */
    protected function getErrorMessageKey(): string
    {
        return 'huseyinfiliz-pickem.validation.errors.week_in_use';
    }
}