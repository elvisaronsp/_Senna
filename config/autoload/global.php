<?php

return array(
    'mail' => array(
        "name" => "kingHost",
        "host" => "smtpi.kinghost.net",
        "port" => 587,
        "connection_class" => "login",
        'connection_config' => array(
            "username" => "no_reply@grupocapitalponto.com.br",
            "password" => "namaste1234",
            'from' => 'no_reply@grupocapitalponto.com.br',
            'ssl' => 'tls',
        )
    )
);
