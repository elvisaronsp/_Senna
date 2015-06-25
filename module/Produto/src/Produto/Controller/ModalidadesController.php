<?php
/**
 * Controller de modalidades
 * @author Jefferson Fernandes
 * @date 28/11/2014
 * @time 20:11:45
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Produto\Controller;
use Senna\Controller\GrudController,Zend\View\Model\ViewModel;

class ModalidadesController extends GrudController
{
	public function __construct()
	{
		$this->entity = "Senna\Entity\Modalidadegrades";
		$this->form = "Produto\Form\Modalidades";
		$this->service = "Senna\Service\Modalidades";
		$this->message_insert = "Modalidade cadastrada com sucesso";
		$this->message_update = "Modalidade atualizada com sucesso";
		$this->message_delete = "Modalidade excluida com sucesso";
		$this->controller = 'Modalidades';
	}
	
	/**
	 * Ações de validação não estão sendo aplcadas ate o momento para modalidade
	 * @param array $post
	 */
	public function acoesValidacaoNegativa($post){
		return true;
	}
	
	/**
	 * Verifica vinculos de unidade de uso com itens de venda
	 * @param integer $id
	 * @return integer
	 */
	public function verificaVinculos($id){
		return "0";
	}
	
	
	/**
	 * Busca todas as  modalidades retorna id e valor 
	 * @return \Zend\View\Model\ViewModel
	 */
	public function getModalidadesAction(){
		
		$request = $this->getRequest ();
		$this->setFiltro($request->getPost ());
		$where = $this->getWhere(array('add','edit','delete'));

		$repository = $this->getEm ()->getRepository ( $this->entity );
		$arrayFilter = $repository->fetchPairs($where);
	
		// Parametros passados para a view
		$view_params = array (
				'data' => $arrayFilter
		);
		$viewModel = new ViewModel ( $view_params );
		$viewModel->setTerminal ( true );
		return $viewModel;
	
	}
	
	/**
	 * Busca todas todos os filhos de uma modalidade
	 * @return array
	 */
	public function getFilhosModalidadeAction(){
		$repository = $this->getEm ()->getRepository ( $this->entity );
		$arrayFilter = $repository->getChildren($this->params ()->fromRoute ( 'id', 0 ));
	
		// Parametros passados para a view
		$view_params = array (
				'data' => $arrayFilter
		);
		$viewModel = new ViewModel ( $view_params );
		$viewModel->setTerminal ( true );
		return $viewModel;
	
	}
	

	
	
}