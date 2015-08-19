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
 * View Helper
 */
class PermissaoUsuario extends AbstractHelper implements ServiceLocatorAwareInterface {
    /**
     * Set the service locator.
     *
     * @param ServiceLocatorInterface $serviceLocator
     * @return CustomHelper
     */
    public function setServiceLocator(ServiceLocatorInterface $serviceLocator) {
        $this->serviceLocator = $serviceLocator;
        return $this;
    }

    /**
     * Get the service locator.
     *
     * @return \Zend\ServiceManager\ServiceLocatorInterface
     */
    public function getServiceLocator() {
        return $this->serviceLocator;
    }

    public function __invoke($role,$resource,$privilege) {
        $acl = $this->getServiceLocator()->getServiceLocator()->get('Acl\Permissions\Acl');
        return $acl->isAllowed($role,$resource,$privilege)?true:false;
    }
}

