<?php

namespace Usuario\Form;

use Zend\Form\Form;

class Login  extends Form
{
    public function __construct($name = null, $options = array()) {
        parent::__construct('Login', $options);
        $this->setAttribute('method', 'post');

        // input login de usuario
        $input = new \Zend\Form\Element\Text("login");
        $input->setAttribute('id', "login")
            ->setAttribute('placeholder', "Digite seu login")
            ->setAttribute('class', "form-control")
            ->setAttribute('autofocus', "autofocus")
            ->setAttribute('autocomplete', "off")
            ->setValue("");
        $this->add($input);


        // input senha de usuario
        $input = new \Zend\Form\Element\Password("senha");
        $input->setAttribute('id', "senha")
            ->setAttribute('placeholder', "Digite sua senha")
            ->setAttribute('class', "form-control")
            ->setValue("");
        $this->add($input);

        // button Entrar
        $button = new \Zend\Form\Element\Button("entrar");
        $button->setAttribute("id","entrar")
            ->setAttribute('type','submit')
            ->setAttribute('class', "btn btn-block btn-primary")
            ->setLabel("Entrar");
        $this->add($button);
    }

    public function clear($form)
    {
        $form->setData(array('login'=>'','senha'=>''));
    }
}
