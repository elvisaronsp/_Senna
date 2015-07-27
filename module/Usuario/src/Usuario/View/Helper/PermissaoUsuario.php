<?php
namespace Usuario\View\Helper;

/**
 * Created by PhpStorm.
 * User: Jefferson
 * Date: 24/06/2015
 * Time: 12:31
 */

use Zend\View\Helper\AbstractHelper;
use Zend\ServiceManager\ServiceLocatorAwareInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

/**
 * Class PermissaoUsuario
 * @package Usuario\View\Helper
 */
class PermissaoUsuario extends AbstractHelper implements ServiceLocatorAwareInterface {

    /**
     * Set the service locator.
     *
     * @param ServiceLocatorInterface $serviceLocator
     * @return CustomHelper
     */
    public function setServiceLocator(ServiceLocatorInterface $serviceLocator)
    {
        $this->serviceLocator = $serviceLocator;
        return $this;
    }

    /**
     * Get the service locator.
     *
     * @return \Zend\ServiceManager\ServiceLocatorInterface
     */
    public function getServiceLocator()
    {
        return $this->serviceLocator;
    }

    /**
     * @param $perfil
     * @param $recurso
     * @param $privilegio
     * @return bool
     */
    public function __invoke($perfil,$recurso,$privilegio)
    {
        $acl = $this->getServiceLocator()->getServiceLocator()->get('Acl\Permissoes\Acl');
        return $acl->isAllowed($perfil,$recurso,$privilegio)?true:false;
    }
}

