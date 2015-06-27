
/* forms.js */

/* 1    */ /**
/* 2    *|  * Mecanismo de Validação e mascara em formularios
/* 3    *|  * 
/* 4    *|  * Necessário: meiomask.js
/* 5    *|  */
/* 6    */ //removendo possiveis conflitos entre mootools e jquery
/* 7    */ jQuery.noConflict();
/* 8    */ 
/* 9    */ //retirando url base do cabeçalho
/* 10   */ var BASE_URL = jQuery("meta[name=base_url]").attr("content");
/* 11   */ 
/* 12   */ //metodo generico de foco
/* 13   */ function makeFocus(){
/* 14   */ 	var $form = jQuery(document.getElementById("form"));
/* 15   */ 	var el = $form.find(".focus:enabled:visible").first();
/* 16   */ 	if(el.length == 0 && $form.length){
/* 17   */ 		// Verifica se existe tab ativa, evitando busca em tabs inativas
/* 18   */ 		var tab_ativa = $form.get(0).getElementsByClassName('tab_ativa')[0];
/* 19   */ 		// Recupera todos os selects e inputs (que se encaixarem na busca)
/* 20   */ 		var elemento_pai = tab_ativa ? tab_ativa : $form.get(0);
/* 21   */ 		var el = jQuery(elemento_pai.querySelectorAll('select:not([disabled]):not([readonly]),input:not([disabled]):not([type=hidden]):not([type=checkbox]):not(.disabled):not([readonly]):not([type=button]):not([type=submit])')).filter(':visible').first();
/* 22   */ 	}
/* 23   */ 	// Somente joga o foco se existe UM elemento a ser utilizado
/* 24   */ 	if (el.length == 1)
/* 25   */ 		el.focus();
/* 26   */ 	if (jQuery.fn.livequery){
/* 27   */ 		jQuery('[readonly],[readonly=""]').livequery(function(evt){
/* 28   */ 			jQuery(this).attr('tabindex','-1');
/* 29   */ 		}).livequery('mousedown',function (evt){
/* 30   */ 			if (!jQuery(this).attr('readonly')) return;
/* 31   */ 			evt.preventDefault();
/* 32   */ 			evt.stopPropagation();
/* 33   */ 			jQuery(this).blur();
/* 34   */ 		}).livequery('keydown',function (evt){
/* 35   */ 			if (!jQuery(this).attr('readonly')) return;
/* 36   */ 			evt.preventDefault();
/* 37   */ 			evt.stopPropagation();
/* 38   */ 			jQuery(this).blur();
/* 39   */ 		}).livequery('focus',function (evt){
/* 40   */ 			if (!jQuery(this).attr('readonly')) return;
/* 41   */ 			evt.preventDefault();
/* 42   */ 			evt.stopPropagation();
/* 43   */ 			jQuery(this).blur();
/* 44   */ 		});
/* 45   */ 		jQuery('input:not([readonly])').livequery(function(evt){
/* 46   */ 			jQuery(this).removeAttr('tabindex');
/* 47   */ 		});
/* 48   */ 	}
/* 49   */ }
/* 50   */ 

/* forms.js */

