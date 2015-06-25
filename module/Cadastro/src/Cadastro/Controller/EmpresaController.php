<?php
/**
 * Controller de empresa
 * @author Jefferson Fernandes
 * @date 16/02/2015
 * @time 12:23:00
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Cadastro\Controller;
use Senna\Controller\GrudController,
	Zend\View\Model\ViewModel;

class EmpresaController extends GrudController
{
	/**
	 * Construtor
	 */
	public function __construct()
	{
		$this->entity = "Senna\Entity\Empresa";
		$this->form = "Cadastro\Form\Empresa";
		$this->service = "Senna\Service\Empresa";
		$this->message_insert = "Empresa cadastrada com sucesso";
		$this->message_update = "Empresa atualizada com sucesso";
		$this->message_delete = "Empresa excluida com sucesso";
		$this->controller = 'Empresa';
	}
	
	/**
	 * Ações de validação para empresa
	 * @param array $post
	 */
	public function acoesValidacaoNegativa($post){
		return true;
	}
	
	/**
	 * Verifica vinculos de empresas
	 * @param integer $id
	 * @return integer
	 */
	public function verificaVinculos($id){
		return "0";
	}
}