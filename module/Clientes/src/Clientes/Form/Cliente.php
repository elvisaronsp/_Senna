<?php

namespace Clientes\Form;

use Doctrine\Common\Util\Debug;
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
                'eval' => '0',
            ),
            'options' => array(
                'label_options' => array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '0' => '<span>Fisíca</span>',
                    '1' => '<span>Juridíca</span>'
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
         * @type hidden
         * @name [classificacao]
         **/
        $input = new \Zend\Form\Element\Hidden('classificacao');
        $input->setAttribute('id', 'classificacao')
            ->setValue('1');
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
            ->setAttribute('uppercase', "true")
            ->setAttribute('autocomplete', "off")
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [cpf]
         **/
        $input = new \Zend\Form\Element\Text('cpf');
        $input->setAttribute('id', 'cpf')
            ->setAttribute('class', 'cpf required')
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
            ->setAttribute('class', "cnpj valid required")
            ->setAttribute("mask", "99.999.999/9999-99")
            ->setAttribute('pstyle', 'width:115px;')
            ->setAttribute('cnpj','true')
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
            ->setAttribute('class', 'required')
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
            ->setAttribute('class', 'required')
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
                'value' => '0',
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
         * @name [imIsento]
         **/
        $this->add(array(
            'type' => 'Checkbox',
            'name' => 'imIsento',
            'options' => array(
                'label' => '',
                'use_hidden_element' => false
            ),
            'attributes' => array(
                'campo' => 'im',
                'id' => 'imIsento',
                'value' => '0',
            )
        ));

        /**
         * @element input
         * @type text
         * @name [codigoCliente]
         **/
        $input = new \Zend\Form\Element\Text('codigoCliente');
        $input->setAttribute('id', 'codigoCliente')
            ->setAttribute('maxlength', '13')
            ->setAttribute('class', 'required')
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
            ->setAttribute('class', 'required')
            ->setAttribute('email', 'true   ')
            ->setAttribute('autocomplete', "off")
            ->setValue('');
        $this->add($input);

        /**
         * @element input
         * @type text
         * @name [telefone]
         **/
        $input = new \Zend\Form\Element\Text("telefone");
        $input->setAttribute('class', "required")
            ->setAttribute('id', "telefone")
            ->setAttribute('uppercase', "false")
            ->setAttribute('maxLength', "14")
            ->setAttribute('style', "")
            ->setAttribute("mask", "(99)9999-9999?9")
            ->setValue("");
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
            ->setAttribute('uppercase', "true")
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
            ->setAttribute('autocomplete', "off")
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
            ->setAttribute('eval', "0")
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
                'eval'=>'0',
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

        //#####################  CONTATOS #############################


        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id[0]');
        $hidden->setAttribute('id', "contato__id_0")
            ->setAttribute("class", "clone_id")
            ->setValue("");
        $this->add($hidden);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__editavel[0]');
        $hidden->setAttribute('id', "contato__editavel_0")
            ->setValue("");
        $this->add($hidden);

        //#### CONTATO 0

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id_entidade[0]');
        $hidden->setAttribute('id', "contato__id_entidade_0")
            ->setValue("");
        $this->add($hidden);

        // select
        $select = new Select();
        $select->setName("contato__id_tipo_cadastro[0]")
            ->setAttribute('id', "contato__id_tipo_cadastro_0")
            ->setAttribute('eval', "{contato__id_tipo_cadastro_0}")
            ->setAttribute('size', "1")
            ->setAttribute('style', "")
            ->setAttribute('class', "valid")
            ->setOptions(array('value_options' => array("COMERCIAL", "PARTICULAR", "RESIDENCIAL", "ENTREGA", "EMERGENCIAS")));
        $this->add($select);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id_tipo_contato[0]');
        $hidden->setAttribute('id', "contato__id_tipo_contato_0")
            ->setValue("");
        $this->add($hidden);

        // input sugestao
        $input = new \Zend\Form\Element\Text("ac_0");
        $input->setAttribute('id', "contato__id_tipo_contato_0")
            ->setAttribute('style', "")
            ->setAttribute('autosuggest', "contato__id_tipo_contato[0]")
            ->setAttribute('class', "autosuggest required ui-autocomplete-input")
            ->setAttribute('filters', "[]")
            ->setAttribute('form_title', "Cadastrando Cidade")
            ->setAttribute('form_url', "")
            ->setAttribute('form_url_field', "")
            ->setAttribute('minlength', "0")
            ->setAttribute('new_item_info', "Criar um novo registro")
            ->setAttribute('new_item_label', "Cadastrar Novo")
            ->setAttribute('source', "/senna/cadastro/util/getTiposCadastros")
            ->setAttribute('uppercase', "true")
            ->setAttribute('valueclear', "true")
            ->setAttribute('valuefield', "id")
            ->setAttribute('autocomplete', "off")
            ->setAttribute('autocomplete', "textbox")
            ->setAttribute('aria-autocomplete', "list")
            ->setAttribute('aria-haspopup', "true")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("contato__descricao[0]");
        $input->setAttribute('id', "contato__descricao_0")
            ->setAttribute('maxLength', "50")
            ->setAttribute('class', "required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("contato__detalhes[0]");
        $input->setAttribute('id', "contato__detalhes_0")
            ->setAttribute('maxLength', "50")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setAttribute('uppercase', "true")
            ->setValue("");
        $this->add($input);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id[1]');
        $hidden->setAttribute('id', "contato__id_1")
            ->setValue("")
            ->setAttribute("class", "clone_id");
        $this->add($hidden);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__editavel[1]');
        $hidden->setAttribute('id', "contato__editavel_1")
            ->setValue("");
        $this->add($hidden);

        //#### CONTATO 1

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id_entidade[1]');
        $hidden->setAttribute('id', "contato__id_entidade_1")
            ->setValue("");
        $this->add($hidden);

        // select
        $select = new Select();
        $select->setName("contato__id_tipo_cadastro[1]")
            ->setAttribute('id', "contato__id_tipo_cadastro_1")
            ->setAttribute('eval', "{contato__id_tipo_cadastro_1}")
            ->setAttribute('size', "1")
            ->setAttribute('style', "")
            ->setAttribute('class', "valid")
            ->setOptions(array('value_options' => array("COMERCIAL", "PARTICULAR", "RESIDENCIAL", "ENTREGA", "EMERGENCIAS")));
        $this->add($select);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id_tipo_contato[1]');
        $hidden->setAttribute('id', "contato__id_tipo_contato_1")
            ->setValue("");
        $this->add($hidden);

        // input sugestao
        $input = new \Zend\Form\Element\Text("ac_1");
        $input->setAttribute('id', "contato__id_tipo_contato_1")
            ->setAttribute('style', "")
            ->setAttribute('autosuggest', "contato__id_tipo_contato[1]")
            ->setAttribute('class', "autosuggest required ui-autocomplete-input")
            ->setAttribute('filters', "[]")
            ->setAttribute('form_title', "Cadastrando Cidade")
            ->setAttribute('form_url', "")
            ->setAttribute('form_url_field', "")
            ->setAttribute('minlength', "0")
            ->setAttribute('new_item_info', "Criar um novo registro")
            ->setAttribute('new_item_label', "Cadastrar Novo")
            ->setAttribute('source', "/senna/cadastro/util/getTiposCadastros")
            ->setAttribute('uppercase', "true")
            ->setAttribute('valueclear', "true")
            ->setAttribute('valuefield', "id")
            ->setAttribute('autocomplete', "off")
            ->setAttribute('autocomplete', "textbox")
            ->setAttribute('aria-autocomplete', "list")
            ->setAttribute('aria-haspopup', "true")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("contato__descricao[1]");
        $input->setAttribute('id', "contato__descricao_1")
            ->setAttribute('maxLength', "50")
            ->setAttribute('class', "required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("contato__detalhes[1]");
        $input->setAttribute('id', "contato__detalhes_1")
            ->setAttribute('maxLength', "50")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setAttribute('uppercase', "true")
            ->setValue("");
        $this->add($input);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id[2]');
        $hidden->setAttribute('id', "contato__id_2")
            ->setValue("")
            ->setAttribute("class", "clone_id");
        $this->add($hidden);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__editavel[2]');
        $hidden->setAttribute('id', "contato__editavel_2")
            ->setValue("");
        $this->add($hidden);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id_entidade[2]');
        $hidden->setAttribute('id', "contato__id_entidade_2")
            ->setValue("");
        $this->add($hidden);

        // select
        $select = new Select();
        $select->setName("contato__id_tipo_cadastro[2]")
            ->setAttribute('id', "contato__id_tipo_cadastro_2")
            ->setAttribute('eval', "{contato__id_tipo_cadastro_2}")
            ->setAttribute('size', "1")
            ->setAttribute('style', "")
            ->setAttribute('class', "valid")
            ->setOptions(array('value_options' => array("COMERCIAL", "PARTICULAR", "RESIDENCIAL", "ENTREGA", "EMERGENCIAS")));
        $this->add($select);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id_tipo_contato[2]');
        $hidden->setAttribute('id', "contato__id_tipo_contato_2")
            ->setValue("");
        $this->add($hidden);

        // input sugestao
        $input = new \Zend\Form\Element\Text("ac_2");
        $input->setAttribute('id', "contato__id_tipo_contato_2")
            ->setAttribute('style', "")
            ->setAttribute('autosuggest', "contato__id_tipo_contato[2]")
            ->setAttribute('class', "autosuggest required ui-autocomplete-input")
            ->setAttribute('filters', "[]")
            ->setAttribute('form_title', "Cadastrando Cidade")
            ->setAttribute('form_url', "")
            ->setAttribute('form_url_field', "")
            ->setAttribute('minlength', "0")
            ->setAttribute('new_item_info', "Criar um novo registro")
            ->setAttribute('new_item_label', "Cadastrar Novo")
            ->setAttribute('source', "/senna/cadastro/util/getTiposCadastros")
            ->setAttribute('uppercase', "true")
            ->setAttribute('valueclear', "true")
            ->setAttribute('valuefield', "id")
            ->setAttribute('autocomplete', "off")
            ->setAttribute('autocomplete', "textbox")
            ->setAttribute('aria-autocomplete', "list")
            ->setAttribute('aria-haspopup', "true")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("contato__descricao[2]");
        $input->setAttribute('id', "contato__descricao_2")
            ->setAttribute('maxLength', "50")
            ->setAttribute('class', "required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("contato__detalhes[2]");
        $input->setAttribute('id', "contato__detalhes_2")
            ->setAttribute('maxLength', "50")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setAttribute('uppercase', "true")
            ->setValue("");
        $this->add($input);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id[3]');
        $hidden->setAttribute('id', "contato__id_3")
            ->setValue("")
            ->setAttribute("class", "clone_id");
        $this->add($hidden);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__editavel[3]');
        $hidden->setAttribute('id', "contato__editavel_3")
            ->setValue("");
        $this->add($hidden);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id_entidade[3]');
        $hidden->setAttribute('id', "contato__id_entidade_3")
            ->setValue("");
        $this->add($hidden);

        // select
        $select = new Select();
        $select->setName("contato__id_tipo_cadastro[3]")
            ->setAttribute('id', "contato__id_tipo_cadastro_3")
            ->setAttribute('eval', "{contato__id_tipo_cadastro_3}")
            ->setAttribute('size', "1")
            ->setAttribute('style', "")
            ->setAttribute('class', "valid")
            ->setOptions(array('value_options' => array("COMERCIAL", "PARTICULAR", "RESIDENCIAL", "ENTREGA", "EMERGENCIAS")));
        $this->add($select);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id_tipo_contato[3]');
        $hidden->setAttribute('id', "contato__id_tipo_contato_3")
            ->setValue("");
        $this->add($hidden);

        // input sugestao
        $input = new \Zend\Form\Element\Text("ac_3");
        $input->setAttribute('id', "contato__id_tipo_contato_3")
            ->setAttribute('style', "")
            ->setAttribute('autosuggest', "contato__id_tipo_contato[3]")
            ->setAttribute('class', "autosuggest required ui-autocomplete-input")
            ->setAttribute('filters', "[]")
            ->setAttribute('form_title', "Cadastrando Cidade")
            ->setAttribute('form_url', "")
            ->setAttribute('form_url_field', "")
            ->setAttribute('minlength', "0")
            ->setAttribute('new_item_info', "Criar um novo registro")
            ->setAttribute('new_item_label', "Cadastrar Novo")
            ->setAttribute('source', "/senna/cadastro/util/getTiposCadastros")
            ->setAttribute('uppercase', "true")
            ->setAttribute('valueclear', "true")
            ->setAttribute('valuefield', "id")
            ->setAttribute('autocomplete', "off")
            ->setAttribute('autocomplete', "textbox")
            ->setAttribute('aria-autocomplete', "list")
            ->setAttribute('aria-haspopup', "true")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("contato__descricao[3]");
        $input->setAttribute('id', "contato__descricao_3")
            ->setAttribute('maxLength', "50")
            ->setAttribute('class', "required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("contato__detalhes[3]");
        $input->setAttribute('id', "contato__detalhes_3")
            ->setAttribute('maxLength', "50")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setAttribute('uppercase', "true")
            ->setValue("");
        $this->add($input);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id[4]');
        $hidden->setAttribute('id', "contato__id_4")
            ->setValue("")
            ->setAttribute("class", "clone_id");
        $this->add($hidden);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__editavel[4]');
        $hidden->setAttribute('id', "contato__editavel_4")
            ->setValue("");
        $this->add($hidden);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id_entidade[4]');
        $hidden->setAttribute('id', "contato__id_entidade_4")
            ->setValue("");
        $this->add($hidden);

        // select
        $select = new Select();
        $select->setName("contato__id_tipo_cadastro[4]")
            ->setAttribute('id', "contato__id_tipo_cadastro_4")
            ->setAttribute('eval', "{contato__id_tipo_cadastro_4}")
            ->setAttribute('size', "1")
            ->setAttribute('style', "")
            ->setAttribute('class', "valid")
            ->setOptions(array('value_options' => array("COMERCIAL", "PARTICULAR", "RESIDENCIAL", "ENTREGA", "EMERGENCIAS")));
        $this->add($select);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id_tipo_contato[4]');
        $hidden->setAttribute('id', "contato__id_tipo_contato_4")
            ->setValue("");
        $this->add($hidden);

        // input sugestao
        $input = new \Zend\Form\Element\Text("ac_4");
        $input->setAttribute('id', "contato__id_tipo_contato_4")
            ->setAttribute('style', "")
            ->setAttribute('autosuggest', "contato__id_tipo_contato[4]")
            ->setAttribute('class', "autosuggest required ui-autocomplete-input")
            ->setAttribute('filters', "[]")
            ->setAttribute('form_title', "Cadastrando Cidade")
            ->setAttribute('form_url', "")
            ->setAttribute('form_url_field', "")
            ->setAttribute('minlength', "0")
            ->setAttribute('new_item_info', "Criar um novo registro")
            ->setAttribute('new_item_label', "Cadastrar Novo")
            ->setAttribute('source', "/senna/cadastro/util/getTiposCadastros")
            ->setAttribute('uppercase', "true")
            ->setAttribute('valueclear', "true")
            ->setAttribute('valuefield', "id")
            ->setAttribute('autocomplete', "off")
            ->setAttribute('autocomplete', "textbox")
            ->setAttribute('aria-autocomplete', "list")
            ->setAttribute('aria-haspopup', "true")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("contato__descricao[4]");
        $input->setAttribute('id', "contato__descricao_4")
            ->setAttribute('maxLength', "50")
            ->setAttribute('class', "required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("contato__detalhes[4]");
        $input->setAttribute('id', "contato__detalhes_4")
            ->setAttribute('maxLength', "50")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setAttribute('uppercase', "true")
            ->setValue("");
        $this->add($input);

        ############################## FIM CONTATOS #############################


        //#################### ENDEREÇOS ###################################
        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('endereco_id[0]');
        $hidden->setAttribute('id', "endereco_id_0")
            ->setValue("");
        $this->add($hidden);


        // radio
        $this->add(array(
            'type' => 'radio',
            'name' => 'principal_radio[]',
            'attributes' => array(
                'class' => '',
                'eval' => '',
                'style' => ""
            ),
            'options' => array(
                'label_options' => array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '4' => '<span>Pricipal</span>',
                ),
            )
        ));

        // input
        $input = new \Zend\Form\Element\Text("endereco__cep[0]");
        $input->setAttribute('id', "endereco__cep_0")
            ->setAttribute("mask", "99999-999")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "valid required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__logradouro[0]");
        $input->setAttribute('id', "endereco__logradouro_0")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "valid required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__numero[0]");
        $input->setAttribute('id', "endereco_entidade__numero_0")
            ->setAttribute('maxlength', "5")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "valid required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__complemento[0]");
        $input->setAttribute('id', "endereco_entidade__complemento_0")
            ->setAttribute('maxlength', "20")
            ->setAttribute('style', "")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__bairro[0]");
        $input->setAttribute('id', "endereco__bairro_0")
            ->setAttribute('style', "")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "valid required")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__id_cidade[0]");
        $input->setAttribute('id', "endereco__id_cidade_0")
            ->setAttribute('style', "")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "valid required")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__informacoes_adicionais[0]");
        $input->setAttribute('id', "endereco_entidade__informacoes_adicionais_0")
            ->setAttribute('uppercase', "true")
            ->setAttribute('maxlength', "50")
            ->setAttribute('style', "")
            ->setAttribute('class', "")
            ->setValue("");
        $this->add($input);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('endereco_entidade__id_tipo_cadastro[0]');
        $hidden->setAttribute('id', "endereco_entidade__id_tipo_cadastro_0")
            ->setValue("");
        $this->add($hidden);

        // input sugestao
        $input = new \Zend\Form\Element\Text("ac_e_0");
        $input->setAttribute('id', "endereco_entidade__id_tipo_cadastro_0")
            ->setAttribute('style', "")
            ->setAttribute('autosuggest', "endereco_entidade__id_tipo_cadastro[0]")
            ->setAttribute('class', "autosuggest valid required")
            ->setAttribute('filters', "[]")
            ->setAttribute('form_title', "Cadastrando Cidade")
            ->setAttribute('form_url', "")
            ->setAttribute('form_url_field', "")
            ->setAttribute('minlength', "0")
            ->setAttribute('new_item_info', "Criar um novo registro")
            ->setAttribute('new_item_label', "Cadastrar Novo")
            ->setAttribute('source', "/senna/cadastro/util/getTiposEndereco")
            ->setAttribute('uppercase', "true")
            ->setAttribute('valueclear', "true")
            ->setAttribute('valuefield', "id")
            ->setAttribute('autocomplete', "off")
            ->setAttribute('autocomplete', "textbox")
            ->setAttribute('aria-autocomplete', "list")
            ->setAttribute('aria-haspopup', "true")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("estado[0]");
        $input->setAttribute('id', "estado_0")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('readonly', "true")
            ->setValue("");
        $this->add($input);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('endereco_id[1]');
        $hidden->setAttribute('id', "endereco_id_1")
            ->setValue("");
        $this->add($hidden);

        // radio
        $this->add(array(
            'type' => 'radio',
            'name' => 'principal_radio[]',
            'attributes' => array(
                'class' => '',
                'eval' => '',
                'style' => ""
            ),
            'options' => array(
                'label_options' => array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '0' => '<span>Pricipal</span>',
                ),
            )
        ));

        // input
        $input = new \Zend\Form\Element\Text("endereco__cep[1]");
        $input->setAttribute('id', "endereco__cep_1")
            ->setAttribute("mask", "99999-999")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "valid required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__logradouro[1]");
        $input->setAttribute('id', "endereco__logradouro_1")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "valid required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__numero[1]");
        $input->setAttribute('id', "endereco_entidade__numero_1")
            ->setAttribute('maxlength', "5")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "valid required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__complemento[1]");
        $input->setAttribute('id', "endereco_entidade__complemento_1")
            ->setAttribute('maxlength', "20")
            ->setAttribute('uppercase', 'true')
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__bairro[1]");
        $input->setAttribute('id', "endereco__bairro_1")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('class', "valid required")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__id_cidade[1]");
        $input->setAttribute('id', "endereco__id_cidade_1")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('class', "valid required")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__informacoes_adicionais[1]");
        $input->setAttribute('id', "endereco_entidade__informacoes_adicionais_1")
            ->setAttribute('uppercase', "true")
            ->setAttribute('maxlength', "50")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('endereco_entidade__id_tipo_cadastro[1]');
        $hidden->setAttribute('id', "endereco_entidade__id_tipo_cadastro_1")
            ->setValue("");
        $this->add($hidden);

        // input sugestao
        $input = new \Zend\Form\Element\Text("ac_e_1");
        $input->setAttribute('id', "endereco_entidade__id_tipo_cadastro_1")
            ->setAttribute('style', "")
            ->setAttribute('autosuggest', "endereco_entidade__id_tipo_cadastro[1]")
            ->setAttribute('class', "autosuggest valid required")
            ->setAttribute('filters', "[]")
            ->setAttribute('form_title', "Cadastrando Cidade")
            ->setAttribute('form_url', "")
            ->setAttribute('form_url_field', "")
            ->setAttribute('minlength', "0")
            ->setAttribute('new_item_info', "Criar um novo registro")
            ->setAttribute('new_item_label', "Cadastrar Novo")
            ->setAttribute('source', "/senna/cadastro/util/getTiposEndereco")
            ->setAttribute('uppercase', "true")
            ->setAttribute('valueclear', "true")
            ->setAttribute('valuefield', "id")
            ->setAttribute('autocomplete', "off")
            ->setAttribute('autocomplete', "textbox")
            ->setAttribute('aria-autocomplete', "list")
            ->setAttribute('aria-haspopup', "true")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("estado[1]");
        $input->setAttribute('id', "estado_1")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('readonly', "true")
            ->setValue("");
        $this->add($input);


        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('endereco_id[2]');
        $hidden->setAttribute('id', "endereco_id_2")
            ->setValue("");
        $this->add($hidden);
        // radio
        $this->add(array(
            'type' => 'radio',
            'name' => 'principal_radio[]',
            'attributes' => array(
                'class' => '',
                'eval' => '',
                'style' => ""
            ),
            'options' => array(
                'label_options' => array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '1' => '<span>Pricipal</span>',
                ),
            )
        ));

        // input
        $input = new \Zend\Form\Element\Text("endereco__cep[2]");
        $input->setAttribute('id', "endereco__cep_2")
            ->setAttribute("mask", "99999-999")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "valid required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__logradouro[2]");
        $input->setAttribute('id', "endereco__logradouro_2")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "valid required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__numero[2]");
        $input->setAttribute('id', "endereco_entidade__numero_2")
            ->setAttribute('maxlength', "5")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "valid required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__complemento[2]");
        $input->setAttribute('id', "endereco_entidade__complemento_2")
            ->setAttribute('maxlength', "20")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__bairro[2]");
        $input->setAttribute('id', "endereco__bairro_2")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('class', "valid required")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__id_cidade[2]");
        $input->setAttribute('id', "endereco__id_cidade_2")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('class', "valid required")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__informacoes_adicionais[2]");
        $input->setAttribute('id', "endereco_entidade__informacoes_adicionais_2")
            ->setAttribute('uppercase', "true")
            ->setAttribute('maxlength', "50")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('endereco_entidade__id_tipo_cadastro[2]');
        $hidden->setAttribute('id', "endereco_entidade__id_tipo_cadastro_2")
            ->setValue("");
        $this->add($hidden);

        // input sugestao
        $input = new \Zend\Form\Element\Text("ac_e_2");
        $input->setAttribute('id', "endereco_entidade__id_tipo_cadastro_2")
            ->setAttribute('style', "")
            ->setAttribute('autosuggest', "endereco_entidade__id_tipo_cadastro[2]")
            ->setAttribute('class', "autosuggest valid required")
            ->setAttribute('filters', "[]")
            ->setAttribute('form_title', "Cadastrando Cidade")
            ->setAttribute('form_url', "")
            ->setAttribute('form_url_field', "")
            ->setAttribute('minlength', "0")
            ->setAttribute('new_item_info', "Criar um novo registro")
            ->setAttribute('new_item_label', "Cadastrar Novo")
            ->setAttribute('source', "/senna/cadastro/util/getTiposEndereco")
            ->setAttribute('uppercase', "true")
            ->setAttribute('valueclear', "true")
            ->setAttribute('valuefield', "id")
            ->setAttribute('autocomplete', "off")
            ->setAttribute('autocomplete', "textbox")
            ->setAttribute('aria-autocomplete', "list")
            ->setAttribute('aria-haspopup', "true")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("estado[2]");
        $input->setAttribute('id', "estado_2")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('readonly', "true")
            ->setValue("");
        $this->add($input);


        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('endereco_id[3]');
        $hidden->setAttribute('id', "endereco_id_3")
            ->setValue("");
        $this->add($hidden);

        // radio
        $this->add(array(
            'type' => 'radio',
            'name' => 'principal_radio[]',
            'attributes' => array(
                'class' => '',
                'eval' => '',
                'style' => ""
            ),
            'options' => array(
                'label_options' => array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '2' => '<span>Pricipal</span>',
                ),
            )
        ));

        // input
        $input = new \Zend\Form\Element\Text("endereco__cep[3]");
        $input->setAttribute('id', "endereco__cep_3")
            ->setAttribute("mask", "99999-999")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "valid required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__logradouro[3]");
        $input->setAttribute('id', "endereco__logradouro_3")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "valid required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__numero[3]");
        $input->setAttribute('id', "endereco_entidade__numero_3")
            ->setAttribute('maxlength', "5")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "valid required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__complemento[3]");
        $input->setAttribute('id', "endereco_entidade__complemento_3")
            ->setAttribute('maxlength', "20")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__bairro[3]");
        $input->setAttribute('id', "endereco__bairro_3")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('class', "valid required")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__id_cidade[3]");
        $input->setAttribute('id', "endereco__id_cidade_3")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('class', "valid required")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__informacoes_adicionais[3]");
        $input->setAttribute('id', "endereco_entidade__informacoes_adicionais_3")
            ->setAttribute('uppercase', "true")
            ->setAttribute('maxlength', "50")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);


        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('endereco_entidade__id_tipo_cadastro[3]');
        $hidden->setAttribute('id', "endereco_entidade__id_tipo_cadastro_3")
            ->setValue("");
        $this->add($hidden);

        // input sugestao
        $input = new \Zend\Form\Element\Text("ac_e_3");
        $input->setAttribute('id', "endereco_entidade__id_tipo_cadastro_3")
            ->setAttribute('style', "")
            ->setAttribute('autosuggest', "endereco_entidade__id_tipo_cadastro[3]")
            ->setAttribute('class', "autosuggest valid required")
            ->setAttribute('filters', "[]")
            ->setAttribute('form_title', "Cadastrando Cidade")
            ->setAttribute('form_url', "")
            ->setAttribute('form_url_field', "")
            ->setAttribute('minlength', "0")
            ->setAttribute('new_item_info', "Criar um novo registro")
            ->setAttribute('new_item_label', "Cadastrar Novo")
            ->setAttribute('source', "/senna/cadastro/util/getTiposEndereco")
            ->setAttribute('uppercase', "true")
            ->setAttribute('valueclear', "true")
            ->setAttribute('valuefield', "id")
            ->setAttribute('autocomplete', "off")
            ->setAttribute('autocomplete', "textbox")
            ->setAttribute('aria-autocomplete', "list")
            ->setAttribute('aria-haspopup', "true")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("estado[3]");
        $input->setAttribute('id', "estado_3")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('readonly', "true")
            ->setValue("");
        $this->add($input);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('endereco_id[4]');
        $hidden->setAttribute('id', "endereco_id_4")
            ->setValue("");
        $this->add($hidden);

        // radio
        $this->add(array(
            'type' => 'radio',
            'name' => 'principal_radio[]',
            'attributes' => array(
                'class' => '',
                'eval' => '',
                'style' => ""
            ),
            'options' => array(
                'label_options' => array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '3' => '<span>Pricipal</span>',
                ),
            )
        ));

        // input
        $input = new \Zend\Form\Element\Text("endereco__cep[4]");
        $input->setAttribute('id', "endereco__cep_4")
            ->setAttribute("mask", "99999-999")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "valid required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__logradouro[4]");
        $input->setAttribute('id', "endereco__logradouro_4")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "valid required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__numero[4]");
        $input->setAttribute('id', "endereco_entidade__numero_4")
            ->setAttribute('maxlength', "5")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "valid required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__complemento[4]");
        $input->setAttribute('id', "endereco_entidade__complemento_4")
            ->setAttribute('maxlength', "20")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__bairro[4]");
        $input->setAttribute('id', "endereco__bairro_4")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('class', "valid required")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__id_cidade[4]");
        $input->setAttribute('id', "endereco__id_cidade_4")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('class', "valid required")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__informacoes_adicionais[4]");
        $input->setAttribute('id', "endereco_entidade__informacoes_adicionais_4")
            ->setAttribute('uppercase', "true")
            ->setAttribute('maxlength', "50")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('endereco_entidade__id_tipo_cadastro[4]');
        $hidden->setAttribute('id', "endereco_entidade__id_tipo_cadastro_4")
            ->setValue("");
        $this->add($hidden);


        // input sugestao
        $input = new \Zend\Form\Element\Text("ac_e_4");
        $input->setAttribute('id', "endereco_entidade__id_tipo_cadastro_4")
            ->setAttribute('style', "")
            ->setAttribute('autosuggest', "endereco_entidade__id_tipo_cadastro[4]")
            ->setAttribute('class', "autosuggest valid required")
            ->setAttribute('filters', "[]")
            ->setAttribute('form_title', "Cadastrando Cidade")
            ->setAttribute('form_url', "")
            ->setAttribute('form_url_field', "")
            ->setAttribute('minlength', "0")
            ->setAttribute('new_item_info', "Criar um novo registro")
            ->setAttribute('new_item_label', "Cadastrar Novo")
            ->setAttribute('source', "/senna/cadastro/util/getTiposEndereco")
            ->setAttribute('uppercase', "true")
            ->setAttribute('valueclear', "true")
            ->setAttribute('valuefield', "id")
            ->setAttribute('autocomplete', "off")
            ->setAttribute('autocomplete', "textbox")
            ->setAttribute('aria-autocomplete', "list")
            ->setAttribute('aria-haspopup', "true")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("estado[4]");
        $input->setAttribute('id', "estado_4")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('readonly', "true")
            ->setValue("");
        $this->add($input);

        // checkbox
        $this->add(array(
            'type' => 'Checkbox',
            'name' => 'visualizar_dashboard',
            'options' => array(
                'label' => '',
                'use_hidden_element' => false
            ),
            'attributes' => array(
                'id' => 'visualizar_dashboard',
                'value' => '1',
                'rel' => '0',
                'style' => ''
            )
        ));

        // checkbox
        $this->add(array(
            'type' => 'Checkbox',
            'name' => 'visualizar_todos_funcionarios',
            'options' => array(
                'label' => '',
                'use_hidden_element' => false
            ),
            'attributes' => array(
                'id' => 'visualizar_todos_funcionarios',
                'value' => '1',
                'rel' => '0',
                'style' => ''
            )
        ));

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('endereco_entidade__principal[0]');
        $hidden->setAttribute('id', "endereco_entidade__principal_0")
            ->setValue("");
        $this->add($hidden);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('endereco_entidade__principal[1]');
        $hidden->setAttribute('id', "endereco_entidade__principal_1")
            ->setValue("");
        $this->add($hidden);


        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('endereco_entidade__principal[2]');
        $hidden->setAttribute('id', "endereco_entidade__principal_2")
            ->setValue("");
        $this->add($hidden);


        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('endereco_entidade__principal[3]');
        $hidden->setAttribute('id', "endereco_entidade__principal_3")
            ->setValue("");
        $this->add($hidden);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('endereco_entidade__principal[4]');
        $hidden->setAttribute('id', "endereco_entidade__principal_4")
            ->setValue("");
        $this->add($hidden);

        //#################### FIM DE ENDEREÇOS ################################

        $this->criarVendedoresForm();


    }

    public function clear($form)
    {
        $form->setData(array());
    }

    /**
     * @param null $vendedores
     */
    public function criarVendedoresForm($vendedores = null)
    {

        if($vendedores != ""):
            foreach ($vendedores AS $key => $value):
                /**
                 * @element input
                 * @type hidden
                 * @name [vendedorCliente]
                 **/
                $input = new \Zend\Form\Element\Hidden('vendedorCliente['.$key.']');
                $input->setAttribute('id','vendedorCliente_'.$key)
                    ->setValue( $vendedores[$key]->getUsuario()->getId());
                $this->add($input);

                /**
                 * @element input
                 * @type text
                 * @name [ac_vendedor]
                 **/
                $input = new \Zend\Form\Element\Text('ac_vendedor['.$key.']');
                $input->setAttribute('id','ac_vendedor_'.$key)
                    ->setAttribute('autosuggest','vendedorCliente')
                    ->setAttribute('class','autosuggest')
                    ->setAttribute('filters','[]')
                    ->setAttribute('form_title','Cadastrando')
                    ->setAttribute('new_item_info','Criar')
                    ->setAttribute('new_item_label','Cadastrar')
                    ->setAttribute('source','/senna/usuario/funcionarios/getFuncionariosPermissaoVenda')
                    ->setAttribute('uppercase','true')
                    ->setAttribute('valueclear','true')
                    ->setAttribute('valuefield','idFuncionario')
                    ->setValue($vendedores[$key]->getUsuario());
                $this->add($input);

                /**
                 * @element input
                 * @type text
                 * @name [CpfCnpjVendedor]
                 **/
                $input = new \Zend\Form\Element\Text('CpfCnpjVendedor['.$key.']');
                $input->setAttribute('id','CpfCnpjVendedor_'.$key)
                    ->setAttribute('disabled','disabled')
                    ->setAttribute('style','text-align:center;')
                    ->setAttribute('cnpj','true')
                    ->setValue($vendedores[$key]->getUsuario()->getCpf());
                $this->add($input);

                /**
                 * @element input
                 * @type text
                 * @name [vendedorDataHora]
                 **/
                $input = new \Zend\Form\Element\Text('vendedorDataHora['.$key.']');
                $input->setAttribute('id','vendedorDataHora_'.$key)
                    ->setAttribute('disabled','disabled')
                    ->setAttribute('style','text-align:center;')
                    ->setValue($vendedores[$key]->getCriadoEm());
                $this->add($input);
            endforeach;
        else:

            /**
             * @element input
             * @type hidden
             * @name [vendedorCliente]
             **/
            $input = new \Zend\Form\Element\Hidden('vendedorCliente[0]');
            $input->setAttribute('id','vendedorCliente')
                ->setValue( '');
            $this->add($input);

            /**
             * @element input
             * @type text
             * @name [ac_vendedor]
             **/
            $input = new \Zend\Form\Element\Text('ac_vendedor[0]');
            $input->setAttribute('id','ac_vendedor')
                ->setAttribute('autosuggest','vendedorCliente')
                ->setAttribute('class','autosuggest')
                ->setAttribute('filters','[]')
                ->setAttribute('form_title','Cadastrando')
                ->setAttribute('new_item_info','Criar')
                ->setAttribute('new_item_label','Cadastrar')
                ->setAttribute('source','/senna/usuario/funcionarios/getFuncionariosPermissaoVenda')
                ->setAttribute('uppercase','true')
                ->setAttribute('valueclear','true')
                ->setAttribute('valuefield','idFuncionario')
                ->setValue('');
            $this->add($input);

            /**
             * @element input
             * @type text
             * @name [CpfCnpjVendedor]
             **/
            $input = new \Zend\Form\Element\Text('CpfCnpjVendedor[0]');
            $input->setAttribute('id','CpfCnpjVendedor')
                ->setAttribute('disabled','disabled')
                ->setAttribute('style','text-align:center;')
                ->setAttribute('cnpj','true')
                ->setValue('');
            $this->add($input);

            /**
             * @element input
             * @type text
             * @name [vendedorDataHora]
             **/
            $input = new \Zend\Form\Element\Text('vendedorDataHora[0]');
            $input->setAttribute('id','vendedorDataHora')
                ->setAttribute('disabled','disabled')
                ->setAttribute('style','text-align:center;')
                ->setValue('');
            $this->add($input);
        endif;
    }

    public function setValueElement($element,$atrb,$val)
    {
        $this->get($element)->setAttribute($atrb,$val);
    }
}
