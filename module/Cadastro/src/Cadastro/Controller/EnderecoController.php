<?php

namespace Cadastro\Controller;

use Zend\Mvc\Controller\AbstractActionController,
	Zend\View\Model\ViewModel;

class EnderecoController extends AbstractActionController
{
    public function indexAction()
    {
        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }

    public function busqueEnderecoPorCepAction()
    {
        $cep = preg_replace('/\(|\)|-/', '',$this->params ()->fromRoute ( 'id', 0 ));

        $formato        = 'json';

        $serviceLocator = $this->getServiceLocator();
        $cepService     = $serviceLocator->get('InfanaticaCepModule\Service\CepService');
        $endereco       = $cepService->getEnderecoByCep($cep,$formato);

        echo "<pre>";
        print_r($endereco);
        echo "</pre>";




        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }
}
