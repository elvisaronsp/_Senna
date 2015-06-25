<?php
/**
 * Form unidades medida
 * @author Jefferson Fernandes
 * @date 15/11/2014
 * @time 23:14:40
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Produto\Form;
use Zend\Form\Form;
class UnidadesMedida extends Form {
	/**
	 * Constroi formulario de insercao e edicao de dados das unidades de medidas
	 * @param string $name
	 */
	public function __construct($name = null) {
		parent::__construct ( 'unidadesmedida' );
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
						'deleteUrl' => '/senna/produto/unidadeuso/delete',
						'labelsConfirm' => "{'labelSim':'Sim','labelNao':'N&atilde;o'}",
						'disabled' => "disabled" 
				) 
		) );
		
		$this->add ( array (
				'name' => "Fechar",
				'attributes' => array (
						'type' => 'button',
						'value' => 'Fechar',
						'cancelForm' => "true",
						'class' => 'cancel'
				)
		) );
		
		$this->add ( array (
				'name' => "id",
				'attributes' => array (
						'type' => 'hidden',
						'value' => '',
						'id' => 'id' 
				) 
		) );
		
		$this->add ( array (
				'name' => "moficador_padrao",
				'attributes' => array (
						'type' => 'hidden',
						'value' => 'false',
						'id' => 'moficador_padrao'
				)
		) );

		$this->add ( array (
				'name' => "descricao",
				'attributes' => array (
						'type' => 'text',
						'value' => '',
						'maxlength' => "255",
						'minlength'=>'2',
						'class' => 'focus required',
						'style' => "text-transform: uppercase",
						'id' =>'descricao'
				) 
		) );

		$this->add ( array (
				'name' => "sigla",
				'attributes' => array (
						'type' => 'text',
						'value' => '',
						'minlength'=>'2',
						'maxlength'=>'2',
						'class' => 'required',
						'style' => "",
						'id' =>'sigla',
						'uppercase'=>'true'
				)
		) );

	$this->add ( array (
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
     		),
     		'options' => array(
				'use_hidden_element' => false

     		)
     ));
     
     
     
    
	}
}