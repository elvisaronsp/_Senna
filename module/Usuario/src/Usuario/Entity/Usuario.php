<?php

namespace Usuario\Entity;

use Doctrine\ORM\Mapping as ORM;

use Zend\Math\Rand,
    Zend\Crypt\Key\Derivation\Pbkdf2;

use Zend\Stdlib\Hydrator;

/**
 * SnUsuario
 *
 * @ORM\Table(name="sn_usuario", uniqueConstraints={@ORM\UniqueConstraint(name="email", columns={"email"})})
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks
 */
class Usuario
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
    private $nome;

    /**
     * @var string
     *
     * @ORM\Column(name="sobrenome", type="string", length=255, nullable=false)
     */
    private $sobrenome;

    /**
     * @var string
     *
     * @ORM\Column(name="login", type="string", length=100, nullable=false)
     */
    private $login;

    /**
     * @var string
     *
     * @ORM\Column(name="email", type="string", length=255, nullable=false)
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(name="senha", type="string", length=255, nullable=true)
     */
    private $senha;

    /**
     * @var string
     *
     * @ORM\Column(name="salt", type="string", length=255, nullable=false)
     */
    private $salt;

    /**
     * @var boolean
     *
     * @ORM\Column(name="ativo", type="boolean", nullable=true)
     */
    private $ativo;

    /**
     * @var string
     *
     * @ORM\Column(name="chave_ativacao", type="string", length=255, nullable=true)
     */
    private $chaveAtivacao;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="atualizacao", type="datetime", nullable=true)
     */
    private $atualizacao;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="criado", type="datetime", nullable=true)
     */
    private $criado;
    /**
     * @param array $options
     */
    public function __construct(array $options = array())
    {

        (new Hydrator\ClassMethods)->hydrate($options,$this);

        $this->criado = new \DateTime("now");
        $this->atualizacao = new \DateTime("now");

        $this->salt = base64_encode(Rand::getBytes(8, true));
        $this->chaveAtivacao = md5($this->email.$this->salt);
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
     * @return \DateTime
     */
    public function getCriado()
    {
        return $this->criado;
    }

    /**
     * criação
     */
    public function setCriado()
    {
        $this->criado = new \DateTime("now");
    }

    /**
     * @return \DateTime
     */
    public function getAtualizacao()
    {
        return $this->atualizacao;
    }

    /**
     * @ORM\prePersist
     */
    public function setAtualizacao()
    {
        $this->atualizacao = new \DateTime("now");
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
        return base64_encode(Pbkdf2::calc('sha256', $senha, $this->salt, 10000, strlen($senha*2)));
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
    public function getSobrenome()
    {
        return $this->sobrenome;
    }

    /**
     * @param $sobrenome
     * @return $this
     */
    public function setSobrenome($sobrenome)
    {
        $this->sobrenome = $sobrenome;
        return $this;
    }

    /**
     * @return string
     */
    public function getNome()
    {
        return $this->nome;
    }

    /**
     * @param $nome
     * @return $this
     */
    public function setNome($nome)
    {
        $this->nome = $nome;
        return $this;
    }

    /**
     * @return array
     */
    public function toArray()
    {
        return (new Hydrator\ClassMethods())->extract($this);
    }

}

