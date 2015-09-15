<?php
/**
 * @author Jefferson Fernandes
 * @date 08/11/2014
 * @time 19:10:03
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Service;
use Doctrine\ORM\EntityManager;
use Senna\Entity\Subclassesprodutos as SubClassesProdutosService ;
use Senna\Entity\Configurator;

class SubClassesProdutos {
	/**
	 * @var EntityManager
	 */
	private $em;
	
	public function __construct(EntityManager $em){
		$this->em = $em;
	}
	/**
	 * Metodo de insersao de novas subclasses
	 * @param array $data
	 */
	public function insert(array $data){
		$data['id_produto_categoria'] = $this->em->getReference('Senna\Entity\Classesprodutos', $data['id_produto_categoria']);
		$entity = new SubClassesProdutosService($data);
		$this->em->persist($entity);
		$this->em->flush();
		return $entity;
	}
	/**
	 * Metodo de atualizacao de classes existentes
	 * @param array $data
	 */
	public function update(array $data){
		$data['id_produto_categoria'] = $this->em->getReference('Senna\Entity\Classesprodutos', $data['id_produto_categoria']);
		$entity = $this->em->getReference('Senna\Entity\Subclassesprodutos', $data['id']);
		
		//print_r($data);
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
		$entity = $this->em->getReference('Senna\Entity\Subclassesprodutos', $id);
		if($entity )
			$this->em->remove($entity);
		$this->em->flush();
		return $id;
	}
}
