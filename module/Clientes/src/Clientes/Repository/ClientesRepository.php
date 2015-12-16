<?php
namespace Clientes\Repository;

use Doctrine\Common\Util\Debug;
use Doctrine\ORM\EntityRepository;

/**
 * Class ClientesRepository
 * @package Clientes\Repository
 */
class ClientesRepository extends EntityRepository
{
    /**
     * @param array|null $where
     * @return mixed
     */
    public function toList(array $where = null)
    {
        $clientes = array();
        if (!empty($this->_em)):
            $query = $this->_em->createQueryBuilder();

            $query->select('clientes');
            $query->from('Clientes\Entity\Clientes', 'clientes');

            // busca a empresa do usuario que esta fazendo a busca
            $query->andWhere('clientes.empresa = :empresa');
            $query->setParameter(':empresa', $where['empresa']);

            // busca pelo o que o usuario digitou no campo buscar
            if (isset($where['busca'])):
                $query->andWhere($query->expr()->like('clientes.razaosocial', $query->expr()->literal('%' . $where['busca'] . '%')));
            endif;

            // busca pelo status do cliente
            if (isset($where['ativo'])):
                $query->andWhere('clientes.ativo = :status ');
                $query->setParameter('status', $where['ativo']);
            endif;

            // busca a origem do cliente
            if (isset($where['origem'])):
                $query->andWhere('clientes.origem = :origem ');
                $query->setParameter('origem', $where['origem']);
            endif;

            // busca pelo sexo do cliente
            if (isset($where['sexo'])):
                $query->andWhere('clientes.sexo = :sexo ');
                $query->setParameter('sexo', $where['sexo']);
            endif;

            // busca tipo de cliente juridica:fisica
            if (isset($where['tipo'])):
                $query->andWhere('clientes.tipo = :tipo ');
                $query->setParameter('tipo', $where['tipo']);
            endif;

            // busca por data cadastro:atualizacao
            if (isset($where['dataConsiderada'])):
                if ($where['dataConsiderada'] == "0"):// FILTRAR POR DATA DE CADASTRO

                    if (isset($where['dataInicial']) && isset($where['dataFinal'])):
                        $query->andWhere('clientes.criadoem BETWEEN :dataInicial AND :dataFinal');
                        $query->setParameter('dataInicial', implode("-", array_reverse(explode("/", $where['dataInicial']))));
                        $query->setParameter('dataFinal', implode("-", array_reverse(explode("/", $where['dataFinal']))));
                    endif;

                else:// FILTRAR POR DATA DE ATUALIZACAO

                    if (isset($where['dataInicial']) && isset($where['dataFinal'])):
                        $query->andWhere('clientes.atualizadoem BETWEEN :dataInicial AND :dataFinal');
                        $query->setParameter('dataInicial', implode("-", array_reverse(explode("/", $where['dataInicial']))));
                        $query->setParameter('dataFinal', implode("-", array_reverse(explode("/", $where['dataFinal']))));
                    endif;

                endif;
            endif;
            //print_r($query->getQuery()->getDql());exit;
            $entities = $query->getQuery()->getResult();

            foreach ($entities as $key => $entity) :

                $clientes  [$key] ['id']            = "" . $entity->getId() . "";
                $clientes  [$key] ['ativo']         = "" . $entity->getAtivo() ? "<i class='icon-ok' title='Sim'>" : "" . "";"";
                $clientes  [$key] ['razaoSocial']   = "" . $entity->getRazaoSocial() . "";
                $clientes  [$key] ['cpfCnpj']       = "" . !$entity->getTipo()  ? $entity->getCpf() : $entity->getCnpj() . "";
                $clientes  [$key] ['codigoCliente'] = "" . $entity->getCodigoCliente() . "";
                $clientes  [$key] ['email']         = "" . $entity->getEmail() . "";
                $clientes  [$key] ['telefone']      = "" . $entity->getTelefone() . "";
                $clientes  [$key] ['origem']        = "" . $entity->getOrigem() ? "NACIONAL" : "INTERNACIONAL" . "";
            endforeach;

            return $clientes;
        endif;
    }

    /**
     * @param null $id
     * @param $campo
     * @param $value
     * @return bool
     * Busca por existencia no banco de dados
     */
    public function findByNot($id = null,$campo, $value)
    {
        $query =  $this->_em->createQueryBuilder();
        $query->select('clientes');
        $query->from('Clientes\Entity\Clientes', 'clientes');
        if($id):
            $query->where($query->expr()->not($query->expr()->eq('clientes.id', '?1')));
            $query->setParameter(1, $id);
            $query->andWhere('clientes.'.$campo.'= ?2');
            $query->setParameter(2, $value);
        else:
            $query->where('clientes.'.$campo.'= ?1');
            $query->setParameter(1, $value);
        endif;
        //print_r($query->getQuery()->getDql());exit;
        return ($query->getQuery()->getResult())?true:false;
    }
}
