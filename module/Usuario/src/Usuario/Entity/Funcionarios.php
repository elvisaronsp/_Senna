<?php
namespace Usuario\Entity;

use Doctrine\ORM\Mapping as ORM;

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
    private $ativo = '1';

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
    private $chaveativacao = '';

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
    private $datanascimento = '0000-00-00';

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
    private $dataadminissao = '0000-00-00';

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dataDemissao", type="date", nullable=true)
     */
    private $datademissao = '0000-00-00';

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
    private $bloqueiotemporario = '0000-00-00 00:00:00';

    /**
     * @var boolean
     *
     * @ORM\Column(name="redefinirSenha", type="boolean", nullable=true)
     */
    private $redefinirsenha;

    /**
     * @var integer
     *
     * @ORM\Column(name="perfil_id", type="integer", nullable=true)
     */
    private $perfil;

    /**
     * @var integer
     *
     * @ORM\Column(name="setor_id", type="integer", nullable=true)
     */
    private $setor;

    /**
     * @var integer
     *
     * @ORM\Column(name="horarios_id", type="integer", nullable=true)
     */
    private $horarios;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="criadoEm", type="datetime", nullable=false)
     */
    private $criadoem = '0000-00-00 00:00:00';

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="atualizadoEm", type="datetime", nullable=false)
     */
    private $atualizadoem = '0000-00-00 00:00:00';

    /**
     * @return \DateTime
     */
    public function getDataadminissao()
    {
        return date_format($this->dataadminissao, 'd-m-Y H:i');
    }

    /**
     * @param \DateTime $dataadminissao
     */
    public function setDataadminissao($dataadminissao)
    {
        $this->dataadminissao = $dataadminissao;
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
     * @return string
     */
    public function getNome()
    {
        return strtoupper($this->nome);
    }

    /**
     * @param string $nome
     */
    public function setNome($nome)
    {
        $this->nome = strtoupper($nome);
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
     * @return boolean
     */
    public function getAtivo()
    {
        return $this->ativo;
    }

    /**
     * @param boolean $ativo
     */
    public function setAtivo($ativo)
    {
        $this->ativo = $ativo;
    }

    /**
     * @return boolean
     */
    public function getConfirmado()
    {
        return $this->confirmado;
    }

    /**
     * @param boolean $confirmado
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
     * @param string $sexo
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
     * @param string $login
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
     * @param string $senha
     */
    public function setSenha($senha)
    {
        $this->senha = $senha;
        return $this;
    }

    /**
     * @return string
     */
    public function getSalt()
    {
        return $this->salt;
    }

    /**
     * @param string $salt
     */
    public function setSalt($salt)
    {
        $this->salt = $salt;
        return $this;
    }

    /**
     * @return string
     */
    public function getChaveativacao()
    {
        return $this->chaveativacao;
    }

    /**
     * @param string $chaveativacao
     */
    public function setChaveativacao($chaveativacao)
    {
        $this->chaveativacao = $chaveativacao;
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
     * @param string $telefoneprincipal
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
     * @param string $observacoes
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
     * @param string $rg
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
        return $this->datanascimento;
    }

    /**
     * @param \DateTime $datanascimento
     */
    public function setDatanascimento($datanascimento)
    {
        $this->datanascimento = $datanascimento;
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
     * @param int $escolaridade
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
     * @param float $comissao
     */
    public function setComissao($comissao)
    {
        $this->comissao = $comissao;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getDatademissao()
    {
        return date_format($this->datademissao, 'd-m-Y H:i');
    }

    /**
     * @param \DateTime $datademissao
     */
    public function setDatademissao($datademissao)
    {
        $this->datademissao = $datademissao;
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
     * @param string $descancosemanal
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
     * @param string $ctps
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
     * @param float $descontomaximo
     */
    public function setDescontomaximo($descontomaximo)
    {
        $this->descontomaximo = $descontomaximo;
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
     * @param int $tipocontabancaria
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
     * @param string $agencia
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
     * @param string $contacorrente
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
     * @param string $numerobanco
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
     * @param int $liberdadevenda
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
     * @param \DateTime $bloqueiotemporario
     */
    public function setBloqueiotemporario($bloqueiotemporario)
    {
        $this->bloqueiotemporario = $bloqueiotemporario;
        return $this;
    }

    /**
     * @return boolean
     */
    public function isRedefinirsenha()
    {
        return $this->redefinirsenha;
    }

    /**
     * @param boolean $redefinirsenha
     */
    public function setRedefinirsenha($redefinirsenha)
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
     * @param int $perfilId
     */
    public function setPerfilId($perfil)
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
     * @param int $setorId
     */
    public function setSetor($setor)
    {
        $this->setor = $setor;
        return $this;
    }

    /**
     * @return int
     */
    public function getHorarios()
    {
        return $this->horarios;
    }

    /**
     * @param int $horariosId
     */
    public function setHorarios($horarios)
    {
        $this->horarios = $horarios;
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
     * @param \DateTime $criadoem
     */
    public function setCriadoem($criadoem)
    {
        $this->criadoem = $criadoem;
    }

    /**
     * @return \DateTime
     */
    public function getAtualizadoem()
    {
        return date_format($this->atualizadoem, 'd-m-Y H:i');
    }

    /**
     * @param \DateTime $atualizadoem
     */
    public function setAtualizadoem($atualizadoem)
    {
        $this->atualizadoem = $atualizadoem;
    }
}

