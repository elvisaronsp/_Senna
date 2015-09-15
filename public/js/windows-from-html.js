
/* Windows-from-html.js */

/* 1  */ /*
/* 2  *| 
/* 3  *| Script: Windows-from-html.js
/* 4  *| 	Create windows from html markup in page.
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
/* 15 *| Example:
/* 16 *| 	HTML markup.
/* 17 *| 	(start code)
/* 18 *| <div class="mocha" id="mywindow" style="width:300px;height:255px;top:50px;left:350px">
/* 19 *| 	<h3 class="mochaTitle">My Window</h3>
/* 20 *| 	<p>My Window Content</p>
/* 21 *| </div>	
/* 22 *| 	(end)
/* 23 *| 
/* 24 *| See Also:
/* 25 *| 	<Window>
/* 26 *| 
/* 27 *| */
/* 28 */ 
/* 29 */ MochaUI.extend({
/* 30 */ 	NewWindowsFromHTML: function(){
/* 31 */ 		$$('div.mocha').each(function(el) {
/* 32 */ 			// Get the window title and destroy that element, so it does not end up in window content
/* 33 */ 			if ( Browser.Engine.presto || Browser.Engine.trident5 ){
/* 34 */ 				el.setStyle('display','block'); // Required by Opera, and probably IE7
/* 35 */ 			}
/* 36 */ 			var title = el.getElement('h3.mochaTitle');
/* 37 */ 			var elDimensions = el.getStyles('height', 'width');
/* 38 */ 			var properties = {
/* 39 */ 				id: el.getProperty('id'),
/* 40 */ 				height: elDimensions.height.toInt(),
/* 41 */ 				width: elDimensions.width.toInt(),
/* 42 */ 				x: el.getStyle('left').toInt(),
/* 43 */ 				y: el.getStyle('top').toInt()
/* 44 */ 			};
/* 45 */ 			// If there is a title element, set title and destroy the element so it does not end up in window content
/* 46 */ 			if ( title ) {
/* 47 */ 				properties.title = title.innerHTML;
/* 48 */ 				title.destroy();
/* 49 */ 			}
/* 50 */ 		

/* Windows-from-html.js */

/* 51 */ 			// Get content and destroy the element
/* 52 */ 			properties.content = el.innerHTML;
/* 53 */ 			el.destroy();
/* 54 */ 			
/* 55 */ 			// Create window
/* 56 */ 			new MochaUI.Window(properties, true);
/* 57 */ 		}.bind(this));
/* 58 */ 	}
/* 59 */ });
/* 60 */ 
