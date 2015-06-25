<?php
/**
 * Controller unidade de uso
 * @author Jefferson Fernandes
 * @date 15/11/2014
 * @time 18:58:12
 * @project_name  Senna -- Grupo Capital Ponto
 */

namespace Produto\Controller;
use Senna\Controller\GrudController,Zend\View\Model\ViewModel;

class ProdutosController extends GrudController
{
	public function __construct()
	{
		$this->entity = "Senna\Entity\Itensvenda";
		$this->controller = 'Produtos';
		$this->form = "Produto\Form\Produtos";
		$this->service = "Senna\Service\Produtos";
		$this->message_insert = "Produto cadastrado com sucesso";
		$this->message_update = "Produto atualizado com sucesso";
		$this->message_delete = "Produto excluido com sucesso";
	}
	
	/**
	 * Carrega formulario de itens
	 * @see \Senna\Controller\GrudController::FormAction()
	 */
	public function FormAction() {
		$form = $this->getServiceLocator ()->get ( $this->form );
		$repository = $this->getEm ()->getRepository ( $this->entity );
		$form->setData (array('produto__ativo'=>'1') );
		if ($this->params ()->fromRoute ( 'id', 0 ))
		{
			$entity = $repository->find ( $this->params ()->fromRoute ( 'id', 0 ) );
			$form->setData ( $entity->toArray () );
			
			if($entity->getIdSubClassesProdutos()->getId()!="1000")
			{
				$form->setData ( array(
						"produto__id_categoria"=>$entity->getIdSubClassesProdutos()->getId(),
						"ac_049414089535f7737919726a321016f5bde0ec5752"=>$entity->getIdSubClassesProdutos()
				) );
			}
						
			$repository = $this->getEm ()->getRepository ("Senna\Entity\Itensvendaestoque" );
			$entityEstoque = $repository->getEstoqueItem($entity->getId()); 
			
			$form->setData ($entityEstoque );
		}
		

		if(isset($entity)){
			$atributos = $entity->getAtributos();
			$childrens = $entity->getChildren();
			$id = $entity->getId() ;
			$composicao = $entity->getComposicao();
			$image = $entity->getFotoPrincipal() ;

		}else{
			$atributos = null;
			$childrens = null;
			$id = "";
			$composicao = null;
			$image="";
		}

		$viewModel = new ViewModel ( array ('form' => $form	,
											"atributos"=>$atributos,
											"filhos"=>$childrens,
											"id"=>$id,
											"composicao"=>$composicao,
											"image"=>$image
		));
		$viewModel->setTerminal ( true );
		return $viewModel;
	}
	
	/**
	 * Metodo de inset e update de itens de venda
	 * @see \Senna\Controller\GrudController::SaveAction()
	 */
	public function SaveAction() {
		$form = $this->getServiceLocator ()->get ( $this->form);
		$request = $this->getRequest ();
		$post = $request->getPost ();
		$entity = $this->getEm ()->getRepository ( $this->entity );
		$valida = $entity->validePost($post);
	
		if(!$valida)
			$this->acoesValidacaoNegativa($post);
	
		if ($post ['produto__id'] == "") {
	
			if ($request->isPost ()) {
	
				$form->setData ( $request->getPost () );
				if ($form->isValid ()) {
					$service = $this->getServiceLocator ()->get ( $this->service );
					$entity = $service->insert ( $request->getPost ()->toArray () );
					mkdir('./www/images/produtos/'.$entity->getId(), 0777, true);
					$idLastInset = array(
							'id'=>$entity->getId(),
							'message'=>$this->message_insert,
							'type'=>'success'
	
					);
				}
			}
		}else{
			if ($request->isPost ()) {
				$form->setData ( $request->getPost () );
					$service = $this->getServiceLocator ()->get ( $this->service );
					$entity = $service->update ( $request->getPost ()->toArray () );
					$idLastInset = array(
							'id'=>$entity->getId(),
							'message'=>$this->message_update,
							'type'=>'success'
		
					);
			}
		}
	
		$viewModel = new ViewModel ( array (
				'data' => array (
						'id_field' => 'produto__id',
						'id_value' => "" . $idLastInset['id'] . "",
						'message' => $idLastInset['message'],
						'clonar'  => '0',
						'type' => $idLastInset['type']
				)
		)
		);
		$viewModel->setTerminal ( true );
		return $viewModel;
	}
	
	/**
	 * Carrega listagem abstract
	 * @return \Zend\View\Model\ViewModel
	 */
	public function getProdutosAction() {
		
		$repository = $this->getEm ()->getRepository ( $this->entity );
		$arrayFilter = $repository->getProdutosCadastrados($this->params ()->fromRoute ( 'id', 0 ));
		
		// Parametros passados para a view
		$view_params = array (
				'data' => $arrayFilter
		);
		$viewModel = new ViewModel ( $view_params );
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
	
	
	
}