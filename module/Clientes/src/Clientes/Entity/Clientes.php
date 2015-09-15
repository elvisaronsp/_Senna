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
    private $razaoSocial = '';

    /**
     * @var string
     *
     * @ORM\Column(name="nomeFantasia", type="string", length=255, nullable=true)
     */
    private $nomeFantasia;

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
    private $ieIsento = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="im", type="string", length=50, nullable=true)
     */
    private $im;

    /**
     * @var boolean
     *
     * @ORM\Column(name="imIsento", type="boolean", nullable=true)
     */
    private $imIsento = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="codigoCliente", type="string", length=25, nullable=true)
     */
    private $codigoCliente;

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
    private $identificacaoEstrangeiro;

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
    private $limiteCredito = '0.00';

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
     * @var \DateTime
     *
     * @ORM\Column(name="criadoEm", type="datetime", nullable=true)
     */
    private $criadoEm;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="atualizadoEm", type="datetime", nullable=true)
     */
    private $atualizadoEm;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dataNascimento", type="date", nullable=true)
     */
    private $dataNascimento;

    /**
     * @var boolean
     *
     * @ORM\Column(name="estadoCivil", type="boolean", nullable=true)
     */
    private $estadoCivil;

    /**
     * @var float
     *
     * @ORM\Column(name="rendaMensal", type="float", precision=10, scale=2, nullable=true)
     */
    private $rendaMensal = '0.00';

    /**
     * @var string
     *
     * @ORM\Column(name="profissao", type="string", length=255, nullable=true)
     */
    private $profissao;

    /**
     * @var string
     *
     * @ORM\Column(name="filiacaoMae", type="string", length=255, nullable=true)
     */
    private $filiacaoMae;

    /**
     * @var string
     *
     * @ORM\Column(name="filiacaoPai", type="string", length=255, nullable=true)
     */
    private $filiacaoPai;

    /**
     * @var string
     *
     * @ORM\Column(name="conjugeNome", type="string", length=255, nullable=true)
     */
    private $conjugeNome;

    /**
     * @var string
     *
     * @ORM\Column(name="conjugeCpf", type="string", length=14, nullable=true)
     */
    private $conjugeCpf;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="conjugeDataNascimento", type="date", nullable=true)
     */
    private $conjugeDataNascimento;

    /**
     * @var string
     *
     * @ORM\Column(name="conjugeProfissao", type="string", length=255, nullable=true)
     */
    private $conjugeProfissao;

    /**
     * @var string
     *
     * @ORM\Column(name="suframa", type="string", length=50, nullable=true)
     */
    private $suframa;

    /**
     * @ORM\OneToOne(targetEntity="Senna\Entity\Empresa")
     * @ORM\JoinColumn(name="empresa_id", referencedColumnName="id")
     */
    private $empresa;

    /**
     * @var string
     *
     * @ORM\Column(name="rg", type="string", length=50, nullable=true)
     */
    private $rg;


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
        return $this->razaoSocial;
    }

    /**
     * @param string $razaoSocial
     * @return Clientes
     */
    public function setRazaoSocial($razaoSocial)
    {
        $this->razaoSocial = $razaoSocial;
        return $this;
    }

    /**
     * @return string
     */
    public function getNomeFantasia()
    {
        return $this->nomeFantasia;
    }

    /**
     * @param string $nomeFantasia
     * @return Clientes
     */
    public function setNomeFantasia($nomeFantasia)
    {
        $this->nomeFantasia = $nomeFantasia;
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
        return $this->ieIsento;
    }

    /**
     * @param boolean $ieIsento
     * @return Clientes
     */
    public function setIeIsento($ieIsento)
    {
        $this->ieIsento = $ieIsento;
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
    public function getimIsento()
    {
        return $this->imIsento;
    }

    /**
     * @param boolean $imIsento
     * @return Clientes
     */
    public function setimIsento($imIsento)
    {
        $this->imIsento = $imIsento;
        return $this;
    }

    /**
     * @return string
     */
    public function getCodigoCliente()
    {
        return $this->codigoCliente;
    }

    /**
     * @param string $codigoCliente
     * @return Clientes
     */
    public function setCodigoCliente($codigoCliente)
    {
        $this->codigoCliente = $codigoCliente;
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
    public function getidentificacaoEstrangeiro()
    {
        return $this->identificacaoEstrangeiro;
    }

    /**
     * @param string $identificacaoEstrangeiro
     * @return Clientes
     */
    public function setidentificacaoEstrangeiro($identificacaoEstrangeiro)
    {
        $this->identificacaoEstrangeiro = $identificacaoEstrangeiro;
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
        return $this->limiteCredito;
    }

    /**
     * @param float $limiteCredito
     * @return Clientes
     */
    public function setLimiteCredito($limiteCredito)
    {
        $this->limiteCredito = str_replace(" ","",str_replace(",", ".", str_replace(".", " ", $limiteCredito)));
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
    public function getcriadoEm()
    {
        return date_format($this->criadoEm, 'd-m-Y H:i');
    }

    /**
     * @return $this
     */
    public function setcriadoEm()
    {
        $this->criadoEm = new \DateTime("now");
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getatualizadoEm()
    {
        return date_format($this->atualizadoEm, 'd-m-Y H:i');
    }

    /**
     * @ORM\PrePersist
     */
    public function setatualizadoEm()
    {
        $this->atualizadoEm = new \DateTime("now");
        return $this;
    }

    /**
     * @return mixed
     */
    public function getDataNascimento()
    {
        return ($this->dataNascimento) ? date_format($this->dataNascimento, 'd-m-Y') : "";
    }

    /**
     * @param mixed $dataNascimento
     * @return Clientes
     */
    public function setDataNascimento($dataNascimento)
    {
        $this->dataNascimento = new \DateTime(implode("-", array_reverse(explode("/", $dataNascimento))));
    }

    /**
     * @return mixed
     */
    public function getEstadoCivil()
    {
        return $this->estadoCivil;
    }

    /**
     * @param mixed $estadoCivil
     * @return Clientes
     */
    public function setEstadoCivil($estadoCivil)
    {
        $this->estadoCivil = $estadoCivil;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getRendaMensal()
    {
        return $this->rendaMensal;
    }

    /**
     * @param mixed $rendaMensal
     * @return Clientes
     */
    public function setRendaMensal($rendaMensal)
    {
        $this->rendaMensal = str_replace(" ","",str_replace(",", ".", str_replace(".", " ", $rendaMensal)));
        return $this;
    }

    /**
     * @return mixed
     */
    public function getProfissao()
    {
        return $this->profissao;
    }

    /**
     * @param mixed $profissao
     * @return Clientes
     */
    public function setProfissao($profissao)
    {
        $this->profissao = $profissao;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getFiliacaoMae()
    {
        return $this->filiacaoMae;
    }

    /**
     * @param mixed $filiacaoMae
     * @return Clientes
     */
    public function setFiliacaoMae($filiacaoMae)
    {
        $this->filiacaoMae = $filiacaoMae;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getFiliacaoPai()
    {
        return $this->filiacaoPai;
    }

    /**
     * @param mixed $filiacaoPai
     * @return Clientes
     */
    public function setFiliacaoPai($filiacaoPai)
    {
        $this->filiacaoPai = $filiacaoPai;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getConjugeNome()
    {
        return $this->conjugeNome;
    }

    /**
     * @param mixed $conjugeNome
     * @return Clientes
     */
    public function setConjugeNome($conjugeNome)
    {
        $this->conjugeNome = $conjugeNome;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getConjugeCpf()
    {
        return $this->conjugeCpf;
    }

    /**
     * @param mixed $conjugeCpf
     * @return Clientes
     */
    public function setConjugeCpf($conjugeCpf)
    {
        $this->conjugeCpf = $conjugeCpf;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getConjugeDataNascimento()
    {
        return ($this->conjugeDataNascimento) ? date_format($this->conjugeDataNascimento, 'd-m-Y') : "";
    }

    /**
     * @param mixed $conjugeDataNascimento
     * @return Clientes
     */
    public function setConjugeDataNascimento($conjugeDataNascimento)
    {
        $this->conjugeDataNascimento = new \DateTime(implode("-", array_reverse(explode("/", $conjugeDataNascimento))));
        return $this;
    }

    /**
     * @return mixed
     */
    public function getConjugeProfissao()
    {
        return $this->conjugeProfissao;
    }

    /**
     * @param mixed $conjugeProfissao
     * @return Clientes
     */
    public function setConjugeProfissao($conjugeProfissao)
    {
        $this->conjugeProfissao = $conjugeProfissao;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getSuframa()
    {
        return $this->suframa;
    }

    /**
     * @param mixed $suframa
     * @return Clientes
     */
    public function setSuframa($suframa)
    {
        $this->suframa = $suframa;
        return $this;
    }

    /**
     * @return string
     */
    public function getRg()
    {
        return $this->rg;
    }

    /**
     * @param string $rg
     * @return Clientes
     */
    public function setRg($rg)
    {
        $this->rg = $rg;
        return $this;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->razaoSocial;
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return array(
            'id'                       => $this->id,
            'razaoSocial'              => $this->razaoSocial,
            'nomeFantasia'             => $this->nomeFantasia,
            'cnpj'                     => $this->cnpj,
            'cpf'                      => $this->cpf,
            'rg'                       => $this->rg,
            'sexo'                     => $this->sexo,
            'responsavel'              => $this->responsavel,
            'ie'                       => $this->ie,
            'ieIsento'                 => $this->ieIsento,
            'im'                       => $this->im,
            'imIsento'                 => $this->imIsento,
            'codigoCliente'            => $this->codigoCliente,
            'tipo'                     => $this->tipo,
            'origem'                   => $this->origem,
            'identificacaoEstrangeiro' => $this->identificacaoEstrangeiro,
            'observacao'               => $this->observacao,
            'email'                    => $this->email,
            'telefone'                 => $this->telefone,
            'alertas'                  => $this->alertas,
            'limiteCredito'            => $this->limiteCredito,
            'saldo'                    => $this->saldo,
            'classificacao'            => $this->classificacao,
            'ativo'                    => $this->ativo,
            'empresa'                  => $this->getEmpresa()->getId(),
            'criadoEm'                 => $this->getcriadoEm(),
            'atualizadoEm'             => $this->getatualizadoEm(),
            'dataNascimento'           => $this->getDataNascimento(),
            'estadoCivil'              => $this->estadoCivil,
            'rendaMensal'              => $this->rendaMensal,
            'profissao'                => $this->profissao,
            'filiacaoMae'              => $this->filiacaoMae,
            'filiacaoPai'              => $this->filiacaoPai,
            'conjugeNome'              => $this->conjugeNome,
            'conjugeCpf'               => $this->conjugeCpf,
            'conjugeDataNascimento'    => $this->getConjugeDataNascimento(),
            'conjugeProfissao'         => $this->conjugeProfissao,
            'suframa'                  => $this->suframa
        );
    }
}

