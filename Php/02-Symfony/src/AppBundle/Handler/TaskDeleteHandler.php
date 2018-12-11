<?php

namespace AppBundle\Handler;

use Doctrine\ORM\EntityManagerInterface;
use AppBundle\Entity\Task;

class TaskDeleteHandler
{
    private $manager;

    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
    }

    public function handle(Task $task)
    {
        $this->manager->remove($task);
        $this->manager->flush();
        return true;
    }
}