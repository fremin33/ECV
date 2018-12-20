<?php
/**
 * Created by PhpStorm.
 * User: alex
 * Date: 28/11/18
 * Time: 00:22
 */

class PositionSorterTest extends \Symfony\Bundle\FrameworkBundle\Test\WebTestCase
{
    public function testUp()
    {
        $positionSorter = new \AppBundle\Service\PositionSorter();
        $task = new \AppBundle\Entity\Task();
        $entityClassName = \AppBundle\Entity\Task::class;
        static::bootKernel();
        $manager = static::$kernel->getContainer()->get('doctrine.orm.entity_manager');
        $positionStart = 3;
        $positionEnd = 0;
        $movement = 'up';
        $positionSorter->sort($task, $entityClassName, $manager, $positionStart, $positionEnd, $movement);
        $this->assertNotNull($manager);
    }

    public function testDown()
    {
        $positionSorter = new \AppBundle\Service\PositionSorter();
        $task = new \AppBundle\Entity\Task();
        $entityClassName = \AppBundle\Entity\Task::class;
        static::bootKernel();
        $manager = static::$kernel->getContainer()->get('doctrine.orm.entity_manager');
        $positionStart = 0;
        $positionEnd = 3;
        $movement = 'down';
        $positionSorter->sort($task, $entityClassName, $manager, $positionStart, $positionEnd, $movement);
        $this->assertNotNull($manager);
    }
}