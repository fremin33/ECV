<?php

namespace AppBundle\Handler;

use AppBundle\Entity\Task;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use AppBundle\Event\PositionUpdatedEvent;

class TaskUpdatePositionHandler
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
