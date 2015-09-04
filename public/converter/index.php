<?php
require 'funcoes.php';
$arquivo = file('form.txt', FILE_IGNORE_NEW_LINES);


$conteudo = lerHtml($arquivo);
$conteudo = limpaInput($conteudo);
$conteudo = criarChaves($conteudo);

$radio = 0;
$radioAux = "";
foreach ($conteudo AS $key => $value):
    if (isset($value['type'])):
        if ($value['type'] == "text"):
            $conteudo = criarInputText($value);
        elseif ($value['type'] == "hidden"):
            $conteudo = criarInputHidden($value);
        elseif ($value['type'] == "radio"):
            if($radio == 0):
                $radioAux = $value;
                $radio++;
            else:
                $conteudo = criarInputRadio($radioAux,$value);
                $radio = 0;
                $radioAux = "";
            endif;
        elseif ($value['type'] == "checkbox"):
            $conteudo = criarInputCheckBox($value);
        endif;
    else:
        if(isset($value['cols'])):
            $conteudo = criarTextArea($value);
        endif;
    endif;
endforeach;

//echo "<pre>";
//print_r($conteudo);
//echo "</pre>";
?>