<?php

namespace HuseyinFiliz\Pickem\Notification;

use Flarum\Notification\Blueprint\BlueprintInterface;
use Flarum\Notification\MailableInterface;
use HuseyinFiliz\Pickem\Event;
use Symfony\Contracts\Translation\TranslatorInterface;

/**
 * Notification blueprint for when event results are posted
 */
class EventResultBlueprint implements BlueprintInterface, MailableInterface
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
        return null;
    }

    public function getFromUser()
    {
        return null;
    }

    public function getData()
    {
        return ['eventId' => $this->event->id];
    }

    public static function getType()
    {
        return 'pickem_event_result';
    }

    public static function getSubjectModel()
    {
        return Event::class;
    }

    public function getEmailView()
    {
        return ['text' => 'pickem::emails.eventResult'];
    }

    public function getEmailSubject(TranslatorInterface $translator)
    {
        return $translator->trans('huseyinfiliz-pickem.email.event_result.subject');
    }
}
