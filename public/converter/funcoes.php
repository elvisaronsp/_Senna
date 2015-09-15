<?php

/**
 * @param $arquivo
 * @return array
 * Le arquivo html procura os input e coloca em um array
 */
function lerHtml($arquivo)
{
    $conteudo = array();
    foreach ($arquivo AS $key => $value):
        if (strpos($value, '<input') || strpos($value, '<textarea')):
            $conteudo[] = $value;
        endif;
    endforeach;
    return $conteudo;
}

/**
 * @param $conteudo
 * @return mixed
 * Limpa todas as linhas do vetor
 */
function limpaInput($conteudo)
{
    $string = str_replace("<input", "", $conteudo);
    $string = str_replace("<textarea", "", $string);
    $string = str_replace("</input>", "", $string);
    $string = str_replace("</textarea>", "", $string);
    $string = str_replace(">", "", $string);
    $string = str_replace('=" ', '="', $string);

    foreach ($string AS $key => $value):
        $string[$key] = trim($value);
    endforeach;
    return $string;
}

/**
 * @param $conteudo
 * @return mixed
 * Cria chave de cada elemento com seu valor
 */
function criarChaves($conteudo)
{
    $elemento = array();
    foreach ($conteudo AS $key => $value):
        $linha = explode(' ', trim($value));
        foreach ($linha AS $k => $v):
            $linhaaux = explode('=', $v);
            @$elemento[$key][$linhaaux[0]] = str_replace('"', '', $linhaaux[1]);
        endforeach;
    endforeach;
    return $elemento;
}

//########## CRIAT INPUT TIPO TEXTO ##############################
function criarInputText($elemento)
{
    $elemento = array_filter( $elemento );
    unset($elemento['type']);
    $name = $elemento['name'];
    unset($elemento['name']);

    echo "/**";
    echo "<br />";
    echo "* @element input";
    echo "<br />";
    echo "* @type text";
    echo "<br />";
    echo "* @name [$name]";
    echo "<br />";
    echo "**/";
    echo "<br />";
    echo "&#36;input = new \Zend\Form\Element\Text('$name');";
    echo "<br />";
    echo "&#36;input->setAttribute('id','$name')";
    echo "<br />";

    if(isset($elemento['id'])):
        unset($elemento['id']);
    endif;
    if(isset($elemento['value'])):
        unset($elemento['value']);
    endif;

    foreach ($elemento AS $key => $value):
        echo "->setAttribute('$key','$value')";
        echo "<br />";
    endforeach;

    echo "->setValue('');";
    echo "<br />";

    echo "&#36;this->add(&#36;input);";
    echo "<br />";
    echo "/*&lt;?php echo &#36;this->formElement(&#36;input = &#36;form->get('$name'));?&gt;*/";
    echo "<br />";
    return $elemento;
}
//###############################################################

//########## CRIAT INPUT TIPO HIDDEN ############################
function criarInputHidden($elemento)
{
    $elemento = array_filter( $elemento );
    unset($elemento['type']);
    $name = $elemento['name'];
    unset($elemento['name']);

    echo "/**";
    echo "<br />";
    echo "* @element input";
    echo "<br />";
    echo "* @type hidden";
    echo "<br />";
    echo "* @name [$name]";
    echo "<br />";
    echo "**/";
    echo "<br />";
    echo "&#36;input = new \Zend\Form\Element\Hidden('$name');";
    echo "<br />";
    echo "&#36;input->setAttribute('id','$name')";
    echo "<br />";

    if(isset($elemento['id'])):
        unset($elemento['id']);
    endif;
    if(isset($elemento['value'])):
        unset($elemento['value']);
    endif;

    foreach ($elemento AS $key => $value):
        echo "->setAttribute('$key','$value')";
        echo "<br />";
    endforeach;

    echo "->setValue('');";
    echo "<br />";

    echo "&#36;this->add(&#36;input);";
    echo "<br />";
    echo "/*&lt;?php echo &#36;this->formElement(&#36;input = &#36;form->get('$name'));?&gt;*/";
    echo "<br />";
    return $elemento;
}
//###############################################################

