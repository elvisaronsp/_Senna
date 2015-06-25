
/* Layout.js */

/* 1    */ /*
/* 2    *| 
/* 3    *| Script: Layout.js
/* 4    *| 	Create web application layouts. Enables window maximize.
/* 5    *| 	
/* 6    *| Copyright:
/* 7    *| 	Copyright (c) 2007-2008 Greg Houston, <http://greghoustondesign.com/>.
/* 8    *| 
/* 9    *| License:
/* 10   *| 	MIT-style license.	
/* 11   *| 
/* 12   *| Requires:
/* 13   *| 	Core.js, Window.js
/* 14   *| 	
/* 15   *| */
/* 16   */ 
/* 17   */ MochaUI.Desktop = new Class({
/* 18   */ 
/* 19   */ 	Extends: MochaUI.Window,
/* 20   */ 
/* 21   */ 	Implements: [Events, Options],
/* 22   */ 	
/* 23   */ 	options: {
/* 24   */ 		// Naming options:
/* 25   */ 		// If you change the IDs of the Mocha Desktop containers in your HTML, you need to change them here as well.
/* 26   */ 		desktop:             'desktop',
/* 27   */ 		desktopHeader:       'desktopHeader',
/* 28   */ 		desktopFooter:       'desktopFooter',
/* 29   */ 		desktopNavBar:       'desktopNavbar',
/* 30   */ 		pageWrapper:         'pageWrapper',
/* 31   */ 		page:                'page',
/* 32   */ 		desktopFooter:       'desktopFooterWrapper'
/* 33   */ 	},	
/* 34   */ 	initialize: function(options){
/* 35   */ 		this.setOptions(options);
/* 36   */ 		this.desktop         = $(this.options.desktop);
/* 37   */ 		this.desktopHeader   = $(this.options.desktopHeader);
/* 38   */ 		this.desktopNavBar   = $(this.options.desktopNavBar);
/* 39   */ 		this.pageWrapper     = $(this.options.pageWrapper);
/* 40   */ 		this.page            = $(this.options.page);
/* 41   */ 		this.desktopFooter   = $(this.options.desktopFooter);		
/* 42   */ 	
/* 43   */ 		// This is run on dock initialize so no need to do it twice.
/* 44   */ 		if (!MochaUI.Dock.dockWrapper){
/* 45   */ 			this.setDesktopSize();
/* 46   */ 		}
/* 47   */ 		this.menuInitialize();		
/* 48   */ 
/* 49   */ 		// Resize desktop, page wrapper, modal overlay, and maximized windows when browser window is resized
/* 50   */ 		window.addEvent('resize', function(e){

/* Layout.js */

/* 51   */ 			this.onBrowserResize();
/* 52   */ 		}.bind(this));
/* 53   */ 	},
/* 54   */ 	menuInitialize: function(){
/* 55   */ 		// Fix for dropdown menus in IE6
/* 56   */ 		if (Browser.Engine.trident4 && this.desktopNavBar){
/* 57   */ 			this.desktopNavBar.getElements('li').each(function(element) {
/* 58   */ 				element.addEvent('mouseenter', function(){
/* 59   */ 					this.addClass('ieHover');
/* 60   */ 				});
/* 61   */ 				element.addEvent('mouseleave', function(){
/* 62   */ 					this.removeClass('ieHover');
/* 63   */ 				});
/* 64   */ 			});
/* 65   */ 		};
/* 66   */ 	},
/* 67   */ 	onBrowserResize: function(){
/* 68   */ 		this.setDesktopSize();
/* 69   */ 		// Resize maximized windows to fit new browser window size
/* 70   */ 		setTimeout( function(){
/* 71   */ 			MochaUI.Windows.instances.each(function(instance){
/* 72   */ 				if (instance.isMaximized){
/* 73   */ 
/* 74   */ 					// Hide iframe while resize for better performance
/* 75   */ 					if ( instance.iframeEl ){
/* 76   */ 						instance.iframeEl.setStyle('visibility', 'hidden');
/* 77   */ 					}
/* 78   */ 
/* 79   */ 					var coordinates = document.getCoordinates();
/* 80   */ 					var borderHeight = instance.contentBorderEl.getStyle('border-top').toInt() + instance.contentBorderEl.getStyle('border-bottom').toInt();
/* 81   */ 					var toolbarHeight = instance.toolbarWrapperEl ? instance.toolbarWrapperEl.getStyle('height').toInt() + instance.toolbarWrapperEl.getStyle('border-top').toInt() : 0;
/* 82   */ 					instance.contentWrapperEl.setStyles({
/* 83   */ 						'height': coordinates.height - instance.options.headerHeight - instance.options.footerHeight - borderHeight - toolbarHeight,
/* 84   */ 						'width': coordinates.width
/* 85   */ 					});
/* 86   */ 
/* 87   */ 					instance.drawWindow($(instance.options.id));
/* 88   */ 					if ( instance.iframeEl ){
/* 89   */ 						instance.iframeEl.setStyles({
/* 90   */ 							'height': instance.contentWrapperEl.getStyle('height')
/* 91   */ 						});
/* 92   */ 						instance.iframeEl.setStyle('visibility', 'visible');
/* 93   */ 					}
/* 94   */ 
/* 95   */ 				}
/* 96   */ 			}.bind(this));
/* 97   */ 		}.bind(this), 100);
/* 98   */ 	},
/* 99   */ 	setDesktopSize: function(){
/* 100  */ 		var windowDimensions = window.getCoordinates();

/* Layout.js */

/* 101  */ 
/* 102  */ 		// var dock = $(MochaUI.options.dock);
/* 103  */ 		var dockWrapper = $(MochaUI.options.dockWrapper);
/* 104  */ 		
/* 105  */ 		// Setting the desktop height may only be needed by IE7
/* 106  */ 		if (this.desktop){
/* 107  */ 			this.desktop.setStyle('height', windowDimensions.height);
/* 108  */ 		}
/* 109  */ 
/* 110  */ 		// Set pageWrapper height so the dock doesn't cover the pageWrapper scrollbars.
/* 111  */ 		if (this.pageWrapper) {
/* 112  */ 
/* 113  */ 			var dockOffset = MochaUI.dockVisible ? dockWrapper.offsetHeight : 0;
/* 114  */ 			var pageWrapperHeight = windowDimensions.height;
/* 115  */ 			pageWrapperHeight -= this.pageWrapper.getStyle('border-top').toInt();
/* 116  */ 			pageWrapperHeight -= this.pageWrapper.getStyle('border-bottom').toInt();
/* 117  */ 			if (this.desktopHeader){ pageWrapperHeight -= this.desktopHeader.offsetHeight; }
/* 118  */ 			if (this.desktopFooter){ pageWrapperHeight -= this.desktopFooter.offsetHeight; }
/* 119  */ 			pageWrapperHeight -= dockOffset;
/* 120  */ 
/* 121  */ 			if (pageWrapperHeight < 0){
/* 122  */ 				pageWrapperHeight = 0;
/* 123  */ 			}
/* 124  */ 			this.pageWrapper.setStyle('height', pageWrapperHeight);
/* 125  */ 		}
/* 126  */ 
/* 127  */ 		if (MochaUI.Columns.instances.getKeys().length > 0){ // Conditional is a fix for a bug in IE6 in the no toolbars demo.
/* 128  */ 			MochaUI.Desktop.resizePanels();
/* 129  */ 		}		
/* 130  */ 	},
/* 131  */ 	resizePanels: function(){
/* 132  */ 		if (Browser.Engine.trident4){
/* 133  */ 			$$('.pad').setStyle('display', 'none');
/* 134  */ 			$$('.rHeight').setStyle('height', 1);
/* 135  */ 		}
/* 136  */ 		MochaUI.panelHeight();
/* 137  */ 		MochaUI.rWidth();
/* 138  */ 		if (Browser.Engine.trident4) $$('.pad').setStyle('display', 'block');
/* 139  */ 	},
/* 140  */ 	/*
/* 141  *| 	
/* 142  *| 	Function: maximizeWindow
/* 143  *| 		Maximize a window.
/* 144  *| 	
/* 145  *| 	Syntax:
/* 146  *| 		(start code)
/* 147  *| 		MochaUI.Desktop.maximizeWindow(windowEl);
/* 148  *| 		(end)	
/* 149  *| 
/* 150  *| 	*/	

/* Layout.js */

/* 151  */ 	maximizeWindow: function(windowEl){
/* 152  */ 
/* 153  */ 		var currentInstance = MochaUI.Windows.instances.get(windowEl.id);
/* 154  */ 		var options = currentInstance.options;
/* 155  */ 		var windowDrag = currentInstance.windowDrag;
/* 156  */ 
/* 157  */ 		// If window no longer exists or is maximized, stop
/* 158  */ 		if (windowEl != $(windowEl) || currentInstance.isMaximized ) return;
/* 159  */ 		
/* 160  */ 		if (currentInstance.isCollapsed){
/* 161  */ 			MochaUI.collapseToggle(windowEl);	
/* 162  */ 		}
/* 163  */ 
/* 164  */ 		currentInstance.isMaximized = true;
/* 165  */ 		
/* 166  */ 		// If window is restricted to a container, it should not be draggable when maximized.
/* 167  */ 		if (currentInstance.options.restrict){
/* 168  */ 			windowDrag.detach();
/* 169  */ 			if (options.resizable) {
/* 170  */ 				currentInstance.detachResizable();
/* 171  */ 			}
/* 172  */ 			currentInstance.titleBarEl.setStyle('cursor', 'default');
/* 173  */ 		}	
/* 174  */ 
/* 175  */ 		// If the window has a container that is not the desktop
/* 176  */ 		// temporarily move the window to the desktop while it is minimized.
/* 177  */ 		if (options.container != this.desktop){
/* 178  */ 			this.desktop.grab(windowEl);
/* 179  */ 			if (this.options.restrict){
/* 180  */ 			windowDrag.container = this.desktop;
/* 181  */ 			}
/* 182  */ 		}		
/* 183  */ 
/* 184  */ 		// Save original position
/* 185  */ 		currentInstance.oldTop = windowEl.getStyle('top');
/* 186  */ 		currentInstance.oldLeft = windowEl.getStyle('left');
/* 187  */ 
/* 188  */ 		var contentWrapperEl = currentInstance.contentWrapperEl;
/* 189  */ 
/* 190  */ 		// Save original dimensions
/* 191  */ 		contentWrapperEl.oldWidth = contentWrapperEl.getStyle('width');
/* 192  */ 		contentWrapperEl.oldHeight = contentWrapperEl.getStyle('height');
/* 193  */ 
/* 194  */ 		// Hide iframe
/* 195  */ 		// Iframe should be hidden when minimizing, maximizing, and moving for performance and Flash issues
/* 196  */ 		if ( currentInstance.iframeEl ) {
/* 197  */ 			currentInstance.iframeEl.setStyle('visibility', 'hidden');
/* 198  */ 		}
/* 199  */ 
/* 200  */ 		var windowDimensions = document.getCoordinates();

/* Layout.js */

/* 201  */ 		var options = currentInstance.options;
/* 202  */ 		var shadowBlur = options.shadowBlur;
/* 203  */ 		var shadowOffset = options.shadowOffset;
/* 204  */ 		var newHeight = windowDimensions.height - options.headerHeight - options.footerHeight;
/* 205  */ 		newHeight -= currentInstance.contentBorderEl.getStyle('border-top').toInt();
/* 206  */ 		newHeight -= currentInstance.contentBorderEl.getStyle('border-bottom').toInt();
/* 207  */ 		newHeight -= (  currentInstance.toolbarWrapperEl ? currentInstance.toolbarWrapperEl.getStyle('height').toInt() + currentInstance.toolbarWrapperEl.getStyle('border-top').toInt() : 0);
/* 208  */ 
/* 209  */ 		if (MochaUI.options.useEffects == false){
/* 210  */ 			windowEl.setStyles({
/* 211  */ 				'top': shadowOffset.y - shadowBlur,
/* 212  */ 				'left': shadowOffset.x - shadowBlur
/* 213  */ 			});
/* 214  */ 			currentInstance.contentWrapperEl.setStyles({
/* 215  */ 				'height': newHeight,
/* 216  */ 				'width':  windowDimensions.width
/* 217  */ 			});
/* 218  */ 			currentInstance.drawWindow(windowEl);
/* 219  */ 			// Show iframe
/* 220  */ 			if ( currentInstance.iframeEl ) {
/* 221  */ 				currentInstance.iframeEl.setStyle('visibility', 'visible');
/* 222  */ 			}
/* 223  */ 			currentInstance.fireEvent('onMaximize', windowEl);
/* 224  */ 		}
/* 225  */ 		else {
/* 226  */ 
/* 227  */ 			// Todo: Initialize the variables for these morphs once in an initialize function and reuse them
/* 228  */ 
/* 229  */ 			var maximizeMorph = new Fx.Elements([contentWrapperEl, windowEl], { 
/* 230  */ 				duration: 70,
/* 231  */ 				onStart: function(windowEl){
/* 232  */ 					currentInstance.maximizeAnimation = currentInstance.drawWindow.periodical(20, currentInstance, windowEl);
/* 233  */ 				}.bind(this),
/* 234  */ 				onComplete: function(windowEl){
/* 235  */ 					$clear(currentInstance.maximizeAnimation);
/* 236  */ 					currentInstance.drawWindow(windowEl);
/* 237  */ 					// Show iframe
/* 238  */ 					if ( currentInstance.iframeEl ) {
/* 239  */ 						currentInstance.iframeEl.setStyle('visibility', 'visible');
/* 240  */ 					}
/* 241  */ 					currentInstance.fireEvent('onMaximize', windowEl);	
/* 242  */ 				}.bind(this)
/* 243  */ 			});
/* 244  */ 			maximizeMorph.start({
/* 245  */ 				'0': {	'height': newHeight,
/* 246  */ 						'width':  windowDimensions.width
/* 247  */ 				},
/* 248  */ 				'1': {	'top': shadowOffset.y - shadowBlur,
/* 249  */ 						'left': shadowOffset.x - shadowBlur 
/* 250  */ 				}

/* Layout.js */

/* 251  */ 			});		
/* 252  */ 		}
/* 253  */ 		currentInstance.maximizeButtonEl.setProperty('title', 'Restore');
/* 254  */ 		MochaUI.focusWindow(windowEl);
/* 255  */ 
/* 256  */ 	},
/* 257  */ 	/*
/* 258  *| 
/* 259  *| 	Function: restoreWindow
/* 260  *| 		Restore a maximized window.
/* 261  *| 
/* 262  *| 	Syntax:
/* 263  *| 		(start code)
/* 264  *| 		MochaUI.Desktop.restoreWindow(windowEl);
/* 265  *| 		(end)	
/* 266  *| 
/* 267  *| 	*/	
/* 268  */ 	restoreWindow: function(windowEl){	
/* 269  */ 	
/* 270  */ 		var currentInstance = MochaUI.Windows.instances.get(windowEl.id);
/* 271  */ 		
/* 272  */ 		// Window exists and is maximized ?
/* 273  */ 		if (windowEl != $(windowEl) || !currentInstance.isMaximized) return;
/* 274  */ 			
/* 275  */ 		var options = currentInstance.options;
/* 276  */ 		currentInstance.isMaximized = false;
/* 277  */ 		
/* 278  */ 		if (options.restrict){
/* 279  */ 			currentInstance.windowDrag.attach();
/* 280  */ 			if (options.resizable){
/* 281  */ 				currentInstance.reattachResizable();
/* 282  */ 			}			
/* 283  */ 			currentInstance.titleBarEl.setStyle('cursor', 'move');
/* 284  */ 		}		
/* 285  */ 		
/* 286  */ 		// Hide iframe
/* 287  */ 		// Iframe should be hidden when minimizing, maximizing, and moving for performance and Flash issues
/* 288  */ 		if ( currentInstance.iframeEl ) {
/* 289  */ 			currentInstance.iframeEl.setStyle('visibility', 'hidden');
/* 290  */ 		}
/* 291  */ 		
/* 292  */ 		var contentWrapperEl = currentInstance.contentWrapperEl;
/* 293  */ 		
/* 294  */ 		if (MochaUI.options.useEffects == false){
/* 295  */ 			contentWrapperEl.setStyles({
/* 296  */ 				'width':  contentWrapperEl.oldWidth,
/* 297  */ 				'height': contentWrapperEl.oldHeight
/* 298  */ 			});
/* 299  */ 			currentInstance.drawWindow(windowEl);
/* 300  */ 			windowEl.setStyles({

/* Layout.js */

/* 301  */ 				'top': currentInstance.oldTop,
/* 302  */ 				'left': currentInstance.oldLeft
/* 303  */ 			});
/* 304  */ 			if ( currentInstance.iframeEl ) {
/* 305  */ 				currentInstance.iframeEl.setStyle('visibility', 'visible');
/* 306  */ 			}			
/* 307  */ 			if (options.container != this.desktop){
/* 308  */ 				$(options.container).grab(windowEl);
/* 309  */ 				if (options.restrict){
/* 310  */ 					currentInstance.windowDrag.container = $(options.container);
/* 311  */ 				}
/* 312  */ 			}
/* 313  */ 			currentInstance.fireEvent('onRestore', windowEl);
/* 314  */ 		}
/* 315  */ 		else {
/* 316  */ 			var restoreMorph = new Fx.Elements([contentWrapperEl, windowEl], { 
/* 317  */ 				'duration':   150,
/* 318  */ 				'onStart': function(windowEl){
/* 319  */ 					currentInstance.maximizeAnimation = currentInstance.drawWindow.periodical(20, currentInstance, windowEl);
/* 320  */ 				}.bind(this),
/* 321  */ 				'onComplete': function(el){
/* 322  */ 					$clear(currentInstance.maximizeAnimation);
/* 323  */ 					currentInstance.drawWindow(windowEl);
/* 324  */ 					if (currentInstance.iframeEl){
/* 325  */ 						currentInstance.iframeEl.setStyle('visibility', 'visible');
/* 326  */ 					}
/* 327  */ 					if (options.container != this.desktop){
/* 328  */ 						$(options.container).grab(windowEl);
/* 329  */ 						if (options.restrict){	
/* 330  */ 							currentInstance.windowDrag.container = $(options.container);
/* 331  */ 						}
/* 332  */ 					}
/* 333  */ 					currentInstance.fireEvent('onRestore', windowEl);
/* 334  */ 				}.bind(this)
/* 335  */ 			});
/* 336  */ 			restoreMorph.start({ 
/* 337  */ 				'0': {	'height': contentWrapperEl.oldHeight,
/* 338  */ 						'width':  contentWrapperEl.oldWidth
/* 339  */ 				},
/* 340  */ 				'1': {	'top':  currentInstance.oldTop,
/* 341  */ 						'left': currentInstance.oldLeft
/* 342  */ 				}
/* 343  */ 			});
/* 344  */ 		}
/* 345  */ 		currentInstance.maximizeButtonEl.setProperty('title', 'Maximize');
/* 346  */ 	}
/* 347  */ });
/* 348  */ MochaUI.Desktop.implement(new Options, new Events);
/* 349  */ 
/* 350  */ /*

/* Layout.js */

