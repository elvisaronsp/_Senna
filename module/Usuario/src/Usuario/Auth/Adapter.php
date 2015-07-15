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
    protected $login;
    protected $senha;
    protected $usuarioValido;
    protected $mensagem = "<strong>ATENÇÃO:</strong><br />Usuário ou senha inválidos. Por favor tente novamente!";

    /**
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em) 
    {
        $this->em = $em;
        $this->usuarioValido = false;
    }

    /**
     * @return mixed
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
     * @return mixed
     */
    public function getSenha()
    {
        return $this->senha;
    }

    /**
     * @param $senha
     * @return $this
     */
    public function setSenha($senha)
    {
        $this->senha = $senha;
        return $this;
    }

    /**
     * @return Result
     */
    public function authenticate()
    {
        $repository = $this->em->getRepository("Usuario\Entity\Funcionarios");

        $usuario = $repository->findByLoginAndSenha($this->getLogin(), $this->getSenha());

        if($usuario)
        {
            $nomeUsuario =  ucwords(strtolower($usuario->getNome()));
            if (!$usuario->getConfirmado())
                return new Result(Result::FAILURE_CREDENTIAL_INVALID, null, array("atencao","<strong>ATENÇÃO:</strong><br />Olá {$nomeUsuario} sua conta ainda não está ativa.<br />Por favor verifique seu email. Para receber o e-mail de ativação novamente <a href='http://127.0.0.1:8080/registro/reativacao/{$usuario->getId()}'>Clique aqui.</a>"));
            elseif (!$usuario->getAtivo())
                return new Result(Result::FAILURE_CREDENTIAL_INVALID, null, array("atencao","<strong>ATENÇÃO:</strong><br />Olá {$nomeUsuario} seu a acesso foi revogado.<br /> Você não tem permissão para acessar o Senna.</a>"));
            elseif ($usuario->getPerfil())
                return new Result(Result::FAILURE_CREDENTIAL_INVALID, null, array("atencao","<strong>ATENÇÃO:</strong><br />Olá {$nomeUsuario} seu a acesso foi suspenso temporariamente.<br /> Não queremos que você se preocupe, curta suas férias que nos cuidaremos de tudo por aqui ate você voltar.</a>"));

            $this->usuarioValido = true;
        }

        if ($this->usuarioValido)
            return new Result(Result::SUCCESS, array('usuario' => $usuario), array('Sucesso'));
        else
            return new Result(Result::FAILURE_CREDENTIAL_INVALID, null, array("error",$this->mensagem));
    }
}
