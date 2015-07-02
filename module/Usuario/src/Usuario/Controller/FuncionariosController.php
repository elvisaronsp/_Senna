<?php
namespace Usuario\Controller;

use Senna\Controller\GrudController;
use Zend\View\Model\ViewModel;

/**
 * Class PerfisController
 * @package Acl\Controller
 */
class FuncionariosController extends GrudController {


    /**
     * contrutor da classe FuncionariosController
     */
    public function __construct()
    {
        $this->entity = "Usuario\Entity\Funcionarios";
        $this->service = "Usuario\Service\Funcionarios";
        $this->form = "Usuario\Form\Funcionarios";
        $this->message_insert = "Usuario de acesso CADASTRADO com sucesso";
        $this->message_update = "Usuario de acesso ATUALIZADO com sucesso";
        $this->message_delete = "Usuario de acesso EXCLUIDO com sucesso";
    }

    /**
     * @return ViewModel
     */
    public function FormAction() {

        $form = $this->getServiceLocator()->get( $this->form );
        $repository = $this->getEm()->getRepository($this->entity);

        $retorno = array ('form' => $form );

        if ($this->params ()->fromRoute ( 'id', 0 ))
        {
            $entity = $repository->find($this->params ()->fromRoute ( 'id', 0 ));
            $form->setData($entity->toArray());

            $retorno = array (
                'form' => $form,
            );
        }

        $viewModel = new ViewModel ( $retorno );
        $viewModel->setTerminal ( true );
        return $viewModel;
    }

    public function MapaAction() {
        $viewModel = new ViewModel ( );
        $viewModel->setTerminal ( true );
        return $viewModel;
    }
}