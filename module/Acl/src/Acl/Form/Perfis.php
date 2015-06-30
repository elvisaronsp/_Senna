<?php
namespace Acl\Form;
use Zend\Form\Form;

/**
 * Class Perfis
 * @package Acl\Form
 */
class Perfis extends Form
{
    private $recursos;

    /**
     * @param array $recursos
     */
    public function __construct(array $recursos = null)
    {
        $this->recursos = $recursos;
        parent::__construct('perfis');
        $this->setAttributes ( array (
            'method' => 'post',
            'class' => 'form',
            'id' => 'form'
        ) );

        //<input id="id" name="id" type="hidden" value="2"></input>
        $id = new \Zend\Form\Element\Hidden('id');
        $id->setAttribute('id', "id")
            ->setValue("");
        $this->add($id);

        //<input class=" required" id="nome" name="nome" style="" type="text" value="">
        $nome = new \Zend\Form\Element\Text("nome");
        $nome->setAttribute('id', "")
            ->setAttribute('style', "")
            ->setAttribute('class', "required")
            ->setValue("");
        $this->add($nome);

        ### CHECK BOX ###
        //<input id="permitir_acesso_senna" name="permitir_acesso_senna" rel="1" style="" type="checkbox" value="1"></input>

        foreach ($this->recursos AS $key => $value):
            $this->add(array(
                'type' => 'Checkbox',
                'name' => 'permissaoAcesso_1_'.$value->getId(),
                'options'=>array(
                    'label'=>$value->getNome(),
                    'use_hidden_element' => false
                ),
                'attributes' => array (
                    'id'=>'permissaoAcesso_1_'.$value->getId(),
                    'value'=>'0',
                    'rel'=>'1',
                    'style'=>''
                )
            ));
        endforeach;
    }
}
