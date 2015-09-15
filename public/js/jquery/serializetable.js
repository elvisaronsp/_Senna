
/* serializetable.js */

/* 1   */ /**
/* 2   *|  * Plugin para serializar dados de uma tabela
/* 3   *|  * @author Bruno
/* 4   *|  * @param {Object} options
/* 5   *|  */
/* 6   */  
/* 7   */ (function($){
/* 8   */ 	/**
/* 9   *| 	 * Metodo que serializa os dados de um formulario
/* 10  *| 	 * O Parametro não é obrigatorio, caso esteja vazio obtem todos os campos que são input
/* 11  *| 	 */
/* 12  */ 	$.fn.serializeTable = function(options){
/* 13  */ 		var table 	= $(this);				//tabela
/* 14  */ 		var ret 	= "";					//retorno do metodo
/* 15  */ 		
/* 16  */ 		var opts = {
/* 17  */ 				fields: "input"
/* 18  */ 		};
/* 19  */ 		var o = $.extend(opts, options);
/* 20  */ 		if(table){
/* 21  */ 			var numFields = table.find("tbody tr:eq(0)").find(o.fields).length;
/* 22  */ 			var array = table.find("tbody").find(o.fields);
/* 23  */ 			for(var i=0; i<array.length; i++) {
/* 24  */ 				var el = $(array[i]);
/* 25  */ 				var name = el.attr("name").substr(0, el.attr("name").indexOf('['));
/* 26  */ 				
/* 27  */ 				if( i%numFields == 0 ){ ret += "{"; }
/* 28  */ 				
/* 29  */ 				ret += '"'+name+'":"'+el.val()+'"';
/* 30  */ 				
/* 31  */ 				if( i%numFields == numFields-1 ){ 
/* 32  */ 					ret += "}";
/* 33  */ 					if(i < array.length-1){
/* 34  */ 						ret += ",";
/* 35  */ 					}
/* 36  */ 				}else{
/* 37  */ 					ret += ",";
/* 38  */ 				}
/* 39  */ 			}
/* 40  */ 		}
/* 41  */ 		return "["+ret+"]";
/* 42  */ 	}
/* 43  */ 	
/* 44  */ 	/**
/* 45  *| 	 * Metodo para transformar os dados de um formulario em um array
/* 46  *| 	 */
/* 47  */ 	$.fn.serializeForm = function(options){
/* 48  */ 		var opts = {
/* 49  */ 				not: "",
/* 50  */ 				fields: "input,select,textarea"

/* serializetable.js */

/* 51  */ 		};
/* 52  */ 		var o = $.extend(opts, options);
/* 53  */         var form 	= $(this);				//formulario
/* 54  */ 		var ret 	= "";					//retorno do metodo
/* 55  */ 		
/* 56  */ 		if(form){
/* 57  */ 			var numFields = form.find(o.fields).not(o.not).length;
/* 58  */ 			var array = form.find(o.fields).not(o.not);
/* 59  */ 			for(var i=0; i<array.length; i++) {
/* 60  */ 				var el = $(array[i]);
/* 61  */ 				var name = el.attr("name");
/* 62  */ 				var val = el.val();
/* 63  */ 				var sep = ",";
/* 64  */ 				var str = "";
/* 65  */ 				
/* 66  */ 				//Abre o Objeto
/* 67  */ 				if( i%numFields == 0 ){ ret += "{"; }
/* 68  */ 				
/* 69  */ 				//Checkbox. Se desmarcado, valor é 0
/* 70  */ 				if(el.attr("type") == "checkbox" && el.attr('checked')==false){ 
/* 71  */ 					val = 0;
/* 72  */ 				}
/* 73  */ 				
/* 74  */ 				//Montando string do valor sendo retornado
/* 75  */ 				str = '"'+name+'":"'+val+'"';
/* 76  */ 				
/* 77  */ 				//Radio. Se desabilitado, não inclui nada
/* 78  */ 				if(el.attr("type") == "radio" && el.attr('checked')==false) {
/* 79  */ 					str = "";
/* 80  */ 					sep = "";
/* 81  */ 				}
/* 82  */ 				
/* 83  */ 				//Inserindo string de nome:valor no retorno
/* 84  */ 				ret += str;
/* 85  */ 				
/* 86  */ 				//Fecha ou separa o Objeto
/* 87  */ 				if( i%numFields == numFields-1 ){ 
/* 88  */ 					ret += "}";
/* 89  */ 					if(i < array.length-1){
/* 90  */ 						ret += sep;
/* 91  */ 					}
/* 92  */ 				}else{
/* 93  */ 					ret += sep;
/* 94  */ 				}
/* 95  */ 			}
/* 96  */ 		}
/* 97  */ 		return ret;
/* 98  */ 	}
/* 99  */ 	
/* 100 */ })(jQuery);

/* serializetable.js */

/* 101 */ 
