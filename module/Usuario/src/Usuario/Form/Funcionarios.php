<?php
namespace Usuario\Form;
use Zend\Form\Element\Select;
use Zend\Form\Form;

/**
 * Class Funcionarios
 * @package Usuario\Form
 */
class Funcionarios extends Form
{
    private $recursos;

    /**
     * @param array $recursos
     */
    public function __construct(array $recursos = null)
    {
        $this->recursos = $recursos;
        parent::__construct('funcionarios');
        $this->setAttributes ( array (
            'method' => 'post',
            'class' => 'form',
            'id' => 'form'
        ) );

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('id_entidade');
        $hidden->setAttribute('id', "id_entidade")
            ->setValue("");
        $this->add($hidden);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('id_empresa');
        $hidden->setAttribute('id', "id_empresa")
            ->setValue("");
        $this->add($hidden);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('id_funcionario');
        $hidden->setAttribute('id', "id_funcionario")
            ->setValue("");
        $this->add($hidden);

        // radio
        $this->add(array(
            'type' => 'radio',
            'name' => 'ativo',
            'attributes' => array (
                'class' => ' required',
                'eval'=>'1',
                'style' => ""
            ),
            'options' => array(
                'label_options'=>array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '1' => '<span>Sim</span>',
                    '0' => '<span>N&atilde;o</span>'
                ),
            )
        ));

