
/* priceformat.js */

/* 1   */ /**
/* 2   *|  * Extensão do jQuery para tratamento de valores numericos em campos
/* 3   *|  * @author Bruno
/* 4   *|  */
/* 5   */ 
/* 6   */ (function($) {
/* 7   */ 	
/* 8   */ 	//tabela de caracteres => codigos das teclas
/* 9   */ 	var chars = Array(); 
/* 10  */ 	chars[48] = chars[96] = "0";
/* 11  */ 	chars[49] = chars[97] = "1";
/* 12  */ 	chars[50] = chars[98] = "2";
/* 13  */ 	chars[51] = chars[99] = "3";
/* 14  */ 	chars[52] = chars[100] = "4";
/* 15  */ 	chars[53] = chars[101] = "5";
/* 16  */ 	chars[54] = chars[102] = "6";
/* 17  */ 	chars[55] = chars[103] = "7";
/* 18  */ 	chars[56] = chars[104] = "8";
/* 19  */ 	chars[57] = chars[105] = "9";
/* 20  */ 	chars[110] = chars[188] = chars[190] = chars[194] = ",";
/* 21  */ 	chars[8] = chars[35] = chars[36] = chars[37] = chars[38] = chars[39] = chars[40] = chars[46] = true; //teclas de navegação e remoção
/* 22  */ 	
/* 23  */ 	
/* 24  */ 	/** Extrai os parametros de formatacao*/
/* 25  */ 	var extractParams = function(el){
/* 26  */ 		var $this = $(el);
/* 27  */     	var descr 	= $this.get(0) ? $this.get(0).getAttribute("number_format") : '';
/* 28  */         if (!descr) return false;
/* 29  */         
/* 30  */         //verificando decimais
/* 31  */         var c				= eval(descr.substr(descr.indexOf("0") + 2));
/* 32  */         var thisHasClass    = $this.hasClass("integer");
/* 33  */         var centsLimit 		= (thisHasClass || c == undefined) ? 0 : c[0]; 
/* 34  */         var centsLimitMax 	= (thisHasClass || c == undefined) ? 0 : c[1];
/* 35  */         
/* 36  */         var cents 			= "";
/* 37  */         for(var i=0; i< centsLimit; i++){
/* 38  */         	cents 			+= "0";
/* 39  */         }
/* 40  */ 
/* 41  */         // Aponta o numero maximo de caracteres
/* 42  */         var maxMl			= 12; //maximo permitido
/* 43  */         var ml				= parseInt($this.get(0).getAttribute("maxlength"));
/* 44  */         var maxlength		= (ml > 0 && ml < maxMl) ? $this.get(0).getAttribute("maxlength") : maxMl;
/* 45  */ 
/* 46  */         //parametros
/* 47  */         return {
/* 48  */     		unsigned: 		descr.slice(0,1) == "+",						//campo apenas positivo ou permite negativo
/* 49  */ 	        thousandsSep: 	descr.charAt(descr.indexOf("#") + 1), 			//separador dos milhares (está entre '#'s no começo
/* 50  */ 	        centsSep: 		descr.charAt(descr.indexOf("0") + 1),			//separador de centavos

/* priceformat.js */

/* 51  */ 	        centsLimit:		centsLimit,										//quantidade de casas decimais
/* 52  */ 	        centsLimitMax:	centsLimitMax,									//quantidade máxima de casas decimais
/* 53  */ 	        cents:			cents,											//decimais padrão. Ex: '00'
/* 54  */ 	        size:			maxlength										//tamanho maximo do numero no campo
/* 55  */     	};
/* 56  */ 	};
/* 57  */ 	
/* 58  */ 	
/* 59  */ 	
/* 60  */ 	/** 
/* 61  *| 	 * Parse Number Value 
/* 62  *| 	 * Retorna o numero de um valor a partir do formato definido 
/* 63  *| 	 ****************************************/
/* 64  */ 	$.extend({
/* 65  */ 		parseNumberValue: function(value, format){
/* 66  */ 			//verificando decimais
/* 67  */ 	        var c				= eval(format.substr(format.indexOf("0") + 2));
/* 68  */ 	        var centsLimit 		= (c == undefined) ? 0 : c[0]; 
/* 69  */ 	        var centsLimitMax 	= (c == undefined) ? 0 : c[1];
/* 70  */ 	        
/* 71  */ 			var p = {
/* 72  */ 				thousandsSep: 	format.charAt(format.indexOf("#") + 1), 		//separador dos milhares (está entre '#'s no começo
/* 73  */ 		        centsSep: 		format.charAt(format.indexOf("0") + 1),			//separador de centavos
/* 74  */ 		        centsLimit: 	centsLimit,										//quantidade de casas decimais
/* 75  */ 		        centsLimitMax: 	centsLimitMax									//quantidade máxima de casas decimais
/* 76  */ 			};
/* 77  */ 			
/* 78  */ 			var v = (!value) ? "0" : value+"";
/* 79  */ 			//converte milhares e centavos no mesmo caractere
/* 80  */ 			v = v.replace(p.thousandsSep, '.');
/* 81  */ 			v = v.replace(p.centsSep, '.');
/* 82  */ 			//troca o ultimo por um marcador
/* 83  */ 			var i = v.lastIndexOf('.');
/* 84  */ 			if(i>0){
/* 85  */ 				//permanece apenas com o ultimo
/* 86  */ 				v = v.slice(0,i)+'|'+v.slice(i+1);
/* 87  */ 				v = v.replace(/\./g, '');
/* 88  */ 				v = v.replace('|', '.');
/* 89  */ 			}
/* 90  */ 			
/* 91  */ 			//Validando inteiro e fracionado
/* 92  */ 			//verifica se campo é inteiro ou fracionado
/* 93  */ 			if(p.centsLimit > 0){
/* 94  */ 				v = parseFloat(v)+"";
/* 95  */ 				var decLen = (v.lastIndexOf(".")>=0) ? v.substring(v.lastIndexOf(".")+1).length : 0;
/* 96  */ 				
/* 97  */ 				//caso o limite de decimais seja ultrapassado, arredonda pro limite
/* 98  */ 				if(decLen > p.centsLimitMax){
/* 99  */ 					var pow = Math.pow(10, p.centsLimitMax);
/* 100 */ 					v = Math.round(v * pow) / pow;

/* priceformat.js */

/* 101 */ 					v = parseFloat(v);
/* 102 */ 				}
/* 103 */ 				else if(decLen < p.centsLimit){
/* 104 */ 					v = parseFloat(v).toFixed(p.centsLimit);
/* 105 */ 				}
/* 106 */ 			}
/* 107 */ 			else{
/* 108 */ 				v = parseInt(v,10); //Inteiro
/* 109 */ 			}
/* 110 */ 			v = (isNaN(v)) ? 0 : v;
/* 111 */ 			return  v;
/* 112 */ 		},
/* 113 */ 		sumValues: function(v1, v2, precision){
/* 114 */ 				var x = Math.pow(10, precision || 2);
/* 115 */ 				return (Math.round(v1 * x) + Math.round(v2 * x)) / x;
/* 116 */ 		}
/* 117 */ 	
/* 118 */ 	
/* 119 */ 	});
/* 120 */ 	
/* 121 */ 	
/* 122 */ 	/** 
/* 123 *|      * Number Value 
/* 124 *|      * Retorna o valor numerico do campo 
/* 125 *|      * CÓPIA DO METODO m.FIX do numberFormat
/* 126 *|      ****************************************/
/* 127 */     $.fn.numberValue = function(){
/* 128 */         var $this = $(this);
/* 129 */         var p = extractParams($this);
/* 130 */         var v = (!$this.val()) ? "0" : $this.val()+"";
/* 131 */         //converte milhares e centavos no mesmo caractere
/* 132 */         v = v.replace(p.thousandsSep, '.');
/* 133 */         v = v.replace(p.centsSep, '.');
/* 134 */         //troca o ultimo por um marcador
/* 135 */         var i = v.lastIndexOf('.');
/* 136 */         if(i>0){
/* 137 */             //permanece apenas com o ultimo
/* 138 */             v = v.slice(0,i)+'|'+v.slice(i+1);
/* 139 */             v = v.replace(/\./g, '');
/* 140 */             v = v.replace('|', '.');
/* 141 */         }
/* 142 */         
/* 143 */         //verifica se campo é inteiro ou fracionado
/* 144 */         v = (p.centsLimit > 0) ? parseFloat(v) : parseInt(v,10);
/* 145 */         v = (isNaN(v)) ? 0 : v;
/* 146 */         return  v;
/* 147 */     };
/* 148 */     
/* 149 */ 	
/* 150 */ 	/** 

/* priceformat.js */

/* 151 *| 	 * Number Format 
/* 152 *| 	 * formata o campo permitindo apenas numeros (inteiros ou não)
/* 153 *| 	 * ***********************************************************/
/* 154 */ 	$.fn.numberFormat = function(){
/* 155 */         var $this 	= $(this);
/* 156 */         var p 		= {};
/* 157 */         
/* 158 */         //Funções auxiliares
/* 159 */         var f = {
/* 160 */ 
/* 161 */         	/** Atualiza parametros do plugin. Executado durante foco no campo */
/* 162 */         	updateParams: function(){
/* 163 */         		var a = extractParams($this);
/* 164 */         		if(!a) return;
/* 165 */         		$.extend(p, a);
/* 166 */         	},
/* 167 */         	
/* 168 */         	/** retorna um valor padrao para o campo */
/* 169 */         	baseValue: function(){
/* 170 */         		return (p.centsLimit > 0) ? "0" + p.centsSep + p.cents : "0";
/* 171 */         	},
/* 172 */         	
/* 173 */     		/** Return the keycode of the given event */
/* 174 */     		typedCode: function(event) {
/* 175 */     		    var code = 0;
/* 176 */     		    if (event == null && window.event) event = window.event;
/* 177 */     		    if (event != null) {
/* 178 */     		        if (event.keyCode) code = event.keyCode; 
/* 179 */     		        else if (event.which) code = event.which;
/* 180 */     		    }
/* 181 */     		    return code;
/* 182 */     		},
/* 183 */     		
/* 184 */     		/** retorna o caractere equivalente ao código da tecla */
/* 185 */     		char: function(code){
/* 186 */     			return chars[code]; 
/* 187 */     		},
/* 188 */     		
/* 189 */     		/** Verifica se caractere é aceito no campo numerico */
/* 190 */     		code: function(evt){
/* 191 */     			//codigo da tecla
/* 192 */     			var keyCode = f.typedCode(evt);
/* 193 */     			
/* 194 */     			//Teclas com ações válidas para o campo
/* 195 */     			if((keyCode >= 48 && keyCode <= 57) 		//numeros [0-9]
/* 196 */    					|| (keyCode >= 96 && keyCode <= 105) 	//numpad  [0-9]
/* 197 */    					|| (!p.unsigned && keyCode == 109)		//"-"
/* 198 */    					|| (keyCode == 8)						//"Backspace"
/* 199 */    					|| (keyCode == 46)						//"Del"
/* 200 */    					|| (keyCode == 35)						//"End"

/* priceformat.js */

/* 201 */    					|| (keyCode == 36)						//"Home"
/* 202 */    					|| (keyCode == 37)						//"left arrow"
/* 203 */    					|| (keyCode == 38)						//"up arrow"
/* 204 */    					|| (keyCode == 39)						//"right arrow"
/* 205 */    					|| (keyCode == 40)						//"down arrow"
/* 206 */    					|| (keyCode == 110)						//"numpad ," 
/* 207 */    					|| (keyCode == 188) 					//","
/* 208 */    					|| (keyCode == 190)						//"."
/* 209 */    					|| (keyCode == 194)						//"numpad ."
/* 210 */    					){
/* 211 */     				return keyCode;
/* 212 */     			}
/* 213 */     			//Teclas que devo deixar passar
/* 214 */     			else if((keyCode == 9)						//"Tab"
/* 215 */    					|| (keyCode == 13)						//"Enter"
/* 216 */     				)
/* 217 */ 	    			return false;
/* 218 */     			//Demais Teclas: ignorar e sair
/* 219 */     			else{
/* 220 */     				evt.preventDefault();
/* 221 */     				return false;
/* 222 */     			}
/* 223 */     		},
/* 224 */     		
/* 225 */     		/** 
/* 226 *|     		 * Teclas especiais
/* 227 *|     		 * Retorna "TRUE" caso tenha executado alguma ação especial 
/* 228 *|     		 * */
/* 229 */     		specials: function(keyCode, evt){
/* 230 */     			var val 	= $this.val();
/* 231 */     			switch (keyCode) {
/* 232 */ 	    			// negativo "-": alterna o sinal no campo (inicio)
/* 233 */ 					case 109:
/* 234 */ 						if(val != ""){
/* 235 */ 							if(val.charAt(0)!="-"){
/* 236 */ 								val = "-" + val;
/* 237 */ 								$this.data("negative", true);
/* 238 */ 								p.size++;
/* 239 */ 							}else{
/* 240 */ 								val = val.slice(1);
/* 241 */ 								if($this.data("negative")){
/* 242 */ 									p.size--;
/* 243 */ 								}
/* 244 */ 								$this.data("negative", false);
/* 245 */ 							}
/* 246 */ 							$this.val(val);
/* 247 */ 						}
/* 248 */ 						break;
/* 249 */ 					//acao padrao: continua execução
/* 250 */ 					default:

/* priceformat.js */

/* 251 */ 						return false;
/* 252 */ 				}
/* 253 */     			return true;
/* 254 */     		},
/* 255 */        		
/* 256 */     		/** Remove os pontos para edição do numero **/
/* 257 */     		removeDots: function(){
/* 258 */     			$this.val($this.val().replace(/[.]/g, ""));
/* 259 */     		},
/* 260 */     		
/* 261 */     		/** limpa o campo caso o valor seja 0 **/
/* 262 */     		clearZero: function(){
/* 263 */     			//recupera o valor
/* 264 */     			val = f.fix($this.val());
/* 265 */     			if(val == 0){
/* 266 */     				$this.val("");
/* 267 */     			}
/* 268 */     		},
/* 269 */     		
/* 270 */     		/** Marca o conteudo como selecionado(true ou false) ou retorna o valor caso nao haja parametros **/
/* 271 */     		selection: function(){
/* 272 */     			var el 	= $this.get(0);
/* 273 */     			return $this.val().substring(el.selectionStart, el.selectionEnd);
/* 274 */     		},
/* 275 */     		
/* 276 */     		/** insere um caractere no final do valor do campo*/
/* 277 */     		append: function(code, evt){
/* 278 */     			var c = f.char(code);
/* 279 */                 if(c){
/* 280 */                     //valor do campo
/* 281 */                     var val = $this.val();
/* 282 */                     
/* 283 */                     //recupera texto selecionado
/* 284 */                     var s = f.selection();
/* 285 */             		
/* 286 */             		//sai se tamanho for maior que o permitido
/* 287 */             		if(c!==true && val.length >= p.size && s.length==0){
/* 288 */             			return false;
/* 289 */             		}
/* 290 */                     //no caso de vírgula
/* 291 */                     if(c==","){
/* 292 */                         //se campo nao eh fracionado, ignora
/* 293 */                         if(p.centsLimit == 0) return false;
/* 294 */                         
/* 295 */                         //verifica se separador já existe e sai se ja existir no valor
/* 296 */                         if( (s=="" || (s.lastIndexOf(p.centsSep) < 0 && s.lastIndexOf(".") < 0)) 
/* 297 */                                 && (val.lastIndexOf(p.centsSep) >= 0 || val.lastIndexOf(".") >= 0)){
/* 298 */                             return false;
/* 299 */                         }
/* 300 */                     }

/* priceformat.js */

/* 301 */                     //verifica se quantidade de casas decimais vai ultrapassar o limite
/* 302 */                     else if(c!==true){
/* 303 */             			var start 	= $this.get(0).selectionStart;
/* 304 */             			var coma	= val.lastIndexOf(p.centsSep);
/* 305 */                         // Se não possui separador de centavos, verifica se existe separador de milhar atuando como separador de centavos
/* 306 */                         if (coma == -1)
/* 307 */                             coma = val.lastIndexOf(p.thousandsSep);
/* 308 */             			var dec		= val.substring(coma+1);
/* 309 */             			if(coma >=0 && coma < start && dec.length >= p.centsLimitMax && s.length==0){
/* 310 */             				return false;
/* 311 */             			}
/* 312 */             			
/* 313 */             		}
/* 314 */     				return true;
/* 315 */     			}
/* 316 */     			return false;
/* 317 */     		},
/* 318 */     		
/* 319 */     		/** Acerta valor do campo para valores não fixados no numero de casas decimais indicado */
/* 320 */     		fix: function(val){
/* 321 */     			var v = (!val) ? "0" : val+"";
/* 322 */     			//converte milhares e centavos no mesmo caractere
/* 323 */ 				v = v.replace(p.thousandsSep, '.');
/* 324 */ 				v = v.replace(p.centsSep, '.');
/* 325 */ 				//troca o ultimo por um marcador
/* 326 */ 				var i = v.lastIndexOf('.');
/* 327 */ 				if(i>0){
/* 328 */ 					//permanece apenas com o ultimo
/* 329 */ 					v = v.slice(0,i)+'|'+v.slice(i+1);
/* 330 */ 					v = v.replace(/\./g, '');
/* 331 */     				v = v.replace('|', '.');
/* 332 */ 				}
/* 333 */ 				//verifica se campo é inteiro ou fracionado
/* 334 */ 				if(p.centsLimit > 0){
/* 335 */ 					v = parseFloat(v)+"";
/* 336 */ 					var decLen = (v.lastIndexOf(".")>=0) ? v.substring(v.lastIndexOf(".")+1).length : 0;
/* 337 */ 					
/* 338 */ 					//caso o limite de decimais seja ultrapassado, arredonda pro limite
/* 339 */ 					if(decLen > p.centsLimitMax){
/* 340 */ 						var pow = Math.pow(10, p.centsLimitMax);
/* 341 */ 						v = Math.round(v * pow) / pow;
/* 342 */ 						v = parseFloat(v);
/* 343 */ 					}
/* 344 */ 					else if(decLen < p.centsLimit){
/* 345 */ 						v = parseFloat(v).toFixed(p.centsLimit);
/* 346 */ 					}
/* 347 */ 				}
/* 348 */ 				else{
/* 349 */ 					v = parseInt(v,10); //Inteiro
/* 350 */ 				}

/* priceformat.js */

/* 351 */ 				v = (isNaN(v)) ? "0" : v+"";
/* 352 */     			return v;
/* 353 */     		},
/* 354 */     		
/* 355 */     		/**formata string do numero retirando e reposicionando "," e "."
/* 356 *|     		 * @param float v valor a ser formatado. Caso nao seja informado, usa valor do campo
/* 357 *|     		 * */
/* 358 */     		format: function(v){
/* 359 */                 var thisNegative = $.data($this.get(0),"negative");
/* 360 */     			var val 		= (v!=undefined) ? v : $this.val();
/* 361 */     			var minus 		= (thisNegative) ? "-" : "";
/* 362 */     			var limit		= p.centsLimitMax;
/* 363 */     			
/* 364 */     			//converte para nunca passar do limite de decimais em caso de copia
/* 365 */     			val = f.fix(val);
/* 366 */     			
/* 367 */     			//verificando pelo separador de centavos p/ transformação de inteiros
/* 368 */     			var isDecimal	= (val.indexOf(p.centsSep) > 0) || (val.indexOf(".") > 0);
/* 369 */     			
/* 370 */     			//realiza formatação
/* 371 */     			if(limit > 0){
/* 372 */     				//registra a parte decimal e a inteira
/* 373 */     				var cent, intg;
/* 374 */ 					var i = val.lastIndexOf(".");
/* 375 */ 					cent = (!isDecimal || i<0) ? p.cents : val.slice(i+1);
/* 376 */ 					intg = (!isDecimal || i<0) ? val : val.slice(0, i);
/* 377 */     				
/* 378 */     				//parte inteira
/* 379 */     				if(intg.slice(0,1) == "-"){
/* 380 */     					minus = "-";
/* 381 */     					intg = intg.slice(1);
/* 382 */     				}
/* 383 */     				intg = parseInt(intg,10);
/* 384 */     				
/* 385 */     				
/* 386 */     				//validando valor
/* 387 */ 					intg = (isNaN(intg)) ? "0" : intg+"";
/* 388 */ 					
/* 389 */     				//testando se valor é zero p/ remover o "-"
/* 390 */     				if(intg==0 && parseInt(cent,10)==0 && thisNegative){
/* 391 */     					minus = "";
/* 392 */     					p.size--;
/* 393 */     					$.data($this.get(0),"negative", false);
/* 394 */     				}
/* 395 */     				
/* 396 */     				//colocando separadores de milhares
/* 397 */     				else if(intg.length>3){
/* 398 */     					var regex = /([0-9]+)([0-9]{3})/;
/* 399 */     			        while (regex.test(intg)) {
/* 400 */     			        	intg = intg.replace(regex, '$1'+p.thousandsSep+'$2');

/* priceformat.js */

/* 401 */     			        }
/* 402 */     				}
/* 403 */     				val = minus + intg + p.centsSep + cent;
/* 404 */     			}else{
/* 405 */     				val = parseInt(val,10)+"";
/* 406 */     			}
/* 407 */     			
/* 408 */     			if(v!=undefined){
/* 409 */     				return val;
/* 410 */     			}else{
/* 411 */     				//colocando valor no campo
/* 412 */     				$this.val(val);
/* 413 */     			}
/* 414 */     		}
/* 415 */         };
/* 416 */         
/* 417 */         //Métodos do Plugin
/* 418 */         var m = {
/* 419 */         	/** Processa tecla digitada no campo */
/* 420 */         	onKeyDown: function(evt){
/* 421 */ 	        	//codigo da tecla
/* 422 */ 	    		var c = f.code(evt); 
/* 423 */                 
/* 424 */                 //pre-condicao: apenas teclas validas
/* 425 */                 if(!c) return;
/* 426 */                 
/* 427 */                 //atualizando parametros
/* 428 */                 f.updateParams();
/* 429 */                 
/* 430 */                 //teclas especiais (Ex: enter/TAB)
/* 431 */                 if(!f.specials(c, evt)){
/* 432 */                     //incluindo caractere no final do campo
/* 433 */                     if(!f.append(c, evt)){
/* 434 */                         evt.preventDefault();
/* 435 */                         return;
/* 436 */                     } 
/* 437 */                 }else{
/* 438 */                     //nao envia evento
/* 439 */ 	    			evt.preventDefault();
/* 440 */ 	    		}
/* 441 */         	},
/* 442 */         		
/* 443 */         	/** Define o valor padrao do campo caso nao possua algum */
/* 444 */         	onFocusOut: function(){
/* 445 */         		f.updateParams();	//atualizando parametros
/* 446 */         		if($this.val()==""){ 
/* 447 */         			$this.val(f.baseValue());
/* 448 */         		}
/* 449 */         		f.format(); //formata campo
/* 450 */         	},

/* priceformat.js */

/* 451 */         	
/* 452 */         	/** Funcao executada ao obter foco no campo */
/* 453 */         	onFocus: function(){
/* 454 */         		f.updateParams();
/* 455 */         		f.removeDots();
/* 456 */         		f.clearZero();
/* 457 */         		$this.select();
/* 458 */         	},
/* 459 */         	
/* 460 */         	/** Adiciona eventos relativos ao elemento */
/* 461 */         	addEvents: function(){
/* 462 */         		$this.focusin(m.onFocus);
/* 463 */         		$this.focusout(m.onFocusOut);
/* 464 */         		$this.keydown(m.onKeyDown);
/* 465 */         	},
/* 466 */         	
/* 467 */         	/** Inicializadora */
/* 468 */         	init: function(){
/* 469 */                 //Caso não seja input, apenas formata o valor no campo
/* 470 */                 var tagName = $this.get(0).tagName;
/* 471 */                 if(tagName != "INPUT" && tagName != "SELECT"){
/* 472 */         			f.updateParams();
/* 473 */         			var v = $this.text();
/* 474 */         			$this.text(f.format(v));
/* 475 */                     return;
/* 476 */                 }
/* 477 */ 
/* 478 */                 
/* 479 */                 //Para inputs, adiciona eventos e flags relacionadas
/* 480 */                 var v = $this.val();
/* 481 */                 if(v!==undefined && v!==null){
/* 482 */                     if(!$.data($this.get(0),"number_formatted")){
/* 483 */                         $.data($this.get(0), "number_formatted", true);
/* 484 */                         $this.get(0).classList.add("currency");
/* 485 */                         m.addEvents();      //inserindo eventos
/* 486 */                     }
/* 487 */                     m.onFocusOut();         //inserindo valores padrao
/* 488 */                 }
/* 489 */                 else{
/* 490 */                     alert("Existe algum campo utilizando NumberFormat de forma errada");
/* 491 */                 }
/* 492 */         	}
/* 493 */         };
/* 494 */         
/* 495 */         //Inicializando
/* 496 */         m.init();
/* 497 */         return this;
/* 498 */     };
/* 499 */     
/* 500 */ })(jQuery);

/* priceformat.js */

/* 501 */ 
/* 502 */ 
/* 503 */ 
