
/* Modal.js */

/* 1  */ /*
/* 2  *| 
/* 3  *| Script: Modal.js
/* 4  *| 	Create modal dialog windows.
/* 5  *| 
/* 6  *| Copyright:
/* 7  *| 	Copyright (c) 2007-2008 Greg Houston, <http://greghoustondesign.com/>.	
/* 8  *| 
/* 9  *| License:
/* 10 *| 	MIT-style license.	
/* 11 *| 
/* 12 *| Requires:
/* 13 *| 	Core.js, Window.js
/* 14 *| 
/* 15 *| See Also:
/* 16 *| 	<Window>	
/* 17 *| 	
/* 18 *| */
/* 19 */ 
/* 20 */ MochaUI.Modal = new Class({
/* 21 */ 
/* 22 */ 	Extends: MochaUI.Window,
/* 23 */ 
/* 24 */ 	Implements: [Events, Options],
/* 25 */ 
/* 26 */ 	initialize: function(options){
/* 27 */ 
/* 28 */ 		this.modalInitialize();
/* 29 */ 		
/* 30 */ 		window.addEvent('resize', function(){
/* 31 */ 			this.setModalSize();
/* 32 */ 		}.bind(this));
/* 33 */ 
/* 34 */ 	},
/* 35 */ 	modalInitialize: function(){
/* 36 */ 		var modalOverlay = new Element('div', {
/* 37 */ 			'id': 'modalOverlay',
/* 38 */ 			'styles': {
/* 39 */ 				'height': document.getCoordinates().height,
/* 40 */ 				'opacity': .6
/* 41 */ 			}
/* 42 */ 		}).inject(document.body);
/* 43 */ 		
/* 44 */ 		/*modalOverlay.addEvent('click', function(e){
/* 45 *| 			MochaUI.closeWindow(MochaUI.currentModal);
/* 46 *| 		});*/
/* 47 */ 		
/* 48 */ 		if (Browser.Engine.trident4){
/* 49 */ 			var modalFix = new Element('iframe', {
/* 50 */ 				'id': 'modalFix',

/* Modal.js */

/* 51 */ 				'scrolling': 'no',
/* 52 */ 				'marginWidth': 0,
/* 53 */ 				'marginHeight': 0,
/* 54 */ 				'src': '',
/* 55 */ 				'styles': {
/* 56 */ 					'height': document.getCoordinates().height
/* 57 */ 				}
/* 58 */ 			}).inject(document.body);
/* 59 */ 		}
/* 60 */ 
/* 61 */ 		this.modalOverlayOpenMorph = new Fx.Morph($('modalOverlay'), {
/* 62 */ 				'duration': 150
/* 63 */ 				});
/* 64 */ 		this.modalOverlayCloseMorph = new Fx.Morph($('modalOverlay'), {
/* 65 */ 			'duration': 150,
/* 66 */ 			onComplete: function(){
/* 67 */ 				$('modalOverlay').setStyle('display', 'none');
/* 68 */ 				if (Browser.Engine.trident4){
/* 69 */ 					$('modalFix').setStyle('display', 'none');
/* 70 */ 				}
/* 71 */ 			}.bind(this)
/* 72 */ 		});
/* 73 */ 	},
/* 74 */ 	setModalSize: function(){
/* 75 */ 		$('modalOverlay').setStyle('height', document.getCoordinates().height);
/* 76 */ 		if (Browser.Engine.trident4){
/* 77 */ 			$('modalFix').setStyle('height', document.getCoordinates().height);
/* 78 */ 		}
/* 79 */ 	}
/* 80 */ });
/* 81 */ MochaUI.Modal.implement(new Options, new Events);
/* 82 */ 
