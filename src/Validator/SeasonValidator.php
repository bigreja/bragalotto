<?php

namespace HuseyinFiliz\Pickem\Validator;

use Flarum\Foundation\AbstractValidator;
use Illuminate\Validation\Rule;

class SeasonValidator extends AbstractValidator
{
    protected function getRules()
    {
        $id = $this->model ? $this->model->id : null;
        
        // 'sometimes' kuralı, bu alanın sadece PATCH isteğinde gönderilirse
        // doğrulanacağı, POST (create) isteğinde ise zorunlu olduğu anlamına gelir.
        $required = $this->model ? 'sometimes' : 'required';

        return [
            'name' => [$required, 'string', 'max:100'],
            'slug' => [
                $required,
                'string',
                'max:100',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('pickem_seasons', 'slug')->ignore($id),
            ],
            'startDate' => ['nullable', 'date'],
            'endDate' => ['nullable', 'date', 'after_or_equal:startDate'],
        ];
    }
}