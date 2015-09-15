<?php

namespace Acl\Entity;

use Doctrine\ORM\Mapping as ORM;
use Zend\Stdlib\Hydrator;

/**
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 * @ORM\Table(name="sonacl_privileges")
 * @ORM\Entity(repositoryClass="Acl\Entity\PrivilegeRepository")
 */

class Privilege 
{

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    protected $id;
    
    
    /**
     * @ORM\OneToOne(targetEntity="Acl\Entity\Role")
     * @ORM\JoinColumn(name="role_id", referencedColumnName="id")
     */
    protected $role;
    
    /**
     * @ORM\OneToOne(targetEntity="Acl\Entity\Resource")
     * @ORM\JoinColumn(name="resource_id", referencedColumnName="id")
     */
    protected $resource;

    /**
     * @ORM\OneToOne(targetEntity="Acl\Entity\Acessos")
     * @ORM\JoinColumn(name="acessos_id", referencedColumnName="id")
     */
    protected $acessos;


    /**
     * @ORM\Column(type="datetime", name="created_at")
     */
    protected $createdAt;
    
    /**
     * @ORM\Column(type="datetime", name="updated_at")
     */
    protected $updatedAt;
    
    
    public function __construct($options = array())
    {
        (new Hydrator\ClassMethods)->hydrate($options, $this);
        $this->createdAt = new \DateTime("now");
        $this->updatedAt = new \DateTime("now");
    }
    
    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
        return $this;
    }

    public function getRole() {
        return $this->role;
    }

    public function setRole($role) {
        $this->role = $role;
        return $this;
    }

    public function getResource() {
        return $this->resource;
    }

    public function setResource($resource) {
        $this->resource = $resource;
        return $this;
    }

    
    public function getCreatedAt() {
        return $this->createdAt;
    }

    public function setCreatedAt() {
        $this->createdAt = new \Datetime("now");
        return $this;
    }

    public function getUpdatedAt() {
        return $this->updatedAt;
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
     * @ORM\PrePersist
     */
    public function setUpdatedAt() {
        $this->createdAt = new \Datetime("now");
        return $this;
    }
    
    public function toArray()
    {
        return array(
          'id' => $this->id,
            'nome' => $this->acessos->getNome(),
            'role' => $this->role->getId(),
            'resource'=>$this->resource->getId()
        );
    }

}
