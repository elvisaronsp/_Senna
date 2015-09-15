<?php
/**
 * Form Produtos
 * @author Jefferson Fernandes
 * @date 27/11/2014
 * @time 09:02:40
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Produto\Form;
use Zend\Form\Form;
use Zend\Form\Element\Select;
use Zend\Form\Element\File;

class Produtos extends Form {
	
	/**
	 * @var array unidades de medida de uso
	 */
	protected $unidadesmedida;
	
	/**
	 * Constroi formulario de insercao e edicao de dados das unidades de medidas
	 * @param string $name
	 */
	public function __construct($name = null,array $unidadesmedida = null) {
		parent::__construct ( 'produtos' );
		$this->unidadesmedida = $unidadesmedida;
		$this->setAttributes ( array (
				'method' => 'post',
				'class' => 'form',
				'id' => 'form' 
		) );

		$this->add ( array (
				'name' => "Salvar",
				'attributes' => array (
						'type' => 'submit',
						'value' => 'Salvar',
						'saveWindowForm' => "true",
						'class' => 'save' 
				) 
		) );
		
		$this->add ( array (
				'name' => "Salvar e Criar Novo",
				'attributes' => array (
						'type' => 'submit',
						'value' => 'Salvar e Criar Novo',
						'newWindowForm' => "true",
						'class' => 'save_new' 
				) 
		) );

		$this->add ( array (
				'name' => "Salvar e Fechar",
				'attributes' => array (
						'type' => 'submit',
						'value' => 'Salvar e Fechar',
						'closeWindow' => "true",
						'class' => 'save_close' 
				) 
		) );

		$this->add ( array (
				'name' => "Apagar",
				'attributes' => array (
						'type' => 'button',
						'value' => 'Apagar',
						'confirm' => "Tem certeza que deseja apagar este registro?",
						'class' => 'delete',
						'deleteUrl' => '/senna/produto/produtos/delete/',
						'labelsConfirm' => "{'labelSim':'Sim','labelNao':'N&atilde;o'}",
						
				) 
		) );
		
		$this->add ( array (
				'name' => "acoes",
				'attributes' => array (
						'type' => 'button',
						'value' => 'Mais...',
						'class' => 'action_menu_trigger',
						
				)
		) );
							
		$this->add ( array (
				'name' => "clonar",
				'attributes' => array (
					'class'=>'clonar',
					'disabled'=>'disabled',
					'id'=>'clonar_btn',
					'type'=>'submit',
					'value'=>'Clonar Produto'
				)
		) );								

		$this->add ( array (
				'name' => "Apagar da Loja Virtual",
				'attributes' => array (
					'id'=>'apagar_em_loja_acoes',
					'style'=>'margin-left: 5px;',
					'type'=>'button"',
					'value'=>'Apagar da Loja Virtual'
				)
		) );
		
				
		$this->add ( array (
				'name' => "Fechar",
				'attributes' => array (
						'type' => 'button',
						'value' => 'Fechar',
						'cancelForm' => 'true',
						'class' => 'cancel'
				)
		) );

				
		$this->add ( array (
				'name' => "produto__id",
				'attributes' => array (
					'id'=>'produto__id',
					'type'=>'hidden',
					'value'=>''
				) 
		) );
		
		$this->add ( array (
				'name' => "produto__id_produto_principal_grade",
				'attributes' => array (
					'id'=>'produto__id_produto_principal_grade',
					'type'=>'hidden',
					'value'=>''
				) 
		) );
		
		$this->add ( array (
				'name' => "grade",
				'attributes' => array (
					'id'=>'grade',
					'type'=>'hidden',
					'value'=>''
				) 
		) );
		
		$this->add ( array (
				'name' => "valor_grade",
				'attributes' => array (
					'id'=>'valor_grade',
					'type'=>'hidden',
					'value'=>''
				) 
		) );
		
		$this->add ( array (
				'name' => "_clonar",
				'attributes' => array (
					'id'=>'clonar',
					'type'=>'hidden',
					'value'=>''
				) 
		) );
		
		$this->add ( array (
			'name' => "produto_ecommerce__data_sincronizacao",
			'attributes' => array (
				'id'=>'produto_ecommerce__data_sincronizacao',
				'type'=>'hidden',
				'value'=>''
				) 
		) );
		
		$this->add ( array (
			'name' => "produto_ecommerce__id",
				'attributes' => array (
				'id'=>'produto_ecommerce__id',
				'type'=>'hidden',
				'value'=>''
				) 
		) );

		$this->add ( array (
				'name' => "existe_venda",
				'attributes' => array (
						'id'=>'existe_venda',
						'type'=>'hidden',
						'value'=>''
				)
		) );
		
		$this->add ( array (
				'name' => "produto_fracionado",
				'attributes' => array (
						'id'=>'produto_fracionado',
						'type'=>'hidden',
						'value'=>''
				)
		) );
		
		$this->add ( array (
				'name' => "produto__produto_composto",
				'attributes' => array (
						'id'=>'produto__produto_composto',
						'type'=>'hidden',
						'value'=>''
				)
		) );
		
		$this->add ( array (
				'name' => "produto__descricao_produto",
				'attributes' => array (
						'type' => 'text',
						'value' => '',
						'maxlength' => "255",
						'minlength'=>'3',
						'class' => 'focus required desc_principal',
						'style' => "text-transform: uppercase",
						'id' =>'produto__descricao_produto'
				) 
		) );
		
		$this->add ( array (
				'name' => "produto__descricao_resumida",
				'attributes' => array (
						'type' => 'text',
						'value' => '',
						'maxlength' => "255",
						'minlength'=>'3',
						'class' => 'focus required desc_principal',
						'style' => "text-transform: uppercase",
						'id' =>'produto__descricao_resumida'
				)
		) );
		
		$this->add ( array (
				'name' => "produto__id_categoria",
				'attributes' => array (
						'id'=>'produto__id_categoria',
						'type'=>'hidden',
						'value'=>''
				)
		) );
		
		$this->add ( array (
				'name'=>'ac_049414089535f7737919726a321016f5bde0ec5752',
				'attributes' => array (
					'autosuggest'=>'produto__id_categoria',
					'class'=>' required autosuggest',
					'filters'=>'[]',
					'form_title'=>'Cadastrando Categoria',
					'form_url'=>'/senna/produto/classesprodutos/form',
					'form_url_field'=>'descricao',
					'id'=>'produto__id_categoria',
					'minLength'=>'0',
					'new_item_info'=>'Criar um novo registro',
					'new_item_label'=>'Cadastrar Novo',
					'source'=>'/senna/produto/classesprodutos/getcategorias',
					'style'=>'',
					'type'=>'text',
					'uppercase'=>'true',
					'value'=>'',
					'valueclear'=>'true',
					'valuefield'=>'id'
				)
		) );						
		
		$this->add ( array (
				'name' => "produto__cod_secundario",
				'attributes' => array (
						'type' => 'text',
						'value' => '',
						'maxlength' => "14",
						'minlength'=>'3',
						'class' => 'required',
						'style' => "text-transform: uppercase",
						'id' =>'produto__cod_secundario'
				)
		) );
		
		$this->add ( array (
				'name' => "produto__cod_barra",
				'attributes' => array (
						'type' => 'text',
						'value' => '',
						'maxlength' => "14",
						'minlength'=>'3',
						'class' => 'number code_ean',
						'style' => "text-transform: uppercase;text-align: -webkit-left",
						'id' =>'produto__cod_barra'
				)
		) );
		
		$this->add ( array (
				'name' => "produto__id_unidade_entrada",
				'attributes' => array (
						'id'=>'produto__id_unidade_entrada',
						'type'=>'hidden',
						'value'=>isset($this->unidadesmedida['0'])?$this->unidadesmedida['0']:""
				)
		) );
		
		$this->add ( array (
				'name'=>'ac_03140142178661bc5664537f0f165dc0a75782d030',
				'attributes' => array (
						'autosuggest'=>'produto__id_unidade_entrada',
						'class'=>' required autosuggest',
						'filters'=>'[]',
						'form_title'=>'Cadastrando Unidade',
						'form_url'=>'/senna/produto/unidadeuso/form',
						'form_url_field'=>'descricao',
						'id'=>'produto__id_unidade_entrada',
						'style'=>'width: 50%;',
						'minLength'=>'0',
						'new_item_info'=>'Criar um novo registro',
						'new_item_label'=>'Cadastrar Novo',
						'source'=>'/senna/produto/unidadeuso/getunidades',
						'style'=>'',
						'type'=>'text',
						'uppercase'=>'true',
						'value'=>isset($this->unidadesmedida['1'])?$this->unidadesmedida['1']:"",
						'valueclear'=>'true',
						'valuefield'=>'id'
				)
		) );
		
		$this->add ( array (
				'name' => "produto__tx_conversao_e_s",
				'attributes' => array (
						'id'=>'produto__tx_conversao_e_s',
						'type'=>'text',
						'value'=>'1',
						'class'=>'required positive',
						'number_format'=>'+#.#0,[3,3]'
				)
		) );
		
		$this->add ( array (
				'name' => "produto__id_unidade_saida",
				'attributes' => array (
						'id'=>'produto__id_unidade_saida',
						'type'=>'hidden',
						'value'=>isset($this->unidadesmedida['0'])?$this->unidadesmedida['0']:""
				)
		) );
		
		$this->add ( array (
				'name'=>'ac_0179607757978bfb3b16a9b41b4f5e3e78decfce81e',
				'attributes' => array (
						'autosuggest'=>'produto__id_unidade_saida',
						'class'=>' required autosuggest ',
						'filters'=>'[]',
						'form_title'=>'Cadastrando Unidade',
						'form_url'=>'/senna/produto/unidadeuso/form',
						'form_url_field'=>'descricao',
						'id'=>'produto__id_unidade_saida',
						'lstyle'=>'width: 50%;',
						'minLength'=>'0',
						'new_item_info'=>'Criar um novo registro',
						'new_item_label'=>'Cadastrar Novo',
						'source'=>'/senna/produto/unidadeuso/getunidades',
						'style'=>'',
						'type'=>'text',
						'uppercase'=>'true',
						'value'=>isset($this->unidadesmedida['1'])?$this->unidadesmedida['1']:"",
						'valueclear'=>'true',
						'valuefield'=>'id'
				)
		) );
		
		$this->add ( array (
				'name' => "Conversoes",
				'attributes' => array (
						'class'=>'cloneable',
						 'id'=>'btn_unidade_conv',
						 'style'=>'margin-left: 5px; float: left; margin-top: 13px;', 
						 'type'=>'hidden',
						 'value'=>'Conversoes'
				)
		) );
		
		$this->add ( array (
				'name' => "json_unidades",
				'attributes' => array (						
						'id'=>'json_unidades',						
						'type'=>'hidden',
						'value'=>''
				)
		) );
		
		$this->add ( array (
				'name' => "produto__id_unidade_tributavel",
				'attributes' => array (
						'id'=>'produto__id_unidade_tributavel',
						'type'=>'hidden',
						'value'=>''
				)
		) );
		
		$this->add ( array (
				'name' => "produto__id_unidade_inventario",
				'attributes' => array (
						'id'=>'produto__id_unidade_inventario',
						'type'=>'hidden',
						'value'=>''
				)
		) );
		
		$this->add(array(
				'type' => 'radio',
				'name' => 'produto__ativo',
				'attributes' => array (
						'class' => ' required',
						'eval'=>'',
						'style' => ""
				),
				'options' => array(
						'label_options'=>array('disable_html_escape' => true),
						'label_attributes' => array('class' => 'inline'),
						'value_options' => array(
								'0' => '<span>N&atilde;o</span>',
								'1' => '<span>Sim</span>',
						),
				)
		));
		
		$this->add ( array (
				'name' => "produto_estoque__qtd",
				'attributes' => array (
						'id'=>'produto_estoque__qtd',
						'readonly'=>"readonly",
						'type'=>'text',
						'value'=>'',
						'number_format'=>'+#.#0,[3,3]'
				)
		) );
		
		$this->add ( array (
				'name' => "produto_estoque__min",
				'attributes' => array (
						'id'=>'produto_estoque__min',
						'type'=>'text',
						'value'=>'',
						'number_format'=>'+#.#0,[3,3]'
				)
		) );
		
		$this->add ( array (
				'name' => "produto_estoque__max",
				'attributes' => array (
						'id'=>'produto_estoque__max',
						'type'=>'text',
						'value'=>'',
						'number_format'=>'+#.#0,[3,3]'
				)
		) );


		$this->add ( array (
				'name' => "valor_venda_varejo",
				'attributes' => array (
						'id'=>'valor_venda_varejo',
						'type'=>'text',
						'value'=>'0,01',
						'disabled'=>'disabled',
						'style'=>'font-size: 22px; height: auto; padding: 3px;',
						'number_format'=>'+#.#0,[2,2]'
				)
		) );		
		

														
		$this->add ( array (
				'name' => "produto_valor_venda__vr_venda",
				'attributes' => array (
						'id'=>'produto_valor_venda__vr_venda_11569603222bdc7616727be4fdfab1e4e5c820d3f8',
						'type'=>'text',
						'value'=>'0,01',
						'number_format'=>'+#.#0,[2,2]',
						'class'=>'required positive',
						'style'=>'',
						'ref'=>'produto_valor_venda__vr_venda'
				)
		) );														
														
		$this->add ( array (
				'name' => "valor_venda_varejo_aux",
				'attributes' => array (
						'id'=>'valor_venda_varejo_aux',
						'type'=>'text',
						'value'=>'0,01',
						'number_format'=>'+#.#0,[2,2]',
						'class'=>'required currency valid'
				)
		) );
		
		$this->add ( array (
				'name' => "produto__peso",
				'attributes' => array (
						'id'=>'produto__peso',
						'type'=>'text',
						'value'=>'',
						'number_format'=>'+#.#0,[3,3]'
				)
		) );
		
		$this->add ( array (
				'name' => "produto__largura",
				'attributes' => array (
						'id'=>'produto__largura',
						'type'=>'text',
						'value'=>'',
						'number_format'=>'+#.#0,[3,3]'
				)
		) );
		
		$this->add ( array (
				'name' => "produto__altura",
				'attributes' => array (
						'id'=>'produto__altura',
						'type'=>'text',
						'value'=>'',
						'number_format'=>'+#.#0,[3,3]'
				)
		) );	

		$this->add ( array (
				'name' => "produto__comprimento",
				'attributes' => array (
						'id'=>'produto__comprimento',
						'type'=>'text',
						'value'=>'',
						'number_format'=>'+#.#0,[3,3]'
				)
		) );
		
		$this->add ( array (
				'name' => "produto__comissao",
				'attributes' => array (
						'id'=>'produto__comissao',
						'type'=>'text',
						'value'=>'',
						'number_format'=>'+#.#0,[2,2]'
				)
		) );
		
		$this->add ( array (
				'name' => "produto__pontos",
				'attributes' => array (
						'id'=>'produto__pontos',
						'type'=>'text',
						'value'=>'',
						'style'=>'',
						'class'=>'number'
				)
		) );
		
		$this->add ( array (
				'name' => "vinculacao",
				'attributes' => array (
						'id'=>'vinculacao',
						'type'=>'hidden',
						'value'=>''
				)
		) );		
		
		$this->add(array(
				'type' => 'Checkbox',
				'name' => 'produto__serie',
				'attributes' => array (
						'id'=>'produto__serie',
						'value'=>'1',
						'rel'=>'',
						'style'=>''
				)
		));
		
		$this->add(array(
				'type' => 'Checkbox',
				'name' => 'produto__vendido_separado',
				'attributes' => array (
						'id'=>'produto__vendido_separado',
						'value'=>'1',
						'rel'=>'1',
						'style'=>''
				)
		));
		
		$this->add ( array (
				'name' => "produto__informacao_adicional",
				'attributes' => array (
						'id'=>'produto__informacao_adicional',
						'type'=>'textarea',
						'maxlength'=>'255',
						'cols'=>'90',
						'style'=>'height: 45px;text-transform: uppercase',
						'rows'=>'12'
				)
		) );
				
		$this->add ( array (
				'name' => "produto_atributo__id",
				'attributes' => array (
						'id'=>'produto_atributo__id',
						'type'=>'hidden',
						'value'=>''
				)
		) );
		
		$this->add ( array (
				'name' => "produto_atributo__id_produto",
				'attributes' => array (
						'id'=>'produto_atributo__id_produto',
						'type'=>'hidden',
						'value'=>''
				)
		) );

		$this->add ( array (
				'name' => "produto_atributo__nome_atributo",
				'attributes' => array (
						'id'=>'produto_atributo__nome_atributo',
						'type'=>'text',
						'value'=>'',
						'style'=>'text-transform: uppercase',
						'class'=>'primeiroCaractere',
						'uppercase'=>'true'
				)
		) );
		
		$this->add ( array (
				'name' => "produto_atributo__valor_atributo",
				'attributes' => array (
						'id'=>'produto_atributo__valor_atributo',
						'type'=>'text',
						'value'=>'',
						'style'=>'text-transform: uppercase',
				)
		) );
		
		$this->add ( array (
				'name' => "produto_fornecedor__id",
				'attributes' => array (
						'id'=>'produto_fornecedor__id',
						'type'=>'hidden',
						'value'=>''
				)
		) );
		
		$this->add ( array (
				'name' => "produto_fornecedor__id_produto",
				'attributes' => array (
						'id'=>'produto_fornecedor__id_produto',
						'type'=>'hidden',
						'value'=>''
				)
		) );
		
		$this->add ( array (
				'name' => "produto_fornecedor__id_fornecedor",
				'attributes' => array (
						'id'=>'produto_fornecedor__id_fornecedor',
						'type'=>'hidden',
						'value'=>''
				)
		) );	

		$this->add ( array (
				'name'=>'ac_01871149116349e3b5e4b5d1abf0ea5a865a0f6f596',
				'attributes' => array (
						'autosuggest'=>'produto_fornecedor__id_fornecedor',
						'class'=> 'autosuggest' ,
						'filters'=>'[]',
						'form_title'=>'Cadastrando Fornecedor',
						'form_url'=>'http://demonstracao.tagplus.com.br/cadastro/fornecedores/form',
						'form_url_field'=>'razao_social',
						'id'=>'produto_fornecedor__id_fornecedor' ,
						'minLength'=>'0',
						'new_item_info'=>'Criar um novo registro',
						'new_item_label'=>'Cadastrar Novo',
						'source'=>'http://demonstracao.tagplus.com.br/autocomplete/entidades/get/F',
						'style'=> '',
						'type'=>'text' ,
						'uppercase'=>'true' ,
						'value'=>'',
						'valueclear'=>'true' ,
						'valuefield'=>'id_fornecedor'
				)
		) );
		
		$this->add ( array (
				'name' => "cpf_cnpj_fornecedor",
				'attributes' => array (
						'id'=>'cpf_cnpj_fornecedor',
						'type'=>'text',
						'value'=>'',
						'style'=>'text-transform: uppercase',
						'disabled'=>'disabled'
				)
		) );
		
		$tipoProduto = new Select ();
		$tipoProduto->setAttributes ( array (
				'eval' => '',
				'id' => 'produto__vinculacao',
				'size' => '1',
				'style' => '',
		
		) );
				
		$options = array('N'=>'Normal',array('value' => 'G','label' => 'Grade','attributes' => array('title' => 'Grade:Quando usar?A Grade é utilizada quando se deseja umcontrole mais detalhado de um mesmo produto. Por exemplo, quando se desejacontrolar lotes, cor ou tamanho de itens.Como funciona?O usuário semprerealiza a entrada de estoque no produto principal. No cadastro desse produto,pode ser feita a distribuiCódigoão do estoque do item principal pelas gradescadastradas. Ao vender ou sair com um item tipo grade, deve ser indicado oproduto detalhado (chamado Filho de Grade), movimentando seu estoque.')));
		$tipoProduto->setName ( 'produto__vinculacao' )->setOptions ( array (
				'value_options' => $options
		) );
		$this->add($tipoProduto);
		

		$arquivo = new File('file');
		
		$arquivo->setAttributes(array(
				'id'=>'upload_produto__foto_principal',
				'multiple'=>"multiple",
				'accept'=>'',
				'style'=>'display: none',
				'value'=>''
		
			));
		$this->add($arquivo);
		
		
		
	/*$this->add ( array (
				'name' => "fracionado",
				'attributes' => array (
						'class' => 'required',
						'eval'=>'',
						'type' => 'radio',
						'value' => '0',
						'style' => ""
				)
		) );

	
	


     $this->add(array(
             'type' => 'radio',
             'name' => 'fracionado',
	     		'attributes' => array (
	     				'class' => ' required',
	     				'eval'=>'',
	     				'style' => ""
	     		),
	             'options' => array(
	             		'label_options'=>array('disable_html_escape' => true),
	             		'label_attributes' => array('class' => 'inline'),
	                     'value_options' => array(
	                             '0' => '<span>N&atilde;o</span>',
	                             '1' => '<span>Sim</span>',
	                     ),
             )
     ));

     $this->add(array(
             'type' => 'Checkbox',
             'name' => 'padrao',
     		'attributes' => array (
     				'id'=>'padrao'
     		)
     ));
     
     */
	}
}