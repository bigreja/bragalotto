<?php

namespace HuseyinFiliz\Pickem\Validator;

use Flarum\Foundation\AbstractValidator;
use Illuminate\Validation\Rule;

class TeamValidator extends AbstractValidator
{
    protected function getRules()
    {
        // 'id' varsa (güncelleme ise), 'slug' kontrolünde bu ID'yi hariç tut
        $id = $this->model ? $this->model->id : null;

        return [
            'name' => ['required', 'string', 'max:100'],
            'slug' => [
                'required',
                'string',
                'max:100',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', // Slug formatı (örn: my-new-team)
                Rule::unique('pickem_teams', 'slug')->ignore($id), // Slug'ın benzersiz olmasını sağla
            ],
            'logoPath' => ['nullable', 'string', 'url', 'max:255'], // Geçerli bir URL olmalı
        ];
    }
}