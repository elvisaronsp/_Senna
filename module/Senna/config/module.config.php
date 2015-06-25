<?php
namespace Senna;
return array(
    'router' => array(
        'routes' => array(
            'senna' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/senna',
                    'defaults' => array(
                        'controller' => 'Senna\Controller\Index',
                        'action'     => 'index',
                    ),
                ),
            ),
        		'acesso-restrito' => array(
        				'type' => 'Segment',
        				'options' => array(
        						'route'    => 'senna/[:controller[/:action]][/:id]',
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
            'Senna\Controller\Index' => 'Senna\Controller\IndexController'
        ),
    ),
	'module_layouts' => array(
			'Senna' => 'layout/senna',
			'Application'=>'layout/application',
			'Negado'=>'layout/negado'

	),
    'view_manager' => array(
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map' => array(
            'layout/layout'           => __DIR__ . '/../view/layout/senna.phtml',
            'layout/menu_int_cadastros'           => __DIR__ . '/../view/layout/menu_int_cadastros.phtml',
            'layout/menu_int_cadastros_financeiros'           => __DIR__ . '/../view/layout/menu_int_cadastros_financeiros.phtml',
            'layout/menu_int_cadastros_servicos'           => __DIR__ . '/../view/layout/menu_int_cadastros_servicos.phtml',
            'layout/menu_int_compras'           => __DIR__ . '/../view/layout/menu_int_compras.phtml',
            'layout/menu_int_consultas'           => __DIR__ . '/../view/layout/menu_int_consultas.phtml',
            'layout/menu_int_loja_virtual'           => __DIR__ . '/../view/layout/menu_int_loja_virtual.phtml',
            'layout/menu_int_movimentacoes'           => __DIR__ . '/../view/layout/menu_int_movimentacoes.phtml',
            'layout/menu_int_preferencias'           => __DIR__ . '/../view/layout/menu_int_preferencias.phtml',
            'layout/menu_int_produtos'           => __DIR__ . '/../view/layout/menu_int_produtos.phtml',
            'layout/menu_int_tributacao'           => __DIR__ . '/../view/layout/menu_int_tributacao.phtml',
        	'layout/menu_int_usuarios_vendedores'           => __DIR__ . '/../view/layout/menu_int_usuarios_vendedores.phtml',
            'senna/index/index' => __DIR__ . '/../view/senna/index/index.phtml',
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
