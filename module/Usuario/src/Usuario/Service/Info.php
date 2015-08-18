<?php
namespace Usuario\Service;

use Doctrine\ORM\EntityManager;
use Senna\Service\AbstractService;
use Zend\Stdlib\Hydrator;
use Zend\Mail\Transport\Smtp AS SmtpTransport;
use Util\Mail\Mail;
use Zend\XmlRpc\Value\DateTime;

/**s
 * Class Funcionarios
 * @package Acl\Service
 */
class Funcionarios extends AbstractService
{
    /**
     * @var EntityManager
     * @var $transport
     * @var $view
     */
    private $em;
    protected $transport;
    protected $view;

    /**
     * @param EntityManager $em
     * @param SmtpTransport $transport
     * @param $view
     */
    public function __construct(EntityManager $em, SmtpTransport $transport, $view)
    {
        parent::__construct($em);
        $this->em = $em;
        $this->view = $view;
        $this->transport = $transport;
        /*$this->entity = "Usuario\Entity\Funcionarios";
        $this->horarios = "Usuario\Entity\Horarios";
        $this->contatos = "Usuario\Entity\Contatos";
        $this->enderecos = "Usuario\Entity\Enderecos";
        */
    }

    /**
     * @param $key
     * @return array
     */
    public function verificaChaveAtivacaoResetSenha($key)
    {
        $repository = $this->em->getRepository("Usuario\Entity\Funcionarios");
        $funcionario = $repository->findOneByChaveAtivacao($key);
        if (!$funcionario)
            return array();
        else {
            if ($funcionario && $funcionario->getPrazoRedefinirSenha() >= new \DateTime('now')) {
                return $funcionario;
            } else {
                return array(0, 1);
            }
        }
    }

    /**
     * @param $key
     * @return mixed
     */
    public function ativarFuncionario($key)
    {
        $repository = $this->em->getRepository("Usuario\Entity\Funcionarios");
        $funcionario = $repository->findOneByChaveAtivacao($key);

        if (!$funcionario)
            return array();
        else {
            if ($funcionario && !$funcionario->getConfirmado()) {
                $funcionario->setConfirmado(true);
                $this->em->persist($funcionario);
                $this->em->flush();
                return $funcionario;
            } else
                return array(0, 1);
        }
    }

    /**
     * @see insert , update , login
     * @param $entity
     * @param $data
     * @return mixed
     * @throws \Doctrine\ORM\ORMException
     * utilizado pelo inset e pelo update
     * como a funcao e utiliada pelo login tambem
     * e feito a verificacao se os datas existem
     * uma vez que os datas de insercao e atualizacao do usuario sao diferentes
     */
    private function setParamExtra($entity, $data)
    {

        if (isset($data['empresa'])):
            $idEmpresa = $this->em->getReference("Senna\Entity\Empresa", $data['empresa']);
            $entity->setEmpresa($idEmpresa);
        endif;
        if (isset($data['id_perfil'])):
            $perfil = $this->em->getReference("Acl\Entity\Perfis", $data['id_perfil']);
            $entity->setPerfil($perfil);
        endif;
        if (isset($data['mensagemBoasVindas'])):
            (!$data['mensagemBoasVindas']) ? $entity->setConfirmado(true) : $entity->setConfirmado(false);
        endif;
        if (isset($data['solicitarRedefinirSenha'])):
            ($data['solicitarRedefinirSenha']) ? $entity->setRedefinirSenha(true) : $entity->setRedefinirSenha(false);
        endif;
        if (isset($data['ativo'])):
            ($data['ativo']) ? $entity->setAtivo(true) : $entity->setAtivo(false);
        endif;
        if (isset($data['modoFerias'])):
            ($data['modoFerias']) ? $entity->setFerias(true) : $entity->setFerias(false);
        endif;

        if (isset($data['alertas'])):
            ($data['alertas']) ? $entity->setAlertas(true) : $entity->setAlertas(false);
        endif;

        if (isset($data['visualizar_dashboard'])):
            ($data['visualizar_dashboard']) ? $entity->setVisualizarDashboard(true) : $entity->setVisualizarDashboard(false);
        endif;

        if (isset($data['visualizar_todos_funcionarios'])):
            ($data['visualizar_todos_funcionarios']) ? $entity->setVisualizarTodosFuncionarios(true) : $entity->setVisualizarTodosFuncionarios(false);
        endif;

        return $entity;
    }

