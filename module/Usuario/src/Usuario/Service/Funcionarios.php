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
        $this->entity = "Usuario\Entity\Funcionarios";
        $this->horarios = "Usuario\Entity\Horarios";
        $this->contatos = "Usuario\Entity\Contatos";
        $this->enderecos = "Usuario\Entity\Enderecos";
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
        else
        {
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
     * @param $entity
     * @param $data
     * @return mixed
     * @throws \Doctrine\ORM\ORMException
     */
    private function setParamExtra($entity, $data)
    {
        $perfil = $this->em->getReference("Acl\Entity\Perfis", $data['id_perfil']);
        $entity->setPerfil($perfil);

        if (!isset($data['mensagemBoasVindas']))
            $entity->setConfirmado(true);

        $entity->setRedefinirSenha(false);
        if (isset($data['solicitarRedefinirSenha']))
            $entity->setRedefinirSenha(true);

        $entity->setAtivo(false);
        if (isset($data['ativo']))
            $entity->setAtivo(true);

        $entity->setFerias(false);
        if (isset($data['modoFerias']))
            $entity->setFerias(true);

        $entity->setAlertas(false);
        if (isset($data['alertas']))
            $entity->setAlertas(true);

        return $entity;
    }

    /**
     * @param $entityFuncionario
     * @param $data
     * insere todos os contatos do usaario na tabela de contatos
     */
    private function incluirContatos($entityFuncionario, $data)
    {
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
    }

    /**
     * @param $entityFuncionario
     * @param $data
     * Insere todos os enderecos do usuario na tabela de enderecos
     */
    private function incluirEndereco($entityFuncionario, $data)
    {
        foreach ($data['endereco__cep'] AS $key => $value) {
            if (!empty($data['ac_e_' . $key])):

                $entity = new $this->enderecos();
                $entity->setUsuario($entityFuncionario);
                $entity->setCep($data['endereco__cep'][$key]);
                $entity->setLogradouro($data['endereco__logradouro'][$key]);
                $entity->setNumero($data['endereco_entidade__numero'][$key]);
                $entity->setComplemento($data['endereco_entidade__informacoes_adicionais'][$key]);
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
    }

    /**
     * @param array $data
     * @return mixed
     * @throws \Doctrine\ORM\ORMException
     */
    public function insert(array $data)
    {
        $entity = new $this->entity($data);
        $entity = $this->setParamExtra($entity, $data);

        $this->em->persist($entity);
        $this->em->flush();

        $this->incluirContatos($entity, $data);
        $this->incluirEndereco($entity, $data);

        $entityHorarios = new $this->horarios($data);
        $entityHorarios->setUsuario($entity);
        $this->em->persist($entityHorarios);
        $this->em->flush();

        if ($entity && isset($data['mensagemBoasVindas'])) {
            $this->enviarEmail(
                'SENNA - Confirmação de cadastro',
                $entity->getEmail(),
                'add-user',
                array(
                    'senha' => $data['senha'],
                    'nome' => $entity->getNome(),
                    'email' => $entity->getEmail(),
                    'login' => $entity->getLogin(),
                    'chaveAtivacao' => $entity->getChaveAtivacao()
                )
            );
            return $entity;
        }

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
     * @param array $data
     * @return bool|\Doctrine\Common\Proxy\Proxy|null|object
     * @throws \Doctrine\ORM\ORMException
     */
    public function update(array $data)
    {
        $entity = $this->em->getReference($this->entity, $data['id']);

        if (empty($data['senha'])):
            unset($data['senha']);
        else:
            //$this->enviarEmail("Alteracao de senha", $data['email'], 'edit-user', $data);
        endif;

        (new Hydrator\ClassMethods())->hydrate($data, $entity);

        if (isset($data['bloqueioLogin'])) {
            $bloqueio = $data['bloqueioLogin'] + 1;
            $entity->setTentativasLogin($bloqueio);
        }

        if ($entity->getTentativasLogin() >= 3) {
            $entity->setTentativasLogin(0);

            $date = new \DateTime('now');
            $date->modify("+10 minutes");
            $entity->setBloqueiotemporario($date);
            $this->enviarAlertaBloqueioContaExcessoTentativas($data['nomeFuncionario']);
        }

        $this->em->persist($entity);
        $this->em->flush();

        return $entity;
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