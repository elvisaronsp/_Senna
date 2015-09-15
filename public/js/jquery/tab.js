
/* tab.js */

/* 1   */ 
/* 2   */ 
/* 3   */ /**
/* 4   *|  * Plugin Jquery para criação de abas
/* 5   *|  * Dependencies:
/* 6   *|  * jQuery 1.2.6 (www.jquery.com)
/* 7   *|  * 
/* 8   *|  * @author Bruno Barbosa <bruno@tagsoft.com.br>
/* 9   *|  */
/* 10  */ (function($){
/* 11  */ 	$.fn.extend({
/* 12  */ 		tab: function(options){
/* 13  */ 			// Plugin Defaults ***************************************************************
/* 14  */ 		    var defaults = {
/* 15  */ 				elements: 		".tab",						// seletor dos elementos conteiners de abas
/* 16  */ 				labelAttr: 		"ref",						// seletor do atributo contendo a label de cada aba no conteiner
/* 17  */ 				idAttr: 		"rel",						// seletor do atributo contendo o identificador de cada aba no conteiner
/* 18  */ 				classFixed:		"tab_fixed",				// classe de abas fixas
/* 19  */ 				className: 		"tab_selector",				// classe para o seletor de abas criado
/* 20  */ 				classSelAtivo: 	"tab_sel_ativa",			// classe para o seletor de abas ativo
/* 21  */ 				classAbaAtiva: 	"tab_ativa",				// classe para o container de abas ativo
/* 22  */ 				classAbaErro: 	"tab_error",				// classe para o container de erros nas abas
/* 23  */ 				classNavigator:	"tab_navigator",			// classe da div contendo os botoes de navegacao entre abas
/* 24  */ 				classNavPrev:	"prevTab",					// atributo que indica o botão de "anterior" na navegação
/* 25  */ 				classNavNext:	"nextTab",					// atributo que indica o botão de "próximo" na navegação
/* 26  */ 				classHidden:	"tab_hidden"				// atributo que indica quando a aba está hidden
/* 27  */ 		    };
/* 28  */ 			
/* 29  */ 			var o 			= $.extend(defaults, options);
/* 30  */ 			
/* 31  */ 			var parent 		= $(this); 								// Elemento Pai
/* 32  */ 			var elements 	= $(document).find(o.elements);			// Lista de elementos com a classe definida para abas
/* 33  */ 			var tabSeletor 	= $("<ul>&nbsp;</ul>"); 				// Criando seletor de abas
/* 34  */ 			
/* 35  */ 			var m = {
/* 36  */ 				
/* 37  */ 				/** Cria as abas 
/* 38  *| 				 ************************************/
/* 39  */ 				createTabs: function(){
/* 40  */ 					if(elements.length == 0) return;								// Sai do script caso nao hajam elementos a serem selecionados 
/* 41  */ 					tabSeletor.addClass(o.className);
/* 42  */ 					//delegando evento de troca de aba
/* 43  */ 					tabSeletor.each(function(){
/* 44  */ 						$("li a", this).live("click", function(evt){
/* 45  */ 							evt.preventDefault();
/* 46  */ 							var $this = $(this);
/* 47  */ 							var tab = $this.parent();
/* 48  */ 							var aba = $this.attr("href");
/* 49  */ 							if(!tab.hasClass("disabled")){
/* 50  */ 								m.selectTab(tab, aba);

/* tab.js */

/* 51  */ 							}
/* 52  */ 						});
/* 53  */ 					});
/* 54  */ 					
/* 55  */ 					// Inserindo-o no pai
/* 56  */ 					if($("#titulo").length > 0){
/* 57  */ 						$("#titulo").after(tabSeletor);
/* 58  */ 					}else{
/* 59  */ 						parent.prepend(tabSeletor);
/* 60  */ 					}
/* 61  */ 					
/* 62  */ 					//Iteragindo com elementos sendo "ABEADOS"
/* 63  */ 					elements.each(function(i, el){
/* 64  */ 						var el 			= $(el);
/* 65  */ 						var label 		= el.attr(o.labelAttr);
/* 66  */ 						var tab_id		= el.attr(o.idAttr);
/* 67  */ 						var tab_fixed	= (el.hasClass(o.classFixed)) ? o.classFixed : "";
/* 68  */ 						var itemSeletor = $("<li id='"+ tab_id +"_tab' class='"+tab_fixed+"'><a href='#" + el.attr('id') + "'><span>" + label + "</span><span class='"+o.classAbaErro+"'>&nbsp;</span></a></li>");
/* 69  */ 						
/* 70  */ 						//inserindo seletor nos comandos
/* 71  */ 						tabSeletor.append(itemSeletor); 
/* 72  */ 						
/* 73  */ 						//vinculando eventos de exibicao ao seletor da aba
/* 74  */ 						itemSeletor.bind("show", function(evt){
/* 75  */ 							m.toggleTab(itemSeletor, el.attr('id'), true, evt);
/* 76  */ 						});
/* 77  */ 						itemSeletor.bind("hide", function(evt){
/* 78  */ 							m.toggleTab(itemSeletor, el.attr('id'), false, evt);
/* 79  */ 						});
/* 80  */ 					});
/* 81  */ 					
/* 82  */ 					//criando botões de navegação
/* 83  */ 					m.createNavButtons();
/* 84  */ 					
/* 85  */ 					//selecionando a aba ativa
/* 86  */ 					m.selectAbaAtiva();
/* 87  */ 					
/* 88  */ 					//Evento de mudanca de hash
/* 89  */ 					//$(window).bind('hashchange', o.changeTab); //Evento padrão do Navegador
/* 90  */ 					//$(window).bind('changehash', o.changeTab); //Customizado
/* 91  */ 				},
/* 92  */ 				
/* 93  */ 				/**Evento para trocar de aba*/
/* 94  */ 				changeTab: function(hash){
/* 95  */ 					hash = window.location.hash.substring(1);
/* 96  */ 					var aba = parent.find("["+o.idAttr+"="+hash+"]").first();
/* 97  */ 					if(aba.length > 0 && !aba.hasClass("disabled") && !aba.hasClass(o.classAbaAtiva)) {
/* 98  */ 						m.selectTab("#"+hash+"_tab", aba, 'false');
/* 99  */ 					}
/* 100 */ 				},

/* tab.js */

/* 101 */ 				
/* 102 */ 				/** Seleciona uma aba, exibindo seu conteúdo **/
/* 103 */ 				selectTab: function(tab_id, aba_id, updateHash){
/* 104 */ 					var tab = $(tab_id);
/* 105 */ 					var aba = $(aba_id);
/* 106 */ 					var tabAtiva = tabSeletor.children("."+o.classSelAtivo);
/* 107 */ 					var abaAtiva = parent.children("."+o.classAbaAtiva); // Aba ativa
/* 108 */ 					if (tabAtiva != tab) {
/* 109 */ 						//chama evento de ocultação das abas
/* 110 */ 						$(document).trigger("hidetabs");
/* 111 */ 						//desativa abas ativas
/* 112 */ 						elements.hide();
/* 113 */ 						tabAtiva.removeClass(o.classSelAtivo);
/* 114 */ 						abaAtiva.removeClass(o.classAbaAtiva);
/* 115 */ 						//ativa esta aba
/* 116 */ 						tab.addClass(o.classSelAtivo);
/* 117 */ 						aba.addClass(o.classAbaAtiva);
/* 118 */ 						aba.show();
/* 119 */ 						//chama evento de aba ativada
/* 120 */ 						tab.trigger("activate", aba_id);
/* 121 */ 						//coloca nome da aba na hashtag
/* 122 */ 						if(updateHash!="false"){
/* 123 */ 							window.location.hash=aba.attr(o.idAttr);
/* 124 */ 						}
/* 125 */ 					}
/* 126 */ 					if (typeof(makeFocus) != 'undefined')
/* 127 */ 						makeFocus();
/* 128 */ 				},
/* 129 */ 				
/* 130 */ 				
/* 131 */ 				/** Seleciona aba ativa **/
/* 132 */ 				selectAbaAtiva: function(){
/* 133 */ 					// Aba ativa
/* 134 */ 					var abaAtiva = parent.children("."+o.classAbaAtiva);
/* 135 */ 					
/* 136 */ 					//Tentando selecionar a aba informada na hashtag
/* 137 */ 					var hash = window.location.hash.substring(1);
/* 138 */ 					if(hash != ""){
/* 139 */ 						var select = parent.find("["+o.idAttr+"="+hash+"]").first();
/* 140 */ 						
/* 141 */ 						//Verifica se aba não está inativa
/* 142 */ 						if(!select.hasClass("disabled") && !select.hasClass("tab_hidden") && select!=abaAtiva){
/* 143 */ 							abaAtiva=select;
/* 144 */ 							select.addClass(o.classAbaAtiva);
/* 145 */ 						}
/* 146 */ 					}
/* 147 */ 					
/* 148 */ 					//ativando primeira aba caso nenhuma tenha sido ativada
/* 149 */ 					if(abaAtiva.length == 0){
/* 150 */ 						abaAtiva = parent.find(o.elements+":first"); 

/* tab.js */

/* 151 */ 						abaAtiva.addClass(o.classAbaAtiva);
/* 152 */ 					}
/* 153 */ 					
/* 154 */ 					//ativando tab da aba ativa
/* 155 */ 					var tabAtiva = tabSeletor.find("[href=#" + abaAtiva.attr('id') + "]").parent().addClass(o.classSelAtivo);
/* 156 */ 					
/* 157 */ 					//chama evento de aba ativada
/* 158 */ 					setTimeout(function () { tabAtiva.trigger('activate', abaAtiva); } , 100); // setTimeout para permitir que outros scripts atribuam ações à este evento
/* 159 */ 					
/* 160 */ 				},
/* 161 */ 				
/* 162 */ 				/** Cria eventos nos botoes de navegação entre as abas **/
/* 163 */ 				createNavButtons: function(){
/* 164 */ 					var ul_h	= ($('ul.tab_selector').length > 0) ? $('ul.tab_selector').height() : 0;
/* 165 */ 					var form_h	= ($('#form_actions').length > 0) ? $('#form_actions').height() : 0;
/* 166 */ 					var title_h	= ($('#titulo').length > 0) ? $('#titulo').height()+23 : 0;
/* 167 */ 					var tab_h 	= $(document).height() - form_h - ul_h - title_h;
/* 168 */ 
/* 169 */ 					//encontra botoes nos elementos
/* 170 */ 					elements.each(function(i, el){
/* 171 */ 						var $el 		= $(el);
/* 172 */ 						var nav 		= $el.find( "."+o.classNavigator );
/* 173 */ 						var prevAction 	= (i > 0) ? function(evt){ m.navAction("prev"); } : null;
/* 174 */ 						var nextAction 	= (i < elements.length-1) ? function(evt){ m.navAction("next"); } : null;
/* 175 */ 						
/* 176 */ 						//alterando estilo da aba para conter o navegador de abas
/* 177 */ 						if(nav.length > 0){
/* 178 */ 							$el.height(tab_h - 53);
/* 179 */ 						}else{
/* 180 */ 							$el.height(tab_h - 40);
/* 181 */ 						}
/* 182 */ 						
/* 183 */ 						//botoes de anterior
/* 184 */ 						$el.find( "."+o.classNavPrev ).click( prevAction );
/* 185 */ 						
/* 186 */ 						//botoes de proximo 
/* 187 */ 						$el.find( "."+o.classNavNext ).click( nextAction );
/* 188 */ 						
/* 189 */ 					});
/* 190 */ 					
/* 191 */ 					//atualiza botoes de navegacao
/* 192 */ 					m.updateNavButtons();
/* 193 */ 				},
/* 194 */ 				
/* 195 */ 				/** Atualiza botoes para navegacao em abas **/
/* 196 */ 				updateNavButtons: function(){
/* 197 */ 					//encontra botoes nos elementos
/* 198 */ 					elements.each(function(i, el){
/* 199 */ 						var $el = $(el);
/* 200 */ 						

/* tab.js */

/* 201 */ 						//procurando navegador de abas
/* 202 */ 						if($el.find( "."+o.classNavigator ).length > 0){
/* 203 */ 							//desabilitando botao caso nao haja abas antes
/* 204 */ 							if($el.prevAll(".tab:not(.disabled,."+o.classHidden+")").length > 0){
/* 205 */ 								$el.find( "."+o.classNavPrev ).css("visibility", "visible");
/* 206 */ 							}else{
/* 207 */ 								$el.find( "."+o.classNavPrev ).css("visibility", "hidden");
/* 208 */ 							}
/* 209 */ 							//idem p/ depois
/* 210 */ 							if($el.nextAll(".tab:not(.disabled,."+o.classHidden+")").length > 0){
/* 211 */ 								$el.find( "."+o.classNavNext ).css("visibility", "visible");
/* 212 */ 							}else{
/* 213 */ 								$el.find( "."+o.classNavNext).css("visibility", "hidden");
/* 214 */ 							}
/* 215 */ 						}
/* 216 */ 					});
/* 217 */ 				},
/* 218 */ 				
/* 219 */ 				/** Cria a acao de navegação para proximo ou anterior **/
/* 220 */ 				navAction: function(type){
/* 221 */ 					//Tab corrente
/* 222 */ 					var abaAtiva = parent.children("."+o.classAbaAtiva); // Aba ativa
/* 223 */ 					var tabAtiva = $("#"+abaAtiva.attr(o.idAttr)+"_tab");
/* 224 */ 					
/* 225 */ 					var el; 
/* 226 */ 					if(type == "prev"){
/* 227 */ 						el = tabAtiva.prevAll(":visible:not(.disabled):not(."+o.classHidden+")");
/* 228 */ 					}else if(type == "next"){
/* 229 */ 						el = tabAtiva.nextAll(":visible:not(.disabled):not(."+o.classHidden+"):first");
/* 230 */ 					}else{
/* 231 */ 						return;
/* 232 */ 					}
/* 233 */ 					
/* 234 */ 					if (el.length > 0) {
/* 235 */ 						var tab = "#" + el.attr("id");
/* 236 */ 						var aba = el.find("a").attr('href');
/* 237 */ 						m.selectTab(tab, aba);
/* 238 */ 					}
/* 239 */ 				},
/* 240 */ 				
/* 241 */ 				/** Exibe ou oculta abas **/
/* 242 */ 				toggleTab: function(el, container, show, evt){
/* 243 */ 					var aba = $(el.find("a").attr("href"));
/* 244 */ 					
/* 245 */ 					//ocultando ou desabilitando seletor da aba
/* 246 */ 					if(el.hasClass(o.classFixed)){
/* 247 */ 						el.toggleClass("disabled", !show);
/* 248 */ 						aba.toggleClass("disabled", !show);
/* 249 */ 					}else{
/* 250 */ 						el.toggle(show);

/* tab.js */

/* 251 */ 					}
/* 252 */ 					var $c = $("#"+container);
/* 253 */ 					// Aponta classe hidden no container da tab
/* 254 */ 					$c.toggleClass(o.classHidden,!show);
/* 255 */ 					//mostrando
/* 256 */ 					if(show){
/* 257 */ 						$c.find(".required").each(
/* 258 */ 							function ()
/* 259 */ 							{
/* 260 */ 								if ($(this).data('wasDisabled') != 1)
/* 261 */ 									$(this).removeAttr("disabled");
/* 262 */ 							}
/* 263 */ 						);
/* 264 */ 					// Hide
/* 265 */ 					} else {
/* 266 */ 						$c.find(".required:not(:[disabled])").each(
/* 267 */ 							function ()
/* 268 */ 							{
/* 269 */ 								if ($(this).attr('disabled') == true)
/* 270 */ 									$(this).data('wasDisabled',1);
/* 271 */ 								else
/* 272 */ 									$(this).data('wasDisabled',0);
/* 273 */ 									
/* 274 */ 								$(this).attr("disabled", "true");
/* 275 */ 							}
/* 276 */ 						);
/* 277 */ 						$c.find(".error").removeClass("error");
/* 278 */ 					}
/* 279 */ 					
/* 280 */ 					//atualiza botoes de navegacao
/* 281 */ 					m.updateNavButtons();
/* 282 */ 				}
/* 283 */ 			};
/* 284 */ 			
/* 285 */ 			// Inicializando abas
/* 286 */ 			m.createTabs();
/* 287 */ 		}
/* 288 */ 	});
/* 289 */ })(jQuery);
/* 290 */ 
