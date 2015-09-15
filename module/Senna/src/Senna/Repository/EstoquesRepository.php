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
use Senna\Entity\Estoques;

class EstoquesRepository extends EntityRepository {

	public function toList(array $where) {
		$entities = $this->findAll();
	
		$item = array ();
		foreach ( $entities as $key => $entity ) :
			echo  $entity->getNome();
		endforeach;
	
		$r_json = $item;
		return $r_json;
	}
	
	
}