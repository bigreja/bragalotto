<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Team;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class DeleteTeamController extends AbstractDeleteController
{
    protected function delete(ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $id = Arr::get($request->getQueryParams(), 'id');
        $team = Team::findOrFail($id);

        $team->delete();
    }
}
