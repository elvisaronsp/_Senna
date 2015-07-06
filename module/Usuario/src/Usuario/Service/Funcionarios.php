<?php
namespace Usuario\Service;

use Doctrine\ORM\EntityManager;
use Senna\Service\AbstractService;
use Zend\Stdlib\Hydrator;

/**s
 * Class Funcionarios
 * @package Acl\Service
 */
class Funcionarios extends AbstractService {

    /**
     * @var EntityManager
     */
    private $em;
	
    /**
     * Contrutor
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em)
    {
        parent::__construct($em);
        $this->entity = "Usuario\Entity\Funcionarios";
        $this->em = $em;
    }

    /**
     * @param array $data
     * @return mixed
     * @throws \Doctrine\ORM\ORMException
     */
    public function insert(array $data)
    {
        $entity = new $this->entity($data);
        $this->em->persist($entity);
        $this->em->flush();

        return $entity;
    }

    /**
     * @param array $data
     * @return bool|\Doctrine\Common\Proxy\Proxy|null|object
     * @throws \Doctrine\ORM\ORMException
     */
    public function update(array $data)
    {
        $entity = $this->em->getReference($this->entity, $data['id']);
        (new Hydrator\ClassMethods())->hydrate($data, $entity);

        $entity->setAdmin(false);
        if(isset($data['permitir_acesso_total']))
            $entity->setAdmin(true);

        $this->em->persist($entity);
        $this->em->flush();


        ### VERIFICA TODOS OS ID RELACIONADOS E COLOCA NA ENTIDADE
        if(isset($data[0])):
            foreach ($data[0] as $key => $value):
                $entityPrivilegios = new $this->privilegios();

                $perfil = $this->em->getReference("Acl\Entity\Perfis",$entity->getId());
                $entityPrivilegios->setPerfil($perfil);

                $acesso = $this->em->getReference("Acl\Entity\Acessos",$value[0]);
                $entityPrivilegios->setAcessos($acesso);

                $recurso = $this->em->getReference("Acl\Entity\Recursos",$value[1]);
                $entityPrivilegios->setRecurso($recurso);

                $this->em->persist($entityPrivilegios);
                $this->em->flush();
            endforeach;
        endif;

        return $entity;
    }
}