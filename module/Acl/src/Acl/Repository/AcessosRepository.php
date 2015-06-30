<?php
namespace Acl\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * Class AcessosRepository
 * @package Acl\Entity
 */
class AcessosRepository extends EntityRepository {

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
