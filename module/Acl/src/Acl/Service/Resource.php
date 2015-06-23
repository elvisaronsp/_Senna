<?php

namespace Acl\Service;

use Util\Service\AbstractService;
use Doctrine\ORM\EntityManager;

class Resource extends AbstractService
{
    public function __construct(EntityManager $em) {
        parent::__construct($em);
        $this->entity = "Acl\Entity\Resource";
    }
    
    
}
