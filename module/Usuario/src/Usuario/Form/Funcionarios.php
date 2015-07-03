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

        // input sugestao
        $input = new \Zend\Form\Element\Text("ac_perfil_acessso");
        $input->setAttribute('id', "id_perfil")
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
        $input = new \Zend\Form\Element\Text("codigo_acesso");
        $input->setAttribute('id', "codigo_acesso")
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
        $input = new \Zend\Form\Element\Text("email_principal_aux");
        $input->setAttribute('class', "required")
            ->setAttribute('id', "email_principal_aux")
            ->setAttribute('uppercase', "false")
            ->setAttribute('maxLength', "50")
            ->setAttribute('minLength', "6")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);


        // input
        $input = new \Zend\Form\Element\Text("telefone_principal_aux");
        $input->setAttribute('class', "required")
            ->setAttribute('id', "telefone_principal_aux")
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

        // input data
        $input = new \Zend\Form\Element\Text("");
        $input->setAttribute('id', "")
            ->setAttribute('class', "")
            ->setAttribute('style', "")
            ->setValue("");
        $this->add($input);


    }
}
