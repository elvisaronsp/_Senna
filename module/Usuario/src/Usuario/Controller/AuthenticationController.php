<?php
namespace Usuario\Controller;

use Zend\Mvc\Controller\AbstractActionController,
    Zend\View\Model\ViewModel;

use Zend\Authentication\AuthenticationService,
    Zend\Authentication\Storage\Session as SessionStorage;

use Usuario\Form\Login as LoginForm;

/**
 * Class AuthenticationController
 * @package Usuario\Controller
 */
class AuthenticationController extends AbstractActionController
{
    private $result;
    private $message;
    private $erro;

    /**
     * @return \Zend\Http\Response|ViewModel
     */
    public function indexAction()
    {
        $this->erro = false;
        $form = $this->getServiceLocator()->get('Usuario\Form\Login');
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
                $authAdapter->setLogin($data['login']);
                $authAdapter->setSenha($data['senha']);
                
                $this->result = $auth->authenticate($authAdapter);
                $this->message = $this->result->getMessages()[1];

                /** @var TYPE_NAME $result*/
                if($this->result->isValid()):

                    $redefinirSenha =  $auth->getIdentity()['Funcionario']->getRedefinirSenha();

                    // correção do array da entidade usuario
                    $auth->getIdentity()['Funcionario']->setNomePerfilFuncionario($auth->getIdentity()['Funcionario']->getPerfil()->getNome());
                    $sessionStorage->write($auth->getIdentity()['Funcionario'],null);
                    if(!$redefinirSenha):
                        return $this->redirect()->toRoute('senna',array('controller'=>'index'));
                    else:
                        return $this->redirect()->toRoute('usuario-listar/default',array('controller'=>'Funcionarios','action'=>'funcionario'));
                    endif;

                else:

                    $form->clear($form);
                    $error = true;

                endif;
            }
        }
        
        $viewModel =  new ViewModel(array(
                'form'=>$form,
                $this->result->getMessages()[0]=>$error,
                'message'=>$this->message
            )
        );

        $viewModel->setTerminal(true);
        return $viewModel;
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
