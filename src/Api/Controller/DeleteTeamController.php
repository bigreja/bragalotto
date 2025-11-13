<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Team;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Illuminate\Contracts\Translation\Translator; // YENİ: Translator import et

class DeleteTeamController extends AbstractDeleteController
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
        $actor->assertCan('pickem.manage');

        $id = Arr::get($request->getQueryParams(), 'id');
        $team = Team::findOrFail($id);

        if ($team->homeEvents()->exists() || $team->awayEvents()->exists()) {
            // DÜZELTME: Hardcoded metin yerine locale anahtarı kullan
            throw new ValidationException([
                'message' => $this->translator->trans('huseyinfiliz-pickem.validation.errors.team_in_use')
            ]);
        }

        $team->delete();
    }
}