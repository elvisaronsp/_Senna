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
     * @param $form
     * @param $data
     * SETA O RESTANTES DO CAMPOS QUE NAO SÃO DO TIPO SIMPLES
     */
    protected function setValueForm($form,$data)
    {
        $form->get('ativo')->setAttribute('eval',$data['ativo']);
        $form->get('sexo')->setAttribute('eval',$data['sexo']);
        $form->get('tipoContaBancaria')->setAttribute('eval',$data['tipoContaBancaria']);
        $form->get('escolaridade')->setAttribute('eval',$data['escolaridade']);
        $form->get('setor')->setAttribute('eval',$data['setor']);
        $form->get('ac_perfil_acessso')->setAttribute('value',$data['perfil']);
        $form->get('id_perfil')->setAttribute('value',$data['id_perfil']);
        $form->get('solicitarRedefinirSenha')->setAttribute('eval',$data['redefinirSenha']);
        $form->get('modoFerias')->setAttribute('eval',$data['ferias']);
        $form->get('alertas')->setAttribute('eval',$data['alertas']);

        $form->get('dias_da_semana_1')->setAttribute('rel',$data['dias_da_semana_1']);
        $form->get('dias_da_semana_2')->setAttribute('rel',$data['dias_da_semana_2']);
        $form->get('dias_da_semana_3')->setAttribute('rel',$data['dias_da_semana_3']);
        $form->get('dias_da_semana_4')->setAttribute('rel',$data['dias_da_semana_4']);
        $form->get('dias_da_semana_5')->setAttribute('rel',$data['dias_da_semana_5']);
        $form->get('dias_da_semana_6')->setAttribute('rel',$data['dias_da_semana_6']);
        $form->get('dias_da_semana_7')->setAttribute('rel',$data['dias_da_semana_7']);

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
            $this->setValueForm($form,$entity->toArray());
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