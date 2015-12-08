<?php
namespace Usuario\Repository;

use Doctrine\ORM\EntityRepository;
use Zend\Debug\Debug;
use Doctrine\ORM\Query\Expr\Join;

/**
 * Class FuncionariosRepository
 * @package Usuario\Repository
 */
class FuncionariosRepository extends EntityRepository
{

    /**
     * @param array $where
     * @return array
     */
    public function toList(array $where = null)
    {

        $usuarios = array();
        $query = $this->_em->createQueryBuilder();
        $query->select('funcionarios');
        $query->from('Usuario\Entity\Funcionarios', 'funcionarios');
        if (!empty($this->_em) && isset($where['busca'])):
            $query->andWhere($query->expr()->like('funcionarios.nome', $query->expr()->literal('%' . $where['busca'] . '%')));
        else:
            $query->where($query->expr()->not($query->expr()->eq('funcionarios.login', '?1')));
            $query->setParameter(1, "ADMIN");
        endif;
        //print_r($query->getQuery()->getDql());exit;
        $entities = $query->getQuery()->getResult();

        foreach ($entities as $key => $entity) :
            $usuarios  [$key] ['id'] = "" . $entity->getId() . "";
            $usuarios  [$key] ['ativo'] = "" . $entity->getAtivo() ? "1" : "0" . "";
            $usuarios  [$key] ['ativo_img'] = "" . $entity->getAtivo() ? "<i class='icon-ok' title='Sim'>" : "" . "";
            "";
            $usuarios  [$key] ['confirmado'] = "" . $entity->getConfirmado() ? "SIM" : "NÃO" . "";
            $usuarios  [$key] ['nome'] = "" . $entity->getNome() . "";
            $usuarios  [$key] ['login'] = "" . $entity->getLogin() . "";
            $usuarios  [$key] ['perfil'] = "" . $entity->getPerfil() . "";

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
        if ($usuario)
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
        if ($usuario)
            return $usuario;
        else
            return false;
    }

    /**
     * @param $loginFuncionario
     * @param $senhaDigitada
     * @return bool
     */
    public function findBySenha($loginFuncionario, $senhaDigitada)
    {
        // neste ponto o funcionario com certeza existe mas pego a referencia dele novamente
        $usuario = $this->findOneByLogin($loginFuncionario);
        if ($usuario) {

            $hashSenha = $usuario->encryptSenha($senhaDigitada);
            if ($hashSenha == $usuario->getSenha())
                return $usuario;
            else
                return false;
        } else
            return false;
    }

    /**
     * @param $horario
     * @return bool
     * Procura por horarios que o funcionario possa acessar o sistema
     * pode true
     * nao pode false
     */
    public function buscarHorariosDoFuncionario($horario, $isAdmin)
    {
        if (!$isAdmin):
            $dataAtual = new \DateTime('now');

            $diaAtual = date('w', strtotime($dataAtual->format('Y-m-d')));

            switch ($diaAtual):
                case "1":
                    if (!$horario['0']->toArray()['diasDaSemana1'])
                        return false;
                    break;
                case "2":
                    if (!$horario['0']->toArray()['diasDaSemana2'])
                        return false;
                    break;
                case "3":
                    if (!$horario['0']->toArray()['diasDaSemana3'])
                        return false;
                    break;
                case "4":
                    if (!$horario['0']->toArray()['diasDaSemana4'])
                        return false;
                    break;
                case "5":
                    if (!$horario['0']->toArray()['diasDaSemana5'])
                        return false;
                    break;
                case "6":
                    if (!$horario['0']->toArray()['diasDaSemana6'])
                        return false;
                    break;
                case "7":
                    if (!$horario['0']->toArray()['diasDaSemana7'])
                        return false;
                    break;
            endswitch;

            $entrada = strtotime($horario['0']->toArray()['horaEntrada']);
            $almoco = strtotime($horario['0']->toArray()['horaAlmocoEntrada']);
            $retornoAlmoco = strtotime($horario['0']->toArray()['horaAlmocoSaida']);
            $saida = strtotime($horario['0']->toArray()['horaSaida']);
            $horaAtual = strtotime($dataAtual->format('H:m'));

            if ($horaAtual > $entrada && $horaAtual < $almoco || $horaAtual > $retornoAlmoco && $horaAtual < $saida)
                return true;

            return false;
        endif;
        return true;
    }

    /**
     * @param null $id
     * @param $campo
     * @param $value
     * @return bool
     * Busca por existencia no banco de dados
     */
    public function findByNot($id = null, $campo, $value)
    {
        $query = $this->_em->createQueryBuilder();
        $query->select('funcionarios');
        $query->from('Usuario\Entity\Funcionarios', 'funcionarios');
        if ($id):
            $query->where($query->expr()->not($query->expr()->eq('funcionarios.id', '?1')));
            $query->setParameter(1, $id);
            $query->andWhere('funcionarios.' . $campo . '= ?2');
            $query->setParameter(2, $value);
        else:
            $query->where('funcionarios.' . $campo . '= ?1');
            $query->setParameter(1, $value);
        endif;
        //print_r($query->getQuery()->getDql());exit;
        return ($query->getQuery()->getResult()) ? true : false;
    }

    public function findVendedores(array $where)
    {
        $funcionario = array();


        $query = $this->_em->createQueryBuilder();
        $query->select('funcionario');
        $query->from('Usuario\Entity\Funcionarios', 'funcionario')
            ->Join('Acl\Entity\Perfis', 'perfis',
                Join::WITH, 'funcionario.perfil = perfis.id')
            ->Join('Acl\Entity\Privilegios', 'privilegio',
                Join::WITH, 'privilegio.perfil = perfis.id');
        $query->andWhere('privilegio.recurso = 10');

        if (isset($where['filter'])) {
            $query->andWhere($query->expr()->like('funcionario.nome', $query->expr()->literal('%' . $where['filter'] . '%')));
        }

        //Debug::dump($query->getQuery()->getDql());die;
        $entities = $query->getQuery()->getResult();


        foreach ($entities as $key => $entity) :

            $funcionario  [$key] ['id']          = "" . $entity->getId()    . "";
            $funcionario  [$key] ['value']       = "" . $entity->getNome()  . "";
            $funcionario  [$key] ['info']        = "" . $entity->getLogin() . " - ".$entity->getPerfil()->getNome();
            $funcionario  [$key] ['cpfcnpj']     = "" . $entity->getCpf()   . "";
            $funcionario  [$key] ['id_entidade'] = "" . $entity->getId()    . "";

        endforeach;

        return $funcionario;
    }
}
