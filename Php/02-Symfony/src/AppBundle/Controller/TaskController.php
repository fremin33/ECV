<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Task;
use AppBundle\Entity\User;
use AppBundle\Form\FilterType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use AppBundle\Handler\TaskAddHandler;
use AppBundle\Handler\TaskCheckHandler;
use AppBundle\Handler\TaskDeleteHandler;
use AppBundle\Form\TaskType;
use AppBundle\Handler\TaskUpdatePositionHandler;
use AppBundle\Handler\TaskUpdateHandler;


class TaskController extends Controller
{
    /**
     * @Route("/", name="task_list")
     */
    public function listAction(EntityManagerInterface $manager, Request $request)
    {
        $form = $this->createForm(FilterType::class, ['field' => 't.position', 'order' => 'ASC'])->handleRequest($request);
        return $this->render('task/list.html.twig', [
            'tasks' => $manager->getRepository(Task::class)->getFilteredTasks($form->getData()),
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/task/add", name="task_add")
     */
    public function addAction(EntityManagerInterface $manager, Request $request, TaskAddHandler $handler)
    {
        $form = $this->createForm(TaskType::class)->handleRequest($request);
        $users = $manager->getRepository(User::class)->findAll();

        if ($handler->handle($form, true)) {
            return $this->redirectToRoute('task_list');
        }
        return $this->render('task/add.html.twig', [
            'form' => $form->createView(),
            'users' => $users
        ]);
    }

    /**
     * @Route("/task/check/{id}", name="task_check")
     */
    public function checkAction(Task $task, TaskCheckHandler $handler)
    {
        $handler->handle($task);
        return $this->redirectToRoute('task_list');
    }

    /**
     * @Route("/task/update/{id}", name="task_update")
     */
    public function updateAction(Task $task, TaskUpdateHandler $handler, Request $request)
    {
        $form = $this->createForm(TaskType::class, $task)->handleRequest($request);
        if ($handler->handle($form)) {
            return $this->redirectToRoute('task_list');
        }
        return $this->render('task/update.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/task/update/position/{id}", name="task_update_position")
     */
    public function updatePositionAction(Task $task, TaskUpdatePositionHandler $handler)
    {
        $handler->handle($task);
        return $this->redirectToRoute('task_list');
    }

    /**
     * @Route("/task/delete/{id}", name="task_delete")
     */
    public function deleteAction(Task $task, TaskDeleteHandler $handler)
    {
        $handler->handle($task);
        return $this->redirectToRoute('task_list');
    }
}
