<?php
namespace Usuario\Controller;

use Senna\Controller\GrudController;
use Zend\Authentication\AuthenticationService;
use Zend\Authentication\Storage\Session as SessionStorage;
use Zend\View\Model\ViewModel;

/**
 * Class FuncionariosController
 * @package Usuario\Controller
 */
class FuncionariosController extends GrudController
{
    /**
     * contrutor da classe FuncionariosController
     */
    public function __construct()
    {
        $this->entity = "Usuario\Entity\Funcionarios";
        $this->service = "Usuario\Service\Funcionarios";
        $this->horarios = "Usuario\Entity\Horarios";
        $this->contatos = "Usuario\Entity\Contatos";
        $this->enderecos = "Usuario\Entity\Enderecos";
        $this->form = "Usuario\Form\Funcionarios";
        $this->message_insert = "Funcionario CADASTRADO com sucesso";
        $this->message_update = "Funcionario ATUALIZADO com sucesso";
        $this->message_delete = "Funcionario EXCLUIDO com sucesso";
    }

    /**
     * @return ViewModel
     */
    public function FormAction()
    {
        $form = $this->getServiceLocator()->get($this->form);

        $auth = new AuthenticationService;
        $auth->setStorage(new SessionStorage("Usuario"));
        $form->get('empresa')->setAttribute('value', $auth->getIdentity()->getEmpresa()->getId());

        $repository = $this->getEm()->getRepository($this->entity);
        $retorno = array('form' => $form);
        if ($this->params()->fromRoute('id', 0)) {
            $entity = $repository->find($this->params()->fromRoute('id', 0));
            $form->setData($entity->toArray());
            $this->setValueForm($form, $entity->toArray());
            $retorno = array('form' => $form,);
        }
        $viewModel = new ViewModel ($retorno);
        $viewModel->setTerminal(true);

        return $viewModel;
    }

    /**
     * @return ViewModel
     * OK
     */
    public function SaveAction()
    {
        $retorno = array();
        $request = $this->getRequest();
        $service = $this->getServiceLocator()->get($this->service);
        if (empty($request->getPost()['id'])) {
            $podeCadastrar = $this->verificaExistencia();
            if (!$podeCadastrar) {
                # INSERT
                if ($request->isPost()) {
                    $entity = $service->insert($request->getPost()->toArray());
                    $retorno['data'] = array(
                        'id_field' => 'id',
                        'id_value' => "" . $entity->getId() . "",
                        'message'  => $this->message_insert,
                        'type'     => 'success',);
                }
            } else {
                $retorno['erro'] = $podeCadastrar;
            }
        } else {
            # UPDATE
            if ($request->isPost()) {
                $podeCadastrar = $this->verificaExistencia();
                if (!$podeCadastrar) {
                    // remove contatos para atualizacao
                    $repository = $this->getEm()->getRepository($this->contatos);
                    $contatos = $repository->findBy(array('usuario' => $request->getPost()['id']));

                    foreach ($contatos as $contato) {
                        $this->getEm()->remove($contato);
                    }
                    // remove enderecos para atualizacao
                    $repository = $this->getEm()->getRepository($this->enderecos);
                    $enderecos = $repository->findBy(array('usuario' => $request->getPost()['id']));

                    foreach ($enderecos as $endereco) {
                        $this->getEm()->remove($endereco);
                    }

                    // remove horarios para atualizacao
                    $repository = $this->getEm()->getRepository($this->horarios);
                    $horarios = $repository->findBy(array('usuario' => $request->getPost()['id']));

                    foreach ($horarios as $horario) {
                        $this->getEm()->remove($horario);
                    }

                    $entity = $service->update($request->getPost()->toArray());
                    $retorno['data'] = array(
                        'id_field' => 'id',
                        'id_value' => "" . $entity->getId() . "",
                        'message' => $this->message_update,
                        'session_updated' => true,
                        'type' => 'success'
                    );
                }else {
                    $retorno['erro'] = $podeCadastrar;
                }
            }
        }
        $viewModel = new ViewModel($retorno);
        $viewModel->setTerminal(true);
        return $viewModel;
    }

    /**
     * @return ViewModel
     */
    public function deleteAction()
    {
        $retorno = array();
        $auth = new AuthenticationService;
        $auth->setStorage(new SessionStorage("Usuario"));
        $service = $this->getServiceLocator()->get($this->service);
        if ($this->params()->fromRoute('id') != $auth->getIdentity()->getId()) {
            if (!$service->delete($this->params()->fromRoute('id', 0)))
                $retorno['data'] = "Erro ao tentar excluir"; else
                $retorno['data'] = $this->message_delete;
        }
        $viewModel = new ViewModel ($retorno);
        $viewModel->setTerminal(true);

        return $viewModel;
    }

