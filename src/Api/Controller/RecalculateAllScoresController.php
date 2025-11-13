<?php

namespace HuseyinFiliz\Pickem\Api\Controller;

use Flarum\Http\RequestUtil;
use HuseyinFiliz\Pickem\Pick;
use HuseyinFiliz\Pickem\Job\RecalculateUserScoreJob;
use Illuminate\Contracts\Bus\Dispatcher as BusDispatcher; // Sadece bu yeterli
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\RequestHandlerInterface;

class RecalculateAllScoresController implements RequestHandlerInterface
{
    /**
     * @var BusDispatcher
     */
    protected $bus;

    public function __construct(BusDispatcher $bus)
    {
        $this->bus = $bus;
    }

    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        // Sadece admin yetkisi olanlar bu işlemi yapabilir
        $actor = RequestUtil::getActor($request);
        $actor->assertPermission('pickem.manage');

        // 1. En az bir tahmini olan tüm benzersiz kullanıcı ID'lerini al
        $userIds = Pick::query()->distinct()->pluck('user_id');
        $jobCount = $userIds->count();

        if ($jobCount > 0) {
            // 2. DÜZELTME: Toplu iş (batch) kullanmak yerine, her kullanıcı için
            // tek tek görevleri kuyruğa gönder.
            // Flarum'un kurulu kuyruk sistemi (örn: database, redis)
            // bunları arka planda işleyecektir.
            // Kuyruk kurulu değilse (veya driver 'sync' ise), Flarum bunları 
            // anında, bu API isteği içinde sırayla çalıştırır.
            foreach ($userIds as $userId) {
                $this->bus->dispatch(new RecalculateUserScoreJob($userId));
            }
        }
        
        // 3. Admin paneline işlemin başladığına dair JSON yanıtı dön
        return new JsonResponse([
            'status' => 'dispatched', // 'queued' yerine 'dispatched' daha doğru
            'jobCount' => $jobCount,
        ]);
    }
}