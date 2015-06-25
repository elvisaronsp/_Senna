
/* Core.js */

/* 1   */ /* 
/* 2   *| 
/* 3   *| Script: Core.js
/* 4   *| 	MochaUI - A Web Applications User Interface Framework.
/* 5   *| 
/* 6   *| Copyright:
/* 7   *| 	Copyright (c) 2007-2008 Greg Houston, <http://greghoustondesign.com/>.
/* 8   *| 
/* 9   *| License:
/* 10  *| 	MIT-style license.
/* 11  *| 
/* 12  *| Contributors:
/* 13  *| 	- Scott F. Frederick
/* 14  *| 	- Joel Lindau
/* 15  *| 
/* 16  *| Note:
/* 17  *| 	This documentation is taken directly from the javascript source files. It is built using Natural Docs.
/* 18  *| 
/* 19  *| Todo:
/* 20  *| 	Consider making title tooltips optional and using them more often.
/* 21  *| 
/* 22  *| */
/* 23  */ 
/* 24  */ var MochaUI = new Hash({
/* 25  */ 	options: new Hash({
/* 26  */ 		useEffects: false  // Toggles the majority of window fade and move effects.
/* 27  */ 	}),
/* 28  */ 	Columns: {
/* 29  */ 		instances:      new Hash()
/* 30  */ 	},
/* 31  */ 	Panels: {
/* 32  */ 		instances:      new Hash()
/* 33  */ 	},		
/* 34  */ 	Windows: {	  
/* 35  */ 		instances:      new Hash(),
/* 36  */ 		indexLevel:     100,          // Used for z-Index
/* 37  */ 		windowIDCount:  0,	          // Used for windows without an ID defined by the user
/* 38  */ 		windowsVisible: true          // Ctrl-Alt-Q to toggle window visibility
/* 39  */ 	},	
/* 40  */ 	ieSupport:  'excanvas',   // Makes it easier to switch between Excanvas and Moocanvas for testing
/* 41  */ 	focusingWindow: 'false',
/* 42  */ 	/*
/* 43  *| 	
/* 44  *| 	Function: updateContent
/* 45  *| 		Replace the content of a window or panel.
/* 46  *| 		
/* 47  *| 	Arguments:
/* 48  *| 		element - The parent window or panel.
/* 49  *| 		childElement - The child element of the window or panel recieving the content.
/* 50  *| 		title - (string) Change this if you want to change the title of the window or panel.

/* Core.js */

/* 51  *| 		content - (string or element) An html loadMethod option.
/* 52  *| 		loadMethod - ('html', 'xhr', or 'iframe') Defaults to 'html'.
/* 53  *| 		url - Used if loadMethod is set to 'xhr' or 'iframe'.
/* 54  *| 		padding - (object)
/* 55  *| 
/* 56  *| 	*/	
/* 57  */ 	updateContent: function(updateOptions){
/* 58  */ 
/* 59  */ 		var options = {
/* 60  */ 			'element':      null,
/* 61  */ 			'childElement': null,
/* 62  */ 			'title':        null,
/* 63  */ 			'content':      null,
/* 64  */ 			'loadMethod':   null,
/* 65  */ 			'url':          null,
/* 66  */ 			'padding':      null
/* 67  */ 		};
/* 68  */ 		$extend(options, updateOptions);
/* 69  */ 
/* 70  */ 		if (!options.element) return;
/* 71  */ 		var element = options.element;
/* 72  */ 
/* 73  */ 		if (MochaUI.Windows.instances.get(element.id)) {
/* 74  */ 			var recipient = 'window';
/* 75  */ 			var currentInstance = MochaUI.Windows.instances.get(element.id);
/* 76  */ 			var spinnerEl = currentInstance.spinnerEl;
/* 77  */ 			if (options.title) {
/* 78  */ 				currentInstance.titleEl.set('html', options.title);
/* 79  */ 			}
/* 80  */ 		}
/* 81  */ 		else {
/* 82  */ 			var recipient = 'panel';
/* 83  */ 			var currentInstance = MochaUI.Panels.instances.get(element.id);
/* 84  */ 			if (options.title) {
/* 85  */ 				currentInstance.titleEl.set('html', options.title);
/* 86  */ 			}
/* 87  */ 		}
/* 88  */ 
/* 89  */ 		var contentEl = currentInstance.contentEl;
/* 90  */ 		if (options.childElement != null) {
/* 91  */ 			var contentContainer = options.childElement;
/* 92  */ 		}
/* 93  */ 		else {
/* 94  */ 			var contentContainer = currentInstance.contentEl;
/* 95  */ 		}
/* 96  */ 		
/* 97  */ 		var loadMethod = options.loadMethod != null ? options.loadMethod : currentInstance.options.loadMethod;
/* 98  */ 		
/* 99  */ 		// Set scrollbars if loading content in main content container.
/* 100 */ 		// Always use 'hidden' for iframe windows

/* Core.js */

/* 101 */ 		if (contentContainer == currentInstance.contentEl) {
/* 102 */ 			currentInstance.contentWrapperEl.setStyles({
/* 103 */ 				'overflow': currentInstance.options.scrollbars == true && loadMethod != 'iframe' ? 'auto' : 'hidden'
/* 104 */ 			});
/* 105 */ 		}
/* 106 */ 
/* 107 */ 		var contentWrapperEl = currentInstance.contentWrapperEl;
/* 108 */ 		
/* 109 */ 		if (options.padding != null) {
/* 110 */ 			contentEl.setStyles({
/* 111 */ 				'padding-top': options.padding.top,
/* 112 */ 				'padding-bottom': options.padding.bottom,
/* 113 */ 				'padding-left': options.padding.left,
/* 114 */ 				'padding-right': options.padding.right
/* 115 */ 			});
/* 116 */ 		}
/* 117 */ 
/* 118 */ 		// Remove old content.
/* 119 */ 		if (contentContainer == contentEl){
/* 120 */ 			contentEl.empty();
/* 121 */ 		}
/* 122 */ 
/* 123 */ 		// Load new content.
/* 124 */ 		switch(loadMethod){
/* 125 */ 			case 'xhr':
/* 126 */ 				new Request.HTML({
/* 127 */ 					url: options.url,
/* 128 */ 					update: contentContainer,
/* 129 */ 					evalScripts: currentInstance.options.evalScripts,
/* 130 */ 					evalResponse: currentInstance.options.evalResponse,
/* 131 */ 					onRequest: function(){
/* 132 */ 						if (recipient == 'window' && contentContainer == contentEl){
/* 133 */ 							currentInstance.showSpinner(spinnerEl);
/* 134 */ 						}
/* 135 */ 						else if (recipient == 'panel' && contentContainer == contentEl && $('spinner')){
/* 136 */ 							$('spinner').setStyle('visibility','visible');	
/* 137 */ 						}
/* 138 */ 					}.bind(this),
/* 139 */ 					onFailure: function(){
/* 140 */ 						if (contentContainer == contentEl){
/* 141 */ 							contentContainer.set('html','<p><strong>Error Loading XMLHttpRequest</strong></p>');
/* 142 */ 							if (recipient == 'window') {
/* 143 */ 								currentInstance.hideSpinner(spinnerEl);
/* 144 */ 							}
/* 145 */ 							else if (recipient == 'panel' && $('spinner')) {
/* 146 */ 								$('spinner').setStyle('visibility', 'hidden');
/* 147 */ 							}
/* 148 */ 						}
/* 149 */ 					}.bind(this),
/* 150 */ 					onException: function(){}.bind(this),

/* Core.js */

/* 151 */ 					onSuccess: function(){
/* 152 */ 						if (contentContainer == contentEl){
/* 153 */ 							if (recipient == 'window'){
/* 154 */ 								currentInstance.hideSpinner(spinnerEl);
/* 155 */ 							}
/* 156 */ 							else if (recipient == 'panel' && $('spinner')){
/* 157 */ 								$('spinner').setStyle('visibility', 'hidden');
/* 158 */ 							}
/* 159 */ 							currentInstance.fireEvent('onContentLoaded', element);
/* 160 */ 						}
/* 161 */ 					}.bind(this),
/* 162 */ 					onComplete: function(){}.bind(this)
/* 163 */ 				}).get();
/* 164 */ 				break;
/* 165 */ 			case 'iframe': // May be able to streamline this if the iframe already exists.
/* 166 */ 				if ( currentInstance.options.contentURL == '' || contentContainer != contentEl) {
/* 167 */ 					break;
/* 168 */ 				}
/* 169 */ 				currentInstance.iframeEl = new Element('iframe', {
/* 170 */ 					'id': currentInstance.options.id + '_iframe',
/* 171 */ 					'name':  currentInstance.options.id + '_iframe',
/* 172 */ 					'class': 'mochaIframe',
/* 173 */ 					'src': options.url,
/* 174 */ 					'marginwidth':  0,
/* 175 */ 					'marginheight': 0,
/* 176 */ 					'frameBorder':  0,
/* 177 */ 					'scrolling':    'auto',
/* 178 */ 					'styles': {
/* 179 */ 						'height': contentWrapperEl.offsetHeight - contentWrapperEl.getStyle('border-top').toInt() - contentWrapperEl.getStyle('border-bottom').toInt(),
/* 180 */ 						'width': currentInstance.panelEl ? contentWrapperEl.offsetWidth - contentWrapperEl.getStyle('border-left').toInt() - contentWrapperEl.getStyle('border-right').toInt() : '100%'	
/* 181 */ 					}
/* 182 */ 				}).injectInside(contentEl);
/* 183 */ 
/* 184 */ 				// Add onload event to iframe so we can hide the spinner and run onContentLoaded()
/* 185 */ 				currentInstance.iframeEl.addEvent('load', function(e) {
/* 186 */ 					if (recipient == 'window') {
/* 187 */ 						currentInstance.hideSpinner(spinnerEl);
/* 188 */ 					}
/* 189 */ 					else if (recipient == 'panel' && contentContainer == contentEl && $('spinner')) {
/* 190 */ 						$('spinner').setStyle('visibility', 'hidden');
/* 191 */ 					}
/* 192 */ 					currentInstance.fireEvent('onContentLoaded', element);
/* 193 */ 				}.bind(this));
/* 194 */ 				if (recipient == 'window') {
/* 195 */ 					currentInstance.showSpinner(spinnerEl);
/* 196 */ 				}
/* 197 */ 				else if (recipient == 'panel' && contentContainer == contentEl && $('spinner')){
/* 198 */ 					$('spinner').setStyle('visibility', 'visible');	
/* 199 */ 				}
/* 200 */ 				break;

/* Core.js */

/* 201 */ 			case 'html':
/* 202 */ 			default:
/* 203 */ 				// Need to test injecting elements as content.
/* 204 */ 				var elementTypes = new Array('element', 'textnode', 'whitespace', 'collection');
/* 205 */ 				if (elementTypes.contains($type(options.content))){
/* 206 */ 					options.content.inject(contentContainer);
/* 207 */ 				} else {
/* 208 */ 					contentContainer.set('html', options.content);
/* 209 */ 				}
/* 210 */ 				currentInstance.fireEvent('onContentLoaded', element);
/* 211 */ 				break;
/* 212 */ 		}
/* 213 */ 
/* 214 */ 	},
/* 215 */ 	/*
/* 216 *| 	
/* 217 *| 	Function: reloadIframe
/* 218 *| 		Reload an iframe. Fixes an issue in Firefox when trying to use location.reload on an iframe that has been destroyed and recreated.
/* 219 *| 
/* 220 *| 	Arguments:
/* 221 *| 		iframe - This should be both the name and the id of the iframe.
/* 222 *| 
/* 223 *| 	Syntax:
/* 224 *| 		(start code)
/* 225 *| 		MochaUI.reloadIframe(element);
/* 226 *| 		(end)
/* 227 *| 
/* 228 *| 	Example:
/* 229 *| 		To reload an iframe from within another iframe:
/* 230 *| 		(start code)
/* 231 *| 		parent.MochaUI.reloadIframe('myIframeName');
/* 232 *| 		(end)
/* 233 *| 
/* 234 *| 	*/
/* 235 */ 	reloadIframe: function(iframe){
/* 236 */ 		if (Browser.Engine.gecko) {
/* 237 */ 			$(iframe).src = $(iframe).src;
/* 238 */ 		}
/* 239 */ 		else {
/* 240 */ 			top.frames[iframe].location.reload(true);
/* 241 */ 		}
/* 242 */ 	},
/* 243 */ 	collapseToggle: function(windowEl){
/* 244 */ 		var instances = MochaUI.Windows.instances;
/* 245 */ 		var currentInstance = instances.get(windowEl.id);
/* 246 */ 		var handles = currentInstance.windowEl.getElements('.handle');
/* 247 */ 		if (currentInstance.isMaximized == true) return;		
/* 248 */ 		if (currentInstance.isCollapsed == false) {
/* 249 */ 			currentInstance.isCollapsed = true;
/* 250 */ 			handles.setStyle('display', 'none');

/* Core.js */

/* 251 */ 			if ( currentInstance.iframeEl ) {
/* 252 */ 				currentInstance.iframeEl.setStyle('visibility', 'hidden');
/* 253 */ 			}
/* 254 */ 			currentInstance.contentBorderEl.setStyles({
/* 255 */ 				visibility: 'hidden',
/* 256 */ 				position: 'absolute',
/* 257 */ 				top: -10000,
/* 258 */ 				left: -10000
/* 259 */ 			});
/* 260 */ 			if(currentInstance.toolbarWrapperEl){
/* 261 */ 				currentInstance.toolbarWrapperEl.setStyles({
/* 262 */ 					visibility: 'hidden',
/* 263 */ 					position: 'absolute',
/* 264 */ 					top: -10000,
/* 265 */ 					left: -10000
/* 266 */ 				});
/* 267 */ 			}
/* 268 */ 			currentInstance.drawWindowCollapsed(windowEl);
/* 269 */ 		}
/* 270 */ 		else {
/* 271 */ 			currentInstance.isCollapsed = false;
/* 272 */ 			currentInstance.drawWindow(windowEl);
/* 273 */ 			currentInstance.contentBorderEl.setStyles({
/* 274 */ 				visibility: 'visible',
/* 275 */ 				position: null,
/* 276 */ 				top: null,
/* 277 */ 				left: null
/* 278 */ 			});
/* 279 */ 			if(currentInstance.toolbarWrapperEl){
/* 280 */ 				currentInstance.toolbarWrapperEl.setStyles({
/* 281 */ 					visibility: 'visible',
/* 282 */ 					position: null,
/* 283 */ 					top: null,
/* 284 */ 					left: null
/* 285 */ 				});
/* 286 */ 			}
/* 287 */ 			if ( currentInstance.iframeEl ) {
/* 288 */ 				currentInstance.iframeEl.setStyle('visibility', 'visible');
/* 289 */ 			}
/* 290 */ 			handles.setStyle('display', 'block');
/* 291 */ 		}
/* 292 */ 	},
/* 293 */ 	/*
/* 294 *| 
/* 295 *| 	Function: closeWindow
/* 296 *| 		Closes a window.
/* 297 *| 
/* 298 *| 	Syntax:
/* 299 *| 	(start code)
/* 300 *| 		MochaUI.closeWindow();

/* Core.js */

/* 301 *| 	(end)
/* 302 *| 
/* 303 *| 	Arguments: 
/* 304 *| 		windowEl - the ID of the window to be closed
/* 305 *| 
/* 306 *| 	Returns:
/* 307 *| 		true - the window was closed
/* 308 *| 		false - the window was not closed
/* 309 *| 
/* 310 *| 	*/
/* 311 */ 	closeWindow: function(windowEl){
/* 312 */ 		// Does window exist and is not already in process of closing ?
/* 313 */ 		var instances = MochaUI.Windows.instances;
/* 314 */ 		var currentInstance = instances.get(windowEl.id);
/* 315 */ 		if (windowEl != $(windowEl) || currentInstance.isClosing) return;
/* 316 */ 
/* 317 */ 		currentInstance.isClosing = true;
/* 318 */ 		currentInstance.fireEvent('onClose', windowEl);
/* 319 */ 		if (currentInstance.check) currentInstance.check.destroy();
/* 320 */ 
/* 321 */ 		if ((currentInstance.options.type == 'modal' || currentInstance.options.type == 'modal2') && Browser.Engine.trident4){
/* 322 */ 				$('modalFix').setStyle('display', 'none');
/* 323 */ 		}
/* 324 */ 
/* 325 */ 		if (MochaUI.options.useEffects == false){
/* 326 */ 			if (currentInstance.options.type == 'modal' || currentInstance.options.type == 'modal2'){
/* 327 */ 				// Tratando contador de quantas modais estão abertas [jdrummond]
/* 328 */ 				modalOverlayCount--;
/* 329 */ 				// Caso seja última modal aberta, remove (opacity:0) o overlay
/* 330 */ 				if (modalOverlayCount == 0) {
/* 331 */ 					$('modalOverlay').setStyle('opacity', 0);
/* 332 */ 				}
/* 333 */ 				// Caso ainda exista modais abertas, faz com que o overlay fique na camada anterior à modal mais recente [jdrummond]
/* 334 */ 				else {
/* 335 */ 					$('modalOverlay').setStyle('zIndex',currentInstance.windowEl.style.zIndex - 3);
/* 336 */ 				}
/* 337 */ 			}
/* 338 */ 			MochaUI.closingJobs(windowEl);
/* 339 */ 			return true;	
/* 340 */ 		}
/* 341 */ 		else {
/* 342 */ 			// Redraws IE windows without shadows since IE messes up canvas alpha when you change element opacity
/* 343 */ 			if (Browser.Engine.trident) currentInstance.drawWindow(windowEl, false);
/* 344 */ 			if (currentInstance.options.type == 'modal' || currentInstance.options.type == 'modal2'){
/* 345 */ 				MochaUI.Modal.modalOverlayCloseMorph.start({
/* 346 */ 					'opacity': 0
/* 347 */ 				});
/* 348 */ 			}
/* 349 */ 			var closeMorph = new Fx.Morph(windowEl, {
/* 350 */ 				duration: 120,

/* Core.js */

/* 351 */ 				onComplete: function(){
/* 352 */ 					MochaUI.closingJobs(windowEl);
/* 353 */ 					return true;
/* 354 */ 				}.bind(this)
/* 355 */ 			});
/* 356 */ 			closeMorph.start({
/* 357 */ 				'opacity': .4
/* 358 */ 			});
/* 359 */ 		}
/* 360 */ 
/* 361 */ 	},
/* 362 */ 	closingJobs: function(windowEl){
/* 363 */ 
/* 364 */ 		var instances = MochaUI.Windows.instances;
/* 365 */ 		var currentInstance = instances.get(windowEl.id);
/* 366 */ 		windowEl.setStyle('visibility', 'hidden');
/* 367 */ 		windowEl.destroy();
/* 368 */ 		currentInstance.fireEvent('onCloseComplete');
/* 369 */ 		
/* 370 */ 		if (currentInstance.options.type != 'notification'){
/* 371 */ 			var newFocus = this.getWindowWithHighestZindex();
/* 372 */ 			this.focusWindow(newFocus);
/* 373 */ 		}
/* 374 */ 
/* 375 */ 		instances.erase(currentInstance.options.id);
/* 376 */ 		if (this.loadingWorkspace == true) {
/* 377 */ 			this.windowUnload();
/* 378 */ 		}
/* 379 */ 
/* 380 */ 		if (MochaUI.Dock && $(MochaUI.options.dock) && currentInstance.options.type == 'window') {
/* 381 */ 			var currentButton = $(currentInstance.options.id + '_dockTab');
/* 382 */ 			if (currentButton != null) {
/* 383 */ 				MochaUI.Dock.dockSortables.removeItems(currentButton).destroy();
/* 384 */ 			}
/* 385 */ 			// Need to resize everything in case the dock becomes smaller when a tab is removed
/* 386 */ 			MochaUI.Desktop.setDesktopSize();
/* 387 */ 		}
/* 388 */ 	},
/* 389 */ 	/*
/* 390 *| 	
/* 391 *| 	Function: closeAll	
/* 392 *| 		Close all open windows.
/* 393 *| 
/* 394 *| 	*/
/* 395 */ 	closeAll: function() {		
/* 396 */ 		$$('div.mocha').each(function(windowEl){
/* 397 */ 			this.closeWindow(windowEl);
/* 398 */ 		}.bind(this));
/* 399 */ 	},
/* 400 */ 	/*

/* Core.js */

/* 401 *| 
/* 402 *| 	Function: toggleWindowVisibility
/* 403 *| 		Toggle window visibility with Ctrl-Alt-Q.
/* 404 *| 
/* 405 *| 	*/	
/* 406 */ 	toggleWindowVisibility: function(){
/* 407 */ 		MochaUI.Windows.instances.each(function(instance){
/* 408 */ 			if (instance.options.type == 'modal' || instance.options.type == 'modal2' || instance.isMinimized == true) return;									
/* 409 */ 			var id = $(instance.options.id);
/* 410 */ 			if (id.getStyle('visibility') == 'visible'){
/* 411 */ 				if (instance.iframe){
/* 412 */ 					instance.iframeEl.setStyle('visibility', 'hidden');
/* 413 */ 				}
/* 414 */ 				if (instance.toolbarEl){
/* 415 */ 					instance.toolbarWrapperEl.setStyle('visibility', 'hidden');
/* 416 */ 				}
/* 417 */ 				instance.contentBorderEl.setStyle('visibility', 'hidden');
/* 418 */ 				id.setStyle('visibility', 'hidden');
/* 419 */ 				MochaUI.Windows.windowsVisible = false;
/* 420 */ 			}
/* 421 */ 			else {
/* 422 */ 				id.setStyle('visibility', 'visible');
/* 423 */ 				instance.contentBorderEl.setStyle('visibility', 'visible');
/* 424 */ 				if (instance.iframe){
/* 425 */ 					instance.iframeEl.setStyle('visibility', 'visible');
/* 426 */ 				}
/* 427 */ 				if (instance.toolbarEl){
/* 428 */ 					instance.toolbarWrapperEl.setStyle('visibility', 'visible');
/* 429 */ 				}
/* 430 */ 				MochaUI.Windows.windowsVisible = true;
/* 431 */ 			}
/* 432 */ 		}.bind(this));
/* 433 */ 
/* 434 */ 	},
/* 435 */ 	focusWindow: function(windowEl, fireEvent){
/* 436 */ 
/* 437 */ 		// This is used with blurAll
/* 438 */ 		MochaUI.focusingWindow = 'true';
/* 439 */ 		var windowClicked = function(){
/* 440 */ 			MochaUI.focusingWindow = 'false';
/* 441 */ 		};		
/* 442 */ 		windowClicked.delay(170, this);
/* 443 */ 
/* 444 */ 		// Only focus when needed
/* 445 */ 		if ($$('.mocha').length == 0) return;
/* 446 */ 		if (windowEl != $(windowEl) || windowEl.hasClass('isFocused')) return;
/* 447 */ 
/* 448 */ 		var instances =  MochaUI.Windows.instances;
/* 449 */ 		var currentInstance = instances.get(windowEl.id);
/* 450 */ 	

/* Core.js */

/* 451 */ 		if (currentInstance.options.type == 'notification'){ MochaUI.currentNotification = windowEl; windowEl.setStyle('zIndex',11001); return; }; 
/* 452 */ 
/* 453 */ 		MochaUI.Windows.indexLevel += 2;
/* 454 */ 
/* 455 */ 		// Se for modal, verifica se é a última modal, para que o z-index da janela anterior possa ser reajustado [jdrummond]
/* 456 */ 		if (typeof(modalOverlayCount) == 'undefined' || modalOverlayCount == 0 || currentInstance.options.type != 'modal')
/* 457 */ 			windowEl.setStyle('zIndex', MochaUI.Windows.indexLevel);
/* 458 */ 
/* 459 */ 		// Used when dragging and resizing windows
/* 460 */ 		$('windowUnderlay').setStyle('zIndex', MochaUI.Windows.indexLevel - 1).inject($(windowEl),'after');
/* 461 */ 
/* 462 */ 		// Fire onBlur for the window that lost focus.
/* 463 */ 		instances.each(function(instance){
/* 464 */ 			if (instance.windowEl.hasClass('isFocused')){
/* 465 */ 				instance.fireEvent('onBlur', instance.windowEl);
/* 466 */ 			}
/* 467 */ 			instance.windowEl.removeClass('isFocused');
/* 468 */ 		});
/* 469 */ 
/* 470 */ 		if (MochaUI.Dock && $(MochaUI.options.dock) && currentInstance.options.type == 'window') {
/* 471 */ 			MochaUI.Dock.makeActiveTab();
/* 472 */ 		}
/* 473 */ 		currentInstance.windowEl.addClass('isFocused');
/* 474 */ 
/* 475 */ 		if (fireEvent != false){
/* 476 */ 			currentInstance.fireEvent('onFocus', windowEl);
/* 477 */ 		}
/* 478 */ 
/* 479 */ 	},
/* 480 */ 	getWindowWithHighestZindex: function(){
/* 481 */ 		this.highestZindex = 0;
/* 482 */ 		$$('div.mocha').each(function(element){
/* 483 */ 			this.zIndex = parseInt(element.getStyle('zIndex'));
/* 484 */ 			if (this.zIndex >= this.highestZindex) {
/* 485 */ 				this.highestZindex = parseInt(this.zIndex);
/* 486 */ 			}	
/* 487 */ 		}.bind(this));
/* 488 */ 		$$('div.mocha').each(function(element){
/* 489 */ 			if (element.getStyle('zIndex') == this.highestZindex) {
/* 490 */ 				this.windowWithHighestZindex = element;
/* 491 */ 			}
/* 492 */ 		}.bind(this));
/* 493 */ 
/* 494 */ 		return this.windowWithHighestZindex;
/* 495 */ 	},
/* 496 */ 	blurAll: function(){
/* 497 */ 		if (MochaUI.focusingWindow == 'false') {
/* 498 */ 			$$('.mocha').each(function(windowEl){
/* 499 */ 				var instances =  MochaUI.Windows.instances;
/* 500 */ 				var currentInstance = instances.get(windowEl.id);

/* Core.js */

/* 501 */ 				if (currentInstance.options.type != 'modal' && currentInstance.options.type != 'modal2'){
/* 502 */ 					windowEl.removeClass('isFocused');
/* 503 */ 				}
/* 504 */ 			});
/* 505 */ 			$$('div.dockTab').removeClass('activeDockTab');
/* 506 */ 		}
/* 507 */ 	},
/* 508 */ 	roundedRect: function(ctx, x, y, width, height, radius, rgb, a){
/* 509 */ 		ctx.fillStyle = 'rgba(' + rgb.join(',') + ',' + a + ')';
/* 510 */ 		ctx.beginPath();
/* 511 */ 		ctx.moveTo(x, y + radius);
/* 512 */ 		ctx.lineTo(x, y + height - radius);
/* 513 */ 		ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
/* 514 */ 		ctx.lineTo(x + width - radius, y + height);
/* 515 */ 		ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
/* 516 */ 		ctx.lineTo(x + width, y + radius);
/* 517 */ 		ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
/* 518 */ 		ctx.lineTo(x + radius, y);
/* 519 */ 		ctx.quadraticCurveTo(x, y, x, y + radius);
/* 520 */ 		ctx.fill(); 
/* 521 */ 	},
/* 522 */ 	triangle: function(ctx, x, y, width, height, rgb, a){
/* 523 */ 		ctx.beginPath();
/* 524 */ 		ctx.moveTo(x + width, y);
/* 525 */ 		ctx.lineTo(x, y + height);
/* 526 */ 		ctx.lineTo(x + width, y + height);
/* 527 */ 		ctx.closePath();
/* 528 */ 		ctx.fillStyle = 'rgba(' + rgb.join(',') + ',' + a + ')';
/* 529 */ 		ctx.fill();
/* 530 */ 	},
/* 531 */ 	circle: function(ctx, x, y, diameter, rgb, a){
/* 532 */ 		ctx.beginPath();
/* 533 */ 		ctx.moveTo(x, y);
/* 534 */ 		ctx.arc(x, y, diameter, 0, Math.PI*2, true);
/* 535 */ 		ctx.fillStyle = 'rgba(' + rgb.join(',') + ',' + a + ')';
/* 536 */ 		ctx.fill();
/* 537 */ 	},
/* 538 */ 	/*
/* 539 *| 
/* 540 *| 	Function: centerWindow
/* 541 *| 		Center a window in it's container. If windowEl is undefined it will center the window that has focus.
/* 542 *| 
/* 543 *| 	*/
/* 544 */ 	centerWindow: function(windowEl){
/* 545 */ 		
/* 546 */ 		if(!windowEl){
/* 547 */ 			MochaUI.Windows.instances.each(function(instance){
/* 548 */ 				if (instance.windowEl.hasClass('isFocused')){
/* 549 */ 					windowEl = instance.windowEl;
/* 550 */ 				}

/* Core.js */

/* 551 */ 			});
/* 552 */ 		}
/* 553 */ 
/* 554 */ 		var currentInstance = MochaUI.Windows.instances.get(windowEl.id);
/* 555 */ 		var options = currentInstance.options;
/* 556 */ 		var dimensions = options.container.getCoordinates();
/* 557 */ 		var windowPosTop = (dimensions.height * .5) - ((options.height + currentInstance.headerFooterShadow) * .5);
/* 558 */ 		if (windowPosTop < 0) {
/* 559 */ 			windowPosTop = 0;
/* 560 */ 		}
/* 561 */ 		var windowPosLeft =	(dimensions.width * .5) - (options.width * .5);
/* 562 */ 		if (windowPosLeft < 0) {
/* 563 */ 			windowPosLeft = 0;
/* 564 */ 		}
/* 565 */ 		if (MochaUI.options.useEffects == true){
/* 566 */ 			currentInstance.morph.start({
/* 567 */ 				'top': windowPosTop,
/* 568 */ 				'left': windowPosLeft
/* 569 */ 			});
/* 570 */ 		}
/* 571 */ 		else {
/* 572 */ 			windowEl.setStyles({
/* 573 */ 				'top': windowPosTop,
/* 574 */ 				'left': windowPosLeft
/* 575 */ 			});
/* 576 */ 		}
/* 577 */ 	},
/* 578 */ 	notification: function(message){
/* 579 */ 			new MochaUI.Window({
/* 580 */ 				loadMethod: 'html',
/* 581 */ 				closeAfter: 1500,
/* 582 */ 				type: 'notification',
/* 583 */ 				addClass: 'notification',
/* 584 */ 				content: message,
/* 585 */ 				width: 220,
/* 586 */ 				height: 40,
/* 587 */ 				y: 53,
/* 588 */ 				padding:  { top: 10, right: 12, bottom: 10, left: 12 },
/* 589 */ 				shadowBlur: 5,
/* 590 */ 				bodyBgColor: [255, 255, 255]	
/* 591 */ 			});
/* 592 */ 	},
/* 593 */ 	/*
/* 594 *| 
/* 595 *| 	Function: dynamicResize
/* 596 *| 		Use with a timer to resize a window as the window's content size changes, such as with an accordian.
/* 597 *| 
/* 598 *| 	*/
/* 599 */ 	dynamicResize: function(windowEl){
/* 600 */ 		var currentInstance = MochaUI.Windows.instances.get(windowEl.id);

/* Core.js */

/* 601 */ 		var contentWrapperEl = currentInstance.contentWrapperEl;
/* 602 */ 		var contentEl = currentInstance.contentEl;
/* 603 */ 		
/* 604 */ 		contentWrapperEl.setStyle('height', contentEl.offsetHeight);
/* 605 */ 		contentWrapperEl.setStyle('width', contentEl.offsetWidth);			
/* 606 */ 		currentInstance.drawWindow(windowEl);
/* 607 */ 	},	
/* 608 */ 	/*
/* 609 *| 
/* 610 *| 	Function: garbageCleanUp
/* 611 *| 		Empties all windows of their children, and removes and garbages the windows. It is does not trigger onClose() or onCloseComplete(). This is useful to clear memory before the pageUnload.
/* 612 *| 
/* 613 *| 	Syntax:
/* 614 *| 	(start code)
/* 615 *| 		MochaUI.garbageCleanUp();
/* 616 *| 	(end)
/* 617 *| 	
/* 618 *| 	*/
/* 619 */ 	garbageCleanUp: function(){
/* 620 */ 		$$('div.mocha').each(function(el){
/* 621 */ 			el.destroy();
/* 622 */ 		}.bind(this));
/* 623 */ 	},
/* 624 */ 	/*
/* 625 *| 	
/* 626 *| 	The underlay is inserted directly under windows when they are being dragged or resized
/* 627 *| 	so that the cursor is not captured by iframes or other plugins (such as Flash)
/* 628 *| 	underneath the window.
/* 629 *| 	
/* 630 *| 	*/
/* 631 */ 	underlayInitialize: function(){
/* 632 */ 		var windowUnderlay = new Element('div', {
/* 633 */ 			'id': 'windowUnderlay',
/* 634 */ 			'styles': {
/* 635 */ 				'height': parent.getCoordinates().height,
/* 636 */ 				'opacity': .01,
/* 637 */ 				'display': 'none'
/* 638 */ 			}
/* 639 */ 		}).inject(document.body);
/* 640 */ 	},
/* 641 */ 	setUnderlaySize: function(){
/* 642 */ 		if ($('windowUnderlay')) {
/* 643 */ 			$('windowUnderlay').setStyle('height', parent.getCoordinates().height);
/* 644 */ 		}
/* 645 */ 	}
/* 646 */ });
/* 647 */ 
/* 648 */ /* 
/* 649 *| 
/* 650 *| function: fixPNG

/* Core.js */

