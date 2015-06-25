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

class UnidadeUsoController extends GrudController
{
	public function __construct()
	{
		$this->entity = "Senna\Entity\Unidadesmedida";
		$this->form = "Produto\Form\UnidadesMedida";
		$this->service = "Senna\Service\UnidadesMedida";
		$this->message_insert = "Unidade de uso cadastrada com sucesso";
		$this->message_update = "Unidade de uso atualizada com sucesso";
		$this->message_delete = "Unidade de uso excluida com sucesso";
		$this->controller = 'Unidadesmedida';
		
		
	}
	
	/**
	 * Atializa para zero a flag padrao quando outra unidade quizer ser padrao
	 * @param array $post
	 */
	public function acoesValidacaoNegativa($post){
		$repository = $this->getEm ()->getRepository ( $this->entity );		
		$entity = $repository->findAll();
		foreach($entity as $em):
			if($em->getPadrao() =="1")
				$idpadrao = $em->getId();
		endforeach;
		$entity = $repository->find($idpadrao);
		$entityArray = $entity->toArray();
		$entityArray['padrao']="0";	
		$service = $this->getServiceLocator ()->get ( $this->service );
		$entity = $service->update ( $entityArray );
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
	 * Busca de unidades de medida por like
	 * @return \Zend\View\Model\ViewModel
	 */
	public function getUnidadesAction(){
	
		// Captura URL
		$url = $this->getRequest()->getPost ();
		$this->setFiltro($url);
		$where = $this->getWhere(array('add','edit','delete'));

		$repository = $this->getEm()->getRepository ('Senna\Entity\Unidadesmedida');
		$arrayFilter = $repository->getLike($where);
	
		// Parametros passados para a view
		$view_params = array (
			'data' => $arrayFilter
		);
		$viewModel = new ViewModel ( $view_params );
		$viewModel->setTerminal ( true );
		return $viewModel;
	}
	
	/**
	 * Retorna os dados de determinada unidade de uso pelo id
	 * @return \Zend\View\Model\ViewModel
	 */
	public function getAction(){

		if ($this->params ()->fromRoute ( 'id', 0 ))
			{
			$repository = $this->getEm ()->getRepository ( 'Senna\Entity\Unidadesmedida' );
			$arrayFilter = $repository->getbyId ( $this->params ()->fromRoute ( 'id', 0 ) );
			}
	
		// Parametros passados para a view
		$view_params = array (
				'data' => $arrayFilter
		);
		$viewModel = new ViewModel ( $view_params );
		$viewModel->setTerminal ( true );
		return $viewModel;
	
	}
	
}