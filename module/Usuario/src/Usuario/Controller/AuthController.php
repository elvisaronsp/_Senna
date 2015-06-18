<?php

namespace Usuario\Controller;

use Zend\Mvc\Controller\AbstractActionController,
    Zend\View\Model\ViewModel;

use Zend\Authentication\AuthenticationService,
    Zend\Authentication\Storage\Session as SessionStorage;

use Usuario\Form\Login as LoginForm;

class AuthController extends AbstractActionController
{

    public function indexAction()
    {
        $form = new LoginForm;
        $error = false;
        
        $request = $this->getRequest();
        
        if($request->isPost())
        {
            $form->setData($request->getPost());
            if($form->isValid())
            {
                $data = $request->getPost()->toArray();
                
                // Criando Storage para gravar sessão da authtenticação
                $sessionStorage = new SessionStorage("Usuario");
                
                $auth = new AuthenticationService;
                $auth->setStorage($sessionStorage); // Definindo o SessionStorage para a auth
                
                $authAdapter = $this->getServiceLocator()->get("usuario\Auth\Adapter");
                $authAdapter->setUsername($data['email']);
                $authAdapter->setPassword($data['senha']);
                
                $result = $auth->authenticate($authAdapter);
                
                if($result->isValid())
                {
                    //$user = $auth->getIdentity();
                    //$user = $user['usuario'];
                    //$sessionStorage->write($user,null);


                    $sessionStorage->write($auth->getIdentity()['usuario'],null);

                    return $this->redirect()->toRoute('usuario-admin/default',array('controller'=>'usuarios'));
                }
                else
                    $error = true; 
            }
        }
        
        return new ViewModel(array('form'=>$form,'error'=>$error));
    }
    
    public function logoutAction()
    {
        $auth = new AuthenticationService;
        $auth->setStorage(new SessionStorage("Usuario"));
        $auth->clearIdentity();

        return $this->redirect()->toRoute('usuario-auth');
    }
}