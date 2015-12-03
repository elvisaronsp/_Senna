
/* links-init.js */

/* 1  */ /**
/* 2  *|  * @author Bruno
/* 3  *|  */
/* 4  */ var initializeWindows = function(){
/* 5  */
/* 6  */ 	$$('a[target]').each(function(el){
/* 7  */ 		if(!el.retrieve('hasClick', false)){
/* 8  */ 			el.addEvent('click', function(e){
/* 10 */ 				switch (el.get('target')) {
/* 11 */ 				case "jswindow":
/* 12 */ 					new Event(e).stop();
/* 13 */ 					window.open($(el).href, '_blank', 'height=500, width=750, resizable=true');
/* 14 */ 					break;
/* 15 */ 				case "window":
/* 16 */ 					new Event(e).stop();
                            if($$('#redefinir').get('value')== "0")
                                parent.MochaUI.newWindow(this);
/* 18 */ 					break;
/* 19 */ 				case "modal":
/* 20 */ 					new Event(e).stop();
/* 21 */ 					parent.MochaUI.newModal(this);
/* 22 */ 					break;
/* 23 */ 				case "modal2":
/* 24 */ 					new Event(e).stop();
/* 25 */ 					parent.MochaUI.newModal2(this);
/* 26 */ 					break;
/* 27 */ 				case "panel":
                        // alterado para forcar usuario a redefinir sua senha
                        new Event(e).stop();
                        if($$('#redefinir').get('value')== "1")
                            parent.MochaUI.load($$("#perfilUsuario")[0]);
                        else
                            parent.MochaUI.load(this);
                        break;
/* 31 */ 				}
/* 32 */ 			});
/* 33 */ 			el.store('hasClick', true);
/* 34 */ 		}
/* 35 */ 	});





/* 36 */
/* 37 */ 	// Deactivate menu header links
/* 38 */ 	$$('a.returnFalse').each(function(el){
/* 39 */ 		el.addEvent('click', function(e){
/* 40 */ 			new Event(e).stop();
/* 41 */ 		});
/* 42 */ 	});
/* 43 */ 
/* 44 */ };
/* 45 */ 
/* 46 */ // Initialize when the DOM is ready
/* 47 */ window.addEvent('domready', function(){

/* 48 */ 	//inicializa metodos de abertura de janelas
/* 49 */ 	initializeWindows();
/* 50 */ });
