<?php

// Tests/Controller/UserControllerTest.php

namespace AppBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use AppBundle\Repository\UserRepository;

class UserControllerTest extends WebTestCase
{
    public function testList()
    {
        $client = self::createClient();
        $client->request('GET', '/users');
        $this->assertTrue($client->getResponse()->isSuccessful());
    }

    public function testAdd()
    {
        $client = self::createClient();
        $crawler = $client->request('GET', '/user/add');
        $this->assertTrue($client->getResponse()->isSuccessful());

        $username = 'test' .rand();
        if ($client->getResponse()->isSuccessful()) {
            $form = $crawler->filter('.btn.btn-success')->last()->form();
            $form['appbundle_user[name]'] = $username;
            $client->submit($form);

            $this->assertTrue($client->getResponse()->isRedirection());
            $client->followRedirect();
            $this->assertTrue($client->getResponse()->isSuccessful());
            $this->assertContains(
                $username,
                $client->getResponse()->getContent()
            );
        }
    }
    
    public function testEdit()
    {
        $client = self::createClient();

        $crawler = $client->request('GET', '/users');
        $this->assertTrue($client->getResponse()->isSuccessful());
        $link = $crawler
            ->filter('.btn.btn-info')
            ->last()
            ->link();
        $crawler = $client->click($link);
        $this->assertTrue($client->getResponse()->isSuccessful());

        $usernameEdit = 'testedit' .rand();
        if ($client->getResponse()->isSuccessful()) {
            $form = $crawler->filter('.btn.btn-success')->last()->form();
            $form['appbundle_user[name]'] = $usernameEdit;
            $client->submit($form);

            $this->assertTrue($client->getResponse()->isRedirection());
            $client->followRedirect();

            $this->assertContains(
                $usernameEdit,
                $client->getResponse()->getContent()
            );
        }
    }

    public function testDelete()
    {
        $client = static::createClient();
        $crawler = $client->request('GET', '/users');
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