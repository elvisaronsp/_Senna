<?php

namespace Usuario\Form;

use Zend\Form\Form,
    Zend\Form\Element\Select;

class Usuario  extends Form
{

    public function __construct($name = null,array $perfis = null) {
        parent::__construct($name);
        
        $this->setInputFilter(new UsuarioFilter());
        $this->setAttribute('method', 'post');
        
        $id = new \Zend\Form\Element\Hidden('id');
        $this->add($id);
        
        $nome = new \Zend\Form\Element\Text("nome");
        $nome->setLabel("Nome: ")
                ->setAttribute('placeholder','Entre com o nome');
        $this->add($nome);
       
        $email = new \Zend\Form\Element\Text("email");
        $email->setLabel("Email: ")
                ->setAttribute('placeholder','Entre com o Email');
        $this->add($email);

        $perfil = new Select();
        $perfil->setLabel("Perfil:")
            ->setName("perfil")
            ->setOptions(array('value_options' => $perfis));
        $this->add($perfil);

        $senha = new \Zend\Form\Element\Password("senha");
        $senha->setLabel("Password: ")
                ->setAttribute('placeholder','Entre com a senha');
        $this->add($senha);
        
        $confirmation = new \Zend\Form\Element\Password("confirmation");
        $confirmation->setLabel("Redigite: ")
                ->setAttribute('placeholder','Redigite a senha');
        $this->add($confirmation);
        
        $csrf = new \Zend\Form\Element\Csrf("security");
        $this->add($csrf);
        
        $this->add(array(
            'name' => 'submit',
            'type'=>'Zend\Form\Element\Submit',
            'attributes' => array(
                'value'=>'Salvar',
                'class' => 'btn-success'
            )
        ));
                
       
    }
    
}