/* 351  *| 
/* 352  *| Class: Column
/* 353  *| 	Create a column. Columns should be created from left to right.
/* 354  *| 
/* 355  *| Syntax:
/* 356  *| (start code)
/* 357  *| 	MochaUI.Panel();
/* 358  *| (end)
/* 359  *| 
/* 360  *| Arguments:
/* 361  *| 	options
/* 362  *| 
/* 363  *| Options:
/* 364  *| 	id - The ID of the column. This must be set when creating the column.	
/* 365  *| 	placement - Can be 'right', 'main', or 'left'. There must be at least one column with the 'main' option.
/* 366  *| 	width - 'main' column is fluid and should not be given a width.
/* 367  *| 	resizeLimit - resizelimit of a 'right' or 'left' column.
/* 368  *| 	onResize - (function) Fired when the column is resized.
/* 369  *| 	onCollapse - (function) Fired when the column is collapsed.
/* 370  *| 	onExpand - (function) Fired when the column is expanded.
/* 371  *| 		
/* 372  *| */
/* 373  */ MochaUI.Column = new Class({
/* 374  */ 
/* 375  */ 	Extends: MochaUI.Desktop,
/* 376  */ 
/* 377  */ 	Implements: [Events, Options],
/* 378  */ 
/* 379  */ 	options: {
/* 380  */ 		id:            null, 
/* 381  */ 		placement:     null, 
/* 382  */ 		width:         null,
/* 383  */ 		resizeLimit:   [],
/* 384  */ 
/* 385  */ 		// Events
/* 386  */ 		onResize:     $empty, 
/* 387  */ 		onCollapse:   $empty,
/* 388  */ 		onExpand:     $empty
/* 389  */ 
/* 390  */ 	},
/* 391  */ 	initialize: function(options){
/* 392  */ 		this.setOptions(options);
/* 393  */ 		
/* 394  */ 		$extend(this, {
/* 395  */ 			timestamp: $time(),
/* 396  */ 			isCollapsed: false,
/* 397  */ 			oldWidth: 0
/* 398  */ 		});
/* 399  */ 
/* 400  */ 		// Shorten object chain

/* Layout.js */

/* 401  */ 		var options = this.options;
/* 402  */ 		var instances = MochaUI.Columns.instances;
/* 403  */ 		var instanceID = instances.get(options.id);
/* 404  */ 
/* 405  */ 		// Check to see if there is already a class instance for this Column
/* 406  */ 		if (instanceID){
/* 407  */ 			var currentInstance = instanceID;
/* 408  */ 		}
/* 409  */ 
/* 410  */ 		// Check if column already exists
/* 411  */ 		if ( this.columnEl ){
/* 412  */ 			return;
/* 413  */ 		}
/* 414  */ 		else {			
/* 415  */ 			instances.set(options.id, this);
/* 416  */ 		}		
/* 417  */ 				
/* 418  */ 		this.columnEl = new Element('div', {
/* 419  */ 			'id': this.options.id,
/* 420  */ 			'class': 'column expanded',
/* 421  */ 			'styles': {
/* 422  */ 				'width': options.placement == 'main' ? null : options.width
/* 423  */ 			}
/* 424  */ 		}).inject($(MochaUI.Desktop.pageWrapper));
/* 425  */ 
/* 426  */ 		var parent = this.columnEl.getParent();
/* 427  */ 		var columnHeight = parent.getStyle('height').toInt();
/* 428  */ 		this.columnEl.setStyle('height', columnHeight);
/* 429  */ 
/* 430  */ 		if (options.placement == 'main'){
/* 431  */ 			this.columnEl.addClass('rWidth');
/* 432  */ 		}
/* 433  */ 
/* 434  */ 		this.spacerEl = new Element('div', {
/* 435  */ 			'id': this.options.id + '_spacer',
/* 436  */ 			'class': 'horizontalHandle'
/* 437  */ 		}).inject(this.columnEl);
/* 438  */ 
/* 439  */ 		switch (this.options.placement) {
/* 440  */ 			case 'left':
/* 441  */ 				this.handleEl = new Element('div', {
/* 442  */ 					'id': this.options.id + '_handle',
/* 443  */ 					'class': 'columnHandle'
/* 444  */ 				}).inject(this.columnEl, 'after');
/* 445  */ 
/* 446  */ 				this.handleIconEl = new Element('div', {
/* 447  */ 					'id': options.id + '_handle_icon',
/* 448  */ 					'class': 'handleIcon'
/* 449  */ 				}).inject(this.handleEl);
/* 450  */ 

/* Layout.js */

/* 451  */ 				addResizeRight(this.columnEl, options.resizeLimit[0], options.resizeLimit[1]);
/* 452  */ 				break;
/* 453  */ 			case 'right':
/* 454  */ 				this.handleEl = new Element('div', {
/* 455  */ 					'id': this.options.id + '_handle',
/* 456  */ 					'class': 'columnHandle'
/* 457  */ 				}).inject(this.columnEl, 'before');
/* 458  */ 
/* 459  */ 				this.handleIconEl = new Element('div', {
/* 460  */ 					'id': options.id + '_handle_icon',
/* 461  */ 					'class': 'handleIcon'
/* 462  */ 				}).inject(this.handleEl);
/* 463  */ 				addResizeLeft(this.columnEl, options.resizeLimit[0], options.resizeLimit[1]);
/* 464  */ 				break;
/* 465  */ 		}
/* 466  */ 
/* 467  */ 		if (this.handleEl != null){
/* 468  */ 			this.handleEl.addEvent('dblclick', function(){
/* 469  */ 				this.columnToggle();
/* 470  */ 			}.bind(this));
/* 471  */ 		}
/* 472  */ 
/* 473  */ 		MochaUI.rWidth();
/* 474  */ 
/* 475  */ 	},
/* 476  */ 	columnToggle: function(){
/* 477  */ 		var column= this.columnEl;
/* 478  */ 		
/* 479  */ 		// Collapse
/* 480  */ 		if (this.isCollapsed == false){
/* 481  */ 			this.oldWidth = column.getStyle('width').toInt();
/* 482  */ 
/* 483  */ 			this.resize.detach();
/* 484  */ 			this.handleEl.removeEvents('dblclick');
/* 485  */ 			this.handleEl.addEvent('click', function(){
/* 486  */ 				this.columnToggle();
/* 487  */ 			}.bind(this));
/* 488  */ 			this.handleEl.setStyle('cursor', 'pointer').addClass('detached');
/* 489  */ 			
/* 490  */ 			column.setStyle('width', 0);
/* 491  */ 			this.isCollapsed = true;
/* 492  */ 			column.addClass('collapsed');
/* 493  */ 			column.removeClass('expanded');
/* 494  */ 
/* 495  */ 			MochaUI.rWidth();
/* 496  */ 			this.fireEvent('onCollapse');
/* 497  */ 		}
/* 498  */ 		// Expand
/* 499  */ 		else {
/* 500  */ 			column.setStyle('width', this.oldWidth);

/* Layout.js */

/* 501  */ 			this.isCollapsed = false;
/* 502  */ 			column.addClass('expanded');
/* 503  */ 			column.removeClass('collapsed');
/* 504  */ 
/* 505  */ 			this.handleEl.removeEvents('click');
/* 506  */ 			this.handleEl.addEvent('dblclick', function(){
/* 507  */ 				this.columnToggle();
/* 508  */ 			}.bind(this));
/* 509  */ 			this.resize.attach();
/* 510  */ 			this.handleEl.setStyle('cursor', 'e-resize').addClass('attached');
/* 511  */ 
/* 512  */ 			MochaUI.rWidth();
/* 513  */ 			this.fireEvent('onExpand');
/* 514  */ 		}
/* 515  */ 	}
/* 516  */ });
/* 517  */ MochaUI.Column.implement(new Options, new Events);
/* 518  */ 
/* 519  */ /*
/* 520  *| 
/* 521  *| Class: Panel
/* 522  *| 	Create a panel. Panels go one on top of another in columns. Create your columns first and then add your panels. Panels should be created from top to bottom, left to right.
/* 523  *| 
/* 524  *| Syntax:
/* 525  *| (start code)
/* 526  *| 	MochaUI.Panel();
/* 527  *| (end)
/* 528  *| 
/* 529  *| Arguments:
/* 530  *| 	options
/* 531  *| 
/* 532  *| Options:
/* 533  *| 	id - The ID of the panel. This must be set when creating the panel.
/* 534  *| 	column - Where to inject the panel. This must be set when creating the panel.
/* 535  *| 	loadMethod - ('html', 'xhr', or 'iframe')
/* 536  *| 	contentURL - Used if loadMethod is set to 'xhr' or 'iframe'.
/* 537  *| 	evalScripts - (boolean) An xhr loadMethod option. Defaults to true.
/* 538  *| 	evalResponse - (boolean) An xhr loadMethod option. Defaults to false.
/* 539  *| 	content - (string or element) An html loadMethod option.
/* 540  *| 	tabsURL - (url)	
/* 541  *| 	footer - (boolean)
/* 542  *| 	footerURL - (url)
/* 543  *| 	height - (number) Height of content area.
/* 544  *| 	addClass - (string) Add a class to the panel.
/* 545  *| 	scrollbars - (boolean)
/* 546  *| 	padding - (object)
/* 547  *| 	panelBackground - CSS background property for the panel.
/* 548  *| 	onBeforeBuild - (function) Fired before the panel is created.
/* 549  *| 	onContentLoaded - (function) Fired after the panel's conten is loaded.
/* 550  *| 	onResize - (function) Fired when the panel is resized.

/* Layout.js */

