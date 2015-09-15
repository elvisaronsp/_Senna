<?php
/**
 * Repositorio de usuario
 * @author Jefferson Fernandes
 * @date 16/02/2015
 * @time 19:56:00
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Repository;
use Doctrine\ORM\EntityRepository,
	Doctrine\Entity;
use Senna\Entity\Usuario;

class UsuarioRepository extends EntityRepository {
		
	/**
	 * Cria um array contendo as usuario
	 * @return array
	 */
	public function toList(array $where=null) {
		
		$entities = $this->findAll();

		$usuario = array ();
		foreach ( $entities as $key => $entity ) :

			$usuario [$key] ['id'] = "" . $entity->getId() . "";
			$usuario [$key] ['possui_vinculo'] = "" . $entity->getId() . "";

			if( $entity->getAtivo() == "1")
			{
				$usuario [$key] ['ativo'] = "1";
				$usuario [$key] ['ativo_img'] = "<i class='icon-ok' title='Sim'>";
			}
			else
			{
				$usuario [$key] ['ativo_img']="";
				$usuario [$key] ['ativo'] ="0";
			}

			$usuario [$key] ['nome_funcionario'] = "" . $entity->getNome() . "";
			$usuario [$key] ['codigo_acesso'] = "" . $entity->getLogin() . "";
			$usuario [$key] ['cpf'] = "" . $entity->getCpf() . "";
			$usuario [$key] ['perfil_acesso'] = "" . $entity->getNivel() . "";
			$usuario [$key] ['setor'] = "" . $entity->getSetor() . "";
			$usuario [$key] ['email'] = "" . $entity->getEmail() . "";


		endforeach;
		$r_json = $usuario;
		return $r_json;
	}

	/**
	 * Validacoes para insercao ou atualizao de um usuario
	 * @return bool
	 */
	public function validePost($post){
		return true;
	}
}
	
