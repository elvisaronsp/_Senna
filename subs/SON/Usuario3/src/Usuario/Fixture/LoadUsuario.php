<?php
/**
 * Created by PhpStorm.
 * User: Jefferson
 * Date: 05/06/2015
 * Time: 10:48
 */

namespace Usuario\Fixture;
use Doctrine\Common\DataFixtures\AbstractFixture,
    Doctrine\Common\Persistence\ObjectManager;

use Usuario\Entity\Usuario;
/**
 * Class LoadUsuario
 * @package Usuario\Fixture
 */
class LoadUsuario extends AbstractFixture {

    public function load(objectManager $manager)
    {
        $usuario = new Usuario();
        $usuario->setNome("Jefferson")
            ->setSobrenome("Fernandes")
            ->setLogin("Admin")
            ->setEmail("Jefferson.Fernandes@outlook.com")
            ->setSenha("306325")
            ->setAtivo(true);

        $manager->persist($usuario);
        $manager->flush();
    }
}