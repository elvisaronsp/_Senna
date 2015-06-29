<?php
/**
 * Created by PhpStorm.
 * User: Jefferson
 * Date: 25/06/2015
 * Time: 15:03
 */

namespace Acl\Controller;
use Senna\Controller\GrudController;
use Zend\View\Model\ViewModel;
/**
 * Class PerfisController
 * @package Acl\Controller
 */
class PerfisController extends GrudController {

    /**
     * contrutor da classe PerfisController
     */
    public function __construct()
    {
        $this->entity = "Acl\Entity\Perfis";
        $this->service = "Acl\Service\Perfis";
        $this->form = "Acl\Form\Perfis";
        $this->message_insert = "Perfil de acesso CADASTRADO com sucesso";
        $this->message_update = "Perfil de acesso ATUALIZADO com sucesso";
        $this->message_delete = "Perfil de acesso EXCLUIDO com sucesso";
    }

    /**
     * @return bool
     */
    private function  verificaExistencia()
    {
        $request = $this->getRequest();
        $repository = $this->getEm()->getRepository($this->entity);

        $existePerfil = $repository->findOneByNome($request->getPost()['nome']);
        return $retorno = ($existePerfil)?true:false;
    }

    /**
     * @return ViewModel
     */
    public function FormAction() {
        $form = $this->getServiceLocator()->get( $this->form );
        $repository = $this->getEm()->getRepository($this->entity);

        if ($this->params ()->fromRoute ( 'id', 0 ))
        {
            $entity = $repository->find($this->params()->fromRoute ('id',0));
            $form->setData($entity->toArray());
        }

        $viewModel = new ViewModel ( array (
            'form' => $form
        ) );
        $viewModel->setTerminal ( true );
        return $viewModel;
    }


    private function capturarPermissoesAcesso(array $permissoes = null)
    {
        $permissoesArray = array();
        foreach ($permissoes as $key => $value):

            if(substr($key, 0, 15) == "permissaoAcesso"):
                $libs = explode("_", $key);
                $permissoesArray[] = $libs[1]."_".$libs[2];
            endif;
        endforeach;

        // ex 1_2 1-> id acessos 2->id recursos
        return $permissoesArray;
    }


    /**
     * @return ViewModel
     * @obs: classe incompleta, quando usuario
     * atualizar o proprio perfil
     * deve sugerir atualização de sua sessao
     */
    public function SaveAction()
    {
        $retorno = array();
        $request = $this->getRequest();
        $service = $this->getServiceLocator()->get($this->service);
        if (empty($request->getPost()['id']))
        {
            if (!$this->verificaExistencia())
            {
                # INSERT
                if ($request->isPost())
                {
                    $post = $request->getPost()->toArray();
                    $liberdades = $this->capturarPermissoesAcesso();
                    $post = array_push($post,$liberdades);
                    echo "<pre>";
print_r($post);
echo "</pre>";
die;


                    $entity = $service->insert($post);
                    $retorno['data'] = array(
                        'id_field' => 'id',
                        'id_value' => "".$entity->getId()."",
                        'message' => $this->message_insert,
                        'type' => 'success'
                    );
                }

            }
        }
        else
        {
            # UPDATE
            if ($request->isPost())
            {
                $entity = $service->update($request->getPost()->toArray());
                $retorno['data'] = array(
                    'id_field' => 'id',
                    'id_value' => "".$entity->getId()."",
                    'message' => $this->message_update,
                    'session_updated'=>true,
                    'type' => 'success'
                );
            }
        }

        $viewModel = new ViewModel($retorno);
        $viewModel->setTerminal(true);
        return $viewModel;
    }

    /**
     * Deleta abstract
     *
     * @return \Zend\View\Model\ViewModel
     */
    public function deleteAction()
    {
        $retorno = array();
        $repository = $this->getEm()->getRepository($this->entity);
        $entity = $repository->findAll();
        if(count($entity) != 1)
        {
            $service = $this->getServiceLocator()->get($this->service);
            $service->delete($this->params()->fromRoute('id', 0));
            $retorno['data'] = $this->message_delete;
        }
        else
            $this->message_delete = array();

        $viewModel = new ViewModel ($retorno);
        $viewModel->setTerminal ( true );
        return $viewModel;
    }

}