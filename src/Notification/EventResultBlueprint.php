<?php

namespace HuseyinFiliz\Pickem\Notification;

use Flarum\Notification\Blueprint\BlueprintInterface;
use HuseyinFiliz\Pickem\Event;

/**
 * Event result açıklandığında bildirim
 */
class EventResultBlueprint implements BlueprintInterface
{
    public $event;

    public function __construct(Event $event)
    {
        $this->event = $event;
    }

    public function getSubject()
    {
        return $this->event;
    }

    public function getSender()
    {
        return null; // Sistem bildirimi
    }

    public function getFromUser()
    {
        return null;
    }

    public function getData()
    {
        return [
            'eventId' => $this->event->id,
            'homeTeam' => $this->event->homeTeam ? $this->event->homeTeam->name : 'Home',
            'awayTeam' => $this->event->awayTeam ? $this->event->awayTeam->name : 'Away',
            'result' => $this->event->result,
            'homeScore' => $this->event->home_score,
            'awayScore' => $this->event->away_score,
        ];
    }

    public static function getType()
    {
        return 'pickem_event_result';
    }

    public static function getSubjectModel()
    {
        return Event::class;
    }
}