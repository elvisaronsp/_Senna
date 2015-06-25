<?php

namespace Produto\Controller;

use Zend\Mvc\Controller\AbstractActionController,
	Zend\View\Model\ViewModel;

class IndexController extends AbstractActionController
{
    public function indexAction()
    {
        $viewModel = new ViewModel();
		$viewModel->setTerminal(true);
		return $viewModel;
    }
}
