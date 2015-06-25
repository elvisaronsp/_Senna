<?php
/**
 * Servico abstrato
 * @author Jefferson Fernandes
 * @date 18/11/2014
 * @time 20:29:05
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Service;
use Doctrine\ORM\EntityManager;
use Senna\Entity\Configurator;

 abstract class AbstractService {
	/**
	 * @var EntityManager
	 */
	private $em;
	
	/**
	 * @var Entity
	 */
	protected $entity;
	
	public function __construct(EntityManager $em){
		$this->em = $em;
	}

	/**
	 * Metodo de insersao de novas classes 
	 * @param array $data
	 */
	public function insert(array $data){
		$entity = new $this->entity($data);
		$this->em->persist($entity);
		$this->em->flush();
		return $entity;
	}
	
	/**
	 * Metodo de atualizacao abstract 
	 * @param array $data
	 */
	public function update(array $data){
		$entity = $this->em->getReference($this->entity, $data['id']);
		$entity = Configurator::configure($entity, $data);
		$this->em->persist($entity);
		$this->em->flush();
		return $entity;
	}
	
	/**
	 * Metodo de remocao de classes existentes
	 * @param int $id
	 * @return int
	 */
	public function delete($id){
		$entity = $this->em->getReference($this->entity, $id);
		if($entity )
			$this->em->remove($entity);
			$this->em->flush();
			return $id;
	}
}
