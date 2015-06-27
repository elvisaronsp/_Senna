<?php
/**
 * Created by PhpStorm.
 * User: Jefferson
 * Date: 26/06/2015
 * Time: 15:18
 */

namespace Acl\Form;
use Zend\Form\Form;

/**
 * Class Perfis
 * @package Acl\Form
 */
class Perfis extends Form
{

    public function __construct($name = null)
    {
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
    }
}
