<?php
namespace Clientes\Service;

use Doctrine\Common\Util\Debug;
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
        $this->entity    = "Clientes\Entity\Clientes";
        $this->contatos  = "Clientes\Entity\Contatos";
        $this->enderecos = "Clientes\Entity\Enderecos";
        $this->vendedores = "Clientes\Entity\Vendedores";
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

        $entity->setIeIsento($this->checkPostReturnBoolean($data,'ieIsento'));

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
        $this->resolvePersistenciaContatos($entity, $data);
        $this->resolvePersistenciaEnderecos($entity , $data);
        $this->incluirVendedores($entity, $data);

        return $entity;
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

        $this->setParamExtra($entity, $data);
        $this->resolvePersistenciaContatos($entity, $data);
        $this->resolvePersistenciaEnderecos($entity , $data);
        //$this->incluirVendedores($entity, $data);

        $this->em->persist($entity);
        $this->em->flush();

        return $entity;
    }
}