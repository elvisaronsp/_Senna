<?php
/**
 * @author Jefferson Fernandes
 * @date 08/11/2014
 * @time 14:21:46
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Service;
use Doctrine\ORM\EntityManager;
use Senna\Entity\Classesprodutos as ClassesProdutosService ;
use Senna\Entity\Configurator;
class ClassesProdutos {
	/**
	 * @var EntityManager
	 */
	private $em;
	
	public function __construct(EntityManager $em){
		$this->em = $em;
	}
	/**
	 * Metodo de insersao de novas classes 
	 * @param array $data
	 */
	public function insert(array $data){
		$entity = new ClassesProdutosService($data);
		$this->em->persist($entity);
		$this->em->flush();
		return $entity;
	}
	/**
	 * Metodo de atualizacao das classes 
	 * @param array $data
	 */
	public function update(array $data){
		$entity = $this->em->getReference('Senna\Entity\Classesprodutos', $data['id']);
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
		$entity = $this->em->getReference('Senna\Entity\Classesprodutos', $id);
		if($entity )
			$this->em->remove($entity);
			$this->em->flush();
			return $id;
	}
}
