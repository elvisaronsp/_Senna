<?php
namespace Usuario\Repository;
use Doctrine\ORM\EntityRepository;

/**
 * Class FuncionariosRepository
 * @package Usuario\Repository
 */
class FuncionariosRepository extends EntityRepository {

    /**
     * @param array $where
     * @return array
     */
    public function toList(array $where=null) {

        $usuarios = array ();

        if (!empty($this->_em) && isset($where['busca'])):
            $query =  $this->_em->createQueryBuilder();
            $query->select('funcionarios');
            $query->from('Acl\Entity\Perfis', 'funcionarios');
            $query->andWhere($query->expr()->like('funcionarios.nome', $query->expr()->literal('%'.$where['busca'].'%')));
            //print_r($query->getQuery()->getDql());exit;
            $entities = $query->getQuery()->getResult();
        else:
            $entities = $this->findAll();
        endif;

        foreach ( $entities as $key => $entity ) :
            $usuarios  [$key] ['id'] = "" . $entity->getId() . "";
            $usuarios  [$key] ['ativo'] = "" . $entity->getAtivo()?"1":"0" . "";
            $usuarios  [$key] ['ativo_img'] = "" . $entity->getAtivo()?"<i class='icon-ok' title='Sim'>":"" . "";    "";
            $usuarios  [$key] ['confirmado'] = "" . $entity->getConfirmado()?"SIM":"NÃO" . "";
            $usuarios  [$key] ['nome'] = "" . $entity->getNome() . "";
            $usuarios  [$key] ['login'] = "" . $entity->getLogin() . "";
            $usuarios  [$key] ['perfil'] = "" . $entity->getPerfil() . "";
            $usuarios  [$key] ['setor'] = "" . $entity->getSetor() . "";
            $usuarios  [$key] ['email'] = "" . $entity->getEmail() . "";
            $usuarios  [$key] ['possui_vinculo'] = "0";
            $usuarios  [$key] ['possui_log'] = "0";
        endforeach;

        return $usuarios;
    }
}