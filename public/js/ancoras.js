/* ancoras.js */

/* 1  */ /**
/* 2  *|  * @author Bruno
/* 3  *|  */
/* 4  */ 
/* 5  */ //Initialize when the DOM is ready
/* 6  */ window.addEvent('domready', function(){
/* 7  */ 	
/* 8  */ 	$$('#ancora .caixa').each(function(el){
/* 9  */ 		el.addEvent('click', function(e){
/* 10 */ 			new Event(e).stop();
/* 11 */ 			
/* 12 */ 			var me 	= $(this).getElements('.goto');
/* 13 */ 			me		= me.length>0 ? me : $(this).getElement("a");
/* 14 */ 			
/* 15 */ 			//clicando no elemento ".goto" ou no primeiro "a" encontrado
/* 16 */ 			me.fireEvent('click', me);
/* 17 */ 			
/* 18 */ 		});
/* 19 */ 	});
/* 20 */ 	
/* 21 */ 	//Abrir na própria janela
/* 22 */ 	$$('#ancora a.self').each(function(el){
/* 23 */ 		el.addEvent('click', function(e){
/* 24 */ 			new Event(e).stop();
/* 25 */ 			var me 				= $(this);
/* 26 */ 			var windowTitle 	= me.getParents('.caixa').getElement('h4').getElements('span')[0][1].get('html');
/* 27 */ 
/* 28 */ 			//Vai para página
/* 29 */ 			window.location		= me.get("href");
/* 30 */ 		});
/* 31 */ 	});
/* 32 */ 	
/* 33 */ 	//Abrir em nova janela
/* 34 */ 	$$('#ancora a.blank').each(function(el){
/* 35 */ 		el.addEvent('click', function(e){
/* 36 */ 			new Event(e).stop();
/* 37 */ 			var me 				= $(this);
/* 38 */ 			
/* 39 */ 			//Vai para página
/* 40 */ 			window.open(me.get("href"));
/* 41 */ 		});
/* 42 */ 	});
/* 43 */ 	
/* 44 */ 	
/* 45 */ 	//Abrir em nova Janela
/* 46 */ 	$$('#ancora a.openWindow').each(function(el){
/* 47 */ 		el.addEvent('click', function(e){
/* 48 */ 			new Event(e).stop();
/* 49 */ 			
/* 50 */ 			var me 				= $(this);

/* ancoras.js */

/* 51 */ 			var windowTitle 	= me.getParents('.caixa').getElement('h4').getElements('span')[0][1].get('html');
/* 52 */ 			parent.MochaUI.openWindow({
/* 53 */ 				id: me.href,
/* 54 */ 				title: windowTitle,
/* 55 */ 				contentURL: me.href
/* 56 */ 			});
/* 57 */ 		});
/* 58 */ 	});
/* 59 */ 	
/* 60 */ 	
/* 61 */ 	//Abrir na listagem
/* 62 */ 	$$('#ancora a.openList').each(function(el){
/* 63 */ 		el.addEvent('click', function(e){
/* 64 */ 			new Event(e).stop();
/* 65 */ 			
/* 66 */ 			var h4 	= $(this).getParents('.caixa').getElement('h4');
/* 67 */ 			
/* 68 */ 			var a 	= new Element('a', { 
/* 69 */ 				href: $(this).href,
/* 70 */ 			    html: h4.get('html')
/* 71 */ 			});
/* 72 */ 			
/* 73 */ 			//Carregando a janela
/* 74 */ 			parent.MochaUI.load(a);
/* 75 */ 			
/* 76 */ 			var windowId = MochaUI.getFrameWindowId();
/* 77 */ 			parent.MochaUI.closeWindow(parent.$(windowId));
/* 78 */ 		});
/* 79 */ 	});
/* 80 */ });
/* 81 */ 