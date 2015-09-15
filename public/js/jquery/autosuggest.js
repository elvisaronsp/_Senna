
/* autosuggest.js */

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
/* 11  */ 	$(document).ready(function(){
/* 12  */ 		if ($.fn.autocomplete) {
/* 13  */ 			
/* 14  */ 			//Método para autosuggest
/* 15  */ 			$.fn.autosuggest = function(){
/* 16  */ 				//campo suggest
/* 17  */ 				var $el = $(this);
/* 18  */ 				
/* 19  */ 				//verificando flag
/* 20  */ 				if(!$.data($el.get(0),"evt_autosuggest")){
/* 21  */ 					//flag de evento
/* 22  */ 					$.data($el.get(0),"evt_autosuggest", true);
/* 23  */ 					
/* 24  */ 					//campo oculto associado
/* 25  */ 					var $valEl = $el.parent().find("[name*=\""+$el.attr("autosuggest")+"\"]");
/* 26  */ 					
/* 27  */ 					//registrando no campo oculto o valor do campo sendo exibido 
/* 28  */ 					$.data($valEl.get(0),"ac_value", $el.val().toLowerCase());
/* 29  */ 					
/* 30  */ 					/**
/* 31  *| 					 * Inserindo Autocomplete
/* 32  *| 					 */
/* 33  */ 					var ac = $el.autocomplete({
/* 34  */ 						
/* 35  */ 						appendTo: $el.parent().parent(),
/* 36  */ 						
/* 37  */ 						autoFocus: ($el.attr("autoFocus") !== "false"), //false retira o foco automático do primeiro elemento
/* 38  */ 						
/* 39  */ 						delay: 700, //delay padrão
/* 40  */ 						
/* 41  */ 						minLength: $el.attr('minlength'),
/* 42  */ 						
/* 43  */ 						source: function(request, response) {
/* 44  */ 							// Cria var contendo os dados que serão enviados por POST para o controller
/* 45  */ 							var is_filled		= ($.data($valEl.get(0),"ac_value") == "" || $.data($valEl.get(0),"ac_value") != $el.val().toLowerCase());
/* 46  */ 							var termo			= (!is_filled) ? "" : request.term;
/* 47  */ 							var post_data 		= { filter: termo };
/* 48  */ 							
/* 49  */ 							// Recupera dados personalizados
/* 50  */ 							var form_url 		= $el.attr('form_url');

/* autosuggest.js */

/* 51  */ 							var form_title 		= $el.attr('form_title');
/* 52  */ 							var new_item_label 	= $el.attr('new_item_label');
/* 53  */ 							var new_item_info 	= $el.attr('new_item_info');
/* 54  */ 							var form_url_field 	= $el.attr('form_url_field');
/* 55  */ 							var custom_data 	= {};
/* 56  */ 							$valEl.trigger('customData', [custom_data]);
/* 57  */ 							custom_data 		= {custom: custom_data};
/* 58  */ 							
/* 59  */ 							// Efetua o merge dos dados padrão com dados necessários, recuperados do evento customData
/* 60  */ 							$.extend(post_data,custom_data);
/* 61  */ 							$.ajax({
/* 62  */ 								url: $el.attr('source'),
/* 63  */ 								dataType: "json",
/* 64  */ 								cache: "true",
/* 65  */ 								type: "POST",
/* 66  */ 								data: post_data,
/* 67  */ 								success: function(data) {
/* 68  */ 									//caso haja link e label para novo item, cria elemento na lista
/* 69  */ 									if(form_url!=="" && new_item_label!==""){
/* 70  */ 										data.push({value: new_item_label, info: new_item_info, form_url: form_url, form_title: form_title, classe:"create", form_url_field:form_url_field});
/* 71  */ 									}
/* 72  */ 									response(data);
/* 73  */ 								}
/* 74  */ 							});
/* 75  */ 						},
/* 76  */ 						
/* 77  */ 						select: function(event, ui) {
/* 78  */ 							
/* 79  */ 							//verificando se item possui link
/* 80  */ 							if(ui.item.form_url){
/* 81  */ 								var complete = function(ac){
/* 82  */ 									return function(){
/* 83  */ 										// pass empty string as value to search for, displaying all results
/* 84  */ 										$el.autocomplete( "search", $el.val() );
/* 85  */ 										$el.focus();
/* 86  */ 									};
/* 87  */ 								};
/* 88  */ 								var onLoad = function(){
/* 89  */ 									return function(element){
/* 90  */ 										var newDocument = $(element).find("iframe:first").contents();
/* 91  */ 										$valEl.trigger('onWindowLoad', [newDocument, $el.val()]);
/* 92  */ 										//Valor para autopreencher
/* 93  */ 										if(ui.item.form_url_field)
/* 94  */ 											newDocument.find("[id*=" + ui.item.form_url_field + "]").val($el.val());
/* 95  */ 									};
/* 96  */ 								};
/* 97  */ 								event.preventDefault();
/* 98  */ 								parent.MochaUI.openModal({
/* 99  */ 									id: 			ui.item.form_url,
/* 100 */ 									title: 			ui.item.form_title,

/* autosuggest.js */

/* 101 */ 									contentURL: 	ui.item.form_url,
/* 102 */ 									width: 			1000,
/* 103 */ 									height: 		587,
/* 104 */ 									onCloseComplete: complete(),
/* 105 */ 									onContentLoaded: onLoad()
/* 106 */ 								});
/* 107 */ 								return;
/* 108 */ 							}
/* 109 */ 							
/* 110 */ 							//registra valor no campo oculto associado
/* 111 */ 							$valEl.val(ui.item[$el.attr('valuefield')]);
/* 112 */ 							//firma valor no campo visivel
/* 113 */ 							$el.val(ui.item.value);
/* 114 */ 							//registra no campo para validar alteracoes
/* 115 */ 							$.data($valEl.get(0),"ac_value", $el.val().toLowerCase());
/* 116 */ 							//disparando evento change no elemento contendo o valor
/* 117 */ 							$valEl.trigger('change', [this, ui.item]);
/* 118 */ 							//retira erro do campo
/* 119 */ 							$el.removeClass("error");
/* 120 */ 						},
/* 121 */ 						
/* 122 */ 						focus: function(event, ui) {
/* 123 */ 							event.preventDefault();
/* 124 */ 							return;
/* 125 */ 						},
/* 126 */ 						
/* 127 */ 						open: function(event, ui) {
/* 128 */ 							//se o autosuggest nao possui o foco nem abre a lista
/* 129 */ 							if(event.target != document.activeElement){
/* 130 */ 								$el.autocomplete( "close" );
/* 131 */ 							} 
/* 132 */ 							
/* 133 */ 							//Se for disabled ou readonly, nao abre lista e tira foco (segurança)
/* 134 */ 							if($(event.target).is("[disabled]") || $(event.target).is("[readonly]")){
/* 135 */ 								$el.autocomplete( "close" );
/* 136 */ 								$(event.target).blur();
/* 137 */ 							}
/* 138 */ 							
/* 139 */ 							//Posicionamento da caixa
/* 140 */ 							$.data($el.get(0),"autocomplete").menu.element.offset(function(i, coords){
/* 141 */ 								var ac				= $(this);
/* 142 */ 								var ac_sizes		= {width: ac.width(), height:ac.height()};
/* 143 */ 								var el_offset		= $el.offset();
/* 144 */ 								var el_sizes		= {width: $el.width(), height:$el.outerHeight()};
/* 145 */ 								var limits			= {x:window.innerWidth, y: window.innerHeight};
/* 146 */ 								
/* 147 */ 								//posição lateral, detectando colisão
/* 148 */ 								var left			= (el_offset.left + ac_sizes.width > limits.x) ? el_offset.left + (el_sizes.width - ac_sizes.width) : el_offset.left;
/* 149 */ 								
/* 150 */ 								//posição do topo, detectando colisão

/* autosuggest.js */

/* 151 */ 								var top				= (el_offset.top + el_sizes.height + ac_sizes.height > limits.y) ? el_offset.top - ac_sizes.height : el_offset.top + el_sizes.height;
/* 152 */ 								
/* 153 */ 								//posicao final
/* 154 */ 								return {top: top, left:left };
/* 155 */ 							});
/* 156 */ 			                
/* 157 */ 						},
/* 158 */ 						
/* 159 */ 						close: function(event, ui) {
/* 160 */ 						},
/* 161 */ 						
/* 162 */ 						change: function(event, ui) {
/* 163 */ 							
/* 164 */ 							//caso aceite novos valores, não valida (Utilizar Atributo new="repeat | empty") para repetir o valor ou deixar vazio
/* 165 */ 							var n = $el.attr("new"); 
/* 166 */ 							
/* 167 */ 							if( n !== undefined && n !== ""){
/* 168 */ 								if(n == "repeat"){
/* 169 */ 									$valEl.val($el.val());
/* 170 */ 									$.data($valEl.get(0),"ac_value", $el.val().toLowerCase());
/* 171 */ 								}
/* 172 */ 								return true;
/* 173 */ 							}
/* 174 */ 							
/* 175 */ 							//retira erro do campo
/* 176 */ 							$el.removeClass("error");
/* 177 */ 							
/* 178 */ 							//execucao anormal
/* 179 */ 							if($.data($valEl.get(0),"ac_value") == "" || $.data($valEl.get(0),"ac_value") != $el.val().toLowerCase()){
/* 180 */ 								//limpando valor do campo oculto
/* 181 */ 								$valEl.val("");
/* 182 */ 								
/* 183 */ 								//mostra erro caso o campo tenha algo escrito
/* 184 */ 								if($el.val() != ""){
/* 185 */ 									$el.addClass("error");
/* 186 */ 								}
/* 187 */ 								
/* 188 */ 								//dispara evento clear do elemento
/* 189 */ 								$valEl.trigger('clear', [this]);
/* 190 */ 							}
/* 191 */ 						}
/* 192 */ 					});
/* 193 */ 					
/* 194 */ 					
/* 195 */ 					$.data($el.get(0),"autocomplete")._renderItem = function( ul, item ) {
/* 196 */ 						//montando a label do item da lista: info(se houver) ou value
/* 197 */ 						var $li = $( "<li"+ ((item.classe) ? " class='"+item.classe+"'" : "" ) +"></li>" );
/* 198 */ 						$.data($li.get(0),"item.autocomplete",item);
/* 199 */ 						//TODO melhorar formatacao dos itens na lista
/* 200 */ 						return $li.append( "<a>" + ((item.icon) ? "<span class='icon_placer'><img src='"+item.icon+"' /></span>" : "") + item.value + ((item.info) ? "<span class='block'>"+item.info+"</span>" : "") + "</a>" )

/* autosuggest.js */

/* 201 */ 							.appendTo( ul );
/* 202 */ 					};
/* 203 */ 					
/* 204 */ 					/**
/* 205 *| 					 * Inserindo acao ao perder o foco
/* 206 *| 					 * */
/* 207 */ 					$el.bind('blur.autosuggest', function(evt){
/* 208 */ 						
/* 209 */ 						//copia no campo oculto o valor do autosuggest, caso informado
/* 210 */ 						if($el.attr('copyValue') === 'true'){
/* 211 */ 							$valEl.val($el.val());	
/* 212 */ 							$.data($valEl.get(0),"ac_value", $el.val().toLowerCase());
/* 213 */ 						}
/* 214 */ 						
/* 215 */ 						//se campo estiver vazio ou com valor diferente do registrado, limpa campo de valor e executa o clear
/* 216 */ 						else if($el.val()=="" || $.data($valEl.get(0),"ac_value") != $el.val().toLowerCase()){
/* 217 */ 							$valEl.val("");							//limpa valor do campo oculto
/* 218 */ 							$.data($valEl.get(0),"ac_value","");	//remove registro do valor
/* 219 */ 							$valEl.trigger('clear', [this]);		//dispara evento clear do elemento
/* 220 */ 						}
/* 221 */ 					});
/* 222 */ 				}
/* 223 */ 			
/* 224 */ 			};
/* 225 */ 			
/* 226 */ 			/**
/* 227 *| 			 * Insere o AutoSuggest ao carregar formulario
/* 228 *| 			 */
/* 229 */ 			$("[autosuggest]").live("focus", function(){$(this).autosuggest();});
/* 230 */ 			
/* 231 */ 			
/* 232 */ 			/**
/* 233 *| 			 * Esconde menus de autosugest ao trocar abas
/* 234 *| 			 */
/* 235 */ 			$(document).bind("hidetabs", function(){
/* 236 */ 				$("[autosuggest]").each(function(){
/* 237 */ 					var as = $.data($(this).get(0),"autocomplete");
/* 238 */ 					if(as){
/* 239 */ 						as.close();
/* 240 */ 					}
/* 241 */ 				});
/* 242 */ 			});
/* 243 */ 			
/* 244 */ 			
/* 245 */ 			/**
/* 246 *| 			 * Inserindo ação no botao de combobox
/* 247 *| 			 */
/* 248 */ 			$(".ui-autocomplete_combo").live("click", function(evt){
/* 249 */ 				var $el = $(this).next();
/* 250 */ 				$el.autosuggest();

/* autosuggest.js */

/* 251 */ 				
/* 252 */ 				if($el.is(".disabled") || $el.attr("disabled") || $el.attr("readonly")){
/* 253 */ 					return;
/* 254 */ 				}
/* 255 */ 				
/* 256 */ 				// close if already visible
/* 257 */ 				if ( $el.autocomplete( "widget" ).is( ":visible" ) ) {
/* 258 */ 					$el.autocomplete( "close" );
/* 259 */ 					$el.focus();
/* 260 */ 					return;
/* 261 */ 				}
/* 262 */ 				
/* 263 */ 				// pass empty string as value to search for, displaying all results
/* 264 */ 				$el.focus();
/* 265 */ 				$el.autocomplete( "search", $el.val() );
/* 266 */ 			});
/* 267 */ 			
/* 268 */ 			//se o campo selecionado atualmente for um autosuggest sem a flag, refaz o foco
/* 269 */ 			if($(document.activeElement).is("[autosuggest]") && !$(document.activeElement).data("evt_autosuggest")){
/* 270 */ 				$(document).focus();
/* 271 */ 				$(document.activeElement).focus();
/* 272 */ 			}
/* 273 */ 		}
/* 274 */ 
/* 275 */ 	});
/* 276 */ })(jQuery);