//########## CRIAT INPUT TIPO RADIO #############################
function criarInputRadio($elemento1,$elemento)
{
    $elemento = array_filter( $elemento );
    $br = "<br />";
    unset($elemento['type']);
    $name = $elemento['name'];

    echo "/**";
    echo $br;
    echo "* @element input";
    echo $br;
    echo "* @type radio";
    echo $br;
    echo "* @name [$name]";
    echo $br;
    echo "**/";
    echo $br;

    echo "&#36;this->add(array( $br
        'type' => 'radio',      $br
        'name' => '$name',      $br
        'attributes' => array(  $br";

    unset($elemento['name']);
    $value1 = $elemento1['value'];
    $value2 = "";
    foreach ($elemento AS $key => $value):
        if($key != 'value' ):
            echo "'$key'=>'$value',  $br";
        else:
            $value2 = $value;
        endif;
    endforeach;
    echo "),$br";
    echo "'options' => array( $br
            'label_options' => array('disable_html_escape' => true),$br
            'label_attributes' => array('class' => 'inline'),$br
            'value_options' => array($br
                '$value1' => '&lt;span>valor_1&lt;/span&gt;',$br
                '$value2' => '&lt;span>valor_2&lt;/span&gt;'$br
            ),$br
        )$br
    ));";
    echo "<br />";
    echo "/*&lt;?php echo &#36;this->formElement(&#36;input = &#36;form->get('$name'));?&gt;*/";
    echo "<br />";
    return $elemento;
}
//###############################################################

//########## CRIAT INPUT TIPO CHECKBOX ##########################
function criarInputCheckBox($elemento)
{
    $elemento = array_filter( $elemento );
    $br = "<br />";
    unset($elemento['type']);
    $name = $elemento['name'];
    unset($elemento['name']);

    echo "/**";
    echo $br;
    echo "* @element input";
    echo $br;
    echo "* @type checkbox";
    echo $br;
    echo "* @name [$name]";
    echo $br;
    echo "**/";
    echo $br;

    echo "&#36;this->add(array( $br
        'type' => 'Checkbox',   $br
        'name' => '$name',      $br
        'options' => array(     $br
            'label' => '',      $br
            'use_hidden_element' => false $br
        ),$br
        'attributes' => array($br";

    foreach ($elemento AS $key => $value):
        echo "'$key'=>'$value',  $br";
    endforeach;
    echo ")$br
    ));";

    echo "<br />";
    echo "/*&lt;?php echo &#36;this->formElement(&#36;input = &#36;form->get('$name'));?&gt;*/";
    echo "<br />";
    return $elemento;
}
//###############################################################

//########## CRIAT INPUT TIPO TEXT AREA ############################
function criarTextArea($elemento)
{
    $elemento = array_filter( $elemento );

    unset($elemento['type']);
    $name = $elemento['name'];
    unset($elemento['name']);

    echo "/**";
    echo "<br />";
    echo "* @element TextArea";
    echo "<br />";
    echo "* @name [$name]";
    echo "<br />";
    echo "**/";
    echo "<br />";
    echo "&#36;textarea = new \Zend\Form\Element\Textarea('$name');";
    echo "<br />";
    echo "&#36;textarea->setAttribute('id','$name')";
    echo "<br />";

    if(isset($elemento['id'])):
        unset($elemento['id']);
    endif;
    if(isset($elemento['value'])):
        unset($elemento['value']);
    endif;

    foreach ($elemento AS $key => $value):
        echo "->setAttribute('$key','$value')";
        echo "<br />";
    endforeach;

    echo "->setValue('');";
    echo "<br />";

    echo "&#36;this->add(&#36;textarea);";
    echo "<br />";
    echo "/*&lt;?php echo &#36;this->formElement(&#36;textarea = &#36;form->get('$name'));?&gt;*/";
    echo "<br />";

    return $elemento;
}
//###############################################################

?>