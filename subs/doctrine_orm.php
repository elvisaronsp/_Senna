<?php
return array(
    'doctrine' => array(
        'connection' => array(
            'orm_default' => array(
                'driverClass' => 'Doctrine\DBAL\Driver\PDOMySql\Driver',
                'params' => array(
                    'host'     => 'mysql.grupocapitalponto.com.br',
                    #'host'     => '192.168.1.10',
                    'port'     => '3306',
                    'user'     => 'grupocapitalpo',
                    #'user'     => 'root',
                    'password' => 'kamilabk',
                    #'password' => 'dalca1154',
                    'dbname'   => 'grupocapitalpo',
                    #'dbname'   => '_dalcatech',
                    'driverOptions' => array(
                        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'UTF8'"
                    )
                )
            )
        )
    ),
);