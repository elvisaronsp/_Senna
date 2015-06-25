
/* listing.js */

/* 1   */ /*** LISTAGEM  *******************************************
/* 2   *|  * Arquivo contendo as chamadas dos mecanismos necessÃ¡rios para o funcionamento do sistema
/* 3   *|  * 
/* 4   *|  * @author Bruno
/* 5   *|  * @pre
/* 6   *|  * mootools-core
/* 7   *|  * mootools-more
/* 8   *|  * omnigrid
/* 9   *|  */
/* 10  */ 
/* 11  */ var Listing = new Class({ 
/* 12  */ 	Implements: [Events,Options],
/* 13  */ 
/* 14  */ 	getOptions: function(){
/* 15  */ 		return {
/* 16  */ 			formSelector: 	"form#filter",	//contem o seletor do formulario de filtro
/* 17  */ 			dgContainer: 	"datatable", 	//contem o id do elemento datagrid
/* 18  */ 			dgEmpty: 		"#list_empty", 	//contem o id do elemento para campo vazio
/* 19  */ 			baseUrl:		document.URL	//url do frame, janela ou documento
/* 20  */ 		};
/* 21  */ 	},
/* 22  */ 	
/* 23  */ 	/** Construtora 
/* 24  *| 	 =====================================*/ 
/* 25  */ 	initialize: function(options){
/* 26  */ 		this.setOptions(this.getOptions(), options);
/* 27  */ 		this.form 			= $$(this.options.formSelector);
/* 28  */ 		this.dt 			= $(this.options.dgContainer);
/* 29  */ 		this.emptyList		= $$(this.options.dgEmpty);
/* 30  */ 		this.targetUrl 		= "form";				//Alvo padrao do formulario. 'form' como padrao
/* 31  */ 		this.deleteUrl 		= "delete";				//Link alvo. 'form' como padrao
/* 32  */ 		
/* 33  */ 		//formulario existe
/* 34  */ 		if (!this.form)	return;
/* 35  */ 		
/* 36  */ 		//datagrid existe
/* 37  */ 		if (!this.dt)	return;
/* 38  */ 		
/* 39  */ 		//monta o datagrid
/* 40  */ 		this.mountDataGrid();
/* 41  */ 		
/* 42  */ 		//prepara formulario e eventos
/* 43  */ 		this.prepareForm();
/* 44  */ 		
/* 45  */ 	},
/* 46  */ 
/* 47  */ 	
/* 48  */ 	/** Métodos Auxiliares 
/* 49  *| 	 ======================================*/
/* 50  */ 	 

/* listing.js */

/* 51  */ 	 //Cria uma url a partir das variaveis definidas na classe
/* 52  */ 	 url: function(url){
/* 53  */ 	 	return this.options.baseUrl+"/"+url;
/* 54  */ 	 },
/* 55  */ 	 
/* 56  */ 	/*
/* 57  *| 	 * Metodo que coleta os nomes das colunas e seus atributos a partir dos atributos registrados no HTML corrente
/* 58  *| 	 * filhos do elemento #datatable
/* 59  *| 	 * 
/* 60  *| 	 * Atributos: 
/* 61  *| 	 * 	{
/* 62  *| 	 * 		col: nome da coluna no banco de dados
/* 63  *| 	 *  	type: tipo de dados (number|data|string)
/* 64  *| 	 *  	hidden: (true | false) exibe ou nao a coluna
/* 65  *| 	 *  	width: valor contendo a largura da coluna
/* 66  *| 	 *  }
/* 67  *| 	 */
/* 68  */ 	getColumnModel: function(){
/* 69  */ 		var columns = [];
/* 70  */ 		var table = this.dt.getElements('div');
/* 71  */ 		var somaW = 0;
/* 72  */ 		var nullW = 0;
/* 73  */ 		var totalW = ((this.dt.getWidth()>0) ? this.dt.getWidth() : window.getWidth()) - 30; //30px pra barra de rolagem
/* 74  */ 		
/* 75  */ 		//Listagens em Relatorios
/* 76  */ 		if($$('#report_list').length > 0){
/* 77  */ 			var w = $$('#report_list').getWidth();
/* 78  */ 			w =	(w > 0) ? w : $$('#report_list').getStyle('width')[0].toInt();
/* 79  */ 			totalW = w-30;
/* 80  */ 		}
/* 81  */ 		
/* 82  */ 		table.each(function(el) {
/* 83  */ 			var hidden = (el.get('hidden') != null ) ? eval(el.get('hidden')) : false;
/* 84  */ 			var width = el.get('width');
/* 85  */ 			//identificando larguras da tabela
/* 86  */ 			if (!hidden) {
/* 87  */ 				if (width) {
/* 88  */ 					//verificando se tem '%'
/* 89  */ 					if (width.contains('%')){
/* 90  */ 						width = Math.floor((totalW * parseInt(width.toInt())) / 100);
/* 91  */ 					}
/* 92  */ 					//e um numero
/* 93  */ 					else{
/* 94  */ 						width = width.toInt();
/* 95  */ 					}
/* 96  */ 					
/* 97  */ 					//validando largura maior que a maxima permitida
/* 98  */ 					if(width>totalW){
/* 99  */ 						width = 50; //seta para 50 caso ocorra
/* 100 */ 					}

/* listing.js */

/* 101 */ 					somaW += width;
/* 102 */ 				}
/* 103 */ 				//e nulo
/* 104 */ 				else {
/* 105 */ 					nullW++;
/* 106 */ 					width = false;
/* 107 */ 				}
/* 108 */ 			}else{
/* 109 */ 				width = 0;
/* 110 */ 			}
/* 111 */ 			
/* 112 */ 			//montando elemento da coluna
/* 113 */ 			var th = {
/* 114 */ 				header: el.get('text'),
/* 115 */ 				dataIndex: el.get('col'),
/* 116 */ 				dataType: el.get('type'),
/* 117 */ 				align: el.get('align'),
/* 118 */ 				hidden: hidden,
/* 119 */ 				width: width
/* 120 */ 			};
/* 121 */ 			
/* 122 */ 			columns.push(th);
/* 123 */ 		});
/* 124 */ 		
/* 125 */ 		//definindo larguras dos elementos que nao foram definidos
/* 126 */ 		var nw = 0;
/* 127 */ 		if(somaW < totalW){ //so define o valor se ainda houver espaco disponivel
/* 128 */ 			nw = Math.floor((totalW - somaW)/nullW);
/* 129 */ 		}
/* 130 */ 		
/* 131 */ 		for(i=0; i<columns.length; i++){
/* 132 */ 			if(!columns[i].width){
/* 133 */ 				columns[i].width = nw;
/* 134 */ 			}
/* 135 */ 		}
/* 136 */ 		
/* 137 */ 		return columns;
/* 138 */ 	},
/* 139 */ 
/* 140 */ 	
/* 141 */ 	// Recarrega os dados da datatable buscando o resultado retornado da requisiçao feita pelo endereço
/* 142 */ 	// registrado na action do formulario */
/* 143 */ 	//Parametro para buscar os dados no omnigrid 
/* 144 */ 	dataProvider: function(list){

// aqui voce manda o json Jefferson
/* 145 */ 		return function(datagrid, param){
/* 146 */ 			var url 		= list.form.get('action')+"?"+list.form.toQueryString()+"&gaterp";
/* 147 */ 			

					var request 	= new Request.JSON({url:url, data:param});

/* 148 */ 			request.addEvent("complete", list.checkEmpty.bind(list) ) ;

/* 149 */ 			request.addEvent("complete", datagrid.onLoadData.bind(datagrid) ) ;



/* 150 */ 			request.get();

/* listing.js */

/* 151 */ 			list.formButtonsEnabled(null, false);
/* 152 */ 		};
/* 153 */ 	},
/* 154 */ 	
/* 155 */ 	
/* 156 */ 	//habilita ou desabilita os botoes do formulario
/* 157 */ 	formButtonsEnabled: function(evt, status){
/* 158 */ 		$$(this.form.getElements('input[name=edit]'),this.form.getElements('input[name=delete]'),this.form.getElements('input.selection')).each(function(el){
/* 159 */ 			if (!status) {
/* 160 */ 				el.setAttribute('disabled', !status);
/* 161 */ 				el.addClass('disabled');
/* 162 */ 			}else{
/* 163 */ 				el.removeProperty('disabled');
/* 164 */ 				el.removeClass('disabled');
/* 165 */ 			}
/* 166 */ 		});
/* 167 */ 	},
/* 168 */ 	
/* 169 */ 	
/* 170 */ 	/** Janelas **/
/* 171 */ 	// Abre uma nova janela no elemento pai
/* 172 */ 	openWindow: function(options){
/* 173 */ 		parent.MochaUI.openWindow(options);
/* 174 */ 	},
/* 175 */ 	
/* 176 */ 	//Abre janela com parametros padrão
/* 177 */ 	defaultWindow: function(id, options, el){
/* 178 */ 		var datagrid = this.datagrid;
/* 179 */ 		var opts = $extend({
/* 180 */ 			id: this.options.baseUrl+"/"+id,
/* 181 */ 	 		title: 'Gat Tecnologia ERP',
/* 182 */ 	 		onCloseComplete: function(){
/* 183 */ 				if(parent){
/* 184 */ 					datagrid.loadData();
/* 185 */ 				}
/* 186 */ 			}.bind(this)
/* 187 */ 	 	}, options);
/* 188 */ 		
/* 189 */ 		if (el) {
/* 190 */ 			//caso tenha sido definida a largura da janela
/* 191 */ 			var w = el.get('windowWidth');
/* 192 */ 			if (w!=null) {opts = $extend({width: w}, opts);}
/* 193 */ 			
/* 194 */ 			//caso tenha sido definida a altura da janela
/* 195 */ 			var h = el.get('windowHeight');
/* 196 */ 			if (h!=null) {opts = $extend({height: h}, opts);}
/* 197 */ 		}
/* 198 */ 		//abre janela com os parametros coletados
/* 199 */ 		this.openWindow(opts);
/* 200 */ 	},

/* listing.js */

/* 201 */ 	
/* 202 */ 	/** Funcoes Principais
/* 203 *| 	======================================*/
/* 204 */ 	//Instancia do Datagrid acessível
/* 205 */ 	datagrid: null,
/* 206 */ 	
/* 207 */ 	//Monta o Datagrid associando os eventos necessa¡rios
/* 208 */ 	mountDataGrid: function(){
/* 209 */ 		var list_control_height		= ($$('#list_control').length == 0)? 0 : $$('#list_control').getSize()[0].y; //recupera a altura da div de controle
/* 210 */ 		var table_form_height 		= ($$('.table_form').length == 0)? 0 : $$('.table_form').getSize()[0].y+3; //recupera a altura do formulario
/* 211 */ 		var pagination 				= true;
/* 212 */ 		
/* 213 */ 		//itens por pagina
/* 214 */ 		var pp						= $(parent.document.getElementById("listingPerPage"));	
/* 215 */ 		var perpage					= 14;
/* 216 */ 		perpage						= ((pp != undefined) && (parseInt(pp.get("rel")) > 0)) ? parseInt(pp.get("rel")) : perpage;
/* 217 */ 		
/* 218 */ 		if($$('#report_list').length > 0){
/* 219 */ 			pagination 	= false;
/* 220 */ 		}
/* 221 */ 		this.datagrid = new omniGrid(this.options.dgContainer, {
/* 222 */ 			columnModel: 			this.getColumnModel(),
/* 223 */ 			dataProvider:			this.dataProvider(this), //passando o objeto corrente para referencias internas dentro do omniGrid
/* 224 */ 			//url:					document.location + '/filter',
/* 225 */ 		    serverSort:				false,
/* 226 */ 		    sortHeader:				true,
/* 227 */ 		    resizeColumns:			false,
/* 228 */ 		    multipleSelection:		false,
/* 229 */ 			perPageOptions: 		[25,50,100,200],
/* 230 */ 	        perPage:				perpage,
/* 231 */ 	        page:					1,
/* 232 */ 	        pagination: 			pagination,
/* 233 */ 			height: 				window.getHeight() - list_control_height - table_form_height
/* 234 */ 		});
/* 235 */ 		
/* 236 */ 		/*vinculando duplos cliques em linhas com a funcao correspondente*/
/* 237 */ 		this.datagrid.addEvent('dblclick', this.onEditClick.bindWithEvent(this));
/* 238 */ 		this.datagrid.addEvent('click', this.formButtonsEnabled.bindWithEvent(this, true));
/* 239 */ 	},
/* 240 */ 	
/* 241 */ 	//Prepara o formulario para escutar os eventos
/* 242 */ 	prepareForm: function(){
/* 243 */ 		/* Associa um evento ao submit padrao do formulario*/
/* 244 */ 		this.form.each(function(el){
/* 245 */ 			el.addEvent('submit', this.onSubmit.bind(this));
/* 246 */ 		}, this);
/* 247 */ 		
/* 248 */ 		/* Definindo alvo do formulario */
/* 249 */ 		if(this.form.get("target")!=""){
/* 250 */ 			this.targetUrl = this.form.get("target");

/* listing.js */

/* 251 */ 		}
/* 252 */ 		
/* 253 */ 		/* Altera estilos de todos os botoes */
/* 254 */ 		this.form.getElements('input[name][type=button], input[name][type=submit]').each(function(el, i, obj){
/* 255 */ 			el.addClass('button');
/* 256 */ 		});
/* 257 */ 		this.form.getElements('input[name=search], input[name=pesquisar]').each(function(el, i, obj){
/* 258 */ 			el.addClass('search');
/* 259 */ 		});
/* 260 */ 		
/* 261 */ 		/* adiciona limpar filtro quando qualquer caractere é digitado no campo de filtro */
/* 262 */ 		this.form.getElements('input#search_text').each(function(el){
/* 263 */ 			el.addEvent('keyup', this.onSearchKeyUp.bind(this));
/* 264 */ 		}, this);
/* 265 */ 		
/* 266 */ 		
/* 267 */ 		/* Associa o evento de abrir janelas aos botoes contendo atributo "action".
/* 268 *| 		 * Abre uma nova Janela para o link apontado neste atributo */
/* 269 */ 		this.form.getElements('input[action]').each(function(el){
/* 270 */ 			el.addEvent('click', this.onActionClick.bind(this));
/* 271 */ 		}, this);
/* 272 */ 		
/* 273 */ 		this.form.getElements('input[name=add]').each(function(el){

/* 274 */ 			el.addClass('add');
/* 275 */ 			el.addEvent('click', this.onAddClick.bind(this));
/* 276 */ 		}, this);
/* 277 */ 		
/* 278 */ 		this.form.getElements('input[name=edit]').each(function(el){
/* 279 */ 			el.addClass('edit');
/* 280 */ 			el.addEvent('click', this.onEditClick.bind(this));
/* 281 */ 		}, this);
/* 282 */ 		this.form.getElements('input[name=view]').each(function(el){
/* 283 */ 			el.addClass('view');
/* 284 */ 			el.addEvent('click', this.onEditClick.bind(this));
/* 285 */ 		}, this);
/* 286 */ 		this.form.getElements('input[name=delete]').each(function(el){
/* 287 */ 			el.addClass('delete');
/* 288 */ 			el.addEvent('click', this.onDeleteClick.bind(this));
/* 289 */ 		}, this);
/* 290 */ 		
/* 291 */ 		this.form.getElements('.action_menu_trigger').each(function(el){
/* 292 */ 			//mostra o menu a partir do clique
/* 293 */ 			el.addEvent('click', this.onClickActionMenuTrigger.bind(this));
/* 294 */ 		}, this);
/* 295 */ 		
/* 296 */ 		document.addEvent('mouseup', this.onMouseupActionMenuTrigger.bind(this));
/* 297 */ 		
/* 298 */ 		//desabilitando botoes do formulario enquanto nao ha elemento selecionado
/* 299 */ 		this.formButtonsEnabled(null, false);
/* 300 */ 		

/* listing.js */

/* 301 */ 	},
/* 302 */ 	
/* 303 */ 	//Preenche formulario de Table form caso exista
/* 304 */ 	fillTableForm: function(value, key){
/* 305 */ 		var field = $$('input[name='+key+'], select[name='+key+']');
/* 306 */ 		if(field.length>0){
/* 307 */ 			var type = field[0].get("type");			//tipo do elemento
/* 308 */ 			if(type=="text" || type=="hidden"){
/* 309 */ 				if(field.hasClass('currency') == "true") { value = value.replace(".", ","); }
/* 310 */ 				field.set('value', value);
/* 311 */ 			} else if(type=="radio"){
/* 312 */ 				var parent = field[0].getParent("span");	//pai do elemento
/* 313 */ 				//tenta recuperar o campo pelo valor
/* 314 */ 				var f = parent.getElements('[value*='+value+']');
/* 315 */ 				if(f.length>0){
/* 316 */ 					f.set('checked', true);
/* 317 */ 				} else {
/* 318 */ 					f = parent.getElements('[text*='+value+'] input');
/* 319 */ 					if(f.length>0){
/* 320 */ 						f.set('checked', true);
/* 321 */ 					}
/* 322 */ 				}
/* 323 */ 				jQuery(f).click();
/* 324 */ 			} else if(type=="checkbox"){
/* 325 */ 				field.set('checked', value=='1');
/* 326 */ 			//Pode ser um select
/* 327 */ 			} else if(field.get('tag')=="select") {
/* 328 */ 				//seleciona o filho cujo valor eh igual ao item na lista
/* 329 */ 				var opt = field[0].getChildren('option[value='+value+']');
/* 330 */ 				if(opt.length>0){
/* 331 */ 					opt.set('selected', true);
/* 332 */ 				//seleciona o primeiro elemento
/* 333 */ 				}else{
/* 334 */ 					field[0].getElement('option').set('selected',true);
/* 335 */ 				}
/* 336 */ 			}
/* 337 */ 			
/* 338 */ 		}
/* 339 */ 		//campos multisuggest
/* 340 */ 		else{
/* 341 */ 			field = $$('input.multisuggest[ref='+key+']');
/* 342 */ 			//multisuggest jquery fill
/* 343 */ 			if(field.length>0 && jQuery){
/* 344 */ 				field.set('value', value);
/* 345 */ 				jQuery(field).trigger("fill"); 
/* 346 */ 			}
/* 347 */ 		}
/* 348 */ 		
/* 349 */ 		//dispara o evento change do elemento
/* 350 */ 		if (field.length > 0)

/* listing.js */

/* 351 */ 			field[0].fireEvent('change');
/* 352 */ 		if(jQuery){
/* 353 */ 			jQuery(field).trigger("change"); 
/* 354 */ 		}
/* 355 */ 	},
/* 356 */ 	
/* 357 */ 	//extrai filtro de relatorio a partir dos dados na listagem
/* 358 */ 	extractReportFilter: function(dados){
/* 359 */ 		var filtro = dados.filtro;
/* 360 */ 		var f = filtro.replace(/\\"/g ,'"').replace(/"{/g,"{").replace(/}"/g,"}").replace(/}"/g,"}").replace(/\[{/g,"'[{").replace(/}]/g,"}]'");
/* 361 */ 		f = eval('['+f+']');
/* 362 */ 		return f[0];
/* 363 */ 	},
/* 364 */ 
/* 365 */ 	//Preenche formulario de Report form caso exista
/* 366 */ 	fillReportForm: function(dados){
/* 367 */ 		var f = this.extractReportFilter(dados);
/* 368 */ 		f.id = dados.id;
/* 369 */ 		$each(f, this.fillTableForm);
/* 370 */ 	},
/* 371 */ 	
/* 372 */ 	/** Eventos
/* 373 *| 	======================================*/
/* 374 */ 	
/* 375 */ 	//executado quando o formulario é postado
/* 376 */ 	onSubmit: function(evt){
/* 377 */ 		var dbg = eval(evt.target.get('debug'));
/* 378 */ 		if (!dbg) {
/* 379 */ 			new Event(evt).stop();
/* 380 */ 			this.datagrid.loadData();
/* 381 */ 		}
/* 382 */ 	},
/* 383 */ 
/* 384 */ 	/*
/* 385 *| 	 * Executado ao digitar qualquer caractere no campo de filtro 
/* 386 *| 	 */
/* 387 */ 	onSearchKeyUp: function(evt){
/* 388 */ 		var $this 	= evt.target;
/* 389 */ 		var p 		= evt.target.getParent();
/* 390 */ 		var val		= $this.get('value');
/* 391 */ 		var clearEl = $$('span#search_clear');
/* 392 */ 		
/* 393 */ 		//se algo foi digitado
/* 394 */ 		if(val.length > 0){
/* 395 */ 			//verifica por elemento "limpar"
/* 396 */ 			if(clearEl.length > 0){
/* 397 */ 				clearEl[0].setStyle('display', 'block');
/* 398 */ 			}else{
/* 399 */ 				clearEl	= new Element('span');
/* 400 */ 				clearEl.set('id', 'search_clear');

/* listing.js */

/* 401 */ 				clearEl.addEvent('click', (function(evt){
/* 402 */ 					evt.target.setStyle('display', 'none');
/* 403 */ 					$this.set('value', '');
/* 404 */ 					$this.focus();
/* 405 */ 					this.datagrid.loadData();
/* 406 */ 				}).bind(this));
/* 407 */ 				p.grab(clearEl);
/* 408 */ 			}
/* 409 */ 		}else{
/* 410 */ 			//verifica elemento "limpar"
/* 411 */ 			if(clearEl.length > 0){
/* 412 */ 				//oculta elemento "limpar"
/* 413 */ 				clearEl[0].setStyle('display', 'none');
/* 414 */ 			}
/* 415 */ 		}
/* 416 */ 	},
/* 417 */ 	
/* 418 */ 	//Evento carregado ao clicar em um input que possui "action"
/* 419 */ 	onActionClick: function(evt){
/* 420 */ 		var url = evt.target.get('action');
/* 421 */ 		//se flag de id estiver setada, utiliza id do elemento selecionado no link
/* 422 */ 		var indice = this.datagrid.getSelectedIndices();
/* 423 */ 		if(evt.target.get('useId') != null && indice != "" && indice != null ){
/* 424 */ 			url += '/'+this.datagrid.getDataByRow(indice).id;
/* 425 */ 		}
/* 426 */ 		// Se está usando "useId" mas não há elemento selecionado, não abre janela
/* 427 */ 		else if (evt.target.get('useId') != null) {
/* 428 */ 			return;
/* 429 */ 		}
/* 430 */ 		this.defaultWindow(evt.target.id, {
/* 431 */ 	 		title: evt.target.get('windowName'),
/* 432 */ 	 		contentURL: url
/* 433 */ 	 	});
/* 434 */ 	},
/* 435 */ 	//Evento carregado ao clicar em um input que possui "action"
/* 436 */ 	onClickActionMenuTrigger: function(evt){
/* 437 */ 		
/* 438 */ 		var $this 		=  evt.target;
/* 439 */ 		var wasVisible 	= $this.get('clicked');
/* 440 */ 		$this.erase('clicked');
/* 441 */ 		$$(".action_menu_trigger").removeClass("clicked");
/* 442 */ 		$$(".action_menu").removeClass('visible');
/* 443 */ 		
/* 444 */ 		if(!wasVisible){
/* 445 */ 			$this.getNext(".action_menu").addClass('visible');
/* 446 */ 			$this.addClass("clicked");
/* 447 */ 		}
/* 448 */ 	},
/* 449 */ 	onMouseupActionMenuTrigger: function(evt){
/* 450 */ 		var target = evt.target; 

/* listing.js */

/* 451 */ 		//controle de cliques
/* 452 */ 		if(target.hasClass("action_menu_trigger") && target.hasClass('clicked')) {
/* 453 */ 			$$(".action_menu_trigger").set('clicked', true);
/* 454 */ 		}
/* 455 */ 		
/* 456 */ 		//esconde o menu
/* 457 */ 		if(!target.hasClass("action_menu")) {
/* 458 */ 			$$(".action_menu_trigger").removeClass("clicked");
/* 459 */ 			$$(".action_menu").removeClass('visible');
/* 460 */ 		}
/* 461 */ 	},
/* 462 */ 	
/* 463 */ 	//Executado ao clicar no botao Add
/* 464 */ 	onAddClick: function (evt){
/* 465 */ 		this.defaultWindow('form', {
/* 466 */ 	 		title: evt.target.get('windowName'),
/* 467 */ 	 		contentURL: this.url(this.targetUrl)
/* 468 */ 	 	}, evt.target);

/* 469 */ 	},
/* 470 */ 	
/* 471 */ 	//Metodo executado ao clicar no botao edit ou duploclique em uma linha da datatable
/* 472 */ 	onEditClick: function(evt){
/* 473 */ 		//Abre a Janela apenas se algum elemento estiver selecionado
/* 474 */ 		var indice = this.datagrid.getSelectedIndices();
/* 475 */ 		if (indice != "" && indice != null) {
/* 476 */ 			//vai para a url definida sem abrir janelas
/* 477 */ 			if(this.dt.get('goto') != null){
/* 478 */ 				window.location = this.url(this.dt.get('goto'))+ '/'+this.datagrid.getDataByRow(indice).id;
/* 479 */ 			}
/* 480 */ 			//abre janela do formulario
/* 481 */ 			else{
/* 482 */ 				if(this.dt.get('windowName') != null){
/* 483 */ 					var title = this.dt.get('windowName');
/* 484 */ 					var col = this.datagrid.getDataByRow(indice)[title];
/* 485 */ 					if(col){
/* 486 */ 						title = col;
/* 487 */ 					}
/* 488 */ 					//abre janela
/* 489 */ 					this.defaultWindow('form',{
/* 490 */ 				 		title: title,
/* 491 */ 				 		contentURL: this.url(this.targetUrl)+ '/'+this.datagrid.getDataByRow(indice).id
/* 492 */ 				 	});
/* 493 */ 				} else {
/* 494 */ 					// Reseta validação do form
/* 495 */ 					$$('#form')[0].reset();
/* 496 */ 					
/* 497 */ 					// Se for formulario de relatorio, envia filtros
/* 498 */ 					if(this.dt.get('report') != null){
/* 499 */ 						this.fillReportForm(this.datagrid.getDataByRow(indice));
/* 500 */ 					}

/* listing.js */

/* 501 */ 					// Caso contrario itera sobre cada input, preenchendo o valor / Table Form
/* 502 */ 					else{
/* 503 */ 						$each(this.datagrid.getDataByRow(indice), this.fillTableForm);
/* 504 */ 					}
/* 505 */ 					
/* 506 */ 					//coloca o foco sobre o primeiro elemento
/* 507 */ 					$$('#form')[0].getElement("input, select, radio, checkbox").focus();
/* 508 */ 					
/* 509 */ 					//Evento final customizavel
/* 510 */ 					this.dt.fireEvent("editClick");
/* 511 */ 				}
/* 512 */ 			}
/* 513 */ 		}
/* 514 */ 	},
/* 515 */ 	
/* 516 */ 	//Metodo executado ao clicar no botao delete ou duploclique em uma linha da datatable
/* 517 */ 	onDeleteClick: function(evt){
/* 518 */ 		var dbg = eval(evt.target.get('debug'));
/* 519 */ 		var list = this;
/* 520 */ 		var datagrid = this.datagrid;
/* 521 */ 		//Efetua aÃ§Ã£o apenas se algum elemento estiver selecionado
/* 522 */ 		var indice = datagrid.getSelectedIndices(); 
/* 523 */ 		if (indice != "" && indice != null) {
/* 524 */ 			//realiza teste antes da confirmacao de deleção
/* 525 */ 			if(this.onBeforeDeleteRow(datagrid.getDataByRow(indice))===false) return;
/* 526 */ 			//Mostra alerta de Confirmação
/* 527 */ 			if (evt.target.get('confirm')) {
/* 528 */ 				confirmation(evt.target.get('confirm'), {
/* 529 */ 					onComplete: function(val) {
/* 530 */ 						if (val) {
/* 531 */ 							var id = datagrid.getDataByRow(indice).id;
/* 532 */ 							var url = this.url(this.deleteUrl) + '/' + id;
/* 533 */ 							if (!dbg) {
/* 534 */ 								var myRequest = new Request({
/* 535 */ 									url: url,
/* 536 */ 									onSuccess: function(text, xml){
/* 537 */ 										parent.MochaUI.success(text);
/* 538 */ 										//realiza teste antes da confirmacao de deleção
/* 539 */ 										list.onAfterDeleteRow(datagrid.getDataByRow(indice));
/* 540 */ 										datagrid.loadData();
/* 541 */ 									},
/* 542 */ 									onFailure: function(XMLHttpRequest){
/* 543 */ 										Sexy.alert(XMLHttpRequest.responseText);
/* 544 */ 									}
/* 545 */ 								}).send();
/* 546 */ 							}else{
/* 547 */ 								window.location=url;
/* 548 */ 							}
/* 549 */ 						}
/* 550 */ 					}.bind(this)

/* listing.js */

/* 551 */ 				});
/* 552 */ 			}
/* 553 */ 			//Abre a Janela
/* 554 */ 			else {
/* 555 */ 				this.defaultWindow('delete', {
/* 556 */ 					title: evt.target.get('windowName'),
/* 557 */ 					contentURL: this.url(this.deleteUrl) + '/' + this.datagrid.getDataByRow(indice).id,
/* 558 */ 					height: 200
/* 559 */ 				});
/* 560 */ 			}
/* 561 */ 		}
/* 562 */ 	},
/* 563 */ 	
/* 564 */ 	
/* 565 */ 	/* 
/* 566 *| 	 * Metodo abstrato executado sempre antes da mensagem de confirmacao de deleção na listagem
/* 567 *| 	 * Recebe a linha selecionada como parametro
/* 568 *| 	 * Deve retornar false para impedir mensagem e tentativa de deleção do item
/* 569 *| 	 * 
/* 570 *| 	 * ATENÇÃO: metodos ajax nao funcionarão dentro deste metodo
/* 571 *| 	 */
/* 572 */ 	onBeforeDeleteRow: function(row){
/* 573 */ 		return true;
/* 574 */ 	},
/* 575 */ 	
/* 576 */ 	/* 
/* 577 *| 	 * Metodo abstrato executado sempre após a execução do procedimento de delete
/* 578 *| 	 */
/* 579 */ 	onAfterDeleteRow: function(row){
/* 580 */ 		return true;
/* 581 */ 	},
/* 582 */ 	
/* 583 */ 	/*
/* 584 *| 	 * Verifica se listagem está vazia 
/* 585 *| 	 */
/* 586 */ 	checkEmpty: function(data){
/* 587 */ 		var dtVisible 	= (this.emptyList.getStyle("display") != "block");
/* 588 */ 		var add_btn 	= this.form.getFirst('.add')[0];
/* 589 */ 		var search_btn 	= this.form.getElement('#search_text')[0];
/* 590 */ 		var s_avanc_btn = this.form.getElement('#pesquisa_avancada')[0];
/* 591 */ 		
/* 592 */ 		//Esconde Tips
/* 593 */ 		jQuery(".infotip").btOff(); //desliga tips
/* 594 */ 		
/* 595 */ 		if(!data.total || data.total==0){
/* 596 */ 			//exibe msg de lista vazia
/* 597 */ 			this.emptyList.setStyle('display', 'block');
/* 598 */ 			
/* 599 */ 			//exibe tips para criar novo
/* 600 */ 			//jQuery.bt.options.clickAnywhereToClose = false;

/* listing.js */

/* 601 */ 			jQuery.bt.options.spikeLength			= 5;
/* 602 */ 			jQuery.bt.options.shadow				= true;
/* 603 */ 		    jQuery.bt.options.shadowOffsetX			= 0;
/* 604 */ 		    jQuery.bt.options.shadowOffsetY			= 1;
/* 605 */ 		    jQuery.bt.options.shadowBlur			= 2;
/* 606 */ 		    jQuery.bt.options.shadowColor			= "#999";
/* 607 */ 			
/* 608 */ 			//Tips para filtro avancado
/* 609 */ 			if(s_avanc_btn && !s_avanc_btn.hasClass('infotip')){
/* 610 */ 				s_avanc_btn.addClass('infotip info-bottom info-trigger-none');
/* 611 */ 				s_avanc_btn.set('title', this.emptyList.get('adv_search_btn_title'));
/* 612 */ 				jQuery(s_avanc_btn).mouseover().btOff();
/* 613 */ 			}
/* 614 */ 			
/* 615 */ 			//Tips para filtrar resultados
/* 616 */ 			if(search_btn && !search_btn.hasClass('infotip')){
/* 617 */ 				search_btn.addClass('infotip info-bottom info-trigger-none');
/* 618 */ 				search_btn.set('title', this.emptyList.get('search_btn_title'));
/* 619 */ 				jQuery.bt.options.centerPointX			= 0.6;
/* 620 */ 				jQuery(search_btn).mouseover().btOff();
/* 621 */ 			}
/* 622 */ 			
/* 623 */ 			//Tips para botao de adicionar
/* 624 */ 			if(add_btn && !add_btn.hasClass('infotip')){
/* 625 */ 				add_btn.addClass('infotip info-bottom info-trigger-none');
/* 626 */ 				add_btn.set('title', this.emptyList.get('add_btn_title'));
/* 627 */ 				jQuery.bt.options.centerPointX			= 0.154;
/* 628 */ 				jQuery(add_btn).mouseover().btOff();
/* 629 */ 			}
/* 630 */ 			
/* 631 */ 			//Esconde ao clicar nos botoes
/* 632 */ 			if(add_btn || search_btn || s_avanc_btn){
/* 633 */ 				jQuery(".button").click(function(){jQuery(".infotip").btOff();}); //desliga tips quando clicar
/* 634 */ 			}
/* 635 */ 			
/* 636 */ 			//Exibe tips
/* 637 */ 			if(s_avanc_btn && s_avanc_btn.hasClass('ativo')){
/* 638 */ 				jQuery(s_avanc_btn).btOn();
/* 639 */ 			}else if(search_btn && search_btn.get('value') != ""){
							jQuery(search_btn).btOn();
/* 641 */ 			}else{
	
/* 642 */ 				jQuery(add_btn).btOn();
/* 643 */ 			}
/* 644 */ 			
/* 645 */ 		}else{

/* 646 */ 			this.emptyList.setStyle('display', 'none');
/* 647 */ 		}
/* 648 */ 	}
/* 649 */ 		
/* 650 */ });

/* listing.js */

/* 651 */ 
/* 652 */ 
/* 653 */ /**
/* 654 *|  * Classe para navegação no DataGrid via Teclado
/* 655 *|  ************************************************/
/* 656 */ var KeyListening = new Class({ 
/* 657 */ 	Implements: [Events,Options],
/* 658 */ 
/* 659 */ 	getOptions: function(){
/* 660 */ 		return {
/* 661 */ 			deleteElement: 		"input[name=delete]",		//elemento padrao para o "delete"
/* 662 */ 			busca: 	"f3"		//contem o seletor do formulario de filtro
/* 663 */ 		};
/* 664 */ 	},
/* 665 */ 	
/* 666 */ 	/** Construtora 
/* 667 *| 	 =====================================*/ 
/* 668 */ 	initialize: function(options){
/* 669 */ 		//seta as opcoes
/* 670 */ 		this.setOptions(this.getOptions(), options);
/* 671 */ 		
/* 672 */ 		//seleciona elementos principais
/* 673 */ 		this.dt					= $$("#list_control")[0]; 						//datatable
/* 674 */ 		this.triggers			= this.dt.getElements("input:not([type=text])");					//elementos de gatilho para a selecao
/* 675 */ 		this.bDiv 				= list.datagrid.container.getElement('.bDiv');	//elemento com scroller
/* 676 */ 		
/* 677 */ 		//gera listeners de eventos
/* 678 */ 		this.createListeners();
/* 679 */ 	},
/* 680 */ 	
/* 681 */ 	//Cria os listeners de eventos do documento e do datagrid
/* 682 */ 	createListeners: function(){
/* 683 */ 		list.datagrid.addEvent("loaddata", this.getFocus.bindWithEvent(this)); 		//executa ao carregar os dados
/* 684 */ 		list.datagrid.addEvent('click', this.onSelect.bindWithEvent(this)); 		//executa ao selecionar um item
/* 685 */ 		this.triggers.addEvent('keydown', this.onKeyAction.bindWithEvent(this));	//executa ao acionar uma tecla
/* 686 */ 		this.bDiv.addEvent('click', this.getFocus.bind(this));									//ao clicar na lista
/* 687 */ 		//troca o foco se sob o btn "pesquisar"
/* 688 */ 		var pesquisar = this.dt.getElement("input[type=submit][name=pesquisar]");
/* 689 */ 		if(pesquisar) pesquisar.addEvent('focus', this.getNextFocus.bindWithEvent(this));
/* 690 */ 	},
/* 691 */ 	
/* 692 */ 	//coloca o foco no primeiro input do documento
/* 693 */ 	getFocus: function(evt){
/* 694 */ 		var input = this.dt.getElement("input:not([disabled])");
/* 695 */ 		if(input) input.focus();
/* 696 */ 	},
/* 697 */ 	
/* 698 */ 	//coloca o foco no proximo elemento
/* 699 */ 	getNextFocus: function(evt){
/* 700 */ 		$(evt.target).getNext().focus();

/* listing.js */

/* 701 */ 	},
/* 702 */ 	
/* 703 */ 	//evento acionado ao selecionar um item da lista
/* 704 */ 	onSelect: function(evt){
/* 705 */ 		
/* 706 */ 		//Realiza o scroll da janela para exibir o item
/* 707 */ 		if(evt.element){
/* 708 */ 			//coletando dados dos elementos
/* 709 */ 			var $el				= $$(evt.element)[0];
/* 710 */ 			var position 		= $el.getPosition(this.bDiv).y;
/* 711 */ 			var elHeight		= $el.getHeight();
/* 712 */ 			var bDivHeight 		= this.bDiv.getHeight();
/* 713 */ 			var bDivScroll 		= this.bDiv.getScroll().y;
/* 714 */ 				
/* 715 */ 			/*se a posicao do elemento for maior que a altura do bDiv, 
/* 716 *| 			aumenta o scroll em posicao + altura do elemento - altura da div*/
/* 717 */ 			if(position > bDivScroll + bDivHeight - elHeight){
/* 718 */ 				this.bDiv.scrollTo(0, position + elHeight - bDivHeight);
/* 719 */ 			}
/* 720 */ 			//se a posicao for menor, coloca o elemento no topo
/* 721 */ 			else if(position < bDivScroll){
/* 722 */ 				this.bDiv.scrollTo(0, position);
/* 723 */ 			}
/* 724 */ 		}
/* 725 */ 		
/* 726 */ 		//coloca o foco em algum trigger
/* 727 */ 		this.getFocus();
/* 728 */ 	},
/* 729 */ 	
/* 730 */ 	//Eventos acionados pelas teclas
/* 731 */ 	onKeyAction: function(evt){
/* 732 */ 		var $k 		= evt.key;
/* 733 */ 		var sel 	= list.datagrid.getSelectedIndices();
/* 734 */ 		var max 	= list.datagrid.elements.length-1;
/* 735 */ 		var hasSel 	= (sel != "" && sel != null);
/* 736 */ 		switch ($k) {
/* 737 */ 			case "up":
/* 738 */ 				evt.stop();
/* 739 */ 				sel = (sel > 0 && hasSel) ? --sel : 0;
/* 740 */ 				list.datagrid.setSelectedIndices([sel]);
/* 741 */ 				break;
/* 742 */ 			case "down":
/* 743 */ 				evt.stop();
/* 744 */ 				sel = (sel < max && hasSel) ? ++sel : (hasSel) ? max : 0;
/* 745 */ 				list.datagrid.setSelectedIndices([sel]);
/* 746 */ 				break;
/* 747 */ 			case "left":
/* 748 */ 				evt.stop();
/* 749 */ 				list.datagrid.prevPage();
/* 750 */ 				break;

/* listing.js */

/* 751 */ 			case "right":
/* 752 */ 				evt.stop();
/* 753 */ 				list.datagrid.nextPage();
/* 754 */ 				break;
/* 755 */ 			case "enter":
/* 756 */ 				if(hasSel){
/* 757 */ 					evt.stop();
/* 758 */ 					list.onEditClick();
/* 759 */ 				}
/* 760 */ 				break;
/* 761 */ 		}
/* 762 */ 	}
/* 763 */ });
/* 764 */ 
/* 765 */ /** INICIALIZAÇÃO **/
/* 766 */ //AO IMPORTAR ARQUIVO JÁ EXECUTA O SCRIPT
/* 767 */ window.addEvent("domready", function(){
/* 768 */ 	list 		= new Listing();
/* 769 */ 	keysList 	= new KeyListening();
/* 770 */ });
/* 771 */ 
/* 772 */ 
/* 773 */ 
