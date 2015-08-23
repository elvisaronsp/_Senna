<?php
namespace Clientes\Entity;

use Doctrine\ORM\Mapping as ORM;
use Zend\Stdlib\Hydrator;

/**
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 * @ORM\Table(name="sn_clientes")
 * @ORM\Entity(repositoryClass="Clientes\Repository\ClientesRepository")
 */
class Clientes
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
     * @var string
     *
     * @ORM\Column(name="razaoSocial", type="string", length=255, nullable=false)
     */
    private $razaosocial = '';

    /**
     * @var string
     *
     * @ORM\Column(name="nomeFantasia", type="string", length=255, nullable=true)
     */
    private $nomefantasia;

    /**
     * @var string
     *
     * @ORM\Column(name="cnpj", type="string", length=18, nullable=true)
     */
    private $cnpj;

    /**
     * @var string
     *
     * @ORM\Column(name="cpf", type="string", length=14, nullable=true)
     */
    private $cpf;

    /**
     * @var string
     *
     * @ORM\Column(name="sexo", type="string", length=1, nullable=true)
     */
    private $sexo;

    /**
     * @var string
     *
     * @ORM\Column(name="responsavel", type="string", length=100, nullable=true)
     */
    private $responsavel;

    /**
     * @var string
     *
     * @ORM\Column(name="ie", type="string", length=50, nullable=true)
     */
    private $ie;

    /**
     * @var boolean
     *
     * @ORM\Column(name="ieIsento", type="boolean", nullable=true)
     */
    private $ieisento = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="im", type="string", length=50, nullable=true)
     */
    private $im;

    /**
     * @var boolean
     *
     * @ORM\Column(name="imInsento", type="boolean", nullable=true)
     */
    private $iminsento = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="codigoCliente", type="string", length=25, nullable=true)
     */
    private $codigocliente;

    /**
     * @var string
     *
     * @ORM\Column(name="tipo", type="string", length=1, nullable=true)
     */
    private $tipo = '1';

    /**
     * @var string
     *
     * @ORM\Column(name="origem", type="string", length=1, nullable=true)
     */
    private $origem = '1';

    /**
     * @var string
     *
     * @ORM\Column(name="identificacaoEstrangeiro", type="string", length=50, nullable=true)
     */
    private $identificacaoestrangeiro;

    /**
     * @var string
     *
     * @ORM\Column(name="observacao", type="text", length=16777215, nullable=true)
     */
    private $observacao;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=100, nullable=true)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="telefone", type="string", length=14, nullable=true)
     */
    private $telefone;

    /**
     * @var boolean
     *
     * @ORM\Column(name="alertas", type="boolean", nullable=true)
     */
    private $alertas = '0';

    /**
     * @var float
     *
     * @ORM\Column(name="limiteCredito", type="float", precision=10, scale=2, nullable=true)
     */
    private $limitecredito = '0.00';

    /**
     * @var float
     *
     * @ORM\Column(name="saldo", type="float", precision=10, scale=2, nullable=true)
     */
    private $saldo = '0.00';

    /**
     * @var string
     *
     * @ORM\Column(name="classificacao", type="string", length=1, nullable=true)
     */
    private $classificacao = '1';

    /**
     * @var boolean
     *
     * @ORM\Column(name="ativo", type="boolean", nullable=true)
     */
    private $ativo = '1';

    /**
     * @var string
     *
     * @ORM\Column(name="empresa_id", type="string", length=1, nullable=true)
     */
    private $empresa;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="criadoEm", type="datetime", nullable=true)
     */
    private $criadoem;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="atualizadoEm", type="datetime", nullable=true)
     */
    private $atualizadoem;


    /**
     * @param array $options
     */
    public function __construct($options = array())
    {
        $this->criadoem = new \DateTime("now");
        $this->atualizadoem = new \DateTime("now");

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
     * @return Clientes
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return string
     */
    public function getRazaoSocial()
    {
        return $this->razaosocial;
    }

    /**
     * @param string $razaosocial
     * @return Clientes
     */
    public function setRazaoSocial($razaosocial)
    {
        $this->razaosocial = $razaosocial;
        return $this;
    }

    /**
     * @return string
     */
    public function getNomeFantasia()
    {
        return $this->nomefantasia;
    }

    /**
     * @param string $nomefantasia
     * @return Clientes
     */
    public function setNomeFantasia($nomefantasia)
    {
        $this->nomefantasia = $nomefantasia;
        return $this;
    }

    /**
     * @return string
     */
    public function getCnpj()
    {
        return $this->cnpj;
    }

    /**
     * @param string $cnpj
     * @return Clientes
     */
    public function setCnpj($cnpj)
    {
        $this->cnpj = $cnpj;
        return $this;
    }

    /**
     * @return string
     */
    public function getCpf()
    {
        return $this->cpf;
    }

    /**
     * @param string $cpf
     * @return Clientes
     */
    public function setCpf($cpf)
    {
        $this->cpf = $cpf;
        return $this;
    }

    /**
     * @return string
     */
    public function getSexo()
    {
        return $this->sexo;
    }

    /**
     * @param string $sexo
     * @return Clientes
     */
    public function setSexo($sexo)
    {
        $this->sexo = $sexo;
        return $this;
    }

    /**
     * @return string
     */
    public function getResponsavel()
    {
        return $this->responsavel;
    }

    /**
     * @param string $responsavel
     * @return Clientes
     */
    public function setResponsavel($responsavel)
    {
        $this->responsavel = $responsavel;
        return $this;
    }

    /**
     * @return string
     */
    public function getIe()
    {
        return $this->ie;
    }

    /**
     * @param string $ie
     * @return Clientes
     */
    public function setIe($ie)
    {
        $this->ie = $ie;
        return $this;
    }

    /**
     * @return boolean
     */
    public function getIeIsento()
    {
        return $this->ieisento;
    }

    /**
     * @param boolean $ieisento
     * @return Clientes
     */
    public function setIeIsento($ieisento)
    {
        $this->ieisento = $ieisento;
        return $this;
    }

    /**
     * @return string
     */
    public function getIm()
    {
        return $this->im;
    }

    /**
     * @param string $im
     * @return Clientes
     */
    public function setIm($im)
    {
        $this->im = $im;
        return $this;
    }

    /**
     * @return boolean
     */
    public function getImInsento()
    {
        return $this->iminsento;
    }

    /**
     * @param boolean $iminsento
     * @return Clientes
     */
    public function setImInsento($iminsento)
    {
        $this->iminsento = $iminsento;
        return $this;
    }

    /**
     * @return string
     */
    public function getCodigoCliente()
    {
        return $this->codigocliente;
    }

    /**
     * @param string $codigocliente
     * @return Clientes
     */
    public function setCodigoCliente($codigocliente)
    {
        $this->codigocliente = $codigocliente;
        return $this;
    }

    /**
     * @return string
     */
    public function getTipo()
    {
        return $this->tipo;
    }

    /**
     * @param string $tipo
     * @return Clientes
     */
    public function setTipo($tipo)
    {
        $this->tipo = $tipo;
        return $this;
    }

    /**
     * @return string
     */
    public function getOrigem()
    {
        return $this->origem;
    }

    /**
     * @param string $origem
     * @return Clientes
     */
    public function setOrigem($origem)
    {
        $this->origem = $origem;
        return $this;
    }

    /**
     * @return string
     */
    public function getIdentificacaoEstrangeiro()
    {
        return $this->identificacaoestrangeiro;
    }

    /**
     * @param string $identificacaoestrangeiro
     * @return Clientes
     */
    public function setIdentificacaoEstrangeiro($identificacaoestrangeiro)
    {
        $this->identificacaoestrangeiro = $identificacaoestrangeiro;
        return $this;
    }

    /**
     * @return string
     */
    public function getObservacao()
    {
        return $this->observacao;
    }

    /**
     * @param string $observacao
     * @return Clientes
     */
    public function setObservacao($observacao)
    {
        $this->observacao = $observacao;
        return $this;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param string $email
     * @return Clientes
     */
    public function setEmail($email)
    {
        $this->email = $email;
        return $this;
    }

    /**
     * @return string
     */
    public function getTelefone()
    {
        return $this->telefone;
    }

    /**
     * @param string $telefone
     * @return Clientes
     */
    public function setTelefone($telefone)
    {
        $this->telefone = $telefone;
        return $this;
    }

    /**
     * @return boolean
     */
    public function gsAlertas()
    {
        return $this->alertas;
    }

    /**
     * @param boolean $alertas
     * @return Clientes
     */
    public function setAlertas($alertas)
    {
        $this->alertas = $alertas;
        return $this;
    }

    /**
     * @return float
     */
    public function getLimiteCredito()
    {
        return $this->limitecredito;
    }

    /**
     * @param float $limitecredito
     * @return Clientes
     */
    public function setLimiteCredito($limitecredito)
    {
        $this->limitecredito = $limitecredito;
        return $this;
    }

    /**
     * @return float
     */
    public function getSaldo()
    {
        return $this->saldo;
    }

    /**
     * @param float $saldo
     * @return Clientes
     */
    public function setSaldo($saldo)
    {
        $this->saldo = $saldo;
        return $this;
    }

    /**
     * @return string
     */
    public function getClassificacao()
    {
        return $this->classificacao;
    }

    /**
     * @param string $classificacao
     * @return Clientes
     */
    public function setClassificacao($classificacao)
    {
        $this->classificacao = $classificacao;
        return $this;
    }

    /**
     * @return boolean
     */
    public function getAtivo()
    {
        return $this->ativo;
    }

    /**
     * @param boolean $ativo
     * @return Clientes
     */
    public function setAtivo($ativo)
    {
        $this->ativo = $ativo;
        return $this;
    }

    /**
     * @return string
     */
    public function getEmpresa()
    {
        return $this->empresa;
    }

    /**
     * @param $empresa
     * @return $this
     */
    public function setEmpresa($empresa)
    {
        $this->empresa = $empresa;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getCriadoEm()
    {
        return date_format($this->criadoem, 'd-m-Y H:i');
    }

    /**
     * @return $this
     */
    public function setCriadoEm()
    {
        $this->criadoem = new \DateTime("now");
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getAtualizadoEm()
    {
        return date_format($this->atualizadoem, 'd-m-Y H:i');
    }

    /**
     * @ORM\PrePersist
     */
    public function setAtualizadoEm()
    {
        $this->atualizadoem = new \DateTime("now");
        return $this;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->razaosocial;
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return array(
            'id'                       => $this->id,
            'razaoSocial'              => $this->razaosocial,
            'nomeFantasia'             => $this->nomefantasia,
            'cnpj'                     => $this->cnpj,
            'cpf'                      => $this->cpf,
            'sexo'                     => $this->sexo,
            'responsavel'              => $this->responsavel,
            'ie'                       => $this->ie,
            'ieIsento'                 => $this->ieisento,
            'im'                       => $this->im,
            'imInsento'                => $this->iminsento,
            'codigoCliente'            => $this->codigocliente,
            'tipo'                     => $this->tipo,
            'origem'                   => $this->origem,
            'identificacaoEstrangeiro' => $this->identificacaoestrangeiro,
            'observacao'               => $this->observacao,
            'email'                    => $this->email,
            'telefone'                 => $this->telefone,
            'alertas'                  => $this->alertas,
            'limiteCredito'            => $this->limitecredito,
            'saldo'                    => $this->saldo,
            'classificacao'            => $this->classificacao,
            'ativo'                    => $this->ativo,
            'empresa'                  => $this->empresa,
            'criadoEm'                 => $this->criadoem,
            'atualizadoEm'             => $this->atualizadoem
        );
    }
}

