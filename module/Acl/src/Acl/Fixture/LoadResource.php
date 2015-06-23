<?php

namespace Acl\Fixture;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;

use Acl\Entity\Resource;

class LoadResource extends AbstractFixture implements OrderedFixtureInterface {

    public function load(ObjectManager $manager) {
        // vendor/bin/doctrine-module data-fixture:import --purge-with-truncate
        
        $resource = new Resource;
        $resource->setNome("Posts");
                
        $manager->persist($resource);
        
        $resource = new Resource;
        $resource->setNome("Páginas");
                
        $manager->persist($resource);
        
        
        $manager->flush();
        
    }

    public function getOrder() {
        return 2;
    }
}