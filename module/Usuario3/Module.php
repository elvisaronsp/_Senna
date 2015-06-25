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

    public function init(ModuleManager $moduleManager)
    {
        $sharedEvents = $moduleManager->getEventManager()->getSharedManager();

        $sharedEvents->attach("Zend\Mvc\Controller\AbstractActionController",
            MvcEvent::EVENT_DISPATCH,
            array($this,'validaAuth'),100);
    }

    public function validaAuth($e)
    {
        $auth = new AuthenticationService;
        $auth->setStorage(new SessionStorage("Usuario"));


        $controller = $e->getTarget();
        $matchedRoute = $controller->getEvent()->getRouteMatch()->getMatchedRouteName();

        if(!$auth->hasIdentity() and ($matchedRoute == "usuario-admin" OR $matchedRoute == "usuario-admin/paginator")){
                return $controller->redirect()->toRoute("usuario-auth");
        }
        if($auth->hasIdentity() and $matchedRoute == "usuario-auth" ){
            return $controller->redirect()->toRoute("usuario-admin");
        }

    }


    public function getServiceConfig()
    {
        return array(
            'factories' => array(
                'Usuario\Form\Usuario' => function($sm)
                {

                    $em = $sm->get('Doctrine\ORM\EntityManager');

                    $repoRoles= $em->getRepository('Acl\Entity\Role');

                    $roles = $repoRoles->fetchPairs();

                    return new Form\Usuario("usuario", $roles);
                },
                'Usuario\Mail\Transport' => function($sm) {
                    $config = $sm->get('Config');

                    $transport = new SmtpTransport;
                    $options = new SmtpOptions($config['mail']);
                    $transport->setOptions($options);

                    return $transport;
                },
                'Usuario\Service\Usuario' => function($sm) {
                    return new Service\Usuario($sm->get('Doctrine\ORM\EntityManager'),
                        $sm->get('Usuario\Mail\Transport'),
                        $sm->get('View'));
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
                // a chave do array aqui é o nome pelo qual você
                // chamará o seu view helper no script da view
                'UserIdentity' => function() {
                    return new View\Helper\UserIdentity();
                },
                'PermissaoUsuario' => function() {
                    return new View\Helper\PermissaoUsuario();
                },

            ),
        );
    }





}
