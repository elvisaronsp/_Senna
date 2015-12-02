<?php

return array(
    'mail' => array(
        "name" => "kingHost",
        #"host" => "smtpi.kinghost.net",
        "host" => "smtpi.grupocapitalponto.com.br",
        "port" => 587,
        "connection_class" => "login",
        'connection_config' => array(
            "username" => "no_reply@grupocapitalponto.com.br",
            "password" => "namaste1234",
            'from' => 'no_reply@grupocapitalponto.com.br',
            #'ssl' => 'tls',
        )
    ),
    #'mail' => array(
    #    "name" => "LocalWeb",
    #    "host" => "smtp.dalcatech.com.br",
    #    "port" => 587,
    #    "connection_class" => "login",
    #    'connection_config' => array(
    #        "username" => "jefferson@dalcatech.com.br",
    #        "password" => "fernandes1234",
    #        'from' => 'jefferson@dalcatech.com.br',
    #    )
    #)
);
