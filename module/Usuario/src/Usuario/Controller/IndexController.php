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
     */
    public function ativacaoAction()
    {
        $chaveAtivacao = $this->params()->fromRoute('key');

        $service = $this->getServiceLocator()->get('Usuario\Service\Funcionarios');
        $result = $service->ativarFuncionario($chaveAtivacao);

        if($result) {
            if (count($result) == 1)
                return new ViewModel(array('usuario' => $result));
            else
                return new ViewModel();
        }
        else
            return new ViewModel(array('erro' => true));
    }

    /**
     * @return ViewModel
     */
    public function resetAction() {
        $form = $this->getServiceLocator()->get( 'Usuario\Form\Reset' );
        $chaveAtivacao = $this->params()->fromRoute('key');

        $service = $this->getServiceLocator()->get('Usuario\Service\Funcionarios');
        $result = $service->verificaChaveAtivacaoResetSenha($chaveAtivacao);

        if($result)
        {
            if (count($result) == 1)
                return new ViewModel(array('form'=>$form,'usuario' => $result));
            else
                return new ViewModel(array('erro' => true));
        }
    }
}