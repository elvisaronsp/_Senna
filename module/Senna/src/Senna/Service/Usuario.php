<?php

namespace Senna\Service;

use Doctrine\ORM\EntityManager;
use Senna\Entity\Configurator;

/**
 * Service de usuario
 * 
 * @author Jefferson Fernandes
 * @date 16/02/2015
 * @time 19:58:00
 * @project_name Senna -- Grupo Capital Ponto
 */
class Usuario extends AbstractService {

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
		$this->entity = "Senna\Entity\Usuario";
		$this->em = $em;
	}
}