<?php

namespace Bigreja\Bragalotto\Notification;

use Bigreja\Bragalotto\Week;
use Flarum\Database\AbstractModel;
use Flarum\Notification\AlertableInterface;
use Flarum\Notification\Blueprint\BlueprintInterface;
use Flarum\User\User;

class WeekStartingBlueprint implements BlueprintInterface, AlertableInterface
{
    public function __construct(public Week $week)
    {
    }

    public function getSubject(): ?AbstractModel
    {
        return $this->week;
    }

    public function getSender(): ?User
    {
        return null;
    }

    public function getFromUser(): ?User
    {
        return null;
    }

    public function getData(): mixed
    {
        return ['weekId' => $this->week->id, 'weekName' => $this->week->name];
    }

    public static function getType(): string
    {
        return 'bragalotto_week_starting';
    }

    public static function getSubjectModel(): string
    {
        return Week::class;
    }
}