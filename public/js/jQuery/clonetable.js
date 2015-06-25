
/* clonetable.js */

/* 1   */ /**
/* 2   *|  * Plugin para clonagem de linhas contendo campos em uma tabela
/* 3   *|  * @author Bruno
/* 4   *| 	USO:
/* 5   *| 	$(document).ready(function(){
/* 6   *| 		$("#myTable").clonetable();
/* 7   *| 	});
/* 8   *| */
/* 9   */ (function($){
/* 10  */ 	$.fn.clonetable = function(options){
/* 11  */ 		// Elemento selecionado **********************************************************
/* 12  */ 		var $this 		= $(this);
/* 13  */ 		var $tbody 		= $this.find("tbody");
/* 14  */ 		var $tfoot 		= $this.find("tfoot");
/* 15  */ 		
/* 16  */ 		// Contador **********************************************************************
/* 17  */ 		var count = 1; 
/* 18  */ 		
/* 19  */ 		// Plugin Defaults ***************************************************************
/* 20  */         var defaults = {
/* 21  */ 			addButtonClass:  	'addClone',					//classe do botao para inserir nova linhas
/* 22  */ 			addButtonLabel:  	'Adicionar Item',			//label do botao para inserir nova linhas
/* 23  */ 			wrapperClass:  		'tableClone',				//classe da div que encapsula a tabela
/* 24  */ 			tableClass:  		'clonetable',				//classe para a tabela
/* 25  */ 			removeButtonClass:  'removeTableClone',			//classe do botao para remover ou apagar linha
/* 26  */ 			fillValues: 		"[]",						//objeto contendo valores a serem inseridos na cloneTable
/* 27  */ 			enterLikeTab: 		false,						//determina se a tecla "enter" se comporta igual a um tab
/* 28  */ 			onBeforeCreateClone: function(){				//metodo executado antes da criação do clone. Se retornar falso, nao cria o clone
/* 29  */         		return true;
/* 30  */         	},			
/* 31  */         	onBeforeRemoveClone: function(row){				//metodo executado antes da remoçao do clone. Se retornar falso, nao remove o clone
/* 32  */         		return true;
/* 33  */         	},			
/* 34  */ 			onCreateClone: function(el, newRow){			//metodo executado ao criar um clone
/* 35  */ 				newRow.find("input:visible").eq(0).focus(); //coloca o foco no primeiro campo da nova linha
/* 36  */ 			},
/* 37  */ 			onRemoveClone: function(){}						//metodo executado ao apagar um clone
/* 38  */         };
/* 39  */         
/* 40  */         var o = $.extend(defaults, options);				//objeto que contem as opcoes
/* 41  */ 		
/* 42  */ 		// Elementos sendo incorporados
/* 43  */ 		var wrapper 	= $("<div class='"+o.wrapperClass+"'></div>");	//wrapper da tabela (seu pai)
/* 44  */ 		var addButton 	= $("<input type='button' class='"+o.addButtonClass+"' value='"+o.addButtonLabel+"' name='addTableCloneButton'></input>");	//botao de novo
/* 45  */ 		var removeRow 	= $("<td><a class='"+o.removeButtonClass+" pointer'>&nbsp</a></td>");	//botao de remocao
/* 46  */ 		 
/* 47  */ 		// Métodos utilizados no plugin **************************************************
/* 48  */ 		var m = {
/* 49  */ 			//inicializa tabela
/* 50  */ 			init: function(){

/* clonetable.js */

/* 51  */ 				//verifica se this é uma tabela
/* 52  */ 				if($this[0].nodeName != "TABLE"){alert("clonetable so pode ser aplicado em tabelas"); return;};
/* 53  */ 				//adiciona classe
/* 54  */ 				$this.addClass(o.tableClass);
/* 55  */ 				//insere wrapper caso já não exista div com a classse correta
/* 56  */ 				if ($this.parent().hasClass(o.wrapperClass)) {
/* 57  */ 					wrapper = $this.parent();
/* 58  */ 				}
/* 59  */ 				else {
/* 60  */ 					$this.wrap(wrapper);
/* 61  */ 					wrapper = $this.parent();
/* 62  */ 				}
/* 63  */ 				//converte os nomes dos campos
/* 64  */ 				m.convertFields();	
/* 65  */ 			//cria botao de adicao e seus eventos
/* 66  */ 				addButton.click(m.cloneRow);
/* 67  */ 				addButton.focus(m.cloneRow);
/* 68  */ 				//anexa botao
/* 69  */ 				wrapper.append(addButton);
/* 70  */ 				//colocando itens do rodape após a tabela
/* 71  */ 				if($tfoot.length>0){
/* 72  */ 					wrapper.append($tfoot.find("td").children());
/* 73  */ 					$tfoot.remove();
/* 74  */ 				}
/* 75  */ 				//preenche tabela com valores recebidos via parametro
/* 76  */ 				m.fillTable();
/* 77  */ 				//inserindo eventos na linha
/* 78  */ 				m.addRowEvents($tbody.find("tr"));
/* 79  */ 				//cria coluna com link p/ remover linha
/* 80  */ 				m.addRemoveColumn();
/* 81  */ 				//inserindo eventos de apagar
/* 82  */ 				m.addRemoveEvts();
/* 83  */ 			},
/* 84  */ 			
/* 85  */ 			//Converte todos os campos na tabela para serem arrays -> [] no final do nome 
/* 86  */ 			convertFields: function(){
/* 87  */ 				$tbody.find('tr').each(function(line, tr){
/* 88  */ 					//convertendo nomes
/* 89  */ 					$(tr).find('[name]').each(function(i, el){
/* 90  */ 						var myEl = $(el).get(0);
/* 91  */ 						var n = myEl.name + "["+count+"]";
/* 92  */ 						myEl.name = n;
/* 93  */ 						if(myEl.id){
/* 94  */ 							var n = myEl.id + "__" + (count);
/* 95  */ 							myEl.id = n;
/* 96  */ 							var parentLabel = $(myEl).parent("label");
/* 97  */ 							if (parentLabel.length)
/* 98  */ 								parentLabel.get(0).for = n;
/* 99  */ 						}
/* 100 */ 					});

/* clonetable.js */

/* 101 */ 					count++;
/* 102 */ 				});
/* 103 */ 			},
/* 104 */ 			
/* 105 */ 			//clona a primeira linha da tabela, limpando todos os valores
/* 106 */ 			cloneRow: function(e){
/* 107 */ 				// Executa evento onBeforeRemoveClone
/* 108 */ 				var ret = {val:true};
/* 109 */ 				$this.trigger('onBeforeCreateClone',[ret]);
/* 110 */ 				// Impede adicionar nova linha caso ret.val = false
/* 111 */ 				if (!ret.val) return;
/* 112 */ 				//executa verificação de criação de clones
/* 113 */ 				if(o.onBeforeCreateClone()){
/* 114 */ 					//recupera primeira linha do corpo da tabela
/* 115 */ 					var row = $tbody.find("tr:first");
/* 116 */ 					var newRow = row.clone();
/* 117 */ 					m.cleanRowData(newRow);
/* 118 */ 					//insere linha no fim da tabela
/* 119 */ 					$tbody.append(newRow);
/* 120 */ 					//convertendo ids dos novos elementos
/* 121 */ 					newRow.find('[id]').each(function(i, el){
/* 122 */ 						var myEl = $(el);
/* 123 */ 						//id
/* 124 */ 						var n = myEl.attr("id");
/* 125 */ 						n = n.substring(0,n.lastIndexOf('__')+2)+count;
/* 126 */ 						myEl.attr("id", n);
/* 127 */ 						//label
/* 128 */ 						myEl.parent("label").attr("for",n);
/* 129 */ 						//nome
/* 130 */ 						n = myEl.attr("name");
/* 131 */ 						n = n.substring(0,n.lastIndexOf('[')+1)+count+']';
/* 132 */ 						myEl.attr("name", n);
/* 133 */ 					});
/* 134 */ 					count++;
/* 135 */ 					//inserindo eventos na linha
/* 136 */ 					m.addRowEvents(newRow);
/* 137 */ 					//chamando metodo do usuario associado ao evento
/* 138 */ 					o.onCreateClone($this, newRow);
/* 139 */ 					$this.trigger('onCreateClone',[$this, newRow]);
/* 140 */ 				}
/* 141 */ 			},
/* 142 */ 			
/* 143 */ 			//limpa dados dos campos em uma linha sendo criada
/* 144 */ 			cleanRowData: function(row){
/* 145 */ 				//retira todos os valores dos campos na linha original
/* 146 */ 				var elements = "select,option,[type=button],[type=checkbox]";
/* 147 */ 				row.find("[value]:not("+elements+")").val("").removeAttr('bt-xtitle');
/* 148 */ 				row.find("[value]:not("+elements+",[number_format])").removeData(); 
/* 149 */ 			},
/* 150 */ 			

/* clonetable.js */

/* 151 */ 			//cria coluna com link para remocao
/* 152 */ 			addRemoveColumn: function(){
/* 153 */ 				$this.find("thead tr:first").append($this.find("thead tr:first").find("th:first").clone().html('&nbsp;').css('width', '16px'));
/* 154 */ 				$tbody.find("tr").each(function(i, el){
/* 155 */ 					var row = $(el);
/* 156 */ 					//adicionando botao na tabela
/* 157 */ 					row.append(removeRow.clone());
/* 158 */ 				});
/* 159 */ 			},
/* 160 */ 			
/* 161 */ 			//remover linha
/* 162 */ 			addRemoveEvts: function(){
/* 163 */ 				//inserindo eventos ao botao
/* 164 */ 				$tbody.find("a."+o.removeButtonClass).live("click", function(evt){
/* 165 */ 					var row = $(this).parents("tr:first");
/* 166 */ 					// Executa evento onBeforeRemoveClone
/* 167 */ 					var ret = {val:true};
/* 168 */ 					$this.trigger('onBeforeRemoveClone',[row, ret]);
/* 169 */ 					// Impede adicionar nova linha caso ret.val = false
/* 170 */ 					if (!ret.val) return;
/* 171 */ 					//executa verificação de criação de clones
/* 172 */ 					if(o.onBeforeRemoveClone($(row))){
/* 173 */ 						var tr = $(evt.target).parents("tr");
/* 174 */ 						var i	= $tbody.find("tr").index(tr); //registra o indice do elemento corrente
/* 175 */ 						//remove apenas se houver mais linhas
/* 176 */ 						if ($tbody.find("tr").length > 1) {
/* 177 */ 							tr.remove();
/* 178 */ 						}
/* 179 */ 						//senao apenas apaga conteudo dos campos linha
/* 180 */ 						else {
/* 181 */ 							m.cleanRowData(tr);
/* 182 */ 						}
/* 183 */ 						o.onRemoveClone($this, tr, i); //Evento do usuario apos a remocao da linha
/* 184 */ 						$this.trigger('onRemoveClone',[$this, tr, i]);
/* 185 */ 					}
/* 186 */ 				});
/* 187 */ 			},
/* 188 */ 			
/* 189 */ 			//eventos da linha
/* 190 */ 			addRowEvents: function(row){
/* 191 */ 				//inserindo evento de Subir e Descer pelo teclado (apenas em inputs)
/* 192 */ 				$(row.get(0).getElementsByTagName("input")).keydown(function(e){
/* 193 */ 					var field = $(e.target).not(".autosuggest");
/* 194 */ 					//numero da linha
/* 195 */ 					var line = $tbody.find("tr").index(row[0]);
/* 196 */ 					//numero da coluna
/* 197 */ 					var col = row.find("td").index(field.closest("td")[0]);
/* 198 */ 					switch(e.keyCode){
/* 199 */ 						//UP
/* 200 */ 						case 38:

/* clonetable.js */

/* 201 */ 							e.preventDefault();
/* 202 */ 							var nline = $tbody.find("tr").eq(line-1);
/* 203 */ 							if(nline[0]){
/* 204 */ 								field.blur();
/* 205 */ 								$(nline).find("td").eq(col).find("input").focus();
/* 206 */ 							}
/* 207 */ 							break;
/* 208 */ 						//DOWN
/* 209 */ 						case 40:
/* 210 */ 							e.preventDefault();
/* 211 */ 							var nline = $tbody.find("tr").eq(line+1);
/* 212 */ 							if(nline[0]){
/* 213 */ 								field.blur();
/* 214 */ 								$(nline).find("td").eq(col).find("input").focus();
/* 215 */ 							}
/* 216 */ 							break;
/* 217 */ 						//Enter
/* 218 */ 						case 13:
/* 219 */ 							e.preventDefault();
/* 220 */ 							if(o.enterLikeTab){
/* 221 */ 								var next = field.parents("tr").next().find("input:not([disabled]):visible:first");
/* 222 */ 								if(next.length > 0){
/* 223 */ 									next.focus();
/* 224 */ 								}else if(field.length > 0){
/* 225 */ 									m.cloneRow();
/* 226 */ 								}
/* 227 */ 							}
/* 228 */ 							break;
/* 229 */ 					}
/* 230 */ 				});
/* 231 */ 			},
/* 232 */ 			
/* 233 */ 			//Preenche a tabela com os valores recebidos via parametros
/* 234 */ 			fillTable: function(){
/* 235 */ 				var values = eval(o.fillValues);
/* 236 */ 				if(!values) return;
/* 237 */ 				for(var i=0; i<values.length; i++){
/* 238 */ 					var fields = $tbody.find("tr:last input");
/* 239 */ 					var x = 0;
/* 240 */ 					for(item in values[i]){
/* 241 */ 						var field = $(fields[x++]); 
/* 242 */ 						if(field){
/* 243 */ 							field.val(values[i][item]);
/* 244 */ 						}
/* 245 */ 					}
/* 246 */ 					if (i < values.length - 1) {
/* 247 */ 						m.cloneRow();
/* 248 */ 					}
/* 249 */ 				}
/* 250 */ 			},

/* clonetable.js */

/* 251 */ 			
/* 252 */ 			//debugger
/* 253 */ 			debug: function(text){
/* 254 */ 				$(document).append("<div>"+text+"</div>");
/* 255 */ 			}
/* 256 */ 		}
/* 257 */ 		
/* 258 */ 		//inicializa script
/* 259 */ 		m.init();
/* 260 */ 	}
/* 261 */ 	
/* 262 */ })(jQuery);
