<?php

/**
 * Form Funcionarios
 * @author Jefferson Fernandes
 * @date 16/02/2015
 * @time 19:29:00
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Usuario\Form;

use Zend\Form\Form;

class Funcionarios extends Form {
	/**
	 * Constroi formulario de insercao e edicao de dados de um funcionario
	 * @param string $name        	
	 */
	public function __construct($name = null) {
		parent::__construct ( 'empresa' );
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
		

		
	}
}