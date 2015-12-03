<?php
return array(
    'doctrine' => array(
        'connection' => array(
            'orm_default' => array(
                'driverClass' => 'Doctrine\DBAL\Driver\PDOMySql\Driver',
                'params' => array(
                    'host'     => 'grupocapitalponto.ce2jbde6be14.sa-east-1.rds.amazonaws.com',
                    'port'     => '3306',
                    'user'     => 'root',
                    'password' => 'namaste1234',
                    'dbname'   => 'senna',
                    'driverOptions' => array(
                        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'UTF8'"
                    )
                )
            )
        )
    ),
);