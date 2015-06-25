<?php
namespace Inicio;
return array(
    'router' => array(
        'routes' => array(
            'inicio' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                	'route'    => '/senna/inicio',
                    'defaults' => array(
                        'controller' => 'Inicio\Controller\Index',
                        'action'     => 'index',
                    ),
                ),
            ),
        	
        		'inicio-dashnoard' => array(
        				'type' => 'Segment',
        				'options' => array(
        						'route'    => '/senna/inicio/[:controller[/:action]]',
        						'defaults' => array(
        								'action'     => 'index',
        								
        						),
        				),
        		),
        ),
    ),
    'controllers' => array(
        'invokables' => array(
            'Inicio\Controller\Index' => 'Inicio\Controller\IndexController',
        	'DashBoard' => 'Inicio\Controller\DashBoardController'
        ),
    ),
    'view_manager' => array(
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map' => array(
        	'layout/layout'           => __DIR__ . '/../view/layout/inicio.phtml',
            'inicio/index/index' => __DIR__ . '/../view/inicio/index/index.phtml',
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
