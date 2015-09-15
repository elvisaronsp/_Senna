<?php
/**
 * Service Unidades de Medida
 * @author Jefferson Fernandes
 * @date 18/11/2014
 * @time 20:38:58
 * @project_name  Senna -- Grupo Capital Ponto
 */
namespace Senna\Service;
use Doctrine\ORM\EntityManager;

class UnidadesMedida extends AbstractService
{
	public function __construct(EntityManager $em)
	{
		parent::__construct($em);
		$this->entity = "Senna\Entity\Unidadesmedida"; 		
	}
	
	
}