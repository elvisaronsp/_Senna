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

        if($result) {
            if (count($result) == 1)
                return new ViewModel(array('form'=>$form,'email'=>$email,'usuario' => $result));
            else
                return new ViewModel();
        }
        else
            return new ViewModel(array('form'=>$form,'email'=>$email,'erro' => true,'message'=> utf8_encode("<strong>Erro!:</strong><br />Tentativa de ativação falhou.<br />Usuario não existe.")));
    }

    /**
     * @return ViewModel
     */
    public function resetAction() {

        $form = $this->getServiceLocator()->get( 'Usuario\Form\Reset' );
        $email = $this->getServiceLocator()->get('Usuario\Form\Email');

        $request = $this->getRequest();

        if ($this->params()->fromRoute('key', 0))
        {
            $chaveAtivacao = $this->params()->fromRoute('key');
            $service = $this->getServiceLocator()->get('Usuario\Service\Funcionarios');
            $result = $service->verificaChaveAtivacaoResetSenha($chaveAtivacao);


            /**
             * if($result)?Existe usuario:Nao existe usuario
             * if (count($result) == 1)?usuario ainda pode redefinir a senha:usuario nao pode mais redefinir a senha
             */
            if($result)
                if (count($result) == 1)
                    $viewModel = new ViewModel(array('form' => $form, 'usuario' => $result));
                else
                    $viewModel = new ViewModel(array('form' => $form, 'atencao' => true,'message'=> utf8_encode("<strong>ATENÇÃO:</strong><br />Não é possivel redefir a sua senha.<br />Tempo expirado.")));
            else
                $viewModel = new ViewModel(array('form' => $form, 'error' => true,'message'=> utf8_encode("<strong>ATENÇÃO:</strong><br />Você não tem perssião para acessar está pagina.<br />Acesso negado.")));

        }
        else
        {
            if ($request->isPost())
            {
                if(empty($request->getPost()['senha']))
                    $viewModel = new ViewModel(array('form' => $form, 'senha' => true));
            }
            $viewModel = new ViewModel(array('form' => $form));
        }

        $viewModel->setTerminal(true);
        return $viewModel;



    }
}