<?php
namespace Produto;
return array(
    'router' => array(
        'routes' => array(
            'produto' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                	'route'    => '/senna/produto',
                    'defaults' => array(
                        'controller' => 'Produto\Controller\Index',
                        'action'     => 'index',
                    ),
                ),
            ),
        	
        		'classes-produto' => array(
        				'type' => 'Segment',
        				'options' => array(
        						'route'    => '/senna/produto/[:controller[/:action]][/:id][/:name]',
        						'defaults' => array(
        								'action'     => 'index',
        								//'page'=>'1'
        						),
        				),
        		),
        ),
    ),
    'controllers' => array(
        'invokables' => array(
            'Produto\Controller\Index' => 'Produto\Controller\IndexController',
        			 'classesprodutos' => 'Produto\Controller\ClassesProdutosController',
        				  'unidadeuso' => 'Produto\Controller\UnidadeUsoController',
        					'produtos' => 'Produto\Controller\ProdutosController',
        					'estoques'=>"Produto\Controller\EstoquesController",
        					'estoquesitens'=>"Produto\Controller\ItensVendaEstoqueController",
        					'modalidades'=>"Produto\Controller\ModalidadesController",
        					'imagem'=>"Produto\Controller\ImagemController"

        ),
    ),
    'view_manager' => array(
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map' => array(
        	'layout/layout'           => __DIR__ . '/../view/layout/produto.phtml',
            'produto/index/index' => __DIR__ . '/../view/produto/index/index.phtml',
        	'produto/produtos/tab_item'           => __DIR__ . '/../view/produto/produtos/tab_item.phtml',
            'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',
        ),
        'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
    ),
	'doctrine' => array(
			'driver' => array(
					__NAMESPACE__ . '_driver' => array(
							'class' => 'Doctrine\ORM\Mapping\Driver\AnnotationDriver',
							'cache' => 'array',
							'paths' => array(__DIR__ . '/../src/' . __NAMESPACE__ . '/Entity')
					),
					'orm_default' => array(
							'drivers' => array(
									__NAMESPACE__ . '\Entity' => __NAMESPACE__ . '_driver'
							),
					),
			),
	),
    // Placeholder for console routes
    'console' => array(
        'router' => array(
            'routes' => array(
            ),
        ),
    ),
);
