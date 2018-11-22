<?php

namespace AppBundle\Handler;

use AppBundle\Entity\Task;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\Session\Flash\FlashBagInterface;
use AppBundle\Service\Handler\Handler;
use AppBundle\Event\PositionUpdatedEvent;
use Symfony\Component\EventDispatcher\EventDispatcher;
use Symfony\Component\EventDispatcher\Debug\TraceableEventDispatcher;
use Symfony\Component\Stopwatch\Stopwatch;
use AppBundle\EventListener\PositionTaskListener;

class UpdateTaskPositionHandler
{
    private $manager;
    private $dispatcher;

    public function __construct(EntityManagerInterface $manager, EventDispatcherInterface $dispatcher)
    {
        $this->manager = $manager;
        $this->dispatcher = $dispatcher;
    }

    public function handle(Task $task)
    {
        $event = new PositionUpdatedEvent($task, $this->manager);
        $this->dispatcher->dispatch('position.updated', $event);
        $this->manager->flush();
        return true;
    }
}
