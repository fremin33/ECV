<?php

namespace AppBundle\EventListener;

use Doctrine\Common\EventSubscriber;
use AppBundle\Entity\Task;
use Doctrine\Common\Persistence\Event\LifecycleEventArgs;

class TaskSubscriber implements EventSubscriber
{
    public function getSubscribedEvents()
    {
        return array(
            'prePersist'
        );
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $this->setPosition($args);
    }

    private function setPosition(LifecycleEventArgs $args)
    {
        $entity = $args->getObject();

        if (!$entity instanceof Task) {
            return;
        }
        $manager = $entityManager = $args->getObjectManager();
        $entity->setPosition($manager->getRepository(Task::class)->getMaxPosition() + 1);
    }
}
