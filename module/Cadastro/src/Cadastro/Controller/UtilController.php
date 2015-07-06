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
        print json_encode(array(array("id"=>"1","value"=>"Telefone"),array("id"=>"3","value"=>"Twitter"),array("id"=>"2","value"=>"Email"),array("id"=>"5","value"=>"Fax"),array("id"=>"4","value"=>"SKIPE")));

        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }


    public function getTiposEnderecoAction()
    {
        print json_encode(array(array("id"=>"1","value"=>"COMERCIAL"),array("id"=>"2","value"=>"ENTREGA"),array("id"=>"3","value"=>"REDIDENCIAL")));

        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }
}
