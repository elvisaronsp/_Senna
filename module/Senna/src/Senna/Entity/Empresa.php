<?php

/**
 * @author Jefferson Fernandes
 * @date 16/02/2015
 * @time 13:51:00
 * @project_name  Senna -- Grupo Capital Ponto
 */

namespace Senna\Entity;
use Doctrine\ORM\Mapping as ORM;
use Senna\Entity\Configurator;

/**
 * Empresa
 *
 * @ORM\Table(name="empresa")
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="Senna\Repository\EmpresaRepository")
 */
class Empresa
{

    /**
     * Metodo resposavel por dar getters e setters automaticamente
     * @param string $options
     */
    public function __construct($options = null){

        Configurator::configure($this, $options);
    }
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="NomeFantasia", type="string", length=150, nullable=true)
     */
    private $nomefantasia = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="NomeResponsavel", type="string", length=50, nullable=true)
     */
    private $nomeresponsavel;

    /**
     * @var string
     *
     * @ORM\Column(name="TelefoneResidencial", type="string", length=30, nullable=true)
     */
    private $telefoneresidencial;

    /**
     * @var string
     *
     * @ORM\Column(name="TelefoneComercial", type="string", length=20, nullable=true)
     */
    private $telefonecomercial;

    /**
     * @var string
     *
     * @ORM\Column(name="TelefoneCelular", type="string", length=20, nullable=true)
     */
    private $telefonecelular;

    /**
     * @var string
     *
     * @ORM\Column(name="Endereco", type="string", length=255, nullable=true)
     */
    private $endereco;

    /**
     * @var string
     *
     * @ORM\Column(name="Bairro", type="string", length=100, nullable=true)
     */
    private $bairro;

    /**
     * @var string
     *
     * @ORM\Column(name="Email", type="string", length=200, nullable=true)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="Cep", type="string", length=12, nullable=true)
     */
    private $cep;

    /**
     * @var string
     *
     * @ORM\Column(name="Cnpj", type="string", length=50, nullable=true)
     */
    private $cnpj;

    /**
     * @var string
     *
     * @ORM\Column(name="Cpf", type="string", length=15, nullable=true)
     */
    private $cpf;

    /**
     * @var string
     *
     * @ORM\Column(name="Atendimento", type="string", length=200, nullable=true)
     */
    private $atendimento = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="RazaoSocial", type="string", length=150, nullable=true)
     */
    private $razaosocial = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="InscricaoEstadual", type="string", length=50, nullable=true)
     */
    private $inscricaoestadual;

    /**
     * @var string
     *
     * @ORM\Column(name="InscricaoMunicipal", type="string", length=50, nullable=true)
     */
    private $inscricaomunicipal;

    /**
     * @var string
     *
     * @ORM\Column(name="Site", type="string", length=50, nullable=true)
     */
    private $site;

    /**
     * @var string
     *
     * @ORM\Column(name="skype", type="string", length=50, nullable=true)
     */
    private $skype;

    /**
     * @var string
     *
     * @ORM\Column(name="Observacao", type="string", length=255, nullable=true)
     */
    private $observacao;

    /**
     * @var string
     *
     * @ORM\Column(name="Uf", type="string", length=2, nullable=true)
     */
    private $uf = 'PR';

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="DataCadastro", type="date", nullable=true)
     */
    private $datacadastro = '0000-00-00';

    /**
     * @var string
     *
     * @ORM\Column(name="Atividade", type="string", length=150, nullable=true)
     */
    private $atividade;

    /**
     * @var string
     *
     * @ORM\Column(name="Cidade", type="string", length=150, nullable=true)
     */
    private $cidade;

    /**
     * @var integer
     *
     * @ORM\Column(name="numeroempresa", type="integer", nullable=true)
     */
    private $numeroempresa = '1';

    /**
     * @var string
     *
     * @ORM\Column(name="diretorio", type="string", length=255, nullable=true)
     */
    private $diretorio;

    /**
     * @var string
     *
     * @ORM\Column(name="complemento", type="string", length=255, nullable=true)
     */
    private $complemento;

    /**
     * @var string
     *
     * @ORM\Column(name="numero", type="string", length=10, nullable=true)
     */
    private $numero;

    /**
     * @var integer
     *
     * @ORM\Column(name="Qtde_Micro_Terminais", type="integer", nullable=true)
     */
    private $qtdeMicroTerminais = '10';

    /**
     * @var integer
     *
     * @ORM\Column(name="Qtde_Pc", type="integer", nullable=true)
     */
    private $qtdePc = '10';

    /**
     * @var boolean
     *
     * @ORM\Column(name="QtdeAtualTerminais", type="boolean", nullable=true)
     */
    private $qtdeatualterminais = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="MensagemPromocional", type="string", length=255, nullable=true)
     */
    private $mensagempromocional;

    /**
     * @var string
     *
     * @ORM\Column(name="codigomunicipio", type="string", length=7, nullable=true)
     */
    private $codigomunicipio;

    /**
     * @var string
     *
     * @ORM\Column(name="Md5", type="string", length=100, nullable=true)
     */
    private $md5 = 'FB0056A08A508B573AC30ABDEA0730BF';

    /**
     * @var string
     *
     * @ORM\Column(name="numerolaudo", type="string", length=50, nullable=true)
     */
    private $numerolaudo;

    /**
     * @var string
     *
     * @ORM\Column(name="md5_bloco7", type="string", length=32, nullable=true)
     */
    private $md5Bloco7;

    /**
     * @var string
     *
     * @ORM\Column(name="inscricaoestadualsubst", type="string", length=100, nullable=true)
     */
    private $inscricaoestadualsubst;

    /**
     * @var string
     *
     * @ORM\Column(name="CNAE", type="string", length=100, nullable=true)
     */
    private $cnae;

    /**
     * @var string
     *
     * @ORM\Column(name="Crt", type="string", length=255, nullable=true)
     */
    private $crt;

    /**
     * @var boolean
     *
     * @ORM\Column(name="MultiLoja", type="boolean", nullable=true)
     */
    private $multiloja = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="NomeGrupoMultiLoja", type="string", length=255, nullable=true)
     */
    private $nomegrupomultiloja;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="UltimaExportacao", type="date", nullable=true)
     */
    private $ultimaexportacao = '2000-01-01';

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="UltimaImportacao", type="date", nullable=true)
     */
    private $ultimaimportacao = '2000-01-01';

    /**
     * @var string
     *
     * @ORM\Column(name="NomeBDDataCenter", type="string", length=100, nullable=true)
     */
    private $nomebddatacenter = '';

    /**
     * @var string
     *
     * @ORM\Column(name="LoginBDDataCenter", type="string", length=100, nullable=true)
     */
    private $loginbddatacenter = '';

    /**
     * @var boolean
     *
     * @ORM\Column(name="replicadoOnline", type="boolean", nullable=true)
     */
    private $replicadoonline = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="versaoServidor", type="string", length=10, nullable=true)
     */
    private $versaoservidor = '';

    /**
     * @var string
     *
     * @ORM\Column(name="versaoAndroid", type="string", length=10, nullable=true)
     */
    private $versaoandroid = '';

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="UltimaVerificacaoAtualizacao", type="date", nullable=true)
     */
    private $ultimaverificacaoatualizacao = '2012-12-04';

    /**
     * @var integer
     *
     * @ORM\Column(name="Qtde_Mobile", type="integer", nullable=true)
     */
    private $qtdeMobile = '0';

    /**
     * @var integer
     *
     * @ORM\Column(name="Qtde_Caixa", type="integer", nullable=true)
     */
    private $qtdeCaixa = '0';

    /**
     * @var integer
     *
     * @ORM\Column(name="Modulos", type="integer", nullable=true)
     */
    private $modulos = '0';

    /**
     * @var integer
     *
     * @ORM\Column(name="QTde_MultiLoja", type="integer", nullable=true)
     */
    private $qtdeMultiloja = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="contribuinteIpi", type="string", length=1, nullable=true)
     */
    private $contribuinteipi = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="contribuinteISS", type="string", length=1, nullable=true)
     */
    private $contribuinteiss = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="ReceitaBruta12meses", type="string", length=255, nullable=true)
     */
    private $receitabruta12meses = 'Ate 180.000,00';

    /**
     * @var float
     *
     * @ORM\Column(name="AliquotaSimplesNacional", type="float", precision=4, scale=2, nullable=true)
     */
    private $aliquotasimplesnacional = '4.00';

    /**
     * @var float
     *
     * @ORM\Column(name="irpj", type="float", precision=4, scale=2, nullable=true)
     */
    private $irpj = '0.00';

    /**
     * @var float
     *
     * @ORM\Column(name="csll", type="float", precision=4, scale=2, nullable=true)
     */
    private $csll = '0.00';

    /**
     * @var float
     *
     * @ORM\Column(name="cofins", type="float", precision=4, scale=2, nullable=true)
     */
    private $cofins = '0.00';

    /**
     * @var float
     *
     * @ORM\Column(name="pis", type="float", precision=4, scale=2, nullable=true)
     */
    private $pis = '0.00';

    /**
     * @var float
     *
     * @ORM\Column(name="cpp", type="float", precision=4, scale=2, nullable=true)
     */
    private $cpp = '2.75';

    /**
     * @var float
     *
     * @ORM\Column(name="icms", type="float", precision=4, scale=2, nullable=true)
     */
    private $icms = '1.25';

    /**
     * @var float
     *
     * @ORM\Column(name="iss", type="float", precision=4, scale=2, nullable=true)
     */
    private $iss = '0.00';

    /**
     * @var float
     *
     * @ORM\Column(name="ipi", type="float", precision=4, scale=2, nullable=true)
     */
    private $ipi = '0.00';

    /**
     * @var float
     *
     * @ORM\Column(name="percentualReducaoPGDAS", type="float", precision=4, scale=2, nullable=true)
     */
    private $percentualreducaopgdas = '0.00';

    /**
     * @var float
     *
     * @ORM\Column(name="irpjISS", type="float", precision=4, scale=2, nullable=true)
     */
    private $irpjiss = '0.00';

    /**
     * @var float
     *
     * @ORM\Column(name="csllISS", type="float", precision=4, scale=2, nullable=true)
     */
    private $cslliss = '0.00';

    /**
     * @var float
     *
     * @ORM\Column(name="cofinsISS", type="float", precision=4, scale=2, nullable=true)
     */
    private $cofinsiss = '0.00';

    /**
     * @var float
     *
     * @ORM\Column(name="pisISS", type="float", precision=4, scale=2, nullable=true)
     */
    private $pisiss = '0.00';

    /**
     * @var float
     *
     * @ORM\Column(name="cppISS", type="float", precision=4, scale=2, nullable=true)
     */
    private $cppiss = '0.00';

    /**
     * @var string
     *
     * @ORM\Column(name="LotacaoMaxima", type="string", length=20, nullable=true)
     */
    private $lotacaomaxima = '1000';

    /**
     * @var string
     *
     * @ORM\Column(name="emailSms", type="string", length=200, nullable=true)
     */
    private $emailsms;

    /**
     * @var string
     *
     * @ORM\Column(name="senhaSms", type="string", length=25, nullable=true)
     */
    private $senhasms;

    /**
     * @var string
     *
     * @ORM\Column(name="celularSms", type="string", length=20, nullable=true)
     */
    private $celularsms;

    /**
     * @var string
     *
     * @ORM\Column(name="nickNameWhastApp", type="string", length=100, nullable=true)
     */
    private $nicknamewhastapp;

    /**
     * @var string
     *
     * @ORM\Column(name="numeroWhatsApp", type="string", length=20, nullable=true)
     */
    private $numerowhatsapp;

    /**
     * @var string
     *
     * @ORM\Column(name="emei", type="string", length=50, nullable=true)
     */
    private $emei;

    /**
     * @var string
     *
     * @ORM\Column(name="senhaWhatsApp", type="string", length=100, nullable=true)
     */
    private $senhawhatsapp;

    /**
     * @var string
     *
     * @ORM\Column(name="idWhatsApp", type="string", length=100, nullable=true)
     */
    private $idwhatsapp;

    /**
     * @var string
     *
     * @ORM\Column(name="HardRock_StoreNumber", type="string", length=10, nullable=true)
     */
    private $hardrockStorenumber;

    /**
     * @var integer
     *
     * @ORM\Column(name="qtde_usuarios", type="integer", nullable=true)
     */
    private $qtdeUsuarios = '0';

    /**
     * @var integer
     *
     * @ORM\Column(name="tipo", type="integer", nullable=true)
     */
    private $tipo = '0';

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
     * @return string
     */
    public function getNomefantasia()
    {
        return $this->nomefantasia;
    }

    /**
     * @param string $nomefantasia
     */
    public function setNomefantasia($nomefantasia)
    {
        $this->nomefantasia = $nomefantasia;
    }

    /**
     * @return string
     */
    public function getNomeresponsavel()
    {
        return $this->nomeresponsavel;
    }

    /**
     * @param string $nomeresponsavel
     */
    public function setNomeresponsavel($nomeresponsavel)
    {
        $this->nomeresponsavel = $nomeresponsavel;
    }

    /**
     * @return string
     */
    public function getTelefoneresidencial()
    {
        return $this->telefoneresidencial;
    }

    /**
     * @param string $telefoneresidencial
     */
    public function setTelefoneresidencial($telefoneresidencial)
    {
        $this->telefoneresidencial = $telefoneresidencial;
    }

    /**
     * @return string
     */
    public function getTelefonecomercial()
    {
        return $this->telefonecomercial;
    }

    /**
     * @param string $telefonecomercial
     */
    public function setTelefonecomercial($telefonecomercial)
    {
        $this->telefonecomercial = $telefonecomercial;
    }

    /**
     * @return string
     */
    public function getTelefonecelular()
    {
        return $this->telefonecelular;
    }

    /**
     * @param string $telefonecelular
     */
    public function setTelefonecelular($telefonecelular)
    {
        $this->telefonecelular = $telefonecelular;
    }

    /**
     * @return string
     */
    public function getEndereco()
    {
        return $this->endereco;
    }

    /**
     * @param string $endereco
     */
    public function setEndereco($endereco)
    {
        $this->endereco = $endereco;
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
     */
    public function setBairro($bairro)
    {
        $this->bairro = $bairro;
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
     */
    public function setEmail($email)
    {
        $this->email = $email;
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
     */
    public function setCep($cep)
    {
        $this->cep = $cep;
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
     */
    public function setCnpj($cnpj)
    {
        $this->cnpj = $cnpj;
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
     */
    public function setCpf($cpf)
    {
        $this->cpf = $cpf;
    }

    /**
     * @return string
     */
    public function getAtendimento()
    {
        return $this->atendimento;
    }

    /**
     * @param string $atendimento
     */
    public function setAtendimento($atendimento)
    {
        $this->atendimento = $atendimento;
    }

    /**
     * @return string
     */
    public function getRazaosocial()
    {
        return $this->razaosocial;
    }

    /**
     * @param string $razaosocial
     */
    public function setRazaosocial($razaosocial)
    {
        $this->razaosocial = $razaosocial;
    }

    /**
     * @return string
     */
    public function getInscricaoestadual()
    {
        return $this->inscricaoestadual;
    }

    /**
     * @param string $inscricaoestadual
     */
    public function setInscricaoestadual($inscricaoestadual)
    {
        $this->inscricaoestadual = $inscricaoestadual;
    }

    /**
     * @return string
     */
    public function getInscricaomunicipal()
    {
        return $this->inscricaomunicipal;
    }

    /**
     * @param string $inscricaomunicipal
     */
    public function setInscricaomunicipal($inscricaomunicipal)
    {
        $this->inscricaomunicipal = $inscricaomunicipal;
    }

    /**
     * @return string
     */
    public function getSite()
    {
        return $this->site;
    }

    /**
     * @param string $site
     */
    public function setSite($site)
    {
        $this->site = $site;
    }

    /**
     * @return string
     */
    public function getSkype()
    {
        return $this->skype;
    }

    /**
     * @param string $skype
     */
    public function setSkype($skype)
    {
        $this->skype = $skype;
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
     */
    public function setObservacao($observacao)
    {
        $this->observacao = $observacao;
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
     */
    public function setUf($uf)
    {
        $this->uf = $uf;
    }

    /**
     * @return \DateTime
     */
    public function getDatacadastro()
    {
        return $this->datacadastro;
    }

    /**
     * @param \DateTime $datacadastro
     */
    public function setDatacadastro($datacadastro)
    {
        $this->datacadastro = $datacadastro;
    }

    /**
     * @return string
     */
    public function getAtividade()
    {
        return $this->atividade;
    }

    /**
     * @param string $atividade
     */
    public function setAtividade($atividade)
    {
        $this->atividade = $atividade;
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
     */
    public function setCidade($cidade)
    {
        $this->cidade = $cidade;
    }

    /**
     * @return int
     */
    public function getNumeroempresa()
    {
        return $this->numeroempresa;
    }

    /**
     * @param int $numeroempresa
     */
    public function setNumeroempresa($numeroempresa)
    {
        $this->numeroempresa = $numeroempresa;
    }

    /**
     * @return string
     */
    public function getDiretorio()
    {
        return $this->diretorio;
    }

    /**
     * @param string $diretorio
     */
    public function setDiretorio($diretorio)
    {
        $this->diretorio = $diretorio;
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
     */
    public function setComplemento($complemento)
    {
        $this->complemento = $complemento;
    }

    /**
     * @return string
     */
    public function getNumero()
    {
        return $this->numero;
    }

    /**
     * @param string $numero
     */
    public function setNumero($numero)
    {
        $this->numero = $numero;
    }

    /**
     * @return int
     */
    public function getQtdeMicroTerminais()
    {
        return $this->qtdeMicroTerminais;
    }

    /**
     * @param int $qtdeMicroTerminais
     */
    public function setQtdeMicroTerminais($qtdeMicroTerminais)
    {
        $this->qtdeMicroTerminais = $qtdeMicroTerminais;
    }

    /**
     * @return int
     */
    public function getQtdePc()
    {
        return $this->qtdePc;
    }

    /**
     * @param int $qtdePc
     */
    public function setQtdePc($qtdePc)
    {
        $this->qtdePc = $qtdePc;
    }

    /**
     * @return boolean
     */
    public function isQtdeatualterminais()
    {
        return $this->qtdeatualterminais;
    }

    /**
     * @param boolean $qtdeatualterminais
     */
    public function setQtdeatualterminais($qtdeatualterminais)
    {
        $this->qtdeatualterminais = $qtdeatualterminais;
    }

    /**
     * @return string
     */
    public function getMensagempromocional()
    {
        return $this->mensagempromocional;
    }

    /**
     * @param string $mensagempromocional
     */
    public function setMensagempromocional($mensagempromocional)
    {
        $this->mensagempromocional = $mensagempromocional;
    }

    /**
     * @return string
     */
    public function getCodigomunicipio()
    {
        return $this->codigomunicipio;
    }

    /**
     * @param string $codigomunicipio
     */
    public function setCodigomunicipio($codigomunicipio)
    {
        $this->codigomunicipio = $codigomunicipio;
    }

    /**
     * @return string
     */
    public function getMd5()
    {
        return $this->md5;
    }

    /**
     * @param string $md5
     */
    public function setMd5($md5)
    {
        $this->md5 = $md5;
    }

    /**
     * @return string
     */
    public function getNumerolaudo()
    {
        return $this->numerolaudo;
    }

    /**
     * @param string $numerolaudo
     */
    public function setNumerolaudo($numerolaudo)
    {
        $this->numerolaudo = $numerolaudo;
    }

    /**
     * @return string
     */
    public function getMd5Bloco7()
    {
        return $this->md5Bloco7;
    }

    /**
     * @param string $md5Bloco7
     */
    public function setMd5Bloco7($md5Bloco7)
    {
        $this->md5Bloco7 = $md5Bloco7;
    }

    /**
     * @return string
     */
    public function getInscricaoestadualsubst()
    {
        return $this->inscricaoestadualsubst;
    }

    /**
     * @param string $inscricaoestadualsubst
     */
    public function setInscricaoestadualsubst($inscricaoestadualsubst)
    {
        $this->inscricaoestadualsubst = $inscricaoestadualsubst;
    }

    /**
     * @return string
     */
    public function getCnae()
    {
        return $this->cnae;
    }

    /**
     * @param string $cnae
     */
    public function setCnae($cnae)
    {
        $this->cnae = $cnae;
    }

    /**
     * @return string
     */
    public function getCrt()
    {
        return $this->crt;
    }

    /**
     * @param string $crt
     */
    public function setCrt($crt)
    {
        $this->crt = $crt;
    }

    /**
     * @return boolean
     */
    public function isMultiloja()
    {
        return $this->multiloja;
    }

    /**
     * @param boolean $multiloja
     */
    public function setMultiloja($multiloja)
    {
        $this->multiloja = $multiloja;
    }

    /**
     * @return string
     */
    public function getNomegrupomultiloja()
    {
        return $this->nomegrupomultiloja;
    }

    /**
     * @param string $nomegrupomultiloja
     */
    public function setNomegrupomultiloja($nomegrupomultiloja)
    {
        $this->nomegrupomultiloja = $nomegrupomultiloja;
    }

    /**
     * @return \DateTime
     */
    public function getUltimaexportacao()
    {
        return $this->ultimaexportacao;
    }

    /**
     * @param \DateTime $ultimaexportacao
     */
    public function setUltimaexportacao($ultimaexportacao)
    {
        $this->ultimaexportacao = $ultimaexportacao;
    }

    /**
     * @return \DateTime
     */
    public function getUltimaimportacao()
    {
        return $this->ultimaimportacao;
    }

    /**
     * @param \DateTime $ultimaimportacao
     */
    public function setUltimaimportacao($ultimaimportacao)
    {
        $this->ultimaimportacao = $ultimaimportacao;
    }

    /**
     * @return string
     */
    public function getNomebddatacenter()
    {
        return $this->nomebddatacenter;
    }

    /**
     * @param string $nomebddatacenter
     */
    public function setNomebddatacenter($nomebddatacenter)
    {
        $this->nomebddatacenter = $nomebddatacenter;
    }

    /**
     * @return string
     */
    public function getLoginbddatacenter()
    {
        return $this->loginbddatacenter;
    }

    /**
     * @param string $loginbddatacenter
     */
    public function setLoginbddatacenter($loginbddatacenter)
    {
        $this->loginbddatacenter = $loginbddatacenter;
    }

    /**
     * @return boolean
     */
    public function isReplicadoonline()
    {
        return $this->replicadoonline;
    }

    /**
     * @param boolean $replicadoonline
     */
    public function setReplicadoonline($replicadoonline)
    {
        $this->replicadoonline = $replicadoonline;
    }

    /**
     * @return string
     */
    public function getVersaoservidor()
    {
        return $this->versaoservidor;
    }

    /**
     * @param string $versaoservidor
     */
    public function setVersaoservidor($versaoservidor)
    {
        $this->versaoservidor = $versaoservidor;
    }

    /**
     * @return string
     */
    public function getVersaoandroid()
    {
        return $this->versaoandroid;
    }

    /**
     * @param string $versaoandroid
     */
    public function setVersaoandroid($versaoandroid)
    {
        $this->versaoandroid = $versaoandroid;
    }

    /**
     * @return \DateTime
     */
    public function getUltimaverificacaoatualizacao()
    {
        return $this->ultimaverificacaoatualizacao;
    }

    /**
     * @param \DateTime $ultimaverificacaoatualizacao
     */
    public function setUltimaverificacaoatualizacao($ultimaverificacaoatualizacao)
    {
        $this->ultimaverificacaoatualizacao = $ultimaverificacaoatualizacao;
    }

    /**
     * @return int
     */
    public function getQtdeMobile()
    {
        return $this->qtdeMobile;
    }

    /**
     * @param int $qtdeMobile
     */
    public function setQtdeMobile($qtdeMobile)
    {
        $this->qtdeMobile = $qtdeMobile;
    }

    /**
     * @return int
     */
    public function getQtdeCaixa()
    {
        return $this->qtdeCaixa;
    }

    /**
     * @param int $qtdeCaixa
     */
    public function setQtdeCaixa($qtdeCaixa)
    {
        $this->qtdeCaixa = $qtdeCaixa;
    }

    /**
     * @return int
     */
    public function getModulos()
    {
        return $this->modulos;
    }

    /**
     * @param int $modulos
     */
    public function setModulos($modulos)
    {
        $this->modulos = $modulos;
    }

    /**
     * @return int
     */
    public function getQtdeMultiloja()
    {
        return $this->qtdeMultiloja;
    }

    /**
     * @param int $qtdeMultiloja
     */
    public function setQtdeMultiloja($qtdeMultiloja)
    {
        $this->qtdeMultiloja = $qtdeMultiloja;
    }

    /**
     * @return string
     */
    public function getContribuinteipi()
    {
        return $this->contribuinteipi;
    }

    /**
     * @param string $contribuinteipi
     */
    public function setContribuinteipi($contribuinteipi)
    {
        $this->contribuinteipi = $contribuinteipi;
    }

    /**
     * @return string
     */
    public function getContribuinteiss()
    {
        return $this->contribuinteiss;
    }

    /**
     * @param string $contribuinteiss
     */
    public function setContribuinteiss($contribuinteiss)
    {
        $this->contribuinteiss = $contribuinteiss;
    }

    /**
     * @return string
     */
    public function getReceitabruta12meses()
    {
        return $this->receitabruta12meses;
    }

    /**
     * @param string $receitabruta12meses
     */
    public function setReceitabruta12meses($receitabruta12meses)
    {
        $this->receitabruta12meses = $receitabruta12meses;
    }

    /**
     * @return float
     */
    public function getAliquotasimplesnacional()
    {
        return $this->aliquotasimplesnacional;
    }

    /**
     * @param float $aliquotasimplesnacional
     */
    public function setAliquotasimplesnacional($aliquotasimplesnacional)
    {
        $this->aliquotasimplesnacional = $aliquotasimplesnacional;
    }

    /**
     * @return float
     */
    public function getIrpj()
    {
        return $this->irpj;
    }

    /**
     * @param float $irpj
     */
    public function setIrpj($irpj)
    {
        $this->irpj = $irpj;
    }

    /**
     * @return float
     */
    public function getCsll()
    {
        return $this->csll;
    }

    /**
     * @param float $csll
     */
    public function setCsll($csll)
    {
        $this->csll = $csll;
    }

    /**
     * @return float
     */
    public function getCofins()
    {
        return $this->cofins;
    }

    /**
     * @param float $cofins
     */
    public function setCofins($cofins)
    {
        $this->cofins = $cofins;
    }

    /**
     * @return float
     */
    public function getPis()
    {
        return $this->pis;
    }

    /**
     * @param float $pis
     */
    public function setPis($pis)
    {
        $this->pis = $pis;
    }

    /**
     * @return float
     */
    public function getCpp()
    {
        return $this->cpp;
    }

    /**
     * @param float $cpp
     */
    public function setCpp($cpp)
    {
        $this->cpp = $cpp;
    }

    /**
     * @return float
     */
    public function getIcms()
    {
        return $this->icms;
    }

    /**
     * @param float $icms
     */
    public function setIcms($icms)
    {
        $this->icms = $icms;
    }

    /**
     * @return float
     */
    public function getIss()
    {
        return $this->iss;
    }

    /**
     * @param float $iss
     */
    public function setIss($iss)
    {
        $this->iss = $iss;
    }

    /**
     * @return float
     */
    public function getIpi()
    {
        return $this->ipi;
    }

    /**
     * @param float $ipi
     */
    public function setIpi($ipi)
    {
        $this->ipi = $ipi;
    }

    /**
     * @return float
     */
    public function getPercentualreducaopgdas()
    {
        return $this->percentualreducaopgdas;
    }

    /**
     * @param float $percentualreducaopgdas
     */
    public function setPercentualreducaopgdas($percentualreducaopgdas)
    {
        $this->percentualreducaopgdas = $percentualreducaopgdas;
    }

    /**
     * @return float
     */
    public function getIrpjiss()
    {
        return $this->irpjiss;
    }

    /**
     * @param float $irpjiss
     */
    public function setIrpjiss($irpjiss)
    {
        $this->irpjiss = $irpjiss;
    }

    /**
     * @return float
     */
    public function getCslliss()
    {
        return $this->cslliss;
    }

    /**
     * @param float $cslliss
     */
    public function setCslliss($cslliss)
    {
        $this->cslliss = $cslliss;
    }

    /**
     * @return float
     */
    public function getCofinsiss()
    {
        return $this->cofinsiss;
    }

    /**
     * @param float $cofinsiss
     */
    public function setCofinsiss($cofinsiss)
    {
        $this->cofinsiss = $cofinsiss;
    }

    /**
     * @return float
     */
    public function getPisiss()
    {
        return $this->pisiss;
    }

    /**
     * @param float $pisiss
     */
    public function setPisiss($pisiss)
    {
        $this->pisiss = $pisiss;
    }

    /**
     * @return float
     */
    public function getCppiss()
    {
        return $this->cppiss;
    }

    /**
     * @param float $cppiss
     */
    public function setCppiss($cppiss)
    {
        $this->cppiss = $cppiss;
    }

    /**
     * @return string
     */
    public function getLotacaomaxima()
    {
        return $this->lotacaomaxima;
    }

    /**
     * @param string $lotacaomaxima
     */
    public function setLotacaomaxima($lotacaomaxima)
    {
        $this->lotacaomaxima = $lotacaomaxima;
    }

    /**
     * @return string
     */
    public function getEmailsms()
    {
        return $this->emailsms;
    }

    /**
     * @param string $emailsms
     */
    public function setEmailsms($emailsms)
    {
        $this->emailsms = $emailsms;
    }

    /**
     * @return string
     */
    public function getSenhasms()
    {
        return $this->senhasms;
    }

    /**
     * @param string $senhasms
     */
    public function setSenhasms($senhasms)
    {
        $this->senhasms = $senhasms;
    }

    /**
     * @return string
     */
    public function getCelularsms()
    {
        return $this->celularsms;
    }

    /**
     * @param string $celularsms
     */
    public function setCelularsms($celularsms)
    {
        $this->celularsms = $celularsms;
    }

    /**
     * @return string
     */
    public function getNicknamewhastapp()
    {
        return $this->nicknamewhastapp;
    }

    /**
     * @param string $nicknamewhastapp
     */
    public function setNicknamewhastapp($nicknamewhastapp)
    {
        $this->nicknamewhastapp = $nicknamewhastapp;
    }

    /**
     * @return string
     */
    public function getNumerowhatsapp()
    {
        return $this->numerowhatsapp;
    }

    /**
     * @param string $numerowhatsapp
     */
    public function setNumerowhatsapp($numerowhatsapp)
    {
        $this->numerowhatsapp = $numerowhatsapp;
    }

    /**
     * @return string
     */
    public function getEmei()
    {
        return $this->emei;
    }

    /**
     * @param string $emei
     */
    public function setEmei($emei)
    {
        $this->emei = $emei;
    }

    /**
     * @return string
     */
    public function getSenhawhatsapp()
    {
        return $this->senhawhatsapp;
    }

    /**
     * @param string $senhawhatsapp
     */
    public function setSenhawhatsapp($senhawhatsapp)
    {
        $this->senhawhatsapp = $senhawhatsapp;
    }

    /**
     * @return string
     */
    public function getIdwhatsapp()
    {
        return $this->idwhatsapp;
    }

    /**
     * @param string $idwhatsapp
     */
    public function setIdwhatsapp($idwhatsapp)
    {
        $this->idwhatsapp = $idwhatsapp;
    }

    /**
     * @return string
     */
    public function getHardrockStorenumber()
    {
        return $this->hardrockStorenumber;
    }

    /**
     * @param string $hardrockStorenumber
     */
    public function setHardrockStorenumber($hardrockStorenumber)
    {
        $this->hardrockStorenumber = $hardrockStorenumber;
    }

    /**
     * @return int
     */
    public function getQtdeUsuarios()
    {
        return $this->qtdeUsuarios;
    }

    /**
     * @param int $qtdeUsuarios
     */
    public function setQtdeUsuarios($qtdeUsuarios)
    {
        $this->qtdeUsuarios = $qtdeUsuarios;
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
     */
    public function setTipo($tipo)
    {
        $this->tipo = $tipo;
    }


}