/* 51   */ //oculta ou exibe "carregando"
/* 52   */ var toggleLoading = function(show, loading){
/* 53   */ 	var l = jQuery("#loader");
/* 54   */ 	if(show){
/* 55   */ 		//Verifica se deve mostrar o "carregando" ao inves do "enviando"
/* 56   */ 		if(loading==true){ //pode ser undefined
/* 57   */ 			l.find(".enviando").hide();
/* 58   */ 			l.find(".carregando").show();
/* 59   */ 		}else{
/* 60   */ 			l.find(".carregando").hide();
/* 61   */ 			l.find(".enviando").show();
/* 62   */ 		}
/* 63   */ 		l.show();
/* 64   */ 	} else {
/* 65   */ 		l.find(".carregando").show();
/* 66   */ 		l.find(".enviando").hide();
/* 67   */ 		l.find("span").toggle();
/* 68   */ 		l.hide();
/* 69   */ 	}
/* 70   */ };
/* 71   */ 
/* 72   */ 
/* 73   */ (function($) {
/* 74   */ 	
/* 75   */ 	/* DOCUMENT READY ****************************/
/* 76   */ 	$(document).ready(function(){
/* 77   */ 		initForms();
/* 78   */ 		
/* 79   */ 		/*if(parent.MochaUI){
/* 80   *| 			parent.MochaUI.information("<b style='font-size:14px'>Primeira vez nesta página?</b><br/><a>Aprenda a utilizar esta função</a> | <a>Não mostrar esta janela</a>");
/* 81   *| 		}*/
/* 82   */ 		
/* 83   */ 	}); 
/* 84   */ 	
/* 85   */ 	
/* 86   */ 	/* INICIALIZADORA ****************************/
/* 87   */ 	var initForms = function(){
/* 88   */ 		// Iniciando mecanismo de clonagem de campos
/* 89   */ 		cloneFields();
/* 90   */ 		// Inserindo mascaras em valores
/* 91   */ 		makeMasks();
/* 92   */ 		// Iniciando validação do formulario
/* 93   */ 		makeValidations();
/* 94   */ 		// Inicializando tooltips
/* 95   */ 		tip();
/* 96   */ 		// Previne que o enter sumbeta o formulario
/* 97   */ 		preventKeys();
/* 98   */ 		// Verificando valores de radios e selects
/* 99   */ 		makeSelects();
/* 100  */ 		//coloca campos do tipo select como readonly

/* forms.js */

/* 101  */ 		makeReadOnlyInputs();
/* 102  */ 		// Inicializando valores de checkboxes
/* 103  */ 		makeChecks();
/* 104  */ 		// Inicializando campos de upload de imagem
/* 105  */ 		makeImageUploads();
/* 106  */ 		// Criando Abas
/* 107  */ 		makeTabs();
/* 108  */ 		// Estilizando Tabelas
/* 109  */ 		mountTables();
/* 110  */ 		// Inicializando date picker
/* 111  */ 		makeDatePicker();
/* 112  */ 		// Inicializando Wysiwyg
/* 113  */ 		makeWysiwyg();
/* 114  */ 		// Inicializando Color Picker
/* 115  */ 		makeColorPicker();
/* 116  */ 		// focus
/* 117  */ 		setTimeout(makeFocus,100); // 100 milisegundos após "carregar" a página para que outros javascripts possam mexer no disabled/readonly/visibilidade dos campos antes de dar foco
/* 118  */ 		// Action Buttons
/* 119  */ 		buildActionButtons();
/* 120  */ 		// Actions Menu
/* 121  */ 		buildActionMenu();
/* 122  */ 	};
/* 123  */ 	
/* 124  */ 	/*PREVINE TECLAS GENÉRICAS ****************************/
/* 125  */ 	function preventKeys(){
/* 126  */ 		//Tratando F5 e Backspace no documento
/* 127  */ 		$(document).keydown(function(evt){
/* 128  */ 			var target 	= $(evt.target);
/* 129  */ 			var key 	= evt.keyCode; 
/* 130  */ 			
/* 131  */ 			//Se F5 ou Backspace fora de um input
/* 132  */ 			if(!evt.shiftKey && !evt.ctrlKey && !evt.altKey){
/* 133  */ 				//116 - F5
/* 134  */ 				//8 - Backspace
/* 135  */ 				if((!target.is("input, textarea, select") && key==8) || key==116){
/* 136  */ 					evt.preventDefault();
/* 137  */ 					evt.stopPropagation();
/* 138  */ 				}
/* 139  */ 			}
/* 140  */ 		});
/* 141  */ 		
/* 142  */ 		//Tratando ENTER em formulários
/* 143  */ 		$("#form").not(".login").keydown(function(evt){
/* 144  */ 			var target 	= $(evt.target);
/* 145  */ 			var key 	= evt.keyCode; 
/* 146  */ 			//se enter
/* 147  */ 			if(key==13 && target.attr("type")!="button" && target.attr("type")!="submit" && target.attr("type")!="textarea"){
/* 148  */ 				evt.preventDefault();
/* 149  */ 				evt.stopPropagation();
/* 150  */ 			}

/* forms.js */

/* 151  */ 			
/* 152  */ 		});
/* 153  */ 	}
/* 154  */ 	
/* 155  */ 	/*SELECTS e RADIOS****************************/
/* 156  */ 	function makeSelects(){
/* 157  */ 		
/* 158  */ 		$("[eval]").each(function(x, obj){
/* 159  */ 			el = $(obj);
/* 160  */ 			var sel = "checked"; //recupera valor possivelmente multiplo
/* 161  */ 			var val = el.attr("eval").split(",");
/* 162  */ 			var t = el.attr('type');
/* 163  */ 			t = (t!=undefined) ? t : el[0].type;
/* 164  */ 			
/* 165  */ 			//radio	
/* 166  */ 			if(t == 'radio'){
/* 167  */ 				//para cada valor encontrado, verifica se e igual ao valor do campo
/* 168  */ 				for(var i=0; i<val.length; i++){ 
/* 169  */ 					if(val[i]==el.val()){
/* 170  */ 						el.attr(sel, sel);
/* 171  */ 						return;
/* 172  */ 					}
/* 173  */ 				}
/* 174  */ 			//select(option)
/* 175  */ 			}else if(t=='select-one' || t=='select-multiple'){
/* 176  */ 				sel = "selected";
/* 177  */ 				//percorre todos os options em busca dos valores a serem selecionados
/* 178  */ 				el.find("option").each(function(j, opt){
/* 179  */ 					$opt = $(opt);
/* 180  */ 					for (var i=0; i<val.length; i++) {
/* 181  */ 						if(val[i]==$opt.val()){
/* 182  */ 							opt.selected=true;
/* 183  */ 							break;
/* 184  */ 						}
/* 185  */ 					}
/* 186  */ 				});
/* 187  */ 				
/* 188  */ 			//nenhuma delas, sai
/* 189  */ 			}else{
/* 190  */ 				return;
/* 191  */ 			}
/* 192  */ 		});
/* 193  */ 		//adicionando sexyCombo
/* 194  */ 		//if ($.fn.sexyCombo) { $("select").sexyCombo(); }
/* 195  */ 	}
/* 196  */ 	
/* 197  */ 	/*SELECTS READONLY****************************/
/* 198  */ 	function makeReadOnlyInputs(){
/* 199  */ 		
/* 200  */ 		//Readonly em selects

/* forms.js */

/* 201  */ 		if($.fn.setReadonly){
/* 202  */ 			$("select[readonly]").setReadonly();
/* 203  */ 		}
/* 204  */ 		
/* 205  */ 		//Readonly em radios
/* 206  */ 		$("input[type=radio][readonly]").live('click', function(evt){
/* 207  */ 			evt.preventDefault();
/* 208  */ 			return false;
/* 209  */ 		});
/* 210  */ 	}
/* 211  */ 		
/* 212  */ 	
/* 213  */ 	/* Seleciona os checkboxes */
/* 214  */ 	function makeChecks(){
/* 215  */ 		$("input[type=checkbox][rel]").each(function (i,el){
/* 216  */ 			el 			= $(el);
/* 217  */ 			var parent 	= el.parents('.checkbox_group'); //procura por um pai (check dentro de um grupo)
/* 218  */ 			var val 	= el.attr('rel');
/* 219  */ 			//Elemento dentro de um grupo
/* 220  */ 			if(parent.length > 0) {
/* 221  */ 				var values = parent.attr('rel');
/* 222  */ 				el.attr('checked', (values[val] == 1));
/* 223  */ 			}
/* 224  */ 			//Elemento Sozinho
/* 225  */ 			else{
/* 226  */ 				el.attr('checked', (el.val() == val));
/* 227  */ 			}
/* 228  */ 		});
/* 229  */ 	}
/* 230  */ 	
/* 231  */ 	/*IMAGE UPLOAD****************************/
/* 232  */ 	function makeImageUploads(){
/* 233  */ 		if($.fn.preimage){
/* 234  */ 			$(".image_upload_field input[type=file]").preimage();
/* 235  */ 		}
/* 236  */ 	}
/* 237  */ 	
/* 238  */ 	
/* 239  */ 	/*ACTION BUTTONS****************************/
/* 240  */ 	function buildActionButtons(){
/* 241  */ 		$('input[type="button"][window_target],input[type="button"][modal_target]').click(function(el){
/* 242  */ 			var url = '';
/* 243  */ 			var title = $(this).attr('_title');
/* 244  */ 			// Window
/* 245  */ 			if ($(this).attr('window_target')) {
/* 246  */ 				url = $(this).attr('window_target');
/* 247  */ 				parent.MochaUI.openWindow({
/* 248  */ 					id: 			url,
/* 249  */ 					title: 			title,
/* 250  */ 					contentURL: 	url

/* forms.js */

/* 251  */ 				});
/* 252  */ 			}
/* 253  */ 			// Modal
/* 254  */ 			else {
/* 255  */ 				url = $(this).attr('modal_target');
/* 256  */ 				parent.MochaUI.openModal({
/* 257  */ 					id: 			url,
/* 258  */ 					title: 			title,
/* 259  */ 					contentURL: 	url
/* 260  */ 				});
/* 261  */ 			}
/* 262  */ 		});
/* 263  */ 	}
/* 264  */ 
/* 265  */ 	/*ACTION MENU****************************/
/* 266  */ 	function buildActionMenu(){
/* 267  */ 		
/* 268  */ 		//mostra o menu a partir do clique
/* 269  */ 		$(".action_menu_trigger").click(function(evt){
/* 270  */ 			var $this 		= $(this);
/* 271  */ 			var wasVisible 	= $this.data('clicked');
/* 272  */ 			
/* 273  */ 			$(".action_menu_trigger").removeData('clicked');
/* 274  */ 			$(".action_menu_trigger").removeClass("clicked");
/* 275  */ 			$(".action_menu").removeClass('visible');
/* 276  */ 			
/* 277  */ 			if(!wasVisible){
/* 278  */ 				$this.next(".action_menu").addClass('visible');
/* 279  */ 				$this.addClass("clicked");
/* 280  */ 			}
/* 281  */ 		});
/* 282  */ 		
/* 283  */ 		//esconde o menu
/* 284  */ 		$(document).mouseup(function(e) {
/* 285  */ 			var target = $(e.target); 
/* 286  */ 			
/* 287  */ 			//controle de cliques
/* 288  */ 			if(target.is(".action_menu_trigger") && target.hasClass('clicked')) {
/* 289  */ 				$(".action_menu_trigger").data('clicked', true);
/* 290  */ 			}
/* 291  */ 			
/* 292  */ 			//esconde o menu
/* 293  */ 			if(!target.is(".action_menu")) {
/* 294  */ 				$(".action_menu_trigger").removeClass("clicked");
/* 295  */ 				$(".action_menu").removeClass('visible');
/* 296  */ 			}
/* 297  */ 		});
/* 298  */ 	}
/* 299  */ 	
/* 300  */ 	/*TOOLTIP****************************/

/* forms.js */

/* 301  */ 	var tip = function(){
/* 302  */ 		if ($.fn.bt) {
/* 303  */ 			
/* 304  */ 			//Traduz o titulo para aplicar estilos e tags
/* 305  */ 			function translate(el){
/* 306  */ 				$(el).attr("title", $(el).attr("title").replace(/_/g, "").replace(/\\n/g, "<br/>").replace(/\\r\\n/g, "<br />"));
/* 307  */ 			}
/* 308  */ 			
/* 309  */ 			function showTip(box){
/* 310  */ 				$(box).fadeIn(300);
/* 311  */ 			}
/* 312  */ 			function hideTip(box, callback){
/* 313  */ 				$(box).hide();
/* 314  */ 			}
/* 315  */ 			
/* 316  */ 			//Opcoes Padrao
/* 317  */ 			$.bt.defaults.closeWhenOthersOpen 	= true;
/* 318  */ 			$.bt.options.padding				= 8;
/* 319  */ 			$.bt.options.spikeLength			= 10;
/* 320  */ 			$.bt.options.spikeGirth				= 10;
/* 321  */ 			$.bt.options.cornerRadius			= 1;
/* 322  */ 			$.bt.options.showTip				= showTip; 
/* 323  */ 			$.bt.options.hideTip				= hideTip;
/* 324  */ 			
/* 325  */ 			$(".tooltip").live('mouseover', function(evt){
/* 326  */ 				$this = $(evt.target);
/* 327  */ 				if(!$this.data("bt")){
/* 328  */ 					$this.data("bt", "true");
/* 329  */ 					translate($this);
/* 330  */ 					
/* 331  */ 					var $parent_p = $this.parents('p:first');
/* 332  */ 					
/* 333  */ 					var triggers = ['mouseover', 'mouseout'];
/* 334  */ 					if ($parent_p.hasClass('info-trigger-none') || $this.hasClass('info-trigger-none'))
/* 335  */ 						triggers = "none";
/* 336  */ 
/* 337  */ 					var positions = ['right', 'left', 'top', 'bottom'];
/* 338  */ 					if ($parent_p.hasClass('info-top') || $this.hasClass('info-top'))
/* 339  */ 						positions = [ 'top' ];
/* 340  */ 					else if ($parent_p.hasClass('info-right'))
/* 341  */ 						positions = [ 'right' ];
/* 342  */ 					else if ($parent_p.hasClass('info-bottom') || $this.hasClass('info-bottom'))
/* 343  */ 						positions = ['bottom' ];
/* 344  */ 					else if ($parent_p.hasClass('info-left') || $this.hasClass('info-left'))
/* 345  */ 						positions = [ 'left' ];
/* 346  */ 
/* 347  */ 					$this.bt({trigger: triggers, positions: positions, width: 400, shrinkToFit: true, fill: "#FBF7AA", strokeStyle: "#F9E98E", cssStyles: {color: "#A27D35"}, showTip: showTip, hideTip: hideTip });
/* 348  */ 					$this.btOn();
/* 349  */ 				}
/* 350  */ 			});

/* forms.js */

/* 351  */ 			$(".infotip").live('mouseover', function(evt){
/* 352  */ 				$this = $(evt.target);
/* 353  */ 				if(!$this.data("bt")){
/* 354  */ 					$this.data("bt", "true");
/* 355  */ 					translate($this);
/* 356  */ 					
/* 357  */ 					var $parent_p = $this.parents('p:first');
/* 358  */ 					
/* 359  */ 					var triggers = ['mouseover', 'mouseout'];
/* 360  */ 					if ($parent_p.hasClass('info-trigger-none') || $this.hasClass('info-trigger-none'))
/* 361  */ 						triggers = "none";
/* 362  */ 
/* 363  */ 					var positions = ['right', 'left', 'top', 'bottom'];
/* 364  */ 					if ($parent_p.hasClass('info-top'))
/* 365  */ 						positions = [ 'top' ];
/* 366  */ 					else if ($parent_p.hasClass('info-right'))
/* 367  */ 						positions = [ 'right' ];
/* 368  */ 					else if ($parent_p.hasClass('info-bottom') || $this.hasClass('info-bottom'))
/* 369  */ 						positions = ['bottom' ];
/* 370  */ 					else if ($parent_p.hasClass('info-left'))
/* 371  */ 						positions = [ 'left' ];
/* 372  */ 
/* 373  */ 					$this.bt({trigger: triggers, positions: positions, width: 400, shrinkToFit: true, fill: "#dee9f5", strokeStyle: "#afd0ee", cssStyles: {color: "#1F63A6"}, showTip: showTip, hideTip: hideTip });
/* 374  */ 					$this.btOn();
/* 375  */ 				}
/* 376  */ 			});
/* 377  */ 			
/* 378  */ 			$(".whitetip").live('mouseover', function(evt){
/* 379  */ 				$this = $(evt.target);
/* 380  */ 				if(!$this.data("bt")){
/* 381  */ 					$this.data("bt", "true");
/* 382  */ 					translate($this);
/* 383  */ 
/* 384  */ 					var $parent_p = $this.parents('p:first');
/* 385  */ 
/* 386  */ 					var triggers = ['mouseover', 'mouseout'];
/* 387  */ 					if ($parent_p.hasClass('info-trigger-none') || $this.hasClass('info-trigger-none'))
/* 388  */ 						triggers = "none";
/* 389  */ 					
/* 390  */ 					var positions = ['bottom', 'top'];
/* 391  */ 
/* 392  */ 					$this.bt({trigger: triggers, positions: positions, padding: 8, shrinkToFit: true, fill: "#FFF", strokeStyle: "#DDD", cssStyles: {color: "#666", 'font-size':'12px', 'text-align':'left'}, showTip: showTip, hideTip: hideTip });
/* 393  */ 					$this.btOn();
/* 394  */ 				}
/* 395  */ 			});
/* 396  */ 			
/* 397  */ 			$(".tabtip").live('mouseover', function(evt){
/* 398  */ 				$this = $(evt.target);
/* 399  */ 				if(!$this.data("bt")){
/* 400  */ 					$this.data("bt", "true");

/* forms.js */

/* 401  */ 					translate($this);
/* 402  */ 					
/* 403  */ 					var $parent_p = $this.parents('p:first');
/* 404  */ 					var positions = ['bottom', 'top'];
/* 405  */ 					
/* 406  */ 					$this.bt({trigger: ['mouseover', 'mouseout'], positions: positions, width: 400, shrinkToFit: true, fill: "#FFF", strokeStyle: "#DDD", cssStyles: {color: "#666", 'font-size':'12px', 'text-align':'left'}, showTip: showTip, hideTip: hideTip });
/* 407  */ 					$this.btOn();
/* 408  */ 				}
/* 409  */ 			});
/* 410  */ 			
/* 411  */ 			$(".blacktip").live('mouseover', function(evt){
/* 412  */ 				$this = $(evt.target);
/* 413  */ 				if(!$this.data("bt")){
/* 414  */ 					$this.data("bt", "true");
/* 415  */ 					translate($this);
/* 416  */ 					var $parent_p = $this.parents('p:first');
/* 417  */ 					var triggers = ['mouseover', 'mouseout'];
/* 418  */ 					if ($parent_p.hasClass('info-trigger-none') || $this.hasClass('info-trigger-none'))
/* 419  */ 						triggers = "none";
/* 420  */ 					
/* 421  */ 					var positions = ['bottom',"top"];
/* 422  */ 
/* 423  */ 					$this.bt({trigger: triggers, positions: positions, padding: 6, shrinkToFit: true, fill: "rgba(51,51,51,0.8)", strokeStyle: "transparent", cssStyles: {color: "#FFF", 'font-size':'11px', 'text-align':'left'}, showTip: showTip, hideTip: hideTip });
/* 424  */ 					$this.btOn();
/* 425  */ 				}
/* 426  */ 			});
/* 427  */ 		}
/* 428  */ 	};
/* 429  */ 	
/* 430  */ 	/*CLONEFIELD*************************/
/* 431  */ 	var cloneFields = function(){
/* 432  */ 		if ($.fn.cloneField) {
/* 433  */ 			$("[class=cloneable]").each(function(i, el){
/* 434  */ 				$(el).cloneField({
/* 435  */ 					removeEl:'<span>&nbsp;</span>',
/* 436  */ 					maxClones: $(this).attr('maxClones'),
/* 437  */ 					currentValues: $(this).attr('setValues'),
/* 438  */ 					useSeparator: eval($(this).attr('separator'))
/* 439  */ 				});
/* 440  */ 			});
/* 441  */ 		}
/* 442  */ 	};
/* 443  */ 	
/* 444  */ 	/*ABAS********************************/
/* 445  */ 	var makeTabs = function(){
/* 446  */ 		//Aba normal
/* 447  */ 		if ($.fn.tab) {
/* 448  */ 			$("#form_fields").tab();
/* 449  */ 		}
/* 450  */ 		//caixas de abas

/* forms.js */

/* 451  */ 		if($.fn.tabBox){
/* 452  */ 			//Caixas de Abas
/* 453  */ 			$(".tab_box").each(function(){
/* 454  */ 				$(this).tabBox();
/* 455  */ 			});
/* 456  */ 		}
/* 457  */ 		//abas verticais
/* 458  */ 		if($.fn.verticalTab){
/* 459  */ 			$(".vtab").verticalTab();
/* 460  */ 		}
/* 461  */ 	};
/* 462  */ 	
/* 463  */ 	/*TABELAS********************************/
/* 464  */ 	var mountTables = function(){
/* 465  */ 		if ($.fn.colorize) {
/* 466  */ 			$(".form_table").colorize();
/* 467  */ 		}
/* 468  */ 	};
/* 469  */ 	
/* 470  */ 	/*DATEPICKER****************************/
/* 471  */ 	var makeDatePicker = function(){
/* 472  */ 		if ($.fn.datePicker) {
/* 473  */ 			
/* 474  */ 			var dwidth = $(document).width();
/* 475  */ 			
/* 476  */ 			$('.date').each(function(i, el){
/* 477  */ 				$(el).datePicker({
/* 478  */ 						startDate:'01/01/2000',
/* 479  */ 						verticalOffset: -2,
/* 480  */ 						horizontalOffset: -1,
/* 481  */ 						showYearNavigation: false
/* 482  */ 					})
/* 483  */ 					.bind('dpClosed',function(){
/* 484  */ 						$(el).select();
/* 485  */ 						$(el).trigger('blur');
/* 486  */ 					});
/* 487  */ 				
/* 488  */ 				//ajuste de borda direita
/* 489  */ 				var icone = $(el).next(".dp-choose-date");
/* 490  */ 				if(icone.position().left+180 > dwidth){
/* 491  */ 					$(el).dpSetPosition($.dpConst.POS_TOP, $.dpConst.POS_RIGHT);
/* 492  */ 				}
/* 493  */ 				
/* 494  */ 				if ($(this).attr('today') == 'true' && $(this).val() == ''){
/* 495  */ 					var dt = new Date();
/* 496  */ 					var day = (dt.getDate() < 10) ? "0"+dt.getDate() : dt.getDate();
/* 497  */ 					var month = ((dt.getMonth()+1) < 10) ? "0"+(dt.getMonth()+1) : (dt.getMonth()+1);
/* 498  */ 					var year = dt.getFullYear();
/* 499  */ 					var vr = day+'/'+month+'/'+year;
/* 500  */ 					$(this).val(vr);

/* forms.js */

/* 501  */ 				}
/* 502  */ 			});
/* 503  */ 		}
/* 504  */ 	};
/* 505  */ 	
/* 506  */ 	
/* 507  */ 	/*WYSIWYG****************************/
/* 508  */ 	var makeWysiwyg = function(){
/* 509  */ 		if ($.fn.tinymce) {
/* 510  */ 			
/* 511  */ 			$('textarea.editor').each(function(i, el){
/* 512  */ 				//opcoes padrao da primeira linha de opcoes do wysiwyg
/* 513  */ 				var o = {
/* 514  */ 					  script_url : BASE_URL+'/resources/js/common/tiny_mce/tiny_mce.js',
/* 515  */ 		    	      theme : "advanced",
/* 516  */ 		    	      theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,formatselect,|,fontsizeselect,|,justifyleft,justifycenter,justifyright,justifyfull, outdent, indent, |,undo,redo,|,cleanup,|,bullist,numlist,forecolor,|,link,unlink," +
/* 517  */ 		    	      		"|image, removeformat",
/* 518  */ 		    	      theme_advanced_statusbar_location : ""
/* 519  */ 				};
/* 520  */ 				
/* 521  */ 				//attr options. se existir coloca options, se for vazio ou nao definido coloca opcoes padrao
/* 522  */ 				var option_1 = $(this).attr("options_button");
/* 523  */ 				o.theme_advanced_buttons1 = (option_1) ? option_1 : o.theme_advanced_buttons1;
/* 524  */ 				
/* 525  */ 				//attr tamanho
/* 526  */ 				o.width = $(this).attr("width");
/* 527  */ 				o.height = $(this).attr("height");
/* 528  */ 				
/* 529  */ 				$(this).tinymce(o);
/* 530  */ 			});
/* 531  */ 		}
/* 532  */ 	};
/* 533  */ 	
/* 534  */ 	/*COLOR PICKER****************************/
/* 535  */ 	var makeColorPicker = function(){
/* 536  */ 		if($.fn.spectrum){
/* 537  */ 			$(".colorpicker").each(function(){
/* 538  */ 				var t 	= $(this);
/* 539  */ 				if(!t.val())
/* 540  */ 					t.val("#000000");
/* 541  */ 				var def = t.val();
/* 542  */ 				t.spectrum({
/* 543  */ 					color: def,
/* 544  */ 					clickoutFiresChange: true,
/* 545  */ 					showPalette: false,
/* 546  */ 					showButtons: false,
/* 547  */ 					showInput: true,
/* 548  */ 					change: function(color) {
/* 549  */ 				        t.val(color.toHexString());
/* 550  */ 				    }

/* forms.js */

/* 551  */ 				});
/* 552  */ 			});
/* 553  */ 		}
/* 554  */ 	};
/* 555  */ 	
/* 556  */ 	
/* 557  */ 	/*MASCARAS****************************/
/* 558  */ 	function makeMasks(){
/* 559  */ 		//se existir mascaras
/* 560  */ 		if ($.fn.mask){ 
/* 561  */ 			//definicoes
/* 562  */ 			$.mask.definitions['0']='[0]';
/* 563  */ 			$.mask.definitions['1']='[01]';
/* 564  */ 			$.mask.definitions['2']='[012]';
/* 565  */ 			$.mask.definitions['3']='[0123]';
/* 566  */ 			$.mask.definitions['4']='[01234]';
/* 567  */ 			$.mask.definitions['5']='[012345]';
/* 568  */ 			$.mask.definitions['6']='[0123456]';
/* 569  */ 			$.mask.definitions['7']='[01234567]';
/* 570  */ 			$.mask.definitions['8']='[012345678]';
/* 571  */ 			$.mask.definitions['C']='[0567]';
/* 572  */ 			$.mask.definitions['T']='[0-9a-zA-z]';
/* 573  */ 
/* 574  */ 			
/* 575  */ 			//mascaras
/* 576  */ 			$("[mask]:not([readonly])").each(function(i,el){var obj = $(el); obj.mask(obj.attr("mask")); }); //genérica definida no elemento
/* 577  */ 			
/* 578  */ 			$("[mask]").live("focus", function(evt){
/* 579  */ 				$this = $(evt.target);
/* 580  */ 				//adicionando mascaras em tempo de interação
/* 581  */ 				if(!$this.attr("readonly") && !$this.data("buffer")){
/* 582  */ 					$this.mask($this.attr("mask"));
/* 583  */ 				}
/* 584  */ 				//removendo mascaras em tempo de interação
/* 585  */ 				else if($this.attr("readonly") && $this.data("buffer")){
/* 586  */ 					$this.unmask();
/* 587  */ 				}
/* 588  */ 			});
/* 589  */ 			
/* 590  */ 			$(".time:not([readonly])").mask("29:59");					 				//máscara de horas
/* 591  */ 		}
/* 592  */ 		
/* 593  */ 		//moedas
/* 594  */ 		if ($.fn.numberFormat){ $('input[number_format]').each(function(i, el){$(el).numberFormat();}); } 
/* 595  */ 		
/* 596  */ 		//UPPERCASES - transforma p/ caixa alta todos o texto de todos os campos com a classe "uppercase"
/* 597  */ 		if ($.fn.bestupper){ $('[uppercase=true]').each(function(i, el){$(el).bestupper();}); }
/* 598  */ 	}
/* 599  */ 	
/* 600  */ 	/* SUBMISSAO DO FORMULARIO **********************/

/* forms.js */

/* 601  */ 	//Fechar a Janela
/* 602  */ 	function closeWindow(){
/* 603  */ 		var windowId = MochaUI.getFrameWindowId();
/* 604  */ 		parent.MochaUI.closeWindow(parent.$(windowId));
/* 605  */ 	}
/* 606  */ 	
/* 607  */ 	//Sucesso
/* 608  */ 	function isDefined(variable){
/* 609  */ 		return (!(!( variable||false )));
/* 610  */ 	}
/* 611  */ 	
/* 612  */ 	//Realiza o redirect de uma página
/* 613  */ 	function redirect(url, reload){
/* 614  */ 		document.location.assign(url);
/* 615  */ 		if(reload){
/* 616  */ 			document.location.reload(true);
/* 617  */ 		}
/* 618  */ 	}
/* 619  */ 	
/* 620  */ 	
/* 621  */ 	//Submissao recebida com Sucesso 
/* 622  */ 	var post_success = function(el){
/* 623  */ 		return function(text, textStatus) {
/* 624  */ 			var btn 		= $(el);
/* 625  */ 			var message 	= text.message;
/* 625  */ 			//var nomes 	    = text.nome;

/* 626  */ 			var alert_type	= (text.type!=undefined) ? text.type : "";
/* 627  */ 			
/* 628  */ 			//registrando o id
/* 629  */ 			var idEl = $("#"+text.id_field);
/* 630  */ 			var idEl_old_val = idEl.val(); //obtendo o valor antigo do ID do formulario (salvando ou editando) 
/* 631  */ 			idEl.val(text.id_value);
/* 632  */ 			
/* 633  */ 			var hash = document.location.hash;
/* 634  */ 			
/* 635  */ 			//verifica se formulário veio de uma table form
/* 636  */ 			if (btn.attr("tableForm")) {
/* 637  */ 				parent.MochaUI.success(message);
/* 638  */ 				$$(".pReload").fireEvent("click");
/* 639  */ 				var $elForm = $('#form');
/* 640  */ 				document.getElementById('form').reset();
/* 641  */ 				idEl.val('');
/* 642  */ 				$('#form [type=hidden]').val('');
/* 643  */ 				$elForm.find('input:not([type=hidden]):not([type=button]):not([type=submit]):first').focus();
/* 644  */ 				//oculta janela loading
/* 645  */ 				toggleLoading(false); 
/* 646  */ 			}else{
/* 647  */ 				//Apenas se janela possuir o MochaUI
/* 648  */ 				if (typeof( parent.MochaUI ) != "undefined") {
/* 649  */ 					//Recupera o id da janela coletado no formulario em que o botao esta
/* 650  */ 					var windowId = $(el.form).attr("windowId");
/* 652 /Sucesso ou notificação
/* 653  */ 					switch(alert_type){
/* 654  */ 						case "notify":
/* 655  */ 						case "erro":
/* 656  */ 						case "error":
/* 657  */ 							parent.MochaUI.notify(message);
/* 658  */ 							break;
/* 659  */ 						case "information":
/* 660  */ 							parent.MochaUI.information(message);
/* 661  */ 							break;
/* 662  */ 						case "alert":
/* 663  */ 						case "info":
/* 664  */ 							parent.Sexy.info(message);
/* 665  */ 							break;
/* 666  */ 						default:
/* 667  */ 							parent.MochaUI.success(message);
/* 668  */ 						break;
/* 669  */ 					}
/* 670  */ 					
/* 671  */ 					//Fechar a janela apos postagem
/* 672  */ 					if (btn.attr('closeWindow')) {
/* 673  */ 						closeWindow();
/* 674  */ 					}
/* 675  */ 					//Formulario de edição apos postagem
/* 676  */ 					else if (btn.attr('saveWindowForm')) {
/* 677  */ 						if(idEl_old_val!=idEl.val()){ 
/* 678  */ 							redirect(windowId+"/"+idEl.val()+hash); //salva e redireciona p/ formulario de edicao
/* 679  */ 						}else{
/* 680  */ 							document.location.reload(true);
/* 681  */ 						}
/* 682  */ 					}
/* 683  */ 					//Redireciona p/ outra pagina apos postagem
/* 684  */ 					else if (btn.attr('redirectWindow')) {
/* 685  */ 						redirect(btn.attr('redirectWindow'));
/* 686  */ 					}
/* 687  */ 					//Novo formulario apos postagem
/* 688  */ 					else if (btn.attr('newWindowForm')) {
/* 689  */ 						redirect(windowId);
/* 690  */ 					} else {
/* 691  */ 						//oculta janela loading
/* 692  */ 						toggleLoading(false); 
/* 693  */ 					}
/* 694  */ 				}
/* 695  */ 				//Redireciona p/ outra pagina apos postagem
/* 696  */ 				else if (btn.attr('redirectWindow')) {
/* 697  */ 					var href = btn.attr('redirectWindow');
/* 698  */ 					
/* 699  */ 					//Mostra Sexy Info antes de redirecionar
/* 700  */ 					if(message && Sexy && alert_type=='info'){

/* forms.js */

/* 701  */ 						Sexy.info(message, {
/* 702  */ 							onComplete:function (){
/* 703  */ 								redirect(href);
/* 704  */ 							}
/* 705  */ 						});
/* 706  */ 					}
/* 707  */ 					//Apenas redireciona
/* 708  */ 					else{
/* 709  */ 						redirect(href, true);
/* 710  */ 					}
/* 711  */ 				}else{
/* 712  */ 					//Mostra info
/* 713  */ 					Sexy.info(message);
/* 714  */ 					//oculta janela loading
/* 715  */ 					toggleLoading(false); 
/* 716  */ 				}
/* 717  */ 			}
/* 718  */ 			
/* 719  */ 			// Executa evento após confirmação do envio dos dados
/* 720  */ 			$$('#form').fireEvent('afterSubmit', [btn, text]);
/* 721  */ 		};
/* 722  */ 	};
/* 723  */ 	
/* 724  */ 	//Erro na submissao do formulario
/* 725  */ 	var post_error = function(XMLHttpRequest, textStatus, errorThrown){
/* 726  */ 		//oculta janela loading
/* 727  */ 		toggleLoading(false); 
/* 728  */ 		
/* 729  */ 		//exibe erro
/* 730  */ 		if (XMLHttpRequest.status == 500) {
/* 731  */ 			Sexy.alert(XMLHttpRequest.responseText);
/* 732  */ 		}else{
/* 733  */ 			$(document).log(XMLHttpRequest.responseText);
/* 734  */ 		}
/* 735  */ 	};
/* 736  */ 	
/* 737  */ 	/* VALIDAÇÕES ****************************/
/* 738  */ 	var showTabTip = function(){
/* 739  */ 		//se algum campo de formulario da aba apresentar algum erro, exibe imagem de erro na aba também
/* 740  */ 		//var debug = "";
/* 741  */ 		$(".tab").each(function(i, el){
/* 742  */ 			var $aba = $(el);
/* 743  */ 			var $tabAlert = $(".tab_selector").find("[href=#" + $aba.attr('id') + "] .tab_error");
/* 744  */ 			//encontra erros
/* 745  */ 			var erros = $aba.find(".error");
/* 746  */ 			var num_erros = erros.length;
/* 747  */ 			//filtra erros
/* 748  */ 			erros.each(function(i, err){if($(err).css("display")=="none"){num_erros--;}});
/* 749  */ 			//exibe tips
/* 750  */ 			if (num_erros > 0 && !$tabAlert.hasClass("tab_error_visible")) {

/* forms.js */

/* 751  */ 				$tabAlert.addClass("tab_error_visible");
/* 752  */ 			}else if(num_erros==0 && $tabAlert.hasClass("tab_error_visible")) {
/* 753  */ 				$tabAlert.removeClass("tab_error_visible");
/* 754  */ 			}
/* 755  */ 		});
/* 756  */ 		
/* 757  */ 		//tips em abas verticais
/* 758  */ 		$(".vtab_nav").children().each(function(i, el){
/* 759  */ 			var $aba 		= $(el);
/* 760  */ 			var $content 	= $aba.parent().next(".vtab_content").find("."+$aba.attr("rel"));
/* 761  */ 			//encontra erros
/* 762  */ 			var erros 		= $content.find(".error");
/* 763  */ 			var num_erros 	= erros.length;
/* 764  */ 			//filtra erros
/* 765  */ 			erros.each(function(i, err){if($(err).css("display")=="none"){num_erros--;}});
/* 766  */ 			//exibe ou esconde tips
/* 767  */ 			$aba.toggleClass("tab_error_visible", (num_erros > 0));
/* 768  */ 		});
/* 769  */ 	};
/* 770  */ 	
/* 771  */ 	//Mostrando 
/* 772  */ 	var showFieldsetError = function(){
/* 773  */ 		$('.show_error').each(function(i, el){
/* 774  */ 			//Elemento
/* 775  */ 			var $fieldset = $(el);
/* 776  */ 			
/* 777  */ 			//encontra erros
/* 778  */ 			var erros 		= $fieldset.find(".error");
/* 779  */ 			var num_erros 	= erros.length;
/* 780  */ 			
/* 781  */ 			//filtra erros
/* 782  */ 			erros.each(function(i, err){if($(err).css("display")=="none"){num_erros--;}});
/* 783  */ 			
/* 784  */ 			if(num_erros > 0){
/* 785  */ 				$fieldset.addClass("fieldset_error_visible");
/* 786  */ 			}else{
/* 787  */ 				$fieldset.removeClass("fieldset_error_visible");
/* 788  */ 			}
/* 789  */ 		});
/* 790  */ 	}
/* 791  */ 	
/* 792  */ 	/**
/* 793  *| 	 * Monta validações e eventos em formularios
/* 794  *| 	 */
/* 795  */ 	function makeValidations(){
/* 796  */ 		//botao de cancelar
/* 797  */ 		$('input[cancelForm=true]').click(function(e){
/* 798  */ 			new Event(e).stop();
/* 799  */ 			closeWindow();
/* 800  */ 		});

/* forms.js */

/* 801  */ 		
/* 802  */ 		$('input[cancelTableForm=true]').click(function(){
/* 803  */ 			document.getElementById('form').reset(); 
/* 804  */ 			// Reseta campos hidden, a linha acima não está resetando o form completo
/* 805  */ 			$('#form').find('input[type=hidden]').val('');
/* 806  */ 		});
/* 807  */ 		
/* 808  */ 		//botao de Apagar
/* 809  */ 		$('input[deleteUrl]').click(function(evt){
/* 810  */ 			//obtem o botao sendo acionado no formulario
/* 811  */         	var btn = this;
/* 812  */         	
/* 813  */         	//limpa todas as confirmacoes dos botoes antes de colocalas.
/* 814  */         	$(btn).unsetConfirmMessage();
/* 815  */         	
/* 816  */         	if($(btn).attr("confirm")){
/* 817  */         		if($(btn).attr("labelsConfirm")){
/* 818  */         			var labels = eval('('+$(btn).attr("labelsConfirm")+')');
/* 819  */     				$(btn).addConfirmMessage($(btn).attr("confirm"),labels.labelSim,labels.labelNao);
/* 820  */         		}
/* 821  */         		else{
/* 822  */         			$(btn).addConfirmMessage($(btn).attr("confirm"));
/* 823  */         		}
/* 824  */         		
/* 825  */         	}
/* 826  */
/* 827  */         	//se não passou no teste de submissao associado ao botao, nao envia
/* 828  */         	if(!beforeSend(btn, "beforeDelete")) return;
/* 829  */         	
/* 830  */         	//Confirma e submete o formulario
/* 831  */         	confirmSubmitForm(btn, form);
/* 832  */ 		});
/* 833  */ 		
/* 834  */ 		//metodo executado antes do submit
/* 835  */ 		var beforeSend = function(btn, htype){
/* 836  */ 			var retorno = {val: true};
/* 837  */ 			var ret = retorno.val;
/* 838  */ 			//executando o metodo associado ao botao, passando um parametro extra p/ retorno
/* 839  */ 			$.each($(btn).data('events'), function(i, event){
/* 840  */ 				$.each(event, function(i, handler){
/* 841  */ 					if(handler.type==htype){
/* 842  */ 						var namespace = (handler.namespace!="") ? "."+handler.namespace : ".$";
/* 843  */ 						$(btn).trigger(htype + namespace, [retorno]);
/* 844  */ 						ret = ret && retorno.val;
/* 845  */ 					}
/* 846  */ 				});
/* 847  */ 			});
/* 848  */ 			
/* 849  */ 			return ret;
/* 850  */ 		};

/* forms.js */

/* 851  */ 		
/* 852  */ 		/**
/* 853  *| 		 * Confirmando envio do formulario
/* 854  *| 		 */
/* 855  */ 		var confirmSubmitForm = function(btn, form){
/* 856  */         	
/* 857  */         	// Verifica por mensagem de confirmação
/* 858  */         	var conf = $(btn).data("confirm_message");
/* 859  */         	var sx = Sexy;
/* 860  */         	// Verifica confirmação do parent
/* 861  */         	if (!conf || conf == '') {
/* 862  */         		conf = $(btn).data("parent_confirm_message");
/* 863  */         		sx = parent.Sexy;
/* 864  */         	}
/* 865  */         	// Transforma conf em objeto
/* 866  */         	if (typeof(conf) == 'string'){
/* 867  */         		conf = [conf];
/* 868  */         	}
/* 869  */         	// Se existe confirmação, recebe resposta do usuario antes de submeter formulario
/* 870  */         	if(conf){
/* 871  */ 				$(conf).showConfirmMessages(sx,function () {
/* 872  */ 					submitForm(btn, form);
/* 873  */ 				},btn);
/* 874  */         	}else{
/* 875  */         		submitForm(btn, form);
/* 876  */         	}
/* 877  */ 		};
/* 878  */ 		
/* 879  */ 		/**
/* 880  *| 		 * Submete o formulario
/* 881  *| 		 */
/* 882  */ 		var submitForm = function(btn, form){
/* 883  */ 			//janela loading
/* 884  */ 			toggleLoading(true);
/* 885  */ 			
/* 886  */ 			//confirmando submit
/* 887  */ 			var f 		= $(form);
/* 888  */ 			
/* 889  */ 			//debugando formulario (efetua submit normal)
/* 890  */ 			el = (f.attr("tableForm"))? f : btn;
/* 891  */ 			
/* 892  */ 			if (f.attr("debug")=="true") {
/* 893  */ 				form.submit();
/* 894  */ 			}
/* 895  */ 			else if($(btn).attr('noajax')=="true"){
/* 896  */ 				form.submit();
/* 897  */ 				$$('#form').fireEvent('afterSubmit', [btn, ""]);
/* 898  */ 			}
/* 899  */ 			else if($(btn).attr('nosuccess')=="true"){
/* 900  */ 				$.ajax({

/* forms.js */

/* 901  */ 					type: "POST",
/* 902  */ 					url: f.attr("action"), //efetua requisicao na pagina apontada pela action do formulario
/* 903  */ 					data: f.serialize(),
/* 904  */ 					success: function(data){
/* 905  */ 						$$('#form').fireEvent('afterSubmit', [btn, data]);
/* 906  */ 					}
/* 907  */ 				});
/* 908  */ 			}
/* 909  */ 			else if($(btn).attr('deleteUrl')){
/* 910  */ 				$.ajax({
/* 911  */ 					type: "POST",
/* 912  */ 					url: $(btn).attr("deleteUrl"), //efetua requisicao na pagina apontada pela action do botao delete
/* 913  */ 					success: function(data){
/* 914  */ 						parent.MochaUI.success(data);
/* 915  */ 						closeWindow(); //fecha janela
/* 916  */ 					},
/* 917  */ 					error: post_error
/* 918  */ 				});
/* 919  */ 			}
/* 920  */ 			else {
/* 921  */ 				$.ajax({
/* 922  */ 					type: "POST",
/* 923  */ 					url: f.attr("action"), //efetua requisicao na pagina apontada pela action do formulario
/* 924  */ 					data: f.serialize(),
/* 925  */ 					dataType: 'json',
/* 926  */ 					success: post_success(el),
/* 927  */ 					error: post_error
/* 928  */ 				});
/* 929  */ 			}
/* 930  */ 		};
/* 931  */ 		
/* 932  */ 		//se validador existir
/* 933  */ 		if (jQuery.fn.validate){
/* 934  */ 				
/* 935  */ 			//validando formulario
/* 936  */ 			var v = $("#form").validate({
/* 937  */ 		        showErrors: function() { 
/* 938  */ 					this.defaultShowErrors();
/* 939  */ 					showTabTip();
/* 940  */ 					showFieldsetError();
/* 941  */ 				},
/* 942  */ 				errorPlacement: function(error, element) {
/* 943  */ 					var el 			= element.parent().parent();
/* 944  */ 					var avo 		= el.children(".input_alert"); //alert no span
/* 945  */ 					avo				= (avo.length == 0) ? el.parent().children(".input_alert") : avo; //na label 
/* 946  */ 					avo 			= (avo.length == 0) ? el.parent().parent().children(".input_alert") : avo; //no fieldset
/* 947  */ 					avo 			= (avo.length == 0) ? el.parent().parent().children("legend").find(".input_alert") : avo; //na aba
/* 948  */ 					avo 			= (avo.length == 0) ? element.parents('tr:first').children('td:first').find(".input_alert") : avo; //na linha da tabela
/* 949  */ 					avo 			= (avo.length == 0) ? element.parents('table:first').parents('tr:first').prev().first().find('.input_alert') : avo; //na linha 'sibling' da tabela "importação"
/* 950  */ 					

/* forms.js */

/* 951  */ 					//se encontrou algum alert anteriormente, exibe
/* 952  */ 					if (avo.length > 0) {
/* 953  */ 						avo.html(error); 
/* 954  */ 					}
/* 955  */ 					//senao verifica por alertas em tabelas
/* 956  */ 					else { 
/* 957  */ 						var cell 	= element.closest("td");
/* 958  */ 						if(cell.length == 0) return;
/* 959  */ 						var linha 	= cell.parent();
/* 960  */ 						var index 	= linha.children().index(cell);
/* 961  */ 						var thead	= linha.closest("table").children("thead");
/* 962  */ 						if(thead.length == 0) return;
/* 963  */ 						avo = thead.children("tr").children().eq(index).children(".input_alert");
/* 964  */ 						if(avo.length == 0) return;
/* 965  */ 						avo.html(error);
/* 966  */ 					}
/* 967  */ 		        },
/* 968  */ 				submitHandler: function(form) {
/* 969  */ 		        	//obtem o botao sendo acionado no formulario
/* 970  */ 		        	var btn 	= this.submitButton;
/* 971  */ 		        	
/* 972  */ 		        	//se não passou no teste de submissao associado ao botao, nao envia
/* 973  */ 		        	if(!beforeSend(btn, "beforeSubmit")) return;
/* 974  */ 		        	
/* 975  */ 		        	//Confirma e submete o formulario
/* 976  */ 		        	confirmSubmitForm(btn, form);
/* 977  */ 				}
/* 978  */ 			});
/* 979  */ 		}
/* 980  */ 		
/* 981  */ 		// Reseta validação do form
/* 982  */ 		if ($("#form").length > 0){
/* 983  */ 			$("#form").get(0).onreset = function () {
/* 984  */ 				v.resetForm();
/* 985  */ 			};
/* 986  */ 		}
/* 987  */ 	}
/* 988  */ 	
/* 989  */ 	//se validador existir
/* 990  */ 	if (jQuery.fn.validate){
/* 991  */ 		/* CNPJ --------------------------------*/
/* 992  */ 		jQuery.validator.addMethod("cnpj", function(cnpj, element) {
/* 993  */ 			
/* 994  */ 			if(cnpj=="__.___.___/____-__"){
/* 995  */ 				 $(element).val("");
/* 996  */ 				 return this.optional(element) || false;
/* 997  */ 			 }
/* 998  */ 			
/* 999  */ 			
/* 1000 */ 		   // DEIXA APENAS OS NÚMEROS

/* forms.js */

/* 1001 */ 		   cnpj = cnpj.replace('/','');
/* 1002 */ 		   cnpj = cnpj.replace('.','');
/* 1003 */ 		   cnpj = cnpj.replace('.','');
/* 1004 */ 		   cnpj = cnpj.replace('-','');
/* 1005 */ 		 
/* 1006 */ 		   var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
/* 1007 */ 		   digitos_iguais = 1;
/* 1008 */ 		   if (cnpj.length < 14 ){return this.optional(element) || false;}
/* 1009 */ 		   for (i = 0; i < cnpj.length - 1; i++){
/* 1010 */ 		      if (cnpj.charAt(i) != cnpj.charAt(i + 1)){
/* 1011 */ 		         digitos_iguais = 0;
/* 1012 */ 		         break;
/* 1013 */ 		      }
/* 1014 */ 		   }
/* 1015 */ 		   if (!digitos_iguais){
/* 1016 */ 		      tamanho = cnpj.length - 2;
/* 1017 */ 		      numeros = cnpj.substring(0,tamanho);
/* 1018 */ 		      digitos = cnpj.substring(tamanho);
/* 1019 */ 		      soma = 0;
/* 1020 */ 		      pos = tamanho - 7;
/* 1021 */ 		      for (i = tamanho; i >= 1; i--){
/* 1022 */ 		         soma += numeros.charAt(tamanho - i) * pos--;
/* 1023 */ 		         if (pos < 2){
/* 1024 */ 		            pos = 9;
/* 1025 */ 		         }
/* 1026 */ 		      }
/* 1027 */ 		      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
/* 1028 */ 		      if (resultado != digitos.charAt(0)){
/* 1029 */ 		    	  return this.optional(element) || false;
/* 1030 */ 		      }
/* 1031 */ 		      tamanho = tamanho + 1;
/* 1032 */ 		      numeros = cnpj.substring(0,tamanho);
/* 1033 */ 		      soma = 0;
/* 1034 */ 		      pos = tamanho - 7;
/* 1035 */ 		      for (i = tamanho; i >= 1; i--){
/* 1036 */ 		         soma += numeros.charAt(tamanho - i) * pos--;
/* 1037 */ 		         if (pos < 2){
/* 1038 */ 		            pos = 9;
/* 1039 */ 		         }
/* 1040 */ 		      }
/* 1041 */ 		      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
/* 1042 */ 		      if (resultado != digitos.charAt(1)){ return this.optional(element) || false; }
/* 1043 */ 		      return true;
/* 1044 */ 		   }else{
/* 1045 */ 			   return this.optional(element) || false;
/* 1046 */ 		   }
/* 1047 */ 		});
/* 1048 */ 		
/* 1049 */ 		/* CPF --------------------------------*/
/* 1050 */ 		 jQuery.validator.addMethod("cpf", function(value, element) {

/* forms.js */

/* 1051 */ 			 if(value=="___.___.___-__"){
/* 1052 */ 				 $(element).val("");
/* 1053 */ 				 return this.optional(element) || false;
/* 1054 */ 			 }
/* 1055 */ 		     value = value.replace('.','');  
/* 1056 */ 		     value = value.replace('.','');  
/* 1057 */ 		     cpf = value.replace('-','');
/* 1058 */ 		     while(cpf.length < 11) cpf = "0"+ cpf;  
/* 1059 */ 		     var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;  
/* 1060 */ 		     var a = [];  
/* 1061 */ 		     var b = new Number;  
/* 1062 */ 		     var c = 11;  
/* 1063 */ 		     for (i=0; i<11; i++){  
/* 1064 */ 		         a[i] = cpf.charAt(i);  
/* 1065 */ 		         if (i < 9) b += (a[i] * --c);  
/* 1066 */ 		     }  
/* 1067 */ 		     if ((x = b % 11) < 2) { a[9] = 0; } else { a[9] = 11-x; }  
/* 1068 */ 		     b = 0;  
/* 1069 */ 		     c = 11;  
/* 1070 */ 		     for (y=0; y<10; y++) b += (a[y] * c--);  
/* 1071 */ 		     if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }  
/* 1072 */ 		     if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) return this.optional(element) || false;  
/* 1073 */ 		     return true;  
/* 1074 */ 		 }); 
/* 1075 */ 		
/* 1076 */ 		/* DATA --------------------------------*/
/* 1077 */ 		 jQuery.validator.addMethod("date", function(value, element) {
/* 1078 */ 			 if(value=="__/__/____"){
/* 1079 */ 				 $(element).val("");
/* 1080 */ 				 return this.optional(element) || false;
/* 1081 */ 			 }
/* 1082 */ 		     //contando chars
/* 1083 */ 		     if(value.length!=10) return this.optional(element) || false;
/* 1084 */ 		     // verificando data  
/* 1085 */ 		     var data        = value;  
/* 1086 */ 		     var dia         = data.substr(0,2);  
/* 1087 */ 		     var barra1      = data.substr(2,1);  
/* 1088 */ 		     var mes         = data.substr(3,2);  
/* 1089 */ 		     var barra2      = data.substr(5,1);  
/* 1090 */ 		     var ano         = data.substr(6,4);  
/* 1091 */ 		     if(data.length!=10||barra1!="/"||barra2!="/"||isNaN(dia)||isNaN(mes)||isNaN(ano)||dia>31||mes>12||mes<1||dia<1) return this.optional(element) || false;  
/* 1092 */ 		     if((mes==4||mes==6||mes==9||mes==11)&&dia==31) return this.optional(element) || false;  
/* 1093 */ 		     if(mes==2 && (dia>29||(dia==29&&ano%4!=0))) return this.optional(element) || false;
/* 1094 */ 		     if(ano < 1900) return this.optional(element) || false;
/* 1095 */ 		     return true;  
/* 1096 */ 		 });
/* 1097 */ 	
/* 1098 */ 		/* TIME --------------------------------*/
/* 1099 */ 		jQuery.validator.addMethod("time", function(value, element) {
/* 1100 */ 			 if(value=="__:__"){

/* forms.js */

/* 1101 */ 				 $(element).val("");
/* 1102 */ 				 return this.optional(element) || false;
/* 1103 */ 			 }
/* 1104 */ 		     //contando chars  
/* 1105 */ 		     if(value.length!=5) return this.optional(element) || false;
/* 1106 */ 		     // verificando data
/* 1107 */ 		     var time        = value;
/* 1108 */ 		     var hora        = time.substr(0,2);  
/* 1109 */ 		     var divisor     = time.substr(2,1);  
/* 1110 */ 		     var minuto      = time.substr(3,2);  
/* 1111 */ 		     if(time.length!=5||divisor!=":"||isNaN(hora)||isNaN(minuto)||hora>23||minuto>59) return this.optional(element) || false;;  
/* 1112 */ 		     return true;  
/* 1113 */ 		 });
/* 1114 */ 		
/* 1115 */ 		/* PASSWORD --------------------------------*/
/* 1116 */ 		//Campo vira obrigatório (não vazio) apenas quando sentença é verdadeira
/* 1117 */ 		jQuery.validator.addMethod("requiredIf", function(value, element,param) {
/* 1118 */ 			if(eval(param)){
/* 1119 */ 				return jQuery.validator.methods.required.call(this, value, element);
/* 1120 */ 			}
/* 1121 */ 			return true;
/* 1122 */ 		});
/* 1123 */ 		
/* 1124 */ 		/* CODIGOS ---------------------------------*/
/* 1125 */ 		//aceita apenas numeros e caractere "-"
/* 1126 */ 		jQuery.validator.addMethod("code", function(value, element) {  
/* 1127 */ 			return this.optional(element) || /^(\d)+((-)+(\d)+)*$/.test(value);
/* 1128 */ 		});
/* 1129 */ 		
/* 1130 */ 		/* PREÇOS ---------------------------------*/
/* 1131 */ 		//aceita apenas numeros maiores que 0
/* 1132 */ 		jQuery.validator.addMethod("price", function(value, element) {
/* 1133 */ 			var price = Number(value.replace(".", "").replace(",", ""));
/* 1134 */ 			return (price>0);
/* 1135 */ 		});
/* 1136 */ 		
/* 1137 */ 		/* RANGE LENGHTS ---------------------------*/
/* 1138 */ 		jQuery.validator.addClassRules("nome", { rangelength: [5,255] });
/* 1139 */ 		
/* 1140 */ 		//PASSWORD ----------------------------------*/
/* 1141 */ 		jQuery.validator.addClassRules("passwordlength", { rangelength: [6,100] });
/* 1142 */ 		jQuery.validator.addMethod("password", function(value, element) {
/* 1143 */ 			if(value.length != 0 && (value.length < 6 || value.length > 100)) return false;
/* 1144 */ 			return this.optional(element) || (value.search(/[0-9]/g)>=0 && value.search(/[a-zA-Z]/g)>=0 );
/* 1145 */ 		});
/* 1146 */ 		
/* 1147 */ 	    /* POSITIVE NUMBER -------------------------*/
/* 1148 */ 	    jQuery.validator.addMethod("positive", function(value, element) {
/* 1149 */ 	    	return (value!="" && parseFloat(jQuery(element).numberValue())>0);
/* 1150 */ 	    });

/* forms.js */

/* 1151 */ 		/* CFOP -------------------------*/
/* 1152 */ 		jQuery.validator.addMethod("cfop", function(value, element) {
/* 1153 */ 			if(value == "_.___" || !value){
/* 1154 */ 				return true;
/* 1155 */ 			}
/* 1156 */ 			
/* 1157 */ 			var ret = false;
/* 1158 */ 			var el = $(element);
/* 1159 */ 			var exp = new RegExp(/[0-9]\.[0-9]{3}/);
/* 1160 */ 			if(!exp.test(value)){
/* 1161 */ 				el.removeData("isValid");
/* 1162 */ 				return false;
/* 1163 */ 			}
/* 1164 */ 			
/* 1165 */ 			// Inicializa vetor de CFOPs válidos
/* 1166 */ 			if (!jQuery.validator.validCfops){
/* 1167 */ 				jQuery.validator.validCfops = [];
/* 1168 */ 			}
/* 1169 */ 			 var el_natureza_op = el.parents('div.tab').find("[name*=natureza_operacao]");
/* 1170 */ 			 
/* 1171 */ 			//Verificando se existe algo em natureza da operação 
/* 1172 */ 			if(el_natureza_op.val())
/* 1173 */ 				if(el.data("isValid")==value || jQuery.validator.validCfops[value] == 1) return true;
/* 1174 */ 			el.addClass("loading");
/* 1175 */ 			$.ajax({
/* 1176 */ 				  async : false,
/* 1177 */ 				  url: el.attr('urlcfop')+'/'+value,
/* 1178 */ 				  dataType: 'json',
/* 1179 */ 				  success: function(json){
/* 1180 */ 					
/* 1181 */ 					if(json.length==0){
/* 1182 */ 						$(el).val('');
/* 1183 */ 						if (el_natureza_op.length && (el_natureza_op.attr('disabled') || (!el_natureza_op.val())))
/* 1184 */ 								el_natureza_op.val('');
/* 1185 */ 						el.removeData("isValid");
/* 1186 */ 						ret = false;
/* 1187 */ 					}
/* 1188 */ 					else{
/* 1189 */ 						if (el_natureza_op.length && (el_natureza_op.attr('disabled') || (!el_natureza_op.val()))){
/* 1190 */ 							el_natureza_op.val(json.nome);
/* 1191 */ 							el_natureza_op.data('desc', json.nome);
/* 1192 */ 						}
/* 1193 */ 						el.data("isValid",value);
/* 1194 */ 						jQuery.validator.validCfops[value] = 1;
/* 1195 */ 						ret= true;
/* 1196 */ 					}
/* 1197 */ 				}
/* 1198 */ 			});
/* 1199 */ 			el.removeClass("loading");
/* 1200 */ 			return ret;

/* forms.js */

/* 1201 */ 		});
/* 1202 */ 		
/* 1203 */ 		/* Validando ean --------------------------------*/
/* 1204 */ 		jQuery.validator.addMethod("code_ean", function(value, element) { 
/* 1205 */ 			var ret = false;
/* 1206 */ 			if(value.length == 0 || value.length == 8 || value.length == 12 || value.length == 13 || value.length == 14){
/* 1207 */ 				ret = true;
/* 1208 */ 			}
/* 1209 */ 			return ret;
/* 1210 */ 		}); 
/* 1211 */ 		
/* 1212 */ 		/* Validando ncm --------------------------------*/
/* 1213 */ 		jQuery.validator.addMethod("cod_ncm", function(value, element) {
/* 1214 */ 			var ret = false;
/* 1215 */ 			if(value.length == 0 || value.length == 2 || value.length == 8){
/* 1216 */ 				ret = true;
/* 1217 */ 			}
/* 1218 */ 			return ret;
/* 1219 */ 		});
/* 1220 */ 		
/* 1221 */ 		/* Validando AutoSuggests ------------------------*/
/* 1222 */ 		jQuery.validator.addMethod("autosuggest", function(value, element) {
/* 1223 */ 			var ret = false;
/* 1224 */ 			
/* 1225 */ 			//verifica se é multisuggest
/* 1226 */ 			if(jQuery(element).is(".multisuggest")) return true;
/* 1227 */ 			
/* 1228 */ 			//verifica se permite novos valores pelo atributo new
/* 1229 */ 			var n = jQuery(element).attr("new");
/* 1230 */ 			if(n !== undefined && n !== "") return true;
/* 1231 */ 			
/* 1232 */ 			//valida se o valor do campo é igual ao do correspondente oculto
/* 1233 */ 			var val = jQuery(element).prevAll("input").val();
/* 1234 */ 			ret = ( (value.length==0 && val.length==0) || (value.length>0 && val.length>0) );
/* 1235 */ 			
/* 1236 */ 			return this.optional(element) || ret;
/* 1237 */ 		});
/* 1238 */ 	}
/* 1239 */ 	
/* 1240 */ })(jQuery);
