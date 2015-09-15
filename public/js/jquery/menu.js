
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
/* 180 */ 		var sub_menu	= $("#menu_sub"); 
/* 181 */ 		var sub_wrapper	= $("#menu_sub_wrapper"); 
/* 182 */ 		var container 	= $("#menu_modal_wrapper"); 
/* 183 */ 		var trigger		= $("#menu_modal_trigger");
/* 184 */ 		var scroll		= $("#menu_modal_scroll");
/* 185 */ 		var seta		= $("#menu_modal_triangle");
/* 186 */ 		var filtro 		= $("#filtro input"); 
/* 187 */ 		
/* 188 */ 		//Metodo para exibir
/* 189 */ 		var showModal = function(){
/* 190 */ 			if(!container.data("visivel")){
/* 191 */ 				filtro.trigger("reset");
/* 192 */ 				container.animate({width:"show"}, 300, function(){
/* 193 */ 					container.data("visivel", true);
/* 194 */ 					bg.show(); 
/* 195 */ 					seta.show();
/* 196 */ 					filtro.focus();
/* 197 */ 					menu_update_selected(true);
/* 198 */ 					//dispara evento após abrir o menu
/* 199 */ 					container.trigger("opened");
/* 200 */ 				});

/* menu.js */

/* 201 */ 			}
/* 202 */ 		};
/* 203 */ 		
/* 204 */ 		//Exibir Submenu
/* 205 */ 		var showSubmenu = function(evt){
/* 206 */ 			
/* 207 */ 			//Carrega o conteúdo do submenu
/* 208 */ 			var submenu_anchor 	= $(evt.target).parents("li").find('a');
/* 209 */ 			var submenu_name 	= submenu_anchor.attr("rel");
/* 210 */ 			var submenu_link 	= submenu_anchor.attr("href");
/* 211 */ 			
/* 212 */ 			//verifica conteudo atual do menu
/* 213 */ 			if(sub_menu.data('link') != submenu_link){
/* 214 */ 				
/* 215 */ 				//verifica se o menu ja está aberto
/* 216 */ 				if(sub_wrapper.hasClass('visible')){
/* 217 */ 					hideSubmenu(false, true);
/* 218 */ 				}
/* 219 */ 				
/* 220 */ 				//troca o menu e exibe novamente via ajax
/* 221 */ 				sub_menu.load( submenu_link + '/get_menu', [], function(){
/* 222 */ 					sub_menu.data('link', submenu_link);
/* 223 */ 					initializeWindows();
/* 224 */ 					sub_wrapper.removeClass("hidden").addClass("visible");
/* 225 */ 					container.trigger("submenu_loaded");
/* 226 */ 				});
/* 227 */ 			}else{
/* 228 */ 				//apenas exibe o menu
/* 229 */ 				sub_wrapper.removeClass("hidden").addClass("visible");
/* 230 */ 				container.trigger("submenu_loaded");
/* 231 */ 			}
/* 232 */ 			
/* 233 */ 			container.trigger("submenu_opened");
/* 234 */ 		};
/* 235 */ 		
/* 236 */ 		//Esconder Submenu
/* 237 */ 		var hideSubmenu = function(force, noevt){
/* 238 */ 			//efeito para fechar ou forcar fechamento
/* 239 */ 			if(force===true){
/* 240 */ 				sub_wrapper.removeClass("visible").removeClass("hidden");
/* 241 */ 			}else{
/* 242 */ 				sub_wrapper.addClass("hidden");
/* 243 */ 			}
/* 244 */ 			
/* 245 */ 			if(noevt !== true){
/* 246 */ 				//dispara evento após fechar o submenu
/* 247 */ 				container.trigger("submenu_closed");
/* 248 */ 			}
/* 249 */ 		};
/* 250 */ 		

/* menu.js */

