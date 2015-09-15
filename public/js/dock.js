
/* Dock.js */

/* 1   */ /*
/* 2   *| 
/* 3   *| Script: Dock.js
/* 4   *| 	Implements the dock/taskbar. Enables window minimize.
/* 5   *| 
/* 6   *| Copyright:
/* 7   *| 	Copyright (c) 2007-2008 Greg Houston, <http://greghoustondesign.com/>.	
/* 8   *| 
/* 9   *| License:
/* 10  *| 	MIT-style license.
/* 11  *| 
/* 12  *| Requires:
/* 13  *| 	Core.js, Window.js, Layout.js	
/* 14  *| 
/* 15  *| Todo:
/* 16  *| 	- Make it so the dock requires no initial html markup.
/* 17  *| 
/* 18  *| */
/* 19  */ 
/* 20  */ MochaUI.options.extend({
/* 21  */ 		// Naming options:
/* 22  */ 		// If you change the IDs of the Mocha Desktop containers in your HTML, you need to change them here as well.
/* 23  */ 		dockWrapper: 'dockWrapper',
/* 24  */ 		dock:        'dock'
/* 25  */ });
/* 26  */ 
/* 27  */ // Used by Desktop.js before MochaUI.Dock is initialized.
/* 28  */ window.addEvent('domready', function(){	
/* 29  */ 	if ($('dockWrapper')) {
/* 30  */ 		MochaUI.dockVisible = true;
/* 31  */ 	}
/* 32  */ });
/* 33  */ 
/* 34  */ MochaUI.extend({
/* 35  */ 	/*
/* 36  *| 
/* 37  *| 	Function: minimizeAll
/* 38  *| 		Minimize all windows that are minimizable.
/* 39  *| 
/* 40  *| 	*/	
/* 41  */ 	minimizeAll: function() {
/* 42  */ 		$$('div.mocha').each(function(windowEl){
/* 43  */ 		var currentInstance = MochaUI.Windows.instances.get(windowEl.id);
/* 44  */ 			if (!currentInstance.isMinimized && currentInstance.options.minimizable == true){
/* 45  */ 				MochaUI.Dock.minimizeWindow(windowEl);
/* 46  */ 			}
/* 47  */ 		}.bind(this));
/* 48  */ 	}
/* 49  */ });
/* 50  */ 

/* Dock.js */

