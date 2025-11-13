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
            'status' => ['string', Rule::in(['scheduled', 'closed', 'finished', 'cancelled'])],
            
            'homeScore' => ['nullable', 'integer', 'min:0', 'required_with:awayScore'],
            'awayScore' => ['nullable', 'integer', 'min:0', 'required_with:homeScore'],
        ];
    }

    /**
     * DÜZELTME: getMessages() metodu artık hardcoded Türkçe metin yerine
     * locale anahtarlarını döndürüyor.
     */
    protected function getMessages()
    {
        // Flarum, bu anahtarları 'huseyinfiliz-pickem.' önüne otomatik ekleyecektir.
        // Ancak biz burada tam yolu (validation.errors.xxx) kullanalım.
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