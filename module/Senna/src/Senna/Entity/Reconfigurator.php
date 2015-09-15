<?php

namespace Senna\Entity;

class Reconfigurator {

	public static function reconfigure($target,$post)
	{
	$array = array(
			"produto__descricao_produto" => "descricao",
			"produto__id_categoria"=>"id_classes_produtos",
			"produto__id_subcategoria"=>"id_sub_classes_produtos",
			"produto__cod_secundario"=>"codigo_lancamento",
			"produto__cod_barra"=>"codigo_barras",
			"produto__id_unidade_entrada"=>"unidade_compra",
			"produto__id_unidade_saida"=>"unidade_venda",
			"valor_venda_varejo_aux"=>"valor_venda",
			"produto__tx_conversao_e_s"=>"fator_conversao",
			"produto__ativo"=>"ativo",
			"produto__vinculacao"=>"tipo_item_venda",
			"produto__peso"=>"peso",
			"produto__largura"=>"largura",
			"produto__altura"=>"altura",
			"produto__comprimento"=>"comprimento",
			"produto__informacao_adicional"=>"observacao",
			"produto__comissao"=>"comissao",
			"produto__pontos"=>"pontos",
			"produto__serie"=>"garantia",
			"produto__vendido_separado"=>"vendido_separado",
			"produto__nome_unidade_saida"=>"nome_unidade_venda",
			"produto__nome_unidade_entrada"=>"nome_unidade_compra",
			"itemVendaGrade_id"=>'parent',
			"produto_codigo_grade"=>"id_grade",
			"produto__foto_principal"=>'foto_principal'
			
	);
	$novoArray = array();
	foreach($post AS $key => $value):
		if (array_key_exists($key, $array))
			{	
			$novoArray[$array[$key]] = $value;
			}

	endforeach;

	return $novoArray;
	}

}

