<?php
namespace Usuario\Form;

use Zend\Form\Element\Select;
use Zend\Form\Form;

/**
 * Class Funcionarios
 * @package Usuario\Form
 */
class InfoFuncionario extends Form
{
    public function __construct()
    {
        parent::__construct('funcionarios');
        $this->setAttributes(array(
            'method' => 'post',
            'class' => 'form',
            'id' => 'form'
        ));

        // select
        $select = new Select();
        $select->setName("sexo")
            ->setAttribute('id', "sexo")
            ->setAttribute('eval', "0")
            ->setAttribute('size', "1")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setOptions(array(
                'value_options' => array(
                    "MASCULINO",
                    "FEMININO",
                )
            ));
        $this->add($select);

        // input
        $input = new \Zend\Form\Element\Text("nome");
        $input->setAttribute('id', "nome")
            ->setAttribute('style', "")
            ->setAttribute('class', "focus required")
            ->setAttribute('uppercase', "true")
            ->setAttribute('autocomplete', "off")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("cpf");
        $input->setAttribute('id', "cpf")
            ->setAttribute('style', "")
            ->setAttribute("mask", "999.999.999-99")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("rg");
        $input->setAttribute('id', "rg")
            ->setAttribute('maxLength', "10")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("dataNascimento");
        $input->setAttribute('id', "dataNascimento")
            ->setAttribute('maxLength', "10")
            ->setAttribute("mask", "39/19/9999")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("escolaridade");
        $input->setAttribute('id', "escolaridade")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("login");
        $input->setAttribute('id', "login")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('class', "required")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // input password
        $input = new \Zend\Form\Element\Password("senha");
        $input->setAttribute('id', "senha")
            ->setAttribute('style', "")
            ->setAttribute('class', "{password_class_required} password required")
            ->setAttribute('maxLength', "100")
            ->setAttribute('minLength', "6")
            ->setAttribute('requiredIf', "$('#id').val()==''")
            ->setValue("");
        $this->add($input);

        // input password
        $input = new \Zend\Form\Element\Password("senha_confirma");
        $input->setAttribute('id', "senha_confirma")
            ->setAttribute('style', "")
            ->setAttribute('class', "{password_class_required} password required")
            ->setAttribute('maxLength', "100")
            ->setAttribute('minLength', "6")
            ->setAttribute('equalTo', "#senha")
            ->setValue("");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("perfil");
        $input->setAttribute('id', "perfil")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("hora_entrada");
        $input->setAttribute('id', "hora_entrada")
            ->setAttribute('class', "time")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("hora_almoco_entrada");
        $input->setAttribute('id', "hora_almoco_entrada")
            ->setAttribute('class', "time")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("hora_almoco_saida");
        $input->setAttribute('id', "hora_almoco_saida")
            ->setAttribute('class', "time")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("hora_saida");
        $input->setAttribute('id', "hora_saida")
            ->setAttribute('class', "time")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("tipoContaBancaria");
        $input->setAttribute('id', "tipoContaBancaria")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setAttribute('uppercase', "true")
            ->setValue("");
        $this->add($input);


        // input data
        $input = new \Zend\Form\Element\Text("contaCorrente");
        $input->setAttribute('id', "contaCorrente")
            ->setAttribute('maxLength', "10")
            ->setAttribute('class', "code")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);


        // input data
        $input = new \Zend\Form\Element\Text("agencia");
        $input->setAttribute('id', "agencia")
            ->setAttribute('maxLength', "10")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("numerobanco");
        $input->setAttribute('id', "numerobanco")
            ->setAttribute('maxLength', "10")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("setor");
        $input->setAttribute('id', "setor")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("dataAdminissao");
        $input->setAttribute('id', "dataAdminissao")
            ->setAttribute('maxLength', "10")
            ->setAttribute("mask", "39/19/9999")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("dataDemissao");
        $input->setAttribute('id', "dataDemissao")
            ->setAttribute('maxLength', "10")
            ->setAttribute("mask", "39/19/9999")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("comissao");
        $input->setAttribute('id', "comissao")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setAttribute('maxLength', "10")
            ->setAttribute('number_format', "+#.#0,[2,2]")
            ->setValue("0.00");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("descancoSemanal");
        $input->setAttribute('id', "descancoSemanal")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("ctps");
        $input->setAttribute('id', "ctps")
            ->setAttribute('maxLength', "12")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
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


        ############################## ENDERECOS ###############################
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

        ############################## FIM ENDERECOS ###############################
    }
}
