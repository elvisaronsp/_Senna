<?php
namespace Usuario\Service;

use Doctrine\ORM\EntityManager;
use Senna\Service\AbstractService;
use Zend\Stdlib\Hydrator;
use Zend\Mail\Transport\Smtp AS SmtpTransport;
use Util\Mail\Mail;

/**s
 * Class Funcionarios
 * @package Acl\Service
 */
class Funcionarios extends AbstractService {

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
    public function __construct(EntityManager $em,SmtpTransport $transport, $view)
    {
        parent::__construct($em);
        $this->transport = $transport;
        $this->view = $view;
        $this->entity = "Usuario\Entity\Funcionarios";
        $this->horarios = "Usuario\Entity\Horarios";
        $this->em = $em;
    }


    /**
     * @param $entity
     * @param $data
     * @return mixed
     * @throws \Doctrine\ORM\ORMException
     */
    private function setParamExtra($entity,$data)
    {
        $perfil = $this->em->getReference("Acl\Entity\Perfis",$data['id_perfil']);
        $entity->setPerfil($perfil);

        if(!isset($data['mensagemBoasVindas']))
            $entity->setConfirmado(true);

        $entity->setRedefinirSenha(false);
        if(isset($data['solicitarRedefinirSenha']))
            $entity->setRedefinirSenha(true);

        $entity->setAtivo(false);
        if(isset($data['ativo']))
            $entity->setAtivo(true);

        $entity->setFerias(false);
        if(isset($data['modoFerias']))
            $entity->setFerias(true);

        $entity->setAlertas(false);
        if(isset($data['alertas']))
            $entity->setAlertas(true);

        return $entity;
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
        else
        {
            if ($funcionario && !$funcionario->getConfirmado())
            {
                $funcionario->setConfirmado(true);
                $this->em->persist($funcionario);
                $this->em->flush();
                return $funcionario;
            }
            else
                return array(0,1);
        }
    }

    /**
     * @param array $data
     * @return mixed
     * @throws \Doctrine\ORM\ORMException
     */
    public function insert(array $data)
    {
        $data = array_filter($data);

        $entity = new $this->entity($data);
        $entity = $this->setParamExtra($entity,$data);

        $this->em->persist($entity);
        $this->em->flush();

        $entityHorarios = new $this->horarios($data);
        $entityHorarios->setUsuario($entity);
        $this->em->persist($entityHorarios);
        $this->em->flush();

        if ($entity && isset($data['mensagemBoasVindas'])) {
            $this->enviarEmail('SENNA - Confirmação de cadastro', $entity->getEmail(), 'add-user', array('senha'=>$data['senha'],'nome'=>$entity->getNome(),'email'=>$entity->getEmail(),'login'=>$entity->getLogin()), $entity->getChaveAtivacao());
            return $entity;
        }

        return $entity;
    }

    /**
     * @param $assuntoEmail
     * @param $destinatarioEmail
     * @param $paginaRenderizada
     * @param array $data
     * @param null $chaveAtivacao
     */
    private function enviarEmail($assuntoEmail, $destinatarioEmail, $paginaRenderizada, $data = array(), $chaveAtivacao = null)
    {
        $dataEmail = array('senha' => $data['senha'],
            'nome'  => $data['nome'],
            'email' => $data['email'],
            'login' => $data['login'],
            'chaveAtivacao' => $chaveAtivacao
        );

        $mail = new Mail($this->transport,
            $this->view,
            $paginaRenderizada
        );

        $mail->setSubject($assuntoEmail)
            ->setTo($destinatarioEmail)
            ->setData($dataEmail)
            ->prepare()
            ->send();
    }


    public function enviarAlertaBloqueioContaExcessoTentativas()
    {
        $repository = $this->em->getRepository("Acl\Entity\Perfis");
        $perfisAdministradores = $repository->findBy(array( 'admin' => true));

        $repository = $this->em->getRepository("Usuario\Entity\Funcionarios");
        foreach($perfisAdministradores AS $perfis):
            $usuariosAdministradores = $repository->findBy(array( 'perfil' => $perfis->getId()));
            foreach($usuariosAdministradores AS $usuario):
                echo $usuario->getEmail();
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
        (new Hydrator\ClassMethods())->hydrate($data, $entity);
        
        if(isset($data['bloqueioLogin']))
        {
            $bloqueio = $data['bloqueioLogin']+1;
            $entity->setTentativasLogin($bloqueio);
        }

       if($entity->getTentativasLogin() >= 3)
        {
            $entity->setTentativasLogin(0);

            $date = new \DateTime('now');
            $date->modify("+10 minutes");
            $entity->setBloqueiotemporario($date);
            $this->enviarAlertaBloqueioContaExcessoTentativas();
        }

        $this->em->persist($entity);
        $this->em->flush();

        return $entity;
    }
}