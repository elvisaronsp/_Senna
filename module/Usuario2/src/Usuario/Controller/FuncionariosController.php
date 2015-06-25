<?php
/**
 * Controller de empresa
 * @author Jefferson Fernandes
 * @date 16/02/2015
 * @time 19:31:00
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Usuario\Controller;
use Senna\Controller\GrudController,
	Zend\View\Model\ViewModel;

class FuncionariosController extends GrudController
{
	/**
	 * Construtor
	 */
	public function __construct()
	{
		$this->entity = "Senna\Entity\Usuario";
		$this->form = "Usuario\Form\Usuario";
		$this->service = "Senna\Service\Usuario";
		$this->message_insert = "Funcionario cadastrada com sucesso";
		$this->message_update = "Funcionario atualizada com sucesso";
		$this->message_delete = "Funcionario excluida com sucesso";
		$this->controller = 'Usuario';
	}

	/**
	 * Ações de validação para funcionario
	 * @param array $post
	 * @return bool
	 */
	public function acoesValidacaoNegativa($post){
		return true;
	}
	
	/**
	 * Verifica vinculos de funcionario
	 * @param integer $id
	 * @return integer
	 */
	public function verificaVinculos($id){
		return "0";
	}

	/**
	 * Carrega formulario da pagina
	 * @return ViewModel
	 */
	public function FormAction() {
		//$form = $this->getServiceLocator ()->get ( $this->form );
		//$repository = $this->getEm ()->getRepository ( $this->entity );
		//if ($this->params ()->fromRoute ( 'id', 0 )) {
		//	$entity = $repository->find ( $this->params ()->fromRoute ( 'id', 0 ) );
	//		$form->setData ( $entity->toArray () );
	//	}

		$viewModel = new ViewModel (  );
		$viewModel->setTerminal ( true );
		return $viewModel;
	}



}