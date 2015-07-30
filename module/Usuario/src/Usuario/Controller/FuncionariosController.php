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
        $repository = $this->getEm()->getRepository($this->entity);

        $retorno = array('form' => $form);

        if ($this->params()->fromRoute('id', 0)) {
            $entity = $repository->find($this->params()->fromRoute('id', 0));

            $form->setData($entity->toArray());
            $this->setValueForm($form, $entity->toArray());
            $retorno = array(
                'form' => $form,
            );
        }

        $viewModel = new ViewModel ($retorno);
        $viewModel->setTerminal(true);
        return $viewModel;
    }

    /**
     * @return ViewModel
     */
    public function SaveAction()
    {
        $retorno = array();
        $request = $this->getRequest();
        $service = $this->getServiceLocator()->get($this->service);
        if (empty($request->getPost()['id'])) {
            if (!$this->verificaExistencia()) {
                # INSERT
                if ($request->isPost()) {
                    $entity = $service->insert($request->getPost()->toArray());
                    $retorno['data'] = array(
                        'id_field' => 'id',
                        'id_value' => "" . $entity->getId() . "",
                        'message' => $this->message_insert,
                        'type' => 'success'
                    );
                }
            }
        } else {
            # UPDATE
            if ($request->isPost()) {
                $post = $request->getPost()->toArray();
                $post = $this->capturarPermissoesAcesso($post);

                $repository = $this->getEm()->getRepository("Acl\Entity\Privilegios");
                $privilegios = $repository->findBy(array(
                    'perfil' => $request->getPost()['id']
                ));

                foreach ($privilegios as $privilegio) {
                    $this->getEm()->remove($privilegio);
                }

                $entity = $service->update($post);
                $retorno['data'] = array(
                    'id_field' => 'id',
                    'id_value' => "" . $entity->getId() . "",
                    'message' => $this->message_update,
                    'session_updated' => true,
                    'type' => 'success'
                );
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
                $retorno['data'] = "Erro ao tentar excluir";
            else
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
        $form->get('solicitarRedefinirSenha')->setAttribute('eval', $data['redefinirSenha']);
        $form->get('modoFerias')->setAttribute('eval', $data['ferias']);
        $form->get('alertas')->setAttribute('eval', $data['alertas']);

        // horarios
        $repository = $this->getEm()->getRepository($this->horarios);
        $horario = $repository->findBy(array('usuario' => $data['id']));
        $form->get('dias_da_semana_1')->setAttribute('rel', $horario['0']->toArray()['diasDaSemana1']);
        $form->get('dias_da_semana_2')->setAttribute('rel', $horario['0']->toArray()['diasDaSemana2']);
        $form->get('dias_da_semana_3')->setAttribute('rel', $horario['0']->toArray()['diasDaSemana3']);
        $form->get('dias_da_semana_4')->setAttribute('rel', $horario['0']->toArray()['diasDaSemana4']);
        $form->get('dias_da_semana_5')->setAttribute('rel', $horario['0']->toArray()['diasDaSemana5']);
        $form->get('dias_da_semana_6')->setAttribute('rel', $horario['0']->toArray()['diasDaSemana6']);
        $form->get('dias_da_semana_7')->setAttribute('rel', $horario['0']->toArray()['diasDaSemana7']);
        // fim horarios

        // contatos
        $repository = $this->getEm()->getRepository($this->contatos);
        $contatos = $repository->findBy(array('usuario' => $data['id']));

        foreach ($contatos AS $key => $value):
            $form->get('contato__id[' . $key . ']')->setAttribute('value', $contatos[$key]->getId());
            $form->get('contato__id_tipo_cadastro[' . $key . ']')->setAttribute('eval', $contatos[$key]->getTipoCadastro());

            switch ($contatos[$key]->getTipoContato()) :
                case "1":
                    $tipoContato = "TELEFONE";
                    break;
                case "2":
                    $tipoContato = "EMAIL";
                    break;
                case "3":
                    $tipoContato = "TWITTER";
                    break;
                case "4":
                    $tipoContato = "SKIPE";
                    break;
                case "5":
                    $tipoContato = "FAX";
                    break;
            endswitch;

            $form->get('contato__id_tipo_contato[' . $key . ']')->setAttribute('value', $contatos[$key]->getTipoContato());
            $form->get('ac_' . $key)->setAttribute('value', $tipoContato);
            $form->get('contato__descricao[' . $key . ']')->setAttribute('value', $contatos[$key]->getContato());
            $form->get('contato__detalhes[' . $key . ']')->setAttribute('value', $contatos[$key]->getDetalhes());
        endforeach;
        // fim contatos

        // enderecos
        $repository = $this->getEm()->getRepository($this->enderecos);
        $enderecos = $repository->findBy(array('usuario' => $data['id']), array('principal' => 'DESC'));

        foreach ($enderecos AS $key => $value):
            $form->get('endereco__cep[' . $key . ']')->setAttribute('value', $enderecos[$key]->getCep());
            $form->get('endereco__logradouro[' . $key . ']')->setAttribute('value', $enderecos[$key]->getLogradouro());
            $form->get('endereco_entidade__numero[' . $key . ']')->setAttribute('value', $enderecos[$key]->getNumero());
            $form->get('endereco_entidade__informacoes_adicionais[' . $key . ']')->setAttribute('value', $enderecos[$key]->getComplemento());
            $form->get('endereco__bairro[' . $key . ']')->setAttribute('value', $enderecos[$key]->getBairro());
            $form->get('endereco__id_cidade[' . $key . ']')->setAttribute('value', $enderecos[$key]->getCidade());
            $form->get('endereco_entidade__informacoes_adicionais[' . $key . ']')->setAttribute('value', $enderecos[$key]->getReferencia());
            $form->get('endereco_entidade__id_tipo_cadastro[' . $key . ']')->setAttribute('value', $enderecos[$key]->getTipo());
            $form->get('estado[' . $key . ']')->setAttribute('value', $enderecos[$key]->getUf());
            $form->get('endereco_entidade__principal[' . $key . ']')->setAttribute('value', $enderecos[$key]->getPrincipal());
        endforeach;
        // fim de enderecos

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
        $viewModel->setTerminal(true);
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
        return $retorno = ($existe) ? true : false;
    }
}