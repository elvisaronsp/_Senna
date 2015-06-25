
/* autosuggestmulti.js */

/* 1   */ 
/* 2   */ /**
/* 3   *|  * AutoComplete utilizando jQuery.UI
/* 4   *|  * 
/* 5   *|  * @author Bruno Barbosa
/* 6   *|  * TODO: documentar padroes
/* 7   *|  * 
/* 8   *|  ***************************************************/
/* 9   */ jQuery.noConflict();
/* 10  */ (function($) {
/* 11  */ 	
/* 12  */ 	// implement JSON.stringify serialization
/* 13  */ 	JSON.stringify = JSON.stringify || function (obj) {
/* 14  */ 		var t = typeof (obj);
/* 15  */ 		if (t != "object" || obj === null) {
/* 16  */ 			// simple data type
/* 17  */ 			if (t == "string") obj = '"'+obj+'"';
/* 18  */ 			return String(obj);
/* 19  */ 		}
/* 20  */ 		else {
/* 21  */ 			// recurse array or object
/* 22  */ 			var n, v, json = [], arr = (obj && obj.constructor == Array);
/* 23  */ 			for (n in obj) {
/* 24  */ 				v = obj[n]; t = typeof(v);
/* 25  */ 				if (t == "string") v = '"'+v+'"';
/* 26  */ 				else if (t == "object" && v !== null) v = JSON.stringify(v);
/* 27  */ 				json.push((arr ? "" : '"' + n + '":') + String(v));
/* 28  */ 			}
/* 29  */ 			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
/* 30  */ 		}
/* 31  */ 	};
/* 32  */ 	
/* 33  */ 	//Normaliza valores dentro do JSON para que possa ser stringfied e retornado para objeto
/* 34  */ 	JSON.normaliza = function(obj){
/* 35  */ 		for (n in obj) {
/* 36  */ 			var v = obj[n]; 
/* 37  */ 			var t = typeof(v);
/* 38  */ 			if (t == "string"){
/* 39  */ 				//Retirando caracteres que podem causar problemas ao utilizar o $.parseJSON
/* 40  */ 				obj[n] = v.trim().replace(/["|'|\[|\]|\{|\}|\(|\)]/g, "");
/* 41  */ 			}
/* 42  */ 		}
/* 43  */ 		return obj;
/* 44  */ 	};
/* 45  */ 
/* 46  */ 	
/* 47  */ 	function in_array (x, txt){
/* 48  */         var er = new RegExp ("¬" + x + "¬", "gim");
/* 49  */         return ( (txt.match (er)) ? true : false );
/* 50  */ 	}

/* autosuggestmulti.js */

/* 51  */ 	
/* 52  */ 	//insere um elemento no multi select
/* 53  */ 	function addItem(el, item, container){
/* 54  */ 		item 				= JSON.normaliza(item);
/* 55  */ 		var el 				= $(el);
/* 56  */ 		var $ref 			= el.attr("ref");
/* 57  */ 		var $container 		= (container) ? container : $("#"+el.attr("container"));
/* 58  */ 		var value 			= item[el.attr('valuefield')];
/* 59  */ 		var info 			= (item['info']) ? item['info'] : "";
/* 60  */ 		var elid 			= el.attr('id');
/* 61  */ 		var val				= JSON.stringify(item).trim();
/* 62  */ 		var $newSpan		= $("<span class='multisuggest_item' ref='"+elid+"' style='display:none' title='"+info+"'><input type='hidden' name='"+$ref+"[]' value='"+val+"' />" + value + "</span>");
/* 63  */ 		$container.append($newSpan);
/* 64  */ 		$newSpan.fadeIn();
/* 65  */ 		//evento para novo item
/* 66  */ 		el.trigger('newItem',$newSpan);
/* 67  */ 	}
/* 68  */ 	
/* 69  */ 	
/* 70  */ 	//adicionando valores no campo multisuggest
/* 71  */ 	function multiselect_fill (evt){
/* 72  */ 		var $el = $(evt.target);
/* 73  */ 		var $values = $el.val().replace(/'/g , '"'); //converte os valores em json
/* 74  */ 		$el.val("");
/* 75  */ 		try{
/* 76  */ 			$values = $.parseJSON($values);
/* 77  */ 		}catch(ex){
/* 78  */ 			$values = false;
/* 79  */ 		}
/* 80  */ 		
/* 81  */ 		//verifica se o valor contem ':' => JSON
/* 82  */ 		if($values){
/* 83  */ 			$.each($values, function(){
/* 84  */ 				addItem($el, this);
/* 85  */ 			});
/* 86  */ 		}
/* 87  */ 	}
/* 88  */ 	
/* 89  */ 	//removendo todos os valores do campo multisuggest
/* 90  */ 	function multiselect_clear(evt){
/* 91  */ 		var $el = $(evt.target);
/* 92  */ 		$el.val("");
/* 93  */ 		$("#"+$el.attr("container")).html("");
/* 94  */ 	}
/* 95  */ 	
/* 96  */ 	
/* 97  */ 	//filtra os resultados do search do autocomplete para não exibir resultados ja inseridos
/* 98  */ 	var filterResponse = function(data, container, comparefield){
/* 99  */ 		var $data 	= [];
/* 100 */ 		var $values = [];

/* autosuggestmulti.js */

/* 101 */ 		var aux;
/* 102 */ 		//extraindo valores que ja estao na listagem
/* 103 */ 		container.find("input").each(function(i, el){
/* 104 */ 			try{
/* 105 */ 				aux = $.parseJSON($(this).val());
/* 106 */ 				$values.push(aux[comparefield]);
/* 107 */ 			}catch(ex){
/* 108 */ 				aux = false;
/* 109 */ 			}
/* 110 */ 		});
/* 111 */ 		
/* 112 */ 		//implementando um in_array
/* 113 */ 		$values = "¬" + $values.join("¬") + "¬";
/* 114 */ 		$.each(data, function(){
/* 115 */ 			var val = JSON.normaliza(this);
/* 116 */ 			if(!in_array(val[comparefield], $values)){
/* 117 */ 				$data.push(val);
/* 118 */ 			}
/* 119 */ 		});
/* 120 */ 		
/* 121 */ 		return $data;
/* 122 */ 	};
/* 123 */ 	
/* 124 */ 	
/* 125 */ 	$(document).ready(function(){
/* 126 */ 		if ($.fn.autocomplete) {
/* 127 */ 			//evento de limpeza
/* 128 */ 			$("[multisuggest]").bind("clear", multiselect_clear);
/* 129 */ 			//adicionando evento reset no formulario pai do multisuggest
/* 130 */ 			$("[multisuggest]").parents("#form").bind("reset.multisuggest", function(evt){
/* 131 */ 				$("[multisuggest]").each(function(){
/* 132 */ 					$(this).trigger("clear");
/* 133 */ 				});
/* 134 */ 			});
/* 135 */ 			
/* 136 */ 			//evento de preenchimento
/* 137 */ 			$("[multisuggest]").bind("fill", multiselect_fill);
/* 138 */ 			$("[multisuggest]").each(function(){
/* 139 */ 				$(this).trigger("fill");
/* 140 */ 			});
/* 141 */ 				
/* 142 */ 			$("[multisuggest]").live("focus", function(){
/* 143 */ 				//campo suggest
/* 144 */ 				var $el 		= $(this);
/* 145 */ 				//verificando flag
/* 146 */ 				if(!$el.data("evt_autosuggest")){
/* 147 */ 					
/* 148 */ 					//flag de evento
/* 149 */ 					$el.data("evt_autosuggest", true);
/* 150 */ 					

/* autosuggestmulti.js */

/* 151 */ 					//campo oculto associado
/* 152 */ 					var $container 		= $("#"+$el.attr("container"));
/* 153 */ 					if(!$container){
/* 154 */ 						alert("Container para multisuggest nao foi identificado.");
/* 155 */ 						return;
/* 156 */ 					}
/* 157 */ 					
/* 158 */ 					/**
/* 159 *| 					 * Inserindo Autocomplete
/* 160 *| 					 */
/* 161 */ 					$el.autocomplete({
/* 162 */ 						source: function(request, response) {
/* 163 */ 							$.ajax({
/* 164 */ 								url: $el.attr('source'),
/* 165 */ 								dataType: "json",
/* 166 */ 								type: "POST",
/* 167 */ 								data: {
/* 168 */ 									filter:	request.term
/* 169 */ 								},
/* 170 */ 								success: function(data) {
/* 171 */ 									response(filterResponse(data, $container, $el.attr('comparefield')));
/* 172 */ 								}
/* 173 */ 							});
/* 174 */ 						},
/* 175 */ 						autoFocus: true,
/* 176 */ 						
/* 177 */ 						delay: 700,
/* 178 */ 						
/* 179 */ 						position: {my: "left top", at: "left bottom", collision: "fit none"},
/* 180 */ 						
/* 181 */ 						minLength: $el.attr('minlength'),
/* 182 */ 						
/* 183 */ 						/* Ao selecionar um valor:
/* 184 *| 						 * registra valor e nome do campo em uma div associada
/* 185 *| 						 * ->span + hidden + img(X)
/* 186 *| 						 */
/* 187 */ 						select: function(event, ui) {
/* 188 */ 							addItem($el, ui.item, $container);
/* 189 */ 						},
/* 190 */ 						
/* 191 */ 						focus: function(event, ui) {
/* 192 */ 						},
/* 193 */ 						
/* 194 */ 						open: function(event, ui) {
/* 195 */ 							//se o autosuggest nao possui o foco, nem abre a lista
/* 196 */ 							if(event.target != document.activeElement){
/* 197 */ 								$el.autocomplete( "close" );
/* 198 */ 							}
/* 199 */ 
/* 200 */ 							//Posicionamento da caixa

/* autosuggestmulti.js */

/* 201 */ 							$.data($el.get(0),"autocomplete").menu.element.offset(function(i, coords){
/* 202 */ 								var ac				= $(this);
/* 203 */ 								var ac_sizes		= {width: ac.width(), height:ac.height()};
/* 204 */ 								var el_offset		= $el.offset();
/* 205 */ 								var el_sizes		= {width: $el.width(), height:$el.outerHeight()};
/* 206 */ 								var limits			= {x:window.innerWidth, y: window.innerHeight};
/* 207 */ 								
/* 208 */ 								//posição lateral, detectando colisão
/* 209 */ 								var left			= (el_offset.left + ac_sizes.width > limits.x) ? el_offset.left + (el_sizes.width - ac_sizes.width) : el_offset.left;
/* 210 */ 								
/* 211 */ 								//posição do topo, detectando colisão
/* 212 */ 								var top				= (el_offset.top + el_sizes.height + ac_sizes.height > limits.y) ? el_offset.top - ac_sizes.height : el_offset.top + el_sizes.height;
/* 213 */ 								
/* 214 */ 								//posicao final
/* 215 */ 								return {top: top, left:left };
/* 216 */ 							});
/* 217 */ 							
/* 218 */ 						},
/* 219 */ 						close: function(event, ui) {
/* 220 */ 							$el.val("");
/* 221 */ 						},
/* 222 */ 						change: function(event, ui) {
/* 223 */ 							//ao alterar o valor do campo limpa valor no autosuggest
/* 224 */ 							$el.val("");
/* 225 */ 							
/* 226 */ 						}
/* 227 */ 					}).data( "autocomplete" )._renderItem = function( ul, item ) {
/* 228 */ 						//montando a label do item da lista: info(se houver) ou value
/* 229 */ 						return $( "<li></li>" )
/* 230 */ 							.data( "item.autocomplete", item )
/* 231 */ 							//TODO melhorar formatacao dos itens na lista
/* 232 */ 							.append( "<a>" + ((item.icon) ? "<span class='icon_placer'><img src='"+item.icon+"' /></span>" : "") + item.value + ((item.info) ? "<span class='block'>"+item.info+"</span>" : "") + "</a>" )
/* 233 */ 							.appendTo( ul );
/* 234 */ 					};
/* 235 */ 					
/* 236 */ 				}
/* 237 */ 				
/* 238 */ 			});
/* 239 */ 			
/* 240 */ 
/* 241 */ 			//removendo itens
/* 242 */ 			$(".multisuggest_container").live("click", function(){
/* 243 */ 				$(this).parent().find("input").focus();
/* 244 */ 			});
/* 245 */ 			
/* 246 */ 			$(".multisuggest_item").live("click", function(){
/* 247 */ 				var ms_input = $('#'+$(this).attr('ref'));
/* 248 */ 				var val = $(this).find('input').val();
/* 249 */ 				var ref = $(this).attr("ref");
/* 250 */ 				$(this).fadeOut(300, function(){

/* autosuggestmulti.js */

/* 251 */ 					$(this).remove();
/* 252 */ 					ms_input.trigger('removeItem',eval('('+val+')'));
/* 253 */ 				});
/* 254 */ 				if(ref){
/* 255 */ 					$("#"+ref).focus(); 
/* 256 */ 				}
/* 257 */ 			});
/* 258 */ 			
/* 259 */ 			//se o campo selecionado atualmente for um autosuggest sem a flag, refaz o foco
/* 260 */ 			if($(document.activeElement).is("[multisuggest]") && !$(document.activeElement).data("evt_autosuggest")){
/* 261 */ 				$(document).focus();
/* 262 */ 				$(document.activeElement).focus();
/* 263 */ 			}
/* 264 */ 			
/* 265 */ 		}
/* 266 */ 	});
/* 267 */ })(jQuery);
