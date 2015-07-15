<?php
namespace Usuario\Entity;

use Doctrine\ORM\Mapping as ORM;
use Zend\Stdlib\Hydrator;
use Zend\Math\Rand,
    Zend\Crypt\Key\Derivation\Pbkdf2;

/**
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 * @ORM\Table(name="sn_usuarios")
 * @ORM\Entity(repositoryClass="Usuario\Repository\FuncionariosRepository")
 */
class Funcionarios
{
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
     * @ORM\Column(name="nome", type="string", length=255, nullable=false)
     */
    private $nome = '';

    /**
     * @var string
     *
     * @ORM\Column(name="cpf", type="string", length=14, nullable=true)
     */
    private $cpf;

    /**
     * @var boolean
     *
     * @ORM\Column(name="ativo", type="boolean", nullable=false)
     */
    private $ativo;

    /**
     * @var boolean
     *
     * @ORM\Column(name="confirmado", type="boolean", nullable=true)
     */
    private $confirmado;

    /**
     * @var string
     *
     * @ORM\Column(name="sexo", type="string", length=255, nullable=false)
     */
    private $sexo = '';

    /**
     * @var string
     *
     * @ORM\Column(name="login", type="string", length=50, nullable=false)
     */
    private $login = '';

    /**
     * @var string
     *
     * @ORM\Column(name="senha", type="string", length=100, nullable=false)
     */
    private $senha = '';

    /**
     * @var string
     *
     * @ORM\Column(name="salt", type="string", length=255, nullable=false)
     */
    private $salt = '';

