
/* confirm_message.js */

/* 1   */ (function($) {
/* 2   */ 	// Função para adicionar/remover confirm message em elementos
/* 3   */ 	$.fn.extend({
/* 4   */ 		/**
/* 5   *| 		 * Adiciona uma mensagem à pilha de confirm messages
/* 6   *| 		 * @author jdrummond
/* 7   *| 		 * @since 08/08/2011
/* 8   *| 		 */
/* 9   */ 		addConfirmMessage: function(message,labelOk, labelCancel,onBeforeConfirm,onAfterClick){
/* 10  */ 			if (!message){
/* 11  */ 				return false;
/* 12  */ 			}
/* 13  */ 			if (!onBeforeConfirm){
/* 14  */ 				onBeforeConfirm = function(){};
/* 15  */ 			}
/* 16  */ 			if (!onAfterClick){
/* 17  */ 				onAfterClick = '';
/* 18  */ 			}
/* 19  */ 			message = {
/* 20  */ 				'message': message,
/* 21  */ 				'labelOk': labelOk,
/* 22  */ 				'labelCancel': labelCancel,
/* 23  */ 				'onBeforeConfirm':onBeforeConfirm,
/* 24  */ 				'onAfterClick':onAfterClick
/* 25  */ 			};
/* 26  */ 			return this.each(function () {
/* 27  */ 				// Recupera confirm message atual do elemento
/* 28  */ 				var cm = $(this).data('confirm_message');
/* 29  */ 				// Se tipo da confirm message for string, cria objeto e adiciona nova confirm message
/* 30  */ 				if (typeof(cm) == 'string'){
/* 31  */ 					$(this).data('confirm_message',[cm,message]);
/* 32  */ 				}
/* 33  */ 				// Se não existe data confirm message, aponta nova mensagem como objeto
/* 34  */ 				else if (typeof(cm) == 'undefined' || cm == null){
/* 35  */ 						$(this).data('confirm_message',[message]);
/* 36  */ 				}
/* 37  */ 				// Se existe confirm message previamente, adiciona nova mensagem
/* 38  */ 				else {
/* 39  */ 					cm.push(message);
/* 40  */ 					$(this).data('confirm_message',cm);
/* 41  */ 				}
/* 42  */ 			});
/* 43  */ 		},
/* 44  */ 		/**
/* 45  *| 		 * Remove uma ou todas as confirm message de um elemento
/* 46  *| 		 * Se receber como parâmetro uma mensagem, tenta remover somente a mensage da pilha de confirm message
/* 47  *| 		 * Caso não receba parâmetros, remove TODAS as confirm message
/* 48  *| 		 * @author jdrummond
/* 49  *| 		 * @since 08/08/2011
/* 50  *| 		 */

/* confirm_message.js */

/* 51  */ 		unsetConfirmMessage: function (message){
/* 52  */ 			return this.each(function () {
/* 53  */ 				if (!message){
/* 54  */ 					$(this).removeData('confirm_message');
/* 55  */ 				}
/* 56  */ 				else{
/* 57  */ 					$this = $(this);
/* 58  */ 					// Recupera confirm message atual do elemento
/* 59  */ 					var cm = $this.data('confirm_message');
/* 60  */ 					if (cm){
/* 61  */ 						// Verifica se confirm_message atual é string, transformando em objeto (array)
/* 62  */ 						if (typeof(cm) == 'string'){
/* 63  */ 							$this.data('confirm_message',[cm]);
/* 64  */ 						}
/* 65  */ 						// Verifica se existe a mensagem informada na pilha de confirm message, retirando a mesma
/* 66  */ 						$.each(cm,function (i,val) {
/* 67  */ 							if (val == message || (typeof(val) == 'object' && val.message == message)){
/* 68  */ 								cm.splice(i,1);
/* 69  */ 							}
/* 70  */ 						});
/* 71  */ 						// Monta novamente pilha de confirm message, com mensagem retirada
/* 72  */ 						$this.data('confirm_message',cm);
/* 73  */ 					}
/* 74  */ 				}
/* 75  */ 			});
/* 76  */ 		},
/* 77  */ 		/**
/* 78  *| 		 * Retorna a pilha de confirm message de um elemento
/* 79  *| 		 * @author jdrummond
/* 80  *| 		 * @since 08/08/2011
/* 81  *| 		 */
/* 82  */ 		getConfirmMessage: function () {
/* 83  */ 			return $(this).data('confirm_message');
/* 84  */ 		},
/* 85  */ 		/**
/* 86  *| 		 * Exibe pilha de confirm message, retornando caso o usuário selecione cancelar em alguma
/* 87  *| 		 * @param obj sx Objeto do Sexy alert (opcional)
/* 88  *| 		 * @param obj callback Função a ser executada após execução dos confirms
/* 89  *| 		 * @param obj btn Objeto do botão pressionado para submeter o form
/* 90  *| 		 * @author jdrummond
/* 91  *| 		 * @since 08/08/2011
/* 92  *| 		 */
/* 93  */ 		showConfirmMessages: function (sx,callback,btn) {
/* 94  */ 			// Se não recebeu o objeto do sexy alert, aponta o padrão
/* 95  */ 			if (typeof(sx) != 'object'){
/* 96  */ 				sx = Sexy;
/* 97  */ 			}
/* 98  */ 			var i = 1;
/* 99  */ 			var array = this;
/* 100 */ 			var message = (typeof(array.get(0)) == 'object') ? array.get(0).message : array.get(0);

/* confirm_message.js */

/* 101 */ 			var labelOk = (typeof(array.get(0)) == 'object') ? array.get(0).labelOk : '';
/* 102 */ 			var labelCancel = (typeof(array.get(0)) == 'object') ? array.get(0).labelCancel : '';
/* 103 */ 			var onBeforeConfirm = (typeof(array.get(0)) == 'object') ? array.get(0).onBeforeConfirm : '';
/* 104 */ 			var onAfterClick = (typeof(array.get(0)) == 'object') ? array.get(0).onAfterClick : '';
/* 105 */ 			var sxConfirm_config = {
/* 106 */ 				onComplete: function (res){
/* 107 */ 					var ret = res;
/* 108 */ 					var full = false;
/* 109 */ 
/* 110 */ 					if (onAfterClick) {
/* 111 */ 						var retAfterClick = onAfterClick(res);
/* 112 */ 						// Somente altera o retorno do click da confirmação caso este seja do tipo "boolean"
/* 113 */ 						// Isso evita ter que adicionar "return true" em todos os casos
/* 114 */ 						ret = (typeof(retAfterClick) == 'boolean') ? retAfterClick : true;
/* 115 */ 					}
/* 116 */ 
/* 117 */ 					// Se confirmou e é o último confirm, executa métodos aftersubmit do botão e submete formulário
/* 118 */ 					if (ret && array.length == 1){
/* 119 */ 						//evento executado apos a mensagem de confirmacao, passando como parametro a resposta do usuario 
/* 120 */ 						$.each($(btn).data('events'), function(i, event){
/* 121 */ 							$.each(event, function(i, handler){
/* 122 */ 								if(handler.type=="afterConfirmSubmit"){
/* 123 */ 									var namespace = (handler.namespace!="") ? "."+handler.namespace : ".$";
/* 124 */ 									var retorno = {val:ret, overwrite:false};
/* 125 */ 									$(btn).trigger('afterConfirmSubmit' + namespace, [retorno]);
/* 126 */ 									ret 	= ret && retorno.val;
/* 127 */ 									full 	= full || retorno.overwrite; //sobrescreve a resposta da confirmacao (não confirmativo);
/* 128 */ 								}
/* 129 */ 							});
/* 130 */ 						});
/* 131 */ 						// Se passou em todos os afterConfirm, executa o callback
/* 132 */ 						if (ret || full){
/* 133 */ 							callback();
/* 134 */ 						}
/* 135 */ 					}
/* 136 */ 					// Se ainda existem confirm messages, efetua o mesmo procedimento para a próxima posição
/* 137 */ 					else if (ret){
/* 138 */ 						array.splice(0,1);
/* 139 */ 						$(array).showConfirmMessages(sx,callback,btn);
/* 140 */ 					}
/* 141 */ 					else if (!ret){
/* 142 */ 						$.each($(btn).data('events'), function(i, event){
/* 143 */ 							$.each(event, function(i, handler){
/* 144 */ 								if(handler.type=="cancelConfirmSubmit"){
/* 145 */ 									var namespace = (handler.namespace!="") ? "."+handler.namespace : "";
/* 146 */ 									var retorno = {val:res, overwrite:false};
/* 147 */ 									$(btn).trigger('cancelConfirmSubmit' + namespace, [retorno]);
/* 148 */ 								}
/* 149 */ 							});
/* 150 */ 						});

/* confirm_message.js */

/* 151 */ 					}
/* 152 */ 				}
/* 153 */ 			};
/* 154 */ 			// Aponta label dos botões, caso estejam indicadas
/* 155 */ 			if (labelOk) {
/* 156 */ 				sxConfirm_config.textBoxBtnOk = labelOk;
/* 157 */ 			}
/* 158 */ 			if (labelCancel) {
/* 159 */ 				sxConfirm_config.textBoxBtnCancel = labelCancel;
/* 160 */ 			}
/* 161 */ 			if (onBeforeConfirm) {
/* 162 */ 				onBeforeConfirm();
/* 163 */ 			}
/* 164 */ 			
/* 165 */ 			sx.confirm(message,sxConfirm_config);
/* 166 */ 		}
/* 167 */ 	});
/* 168 */ })(jQuery);
