<?php

/**
 * Repository de Produtos
 * @author Jefferson Fernandes
 * @date 21/11/2014
 * @time 17:44:17
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Repository;
use Doctrine\ORM\EntityRepository,
	Doctrine\Entity;
use Senna\Entity\Itensvenda;

class ItensVendaEstoqueRepository extends EntityRepository {
	
	public function toList(array $where) {
		$entities = $this->findAll();
	
		$item = array ();
		foreach ( $entities as $key => $entity ) :
		echo  $entity->getQuantidade();
		endforeach;
	
		$r_json = $item;
		return $r_json;
	}
	
	
	/**
	 * Retorna valores de estoque de determinado item
	 * @return array
	 */
	public function getEstoqueItem($id) {
	
		$query =  $this->_em->createQueryBuilder();
		$query->select('itensEstoque');
		$query->from('Senna\Entity\Itensvendaestoque', 'itensEstoque');
		$query->andWhere('itensEstoque.empresa = 1');
		$query->andWhere('itensEstoque.itensvenda = :id');
		$query->setParameter('id', $id);
	
		//print_r($query->getQuery()->getDql());exit;
	
		$entities = $query->getQuery()->getResult();
		
		$array = array ();
		foreach ( $entities as $entity ):
		$array ['produto_estoque__min'] = $entity->getEstoqueMinimo ();
		$array ['produto_estoque__max'] = $entity->getEstoqueMaximo ();
		$array ['produto_estoque__qtd'] = $entity->getQuantidade ();
		endforeach;
		//echo "<br>";
		//print_r($array);
		//echo "</br>";
		return $array;
	}

}