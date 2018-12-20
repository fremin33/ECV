<?php

namespace AppBundle\Event;

use Symfony\Component\EventDispatcher\Event;
use AppBundle\Entity\Task;
use Doctrine\ORM\EntityManagerInterface;

class PositionUpdatedEvent extends Event
{
    const NAME = 'position.updated';

    protected $task;
    private $manager;

    public function __construct(Task $task, EntityManagerInterface $manager)
    {
        $this->task = $task;
        $this->manager = $manager;
    }

    public function getTask()
    {
        return $this->task;
    }

    public function getManager()
    {
        return $this->manager;
    }
}