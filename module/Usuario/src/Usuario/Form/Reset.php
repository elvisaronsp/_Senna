<?php

namespace Usuario\Form;

use Zend\Form\Form;

class Reset  extends Form
{
    public function __construct($name = null, $options = array()) {
        parent::__construct('Reset', $options);
        $this->setAttribute('method', 'post');

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('chaveAtivacao');
        $hidden->setAttribute('id', "chaveAtivacao")
            ->setValue("");
        $this->add($hidden);

        // input senha de usuario
        $input = new \Zend\Form\Element\Password("senha");
        $input->setAttribute('id', "senha")
            ->setAttribute('placeholder', "Digite sua nova senha")
            ->setAttribute('class', "form-control")
            ->setAttribute('autofocus', "autofocus")
            ->setAttribute('autocomplete', "off")
            ->setValue("");
        $this->add($input);

        // input confirmar senha de usuario
        $input = new \Zend\Form\Element\Password("confirmacaoSenha");
        $input->setAttribute('id', "confirmacaoSenha")
            ->setAttribute('placeholder', "Confirrme sua nova senha")
            ->setAttribute('class', "form-control")
            ->setAttribute('autocomplete', "off")
            ->setValue("");
        $this->add($input);

        // button Entrar
        $button = new \Zend\Form\Element\Button("salvar");
        $button->setAttribute("id","salvar")
            ->setAttribute('type','submit')
            ->setAttribute('class', "btn btn-block btn-primary")
            ->setLabel("Salvar nova senha");
        $this->add($button);
    }

    public function clear($form)
    {
        $form->setData(array('senha'=>'','confirmacaoSenha'=>'','confirmacaoSenha'=>''));
    }
}
