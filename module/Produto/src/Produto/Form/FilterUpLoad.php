<?php

/**
 * Filter Produtos
 * @author Jefferson Fernandes
 * @date 02/02/2015
 * @time 01:05:00
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Produto\Form;

use Zend\InputFilter\InputFilter;
use Zend\InputFilter\FileInput;
use Zend\Filter\File\RenameUpload;
use Zend\Validator\File\Size;
use Zend\Validator\File\MimeType;

class FilterUpLoad extends InputFilter {
	public function __construct($id) {
		$arquivo = new FileInput ( 'file' );
		$arquivo->setRequired ( true );
		
		$arquivo->getFilterChain ()->attach ( new RenameUpload ( array (
				'target' => './www/images/produtos/'.$id.'/prod',
				'use_upload_extension' => true,
				'randomize' => true 
		) ) );
		$arquivo->getValidatorChain ()->attach ( new Size ( array (
				'max' => substr ( ini_get ( 'upload_max_filesize' ), 0, - 1 ) . 'MB' 
		) ) );
/*		$arquivo->getValidatorChain ()->attach ( new MimeType ( array (
				'image/gif',
				'image/jpeg',
				'image/png',
				'enableHeaderCheck' => true 
		)
		 ) );
*/

		$this->add($arquivo);
	}
}