/* 51  */ MochaUI.Dock = new Class({
/* 52  */ 	Extends: MochaUI.Window,
/* 53  */ 
/* 54  */ 	Implements: [Events, Options],
/* 55  */ 
/* 56  */ 	options: {
/* 57  */ 		useControls:          true,      // Toggles autohide and dock placement controls.
/* 58  */ 		dockPosition:         'top',     // Position the dock starts in, top or bottom.
/* 59  */ 		// Style options
/* 60  */ 		dockTabColor:         [255, 255, 255],
/* 61  */ 		trueButtonColor:      [70, 245, 70],     // Color for autohide on
/* 62  */ 		enabledButtonColor:   [125, 208, 250], 
/* 63  */ 		disabledButtonColor:  [170, 170, 170]
/* 64  */ 	},
/* 65  */ 	initialize: function(options){
/* 66  */ 		// Stops if MochaUI.Desktop is not implemented
/* 67  */ 		if (!MochaUI.Desktop) return;
/* 68  */ 		this.setOptions(options);
/* 69  */ 		
/* 70  */ 		this.dockWrapper   = $(MochaUI.options.dockWrapper);
/* 71  */ 		this.dock          = $(MochaUI.options.dock);
/* 72  */ 		this.autoHideEvent = null;		
/* 73  */ 		this.dockAutoHide  = false;  // True when dock autohide is set to on, false if set to off
/* 74  */ 
/* 75  */ 		if (!this.dockWrapper) return;
/* 76  */ 
/* 77  */ 		if (!this.options.useControls){
/* 78  */ 			if($('dockPlacement')){
/* 79  */ 				$('dockPlacement').setStyle('cursor', 'default');
/* 80  */ 			}
/* 81  */ 			if($('dockAutoHide')){
/* 82  */ 				$('dockAutoHide').setStyle('cursor', 'default');
/* 83  */ 			}
/* 84  */ 		}
/* 85  */ 
/* 86  */ 		this.dockWrapper.setStyles({
/* 87  */ 			'display':  'block',
/* 88  */ 			'position': 'absolute',
/* 89  */ 			'top':      null,
/* 90  */ 			'bottom':   MochaUI.Desktop.desktopFooter ? MochaUI.Desktop.desktopFooter.offsetHeight : 0,
/* 91  */ 			'left':     0
/* 92  */ 		});
/* 93  */ 		
/* 94  */ 		if (this.options.useControls){
/* 95  */ 			this.initializeDockControls();
/* 96  */ 		}
/* 97  */ 
/* 98  */ 		// Add check mark to menu if link exists in menu
/* 99  */ 		if ($('dockLinkCheck')){
/* 100 */ 			this.sidebarCheck = new Element('div', {

/* Dock.js */

/* 101 */ 				'class': 'check',
/* 102 */ 				'id': 'dock_check'
/* 103 */ 			}).inject($('dockLinkCheck'));
/* 104 */ 		}
/* 105 */ 
/* 106 */ 		this.dockSortables = new Sortables('#dockSort', {
/* 107 */ 			opacity: Browser.Engine.trident ? 1 : .5,
/* 108 */ 			constrain: true,
/* 109 */ 			clone: false,
/* 110 */ 			revert: false
/* 111 */ 		});
/* 112 */ 
/* 113 */ 		MochaUI.Desktop.setDesktopSize();
/* 114 */ 	},
/* 115 */ 	initializeDockControls: function(){
/* 116 */ 		
/* 117 */ 		if (this.options.useControls){
/* 118 */ 			// Insert canvas
/* 119 */ 			var canvas = new Element('canvas', {
/* 120 */ 				'id':     'dockCanvas',
/* 121 */ 				'width':  '15',
/* 122 */ 				'height': '18'
/* 123 */ 			}).inject(this.dock);
/* 124 */ 
/* 125 */ 			// Dynamically initialize canvas using excanvas. This is only required by IE
/* 126 */ 			if (Browser.Engine.trident && MochaUI.ieSupport == 'excanvas'){
/* 127 */ 				G_vmlCanvasManager.initElement(canvas);
/* 128 */ 			}
/* 129 */ 		}
/* 130 */ 		
/* 131 */ 		var dockPlacement = $('dockPlacement');
/* 132 */ 		var dockAutoHide = $('dockAutoHide');
/* 133 */ 
/* 134 */ 		// Position top or bottom selector
/* 135 */ 		dockPlacement.setProperty('title','Position Dock Top');
/* 136 */ 
/* 137 */ 		// Attach event
/* 138 */ 		dockPlacement.addEvent('click', function(){
/* 139 */ 			this.moveDock();
/* 140 */ 		}.bind(this));
/* 141 */ 
/* 142 */ 		// Auto Hide toggle switch
/* 143 */ 		dockAutoHide.setProperty('title','Turn Auto Hide On');
/* 144 */ 		
/* 145 */ 		// Attach event Auto Hide 
/* 146 */ 		dockAutoHide.addEvent('click', function(event){
/* 147 */ 			if ( this.dockWrapper.getProperty('dockPosition') == 'top' )
/* 148 */ 				return false;
/* 149 */ 
/* 150 */ 			var ctx = $('dockCanvas').getContext('2d');

/* Dock.js */

/* 151 */ 			this.dockAutoHide = !this.dockAutoHide;	// Toggle
/* 152 */ 			if (this.dockAutoHide){
/* 153 */ 				$('dockAutoHide').setProperty('title', 'Turn Auto Hide Off');
/* 154 */ 				//ctx.clearRect(0, 11, 100, 100);
/* 155 */ 				MochaUI.circle(ctx, 5 , 14, 3, this.options.trueButtonColor, 1.0);
/* 156 */ 
/* 157 */ 				// Define event
/* 158 */ 				this.autoHideEvent = function(event) {
/* 159 */ 					if (!this.dockAutoHide)
/* 160 */ 						return;
/* 161 */ 					if (!MochaUI.Desktop.desktopFooter) {
/* 162 */ 						var dockHotspotHeight = this.dockWrapper.offsetHeight;
/* 163 */ 						if (dockHotspotHeight < 25) dockHotspotHeight = 25;
/* 164 */ 					}
/* 165 */ 					else if (MochaUI.Desktop.desktopFooter) {
/* 166 */ 						var dockHotspotHeight = this.dockWrapper.offsetHeight + MochaUI.Desktop.desktopFooter.offsetHeight;
/* 167 */ 						if (dockHotspotHeight < 25) dockHotspotHeight = 25;
/* 168 */ 					}						
/* 169 */ 					if (!MochaUI.Desktop.desktopFooter && event.client.y > (document.getCoordinates().height - dockHotspotHeight)){
/* 170 */ 						if (!MochaUI.dockVisible){
/* 171 */ 							this.dockWrapper.setStyle('display', 'block');
/* 172 */ 							MochaUI.dockVisible = true;
/* 173 */ 							MochaUI.Desktop.setDesktopSize();
/* 174 */ 						}
/* 175 */ 					}
/* 176 */ 					else if (MochaUI.Desktop.desktopFooter && event.client.y > (document.getCoordinates().height - dockHotspotHeight)){
/* 177 */ 						if (!MochaUI.dockVisible){
/* 178 */ 							this.dockWrapper.setStyle('display', 'block');
/* 179 */ 							MochaUI.dockVisible = true;
/* 180 */ 							MochaUI.Desktop.setDesktopSize();
/* 181 */ 						}
/* 182 */ 					}
/* 183 */ 					else if (MochaUI.dockVisible){
/* 184 */ 						this.dockWrapper.setStyle('display', 'none');
/* 185 */ 						MochaUI.dockVisible = false;
/* 186 */ 						MochaUI.Desktop.setDesktopSize();
/* 187 */ 						
/* 188 */ 					}
/* 189 */ 				}.bind(this);
/* 190 */ 
/* 191 */ 				// Add event
/* 192 */ 				document.addEvent('mousemove', this.autoHideEvent);
/* 193 */ 
/* 194 */ 			} else {
/* 195 */ 				$('dockAutoHide').setProperty('title', 'Turn Auto Hide On');
/* 196 */ 				//ctx.clearRect(0, 11, 100, 100);
/* 197 */ 				MochaUI.circle(ctx, 5 , 14, 3, this.options.enabledButtonColor, 1.0);
/* 198 */ 				// Remove event
/* 199 */ 				document.removeEvent('mousemove', this.autoHideEvent);
/* 200 */ 			}

/* Dock.js */

/* 201 */ 
/* 202 */ 		}.bind(this));
/* 203 */ 
/* 204 */ 		// Draw dock controls
/* 205 */ 		var ctx = $('dockCanvas').getContext('2d');
/* 206 */ 		ctx.clearRect(0, 0, 100, 100);
/* 207 */ 		MochaUI.circle(ctx, 5 , 4, 3, this.options.enabledButtonColor, 1.0);
/* 208 */ 		MochaUI.circle(ctx, 5 , 14, 3, this.options.enabledButtonColor, 1.0);
/* 209 */ 		
/* 210 */ 		if (this.options.dockPosition == 'top'){
/* 211 */ 			this.moveDock();
/* 212 */ 		}
/* 213 */ 
/* 214 */ 	},
/* 215 */ 	moveDock: function(){
/* 216 */ 			var ctx = $('dockCanvas').getContext('2d');
/* 217 */ 			// Move dock to top position
/* 218 */ 			if (this.dockWrapper.getStyle('position') != 'relative'){
/* 219 */ 				this.dockWrapper.setStyles({
/* 220 */ 					'position': 'relative',
/* 221 */ 					'bottom':   null
/* 222 */ 				});
/* 223 */ 				this.dockWrapper.addClass('top');
/* 224 */ 				MochaUI.Desktop.setDesktopSize();
/* 225 */ 				this.dockWrapper.setProperty('dockPosition','top');
/* 226 */ 				ctx.clearRect(0, 0, 100, 100);
/* 227 */ 				MochaUI.circle(ctx, 5, 4, 3, this.options.enabledButtonColor, 1.0);
/* 228 */ 				MochaUI.circle(ctx, 5, 14, 3, this.options.disabledButtonColor, 1.0);
/* 229 */ 				$('dockPlacement').setProperty('title', 'Position Dock Bottom');
/* 230 */ 				$('dockAutoHide').setProperty('title', 'Auto Hide Disabled in Top Dock Position');
/* 231 */ 				this.dockAutoHide = false;
/* 232 */ 			}
/* 233 */ 			// Move dock to bottom position
/* 234 */ 			else {
/* 235 */ 				this.dockWrapper.setStyles({
/* 236 */ 					'position':      'absolute',
/* 237 */ 					'bottom':        MochaUI.Desktop.desktopFooter ? MochaUI.Desktop.desktopFooter.offsetHeight : 0
/* 238 */ 				});
/* 239 */ 				this.dockWrapper.removeClass('top');
/* 240 */ 				MochaUI.Desktop.setDesktopSize();
/* 241 */ 				this.dockWrapper.setProperty('dockPosition', 'bottom');
/* 242 */ 				ctx.clearRect(0, 0, 100, 100);
/* 243 */ 				MochaUI.circle(ctx, 5, 4, 3, this.options.enabledButtonColor, 1.0);
/* 244 */ 				MochaUI.circle(ctx, 5 , 14, 3, this.options.enabledButtonColor, 1.0);
/* 245 */ 				$('dockPlacement').setProperty('title', 'Position Dock Top');
/* 246 */ 				$('dockAutoHide').setProperty('title', 'Turn Auto Hide On');
/* 247 */ 			}
/* 248 */ 	},
/* 249 */ 	createDockTab: function(windowEl){
/* 250 */ 

/* Dock.js */

/* 251 */ 		var currentInstance = MochaUI.Windows.instances.get(windowEl.id);
/* 252 */ 
/* 253 */ 		var dockTab = new Element('div', {
/* 254 */ 			'id': currentInstance.options.id + '_dockTab',
/* 255 */ 			'class': 'dockTab',
/* 256 */ 			'title': titleText
/* 257 */ 		}).inject($('dockClear'), 'before');
/* 258 */ 		
/* 259 */ 		dockTab.addEvent('mousedown', function(e){
/* 260 */ 			new Event(e).stop();
/* 261 */ 			this.timeDown = $time();
/* 262 */ 		});
/* 263 */ 		
/* 264 */ 		dockTab.addEvent('mouseup', function(e){
/* 265 */ 			this.timeUp = $time();
/* 266 */ 			if ((this.timeUp - this.timeDown) < 275){
/* 267 */ 				// If the visibility of the windows on the page are toggled off, toggle visibility on.
/* 268 */ 				if (MochaUI.Windows.windowsVisible == false) {
/* 269 */ 					MochaUI.toggleWindowVisibility();
/* 270 */ 					if (currentInstance.isMinimized == true) {
/* 271 */ 						MochaUI.Dock.restoreMinimized.delay(25, MochaUI.Dock, windowEl);
/* 272 */ 					}
/* 273 */ 					else {
/* 274 */ 						MochaUI.focusWindow(windowEl);
/* 275 */ 					}
/* 276 */ 					return;
/* 277 */ 				}
/* 278 */ 				// If window is minimized, restore window.
/* 279 */ 				if (currentInstance.isMinimized == true) {
/* 280 */ 					MochaUI.Dock.restoreMinimized.delay(25, MochaUI.Dock, windowEl);
/* 281 */ 				}
/* 282 */ 				else{
/* 283 */ 					// If window is not minimized and is focused, minimize window.
/* 284 */ 					if (currentInstance.windowEl.hasClass('isFocused') && currentInstance.options.minimizable == true){
/* 285 */ 						MochaUI.Dock.minimizeWindow(windowEl)
/* 286 */ 					}
/* 287 */ 					// If window is not minimized and is not focused, focus window.	
/* 288 */ 					else{
/* 289 */ 						MochaUI.focusWindow(windowEl);
/* 290 */ 					}
/* 291 */ 					// if the window is not minimized and is outside the viewport, center it in the viewport.
/* 292 */ 					var coordinates = document.getCoordinates();
/* 293 */ 					if (windowEl.getStyle('left').toInt() > coordinates.width || windowEl.getStyle('top').toInt() > coordinates.height){
/* 294 */ 						MochaUI.centerWindow(windowEl);	
/* 295 */ 					}
/* 296 */ 				}
/* 297 */ 			}
/* 298 */ 		});
/* 299 */ 
/* 300 */ 		this.dockSortables.addItems(dockTab);

/* Dock.js */

/* 301 */ 
/* 302 */ 		var titleText = currentInstance.titleEl.innerHTML;
/* 303 */ 
/* 304 */ 		var dockTabText = new Element('div', {
/* 305 */ 			'id': currentInstance.options.id + '_dockTabText',
/* 306 */ 			'class': 'dockText'
/* 307 */ 		}).set('html', titleText.substring(0,20) + (titleText.length > 20 ? '...' : '')).inject($(dockTab));
/* 308 */ 
/* 309 */ 		// If I implement this again, will need to also adjust the titleText truncate and the tab's
/* 310 */ 		// left padding.
/* 311 */ 		if (currentInstance.options.icon != false){
/* 312 */ 			// dockTabText.setStyle('background', 'url(' + currentInstance.options.icon + ') 4px 4px no-repeat');
/* 313 */ 		}
/* 314 */ 		
/* 315 */ 		// Need to resize everything in case the dock wraps when a new tab is added
/* 316 */ 		MochaUI.Desktop.setDesktopSize();
/* 317 */ 
/* 318 */ 	},
/* 319 */ 	makeActiveTab: function(){
/* 320 */ 
/* 321 */ 		// getWindowWith HighestZindex is used in case the currently focused window
/* 322 */ 		// is closed.		
/* 323 */ 		var windowEl = MochaUI.getWindowWithHighestZindex();
/* 324 */ 		var currentInstance = MochaUI.Windows.instances.get(windowEl.id);
/* 325 */ 		
/* 326 */ 		$$('div.dockTab').removeClass('activeDockTab');
/* 327 */ 		if (currentInstance.isMinimized != true) {
/* 328 */ 			
/* 329 */ 			currentInstance.windowEl.addClass('isFocused');
/* 330 */ 
/* 331 */ 			var currentButton = $(currentInstance.options.id + '_dockTab');
/* 332 */ 			if (currentButton != null) {
/* 333 */ 				currentButton.addClass('activeDockTab');
/* 334 */ 			}
/* 335 */ 		}
/* 336 */ 		else {
/* 337 */ 			currentInstance.windowEl.removeClass('isFocused');
/* 338 */ 		}	
/* 339 */ 	},	
/* 340 */ 	minimizeWindow: function(windowEl){
/* 341 */ 		if (windowEl != $(windowEl)) return;
/* 342 */ 		
/* 343 */ 		var currentInstance = MochaUI.Windows.instances.get(windowEl.id);
/* 344 */ 		currentInstance.isMinimized = true;
/* 345 */ 
/* 346 */ 		// Hide iframe
/* 347 */ 		// Iframe should be hidden when minimizing, maximizing, and moving for performance and Flash issues
/* 348 */ 		if ( currentInstance.iframeEl ) {
/* 349 */ 			currentInstance.iframeEl.setStyle('visibility', 'hidden');
/* 350 */ 		}

/* Dock.js */

/* 351 */ 
/* 352 */ 		// Hide window and add to dock	
/* 353 */ 		currentInstance.contentBorderEl.setStyle('visibility', 'hidden');
/* 354 */ 		if(currentInstance.toolbarWrapperEl){		
/* 355 */ 			currentInstance.toolbarWrapperEl.setStyle('visibility', 'hidden');
/* 356 */ 		}
/* 357 */ 		windowEl.setStyle('visibility', 'hidden');
/* 358 */ 
/* 359 */ 		 // Fixes a scrollbar issue in Mac FF2
/* 360 */ 		if (Browser.Platform.mac && Browser.Engine.gecko){
/* 361 */ 			if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
/* 362 */ 				var ffversion = new Number(RegExp.$1);
/* 363 */ 				if (ffversion < 3) {
/* 364 */ 					currentInstance.contentWrapperEl.setStyle('overflow', 'hidden');
/* 365 */ 				}
/* 366 */ 			}
/* 367 */ 		}
/* 368 */ 	
/* 369 */ 		MochaUI.Desktop.setDesktopSize();
/* 370 */ 
/* 371 */ 		// Have to use timeout because window gets focused when you click on the minimize button
/* 372 */ 		setTimeout(function(){
/* 373 */ 			windowEl.setStyle('zIndex', 1);
/* 374 */ 			windowEl.removeClass('isFocused');
/* 375 */ 			this.makeActiveTab();	
/* 376 */ 		}.bind(this),100);	
/* 377 */ 
/* 378 */ 		currentInstance.fireEvent('onMinimize', windowEl);
/* 379 */ 	},
/* 380 */ 	restoreMinimized: function(windowEl) {
/* 381 */ 
/* 382 */ 		var currentInstance = MochaUI.Windows.instances.get(windowEl.id);
/* 383 */ 
/* 384 */ 		if (currentInstance.isMinimized == false) return;
/* 385 */ 
/* 386 */ 		if (MochaUI.Windows.windowsVisible == false){
/* 387 */ 			MochaUI.toggleWindowVisibility();
/* 388 */ 		}
/* 389 */ 
/* 390 */ 		MochaUI.Desktop.setDesktopSize();
/* 391 */ 
/* 392 */ 		 // Part of Mac FF2 scrollbar fix
/* 393 */ 		if (currentInstance.options.scrollbars == true && !currentInstance.iframeEl){ 
/* 394 */ 			currentInstance.contentWrapperEl.setStyle('overflow', 'auto');
/* 395 */ 		}
/* 396 */ 
/* 397 */ 		if (currentInstance.isCollapsed) {
/* 398 */ 			MochaUI.collapseToggle(windowEl);
/* 399 */ 		}
/* 400 */ 

/* Dock.js */

/* 401 */ 		windowEl.setStyle('visibility', 'visible');
/* 402 */ 		currentInstance.contentBorderEl.setStyle('visibility', 'visible');
/* 403 */ 		if(currentInstance.toolbarWrapperEl){
/* 404 */ 			currentInstance.toolbarWrapperEl.setStyle('visibility', 'visible');
/* 405 */ 		}
/* 406 */ 
/* 407 */ 		// Show iframe
/* 408 */ 		if ( currentInstance.iframeEl ) {
/* 409 */ 			currentInstance.iframeEl.setStyle('visibility', 'visible');
/* 410 */ 		}
/* 411 */ 
/* 412 */ 		currentInstance.isMinimized = false;
/* 413 */ 		MochaUI.focusWindow(windowEl);
/* 414 */ 		currentInstance.fireEvent('onRestore', windowEl);
/* 415 */ 
/* 416 */ 	}
/* 417 */ });
/* 418 */ MochaUI.Dock.implement(new Options, new Events);
/* 419 */ 
