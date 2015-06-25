<?php
/**
 * Repositorio de modalidades
 * @author Jefferson Fernandes
 * @date 28/11/2014
 * @time 20:09:53
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Repository;
use Doctrine\ORM\EntityRepository,
	Doctrine\Entity;
use Senna\Entity\Modalidadegrades;

class ModalidadesRepository extends EntityRepository {
		
	/**
	 * Cria um array contendo as modalidades
	 * @return array
	 */
	public function toList(array $where=null) {
		
		$entities = $this->findAll();

		$modalidades = array ();
		foreach ( $entities as $key => $entity ) :
			
			$modalidades [$key] ['id'] = "" . $entity->getId() . "";
			$modalidades [$key] ['descricao'] = $entity->getDescricao();
			$modalidades [$key] ['tipo'] = ($entity->getTipo()=="M")?"MODALIDADE":"GRADE";
			$modalidades [$key] ['modalidade'] = ($entity->getTipo()=="M")?null:$entity->getModalidade()->getDescricao();
			$modalidades [$key] ['id_modalidade'] = ($entity->getTipo()=="M")?null:$entity->getModalidade()->getId();

		endforeach;
		$r_json = $modalidades;
		return $r_json;
	}
	
	
	/**
	 * Validacoes para insercao ou atualizao de uma modalidade ou grade
	 * @return bool
	 */
	public function validePost($post){
		if($post['id_modalidade']=='')
		{
			$post['id_modalidade']= "0";
			return true;
		}
		else 
			return false;		
	}
	
	/**
	 * Retorna id e nome das modalidades
	 * @return array
	 */
	public function fetchPairs($excecao) {
		//print_r($excecao);
		
		$query =  $this->_em->createQueryBuilder();
		$query->select('modalidade');
		$query->from('Senna\Entity\modalidadegrades', 'modalidade');
		$query->andWhere('modalidade.tipo =:tipo');
		$query->setParameter('tipo', "M");

		if(isset($excecao))
			{
			foreach ($excecao As $key =>$value):
				foreach($value As $k =>$v):
					foreach($v As $a =>$b):
					 if(substr($b, 0, 1)!="{" && $b !="")
					 	{
						$query->andWhere('modalidade.id != '.$b.'');
					 	}
					endforeach;
				endforeach;
			endforeach;
			}
// 		/	print_r($query->getQuery()->getDql());exit;
		$entities = $query->getQuery()->getResult();
		
		$array = array ();
		foreach ( $entities as $key => $entity ):
			$array[$key]['id'] = $entity->getId();
			$array[$key]['value'] = $entity->getDescricao ();
		endforeach;
		return $array;
	}
	
	
	
	/**
	 * Retorna id e nome das modalidades
	 * @return array
	 */
	public function getChildren($id) {
	
		$query =  $this->_em->createQueryBuilder();
		$query->select('modalidade');
		$query->from('Senna\Entity\modalidadegrades', 'modalidade');
		$query->andWhere('modalidade.tipo =:tipo');
		$query->setParameter('tipo', "G");
		$query->andWhere('modalidade.modalidade = :id');
		$query->setParameter('id', $id);
		//print_r($query->getQuery()->getDql());exit;
	
		$entities = $query->getQuery()->getResult();

		$array = array ();
		foreach ( $entities as $key => $entity ):
		$array[$key]['id'] = $entity->getId();
		$array[$key]['id_modalidade'] = $entity->getModalidade()->getId();
		$array[$key]['tipo'] = $entity->getTipo();
		$array[$key]['descricao'] = $entity->getDescricao ();
		endforeach;
		return $array;
	}
	
}
	
