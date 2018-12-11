<?php
/**
 * Created by PhpStorm.
 * User: alex
 * Date: 27/11/18
 * Time: 20:47
 */
namespace AppBundle\Form\DataTransformer;

use AppBundle\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\DataTransformerInterface;

class UserToStringTransformer implements DataTransformerInterface
{
    private $manager;

    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
    }

    public function transform($user)
    {
        if (null === $user) {
            return '';
        }

        return $user->getName();
    }

    public function reverseTransform($string)
    {
        if(empty($string)){
            return null;
        }
        $author = $this->manager
            ->getRepository(User::class)
            ->findOneBy(['name' => $string])
        ;

        if (null === $author) {
            $author = new User();
            $author->setName($string);
            $this->manager->persist($author);
        }

        return $author;
    }
}