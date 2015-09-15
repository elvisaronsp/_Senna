
/* base.js */

/* 1   */ /** 
/* 2   *|  * @author Bruno
/* 3   *|  */
/* 4   */ /* Funcoes de padronização ******************************/
/* 5   */ //Janela
/* 6   */ MochaUI.openWindow = function(opt){
/* 7   */ 	//cria uma nova janela
/* 8   */ 	var windowDimensions 	= document.getCoordinates();
/* 9   */ 	var cor					= $$('#applicationColor').get('rel');
/* 10  */ 	var cor_cabecalho		= cor != null ? eval(cor[0]) : [68, 68, 68];
/* 11  */ 	new MochaUI.Window($extend({
/* 12  */ 		loadMethod: 		'iframe',
/* 13  */ 		width: 				1000,
/* 14  */ 		height: 			587,
/* 15  */ 		x: 					null,
/* 16  */ 		y: 					null,
/* 17  */ 		resizable: 			false,
/* 18  */ 		minimizable: 		true,
/* 19  */ 		maximizable: 		true,
/* 20  */ 		scrollbars:			true,
/* 21  */ 		cornerRadius: 		1,
/* 22  */ 		shadowBlur: 		3,
/* 23  */ 		shadowOffset:		{'x': 0, 'y': 1},
/* 24  */ 		footerHeight:		0,
/* 25  */ 		headerHeight:		30,
/* 26  */ 		headerStartColor:	cor_cabecalho,
/* 27  */ 		headerStopColor:	cor_cabecalho,
/* 28  */ 		resizableColor:		cor_cabecalho,
/* 29  */ 		controlsOffset:		{'right': 10, 'top': 8},
/* 30  */ 		closeColor:			[255, 255, 255],
/* 31  */ 		closeBgColor: 		cor_cabecalho,
/* 32  */ 		minimizeBgColor:   	cor_cabecalho,
/* 33  */ 		minimizeColor:     	[255, 255, 255],
/* 34  */ 		maximizeBgColor:   	cor_cabecalho,
/* 35  */ 		maximizeColor:     	[255, 255, 255],
/* 36  */ 		onDuplicated: 		function(){ MochaUI.notify("Janela já se encontra em uso"); }
/* 37  */ 	}, opt));
/* 38  */ };
/* 39  */ 
/* 40  */ MochaUI.newWindow = function(el){
/* 41  */ 	var me = $(el);
/* 42  */ 	var title = (me.get('window_title')) ? me.get('window_title') : (me.get('text')) ? me.get('text') : me.get('title'); 
/* 43  */ 	var opts = {
/* 44  */ 			id: me.href,
/* 45  */ 			title: title,
/* 46  */ 			contentURL: me.href
/* 47  */ 		};
/* 48  */ 	MochaUI.openWindow(opts);
/* 49  */ };
/* 50  */ 

/* base.js */

