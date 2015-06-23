<?php

namespace Acl\Form;

use Zend\Form\Form,
    Zend\Form\Element\Select;

class Privilege extends Form {
    
    protected $roles;
    protected $resources;
    protected $acessos;

    public function __construct($name = null, array $roles = null, array $resources = null,array $acessos = null) {
        parent::__construct($name);
        $this->roles = $roles;
        $this->resources = $resources;
        $this->acessos = $acessos;

        $this->setAttribute('method', 'post');

        $id = new \Zend\Form\Element\Hidden('id');
        $this->add($id);

        $acesso = new Select();
        $acesso->setLabel("Oque posso fazer: ")
            ->setName("acesso")
            ->setOptions(array('value_options' => $acessos));
        $this->add($acesso);
        
        $role = new Select();
        $role->setLabel("Quem pode fazer: ")
                ->setName("role")
                ->setOptions(array('value_options' => $roles));
        $this->add($role);
        
        $resource = new Select();
        $resource->setLabel("Onde posso fazer: ")
                ->setName("resource")
                ->setOptions(array('value_options' => $resources));
        $this->add($resource);
        
        $this->add(array(
            'name' => 'submit',
            'type' => 'Zend\Form\Element\Submit',
            'attributes' => array(
                'value' => 'Salvar',
                'class' => 'btn-success'
            )
        ));
    
        
    }

}
