<?php
return array(
		'doctrine' => array(
				'connection' => array(
						'orm_default' => array(
								'driverClass' => 'Doctrine\DBAL\Driver\PDOMySql\Driver',
								'params' => array(
										'host'     => 'mysql.grupocapitalponto.com.br',
										'port'     => '3306',
										'user'     => 'grupocapitalpo',
										'password' => 'kamilabk',
										'dbname'   => 'grupocapitalpo',
										'driverOptions' => array(
												PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'UTF8'"
										)
								)
						)
				)
		),
);