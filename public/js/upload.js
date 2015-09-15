
/* upload.js */

/* 1   */ var Upload = new Class({
/* 2   */ 	Implements: [Events,Options],
/* 3   */ 	        
/* 4   */ 	getOptions: function(){
/* 5   */ 		return {
/* 6   */ 			uploadClass: 		".upload",						//classe dos conteiners de uploads
/* 7   */ 			deleteElClass: 		".qq-delete",					//classe dos conteiners de uploads
/* 8   */ 			imagesContainer: 	".upload_images_container", 	//contem a classe do elemento que contem as imagens sendo enviadas
/* 9   */ 			valElClass: 		".upload_principal_val", 		//contem a classe do elemento que contem o valor da imagem principal
/* 10  */ 			mainElClass: 		"foto_principal", 				//contem a classe do elemento selecionado p/ principal
/* 11  */ 			gabaritoEl: 		"#upload_gabarito_container" 	//contem a classe do elemento selecionado p/ principal
/* 12  */ 		};
/* 13  */ 	},
/* 14  */ 	
/* 15  */ 	initialize: function(options){
/* 16  */ 		this.setOptions(this.getOptions(), options);
/* 17  */ 		this.createUploaders();
/* 18  */ 		this.selectFotoPrincipal();
/* 19  */ 		this.mouseEvent();
/* 20  */ 	},
/* 21  */ 	
/* 22  */ 	/**
/* 23  *| 	 * Inicializa o mecanismo de upload para cada campo contendo a classe
/* 24  *| 	 */
/* 25  */ 	createUploaders: function(){
/* 26  */ 		var obj = this;
/* 27  */ 		$$(".upload").each(function(el, i){
/* 28  */ 			var $el 		= $$(el);
/* 29  */ 			var template 	=  $el.get("html");
/* 30  */ 			var action 		= $el.get("action");
/* 31  */ 			var params		= {"gaterp":"true"};
/* 32  */ 			var extensions	= obj.getExtensions($el);
/* 33  */ 			
/* 34  */ 		    var uploader = new qq.FileUploader({
/* 35  */ 		        element: $el[0],				//elemento
/* 36  */ 		        template: template,				// template de exibicao do upload
/* 37  */ 		        action: action,					// url of the server-side upload script, should be on the same domain 
/* 38  */ 		        params: params,					// additional data to send, name-value pairs 
/* 39  */ 		        allowedExtensions: extensions,	// ex. ['jpg', 'jpeg', 'png', 'gif'] or []
/* 40  */ 		        sizeLimit: 0, 					// max size. each file size limit in bytes. this option isn't supported in all browsers 
/* 41  */ 		        minSizeLimit: 0, 				// min size
/* 42  */ 		        debug: false,					// set to true to output server response to console
/* 43  */ 		        showMessage: obj.showMessage,
/* 44  */ 		        onSubmit: obj.onSubmit,
/* 45  */ 		        onProgress: obj.onProgress,
/* 46  */ 		        onComplete: function(id, fileName, responseJSON){ obj.onComplete($el, id, fileName, responseJSON); },
/* 47  */ 		        onCancel: obj.onCancel
/* 48  */ 		    });
/* 49  */ 		    
/* 50  */ 		    if(typeof(uploadMessages)!='undefined'){

/* upload.js */

/* 51  */ 		    	uploader._options.messages = uploadMessages; 
/* 52  */ 		    }
/* 53  */ 		    
/* 54  */ 		});
/* 55  */ 	},
/* 56  */ 	
/* 57  */ 	/**
/* 58  *| 	 * Extrai as extensoes do atributo do elemento de upload
/* 59  *| 	 */
/* 60  */ 	getExtensions: function($el){
/* 61  */ 		var str = $el.get("extensions")[0];
/* 62  */ 		if(str){
/* 63  */ 			str = str.split(",");
/* 64  */ 			str.each(function(el, i){
/* 65  */ 				str[i] = el.trim();
/* 66  */ 			});
/* 67  */ 			return eval("['"+str.join("','")+"']");
/* 68  */ 		}
/* 69  */ 		
/* 70  */ 		return [];
/* 71  */ 	},
/* 72  */ 	
/* 73  */ 	/**
/* 74  *| 	 * EVENTOS ASSOCIADOS AO UPLOADER
/* 75  *| 	 ********************************************/
/* 76  */ 	
/* 77  */ 	/** Executado ao ocorrer algum erro*/
/* 78  */ 	showMessage: function(message){ 
/* 79  */ 		Sexy.alert(message); 
/* 80  */ 	},
/* 81  */ 	/** Executado ao submeter o upload */
/* 82  */ 	onSubmit: function(id, fileName){
/* 83  */ 	},
/* 84  */ 	/** Executado durante o upload */
/* 85  */ 	onProgress: function(id, fileName, loaded, total){
/* 86  */ 	},
/* 87  */ 	/** Executado apos a conclusao do upload */
/* 88  */ 	onComplete: function($el, id, fileName, responseJSON){
/* 89  */ 		//atualiza listagem do upload
/* 90  */ 		var li = $el[0].getChildren(".qq-uploader")[0].getChildren("ul")[0].getChildren()[id];
/* 91  */ 		setTimeout(function(){
/* 92  */ 			li.fade('out'); 
/* 93  */ 			setTimeout(function(){
/* 94  */ 				li.setStyle("display", "none");
/* 95  */ 			}, 500);
/* 96  */ 		}, 5000);
/* 97  */ 			
/* 98  */ 		//acao apenas se for sucesso
/* 99  */ 		if(responseJSON.url){
/* 100 */ 			//atualiza listagem de arquivos, caso haja

/* upload.js */

/* 101 */ 			this.updateFiles(responseJSON.filename, responseJSON.url);
/* 102 */ 		}
/* 103 */ 	},
/* 104 */ 	/** Executado ao cancelar um upload */
/* 105 */ 	onCancel: function(id, fileName){
/* 106 */ 	},
/* 107 */ 	
/* 108 */ 	/**
/* 109 *| 	 * Atualiza listagem de arquivos no servidor
/* 110 *| 	 */
/* 111 */ 	updateFiles: function(fileName, url){
/* 112 */ 		var container 	= $$(this.options.imagesContainer)[0];
/* 113 */ 		var el			= $$(this.options.gabaritoEl)[0];
/* 114 */ 		//verifica se existem elementos de listagem
/* 115 */ 		if(container && el){
/* 116 */ 			//montando elemento
/* 117 */ 			var clone		= el.clone();
/* 118 */ 			clone.set("id", fileName);
/* 119 */ 			clone.setStyle("display", "");
/* 120 */ 			clone.getChildren()[0].getChildren()[0].set("src", url);
/* 121 */ 			clone.cloneEvents(el);
/* 122 */ 			//adicionando ao container
/* 123 */ 			container.grab(clone);
/* 124 */ 		}
/* 125 */ 	},
/* 126 */ 	
/* 127 */ 	/**
/* 128 *| 	 * Aplica estilo na foto principal
/* 129 *| 	 */
/* 130 */ 	selectFotoPrincipal: function(){
/* 131 */ 		var principal = $$(this.options.valElClass).get("value")[0];
/* 132 */ 		this.fotoPrincipal($$('div[id='+principal+']')[0], true);
/* 133 */ 	},
/* 134 */ 	
/* 135 */ 	/**
/* 136 *| 	 * Atualiza a foto principal de acordo com o seletor
/* 137 *| 	 * el: elemento em questao
/* 138 *| 	 * makePrincipal: true | false. Identifica se esta colocando ou retirando o elemento do status de principal 
/* 139 *| 	 */
/* 140 */ 	fotoPrincipal: function(el, makePrincipal){
/* 141 */ 		//verifica se existe o elemento que contem o valor do arquivo principal
/* 142 */ 		var valEl 	= $$(this.options.valElClass)[0];
/* 143 */ 		if(!valEl) return;
/* 144 */ 		
/* 145 */ 		//registrando elementos necessarios
/* 146 */ 		var principal = $$("."+this.options.mainElClass)[0];
/* 147 */ 		var $el = $(el);
/* 148 */ 		
/* 149 */ 		//retirando "fotoPrincipal do "el" (ao remover)
/* 150 */ 		if(!makePrincipal){

/* upload.js */

/* 151 */ 			//se é principal
/* 152 */ 			if($el == principal){
/* 153 */ 				principal = false;
/* 154 */ 				valEl.set('value', '');
/* 155 */ 				$el = $el.getParent().getChildren()[1]; //coloca principal no elemento mais proximo
/* 156 */ 			}
/* 157 */ 			//senao sai fora
/* 158 */ 			else{
/* 159 */ 				return;
/* 160 */ 			}
/* 161 */ 		}
/* 162 */ 		//se quer tornar a principal, mas já é
/* 163 */ 		else if($el == principal){
/* 164 */ 			return;
/* 165 */ 		}
/* 166 */ 		
/* 167 */ 		//removendo estilo do principal
/* 168 */ 		if(principal){
/* 169 */ 			var a = principal.getElement('.acao');
/* 170 */ 			//verificando se acao existe p/ remover classe
/* 171 */ 			if(a) a.removeClass('icone_foto_principal');
/* 172 */ 			principal.removeClass(this.options.mainElClass);
/* 173 */ 		}
/* 174 */ 		
/* 175 */ 		//adicionando estilos ao elemento identificado
/* 176 */ 		if($el){
/* 177 */ 			$el.addClass(this.options.mainElClass);
/* 178 */ 			//verificando se acao existe p/ adicionar classe
/* 179 */ 			var a = $el.getElement('.acao');
/* 180 */ 			if(a) a.addClass('icone_foto_principal');
/* 181 */ 			//setando o principal p/ salvar
/* 182 */ 			valEl.set('value', $el.get('id'));
/* 183 */ 		}
/* 184 */ 	},
/* 185 */ 	
/* 186 */ 	/**
/* 187 *| 	 * Adiciona e remove estilo de acordo com eventos do mouse.
/* 188 *| 	 */
/* 189 */ 	mouseEvent: function(){
/* 190 */ 		var $this = this;
/* 191 */ 		//verifica se há o container de imagens
/* 192 */ 		if($$(this.options.imagesContainer).length > 0){
/* 193 */ 			
/* 194 */ 			//ao clicar na foto
/* 195 */ 			$$(this.options.imagesContainer).addLiveEvent('click', 'img', function(evt){
/* 196 */ //				//Evento ao clicar na foto
/* 197 */ //				var foto = $(evt.target);
/* 198 */ //				var el = foto.getParent().getParent();
/* 199 */ //				$this.fotoPrincipal(el, true);
/* 200 */ 			});

/* upload.js */

/* 201 */ 			
/* 202 */ 			//ao clicar em acao
/* 203 */ 			$$(this.options.imagesContainer).addLiveEvent('click', '.acao', function(evt){
/* 204 */ 				//Evento ao clicar na foto
/* 205 */ 				var el = $(evt.target).getParent();
/* 206 */ 				var foto = el.getChildren()[0].getChildren("img")[0];
/* 207 */ 				$this.fotoPrincipal(el, true);
/* 208 */ 			});
/* 209 */ 			
/* 210 */ 			//ao clicar em remover
/* 211 */ 			$$(this.options.imagesContainer).addLiveEvent('click', '.remover', function(evt){
/* 212 */ 				evt.preventDefault();
/* 213 */ 				var el = $(evt.target);
/* 214 */ 				//se a foto a ser apagada for a favorita nao apaga
/* 215 */ 				if($$(el).getParent().hasClass('foto_principal')[0]){
/* 216 */ 					Sexy.alert( uploadMessages.textDeleteNotAllowed);
/* 217 */ 				}else{
/* 218 */ 					Sexy.confirm( uploadMessages.textConfirmDelete, {
/* 219 */ 						textBoxBtnOk: uploadMessages.textBoxBtnOk,
/* 220 */ 						textBoxBtnCancel: uploadMessages.textBoxBtnCancel,
/* 221 */ 						onComplete: function(returnvalue) {
/* 222 */ 							//url contendo o endereço para remocao de imagens
/* 223 */ 							var delUrl = el.getParents("[extensions]")[0].getChildren(".qq-delete")[0].get('value');
/* 224 */ 							if (returnvalue) {
/* 225 */ 								var req = new Request.JSON({
/* 226 */ 									url: delUrl + el.getParent().get('id'),
/* 227 */ 									onSuccess: function(ret){
/* 228 */ 										if(ret.success){
/* 229 */ 											var $el = el.getParent();
/* 230 */ 											$this.fotoPrincipal($el, false);
/* 231 */ 											$el.fade('out');
/* 232 */ 											setTimeout(function(){$el.dispose();}, 600);
/* 233 */ 											parent.MochaUI.notify( uploadMessages.textDeleteSuccess );
/* 234 */ 										}else{
/* 235 */ 											Sexy.alert( ret.error );
/* 236 */ 										}
/* 237 */ 									},
/* 238 */ 									onFailure: function(ret){
/* 239 */ 										Sexy.alert( uploadMessages.textDeleteFailure + ret );
/* 240 */ 									}
/* 241 */ 								}).send();
/* 242 */ 							}
/* 243 */ 						}
/* 244 */ 					}); 
/* 245 */ 				}
/* 246 */ 			});
/* 247 */ 		}
/* 248 */ 	}
/* 249 */ 
/* 250 */ });

/* upload.js */

/* 251 */ 
/* 252 */ /** INICIALIZAÇÃO **/
/* 253 */ //AO IMPORTAR ARQUIVO JÃ� EXECUTA O SCRIPT
/* 254 */ window.addEvent("domready", function(){
/* 255 */ 	upload 		= new Upload();
/* 256 */ });
