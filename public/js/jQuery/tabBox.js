
/* tabBox.js */

/* 1  */ 
/* 2  */ 
/* 3  */ /**
/* 4  *|  * Plugin Jquery para criação de abas
/* 5  *|  * Dependencies:
/* 6  *|  * jQuery 1.2.6 (www.jquery.com)
/* 7  *|  * 
/* 8  *|  * @author Bruno Barbosa <bruno@gattecnologia.com.br>
/* 9  *|  */
/* 10 */ (function($){
/* 11 */ 	$.fn.extend({
/* 12 */ 		tabBox: function(options){
/* 13 */ 			// Plugin Defaults ***************************************************************
/* 14 */ 		    var defaults = {
/* 15 */ 		    		navClass: 		".tab_selector",	//Classe do container de navegacao
/* 16 */ 		    		tabClass: 		".tab_box_content",	//Classe do container de conteudos das abas
/* 17 */ 		    		activeClass: 	"tab_sel_ativa",	//Classe do container de conteudos das abas
/* 18 */ 		   			nil: 		null
/* 19 */ 		    };
/* 20 */ 			var o 				= $.extend(defaults, options);
/* 21 */ 			var parent 			= $(this); 			// Elemento Pai
/* 22 */ 			var nav 			= parent.find(o.navClass);
/* 23 */ 			var navItens		= nav.children();
/* 24 */ 			var content 		= parent.find(o.tabClass);
/* 25 */ 			var contentItens	= content.children();
/* 26 */ 			
/* 27 */ 			var m = {
/* 28 */ 				
/* 29 */ 				/** Cria as abas 
/* 30 *| 				 ************************************/
/* 31 */ 				createTabs: function(){
/* 32 */ 					//ativa os primeiros
/* 33 */ 					var f = navItens.first().addClass(o.activeClass);
/* 34 */ 					content.find("."+f.find("a").attr("rel")).addClass(o.activeClass);
/* 35 */ 					//evento de clique
/* 36 */ 					navItens.click(m.activateTab);
/* 37 */ 				},
/* 38 */ 				
/* 39 */ 				/** Ativa uma aba ao clicar no nav correspondente
/* 40 *| 				 * ***********************************************/
/* 41 */ 				activateTab: function(evt){
/* 42 */ 					var $this 	= $(this);
/* 43 */ 					var $tab	= content.find("."+$this.find("a").attr("rel"));
/* 44 */ 					
/* 45 */ 					if(!$this.is("."+o.activeClass)){
/* 46 */ 						parent.find("."+o.activeClass).removeClass(o.activeClass);
/* 47 */ 						$this.addClass(o.activeClass);
/* 48 */ 						$tab.addClass(o.activeClass);
/* 49 */ 						
/* 50 */ 						$this.trigger("activate", $tab);

/* tabBox.js */

/* 51 */ 					}
/* 52 */ 				}
/* 53 */ 				
/* 54 */ 			};
/* 55 */ 			
/* 56 */ 			// Inicializando abas
/* 57 */ 			m.createTabs();
/* 58 */ 		}
/* 59 */ 	});
/* 60 */ })(jQuery);
/* 61 */ 
