<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Event;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class DeleteEventController extends AbstractDeleteController
{
    protected function delete(ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertPermission('pickem.manage');

        $id = Arr::get($request->getQueryParams(), 'id');
        $event = Event::findOrFail($id);

        $event->delete();
    }
}