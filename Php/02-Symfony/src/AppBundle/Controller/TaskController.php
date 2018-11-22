<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Task;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use AppBundle\Handler\AddTaskHandler;
use AppBundle\Handler\UpdateTaskHandler;
use AppBundle\Handler\DeleteTaskHandler;
use AppBundle\Form\TaskType;
use AppBundle\Handler\UpdateTaskPositionHandler;
use AppBundle\Event\PositionUpdatedEvent;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\EventDispatcher\Debug\TraceableEventDispatcher;
use Symfony\Component\Stopwatch\Stopwatch;
use AppBundle\EventListener\PositionTaskListener;
use Symfony\Component\HttpFoundation\RequestStack;
use AppBundle\Service\PositionSorter;



class TaskController extends Controller
{
    /**
     * @Route("/", name="task_list")
     */
    public function listAction(EntityManagerInterface $manager)
    {
        return $this->render('task/list.html.twig', [
            'tasks' => $manager->getRepository(Task::class)->findAll(),
        ]);
    }

    /**
     * @Route("/task/add", name="task_add")
     */
    public function addAction(Request $request, AddTaskHandler $handler)
    {
        $form = $this->createForm(TaskType::class)->handleRequest($request);
        if ($handler->handle($form, true)) {
            return $this->redirectToRoute('task_list');
        }
        return $this->render('task/add.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/task/update/{id}", name="task_update")
     */
    public function updateAction(Task $task, UpdateTaskHandler $handler)
    {
        $handler->handle($task);
        return $this->redirectToRoute('task_list');
    }

    /**
     * @Route("/task/update/position/{id}", name="task_update_position")
     */
    public function updatePositionAction(Task $task, UpdateTaskPositionHandler $handler)
    {
        $handler->handle($task);
        return $this->redirectToRoute('task_list');
    }

    /**
     * @Route("/task/delete/{id}", name="task_delete")
     */
    public function deleteAction(Task $task, DeleteTaskHandler $handler)
    {
        $handler->handle($task);
        return $this->redirectToRoute('task_list');
    }
}
