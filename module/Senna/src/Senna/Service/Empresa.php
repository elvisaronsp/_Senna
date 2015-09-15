<?php

namespace Senna\Service;

use Doctrine\ORM\EntityManager;

/**
 * Service de empresa
 * 
 * @author Jefferson Fernandes
 * @date 16/02/2015
 * @time 00:19:56
 * @project_name Senna -- Grupo Capital Ponto
 */
class Empresa extends AbstractService {

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
		$this->entity = "Senna\Entity\Empresa";
		$this->em = $em;
	}
}