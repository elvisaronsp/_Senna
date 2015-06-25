<?php

/**
 * Service itens de venda
 * @author Jefferson Fernandes
 * @date 20/01/2015
 * @time 14:16:00
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Service;

use Doctrine\ORM\EntityManager,
	Senna\Entity\Configurator,
	Senna\Entity\Reconfigurator;

class Produtos extends AbstractService {
	
	/**
	 *
	 * @var EntityManager
	 */
	private $em;
	public function __construct(EntityManager $em) {
		parent::__construct ( $em );
		$this->entity = "Senna\Entity\Itensvenda";
		$this->entityEstoques = "Senna\Entity\Itensvendaestoque";
		$this->entityAtributos = "Senna\Entity\Itensvendaatributos";
		$this->entityComposicao = "Senna\Entity\Itensvendacomposicao";
		$this->em = $em;
	}
	
	/**
	 * Converte moeda em floar para insersao no banco de dados
	 * @param string $valor
	 * @return flaot
	 */
	private function converteMoedaFloat($valor){
		return str_replace ( ",", ".", str_replace ( ".", " ", $valor ) );
	}
	
	/**
	 * Metodo de insersao de novos itens de venda
	 *
	 * @param array $data        	
	 */
	public function insert(array $data) {
		
		// Busca referencia da classe de itens vinculada pelo usuario ao item
		if ($data ['produto__id_categoria'] != '0') {
			
			if($data ['produto__id_categoria'] > 1000)
				{
				$Subclasse = $this->em->getReference ( 'Senna\Entity\Subclassesprodutos', $data ['produto__id_categoria'] );
				$data ['produto__id_subcategoria'] = $Subclasse;

				$classe = $this->em->getReference ( 'Senna\Entity\classesprodutos', $Subclasse->getIdProdutoCategoria()->getId() );
				$data ['produto__id_categoria'] = $classe;
				}
			else 
				{
				$Subclasse = $this->em->getReference ( 'Senna\Entity\Subclassesprodutos', '1000' );
				$data ['produto__id_subcategoria'] = $Subclasse;
				
				$classe = $this->em->getReference ( 'Senna\Entity\classesprodutos', $data ['produto__id_categoria'] );
				$data ['produto__id_categoria'] = $classe;
				}
		}
		
		// busca a sigla da unidade de entrada vinculada pelo usuario ao item
		if ($data ['produto__id_unidade_entrada'] != '0') {
			$unidade = $this->em->getReference ( 'Senna\Entity\Unidadesmedida', $data ['produto__id_unidade_entrada'] );
			$data ['produto__id_unidade_entrada'] = $unidade->getSigla ();
			$data ['produto__nome_unidade_entrada'] = $unidade->getDescricao ();
		}
		
		// busca a sigla da unidade de saida vinculada pelo usuario ao item
		if ($data ['produto__id_unidade_saida'] != '0') {
			$unidade = $this->em->getReference ( 'Senna\Entity\Unidadesmedida', $data ['produto__id_unidade_saida'] );
			$data ['produto__id_unidade_saida'] = $unidade->getSigla ();
			$data ['produto__nome_unidade_saida'] = $unidade->getDescricao ();
		}
		
		$estoque = $this->em->getReference ( 'Senna\Entity\Estoques', '1' );
		$empresa = $this->em->getReference ( 'Senna\Entity\Empresa', "1" );
		
		$data ['valor_venda_varejo_aux'] = $this->converteMoedaFloat( $data ['valor_venda_varejo_aux']) ;
		$data ['produto__tx_conversao_e_s'] = $this->converteMoedaFloat( $data ['produto__tx_conversao_e_s']) ;
		$data ['produto__peso'] = $this->converteMoedaFloat( $data ['produto__peso']) ;
		$data ['produto__largura'] = $this->converteMoedaFloat( $data ['produto__largura']) ;
		$data ['produto__comprimento'] = $this->converteMoedaFloat( $data ['produto__comprimento']) ;
		$data ['produto__altura'] = $this->converteMoedaFloat( $data ['produto__altura']) ;
		$data ['produto__comissao'] = $this->converteMoedaFloat( $data ['produto__comissao']) ;
		$data ['produto__pontos'] = $this->converteMoedaFloat( $data ['produto__pontos']) ;
		
		$entity = new $this->entity ( $data );
		$entidadePrincipal = $entity;
		$this->em->persist ( $entity );
		$this->em->flush ();
		
		// estoque para a entidade principal da grade
		$produto = $this->em->getReference ( 'Senna\Entity\Itensvenda', $entity->getId () );
		$entityEstoques = new $this->entityEstoques ( array (
				"item_venda" => $produto,
				"estoque" => $estoque,
				"estoque_maximo" => $this->converteMoedaFloat( $data ['produto_estoque__max']) ,
				"estoque_minimo" => $this->converteMoedaFloat( $data ['produto_estoque__min']) ,
				"empresa" => $empresa 
		) );
		$this->em->persist ( $entityEstoques );
		
		// Insere atributos de um item
		if (count ( $data ['produto_atributo__nome_atributo'] ) == count ( $data ['produto_atributo__valor_atributo'] )) {
			// metodo
			
			$atributos = array();
			foreach ( $data ['produto_atributo__nome_atributo']  as $key => $value ) :
				$atributos[$key]['nome'] =$value;
				$atributos[$key]['valor'] = $data ['produto_atributo__valor_atributo'][$key];
			
			endforeach;
			foreach ( $atributos as$value ) :
				if ($key != "" && $value != "") {
					$entityAtributos = new $this->entityAtributos ( array (
							"itens_venda_id" => $produto,
							"nomeAtributo" => $value['nome'],
							"valorAtributo" => $value['valor'] 
					) );
					$this->em->persist ( $entityAtributos );
				}
			endforeach;
		}
		
		// Insere composicao dos itens
		$composicao = $data ['produto_vinculado__qtd_vinculada'];
		foreach ( $composicao as $key => $value ) : 
		if ($value != "") {
			
			$produtoComposicao = $this->em->getReference ('Senna\Entity\Itensvenda',$data['produto_vinculado__id_produto_item_vinculado'][$key]);
			 		
			$entityComposicao = new $this->entityComposicao ( array (
					"itens_venda_id" => $produto,
					"quantidade" => $value,
					"itensvenda_id_children" => $produtoComposicao
			) );
			$this->em->persist ( $entityComposicao );
		}
		endforeach;

		// # GRADE
		$descricao = $data ['produto__descricao_produto'];
		if (isset ( $data ['produto_grade__descricao_produto'] ) > 0) {
			foreach ( $data ['produto_grade__cod_grade'] as $key => $value ) :
				unset ( $data ['produto__descricao_produto'] );
				$data ['produto__descricao_produto'] = $descricao . " - " . $data ['produto_grade__descricao_produto'] [$key];
				
				unset ( $data ['produto__cod_secundario'] );
				$data ['produto__cod_secundario'] = $data ['produto_grade__cod_secundario'] [$key];
				$data ['produto__cod_secundario'] = $data ['produto_grade__cod_secundario'] [$key];
				$data ['produto_codigo_grade'] = $data ['produto_grade__cod_grade'] [$key];
			
				//$entidadePrincipalRef = $this->em->getReference ( 'Senna\Entity\Itensvenda', $entidadePrincipal->getId() );
				$data ['itemVendaGrade_id'] = $entidadePrincipal;
			
				$entity = new $this->entity ( $data );
				$this->em->persist ( $entity );
				$this->em->flush ();
				
				// estoque para grades
				$produto = $this->em->getReference ( 'Senna\Entity\Itensvenda', $entity->getId () );
				$entityEstoques = new $this->entityEstoques ( array (
						"item_venda" => $produto,
						"estoque" => $estoque,
						"estoque_maximo" => $data ['produto_estoque__max'],
						"estoque_minimo" => $data ['produto_estoque__min'],
						"quantidade"	 => $data['produto_grade__quantidade'][$key],	
						"empresa" => $empresa 
				) );
				$this->em->persist ( $entityEstoques );
			endforeach;
		}
		
		$this->em->flush ();
		
		return $entidadePrincipal;
	}
	
	/**
	 * Metodo de atualizacao de um item de venda
	 * @param array $data
	 */
	public function update(array $data){
		
		// Busca referencia da classe de itens vinculada pelo usuario ao item
		if ($data ['produto__id_categoria'] != '0') {
			
			if($data ['produto__id_categoria'] > 1000)
				{
				$Subclasse = $this->em->getReference ( 'Senna\Entity\Subclassesprodutos', $data ['produto__id_categoria'] );
				$data ['produto__id_subcategoria'] = $Subclasse;

				$classe = $this->em->getReference ( 'Senna\Entity\classesprodutos', $Subclasse->getIdProdutoCategoria()->getId() );
				$data ['produto__id_categoria'] = $classe;
				}
			else 
				{
				$Subclasse = $this->em->getReference ( 'Senna\Entity\Subclassesprodutos', '1000' );
				$data ['produto__id_subcategoria'] = $Subclasse;
				
				$classe = $this->em->getReference ( 'Senna\Entity\classesprodutos', $data ['produto__id_categoria'] );
				$data ['produto__id_categoria'] = $classe;
				}
		}
		
		// busca a sigla da unidade de entrada vinculada pelo usuario ao item
		if ($data ['produto__id_unidade_entrada'] != '0') {
			
			$query =  $this->em->createQueryBuilder();
			$query->select('unidade');
			$query->from('Senna\Entity\Unidadesmedida', 'unidade');
			$query->andWhere('unidade.sigla =:sigla');
			$query->setParameter('sigla', $data ['produto__id_unidade_entrada']);
			//print_r($query->getQuery()->getDql());exit;
			
			$unidades = $query->getQuery()->getResult();
			
			foreach ( $unidades as $key => $un ):
				$data ['produto__id_unidade_entrada'] = $un->getId();
			endforeach;

			$unidade = $this->em->getReference ( 'Senna\Entity\Unidadesmedida', $data ['produto__id_unidade_entrada'] );
			$data ['produto__id_unidade_entrada'] = $unidade->getSigla ();
			$data ['produto__nome_unidade_entrada'] = $unidade->getDescricao ();
		}
		
		// busca a sigla da unidade de saida vinculada pelo usuario ao item
		if ($data ['produto__id_unidade_saida'] != '0') {
			
			$query =  $this->em->createQueryBuilder();
			$query->select('unidade');
			$query->from('Senna\Entity\Unidadesmedida', 'unidade');
			$query->andWhere('unidade.sigla =:sigla');
			$query->setParameter('sigla', $data ['produto__id_unidade_saida']);
			//print_r($query->getQuery()->getDql());exit;
				
			$unidades = $query->getQuery()->getResult();
				
			foreach ( $unidades as $key => $un ):
				$data ['produto__id_unidade_saida'] = $un->getId();
			endforeach;
			
			$unidade = $this->em->getReference ( 'Senna\Entity\Unidadesmedida', $data ['produto__id_unidade_saida'] );
			$data ['produto__id_unidade_saida'] = $unidade->getSigla ();
			$data ['produto__nome_unidade_saida'] = $unidade->getDescricao ();
		}
		
		$estoque = $this->em->getReference ( 'Senna\Entity\Estoques', '1' );
		$empresa = $this->em->getReference ( 'Senna\Entity\Empresa', "1" );
		
		$data ['valor_venda_varejo_aux'] = $this->converteMoedaFloat( $data ['valor_venda_varejo_aux']) ;
		$data ['produto__tx_conversao_e_s'] = $this->converteMoedaFloat( $data ['produto__tx_conversao_e_s']) ;
		$data ['produto__peso'] = $this->converteMoedaFloat( $data ['produto__peso']) ;
		$data ['produto__largura'] = $this->converteMoedaFloat( $data ['produto__largura']) ;
		$data ['produto__comprimento'] = $this->converteMoedaFloat( $data ['produto__comprimento']) ;
		$data ['produto__altura'] = $this->converteMoedaFloat( $data ['produto__altura']) ;
		$data ['produto__comissao'] = $this->converteMoedaFloat( $data ['produto__comissao']) ;
		$data ['produto__pontos'] = $this->converteMoedaFloat( $data ['produto__pontos']) ;
		
		$entity = $this->em->getReference($this->entity, $data['produto__id']);
		$entidadePrincipal = $entity;
		$options = Reconfigurator::reconfigure($entity,$data);
		$entity = Configurator::configure($entity, $options);
		$this->em->persist($entity);
		$this->em->flush();
	
		// Estoque para a entidade principal da grade
		$produto = $this->em->getReference ( 'Senna\Entity\Itensvenda', $entity->getId () );
		
		$query =  $this->em->createQueryBuilder();
		$query->select('estoque');
		$query->from('Senna\Entity\Itensvendaestoque', 'estoque');
		$query->andWhere('estoque.itensvenda =:item');
		$query->setParameter('item', $entity->getId ());
		//print_r($query->getQuery()->getDql());exit;
			
		$entityEstoques = $query->getQuery()->getResult();
		
		foreach ( $entityEstoques as $key => $itemEstoque ):
			$estoqueItem = $this->em->getReference ( 'Senna\Entity\Itensvendaestoque',  $itemEstoque->getId()); 
		endforeach;
		
		$options = array (
				"item_venda" => $produto,
				"estoque" => $estoque,
				"estoque_maximo" => $this->converteMoedaFloat( $data['produto_estoque__max']) ,
				"estoque_minimo" => $this->converteMoedaFloat( $data['produto_estoque__min']) ,
				"empresa" => $empresa
		);
		$entityEstoques = Configurator::configure($estoqueItem, $options);
		$this->em->persist ( $entityEstoques );
		
		// Insere atributos de um item
		if (count ( $data ['produto_atributo__nome_atributo'] ) == count ( $data ['produto_atributo__valor_atributo'] )) {
			
			$query =  $this->em->createQueryBuilder();
			$query->select('atributos');
			$query->from('Senna\Entity\Itensvendaatributos', 'atributos');
			$query->andWhere('atributos.itensvendaId =:item');
			$query->setParameter('item', $entity->getId ());
			//print_r($query->getQuery()->getDql());exit;
				
			$atribArray = $query->getQuery()->getResult();
			
			foreach ( $atribArray as $key => $attrib ):
				$atributo = $this->em->getReference('Senna\Entity\Itensvendaatributos', $attrib->getId());
				if($atributo )
					$this->em->remove($atributo);
					$this->em->flush();
			endforeach;
	
			$atributos = array_combine ( $data ['produto_atributo__nome_atributo'], $data ['produto_atributo__valor_atributo'] );

			$arrayAtributo = array();
			foreach ($data ['produto_atributo__nome_atributo'] as $key => $value ) :
				$arrayAtributo[$key][]= $data ['produto_atributo__nome_atributo'][$key];
				$arrayAtributo[$key][]= $data ['produto_atributo__valor_atributo'][$key];
			endforeach;
		
			foreach ( $arrayAtributo as $key => $value ) :
				if ( $value['0'] != "" &&  $value['1'] != "") {
					$entityAtributos = new $this->entityAtributos ( array (
							"itens_venda_id" => $produto,
							"nomeAtributo" => $value['0'],
							"valorAtributo" => $value['1']
					) );
					$this->em->persist ( $entityAtributos );
				}
			endforeach;
		}
		
		// Insere composicao dos itens
		$composicao = $data ['produto_vinculado__qtd_vinculada'];
		foreach ( $composicao as $key => $value ) :
		if ($value != "") {
			
			$query =  $this->em->createQueryBuilder();
			$query->select('vinculos');
			$query->from('Senna\Entity\Itensvendacomposicao', 'vinculos');
			$query->andWhere('vinculos.itensvendaId =:item');
			$query->setParameter('item', $entity->getId ());
			//print_r($query->getQuery()->getDql());exit;
			
			$vinculosArray = $query->getQuery()->getResult();
				
			foreach ( $vinculosArray as $key => $vinculo ):
				$itemVinculado = $this->em->getReference('Senna\Entity\Itensvendacomposicao', $vinculo->getId());
				if($itemVinculado )
					$this->em->remove($itemVinculado);
					$this->em->flush();
			endforeach;
			
				
			$produtoComposicao = $this->em->getReference ('Senna\Entity\Itensvenda',$data['produto_vinculado__id_produto_item_vinculado'][$key]);
		
			$entityComposicao = new $this->entityComposicao ( array (
					"itens_venda_id" => $produto,
					"quantidade" => $value,
					"itensvenda_id_children" => $produtoComposicao
			) );
			$this->em->persist ( $entityComposicao );
		}
		endforeach;

		// # GRADE
		$descricao = $data ['produto__descricao_produto'];
		if (isset( $data ['produto_grade__descricao_produto'] ) ) {
			
			
			$array= array();
			foreach ( $produto->getChildrens() as $filhos ):
					$array[]= $filhos->getIdGrade();
					$filho = $this->em->getReference ( 'Senna\Entity\Itensvenda', $filhos->getId());
					
					unset ( $data ['produto__descricao_produto'] );
					
					$chave = array_search($filhos->getIdGrade(),$data ['produto_grade__cod_grade']);
					$data ['produto__descricao_produto'] = $descricao . " - " . $data ['produto_grade__descricao_produto'] [$chave];
						
					unset ( $data ['produto__cod_secundario'] );
					$data ['produto__cod_secundario'] = $data ['produto_grade__cod_secundario'] [$chave];
					$data ['produto__cod_secundario'] = $data ['produto_grade__cod_secundario'] [$chave];
					$data ['produto_codigo_grade'] = $data ['produto_grade__cod_grade'] [$chave];
						
					//$entidadePrincipalRef = $this->em->getReference ( 'Senna\Entity\Itensvenda', $entidadePrincipal->getId() );
					$data ['itemVendaGrade_id'] = $entidadePrincipal;
					// adiciono aqui este parametro pos ele esta hidden no form e o serialize nao pega e o banco seta N como default
					$data['produto__vinculacao'] = "G";
					
					$options = Reconfigurator::reconfigure($entity,$data);
					$entityFilho = Configurator::configure($filho, $options);
					$this->em->persist ( $entityFilho );
					
					////////
					$query =  $this->em->createQueryBuilder();
					$query->select('estoque');
					$query->from('Senna\Entity\Itensvendaestoque', 'estoque');
					$query->andWhere('estoque.itensvenda =:item');
					$query->setParameter('item', $filho->getId ());
					//print_r($query->getQuery()->getDql());exit;
					
					$filhosEstoque = $query->getQuery()->getResult();
						
					foreach ( $filhosEstoque as $key => $filhosARenover ):
					$filhoARenover = $this->em->getReference('Senna\Entity\Itensvendaestoque', $filhosARenover->getId());
					if($filhoARenover )
						$this->em->remove($filhoARenover);
						$this->em->flush();
					endforeach;							
					///////					
						
					$produto = $this->em->getReference ( 'Senna\Entity\Itensvenda', $filho->getId () );
					$entityEstoques = new $this->entityEstoques ( array (
							"item_venda" => $produto,
							"estoque" => $estoque,
							"estoque_maximo" => $data ['produto_estoque__max'],
							"estoque_minimo" => $data ['produto_estoque__min'],
							"quantidade"	 => $data['produto_grade__quantidade'][$chave],
							"empresa" => $empresa
					) );
					$this->em->persist ( $entityEstoques );
					
			endforeach;
			
			foreach ( $data ['produto_grade__cod_grade'] as $key => $value ) :
				if (!in_array($value, $array))
					{
				
					unset ( $data ['produto__descricao_produto'] );
					$data ['produto__descricao_produto'] = $descricao . " - " . $data ['produto_grade__descricao_produto'] [$key];
						
					unset ( $data ['produto__cod_secundario'] );
					$data ['produto__cod_secundario'] = $data ['produto_grade__cod_secundario'] [$key];
					$data ['produto__cod_secundario'] = $data ['produto_grade__cod_secundario'] [$key];
					$data ['produto_codigo_grade'] = $data ['produto_grade__cod_grade'] [$key];
						
					//$entidadePrincipalRef = $this->em->getReference ( 'Senna\Entity\Itensvenda', $entidadePrincipal->getId() );
					$data ['itemVendaGrade_id'] = $entidadePrincipal;
					// adiciono aqui este parametro pos ele esta hidden no form e o serialize nao pega e o banco seta N como default
					$data['produto__vinculacao'] = "G";
						
					$novaEntityFilho = new $this->entity ( $data );
					$this->em->persist ( $novaEntityFilho );
					$this->em->flush();
					
					$produtoNovo = $this->em->getReference ( 'Senna\Entity\Itensvenda', $novaEntityFilho->getId () );
					$entityNovoEstoques = new $this->entityEstoques ( array (
							"item_venda" => $produtoNovo,
							"estoque" => $estoque,
							"estoque_maximo" => $data ['produto_estoque__max'],
							"estoque_minimo" => $data ['produto_estoque__min'],
							"quantidade"	 => $data['produto_grade__quantidade'][$key],
							"empresa" => $empresa
					) );
					$this->em->persist ( $entityNovoEstoques );
					
					}

			endforeach;
		}
		$this->em->flush();
		return $entidadePrincipal;
	}
	
	
}