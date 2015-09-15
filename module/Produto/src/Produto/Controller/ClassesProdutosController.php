<?php

/**
 * @author Jefferson Fernandes
 * @date 05/11/2014
 * @time 00:06:42
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Produto\Controller;

use Zend\Mvc\Controller\AbstractActionController, 
	Zend\View\Model\ViewModel;
use Zend\Paginator\Paginator, Zend\Paginator\Adapter\ArrayAdapter;
use Produto\Form\ClassesProdutos as FrmClasses;
use Senna\Controller\GrudController;

class ClassesProdutosController extends GrudController {
	/**
	 * @var EntityManager
	 */
	protected $em;
	/**
	 * Carrega listagem da pagina de classes de produtos
	 * @see \Zend\Mvc\Controller\AbstractActionController::indexAction()
	 */
	public function indexAction() {
		$viewModel = new ViewModel ();
		$viewModel->setTerminal ( true );
		return $viewModel;
	}
	/**
	 * Carrega pagina de formulario para cadastro de uma nova classe de itens de venda
	 * @return \Zend\View\Model\ViewModel
	 */
	public function FormAction() {
		$form = $this->getServiceLocator ()->get ( 'Produto\Form\ClassesProdutos' );
		$repository = $this->getEm ()->getRepository ( 'Senna\Entity\Classesprodutos' );
	
		if ($this->params ()->fromRoute ( 'id', 0 ))
			{
			$entity = $repository->find ( $this->params ()->fromRoute ( 'id', 0 ) );
			if(empty($entity))
				{
				$repository = $this->getEm ()->getRepository ( 'Senna\Entity\Subclassesprodutos' );
				$entity = $repository->find ( $this->params ()->fromRoute ( 'id', 0 ) );
				}
			$form->setData ( $entity->toArray () );
			}	
		
		$viewModel = new ViewModel ( array (
				'form' => $form 
		) );
		$viewModel->setTerminal ( true );
		return $viewModel;
	}
	/**
	 * Carrega listagem da pagina de classes de produtos
	 * @return \Zend\View\Model\ViewModel
	 */
	public function FilterAction() {
		// Captura URL
		$url = $this->getRequest ()->getQuery ();
		
		// Busca classes e sub classes
		$repositoryClassesProdutos = $this->getEm ()->getRepository ( 'Senna\Entity\Classesprodutos' );
		$repositorySubClassesProdutos = $this->getEm ()->getRepository ( 'Senna\Entity\Subclassesprodutos' );
		$classes = $repositoryClassesProdutos->toArrayClassesSubClasses ( $repositorySubClassesProdutos );
		
		// Configuracao para paginacao
		$paginator = new Paginator ( new ArrayAdapter ( $classes ) );
		$page = (isset ( $url ['page'] )) ? $url ['page'] : "1";
		$perpage = (isset ( $url ['perpage'] )) ? $url ['perpage'] : "25";
		$paginator->setCurrentPageNumber ( $page );
		$paginator->setDefaultItemCountPerPage ( $perpage );
		
		// Parametros passados para a view
		$view_params = array (
				'data' => $paginator,
				'page' => $page,
				'registos' => count ( $classes ) 
		);
		$viewModel = new ViewModel ( $view_params );
		$viewModel->setTerminal ( true ); // desabilita a renderizacao do layout
		return $viewModel;
	}
	/**
	 * Recebe requisicao da view e salva classe ou sub classe
	 * @return \Zend\View\Model\ViewModel
	 */
	public function SaveAction() {
		$form = $this->getServiceLocator ()->get ( 'Produto\Form\ClassesProdutos' );
		$request = $this->getRequest ();
		$id = $request->getPost ();
		
		if ($id ['id'] == "") {
			if ($request->isPost ()) {
				$form->setData ( $request->getPost () );
				if ($form->isValid ()) {
					if($id ['id_produto_categoria'] == 0){
						$service = $this->getServiceLocator ()->get ( 'Senna\Service\ClassesProdutos' );
						$entity = $service->insert ( $request->getPost ()->toArray () );
						$idLastInset = array(
								'id'=>$entity->getId (),
								'message'=>'Classe de itens salvo com sucesso',
								'type'=>'success'
						
						);
					}else{
						$service = $this->getServiceLocator ()->get ( 'Senna\Service\SubClassesProdutos' );
						$entity = $service->insert ( $request->getPost ()->toArray () );
						$idLastInset = array(
								'id'=>$entity->getId (),
								'message'=>'Classe de itens salvo com sucesso',
								'type'=>'success'
						
						);
					}
				}
			}
		} else {
			if ($request->isPost ()) {
				$form->setData ( $request->getPost () );
				if ($form->isValid ()) {
					$ref = 'sub';
					
					if((int)$id['id'] < 1000)
						$ref = 'classe';				
					if($id ['id_produto_categoria'] == 0 && $ref == 'classe'){
						$service = $this->getServiceLocator ()->get ( 'Senna\Service\ClassesProdutos' );
						$entity = $service->update ( $request->getPost ()->toArray () );
						$idLastInset = array(
								'id'=>$entity->getId (),
								'message'=>'Classe de itens salvo com sucesso',
								'type'=>'success'
								
						);
					}elseif ($id ['id_produto_categoria'] != 0 && $ref == 'classe'){
						$idLastInset = array(
								'id'=>$id['id'],
								'message'=>'Esta classe &eacute; pai e n&atilde;o pode ser filha de ninguem',
								'type'=>'error'
						
						);
					
					}elseif ($id ['id_produto_categoria'] == 0 && $ref == 'sub'){
						$idLastInset = array(
								'id'=>$id['id'],
								'message'=>'Esta classe &eacute; filha e n&atilde;o pode ser pai de ninguem',
								'type'=>'error'
						
						);
					
					}else{
						$service = $this->getServiceLocator ()->get ( 'Senna\Service\SubClassesProdutos' );
						$entity = $service->update ( $request->getPost ()->toArray () );
						$idLastInset = array(
								'id'=>$entity->getId (),
								'message'=>'Classe de itens salvo com sucesso',
								'type'=>'success'
						
						);
					}
				}
			}
		}
		
		$viewModel = new ViewModel ( array (
				'data' => array (
						'id_field' => 'id',
						'id_value' => "" . $idLastInset['id'] . "",
						'message' => $idLastInset['message'],
						'type' => $idLastInset['type']
				) 
		)
		 );
		$viewModel->setTerminal ( true );
		return $viewModel;
	}
	/**
	 * Verofica se a classe pai possui alguma classe filho
	 * @return \Zend\View\Model\ViewModel
	 */
	public function VerificaVinculosAction() {
		$entity = $this->getEm ()->getRepository ( 'Senna\Entity\Classesprodutos' );
		$vinculo = $entity->findAssoc ( $this->params()->fromRoute('id',0) );
		$viewModel = new ViewModel (array('data'=>$vinculo));
		$viewModel->setTerminal ( true );
		return $viewModel;
	}
	/**
	 * Deleta a classe ou a subclasse selecionada
	 * @return \Zend\View\Model\ViewModel
	 */
	public function deleteAction() {
		$id = $this->params()->fromRoute('id',0);
		if((int)$id < 1000)
			$service = $this->getServiceLocator ()->get ( 'Senna\Service\ClassesProdutos' );
		else 	
			$service = $this->getServiceLocator ()->get ( 'Senna\Service\SubClassesProdutos' );
		
		if($service->delete($this->params()->fromRoute('id',0)))
			$message = "Classe de itens apagada com sucesso";	
		else
			$message = "Erro ao apagar a classe de itens";		
		
		$viewModel = new ViewModel (array('data'=>$message));
		$viewModel->setTerminal ( true );
		return $viewModel;
	}
	
	/**
	 * Busca de categorias por like
	 * @return \Zend\View\Model\ViewModel
	 */
	public function getCategoriasAction(){
		
		// Captura URL
		$url = $this->getRequest()->getQuery ();
		$this->setFiltro($url);
		$where = $this->getWhere(array('add','edit','delete'));
		
		$repository = $this->getEm()->getRepository ('Senna\Entity\Classesprodutos');
		$arrayFilter = $repository->getLike($where);

		// Parametros passados para a view
		$view_params = array (
				'data' => $arrayFilter
		);
		$viewModel = new ViewModel ( $view_params );
		$viewModel->setTerminal ( true ); 
		return $viewModel;
		
	}
	
	protected function getEm() {
		if (null === $this->em)
			$this->em = $this->getServiceLocator ()->get ( 'Doctrine\ORM\EntityManager' );
		
		return $this->em;
	}
}