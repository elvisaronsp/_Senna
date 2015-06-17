<?php
/**
 * Created by PhpStorm.
 * User: Jefferson
 * Date: 03/06/2015
 * Time: 17:53
 */

namespace Usuario\Controller;
use Zend\Mvc\Controller\AbstractActionController,
    Zend\View\Model\ViewModel;

use Usuario\Form\Usuario as FrmUsuario;
/**
 * Class IndexController
 * @package Usuario
 */
class IndexController extends AbstractActionController
{
    /**
     * @return \Zend\Http\Response|ViewModel
     */
    public function registroAction()
    {
        $form = new FrmUsuario;
        $request = $this->getRequest();

        if($request->isPost())
        {
            $form->setData($request->getPost());
            if($form->isValid())
            {
                $service = $this->getServiceLocator()->get("Usuario\Service\Usuario");
                if(!$service->verificaUsuarioCadastrado($request->getPost()->toArray()))
                {
                    if($service->insert($request->getPost()->toArray()))
                    {
                        $this->flashMessenger()
                            ->setNamespace('Usuario')
                            ->addMessage("Usuário cadastrado com sucesso");
                    }
                }
                else
                {
                    $this->flashMessenger()
                        ->setNamespace('Usuario')
                        ->addMessage("E-mail já cadastrado");
                }
                return $this->redirect()->toRoute('usuario-registro');
            }
        }

        $messages = $this->flashMessenger()
                         ->setNamespace('Usuario')
                         ->getMessages();

        return new ViewModel(array('form'=>$form,'messages'=>$messages));
    }

    /**
     * @return ViewModel
     */
    public function ativacaoAction()
    {
        $chaveAtivacao = $this->params()->fromRoute('key');

        $usuarioService = $this->getServiceLocator()->get('Usuario\Service\Usuario');
        $result = $usuarioService->ativacao($chaveAtivacao);

        if($result)
            return new ViewModel(array('usuario'=>$result));
        else
            return new ViewModel();
    }
}