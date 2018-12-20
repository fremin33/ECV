<?php

namespace AppBundle\EventListener;

use AppBundle\Entity\Task;
use AppBundle\Service\PositionSorter;
use Symfony\Component\HttpFoundation\RequestStack;
use AppBundle\Event\PositionUpdatedEvent;

class PositionTaskListener
{
    private $positionSorter;
    private $requestStack;

    public function __construct(PositionSorter $positionSorter, RequestStack $requestStack) 
    {
        $this->requestStack = $requestStack;
        $this->positionSorter = $positionSorter;
    }

    public function onPositionUpdate(PositionUpdatedEvent $event)
    {
        $this->sortPosition($event);
    }

    private function sortPosition(PositionUpdatedEvent $event)
    {
        $task = $event->getTask();
        $entityClassName = Task::class;
        $manager = $event->getManager();
        $request = $this->requestStack->getCurrentRequest();
        $positionStart = $request->request->get('start_position');
        $positionEnd = $request->request->get('end_position');
        $movement = $request->request->get('movement');
        $this->positionSorter->sort($task, $entityClassName, $manager, $positionStart, $positionEnd, $movement);
    }
}
