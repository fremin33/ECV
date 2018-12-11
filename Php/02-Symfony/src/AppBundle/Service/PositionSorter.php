<?php

namespace AppBundle\Service;


class PositionSorter
{
	private $array = [];
	private $increment;

    public function sort($entity, $entityClassName, $manager, $positionStart, $positionEnd, $movement)
    {
    	switch ($movement) {
    		case 'down':
		        $this->array = $manager->getRepository($entityClassName)->findByGreaterStartPositionAndLowerOrEqualEndPosition($positionStart, $positionEnd, $entity->getId());
		        $this->increment = -1; 
    			break;
    		
    		case 'up':
	            $this->array = $manager->getRepository($entityClassName)->findByLowerStartPositionAndGreaterOrEqualEndPosition($positionStart, $positionEnd, $entity->getId());
		        $this->increment = 1; 
    			break;
    	}
    	if (!empty($this->array)) {
            foreach ($this->array as $item) {
                $item->setPosition($item->getPosition() + $this->increment);
            }
        }

        if ($positionEnd !== null) {
            $entity->setPosition($positionEnd);
        }
    }
}