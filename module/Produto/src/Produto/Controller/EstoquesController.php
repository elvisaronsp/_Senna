<?php
/**
 * Controller de estoques
 * @author Jefferson Fernandes
 * @date 21/11/2014
 * @time 20:35:01
 * @project_name  Senna -- Grupo Capital Ponto
 */

namespace Produto\Controller;
use Senna\Controller\GrudController;


class EstoquesController extends GrudController
{
	public function __construct()
	{
		$this->entity = "Senna\Entity\Estoques";
		$this->controller = 'Estoques';
	}
	
	
}