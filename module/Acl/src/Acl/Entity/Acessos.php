<?php

namespace Acl\Entity;

use Doctrine\ORM\Mapping as ORM;
use Zend\Stdlib\Hydrator;

/**
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 * @ORM\Table(name="sn_acessos")
 * @ORM\Entity(repositoryClass="Acl\Entity\AcessosRepository")
 */

class Acessos
{

    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    protected $id;

    /**
     * @ORM\Column(type="text")
     * @var string
     */
    protected $nome;

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
     * @return string
     */
    public function getNome() {
        return $this->nome;
    }

    /**
     * @param $nome
     * @return $this
     */
    public function setNome($nome) {
        $this->nome = $nome;
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
        return (new Hydrator\ClassMethods)->extract($this);
    }

}
