<?php

/**
 * Repository de Produtos
 * @author Jefferson Fernandes
 * @date 21/11/2014
 * @time 14:44:17
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Repository;
use Doctrine\ORM\EntityRepository,
	Doctrine\Entity;
use Senna\Entity\Itensvenda;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Query\Expr\Join;

class ProdutosRepository extends EntityRepository {

	/**
	 * Cria um array contendo itens em estoque
	 * @return array
	 */
	public function toList(array $where = null ) {
	
		$query =  $this->_em->createQueryBuilder();
		
		$query->select('itensEstoque');
		$query->from('Senna\Entity\Itensvendaestoque', 'itensEstoque')
		->Join('Senna\Entity\Itensvenda','itens',
				Join::WITH ,'itens.id = itensEstoque.itensvenda')
				->Join('Senna\Entity\Estoques','estoque',
						Join::WITH ,'estoque.id = itensEstoque.estoques')
						->Join('Senna\Entity\Empresa','empresa',
								Join::WITH ,'empresa.id = itensEstoque.empresa');
		
		$query->andWhere('itensEstoque.empresa = 1');
	
		$query->andWhere('itens.idgrade =:idgrade OR itens.idgrade IS NULL');
		$query->setParameter('idgrade'  ,"" );
		
		if(isset($where['ativo'])){
			if($where['ativo'])
				$query->andWhere('itens.ativo = 1 ');
			else
				$query->andWhere('itens.ativo = 0 ');
		}
		
		if(isset($where['busca'])){
				$query->andWhere($query->expr()->like('itens.descricao', $query->expr()->literal('%'.$where['busca'].'%')));
		}

		if(isset($where['vinculacao'])){
			if(isset($where['vinculacao'][0]) && isset($where['vinculacao'][1])){
				$query->andWhere('itens.tipoitemvenda = :tipoItem1 OR itens.tipoitemvenda = :tipoItem2');
				$query->setParameter(':tipoItem1'  ,"N" );
				$query->setParameter(':tipoItem2'  ,"G" );
			}
			elseif($where['vinculacao'][0] == "N"){
				$query->andWhere('itens.tipoitemvenda = :tipoItem ');
				$query->setParameter(':tipoItem'  ,"N" );
			}
			elseif ($where['vinculacao'][0] == "G"){
				$query->andWhere('itens.tipoitemvenda = :tipoItem ');
				$query->setParameter(':tipoItem'  ,"G" );
			}
		}
		
		if(isset($where['data_periodo'])){
			if($where['data_considerada'] == "1")
				{
				if($where['data_periodo'] == '0' && isset($where['data_inicial']))
					{
					$query->andWhere('itens.datahoracadastro BETWEEN :datainicial AND :datafinal');
					$query->setParameter('datainicial', implode("-",array_reverse(explode("/",$where['data_inicial']))) );
					$query->setParameter('datafinal'  , implode("-",array_reverse(explode("/",$where['data_final']))));
					}
				elseif($where['data_periodo'] == '1')
					$query->andWhere('MONTH(itens.datahoracadastro) = MONTH(CURRENT_DATE())');
				elseif ($where['data_periodo'] == '2')
					$query->andWhere('WEEK(itens.datahoracadastro) = WEEK(CURRENT_DATE())');
				}
			else 	
				{
				if($where['data_periodo'] == '0')
					{
					$query->andWhere('itens.datahoraalteracao BETWEEN :datainicial AND :datafinal');
					$query->setParameter('datainicial', implode("-",array_reverse(explode("/",$where['data_inicial']))) );
					$query->setParameter('datafinal'  , implode("-",array_reverse(explode("/",$where['data_final']))));
					}	
				if($where['data_periodo'] == '1')
					$query->andWhere('MONTH(itens.datahoraalteracao) = MONTH(CURRENT_DATE())');
				elseif ($where['data_periodo'] == '2')
					$query->andWhere('WEEK(itens.datahoraalteracao) = WEEK(CURRENT_DATE())');
				}			
		}

		//print_r($query->getQuery()->getDql());exit;
		
		$entities = $query->getQuery()->getResult();

		$item = array ();
		foreach ( $entities as $key => $entity ) :

			$item[$key]['id'] = $entity->getItemVenda()->getId();
			$item[$key]['cod_barra'] = $entity->getItemVenda()->getCodigoBarras();
			$item[$key]['cod_secundario'] = $entity->getItemVenda()->getCodigoLancamento();
			$item[$key]['informacao_adicional'] = $entity->getItemVenda()->getObservacao();
			
			if($entity->getItemVenda()->getAtivo() == "1")
				$item[$key]['ativo'] ="<i class='icon-ok' title='Sim'>";
			else 
				$item[$key]['ativo'] ="";
			
			$item[$key]['descricao_produto'] = $entity->getItemVenda()->getDescricao();
			$item[$key]['estoque_disponivel'] = "".number_format($entity->getQuantidade(), 3, ',','.')."";
			$item[$key]['estoque_uso_consumo'] = "0.000";
			$item[$key]['estoque_imobilizado'] = "0.000";
			$item[$key]['valor_varejo'] =  number_format($entity->getItemVenda()->getValorVenda(), 2, ',','.');
			$item[$key]['produto_ativo'] = $entity->getItemVenda()->getAtivo();
			$item[$key]['vinculado_grade'] = "0";
			$item[$key]['vinculado'] = "0";
			$item[$key]['possui_estoque'] = ($entity->getQuantidade() > 0)?"1":"0";
			$item[$key]['sincronizado'] = "0";
			$item[$key]['data_sincronizacao_ecommerce'] = "0";
			if($entity->getItemVenda()->getIdSubClassesProdutos()->getId() > 1000)
			{
				$item[$key]['classe_item'] = $entity->getItemVenda()->getIdSubClassesProdutos()->__toString();
			}
			else 
			{
				$item[$key]['classe_item'] = $entity->getItemVenda()->getIdClassesProdutos()->__toString();
			}
			
			$item[$key]['unidade'] = $entity->getItemVenda()->getUnidadeVenda();
			$item[$key]['valor_estoque'] = number_format($entity->getItemVenda()->getPrecoMedioCompra()*$entity->getQuantidade(), 2, ',','.');
						
			if($entity->getItemVenda()->getAtivo() == "1")
				$item[$key]['_rowclass'] = "";
			else
				$item[$key]['_rowclass'] ="inactive";
		endforeach;

		$r_json = $item;
		return $r_json;
	}
	

	public function validePost($post)
		{
		return true;
		}
		
	public function getProdutoscadastrados($id){
		
		$query =  $this->_em->createQueryBuilder();
		$query->select('itensvenda');
		$query->from('Senna\Entity\itensvenda', 'itensvenda');
		$query->andWhere('itensvenda.ativo = 1');
		$query->andWhere('itensvenda.id !=:id');
		$query->setParameter('id'  ,$id );
		
		$query->andWhere('itensvenda.tipoitemvenda=:tipo OR  itensvenda.idgrade !=:idgrade AND itensvenda.idgrade IS NOT NULL');
		$query->setParameter('idgrade'  ,"" );
		$query->setParameter('tipo'  ,"N" );
		
// 		/print_r($query->getQuery()->getDql());exit;
		
		$entities = $query->getQuery()->getResult();
		$item = array ();
		foreach ( $entities as $key => $entity ) :

				$item[$key]["id"]=$entity->getId();
				$item[$key]["id_categoria"]=$entity->getIdClassesProdutos()->getId();
				$item[$key]["id_moeda"]="1";
				//$item[$key]["id_unidade_entrada"]=,
				//$item[$key]["id_unidade_inventario"]=,
				//$item[$key]["id_unidade_saida"]=,
				//$item[$key]["id_unidade_tributavel"]=,
				//$item[$key]["id_produto_principal_grade"]=,
				$item[$key]["altura"]=$entity->getAltura();
				$item[$key]["ativo"]=$entity->getAtivo();
				//$item[$key]["arredondamento"]="",
				//$item[$key]["cfop"]=,
				//$item[$key]["cnpj_produtor"]=,
				$item[$key]["cod_barra"]=$entity->getCodigoBarras();
				$item[$key]["cod_grade"]=$entity->getIdGrade();
				$item[$key]["cod_secundario"]=$entity->getCodigoLancamento();
				//$item[$key]["cod_cst_a"]=,
				//$item[$key]["cod_ncm"]=,
				$item[$key]["comercializavel"]=$entity->getVendidoSeparado();
				$item[$key]["comissao"]=$entity->getComissao();
				//$item[$key]["comissao_calc_vv"]=,
				$item[$key]["comprimento"]=$entity->getComprimento();
				//$item[$key]["conta_contabil"]=,
				//$item[$key]["custo_outras_despesas"]=,
				//$item[$key]["custo_utilizado"]=,
				//$item[$key]["data_criacao"]=,
				//$item[$key]["data_alteracao"]=,
				$item[$key]["descricao_produto"]=$entity->getDescricao();
				//$item[$key]["descricao_resumida"]=,
				//$item[$key]["ex_tipi"]=,
				//$item[$key]["foto_principal"]=,
				$item[$key]["informacao_adicional"]=$entity->getObservacao();
				//$item[$key]["inventario"]=,
				$item[$key]["largura"]=$entity->getLargura();
				//$item[$key]["opcoes_loja_virtual"]=,
				$item[$key]["peso"]=$entity->getPeso();
				$item[$key]["pontos"]=$entity->getPontos();
				//$item[$key]["produto_composto"]=,
				//$item[$key]["ref_ipi"]=,
				//$item[$key]["ref_icms"]=,
				//$item[$key]["ref_cofins"]=,
				//$item[$key]["ref_comissao"]=,
				//$item[$key]["ref_cpp"]=,
				//$item[$key]["ref_csll"]=,
				//$item[$key]["ref_pis"]=,
				//$item[$key]["ref_irpj"]=,
				$item[$key]["serie"]=$entity->getGarantia();
				//$item[$key]["tipo_mercadoria"]=,
				//$item[$key]["tipo_producao"]=,
				$item[$key]["tx_conversao_e_s"]=$entity->getFatorConversao();
				//$item[$key]["tx_conversao_e_i"]=,
				//$item[$key]["tx_conversao_s_i"]=,
				//$item[$key]["tx_conversao_trib"]=,
				$item[$key]["vendido_separado"]=$entity->getVendidoSeparado();
				//$item[$key]["vinculacao"]=,
				$item[$key]["vr_venda"]=$entity->getValorVenda();
				$item[$key]["id_produto"]=$entity->getId();
				//$item[$key]["relevancia"]=,
				$item[$key]["cod"]=$entity->getCodigoBarras();
				$item[$key]["value"]=$entity->getDescricao();
				$item[$key]["estoque_revenda"]="0.000";
				$item[$key]["estoque_imobilizado"]="0.000";
				$item[$key]["estoque_uso_consumo"]="0.000";
				$item[$key]["info"]="[Cod_barra]:".$entity->getCodigoBarras()." [Cod_int]:".$entity->getCodigoLancamento() ." [ESTOQ_REV]:0.000";
				$item[$key]["fracionado"]="1";
				$item[$key]["fracionado_entrada"]="1";
				$item[$key]["desc_unidade_saida"]=$entity->getUnidadeVenda();
				$item[$key]["desc_unidade_entrada"]=$entity->getUnidadeCompra();
				$item[$key]["sigla_unidade_saida"]=$entity->getUnidadeVenda();
				$item[$key]["sigla_unidade_entrada"]=$entity->getUnidadeCompra();
				$item[$key]["unidade_saida"]=$entity->getUnidadeVenda();
		
		
		endforeach;
		//echo "<br>";
		//print_r($array);
		//echo "</br>";
		$r_json = $item;
		return $r_json;
		
		
		
	}
}