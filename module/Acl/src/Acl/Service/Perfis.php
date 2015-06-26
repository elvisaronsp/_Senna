<?php

namespace Acl\Service;

use Doctrine\ORM\EntityManager;
use Senna\Service\AbstractService;

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