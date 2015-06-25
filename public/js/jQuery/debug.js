
/* debug.js */

/* 1  */ jQuery.noConflict();
/* 2  */ (function($) {
/* 3  */ 	$.fn.log = function(message){
/* 4  */ 		if ($('#console').length < 1) {
/* 5  */ 			var console = "<pre id='console' class='clear'>CONSOLE:\n</pre>";
/* 6  */ 			$("#conteudo").prepend(console);
/* 7  */ 		}
/* 8  */ 		
/* 9  */ 		var c = $('#console').html();
/* 10 */ 		$('#console').html(c + message + "\n");
/* 11 */       	return this;
/* 12 */ 	}
/* 13 */ 	
/* 14 */ })(jQuery);
/* 15 */ 
