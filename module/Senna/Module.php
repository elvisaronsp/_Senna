<?php

namespace Senna;

use Zend\Mvc\ModuleRouteListener;
use Zend\Mvc\MvcEvent;

use Produto\Form\ClassesProdutos as classFrm;
use Senna\Service\ClassesProdutos as ClassesProdutoService;
use Senna\Service\SubClassesProdutos as SubClassesProdutosService;

use Produto\Form\UnidadesMedida as unidadesMedidaFRM;
use Senna\Service\UnidadesMedida as UnidadesMedidaService;

use Produto\Form\Modalidades as ModalidadesFRM;


use Produto\Form\Produtos as ProdutosFRM;
use Senna\Service\Modalidades as ModalidadesService;
use Senna\Service\Produtos as ProdutosService;

use Senna\Service\Empresa as EmpresaService;
use Cadastro\Form\Empresa as EmpresaFRM;

use Senna\Service\Funcionarios as FuncionariosService;
use Usuario\Form\Funcionarios as FuncionariosFRM;


class Module {
	
	public function onBootstrap(MvcEvent $e)
	{
		$eventManager        = $e->getApplication()->getEventManager();
		$moduleRouteListener = new ModuleRouteListener();
		$moduleRouteListener->attach($eventManager);
		
		$e->getApplication()->getEventManager()->getSharedManager()->attach('Zend\Mvc\Controller\AbstractActionController', 'dispatch', function($e)
		{
			$controller = $e->getTarget();
			$controllerClass = get_class($controller);
			$moduleNamespace = substr($controllerClass, 0, strpos($controllerClass, '\\'));
			$config = $e->getApplication()->getServiceManager()->get('config');
			if (isset($config['module_layouts'][$moduleNamespace])) {
				$controller->layout($config['module_layouts'][$moduleNamespace]);
			}
		}, 100);
		
	}
	
	public function getConfig() {
		return include __DIR__ . '/config/module.config.php';
	}
	public function getAutoloaderConfig() {
		return array (
				'Zend\Loader\StandardAutoloader' => array (
						'namespaces' => array (
								__NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__ 
						) 
				) 
		);
	}
	public function getServiceConfig() {
		
		return array('factories'=>array(
			'Produto\Form\ClassesProdutos'=>function($service){
				$em = $service->get('Doctrine\ORM\EntityManager');
				$repository = $em->getRepository('Senna\Entity\Classesprodutos');
				$classesprodutos = $repository->fetchPairs();
				return new classFrm(null,$classesprodutos);
			},
			'Produto\Form\UnidadesMedida'=>function($service){
				return new unidadesMedidaFRM();
			},
			'Senna\Service\ClassesProdutos'=>function ($service){
				return new ClassesProdutoService($service->get('Doctrine\ORM\EntityManager'));
			},
			'Senna\Service\UnidadesMedida'=>function ($service){
				return new UnidadesMedidaService($service->get('Doctrine\ORM\EntityManager'));
			},
			'Senna\Service\SubClassesProdutos'=>function ($service){
				return new SubClassesProdutosService($service->get('Doctrine\ORM\EntityManager'));
			},
			'Produto\Form\Modalidades'=>function($service){
				return new ModalidadesFRM();
			},
			'Senna\Service\Modalidades'=>function ($service){
				return new ModalidadesService($service->get('Doctrine\ORM\EntityManager'));
			},
			'Produto\Form\Produtos'=>function($service){
			
				$em = $service->get('Doctrine\ORM\EntityManager');
				$repository = $em->getRepository('Senna\Entity\Unidadesmedida');
				
				$unidadePadrao = $repository->buscarUnidadePadrao();
				return new ProdutosFRM(null,$unidadePadrao);
			},
			'Senna\Service\Produtos'=>function ($service){
				return new ProdutosService($service->get('Doctrine\ORM\EntityManager'));
			},
			'Cadastro\Form\Empresa'=>function($service){
				return new EmpresaFRM();
			},
			'Senna\Service\Empresa'=>function ($service){
				return new EmpresaService($service->get('Doctrine\ORM\EntityManager'));
			},

			'Usuario\Form\Funcionarios'=>function($service){
				return new FuncionariosFRM();
			},
			'Senna\Service\Funcionarios'=>function ($service){
				return new FuncionariosService($service->get('Doctrine\ORM\EntityManager'));
			},

		));
	}
}
