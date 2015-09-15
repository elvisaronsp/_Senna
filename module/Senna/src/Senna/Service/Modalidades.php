<?php

namespace Senna\Service;

use Doctrine\ORM\EntityManager;
use Senna\Entity\Configurator;

/**
 * Service de modalidades
 * 
 * @author Jefferson Fernandes
 *         @date 29/11/2014
 *         @time 00:19:56
 *         @project_name Senna -- Grupo Capital Ponto
 */
class Modalidades extends AbstractService {
	/**
	 *
	 * @var EntityManager
	 */
	private $em;
	
	/**
	 * Contrutor
	 * 
	 * @param EntityManager $em        	
	 */
	public function __construct(EntityManager $em) {
		parent::__construct ( $em );
		$this->entity = "Senna\Entity\Modalidadegrades";
		$this->em = $em;
	}
	
	/**
	 * |metodo de insert sobrescreve o AbstractService devido a peculiariades na insersao de uma nova modalidade ou grade|
	 * 
	 * @see \Senna\Service\AbstractService::insert()
	 */
	public function insert(array $data) {
		if ($data ['id_modalidade'] != '0') {
			$modalidade = $this->em->getReference ( 'Senna\Entity\Modalidadegrades', $data ['id_modalidade'] );
			$data ['modalidade'] = $modalidade;
		}
		
		$entity = new $this->entity ( $data );
		$this->em->persist ( $entity );
		$this->em->flush ();
		return $entity;
	}
	
	/**
	 * |metodo de insert sobrescreve o AbstractService devido a peculiariades na atualização de uma nova modalidade ou grade|
	 * 
	 * @see \Senna\Service\AbstractService::update()
	 */
	public function update(array $data) {
		$entity = $this->em->getReference ( $this->entity, $data ['id'] );
		if ($data ['id_modalidade'] != '0') {
			$modalidade = $this->em->getReference ( 'Senna\Entity\Modalidadegrades', $data ['id_modalidade'] );
			$data ['modalidade'] = $modalidade;
		}
		$entity = Configurator::configure ( $entity, $data );
		$this->em->persist ( $entity );
		$this->em->flush ();
		return $entity;
	}
}