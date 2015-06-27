<?php

namespace Acl\Service;

use Doctrine\ORM\EntityManager;
use Senna\Service\AbstractService;
use Zend\Stdlib\Hydrator;

/**
 * Service de empresa
 * 
 * @author Jefferson Fernandes
 * @date 25/06/2015
 * @time 00:19:56
 * @project_name Senna -- Grupo Capital Ponto
 */
class Perfis extends AbstractService {

	/**
	 * @var EntityManager
	 */
	private $em;
	
	/**
	 * Contrutor
	 * @param EntityManager $em        	
	 */
	public function __construct(EntityManager $em)
	{
		parent::__construct($em);
		$this->entity = "Acl\Entity\Perfis";
		$this->em = $em;
	}

    /**
     * @param array $data
     * @return mixed
     * @throws \Doctrine\ORM\ORMException
     */
    public function insert(array $data)
    {
        $entity = new $this->entity($data);
        $entity->setAdmin(false);
        if(isset($data['permitir_acesso_total']))
            $entity->setAdmin(true);

        if(isset($data['parent']))
        {
            $parent = $this->em->getReference($this->entity, $data['parent']);
            $entity->setParent($parent);
        }
        else
            $entity->setParent(null);

        $this->em->persist($entity);
        $this->em->flush();
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

        $entity->setAdmin(false);
        if(isset($data['permitir_acesso_total']))
            $entity->setAdmin(true);


        if(isset($data['parent']))
        {
            $parent = $this->em->getReference($this->entity, $data['parent']);
            $entity->setParent($parent);
        }
        else
            $entity->setParent(null);

        $this->em->persist($entity);
        $this->em->flush();
        return $entity;
    }
}