<?php

namespace Acl\Fixture;

use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Acl\Entity\Acessos;

class LoadAcessos extends AbstractFixture implements OrderedFixtureInterface {

    public function load(ObjectManager $manager) {
        // vendor/bin/doctrine-module data-fixture:import --purge-with-truncate

        $acesso = new Acessos;
        $acesso->setNome("Exibir");

        $manager->persist($acesso);

        $manager->flush();

    }
    public function getOrder() {
        return 4;
    }
}
