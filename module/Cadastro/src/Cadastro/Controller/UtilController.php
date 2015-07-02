<?php

namespace Cadastro\Controller;

use Zend\Mvc\Controller\AbstractActionController,
	Zend\View\Model\ViewModel;

class UtilController extends AbstractActionController
{
    public function indexAction()
    {
        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }

    public function getTiposCadastrosAction()
    {


        print json_encode(array(array("id"=>"1","value"=>"EMAIL"),array("id"=>"2","value"=>"FAX"),array("id"=>"3","value"=>"TELEFONE")));
        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }
}
