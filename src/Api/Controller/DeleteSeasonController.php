<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use HuseyinFiliz\Pickem\Season;

class DeleteSeasonController extends AbstractDeleteControllerWithRelationCheck
{
    /**
     * {@inheritdoc}
     */
    protected function getModelClass(): string
    {
        return Season::class;
    }

    /**
     * {@inheritdoc}
     */
    protected function getRelationName(): string
    {
        // Season modelindeki 'weeks' ilişkisinin adı
        return 'weeks';
    }

    /**
     * {@inheritdoc}
     */
    protected function getErrorMessageKey(): string
    {
        return 'huseyinfiliz-pickem.lib.validation.errors.season_in_use';
    }
}