    /**
     * @param $entityFuncionario
     * @param $data
     * insere todos os contatos do usaario na tabela de contatos
     */
    private function incluirContatos($entityFuncionario, $data)
    {
        if (isset($data['contato__id'])):
            foreach ($data['contato__id'] AS $key => $value) {
                if (!empty($data['ac_' . $key])):

                    $entity = new $this->contatos();
                    $entity->setUsuarioId($entityFuncionario);
                    $entity->setTipoCadastro($data['contato__id_tipo_cadastro'][$key]);
                    $entity->setTipoContato($data['contato__id_tipo_contato'][$key]);
                    $entity->setContato($data['contato__descricao'][$key]);
                    $entity->setDetalhes($data['contato__detalhes'][$key]);
                    $entity->setPodeExcluir(false);

                    $this->em->persist($entity);
                    $this->em->flush();

                endif;
            }
        endif;
    }

    /**
     * @param $entityFuncionario
     * @param $data
     * Insere todos os enderecos do usuario na tabela de enderecos
     */
    private function incluirEndereco($entityFuncionario, $data)
    {
        if (isset($data['endereco__cep'])):
            foreach ($data['endereco__cep'] AS $key => $value) {
                if (!empty($data['ac_e_' . $key])):

                    $entity = new $this->enderecos();
                    $entity->setUsuario($entityFuncionario);
                    $entity->setCep($data['endereco__cep'][$key]);
                    $entity->setLogradouro($data['endereco__logradouro'][$key]);
                    $entity->setNumero($data['endereco_entidade__numero'][$key]);
                    $entity->setComplemento($data['endereco_entidade__complemento'][$key]);
                    $entity->setBairro($data['endereco__bairro'][$key]);
                    $entity->setCidade($data['endereco__id_cidade'][$key]);
                    $entity->setReferencia($data['endereco_entidade__informacoes_adicionais'][$key]);
                    $entity->setTipo($data['endereco_entidade__id_tipo_cadastro'][$key]);
                    $entity->setUf($data['estado'][$key]);
                    $entity->setPrincipal($data['endereco_entidade__principal'][$key]);

                    $this->em->persist($entity);
                    $this->em->flush();

                endif;
            }
        endif;
    }


    /**
     * @param $entityFuncionario
     * @param $data
     * Insere todos os horarios do usuario na tabela de horarios
     */
    private function incluirHorarios($entityFuncionario, $data)
    {
        $entityHorarios = new $this->horarios($data);
        $entityHorarios->setUsuario($entityFuncionario);
        $this->em->persist($entityHorarios);
        $this->em->flush();
    }

    /**
     * @param $entityFuncionario
     * @param $data
     * Verifica se tem que enviar uma mensagem de boas vindas para o usuario
     */
    private function enviarBoasVindas($entityFuncionario, $data)
    {

        if ($entityFuncionario && isset($data['mensagemBoasVindas'])) {
            if ($data['mensagemBoasVindas'] == "1"):
                $this->enviarEmail('SENNA - Confirmação de cadastro', $entityFuncionario->getEmail(), 'add-user',
                    array(
                        'senha'         => $data['senha'],
                        'nome'          => $entityFuncionario->getNome(),
                        'email'         => $entityFuncionario->getEmail(),
                        'login'         => $entityFuncionario->getLogin(),
                        'chaveAtivacao' => $entityFuncionario->getChaveAtivacao()
                    )
                );
            endif;
        }
    }

    /**
     * @param array $data
     * @return mixed
     * @throws \Doctrine\ORM\ORMException
     */
    public function insert(array $data)
    {
        $entity = new $this->entity($data);
        $this->setParamExtra($entity, $data);

        $this->em->persist($entity);
        $this->em->flush();

        $this->incluirContatos($entity, $data);
        $this->incluirEndereco($entity, $data);
        $this->incluirHorarios($entity, $data);
        $this->enviarBoasVindas($entity, $data);

        return $entity;
    }


