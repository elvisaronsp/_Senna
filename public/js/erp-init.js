
/* erp-init.js */

/* 1  */ /**
/* 2  *|  * Inicializando Interface grafica do Oasis
/* 3  *|  * @author Bruno
/* 4  *|  * @since 07/08/2009
/* 5  *|  */
/* 6  */ 
/* 7  */ var fixDesktopPNG = function(){
/* 8  */ 	$$('#page a img').each(function(el){
/* 9  */ 		fixPNG(this);
/* 10 */ 	});
/* 11 */ };
/* 12 */ 
/* 13 */ 
/* 14 */ var addPanels = function(){
/* 15 */ 	new MochaUI.Column({
/* 16 */ 		id: 'mainColumn',
/* 17 */ 		placement: 'main',	
/* 18 */ 		width: null,
/* 19 */ 		height: '100%',
/* 20 */ 		sortable: false
/* 21 */ 	});
/* 22 */ 
/* 23 */ 	// Inserindo painel da coluna principal
/* 24 */ 	new MochaUI.Panel({
/* 25 */ 		id: 'mainPanel',
/* 26 */ 		title: "",
/* 27 */ 		column: 'mainColumn',
/* 28 */ 		padding: { top: 0, right: 0, bottom: 0, left: 0 },
/* 29 */ 		onContentLoaded: initializeWindows
/* 30 */ 	});
/* 31 */ 	
/* 32 */ 	MochaUI.load($$("#menu_inicio")[0]);
/* 33 */ };
/* 34 */ 
/* 35 */ 
/* 36 */ // Initialize MochaUI when the DOM is ready
/* 37 */ window.addEvent('domready', function(){
/* 38 */ 	//Instancia do desktop
/* 39 */ 	MochaUI.Desktop = new MochaUI.Desktop();
/* 40 */ 	MochaUI.Desktop.desktop.setStyles({
/* 41 */ 		'background': '#fff',
/* 42 */ 		'visibility': 'visible'
/* 43 */ 	});
/* 44 */ 	
/* 45 */ 	//instância do dock
/* 46 */ 	MochaUI.Dock = new MochaUI.Dock({
/* 47 */ 		dockPosition: 'bottom'
/* 48 */ 	});
/* 49 */ 	
/* 50 */ 	//Instancia dos modais

/* erp-init.js */

/* 51 */ 	MochaUI.Modal = new MochaUI.Modal();
/* 52 */ 	
/* 53 */ 	//instancia paineis
/* 54 */ 	addPanels();
/* 55 */ 	
/* 56 */ 	//acerta icones no desktop
/* 57 */ 	fixDesktopPNG();
/* 58 */ });
/* 59 */ 
/* 60 */ // This runs when a person leaves your page.
/* 61 */ window.addEvent('unload', function(){
/* 62 */ 	if (MochaUI) MochaUI.garbageCleanUp();
/* 63 */ });
/* 64 */ 
