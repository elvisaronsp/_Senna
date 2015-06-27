<?php

namespace Acl;
class Module
{
    public function getConfig()
    {
        return include __DIR__ . '/config/module.config.php';
    }

    public function getAutoloaderConfig()
    {
        return array(
            'Zend\Loader\StandardAutoloader' => array(
                'namespaces' => array(
                    __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                ),
            ),
        );
    }

    public function getServiceConfig()
    {
        return array(
            'factories' => array(
                'Acl\Service\Perfis' => function($sm){
                    return new Service\Perfis($sm->get('Doctrine\ORM\Entitymanager'));
                },
                'Acl\Form\Perfis' => function($sm)
                {
                    return new Form\Perfis();
                },
            ),
        );
    }
}
