
/* readonly.js */

/* 1  */ (function($) {
/* 2  */ 	$.fn.extend({
/* 3  */ 		/**
/* 4  *| 		 * Transforma select em input readonly
/* 5  *| 		 * @author Glucas
/* 6  *| 		 * @since 10/08/2011
/* 7  *| 		 */
/* 8  */ 		setReadonly: function(){
/* 9  */ 			return this.each(function(){
/* 10 */ 				var $this = $(this);
/* 11 */ 				//Valida campo e flag do evento
/* 12 */ 				if(!$this.is("select") || $.data($this.get(0),"evt_selectreadonly")) return;
/* 13 */ 				$.data($this.get(0),"evt_selectreadonly", true);
/* 14 */ 				//seleciona o span onde o select esta
/* 15 */ 				var parent = $this.parent();
/* 16 */ 				//testando se tipo do campo é select
/* 17 */ 				//verificando flag
/* 18 */ 				//pega o valor do texto da option selecionada
/* 19 */ 				var textValue = $this.find("option:selected").text();
/* 20 */ 				//cria um input readonly com os dados do select 
/* 21 */ 				var input = $("<input/>");
/* 22 */ 				$(input).attr('id',$this.attr('id')+"_readonly");
/* 23 */ 				$(input).attr('type','text');
/* 24 */ 				$(input).attr('value',textValue);
/* 25 */ 				$(input).attr('readonly','readonly');
/* 26 */ 				//coloca o input junto ao select 
/* 27 */ 				$(parent).append(input);
/* 28 */ 				//oculta o select 
/* 29 */ 				$this.hide();
/* 30 */ 			});
/* 31 */ 		},
/* 32 */ 		
/* 33 */ 		removeReadonly: function(){
/* 34 */ 			return this.each(function(){
/* 35 */ 				var $this = $(this);
/* 36 */ 				var parent = $this.parent();
/* 37 */ 				var textValue = $this.find("option:selected").text();
/* 38 */ 				//Remove flag do evento
/* 39 */ 				$.data($this.get(0),"evt_selectreadonly", false);
/* 40 */ 				//remove o input readonly
/* 41 */ 				$(parent).find('input').remove();
/* 42 */ 				//mostra o select
/* 43 */ 				$this.show();
/* 44 */ 			});
/* 45 */ 		}
/* 46 */ 	});
/* 47 */ 	
/* 48 */ })(jQuery);
