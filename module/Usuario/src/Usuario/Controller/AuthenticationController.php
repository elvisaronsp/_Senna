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
    private $em;

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
                $data = array_filter($request->getPost()->toArray());
                if(!isset($data['email'])):
                    // Criando Storage para gravar sessão da authtenticação
                    $sessionStorage = new SessionStorage("Usuario");
                    $auth = new AuthenticationService;
                    $auth->setStorage($sessionStorage); // Definindo o SessionStorage para a auth

                    $authAdapter = $this->getServiceLocator()->get("Usuario\Auth\Adapter");
                    $authAdapter->setLogin($request->getPost()->toArray()['login']);
                    $authAdapter->setSenha($request->getPost()->toArray()['senha']);
                
                    $this->result = $auth->authenticate($authAdapter);
                    $tipo = $this->result->getMessages()[0];
                    $this->message = $this->result->getMessages()[1];

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
                else:
                    $repository = $this->getEm()->getRepository("Usuario\Entity\Funcionarios");
                    $entity = $repository->findByEmail($request->getPost()->toArray()['email']);
                    if($entity):
                        $service = $this->getServiceLocator()->get("Usuario\Service\Funcionarios");
                        $service->enviarEmailRedefinicaoSenha($entity->getId());
                        $tipo = "info";
                        $error=true;
                        $this->message="<strong>OK:</strong><br />";
                    else:
                        $tipo = "error";
                        $error=true;
                        $this->message="<strong>ATENÇÃO:</strong><br />E-mail não cadastrado. Verifique o endereço digitado e tente novamente!";
                    endif;
                endif;
            }
        }
        
        $viewModel =  new ViewModel(array(
                'form'=>$form,
                $tipo=>$error,
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

    /**
     * @return array|object
     */
    protected function getEm() {
        if (null === $this->em)
            $this->em = $this->getServiceLocator ()->get ( 'Doctrine\ORM\EntityManager' );
        return $this->em;
    }
}
