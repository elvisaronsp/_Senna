<?php

namespace Usuario\Controller;
use Zend\View\Model\ViewModel;

class UsuariosController extends CrudController
{

    public function __construct()
    {
        $this->entity = "Usuario\Entity\Usuario";
        $this->form = "Usuario\Form\Usuario";
        $this->service = "Usuario\Service\Usuario";
        $this->controller = "usuarios";
        $this->route = "usuario-admin";
    }

    /**
     * @return \Zend\Http\Response|ViewModel
     */
    public function newAction()
    {
        $form = $this->getServiceLocator()->get($this->form);
        $request = $this->getRequest();

        if($request->isPost())
        {
            $form->setData($request->getPost());
            if($form->isValid())
            {
                $service = $this->getServiceLocator()->get($this->service);
                $service->insert($request->getPost()->toArray());

                return $this->redirect()->toRoute($this->route,array('controller'=>$this->controller));
            }
        }

        return new ViewModel(array('form'=>$form));
    }


    /**
     * @return \Zend\Http\Response|ViewModel
     */
    public function editAction()
    {
        $form = $this->getServiceLocator()->get($this->form);
        $request = $this->getRequest();

        $repository = $this->getEm()->getRepository($this->entity);
        $entity = $repository->find($this->params()->fromRoute('id',0));

        if($this->params()->fromRoute('id',0))
        {
            $array = $entity->toArray();
            unset($array['senha']);
            $form->setData($array);
        }


        if($request->isPost())
        {
            $form->setData($request->getPost());
            if($form->isValid())
            {
                $service = $this->getServiceLocator()->get($this->service);
                $service->update($request->getPost()->toArray());

                return $this->redirect()->toRoute($this->route,array('controller'=>$this->controller));
            }
        }

        return new ViewModel(array('form'=>$form));
    }

    /**
     * @return ViewModel
     */
    public function reativacaoAction()
    {
        $service = $this->getServiceLocator()->get($this->service);
        $service->reativacao($this->params()->fromRoute('id',0));
        return $this->redirect()->toRoute('usuario-auth',array('controller'=>'index'));
    }
}
