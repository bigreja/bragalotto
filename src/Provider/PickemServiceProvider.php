<?php

namespace HuseyinFiliz\Pickem\Provider;

use Flarum\Foundation\AbstractServiceProvider;
use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Observer\EventObserver;

class PickemServiceProvider extends AbstractServiceProvider
{
    public function boot()
    {
        Event::observe(EventObserver::class);
    }
}