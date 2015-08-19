<?php
namespace Usuario\Controller;

use Senna\Controller\GrudController;
use Zend\Authentication\AuthenticationService;
use Zend\Authentication\Storage\Session as SessionStorage;
use Zend\View\Model\ViewModel;

/**
 * Class InfoController
 * @package Usuario\Controller
 */
class InfoController extends GrudController
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
        $this->form = "Usuario\Form\InfoFuncionario";
        $this->message_update = "Perfil ATUALIZADO com sucesso";
    }

    /**
     * @return ViewModel
     */
    public function IndexAction()
    {
        $form = $this->getServiceLocator()->get($this->form);
        $retorno = array('form' => $form,);

        $auth = new AuthenticationService;
        $auth->setStorage(new SessionStorage("Usuario"));
        $repository = $this->getEm()->getRepository($this->entity);

        if ($auth->getIdentity()->getId()) {
            $entity = $repository->find($auth->getIdentity()->getId());
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
        // Recupera sessao do usuario
        $auth = new AuthenticationService;
        $auth->setStorage(new SessionStorage("Usuario"));

        $retorno = array();
        $request = $this->getRequest();
        $service = $this->getServiceLocator()->get($this->service);

        # UPDATE
        if ($request->isPost()) {

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

            $entity = $service->update($request->getPost()->toArray());
            $retorno['data'] = array(
                'id_field' => 'id',
                'id_value' => "" . $entity->getId() . "",
                'message' => $this->message_update,
                'session_updated' => ($auth->getIdentity()->getRedefinirSenha())?true:false,
                'type' => 'success'
            );

            // regrava dados na sessao
            $auth->getIdentity()->setRedefinirSenha('0');


            $viewModel = new ViewModel($retorno);
           $viewModel->setTerminal(true);
           return $viewModel;
        }
    }

    /**
     * @param $form
     * @param $data
     * SETA O RESTANTES DO CAMPOS QUE NAO SÃO DO TIPO SIMPLES
     */
    protected function setValueForm($form, $data)
    {
        $form->get('sexo')->setAttribute('eval',($data['sexo']=="M")? "0":"1");

        switch ($data['escolaridade']) :
            case "0":
                $escolaridade = "Ensino Fundamental Incompleto";
                break;
            case "1":
                $escolaridade = "Ensino Fundamental Completo";
                break;
            case "2":
                $escolaridade = "Ensino Médio Incompleto";
                break;
            case "3":
                $escolaridade = "Ensino Médio Completo";
                break;
            case "4":
                $escolaridade = "Ensino Superior Incompleto";
                break;
            default:
                $escolaridade = "Ensino Superior Completo";
                break;
        endswitch;
        $form->get('escolaridade')->setAttribute('value', $escolaridade);

        switch ($data['setor']) :
            case "0":
                $setor = "ADMINISTRATIVO";
                break;
            case "1":
                $setor = "FINANCEIRO";
                break;
            case "2":
                $setor = "COMERCIAL";
                break;
            case "3":
                $setor = "VENDAS";
                break;
            case "4":
                $setor = "GERENCIA";
                break;
            default:
                $setor = "PRODUÇÃO";
                break;
        endswitch;

        $form->get('setor')->setAttribute('value', $setor);

        switch ($data['tipoContaBancaria']) :
            case "0":
                $tipoContaBancaria = "CONTA CORRENTE";
                break;
            case "1":
                $tipoContaBancaria = "CONTA POUPANÇA";
                break;
            case "2":
                $tipoContaBancaria = "CONTA SALÁRIO";
                break;
        endswitch;
        $form->get('tipoContaBancaria')->setAttribute('value',$tipoContaBancaria);

        // horarios
        $repository = $this->getEm()->getRepository($this->horarios);
        $horario = $repository->findBy(array('usuario' => $data['id']));

        $form->get('hora_entrada')->setAttribute('value', $horario['0']->toArray()['horaEntrada']);
        $form->get('hora_almoco_entrada')->setAttribute('value', $horario['0']->toArray()['horaAlmocoEntrada']);
        $form->get('hora_almoco_saida')->setAttribute('value', $horario['0']->toArray()['horaAlmocoSaida']);
        $form->get('hora_saida')->setAttribute('value', $horario['0']->toArray()['horaSaida']);
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
            $form->get('endereco_entidade__complemento[' . $key . ']')->setAttribute('value', $enderecos[$key]->getComplemento());
            $form->get('endereco__bairro[' . $key . ']')->setAttribute('value', $enderecos[$key]->getBairro());
            $form->get('endereco__id_cidade[' . $key . ']')->setAttribute('value', $enderecos[$key]->getCidade());
            $form->get('endereco_entidade__informacoes_adicionais[' . $key . ']')->setAttribute('value', $enderecos[$key]->getReferencia());
            $form->get('endereco_entidade__id_tipo_cadastro[' . $key . ']')->setAttribute('value', $enderecos[$key]->getTipo());
            switch ($enderecos[$key]->getTipo()) :
                case "1":
                    $tipoEndereco = "COMERCIAL";
                    break;
                case "2":
                    $tipoEndereco = "ENTREGA";
                    break;
                case "3":
                    $tipoEndereco = "REDIDENCIAL";
                    break;
            endswitch;
            $form->get('ac_e_' . $key)->setAttribute('value', $tipoEndereco);
            $form->get('estado[' . $key . ']')->setAttribute('value', $enderecos[$key]->getUf());
            $form->get('endereco_entidade__principal[' . $key . ']')->setAttribute('value', $enderecos[$key]->getPrincipal());
        endforeach;
        // fim de enderecos
    }

    /**
     * @return bool
     */
    private function  verificaExistencia()
    {
        $request = $this->getRequest();
        $repository = $this->getEm()->getRepository($this->entity);
        if ($repository->findOneByLogin($request->getPost()['login'])):
            return "LOGIN";
        elseif ($repository->findOneByCpf((!empty($request->getPost()['cpf'])?$request->getPost()['cpf']:"0"))):
            return "CPF";
        elseif ($repository->findOneByEmail($request->getPost()['email'])):
            return "E-MAIL";
        endif;

        return false;
    }
}