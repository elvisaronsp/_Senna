<?php

namespace Inicio\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class IndexController extends AbstractActionController
{
    public function indexAction()
    {
	$viewModel = new ViewModel();
	$viewModel->setTerminal(true);
	return $viewModel;
    }
}
