<?php
/**
 * Repositorio de empresa
 * @author Jefferson Fernandes
 * @date 16/02/2015
 * @time 13:53:00
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Repository;
use Doctrine\ORM\EntityRepository,
	Doctrine\Entity;
use Senna\Entity\Empresa;

class EmpresaRepository extends EntityRepository {
		
	/**
	 * Cria um array contendo as empresa
	 * @return array
	 */
	public function toList(array $where=null) {
		
		$entities = $this->findAll();

		$empresa = array ();
		foreach ( $entities as $key => $entity ) :

			$empresa [$key] ['id'] = "" . $entity->getId() . "";
			$empresa [$key] ['nomeFantasia'] = "" . $entity->getNomefantasia() . "";
			$empresa [$key] ['tipo'] = "" . ($entity->getTipo() == "0")?"FILIAL":"MATRIZ" . "";
			$empresa [$key] ['cnpj'] = "" . $entity->getCnpj() . "";
			$empresa [$key] ['uf'] = "" . $entity->getUf() . "";
			$empresa [$key] ['responsavel'] = "" . $entity->getNomeResponsavel() . "";

		endforeach;
		$r_json = $empresa;
		return $r_json;
	}

	/**
	 * Validacoes para insercao ou atualizao de uma empresa
	 * @return bool
	 */
	public function validePost($post){
		return true;
	}
}
	
