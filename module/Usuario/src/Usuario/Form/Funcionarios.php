<?php
namespace Usuario\Form;
use Zend\Form\Form;

/**
 * Class Funcionarios
 * @package Usuario\Form
 */
class Funcionarios extends Form
{
    private $recursos;

    /**
     * @param array $recursos
     */
    public function __construct(array $recursos = null)
    {
        $this->recursos = $recursos;
        parent::__construct('funcionarios');
        $this->setAttributes ( array (
            'method' => 'post',
            'class' => 'form',
            'id' => 'form'
        ) );

    }
}
