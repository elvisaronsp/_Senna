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

        $formato        = 'array';

        $serviceLocator = $this->getServiceLocator();
        $cepService     = $serviceLocator->get('InfanaticaCepModule\Service\CepService');
        $endereco       = $cepService->getEnderecoByCep($cep,$formato);

        if(!empty($endereco['logradouro'])) {
            $endereco['cep'] = $this->params ()->fromRoute ( 'id', 0 );
            $endereco['id'] = "1";
            $endereco['cidade'] = $endereco['localidade'];
            $endereco['cidade_cod'] = '4106902';
            $endereco['id_cidade'] = "9851";
            $endereco['pais_cod'] = "1058";
            $endereco['id_pais'] = "1";
            $endereco['pais'] = 'BRASIL';
            $endereco['id_estado'] = '17';
            $endereco['estado_nome'] = $endereco['uf'];
            $endereco['estado_cod'] = '41';
            unset($endereco['localidade']);
            unset($endereco['uf']);
            print json_encode($endereco);
        }else{
            json_encode(array("resultado"=>"0","server"=>"1"));
        }



        $viewModel = new ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }
}
