<?php
/**
 * Objeto usuario
 * @author Jefferson Fernandes
 * @date 16/02/2015
 * @time 19:52:00
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Entity;
use Doctrine\ORM\Mapping as ORM;
use Senna\Entity\Configurator;

/**
 * Usuarios
 *
 * @ORM\Table(name="usuarios", indexes={@ORM\Index(name="idx_login", columns={"login"}), @ORM\Index(name="idx_senha", columns={"senha"}), @ORM\Index(name="idx_ativo", columns={"ativo"}), @ORM\Index(name="idx_numeroEmpresa_fk", columns={"numeroEmpresa_FK"}), @ORM\Index(name="idx_redefinir", columns={"redefinir"})})
 * @ORM\Entity
 * @ORM\Entity(repositoryClass="Senna\Repository\UsuarioRepository")
 */
class Usuario
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
     * @ORM\Column(name="login", type="string", length=15, nullable=false)
     */
    private $login = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="senha", type="string", length=20, nullable=true)
     */
    private $senha = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="nome", type="string", length=100, nullable=true)
     */
    private $nome = '0';

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="dataCadastro", type="date", nullable=true)
     */
    private $datacadastro = '0000-00-00';

    /**
     * @var integer
     *
     * @ORM\Column(name="ativo", type="integer", nullable=true)
     */
    private $ativo = '1';

    /**
     * @var string
     *
     * @ORM\Column(name="nivel", type="string", length=25, nullable=true)
     */
    private $nivel = '1000';

    /**
     * @var boolean
     *
     * @ORM\Column(name="numeroEmpresa_FK", type="boolean", nullable=true)
     */
    private $numeroempresaFk = '1';

    /**
     * @var string
     *
     * @ORM\Column(name="token", type="string", length=255, nullable=true)
     */
    private $token = '0000000000000000000';

    /**
     * @var boolean
     *
     * @ORM\Column(name="redefinir", type="boolean", nullable=true)
     */
    private $redefinir = '0';

    /**
     * @var boolean
     *
     * @ORM\Column(name="ferias", type="boolean", nullable=true)
     */
    private $ferias = '0';

    /**
     * @var integer
     *
     * @ORM\Column(name="setor", type="integer", nullable=true)
     */
    private $setor = '0';

    /**
     * @var string
     *
     * @ORM\Column(name="Foto", type="string", length=255, nullable=true)
     */
    private $foto = '/image/users/userDefault.png';

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=255, nullable=true)
     */
    private $email;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="jornadaInicio", type="time", nullable=true)
     */
    private $jornadainicio = '00:00:00';

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="jornadaFim", type="time", nullable=true)
     */
    private $jornadafim = '00:00:00';

    /**
     * @var string
     *
     * @ORM\Column(name="semanaTrabalho", type="string", length=7, nullable=true)
     */
    private $semanatrabalho = '1111100';

    /**
     * @var string
     *
     * @ORM\Column(name="administrador", type="string", length=1, nullable=true)
     */
    private $administrador = '0';


    /**
     * @var string
     *
     * @ORM\Column(name="cpf", type="string", length=1, nullable=true)
     */
    private $cpf = '000.000.000-00';

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
    }

    /**
     * @return string
     */
    public function getNome()
    {
        return $this->nome;
    }

    /**
     * @param string $nome
     */
    public function setNome($nome)
    {
        $this->nome = $nome;
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
     * @return int
     */
    public function getAtivo()
    {
        return $this->ativo;
    }

    /**
     * @param int $ativo
     */
    public function setAtivo($ativo)
    {
        $this->ativo = $ativo;
    }

    /**
     * @return string
     */
    public function getNivel()
    {
        return $this->nivel;
    }

    /**
     * @param string $nivel
     */
    public function setNivel($nivel)
    {
        $this->nivel = $nivel;
    }

    /**
     * @return boolean
     */
    public function isNumeroempresaFk()
    {
        return $this->numeroempresaFk;
    }

    /**
     * @param boolean $numeroempresaFk
     */
    public function setNumeroempresaFk($numeroempresaFk)
    {
        $this->numeroempresaFk = $numeroempresaFk;
    }

    /**
     * @return string
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * @param string $token
     */
    public function setToken($token)
    {
        $this->token = $token;
    }

    /**
     * @return boolean
     */
    public function isRedefinir()
    {
        return $this->redefinir;
    }

    /**
     * @param boolean $redefinir
     */
    public function setRedefinir($redefinir)
    {
        $this->redefinir = $redefinir;
    }

    /**
     * @return boolean
     */
    public function isFerias()
    {
        return $this->ferias;
    }

    /**
     * @param boolean $ferias
     */
    public function setFerias($ferias)
    {
        $this->ferias = $ferias;
    }

    /**
     * @return int
     */
    public function getSetor()
    {
        return $this->setor;
    }

    /**
     * @param int $setor
     */
    public function setSetor($setor)
    {
        $this->setor = $setor;
    }

    /**
     * @return string
     */
    public function getFoto()
    {
        return $this->foto;
    }

    /**
     * @param string $foto
     */
    public function setFoto($foto)
    {
        $this->foto = $foto;
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
     * @return \DateTime
     */
    public function getJornadainicio()
    {
        return $this->jornadainicio;
    }

    /**
     * @param \DateTime $jornadainicio
     */
    public function setJornadainicio($jornadainicio)
    {
        $this->jornadainicio = $jornadainicio;
    }

    /**
     * @return \DateTime
     */
    public function getJornadafim()
    {
        return $this->jornadafim;
    }

    /**
     * @param \DateTime $jornadafim
     */
    public function setJornadafim($jornadafim)
    {
        $this->jornadafim = $jornadafim;
    }

    /**
     * @return string
     */
    public function getSemanatrabalho()
    {
        return $this->semanatrabalho;
    }

    /**
     * @param string $semanatrabalho
     */
    public function setSemanatrabalho($semanatrabalho)
    {
        $this->semanatrabalho = $semanatrabalho;
    }

    /**
     * @return string
     */
    public function getAdministrador()
    {
        return $this->administrador;
    }

    /**
     * @param string $administrador
     */
    public function setAdministrador($administrador)
    {
        $this->administrador = $administrador;
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

}