    /**
     * @param $data
     * Verifica a necessidade de alterar a senha de acesso
     */
    private function verificaAlteracaoSenha($data)
    {
        if (empty($data['senha'])):
            unset($data['senha']);
        else:
            //$this->enviarEmail("Alteracao de senha", $data['email'], 'edit-user', $data);
        endif;
        return $data;
    }


    /**
     * @param $entityFuncionario
     * @param $data
     * @return mixed
     * Metoro utilizados pela area de login para eventuais bloqueios ou liberacoes de usuario
     */
    private function verificaBloqueiosLogin($entityFuncionario, $data)
    {
        if (isset($data['bloqueioLogin'])) {
            $bloqueio = $data['bloqueioLogin'] + 1;
            $entityFuncionario->setTentativasLogin($bloqueio);
        }

        if ($entityFuncionario->getTentativasLogin() >= 3) {
            $entityFuncionario->setTentativasLogin(0);

            $date = new \DateTime('now');
            $date->modify("+10 minutes");
            $entityFuncionario->setBloqueiotemporario($date);
            $this->enviarAlertaBloqueioContaExcessoTentativas($data['nomeFuncionario']);
        }
        return $entityFuncionario;
    }


    /**
     * @param array $data
     * @return bool|\Doctrine\Common\Proxy\Proxy|null|object
     * @throws \Doctrine\ORM\ORMException
     */
    public function update(array $data)
    {
        $entity = $this->em->getReference($this->entity, $data['id']);
        $data = $this->verificaAlteracaoSenha($data);
        (new Hydrator\ClassMethods())->hydrate($data, $entity);
        $this->setParamExtra($entity, $data);
        $this->incluirContatos($entity, $data);
        $this->incluirEndereco($entity, $data);
        $this->incluirHorarios($entity, $data);
        $this->verificaBloqueiosLogin($entity, $data);


        $this->em->persist($entity);
        $this->em->flush();

        return $entity;
    }


    /**
     * @param $assuntoEmail
     * @param $destinatarioEmail
     * @param $paginaRenderizada
     * @param array $data
     */
    private function enviarEmail($assuntoEmail, $destinatarioEmail, $paginaRenderizada, $data = array())
    {
        $mail = new Mail($this->transport,
            $this->view,
            $paginaRenderizada
        );

        $mail->setSubject($assuntoEmail)
            ->setTo($destinatarioEmail)
            ->setData($data)
            ->prepare()
            ->send();
    }

    /**
     * @param $nomeFuncionario
     */
    public function enviarAlertaBloqueioContaExcessoTentativas($nomeFuncionario)
    {
        setlocale(LC_ALL, 'pt_BR', 'pt_BR.utf-8', 'pt_BR.utf-8', 'portuguese');
        date_default_timezone_set('America/Sao_Paulo');

        $repository = $this->em->getRepository("Acl\Entity\Perfis");
        $perfisAdministradores = $repository->findBy(array('admin' => true));

        $repository = $this->em->getRepository("Usuario\Entity\Funcionarios");
        foreach ($perfisAdministradores AS $perfis):
            $usuariosAdministradores = $repository->findBy(array('perfil' => $perfis->getId()));
            foreach ($usuariosAdministradores AS $usuario):
                $this->enviarEmail('SENNA - Tentativas exessivas de login (' . $nomeFuncionario . ')', $usuario->getEmail(), 'block-user', array('email' => $usuario->getEmail(), 'nome' => $nomeFuncionario, 'ip' => $_SERVER['REMOTE_ADDR'], 'data' => strftime('%A, %d de %B de %Y', strtotime(date('Y-m-d')))));
            endforeach;
        endforeach;
    }


    /**
     * @param $id
     * @throws \Doctrine\ORM\ORMException
     */
    public function enviarEmailRedefinicaoSenha($id)
    {
        $entity = $this->em->getReference($this->entity, $id);
        $entity->setChaveAtivacao($entity->gerarChaveAtivacao());

        $date = new \DateTime('now');
        $date->modify("+10 minutes");
        $entity->setPrazoRedefinirSenha($date);

        $data = $entity->toArray();
        $data['senha'] = "";

        $this->update($data);
        $this->enviarEmail('SENNA - Refefinir senha de acesso', $entity->getEmail(), 'reset-user', array('email' => $entity->getEmail(), 'nome' => $entity->getNome(), 'chaveAtivacao' => $entity->getChaveAtivacao()));
    }
}