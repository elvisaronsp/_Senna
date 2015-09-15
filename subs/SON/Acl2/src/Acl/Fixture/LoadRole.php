<?php

namespace Acl\Fixture;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Acl\Entity\Role;

class LoadRole extends AbstractFixture implements OrderedFixtureInterface {

    public function load(ObjectManager $manager) {
        // vendor/bin/doctrine-module data-fixture:import --purge-with-truncate

        $role = new Role;
        $role->setNome("Financeiro");
        $manager->persist($role);

        $role = new Role;
        $role->setNome("Expedição");
        $manager->persist($role);

        $role = new Role;
        $role->setNome("Start Line");
        $manager->persist($role);

        $role = new Role;
        $role->setNome("Vendedor");
        $manager->persist($role);


        $role = new Role;
        $role->setNome("Produção");
        $manager->persist($role);

        $role = new Role;
        $role->setNome("Admin")
                ->setIsAdmin(true);
                
        $manager->persist($role);
        
        
        $manager->flush();
        
    }

    public function getOrder() {
        return 1;
    }
}
