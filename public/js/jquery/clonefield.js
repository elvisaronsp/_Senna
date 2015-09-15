
/* clonefield.js */

/* 1   */ /**
/* 2   *|  * Plugin Jquery para duplicação de elementos DOM.
/* 3   *|  * Dependencies:
/* 4   *|  * jQuery 1.2.6 (www.jquery.com)
/* 5   *|  * 
/* 6   *|  * @author Guilherme Schuab
/* 7   *|  * 
/* 8   *|  * OBS:
/* 9   *|  * - Evento deve estar vinculado a um botao.
/* 10  *|  */
/* 11  */ 
/* 12  */ (function($){
/* 13  */ 	$.fn.extend({
/* 14  */ 		/**
/* 15  *| 		 * Plugin CLONE
/* 16  *| 		 * @param {Object} options
/* 17  *| 		 */
/* 18  */ 		cloneField: function(options){
/* 19  */ 			var $this = $('#'+this.attr("rel"));
/* 20  */ 			
/* 21  */ 			// Plugin Defaults ***************************************************************
/* 22  */ 	        var defaults = {
/* 23  */ 	            removeEl: '<span>REMOVER</span>',			// elemento inserido para remoção (ação de remoção)
/* 24  */ 	            removeClass: 'removeClone',					// classe do elemento de remoção
/* 25  */ 	            updateElemens: 'input, select, textarea',	// elementos a terem os valores atualizados
/* 26  */ 	            cloneIdClass: '.clone_id',					// nome da classe que identifica o id do elemento clonavel
/* 27  */ 	            cloneReadOnlyClass: '.clone_readonly',		// nome da classe do elemento que permite ou nao a edicao do clone
/* 28  */             	removeLabel: 'Remover'						// label para o botão remover
/* 29  */ 	        };
/* 30  */ 	
/* 31  */ 	        var o = $.extend(defaults, options);
/* 32  */ 	        
/* 33  */ 	        //métodos
/* 34  */ 	        var m = {
/* 35  */ 	        	showNextClonedField: function(el){
/* 36  */ 	        		var $el = $(el).parent().find('div.hiddenClone:first'); 
/* 37  */ 	        		$el.removeClass('hiddenClone');
/* 38  */ 	        		m.toggleRequired($el, true);
/* 39  */ 	        		//evento do usuario
/* 40  */ 	        		$this.trigger('onShowClone', [$el]);
/* 41  */ 	        	},
/* 42  */ 	        	
/* 43  */ 	        	//esconde nao preenchidos/excluidos
/* 44  */ 	        	hideClonedField: function(el){
/* 45  */ 	        		var $el = $(el);
/* 46  */ 	        		m.flagUpdate($el);
/* 47  */ 	        		m.clearCloneFields($el);
/* 48  */ 	        		$el.addClass('hiddenClone');
/* 49  */ 	        		m.toggleRequired($el, false);
/* 50  */ 	        		//evento do usuario

/* clonefield.js */

/* 51  */ 	        		$this.trigger('onHideClone', [$el]);
/* 52  */ 	        	},
/* 53  */ 	        	
/* 54  */ 	        	//adiciona botao de remover
/* 55  */ 	        	createRemoveButton: function(el){
/* 56  */ 	        		var removeEl = $(o.removeEl);
/* 57  */ 					removeEl.attr("class", o.removeClass);
/* 58  */ 					$(el).prepend(removeEl);
/* 59  */ 					removeEl.bind("click", function(){//eventos do botao
/* 60  */ 						m.hideClonedField($(el));
/* 61  */ 					});
/* 62  */ 					removeEl.attr('title',o.removeLabel);
/* 63  */ 	        	},
/* 64  */ 	        	
/* 65  */ 	        	clearCloneFields: function(el){
/* 66  */ 	        		$(el).find(o.updateElemens).each(function(i, el){
/* 67  */ 	        			var input = $(el);
/* 68  */ 		        		if(input[0].nodeName == "SELECT"){
/* 69  */ 							input.attr('selectedIndex', 0);
/* 70  */ 		        		}else if(input.attr('type') == 'checkbox'){
/* 71  */ 		        			input.attr('checked', false);
/* 72  */ 		        		}else if(input.attr('type') == 'radio'){
/* 73  */ 		        			input.attr('checked', false);
/* 74  */ 						}else if(input.attr('type') != 'button'){
/* 75  */ 							input.removeAttr('value');
/* 76  */ 						}
/* 77  */ 	        		});
/* 78  */ 	        	},
/* 79  */ 	        	
/* 80  */ 	        	flagUpdate: function(el){
/* 81  */ 					var flag = el.parent().find(".clone_flag:first");
/* 82  */ 					var cloneIdEl = el.find(o.cloneIdClass); 		//elemento que contem a id do clone
/* 83  */ 					if(!cloneIdEl) return;						//caso o campo id_clone nao exista, sai
/* 84  */ 					var cloneId = cloneIdEl.attr('value');		//valor da id do clone, caso exista
/* 85  */ 					if(cloneId=="" || !cloneId) return;			//Sai se o valor estiver vazio ou nao existir
/* 86  */ 					var oldValue = flag.val();					//registrando valor anterior da flag
/* 87  */ 					if(oldValue==""){
/* 88  */ 						flag.val(cloneId);
/* 89  */ 					}else{
/* 90  */ 						flag.val(oldValue+","+cloneId);
/* 91  */ 					}
/* 92  */ 				},
/* 93  */ 				
/* 94  */ 				//insere ou retira .required dos campos de um form
/* 95  */ 				toggleRequired: function(div, status){
/* 96  */ 					$(div).find('input, select, textarea').each(function(i, el){
/* 97  */ 						var $el = $(el);
/* 98  */ 						
/* 99  */ 						//verifica se deve executar
/* 100 */ 						if(!$el.hasClass('required') && !($(this).data('wasRequired')==true)){

/* clonefield.js */

/* 101 */ 							return;
/* 102 */ 						}
/* 103 */ 						
/* 104 */ 						if(status==undefined){
/* 105 */ 							//se possui o required
/* 106 */ 							if ($el.hasClass('required')){
/* 107 */ 								status = false;
/* 108 */ 							}
/* 109 */ 							//se NAO possui o required, mas was required
/* 110 */ 							if($(this).data('wasRequired')==true){
/* 111 */ 								status = true;
/* 112 */ 							}
/* 113 */ 						}
/* 114 */ 						
/* 115 */ 						//Verifica qual deve ser o status do required
/* 116 */ 	        			if (!status){
/* 117 */ 	        				$el.data('wasRequired',true);
/* 118 */ 	        				$el.removeClass('required').removeClass('error');
/* 119 */ 	        			}
/* 120 */ 	        			else{ 
/* 121 */ 	        				$el.addClass('required');
/* 122 */ 	        				$el.data('wasRequired',false);
/* 123 */ 	        			}
/* 124 */ 	        		});
/* 125 */ 				},
/* 126 */ 	        	
/* 127 */ 	        	cloneInit: function(){
/* 128 */ 	        		$this.find('div.clonedField').each(function(i, el){
/* 129 */ 	        			$parent = $(this);
/* 130 */ 	        			$el = $(el);
/* 131 */ 	    	        	$el.find('input'+o.cloneIdClass).each(function(i, el){
/* 132 */ 	    	        		if(!$(this).attr('value')){
/* 133 */ 	    	        			$parent.addClass('hiddenClone');
/* 134 */ 	    	        			m.toggleRequired($parent, false);
/* 135 */ 	    	        			m.clearCloneFields($parent);
/* 136 */ 	    	        			//evento do usuario
/* 137 */ 	    		        		$this.trigger('onHideClone', [$parent]);
/* 138 */ 	    	        		}else{
/* 139 */ 	    	        			//evento do usuario
/* 140 */ 	    		        		$this.trigger('onShowClone', [$parent]);
/* 141 */ 	    	        		}
/* 142 */ 	    	        	});
/* 143 */ 	    	        	//verifica se o item nao eh editavel, desabilitando elementos caso nao seja
/* 144 */ 	    	        	if($el.find('input'+o.cloneReadOnlyClass).val() == "1"){
/* 145 */ 	    	        		$el.find('input, select, textarea').attr('disabled','disabled');
/* 146 */ 	    	        		$el.addClass('readonlyClone');
/* 147 */ 	    	        	}else{
/* 148 */ 	    	        		m.createRemoveButton(this);
/* 149 */ 	    	        	}
/* 150 */ 	    	        });

/* clonefield.js */

/* 151 */ 	        	}
/* 152 */ 	        };
/* 153 */ 
/* 154 */ 	       m.cloneInit();
/* 155 */ 	       
/* 156 */ 	       $(this).click(function(el){
/* 157 */ 	    	   m.showNextClonedField(el.target);
/* 158 */ 	       });
/* 159 */ 		}
/* 160 */ 	});
/* 161 */ })(jQuery);
