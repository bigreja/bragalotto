<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Week;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class DeleteWeekController extends AbstractDeleteController
{
    protected function delete(ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertPermission('pickem.manage');

        $id = Arr::get($request->getQueryParams(), 'id');
        $week = Week::findOrFail($id);

        $week->delete();
    }
}