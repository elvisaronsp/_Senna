<?php
namespace Usuario\Repository;
use Doctrine\ORM\EntityRepository;

/**
 * Class FuncionariosRepository
 * @package Usuario\Repository
 */
class FuncionariosRepository extends EntityRepository {

    /**
     * @param array $where
     * @return array
     */
    public function toList(array $where=null) {

        $usuarios = array ();

        if (!empty($this->_em) && isset($where['busca'])):
            $query =  $this->_em->createQueryBuilder();
            $query->select('funcionarios');
            $query->from('Acl\Entity\Perfis', 'funcionarios');
            $query->andWhere($query->expr()->like('funcionarios.nome', $query->expr()->literal('%'.$where['busca'].'%')));
            //print_r($query->getQuery()->getDql());exit;
            $entities = $query->getQuery()->getResult();
        else:
            $entities = $this->findAll();
        endif;

        foreach ( $entities as $key => $entity ) :
            $usuarios  [$key] ['id'] = "" . $entity->getId() . "";
            $usuarios  [$key] ['ativo'] = "" . $entity->getAtivo()?"1":"0" . "";
            $usuarios  [$key] ['ativo_img'] = "" . $entity->getAtivo()?"<i class='icon-ok' title='Sim'>":"" . "";    "";
            $usuarios  [$key] ['confirmado'] = "" . $entity->getConfirmado()?"SIM":"NÃO" . "";
            $usuarios  [$key] ['nome'] = "" . $entity->getNome() . "";
            $usuarios  [$key] ['login'] = "" . $entity->getLogin() . "";
            $usuarios  [$key] ['perfil'] = "" . $entity->getPerfil(). "";

            switch ($entity->getSetor()):
                case "0":
                    $usuarios  [$key] ['setor'] = "ADMINISTRATIVO";
                    break;
                case "1":
                    $usuarios  [$key] ['setor'] = "FINANCEIRO";
                    break;
                case "2":
                    $usuarios  [$key] ['setor'] = "COMERCIAL";
                    break;
                case "3":
                    $usuarios  [$key] ['setor'] = "VENDAS";
                    break;
                case "4":
                    $usuarios  [$key] ['setor'] = "GERENCIA";
                    break;
                default:
                    $usuarios  [$key] ['setor'] = "PRODUÇÃO";
                    break;
            endswitch;

            $usuarios  [$key] ['email'] = "" . $entity->getEmail() . "";
            $usuarios  [$key] ['possui_vinculo'] = "0";
            $usuarios  [$key] ['possui_log'] = "0";
        endforeach;

        return $usuarios;
    }

    /**
     * @param $login
     * @return bool
     */
    public function findByFuncionario($login)
    {
        $usuario = $this->findOneByLogin($login);
        if($usuario)
            return $usuario;
        else
            return false;
    }


    /**
     * @param $email
     * @return bool
     */
    public function findByEmail($email)
    {
        $usuario = $this->findOneByEmail($email);
        if($usuario)
            return $usuario;
        else
            return false;
    }

    /**
     * @param $loginFuncionario
     * @param $senhaDigitada
     * @return bool
     */
    public function findBySenha($loginFuncionario,$senhaDigitada)
    {
        // neste ponto o funcionario com certeza existe mas pego a referencia dele novamente
        $usuario = $this->findOneByLogin($loginFuncionario);
        if($usuario)
        {

            $hashSenha = $usuario->encryptSenha($senhaDigitada);
            if($hashSenha == $usuario->getSenha())
                return $usuario;
            else
                return false;
        }
        else
            return false;
    }


    /**
     * @param $horario
     * @return bool
     * Procura por horarios que o funcionario possa acessar o sistema
     * pode true
     * nao pode false
     */
    public function findByHorarios($horario,$isAdmin)
    {
        if(!$isAdmin):
            $dataAtual = new \DateTime('now');
            $diaAtual = date('w', strtotime($dataAtual->format('Y-m-d')));
            switch ($diaAtual):
                case "1":
                    if(!$horario['0']->toArray()['diasDaSemana1'])
                        return false;
                    break;
                case "2":
                    if(!$horario['0']->toArray()['diasDaSemana2'])
                        return false;
                case "3":
                    if(!$horario['0']->toArray()['diasDaSemana3'])
                        return false;
                case "4":
                    if(!$horario['0']->toArray()['diasDaSemana4'])
                        return false;
                case "5":
                    if(!$horario['0']->toArray()['diasDaSemana5'])
                        return false;
                case "6":
                    if(!$horario['0']->toArray()['diasDaSemana6'])
                        return false;
                default:
                    if(!$horario['0']->toArray()['diasDaSemana7'])
                        return false;
            endswitch;

            $entrada        = strtotime($horario['0']->toArray()['horaEntrada']);
            $almoco         = strtotime($horario['0']->toArray()['horaAlmocoEntrada']);
            $retornoAlmoco  = strtotime($horario['0']->toArray()['horaAlmocoSaida']);
            $saida          = strtotime($horario['0']->toArray()['horaSaida']);
            $horaAtual      = strtotime($dataAtual->format('H:m'));

            if($horaAtual > $entrada && $horaAtual < $almoco || $horaAtual > $retornoAlmoco &&  $horaAtual < $saida )
                return true;

            return false;
        endif;
        return true;
    }
}
