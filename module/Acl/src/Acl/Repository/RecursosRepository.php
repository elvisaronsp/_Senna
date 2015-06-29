<?php
namespace Acl\Repository;
use Doctrine\ORM\EntityRepository;

/**
 * Class RecursosRepository
 * @package Acl\Repository
 */
class RecursosRepository extends EntityRepository {

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
