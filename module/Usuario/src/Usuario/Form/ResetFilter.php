<?php

namespace Usuario\Form;

use Zend\InputFilter\InputFilter;

class ResetFilter  extends InputFilter
{
    
    public function __construct() 
    {
        $this->add(array(
            'name'=>'senha',
            'required'=>true,
            'filters' => array(
                array('name'=>'StripTags'),
                array('name'=>'StringTrim'),
            ),
            'validators' => array(
                array('name'=>'NotEmpty',
                    'options'=>array('messages'=>array('isEmpty'=>'Você precisa criar uma nova senha.')))
            )
        ));
        
        $this->add(array(
            'name'=>'confirmacaoSenha',
            'required'=>true,
            'filters' => array(
                array('name'=>'StripTags'),
                array('name'=>'StringTrim'),
            ),
            'validators' => array(
                array('name'=>'NotEmpty','options'=>array('messages'=>array('isEmpty'=>'Você precisa criar uma nova senha.')),
                    'name' => 'Identical',
                    'options'=>array('token'=>'senha','messages'=>array('isEmpty'=>'Senhas digitadas não correspondem.'))
                )
            )
        ));
    }
}
