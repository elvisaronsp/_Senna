<?php
namespace Usuario\Controller;
use Zend\Mvc\Controller\AbstractActionController,
    Zend\View\Model\ViewModel;

/**
 * Class IndexController
 * @package Usuario\Controller
 */
class IndexController extends AbstractActionController
{
    /**
     * @return ViewModel
     *
     * if($result)?Existe usuario:Nao existe usuario
     * if (count($result) == 1)? Usuario ainda nao esta ativo:Usuario ja esta ativo
     */
    public function ativacaoAction()
    {
        $form = $this->getServiceLocator()->get('Usuario\Form\Login');
        $email = $this->getServiceLocator()->get('Usuario\Form\Email');
        $chaveAtivacao = $this->params()->fromRoute('key');
        $service = $this->getServiceLocator()->get('Usuario\Service\Funcionarios');
        $result = $service->ativarFuncionario($chaveAtivacao);

        if($result)
        {
            if (count($result) == 1)
            {
                return new ViewModel(array(
                    'form' => $form,
                    'email' => $email,
                    'usuario' => $result,
                    'sucesso' => true, 'message' => utf8_encode("<strong>OK:</strong><br />Sua conta foi ativada com sucesso.<br />Acesse o sistema agora mesmo, vamos começar?")
                ));
            }
            else
            {
                return new ViewModel(array(
                    'form' => $form,
                    'email' => $email,
                    'erro' => true,
                    'message' => utf8_encode("<strong>ATENÇÃO:</strong><br />Seu e-mail já foi confirmado uma vez, sua conta já está ativa.<br />Acesse o sistema agora mesmo, vamos começar?")
                ));
            }
        }
        else
        {
            return new ViewModel(array(
                'form' => $form,
                'email' => $email,
                'erro' => true,
                'message' => utf8_encode("<strong>Erro!</strong><br />Tentativa de ativação da conta falhou.<br />Usuario solicitado não existe .")
            ));
        }
    }

    /**
     * @return ViewModel
     */
    public function resetAction()
    {
        $form = $this->getServiceLocator()->get( 'Usuario\Form\Reset' );
        $email = $this->getServiceLocator()->get('Usuario\Form\Email');
        $service = $this->getServiceLocator()->get('Usuario\Service\Funcionarios');
        $request = $this->getRequest();

        if ($this->params()->fromRoute('key', 0))
        {
            $chaveAtivacao = $this->params()->fromRoute('key');
            $result = $service->verificaChaveAtivacaoResetSenha($chaveAtivacao);
            $form->setData(array(
                'chaveAtivacao'=>$chaveAtivacao
            ));
            $viewModel = $this->testarRetornoVerificacaoChave($result,$form,$email);
            if(!$viewModel)
            {
                $viewModel = $viewModel = new ViewModel(array(
                    'reset' => true,
                    'email' => $email,
                    'form' => $form,
                    'usuario' => $result,
                    'infoForm' => true,
                    'message' => utf8_encode("<strong>ATENÇÃO:</strong><br />Crie uma nova senha para acessar o sistema.<br />Seja criativo =).")
                ));
            }
        }
        else
        {
            if($request->isPost())
            {
                $form->setData($request->getPost());
                if($form->isValid())
                {
                    if (empty($request->getPost()['senha']))
                    {
                        $viewModel = new ViewModel(array(
                            'reset' => true,
                            'email' => $email,
                            'form' => $form,
                            'erroForm' => true,
                            'message' => utf8_encode("<strong>ATENÇÃO</strong><br />Todos os campos são obrigátorios.<br />Informe uma nova senha.")
                        ));
                    }
                    elseif (empty($request->getPost()['confirmacaoSenha']))
                    {
                        $viewModel = new ViewModel(array(
                            'reset' => true,
                            'email' => $email,
                            'form' => $form,
                            'erroForm' => true,
                            'message' => utf8_encode("<strong>ATENÇÃO</strong><br />Todos os campos são obrigátorios.<br />Confirme sua nova senha.")
                        ));
                    }
                    elseif ($request->getPost()['confirmacaoSenha'] != $request->getPost()['senha'])
                    {
                        $viewModel = new ViewModel(array(
                            'reset' => true,
                            'email' => $email,
                            'form' => $form,
                            'erroForm' => true,
                            'message' => utf8_encode("<strong>ATENÇÃO</strong><br />As senhas digitadas não correspondem.<br />As duas senhas digitadas devem ser iguais.")
                        ));
                    }
                    else
                    {
                        $usuario = $service->verificaChaveAtivacaoResetSenha($request->getPost()->toArray()['chaveAtivacao']);
                        $viewModel = $this->testarRetornoVerificacaoChave($usuario,$form,$email);
                        if(!$viewModel)
                        {
                            $usuario = $service->update(array(
                                'id'=>$usuario->getId(),
                                'prazoRedefinirSenha' => new \DateTime('now'),
                                'bloqueioTemporario' => new \DateTime('now'),
                                'tentativasLogin' => '0',
                                'redefinirSenha' => '0',
                                'senha' => $request->getPost()->toArray()['senha']
                            ));

                            if($usuario)
                            {
                                $viewModel = new ViewModel(array(
                                    'reset' => true,
                                    'email' => $email,
                                    'form' => $form,
                                    'info' => true,
                                    'message' => utf8_encode("<strong>OK</strong><br />Sua senha foi alterada com sucesso!<br />Voccê já pode acessar normalmente.")
                                ));
                            }
                        }
                    }
                }
            }
            else
            {
                $viewModel = new ViewModel(array(
                    'reset' => true,
                    'email' => $email,
                    'form' => $form,
                    'erro' => true,
                    'message' => utf8_encode("<strong>ERRO!</strong><br />Requisição invalída!<br />Acesso negado.")
                ));
            }
        }

        $viewModel->setTerminal(true);
        return $viewModel;
    }

    /**
     * @param $result
     * @param $form
     * @param $email
     * @return bool|ViewModel
     */
    private function testarRetornoVerificacaoChave($result,$form,$email)
    {
        /**
         * if($result)?Existe usuario:Nao existe usuario
         * if (count($result) == 1)?usuario ainda pode redefinir a senha:usuario nao pode mais redefinir a senha
         */
        if($result)
        {
            if (count($result) == 1)
                return false;
            else
            {
                return $viewModel = new ViewModel(array(
                    'reset' => true,
                    'email' => $email,
                    'form' => $form,
                    'atencao' => true,
                    'message' => utf8_encode("<strong>ATENÇÃO:</strong><br />Não é possivel redefir a sua senha.<br />Tempo expirado.")
                ));
            }
        }
        else
        {
            return $viewModel = new ViewModel(array(
                'reset' => true,
                'email' => $email,
                'form' => $form,
                'erro' => true,
                'message' => utf8_encode("<strong>ATENÇÃO:</strong><br />Você não tem perssião para acessar está pagina.<br />Acesso negado.")
            ));
        }
    }
}