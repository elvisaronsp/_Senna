<?php
/**
 * Created by PhpStorm.
 * User: Jefferson
 * Date: 25/06/2015
 * Time: 15:03
 */

namespace Acl\Controller;
use Senna\Controller\GrudController;
use Zend\View\Model\ViewModel;
/**
 * Class PerfisController
 * @package Acl\Controller
 */
class PerfisController extends GrudController {

    /**
     * contrutor da classe PerfisController
     */
    public function __construct()
    {
        $this->entity = "Acl\Entity\Perfis";
        $this->service = "Acl\Service\Perfis";
        $this->message_insert = "Perfil de acesso cadastrado com sucesso";
        $this->message_update = "Perfil de acesso atualizado com sucesso";
        $this->message_delete = "Perfil de acesso excluido com sucesso";
    }

    /**
     * @return ViewModel
     */
    public function FormAction() {
/*
        $repository = $this->getEm ()->getRepository ( $this->entity );
        if ($this->params ()->fromRoute ( 'id', 0 )) {
            $entity = $repository->find ( $this->params ()->fromRoute ( 'id', 0 ) );
            $form->setData ( $entity->toArray () );
        }
*/
        $viewModel = new ViewModel (array() );
        $viewModel->setTerminal ( true );
        return $viewModel;
    }

    /**
     * @return ViewModel
     */
    public function SaveAction() {

        $request = $this->getRequest();

        if ($request->getPost()['id'] == "") {

            if ($request->isPost()) {

                $service = $this->getServiceLocator()->get($this->service);

                $entity = $service->insert($request->getPost()->toArray());
                $idLastInset = array(
                    'id' => $entity->getId(),
                    'message' => $this->message_insert,
                    'type' => 'success'
                );

            }
        }
        /*} else {

            if ($request->isPost ()) {
                $form->setData ( $request->getPost () );
                $service = $this->getServiceLocator ()->get ( $this->service );

                $entity = $service->update ( $request->getPost ()->toArray () );
                $idLastInset = array (
                    'id' => $entity->getId (),
                    'message' => $this->message_update,
                    'type' => 'success'
                );
            }
        }*/

        $viewModel = new ViewModel ( array (
            'data' => array (
                'id_field' => 'id',
                'id_value' => "" . $idLastInset ['id'] . "",
                'message' => $idLastInset ['message'],
                'type' => $idLastInset ['type']
            )
        ) );
        $viewModel->setTerminal ( true );
        return $viewModel;
    }


}