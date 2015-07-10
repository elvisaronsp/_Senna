<?php
namespace Usuario\Controller;
use Zend\Mvc\Controller\AbstractActionController,
    Zend\View\Model\ViewModel;


/**
 * Class IndexController
 * @package Usuario\Controller
 */
class IndexController extends AbstractActionController
{
    /**
     * @return ViewModel
     */
    public function ativacaoAction()
    {
        $viewModel =  new ViewModel();
        $viewModel->setTerminal ( true );
        return $viewModel;
    }
}