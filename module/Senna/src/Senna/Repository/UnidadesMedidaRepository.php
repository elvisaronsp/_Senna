<?php

/**
 * Repository Unidades de medida
 * @author Jefferson Fernandes
 * @date 15/11/2014
 * @time 21:06:17
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Repository;
use Doctrine\ORM\EntityRepository,
	Doctrine\Entity;
use Senna\Entity\Unidadesmedida;

class UnidadesMedidaRepository extends EntityRepository {
		
	/**
	 * Cria um array contendo as medidas de uso
	 * @return array
	 */
	public function toList(array $where=null) {
		$entities = $this->findAll();

		$unidades = array ();
		foreach ( $entities as $key => $entity ) :
			$unidades [$key] ['id'] = "" . $entity->getId() . "";
			$unidades [$key] ['descricao'] = $entity->getDescricao();
			$unidades [$key] ['sigla'] = $entity->getSigla();
			if( $entity->getFracionado() == "1")
				$unidades [$key] ['fracionado'] = "Sim";
			else 	
				$unidades [$key] ['fracionado'] = "N&atilde;o";
			if($entity->getPadrao() == "1")
				{
				$unidades [$key] ['padrao'] = "1";
				$unidades [$key] ['_padrao'] = "<i class='icon-ok' title='Sim'>";
				}
			else
				{
				$unidades [$key] ['padrao'] = "0";
				$unidades [$key] ['_padrao'] = "";
				}
		endforeach;

		$r_json = $unidades;
		return $r_json;
	}
	
	
	/**
	 * Validacoes para insercao ou atualizao de uma unidade de uso
	 * @return bool
	 */
	public function validePost($post){
		$padrao = 0;
		if(isset($post['padrao']))
		{
			if($post['padrao']=='1')
				{
				$entities = $this->findAll();
				foreach($entities as $entity):
					if($entity->getPadrao() =="1")
						$padrao++;
				endforeach;
				}
		}
		if($padrao > 0 )
			return false;
		else 
			return true;		
	}
	
	/**
	 * Retorna id e nome das da unidade de  medida que esta setada coo padrao pelo usuario
	 * @return array
	 */
	public function buscarUnidadePadrao() {
		
		$query =  $this->_em->createQueryBuilder();
		$query->select('unidadesmedida');
		$query->from('Senna\Entity\Unidadesmedida', 'unidadesmedida');
		$query->andWhere('unidadesmedida.padrao = 1');
		
		//print_r($query->getQuery()->getDql());exit;
		
		$entities = $query->getQuery()->getResult();
		$array = array ();
		foreach ( $entities as $entity ):
			$array [] = $entity->getId ();
			$array [] = $entity->getDescricao ();
		endforeach;
		//echo "<br>";
		//print_r($array);
		//echo "</br>";
		return $array;
	}
	
	/**
	 * Metodo responsavel por buscar via like as unidades de medida cadastraa
	 * @param array $where
	 * @return array
	 */
	public function getLike(array $where = null) {
	
		$query =  $this->_em->createQueryBuilder();
	
		$query->select('unidadesmedida');
		$query->from('Senna\Entity\Unidadesmedida', 'unidadesmedida');
		$query->andWhere($query->expr()->like('unidadesmedida.descricao', $query->expr()->literal('%'.$where['filter'].'%')));
		//print_r($query->getQuery()->getDql());exit;
		$entities = $query->getQuery()->getResult();
		$list = array();
		foreach ( $entities as $key => $entity ) :
			$list[$key]['id']    = $entity->getId();
			$list[$key]['info']  = $entity->getSigla();
			$list[$key]['value'] = $entity->getDescricao();
		endforeach;

		$r_json = $list;
		return $r_json;
	}
	
	
	/**
	 * Metodo responsavel por buscar dados das unidades de medida por id 
	 * @param integer $id
	 * @return array:
	 */
	public function getById($id) {
		$entity = $this->find($id);
		$list = array();

		$list['id']    = $entity->getId();
		$list['descricao']  = $entity->getDescricao();
		$list['sigla'] = $entity->getSigla();
		$list['fracionado'] = $entity->getFracionado();
		$list['padrao'] = $entity->getPadrao();
	
		$r_json = $list;
		return $r_json;
	}
}