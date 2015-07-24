<?php
namespace Usuario;
use Zend\ModuleManager\ModuleManager;
use Zend\Mvc\MvcEvent;
use Zend\Mail\Transport\Smtp as SmtpTransport;
use Zend\Mail\Transport\SmtpOptions as SmtpOptions;

use Zend\Authentication\AuthenticationService,
    Zend\Authentication\Storage\Session as SessionStorage;

use Usuario\Auth\Adapter as AuthAdapter;

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
                'Usuario\Service\Funcionarios' => function($sm){
                    return new Service\Funcionarios($sm->get('Doctrine\ORM\Entitymanager'),
                        $sm->get('Usuario\Mail\Transport'),
                        $sm->get('View'));
                },
                'Usuario\Mail\Transport' => function($sm) {
                    $config = $sm->get('Config');
                    $transport = new SmtpTransport;
                    $options = new SmtpOptions($config['mail']);
                    $transport->setOptions($options);
                    return $transport;
                },
                'Usuario\Form\Funcionarios' => function($sm)
                {
                    return new Form\Funcionarios();
                },
                'Usuario\Form\Login' => function($sm)
                {
                    return new Form\Login();
                },
                'Usuario\Form\Email' => function($sm)
                {
                    return new Form\Email();
                },
                'Usuario\Form\Reset' => function($sm)
                {
                    return new Form\Reset();
                },
                'Usuario\Auth\Adapter' => function($sm){
                    return new AuthAdapter($sm->get('Doctrine\ORM\EntityManager'));
                }
            )
        );

    }

    public function getViewHelperConfig()
    {
        return array(
            'factories' => array(

            ),
        );
    }





}