/* 251 */ 		//Metodo para ocultar 
/* 252 */ 		var hideModal = function(){
/* 253 */ 			hideSubmenu(true);
/* 254 */ 			container.hide();
/* 255 */ 			container.data("visivel", false);
/* 256 */ 			bg.hide();
/* 257 */ 			seta.hide();
/* 258 */ 			$("#menu_wrapper").css("z-index", "15").data("overall", false);
/* 259 */ 			$("#menu_wrapper_closer").css("z-index", "14");
/* 260 */ 			
/* 261 */ 			//dispara evento após fechar o menu
/* 262 */ 			container.trigger("closed");
/* 263 */ 		};
/* 264 */ 		
/* 265 */ 		//Esconde
/* 266 */ 		$("#menu_wrapper, #menu *, #menu_modal_bg").click(function(evt){
/* 267 */ 			if(!$(evt.target).is("#menu_modal_trigger *")){
/* 268 */ 				hideModal();
/* 269 */ 			}
/* 270 */ 		});
/* 271 */ 		$("#menu_modal a[target], #menu_sub a[target]").livequery('click', hideModal);
/* 272 */ 		
/* 273 */ 		//Exibe Menu
/* 274 */ 		trigger.click(showModal);
/* 275 */ 
/* 276 */ 		//Exibe Submenu
/* 277 */ 		container.find(".submenu_link").click(showSubmenu);
/* 278 */ 		
/* 279 */ 		//Esconde Submenu
/* 280 */ 		sub_wrapper.find(".submenu_hide").click(hideSubmenu);
/* 281 */ 		
/* 282 */ 		//gerando eventos para abrir o menu
/* 283 */ 		//jQuery
/* 284 */ 		$("#menu").bind("show", showModal);
/* 285 */ 		$("#menu").bind("hide", hideModal);
/* 286 */ 		//Mootools
/* 287 */ 		$$("#menu").addEvent("show", showModal);
/* 288 */ 		$$("#menu").addEvent("hide", hideModal);
/* 289 */ 	}
/* 290 */ 	
/* 291 */ 	/**
/* 292 *| 	 * Tratando fechamento dos avisos do sistema
/* 293 *| 	 ****************************/
/* 294 */ 	function fechaAvisos(){
/* 295 */ 		//registra contador
/* 296 */ 		var menu 	= $("#top_menu_alertas");
/* 297 */ 		var trigger = $("#top_menu_alertas_trigger");
/* 298 */ 		var counter = trigger.find(".alert_counter");
/* 299 */ 		
/* 300 */ 		$(".alerta_msg.alerta").click(function(evt){

/* menu.js */

/* 301 */ 			hideAlert($(this));
/* 302 */ 		});
/* 303 */ 		
/* 304 */ 		$(".alerta_msg.alerta *").click(function(evt){
/* 305 */ 			hideAlert($(this).parents(".alerta_msg"));
/* 306 */ 		});
/* 307 */ 
/* 308 */ 		
/* 309 */ 		$(".aviso_msg.alerta").bind('close', function(evt){
/* 310 */ 			//remove aviso
/* 311 */ 			$(this).remove();
/* 312 */ 			//atualiza contador
/* 313 */ 			update_counter(-1);
/* 314 */ 		});
/* 315 */ 		$(".aviso_msg.alerta").click(function(evt){
/* 316 */ 			//remove aviso
/* 317 */ 			$(this).remove();
/* 318 */ 			//atualiza contador
/* 319 */ 			update_counter(-1);
/* 320 */ 		});
/* 321 */ 		$(".aviso_msg.alerta *").click(function(evt){
/* 322 */ 			//remove aviso
/* 323 */ 			$(this).parents(".aviso_msg").remove();
/* 324 */ 			//atualiza contador
/* 325 */ 			update_counter(-1);
/* 326 */ 		});
/* 327 */ 		
/* 328 */ 		
/* 329 */ 		//Fecha alerta e diminui contagem de avisos, caso haja
/* 330 */ 		function hideAlert(a){
/* 331 */ 			//verifica se já está oculto
/* 332 */ 			if(a.find(".close").length == 0) return;
/* 333 */ 			
/* 334 */ 			//esconde alerta
/* 335 */ 			a.removeClass("alerta");
/* 336 */ 			a.find(".close").remove();
/* 337 */ 			
/* 338 */ 			//atualiza contador
/* 339 */ 			update_counter(-1);
/* 340 */ 		}
/* 341 */ 		
/* 342 */ 		//Método para atualizar contador
/* 343 */ 		function update_counter(i){
/* 344 */ 			var c = parseInt(counter.html()) + i;
/* 345 */ 			var num_alertas = $(".alerta_msg.alerta").length;
/* 346 */ 			
/* 347 */ 			if(c>0) {
/* 348 */ 				counter.html(c+"");
/* 349 */ 			}else{ 
/* 350 */ 				counter.hide();

/* menu.js */

/* 351 */ 				trigger.removeClass("alerta ativo static");
/* 352 */ 				menu.removeClass("static");
/* 353 */ 			}
/* 354 */ 			if(num_alertas == 1){
/* 355 */ 				menu.addClass("hidden avisos_only");
/* 356 */ 			}
/* 357 */ 		}
/* 358 */ 	}
/* 359 */ 	
/* 360 */ 	/** 
/* 361 *| 	 * Expansão e contração do Menu 
/* 362 *| 	 * ********************************/
/* 363 */ 	function expandeMenu(){
/* 364 */ 		//VARIAVEIS ================
/* 365 */ 		var menu 				= $("#menu_wrapper");
/* 366 */ 		var menu_links 			= $("#menu_wrapper *");
/* 367 */ 		var modal_trigger 		= $("#menu_modal_trigger");
/* 368 */ 		var closer 				= $("#menu_wrapper_closer");
/* 369 */ 		var closer_els			= $("iframe, .mochaOverlay, #menu_wrapper_closer, #menu_modal *");
/* 370 */ 		var timeout 			= null;
/* 371 */ 		
/* 372 */ 		//MÉTODOS ================
/* 373 */ 		
/* 374 */ 		//reduz a camada do menu apenas se não foi fechado pelo trigger do modal
/* 375 */ 		function layerDown(){
/* 376 */ 			if(!menu.data("overall")){ 
/* 377 */ 				menu.css("z-index", '15');
/* 378 */ 				closer.css("z-index", '14');
/* 379 */ 			}
/* 380 */ 		}
/* 381 */ 		
/* 382 */ 		//aumenta a camada do menu para ser exibido sobre janelas
/* 383 */ 		function layerUp(){
/* 384 */ 			closer.css("z-index", '10004');
/* 385 */ 			menu.css("z-index", "10005");
/* 386 */ 		}
/* 387 */ 		
/* 388 */ 		
/* 389 */ 		//expande o menu
/* 390 */ 		var _expand = function(evt){
/* 391 */ 			var m = $("#menu_wrapper"); 
/* 392 */ 			var abrindo = m.is(":animated");
/* 393 */ 			if(!m.data("expandido") && !abrindo && !$("#menu_modal").is(":visible")){
/* 394 */ 				layerUp();
/* 395 */ 				menu.animate({width:"255px"}, 100, function(){
/* 396 */ 					if(!m.data("expandido")){
/* 397 */ 						closer.show();
/* 398 */ 						menu.addClass('expandido');
/* 399 */ 						menu.data("expandido", true);
/* 400 */ 					}

/* menu.js */

/* 401 */ 				});
/* 402 */ 			}
/* 403 */ 		};
/* 404 */ 		
/* 405 */ 		
/* 406 */ 		//Recolhe Menu
/* 407 */ 		var _collapse = function(evt){
/* 408 */ 			
/* 409 */ 			//fecha div de controle
/* 410 */ 			closer.hide();
/* 411 */ 			
/* 412 */ 			//fecha apenas se estiver expandido
/* 413 */ 			if(!menu.data("expandido")) return;
/* 414 */ 			
/* 415 */ 			//retirando a classe
/* 416 */ 			menu.removeClass('expandido');
/* 417 */ 			menu.animate({width:"60px"}, 100, function(){
/* 418 */ 				if(menu.data("expandido", true)){
/* 419 */ 					closer.hide();
/* 420 */ 					menu.data("expandido", false);
/* 421 */ 				}
/* 422 */ 			});
/* 423 */ 			
/* 424 */ 			//reduz a camada do menu apenas se não foi fechado pelo trigger do modal
/* 425 */ 			layerDown();
/* 426 */ 		};
/* 427 */ 		
/* 428 */ 		
/* 429 */ 		
/* 430 */ 		//EVENTOS ================
/* 431 */ 		//Exibindo menu completo com mouse over
/* 432 */ 		menu.mouseover(function(evt){
/* 433 */ 			if(!timeout){
/* 434 */ 				layerUp();
/* 435 */ 				closer.show();
/* 436 */ 				timeout = setTimeout(_expand, 300);
/* 437 */ 			}
/* 438 */ 		});
/* 439 */ 		
/* 440 */ 		//Exibindo menu completo com clique (dispositivos moveis)
/* 441 */ 		menu.click(function(evt){
/* 442 */ 			clearTimeout(timeout);
/* 443 */ 			layerUp();
/* 444 */ 			_expand();
/* 445 */ 		});
/* 446 */ 		
/* 447 */ 		//interrompendo abertura do menu quando algum link for clicado
/* 448 */ 		menu_links.click(function(evt){
/* 449 */ 			clearTimeout(timeout);
/* 450 */ 			timeout = null;

/* menu.js */

/* 451 */ 			$("#menu_modal a.selected").removeClass("selected"); //retira item selecionado no menu
/* 452 */ 			_collapse();
/* 453 */ 		});
/* 454 */ 		
/* 455 */ 		//recolhe o menu se o alvo for algum elemento fora do menu_wrapper
/* 456 */ 		closer_els.mouseover(function(){
/* 457 */ 			clearTimeout(timeout);
/* 458 */ 			timeout = null;
/* 459 */ 			layerDown();
/* 460 */ 			_collapse();
/* 461 */ 		});
/* 462 */ 		
/* 463 */ 		//trigger do modal
/* 464 */ 		modal_trigger.click(function(evt){
/* 465 */ 			menu.data("overall", true); //forçando o menu a ficar por cima de qualquer janela
/* 466 */ 			clearInterval(timeout);
/* 467 */ 			timeout = null;
/* 468 */ 			_collapse(evt);
/* 469 */ 		});
/* 470 */ 	}
/* 471 */ 	
/* 472 */ 	
/* 473 */ 	/** 
/* 474 *| 	 * Navegação por teclado no menu
/* 475 *| 	 * ***************************/
/* 476 */ 	var menu_link_itens 		= $("#menu_modal a.item:visible");
/* 477 */ 	var selected_index			= 0;
/* 478 */ 	
/* 479 */ 	var submenu_link_itens		= [];
/* 480 */ 	var submenu_selected_index	= false;
/* 481 */ 	
/* 482 */ 	/* Realiza o Scroll para mostrar o elemento */
/* 483 */ 	function menu_update_scroll(ontop){
/* 484 */ 		ontop 				= (ontop===true);
/* 485 */ 		var el				= menu_link_itens.eq(selected_index);
/* 486 */ 		var position 		= el.parent().position().top;
/* 487 */ 		var elHeight		= el.height();
/* 488 */ 		
/* 489 */ 		var scroll			= $("#menu_modal_scroll");
/* 490 */ 		var divHeight 		= scroll.height();
/* 491 */ 		var divScroll 		= scroll.scrollTop();
/* 492 */ 		
/* 493 */ 		//coloca item no topo caso ontop seja true
/* 494 */ 		if(ontop){
/* 495 */ 			scroll.scrollTop(Math.floor(position));
/* 496 */ 			return;
/* 497 */ 		}
/* 498 */ 		
/* 499 */ 		//se a posicao do elemento for maior que a altura do Div, aumenta o scroll em posicao + altura do elemento - altura da div
/* 500 */ 		if(Math.ceil(position + elHeight) > Math.floor(divScroll + divHeight)){

/* menu.js */

/* 501 */ 			scroll.scrollTop(Math.ceil(position + elHeight - divHeight));
/* 502 */ 		}
/* 503 */ 		//se a posicao for menor, coloca o elemento no topo
/* 504 */ 		else if(Math.floor(position) < Math.ceil(divScroll)){
/* 505 */ 			scroll.scrollTop(Math.floor(position));
/* 506 */ 		}
/* 507 */ 	}
/* 508 */ 	
/* 509 */ 	
/* 510 */ 	/* Atualiza o elemento selecionado para o primeiro da lista */
/* 511 */ 	function menu_update_selected(keep_last){
/* 512 */ 		//verificando parametro
/* 513 */ 		keep_last = (keep_last===true);
/* 514 */ 		
/* 515 */ 		//atualizando lista de elementos
/* 516 */ 		menu_link_itens 	= $("#menu_modal a.item:visible");
/* 517 */ 		selected_index 		= menu_find_current_selected();
/* 518 */ 		
/* 519 */ 		if(!keep_last || selected_index==0){ //mantém ultima selecao
/* 520 */ 			$("#menu_modal a.selected").removeClass("selected");
/* 521 */ 			$("#menu_modal a.item:visible:first").addClass("selected");
/* 522 */ 			$("#menu_modal_scroll").scrollTop(0);
/* 523 */ 		}else{
/* 524 */ 			//Da um scroll com gap de 150px pra cima para ficar mais visivel quando menu for aberto sem filtro com a ultima opcao selecionada
/* 525 */ 			menu_update_scroll(true); 
/* 526 */ 		}
/* 527 */ 	}
/* 528 */ 	
/* 529 */ 	
/* 530 */ 	/* Encontra o indice do item selecionado atualmente*/
/* 531 */ 	function menu_find_current_selected(){
/* 532 */ 		for(i=0; i<menu_link_itens.length; i++){
/* 533 */ 			if(menu_link_itens.eq(i).is(".selected")){
/* 534 */ 				return i;
/* 535 */ 			}
/* 536 */ 		}
/* 537 */ 		return 0;
/* 538 */ 	}
/* 539 */ 	
/* 540 */ 	
/* 541 */ 	/* Seleciona Item clicado */
/* 542 */ 	function menu_select_item(item){
/* 543 */ 		$("#menu_modal a.selected").removeClass("selected");
/* 544 */ 		item.addClass("selected");
/* 545 */ 	}
/* 546 */ 
/* 547 */ 	
/* 548 */ 	/* SubMenu: Encontra o indice do item selecionado atualmente*/
/* 549 */ 	function submenu_find_current_selected(){
/* 550 */ 		var submenu_link_itens = $("#menu_sub > ul a.item:visible");

/* menu.js */

/* 551 */ 		for(i=0; i<submenu_link_itens.length; i++){
/* 552 */ 			if(submenu_link_itens.eq(i).is(".selected")){
/* 553 */ 				return i;
/* 554 */ 			}
/* 555 */ 		}
/* 556 */ 		return 0;
/* 557 */ 	}
/* 558 */ 	
/* 559 */ 	/* SubMenu: Seleciona Item clicado */
/* 560 */ 	function submenu_select_item(item){
/* 561 */ 		$("#menu_sub > ul a.selected").removeClass("selected");
/* 562 */ 		item.addClass("selected");
/* 563 */ 	}
/* 564 */ 	
/* 565 */ 
/* 566 */ 	/* Submenu : ao abrir */
/* 567 */ 	function subopen(){
/* 568 */ 		submenu_link_itens		= $("#menu_sub a.item:visible");
/* 569 */ 		submenu_selected_index 	= 0;
/* 570 */ 		submenu_link_itens.eq(submenu_selected_index).addClass("selected");
/* 571 */ 	}
/* 572 */ 	
/* 573 */ 	/* Submenu : ao fechar */
/* 574 */ 	function subclose(){
/* 575 */ 		$("#menu_sub > ul a.selected").removeClass("selected");
/* 576 */ 		submenu_selected_index = false;
/* 577 */ 	}
/* 578 */ 	
/* 579 */ 	/* Trata eventos de teclado */
/* 580 */ 	function menu_key_action(evt){
/* 581 */ 		
/* 582 */ 		//encontra o elemento atualmente selecionado
/* 583 */ 		selected_index 		= menu_find_current_selected();
/* 584 */ 		
/* 585 */ 		var key 			= evt.which;
/* 586 */ 		var current			= menu_link_itens.eq(selected_index);
/* 587 */ 		var submenu_current = (submenu_selected_index !== false) ?submenu_link_itens.eq(submenu_selected_index) : null;
/* 588 */ 		var all_selected	= $("#menu_modal a.selected");
/* 589 */ 		var target			= $(evt.target);
/* 590 */ 		
/* 591 */ 		switch (key) {
/* 592 */ 		
/* 593 */ 		case 38:	//SETA CIMA
/* 594 */ 			evt.preventDefault();
/* 595 */ 			evt.stopPropagation();
/* 596 */ 			
/* 597 */ 			//está no submenu
/* 598 */ 			if(submenu_selected_index !== false){
/* 599 */ 				submenu_current.removeClass("selected");								//deseleciona todos os selected
/* 600 */ 				submenu_selected_index = (submenu_selected_index == 0) ? submenu_link_itens.length-1 : submenu_selected_index-1;

/* menu.js */

/* 601 */ 				submenu_link_itens.eq(submenu_selected_index).addClass("selected");		//seleciona o subitem anterior
/* 602 */ 			}
/* 603 */ 			
/* 604 */ 			//seleciona o item anterior se existir na lista
/* 605 */ 			else{
/* 606 */ 				current.removeClass("selected"); 									//deseleciona todos os selected
/* 607 */ 				selected_index = (selected_index == 0) ? menu_link_itens.length-1 : selected_index-1; 
/* 608 */ 				menu_link_itens.eq(selected_index).addClass("selected");			//seleciona o anterior
/* 609 */ 				
/* 610 */ 				//rola a tela caso o item esteja fora dela
/* 611 */ 				menu_update_scroll();
/* 612 */ 			}
/* 613 */ 			
/* 614 */ 			break;
/* 615 */ 			
/* 616 */ 		case 40:	//SETA BAIXO
/* 617 */ 			evt.preventDefault();
/* 618 */ 			evt.stopPropagation();
/* 619 */ 			
/* 620 */ 			//está no submenu
/* 621 */ 			if(submenu_selected_index !== false && submenu_current != null){
/* 622 */ 				submenu_current.removeClass("selected");									//deseleciona todos os selected
/* 623 */ 				submenu_selected_index = (submenu_selected_index == submenu_link_itens.length-1) ? 0 : submenu_selected_index+1;
/* 624 */ 				submenu_link_itens.eq(submenu_selected_index).addClass("selected");			//seleciona o proximo subitem	
/* 625 */ 			}
/* 626 */ 			
/* 627 */ 			//seleciona o proximo item se existir na lista
/* 628 */ 			else{ 
/* 629 */ 				current.removeClass("selected");									//deseleciona todos os selected
/* 630 */ 				selected_index = (selected_index == menu_link_itens.length-1) ? 0 : selected_index + 1;
/* 631 */ 				menu_link_itens.eq(selected_index).addClass("selected");			//seleciona o proximo item
/* 632 */ 				
/* 633 */ 				//rola a tela caso o item esteja fora dela
/* 634 */ 				menu_update_scroll();
/* 635 */ 			}
/* 636 */ 			break;
/* 637 */ 			
/* 638 */ 		case 39:	//SETA DIREITA
/* 639 */ 			
/* 640 */ 			//verifica se possui submenu
/* 641 */ 			if(current.attr("item_group") == "true"){
/* 642 */ 				
/* 643 */ 				//se o menu não estiver aberto, bloqueia navegação padrão
/* 644 */ 				if(submenu_selected_index === false){
/* 645 */ 					evt.preventDefault();
/* 646 */ 					evt.stopPropagation();
/* 647 */ 				}
/* 648 */ 				
/* 649 */ 				//abre o submenu
/* 650 */ 				current.next().click();

/* menu.js */

/* 651 */ 			}
/* 652 */ 			
/* 653 */ 			break;
/* 654 */ 			
/* 655 */ 		case 37:	//SETA ESQUERDA
/* 656 */ 			
/* 657 */ 			//verifica se o item selecionado atualmente está no submenu
/* 658 */ 			if(submenu_selected_index !== false){
/* 659 */ 				
/* 660 */ 				evt.preventDefault();
/* 661 */ 				evt.stopPropagation();
/* 662 */ 				
/* 663 */ 				//caso submenu esteja aberto, clica em fechar o submenu
/* 664 */ 				$("#menu_sub_wrapper .submenu_hide").click();
/* 665 */ 			}
/* 666 */ 			break;
/* 667 */ 			
/* 668 */ 		case 9:		//TAB 
/* 669 */ 			evt.preventDefault();
/* 670 */ 			evt.stopPropagation();
/* 671 */ 			break;
/* 672 */ 			
/* 673 */ 		case 13: 	//ENTER
/* 674 */ 			evt.preventDefault();
/* 675 */ 			evt.stopPropagation();
/* 676 */ 			
/* 677 */ 			if(submenu_selected_index !== false){
/* 678 */ 				 if(submenu_current.length == 1){
/* 679 */ 					//mootools
/* 680 */ 					$$(submenu_current.get())[0].fireEvent("click", new Event(evt));
/* 681 */ 					//jquery
/* 682 */ 					submenu_current.click();
/* 683 */ 				 }
/* 684 */ 			}
/* 685 */ 			//se há algum item selecionado, clica nele
/* 686 */ 			else if(current.length == 1){
/* 687 */ 				//mootools
/* 688 */ 				$$(current.get())[0].fireEvent("click", new Event(evt));
/* 689 */ 				//jquery
/* 690 */ 				current.click();
/* 691 */ 			}
/* 692 */ 			break;
/* 693 */ 			
/* 694 */ 		case 27: 	//ESC
/* 695 */ 			evt.preventDefault();
/* 696 */ 			evt.stopPropagation();
/* 697 */ 			$("#menu").trigger("hide");
/* 698 */ 			break;
/* 699 */ 		
/* 700 */ 		//Retorna dizendo que nao houve alterações na seleção

/* menu.js */

/* 701 */ 		default:
/* 702 */ 			if(key==8 || key==46 || (key >= 48 && key <= 90) || (key >= 96 && key <= 111) || (key >= 186 && key <= 222)){
/* 703 */ 				return false;
/* 704 */ 			}
/* 705 */ 			break;
/* 706 */ 		}
/* 707 */ 		
/* 708 */ 		//houve alguma alteração na seleção
/* 709 */ 		return true;
/* 710 */ 	}
/* 711 */ 	
/* 712 */ 	/** 
/* 713 *| 	 * Pesquisa no menu 
/* 714 *| 	 * ***************************/
/* 715 */ 	function menu_filtro(){
/* 716 */ 		var lista		= $("#menu_modal li.item");
/* 717 */ 		var lista_nomes	= $("#menu_modal li.item .label");
/* 718 */ 		var lista_cats	= $("#menu_modal li.categoria a.returnFalse");
/* 719 */ 		var num_cats 	= lista_cats.length;
/* 720 */ 		var filtro 		= $("#filtro input");
/* 721 */ 		var placeholder	= filtro.attr('placeholder');
/* 722 */ 		var bg 			= $("#menu_wrapper_bg");
/* 723 */ 		var subhide		= $("#menu_sub_wrapper").find(".submenu_hide");
/* 724 */ 		
/* 725 */ 		//Tratando Teclas
/* 726 */ 		filtro.keydown(function(evt){
/* 727 */ 			
/* 728 */ 			//executa rotina de navegação e tratamento de teclas
/* 729 */ 			filtro.data('sel_changed', menu_key_action(evt));
/* 730 */ 			
/* 731 */ 			//se classe vazia, limpa o campo
/* 732 */ 			if(!filtro.data('sel_changed') && filtro.is(".vazio")){
/* 733 */ 				filtro.removeClass("vazio");
/* 734 */ 				filtro.val("");
/* 735 */ 			}
/* 736 */ 			
/* 737 */ 			//esconde o submenu, caso esteja aberto
/* 738 */ 			if(!filtro.data('sel_changed') && submenu_selected_index!==false){
/* 739 */ 				subhide.click();
/* 740 */ 			}
/* 741 */ 			
/* 742 */ 		});
/* 743 */ 		
/* 744 */ 		//executando filtro ao teclar
/* 745 */ 		filtro.keyup(function(evt){
/* 746 */ 			var $this 	= $(this);
/* 747 */ 			var val 	= $this.val().toLowerCase();
/* 748 */ 			
/* 749 */ 			//verifica se foi digitado algo
/* 750 */ 			if(filtro.is(".vazio")) return;

/* menu.js */

/* 751 */ 			
/* 752 */ 			//itens
/* 753 */ 			lista.each(function(i, el){
/* 754 */ 				var $el 	= $(el); 
/* 755 */ 				var nome 	= lista_nomes.eq(i).text().toLowerCase();
/* 756 */ 				var keys 	= $el.attr("meta").toLowerCase();
/* 757 */ 				var regexp	= new RegExp("(?="+val+")", "g");
/* 758 */ 				
/* 759 */ 				//Se está fora da seleção, esconde
/* 760 */ 				if(val!="" && !regexp.test(nome) && !regexp.test(keys)){
/* 761 */ 					$el.hide();
/* 762 */ 				}else{
/* 763 */ 					$el.show();
/* 764 */ 				}
/* 765 */ 			});
/* 766 */ 			
/* 767 */ 			//categorias
/* 768 */ 			lista_cats.each(function(i, el){
/* 769 */ 				var $el = lista_cats.eq(num_cats-i-1);
/* 770 */ 				
/* 771 */ 				if($el.parent().find("ul:first > li > a.item:visible").length == 0){
/* 772 */ 					$el.hide();
/* 773 */ 				}else{
/* 774 */ 					$el.show();
/* 775 */ 				}
/* 776 */ 			});
/* 777 */ 			
/* 778 */ 			//atualiza o selecionado, caso nao tenha havido apenas uma troca de seleção
/* 779 */ 			if(!filtro.data('sel_changed')){
/* 780 */ 				menu_update_selected();
/* 781 */ 			}
/* 782 */ 			
/* 783 */ 			//colocando classe inativa
/* 784 */ 			if(filtro.val()==""){
/* 785 */ 				filtro.addClass("vazio");
/* 786 */ 				filtro.val(placeholder);
/* 787 */ 			}
/* 788 */ 		});
/* 789 */ 		
/* 790 */ 		//reseta o filtro
/* 791 */ 		filtro.bind("reset", function(){
/* 792 */ 			lista.show();
/* 793 */ 			lista_cats.show();
/* 794 */ 			filtro.val(filtro.attr('placeholder'));
/* 795 */ 			filtro.addClass("vazio");
/* 796 */ 			//$("#menu_modal a.selected").removeClass("selected");
/* 797 */ 		});
/* 798 */ 		
/* 799 */ 		//retirando classe inativa
/* 800 */ 		filtro.blur(function(){

/* menu.js */

/* 801 */ 			if(filtro.val()==""){
/* 802 */ 				filtro.addClass("vazio");
/* 803 */ 				filtro.val(placeholder);
/* 804 */ 			}
/* 805 */ 		});
/* 806 */ 		
/* 807 */ 		//inserindo evento de clique para atualizar elemento selecionado
/* 808 */ 		$("#menu_modal a.item").click(function(evt){
/* 809 */ 			menu_select_item($(this));
/* 810 */ 		});
/* 811 */ 		
/* 812 */ 		//voltando foco para filtro
/* 813 */ 		$("#menu_modal_wrapper, #menu_modal_scroll, #menu_modal, #menu_sub_modal_scroll, #menu_sub,.returnFalse, .submenu_hide").click(function(){
/* 814 */ 			$("#filtro input").focus();
/* 815 */ 		});
/* 816 */ 	}
/* 817 */ 
/* 818 */ 
/* 819 */ 	
/* 820 */ 	/** 
/* 821 *| 	 * Integração entre eventos de teclado e mouse no menu 
/* 822 *| 	 * ***************************/
/* 823 */ 	function acoesMenu(){
/* 824 */ 		var timer;
/* 825 */ 		var itens 		= $("#menu_modal a.item, #menu_modal .submenu_link");
/* 826 */ 		var container 	= $("#menu_modal_wrapper");
/* 827 */ 		var sub_wrapper	= $("#menu_sub_wrapper");
/* 828 */ 		var subhide		= sub_wrapper.find(".submenu_hide");
/* 829 */ 		
/* 830 */ 		//ao deixar o mouse sobre um elemento do menu por X segundos, coloca o foco no item
/* 831 */ 		itens.mouseenter(function(evt){
/* 832 */ 			var item 	= $(this).parent().find('a');
/* 833 */ 			var sublink = $(this).parent().find('.submenu_link');
/* 834 */ 			
/* 835 */ 		    timer = setTimeout(function(){
/* 836 */ 		    	menu_select_item(item);
/* 837 */ 		    	
/* 838 */ 		    	if(sublink.length > 0){
/* 839 */ 		    		sublink.click();
/* 840 */ 		    	}else{
/* 841 */ 		    		//Esconde Submenu
/* 842 */ 		    		subhide.click();
/* 843 */ 		    	}
/* 844 */ 		    	
/* 845 */ 		    }, 1000);
/* 846 */ 		}).mouseleave(function(){
/* 847 */ 		    clearTimeout(timer);
/* 848 */ 		});
/* 849 */ 		
/* 850 */ 		container.find(".submenu_link").click(function(evt){

/* menu.js */

/* 851 */ 			menu_select_item($(this).prev("a"));
/* 852 */ 		});
/* 853 */ 		
/* 854 */ 		//ao abrir o submenu pelo mouse click, coloca o foco de teclado no submenu, sem item selecionado 
/* 855 */ 		//adiciona evento ao abrir o submenu
/* 856 */ 		$("#menu_modal_wrapper").bind('submenu_loaded.subopen', subopen);
/* 857 */ 		
/* 858 */ 		//adiciona evento ao fechar o submenu
/* 859 */ 		$("#menu_modal_wrapper").bind('submenu_closed.subclose', subclose);
/* 860 */ 	}
/* 861 */ 	
/* 862 */ 	
/* 863 */ 	
/* 864 */ 	/** 
/* 865 *| 	 * Inicio
/* 866 *| 	 * ***************************/
/* 867 */ 	$(document).ready(function(){
/* 868 */ 		//modais
/* 869 */ 		menuModal();
/* 870 */ 		
/* 871 */ 		//menus topo
/* 872 */ 		menusTopo();
/* 873 */ 		
/* 874 */ 		//expandindo o menu com os nomes
/* 875 */ 		expandeMenu();
/* 876 */ 		
/* 877 */ 		//Filtragem do menu
/* 878 */ 		menu_filtro();
/* 879 */ 		
/* 880 */ 		//Integração de ações de teclado e mouse
/* 881 */ 		acoesMenu();
/* 882 */ 		
/* 883 */ 		//Fecha os avisos do sistema
/* 884 */ 		fechaAvisos();
/* 885 */ 		
/* 886 */ 		//tooltips
/* 887 */ 		//menuToolTips();
/* 888 */ 	});
/* 889 */ 	
/* 890 */ 	
/* 891 */ 	
/* 892 */ })(jQuery);