    /**
     * @param $form
     * @param $data
     * SETA O RESTANTES DO CAMPOS QUE NAO SÃO DO TIPO SIMPLES
     */
    protected function setValueForm($form, $data)
    {

        $form->get('ativo')->setAttribute('eval', $data['ativo']);
        $form->get('sexo')->setAttribute('eval', $data['sexo']);
        $form->get('tipoContaBancaria')->setAttribute('eval', $data['tipoContaBancaria']);
        $form->get('escolaridade')->setAttribute('eval', $data['escolaridade']);
        $form->get('setor')->setAttribute('eval', $data['setor']);
        $form->get('ac_perfil_acessso')->setAttribute('value', $data['perfil']);
        $form->get('id_perfil')->setAttribute('value', $data['id_perfil']);
        $form->get('solicitarRedefinirSenha')->setAttribute('eval', ($data['redefinirSenha']) ? '1' : '0');
        $form->get('modoFerias')->setAttribute('eval', ($data['ferias']) ? '1' : '0');
        $form->get('alertas')->setAttribute('eval', ($data['alertas']) ? '1' : '0');
        $form->get('visualizar_dashboard')->setAttribute('rel', ($data['visualizarDashboard']) ? '1' : '0');
        $form->get('visualizar_todos_funcionarios')->setAttribute('rel', ($data['visualizarTodosFuncionarios']) ? '1' : '0');
        // horarios
        $repository = $this->getEm()->getRepository($this->horarios);
        $horario = $repository->findBy(array('usuario' => $data['id']));

        $form->get('hora_entrada')->setAttribute('value', $horario['0']->toArray()['horaEntrada']);
        $form->get('hora_almoco_entrada')->setAttribute('value', $horario['0']->toArray()['horaAlmocoEntrada']);
        $form->get('hora_almoco_saida')->setAttribute('value', $horario['0']->toArray()['horaAlmocoSaida']);
        $form->get('hora_saida')->setAttribute('value', $horario['0']->toArray()['horaSaida']);
        $form->get('dias_da_semana_1')->setAttribute('rel', $horario['0']->toArray()['diasDaSemana1']);
        $form->get('dias_da_semana_2')->setAttribute('rel', $horario['0']->toArray()['diasDaSemana2']);
        $form->get('dias_da_semana_3')->setAttribute('rel', $horario['0']->toArray()['diasDaSemana3']);
        $form->get('dias_da_semana_4')->setAttribute('rel', $horario['0']->toArray()['diasDaSemana4']);
        $form->get('dias_da_semana_5')->setAttribute('rel', $horario['0']->toArray()['diasDaSemana5']);
        $form->get('dias_da_semana_6')->setAttribute('rel', $horario['0']->toArray()['diasDaSemana6']);
        $form->get('dias_da_semana_7')->setAttribute('rel', $horario['0']->toArray()['diasDaSemana7']);
        // fim horarios

        $this->recuperarContatosForm($form,$this->contatos,$data);
        $this->recuperarEnderecosForm($form,$this->enderecos,$data);
    }

    /**
     * @return ViewModel
     */
    public function MapaAction()
    {
        $viewModel = new ViewModel ();
        $viewModel->setTerminal(true);

        return $viewModel;
    }

    /**
     * @return ViewModel
     */
    public function FuncionarioAction()
    {
        $viewModel = new ViewModel ();
        //$viewModel->setTerminal(true);

        return $viewModel;
    }

    /**
     * @return bool
     */
    private function  verificaExistencia()
    {
        $request = $this->getRequest();
        $repository = $this->getEm()->getRepository($this->entity);
        if ($repository->findByNot((!empty($request->getPost()['id']))?$request->getPost()['id']:null,'login',$request->getPost()['login'])):
            return "LOGIN";
        elseif ($repository->findByNot((!empty($request->getPost()['id']))?$request->getPost()['id']:null,'cpf',(!empty($request->getPost()['cpf'])?$request->getPost()['cpf']:"0"))):
            return "CPF";
        elseif ($repository->findByNot((!empty($request->getPost()['id']))?$request->getPost()['id']:null,'email',$request->getPost()['email'])):
            return "E-MAIL";
        elseif ($repository->findByNot((!empty($request->getPost()['id']))?$request->getPost()['id']:null,'telefoneprincipal',$request->getPost()['telefoneprincipal'])):
            return "TELEFONE";
        endif;

        return false;
    }


    /**
     * @return ViewModel
     * Busca por todos os funcionarios que tenham em seu perfil permissao de vendas
     */
    public function getFuncionariosPermissaoVendaAction()
    {

        $repository = $this->getEm()->getRepository ($this->entity);
        $arrayFilter = $repository->findVendedores ( $this->getRequest()->getPost()->toArray() );
        $viewModel = new ViewModel ( array (
            'data' => $arrayFilter
        ) );
        $viewModel->setTerminal ( true );
        return $viewModel;

    }

}