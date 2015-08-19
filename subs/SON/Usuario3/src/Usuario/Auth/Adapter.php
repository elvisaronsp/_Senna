<?php
namespace Usuario\Auth;

use Zend\Authentication\Adapter\AdapterInterface,
    Zend\Authentication\Result;

use Doctrine\ORM\EntityManager;

/**
 * Class Adapter
 * @package Usuario\Auth
 */
class Adapter implements AdapterInterface
{

    protected $em;
    protected $username;
    protected $password;
    protected $usuarioValido = true;
    protected $message = "Usuario ou senha inválidos";

    /**
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em) 
    {
        $this->em = $em;
    }

    /**
     * @return mixed
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * @param $username
     */
    public function setUsername($username)
    {
        $this->username = $username;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param $password
     */
    public function setPassword($password)
    {
        $this->password = $password;
    }

    /**
     * @return Result
     */
    public function authenticate() 
    {
        $repository = $this->em->getRepository("Usuario\Entity\Usuario");

        $usuario = $repository->findByEmailAndPassword($this->getUsername(),$this->getPassword());

        if($usuario && !$usuario->getAtivo())
        {
            $this->usuarioValido = false;
            $this->message = "Olá {$usuario->getNome()} sua conta ainda não foi ativada. Por favor verifique seu email."."Para receber novamente o e-mail de ativacao <a href='http://127.0.0.1:8181/registro/reativacao/{$usuario->getId()}'>Clique aqui</a>" ;
        }

        if($this->usuarioValido)
            return new Result(Result::SUCCESS, array('usuario'=>$usuario),array('Sucesso'));
        else
            return new Result(Result::FAILURE_CREDENTIAL_INVALID, null, array($this->message));
    }
}
