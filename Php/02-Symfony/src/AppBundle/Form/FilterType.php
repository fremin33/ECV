<?php

namespace AppBundle\Form;

use AppBundle\Entity\User;
use AppBundle\Form\EventListener\AuthorAutocompletedSubscriber;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Doctrine\ORM\EntityManagerInterface;


class FilterType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('complete', CheckboxType::class, [
                'required' => false
            ])
            ->add('author', EntityType::class, [
                'class' => User::class,
                'choice_label' => 'name',
                'required' => false
            ])
            ->add('field', ChoiceType::class,[
                'choices' => [
                    'priority' => 't.position',
                    'author' => 'u.name',
                    'complete' => 't.complete',
                    'title' => 't.title',
                    'new' => 't.id'
                ],

            ])
            ->add('order', ChoiceType::class,[
                'choices' => [
                    'croissant' => 'ASC',
                    'décroissant' => 'DESC',
                ],
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'Sort & Filter'
            ])
        ;
    }
}