    /**
     * @var string
     *
     * @ORM\Column(name="chaveAtivacao", type="string", length=255, nullable=false)
     */
    private $chaveAtivacao = '';

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=100, nullable=false)
     */
    private $email = '';

    /**
     * @var string
     *
     * @ORM\Column(name="telefonePrincipal", type="string", length=14, nullable=false)
     */
    private $telefoneprincipal = '';

    /**
     * @var string
     *
     * @ORM\Column(name="observacoes", type="text", length=16777215, nullable=true)
     */
    private $observacoes;

    /**
     * @var string
     *
     * @ORM\Column(name="rg", type="string", length=50, nullable=true)
     */
    private $rg;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dataNascimento", type="date", nullable=true)
     */
    private $datanascimento;

    /**
     * @var integer
     *
     * @ORM\Column(name="escolaridade", type="integer", nullable=true)
     */
    private $escolaridade;

    /**
     * @var float
     *
     * @ORM\Column(name="comissao", type="float", precision=10, scale=2, nullable=true)
     */
    private $comissao = '0.00';

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dataAdminissao", type="date", nullable=true)
     */
    private $dataadminissao;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dataDemissao", type="date", nullable=true)
     */
    private $datademissao;

    /**
     * @var string
     *
     * @ORM\Column(name="descancoSemanal", type="string", length=100, nullable=true)
     */
    private $descancosemanal;

    /**
     * @var string
     *
     * @ORM\Column(name="ctps", type="string", length=100, nullable=true)
     */
    private $ctps;

    /**
     * @var float
     *
     * @ORM\Column(name="descontoMaximo", type="float", precision=10, scale=2, nullable=true)
     */
    private $descontomaximo = '0.00';

    /**
     * @var integer
     *
     * @ORM\Column(name="tipoContaBancaria", type="integer", nullable=true)
     */
    private $tipocontabancaria = '1';

    /**
     * @var string
     *
     * @ORM\Column(name="agencia", type="string", length=50, nullable=true)
     */
    private $agencia;

    /**
     * @var string
     *
     * @ORM\Column(name="contaCorrente", type="string", length=50, nullable=true)
     */
    private $contacorrente;

    /**
     * @var string
     *
     * @ORM\Column(name="numeroBanco", type="string", length=50, nullable=true)
     */
    private $numerobanco;

    /**
     * @var integer
     *
     * @ORM\Column(name="liberdadeVenda", type="integer", nullable=true)
     */
    private $liberdadevenda;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="bloqueioTemporario", type="datetime", nullable=true)
     */
    private $bloqueiotemporario;

    /**
     * @var boolean
     *
     * @ORM\Column(name="redefinirSenha", type="boolean", nullable=true)
     */
    private $redefinirsenha;

    /**
     * @ORM\OneToOne(targetEntity="Acl\Entity\Perfis")
     * @ORM\JoinColumn(name="perfil_id", referencedColumnName="id")
     */
    private $perfil;

    /**
     * @var integer
     *
     * @ORM\Column(name="setor_id", type="integer", nullable=true)
     */
    private $setor;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="criadoEm", type="datetime", nullable=false)
     */
    private $criadoem;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="atualizadoEm", type="datetime", nullable=false)
     */
    private $atualizadoem;

    /**
     * @var boolean
     *
     * @ORM\Column(name="alertas", type="boolean", nullable=true)
     */
    private $alertas;


    /**
     * @var boolean
     *
     * @ORM\Column(name="modoFerias", type="boolean", nullable=true)
     */
    private $ferias;

    private $nomePerfilFuncionario;

    /**
     * @param array $options
     */
    public function __construct($options = array())
    {
        $this->criadoem = new \DateTime("now");
        $this->atualizadoem = new \DateTime("now");

        $this->salt = base64_encode(Rand::getBytes(32, true));
        $this->chaveAtivacao = md5($this->email.$this->salt);

        (new Hydrator\ClassMethods)->hydrate($options, $this);
    }

    /**
     * @return \DateTime
     */
    public function getDataadminissao()
    {
        return ($this->dataadminissao)?date_format($this->dataadminissao, 'd-m-Y'):"";
    }

    /**
     * @param $dataadminissao
     * @return $this
     */
    public function setDataadminissao($dataadminissao)
    {
        $this->dataadminissao = new \DateTime($dataadminissao);
        return $this;
    }

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param $id
     * @return $this
     */
    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return string
     */
    public function getNome()
    {
        return strtoupper($this->nome);
    }

    /**
     * @param $nome
     * @return $this
     */
    public function setNome($nome)
    {
        $this->nome = strtoupper($nome);
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
     * @param $cpf
     * @return $this
     */
    public function setCpf($cpf)
    {
        $this->cpf = $cpf;
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
     * @param $ativo
     * @return $this
     */
    public function setAtivo($ativo)
    {
        $this->ativo = $ativo;
        return $this;
    }

    /**
     * @return boolean
     */
    public function getConfirmado()
    {
        return $this->confirmado;
    }

    /**
     * @param $confirmado
     * @return $this
     */
    public function setConfirmado($confirmado)
    {
        $this->confirmado = $confirmado;
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
     * @param $sexo
     * @return $this
     */
    public function setSexo($sexo)
    {
        $this->sexo = $sexo;
        return $this;
    }

    /**
     * @return string
     */
    public function getLogin()
    {
        return $this->login;
    }

    /**
     * @param $login
     * @return $this
     */
    public function setLogin($login)
    {
        $this->login = $login;
        return $this;
    }

    /**
     * @return string
     */
    public function getSenha()
    {
        return $this->senha;
    }

    /**
     * @param $senha
     * @return $this
     */
    public function setSenha($senha) {
        $this->senha = $this->encryptSenha($senha);
        return $this;
    }

    /**
     * @param $senha
     * @return string
     */
    public function encryptSenha($senha)
    {
        return base64_encode(Pbkdf2::calc('sha256', $senha, $this->salt, 10000, strlen($senha*150)));
    }

    /**
     * @return string
     */
    public function getSalt()
    {
        return $this->salt;
    }

    /**
     * @param $salt
     * @return $this
     */
    public function setSalt($salt)
    {
        $this->salt = $salt;
        return $this;
    }

    /**
     * @return string
     */
    public function getChaveAtivacao()
    {
        return $this->chaveAtivacao;
    }

    /**
     * @param $chaveAtivacao
     * @return $this
     */
    public function setChaveAtivacao($chaveAtivacao)
    {
        $this->chaveAtivacao = $chaveAtivacao;
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
     * @param $email
     * @return $this
     */
    public function setEmail($email)
    {
        $this->email = $email;
        return $this;
    }

    /**
     * @return string
     */
    public function getTelefoneprincipal()
    {
        return $this->telefoneprincipal;
    }

    /**
     * @param $telefoneprincipal
     * @return $this
     */
    public function setTelefoneprincipal($telefoneprincipal)
    {
        $this->telefoneprincipal = $telefoneprincipal;
        return $this;
    }

    /**
     * @return string
     */
    public function getObservacoes()
    {
        return $this->observacoes;
    }

    /**
     * @param $observacoes
     * @return $this
     */
    public function setObservacoes($observacoes)
    {
        $this->observacoes = $observacoes;
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
     * @param $rg
     * @return $this
     */
    public function setRg($rg)
    {
        $this->rg = $rg;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getDatanascimento()
    {
        return ($this->datanascimento)?date_format($this->datanascimento, 'd-m-Y'):"";
    }

    /**
     * @param $datanascimento
     * @return $this
     */
    public function setDatanascimento($datanascimento)
    {
        $this->datanascimento = new \DateTime($datanascimento);
        return $this;
    }

    /**
     * @return int
     */
    public function getEscolaridade()
    {
        return $this->escolaridade;
    }

    /**
     * @param $escolaridade
     * @return $this
     */
    public function setEscolaridade($escolaridade)
    {
        $this->escolaridade = $escolaridade;
        return $this;
    }

    /**
     * @return float
     */
    public function getComissao()
    {
        return $this->comissao;
    }

    /**
     * @param $comissao
     * @return $this
     */
    public function setComissao($comissao)
    {
        $this->comissao =  str_replace ( ",", ".", str_replace ( ".", " ", $comissao) );
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getDatademissao()
    {
        return ($this->datademissao)?date_format($this->datademissao, 'd-m-Y'):"";
    }

    /**
     * @param $datademissao
     * @return $this
     */
    public function setDatademissao($datademissao)
    {
        $this->datademissao = new \DateTime($datademissao);
        return $this;
    }

    /**
     * @return string
     */
    public function getDescancosemanal()
    {
        return $this->descancosemanal;
    }

    /**
     * @param $descancosemanal
     * @return $this
     */
    public function setDescancosemanal($descancosemanal)
    {
        $this->descancosemanal = $descancosemanal;
        return $this;
    }

    /**
     * @return string
     */
    public function getCtps()
    {
        return $this->ctps;
    }

    /**
     * @param $ctps
     * @return $this
     */
    public function setCtps($ctps)
    {
        $this->ctps = $ctps;
        return $this;
    }

    /**
     * @return float
     */
    public function getDescontomaximo()
    {
        return $this->descontomaximo;
    }

    /**
     * @param $descontomaximo
     * @return $this
     */
    public function setDescontomaximo($descontomaximo)
    {
        $this->descontomaximo =  str_replace ( ",", ".", str_replace ( ".", " ", $descontomaximo) );
        return $this;
    }

    /**
     * @return int
     */
    public function getTipocontabancaria()
    {
        return $this->tipocontabancaria;
    }

    /**
     * @param $tipocontabancaria
     * @return $this
     */
    public function setTipocontabancaria($tipocontabancaria)
    {
        $this->tipocontabancaria = $tipocontabancaria;
        return $this;
    }

    /**
     * @return string
     */
    public function getAgencia()
    {
        return $this->agencia;
    }

    /**
     * @param $agencia
     * @return $this
     */
    public function setAgencia($agencia)
    {
        $this->agencia = $agencia;
        return $this;
    }

    /**
     * @return string
     */
    public function getContacorrente()
    {
        return $this->contacorrente;
    }

    /**
     * @param $contacorrente
     * @return $this
     */
    public function setContacorrente($contacorrente)
    {
        $this->contacorrente = $contacorrente;
        return $this;
    }

    /**
     * @return string
     */
    public function getNumerobanco()
    {
        return $this->numerobanco;
    }

    /**
     * @param $numerobanco
     * @return $this
     */
    public function setNumerobanco($numerobanco)
    {
        $this->numerobanco = $numerobanco;
        return $this;
    }

    /**
     * @return int
     */
    public function getLiberdadevenda()
    {
        return $this->liberdadevenda;
    }

    /**
     * @param $liberdadevenda
     * @return $this
     */
    public function setLiberdadevenda($liberdadevenda)
    {
        $this->liberdadevenda = $liberdadevenda;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getBloqueiotemporario()
    {
        return $this->bloqueiotemporario;
    }

    /**
     * @param $bloqueiotemporario
     * @return $this
     */
    public function setBloqueiotemporario($bloqueiotemporario)
    {
        $this->bloqueiotemporario = $bloqueiotemporario;
        return $this;
    }

    /**
     * @return boolean
     */
    public function getRedefinirSenha()
    {
        return $this->redefinirsenha;
    }

    /**
     * @param $redefinirsenha
     * @return $this
     */
    public function setRedefinirSenha($redefinirsenha)
    {
        $this->redefinirsenha = $redefinirsenha;
        return $this;
    }

    /**
     * @return int
     */
    public function getPerfil()
    {
        return $this->perfil;
    }

    /**
     * @param $perfil
     * @return $this
     */
    public function setPerfil($perfil)
    {
        $this->perfil = $perfil;
        return $this;
    }

    /**
     * @return int
     */
    public function getSetor()
    {
        return $this->setor;
        return $this;
    }

    /**
     * @param $setor
     * @return $this
     */
    public function setSetor($setor)
    {
        $this->setor = $setor;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getCriadoem()
    {
        return date_format($this->criadoem, 'd-m-Y H:i');
    }

    /**
     * @return $this
     */
    public function setCriadoem()
    {
        $this->criadoEm = new \DateTime("now");

    }

    /**
     * @return \DateTime
     */
    public function getAtualizadoem()
    {
        return date_format($this->atualizadoem, 'd-m-Y H:i');
    }

    /**
     * @ORM\PrePersist
     */
    public function setAtualizadoem()
    {
        $this->atualizadoEm = new \DateTime("now");
    }

    /**
     * @return boolean
     */
    public function getAlertas()
    {
        return $this->alertas;
    }

    /**
     * @param $alertas
     * @return $this
     */
    public function setAlertas($alertas)
    {
        $this->alertas = $alertas;
        return $this;
    }

    /**
     * @return bool
     */
    public function getFerias()
    {
        return $this->ferias;
    }

    /**
     * @param $ferias
     * @return $this
     */
    public function setFerias($ferias)
    {
        $this->ferias = $ferias;
        return $this;
    }

    /**
     * @return nome
     */
    public function getNomePerfilFuncionario()
    {
        return $this->nomePerfilFuncionario;
    }

    /**
     * @param $nomePerfilFuncionario
     * @return $this
     */
    public function setNomePerfilFuncionario($nomePerfilFuncionario)
    {
        $this->nomePerfilFuncionario = $nomePerfilFuncionario;
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
            'id'=>$this->id,
            'nome'=>$this->nome,
            'cpf'=>$this->cpf,
            'ativo'=>($this->ativo)?"1":"0",
            'confirmado'=>$this->confirmado,
            'sexo'=>$this->sexo,
            'login'=>$this->login,
            'senha'=>$this->senha,
            'salt'=>$this->salt,
            'chaveativacao'=>$this->chaveAtivacao,
            'email'=>$this->email,
            'telefoneprincipal'=>$this->telefoneprincipal,
            'observacoes'=>$this->observacoes,
            'rg'=>$this->rg,
            'dataNascimento'=> ($this->datanascimento)?date_format($this->datanascimento, 'd-m-Y'):"",
            'escolaridade'=>$this->escolaridade,
            'comissao'=>$this->comissao,
            'dataAdminissao'=> ($this->dataadminissao)?date_format($this->dataadminissao, 'd-m-Y'):"",
            'dataDemissao'=> ($this->datademissao)?date_format($this->datademissao, 'd-m-Y'):"",
            'descancoSemanal'=>$this->descancosemanal,
            'ctps'=>$this->ctps,
            'descontoMaximo'=>$this->descontomaximo,
            'tipoContaBancaria'=>$this->tipocontabancaria,
            'agencia'=>$this->agencia,
            'contaCorrente'=>$this->contacorrente,
            'numerobanco'=>$this->numerobanco,
            'liberdadevenda'=>$this->liberdadevenda,
            'bloqueiotemporario'=>$this->bloqueiotemporario,
            'redefinirSenha'=>$this->redefinirsenha,
            'perfil'=>$this->perfil,
            'id_perfil'=>$this->getPerfil()->getId(),
            'setor'=>$this->setor,
            'criadoem'=>$this->getCriadoem(),
            'atualizadoem'=>$this->getAtualizadoem(),
            'ferias'=>$this->ferias,
            'alertas'=>$this->alertas
        );
    }
}

