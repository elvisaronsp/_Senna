
/* menu.js */

/* 1   */ /**
/* 2   *|  * @author Bruno
/* 3   *|  */
/* 4   */ //removendo possiveis conflitos entre mootools e jquery
/* 5   */ jQuery.noConflict();
/* 6   */ 
/* 7   */ 
/* 8   */ //Remove uma notificação de aviso a partir do seu ID no sistema
/* 9   */ function fechaAvisoById(id_aviso){
/* 10  */ 	jQuery("#menu_aviso_"+id_aviso).trigger("close");
/* 11  */ }
/* 12  */ 
/* 13  */ 
/* 14  */ (function($){
/* 15  */ 	
/* 16  */ 	/**
/* 17  *| 	 * TOOLTIPS no Cabeçalho
/* 18  *| 	 ********************************/
/* 19  */ 	function menuToolTips(){
/* 20  */ 		if ($.fn.bt) {
/* 21  */ 			$.bt.defaults.closeWhenOthersOpen = true;
/* 22  */ 
/* 23  */ 			//Tooltips da Barra de Cabecalho
/* 24  */ 			$("#topNav a[title]").each(function(i, el){
/* 25  */ 				$this = $(el);
/* 26  */ 				
/* 27  */ 				//Exibe tip ao abrir tela
/* 28  */ 				if(!$this.data("bt")){
/* 29  */ 					$this.data("bt", "true");
/* 30  */ 					$this.attr("title", $this.attr("title").replace(/_/g, "").replace(/[\\\n]/g, "<br/>"));
/* 31  */ 					$this.bt({positions: ['bottom'], padding: 6, spikeLength: 10, spikeGirth: 10, centerPointY: 1.5, cornerRadius: 1, width: 250, shadow: false, fill: '#FFFFFF', strokeStyle: "#DDD", cssStyles: {color: "#666", 'font-size':'12px', 'text-align':'center' }});
/* 32  */ 					$this.btOn();
/* 33  */ 					
/* 34  */ 					//Esconde tips
/* 35  */ 					$this.mouseover(function(){
/* 36  */ 						$this.btOff();
/* 37  */ 					});
/* 38  */ 				}
/* 39  */ 				
/* 40  */ 				//Caso haja algum menu estatico, nao mostra tip
/* 41  */ 				if($(".top_menu.static").length > 0) $this.btOff();
/* 42  */ 				
/* 43  */ 			});
/* 44  */ 		}
/* 45  */ 	}
/* 46  */ 	
/* 47  */ 	/**
/* 48  *| 	 * Menus no topo 
/* 49  *| 	 ****************************/
/* 50  */ 	function menusTopo(){

/* menu.js */

/* 51  */ 		var modal_bg = $("#menu_modal_topo_bg");
/* 52  */ 		var triggers = $("#topNav a");
/* 53  */ 		
/* 54  */ 		$(".top_menu").each(function(i, el){
/* 55  */ 			var menu 	= $(el);
/* 56  */ 			var fclose	= true;
/* 57  */ 			var trigger = $("#"+menu.attr("id") + "_trigger");	//Trigger
/* 58  */ 			trigger.attr("href", "#").attr("tabindex", "-1");	//ativando eventos na ancora
/* 59  */ 			
/* 60  */ 			// Eventos
/* 61  */ 			var toggle = function(evt, stats){
/* 62  */ 				
/* 63  */ 				evt.stopPropagation();
/* 64  */ 				
/* 65  */ 				//esconde outros menus
/* 66  */ 				/*triggers.removeClass("ativo");
/* 67  *| 				$(".top_menu:not(.static)").hide();
/* 68  *| 				$(".top_menu:not(.static)").data("status", false);*/
/* 69  */ 				
/* 70  */ 				//Tratando menus estaticos
/* 71  */ 				if(menu.find(".close").length > 0 && !menu.hasClass("hidden")){
/* 72  */ 					//Nunca esconde menu static
/* 73  */ 					if(!stats) return;
/* 74  */ 				}
/* 75  */ 				
/* 76  */ 				//exibe ou esconde menu
/* 77  */ 				trigger.toggleClass('ativo', stats);
/* 78  */ 				
/* 79  */ 				menu.toggle(stats);
/* 80  */ 				menu.data("status", stats);
/* 81  */ 				
/* 82  */ 				//nao precisa continuar se nao esta mostrando
/* 83  */ 				if(!stats) return;
/* 84  */ 				
/* 85  */ 				//Verifica se menu deve ser reordenado
/* 86  */ 				if(menu.hasClass("reord")){
/* 87  */ 					//Organiza os elementos internos, apenas 1 vez
/* 88  */ 					if(stats && $.fn.masonry && !menu.find("ul").data("masonry")){
/* 89  */ 						menu.find("ul").masonry({
/* 90  */ 							itemSelector: 'li.categoria'
/* 91  */ 						});
/* 92  */ 					}
/* 93  */ 				}
/* 94  */ 				//Auto ajustando posicao do menu
/* 95  */ 				else{
/* 96  */ 					var p 	= trigger.offset();
/* 97  */ 					var l 	= Math.floor(p.left);
/* 98  */ 					var w 	= trigger.outerWidth();
/* 99  */ 					var mw 	= menu.outerWidth();
/* 100 */ 					

/* menu.js */

/* 101 */ 					if(mw < w){
/* 102 */ 						menu.css('width', (w-1));
/* 103 */ 						menu.css('left', l);
/* 104 */ 					}
/* 105 */ 					else if(!menu.hasClass("fixed")){
/* 106 */ 						menu.css('left', (l - mw + w));
/* 107 */ 					}
/* 108 */ 				}
/* 109 */ 				
/* 110 */ 			};
/* 111 */ 			
/* 112 */ 			var hide 		= function(evt){ toggle(evt, false); };
/* 113 */ 			var show 		= function(evt){ toggle(evt, true); };
/* 114 */ 			
/* 115 */ 			//Show
/* 116 */ 			menu.click(show);
/* 117 */ 			trigger.click(function(evt){
/* 118 */ 				var s = (menu.data("status") != true);
/* 119 */ 				toggle(evt, s);
/* 120 */ 			});
/* 121 */ 			
/* 122 */ 			//Hide
/* 123 */ 			menu.find("a, .close").mousedown(function(evt){
/* 124 */ 				fclose = false;
/* 125 */ 			});
/* 126 */ 			menu.find(".close").mouseup(function(evt){
/* 127 */ 				fclose = true;
/* 128 */ 				trigger.focus();
/* 129 */ 			});
/* 130 */ 			menu.find("a").mouseup(function(evt){
/* 131 */ 				fclose = true;
/* 132 */ 				setTimeout(function(){
/* 133 */ 					hide(evt);
/* 134 */ 					$(this).blur();
/* 135 */ 				}, 100);
/* 136 */ 			});
/* 137 */ 			menu.find("a, .close").each(function(i, el){
/* 138 */ 				el.addEventListener('dragend', function(evt) {
/* 139 */ 					fclose = true;
/* 140 */ 					hide(evt);
/* 141 */ 				}
/* 142 */ 			)});
/* 143 */ 			trigger.blur(function(evt){
/* 144 */ 				if(fclose){
/* 145 */ 					hide(evt);
/* 146 */ 				}
/* 147 */ 			});
/* 148 */ 
/* 149 */ 			
/* 150 */ 			trigger.keydown(function(evt){

/* menu.js */

/* 151 */ 				var key 			= evt.which;
/* 152 */ 				switch (key) {
/* 153 */ 					case 9:		//TAB
/* 154 */ 						evt.preventDefault();
/* 155 */ 						evt.stopPropagation();
/* 156 */ 						break;
/* 157 */ 					case 113: 	//ESC
/* 158 */ 					case 27: 	//ESC
/* 159 */ 						evt.preventDefault();
/* 160 */ 						evt.stopPropagation();
/* 161 */ 						hide(evt);
/* 162 */ 						break;
/* 163 */ 				}
/* 164 */ 			});
/* 165 */ 			
/* 166 */ 			//Sumir com tooltip
/* 167 */ 			$(document).click(function(evt){ trigger.btOff(); hide(evt)});
/* 168 */ 			$("#menu *").click(function(){ trigger.btOff(); });
/* 169 */ 			
/* 170 */ 		});
/* 171 */ 		
/* 172 */ 	}
/* 173 */ 	
/* 174 */ 	
/* 175 */ 	/** 
/* 176 *| 	 * Funcoes para o Menu modal 
/* 177 *| 	 * ***************************/
/* 178 */ 	function menuModal(){
/* 179 */ 		var bg 			= $("#menu_modal_bg"); 
/* 180 */ 		var container 	= $("#menu_modal_wrapper"); 
/* 181 */ 		var trigger		= $("#menu_modal_trigger");
/* 182 */ 		var scroll		= $("#menu_modal_scroll");
/* 183 */ 		var seta		= $("#menu_modal_triangle");
/* 184 */ 		var filtro 		= $("#filtro input"); 
/* 185 */ 		
/* 186 */ 		//Metodo para exibir
/* 187 */ 		var showModal = function(){
/* 188 */ 			if(!container.data("visivel")){
/* 189 */ 				filtro.trigger("reset");
/* 190 */ 				container.animate({width:"show"}, 300, function(){
/* 191 */ 					container.data("visivel", true);
/* 192 */ 					bg.show(); 
/* 193 */ 					seta.show();
/* 194 */ 					filtro.focus();
/* 195 */ 					menu_update_selected(true);
/* 196 */ 					//dispara evento após abrir o menu
/* 197 */ 					container.trigger("opened");
/* 198 */ 				});
/* 199 */ 			}
/* 200 */ 		};

/* menu.js */

/* 201 */ 		
/* 202 */ 		//Metodo para ocultar 
/* 203 */ 		var hideModal = function(){
/* 204 */ 			container.hide();
/* 205 */ 			container.data("visivel", false);
/* 206 */ 			bg.hide();
/* 207 */ 			seta.hide();
/* 208 */ 			$("#menu_wrapper").css("z-index", "15").data("overall", false);
/* 209 */ 			$("#menu_wrapper_closer").css("z-index", "14");
/* 210 */ 			
/* 211 */ 			//dispara evento após fechar o menu
/* 212 */ 			container.trigger("closed");
/* 213 */ 		};
/* 214 */ 		
/* 215 */ 		//Esconde
/* 216 */ 		$("#menu_wrapper, #menu *, #menu_modal_bg").click(function(evt){
/* 217 */ 			if(!$(evt.target).is("#menu_modal_trigger *")){
/* 218 */ 				hideModal();
/* 219 */ 			}
/* 220 */ 		});
/* 221 */ 		$("#menu_modal a[target]").click(hideModal);
/* 222 */ 		
/* 223 */ 		//Exibe
/* 224 */ 		trigger.click(showModal);
/* 225 */ 		
/* 226 */ 		//gerando evento para abrir o menu
/* 227 */ 		//jQuery
/* 228 */ 		$("#menu").bind("show", showModal);
/* 229 */ 		$("#menu").bind("hide", hideModal);
/* 230 */ 		//Mootools
/* 231 */ 		$$("#menu").addEvent("show", showModal);
/* 232 */ 		$$("#menu").addEvent("hide", hideModal);
/* 233 */ 	}
/* 234 */ 	
/* 235 */ 	/**
/* 236 *| 	 * Tratando fechamento dos avisos do sistema
/* 237 *| 	 ****************************/
/* 238 */ 	function fechaAvisos(){
/* 239 */ 		//registra contador
/* 240 */ 		var menu 	= $("#top_menu_alertas");
/* 241 */ 		var trigger = $("#top_menu_alertas_trigger");
/* 242 */ 		var counter = trigger.find(".alert_counter");
/* 243 */ 		
/* 244 */ 		$(".alerta_msg.alerta").click(function(evt){
/* 245 */ 			hideAlert($(this));
/* 246 */ 		});
/* 247 */ 		
/* 248 */ 		$(".alerta_msg.alerta *").click(function(evt){
/* 249 */ 			hideAlert($(this).parents(".alerta_msg"));
/* 250 */ 		});

/* menu.js */

/* 251 */ 
/* 252 */ 		
/* 253 */ 		$(".aviso_msg.alerta").bind('close', function(evt){
/* 254 */ 			//remove aviso
/* 255 */ 			$(this).remove();
/* 256 */ 			//atualiza contador
/* 257 */ 			update_counter(-1);
/* 258 */ 		});
/* 259 */ 		$(".aviso_msg.alerta").click(function(evt){
/* 260 */ 			//remove aviso
/* 261 */ 			$(this).remove();
/* 262 */ 			//atualiza contador
/* 263 */ 			update_counter(-1);
/* 264 */ 		});
/* 265 */ 		$(".aviso_msg.alerta *").click(function(evt){
/* 266 */ 			//remove aviso
/* 267 */ 			$(this).parents(".aviso_msg").remove();
/* 268 */ 			//atualiza contador
/* 269 */ 			update_counter(-1);
/* 270 */ 		});
/* 271 */ 		
/* 272 */ 		
/* 273 */ 		//Fecha alerta e diminui contagem de avisos, caso haja
/* 274 */ 		function hideAlert(a){
/* 275 */ 			//verifica se já está oculto
/* 276 */ 			if(a.find(".close").length == 0) return;
/* 277 */ 			
/* 278 */ 			//esconde alerta
/* 279 */ 			a.removeClass("alerta");
/* 280 */ 			a.find(".close").remove();
/* 281 */ 			
/* 282 */ 			//atualiza contador
/* 283 */ 			update_counter(-1);
/* 284 */ 		}
/* 285 */ 		
/* 286 */ 		//Método para atualizar contador
/* 287 */ 		function update_counter(i){
/* 288 */ 			var c = parseInt(counter.html()) + i;
/* 289 */ 			var num_alertas = $(".alerta_msg.alerta").length;
/* 290 */ 			
/* 291 */ 			if(c>0) {
/* 292 */ 				counter.html(c+"");
/* 293 */ 			}else{ 
/* 294 */ 				counter.hide();
/* 295 */ 				trigger.removeClass("alerta ativo static");
/* 296 */ 				menu.removeClass("static");
/* 297 */ 			}
/* 298 */ 			if(num_alertas == 1){
/* 299 */ 				menu.addClass("hidden avisos_only");
/* 300 */ 			}

/* menu.js */

/* 301 */ 		}
/* 302 */ 	}
/* 303 */ 	
/* 304 */ 	/** 
/* 305 *| 	 * Expansão e contração do Menu 
/* 306 *| 	 * ********************************/
/* 307 */ 	function expandeMenu(){
/* 308 */ 		//VARIAVEIS ================
/* 309 */ 		var menu 				= $("#menu_wrapper");
/* 310 */ 		var menu_links 			= $("#menu_wrapper *");
/* 311 */ 		var modal_trigger 		= $("#menu_modal_trigger");
/* 312 */ 		var closer 				= $("#menu_wrapper_closer");
/* 313 */ 		var closer_els			= $("iframe, .mochaOverlay, #menu_wrapper_closer, #menu_modal *");
/* 314 */ 		var timeout 			= null;
/* 315 */ 		
/* 316 */ 		//MÉTODOS ================
/* 317 */ 		
/* 318 */ 		//reduz a camada do menu apenas se não foi fechado pelo trigger do modal
/* 319 */ 		function layerDown(){
/* 320 */ 			if(!menu.data("overall")){ 
/* 321 */ 				menu.css("z-index", '15');
/* 322 */ 				closer.css("z-index", '14');
/* 323 */ 			}
/* 324 */ 		}
/* 325 */ 		
/* 326 */ 		//aumenta a camada do menu para ser exibido sobre janelas
/* 327 */ 		function layerUp(){
/* 328 */ 			closer.css("z-index", '10004');
/* 329 */ 			menu.css("z-index", "10005");
/* 330 */ 		}
/* 331 */ 		
/* 332 */ 		
/* 333 */ 		//expande o menu
/* 334 */ 		var _expand = function(evt){
/* 335 */ 			var m = $("#menu_wrapper"); 
/* 336 */ 			var abrindo = m.is(":animated");
/* 337 */ 			if(!m.data("expandido") && !abrindo && !$("#menu_modal").is(":visible")){
/* 338 */ 				layerUp();
/* 339 */ 				menu.animate({width:"255px"}, 100, function(){
/* 340 */ 					if(!m.data("expandido")){
/* 341 */ 						closer.show();
/* 342 */ 						menu.addClass('expandido');
/* 343 */ 						menu.data("expandido", true);
/* 344 */ 					}
/* 345 */ 				});
/* 346 */ 			}
/* 347 */ 		};
/* 348 */ 		
/* 349 */ 		
/* 350 */ 		//Recolhe Menu

/* menu.js */

/* 351 */ 		var _collapse = function(evt){
/* 352 */ 			
/* 353 */ 			//fecha div de controle
/* 354 */ 			closer.hide();
/* 355 */ 			
/* 356 */ 			//fecha apenas se estiver expandido
/* 357 */ 			if(!menu.data("expandido")) return;
/* 358 */ 			
/* 359 */ 			//retirando a classe
/* 360 */ 			menu.removeClass('expandido');
/* 361 */ 			menu.animate({width:"60px"}, 100, function(){
/* 362 */ 				if(menu.data("expandido", true)){
/* 363 */ 					closer.hide();
/* 364 */ 					menu.data("expandido", false);
/* 365 */ 				}
/* 366 */ 			});
/* 367 */ 			
/* 368 */ 			//reduz a camada do menu apenas se não foi fechado pelo trigger do modal
/* 369 */ 			layerDown();
/* 370 */ 		};
/* 371 */ 		
/* 372 */ 		
/* 373 */ 		
/* 374 */ 		//EVENTOS ================
/* 375 */ 		//Exibindo menu completo com mouse over
/* 376 */ 		menu.mouseover(function(evt){
/* 377 */ 			if(!timeout){
/* 378 */ 				layerUp();
/* 379 */ 				closer.show();
/* 380 */ 				timeout = setTimeout(_expand, 300);
/* 381 */ 			}
/* 382 */ 		});
/* 383 */ 		
/* 384 */ 		//Exibindo menu completo com clique (dispositivos moveis)
/* 385 */ 		menu.click(function(evt){
/* 386 */ 			clearTimeout(timeout);
/* 387 */ 			layerUp();
/* 388 */ 			_expand();
/* 389 */ 		});
/* 390 */ 		
/* 391 */ 		//interrompendo abertura do menu quando algum link for clicado
/* 392 */ 		menu_links.click(function(evt){
/* 393 */ 			clearTimeout(timeout);
/* 394 */ 			timeout = null;
/* 395 */ 			$("#menu_modal a.selected").removeClass("selected"); //retira item selecionado no menu
/* 396 */ 			_collapse();
/* 397 */ 		});
/* 398 */ 		
/* 399 */ 		//recolhe o menu se o alvo for algum elemento fora do menu_wrapper
/* 400 */ 		closer_els.mouseover(function(){

/* menu.js */

/* 401 */ 			clearTimeout(timeout);
/* 402 */ 			timeout = null;
/* 403 */ 			layerDown();
/* 404 */ 			_collapse();
/* 405 */ 		});
/* 406 */ 		
/* 407 */ 		//trigger do modal
/* 408 */ 		modal_trigger.click(function(evt){
/* 409 */ 			menu.data("overall", true); //forçando o menu a ficar por cima de qualquer janela
/* 410 */ 			clearInterval(timeout);
/* 411 */ 			timeout = null;
/* 412 */ 			_collapse(evt);
/* 413 */ 		});
/* 414 */ 	}
/* 415 */ 	
/* 416 */ 	
/* 417 */ 	/** 
/* 418 *| 	 * Navegação por teclado no menu
/* 419 *| 	 * ***************************/
/* 420 */ 	var menu_link_itens = $("#menu_modal a.item:visible");
/* 421 */ 	var selected_index	= 0;
/* 422 */ 	
/* 423 */ 	
/* 424 */ 	/* Realiza o Scroll para mostrar o elemento */
/* 425 */ 	function menu_update_scroll(ontop){
/* 426 */ 		ontop 				= (ontop===true);
/* 427 */ 		var el				= menu_link_itens.eq(selected_index);
/* 428 */ 		var position 		= el.position().top;
/* 429 */ 		var elHeight		= el.height();
/* 430 */ 		
/* 431 */ 		var scroll			= $("#menu_modal_scroll");
/* 432 */ 		var divHeight 		= scroll.height();
/* 433 */ 		var divScroll 		= scroll.scrollTop();
/* 434 */ 		
/* 435 */ 		//coloca item no topo caso ontop seja true
/* 436 */ 		if(ontop){
/* 437 */ 			scroll.scrollTop(Math.floor(position));
/* 438 */ 			return;
/* 439 */ 		}
/* 440 */ 		
/* 441 */ 		//se a posicao do elemento for maior que a altura do Div, aumenta o scroll em posicao + altura do elemento - altura da div
/* 442 */ 		if(Math.ceil(position + elHeight) > Math.floor(divScroll + divHeight)){
/* 443 */ 			scroll.scrollTop(Math.ceil(position + elHeight - divHeight));
/* 444 */ 		}
/* 445 */ 		//se a posicao for menor, coloca o elemento no topo
/* 446 */ 		else if(Math.floor(position) < Math.ceil(divScroll)){
/* 447 */ 			scroll.scrollTop(Math.floor(position));
/* 448 */ 		}
/* 449 */ 	}
/* 450 */ 	

/* menu.js */

/* 451 */ 	
/* 452 */ 	/* Atualiza o elemento selecionado para o primeiro da lista */
/* 453 */ 	function menu_update_selected(keep_last){
/* 454 */ 		//verificando parametro
/* 455 */ 		keep_last = (keep_last===true);
/* 456 */ 		
/* 457 */ 		//atualizando lista de elementos
/* 458 */ 		menu_link_itens 	= $("#menu_modal a.item:visible");
/* 459 */ 		selected_index 		= menu_find_current_selected();
/* 460 */ 		
/* 461 */ 		if(!keep_last || selected_index==0){ //mantém ultima selecao
/* 462 */ 			$("#menu_modal a.selected").removeClass("selected");
/* 463 */ 			$("#menu_modal a.item:visible:first").addClass("selected");
/* 464 */ 			$("#menu_modal_scroll").scrollTop(0);
/* 465 */ 		}else{
/* 466 */ 			//Da um scroll com gap de 150px pra cima para ficar mais visivel quando menu for aberto sem filtro com a ultima opcao selecionada
/* 467 */ 			menu_update_scroll(true); 
/* 468 */ 		}
/* 469 */ 	}
/* 470 */ 	
/* 471 */ 	
/* 472 */ 	/* Encontra o indice do item selecionado atualmente*/
/* 473 */ 	function menu_find_current_selected(){
/* 474 */ 		for(i=0; i<menu_link_itens.length; i++){
/* 475 */ 			if(menu_link_itens.eq(i).is(".selected")){
/* 476 */ 				return i;
/* 477 */ 			}
/* 478 */ 		}
/* 479 */ 		return 0;
/* 480 */ 	}
/* 481 */ 	
/* 482 */ 	
/* 483 */ 	/* Seleciona Item clicado */
/* 484 */ 	function menu_select_item(item){
/* 485 */ 		$("#menu_modal a.selected").removeClass("selected");
/* 486 */ 		item.addClass("selected");
/* 487 */ 	}
/* 488 */ 	
/* 489 */ 	
/* 490 */ 	/* Trata eventos de teclado */
/* 491 */ 	function menu_key_action(evt){
/* 492 */ 		
/* 493 */ 		//encontra o elemento atualmente selecionado
/* 494 */ 		selected_index = menu_find_current_selected();
/* 495 */ 		
/* 496 */ 		var key 			= evt.which;
/* 497 */ 		var current			= menu_link_itens.eq(selected_index);
/* 498 */ 		var all_selected	= $("#menu_modal a.selected");
/* 499 */ 		
/* 500 */ 		switch (key) {

/* menu.js */

/* 501 */ 		
/* 502 */ 		case 38:	//SETA CIMA
/* 503 */ 			evt.preventDefault();
/* 504 */ 			evt.stopPropagation();
/* 505 */ 			
/* 506 */ 			//seleciona o item anterior se existir na lista
/* 507 */ 			if(selected_index > 0){
/* 508 */ 				current.removeClass("selected"); 									//deseleciona todos os selected
/* 509 */ 				menu_link_itens.eq(selected_index-1).addClass("selected");			//seleciona o anterior
/* 510 */ 				selected_index--;
/* 511 */ 				
/* 512 */ 				//rola a tela caso o item esteja fora dela
/* 513 */ 				menu_update_scroll();
/* 514 */ 				
/* 515 */ 			}
/* 516 */ 			break;
/* 517 */ 			
/* 518 */ 		case 40:	//SETA BAIXO
/* 519 */ 			evt.preventDefault();
/* 520 */ 			evt.stopPropagation();
/* 521 */ 			
/* 522 */ 			//seleciona o proximo item se existir na lista
/* 523 */ 			if(selected_index < menu_link_itens.length-1){
/* 524 */ 				current.removeClass("selected");									//deseleciona todos os selected
/* 525 */ 				menu_link_itens.eq(selected_index+1).addClass("selected");			//seleciona o proximo item
/* 526 */ 				selected_index++;
/* 527 */ 				
/* 528 */ 				//rola a tela caso o item esteja fora dela
/* 529 */ 				menu_update_scroll();
/* 530 */ 			}
/* 531 */ 			break;
/* 532 */ 		
/* 533 */ 		case 9:		//TAB 
/* 534 */ 			evt.preventDefault();
/* 535 */ 			evt.stopPropagation();
/* 536 */ 			break;
/* 537 */ 			
/* 538 */ 		case 13: 	//ENTER
/* 539 */ 			evt.preventDefault();
/* 540 */ 			evt.stopPropagation();
/* 541 */ 			//se há algum item selecionado, clica nele
/* 542 */ 			if(current.length == 1){
/* 543 */ 				//mootools
/* 544 */ 				$$(current.get())[0].fireEvent("click", new Event(evt));
/* 545 */ 				//jquery
/* 546 */ 				current.click();
/* 547 */ 			}
/* 548 */ 			break;
/* 549 */ 			
/* 550 */ 		case 27: 	//ESC

/* menu.js */

/* 551 */ 			evt.preventDefault();
/* 552 */ 			evt.stopPropagation();
/* 553 */ 			$("#menu").trigger("hide");
/* 554 */ 			break;
/* 555 */ 		
/* 556 */ 		//Retorna dizendo que nao houve alterações na seleção
/* 557 */ 		default:
/* 558 */ 			if(key==8 || key==46 || (key >= 48 && key <= 90) || (key >= 96 && key <= 111) || (key >= 186 && key <= 222)){
/* 559 */ 				return false;
/* 560 */ 			} 
/* 561 */ 			break;
/* 562 */ 		}
/* 563 */ 		
/* 564 */ 		//houve alguma alteração na seleção
/* 565 */ 		return true;
/* 566 */ 	}
/* 567 */ 	
/* 568 */ 	
/* 569 */ 	/** 
/* 570 *| 	 * Pesquisa no menu 
/* 571 *| 	 * ***************************/
/* 572 */ 	function menu_filtro(){
/* 573 */ 		var lista		= $("#menu_modal li.item");
/* 574 */ 		var lista_nomes	= $("#menu_modal li.item .label");
/* 575 */ 		var lista_cats	= $("#menu_modal li.categoria a.returnFalse");
/* 576 */ 		var num_cats 	= lista_cats.length;
/* 577 */ 		var filtro 		= $("#filtro input");
/* 578 */ 		var placeholder	= filtro.attr('placeholder');
/* 579 */ 		var bg 			= $("#menu_wrapper_bg"); 
/* 580 */ 		
/* 581 */ 		//Tratando Teclas
/* 582 */ 		filtro.keydown(function(evt){
/* 583 */ 			//executa rotina de navegação e tratamento de teclas
/* 584 */ 			filtro.data('sel_changed', menu_key_action(evt));
/* 585 */ 			
/* 586 */ 			//se classe vazia, limpa o campo
/* 587 */ 			if(!filtro.data('sel_changed') && filtro.is(".vazio")){
/* 588 */ 				filtro.removeClass("vazio");
/* 589 */ 				filtro.val("");
/* 590 */ 			}
/* 591 */ 		});
/* 592 */ 		
/* 593 */ 		//executando filtro ao teclar
/* 594 */ 		filtro.keyup(function(evt){
/* 595 */ 			var $this 	= $(this);
/* 596 */ 			var val 	= $this.val().toLowerCase();
/* 597 */ 			
/* 598 */ 			//verifica se foi digitado algo
/* 599 */ 			if(filtro.is(".vazio")) return;
/* 600 */ 			

/* menu.js */

/* 601 */ 			//itens
/* 602 */ 			lista.each(function(i, el){
/* 603 */ 				var $el 	= $(el); 
/* 604 */ 				var nome 	= lista_nomes.eq(i).text().toLowerCase();
/* 605 */ 				var keys 	= $el.attr("meta").toLowerCase();
/* 606 */ 				var regexp	= new RegExp("(?="+val+")", "g");
/* 607 */ 				
/* 608 */ 				//Se está fora da seleção, esconde
/* 609 */ 				if(val!="" && !regexp.test(nome) && !regexp.test(keys)){
/* 610 */ 					$el.hide();
/* 611 */ 				}else{
/* 612 */ 					$el.show();
/* 613 */ 				}
/* 614 */ 			});
/* 615 */ 			
/* 616 */ 			//categorias
/* 617 */ 			lista_cats.each(function(i, el){
/* 618 */ 				var $el = lista_cats.eq(num_cats-i-1);
/* 619 */ 				
/* 620 */ 				if($el.parent().find("ul:first > li > a.item:visible").length == 0){
/* 621 */ 					$el.hide();
/* 622 */ 				}else{
/* 623 */ 					$el.show();
/* 624 */ 				}
/* 625 */ 			});
/* 626 */ 			
/* 627 */ 			//atualiza o selecionado, caso nao tenha havido apenas uma troca de seleção
/* 628 */ 			if(!filtro.data('sel_changed')){
/* 629 */ 				menu_update_selected();
/* 630 */ 			}
/* 631 */ 			
/* 632 */ 			//colocando classe inativa
/* 633 */ 			if(filtro.val()==""){
/* 634 */ 				filtro.addClass("vazio");
/* 635 */ 				filtro.val(placeholder);
/* 636 */ 			}
/* 637 */ 		});
/* 638 */ 		
/* 639 */ 		//reseta o filtro
/* 640 */ 		filtro.bind("reset", function(){
/* 641 */ 			lista.show();
/* 642 */ 			lista_cats.show();
/* 643 */ 			filtro.val(filtro.attr('placeholder'));
/* 644 */ 			filtro.addClass("vazio");
/* 645 */ 			//$("#menu_modal a.selected").removeClass("selected");
/* 646 */ 		});
/* 647 */ 		
/* 648 */ 		//retirando classe inativa
/* 649 */ 		filtro.blur(function(){
/* 650 */ 			if(filtro.val()==""){

/* menu.js */

/* 651 */ 				filtro.addClass("vazio");
/* 652 */ 				filtro.val(placeholder);
/* 653 */ 			}
/* 654 */ 		});
/* 655 */ 		
/* 656 */ 		//inserindo evento de clique para atualizar elemento selecionado
/* 657 */ 		$("#menu_modal a.item").click(function(evt){
/* 658 */ 			menu_select_item($(this));
/* 659 */ 		});
/* 660 */ 	}
/* 661 */ 
/* 662 */ 	
/* 663 */ 	/** 
/* 664 *| 	 * Inicio
/* 665 *| 	 * ***************************/
/* 666 */ 	$(document).ready(function(){
/* 667 */ 		//modais
/* 668 */ 		menuModal();
/* 669 */ 		
/* 670 */ 		//menus topo
/* 671 */ 		menusTopo();
/* 672 */ 		
/* 673 */ 		//expandindo o menu com os nomes
/* 674 */ 		expandeMenu();
/* 675 */ 		
/* 676 */ 		//Filtragem do menu
/* 677 */ 		menu_filtro();
/* 678 */ 		
/* 679 */ 		//Fecha os avisos do sistema
/* 680 */ 		fechaAvisos();
/* 681 */ 		
/* 682 */ 		//tooltips
/* 683 */ 		//menuToolTips();
/* 684 */ 	});
/* 685 */ 	
/* 686 */ 	
/* 687 */ 	
/* 688 */ })(jQuery);