/* 551  *| 	onCollapse - (function) Fired when the panel is collapsed.
/* 552  *| 	onExpand - (function) Fired when the panel is expanded.
/* 553  *| 		
/* 554  *| */
/* 555  */ MochaUI.Panel = new Class({
/* 556  */ 							
/* 557  */ 	Extends: MochaUI.Desktop,
/* 558  */ 	
/* 559  */ 	Implements: [Events, Options],
/* 560  */ 	
/* 561  */ 	options: {
/* 562  */ 		id:               null,
/* 563  */ 		title:            'New Panel',
/* 564  */ 		column:           null,
/* 565  */ 		loadMethod:       'html',
/* 566  */ 		contentURL:       'pages/lipsum.html',
/* 567  */ 	
/* 568  */ 		// xhr options
/* 569  */ 		evalScripts:      true,
/* 570  */ 		evalResponse:     false,
/* 571  */ 	
/* 572  */ 		// html options
/* 573  */ 		content:          'Panel content',
/* 574  */ 		
/* 575  */ 		// Tabs
/* 576  */ 		tabsURL:          null,
/* 577  */ 
/* 578  */ 		footer:           false,
/* 579  */ 		footerURL:        'pages/lipsum.html',
/* 580  */ 		
/* 581  */ 		// Style options:
/* 582  */ 		height:           125,
/* 583  */ 		addClass:         '',
/* 584  */ 		scrollbars:       true,
/* 585  */ 		padding:   		  { top: 8, right: 8, bottom: 8, left: 8 },
/* 586  */ 
/* 587  */ 		// Color options:		
/* 588  */ 		panelBackground:   '#f8f8f8',
/* 589  */ 
/* 590  */ 		// Events
/* 591  */ 		onBeforeBuild:     $empty,
/* 592  */ 		onContentLoaded:   $empty,
/* 593  */ 		onResize:          $empty,
/* 594  */ 		onCollapse:        $empty,
/* 595  */ 		onExpand:          $empty
/* 596  */ 
/* 597  */ 	},	
/* 598  */ 	initialize: function(options){
/* 599  */ 		this.setOptions(options);
/* 600  */ 

/* Layout.js */

/* 601  */ 		$extend(this, {
/* 602  */ 			timestamp: $time(),
/* 603  */ 			isCollapsed: false,
/* 604  */ 			oldHeight: 0,
/* 605  */ 			partner: null
/* 606  */ 		});
/* 607  */ 
/* 608  */ 		// Shorten object chain
/* 609  */ 		var instances = MochaUI.Panels.instances;
/* 610  */ 		var instanceID = instances.get(this.options.id);
/* 611  */ 	
/* 612  */ 		// Check to see if there is already a class instance for this panel
/* 613  */ 		if (instanceID){
/* 614  */ 			var currentInstance = instanceID;
/* 615  */ 		}
/* 616  */ 
/* 617  */ 		// Check if panel already exists
/* 618  */ 		if ( this.panelEl ){
/* 619  */ 			return;
/* 620  */ 		}
/* 621  */ 		else {			
/* 622  */ 			instances.set(this.options.id, this);
/* 623  */ 		}
/* 624  */ 
/* 625  */ 		this.fireEvent('onBeforeBuild');
/* 626  */ 		
/* 627  */ 		if (this.options.loadMethod == 'iframe') {
/* 628  */ 			// Iframes have their own scrollbars and padding.
/* 629  */ 			this.options.scrollbars = false;
/* 630  */ 			this.options.padding = { top: 0, right: 0, bottom: 0, left: 0 };
/* 631  */ 		}
/* 632  */ 
/* 633  */ 		this.showHandle = true;
/* 634  */ 		if ($(this.options.column).getChildren().length == 0){
/* 635  */ 			this.showHandle = false;
/* 636  */ 		}
/* 637  */ 
/* 638  */ 		this.panelEl = new Element('div', {
/* 639  */ 			'id': this.options.id,
/* 640  */ 			'class': 'panel expanded',
/* 641  */ 			'styles': {
/* 642  */ 				'height': this.options.height,
/* 643  */ 				'background': this.options.panelBackground
/* 644  */ 			}
/* 645  */ 		}).inject($(this.options.column));
/* 646  */ 
/* 647  */ 		this.panelEl.addClass(this.options.addClass);
/* 648  */ 
/* 649  */ 		this.contentEl = new Element('div', {
/* 650  */ 			'id': this.options.id + '_pad',

/* Layout.js */

/* 651  */ 			'class': 'pad'
/* 652  */ 		}).inject(this.panelEl);
/* 653  */ 
/* 654  */ 		if (this.options.footer){
/* 655  */ 			this.footerWrapperEl = new Element('div', {
/* 656  */ 				'id': this.options.id + '_panelFooterWrapper',
/* 657  */ 				'class': 'panel-footerWrapper'
/* 658  */ 			}).inject(this.panelEl);
/* 659  */ 			
/* 660  */ 			this.footerEl = new Element('div', {
/* 661  */ 				'id': this.options.id + '_panelFooter',
/* 662  */ 				'class': 'panel-footer'
/* 663  */ 			}).inject(this.footerWrapperEl);
/* 664  */ 
/* 665  */ 
/* 666  */ 			MochaUI.updateContent({
/* 667  */ 				'element':       this.panelEl,
/* 668  */ 				'childElement':  this.footerEl,
/* 669  */ 				'loadMethod':    'xhr',
/* 670  */ 				'url':           this.options.footerURL
/* 671  */ 			});
/* 672  */ 			
/* 673  */ 		}
/* 674  */ 
/* 675  */ 		// This is in order to use the same variable as the windows do in updateContent.
/* 676  */ 		// May rethink this.
/* 677  */ 		this.contentWrapperEl = this.panelEl;
/* 678  */ 		
/* 679  */ 		// Set scrollbars, always use 'hidden' for iframe windows
/* 680  */ 		this.contentWrapperEl.setStyles({
/* 681  */ 			'overflow': this.options.scrollbars && !this.iframeEl ? 'auto' : 'hidden'
/* 682  */ 		});
/* 683  */ 
/* 684  */ 		this.contentEl.setStyles({
/* 685  */ 			'padding-top': this.options.padding.top,
/* 686  */ 			'padding-bottom': this.options.padding.bottom,
/* 687  */ 			'padding-left': this.options.padding.left,
/* 688  */ 			'padding-right': this.options.padding.right
/* 689  */ 		});			
/* 690  */ 		
/* 691  */ 		this.panelHeaderEl = new Element('div', {
/* 692  */ 			'id': this.options.id + '_header',
/* 693  */ 			'class': 'panel-header'
/* 694  */ 		}).inject(this.panelEl, 'before');
/* 695  */ 		
/* 696  */ 		this.panelHeaderToolboxEl = new Element('div', {
/* 697  */ 			'id': this.options.id + '_headerToolbox',
/* 698  */ 			'class': 'panel-header-toolbox'
/* 699  */ 		}).inject(this.panelHeaderEl);
/* 700  */ 

/* Layout.js */

/* 701  */ 		this.collapseToggleEl = new Element('div', {
/* 702  */ 			'id': this.options.id + '_minmize',
/* 703  */ 			'class': 'panel-collapse icon16',
/* 704  */ 			'styles': {
/* 705  */ 				'width': 16,
/* 706  */ 				'height': 16
/* 707  */ 			},
/* 708  */ 			'title': 'Collapse Panel'
/* 709  */ 		}).inject(this.panelHeaderToolboxEl);
/* 710  */ 
/* 711  */ 		this.collapseToggleEl.addEvent('click', function(event){
/* 712  */ 			var panel = this.panelEl;
/* 713  */ 			
/* 714  */ 			// Get siblings and make sure they are not all collapsed.
/* 715  */ 			var instances = MochaUI.Panels.instances;
/* 716  */ 			var expandedSiblings = [];
/* 717  */ 			panel.getAllPrevious('.panel').each(function(sibling){
/* 718  */ 				var currentInstance = instances.get(sibling.id);
/* 719  */ 				if (currentInstance.isCollapsed == false){
/* 720  */ 					expandedSiblings.push(sibling);
/* 721  */ 				}
/* 722  */ 			});
/* 723  */ 			panel.getAllNext('.panel').each(function(sibling){
/* 724  */ 				var currentInstance = instances.get(sibling.id);
/* 725  */ 				if (currentInstance.isCollapsed == false){
/* 726  */ 					expandedSiblings.push(sibling);
/* 727  */ 				}
/* 728  */ 			});
/* 729  */ 
/* 730  */ 			if (this.isCollapsed == false) {
/* 731  */ 				var currentColumn = MochaUI.Columns.instances.get($(this.options.column).id);
/* 732  */ 
/* 733  */ 				if (expandedSiblings.length == 0 && currentColumn.options.placement != 'main'){
/* 734  */ 					var currentColumn = MochaUI.Columns.instances.get($(this.options.column).id);
/* 735  */ 					currentColumn.columnToggle();
/* 736  */ 					return;
/* 737  */ 				}
/* 738  */ 				else if (expandedSiblings.length == 0 && currentColumn.options.placement == 'main'){
/* 739  */ 					return;
/* 740  */ 				}
/* 741  */ 				this.oldHeight = panel.getStyle('height').toInt();
/* 742  */ 				if (this.oldHeight < 10) this.oldHeight = 20;
/* 743  */ 				panel.setStyle('height', 0);
/* 744  */ 				this.isCollapsed = true;
/* 745  */ 				panel.addClass('collapsed');
/* 746  */ 				panel.removeClass('expanded');
/* 747  */ 				MochaUI.panelHeight(this.options.column, panel, 'collapsing');
/* 748  */ 				this.collapseToggleEl.removeClass('panel-collapsed');
/* 749  */ 				this.collapseToggleEl.addClass('panel-expand');
/* 750  */ 				this.collapseToggleEl.setProperty('title','Expand Panel');

/* Layout.js */

/* 751  */ 				this.fireEvent('onCollapse');
/* 752  */ 			}
/* 753  */ 			else {
/* 754  */ 				panel.setStyle('height', this.oldHeight);
/* 755  */ 				this.isCollapsed = false;
/* 756  */ 				panel.addClass('expanded');
/* 757  */ 				panel.removeClass('collapsed');
/* 758  */ 				MochaUI.panelHeight(this.options.column, panel, 'expanding');
/* 759  */ 				this.collapseToggleEl.removeClass('panel-expand');
/* 760  */ 				this.collapseToggleEl.addClass('panel-collapsed');
/* 761  */ 				this.collapseToggleEl.setProperty('title','Collapse Panel');
/* 762  */ 				this.fireEvent('onExpand');
/* 763  */ 			}
/* 764  */ 		}
/* 765  */ 		.bind(this));
/* 766  */ 		
/* 767  */ 		this.panelHeaderContentEl = new Element('div', {
/* 768  */ 			'id': this.options.id + '_headerContent',
/* 769  */ 			'class': 'panel-headerContent'
/* 770  */ 		}).inject(this.panelHeaderEl);
/* 771  */ 
/* 772  */ 		this.titleEl = new Element('h2', {
/* 773  */ 			'id': this.options.id + '_title'
/* 774  */ 		}).inject(this.panelHeaderContentEl);
/* 775  */ 
/* 776  */ 		if (this.options.tabsURL == null){
/* 777  */ 			this.titleEl.set('html', this.options.title);
/* 778  */ 		}		
/* 779  */ 		else {
/* 780  */ 			this.panelHeaderContentEl.addClass('tabs');
/* 781  */ 			MochaUI.updateContent({
/* 782  */ 				'element':      this.panelEl,
/* 783  */ 				'childElement': this.panelHeaderContentEl,
/* 784  */ 				'loadMethod':   'xhr',
/* 785  */ 				'url':          this.options.tabsURL
/* 786  */ 			});
/* 787  */ 		}
/* 788  */ 
/* 789  */ 		this.handleEl = new Element('div', {
/* 790  */ 			'id': this.options.id + '_handle',
/* 791  */ 			'class': 'horizontalHandle',
/* 792  */ 			'styles': {
/* 793  */ 				'display': this.showHandle == true ? 'block' : 'none'
/* 794  */ 			}
/* 795  */ 		}).inject(this.panelEl, 'after');
/* 796  */ 		
/* 797  */ 		this.handleIconEl = new Element('div', {
/* 798  */ 			'id': this.options.id + '_handle_icon',
/* 799  */ 			'class': 'handleIcon'
/* 800  */ 		}).inject(this.handleEl);

/* Layout.js */

/* 801  */ 
/* 802  */ 		addResizeBottom(this.options.id);
/* 803  */ 
/* 804  */ 		// Add content to panel.
/* 805  */ 		MochaUI.updateContent({
/* 806  */ 			'element': this.panelEl,
/* 807  */ 			'content':  this.options.content,
/* 808  */ 			'url':      this.options.contentURL
/* 809  */ 		});
/* 810  */ 
/* 811  */ 		MochaUI.panelHeight(this.options.column, this.panelEl, 'new');
/* 812  */ 
/* 813  */ 	}
/* 814  */ });
/* 815  */ MochaUI.Panel.implement(new Options, new Events);
/* 816  */ 
/* 817  */ 
/* 818  */ MochaUI.extend({
/* 819  */ 	// Panel Height	
/* 820  */ 	panelHeight: function(column, changing, action){
/* 821  */ 		if (column != null) {
/* 822  */ 			MochaUI.panelHeight2($(column), changing, action);
/* 823  */ 		}
/* 824  */ 		else {
/* 825  */ 			$$('.column').each(function(column){
/* 826  */ 				MochaUI.panelHeight2(column);
/* 827  */ 			}.bind(this));
/* 828  */ 		}
/* 829  */ 	},
/* 830  */ 	/*
/* 831  *| 
/* 832  *| 	actions can be new, collapsing or expanding.
/* 833  *| 
/* 834  *| 	*/
/* 835  */ 	panelHeight2: function(column, changing, action){
/* 836  */ 
/* 837  */ 			var instances = MochaUI.Panels.instances;
/* 838  */ 			
/* 839  */ 			var parent = column.getParent();
/* 840  */ 			var columnHeight = parent.getStyle('height').toInt();
/* 841  */ 			if (Browser.Engine.trident4){
/* 842  */ 				columnHeight -= 1;
/* 843  */ 			}
/* 844  */ 			column.setStyle('height', columnHeight);
/* 845  */ 
/* 846  */ 			var panels = column.getChildren('.panel');            // All the panels in the column.
/* 847  */ 			var panelsExpanded = column.getChildren('.expanded'); // All the expanded panels in the column.
/* 848  */ 			var panelsToResize = [];    // All the panels in the column whose height will be effected.
/* 849  */ 			var tallestPanel;           // The panel with the greatest height
/* 850  */ 			var tallestPanelHeight = 0;

/* Layout.js */

/* 851  */ 
/* 852  */ 			this.panelsHeight = 0;		// Height of all the panels in the column	
/* 853  */ 			this.height = 0;            // Height of all the elements in the column	
/* 854  */ 
/* 855  */ 			// Set panel resize partners
/* 856  */ 			panels.each(function(panel){
/* 857  */ 				currentInstance = instances.get(panel.id);
/* 858  */ 				if (panel.hasClass('expanded') && panel.getNext('.expanded')){
/* 859  */ 					currentInstance.partner = panel.getNext('.expanded');
/* 860  */ 					currentInstance.resize.attach();
/* 861  */ 					currentInstance.handleEl.setStyles({
/* 862  */ 						'display': 'block',
/* 863  */ 						'cursor': 'n-resize'
/* 864  */ 					}).removeClass('detached');
/* 865  */ 				}
/* 866  */ 				else {
/* 867  */ 					currentInstance.resize.detach();
/* 868  */ 					currentInstance.handleEl.setStyle('cursor', null).addClass('detached');
/* 869  */ 				}
/* 870  */ 				if (panel.getNext('.panel') == null){
/* 871  */ 					currentInstance.handleEl.setStyle('display', 'none');
/* 872  */ 				}
/* 873  */ 			}.bind(this));
/* 874  */ 			
/* 875  */ 			// Get the total height of all the column's children
/* 876  */ 			column.getChildren().each(function(el){
/* 877  */ 
/* 878  */ 				if (el.hasClass('panel')){
/* 879  */ 					var currentInstance = instances.get(el.id);
/* 880  */ 
/* 881  */ 					// Are any next siblings Expanded?
/* 882  */ 					areAnyNextSiblingsExpanded = function(el){
/* 883  */ 						var test;
/* 884  */ 						el.getAllNext('.panel').each(function(sibling){
/* 885  */ 							var siblingInstance = instances.get(sibling.id);
/* 886  */ 							if (siblingInstance.isCollapsed == false){
/* 887  */ 								test = true;
/* 888  */ 							}
/* 889  */ 						}.bind(this));
/* 890  */ 						return test;
/* 891  */ 					}.bind(this);
/* 892  */ 
/* 893  */ 					// If a next sibling is expanding, are any of the nexts siblings of the expanding sibling Expanded?
/* 894  */ 					areAnyExpandingNextSiblingsExpanded = function(){
/* 895  */ 						var test;
/* 896  */ 						changing.getAllNext('.panel').each(function(sibling){
/* 897  */ 							var siblingInstance = instances.get(sibling.id);
/* 898  */ 							if (siblingInstance.isCollapsed == false){
/* 899  */ 								test = true;
/* 900  */ 							}

/* Layout.js */

/* 901  */ 						}.bind(this));
/* 902  */ 						return test;
/* 903  */ 					}.bind(this);
/* 904  */ 					
/* 905  */ 					// Resize panels that are not collapsed or "new"
/* 906  */ 					if (action == 'new' ) {
/* 907  */ 						if (currentInstance.isCollapsed != true && el != changing) {
/* 908  */ 							panelsToResize.push(el);
/* 909  */ 						}
/* 910  */ 						
/* 911  */ 						// Height of panels that can be resized
/* 912  */ 						if (currentInstance.isCollapsed != true && el != changing) {
/* 913  */ 							this.panelsHeight += el.offsetHeight.toInt();
/* 914  */ 						}
/* 915  */ 					}
/* 916  */ 					// Resize panels that are not collapsed. If a panel is collapsing
/* 917  */ 					// resize any expanded panels below. If there are no expanded panels
/* 918  */ 					// below it, resize the expanded panels above it.
/* 919  */ 					else if (action == null || action == 'collapsing' ){
/* 920  */ 						if (currentInstance.isCollapsed != true && (el.getAllNext('.panel').contains(changing) != true || areAnyNextSiblingsExpanded(el) != true)){
/* 921  */ 							panelsToResize.push(el);
/* 922  */ 						}
/* 923  */ 						
/* 924  */ 						// Height of panels that can be resized
/* 925  */ 						if (currentInstance.isCollapsed != true && (el.getAllNext('.panel').contains(changing) != true || areAnyNextSiblingsExpanded(el) != true)){
/* 926  */ 							this.panelsHeight += el.offsetHeight.toInt();
/* 927  */ 						}
/* 928  */ 					}
/* 929  */ 					// Resize panels that are not collapsed and are not expanding.
/* 930  */ 					// Resize any expanded panels below the expanding panel. If there are no expanded panels
/* 931  */ 					// below it, resize the first expanded panel above it.
/* 932  */ 					else if (action == 'expanding'){
/* 933  */ 						   
/* 934  */ 						if (currentInstance.isCollapsed != true && (el.getAllNext('.panel').contains(changing) != true || (areAnyExpandingNextSiblingsExpanded() != true && el.getNext('.expanded') == changing)) && el != changing){
/* 935  */ 							panelsToResize.push(el);
/* 936  */ 						}
/* 937  */ 						// Height of panels that can be resized
/* 938  */ 						if (currentInstance.isCollapsed != true && (el.getAllNext('.panel').contains(changing) != true || (areAnyExpandingNextSiblingsExpanded() != true && el.getNext('.expanded') == changing)) && el != changing){
/* 939  */ 							this.panelsHeight += el.offsetHeight.toInt();
/* 940  */ 						}
/* 941  */ 					}
/* 942  */ 
/* 943  */ 					if (el.style.height){
/* 944  */ 						this.height += el.getStyle('height').toInt();
/* 945  */ 					}
/* 946  */ 				}
/* 947  */ 				else {
/* 948  */ 					this.height += el.offsetHeight.toInt();
/* 949  */ 				}
/* 950  */ 			}.bind(this));

/* Layout.js */

/* 951  */ 
/* 952  */ 			// Get the remaining height
/* 953  */ 			var remainingHeight = column.offsetHeight.toInt() - this.height;
/* 954  */ 			
/* 955  */ 			this.height = 0;
/* 956  */ 
/* 957  */ 			// Get height of all the column's children
/* 958  */ 			column.getChildren().each(function(el){
/* 959  */ 				this.height += el.offsetHeight.toInt();
/* 960  */ 			}.bind(this));
/* 961  */ 				
/* 962  */ 			var remainingHeight = column.offsetHeight.toInt() - this.height;
/* 963  */ 
/* 964  */ 			panelsToResize.each(function(panel){
/* 965  */ 				var ratio = this.panelsHeight / panel.offsetHeight.toInt();
/* 966  */ 				var newPanelHeight = panel.getStyle('height').toInt() + (remainingHeight / ratio);
/* 967  */ 				if (newPanelHeight < 1){
/* 968  */ 					newPanelHeight = 0;
/* 969  */ 				}
/* 970  */ 				panel.setStyle('height', newPanelHeight);
/* 971  */ 			}.bind(this));	
/* 972  */ 
/* 973  */ 			// Make sure the remaining height is 0. If not add/subtract the
/* 974  */ 			// remaining height to the tallest panel. This makes up for browser resizing,
/* 975  */ 			// off ratios, and users trying to give panels too much height.
/* 976  */ 			
/* 977  */ 			// Get height of all the column's children
/* 978  */ 			this.height = 0;
/* 979  */ 			column.getChildren().each(function(el){
/* 980  */ 				this.height += el.offsetHeight.toInt();
/* 981  */ 				if (el.hasClass('panel') && el.getStyle('height').toInt() > tallestPanelHeight){
/* 982  */ 					tallestPanel = el;
/* 983  */ 					tallestPanelHeight = el.getStyle('height').toInt();
/* 984  */ 				}
/* 985  */ 			}.bind(this));
/* 986  */ 
/* 987  */ 			var remainingHeight = column.offsetHeight.toInt() - this.height;
/* 988  */ 
/* 989  */ 			if ((remainingHeight > 0 || remainingHeight < 0) && tallestPanelHeight > 0){
/* 990  */ 				tallestPanel.setStyle('height', tallestPanel.getStyle('height').toInt() + remainingHeight );
/* 991  */ 				if (tallestPanel.getStyle('height') < 1){
/* 992  */ 					tallestPanel.setStyle('height', 0 );
/* 993  */ 				}
/* 994  */ 			}
/* 995  */ 
/* 996  */ 			$$('.columnHandle').each(function(handle){
/* 997  */ 				var handleHeight = parent.getStyle('height').toInt() - handle.getStyle('border-top').toInt() - handle.getStyle('border-bottom').toInt();
/* 998  */ 				if (Browser.Engine.trident4){
/* 999  */ 					handleHeight -= 1;
/* 1000 */ 				}

/* Layout.js */

/* 1001 */ 				handle.setStyle('height', handleHeight);
/* 1002 */ 			});
/* 1003 */ 			
/* 1004 */ 			panelsExpanded.each(function(panel){
/* 1005 */ 				MochaUI.resizeChildren(panel);
/* 1006 */ 			}.bind(this));
/* 1007 */ 	},
/* 1008 */ 	// May rename this resizeIframeEl()
/* 1009 */ 	resizeChildren: function(panel){
/* 1010 */ 		var instances = MochaUI.Panels.instances;
/* 1011 */ 		var currentInstance = instances.get(panel.id);
/* 1012 */ 		var contentWrapperEl = currentInstance.contentWrapperEl;
/* 1013 */ 
/* 1014 */ 		if (currentInstance.iframeEl){
/* 1015 */ 			currentInstance.iframeEl.setStyles({
/* 1016 */ 				'height': contentWrapperEl.getStyle('height'),
/* 1017 */ 				'width': contentWrapperEl.offsetWidth - contentWrapperEl.getStyle('border-left').toInt() - contentWrapperEl.getStyle('border-right').toInt()
/* 1018 */ 			});
/* 1019 */ 		}
/* 1020 */ 	},
/* 1021 */ 	// Remaining Width
/* 1022 */ 	rWidth: function(){	
/* 1023 */ 		$$('.rWidth').each(function(column){
/* 1024 */ 			var currentWidth = column.offsetWidth.toInt();
/* 1025 */ 			currentWidth -= column.getStyle('border-left').toInt();
/* 1026 */ 			currentWidth -= column.getStyle('border-right').toInt();
/* 1027 */ 
/* 1028 */ 			var parent = column.getParent();
/* 1029 */ 			this.width = 0;
/* 1030 */ 			
/* 1031 */ 			// Get the total width of all the parent element's children
/* 1032 */ 			parent.getChildren().each(function(el){
/* 1033 */ 				if (el.hasClass('mocha') != true){
/* 1034 */ 					this.width += el.offsetWidth.toInt();
/* 1035 */ 				}
/* 1036 */ 			}.bind(this));
/* 1037 */ 		
/* 1038 */ 			// Add the remaining width to the current element
/* 1039 */ 			var remainingWidth = parent.offsetWidth.toInt() - this.width;
/* 1040 */ 			var newWidth =	currentWidth + remainingWidth;
/* 1041 */ 			if (newWidth < 1) newWidth = 0;
/* 1042 */ 			column.setStyle('width', newWidth);
/* 1043 */ 			column.getChildren('.panel').each(function(panel){
/* 1044 */ 				panel.setStyle('width', newWidth - panel.getStyle('border-left').toInt() - panel.getStyle('border-right').toInt());
/* 1045 */ 				MochaUI.resizeChildren(panel);
/* 1046 */ 			}.bind(this));
/* 1047 */ 		});
/* 1048 */ 	}
/* 1049 */ 
/* 1050 */ });

