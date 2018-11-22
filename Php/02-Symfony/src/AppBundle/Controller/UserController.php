<?php

namespace AppBundle\Controller;

use AppBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Exception\RequestExceptionInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use AppBundle\Handler\AddUserHandler;
use AppBundle\Form\UserType;

class UserController extends Controller
{
    /**
     * @Route("/user/add", name="user_add")
     */
    public function addAction(Request $request, AddUserHandler $handler)
    {
        $form = $this->createForm(UserType::class)->handleRequest($request);
        if ($handler->handle($form)) {
            return $this->redirectToRoute('task_add');
        }
        return $this->render('user/add.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/user/test", name="user_test")
     */
    public function test(Request $request, EntityManagerInterface $manager) {
        if ($request->isXmlHttpRequest()) {
            $word = $_POST['word'];
            var_dump($manager->getRepository(User::class)->findByWord($word));die;
        }
    }
}
