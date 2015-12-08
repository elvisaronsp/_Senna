<?php
namespace Clientes\Entity;

use Doctrine\ORM\Mapping as ORM;
use Zend\Stdlib\Hydrator;

/**
 * SnEnderecosCliente
 *
 * @ORM\Table(name="sn_enderecos_cliente")
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="Clientes\Repository\ClientesRepository")
 */
class Enderecos
{

    /**
     * @param array $options
     */
    public function __construct($options = array())
    {
        (new Hydrator\ClassMethods)->hydrate($options, $this);
    }

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
    private $usuario;

    /**
     * @var string
     *
     * @ORM\Column(name="cep", type="string", length=15, nullable=true)
     */
    private $cep;

    /**
     * @var string
     *
     * @ORM\Column(name="logradouro", type="string", length=100, nullable=true)
     */
    private $logradouro;

    /**
     * @var integer
     *
     * @ORM\Column(name="numero", type="integer", nullable=true)
     */
    private $numero;

    /**
     * @var string
     *
     * @ORM\Column(name="complemento", type="string", length=100, nullable=true)
     */
    private $complemento;

    /**
     * @var string
     *
     * @ORM\Column(name="bairro", type="string", length=50, nullable=true)
     */
    private $bairro;

    /**
     * @var string
     *
     * @ORM\Column(name="cidade", type="string", length=100, nullable=true)
     */
    private $cidade;

    /**
     * @var string
     *
     * @ORM\Column(name="referencia", type="string", length=100, nullable=true)
     */
    private $referencia;

    /**
     * @var integer
     *
     * @ORM\Column(name="tipo", type="integer", nullable=true)
     */
    private $tipo;

    /**
     * @var string
     *
     * @ORM\Column(name="uf", type="string", length=2, nullable=true)
     */
    private $uf;

    /**
     * @var boolean
     *
     * @ORM\Column(name="principal", type="boolean", nullable=true)
     */
    private $principal;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return Enderecos
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return int
     */
    public function getUsuario()
    {
        return $this->usuario;
    }

    /**
     * @param int $usuario
     * @return Enderecos
     */
    public function setUsuario($usuario)
    {
        $this->usuario = $usuario;
        return $this;
    }

    /**
     * @return string
     */
    public function getCep()
    {
        return $this->cep;
    }

    /**
     * @param string $cep
     * @return Enderecos
     */
    public function setCep($cep)
    {
        $this->cep = $cep;
        return $this;
    }

    /**
     * @return string
     */
    public function getLogradouro()
    {
        return $this->logradouro;
    }

    /**
     * @param string $logradouro
     * @return Enderecos
     */
    public function setLogradouro($logradouro)
    {
        $this->logradouro = $logradouro;
        return $this;
    }

    /**
     * @return int
     */
    public function getNumero()
    {
        return $this->numero;
    }

    /**
     * @param int $numero
     * @return Enderecos
     */
    public function setNumero($numero)
    {
        $this->numero = $numero;
        return $this;
    }

    /**
     * @return string
     */
    public function getComplemento()
    {
        return $this->complemento;
    }

    /**
     * @param string $complemento
     * @return Enderecos
     */
    public function setComplemento($complemento)
    {
        $this->complemento = $complemento;
        return $this;
    }

    /**
     * @return string
     */
    public function getBairro()
    {
        return $this->bairro;
    }

    /**
     * @param string $bairro
     * @return Enderecos
     */
    public function setBairro($bairro)
    {
        $this->bairro = $bairro;
        return $this;
    }

    /**
     * @return string
     */
    public function getCidade()
    {
        return $this->cidade;
    }

    /**
     * @param string $cidade
     * @return Enderecos
     */
    public function setCidade($cidade)
    {
        $this->cidade = $cidade;
        return $this;
    }

    /**
     * @return string
     */
    public function getReferencia()
    {
        return $this->referencia;
    }

    /**
     * @param string $referencia
     * @return Enderecos
     */
    public function setReferencia($referencia)
    {
        $this->referencia = $referencia;
        return $this;
    }

    /**
     * @return int
     */
    public function getTipo()
    {
        return $this->tipo;
    }

    /**
     * @param int $tipo
     * @return Enderecos
     */
    public function setTipo($tipo)
    {
        $this->tipo = $tipo;
        return $this;
    }

    /**
     * @return string
     */
    public function getUf()
    {
        return $this->uf;
    }

    /**
     * @param string $uf
     * @return Enderecos
     */
    public function setUf($uf)
    {
        $this->uf = $uf;
        return $this;
    }

    /**
     * @return boolean
     */
    public function getPrincipal()
    {
        return $this->principal;
    }

    /**
     * @param boolean $principal
     * @return Enderecos
     */
    public function setPrincipal($principal)
    {
        $this->principal = $principal;
        return $this;
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return array(
            'id' => $this->id,
            'usuario' => $this->usuario,
            'cep' => $this->cep,
            'logradouro' => $this->logradouro,
            'numero' => $this->numero,
            'complemento' => $this->complemento,
            'bairro' => $this->bairro,
            'cidade' => $this->cidade,
            'referencia' => $this->referencia,
            'tipo' => $this->tipo,
            'uf' => $this->uf,
            'principal' => $this->principal
        );
    }
}

