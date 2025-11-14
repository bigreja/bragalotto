<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Api\Serializer\PickSerializer;
use HuseyinFiliz\Pickem\Event;
use HuseyinFiliz\Pickem\Pick;
use HuseyinFiliz\Pickem\Job\RecalculateUserScoreJob;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UpdatePickController extends AbstractShowController
{
    public $serializer = PickSerializer::class;
    public $include = ['event', 'event.homeTeam', 'event.awayTeam', 'user'];

    /**
     * @var Dispatcher
     */
    protected $bus;

    /**
     * @param Dispatcher $bus
     */
    public function __construct(Dispatcher $bus)
    {
        $this->bus = $bus;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $id = Arr::get($request->getQueryParams(), 'id');
        
        $pick = Pick::findOrFail($id);
        
        // Yeni PickPolicy'mizi kullanarak yetkiyi denetle
        $actor->assertCan('edit', $pick);

        $data = Arr::get($request->getParsedBody(), 'data.attributes', []);
        $selectedOutcome = Arr::get($data, 'selectedOutcome');

        $recalculateScore = false;

        if ($pick->selected_outcome !== $selectedOutcome) {
            $pick->selected_outcome = $selectedOutcome;
            $pick->is_correct = null; 

            if ($pick->event && $pick->event->isFinished()) {
                $recalculateScore = true;
            }
        }
        
        $pick->save();

        if ($recalculateScore) {
            $this->bus->dispatch(
                new RecalculateUserScoreJob($actor->id)
            );
        }

        $pick->load(['event.homeTeam', 'event.awayTeam', 'event.week', 'user']);

        return $pick;
    }
}