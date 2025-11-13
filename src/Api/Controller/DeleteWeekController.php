<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Week;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Illuminate\Contracts\Translation\Translator; // YENİ: Translator import et

class DeleteWeekController extends AbstractDeleteController
{
    /**
     * @var Translator
     */
    protected $translator; // YENİ

    /**
     * @param Translator $translator
     */
    public function __construct(Translator $translator) // YENİ: Translator enjekte et
    {
        $this->translator = $translator;
    }

    protected function delete(ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertPermission('pickem.manage');

        $id = Arr::get($request->getQueryParams(), 'id');
        $week = Week::findOrFail($id);

        if ($week->events()->exists()) {
            // DÜZELTME: Hardcoded metin yerine locale anahtarı kullan
            throw new ValidationException([
                'message' => $this->translator->trans('huseyinfiliz-pickem.validation.errors.week_in_use')
            ]);
        }

        $week->delete();
    }
}