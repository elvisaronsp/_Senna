
/* Arrange-tile.js */

/* 1  */ /*
/* 2  *| 
/* 3  *| Script: Arrange-tile.js
/* 4  *| 	Cascade windows.
/* 5  *| 
/* 6  *| Authors:
/* 7  *| 	Harry Roberts and Greg Houston
/* 8  *| 
/* 9  *| License:
/* 10 *| 	MIT-style license.	
/* 11 *| 
/* 12 *| Requires:
/* 13 *| 	Core.js, Window.js
/* 14 *| 
/* 15 *| Syntax:
/* 16 *| 	(start code)
/* 17 *| 	MochaUI.arrangeTile();
/* 18 *| 	(end)
/* 19 *| 
/* 20 *| */
/* 21 */  
/* 22 */ MochaUI.extend({
/* 23 */ 	arrangeTile: function(){
/* 24 */ 		var x = 10;
/* 25 */ 		var y = 10;
/* 26 */ 	
/* 27 */ 		var instances =  MochaUI.Windows.instances;
/* 28 */ 
/* 29 */ 		var windowsNum = 0;
/* 30 */ 
/* 31 */ 		instances.each(function(instance){
/* 32 */ 			if (!instance.isMinimized && !instance.isMaximized){
/* 33 */ 				windowsNum++;
/* 34 */ 			}
/* 35 */ 		});
/* 36 */ 
/* 37 */ 		var cols = 3;
/* 38 */ 		var rows = Math.ceil(windowsNum / cols);
/* 39 */ 		
/* 40 */ 		var coordinates = document.getCoordinates();
/* 41 */ 	
/* 42 */ 		var col_width = ((coordinates.width - this.options.viewportLeftOffset) / cols);
/* 43 */ 		var col_height = ((coordinates.height - this.options.viewportTopOffset) / rows);
/* 44 */ 		
/* 45 */ 		var row = 0;
/* 46 */ 		var col = 0;
/* 47 */ 		
/* 48 */ 		instances.each(function(instance){
/* 49 */ 			if (!instance.isMinimized && !instance.isMaximized){
/* 50 */ 				

/* Arrange-tile.js */

/* 51 */ 				var content = instance.contentWrapperEl;
/* 52 */ 				var content_coords = content.getCoordinates();
/* 53 */ 				var window_coords = instance.windowEl.getCoordinates();
/* 54 */ 				
/* 55 */ 				// Calculate the amount of padding around the content window
/* 56 */ 				var padding_top = content_coords.top - window_coords.top;
/* 57 */ 				var padding_bottom = window_coords.height - content_coords.height - padding_top;
/* 58 */ 				var padding_left = content_coords.left - window_coords.left;
/* 59 */ 				var padding_right = window_coords.width - content_coords.width - padding_left;
/* 60 */ 
/* 61 */ 				/*
/* 62 *| 
/* 63 *| 				// This resizes the windows
/* 64 *| 				if (instance.options.shape != 'gauge' && instance.options.resizable == true){
/* 65 *| 					var width = (col_width - 3 - padding_left - padding_right);
/* 66 *| 					var height = (col_height - 3 - padding_top - padding_bottom);
/* 67 *| 
/* 68 *| 					if (width > instance.options.resizeLimit.x[0] && width < instance.options.resizeLimit.x[1]){
/* 69 *| 						content.setStyle('width', width);
/* 70 *| 					}
/* 71 *| 					if (height > instance.options.resizeLimit.y[0] && height < instance.options.resizeLimit.y[1]){
/* 72 *| 						content.setStyle('height', height);
/* 73 *| 					}
/* 74 *| 
/* 75 *| 				}*/
/* 76 */ 
/* 77 */ 				var left = (x + (col * col_width));
/* 78 */ 				var top = (y + (row * col_height));
/* 79 */ 
/* 80 */ 				instance.windowEl.setStyles({
/* 81 */ 					'left': left,
/* 82 */ 					'top': top
/* 83 */ 				});
/* 84 */ 
/* 85 */ 				instance.drawWindow(instance.windowEl);
/* 86 */ 
/* 87 */ 				MochaUI.focusWindow(instance.windowEl);
/* 88 */ 
/* 89 */ 				if (++col === cols) {
/* 90 */ 					row++;
/* 91 */ 					col = 0;
/* 92 */ 				}
/* 93 */ 			}
/* 94 */ 		}.bind(this));
/* 95 */ 	}
/* 96 */ });
