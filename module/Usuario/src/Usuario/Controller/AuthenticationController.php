<?php
namespace Usuario\Controller;

use Zend\Mvc\Controller\AbstractActionController,
    Zend\View\Model\ViewModel;

use Zend\Authentication\AuthenticationService,
    Zend\Authentication\Storage\Session as SessionStorage;

/**
 * Class AuthenticationController
 * @package Usuario\Controller
 */
class AuthenticationController extends AbstractActionController
{
    private $result;
    private $message;
    private $tipoAleta;
    private $alerta;
    private $em;

    /**
     * @return \Zend\Http\Response|ViewModel
     */
    public function indexAction()
    {
        $form = $this->getServiceLocator()->get('Usuario\Form\Login');
        $email = $this->getServiceLocator()->get('Usuario\Form\Email');
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

                    // tenta autenticar usuario
                    $this->result = $auth->authenticate($authAdapter);

                    // capura erros e mensagens do metodo de autenticação
                    $this->tipoAleta = $this->result->getMessages()[0];
                    $this->message = $this->result->getMessages()[1];

                    if($this->result->isValid()):
                        // Grava antes da sessao pra poder funcionar

                        $tentativasLogin = $auth->getIdentity()['Usuario']->getTentativasLogin();
                        $redefinirSenha = $auth->getIdentity()['Usuario']->getRedefinirSenha();

                        // grava usuario na sessao
                        $sessionStorage->write($auth->getIdentity()['Usuario'],null);

                        // cancela contagem de tentativas de login erradas quando
                        if($tentativasLogin = "0")
                        {
                            $service = $this->getServiceLocator()->get("Usuario\Service\Funcionarios");
                            $service->update(array('id' => $auth->getIdentity()['Usuario']->getId(), 'tentativasLogin' => '0'));
                        }
                        // verifica se usuario e obrigado a redefinir sua senha
                        if(!$redefinirSenha):
                            return $this->redirect()->toRoute('senna',array('controller'=>'index'));
                        else:
                            return $this->redirect()->toRoute('senna',array('controller'=>'index'),array('fragment' => 'perfilUsuario'));
                        endif;
                    else:
                        $form->clear($form);
                        $this->alerta = true;
                    endif;
                else:
                    // busca pelo usuario atraves do email
                    $repository = $this->getEm()->getRepository("Usuario\Entity\Funcionarios");
                    $entity = $repository->findByEmail($request->getPost()->toArray()['email']);
                    if($entity):
                        // so permite redefinir senha para usuarios ativos
                        if($entity->getConfirmado()):
                            $service = $this->getServiceLocator()->get("Usuario\Service\Funcionarios");
                            $service->enviarEmailRedefinicaoSenha($entity->getId());
                            $this->tipoAleta = "infoForm";
                            $this->alerta=true;
                            $this->message="<strong>ATENÇÃO:</strong><br />Enviamos um e-mail para ".substr(strstr($request->getPost()->toArray()['email'], '@', true),0,1)."*****".strstr($request->getPost()->toArray()['email'], '@')." com instruções para redefinir sua senha.<br />Por favor acesse seu e-mail.";
                        else:
                            $this->tipoAleta = "erroForm";
                            $this->alerta=true;
                            $this->message="<strong>ATENÇÃO:</strong><br />Não e possível soicitar a redefiniçao de sua senha, pois sua conta ainda não esta ativa.<br />Por favor verifique seu e -mail.";
                        endif;
                    else:
                        $this->tipoAleta = "erroForm";
                        $this->alerta=true;
                        $this->message="<strong>ATENÇÃO:</strong><br />E-mail não cadastrado. Verifique o endereço digitado e tente novamente!";
                    endif;
                endif;
            }
            else{
                $this->tipoAleta = "erroForm";
                $this->alerta=true;
                $this->message="<strong>ERROR:</strong><br />Formulario invalido!";
            }
        }
        
        $viewModel =  new ViewModel(array(
                'email'=>$email,
                'form'=>$form,
                $this->tipoAleta=>$this->alerta,
                'message'=>$this->message,
                'login'=>true
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

        return $this->redirect()->toRoute('application');
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
