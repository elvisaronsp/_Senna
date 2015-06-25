<?php
return array(
    'modules' => array(
        'DoctrineModule',
        'DoctrineORMModule',
        'DoctrineDataFixtureModule',
        'Application',
        'Inicio',
        'Senna',
        'Produto',
        'Ancoras',
        'Negado',
        'Cadastro',
        'Usuario',
        #'Util',
        'Acl'
    ),
    'module_listener_options' => array(
        'module_paths' => array(
            './module',
            './vendor',
        ),
        'config_glob_paths' => array(
            'config/autoload/{,*.}{global,local}.php',
        ),
    ),
);
