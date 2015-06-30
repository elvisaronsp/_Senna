<?php
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
        $retorno = array ('form' => $form );

        if ($this->params ()->fromRoute ( 'id', 0 ))
        {
            $entity = $repository->find($this->params ()->fromRoute ( 'id', 0 ));
            $form->setData($entity->toArray());
            $repository = $this->getEm()->getRepository("Acl\Entity\Privilegios");
            $privilegios = $repository->findBy(array( 'perfil' => $this->params()->fromRoute ( 'id', 0 )));

            $retorno = array (
                'form' => $form,
                'admin'=>$entity->toArray()['admin'],
                'permissoes'=>$privilegios
            );
        }

        $viewModel = new ViewModel ( $retorno );
        $viewModel->setTerminal ( true );
        return $viewModel;
    }

    /**
     * @param array $permissoes
     * @return array
     */
    private function capturarPermissoesAcesso(array $permissoes = null)
    {
        $permissoesArray = array();
        foreach ($permissoes as $key => $value):
            if(substr($key, 0, 15) == "permissaoAcesso"):
                $libs = explode("_", $key);
                array_push($permissoesArray,array($libs[1],$libs[2]));
            endif;
        endforeach;

        // ex 1_2 1-> id acessos 2->id recursos
        array_push($permissoes,$permissoesArray);
        return $permissoes;
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
                    $post = $this->capturarPermissoesAcesso($post);

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
                $post = $request->getPost()->toArray();
                $post = $this->capturarPermissoesAcesso($post);

                $repository = $this->getEm()->getRepository("Acl\Entity\Privilegios");
                $privilegios = $repository->findBy(array( 'perfil' => $request->getPost()['id'] ));

                foreach ($privilegios as $privilegio) {
                    $this->getEm()->remove($privilegio);
                }

                $entity = $service->update($post);
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