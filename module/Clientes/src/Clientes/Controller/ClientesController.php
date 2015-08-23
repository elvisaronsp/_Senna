<?php
namespace Clientes\Controller;

use Senna\Controller\GrudController;
use Zend\Authentication\AuthenticationService;
use Zend\Authentication\Storage\Session as SessionStorage;
use Zend\View\Model\ViewModel;

/**
 * Class ClientesController
 * @package Clientes\Controller
 */
class ClientesController extends GrudController
{

    /**
     * Construto da classe ClientesController
     */
    public function __construct()
    {
        $this->entity         = "Clientes\Entity\Clientes";
        $this->service        = "Clientes\Service\Clientes";
        $this->contatos       = "Clientes\Entity\Contatos";
        $this->enderecos      = "Clientes\Entity\Enderecos";
        $this->form           = "Clientes\Form\Cliente";
        $this->message_insert = "Cliente CADASTRADO com sucesso";
        $this->message_update = "Cliente ATUALIZADO com sucesso";
        $this->message_delete = "Cliente EXCLUIDO com sucesso";
    }


    /**
     * @return ViewModel
     */
    public function FormAction()
    {
        $form = $this->getServiceLocator()->get($this->form);

        $auth = new AuthenticationService;
        $auth->setStorage(new SessionStorage("Usuario"));
        //$form->get('empresa')->setAttribute('value', $auth->getIdentity()->getEmpresa()->getId());

        $repository = $this->getEm()->getRepository($this->entity);
        $retorno = array('form' => $form);
        if ($this->params()->fromRoute('id', 0)) {
            $entity = $repository->find($this->params()->fromRoute('id', 0));
            $form->setData($entity->toArray());
            $this->setValueForm($form, $entity->toArray());
            $retorno = array('form' => $form);
        }
        $viewModel = new ViewModel ($retorno);
        $viewModel->setTerminal(true);

        return $viewModel;
    }

}