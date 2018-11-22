<?php

namespace AppBundle\Handler;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Session\Flash\FlashBagInterface;
use AppBundle\Service\Handler\Handler;

class AddTaskHandler extends Handler
{
    public function addFlash()
    {
        $this->flashBag->add('success', 'The new task has been successfully added !');
    }
}