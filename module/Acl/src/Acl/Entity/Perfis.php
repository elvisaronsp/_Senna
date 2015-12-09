<?php
namespace Acl\Entity;

use Doctrine\ORM\Mapping as ORM;
use Zend\Stdlib\Hydrator;

/**
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 * @ORM\Table(name="sn_perfis")
 * @ORM\Entity(repositoryClass="Acl\Repository\PerfisRepository")
 */

class Perfis
{

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;
    
    /**
     * @ORM\OneToOne(targetEntity="Acl\Entity\Perfis")
     * @ORM\JoinColumn(name="parent_id", referencedColumnName="id")
     */
    private $parent;
    
    /**
     * @ORM\Column(type="text")
     * @var string
     */
    private $nome;


    /**
     * @ORM\Column(type="boolean", name="admin")
     * @var boolean
     */
    private $admin;
    
    /**
     * @ORM\Column(type="datetime", name="criado_em")
     */
    private $criadoEm;
    
    /**
     * @ORM\Column(type="datetime", name="atualizado_em")
     */
    private $atualizadoEm;


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
    public function getParent() {
        return $this->parent;
    }

    /**
     * @param $parent
     * @return $this
     */
    public function setParent($parent) {
        $this->parent = $parent;
        return $this;
    }

    /**
     * @return string
     */
    public function getNome() {
        return strtoupper($this->nome);
    }

    /**
     * @param $nome
     * @return $this
     */
    public function setNome($nome) {
        $this->nome = strtoupper($nome);
        return $this;
    }

    /**
     * @return bool
     */
    public function getAdmin() {
        return $this->admin;
    }

    /**
     * @param $admin
     * @return $this
     */
    public function setAdmin($admin) {
        $this->admin = $admin;
        return $this;
    }

    /**
     * @return bool|string
     */
    public function getCriadoEm() {
        return date_format($this->criadoEm, 'd-m-Y H:i');
    }

    /**
     * @return $this
     */
    public function setCriadoEm() {
        $this->criadoEm = new \Datetime("now");
        return $this;
    }

    /**
     * @return bool|string
     */
    public function getAtualizadoEm() {
        return date_format($this->atualizadoEm, 'd-m-Y H:i');

    }

    /**
     * @ORM\PrePersist
     */
    public function setAtualizadoEm() {
        $this->atualizadoEm = new \Datetime("now");
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
        if(isset($this->parent))
            $parent = $this->parent->getId();
        else 
            $parent = false;
        
        return array(
            'id' => $this->id,
            'nome' => strtoupper($this->nome),
            'admin' => $this->admin,
        );
    }
}
