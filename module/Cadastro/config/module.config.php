<?php
namespace Cadastro;
return array(
    'router' => array(
        'routes' => array(
            'senna-cadastro' => array(
                'type' => 'Literal',
                'options' => array(
                    'route' => '/senna/cadastro',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Cadastro\Controller',
                        'controller' => 'Index',
                        'action' => 'index'
                    )
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type' => 'Segment',
                        'options' => array(
                            'route' => '/[:controller[/:action[/:id][/:nome]]]',
                            'defaults' => array(
                                '__NAMESPACE__' => 'Cadastro\Controller',
                                'controller' => 'Index'
                            )
                        )
                    ),
                    'paginator' => array(
                        'type' => 'Segment',
                        'options' => array(
                            'route' => '/[:controller[/page/:page]]',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'page' => '[a-zA-Z][a-zA-Z0-9_-]*-'
                            ),
                            'defaults' => array(
                                '__NAMESPACE__' => 'Cadastro\Controller',
                                'controller' => 'Index'
                            )
                        )
                    )
                )
            ),
        )
    ),
    'controllers' => array(
        'invokables' => array(
            'Cadastro\Controller\Index' => 'Cadastro\Controller\IndexController',
            'Cadastro\Controller\Endereco' => 'Cadastro\Controller\EnderecoController',
            'Cadastro\Controller\Util' => 'Cadastro\Controller\UtilController',
        ),
    ),
    'view_manager' => array(
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map' => array(
        	'layout/layout'           => __DIR__ . '/../view/layout/cadastro.phtml',
            'cadastro/index/index' => __DIR__ . '/../view/cadastro/index/index.phtml',
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
