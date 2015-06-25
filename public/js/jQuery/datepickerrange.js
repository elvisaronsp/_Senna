
/* datepickerrange.js */

/* 1   */ jQuery.noConflict();
/* 2   */ (function($){
/* 3   */ 	
/* 4   */ 	if (!$.fn.datePicker){
/* 5   */ 		alert("Necessária inclusão do script 'datePicker' para utilização do datePickerRange");
/* 6   */ 		return;
/* 7   */ 	}
/* 8   */ 	
/* 9   */ 	if (!Date.fromString){
/* 10  */ 		alert("Necessária inclusão do script 'date' para utilização do datePickerRange");
/* 11  */ 		return;
/* 12  */ 	}
/* 13  */ 	
/* 14  */ 	if (!$.i18n){
/* 15  */ 		alert("Necessária inclusão do script 'i18n' para utilização do datePickerRange");
/* 16  */ 		return;
/* 17  */ 	}
/* 18  */ 	
/* 19  */ 	//Plugin datePickerRange
/* 20  */ 	$.fn.datePickerRange = function(){
/* 21  */ 		// Elemento selecionado
/* 22  */ 		var $this 	= $(this);
/* 23  */ 		
/* 24  */ 		// Elementos internos
/* 25  */         var e = {
/* 26  */         	input: 		$this.find("input:first"),						//input contendo o valor
/* 27  */         	i_start:	$this.find("input[class$='_input_inicio']"),	//input contendo o valor
/* 28  */         	i_end: 		$this.find("input[class$='_input_fim']"),		//input contendo o valor
/* 29  */         	a_prev:		$this.find("a[class$='_prev']"),				//elemento para retrocesso do período
/* 30  */        		a_next:		$this.find("a[class$='_next']"),				//elemento para avanço do período
/* 31  */         	popup:		$this.find("[class$='_popup']"),				//elemento de popup
/* 32  */        		trigger:	$this.find("[class$='_trigger']"),				//trigger para abrir o popup
/* 33  */        		menu:		$this.find("[class$='_menu']"),					//elemento do menu
/* 34  */        		itens:		$this.find("[class$='_itens'] span"),			//itens de pre-seleção
/* 35  */        		cal_start:	$this.find("[class$='_cal_start']"),			//calendario contendo a data de inicio do período
/* 36  */    			cal_end:	$this.find("[class$='_cal_end']"),				//calendario contendo a data de termino do período
/* 37  */    			actions:	$this.find("div[class*='_actions']"),			//container de ações do formulário
/* 38  */    			btn_apply:	$this.find("[class*='_apply']"),				//item que aplica calendario e fecha menu
/* 39  */    			btn_cancel:	$this.find("[class*='_cancel']"),				//item que apenas fecha calendario sem alterar
/* 40  */    			curVal:		"",												//registro do valor ao abrir calendario
/* 41  */    			cur_start:	"",												//registro do valor ao abrir calendario
/* 42  */    			cur_end:	"",												//registro do valor ao abrir calendario
/* 43  */    			changed:	false											//flag indicando se houve ou não alteração de seleção
/* 44  */         };
/* 45  */         
/* 46  */         //Monta os Botoes de período
/* 47  */ 		periodo_nav();
/* 48  */ 		
/* 49  */ 		//Monta Date Pickers
/* 50  */ 		pick_date();

/* datepickerrange.js */

/* 51  */ 		
/* 52  */ 		//Atualiza data de acordo com os valores ocultos
/* 53  */ 		init_date();
/* 54  */ 		
/* 55  */ 		//Verifica por mudanças em inputs dentro da action
/* 56  */ 		action_evts();
/* 57  */ 		
/* 58  */ 		/** 
/* 59  *| 		 * Ignora evento no input 
/* 60  *| 		 * **/
/* 61  */     	function ignore_evt(evt){
/* 62  */     		evt.preventDefault();
/* 63  */ 			evt.stopPropagation();
/* 64  */ 			evt.target.blur();
/* 65  */     	}
/* 66  */     	
/* 67  */     	/**
/* 68  *|     	 * Exibe calendario
/* 69  *|     	 */
/* 70  */     	function showRangeCalendar(){
/* 71  */ 			var wasVisible 	= e.trigger.hasClass('clicked');
/* 72  */ 			e.changed 		= false;
/* 73  */ 			e.curVal		= e.input.val();
/* 74  */ 			e.cur_start		= e.i_start.val();
/* 75  */ 			e.cur_end		= e.i_end.val();
/* 76  */ 			
/* 77  */ 			e.input.removeClass('visible');
/* 78  */ 			e.menu.removeClass('visible');
/* 79  */ 			e.trigger.removeClass("clicked");
/* 80  */ 			
/* 81  */ 			if(!wasVisible){
/* 82  */ 				e.input.addClass('visible');
/* 83  */ 				e.menu.addClass('visible');
/* 84  */ 				e.trigger.addClass("clicked");
/* 85  */ 				update_picks(); //atualiza picks
/* 86  */ 				update_position(); //atualiza posição
/* 87  */ 				
/* 88  */ 				//evento ao abrir
/* 89  */ 				e.input.trigger("open");
/* 90  */ 			}
/* 91  */     	}
/* 92  */     	
/* 93  */     	/**
/* 94  *|     	 * Oculta calendario
/* 95  *|     	 */
/* 96  */     	function hideRangeCalendar(){
/* 97  */     		e.input.removeClass('visible');
/* 98  */     		e.trigger.removeClass("clicked");
/* 99  */ 			e.menu.removeClass('visible');
/* 100 */ 			

/* datepickerrange.js */

/* 101 */ 			//evento ao fechar
/* 102 */ 			e.input.trigger("close", [e.changed]); //passando flag de alteração
/* 103 */ 			
/* 104 */ 			e.changed 		= false;
/* 105 */ 			e.curVal		= e.input.val();
/* 106 */     	}
/* 107 */     	
/* 108 */     	
/* 109 */     	/**
/* 110 *|     	 * Atualiza o posicionamento do picker para não atravessar a tela lateralmente
/* 111 *|     	 */
/* 112 */     	function update_position(){
/* 113 */     		//reseta posição
/* 114 */     		e.popup.css("left", "");
/* 115 */     		
/* 116 */     		var w = $(window).width();
/* 117 */     		var cw = e.popup.width();
/* 118 */     		var cx = e.popup.offset().left;
/* 119 */     		
/* 120 */     		//se estiver passando a direita, move pra esquerda, 
/* 121 */     		if(cx + cw > w){
/* 122 */     			e.popup.css("left", w - (cx + cw) );
/* 123 */     		}else if(cx < 0){
/* 124 */     			e.popup.css("left", - cx + 5 );
/* 125 */     		}
/* 126 */     		
/* 127 */     	}
/* 128 */     	
/* 129 */     	
/* 130 */     	/**
/* 131 *|     	 * Inicializa a data de acordo com os campos ocultos
/* 132 *|     	 */
/* 133 */     	function init_date(){
/* 134 */     		//verifica se o valor do input está vazio. Sai caso esteja
/* 135 */     		var data_i = e.i_start.val();
/* 136 */     		var data_f = e.i_end.val();
/* 137 */     		if(data_i == "" || data_f == "") return;
/* 138 */     		
/* 139 */     		//atualiza picks
/* 140 */     		update_picks(data_i, data_f);
/* 141 */     		
/* 142 */     		update_date();
/* 143 */     	}
/* 144 */     	
/* 145 */     	/**
/* 146 *|     	 * Monta comportamentos para troca do período
/* 147 *|     	 */
/* 148 */     	function periodo_nav(){
/* 149 */     		
/* 150 */     		//ignorando eventos no input

/* datepickerrange.js */

/* 151 */     		e.input.focus(function(evt){
/* 152 */     			ignore_evt(evt);
/* 153 */     			e.trigger.focus();
/* 154 */     			showRangeCalendar();
/* 155 */     		});
/* 156 */     		
/* 157 */     		//mostra o menu a partir do clique
/* 158 */     		e.trigger.click(showRangeCalendar);
/* 159 */     		
/* 160 */     		//periodos pre configurados
/* 161 */     		e.itens.click(function(evt){
/* 162 */     			var dt = eval($(this).attr("rel"));
/* 163 */     			update_picks(dt[0], dt[1]);
/* 164 */     			e.itens.filter(".selected").removeClass("selected");
/* 165 */     			$(this).addClass("selected");
/* 166 */     		});
/* 167 */     		
/* 168 */     		//clique fora fecha o calendario
/* 169 */     		$(document).mousedown(function(evt) {
/* 170 */     			var target 		= $(evt.target); 
/* 171 */     			var isVisible 	= e.trigger.hasClass('clicked');
/* 172 */     			if(!isVisible) return;
/* 173 */     			
/* 174 */     			//esconde o calendario
/* 175 */     			if(target.parents("[class$='_popup']").length == 0) {
/* 176 */     				
/* 177 */     				//dispara o change caso houve alteração
/* 178 */     				if(e.changed){
/* 179 */     					e.input.trigger("change");
/* 180 */     				}
/* 181 */     				
/* 182 */     				hideRangeCalendar();
/* 183 */     			}
/* 184 */     		});
/* 185 */     		
/* 186 */     		//navegação pelas setas
/* 187 */     		if(e.a_prev.length > 0 && e.a_next.length > 0) {
/* 188 */     			e.a_prev.click(function(){nav_date('-')});
/* 189 */     			e.a_next.click(function(){nav_date('+')});
/* 190 */     		}
/* 191 */     		
/* 192 */     		//ações
/* 193 */     		//Aplicar
/* 194 */     		e.btn_apply.click(function(){
/* 195 */     			//esconde o calendario
/* 196 */     			hideRangeCalendar();
/* 197 */     			
/* 198 */     			//aplica alteração
/* 199 */     			e.input.trigger("change");
/* 200 */     		});

/* datepickerrange.js */

/* 201 */     		
/* 202 */     		//Cancelar
/* 203 */     		e.btn_cancel.click(function(){
/* 204 */     			//esconde o calendario
/* 205 */     			hideRangeCalendar();
/* 206 */     			
/* 207 */     			//retorna com os valores anteriores
/* 208 */     			e.i_start.val(e.cur_start);
/* 209 */     			e.i_end.val(e.cur_end);
/* 210 */     			e.input.val(e.curVal);
/* 211 */     			
/* 212 */     			update_picks();
/* 213 */     		});
/* 214 */     		
/* 215 */     	}
/* 216 */     	
/* 217 */     	
/* 218 */     	/**
/* 219 *|     	 * Navega entre as datas a partir do clique nas setas de navegação, caso existam
/* 220 *|     	 */
/* 221 */     	function nav_date(tipo){
/* 222 */     		if(!tipo) return;
/* 223 */ 
/* 224 */     		//verifica se os controles existem e sai caso não existam
/* 225 */     		if(e.a_prev.length == 0 || e.a_next.length == 0) return;
/* 226 */     		
/* 227 */     		//verifica se o valor do input está vazio. Sai caso esteja
/* 228 */     		var data_i = e.i_start.val();
/* 229 */     		var data_f = e.i_end.val();
/* 230 */     		if(data_i == "" || data_f == "") return;
/* 231 */     		
/* 232 */     		//coleta as datas
/* 233 */     		var i 		= Date.fromString(data_i);
/* 234 */     		var f 		= Date.fromString(data_f);
/* 235 */     		var mi		= i.firstMonthDay();
/* 236 */     		var mf		= i.lastMonthDay();
/* 237 */     		var yi		= i.firstYearDay();
/* 238 */     		var yf		= i.lastYearDay();
/* 239 */     		var diff 	= f.diffDate(i) + 1;
/* 240 */     		
/* 241 */     		//Se mês inteiro foi selecionado, apenas soma ou subtrai o mês
/* 242 */     		if(i.eq(mi) && f.eq(mf)){
/* 243 */     			diff = (tipo == "-") ? -1 : 1;
/* 244 */     			
/* 245 */     			//soma ou subtrai o mes de inicio
/* 246 */     			i.addMonths(diff);
/* 247 */     			
/* 248 */     			//fim recebe o ultimo dia do mes do inicio
/* 249 */     			f = i.lastMonthDay();
/* 250 */     		}

/* datepickerrange.js */

/* 251 */     		//Se ano inteiro foi selecionado, apenas soma ou subtrai o ano
/* 252 */     		else if(i.eq(yi) && f.eq(yf)){
/* 253 */     			diff = (tipo == "-") ? -1 : 1;
/* 254 */     			
/* 255 */     			//soma ou subtrai o mes de inicio
/* 256 */     			i.addYears(diff);
/* 257 */     			
/* 258 */     			//fim recebe o ultimo dia do mes do inicio
/* 259 */     			f = i.lastYearDay();
/* 260 */     		}
/* 261 */     		//Caso contrário apenas subtrai ou soma a diferença
/* 262 */     		else{
/* 263 */ 	    		//Retorna a diferença
/* 264 */ 	    		if(tipo == "-"){
/* 265 */ 	    			diff *= -1;
/* 266 */ 	    		}
/* 267 */ 	    		//soma ou subtrai os dias
/* 268 */ 	    		i.addDays(diff);
/* 269 */ 	    		f.addDays(diff);
/* 270 */     		}
/* 271 */     		
/* 272 */     		//atualiza picks
/* 273 */     		update_picks(i.asString(), f.asString());
/* 274 */     		
/* 275 */     		//dispara o change
/* 276 */     		e.input.trigger("change");
/* 277 */     	}
/* 278 */     	
/* 279 */     	
/* 280 */     	/**
/* 281 *|     	 * Monta os date pickers do periodo
/* 282 *|     	 */
/* 283 */     	function pick_date(){
/* 284 */     		//Date picker de data inicial
/* 285 */     		e.cal_start.datePicker({
/* 286 */     			inline: 				true,
/* 287 */     			startDate:				$.i18n._("lang_start_date"),
/* 288 */     			showYearNavigation: 	false
/* 289 */     		}).bind('dateSelected', function(evt, selectedDate, $td){
/* 290 */     			var f = e.cal_end.dpGetSelected();
/* 291 */     			e.cal_end.dpSetStartDate(selectedDate.asString());
/* 292 */     			if(!f[0] || f[0]< selectedDate){
/* 293 */     				e.cal_end.dpSetSelected(selectedDate.asString(), false);
/* 294 */     			}
/* 295 */     			e.cal_end.dpRerenderCalendar();
/* 296 */     			
/* 297 */     			//atualiza campo de data
/* 298 */     			update_date();
/* 299 */     		});
/* 300 */     		

/* datepickerrange.js */

/* 301 */     		//Date picker de data Final
/* 302 */     		e.cal_end.datePicker({
/* 303 */     			inline: 				true,
/* 304 */     			startDate:				$.i18n._("lang_start_date"),
/* 305 */     			showYearNavigation: 	false
/* 306 */     		}).bind('dateSelected', function(evt, selectedDate, $td){
/* 307 */     			//atualiza campo de data
/* 308 */     			update_date();
/* 309 */     		});
/* 310 */     	}
/* 311 */     	
/* 312 */     	
/* 313 */     	/**
/* 314 *|     	 * Atualiza as datas selecionadas
/* 315 *|     	 */
/* 316 */     	function update_picks(a, b){
/* 317 */     		var i 		= "";
/* 318 */     		var f 		= "";
/* 319 */     		var is 		= e.cal_start.dpGetSelected()[0] ? e.cal_start.dpGetSelected()[0].asString() : "";
/* 320 */     		var fs 		= e.cal_end.dpGetSelected()[0] ? e.cal_end.dpGetSelected()[0].asString() : "";
/* 321 */     		var data_i = e.i_start.val();
/* 322 */     		var data_f = e.i_end.val();
/* 323 */     		
/* 324 */     		//Chamada sem parâmetros, Busca do campo de Data
/* 325 */     		if(a==undefined || a==null){
/* 326 */     			i		= data_i;
/* 327 */     			f		= data_f;
/* 328 */     		}
/* 329 */     		//parametros são vazios, limpa seleção de datas
/* 330 */     		else if(a=='' && b==''){
/* 331 */     			e.cal_start.dpClear();
/* 332 */     			e.cal_end.dpClear();
/* 333 */     			update_date();
/* 334 */     			return;
/* 335 */     		}
/* 336 */     		//Com parametros, utiliza as datas recebidas
/* 337 */     		else if(a && b){
/* 338 */     			i 		= a;
/* 339 */     			f 		= b;
/* 340 */     		}
/* 341 */     		//Com parametros, utiliza as datas recebidas
/* 342 */     		//ERRO
/* 343 */     		else{
/* 344 */     			return;
/* 345 */     		}
/* 346 */     		
/* 347 */     		//validando datas
/* 348 */     		i = (i.length == 10) ? i : false;
/* 349 */     		f = (f.length == 10) ? f : false;
/* 350 */     		

/* datepickerrange.js */

/* 351 */     		//Verifica se as datas atualmente selecionadas sao diferentes das informadas e retira a pre-selecao
/* 352 */     		if(i != is || fs != f){
/* 353 */     			//retirando selecao do menu lateral
/* 354 */     			e.itens.filter(".selected").removeClass("selected");
/* 355 */     		}
/* 356 */     		
/* 357 */     		//Selecionando as datas ou limpando caso as datas nao coincidam
/* 358 */     		if(i){ 
/* 359 */     			e.cal_start.dpSetSelected(i);
/* 360 */     		}else{
/* 361 */     			e.cal_start.dpSetSelected(is, false);
/* 362 */     			e.cal_end.dpSetStartDate($.i18n._("lang_start_date"));
/* 363 */     			e.cal_end.dpRerenderCalendar();
/* 364 */     		}
/* 365 */     		
/* 366 */     		//selecionando data final
/* 367 */     		if(f){
/* 368 */     			e.cal_end.dpSetSelected(f);
/* 369 */     			//se nao conseguir selecionar a data final por alguma limitacao, seleciona a mesma data do inicio
/* 370 */     			if(e.cal_end.dpGetSelected(f)[0].asString() != f){
/* 371 */     				e.cal_end.dpSetSelected(e.cal_start.dpGetSelected()[0].asString());
/* 372 */     			}
/* 373 */     		}else{
/* 374 */     			if(e.cal_end.dpGetSelected()[0]){
/* 375 */     				e.cal_end.dpSetSelected(e.cal_end.dpGetSelected()[0].asString(), false);
/* 376 */     			}
/* 377 */     		}
/* 378 */     	}
/* 379 */     	
/* 380 */     	
/* 381 */     	/** 
/* 382 *|     	 * Atualiza a data a partir dos pickers
/* 383 *|     	 */
/* 384 */     	function update_date(){
/* 385 */     		var i 		= e.cal_start.dpGetSelected();
/* 386 */     		var f 		= e.cal_end.dpGetSelected();
/* 387 */     		
/* 388 */     		if(i[0] && f[0]){
/* 389 */     			
/* 390 */     			//tratando datas para trocar o valor exibido
/* 391 */     			var mi		= i[0].firstMonthDay();
/* 392 */     			var mf		= i[0].lastMonthDay();
/* 393 */     			var yi		= i[0].firstYearDay();
/* 394 */     			var yf		= i[0].lastYearDay();
/* 395 */     			var val 	= "";
/* 396 */     			
/* 397 */     			//DIA : se inicio e fim forem iguais, mostra apenas o dia
/* 398 */     			if(i[0].eq(f[0])){
/* 399 */     				val 		= i[0].asString($.i18n._("lang_range_date_format_dia"));
/* 400 */     			}

/* datepickerrange.js */

/* 401 */     			//MÊS : se inicio e fim correspondem ao primeiro e ultimo dia do mês
/* 402 */     			else if(i[0].eq(mi) && f[0].eq(mf)){
/* 403 */     				val 		= i[0].asString($.i18n._("lang_range_date_format_mes"));
/* 404 */     			}
/* 405 */ 				//ANO : se inicio e fim correspondem ao primeiro e ultimo dia do ano
/* 406 */     			else if(i[0].eq(yi) && f[0].eq(yf)){
/* 407 */     				val 		= i[0].asString($.i18n._("lang_range_date_format_ano"));
/* 408 */     			}
/* 409 */     			//DEFAULT : formatação padrão de período
/* 410 */ 				else{
/* 411 */ 					var to		= $.i18n._("lang_range_separator");
/* 412 */ 					var format	= $.i18n._("lang_range_date_format");
/* 413 */ 					val 		= i[0].asString(format)+"  "+to+"  "+f[0].asString(format);
/* 414 */ 				}
/* 415 */     			
/* 416 */     			//coloca o valor exibido
/* 417 */     			e.input.val(val);
/* 418 */     			
/* 419 */     			//valores hidden
/* 420 */     			i 	= i[0].asString();
/* 421 */     			f 	= f[0].asString();
/* 422 */     			e.i_start.val(i);
/* 423 */     			e.i_end.val(f);
/* 424 */     			
/* 425 */     		}else{
/* 426 */     			var vazio	= $.i18n._("lang_range_periodo_vazio");
/* 427 */     			e.i_start.val("");
/* 428 */     			e.i_end.val("");
/* 429 */     			e.input.val(vazio);
/* 430 */     		}
/* 431 */     		
/* 432 */     		//retirando selecao do menu lateral
/* 433 */     		e.itens.filter(".selected").removeClass("selected");
/* 434 */ 
/* 435 */ 			//tenta selecionar a pre-selecao contendo o mesmo periodo
/* 436 */ 			e.itens.each(function(i, el){
/* 437 */ 				var dt = eval($(this).attr("rel"));
/* 438 */ 				if(e.i_start.val() == dt[0] && e.i_end.val() == dt[1]){
/* 439 */ 					$(this).addClass("selected");
/* 440 */ 				}
/* 441 */ 			});
/* 442 */     		
/* 443 */     		//Atualiza flag indicando se houve alteração
/* 444 */     		e.changed 	= e.changed || (e.input.val() != e.curVal);
/* 445 */     	}
/* 446 */         
/* 447 */     	
/* 448 */     	/**
/* 449 *|     	 * Monitora os inputs dentro da action.
/* 450 *|     	 * Caso algum seja alterado, considera que o input foi alterado

/* datepickerrange.js */

/* 451 *|     	 */
/* 452 */     	function action_evts(){
/* 453 */     		e.actions.find("input, select").change(function(evt,i){
/* 454 */     			e.changed = true;
/* 455 */     		});
/* 456 */     	}
/* 457 */     	
/* 458 */ 	};
/* 459 */ 	
/* 460 */ 	
/* 461 */ 	//Inicializa datepickers para calendarRanges
/* 462 */ 	$(document).ready(function(){
/* 463 */ 		$('.calendarRange').datePickerRange();
/* 464 */ 	});
/* 465 */ 	
/* 466 */ })(jQuery);
/* 467 */ 
