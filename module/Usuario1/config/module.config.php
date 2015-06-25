<?php
namespace Usuario;
return array(
    'router' => array(
        'routes' => array(
            'usuario' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                	'route'    => '/senna/usuario',
                    'defaults' => array(
                        'controller' => 'Usuario\Controller\Index',
                        'action'     => 'index',
                    ),
                ),
            ),
        	
        		'classes-usuario' => array(
        				'type' => 'Segment',
        				'options' => array(
        						'route'    => '/senna/usuario/[:controller[/:action]][/:id]',
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
            'Usuario\Controller\Index' => 'Usuario\Controller\IndexController',
            'funcionarios' => 'Usuario\Controller\FuncionariosController'

        ),
    ),
    'view_manager' => array(
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map' => array(
        	'layout/layout'           => __DIR__ . '/../view/layout/usuario.phtml',
        	'layout/formBotoes'           => __DIR__ . '/../view/usuario/funcionarios/form/form_botoes.phtml',
            'usuario/index/index' => __DIR__ . '/../view/usuario/index/index.phtml',
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
