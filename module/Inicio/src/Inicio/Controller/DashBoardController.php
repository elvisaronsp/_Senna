<?php
namespace Inicio\Controller;

/**
 * @author Jefferson Fernandes
 * @date 08/11/2014
 * @time 13:23:12
 * @project_name  Senna -- Grupo Capital Ponto
 */

use Zend\Mvc\Controller\AbstractActionController,
Zend\View\Model\ViewModel;
class DashBoardController extends AbstractActionController{
	
	public function indexAction()
	    {
		$viewModel = new ViewModel();
		$viewModel->setTerminal(true);
		return $viewModel;
	    }
	
}