<?php
/** 
 * @author Jefferson Fernandes
 * @date 04/11/2014
 * @time 23:15:31
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Repository;

use Doctrine\ORM\EntityRepository;

class ClassesProdutosRepository extends EntityRepository {
			
	/**
	 * @param $repositorySubClasse Repositorio da SubClasse de itens
	 * @return Array Monta Array com classes e sub classes
	 */
	public function toArrayClassesSubClasses($repositorySubClasse) {
		$emClass = $this->findAll ();
		$emSubClass = $repositorySubClasse->findAll ();
		
		$class = array ();
		foreach ( $emClass as $key => $entity ) :
			$class [$key] ['id'] = "" . $entity->getId () . "";
			$class [$key] ['descricao'] = $entity->getNome ();
			$class [$key] ['id_produto_categoria'] = null;
			$class [$key] ['localizacao'] = "";
			$class [$key] ['subcategoria'] = "";
		endforeach;
		
		foreach ( $emSubClass as $key => $entity ) :
		if($entity->getNome()!="DIVERSOS")
			{
			$subClass ['id'] = "" . $entity->getId () . "";
			$subClass ['descricao'] = $entity->getNome ();
			$subClass ['id_produto_categoria'] = $entity->getIdProdutoCategoria()->getId();
			$subClass ['localizacao'] = "";
			$subClass ['subcategoria'] = $entity->getIdProdutoCategoria()->getNome();
			array_push ( $class, $subClass );
			}
		endforeach;
		$r_json = $class;
		return $r_json;
	}
	/**
	 * Retorna id e nome das classes de item
	 * @return array
	 */
	public function fetchPairs() {
		$entities = $this->findAll ();
		$array = array ();
		foreach ( $entities as $entity ):
			$array [$entity->getId ()] = $entity->getNome ();
		endforeach;
		return $array;
	}
	/**
	 * Busca por subclasses relacionadas a uma classe
	 * @param int $id
	 * @return int
	 */
	public function findAssoc($id){
		$classe = $this->find($id);
		$vinculos = 0 ;
		$vinculo  = 0;
		foreach($classe->getSubCategorias() as $subClasse):
			if($subClasse->getId())
				$vinculos++;
		endforeach;
		
		if($vinculos > 0 )
			$vinculo = 1;
		
		return $vinculo;
	}
	
	/**
	 * Metodo responsavel por buscar via like classes e subclasses
	 * @param array $where
	 * @return array
	 */
	public function getLike(array $where = null) {
		
		$query =  $this->_em->createQueryBuilder();
		
		$query->select('classes');
		$query->from('Senna\Entity\classesprodutos', 'classes');		
		$query->andWhere($query->expr()->like('classes.nome', $query->expr()->literal('%'.$where['filter'].'%')));
		
		$entities = $query->getQuery()->getResult();

		$list = array();
		foreach ( $entities as $key => $entity ) :
			$list[$key]['id'] = $entity->getId();
			$list[$key]['value'] = $entity->getNome();
			$list[$key]['info'] = "";
			
		endforeach;
		
		
		$query->select('sub');
		$query->from('Senna\Entity\subclassesprodutos', 'sub');
		$query->andWhere($query->expr()->like('classes.nome', $query->expr()->literal('%'.$where['filter'].'%')));
		
		$entities = $query->getQuery()->getResult();
		

		foreach ( $entities as $key => $entity ) :
		if($entity->getNome()!="DIVERSOS"){
			$listSub['id'] = $entity->getId();
			$listSub['value'] = $entity->getNome();
			$listSub['info'] = $entity->getIdProdutoCategoria()->getNome();
			array_push ( $list, $listSub );
		}
		endforeach;
		
		$r_json = $list;
		return $r_json;
	}	

}