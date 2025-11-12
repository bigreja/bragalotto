<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Season;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class DeleteSeasonController extends AbstractDeleteController
{
    protected function delete(ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertPermission('pickem.manage');

        $id = Arr::get($request->getQueryParams(), 'id');
        $season = Season::findOrFail($id);

        $season->delete();
    }
}