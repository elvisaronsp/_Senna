<?php

namespace Usuario;

return array(
    'router' => array(
        'routes' => array(
            '***' => array(
                'type' => 'Literal',
                'options' => array(
                    'route' => '/registro',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Usuario\Controller',
                        'controller' => 'Index',
                        'action' => 'registro',
                    )
                )
            ),
        )
    ),
    'controllers' => array(
        'invokables' => array(
            'Usuario\Controller\Index' => 'Usuario\Controller\IndexController',
        )
    ),
    'view_manager' => array(
        'display_not_found_reason' => true,
        'display_exceptions' => true,
        'doctype' => 'HTML5',
        'not_found_template' => 'error/404',
        'exception_template' => 'error/index',
        'template_map' => array(
            'layout/layout' => __DIR__ . '/../view/layout/usuario.phtml',
            'error/404' => __DIR__ . '/../view/error/404.phtml',
            'error/index' => __DIR__ . '/../view/error/index.phtml',
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
        'fixture' => array(
            'Usuario_fixture' => __DIR__ . '/../src/Usuario/Fixture',
        ),
    ),
);