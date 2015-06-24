<?php

namespace Usuario\Controller;

use Zend\Mvc\Controller\AbstractActionController,
    Zend\View\Model\ViewModel;

use Zend\Authentication\AuthenticationService,
    Zend\Authentication\Storage\Session as SessionStorage;

use Usuario\Form\Login as LoginForm;

/**
 * Class AuthController
 * @package Usuario\Controller
 */
class AuthController extends AbstractActionController
{
    private $result;
    private $message;

    /**
     * @return \Zend\Http\Response|ViewModel
     */
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

                $authAdapter = $this->getServiceLocator()->get("Usuario\Auth\Adapter");
                $authAdapter->setUsername($data['email']);
                $authAdapter->setPassword($data['senha']);
                
                $this->result = $auth->authenticate($authAdapter);
                $this->message = $this->result->getMessages()[0];

                /** @var TYPE_NAME $result */
                if($this->result->isValid())
                {
                    // correção do array da entidade usuario
                    $auth->getIdentity()['usuario']->setNomePerfil($auth->getIdentity()['usuario']->getPerfil()->getNome());
                    $sessionStorage->write($auth->getIdentity()['usuario'],null);

                    return $this->redirect()->toRoute('usuario-admin/default',array('controller'=>'usuarios'));
                }
                else
                    $error = true; 
            }
        }
        
        return new ViewModel(array(
                'form'=>$form,
                'error'=>$error,
                'message'=>$this->message
            )
        );
    }

    /**
     * @return \Zend\Http\Response
     */
    public function logoutAction()
    {
        $auth = new AuthenticationService;

        $auth->setStorage(new SessionStorage("Usuario"));
        $auth->clearIdentity();

        return $this->redirect()->toRoute('usuario-auth');
    }
}
