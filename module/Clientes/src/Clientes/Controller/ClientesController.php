<?php
namespace Clientes\Controller;

use Senna\Controller\GrudController;
use Zend\Authentication\AuthenticationService;
use Zend\Authentication\Storage\Session as SessionStorage;
use Zend\Debug\Debug;
use Zend\View\Model\ViewModel;

/**
 * Class ClientesController
 * @package Clientes\Controller
 */
class ClientesController extends GrudController
{

    /**
     * Construto da classe ClientesController
     */
    public function __construct()
    {
        $this->entity         = "Clientes\Entity\Clientes";
        $this->service        = "Clientes\Service\Clientes";
        $this->contatos       = "Clientes\Entity\Contatos";
        $this->enderecos      = "Clientes\Entity\Enderecos";
        $this->form           = "Clientes\Form\Cliente";
        $this->message_insert = "Cliente CADASTRADO com sucesso";
        $this->message_update = "Cliente ATUALIZADO com sucesso";
        $this->message_delete = "Cliente EXCLUIDO com sucesso";
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
        $form->get('estadoCivil')->setAttribute('eval', $data['estadoCivil']);
        $form->get('alertas')->setAttribute('eval', ($data['alertas']) ? '1' : '0');
        $form->get('tipo')->setAttribute('eval', ($data['tipo']) ? '1' : '0');
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
            $retorno = array('form' => $form);
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
        //echo "<pre>";
        //print_r($request->getPost());
        //echo "</pre>";
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
                    //repository = $this->getEm()->getRepository($this->contatos);
                    //$contatos = $repository->findBy(array('usuario' => $request->getPost()['id']));

                    //foreach ($contatos as $contato) {
                    //    $this->getEm()->remove($contato);
                    //}
                    // remove enderecos para atualizacao
                    //$repository = $this->getEm()->getRepository($this->enderecos);
                    //$enderecos = $repository->findBy(array('usuario' => $request->getPost()['id']));

                    //foreach ($enderecos as $endereco) {
                    //    $this->getEm()->remove($endereco);
                    //}

                    // remove horarios para atualizacao
                    //$repository = $this->getEm()->getRepository($this->horarios);
                    //$horarios = $repository->findBy(array('usuario' => $request->getPost()['id']));

                    //foreach ($horarios as $horario) {
                    //    $this->getEm()->remove($horario);
                    //}

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
     * @return bool|string
     */
    private function  verificaExistencia()
    {
        $request = $this->getRequest();
        $repository = $this->getEm()->getRepository($this->entity);
        if ($repository->findByNot((!empty($request->getPost()['id']))?$request->getPost()['id']:null,'razaoSocial',$request->getPost()['razaoSocial'])):
            return "RAZÃO SOCIAL";
        elseif($repository->findByNot((!empty($request->getPost()['id']))?$request->getPost()['id']:null,'cpf',$request->getPost()['cpf'])):
            return "CPF";
        elseif($repository->findByNot((!empty($request->getPost()['id']))?$request->getPost()['id']:null,'codigoCliente',$request->getPost()['codigoCliente'])):
            return "CODIGO CLIENTE";
        elseif($repository->findByNot((!empty($request->getPost()['id']))?$request->getPost()['id']:null,'email',$request->getPost()['email'])):
            return "E-MAIL";
        elseif($repository->findByNot((!empty($request->getPost()['id']))?$request->getPost()['id']:null,'telefone',$request->getPost()['telefone'])):
            return "TELEFONE";
        elseif($repository->findByNot((!empty($request->getPost()['id']))?$request->getPost()['id']:null,'cnpj',$request->getPost()['cnpj'])):
            return "CNPJ";
        elseif($repository->findByNot((!empty($request->getPost()['id']))?$request->getPost()['id']:null,'nomeFantasia',$request->getPost()['nomeFantasia'])):
            return "NOME FANTASIA";
        endif;

        return false;
    }


}