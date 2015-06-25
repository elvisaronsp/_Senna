<?php

/**
 * Form Modalidades
 * @author Jefferson Fernandes
 * @date 28/11/2014
 * @time 21:23:45
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Produto\Form;

use Zend\Form\Form;

class Modalidades extends Form {
	/**
	 * Constroi formulario de insercao e edicao de dados de modalidades
	 *
	 * @param string $name        	
	 */
	public function __construct($name = null) {
		parent::__construct ( 'modalidades' );
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
						'labelsConfirm' => "{'labelSim':'Sim','labelNao':'Não'}",
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
				'name' => "descricao",
				'attributes' => array (
						'type' => 'text',
						'value' => '',
						'maxlength' => "255",
						'class' => 'focus required',
						'style' => "text-transform: uppercase",
						'id' => 'descricao' 
				) 
		) );
		
		$this->add ( array (
				'type' => 'radio',
				'name' => 'tipo',
				'attributes' => array (
						'class' => ' required',
						'eval' => '',
						'style' => "" 
				),
				'options' => array (
						'label_options' => array (
								'disable_html_escape' => true 
						),
						'label_attributes' => array (
								'class' => 'inline',
								'style' => "width: auto" //alterado
						),
						'value_options' => array (
								'M' => '<span>Modalidade</span>',
								'G' => '<span>Grade</span>' 
						) 
				) 
		) );
		
		$this->add ( array (
				'name' => "modalidade",
				'attributes' => array (
						'id'=>'modalidade',
						'type'=>'hidden', 
						'value'=>''
				) 
		) );
		
		$this->add ( array (
				'name' => "ac_modalidade",
				'attributes' => array (
						'autosuggest'=>'modalidade',
						'class'=>'required autosuggest', 
						'disabled'=>'disabled',
						'filters'=>'[]',
						'form_title'=>'Cadastrando Modalidade', 
						'form_url'=>'',
						'form_url_field'=>'', 
						'id'=>'modalidade',
						'minLength'=>'0', 
						'new_item_info'=>'Criar um novo registro', 
						'new_item_label'=>'Cadastrar Novo',
						'source'=>'/senna/produto/modalidades/getModalidades',
						'style'=>'',
						'type'=>'text', 
						'value'=>'Modalidade 1',
						'valueclear'=>'true', 
						'valuefield'=>'id_modalidade'

				) 
		) );
		
		$this->add ( array (
				'name' => "id_modalidade",
				'attributes' => array (
						'id'=>'id_modalidade',
						'type'=>'hidden', 
						'value'=>''
				) 
		) );
		
	}
}