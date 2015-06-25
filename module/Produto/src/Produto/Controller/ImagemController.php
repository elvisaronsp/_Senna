<?php

/**
 * Controller imagem
 * @author Jefferson Fernandes
 * @date 03/02/2015
 * @time 22:57:00
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Produto\Controller;

use Senna\Controller\GrudController, Zend\View\Model\ViewModel;
use Produto\Form\Imagem;

class ImagemController extends GrudController {
	
	
	/**
	 * __construct
	 */
	public function __construct() {
		
	}
	
	/**
	 * Lista imagens de um determinado item pelo ID
	 * @return \Zend\View\Model\ViewModel
	 */
	public function listImagemAction() {
		$server_url = $this->getRequest ()->getUri ()->getScheme () . '://' . $this->getRequest ()->getUri ()->getHost () ;
		$id = $this->params ()->fromRoute ( 'id', 0 );
		$fotos = array();
		$path = './www/images/produtos/'.$id;
		if (is_dir ( $path )) {
			$dir = dir ( $path );
			while ( $arq = $dir->read () ) {
				if($arq != '.' && $arq != '..')
					$fotos[]=$arq;
			}
			$dir->close ();
		}
		
		$viewModel = new ViewModel (array(
				'data'=>$fotos,
				'id'=>$id,
				"path"=>$server_url
				
		));
		$viewModel->setTerminal ( true );
		return $viewModel;
	}
	
	/**
	 * Salva uma nova imagem para o item selecionado
	 * @return \Zend\View\Model\ViewModel
	 */
	public function ProdutosAction() {
		$id = $this->params ()->fromRoute ( 'id', 0 );
		$form = new Imagem ( $id );
		if ($this->getRequest ()->isPost ( $id )) {
			$postData = array_merge_recursive ( $this->getRequest ()->getPost ()->toArray (), $this->getRequest ()->getFiles ()->toArray () );
		}
		
		$form->setData ( $postData );
		if ($form->isValid ()) {
			$data = $form->getData ();
			$server_url = $this->getRequest ()->getUri ()->getScheme () . '://' . $this->getRequest ()->getUri ()->getHost () ;
			$file = explode ( "/", $data ['file'] ['tmp_name'] );
			$viewModel = new ViewModel ( array (
					'data' => $server_url . '/images/produtos/' . $id . '/' . $file ['5']
			) );
			$viewModel->setTerminal ( true );
			return $viewModel;
		}

	}
	
	
	public function DeleteAction() {
		$server_url = $this->getRequest ()->getUri ()->getScheme () . '://' . $this->getRequest ()->getUri ()->getHost () ;
		$post = $this->getRequest ()->getPost ()->toArray ();
		$path = explode ( $server_url, $post['file'] );
		
		$caminho =  './www'.$path['1'];
		unlink($caminho);
		$viewModel = new ViewModel ();
		$viewModel->setTerminal ( true );
		return $viewModel;
	}
	
}