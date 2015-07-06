<?php
namespace Usuario\Controller;

use Senna\Controller\GrudController;
use Zend\View\Model\ViewModel;

/**
 * Class PerfisController
 * @package Acl\Controller
 */
class FuncionariosController extends GrudController {


    /**
     * contrutor da classe FuncionariosController
     */
    public function __construct()
    {
        $this->entity = "Usuario\Entity\Funcionarios";
        $this->service = "Usuario\Service\Funcionarios";
        $this->form = "Usuario\Form\Funcionarios";
        $this->message_insert = "Usuario de acesso CADASTRADO com sucesso";
        $this->message_update = "Usuario de acesso ATUALIZADO com sucesso";
        $this->message_delete = "Usuario de acesso EXCLUIDO com sucesso";
    }

    /**
     * @return ViewModel
     */
    public function FormAction()
    {
        $form = $this->getServiceLocator()->get( $this->form );
        $repository = $this->getEm()->getRepository($this->entity);

        $retorno = array ('form' => $form );

        if ($this->params ()->fromRoute ( 'id', 0 ))
        {
            $entity = $repository->find($this->params ()->fromRoute ( 'id', 0 ));
            $form->setData($entity->toArray());

            $retorno = array (
                'form' => $form,
            );
        }

        $viewModel = new ViewModel ( $retorno );
        $viewModel->setTerminal ( true );
        return $viewModel;
    }

    /**
     * @return ViewModel
     */
    public function MapaAction() {
        $viewModel = new ViewModel ( );
        $viewModel->setTerminal ( true );
        return $viewModel;
    }


    /**
     * @return bool
     */
    private function  verificaExistencia()
    {
        $request = $this->getRequest();
        $repository = $this->getEm()->getRepository($this->entity);

        $existe = $repository->findOneByLogin($request->getPost()['codigo_acesso']);
        return $retorno = ($existe)?true:false;
    }

    /**
     * @return ViewModel
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
                    $entity = $service->insert($request->getPost()->toArray());
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
}