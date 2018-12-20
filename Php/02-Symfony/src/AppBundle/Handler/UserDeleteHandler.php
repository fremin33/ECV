<?php
/**
 * Created by PhpStorm.
 * User: alex
 * Date: 27/11/18
 * Time: 15:16
 */

namespace AppBundle\Handler;


use AppBundle\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

class UserDeleteHandler
{
    private $manager;

    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
    }

    public function handle(User $user)
    {
        $this->manager->remove($user);
        $this->manager->flush();
        return true;
    }
}