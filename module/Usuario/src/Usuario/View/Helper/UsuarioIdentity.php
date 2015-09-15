<?php
namespace Usuario\View\Helper;

use Zend\View\Helper\AbstractHelper;
use Zend\Authentication\AuthenticationService,
    Zend\Authentication\Storage\Session as SessionStorage;

/**
 * Class UserIdentity
 * @package Usuario\View\Helper
 */
class UsuarioIdentity extends AbstractHelper {

    protected $authService;

    /**
     * @return mixed
     */
    public function getAuthService() {
        return $this->authService;
    }

    /**
     * @param null $namespace
     * @return bool
     */
    public function __invoke($namespace = null) {
        $sessionStorage = new SessionStorage($namespace);
        $this->authService = new AuthenticationService;
        $this->authService->setStorage($sessionStorage);

        if ($this->getAuthService()->hasIdentity())
        {
            return $this->getAuthService()->getIdentity();
        }
        else
            return false;
    }

}