/* Layout.js */

/* 1051 */ 
/* 1052 */ function addResizeRight(element, min, max){
/* 1053 */ 	if (!$(element)) return;
/* 1054 */ 	element = $(element);
/* 1055 */ 
/* 1056 */ 	var instances = MochaUI.Columns.instances;
/* 1057 */ 	var currentInstance = instances.get(element.id);
/* 1058 */ 
/* 1059 */ 	var handle = element.getNext('.columnHandle');
/* 1060 */ 	handle.setStyle('cursor', 'e-resize');	
/* 1061 */ 	if (!min) min = 50;
/* 1062 */ 	if (!max) max = 250;
/* 1063 */ 	if (Browser.Engine.trident){
/* 1064 */ 		handle.addEvents({
/* 1065 */ 			'mousedown': function(){
/* 1066 */ 				handle.setCapture();
/* 1067 */ 			},
/* 1068 */ 			'mouseup': function(){
/* 1069 */ 				handle.releaseCapture();
/* 1070 */ 			}
/* 1071 */ 		});
/* 1072 */ 	}
/* 1073 */ 	currentInstance.resize = element.makeResizable({
/* 1074 */ 		handle: handle,
/* 1075 */ 		modifiers: {x: 'width', y: false},
/* 1076 */ 		limit: { x: [min, max] },
/* 1077 */ 		onStart: function(){
/* 1078 */ 			element.getElements('iframe').setStyle('visibility','hidden');
/* 1079 */ 			element.getNext('.column').getElements('iframe').setStyle('visibility','hidden');
/* 1080 */ 		}.bind(this),
/* 1081 */ 		onDrag: function(){
/* 1082 */ 			MochaUI.rWidth();
/* 1083 */ 			if (Browser.Engine.trident4){
/* 1084 */ 				element.getChildren().each(function(el){
/* 1085 */ 					var width = $(element).getStyle('width').toInt();
/* 1086 */ 					width -= el.getStyle('border-right').toInt();
/* 1087 */ 					width -= el.getStyle('border-left').toInt();
/* 1088 */ 					width -= el.getStyle('padding-right').toInt();
/* 1089 */ 					width -= el.getStyle('padding-left').toInt();
/* 1090 */ 					el.setStyle('width', width);
/* 1091 */ 				}.bind(this));
/* 1092 */ 			}						
/* 1093 */ 		}.bind(this),
/* 1094 */ 		onComplete: function(){
/* 1095 */ 			MochaUI.rWidth();
/* 1096 */ 			element.getElements('iframe').setStyle('visibility','visible');
/* 1097 */ 			element.getNext('.column').getElements('iframe').setStyle('visibility','visible');
/* 1098 */ 			currentInstance.fireEvent('onResize');
/* 1099 */ 		}.bind(this)
/* 1100 */ 	});	

/* Layout.js */

/* 1101 */ }
/* 1102 */ 
/* 1103 */ function addResizeLeft(element, min, max){
/* 1104 */ 	if (!$(element)) return;
/* 1105 */ 	element = $(element);
/* 1106 */ 
/* 1107 */ 	var instances = MochaUI.Columns.instances;
/* 1108 */ 	var currentInstance = instances.get(element.id);
/* 1109 */ 
/* 1110 */ 	var handle = element.getPrevious('.columnHandle');
/* 1111 */ 	handle.setStyle('cursor', 'e-resize');
/* 1112 */ 	var partner = element.getPrevious('.column');
/* 1113 */ 	if (!min) min = 50;
/* 1114 */ 	if (!max) max = 250;
/* 1115 */ 	if (Browser.Engine.trident){	
/* 1116 */ 		handle.addEvents({
/* 1117 */ 			'mousedown': function(){
/* 1118 */ 				handle.setCapture();
/* 1119 */ 			},	
/* 1120 */ 			'mouseup': function(){
/* 1121 */ 				handle.releaseCapture();
/* 1122 */ 			}
/* 1123 */ 		});
/* 1124 */ 	}
/* 1125 */ 	currentInstance.resize = element.makeResizable({
/* 1126 */ 		handle: handle,
/* 1127 */ 		modifiers: {x: 'width' , y: false},
/* 1128 */ 		invert: true,
/* 1129 */ 		limit: { x: [min, max] },
/* 1130 */ 		onStart: function(){
/* 1131 */ 			$(element).getElements('iframe').setStyle('visibility','hidden');
/* 1132 */ 			partner.getElements('iframe').setStyle('visibility','hidden');
/* 1133 */ 		}.bind(this),
/* 1134 */ 		onDrag: function(){
/* 1135 */ 			MochaUI.rWidth();
/* 1136 */ 		}.bind(this),
/* 1137 */ 		onComplete: function(){
/* 1138 */ 			MochaUI.rWidth();
/* 1139 */ 			$(element).getElements('iframe').setStyle('visibility','visible');
/* 1140 */ 			partner.getElements('iframe').setStyle('visibility','visible');
/* 1141 */ 			currentInstance.fireEvent('onResize');
/* 1142 */ 		}.bind(this)
/* 1143 */ 	});
/* 1144 */ }
/* 1145 */ 
/* 1146 */ function addResizeBottom(element){
/* 1147 */ 	if (!$(element)) return;
/* 1148 */ 	var element = $(element);
/* 1149 */ 	
/* 1150 */ 	var instances = MochaUI.Panels.instances;

/* Layout.js */

/* 1151 */ 	var currentInstance = instances.get(element.id);
/* 1152 */ 	var handle = currentInstance.handleEl;
/* 1153 */ 	handle.setStyle('cursor', 'n-resize');
/* 1154 */ 	partner = currentInstance.partner;
/* 1155 */ 	min = 0;
/* 1156 */ 	max = function(){
/* 1157 */ 		return element.getStyle('height').toInt() + partner.getStyle('height').toInt();
/* 1158 */ 	}.bind(this);
/* 1159 */ 	
/* 1160 */ 	if (Browser.Engine.trident){	
/* 1161 */ 		handle.addEvents({
/* 1162 */ 			'mousedown': function(){
/* 1163 */ 				handle.setCapture();
/* 1164 */ 			},	
/* 1165 */ 			'mouseup': function(){
/* 1166 */ 				handle.releaseCapture();
/* 1167 */ 			}
/* 1168 */ 		});
/* 1169 */ 	}
/* 1170 */ 	currentInstance.resize = element.makeResizable({
/* 1171 */ 		handle: handle,
/* 1172 */ 		modifiers: {x: false, y: 'height'},
/* 1173 */ 		limit: { y: [min, max] },
/* 1174 */ 		invert: false,
/* 1175 */ 		onBeforeStart: function(){
/* 1176 */ 			partner = currentInstance.partner;
/* 1177 */ 			this.originalHeight = element.getStyle('height').toInt();
/* 1178 */ 			this.partnerOriginalHeight = partner.getStyle('height').toInt();
/* 1179 */ 		}.bind(this),
/* 1180 */ 		onStart: function(){
/* 1181 */ 			if (currentInstance.iframeEl) {
/* 1182 */ 				currentInstance.iframeEl.setStyle('visibility', 'hidden');
/* 1183 */ 			}
/* 1184 */ 			partner.getElements('iframe').setStyle('visibility','hidden');
/* 1185 */ 		}.bind(this),
/* 1186 */ 		onDrag: function(){
/* 1187 */ 			partnerHeight = partnerOriginalHeight + (this.originalHeight - element.getStyle('height').toInt());
/* 1188 */ 			partner.setStyle('height', partnerHeight);
/* 1189 */ 			MochaUI.resizeChildren(element, element.getStyle('height').toInt());
/* 1190 */ 			MochaUI.resizeChildren(partner, partnerHeight);
/* 1191 */ 		}.bind(this),
/* 1192 */ 		onComplete: function(){
/* 1193 */ 			partnerHeight = partnerOriginalHeight + (this.originalHeight - element.getStyle('height').toInt());
/* 1194 */ 			partner.setStyle('height', partnerHeight);
/* 1195 */ 			MochaUI.resizeChildren(element, element.getStyle('height').toInt());
/* 1196 */ 			MochaUI.resizeChildren(partner, partnerHeight);
/* 1197 */ 			if (currentInstance.iframeEl) {
/* 1198 */ 				currentInstance.iframeEl.setStyle('visibility', 'visible');
/* 1199 */ 			}
/* 1200 */ 			partner.getElements('iframe').setStyle('visibility','visible');

/* Layout.js */

/* 1201 */ 			currentInstance.fireEvent('onResize');
/* 1202 */ 		}.bind(this)
/* 1203 */ 	});
/* 1204 */ }
/* 1205 */ 
