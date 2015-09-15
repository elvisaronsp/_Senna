
/* Arrange-cascade.js */

/* 1  */ /*
/* 2  *| 
/* 3  *| Script: Arrange-cascade.js
/* 4  *| 	Cascade windows.
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
/* 15 *| Syntax:
/* 16 *| 	(start code)
/* 17 *| 	MochaUI.arrangeCascade();
/* 18 *| 	(end)
/* 19 *| 
/* 20 *| */
/* 21 */ 
/* 22 */ MochaUI.options.extend({
/* 23 */ 	viewportTopOffset:  30,    // Use a negative number if neccessary to place first window where you want it
/* 24 */ 	viewportLeftOffset: 20,
/* 25 */ 	windowTopOffset:    50,    // Initial vertical spacing of each window
/* 26 */ 	windowLeftOffset:   40     // Initial horizontal spacing of each window	
/* 27 */ });
/* 28 */ 
/* 29 */ MochaUI.extend({   
/* 30 */ 	arrangeCascade: function(){
/* 31 */ 		// See how much space we have to work with
/* 32 */ 		var coordinates = document.getCoordinates();
/* 33 */ 		
/* 34 */ 		var openWindows = 0;
/* 35 */ 		MochaUI.Windows.instances.each(function(instance){
/* 36 */ 			if (!instance.isMinimized) openWindows ++; 
/* 37 */ 		});
/* 38 */ 		
/* 39 */ 		if ((this.options.windowTopOffset * (openWindows + 1)) >= (coordinates.height - this.options.viewportTopOffset)) {
/* 40 */ 			var topOffset = (coordinates.height - this.options.viewportTopOffset) / (openWindows + 1);
/* 41 */ 		}
/* 42 */ 		else {
/* 43 */ 			var topOffset = this.options.windowTopOffset;
/* 44 */ 		}
/* 45 */ 		
/* 46 */ 		if ((this.options.windowLeftOffset * (openWindows + 1)) >= (coordinates.width - this.options.viewportLeftOffset - 20)) {
/* 47 */ 			var leftOffset = (coordinates.width - this.options.viewportLeftOffset - 20) / (openWindows + 1);
/* 48 */ 		}
/* 49 */ 		else {
/* 50 */ 			var leftOffset = this.options.windowLeftOffset;

/* Arrange-cascade.js */

/* 51 */ 		}
/* 52 */ 
/* 53 */ 		var x = this.options.viewportLeftOffset;
/* 54 */ 		var y = this.options.viewportTopOffset;
/* 55 */ 		$$('div.mocha').each(function(windowEl){
/* 56 */ 			var currentWindowClass = MochaUI.Windows.instances.get(windowEl.id);
/* 57 */ 			if (!currentWindowClass.isMinimized && !currentWindowClass.isMaximized){
/* 58 */ 				id = windowEl.id;
/* 59 */ 				MochaUI.focusWindow(windowEl);
/* 60 */ 				x += leftOffset;
/* 61 */ 				y += topOffset;
/* 62 */ 
/* 63 */ 				if (MochaUI.options.useEffects == false){
/* 64 */ 					windowEl.setStyles({
/* 65 */ 						'top': y,
/* 66 */ 						'left': x
/* 67 */ 					});
/* 68 */ 				}
/* 69 */ 				else {
/* 70 */ 					var cascadeMorph = new Fx.Morph(windowEl, {
/* 71 */ 						'duration': 550
/* 72 */ 					});
/* 73 */ 					cascadeMorph.start({
/* 74 */ 						'top': y,
/* 75 */ 						'left': x
/* 76 */ 					});
/* 77 */ 				}
/* 78 */ 			}
/* 79 */ 		}.bind(this));
/* 80 */ 	}
/* 81 */ });
/* 82 */ 
