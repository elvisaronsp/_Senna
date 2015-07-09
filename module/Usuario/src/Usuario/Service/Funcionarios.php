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
     * @param array $data
     * @return mixed
     * @throws \Doctrine\ORM\ORMException
     */
    public function insert(array $data)
    {
        $data = array_filter($data);
        $entityHorarios = new $this->horarios($data);

        $this->em->persist($entityHorarios);
        $this->em->flush();

        $entity = new $this->entity($data);
        $entity = $this->setParamExtra($entity,$data);
        $entity->setHorarios($entityHorarios);

        $this->em->persist($entity);
        $this->em->flush();

        if ($entity && isset($data['mensagemBoasVindas'])) {
            $this->enviarEmail('SENNA - Confirmação de cadastro', $entity->getEmail(), 'add-user', array('senha'=>$entity->getSenha(),'nome'=>$entity->getNome(),'email'=>$entity->getEmail()), $entity->getChaveAtivacao());
            return $entity;
        }
        $this->em->persist($entityHorarios);
        $this->em->flush();

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
            'nome' => $data['nome'],
            'email' => $data['email'],
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

    /**
     * @param array $data
     * @return bool|\Doctrine\Common\Proxy\Proxy|null|object
     * @throws \Doctrine\ORM\ORMException
     */
    public function update(array $data)
    {
        $entity = $this->em->getReference($this->entity, $data['id']);
        (new Hydrator\ClassMethods())->hydrate($data, $entity);

        $entity->setAdmin(false);
        if(isset($data['permitir_acesso_total']))
            $entity->setAdmin(true);

        $this->em->persist($entity);
        $this->em->flush();


        ### VERIFICA TODOS OS ID RELACIONADOS E COLOCA NA ENTIDADE
        if(isset($data[0])):
            foreach ($data[0] as $key => $value):
                $entityPrivilegios = new $this->privilegios();

                $perfil = $this->em->getReference("Acl\Entity\Perfis",$entity->getId());
                $entityPrivilegios->setPerfil($perfil);

                $acesso = $this->em->getReference("Acl\Entity\Acessos",$value[0]);
                $entityPrivilegios->setAcessos($acesso);

                $recurso = $this->em->getReference("Acl\Entity\Recursos",$value[1]);
                $entityPrivilegios->setRecurso($recurso);

                $this->em->persist($entityPrivilegios);
                $this->em->flush();
            endforeach;
        endif;

        return $entity;
    }
}