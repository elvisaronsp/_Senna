<?php
namespace Usuario\Auth;

use Zend\Authentication\Adapter\AdapterInterface,
    Zend\Authentication\Result;
use Zend\Mvc\Controller\AbstractActionController;

use Doctrine\ORM\EntityManager;

/**
 * Class Adapter
 * @package Usuario\Auth
 */
class Adapter extends AbstractActionController implements AdapterInterface
{

    protected $em;
    protected $login;
    protected $senha;
    protected $mensagem = "<strong>ATENÇÃO:</strong><br />Usuário ou senha inválidos. Por favor tente novamente!";

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

        $usuario = $repository->findByFuncionario($this->getLogin());

        if($usuario)
        {
            $nomeUsuario = ucwords(strtolower($usuario->getNome()));

            if ($usuario->getBloqueioTemporario() >=  new \DateTime('now'))
                return new Result(Result::FAILURE_CREDENTIAL_INVALID, null, array("atencao","<strong>ATENÇÃO:</strong><br />Olá {$nomeUsuario} seu a acesso foi suspenso temporariamente.<br /> Excesso de tentativas de login fracassadas."));

            elseif (!$repository->findBySenha($usuario->getLogin(),$this->getSenha()))
            {
                $service = $form = $this->getServiceLocator()->get("Usuario\Service\Funcionarios");
                $service->update(array('id'=>$usuario->getId(),'bloqueioLogin'=>$usuario->getTentativasLogin(),'nomeFuncionario'=>$usuario->getNome()));
                return new Result(Result::FAILURE_CREDENTIAL_INVALID, null, array("error", "<strong>ATENÇÃO:</strong><br />Olá {$nomeUsuario} a senha que voce digitou está incorreta.<br /> Por favor tente novamente."));
            }

            elseif (!$usuario->getConfirmado())
                return new Result(Result::FAILURE_CREDENTIAL_INVALID, null, array("atencao","<strong>ATENÇÃO:</strong><br />Olá {$nomeUsuario} sua conta ainda não está ativa.<br />Por favor verifique seu email. Para receber o e-mail de ativação novamente <a href='http://127.0.0.1:8080/registro/reativacao/{$usuario->getId()}'>Clique aqui.</a>"));

            elseif (!$usuario->getAtivo())
                return new Result(Result::FAILURE_CREDENTIAL_INVALID, null, array("atencao","<strong>ATENÇÃO:</strong><br />Olá {$nomeUsuario} seu a acesso foi revogado.<br /> Você não tem permissão para acessar o Senna.</a>"));

            elseif ($usuario->getFerias())
                return new Result(Result::FAILURE_CREDENTIAL_INVALID, null, array("atencao","<strong>ATENÇÃO:</strong><br />Olá {$nomeUsuario} seu a acesso foi suspenso temporariamente.<br /> Não queremos que você se preocupe, curta suas férias que nos cuidaremos de tudo por aqui ate você voltar.</a>"));

            return new Result(Result::SUCCESS, array('Funcionario' => $usuario), array('Sucesso',null));
        }

        return new Result(Result::FAILURE_CREDENTIAL_INVALID, null, array("error",$this->mensagem));
    }
}