/* 651 *| 	Bob Osola's PngFix for IE6.
/* 652 *| 
/* 653 *| example:
/* 654 *| 	(begin code)
/* 655 *| 	<img src="xyz.png" alt="foo" width="10" height="20" onload="fixPNG(this)">
/* 656 *| 	(end)
/* 657 *| 
/* 658 *| note:
/* 659 *| 	You must have the image height and width attributes specified in the markup.
/* 660 *| 
/* 661 *| */
/* 662 */ 
/* 663 */ function fixPNG(myImage){
/* 664 */ 	if (Browser.Engine.trident4 && document.body.filters){
/* 665 */ 		var imgID = (myImage.id) ? "id='" + myImage.id + "' " : "";
/* 666 */ 		var imgClass = (myImage.className) ? "class='" + myImage.className + "' " : "";
/* 667 */ 		var imgTitle = (myImage.title) ? "title='" + myImage.title  + "' " : "title='" + myImage.alt + "' ";
/* 668 */ 		var imgStyle = "display:inline-block;" + myImage.style.cssText;
/* 669 */ 		var strNewHTML = "<span " + imgID + imgClass + imgTitle
/* 670 */ 			+ " style=\"" + "width:" + myImage.width
/* 671 */ 			+ "px; height:" + myImage.height
/* 672 */ 			+ "px;" + imgStyle + ";"
/* 673 */ 			+ "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
/* 674 */ 			+ "(src=\'" + myImage.src + "\', sizingMethod='scale');\"></span>";
/* 675 */ 		myImage.outerHTML = strNewHTML;		
/* 676 */ 	}
/* 677 */ }
/* 678 */ 
/* 679 */ // Toggle window visibility with Ctrl-Alt-Q
/* 680 */ document.addEvent('keydown', function(event){
/* 681 */ 	if (event.key == 'q' && event.control && event.alt) {
/* 682 */ 		MochaUI.toggleWindowVisibility();
/* 683 */ 	}
/* 684 */ });
/* 685 */ 
/* 686 */ // Blur all windows if user clicks anywhere else on the page
/* 687 */ document.addEvent('mousedown', function(event){
/* 688 */ 	MochaUI.blurAll.delay(50);
/* 689 */ });
/* 690 */ 
/* 691 */ document.addEvent('domready', function(){
/* 692 */ 	MochaUI.underlayInitialize();
/* 693 */ });
/* 694 */ 
/* 695 */ window.addEvent('resize', function(){
/* 696 */ 		MochaUI.setUnderlaySize();
/* 697 */ });
/* 698 */ 
