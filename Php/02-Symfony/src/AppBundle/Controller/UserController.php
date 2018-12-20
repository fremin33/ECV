<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Exception\RequestExceptionInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use AppBundle\Handler\UserAddHandler;
use AppBundle\Handler\UserUpdateHandler;
use AppBundle\Handler\UserDeleteHandler;
use AppBundle\Form\UserType;

class UserController extends Controller
{
    /**
     * @Route("/users", name="user_list")
     */
    public function listAction(EntityManagerInterface $manager)
    {
        return $this->render('user/list.html.twig', [
            'users' => $manager->getRepository(User::class)->findAll(),
        ]);
    }

    /**
     * @Route("/user/add", name="user_add")
     */
    public function addAction(Request $request, UserAddHandler $handler)
    {
        $form = $this->createForm(UserType::class)->handleRequest($request);
        if ($handler->handle($form)) {
            return $this->redirectToRoute('user_list');
        }
        return $this->render('user/add.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/user/update/{id}", name="user_update")
     */
    public function updateAction(User $user, UserUpdateHandler $handler, Request $request)
    {
        $form = $this->createForm(UserType::class, $user)->handleRequest($request);
        if ($handler->handle($form)) {
            return $this->redirectToRoute('user_list');
        }
        return $this->render('user/update.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/user/delete/{id}", name="user_delete")
     */
    public function deleteAction(User $user, UserDeleteHandler $handler)
    {
        $handler->handle($user);
        return $this->redirectToRoute('user_list');
    }
}
