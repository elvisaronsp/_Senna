<?php
/**
 * Controller de itens de venda estoque
 * @author Jefferson Fernandes
 * @date 21/11/2014
 * @time 20:35:56
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Produto\Controller;
use Senna\Controller\GrudController;

class ItensVendaEstoqueController extends GrudController
{
	public function __construct()
	{
		$this->entity = "Senna\Entity\itensvendaestoque";
		$this->controller = 'ItensVendaEstoque';
	}
	
	
}