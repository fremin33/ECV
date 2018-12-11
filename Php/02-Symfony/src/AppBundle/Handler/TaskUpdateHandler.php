<?php
/**
 * Created by PhpStorm.
 * User: alex
 * Date: 27/11/18
 * Time: 14:09
 */

namespace AppBundle\Handler;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\FormInterface;

class TaskUpdateHandler
{
    private $manager;

    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
    }

    public function handle(FormInterface $form)
    {
        if ($form->isSubmitted() && $form->isValid()) {
            $this->manager->flush();
            return true;
        }

        return false;
    }
}