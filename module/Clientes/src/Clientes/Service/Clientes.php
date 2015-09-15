<?php
namespace Clientes\Service;

use Doctrine\ORM\EntityManager;
use Senna\Service\AbstractService;
use Zend\Stdlib\Hydrator;

/**
 * Class Clientes
 * @package Clientes\Service
 */
class Clientes extends AbstractService
{
    /**
     * @var EntityManager
     */
    private $em;

    /**
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em)
    {
        parent::__construct($em);
        $this->em = $em;
        $this->entity = "Clientes\Entity\Clientes";
        //$this->horarios = "Usuario\Entity\Horarios";
        //$this->contatos = "Usuario\Entity\Contatos";
        //$this->enderecos = "Usuario\Entity\Enderecos";
    }

    /**
     * @see insert , update
     * @param $entity
     * @param $data
     * @return mixed
     * @throws \Doctrine\ORM\ORMException
     */
    private function setParamExtra($entity, $data)
    {

        if (isset($data['empresa'])):
            $idEmpresa = $this->em->getReference("Senna\Entity\Empresa", $data['empresa']);
            $entity->setEmpresa($idEmpresa);
        endif;
        /*
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
        */

        return $entity;
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

        //$this->incluirContatos($entity, $data);
        //$this->incluirEndereco($entity, $data);
        //$this->incluirHorarios($entity, $data);
        //$this->enviarBoasVindas($entity, $data);

        return $entity;
    }
}