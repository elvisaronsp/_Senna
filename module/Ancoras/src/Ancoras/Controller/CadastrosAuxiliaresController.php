<?php

namespace Ancoras\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class CadastrosAuxiliaresController extends AbstractActionController
{
    public function indexAction()
    {
	$viewModel = new ViewModel();
	$viewModel->setTerminal(true);
	return $viewModel;
    }
}
