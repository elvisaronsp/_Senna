
/* cloneform.js */

/* 1   */ /**
/* 2   *|  * Plugin para clonagem de linhas contendo campos em uma tabela
/* 3   *|  * @author Bruno
/* 4   *| 	$(document).ready(function(){
/* 5   *| 		$("#myTable").cloneform();
/* 6   *| 	});
/* 7   *| */
/* 8   */ (function($){
/* 9   */ 	$.fn.cloneform = function(options){
/* 10  */ 		
/* 11  */ 		// Elemento selecionado **********************************************************
/* 12  */ 		var $this 	= $(this);
/* 13  */ 		var $tform 	= $this.find('.table_form');
/* 14  */ 		var $table 	= $this.find('.table_list');
/* 15  */ 		var $tbody 	= $table.find('tbody');
/* 16  */ 		
/* 17  */ 		var defaults = {
/* 18  */ 			addButton: '',
/* 19  */ 			updateButton: '',
/* 20  */ 			removeButton: '.removeFormCloneRow',
/* 21  */ 			editButton: '.editFormCloneRow',
/* 22  */ 			fieldPrefix: '',
/* 23  */ 			insertOn: 'bottom',											//onde inserir elemento 'top' | 'bottom'
/* 24  */ 			highlightColor: '#FFEC1F',									//cor exibida no fundo da linha ao inserir ou atualizar
/* 25  */ 			increment: {
/* 26  */ 						fields: [],
/* 27  */ 						rule: function(tr){ return null; } 				//deve retornar um TR para ser atualizado
/* 28  */ 						},
/* 29  */ 			validateForm: function(container){ return true; },			//metodo executado antes da criação do clone. Se retornar falso, nao cria o clone			
/* 30  */ 			onCreateClone: function(tbody, el){},						//metodo executado ao criar um clone
/* 31  */ 			onUpdateClone: function(tbody, el){},						//metodo executado ao atualizar um clone
/* 32  */ 			onRemoveClone: function(tbody, el){},						//metodo executado ao apagar um clone
/* 33  */ 			onBeforeRemoveClone: function(tbody, el){ return true; }, 	//metodo executado antes de apagar um clone
/* 34  */ 			onBeforeEditClone: function(tbody, el){ return true; }, 	//metodo executado após clicar no botão de editar
/* 35  */ 			onClearClone: function(table, el){}							//metodo executado ao limpar o formulario
/* 36  */ 		};
/* 37  */ 		
/* 38  */ 		var o = $.extend(defaults, options);			//objeto que contem as opcoes
/* 39  */ 		
/* 40  */ 		var m = { 
/* 41  */ 			init: function(){
/* 42  */ 				//ação dos botões de remover linhas da listagem
/* 43  */ 				$(o.removeButton).live('click._cloneform',function(){
/* 44  */ 					m.removeCloneRow(this);
/* 45  */ 				});
/* 46  */ 				
/* 47  */ 				//ação dos botões de editar linhas da listagem	
/* 48  */ 				$(o.editButton).live('click._cloneform',function(){
/* 49  */ 					m.editCloneRow($(this).parents('tr:first'));					
/* 50  */ 				});

/* cloneform.js */

/* 51  */ 				
/* 52  */ 				//ações dos botões do formulário
/* 53  */ 				$this.find(o.addButton).click(m.addCloneRow);
/* 54  */ 				$this.find(o.updateButton).click(m.updateCloneRow);
/* 55  */ 				$this.find(o.updateButton).hide();
/* 56  */ 				
/* 57  */ 				
/* 58  */ 				//se a tabela estiver preenchida, esconde a primeira linha
/* 59  */ 				if ($tbody.find('tr').length == 1 && ($tbody.find('tr .clone_id').val() == "{"+$tbody.find('tr .cloneid').attr("name")+"}" || $tbody.find('tr .clone_id').val() == "" || $tbody.find('tr .clone_id').val() == undefined)) {
/* 60  */ 					$tbody.find('tr:first').data("delete", true);
/* 61  */ 					$tbody.find('tr:first').hide();
/* 62  */ 				}
/* 63  */ 			},
/* 64  */ 			
/* 65  */ 			addCloneRow: function(){
/* 66  */ 				if(m.validaForm()) {
/* 67  */ 					var increment = null;
/* 68  */ 					var currEl = null;
/* 69  */ 					var $ref_el = $tbody.find('tr:last');
/* 70  */ 					var $el = $ref_el.clone(true);
/* 71  */ 					$el.data("delete", false);
/* 72  */ 					
/* 73  */ 										
/* 74  */ 					//caso contrario verifica por atualização de elementos existentes antes de criar linha
/* 75  */ 					if(!$ref_el.data("delete") && o.increment.fields.length > 0){
/* 76  */ 						$tbody.find('tr').each(function(i, el){
/* 77  */ 							var aux = o.increment.rule(el);
/* 78  */ 							if(aux) increment = aux;
/* 79  */ 						});
/* 80  */ 					}
/* 81  */ 					
/* 82  */ 					//se incrementando 
/* 83  */ 					if(increment){
/* 84  */ 						o.increment.fields.each(function(field){
/* 85  */ 							//obtendo campo
/* 86  */ 							var f = $(increment).find('input[name*='+field+']:first');  //campo a ser somado
/* 87  */ 							var v = $(increment).find('span[ref*='+field+']:first');	//valor exibido (span)
/* 88  */ 							var r = jQuery('#'+o.fieldPrefix+'_'+field);				//referencia do formulario
/* 89  */ 							var format = r.attr("number_format");						//formato de numeros do campo referencia
/* 90  */ 							//se todos estes campos e valores estiverem presentes, realiza a soma
/* 91  */ 							if(f && v && r && format){
/* 92  */ 								f.attr("number_format", format);
/* 93  */ 								//preenche input
/* 94  */ 								var newVal = f.numberValue(true) + r.numberValue(true);
/* 95  */ 								f.val(newVal).numberFormat();
/* 96  */ 								v.text(f.val());
/* 97  */ 							}
/* 98  */ 							
/* 99  */ 							//selecionando p/ efeitos finais
/* 100 */ 							currEl = increment; 

/* cloneform.js */

/* 101 */ 						});
/* 102 */ 					}else{
/* 103 */ 						//insere na tabela
/* 104 */ 						if(o.insertOn == 'bottom')
/* 105 */ 							$el.insertAfter($ref_el);
/* 106 */ 						else
/* 107 */ 							$el.insertBefore($ref_el);
/* 108 */ 						
/* 109 */ 						//apaga linha se for a de referencia inicial
/* 110 */ 						if($ref_el.data("delete")) $ref_el.remove();
/* 111 */ 						
/* 112 */ 						//preenche inputs clonados
/* 113 */ 						$el.find('input').each(function(i, el){
/* 114 */ 							var nome = $(el).attr('name').replace(/[[]]/, '');
/* 115 */ 							$(el).val($('#'+o.fieldPrefix+'_'+nome).val());
/* 116 */ 						});
/* 117 */ 						//preenche campos da tabela
/* 118 */ 						$el.find('span').each(function(i, el){
/* 119 */ 							var nome = $(el).attr('ref');
/* 120 */ 							$(el).text($('#'+o.fieldPrefix+'_'+nome).val());
/* 121 */ 						});
/* 122 */ 						
/* 123 */ 						//exibe nova linha
/* 124 */ 						$el.show();
/* 125 */ 						
/* 126 */ 						//colore tabela
/* 127 */ 						$table.colorize();
/* 128 */ 						
/* 129 */ 						//selecionando p/ efeitos finais
/* 130 */ 						currEl = $el;
/* 131 */ 						
/* 132 */ 					}
/* 133 */ 					
/* 134 */ 					//chama funcao de clone criado
/* 135 */ 					o.onCreateClone($tbody, $el);
/* 136 */ 					$tform.trigger('onCreateClone',[$tbody,$el]);
/* 137 */ 					
/* 138 */ 					//limpa campos do formulário
/* 139 */ 					m.clearForm($el);
/* 140 */ 					
/* 141 */ 					//aplica efeitos
/* 142 */ 					m.editEffects(currEl);
/* 143 */ 				}
/* 144 */ 			},
/* 145 */ 
/* 146 */ 			//Efeitos com mootools
/* 147 */ 			editEffects: function(el){
/* 148 */ 				//scroll c/ mootools
/* 149 */ 				//coletando dados dos elementos
/* 150 */ 				var $el				= $$($(el)[0])[0];

/* cloneform.js */

/* 151 */ 				var position 		= $el.getPosition($tbody[0]).y;
/* 152 */ 				var elHeight		= $el.getHeight();
/* 153 */ 				var bDivHeight 		= $tbody[0].getHeight();
/* 154 */ 				var bDivScroll 		= $tbody[0].getScroll().y;
/* 155 */ 				
/* 156 */ 				/*se a posicao do elemento for maior que a altura do bDiv, 
/* 157 *| 				aumenta o scroll em posicao + altura do elemento - altura da div*/
/* 158 */ 				if(position > bDivScroll + bDivHeight - elHeight){
/* 159 */ 					$tbody[0].scrollTo(0, position + elHeight - bDivHeight);
/* 160 */ 				}
/* 161 */ 				//se a posicao for menor, coloca o elemento no topo
/* 162 */ 				else if(position < bDivScroll){
/* 163 */ 					$tbody[0].scrollTo(0, position);
/* 164 */ 				}
/* 165 */ 				
/* 166 */ 				//pisca c/ Mootools
/* 167 */ 				$el.highlight(o.highlightColor);
/* 168 */ 			},
/* 169 */ 
/* 170 */ 			//editando valores da linha selecionada
/* 171 */ 			editCloneRow: function(el){
/* 172 */ 				if(o.onBeforeEditClone($tbody, $(el)) === false)
/* 173 */ 				{
/* 174 */ 					return false;
/* 175 */ 				}	
/* 176 */ 				//trocando botoes
/* 177 */ 				$this.find(o.addButton).hide();
/* 178 */ 				$this.find(o.updateButton).show();
/* 179 */ 	
/* 180 */ 				//marcando item editado
/* 181 */ 				$this.find('.edit').removeClass('edit');
/* 182 */ 				$(el).addClass('edit');
/* 183 */ 	
/* 184 */ 				//varrendo campos para recuperar valores para o formulário
/* 185 */ 				$(el).find('input').each(function(i, el){
/* 186 */ 					var nome = $(el).attr('name').replace(/[[]]/, '');
/* 187 */ 					$this.find('#'+o.fieldPrefix+'_'+nome).val($(el).val());
/* 188 */ 					//se for um ausuggest completa o seu campo hidden com o data ac_value
/* 189 */ 					if($this.find('[autosuggest='+o.fieldPrefix+'_'+nome+']').length > 0){
/* 190 */ 						$this.find('[autosuggest='+o.fieldPrefix+'_'+nome+']').val($(el).val());
/* 191 */ 						$this.find('[name='+o.fieldPrefix+'_'+nome+']').val($(el).val()).data("ac_value",$(el).val().toLowerCase());
/* 192 */ 					}
/* 193 */ 					else{
/* 194 */ 						$this.find('[name='+o.fieldPrefix+'_'+nome+']').val($(el).val());
/* 195 */ 					}
/* 196 */ 				});
/* 197 */ 	
/* 198 */ 				$(el).find('span').each(function(i, el){
/* 199 */ 					var nome = $(el).attr('ref');
/* 200 */ 					$this.find('#'+o.fieldPrefix+'_'+nome).val($(el).text());

/* cloneform.js */

/* 201 */ 					$this.find('[name='+o.fieldPrefix+'_'+nome+']').val($(el).text());
/* 202 */ 				});
/* 203 */ 				$tform.trigger('editCloneRow',[$tbody,$(el)]);
/* 204 */ 				
/* 205 */ 			},
/* 206 */ 
/* 207 */ 			//atualizando valores da linha sendo editada
/* 208 */ 			updateCloneRow: function(){
/* 209 */ 				if(m.validaForm()) {
/* 210 */ 					//trocando botoes
/* 211 */ 					$this.find(o.addButton).show();
/* 212 */ 					$this.find(o.updateButton).hide();
/* 213 */ 		
/* 214 */ 					$el = $this.find('.edit');
/* 215 */ 		
/* 216 */ 					//preenche inputs clonados
/* 217 */ 					$el.find('input').each(function(i, el){
/* 218 */ 						var nome = $(el).attr('name').replace(/[[]]/, '');
/* 219 */ 						$(el).val($this.find('#'+o.fieldPrefix+'_'+nome).val());
/* 220 */ 					});
/* 221 */ 		
/* 222 */ 					//preenche campos da tabela
/* 223 */ 					$el.find('span').each(function(i, el){
/* 224 */ 						var nome = $(el).attr('ref');
/* 225 */ 						$(el).text($this.find('#'+o.fieldPrefix+'_'+nome).val());
/* 226 */ 					});
/* 227 */ 					//desmarcando elemento que esta sendo editado
/* 228 */ 					$this.find('.edit').removeClass('edit');
/* 229 */ 					
/* 230 */ 					//evento
/* 231 */ 					o.onUpdateClone($tbody, $el);
/* 232 */ 					$table.trigger('onUpdateClone',[$tbody, $el]);
/* 233 */ 					
/* 234 */ 					//limpa campos do formulário
/* 235 */ 					m.clearForm($el);
/* 236 */ 					
/* 237 */ 					//aplica efeitos
/* 238 */ 					m.editEffects($el);
/* 239 */ 					
/* 240 */ 					$tform.trigger('updateCloneRow',[$tbody,$el]);
/* 241 */ 				}
/* 242 */ 			},
/* 243 */ 
/* 244 */ 			//limpando valores dos campos do formulário de inclusão
/* 245 */ 			clearForm: function($el) {
/* 246 */ 				$this.find('.temp').each(function(i, el){ $(el).val(''); });
/* 247 */ 				o.onClearClone($this, $el);
/* 248 */ 			},
/* 249 */ 			
/* 250 */ 			//remove linha apenas se nao for a ultima

/* cloneform.js */

/* 251 */ 			removeLine: function(me){
/* 252 */ 				var myel = $(me);
/* 253 */ 
/* 254 */ 				//se ha apenas uma linha, apaga conteudo e mantem linha
/* 255 */ 				if($tbody.find('tr').length == 1){
/* 256 */ 					//preenche inputs clonados
/* 257 */ 					myel.find('input').each(function(i, el){
/* 258 */ 						$(el).val("");
/* 259 */ 					});
/* 260 */ 	
/* 261 */ 					//preenche campos da tabela
/* 262 */ 					myel.find('span').each(function(i, el){
/* 263 */ 						$(el).text("");
/* 264 */ 					});
/* 265 */ 					
/* 266 */ 					//cria flag para ser removida na proxima insercao
/* 267 */ 					myel.data("delete", true);
/* 268 */ 					myel.hide();
/* 269 */ 				}else{
/* 270 */ 					myel.remove();
/* 271 */ 				}
/* 272 */ 				return myel;
/* 273 */ 			},
/* 274 */ 			
/* 275 */ 			//removendo linha		
/* 276 */ 			removeCloneRow: function(el) {
/* 277 */ 				var myel = $(el).parents('tr:first');
/* 278 */ 				if(o.onBeforeRemoveClone($tbody, $(myel))){
/* 279 */ 					m.flagUpdate($(el));
/* 280 */ 					myel = m.removeLine(myel);
/* 281 */ 					//evento
/* 282 */ 					o.onRemoveClone($tbody, myel);
/* 283 */ 					$tform.trigger('onRemoveClone',[$tbody, myel]);
/* 284 */ 				}
/* 285 */ 			},
/* 286 */ 
/* 287 */ 			//atualiza flag que identifica itens removidos
/* 288 */ 			flagUpdate: function(el){
/* 289 */ 				var flag = el.parents().find(".clone_flag:first");
/* 290 */ 				var cloneIdEl = el.parents().find(".clone_id"); 	//elemento que contem a id do clone
/* 291 */ 				if(!cloneIdEl) return;								//caso o campo id_clone nao exista, sai
/* 292 */ 				var cloneId = cloneIdEl.attr('value');				//valor da id do clone, caso exista
/* 293 */ 				if(cloneId=="" || !cloneId) return;					//Sai se o valor estiver vazio ou nao existir
/* 294 */ 				var oldValue = flag.val();							//registrando valor anterior da flag
/* 295 */ 				if(oldValue=="") {
/* 296 */ 					flag.val(cloneId);
/* 297 */ 				} else {
/* 298 */ 					flag.val(oldValue+","+cloneId);
/* 299 */ 				}
/* 300 */ 			},

/* cloneform.js */

/* 301 */ 			
/* 302 */ 			validaForm: function(){
/* 303 */ 				var $ret = false;
/* 304 */ 				var $cont = 0;
/* 305 */ 				
/* 306 */ 				$this.find('[formRequired=true]').each( function(i, el) {
/* 307 */ 					if($(el).val() == ''){ $cont++; }
/* 308 */ 				});
/* 309 */ 				
/* 310 */ 				if($cont == 0){ $ret = true; }
/* 311 */ 				
/* 312 */ 				return $ret && o.validateForm($this);
/* 313 */ 			}
/* 314 */ 		};
/* 315 */ 		m.init();
/* 316 */ 	};
/* 317 */ })(jQuery);
