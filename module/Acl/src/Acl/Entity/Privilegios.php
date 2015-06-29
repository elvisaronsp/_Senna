<?php

namespace Acl\Entity;

use Doctrine\ORM\Mapping as ORM;
use Zend\Stdlib\Hydrator;

/**
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 * @ORM\Table(name="sn_privilegios")
 * @ORM\Entity(repositoryClass="Acl\Entity\PrivilegiosRepository")
 */

class Privilegios
{

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    protected $id;
    
    
    /**
     * @ORM\OneToOne(targetEntity="Acl\Entity\Perfis")
     * @ORM\JoinColumn(name="role_id", referencedColumnName="id")
     */
    protected $perfil;
    
    /**
     * @ORM\OneToOne(targetEntity="Acl\Entity\Recursos")
     * @ORM\JoinColumn(name="resource_id", referencedColumnName="id")
     */
    protected $recurso;

    /**
     * @ORM\OneToOne(targetEntity="Acl\Entity\Acessos")
     * @ORM\JoinColumn(name="acessos_id", referencedColumnName="id")
     */
    protected $acessos;


    /**
     * @ORM\Column(type="datetime", name="criado_em")
     */
    protected $criadoEm;
    
    /**
     * @ORM\Column(type="datetime", name="atualizado_em")
     */
    protected $atualizadoEm;

    /**
     * @param array $options
     */
    public function __construct($options = array())
    {
        $this->criadoEm = new \DateTime("now");
        $this->atualizadoEm = new \DateTime("now");
        (new Hydrator\ClassMethods)->hydrate($options, $this);
    }

    /**
     * @return mixed
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @param $id
     * @return $this
     */
    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getPerfil() {
        return $this->perfil;
    }

    /**
     * @param $perfil
     * @return $this
     */
    public function setPerfil($perfil) {
        $this->perfil = $perfil;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getRecurso() {
        return $this->recurso;
    }

    /**
     * @param $recurso
     * @return $this
     */
    public function setRecurso($recurso) {
        $this->recurso = $recurso;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getCriadoEm() {
        return $this->criadoEm;
    }

    /**
     * @return $this
     */
    public function setCriadoEm() {
        $this->criadoEm = new \Datetime("now");
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getAtualizadoEm() {
        return $this->atualizadoEm;
    }

    /**
     * @ORM\PrePersist
     */
    public function setAtualizadoEm() {
        $this->atualizadoEm = new \Datetime("now");
        return $this;
    }

    /**
     * @return mixed
     */
    public function getAcessos()
    {
        return $this->acessos;
    }

    /**
     * @param $acessos
     * @return $this
     */
    public function setAcessos($acessos)
    {
        $this->acessos = $acessos;
        return $this;
    }

    /**
     * @return string
     */
    public function __toString() {
        return $this->nome;
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return array(
          'id' => $this->id,
            'nome' => $this->acessos->getNome(),
            'role' => $this->perfil->getId(),
            'resource'=>$this->recurso->getId()
        );
    }

}
