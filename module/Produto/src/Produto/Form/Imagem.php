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
use Zend\Form\Element\File;

class Imagem extends Form {

	/**
	 * Constroi formulario de insercao e edicao de dados das unidades de medidas
	 * @param string $name
	 */
	public function __construct($id = null) {
		parent::__construct ( 'imagem' );
		$this->setInputFilter(new FilterUpLoad($id));
		$this->setAttributes ( array (
				'method' => 'post',
				'class' => 'form',
				'id' => 'form' 
		) );

	
		$arquivo = new File('file');
		
		$arquivo->setAttributes(array(
				
				'accept'=>'',
				'style'=>'display: none',
				'value'=>''
		
			));
		$this->add($arquivo);
		

	}
}