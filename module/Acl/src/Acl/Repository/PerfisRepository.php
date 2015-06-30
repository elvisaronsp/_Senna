<?php
namespace Acl\Repository;
use Doctrine\ORM\EntityRepository;

/**
 * Class PerfisRepository
 * @package Acl\Entity
 */
class PerfisRepository extends EntityRepository {

    /**
     * @param array $where
     * @return array
     */
    public function toList(array $where=null) {

        $perfil = array ();

        if (!empty($this->_em) && isset($where['busca'])):
            $query =  $this->_em->createQueryBuilder();
            $query->select('perfis');
            $query->from('Acl\Entity\Perfis', 'perfis');
            $query->andWhere($query->expr()->like('perfis.nome', $query->expr()->literal('%'.$where['busca'].'%')));
            //print_r($query->getQuery()->getDql());exit;
            $entities = $query->getQuery()->getResult();
        else:
            $entities = $this->findAll();
        endif;

        foreach ( $entities as $key => $entity ) :
            $perfil  [$key] ['id'] = "" . $entity->getId() . "";
            $perfil  [$key] ['nome'] = "" . $entity->getNome() . "";
            $perfil  [$key] ['admin'] = "" . $entity->getAdmin()?"SIM":"NÃO" . "";
            $perfil  [$key] ['criado'] = "" . $entity->getCriadoEm() . "";
            $perfil  [$key] ['atualizado'] = "" . $entity->getAtualizadoEm() . "";
        endforeach;

        return $perfil;
    }

    /**
     * @return array
     */
    public function fetchParent()
    {
        $entities = $this->findAll();
        $array = array();
        
        foreach($entities as $entity)
        {
            $array[$entity->getId()]=$entity->getNome();
        }
        
        return $array;
    }

    /**
     * @return array
     */
    public function fetchPairs()
    {
        $entities = $this->findAll();
        $array = array();
        foreach($entities as $entity)
        {
            $array[$entity->getId()] = $entity->getNome();
        }
        return $array;
    }
}
