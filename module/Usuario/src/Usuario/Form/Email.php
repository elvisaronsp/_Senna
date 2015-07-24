<?php

namespace Usuario\Form;

use Zend\Form\Form;

/**
 * Class Email
 * @package Usuario\Form
 */
class Email  extends Form
{
    public function __construct($name = null, $options = array()) {
        parent::__construct('Email', $options);
        $this->setAttribute('method', 'post');

        // input senha de usuario
        $input = new \Zend\Form\Element\Email("email");
        $input->setAttribute('id', "email")
            ->setAttribute('placeholder', "Digite seu email")
            ->setAttribute('class', "form-control")
            ->setValue("");
        $this->add($input);

    }

    public function clear($form)
    {
        $form->setData(array('email'=>''));
    }
}
