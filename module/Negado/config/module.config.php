<?php
namespace Negado;
return array(
    'router' => array(
        'routes' => array(
            'negado' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                	'route'    => '/senna/negado',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Negado\Controller',
                        'controller' => 'Index',
                        'action' => 'index'
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type' => 'Segment',
                        'options' => array(
                            'route' => '/[:controller[/:action[/:id][/:nome]]]',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'id' => '\d+',
                                'nome'=>'[a-zA-Z][a-zA-Z0-9_-]*'
                            ),
                            'defaults' => array(
                                '__NAMESPACE__' => 'Negado\Controller',
                                'controller' => 'Index'
                            )
                        )
                    )
                )
            ),
        ),
    ),
    'controllers' => array(
        'invokables' => array(
            'Negado\Controller\Index' => 'Negado\Controller\IndexController'
        ),
    ),
    'view_manager' => array(
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map' => array(
        	'layout/layout'           => __DIR__ . '/../view/layout/negado.phtml',
            'negado/index/index' => __DIR__ . '/../view/negado/index/index.phtml',
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