
/* listing.js */

/* 1  */ /**
/* 2  *|  * Script jQuery para listagens
/* 3  *|  */
/* 4  */ jQuery.noConflict();
/* 5  */ (function($) {
/* 6  */ 	
/* 7  */ 	//Troca o label do filtro avancado para o status ativo e vice-versa
/* 8  */ 	function toggleFiltroAvancadoLabel(){
/* 9  */ 		$this = $("#pesquisa_avancada");
/* 10 */ 		var v = $this.val();
/* 11 */ 		var v_aux = $this.attr("aux_value");
/* 12 */ 		$this.val(v_aux);
/* 13 */ 		$this.attr("aux_value", v);
/* 14 */ 	}
/* 15 */ 	
/* 16 */ 	
/* 17 */ 	//Desabilitar campos do filtro avançado
/* 18 */ 	function toggleFiltroFields(status){
/* 19 */ 		var filtro_ativo = $("#modal_filter #filtro_avancado_ativo");
/* 20 */ 		$("#modal_filter").find("input:not([type=submit]), select, textarea").each(function(i, el){
/* 21 */ 			var $this 	= $(el);
/* 22 */ 			if(status){
/* 23 */ 				var wasEnabled = $this.data("wasEnabled");
/* 24 */ 				$this.removeData("wasEnabled");
/* 25 */ 				if(wasEnabled){
/* 26 */ 					$this.removeAttr("disabled");
/* 27 */ 				}
/* 28 */ 				//ativando filtro ativo
/* 29 */ 				filtro_ativo.removeAttr("disabled");
/* 30 */ 			}else{
/* 31 */ 				var enabled = !($this.attr("disabled"));
/* 32 */ 				if(enabled){
/* 33 */ 					$this.data("wasEnabled", "true");
/* 34 */ 					$this.attr("disabled", "disabled");
/* 35 */ 				}
/* 36 */ 				//desativando filtro ativo
/* 37 */ 				filtro_ativo.attr("disabled", "disabled");
/* 38 */ 			}
/* 39 */ 		});
/* 40 */ 	}
/* 41 */ 	
/* 42 */ 	
/* 43 */ 	$(document).ready(function(){
/* 44 */ 		
/* 45 */ 		toggleFiltroFields(false); //desabilita
/* 46 */ 		
/* 47 */ 		$("#pesquisa_avancada").click(function(){
/* 48 */ 			$("#modal_filter").show();
/* 49 */ 			if(!$(this).hasClass("ativo")){
/* 50 */ 				toggleFiltroAvancadoLabel();

/* listing.js */

/* 51 */ 				$(this).addClass("ativo");
/* 52 */ 				toggleFiltroFields(true); //habilita
/* 53 */ 			}
/* 54 */ 		});
/* 55 */ 		
/* 56 */ 		$("#clean_button").click(function(){
/* 57 */ 			//resetando filtro mantendo texto do filtro simples
/* 58 */ 			var simple_filter = $("#search_text").val();
/* 59 */ 			$("#filter").get(0).reset();
/* 60 */ 			$("#search_text").val(simple_filter);
/* 61 */ 			
/* 62 */ 			$("#pesquisa_avancada").removeClass("ativo");
/* 63 */ 			toggleFiltroAvancadoLabel();
/* 64 */ 			toggleFiltroFields(false); //desabilita
/* 65 */ 			$("#filter").removeData('filter_applied');
/* 66 */ 
/* 67 */ 			// Passa em cada select, retornando para o estado inicial e ativando "click"
/* 68 */ 			$('.modal_filter_form input[type=radio]').each(function () {
/* 69 */ 				if ($(this).val() == $(this).attr('eval'))
/* 70 */ 					$(this).attr('checked','checked').click();
/* 71 */ 				else
/* 72 */ 					$(this).removeAttr('selected');
/* 73 */ 			});
/* 74 */ 
/* 75 */ 			// Limpa itens de multisuggest
/* 76 */ 			$('.multisuggest_item').remove();
/* 77 */ 		});
/* 78 */ 		
/* 79 */ 		$(".close").click(function(){
/* 80 */ 			$("#modal_filter").hide();
/* 81 */ 			if (!$("#filter").data('filter_applied')) {
/* 82 */ 				$("#pesquisa_avancada").removeClass("ativo");
/* 83 */ 				toggleFiltroFields(false);
/* 84 */ 			}
/* 85 */ 		});
/* 86 */ 		
/* 87 */ 		$("#filter").submit(function(evt){
/* 88 */ 			$("#modal_filter").hide();
/* 89 */ 			if($("#pesquisa_avancada").hasClass("ativo")){
/* 90 */ 				$(this).data('filter_applied',true);
/* 91 */ 				toggleFiltroFields(true);
/* 92 */ 			}
/* 93 */ 		});
/* 94 */ 		
/* 95 */ 	});
/* 96 */ })(jQuery);
