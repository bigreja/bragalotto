<?php

namespace HuseyinFiliz\Pickem\Validator;

use Flarum\Foundation\AbstractValidator;
use Illuminate\Validation\Rule;

class EventValidator extends AbstractValidator
{
    protected function getRules()
    {
        return [
            'homeTeamId' => [
                'required',
                'integer',
                Rule::exists('pickem_teams', 'id'),
                'different:awayTeamId'
            ],
            'awayTeamId' => [
                'required',
                'integer',
                Rule::exists('pickem_teams', 'id')
            ],
            'weekId' => [
                'nullable',
                'integer',
                Rule::exists('pickem_weeks', 'id')
            ],
            'matchDate' => ['required', 'date'],
            'cutoffDate' => ['required', 'date', 'before:matchDate'],
            'allowDraw' => ['boolean'],
            // 'cancelled' status removed from validation rule
            'status' => ['string', Rule::in(['scheduled', 'closed', 'finished'])],
            
            'homeScore' => ['nullable', 'integer', 'min:0', 'required_with:awayScore'],
            'awayScore' => ['nullable', 'integer', 'min:0', 'required_with:homeScore'],
        ];
    }

    protected function getMessages()
    {
        $prefix = 'huseyinfiliz-pickem.validation.errors.';

        return [
            'homeTeamId.different' => $prefix . 'same_team',
            'cutoffDate.before' => $prefix . 'cutoff_before_match',
            'homeScore.required_with' => $prefix . 'scores_must_be_together',
            'awayScore.required_with' => $prefix . 'scores_must_be_together',
            'homeTeamId.exists' => $prefix . 'team_exists',
            'awayTeamId.exists' => $prefix . 'team_exists',
            'weekId.exists' => $prefix . 'week_exists',
        ];
    }
}