<?php
namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController,
    Zend\View\Model\ViewModel;

/**
 * Class IndexController
 * @package Application\Controller
 */
class IndexController extends AbstractActionController
{
    public function indexAction()
    {
        $form = $this->getServiceLocator()->get('Usuario\Form\Login');
        $email = $this->getServiceLocator()->get('Usuario\Form\Email');
        return new ViewModel(array('form'=>$form,'email'=>$email,'login'=>true));
    }
}
