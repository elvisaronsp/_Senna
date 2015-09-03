<?php

namespace Clientes\Form;

use Zend\Form\Element\Select;
use Zend\Form\Form;

/**
 * Class Cliente
 * @package Clientes\Form
 */
class Cliente extends Form
{
    public function __construct($name = null, $options = array())
    {
        parent::__construct('clientes');
        $this->setAttributes(array(
            'method' => 'post',
            'class' => 'form',
            'id' => 'form'
        ));

        //####### 1º ABA ###########
        /**
         * @element input
         * @type hidden
         * @name [id]
         **/
        $input = new \Zend\Form\Element\Hidden('id');
        $input->setAttribute('id', 'id')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type hidden
         * @name [empresa]
         **/
        $input = new \Zend\Form\Element\Hidden('empresa');
        $input->setAttribute('id', 'empresa')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type radio
         * @name [ativo]
         **/
        $this->add(array(
            'type' => 'radio',
            'name' => 'ativo',
            'attributes' => array(
                'eval' => '1',
            ),
            'options' => array(
                'label_options' => array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '1' => '<span>Sim</span>',
                    '0' => '<span>Não</span>'
                ),
            )
        ));

        /**
         * @element input
         * @type radio
         * @name [tipo]
         **/
        $this->add(array(
            'type' => 'radio',
            'name' => 'tipo',
            'attributes' => array(
                'class' => 'required',
                'eval' => '1',
            ),
            'options' => array(
                'label_options' => array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '1' => '<span>Juridíca</span>',
                    '0' => '<span>Fisca</span>'
                ),
            )
        ));

        /**
         * @element input
         * @type radio
         * @name [origem]
         **/
        $this->add(array(
            'type' => 'radio',
            'name' => 'origem',
            'attributes' => array(
                'class' => 'required',
                'eval' =>'0'
            ),
            'options' => array(
                'label_options' => array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '0' => '<span>Nacional</span>',
                    '1' => '<span>Extrangeira</span>'
                ),
            )
        ));

        /**
         * @element input
         * @type hidden
         * @name [flag_exterior]
         **/
        $input = new \Zend\Form\Element\Hidden('flag_exterior');
        $input->setAttribute('id', 'flag_exterior')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [criadoEm]
         **/
        $input = new \Zend\Form\Element\Text('criadoEm');
        $input->setAttribute('id', 'criadoEm')
            ->setAttribute('class', 'center')
            ->setAttribute('disabled', 'disabled')
            ->setAttribute('mask', '39/19/9999')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type hidden
         * @name [tipocliente]
         **/
        $input = new \Zend\Form\Element\Hidden('tipocliente');
        $input->setAttribute('id', 'tipocliente')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [razaoSocial]
         **/
        $input = new \Zend\Form\Element\Text('razaoSocial');
        $input->setAttribute('id', 'razaoSocial')
            ->setAttribute('class', 'focus required')
            ->setAttribute('maxlength', '60')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [cpf]
         **/
        $input = new \Zend\Form\Element\Text('cpf');
        $input->setAttribute('id', 'cpf')
            ->setAttribute('class', 'cpf')
            ->setAttribute('mask', '999.999.999-99')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [cnpj]
         **/
        $input = new \Zend\Form\Element\Text('cnpj');
        $input->setAttribute('id', 'cnpj')
            ->setAttribute('class', 'search cnpj')
            ->setAttribute('mask', '99.999.999/9999-99')
            ->setAttribute('pstyle', 'width:115px;')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [nomeFantasia]
         **/
        $input = new \Zend\Form\Element\Text('nomeFantasia');
        $input->setAttribute('id', 'nomeFantasia')
            ->setAttribute('maxlength', '255')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [responsavel]
         **/
        $input = new \Zend\Form\Element\Text('responsavel');
        $input->setAttribute('id', 'responsavel')
            ->setAttribute('maxlength', '255')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [identificacaoEstrangeiro]
         **/
        $input = new \Zend\Form\Element\Text('identificacaoEstrangeiro');
        $input->setAttribute('id', 'identificacaoEstrangeiro')
            ->setAttribute('maxlength', '20')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [ie]
         **/
        $input = new \Zend\Form\Element\Text('ie');
        $input->setAttribute('id', 'ie')
            ->setAttribute('maxlength', '16')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type checkbox
         * @name [ieIsento]
         **/
        $this->add(array(
            'type' => 'Checkbox',
            'name' => 'ieIsento',
            'options' => array(
                'label' => '',
                'use_hidden_element' => false
            ),
            'attributes' => array(
                'campo' => 'ie',
                'id' => 'ieIsento',
                'value' => '1',
            )
        ));

        /**
         * @element input
         * @type text
         * @name [im]
         **/
        $input = new \Zend\Form\Element\Text('im');
        $input->setAttribute('id', 'im')
            ->setAttribute('maxlength', '20')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type checkbox
         * @name [imInsento]
         **/
        $this->add(array(
            'type' => 'Checkbox',
            'name' => 'imInsento',
            'options' => array(
                'label' => '',
                'use_hidden_element' => false
            ),
            'attributes' => array(
                'campo' => 'im',
                'id' => 'imInsento',
                'value' => '1',
            )
        ));

        /**
         * @element input
         * @type text
         * @name [codigoCliente]
         **/
        $input = new \Zend\Form\Element\Text('codigoCliente');
        $input->setAttribute('id', 'codigoCliente')
            ->setAttribute('maxlength', '14')
            ->setAttribute('uppercase', 'true')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [email]
         **/
        $input = new \Zend\Form\Element\Text('email');
        $input->setAttribute('id', 'email')
            ->setAttribute('maxlength', '50')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [telefone]
         **/
        $input = new \Zend\Form\Element\Text('telefone');
        $input->setAttribute('id', 'telefone')
            ->setAttribute('maxlength', '14')
            ->setValue('');
        $this->add($input);

        /**
         * @element TextArea
         * @name [observacao]
         **/
        $textarea = new \Zend\Form\Element\Textarea('observacao');
        $textarea->setAttribute('id', 'observacao')
            ->setAttribute('cols', '90')
            ->setAttribute('maxlength', '4000')
            ->setAttribute('rows', '25')
            ->setAttribute('style', 'height:70px;resize:none;')
            ->setValue('');
        $this->add($textarea);

        //####### 2º ABA ###########

        /**
         * @element input
         * @type text
         * @name [rg]
         **/
        $input = new \Zend\Form\Element\Text('rg');
        $input->setAttribute('id','rg')
            ->setAttribute('maxlength','45')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [dataNascimento]
         **/
        $input = new \Zend\Form\Element\Text('dataNascimento');
        $input->setAttribute('id','dataNascimento')
            ->setAttribute('class','date')
            ->setAttribute('mask','39/19/9999')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type radio
         * @name [sexo]
         **/
        $this->add(array(
            'type' => 'radio',
            'name' => 'sexo',
            'attributes' => array(
                'eval'=>'0',
            ),
            'options' => array(
                'label_options' => array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '0' => '<span>Masculino</span>',
                    '1' => '<span>Feminino</span>'
                ),
            )
        ));

        /**
         * @element select
         * @name [rendaMensal]
         **/
        $select = new Select();
        $select->setName("estadoCivil")
            ->setAttribute('id', "estadoCivil")
            ->setAttribute('eval', "1")
            ->setAttribute('size', "1")
            ->setAttribute('style', "")
            ->setOptions(array(
                'value_options' => array(
                    "SOLTEIRO",
                    "CASADO",
                    "DIVIRCIADO",
                    "VIUVO",
                )
            ));
        $this->add($select);

        /**
         * @element input
         * @type text
         * @name [rendaMensal]
         **/
        $input = new \Zend\Form\Element\Text('rendaMensal');
        $input->setAttribute('id','rendaMensal')
            ->setAttribute('number_format','+#.#0,[2,2]')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [profissao]
         **/
        $input = new \Zend\Form\Element\Text('profissao');
        $input->setAttribute('id','profissao')
            ->setAttribute('maxlength','50')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [filiacaoMae]
         **/
        $input = new \Zend\Form\Element\Text('filiacaoMae');
        $input->setAttribute('id','filiacaoMae')
            ->setAttribute('maxlength','255')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [filiacaoPai]
         **/
        $input = new \Zend\Form\Element\Text('filiacaoPai');
        $input->setAttribute('id','filiacaoPai')
            ->setAttribute('maxlength','255')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [conjugeNome]
         **/
        $input = new \Zend\Form\Element\Text('conjugeNome');
        $input->setAttribute('id','conjugeNome')
            ->setAttribute('maxlength','255')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [conjugeCpf]
         **/
        $input = new \Zend\Form\Element\Text('conjugeCpf');
        $input->setAttribute('id','conjugeCpf')
            ->setAttribute('mask','999.999.999-99')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [conjugeDataNascimento]
         **/
        $input = new \Zend\Form\Element\Text('conjugeDataNascimento');
        $input->setAttribute('id','conjugeDataNascimento')
            ->setAttribute('class','date')
            ->setAttribute('mask','39/19/9999')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [conjugeProfissao]
         **/
        $input = new \Zend\Form\Element\Text('conjugeProfissao');
        $input->setAttribute('id','conjugeProfissao')
            ->setAttribute('maxlength','50')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type radio
         * @name [alertas]
         **/
        $this->add(array(
            'type' => 'radio',
            'name' => 'alertas',
            'attributes' => array(
                'class'=>'required',
                'eval'=>'1',
            ),
            'options' => array(
                'label_options' => array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '0' => '<span>Sim</span>',
                    '1' => '<span>Não</span>'
                ),
            )
        ));

        /**
         * @element input
         * @type text
         * @name [limiteCredito]
         **/
        $input = new \Zend\Form\Element\Text('limiteCredito');
        $input->setAttribute('id','limiteCredito')
            ->setAttribute('number_format','+#.#0,[2,2]')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [saldo]
         **/
        $input = new \Zend\Form\Element\Text('saldo');
        $input->setAttribute('id','saldo')
            ->setAttribute('number_format','+#.#0,[2,2]')
            ->setAttribute('readonly','readonly')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type hidden
         * @name [foto]
         **/
        $input = new \Zend\Form\Element\Hidden('foto');
        $input->setAttribute('id','foto')
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [suframa]
         **/
        $input = new \Zend\Form\Element\Text('suframa');
        $input->setAttribute('id','suframa')
            ->setValue('');
        $this->add($input);

    }

    public function clear($form)
    {
        $form->setData(array());
    }
}
