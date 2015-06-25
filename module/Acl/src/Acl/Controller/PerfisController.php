<?php
/**
 * Created by PhpStorm.
 * User: Jefferson
 * Date: 25/06/2015
 * Time: 15:03
 */

namespace Acl\Controller;

use Zend\Mvc\Controller\AbstractActionController,
    Zend\View\Model\ViewModel;

class PerfisController extends AbstractActionController {

    public function indexAction() {

        $viewModel = new ViewModel(array());
        $viewModel->setTerminal(true);
        return $viewModel;

    }

}