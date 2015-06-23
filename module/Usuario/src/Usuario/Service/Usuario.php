<?php
/**
 * User: Jefferson
 * Date: 05/06/2015
 * Time: 12:21
 */

namespace Usuario\Service;
use Doctrine\ORM\EntityManager;
use Zend\Stdlib\Hydrator;
use Zend\Mail\Transport\Smtp AS SmtpTransport;
use Util\Mail\Mail;

/**
 * Class Usuario
 * @package Usuario\Service
 */
class Usuario extends AbstractService
{

    /**
     * @var $transport
     * @var $view
     */
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

        $this->entity = "Usuario\Entity\Usuario";
        $this->transport = $transport;
        $this->view = $view;
    }

    /**
     * @param array $data
     * @return mixed
     */

    public function insert(array $data)
    {
        $entity = new $this->entity($data);

        $perfil = $this->em->getReference("Acl\Entity\Role",$data['perfil']);
        $entity->setPerfil($perfil); // Injetando entidade carregada

        $this->em->persist($entity);
        $this->em->flush();
        if ($entity) {
            $this->enviarEmail('SENNA - Confirmação de cadastro', $data['email'], 'add-user', $data, $entity->getChaveAtivacao());
            return $entity;
        }
    }

    public function verificaUsuarioCadastrado(array $data)
    {
        $validator = new \DoctrineModule\Validator\ObjectExists(array(
            'object_repository' =>  $this->em->getRepository('Usuario\Entity\Usuario'),
            'fields' => array('email')
        ));

        return $validator->isValid($data['email']);

    }

    /**
     * @param $key
     * @return mixed
     */
    public function ativacao($key)
    {
        $repo = $this->em->getRepository("Usuario\Entity\Usuario");
        $usuario = $repo->findOneByChaveAtivacao($key);

        if ($usuario && !$usuario->getAtivo()) {
            $usuario->setAtivo(true);
            $this->em->persist($usuario);
            $this->em->flush();
            return $usuario;
        }
    }

    /**
     * @param array $data
     * @return bool|\Doctrine\Common\Proxy\Proxy|null|object
     * @throws \Doctrine\ORM\ORMException
     */
    public function update(array $data)
    {
        $entity = $this->em->getReference($this->entity, $data['id']);

        if (empty($data['senha'])) {
            unset($data['senha']);
        } else {
            $this->enviarEmail("Alteracao de senha", $data['email'], 'edit-user', $data);
        }

        (new Hydrator\ClassMethods())->hydrate($data, $entity);

        $this->em->persist($entity);
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
}