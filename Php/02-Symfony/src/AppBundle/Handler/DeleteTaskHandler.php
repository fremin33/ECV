<?php

namespace AppBundle\Handler;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Session\Flash\FlashBagInterface;
use AppBundle\Entity\Task;

class DeleteTaskHandler
{
    private $manager;
    private $flashBag;

    public function __construct(EntityManagerInterface $manager, FlashBagInterface $flashBag)
    {
        $this->manager = $manager;
        $this->flashBag = $flashBag;
    }

    public function handle(Task $task)
    {
        $this->manager->remove($task);
        $this->manager->flush();
        $this->flashBag->add('success', 'The trick has been successfully deleted !');
        return true;
    }
}