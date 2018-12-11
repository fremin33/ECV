<?php

// Tests/Controller/TaskControllerTest.php

namespace AppBundle\Tests\Controller;

use AppBundle\Entity\Task;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class TaskControllerTest extends WebTestCase
{
    public function testList()
    {
        $client = static::createClient();
        $client->request('GET', '/');
        $this->assertTrue($client->getResponse()->isSuccessful());
    }

    public function testAdd()
    {
        $client = self::createClient();
        $crawler = $client->request('GET', '/task/add');
        $this->assertTrue($client->getResponse()->isSuccessful());

        if ($client->getResponse()->isSuccessful()) {
            $form = $crawler->filter('.btn.btn-success')->last()->form();
            $form['appbundle_task[author]'] = 'test';
            $form['appbundle_task[title]'] = 'test';
            $form['appbundle_task[description]'] = 'test';
            $client->submit($form);

            $this->assertTrue($client->getResponse()->isRedirection());
            $client->followRedirect();
            $this->assertTrue($client->getResponse()->isSuccessful());
            $this->assertContains(
                'test',
                $client->getResponse()->getContent()
            );
        }
    }
    
    public function testEdit()
    {
        $client = self::createClient();

        $crawler = $client->request('GET', '/');
        $this->assertTrue($client->getResponse()->isSuccessful());
        $link = $crawler
            ->filter('.btn.btn-info')
            ->last()
            ->link()
        ;
        $crawler = $client->click($link);
        $this->assertTrue($client->getResponse()->isSuccessful());

        if ($client->getResponse()->isSuccessful()) {
            $form = $crawler->filter('.btn.btn-success')->last()->form();
            $form['appbundle_task[description]'] = 'test edit';
            $client->submit($form);

            $this->assertTrue($client->getResponse()->isRedirection());
            $client->followRedirect();
            
            $this->assertContains(
                'test edit',
                $client->getResponse()->getContent()
            );
        }
    }

    public function testCheckTask()
    {
        $client = self::createClient();
        $crawler = $client->request('GET', '/');
        $this->assertTrue($client->getResponse()->isSuccessful());
        $link = $crawler
            ->filter('.btn.btn-success')
            ->last()
            ->link()
        ;
        $client->click($link);
        $this->assertTrue($client->getResponse()->isRedirection());
        $client->followRedirect();
        $this->assertTrue($client->getResponse()->isSuccessful());
    }

    public function testUpdatePosition()
    {
        $client = self::createClient();
        static::bootKernel();
        $manager = static::$kernel->getContainer()->get('doctrine.orm.entity_manager');
        $task = $manager->getRepository(Task::class)->findOneBy(['description' => 'test edit']);
        $client->request('GET', '/task/update/position/' .$task->getId());
        $this->assertTrue($client->getResponse()->isRedirection());
        $client->followRedirect();
        $this->assertTrue($client->getResponse()->isSuccessful());
    }

    public function testFindByGreaterStart()
    {
        static::bootKernel();
        $manager = static::$kernel->getContainer()->get('doctrine.orm.entity_manager');
        $test = $manager->getRepository(Task::class)->findByGreaterStartPositionAndLowerOrEqualEndPosition(0, 0);
        $this->assertNotNull($test);
    }

    public function testFindByLowerStart()
    {
        static::bootKernel();
        $manager = static::$kernel->getContainer()->get('doctrine.orm.entity_manager');
        $test = $manager->getRepository(Task::class)->findByLowerStartPositionAndGreaterOrEqualEndPosition(0, 0);
        $this->assertNotNull($test);
    }

    public function testDelete()
    {
       $client = static::createClient();
        $crawler = $client->request('GET', '/');
        $link = $crawler
        ->filter('.btn.btn-danger')
        ->last()
        ->link()
    ;
        $client->click($link);
        $this->assertTrue($client->getResponse()->isRedirection());
        $client->followRedirect();
        $this->assertTrue($client->getResponse()->isSuccessful());
	}
}