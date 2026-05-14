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
            'status' => ['string', Rule::in(['scheduled', 'closed', 'finished'])],
            
            'homeScore' => ['nullable', 'integer', 'min:0', 'required_with:awayScore'],
            'awayScore' => ['nullable', 'integer', 'min:0', 'required_with:homeScore'],
        ];
    }

    protected function getMessages()
    {
        // GÜNCELLENDİ: Yeni sadeleştirilmiş mesaj yapısı
        $prefix = 'huseyinfiliz-pickem.lib.messages.';

        return [
            'homeTeamId.different' => $prefix . 'same_team',
            'cutoffDate.before' => $prefix . 'cutoff_must_be_before_match',
            'homeScore.required_with' => $prefix . 'scores_required',
            'awayScore.required_with' => $prefix . 'scores_required',
            'homeTeamId.exists' => $prefix . 'invalid_reference',
            'awayTeamId.exists' => $prefix . 'invalid_reference',
            'weekId.exists' => $prefix . 'invalid_reference',
        ];
    }
}