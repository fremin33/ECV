<?php

namespace AppBundle\Service\Handler;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\Session\Flash\FlashBagInterface;

abstract class Handler implements HandlerInterface
{
	protected $manager;
	protected $flashBag;
	protected $data;
	protected $newData;

    public function __construct(EntityManagerInterface $manager, FlashBagInterface $flashBag)
    {
        $this->manager = $manager;
        $this->flashBag = $flashBag;
    }

    public function handle($data, $newData = false)
    {
    	$this->data = $data;
    	$this->newData = $newData;
    	switch ($data) {
    		case $data instanceof FormInterface:
				return ($data->isSubmitted() && $data->isValid())
                    ? $this->onSuccess()
                    : $this->onFailure();
    			break;
    		default:
    			return $this->onSuccess();
    			break;
    	}
    }

    protected function OnSuccess()
    {
    	if ($this->newData) {
			$this->data instanceof FormInterface ?
    			$this->manager->persist($this->data->getData()) :
    			$this->manager->persist($this->data);
    	}
    	$this->manager->flush();
    	$this->addFlash();
    	return true;
    }

    protected function Onfailure()
    {
    	return false;
    }
}