        // radio
        $this->add(array(
            'type' => 'radio',
            'name' => 'sexo',
            'attributes' => array (
                'class' => ' required',
                'eval'=>'M',
                'style' => ""
            ),
            'options' => array(
                'label_options'=>array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    'M' => '<span>Masculino</span>',
                    '0' => '<span>Feminino</span>'
                ),
            )
        ));

        // radio
        $this->add(array(
            'type' => 'radio',
            'name' => 'mensagemBoasVindas',
            'attributes' => array (
                'class' => ' required',
                'eval'=>'0',
                'style' => ""
            ),
            'options' => array(
                'label_options'=>array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '1' => '<span>Sim</span>',
                    '0' => '<span>N&atilde;o</span>'
                ),
            )
        ));

        // radio
        $this->add(array(
            'type' => 'radio',
            'name' => 'solicitarRedefinirSenha',
            'attributes' => array (
                'class' => ' required',
                'eval'=>'0',
                'style' => ""
            ),
            'options' => array(
                'label_options'=>array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '1' => '<span>Sim</span>',
                    '0' => '<span>N&atilde;o</span>'
                ),
            )
        ));

        // radio
        $this->add(array(
            'type' => 'radio',
            'name' => 'modoFerias',
            'attributes' => array (
                'class' => ' required',
                'eval'=>'0',
                'style' => ""
            ),
            'options' => array(
                'label_options'=>array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '1' => '<span>Sim</span>',
                    '0' => '<span>N&atilde;o</span>'
                ),
            )
        ));

        // radio
        $this->add(array(
            'type' => 'radio',
            'name' => 'alertas',
            'attributes' => array (
                'class' => ' required',
                'eval'=>'0',
                'style' => ""
            ),
            'options' => array(
                'label_options'=>array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '1' => '<span>Sim</span>',
                    '0' => '<span>N&atilde;o</span>'
                ),
            )
        ));

        // input
        $input = new \Zend\Form\Element\Text("nome");
        $input->setAttribute('id', "nome")
            ->setAttribute('style', "")
            ->setAttribute('class', "focus required")
            ->setAttribute('uppercase', "true")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("cpf");
        $input->setAttribute('id', "cpf")
            ->setAttribute('style', "")
            ->setAttribute('class', "cpf valid")
            ->setAttribute("mask","999.999.999-99")
            ->setValue("");
        $this->add($input);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('id_perfil');
        $hidden->setAttribute('id', "id_perfil")
            ->setValue("");
        $this->add($hidden);

        // input sugestao
        $input = new \Zend\Form\Element\Text("ac_perfil_acessso");
        $input->setAttribute('id', "id_perfil_acesso")
            ->setAttribute('style', "")
            ->setAttribute('class', "temp  required autosuggest")
            ->setAttribute('filters', "[]")
            ->setAttribute('form_title', "Cadastrando Perfil de Acesso")
            ->setAttribute('form_url', "/senna/acesso/perfil/form")
            ->setAttribute('form_url_field', "descricao")
            ->setAttribute('minLength', "0")
            ->setAttribute('new_item_info', "Criar um novo perfil")
            ->setAttribute('new_item_label', "Cadastrar Novo")
            ->setAttribute('source', "/senna/acesso/perfis/getfuncionarioperfil")
            ->setAttribute('valueclear', "true")
            ->setAttribute('valuefield', "id")
            ->setAttribute('autosuggest', "id_perfil")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("login");
        $input->setAttribute('id', "login")
            ->setAttribute('style', "")
            ->setAttribute('class', "required")
            ->setValue("");
        $this->add($input);

        // input password
        $input = new \Zend\Form\Element\Password("senha");
        $input->setAttribute('id', "senha")
            ->setAttribute('style', "")
            ->setAttribute('class', "")
            ->setAttribute('maxLength', "100")
            ->setAttribute('minLength', "6")
            ->setAttribute('requiredIf', "$('#id').val()==''")
            ->setValue("");
        $this->add($input);

        // input password
        $input = new \Zend\Form\Element\Password("senha_confirma");
        $input->setAttribute('id', "senha_confirma")
            ->setAttribute('style', "")
            ->setAttribute('class', "")
            ->setAttribute('maxLength', "100")
            ->setAttribute('minLength', "6")
            ->setAttribute('equalTo', "#senha")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("email");
        $input->setAttribute('class', "required")
            ->setAttribute('id', "email")
            ->setAttribute('uppercase', "false")
            ->setAttribute('maxLength', "50")
            ->setAttribute('minLength', "6")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("telefoneprincipal");
        $input->setAttribute('class', "required")
            ->setAttribute('id', "telefoneprincipal")
            ->setAttribute('uppercase', "false")
            ->setAttribute('maxLength', "14")
            ->setAttribute('style', "")
            ->setAttribute("mask","(99)9999-9999?9")
            ->setValue("");
        $this->add($input);

        // select
        $select = new Select();
        $select->setName("setor")
            ->setAttribute('id', "setor")
            ->setAttribute('eval', "5")
            ->setAttribute('size', "1")
            ->setAttribute('style', "")
            ->setOptions(array('value_options' => array("Administrativo","Financeiro","Comercial","Vendas","Gerencia","Produção")));
        $this->add($select);

        // Text Area
        $textarea = new \Zend\Form\Element\Textarea("observacoes");
        $textarea->setAttribute('class', "")
            ->setAttribute('id', "observacoes")
            ->setAttribute('cols', "20")
            ->setAttribute('maxLength', "2000")
            ->setAttribute('rows', "12")
            ->setAttribute('style', "width:645px;height:65px;resize:none;")
            ->setValue("");
        $this->add($textarea);

        // input
        $input = new \Zend\Form\Element\Text("rg");
        $input->setAttribute('id', "rg")
            ->setAttribute('class', "")
            ->setAttribute('maxLength', "10")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("dataNascimento");
        $input->setAttribute('id', "dataNascimento")
            ->setAttribute('class', "date")
            ->setAttribute('maxLength', "10")
            ->setAttribute("mask","39/19/9999")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // select
        $select = new Select();
        $select->setName("escolaridade")
            ->setAttribute('id', "escolaridade")
            ->setAttribute('eval', "3")
            ->setAttribute('size', "1")
            ->setAttribute('style', "")
            ->setOptions(array('value_options' => array("Ensino Fundamental Incompleto","Ensino Fundamental Completo","Ensino Médio Incompleto","Ensino Médio Completo","Ensino Superior Incompleto","Ensino Superior Completo")));
        $this->add($select);

        // input data
        $input = new \Zend\Form\Element\Text("dataAdminissao");
        $input->setAttribute('id', "dataAdminissao")
            ->setAttribute('class', "date")
            ->setAttribute('maxLength', "10")
            ->setAttribute("mask","39/19/9999")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("dataDemissao");
        $input->setAttribute('id', "dataDemissao")
            ->setAttribute('class', "date")
            ->setAttribute('maxLength', "10")
            ->setAttribute("mask","39/19/9999")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("descancoSemanal");
        $input->setAttribute('id', "descancoSemanal")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("ctps");
        $input->setAttribute('id', "ctps")
            ->setAttribute('maxLength', "10")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // select
        $select = new Select();
        $select->setName("tipoContaBancaria")
            ->setAttribute('id', "tipoContaBancaria")
            ->setAttribute('eval', "2")
            ->setAttribute('size', "1")
            ->setAttribute('style', "")
            ->setOptions(array('value_options' => array("Conta Corrente","Conta Poupança","Conta Salário")));
        $this->add($select);

        // input data
        $input = new \Zend\Form\Element\Text("agencia");
        $input->setAttribute('id', "agencia")
            ->setAttribute('maxLength', "10")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("numerobanco");
        $input->setAttribute('id', "numerobanco")
            ->setAttribute('maxLength', "10")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("comissao");
        $input->setAttribute('id', "comissao")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setAttribute('maxLength', "10")
            ->setAttribute('number_format', "+#.#0,[2,2]")
            ->setValue("0.00");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("descontoMaximo");
        $input->setAttribute('id', "descontoMaximo")
            ->setAttribute('number_format', "+#.#0,[2,2]")
            ->setAttribute('class', "")
            ->setAttribute('maxLength', "10")
            ->setAttribute('style', "")
            ->setValue("0.00");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("hora_entrada");
        $input->setAttribute('id', "hora_entrada")
            ->setAttribute('class', "time")
            ->setAttribute('style', "")
            ->setValue("08:00:00");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("hora_almoco_entrada");
        $input->setAttribute('id', "hora_almoco_entrada")
            ->setAttribute('class', "time")
            ->setAttribute('style', "")
            ->setValue("08:00:00");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("hora_almoco_saida");
        $input->setAttribute('id', "hora_almoco_saida")
            ->setAttribute('class', "time")
            ->setAttribute('style', "")
            ->setValue("08:00:00");
        $this->add($input);

        // input data
        $input = new \Zend\Form\Element\Text("hora_saida");
        $input->setAttribute('id', "hora_saida")
            ->setAttribute('class', "time")
            ->setAttribute('style', "")
            ->setValue("08:00:00");
        $this->add($input);

        // checkbox
        $this->add(array(
            'type' => 'Checkbox',
            'name' => 'dias_da_semana_1',
            'options'=>array(
                'label'=>'',
                'use_hidden_element' => false
            ),
            'attributes' => array (
                'id'=>'dias_da_semana_1',
                'value'=>'1',
                'rel'=>'1',
                'style'=>''
            )
        ));

        // checkbox
        $this->add(array(
            'type' => 'Checkbox',
            'name' => 'dias_da_semana_2',
            'options'=>array(
                'label'=>'',
                'use_hidden_element' => false
            ),
            'attributes' => array (
                'id'=>'dias_da_semana_2',
                'value'=>'1',
                'rel'=>'1',
                'style'=>''
            )
        ));

        // checkbox
        $this->add(array(
            'type' => 'Checkbox',
            'name' => 'dias_da_semana_3',
            'options'=>array(
                'label'=>'',
                'use_hidden_element' => false
            ),
            'attributes' => array (
                'id'=>'dias_da_semana_3',
                'value'=>'1',
                'rel'=>'1',
                'style'=>''
            )
        ));

        // checkbox
        $this->add(array(
            'type' => 'Checkbox',
            'name' => 'dias_da_semana_4',
            'options'=>array(
                'label'=>'',
                'use_hidden_element' => false
            ),
            'attributes' => array (
                'id'=>'dias_da_semana_4',
                'value'=>'1',
                'rel'=>'1',
                'style'=>''
            )
        ));

        // checkbox
        $this->add(array(
            'type' => 'Checkbox',
            'name' => 'dias_da_semana_5',
            'options'=>array(
                'label'=>'',
                'use_hidden_element' => false
            ),
            'attributes' => array (
                'id'=>'dias_da_semana_5',
                'value'=>'1',
                'rel'=>'1',
                'style'=>''
            )
        ));

        // checkbox
        $this->add(array(
            'type' => 'Checkbox',
            'name' => 'dias_da_semana_6',
            'options'=>array(
                'label'=>'',
                'use_hidden_element' => false
            ),
            'attributes' => array (
                'id'=>'dias_da_semana_6',
                'value'=>'1',
                'rel'=>'0',
                'style'=>''
            )
        ));

        // checkbox
        $this->add(array(
            'type' => 'Checkbox',
            'name' => 'dias_da_semana_7',
            'options'=>array(
                'label'=>'',
                'use_hidden_element' => false
            ),
            'attributes' => array (
                'id'=>'dias_da_semana_7',
                'value'=>'1',
                'rel'=>'0',
                'style'=>''
            )
        ));

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id[0]');
        $hidden->setAttribute('id', "contato__id_0")
            ->setAttribute("class","clone_id")
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
            ->setOptions(array('value_options' => array("COMERCIAL","PARTICULAR","RESIDENCIAL","ENTREGA","EMERGENCIAS")));
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
            ->setAttribute('class', "required")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id[1]');
        $hidden->setAttribute('id', "contato__id_1")
            ->setValue("")
            ->setValue("class","clone_id");
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
            ->setOptions(array('value_options' => array("COMERCIAL","PARTICULAR","RESIDENCIAL","ENTREGA","EMERGENCIAS")));
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
            ->setAttribute('class', "autosuggest ui-autocomplete-input")
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
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("contato__detalhes[1]");
        $input->setAttribute('id', "contato__detalhes_1")
            ->setAttribute('maxLength', "50")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id[2]');
        $hidden->setAttribute('id', "contato__id_2")
            ->setValue("")
            ->setValue("class","clone_id");
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
            ->setOptions(array('value_options' => array("COMERCIAL","PARTICULAR","RESIDENCIAL","ENTREGA","EMERGENCIAS")));
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
            ->setAttribute('class', "autosuggest  ui-autocomplete-input")
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
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("contato__detalhes[2]");
        $input->setAttribute('id', "contato__detalhes_2")
            ->setAttribute('maxLength', "50")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id[3]');
        $hidden->setAttribute('id', "contato__id_3")
            ->setValue("")
            ->setValue("class","clone_id");
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
            ->setOptions(array('value_options' => array("COMERCIAL","PARTICULAR","RESIDENCIAL","ENTREGA","EMERGENCIAS")));
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
            ->setAttribute('class', "autosuggest  ui-autocomplete-input")
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
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("contato__detalhes[3]");
        $input->setAttribute('id', "contato__detalhes_3")
            ->setAttribute('maxLength', "50")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        //input hidden
        $hidden = new \Zend\Form\Element\Hidden('contato__id[4]');
        $hidden->setAttribute('id', "contato__id_4")
            ->setValue("")
            ->setValue("class","clone_id");
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
            ->setOptions(array('value_options' => array("COMERCIAL","PARTICULAR","RESIDENCIAL","ENTREGA","EMERGENCIAS")));
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
            ->setAttribute('class', "autosuggest  ui-autocomplete-input")
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
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("contato__detalhes[4]");
        $input->setAttribute('id', "contato__detalhes_4")
            ->setAttribute('maxLength', "50")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // radio
        $this->add(array(
            'type' => 'radio',
            'name' => 'principal_radio[]',
            'attributes' => array (
                'class' => '',
                'eval'=>'0',
                'style' => ""
            ),
            'options' => array(
                'label_options'=>array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '0' => '<span>Pricipal</span>',
                ),
            )
        ));

        // input
        $input = new \Zend\Form\Element\Text("endereco__cep[0]");
        $input->setAttribute('id', "endereco__cep_0")
            ->setAttribute("mask","99999-999")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__logradouro[0]");
        $input->setAttribute('id', "endereco__logradouro_0")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__numero[0]");
        $input->setAttribute('id', "endereco_entidade__numero_0")
            ->setAttribute('maxlength', "5")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__complemento[0]");
        $input->setAttribute('id', "endereco_entidade__complemento_0")
            ->setAttribute('maxlength', "20")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__bairro[0]");
        $input->setAttribute('id', "endereco__bairro_0")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('class', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__id_cidade[0]");
        $input->setAttribute('id', "endereco__id_cidade_0")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('class', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__informacoes_adicionais[0]");
        $input->setAttribute('id', "endereco_entidade__informacoes_adicionais_0")
            ->setAttribute('uppercase', "true")
            ->setAttribute('maxlength', "50")
            ->setAttribute('style', "")
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
            ->setAttribute('class', "autosuggest")
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
        $input = new \Zend\Form\Element\Text("estado");
        $input->setAttribute('id', "estado")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "disabled")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // radio
        $this->add(array(
            'type' => 'radio',
            'name' => 'principal_radio[]',
            'attributes' => array (
                'class' => '',
                'eval'=>'0',
                'style' => ""
            ),
            'options' => array(
                'label_options'=>array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '0' => '<span>Pricipal</span>',
                ),
            )
        ));

        // input
        $input = new \Zend\Form\Element\Text("endereco__cep[1]");
        $input->setAttribute('id', "endereco__cep_1")
            ->setAttribute("mask","99999-999")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__logradouro[1]");
        $input->setAttribute('id', "endereco__logradouro_1")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__numero[1]");
        $input->setAttribute('id', "endereco_entidade__numero_1")
            ->setAttribute('maxlength', "5")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__complemento[1]");
        $input->setAttribute('id', "endereco_entidade__complemento_1")
            ->setAttribute('maxlength', "20")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__bairro[1]");
        $input->setAttribute('id', "endereco__bairro_1")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('class', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__id_cidade[1]");
        $input->setAttribute('id', "endereco__id_cidade_1")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('class', "")
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
            ->setAttribute('class', "autosuggest")
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
        $input = new \Zend\Form\Element\Text("estado");
        $input->setAttribute('id', "estado")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "disabled")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // radio
        $this->add(array(
            'type' => 'radio',
            'name' => 'principal_radio[]',
            'attributes' => array (
                'class' => '',
                'eval'=>'0',
                'style' => ""
            ),
            'options' => array(
                'label_options'=>array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '0' => '<span>Pricipal</span>',
                ),
            )
        ));

        // input
        $input = new \Zend\Form\Element\Text("endereco__cep[2]");
        $input->setAttribute('id', "endereco__cep_2")
            ->setAttribute("mask","99999-999")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__logradouro[2]");
        $input->setAttribute('id', "endereco__logradouro_2")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__numero[2]");
        $input->setAttribute('id', "endereco_entidade__numero_2")
            ->setAttribute('maxlength', "5")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__complemento[2]");
        $input->setAttribute('id', "endereco_entidade__complemento_2")
            ->setAttribute('maxlength', "20")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__bairro[2]");
        $input->setAttribute('id', "endereco__bairro_2")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('class', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__id_cidade[2]");
        $input->setAttribute('id', "endereco__id_cidade_2")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('class', "")
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
            ->setAttribute('class', "autosuggest")
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
        $input = new \Zend\Form\Element\Text("estado");
        $input->setAttribute('id', "estado")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "disabled")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // radio
        $this->add(array(
            'type' => 'radio',
            'name' => 'principal_radio[]',
            'attributes' => array (
                'class' => '',
                'eval'=>'0',
                'style' => ""
            ),
            'options' => array(
                'label_options'=>array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '0' => '<span>Pricipal</span>',
                ),
            )
        ));

        // input
        $input = new \Zend\Form\Element\Text("endereco__cep[3]");
        $input->setAttribute('id', "endereco__cep_3")
            ->setAttribute("mask","99999-999")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__logradouro[3]");
        $input->setAttribute('id', "endereco__logradouro_3")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__numero[3]");
        $input->setAttribute('id', "endereco_entidade__numero_3")
            ->setAttribute('maxlength', "5")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__complemento[3]");
        $input->setAttribute('id', "endereco_entidade__complemento_3")
            ->setAttribute('maxlength', "20")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__bairro[3]");
        $input->setAttribute('id', "endereco__bairro_3")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('class', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__id_cidade[3]");
        $input->setAttribute('id', "endereco__id_cidade_3")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('class', "")
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
            ->setAttribute('class', "autosuggest")
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
        $input = new \Zend\Form\Element\Text("estado");
        $input->setAttribute('id', "estado")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "disabled")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // radio
        $this->add(array(
            'type' => 'radio',
            'name' => 'principal_radio[]',
            'attributes' => array (
                'class' => '',
                'eval'=>'0',
                'style' => ""
            ),
            'options' => array(
                'label_options'=>array('disable_html_escape' => true),
                'label_attributes' => array('class' => 'inline'),
                'value_options' => array(
                    '0' => '<span>Pricipal</span>',
                ),
            )
        ));

        // input
        $input = new \Zend\Form\Element\Text("endereco__cep[4]");
        $input->setAttribute('id', "endereco__cep_4")
            ->setAttribute("mask","99999-999")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__logradouro[4]");
        $input->setAttribute('id', "endereco__logradouro_4")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__numero[4]");
        $input->setAttribute('id', "endereco_entidade__numero_4")
            ->setAttribute('maxlength', "5")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco_entidade__complemento[4]");
        $input->setAttribute('id', "endereco_entidade__complemento_4")
            ->setAttribute('maxlength', "20")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__bairro[4]");
        $input->setAttribute('id', "endereco__bairro_4")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('class', "")
            ->setValue("");
        $this->add($input);

        // input
        $input = new \Zend\Form\Element\Text("endereco__id_cidade[4]");
        $input->setAttribute('id', "endereco__id_cidade_4")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('class', "")
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
            ->setAttribute('class', "autosuggest")
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
        $input = new \Zend\Form\Element\Text("estado");
        $input->setAttribute('id', "estado")
            ->setAttribute('uppercase', "true")
            ->setAttribute('class', "disabled")
            ->setAttribute('uppercase', "true")
            ->setAttribute('style', "")
            ->setAttribute('disabled', "disabled")
            ->setValue("");
        $this->add($input);

        // checkbox
        $this->add(array(
            'type' => 'Checkbox',
            'name' => 'visualizar_dashboard',
            'options'=>array(
                'label'=>'',
                'use_hidden_element' => false
            ),
            'attributes' => array (
                'id'=>'visualizar_dashboard',
                'value'=>'1',
                'rel'=>'0',
                'style'=>''
            )
        ));

        // checkbox
        $this->add(array(
            'type' => 'Checkbox',
            'name' => 'visualizar_todos_funcionarios',
            'options'=>array(
                'label'=>'',
                'use_hidden_element' => false
            ),
            'attributes' => array (
                'id'=>'visualizar_todos_funcionarios',
                'value'=>'1',
                'rel'=>'0',
                'style'=>''
            )
        ));


    }
}
