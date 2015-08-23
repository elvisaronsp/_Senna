<?php

namespace Clientes\Form;

use Zend\Form\Form;

/**
 * Class Email
 * @package Usuario\Form
 */
class Cliente  extends Form
{
    public function __construct($name = null, $options = array()) {
        parent::__construct('clientes');
        $this->setAttributes(array(
            'method' => 'post',
            'class' => 'form',
            'id' => 'form'
        ));


    }

    public function clear($form)
    {
        $form->setData(array());
    }
}
