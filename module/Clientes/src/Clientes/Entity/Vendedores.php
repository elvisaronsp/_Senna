<?php
namespace Clientes\Entity;

use Doctrine\ORM\Mapping as ORM;
use Zend\Stdlib\Hydrator;

/**
 * SnVendedoresCliente
 *
 * @ORM\Table(name="sn_vendedores_cliente")
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="Clientes\Repository\VendedoresRepository")
 */
class Vendedores
{
    /**
     * @var integer
     *
     * @ORM\Column(name="Id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="Clientes\Entity\Clientes")
     * @ORM\JoinColumn(name="cliente_id", referencedColumnName="Id")
     */
    private $cliente;

    /**
     * @ORM\OneToOne(targetEntity="Usuario\Entity\Funcionarios")
     * @ORM\JoinColumn(name="usuario_id", referencedColumnName="id")
     */
    private $usuario;

    /**
     * @ORM\Column(type="datetime", name="criadoEm")
     */
    private $criadoEm;

    /**
     * @ORM\Column(type="datetime", name="atualizadoEm")
     */
    private $atualizadoEm;

    public function __construct($options = array())
    {
        $this->criadoEm = new \DateTime("now");
        $this->atualizadoEm = new \DateTime("now");
        (new Hydrator\ClassMethods)->hydrate($options, $this);
    }

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getCliente()
    {
        return $this->cliente;
    }

    /**
     * @param mixed $cliente
     */
    public function setCliente($cliente)
    {
        $this->cliente = $cliente;
    }

    /**
     * @return mixed
     */
    public function getUsuario()
    {
        return $this->usuario;
    }

    /**
     * @param mixed $usuario
     */
    public function setUsuario($usuario)
    {
        $this->usuario = $usuario;
    }

    /**
     * @return \DateTime
     */
    public function getCriadoEm()
    {
        return date_format($this->criadoEm, 'd-m-Y H:i');
    }

    /**
     * @return $this
     */
    public function setCriadoEm()
    {
        $this->criadoEm = new \DateTime("now");
    }

    /**
     * @return \DateTime
     */
    public function getAtualizadoEm()
    {
        return date_format($this->atualizadoEm, 'd-m-Y H:i');
    }

    /**
     * @ORM\PrePersist
     */
    public function setAtualizadoEm()
    {
        $this->atualizadoEm = new \DateTime("now");

    }

    /**
     * @return array
     */
    public function toArray()
    {
        return array(
            'id'           => $this->id,
            'cliente'      => $this->cliente,
            'usuario'      => $this->usuario,
            'criadoEm'     => $this->getCriadoem(),
            'atualizadoEm' => $this->getAtualizadoem()
        );
    }

}

