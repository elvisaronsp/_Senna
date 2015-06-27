<?php

/**
 * Abstract Grud Controller
 * @author Jefferson Fernandes
 * @date 15/11/2014
 * @time 18:50:25
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Controller;

use Zend\Mvc\Controller\AbstractActionController,
    Zend\View\Model\ViewModel;
use Zend\Paginator\Paginator,
    Zend\Paginator\Adapter\ArrayAdapter;

abstract class GrudController extends AbstractActionController {
	/**
	 *
	 * @var EntityManager
	 */
	protected $em;
	
	/**
	 *
	 * @var Entity
	 */
	protected $entity;
	
	/**
	 *
	 * @var form
	 */
	protected $form;
	
	/**
	 *
	 * @var service
	 */
	protected $service;
	
	/**
	 *
	 * @var message_insert
	 */
	protected $message_insert;
	
	/**
	 *
	 * @var message_update
	 */
	protected $message_update;
	
	/**
	 *
	 * @var $where
	 */
	protected $where;
	
	/**
	 *
	 * @var $filtro
	 */
	protected $filtro;
	
	/**
	 *
	 * @var $controller
	 */
	protected $controller;
	
	/**
	 * Carrega listagem abstract
	 * 
	 * @see \Zend\Mvc\Controller\AbstractActionController::indexAction()
	 */
	public function indexAction() {
		$viewModel = new ViewModel ();
		$viewModel->setTerminal ( true );
		return $viewModel;
	}
	/**
	 * Carrega pagina de formulario abstract
	 * 
	 * @return \Zend\View\Model\ViewModel
	 */
	public function FormAction() {
		$form = $this->getServiceLocator()->get( $this->form );
		$repository = $this->getEm()->getRepository($this->entity);

        if ($this->params ()->fromRoute ( 'id', 0 ))
        {
		    $entity = $repository->find($this->params()->fromRoute ('id',0));
			$form->setData($entity->toArray());
		}
		
		$viewModel = new ViewModel ( array (
				'form' => $form 
		) );
		$viewModel->setTerminal ( true );
		return $viewModel;
	}
	
	/**
	 * Seta na variavel filtro todos os wheres da url
	 * 
	 * @param array $filtro        	
	 */
	public function setFiltro($filtro) {
		if (count ( $filtro ))
			$this->filtro ['params'] = $filtro;
	}
	
	/**
	 * Monta array de wheres
	 * 
	 * @param array $exceptionsFiltro        	
	 * @return where
	 */
	public function getWhere(array $exceptionsFiltro) {
		$where = $this->where;
		$filtro = $this->filtro;
		if (isset ( $filtro ['params'] ) && count ( $filtro ['params'] )) {
			foreach ( $filtro ['params'] as $idFiltro => $valorFiltro ) {
				if ((! empty ( $valorFiltro ) || $valorFiltro == '0') && ! in_array ( $idFiltro, $exceptionsFiltro ))
					$where [$idFiltro] = $valorFiltro;
			}
		}
		
		return $where;
	}
	
	/**
	 * Carrega listagem abstract
	 * 
	 * @return \Zend\View\Model\ViewModel
	 */
	public function FilterAction() {


		// Captura URL
		$url = $this->getRequest ()->getQuery ();
		$this->setFiltro ( $url );
		$where = $this->getWhere ( array (
				'add',
				'edit',
				'delete' 
		) );

		$repository = $this->getEm ()->getRepository ( $this->entity );

		$arrayFilter = $repository->toList ( $where );

		// Configuracao para paginacao
		$paginator = new Paginator ( new ArrayAdapter ( $arrayFilter ) );
		$page = (isset ( $where ['page'] )) ? $where ['page'] : "1";
		$perpage = (isset ( $where ['perpage'] )) ? $where ['perpage'] : "25";
		$paginator->setCurrentPageNumber ( $page );
		$paginator->setDefaultItemCountPerPage ( $perpage );
		
		// Parametros passados para a view
		$view_params = array (
				'data' => $paginator,
				'page' => $page,
				'registos' => count ( $arrayFilter ),
				'filtro' => $url 
		);

		$viewModel = new ViewModel ( $view_params );
		$viewModel->setTerminal ( true ); // desabilita a renderizacao do layout
		return $viewModel;
	}
	
	/**
	 * Recebe requisicao da view e salva Abstract
	 * 
	 * @return \Zend\View\Model\ViewModel
	 */
	public function SaveAction() {
		$form = $this->getServiceLocator ()->get ( $this->form );

        $request = $this->getRequest ();
		$post = $request->getPost ();
		$entity = $this->getEm ()->getRepository ( $this->entity );
		$valida = $entity->validePost ( $post );
		
		if (! $valida)
			$this->acoesValidacaoNegativa ( $post );
		
		if ($post ['id'] == "") {
			
			if ($request->isPost ()) {
				
				$form->setData ( $request->getPost () );
				$service = $this->getServiceLocator ()->get ( $this->service );
				$entity = $service->insert ( $request->getPost ()->toArray () );
				$idLastInset = array (
						'id' => $entity->getId (),
						'message' => $this->message_insert,
						'type' => 'success' 
				);

			}
		} else {
			
			if ($request->isPost ()) {
				$form->setData ( $request->getPost () );
					$service = $this->getServiceLocator ()->get ( $this->service );
					
					$entity = $service->update ( $request->getPost ()->toArray () );
					$idLastInset = array (
							'id' => $entity->getId (),
							'message' => $this->message_update,
							'type' => 'success' 
					);
			}
		}
		
		$viewModel = new ViewModel ( array (
				'data' => array (
						'id_field' => 'id',
						'id_value' => "" . $idLastInset ['id'] . "",
						'message' => $idLastInset ['message'],
						'type' => $idLastInset ['type'] 
				) 
		) );
		$viewModel->setTerminal ( true );
		return $viewModel;
	}
	
	/**
	 * Verofica vinculos abstract
	 * 
	 * @return \Zend\View\Model\ViewModel
	 */
	public function VerificaVinculosAction() {
		$vinculos = $this->verificaVinculos ( $this->params ()->fromRoute ( 'id', 0 ) );
		$viewModel = new ViewModel ( array (
				'data' => $vinculos 
		) );
		$viewModel->setTerminal ( true );
		return $viewModel;
	}
	
	/**
	 * Deleta abstract
	 * 
	 * @return \Zend\View\Model\ViewModel
	 */
	public function deleteAction() {
		$service = $this->getServiceLocator ()->get ( $this->service );
		if (! $service->delete ( $this->params ()->fromRoute ( 'id', 0 ) ))
			$this->message_delete = "Erro ao tentar excluir";
		
		$viewModel = new ViewModel ( array (
				'data' => $this->message_delete 
		) );
		$viewModel->setTerminal ( true );
		return $viewModel;
	}
	
	/**
	 * Recupera a EntityManager
	 * 
	 * @return \EntityManager;
	 */
	protected function getEm() {
		if (null === $this->em)
			$this->em = $this->getServiceLocator ()->get ( 'Doctrine\ORM\EntityManager' );
		
		$emConfig = $this->em->getConfiguration ();
		$emConfig->addCustomDatetimeFunction ( 'WEEK', 'Oro\ORM\Query\AST\Functions\SimpleFunction' );
		$emConfig->addCustomDatetimeFunction ( 'MONTH', 'Oro\ORM\Query\AST\Functions\SimpleFunction' );
		$emConfig->addCustomDatetimeFunction ( 'DAY', 'Oro\ORM\Query\AST\Functions\SimpleFunction' );
		
		return $this->em;
	}
}