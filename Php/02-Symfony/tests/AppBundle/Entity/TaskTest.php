<?php

namespace AppBundle\Tests\Entity;

use PHPUnit\Framework\TestCase;
use AppBundle\Entity\Task;
use AppBundle\Entity\User;

class TaskTest extends TestCase
{
    public function testEntity()
    {
        $task = new Task();
        $task->setTitle('test');
        $task->setDescription('test');
        $task->setComplete(true);
        $task->setPosition(1);
        $this->assertEquals('test', $task->getTitle());
        $this->assertEquals('test', $task->getDescription());
        $this->assertEquals(true, $task->isComplete());
        $this->assertEquals(1, $task->getPosition());
        $this->assertNull($task->getId());
        $task->setId(9);
        $this->assertEquals(9, $task->getId());
    }

    public function testEntityRelations()
    {
        $user = new User;
        $task = new Task();        
        $task->setAuthor($user);
        $this->assertEquals($user, $task->getAuthor());
    }
}