/* 51  */ //Modal
/* 52  */ MochaUI.openModal = function(opt){
/* 53  */ 	var windowDimensions = document.getCoordinates();
/* 54  */ 	MochaUI.openWindow($extend({
/* 55  */ 			type: 'modal',
/* 56  */ 			width: 760,
/* 57  */ 			height: windowDimensions.height-60,
/* 58  */ 			padding: 30,
/* 59  */ 			x: null,
/* 60  */ 			y: null
/* 61  */ 		}, opt));
/* 62  */ };
/* 63  */ 
/* 64  */ MochaUI.newModal = function(el){
/* 65  */ 	var me = $(el);
/* 66  */ 	var title = (me.get('window_title')) ? me.get('window_title') : (me.get('text')) ? me.get('text') : me.get('title');
/* 67  */ 	var opts = {
/* 68  */ 			id: me.href,
/* 69  */ 			title: title,
/* 70  */ 			contentURL: me.href
/* 71  */ 		};
/* 72  */ 	if(me.get("window_width")){
/* 73  */ 		opts.width = parseInt(me.get("window_width"));
/* 74  */ 	}
/* 75  */ 	MochaUI.openModal(opts);
/* 76  */ };
/* 77  */ 
/* 78  */ MochaUI.newModal2 = function(el){
/* 79  */ 	var me = $(el);
/* 80  */ 	var title = (me.get('window_title')) ? me.get('window_title') : (me.get('text')) ? me.get('text') : me.get('title');
/* 81  */ 	var opts = {
/* 82  */ 			id: 				me.href,
/* 83  */ 			title: 				title,
/* 84  */ 			contentURL: 		me.href,
/* 85  */ 			headerHeight:		30,
/* 86  */ 			headerStartColor:	[255,255,255],
/* 87  */ 			headerStopColor:	[255,255,255],
/* 88  */ 			closeColor:			[55, 55, 55],
/* 89  */ 			closeBgColor: 		[255,255,255],
/* 90  */ 			addClass:			"modal2",
/* 91  */ 			shadowBlur:			0,
/* 92  */ 			shadowOffset:		{'x': 0, 'y': 0}
/* 93  */ 	};
/* 94  */ 	MochaUI.openModal(opts);
/* 95  */ };
/* 96  */ 
/* 97  */ //Abrir uma pagina em um Painel
/* 98  */ MochaUI.loadPage = function(opt){
/* 99  */ 	var def = {
/* 100 */ 		element: $('mainPanel'),

/* base.js */

/* 101 */ 		loadMethod: 'iframe'
/* 102 */ 		};
/* 103 */ 	MochaUI.updateContent($extend(def,opt));
/* 104 */ 	$(def.element).setStyle('background', '#fff');
/* 105 */ };
/* 106 */ 
/* 107 */ MochaUI.load = function(el){
/* 108 */ 	var me = $(el);
/* 109 */ 	var tmp = me.clone();
/* 110 */ 	var img = tmp.getElement('img');
/* 111 */ 	var text = tmp.getElements('span.label');
/* 112 */ 	if(img!=null){
/* 113 */ 		img.set('style','width:22px; height:22px; margin-right: 7px;');
/* 114 */ 	}
/* 115 */ 	if(text!=null){
/* 116 */ 		text.set('style','display:block; float:right;');
/* 117 */ 	}
/* 118 */ 	MochaUI.loadPage({
/* 119 */ 		title: tmp.get('html'),
/* 120 */ 		url: me.href
/* 121 */ 	});
/* 122 */ };
/* 123 */ 
/* 124 */ //Notificação
/* 125 */ MochaUI.openNotification = function(opt){
/* 126 */ 	if(!opt.container) opt.container='desktop';
/* 127 */ 	new MochaUI.Window($extend({
/* 128 */ 			closeAfter: 		5000,
/* 129 */ 			type: 				'notification',
/* 130 */ 			width: 				600,
/* 131 */ 			height: 			50,
/* 132 */ 			y: 					-6,
/* 133 */ 			padding:  			{ top: 16, right: 1, bottom: 1, left: 65 },
/* 134 */ 			cornerRadius: 		0,
/* 135 */ 			shape: 				'gauge',
/* 136 */ 			footerHeight: 		0,
/* 137 */ 			headerHeight: 		0,
/* 138 */ 			shadowBlur: 		2,
/* 139 */ 			shadowOffset:		{'x': 0, 'y': 1},
/* 140 */ 			useCanvas: 			false
/* 141 */ 		}, opt));
/* 142 */ };
/* 143 */ 
/* 144 */ //Notificação - simples
/* 145 */ MochaUI.notify = function(message){
/* 146 */ 	new MochaUI.openNotification({
/* 147 */ 		content: message,
/* 148 */ 		addClass: 'notice'
/* 149 */ 	});
/* 150 */ };

/* base.js */

/* 151 */ 
/* 152 */ //Notificação - sucesso
/* 153 */ MochaUI.success = function(message, container){
/* 154 */ 	new MochaUI.openNotification({
/* 155 */ 		content: message,
/* 156 */ 		container: container,
/* 157 */ 		addClass: 'success'
/* 158 */ 	});
/* 159 */ };
/* 160 */ 
/* 161 */ 
/* 162 */ //Notificação - Info
/* 163 */ MochaUI.information = function(message, container){
/* 164 */ 	var dimensions = window.getSize();
/* 165 */ 	new MochaUI.openNotification({
/* 166 */ 		content: message,
/* 167 */ 		container: container,
/* 168 */ 		height: null,
/* 169 */ 		closeAfter: false,
/* 170 */ 		y: 1,
/* 171 */ 		x: 1,
/* 172 */ 		padding:  { top: 5, right: 5, bottom: 5, left: 5 },
/* 173 */ 		shadowBlur: 0,
/* 174 */ 		addClass: 'information'
/* 175 */ 		
/* 176 */ 	});
/* 177 */ };
/* 178 */ 
/* 179 */ window.addEvent('load', function(){
/* 180 */ 	$$("#loader").set("style", "display:none");
/* 181 */ });
/* 182 */ 
/* 183 */ 
