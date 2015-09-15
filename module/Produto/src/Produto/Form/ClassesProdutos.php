<?php

/**
 * @author Jefferson Fernandes
 * @date 07/11/2014
 * @time 20:10:47
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Produto\Form;

use Zend\Form\Form;
use Zend\Form\Element\Select;

class ClassesProdutos extends Form {
	/**
	 * @var array classes produtos
	 */
	protected $classesprodutos;
	
	/**
	 * Constroi formulario de insercao e edicao de dados das classes e sub classes
	 * @param string $name
	 * @param array $classesprodutos
	 */
	public function __construct($name = null,array $classesprodutos = null) {
		parent::__construct ( 'classesprodutos' );
		$this->classesprodutos = $classesprodutos;
		
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
						'deleteUrl' => '/senna/produto/classesprodutos/delete',
						'labelsConfirm' => "{'labelSim':'Sim','labelNao':'N&atilde;o'}",
						'disabled' => "disabled" 
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
				'name' => "Fechar",
				'attributes' => array (
						'type' => 'button',
						'value' => 'Fechar',
						'cancelForm' => "true",
						'class' => 'cancel' 
				) 
		) );
		
		$this->add ( array (
				'name' => "nome",
				'attributes' => array (
						'type' => 'text',
						'value' => '',
						'maxlength' => "255",
						'class' => 'focus required',
						'style' => "text-transform: uppercase" 
				) 
		) );
		
		/*$this->add ( array (
				'name' => "localizacao",
				'attributes' => array (
						'type' => 'text',
						'disabled'=>'disabled',
						'value' => '',
						'maxlength' => "255",
						'style' => "text-transform: uppercase" 
				) 
		) );*/
		
		$classes = new Select ();
		$classes->setAttributes ( array (
				'eval' => '',
				'id' => 'id_produto_categoria',
				'size' => '1',
				'style' => '',

		) );
	
		$options = array('0'=>'--');
		foreach ($this->classesprodutos AS $key => $value):
			$options[$key] = $value;
		endforeach;
		$classes->setName ( 'id_produto_categoria' )->setOptions ( array (
				'value_options' => $options
		) );
		$this->add($classes);
	}
}