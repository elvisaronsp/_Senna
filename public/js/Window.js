
/* Window.js */

/* 1    */ /*
/* 2    *| 
/* 3    *| Script: Window.js
/* 4    *| 	Build windows.
/* 5    *| 
/* 6    *| Copyright:
/* 7    *| 	Copyright (c) 2007-2008 Greg Houston, <http://greghoustondesign.com/>.
/* 8    *| 
/* 9    *| License:
/* 10   *| 	MIT-style license.	
/* 11   *| 
/* 12   *| Requires:
/* 13   *| 	Core.js
/* 14   *| 
/* 15   *| */
/* 16   */ 
/* 17   */ /*
/* 18   *| Class: Window
/* 19   *| 	Creates a single MochaUI window.
/* 20   *| 	
/* 21   *| Syntax:
/* 22   *| 	(start code)
/* 23   *| 	new MochaUI.Window(options);
/* 24   *| 	(end)	
/* 25   *| 
/* 26   *| Arguments:
/* 27   *| 	options
/* 28   *| 
/* 29   *| Options:
/* 30   *| 	id - The ID of the window. If not defined, it will be set to 'win' + windowIDCount.
/* 31   *| 	title - The title of the window.
/* 32   *| 	icon - Place an icon in the window's titlebar. This is either set to false or to the url of the icon. It is set up for icons that are 16 x 16px.
/* 33   *| 	type - ('window', 'modal', 'modal2', or 'notification') Defaults to 'window'.
/* 34   *| 	loadMethod - ('html', 'xhr', or 'iframe') Defaults to 'html'.
/* 35   *| 	contentURL - Used if loadMethod is set to 'xhr' or 'iframe'.
/* 36   *| 	closeAfter - Either false or time in milliseconds. Closes the window after a certain period of time in milliseconds. This is particularly useful for notifications.
/* 37   *| 	evalScripts - (boolean) An xhr loadMethod option. Defaults to true.
/* 38   *| 	evalResponse - (boolean) An xhr loadMethod option. Defaults to false.
/* 39   *| 	content - (string or element) An html loadMethod option.
/* 40   *| 	toolbar - (boolean) Create window toolbar. Defaults to false. This can be used for tabs, media controls, and so forth.
/* 41   *| 	toolbarPosition - ('top' or 'bottom') Defaults to top.
/* 42   *| 	toolbarHeight - (number)
/* 43   *| 	toolbarURL - (url) Defaults to 'pages/lipsum.html'.
/* 44   *| 	toolbarContent - (string)
/* 45   *| 	container - (element ID) Element the window is injected in. The container defaults to 'desktop'. If no desktop then to document.body. Use 'pageWrapper' if you don't want the windows to overlap the toolbars.
/* 46   *| 	restrict - (boolean) Restrict window to container when dragging.
/* 47   *| 	shape - ('box' or 'gauge') Shape of window. Defaults to 'box'.
/* 48   *| 	collapsible - (boolean) Defaults to true.
/* 49   *| 	minimizable - (boolean) Requires MochaUI.Desktop and MochaUI.Dock. Defaults to true if dependenices are met. 
/* 50   *| 	maximizable - (boolean) Requires MochaUI.Desktop. Defaults to true if dependenices are met.

/* Window.js */

/* 51   *| 	closable - (boolean) Defaults to true. 
/* 52   *| 	draggable - (boolean) Defaults to false for modals; otherwise true.
/* 53   *| 	draggableGrid - (false or number) Distance in pixels for snap-to-grid dragging. Defaults to false. 
/* 54   *| 	draggableLimit - (false or number) An object with x and y properties used to limit the movement of the Window. Defaults to false.
/* 55   *| 	draggableSnap - (boolean) The distance to drag before the Window starts to respond to the drag. Defaults to false.
/* 56   *| 	resizable - (boolean) Defaults to false for modals, notifications and gauges; otherwise true.
/* 57   *| 	resizeLimit - (object) Minimum and maximum width and height of window when resized.
/* 58   *| 	addClass - (string) Add a class to the window for more control over styling.	
/* 59   *| 	width - (number) Width of content area.	
/* 60   *| 	height - (number) Height of content area.
/* 61   *| 	x - (number) If x and y are left undefined the window is centered on the page.
/* 62   *| 	y - (number)
/* 63   *| 	scrollbars - (boolean)
/* 64   *| 	padding - (object)
/* 65   *| 	shadowBlur - (number) Width of shadows.
/* 66   *| 	shadowOffset - Should be positive and not be greater than the ShadowBlur.
/* 67   *| 	controlsOffset - Change this if you want to reposition the window controls.
/* 68   *| 	useCanvas - (boolean) Set this to false if you don't want a canvas body.
/* 69   *| 	useCanvasControls - (boolean) Set this to false if you wish to use images for the buttons.
/* 70   *| 	headerHeight - (number) Height of window titlebar.
/* 71   *| 	footerHeight - (number) Height of window footer.
/* 72   *| 	cornerRadius - (number)
/* 73   *| 	contentBgColor - (hex) Body background color
/* 74   *| 	headerStartColor - ([r,g,b,]) Titlebar gradient's top color
/* 75   *| 	headerStopColor - ([r,g,b,]) Titlebar gradient's bottom color
/* 76   *| 	bodyBgColor - ([r,g,b,]) Background color of the main canvas shape
/* 77   *| 	minimizeBgColor - ([r,g,b,]) Minimize button background color
/* 78   *| 	minimizeColor - ([r,g,b,]) Minimize button color
/* 79   *| 	maximizeBgColor - ([r,g,b,]) Maximize button background color
/* 80   *| 	maximizeColor - ([r,g,b,]) Maximize button color
/* 81   *| 	closeBgColor - ([r,g,b,]) Close button background color
/* 82   *| 	closeColor - ([r,g,b,]) Close button color
/* 83   *| 	resizableColor - ([r,g,b,]) Resizable icon color
/* 84   *| 	onBeforeBuild - (function) Fired just before the window is built.
/* 85   *| 	onContentLoaded - (function) Fired when content is successfully loaded via XHR or Iframe.
/* 86   *| 	onFocus - (function)  Fired when the window is focused.
/* 87   *| 	onBlur - (function) Fired when window loses focus.
/* 88   *| 	onResize - (function) Fired when the window is resized.
/* 89   *| 	onMinimize - (function) Fired when the window is minimized.
/* 90   *| 	onMaximize - (function) Fired when the window is maximized.
/* 91   *| 	onRestore - (function) Fired when a window is restored from minimized or maximized.
/* 92   *| 	onClose - (function) Fired just before the window is closed.
/* 93   *| 	onCloseComplete - (function) Fired after the window is closed.
/* 94   *| 	onDuplicated - (function) Disparada quando uma janela (ID) tentando ser criada já está aberta.
/* 95   *| 
/* 96   *| Returns:
/* 97   *| 	Window object.
/* 98   *| 
/* 99   *| Example:
/* 100  *| 	Define a window. It is suggested you name the function the same as your window ID + "Window".

/* Window.js */

/* 101  *| 	(start code)
/* 102  *| 	var mywindowWindow = function(){
/* 103  *| 		new MochaUI.Window({
/* 104  *| 			id: 'mywindow',
/* 105  *| 			title: 'My Window',
/* 106  *| 			loadMethod: 'xhr',
/* 107  *| 			contentURL: 'pages/lipsum.html',
/* 108  *| 			width: 340,
/* 109  *| 			height: 150
/* 110  *| 		});
/* 111  *| 	}
/* 112  *| 	(end)
/* 113  *| 
/* 114  *| Example:
/* 115  *| 	Create window onDomReady.
/* 116  *| 	(start code)	
/* 117  *| 	window.addEvent('domready', function(){
/* 118  *| 		mywindow();
/* 119  *| 	});
/* 120  *| 	(end)
/* 121  *| 
/* 122  *| Example:
/* 123  *| 	Add link events to build future windows. It is suggested you give your anchor the same ID as your window + "WindowLink" or + "WindowLinkCheck". Use the latter if it is a link in the menu toolbar.
/* 124  *| 
/* 125  *| 	If you wish to add links in windows that open other windows remember to add events to those links when the windows are created.
/* 126  *| 
/* 127  *| 	(start code)
/* 128  *| 	// Javascript:
/* 129  *| 	if ($('mywindowLink')){
/* 130  *| 		$('mywindowLink').addEvent('click', function(e) {
/* 131  *| 			new Event(e).stop();
/* 132  *| 			mywindow();
/* 133  *| 		});
/* 134  *| 	}
/* 135  *| 
/* 136  *| 	// HTML:
/* 137  *| 	<a id="mywindowLink" href="pages/lipsum.html">My Window</a>	
/* 138  *| 	(end)
/* 139  *| 
/* 140  *| 
/* 141  *| 	Loading Content with an XMLHttpRequest(xhr):
/* 142  *| 		For content to load via xhr all the files must be online and in the same domain. If you need to load content from another domain or wish to have it work offline, load the content in an iframe instead of using the xhr option.
/* 143  *| 	
/* 144  *| 	Iframes:
/* 145  *| 		If you use the iframe loadMethod your iframe will automatically be resized when the window it is in is resized. If you want this same functionality when using one of the other load options simply add class="mochaIframe" to those iframes and they will be resized for you as well.
/* 146  *| 
/* 147  *| */
/* 148  */ 
/* 149  */ // Having these options outside of the Class allows us to add, change, and remove
/* 150  */ // individual options without rewriting all of them.

/* Window.js */

/* 151  */ 
/* 152  */ MochaUI.Windows.windowOptions = {
/* 153  */ 	id:                null,
/* 154  */ 	title:             'New Window',
/* 155  */ 	icon:              false,
/* 156  */ 	type:              'window',
/* 157  */ 
/* 158  */ 	loadMethod:        'html',
/* 159  */ 	contentURL:        'pages/lipsum.html',
/* 160  */ 
/* 161  */ 	closeAfter:        false,
/* 162  */ 
/* 163  */ 	// xhr options
/* 164  */ 	evalScripts:       true,
/* 165  */ 	evalResponse:      false,
/* 166  */ 
/* 167  */ 	// html options
/* 168  */ 	content:           'Window content',
/* 169  */ 
/* 170  */ 	// Toolbar
/* 171  */ 	toolbar:           false,
/* 172  */ 	toolbarPosition:   'top',
/* 173  */ 	toolbarHeight:     29,
/* 174  */ 	toolbarURL:        'pages/lipsum.html',
/* 175  */ 	toolbarContent:    '',
/* 176  */ 
/* 177  */ 	// Toolbar
/* 178  */ 	toolbar2:           false,
/* 179  */ 	toolbar2Position:   'bottom',
/* 180  */ 	toolbar2Height:     29,
/* 181  */ 	toolbar2URL:        'pages/lipsum.html',
/* 182  */ 	toolbar2Content:    '',	
/* 183  */ 
/* 184  */ 	// Container options
/* 185  */ 	container:         null,
/* 186  */ 	restrict:          true,
/* 187  */ 	shape:             'box',
/* 188  */ 
/* 189  */ 	// Window Controls
/* 190  */ 	collapsible:       false,
/* 191  */ 	minimizable:       false,
/* 192  */ 	maximizable:       false,
/* 193  */ 	closable:          false,
/* 194  */ 
/* 195  */ 	// Draggable
/* 196  */ 	draggable:         null,
/* 197  */ 	draggableGrid:     false,
/* 198  */ 	draggableLimit:    false,
/* 199  */ 	draggableSnap:     false,
/* 200  */ 

/* Window.js */

/* 201  */ 	// Resizable
/* 202  */ 	resizable:         null,
/* 203  */ 	resizeLimit:       {'x': [250, 2500], 'y': [125, 2000]},
/* 204  */ 	
/* 205  */ 	// Style options:
/* 206  */ 	addClass:          '',
/* 207  */ 	width:             300,
/* 208  */ 	height:            125,
/* 209  */ 	x:                 null,
/* 210  */ 	y:                 null,
/* 211  */ 	scrollbars:        true,
/* 212  */ 	padding:   		   { top: 10, right: 12, bottom: 10, left: 12 },
/* 213  */ 	shadowBlur:        5,
/* 214  */ 	shadowOffset:      {'x': 0, 'y': 1},
/* 215  */ 	controlsOffset:    {'right': 6, 'top': 6},
/* 216  */ 	useCanvas:         true,
/* 217  */ 	useCanvasControls: true,
/* 218  */ 	useSpinner:        true,    // Toggles whether or not the ajax spinners are displayed in window footers.
/* 219  */ 
/* 220  */ 	// Color options:		
/* 221  */ 	headerHeight:      25,
/* 222  */ 	footerHeight:      25,
/* 223  */ 	cornerRadius:      8,
/* 224  */ 	contentBgColor:    '#fff',
/* 225  */ 	headerStartColor:  [250, 250, 250],
/* 226  */ 	headerStopColor:   [229, 229, 229],
/* 227  */ 	bodyBgColor:       [229, 229, 229],
/* 228  */ 	minimizeBgColor:   [255, 255, 255],
/* 229  */ 	minimizeColor:     [0, 0, 0],
/* 230  */ 	maximizeBgColor:   [255, 255, 255],
/* 231  */ 	maximizeColor:     [0, 0, 0],
/* 232  */ 	closeBgColor:      [255, 255, 255],
/* 233  */ 	closeColor:        [0, 0, 0],
/* 234  */ 	resizableColor:    [254, 254, 254],
/* 235  */ 
/* 236  */ 	// Events
/* 237  */ 	onBeforeBuild:     $empty,
/* 238  */ 	onContentLoaded:   $empty,
/* 239  */ 	onFocus:           $empty,
/* 240  */ 	onBlur:            $empty,
/* 241  */ 	onResize:          $empty,
/* 242  */ 	onMinimize:        $empty,
/* 243  */ 	onMaximize:        $empty,
/* 244  */ 	onRestore:         $empty,
/* 245  */ 	onClose:           $empty,
/* 246  */ 	onDuplicated:      $empty,
/* 247  */ 	onCloseComplete:   $empty
/* 248  */ };
/* 249  */ 
/* 250  */ MochaUI.Window = new Class({

/* Window.js */

/* 251  */ 	options: MochaUI.Windows.windowOptions,
/* 252  */ 	initialize: function(options){
/* 253  */ 		this.setOptions(options);
/* 254  */ 
/* 255  */ 		// Shorten object chain
/* 256  */ 		var options = this.options;
/* 257  */ 
/* 258  */ 		$extend(this, {
/* 259  */ 			mochaControlsWidth: 0,
/* 260  */ 			minimizebuttonX:  0,  // Minimize button horizontal position
/* 261  */ 			maximizebuttonX: 0,  // Maximize button horizontal position
/* 262  */ 			closebuttonX: 0,  // Close button horizontal position
/* 263  */ 			headerFooterShadow: options.headerHeight + options.footerHeight + (options.shadowBlur * 2),
/* 264  */ 			oldTop: 0,
/* 265  */ 			oldLeft: 0,
/* 266  */ 			isMaximized: false,
/* 267  */ 			isMinimized: false,
/* 268  */ 			isCollapsed: false,
/* 269  */ 			timestamp: $time()
/* 270  */ 		});
/* 271  */ 		
/* 272  */ 		// May be better to use if type != window
/* 273  */ 		if (options.type != 'window'){
/* 274  */ 			options.container = document.body;
/* 275  */ 			options.minimizable = false;
/* 276  */ 		}
/* 277  */ 		if (!options.container){
/* 278  */ 			options.container = MochaUI.Desktop.desktop ? MochaUI.Desktop.desktop : document.body;
/* 279  */ 		}
/* 280  */ 
/* 281  */ 		// Set this.options.resizable to default if it was not defined
/* 282  */ 		if (options.resizable == null){
/* 283  */ 			if (options.type != 'window' || options.shape == 'gauge'){
/* 284  */ 				options.resizable = false;
/* 285  */ 			}
/* 286  */ 			else {
/* 287  */ 				options.resizable = true;	
/* 288  */ 			}
/* 289  */ 		}
/* 290  */ 
/* 291  */ 		// Set this.options.draggable if it was not defined
/* 292  */ 		if (options.draggable == null){
/* 293  */ 			if (options.type != 'window'){
/* 294  */ 				options.draggable = false;
/* 295  */ 			}
/* 296  */ 			else {
/* 297  */ 				options.draggable = true;
/* 298  */ 			}
/* 299  */ 		}
/* 300  */ 

/* Window.js */

/* 301  */ 		// Gauges are not maximizable or resizable
/* 302  */ 		if (options.shape == 'gauge' || options.type == 'notification'){
/* 303  */ 			options.collapsible = false;
/* 304  */ 			options.maximizable = false;
/* 305  */ 			options.contentBgColor = 'transparent';
/* 306  */ 			options.scrollbars = false;
/* 307  */ 			options.footerHeight = 0;
/* 308  */ 		}
/* 309  */ 		if (options.type == 'notification'){
/* 310  */ 			options.closable = false;
/* 311  */ 			options.headerHeight = 0;
/* 312  */ 		}
/* 313  */ 		
/* 314  */ 		// Minimizable, dock is required and window cannot be modal
/* 315  */ 		if (MochaUI.Dock && $(MochaUI.options.dock)){
/* 316  */ 			if (MochaUI.Dock.dock && options.type != 'modal' && options.type != 'modal2'){
/* 317  */ 				options.minimizable = options.minimizable;
/* 318  */ 			}
/* 319  */ 		}
/* 320  */ 		else {
/* 321  */ 			options.minimizable = false;
/* 322  */ 		}
/* 323  */ 
/* 324  */ 		// Maximizable, desktop is required
/* 325  */ 		options.maximizable = MochaUI.Desktop.desktop && options.maximizable && options.type != 'modal' && options.type != 'modal2';
/* 326  */ 
/* 327  */ 		if (this.options.type == 'modal2') {
/* 328  */ 			this.options.shadowBlur = 0;
/* 329  */ 			this.options.shadowOffset = {'x': 0, 'y': 0};
/* 330  */ 			this.options.useSpinner = false;
/* 331  */ 			this.options.useCanvas = false;
/* 332  */ 			this.options.footerHeight = 0;
/* 333  */ 			this.options.headerHeight = 0;
/* 334  */ 		}
/* 335  */ 
/* 336  */ 		// If window has no ID, give it one.
/* 337  */ 		if (options.id == null){
/* 338  */ 			options.id = 'win' + (++MochaUI.Windows.windowIDCount);
/* 339  */ 		}
/* 340  */ 		this.windowEl = $(options.id);
/* 341  */ 		
/* 342  */ 		this.newWindow();
/* 343  */ 		
/* 344  */ 		// Return window object
/* 345  */ 		return this;
/* 346  */ 	},
/* 347  */ 	saveValues: function(){	
/* 348  */ 		var coordinates = this.windowEl.getCoordinates();
/* 349  */ 		this.options.x = coordinates.left.toInt();
/* 350  */ 		this.options.y = coordinates.top.toInt();

/* Window.js */

/* 351  */ 	},
/* 352  */ 	/*
/* 353  *| 
/* 354  *| 	Internal Function: newWindow
/* 355  *| 	
/* 356  *| 	Arguments: 
/* 357  *| 		properties
/* 358  *| 
/* 359  *| 	*/
/* 360  */ 	newWindow: function(properties){ // options is not doing anything
/* 361  */ 
/* 362  */ 		// Shorten object chain
/* 363  */ 		var instances = MochaUI.Windows.instances;
/* 364  */ 		var instanceID = instances.get(this.options.id);
/* 365  */ 		
/* 366  */ 	
/* 367  */ 		// Here we check to see if there is already a class instance for this window
/* 368  */ 		if (instanceID){
/* 369  */ 			var currentInstance = instanceID;
/* 370  */ 		}
/* 371  */ 		
/* 372  */ 		// Check if window already exists and is not in progress of closing
/* 373  */ 		if ( this.windowEl && !this.isClosing){
/* 374  */ 			 // Restore if minimized
/* 375  */ 			if (currentInstance.isMinimized){
/* 376  */ 				MochaUI.Dock.restoreMinimized(this.windowEl);
/* 377  */ 			}
/* 378  */ 			// Expand and focus if collapsed
/* 379  */ 			if (currentInstance.isCollapsed){
/* 380  */ 				MochaUI.collapseToggle(this.windowEl);
/* 381  */ 				setTimeout(MochaUI.focusWindow.pass(this.windowEl, this),10);
/* 382  */ 			}
/* 383  */ 			// Else focus
/* 384  */ 			else {
/* 385  */ 				var coordinates = document.getCoordinates();
/* 386  */ 				if (this.windowEl.getStyle('left').toInt() > coordinates.width || this.windowEl.getStyle('top').toInt() > coordinates.height){
/* 387  */ 					MochaUI.centerWindow(this.windowEl);	
/* 388  */ 				}
/* 389  */ 				setTimeout(MochaUI.focusWindow.pass(this.windowEl, this),10);
/* 390  */ 			}
/* 391  */ 			this.fireEvent('onDuplicated');
/* 392  */ 			return;
/* 393  */ 		}
/* 394  */ 		else {
/* 395  */ 			instances.set(this.options.id, this);
/* 396  */ 		}
/* 397  */ 
/* 398  */ 		this.isClosing = false;
/* 399  */ 		this.fireEvent('onBeforeBuild');
/* 400  */ 

/* Window.js */

/* 401  */ 		// Create window div
/* 402  */ 		MochaUI.Windows.indexLevel++;
/* 403  */ 		this.windowEl = new Element('div', {
/* 404  */ 			'class': 'mocha',
/* 405  */ 			'id':    this.options.id,
/* 406  */ 			'styles': {
/* 407  */ 				'width':   this.options.width,
/* 408  */ 				'height':  this.options.height,
/* 409  */ 				'display': 'block',
/* 410  */ 				'opacity': 0,
/* 411  */ 				'zIndex': MochaUI.Windows.indexLevel += 2
/* 412  */ 			}
/* 413  */ 		});
/* 414  */ 
/* 415  */ 		this.windowEl.addClass(this.options.addClass);
/* 416  */ 		
/* 417  */ 		if (this.options.type == 'modal2') {
/* 418  */ 			this.windowEl.addClass('modal2');
/* 419  */ 		}
/* 420  */ 
/* 421  */ 		// Fix a mouseover issue with gauges in IE7
/* 422  */ 		if ( Browser.Engine.trident && this.options.shape == 'gauge') {
/* 423  */ 			this.windowEl.setStyle('background', 'url(../images/spacer.gif)');
/* 424  */ 		}
/* 425  */ 
/* 426  */ 		if ((this.options.type == 'modal' || this.options.type == 'modal2' ) && Browser.Platform.mac && Browser.Engine.gecko){
/* 427  */ 			if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
/* 428  */ 				var ffversion = new Number(RegExp.$1);
/* 429  */ 				if (ffversion < 3) {
/* 430  */ 					this.windowEl.setStyle('position', 'fixed');
/* 431  */ 				}
/* 432  */ 			}
/* 433  */ 		}
/* 434  */ 
/* 435  */ 		if (this.options.loadMethod == 'iframe') {
/* 436  */ 			this.options.padding = { top: 0, right: 0, bottom: 0, left: 0 };
/* 437  */ 		}
/* 438  */ 
/* 439  */ 		// Insert sub elements inside windowEl
/* 440  */ 		this.insertWindowElements();
/* 441  */ 
/* 442  */ 		// Set title
/* 443  */ 		this.titleEl.set('html',this.options.title);
/* 444  */ 
/* 445  */ 		// Set scrollbars, always use 'hidden' for iframe windows
/* 446  */ 		this.contentWrapperEl.setStyles({
/* 447  */ 			'overflow': 'hidden',
/* 448  */ 			'background': this.options.contentBgColor
/* 449  */ 		});
/* 450  */ 

/* Window.js */

/* 451  */ 		this.contentEl.setStyles({
/* 452  */ 			'padding-top': this.options.padding.top,
/* 453  */ 			'padding-bottom': this.options.padding.bottom,
/* 454  */ 			'padding-left': this.options.padding.left,
/* 455  */ 			'padding-right': this.options.padding.right
/* 456  */ 		});
/* 457  */ 
/* 458  */ 
/* 459  */ 		if (this.options.shape == 'gauge'){
/* 460  */ 			if (this.options.useCanvasControls){
/* 461  */ 				this.canvasControlsEl.setStyle('display', 'none');
/* 462  */ 			}
/* 463  */ 			else {
/* 464  */ 				this.controlsEl.setStyle('display', 'none');
/* 465  */ 			}
/* 466  */ 			this.windowEl.addEvent('mouseover', function(){
/* 467  */ 				this.mouseover = true;
/* 468  */ 				var showControls = function(){
/* 469  */ 					if (this.mouseover != false){
/* 470  */ 						if (this.options.useCanvasControls){
/* 471  */ 							this.canvasControlsEl.setStyle('display', 'block');
/* 472  */ 						}
/* 473  */ 						else {
/* 474  */ 							this.controlsEl.setStyle('display', 'block');
/* 475  */ 						}
/* 476  */ 						this.canvasHeaderEl.setStyle('display', 'block');
/* 477  */ 						this.titleEl.setStyle('display', 'block');
/* 478  */ 					}
/* 479  */ 				};
/* 480  */ 				showControls.delay(150, this);
/* 481  */ 
/* 482  */ 			}.bind(this));
/* 483  */ 			this.windowEl.addEvent('mouseleave', function(){
/* 484  */ 				this.mouseover = false;
/* 485  */ 				if (this.options.useCanvasControls){
/* 486  */ 					this.canvasControlsEl.setStyle('display', 'none');
/* 487  */ 				}
/* 488  */ 				else {
/* 489  */ 					this.controlsEl.setStyle('display', 'none');
/* 490  */ 				}
/* 491  */ 				this.canvasHeaderEl.setStyle('display', 'none');
/* 492  */ 				this.titleEl.setStyle('display', 'none');
/* 493  */ 			}.bind(this));
/* 494  */ 		}
/* 495  */ 
/* 496  */ 		// Inject window into DOM
/* 497  */ 		this.windowEl.injectInside(this.options.container);
/* 498  */ 
/* 499  */ 		if (this.options.type != 'notification'){
/* 500  */ 			this.setMochaControlsWidth();

/* Window.js */

/* 501  */ 		}		
/* 502  */ 
/* 503  */ 		// Add content to window.
/* 504  */ 		MochaUI.updateContent({
/* 505  */ 			'element': this.windowEl,
/* 506  */ 			'content':  this.options.content,
/* 507  */ 			'url':      this.options.contentURL
/* 508  */ 		});	
/* 509  */ 		
/* 510  */ 		// Add content to window toolbar.
/* 511  */ 		if (this.options.toolbar == true){
/* 512  */ 			MochaUI.updateContent({
/* 513  */ 				'element':       this.windowEl,
/* 514  */ 				'childElement':  this.toolbarEl,
/* 515  */ 				'content':       this.options.toolbarContent,
/* 516  */ 				'loadMethod':    'xhr',
/* 517  */ 				'url':           this.options.toolbarURL
/* 518  */ 			});
/* 519  */ 		}
/* 520  */ 
/* 521  */ 		// Add content to window toolbar.
/* 522  */ 		if (this.options.toolbar2 == true){
/* 523  */ 			MochaUI.updateContent({
/* 524  */ 				'element':       this.windowEl,
/* 525  */ 				'childElement':  this.toolbar2El,
/* 526  */ 				'content':       this.options.toolbar2Content,
/* 527  */ 				'loadMethod':    'xhr',
/* 528  */ 				'url':           this.options.toolbar2URL
/* 529  */ 			});
/* 530  */ 		}
/* 531  */ 		
/* 532  */ 		this.drawWindow(this.windowEl);
/* 533  */ 		
/* 534  */ 		// Attach events to the window
/* 535  */ 		this.attachDraggable(this.windowEl);
/* 536  */ 		this.attachResizable(this.windowEl);
/* 537  */ 		this.setupEvents(this.windowEl);
/* 538  */ 		
/* 539  */ 		if (this.options.resizable){
/* 540  */ 			this.adjustHandles();
/* 541  */ 		}
/* 542  */ 
/* 543  */ 		// Move window into position. If position not specified by user then center the window on the page.
/* 544  */ 		if (this.options.container == document.body || this.options.container == MochaUI.Desktop.desktop){
/* 545  */ 			var dimensions = window.getSize();
/* 546  */ 		}
/* 547  */ 		else {
/* 548  */ 			var dimensions = $(this.options.container).getSize();
/* 549  */ 		}
/* 550  */ 

/* Window.js */

/* 551  */ 		if (!this.options.y) {
/* 552  */ 			var y = (dimensions.y * .5) - ((this.options.height + this.headerFooterShadow + this.windowEl.getStyle('border-top').toInt() + this.windowEl.getStyle('border-bottom').toInt()) * .5);
/* 553  */ 		}
/* 554  */ 		else {
/* 555  */ 			var y = this.options.y - this.options.shadowBlur;
/* 556  */ 		}
/* 557  */ 
/* 558  */ 		if (!this.options.x) {
/* 559  */ 			var x =	(dimensions.x * .5) - (this.options.width * .5);
/* 560  */ 		}
/* 561  */ 		else {
/* 562  */ 			var x = this.options.x - this.options.shadowBlur;
/* 563  */ 		}
/* 564  */ 
/* 565  */ 		this.windowEl.setStyles({
/* 566  */ 			'top': y,
/* 567  */ 			'left': x
/* 568  */ 		});
/* 569  */ 
/* 570  */ 		// Create opacityMorph
/* 571  */ 		if (MochaUI.options.useEffects == true){
/* 572  */ 			// IE cannot handle both element opacity and VML alpha at the same time.
/* 573  */ 			if (Browser.Engine.trident){
/* 574  */ 				this.drawWindow(this.windowEl, false);
/* 575  */ 			}
/* 576  */ 			this.opacityMorph = new Fx.Morph(this.windowEl, {
/* 577  */ 				'duration': 350,
/* 578  */ 				onComplete: function(){
/* 579  */ 					if (Browser.Engine.trident){
/* 580  */ 						this.drawWindow(this.windowEl);
/* 581  */ 					}
/* 582  */ 				}.bind(this)
/* 583  */ 			});
/* 584  */ 		}
/* 585  */ 
/* 586  */ 		if (this.options.type == 'modal' || this.options.type == 'modal2') {
/* 587  */ 			MochaUI.currentModal = this.windowEl;
/* 588  */ 			if (Browser.Engine.trident4){
/* 589  */ 				$('modalFix').setStyle('display', 'block');
/* 590  */ 			}
/* 591  */ 			$('modalOverlay').setStyle('display', 'block');
/* 592  */ 
/* 593  */ 			// Tratando contador de quantas modais estão abertas [jdrummond]
/* 594  */ 			if (typeof(modalOverlayCount) == 'undefined')
/* 595  */ 				modalOverlayCount = 0;
/* 596  */ 			modalOverlayCount++;
/* 597  */ 
/* 598  */ 			if (MochaUI.options.useEffects == false){
/* 599  */ 				$('modalOverlay').setStyle('opacity', .6);
/* 600  */ 				this.windowEl.setStyles({

/* Window.js */

/* 601  */ 					'zIndex': 11000,
/* 602  */ 					'opacity': 1
/* 603  */ 				});
/* 604  */ 
/* 605  */ 				// Caso exista mais de uma modal aberta, faz com que o overlay fique após a penúltima e antes da última [jdrummond]
/* 606  */ 				if (modalOverlayCount > 1) {
/* 607  */ 					$('modalOverlay').setStyle('zIndex',parseInt(this.windowEl.style.zIndex) + 1);
/* 608  */ 					this.windowEl.style.zIndex = parseInt(this.windowEl.style.zIndex) + 2;
/* 609  */ 				}
/* 610  */ 			}
/* 611  */ 			else {
/* 612  */ 				MochaUI.Modal.modalOverlayCloseMorph.cancel();
/* 613  */ 				MochaUI.Modal.modalOverlayOpenMorph.start({
/* 614  */ 					'opacity': .6
/* 615  */ 				});
/* 616  */ 				this.windowEl.setStyles({
/* 617  */ 					'zIndex': 11000
/* 618  */ 				});
/* 619  */ 				this.opacityMorph.start({
/* 620  */ 					'opacity': 1
/* 621  */ 				});
/* 622  */ 			}
/* 623  */ 
/* 624  */ 			$$('.dockTab').removeClass('activeDockTab');
/* 625  */ 			$$('.mocha').removeClass('isFocused');
/* 626  */ 			this.windowEl.addClass('isFocused');
/* 627  */ 			
/* 628  */ 		}
/* 629  */ 		else if (MochaUI.options.useEffects == false){
/* 630  */ 			this.windowEl.setStyle('opacity', 1);
/* 631  */ 			setTimeout(MochaUI.focusWindow.pass(this.windowEl, this), 10);
/* 632  */ 		}
/* 633  */ 		else {
/* 634  */ 			this.opacityMorph.start({
/* 635  */ 				'opacity': 1
/* 636  */ 			});
/* 637  */ 			setTimeout(MochaUI.focusWindow.pass(this.windowEl, this), 10);
/* 638  */ 		}
/* 639  */ 
/* 640  */ 		// This is a generic morph that can be reused later by functions like centerWindow()
/* 641  */ 		this.morph = new Fx.Morph(this.windowEl, {
/* 642  */ 			'duration': 200
/* 643  */ 		});
/* 644  */ 
/* 645  */ 		// Add check mark to menu if link exists in menu
/* 646  */ 		// Need to make sure the check mark is not added to links not in menu
/* 647  */ 	
/* 648  */ 		if ($(this.windowEl.id + 'LinkCheck')){
/* 649  */ 			this.check = new Element('div', {
/* 650  */ 				'class': 'check',

/* Window.js */

/* 651  */ 				'id': this.options.id + '_check'
/* 652  */ 			}).inject(this.windowEl.id + 'LinkCheck');
/* 653  */ 		}
/* 654  */ 		
/* 655  */ 		if (this.options.closeAfter != false){
/* 656  */ 			MochaUI.closeWindow.delay(this.options.closeAfter, this, this.windowEl);
/* 657  */ 		}
/* 658  */ 
/* 659  */ 		if (MochaUI.Dock && $(MochaUI.options.dock) && this.options.type == 'window' ){
/* 660  */ 			MochaUI.Dock.createDockTab(this.windowEl);
/* 661  */ 		}
/* 662  */ 
/* 663  */ 	},
/* 664  */ 	setupEvents: function(windowEl) {
/* 665  */ 
/* 666  */ 		// Set events
/* 667  */ 		// Note: if a button does not exist, its due to properties passed to newWindow() stating otherwice
/* 668  */ 		if (this.closeButtonEl){
/* 669  */ 			this.closeButtonEl.addEvent('click', function(e) {
/* 670  */ 				new Event(e).stop();
/* 671  */ 				MochaUI.closeWindow(windowEl);
/* 672  */ 			}.bind(this));
/* 673  */ 		}
/* 674  */ 
/* 675  */ 		if (this.options.type == 'window'){
/* 676  */ 			windowEl.addEvent('mousedown', function() {
/* 677  */ 				MochaUI.focusWindow(windowEl);
/* 678  */ 			}.bind(this));
/* 679  */ 		}
/* 680  */ 
/* 681  */ 		if (this.minimizeButtonEl) {
/* 682  */ 			this.minimizeButtonEl.addEvent('click', function(e) {
/* 683  */ 				new Event(e).stop();
/* 684  */ 				MochaUI.Dock.minimizeWindow(windowEl);
/* 685  */ 		}.bind(this));
/* 686  */ 		}
/* 687  */ 
/* 688  */ 		if (this.maximizeButtonEl) {
/* 689  */ 			this.maximizeButtonEl.addEvent('click', function(e) {
/* 690  */ 				new Event(e).stop(); 
/* 691  */ 				if (this.isMaximized) {
/* 692  */ 					MochaUI.Desktop.restoreWindow(windowEl);
/* 693  */ 				} else {
/* 694  */ 					MochaUI.Desktop.maximizeWindow(windowEl);
/* 695  */ 				}
/* 696  */ 			}.bind(this));
/* 697  */ 		}
/* 698  */ 
/* 699  */ 		if (this.options.collapsible == true){
/* 700  */ 			// Keep titlebar text from being selected on double click in Safari.

/* Window.js */

/* 701  */ 			this.titleEl.addEvent('selectstart', function(e) {
/* 702  */ 				e = new Event(e).stop();
/* 703  */ 			}.bind(this));
/* 704  */ 			// Keep titlebar text from being selected on double click in Opera.
/* 705  */ 			this.titleBarEl.addEvent('mousedown', function(e) {
/* 706  */ 				if (Browser.Engine.trident) {
/* 707  */ 					this.titleEl.setCapture();
/* 708  */ 				}
/* 709  */ 			}.bind(this));
/* 710  */ 			this.titleBarEl.addEvent('mouseup', function(e) {
/* 711  */ 				if (Browser.Engine.trident) {
/* 712  */ 					this.titleEl.releaseCapture();
/* 713  */ 				}
/* 714  */ 			}.bind(this));
/* 715  */ 			this.titleBarEl.addEvent('dblclick', function(e) {
/* 716  */ 				e = new Event(e).stop();
/* 717  */ 				MochaUI.collapseToggle(this.windowEl);
/* 718  */ 			}.bind(this));
/* 719  */ 		}
/* 720  */ 
/* 721  */ 	},
/* 722  */ 	/*
/* 723  *|
/* 724  *| 	Internal Function: attachDraggable()
/* 725  *| 		Make window draggable.
/* 726  *| 
/* 727  *| 	Arguments:
/* 728  *| 		windowEl
/* 729  *| 		
/* 730  *| 	*/
/* 731  */ 	attachDraggable: function(windowEl){
/* 732  */ 		if (!this.options.draggable) return;
/* 733  */ 		this.windowDrag = new Drag.Move(windowEl, {
/* 734  */ 			handle: this.titleBarEl,
/* 735  */ 			container: this.options.restrict == true ? $(this.options.container) : false,
/* 736  */ 			grid: this.options.draggableGrid,
/* 737  */ 			limit: this.options.draggableLimit,
/* 738  */ 			snap: this.options.draggableSnap,
/* 739  */ 			onStart: function() {
/* 740  */ 				if (this.options.type != 'modal' && this.options.type != 'modal2'){ 
/* 741  */ 					MochaUI.focusWindow(windowEl);
/* 742  */ 					$('windowUnderlay').setStyle('display','block');
/* 743  */ 				}
/* 744  */ 				if ( this.iframeEl )
/* 745  */ 					this.iframeEl.setStyle('visibility', 'hidden');
/* 746  */ 			}.bind(this),
/* 747  */ 			onComplete: function() {
/* 748  */ 				if (this.options.type != 'modal' && this.options.type != 'modal2') {
/* 749  */ 					$('windowUnderlay').setStyle('display', 'none');
/* 750  */ 				}

/* Window.js */

/* 751  */ 				if ( this.iframeEl ){
/* 752  */ 					this.iframeEl.setStyle('visibility', 'visible');
/* 753  */ 				}
/* 754  */ 				// Store new position in options.
/* 755  */ 				this.saveValues();
/* 756  */ 			}.bind(this)
/* 757  */ 		});
/* 758  */ 	},
/* 759  */ 	/*
/* 760  *| 
/* 761  *| 	Internal Function: attachResizable
/* 762  *| 		Make window resizable.
/* 763  *| 
/* 764  *| 	Arguments:
/* 765  *| 		windowEl
/* 766  *| 
/* 767  *| 	*/
/* 768  */ 	attachResizable: function(windowEl){
/* 769  */ 		if (!this.options.resizable) return;
/* 770  */ 		this.resizable1 = this.windowEl.makeResizable({
/* 771  */ 			handle: [this.n, this.ne, this.nw],
/* 772  */ 			limit: {
/* 773  */ 				y: [
/* 774  */ 					function(){
/* 775  */ 						return this.windowEl.getStyle('top').toInt() + this.windowEl.getStyle('height').toInt() - this.options.resizeLimit.y[1];
/* 776  */ 					}.bind(this),
/* 777  */ 					function(){
/* 778  */ 						return this.windowEl.getStyle('top').toInt() + this.windowEl.getStyle('height').toInt() - this.options.resizeLimit.y[0];
/* 779  */ 					}.bind(this)
/* 780  */ 				]
/* 781  */ 			},
/* 782  */ 			modifiers: {x: false, y: 'top'},
/* 783  */ 			onStart: function(){
/* 784  */ 				this.resizeOnStart();
/* 785  */ 				this.coords = this.contentWrapperEl.getCoordinates();
/* 786  */ 				this.y2 = this.coords.top.toInt() + this.contentWrapperEl.offsetHeight;
/* 787  */ 			}.bind(this),
/* 788  */ 			onDrag: function(){
/* 789  */ 				this.coords = this.contentWrapperEl.getCoordinates();
/* 790  */ 				this.contentWrapperEl.setStyle('height', this.y2 - this.coords.top.toInt());
/* 791  */ 				this.drawWindow(windowEl);
/* 792  */ 				this.adjustHandles();
/* 793  */ 			}.bind(this),
/* 794  */ 			onComplete: function(){
/* 795  */ 				this.resizeOnComplete();
/* 796  */ 			}.bind(this)
/* 797  */ 		});
/* 798  */ 
/* 799  */ 		this.resizable2 = this.contentWrapperEl.makeResizable({
/* 800  */ 			handle: [this.e, this.ne],

/* Window.js */

/* 801  */ 			limit: {
/* 802  */ 				x: [this.options.resizeLimit.x[0] - (this.options.shadowBlur * 2), this.options.resizeLimit.x[1] - (this.options.shadowBlur * 2) ]
/* 803  */ 			},	
/* 804  */ 			modifiers: {x: 'width', y: false},
/* 805  */ 			onStart: function(){
/* 806  */ 				this.resizeOnStart();
/* 807  */ 			}.bind(this),
/* 808  */ 			onDrag: function(){
/* 809  */ 				this.drawWindow(windowEl);
/* 810  */ 				this.adjustHandles();
/* 811  */ 			}.bind(this),
/* 812  */ 			onComplete: function(){
/* 813  */ 				this.resizeOnComplete();
/* 814  */ 			}.bind(this)
/* 815  */ 		});
/* 816  */ 
/* 817  */ 		this.resizable3 = this.contentWrapperEl.makeResizable({
/* 818  */ 			container: this.options.restrict == true ? $(this.options.container) : false,
/* 819  */ 			handle: this.se,
/* 820  */ 			limit: {
/* 821  */ 				x: [this.options.resizeLimit.x[0] - (this.options.shadowBlur * 2), this.options.resizeLimit.x[1] - (this.options.shadowBlur * 2) ],
/* 822  */ 				y: [this.options.resizeLimit.y[0] - this.headerFooterShadow, this.options.resizeLimit.y[1] - this.headerFooterShadow]
/* 823  */ 			},
/* 824  */ 			modifiers: {x: 'width', y: 'height'},
/* 825  */ 			onStart: function(){
/* 826  */ 				this.resizeOnStart();
/* 827  */ 			}.bind(this),
/* 828  */ 			onDrag: function(){
/* 829  */ 				this.drawWindow(windowEl);	
/* 830  */ 				this.adjustHandles();
/* 831  */ 			}.bind(this),
/* 832  */ 			onComplete: function(){
/* 833  */ 				this.resizeOnComplete();
/* 834  */ 			}.bind(this)	
/* 835  */ 		});
/* 836  */ 
/* 837  */ 		this.resizable4 = this.contentWrapperEl.makeResizable({
/* 838  */ 			handle: [this.s, this.sw],
/* 839  */ 			limit: {
/* 840  */ 				y: [this.options.resizeLimit.y[0] - this.headerFooterShadow, this.options.resizeLimit.y[1] - this.headerFooterShadow]
/* 841  */ 			},
/* 842  */ 			modifiers: {x: false, y: 'height'},
/* 843  */ 			onStart: function(){
/* 844  */ 				this.resizeOnStart();
/* 845  */ 			}.bind(this),
/* 846  */ 			onDrag: function(){
/* 847  */ 				this.drawWindow(windowEl);
/* 848  */ 				this.adjustHandles();
/* 849  */ 			}.bind(this),
/* 850  */ 			onComplete: function(){

/* Window.js */

/* 851  */ 				this.resizeOnComplete();
/* 852  */ 			}.bind(this)
/* 853  */ 		});
/* 854  */ 
/* 855  */ 		this.resizable5 = this.windowEl.makeResizable({
/* 856  */ 			handle: [this.w, this.sw, this.nw],
/* 857  */ 			limit: {
/* 858  */ 				x: [
/* 859  */ 					function(){
/* 860  */ 						return this.windowEl.getStyle('left').toInt() + this.windowEl.getStyle('width').toInt() - this.options.resizeLimit.x[1];
/* 861  */ 					}.bind(this),
/* 862  */ 				   function(){
/* 863  */ 					   return this.windowEl.getStyle('left').toInt() + this.windowEl.getStyle('width').toInt() - this.options.resizeLimit.x[0];
/* 864  */ 					}.bind(this)
/* 865  */ 				]
/* 866  */ 			},
/* 867  */ 			modifiers: {x: 'left', y: false},
/* 868  */ 			onStart: function(){
/* 869  */ 				this.resizeOnStart();
/* 870  */ 				this.coords = this.contentWrapperEl.getCoordinates();
/* 871  */ 				this.x2 = this.coords.left.toInt() + this.contentWrapperEl.offsetWidth;
/* 872  */ 			}.bind(this),
/* 873  */ 			onDrag: function(){
/* 874  */ 				this.coords = this.contentWrapperEl.getCoordinates();
/* 875  */ 				this.contentWrapperEl.setStyle('width', this.x2 - this.coords.left.toInt());
/* 876  */ 				this.drawWindow(windowEl);
/* 877  */ 				this.adjustHandles();
/* 878  */ 			}.bind(this),
/* 879  */ 			onComplete: function(){
/* 880  */ 				this.resizeOnComplete();
/* 881  */ 			}.bind(this)
/* 882  */ 		});
/* 883  */ 
/* 884  */ 	},
/* 885  */ 	resizeOnStart: function(){
/* 886  */ 		$('windowUnderlay').setStyle('display','block');
/* 887  */ 		if (this.iframeEl){
/* 888  */ 			this.iframeEl.setStyle('visibility', 'hidden');
/* 889  */ 		}	
/* 890  */ 	},	
/* 891  */ 	resizeOnComplete: function(){
/* 892  */ 		$('windowUnderlay').setStyle('display','none');
/* 893  */ 		if (this.iframeEl){
/* 894  */ 			this.iframeEl.setStyle('visibility', 'visible');
/* 895  */ 		}
/* 896  */ 		this.fireEvent('onResize', this.windowEl);
/* 897  */ 	},
/* 898  */ 	adjustHandles: function(){
/* 899  */ 
/* 900  */ 		var shadowBlur = this.options.shadowBlur;

/* Window.js */

/* 901  */ 		var shadowBlur2x = shadowBlur * 2;
/* 902  */ 		var shadowOffset = this.options.shadowOffset;
/* 903  */ 		var top = shadowBlur - shadowOffset.y - 1;
/* 904  */ 		var right = shadowBlur + shadowOffset.x - 1;
/* 905  */ 		var bottom = shadowBlur + shadowOffset.y - 1;
/* 906  */ 		var left = shadowBlur - shadowOffset.x - 1;
/* 907  */ 		
/* 908  */ 		var coordinates = this.windowEl.getCoordinates();
/* 909  */ 		var width = coordinates.width - shadowBlur2x + 2;
/* 910  */ 		var height = coordinates.height - shadowBlur2x + 2;
/* 911  */ 
/* 912  */ 		this.n.setStyles({
/* 913  */ 			'top': top,
/* 914  */ 			'left': left + 10,
/* 915  */ 			'width': width - 20
/* 916  */ 		});
/* 917  */ 		this.e.setStyles({
/* 918  */ 			'top': top + 10,
/* 919  */ 			'right': right,
/* 920  */ 			'height': height - 30
/* 921  */ 		});
/* 922  */ 		this.s.setStyles({
/* 923  */ 			'bottom': bottom,
/* 924  */ 			'left': left + 10,
/* 925  */ 			'width': width - 30
/* 926  */ 		});
/* 927  */ 		this.w.setStyles({
/* 928  */ 			'top': top + 10,
/* 929  */ 			'left': left,
/* 930  */ 			'height': height - 20
/* 931  */ 		});
/* 932  */ 		this.ne.setStyles({
/* 933  */ 			'top': top,
/* 934  */ 			'right': right	
/* 935  */ 		});
/* 936  */ 		this.se.setStyles({
/* 937  */ 			'bottom': bottom,
/* 938  */ 			'right': right
/* 939  */ 		});
/* 940  */ 		this.sw.setStyles({
/* 941  */ 			'bottom': bottom,
/* 942  */ 			'left': left
/* 943  */ 		});
/* 944  */ 		this.nw.setStyles({
/* 945  */ 			'top': top,
/* 946  */ 			'left': left
/* 947  */ 		});
/* 948  */ 	},
/* 949  */ 	detachResizable: function(){
/* 950  */ 			this.resizable1.detach();

/* Window.js */

/* 951  */ 			this.resizable2.detach();
/* 952  */ 			this.resizable3.detach();
/* 953  */ 			this.resizable4.detach();
/* 954  */ 			this.resizable5.detach();
/* 955  */ 			this.windowEl.getElements('.handle').setStyle('display', 'none');
/* 956  */ 	},
/* 957  */ 	reattachResizable: function(){
/* 958  */ 			this.resizable1.attach();
/* 959  */ 			this.resizable2.attach();
/* 960  */ 			this.resizable3.attach();
/* 961  */ 			this.resizable4.attach();
/* 962  */ 			this.resizable5.attach();
/* 963  */ 			this.windowEl.getElements('.handle').setStyle('display', 'block');
/* 964  */ 	},
/* 965  */ 	/*
/* 966  *| 
/* 967  *| 	Internal Function: insertWindowElements
/* 968  *| 
/* 969  *| 	Arguments:
/* 970  *| 		windowEl
/* 971  *| 
/* 972  *| 	*/
/* 973  */ 	insertWindowElements: function(){
/* 974  */ 		
/* 975  */ 		var options = this.options;
/* 976  */ 		var height = options.height;
/* 977  */ 		var width = options.width;
/* 978  */ 		var id = options.id;
/* 979  */ 
/* 980  */ 		var cache = {};
/* 981  */ 
/* 982  */ 		if (Browser.Engine.trident4){
/* 983  */ 			cache.zIndexFixEl = new Element('iframe', {
/* 984  */ 				'id': id + '_zIndexFix',
/* 985  */ 				'class': 'zIndexFix',
/* 986  */ 				'scrolling': 'no',
/* 987  */ 				'marginWidth': 0,
/* 988  */ 				'marginHeight': 0,
/* 989  */ 				'src': ''
/* 990  */ 			}).inject(this.windowEl);
/* 991  */ 		}
/* 992  */ 
/* 993  */ 		cache.overlayEl = new Element('div', {
/* 994  */ 			'id': id + '_overlay',
/* 995  */ 			'class': 'mochaOverlay'
/* 996  */ 		}).inject(this.windowEl);
/* 997  */ 
/* 998  */ 		cache.titleBarEl = new Element('div', {
/* 999  */ 			'id': id + '_titleBar',
/* 1000 */ 			'class': 'mochaTitlebar',

/* Window.js */

/* 1001 */ 			'styles': {
/* 1002 */ 				'cursor': options.draggable ? 'move' : 'default'
/* 1003 */ 			}
/* 1004 */ 		}).inject(cache.overlayEl, 'top');
/* 1005 */ 
/* 1006 */ 		cache.titleEl = new Element('h3', {
/* 1007 */ 			'id': id + '_title',
/* 1008 */ 			'class': 'mochaTitle'
/* 1009 */ 		}).inject(cache.titleBarEl);
/* 1010 */ 
/* 1011 */ 		if (options.icon != false){
/* 1012 */ 			cache.titleBarEl.setStyles({
/* 1013 */ 				'padding-left': 15,
/* 1014 */ 				'background': 'url(' + options.icon + ') 5px 5px no-repeat'
/* 1015 */ 			});
/* 1016 */ 		}
/* 1017 */ 		
/* 1018 */ 		cache.contentBorderEl = new Element('div', {
/* 1019 */ 			'id': id + '_contentBorder',
/* 1020 */ 			'class': 'mochaContentBorder'
/* 1021 */ 		}).inject(cache.overlayEl);
/* 1022 */ 
/* 1023 */ 		if (options.toolbar){
/* 1024 */ 			cache.toolbarWrapperEl = new Element('div', {
/* 1025 */ 				'id': id + '_toolbarWrapper',
/* 1026 */ 				'class': 'mochaToolbarWrapper'
/* 1027 */ 			}).inject(cache.contentBorderEl, options.toolbarPosition == 'bottom' ? 'after' : 'before');
/* 1028 */ 
/* 1029 */ 			if (options.toolbarPosition == 'bottom') {
/* 1030 */ 				cache.toolbarWrapperEl.addClass('bottom');
/* 1031 */ 			}
/* 1032 */ 			cache.toolbarEl = new Element('div', {
/* 1033 */ 				'id': id + '_toolbar',
/* 1034 */ 				'class': 'mochaToolbar'
/* 1035 */ 			}).inject(cache.toolbarWrapperEl);
/* 1036 */ 		}
/* 1037 */ 
/* 1038 */ 		if (options.toolbar2){
/* 1039 */ 			cache.toolbar2WrapperEl = new Element('div', {
/* 1040 */ 				'id': id + '_toolbar2Wrapper',
/* 1041 */ 				'class': 'mochaToolbarWrapper'
/* 1042 */ 			}).inject(cache.contentBorderEl, options.toolbar2Position == 'bottom' ? 'after' : 'before');
/* 1043 */ 
/* 1044 */ 			if (options.toolbar2Position == 'bottom') {
/* 1045 */ 				cache.toolbar2WrapperEl.addClass('bottom');
/* 1046 */ 			}
/* 1047 */ 			cache.toolbar2El = new Element('div', {
/* 1048 */ 				'id': id + '_toolbar2',
/* 1049 */ 				'class': 'mochaToolbar'
/* 1050 */ 			}).inject(cache.toolbar2WrapperEl);

/* Window.js */

/* 1051 */ 		}
/* 1052 */ 
/* 1053 */ 		cache.contentWrapperEl = new Element('div', {
/* 1054 */ 			'id': id + '_contentWrapper',
/* 1055 */ 			'class': 'mochaContentWrapper',
/* 1056 */ 			'styles': {
/* 1057 */ 				'width': width + 'px',
/* 1058 */ 				'height': height + 'px'
/* 1059 */ 			}
/* 1060 */ 		}).inject(cache.contentBorderEl);
/* 1061 */ 		
/* 1062 */ 		if (this.options.shape == 'gauge'){
/* 1063 */ 			cache.contentBorderEl.setStyle('borderWidth', 0);
/* 1064 */ 		}
/* 1065 */ 
/* 1066 */ 		cache.contentEl = new Element('div', {
/* 1067 */ 			'id': id + '_content',
/* 1068 */ 			'class': 'mochaContent'
/* 1069 */ 		}).inject(cache.contentWrapperEl);
/* 1070 */ 
/* 1071 */ 		if (this.options.useCanvas == true) {
/* 1072 */ 			cache.canvasEl = new Element('canvas', {
/* 1073 */ 				'id': id + '_canvas',
/* 1074 */ 				'class': 'mochaCanvas',
/* 1075 */ 				'width': 1,
/* 1076 */ 				'height': 1
/* 1077 */ 			}).inject(this.windowEl);
/* 1078 */ 
/* 1079 */ 			if (Browser.Engine.trident && MochaUI.ieSupport == 'excanvas'){
/* 1080 */ 				G_vmlCanvasManager.initElement(cache.canvasEl);
/* 1081 */ 				cache.canvasEl = this.windowEl.getElement('.mochaCanvas');
/* 1082 */ 			}
/* 1083 */ 		}
/* 1084 */ 
/* 1085 */ 		cache.controlsEl = new Element('div', {
/* 1086 */ 			'id': id + '_controls',
/* 1087 */ 			'class': 'mochaControls'
/* 1088 */ 		}).inject(cache.overlayEl, 'after');
/* 1089 */ 
/* 1090 */ 		if (options.useCanvasControls == true){
/* 1091 */ 			cache.canvasControlsEl = new Element('canvas', {
/* 1092 */ 				'id': id + '_canvasControls',
/* 1093 */ 				'class': 'mochaCanvasControls',
/* 1094 */ 				'width': 14,
/* 1095 */ 				'height': 14
/* 1096 */ 			}).inject(this.windowEl);
/* 1097 */ 
/* 1098 */ 			if (Browser.Engine.trident && MochaUI.ieSupport == 'excanvas'){
/* 1099 */ 				G_vmlCanvasManager.initElement(cache.canvasControlsEl);
/* 1100 */ 				cache.canvasControlsEl = this.windowEl.getElement('.mochaCanvasControls');

/* Window.js */

/* 1101 */ 			}
/* 1102 */ 		}
/* 1103 */ 
/* 1104 */ 		if (options.closable){
/* 1105 */ 			cache.closeButtonEl = new Element('div', {
/* 1106 */ 				'id': id + '_closeButton',
/* 1107 */ 				'class': 'mochaCloseButton',
/* 1108 */ 				'title': 'Fechar'
/* 1109 */ 			}).inject(cache.controlsEl);
/* 1110 */ 			if (options.useCanvasControls == true){
/* 1111 */ 				cache.closeButtonEl.setStyle('background', 'none');
/* 1112 */ 			}
/* 1113 */ 		}
/* 1114 */ 
/* 1115 */ 		if (options.maximizable){
/* 1116 */ 			cache.maximizeButtonEl = new Element('div', {
/* 1117 */ 				'id': id + '_maximizeButton',
/* 1118 */ 				'class': 'mochaMaximizeButton',
/* 1119 */ 				'title': 'Maximizar'
/* 1120 */ 			}).inject(cache.controlsEl);
/* 1121 */ 			if (options.useCanvasControls == true){
/* 1122 */ 				cache.maximizeButtonEl.setStyle('background', 'none');
/* 1123 */ 			}
/* 1124 */ 		}
/* 1125 */ 
/* 1126 */ 		if (options.minimizable){
/* 1127 */ 			cache.minimizeButtonEl = new Element('div', {
/* 1128 */ 				'id': id + '_minimizeButton',
/* 1129 */ 				'class': 'mochaMinimizeButton',
/* 1130 */ 				'title': 'Minimizar'
/* 1131 */ 			}).inject(cache.controlsEl);
/* 1132 */ 			if (options.useCanvasControls == true){
/* 1133 */ 				cache.minimizeButtonEl.setStyle('background', 'none');
/* 1134 */ 			}
/* 1135 */ 		}
/* 1136 */ 
/* 1137 */ 		if (options.useSpinner == true && options.shape != 'gauge' && options.type != 'notification'){
/* 1138 */ 			cache.spinnerEl = new Element('div', {
/* 1139 */ 				'id': id + '_spinner',
/* 1140 */ 				'class': 'mochaSpinner',
/* 1141 */ 				'width': 16,
/* 1142 */ 				'height': 16
/* 1143 */ 			}).inject(this.windowEl, 'bottom');
/* 1144 */ 		}
/* 1145 */ 
/* 1146 */ 		if (this.options.shape == 'gauge'){
/* 1147 */ 			cache.canvasHeaderEl = new Element('canvas', {
/* 1148 */ 				'id': id + '_canvasHeader',
/* 1149 */ 				'class': 'mochaCanvasHeader',
/* 1150 */ 				'width': this.options.width,

/* Window.js */

/* 1151 */ 				'height': 26
/* 1152 */ 			}).inject(this.windowEl, 'bottom');
/* 1153 */ 		
/* 1154 */ 			if (Browser.Engine.trident && MochaUI.ieSupport == 'excanvas'){
/* 1155 */ 				G_vmlCanvasManager.initElement(cache.canvasHeaderEl);
/* 1156 */ 				cache.canvasHeaderEl = this.windowEl.getElement('.mochaCanvasHeader');
/* 1157 */ 			}
/* 1158 */ 		}
/* 1159 */ 
/* 1160 */ 		if ( Browser.Engine.trident ){
/* 1161 */ 			cache.overlayEl.setStyle('zIndex', 2);
/* 1162 */ 		}
/* 1163 */ 
/* 1164 */ 		// For Mac Firefox 2 to help reduce scrollbar bugs in that browser
/* 1165 */ 		if (Browser.Platform.mac && Browser.Engine.gecko){
/* 1166 */ 			if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){
/* 1167 */ 				var ffversion = new Number(RegExp.$1);
/* 1168 */ 				if (ffversion < 3){
/* 1169 */ 					cache.overlayEl.setStyle('overflow', 'auto');
/* 1170 */ 				}
/* 1171 */ 			}
/* 1172 */ 		}
/* 1173 */ 
/* 1174 */ 		if (options.resizable){
/* 1175 */ 			cache.n = new Element('div', {
/* 1176 */ 				'id': id + '_resizeHandle_n',
/* 1177 */ 				'class': 'handle',
/* 1178 */ 				'styles': {
/* 1179 */ 					'top': 0,
/* 1180 */ 					'left': 10,
/* 1181 */ 					'cursor': 'n-resize'
/* 1182 */ 				}
/* 1183 */ 			}).inject(cache.overlayEl, 'after');
/* 1184 */ 
/* 1185 */ 			cache.ne = new Element('div', {
/* 1186 */ 				'id': id + '_resizeHandle_ne',
/* 1187 */ 				'class': 'handle corner',
/* 1188 */ 				'styles': {
/* 1189 */ 					'top': 0,
/* 1190 */ 					'right': 0,
/* 1191 */ 					'cursor': 'ne-resize'
/* 1192 */ 				}
/* 1193 */ 			}).inject(cache.overlayEl, 'after');
/* 1194 */ 			
/* 1195 */ 			cache.e = new Element('div', {
/* 1196 */ 				'id': id + '_resizeHandle_e',
/* 1197 */ 				'class': 'handle',		
/* 1198 */ 				'styles': {
/* 1199 */ 					'top': 10,
/* 1200 */ 					'right': 0,

/* Window.js */

/* 1201 */ 					'cursor': 'e-resize'
/* 1202 */ 				}
/* 1203 */ 			}).inject(cache.overlayEl, 'after');
/* 1204 */ 			
/* 1205 */ 			cache.se = new Element('div', {
/* 1206 */ 				'id': id + '_resizeHandle_se',
/* 1207 */ 				'class': 'handle cornerSE',
/* 1208 */ 				'styles': {
/* 1209 */ 					'bottom': 0,
/* 1210 */ 					'right': 0,
/* 1211 */ 					'cursor': 'se-resize'
/* 1212 */ 				}
/* 1213 */ 			}).inject(cache.overlayEl, 'after');
/* 1214 */ 
/* 1215 */ 			cache.s = new Element('div', {
/* 1216 */ 				'id': id + '_resizeHandle_s',
/* 1217 */ 				'class': 'handle',
/* 1218 */ 				'styles': {
/* 1219 */ 					'bottom': 0,
/* 1220 */ 					'left': 10,
/* 1221 */ 					'cursor': 's-resize'
/* 1222 */ 				}
/* 1223 */ 			}).inject(cache.overlayEl, 'after');
/* 1224 */ 			
/* 1225 */ 			cache.sw = new Element('div', {
/* 1226 */ 				'id': id + '_resizeHandle_sw',
/* 1227 */ 				'class': 'handle corner',
/* 1228 */ 				'styles': {
/* 1229 */ 					'bottom': 0,
/* 1230 */ 					'left': 0,
/* 1231 */ 					'cursor': 'sw-resize'
/* 1232 */ 				}
/* 1233 */ 			}).inject(cache.overlayEl, 'after');
/* 1234 */ 			
/* 1235 */ 			cache.w = new Element('div', {
/* 1236 */ 				'id': id + '_resizeHandle_w',
/* 1237 */ 				'class': 'handle',		
/* 1238 */ 				'styles': {
/* 1239 */ 					'top': 10,
/* 1240 */ 					'left': 0,
/* 1241 */ 					'cursor': 'w-resize'
/* 1242 */ 				}
/* 1243 */ 			}).inject(cache.overlayEl, 'after');
/* 1244 */ 			
/* 1245 */ 			cache.nw = new Element('div', {
/* 1246 */ 				'id': id + '_resizeHandle_nw',
/* 1247 */ 				'class': 'handle corner',		
/* 1248 */ 				'styles': {
/* 1249 */ 					'top': 0,
/* 1250 */ 					'left': 0,

/* Window.js */

/* 1251 */ 					'cursor': 'nw-resize'
/* 1252 */ 				}
/* 1253 */ 			}).inject(cache.overlayEl, 'after');
/* 1254 */ 		}
/* 1255 */ 		$extend(this, cache);
/* 1256 */ 		
/* 1257 */ 	},
/* 1258 */ 	/*
/* 1259 *| 
/* 1260 *| 	Internal function: drawWindow
/* 1261 *| 		This is where we create the canvas GUI	
/* 1262 *| 
/* 1263 *| 	Arguments: 
/* 1264 *| 		windowEl: the $(window)
/* 1265 *| 		shadows: (boolean) false will draw a window without shadows
/* 1266 *| 
/* 1267 *| 	*/	
/* 1268 */ 	drawWindow: function(windowEl, shadows) {
/* 1269 */ 				
/* 1270 */ 		if (this.isCollapsed){
/* 1271 */ 			this.drawWindowCollapsed(windowEl, shadows);
/* 1272 */ 			return;
/* 1273 */ 		}
/* 1274 */ 
/* 1275 */ 		var options = this.options;
/* 1276 */ 		var shadowBlur = options.shadowBlur;
/* 1277 */ 		var shadowBlur2x = shadowBlur * 2;
/* 1278 */ 		var shadowOffset = this.options.shadowOffset;
/* 1279 */ 
/* 1280 */ 		this.overlayEl.setStyles({
/* 1281 */ 			'width': this.contentWrapperEl.offsetWidth
/* 1282 */ 		});
/* 1283 */ 
/* 1284 */ 		// Resize iframe when window is resized
/* 1285 */ 		if (this.iframeEl) {
/* 1286 */ 			this.iframeEl.setStyles({
/* 1287 */ 				'height': this.contentWrapperEl.offsetHeight
/* 1288 */ 			});
/* 1289 */ 		}
/* 1290 */ 
/* 1291 */ 		var borderHeight = this.contentBorderEl.getStyle('border-top').toInt() + this.contentBorderEl.getStyle('border-bottom').toInt();
/* 1292 */ 		var toolbarHeight = this.toolbarWrapperEl ? this.toolbarWrapperEl.getStyle('height').toInt() + this.toolbarWrapperEl.getStyle('border-top').toInt() : 0;
/* 1293 */ 		var toolbar2Height = this.toolbar2WrapperEl ? this.toolbar2WrapperEl.getStyle('height').toInt() + this.toolbar2WrapperEl.getStyle('border-top').toInt() : 0;
/* 1294 */ 
/* 1295 */ 		this.headerFooterShadow = options.headerHeight + options.footerHeight + shadowBlur2x;
/* 1296 */ 		var height = this.contentWrapperEl.getStyle('height').toInt() + this.headerFooterShadow + toolbarHeight + toolbar2Height + borderHeight;
/* 1297 */ 		var width = this.contentWrapperEl.getStyle('width').toInt() + shadowBlur2x;
/* 1298 */ 		this.windowEl.setStyles({
/* 1299 */ 			'height': height,
/* 1300 */ 			'width': width

/* Window.js */

/* 1301 */ 		});
/* 1302 */ 
/* 1303 */ 		this.overlayEl.setStyles({
/* 1304 */ 			'height': height,
/* 1305 */ 			'top': shadowBlur - shadowOffset.y,
/* 1306 */ 			'left': shadowBlur - shadowOffset.x
/* 1307 */ 		});		
/* 1308 */ 
/* 1309 */ 		// Opera requires the canvas height and width be set this way when resizing:
/* 1310 */ 		if (this.options.useCanvas == true) {
/* 1311 */ 			this.canvasEl.height = height;
/* 1312 */ 			this.canvasEl.width = width;
/* 1313 */ 		}
/* 1314 */ 
/* 1315 */ 		// Part of the fix for IE6 select z-index bug
/* 1316 */ 		if (Browser.Engine.trident4){
/* 1317 */ 			this.zIndexFixEl.setStyles({
/* 1318 */ 				'width': width,
/* 1319 */ 				'height': height
/* 1320 */ 			})
/* 1321 */ 		}
/* 1322 */ 
/* 1323 */ 		this.titleBarEl.setStyles({
/* 1324 */ 			'width': width - shadowBlur2x,
/* 1325 */ 			'height': options.headerHeight
/* 1326 */ 		});
/* 1327 */ 
/* 1328 */ 		// Make sure loading icon is placed correctly.
/* 1329 */ 		if (options.useSpinner == true && options.shape != 'gauge' && options.type != 'notification'){
/* 1330 */ 			this.spinnerEl.setStyles({
/* 1331 */ 				'left': shadowBlur - shadowOffset.x + 3,
/* 1332 */ 				'bottom': shadowBlur + shadowOffset.y +  4
/* 1333 */ 			});
/* 1334 */ 		}
/* 1335 */ 		
/* 1336 */ 		if (this.options.useCanvas != false) {
/* 1337 */ 		
/* 1338 */ 			// Draw Window
/* 1339 */ 			var ctx = this.canvasEl.getContext('2d');
/* 1340 */ 			ctx.clearRect(0, 0, width, height);
/* 1341 */ 			
/* 1342 */ 			switch (options.shape) {
/* 1343 */ 				case 'box':
/* 1344 */ 					this.drawBox(ctx, width, height, shadowBlur, shadowOffset, shadows);
/* 1345 */ 					break;
/* 1346 */ 				case 'gauge':
/* 1347 */ 					this.drawGauge(ctx, width, height, shadowBlur, shadowOffset, shadows);
/* 1348 */ 					break;
/* 1349 */ 			}
/* 1350 */ 

/* Window.js */

/* 1351 */ 
/* 1352 */ 			if (options.resizable){ 
/* 1353 */ 				MochaUI.triangle(
/* 1354 */ 					ctx,
/* 1355 */ 					width - (shadowBlur + shadowOffset.x + 17),
/* 1356 */ 					height - (shadowBlur + shadowOffset.y + 18),
/* 1357 */ 					11,
/* 1358 */ 					11,
/* 1359 */ 					options.resizableColor,
/* 1360 */ 					1.0
/* 1361 */ 				);
/* 1362 */ 			}
/* 1363 */ 
/* 1364 */ 			// Invisible dummy object. The last element drawn is not rendered consistently while resizing in IE6 and IE7
/* 1365 */ 			if (Browser.Engine.trident){
/* 1366 */ 				MochaUI.triangle(ctx, 0, 0, 10, 10, options.resizableColor, 0);
/* 1367 */ 			}
/* 1368 */ 		}
/* 1369 */ 		
/* 1370 */ 		if (options.type != 'notification' && options.useCanvasControls == true){
/* 1371 */ 			this.drawControls(width, height, shadows);
/* 1372 */ 		}
/* 1373 */ 
/* 1374 */ 	},
/* 1375 */ 	drawWindowCollapsed: function(windowEl, shadows) {
/* 1376 */ 		
/* 1377 */ 		var options = this.options;
/* 1378 */ 		var shadowBlur = options.shadowBlur;
/* 1379 */ 		var shadowBlur2x = shadowBlur * 2;
/* 1380 */ 		var shadowOffset = options.shadowOffset;
/* 1381 */ 		
/* 1382 */ 		var headerShadow = options.headerHeight + shadowBlur2x + 2;
/* 1383 */ 		var height = headerShadow;
/* 1384 */ 		var width = this.contentWrapperEl.getStyle('width').toInt() + shadowBlur2x;
/* 1385 */ 		this.windowEl.setStyle('height', height);
/* 1386 */ 		
/* 1387 */ 		this.overlayEl.setStyles({
/* 1388 */ 			'height': height,
/* 1389 */ 			'top': shadowBlur - shadowOffset.y,
/* 1390 */ 			'left': shadowBlur - shadowOffset.x
/* 1391 */ 		});		
/* 1392 */ 
/* 1393 */ 		// Opera height and width must be set like this, when resizing:
/* 1394 */ 		this.canvasEl.height = height;
/* 1395 */ 		this.canvasEl.width = width;
/* 1396 */ 
/* 1397 */ 		// Part of the fix for IE6 select z-index bug
/* 1398 */ 		if (Browser.Engine.trident4){
/* 1399 */ 			this.zIndexFixEl.setStyles({
/* 1400 */ 				'width': width,

/* Window.js */

/* 1401 */ 				'height': height
/* 1402 */ 			});
/* 1403 */ 		}
/* 1404 */ 
/* 1405 */ 		// Set width
/* 1406 */ 		this.windowEl.setStyle('width', width);
/* 1407 */ 		this.overlayEl.setStyle('width', width);
/* 1408 */ 		this.titleBarEl.setStyles({
/* 1409 */ 			'width': width - shadowBlur2x,
/* 1410 */ 			'height': options.headerHeight
/* 1411 */ 		});
/* 1412 */ 	
/* 1413 */ 		// Draw Window
/* 1414 */ 		if (this.options.useCanvas != false) {
/* 1415 */ 			var ctx = this.canvasEl.getContext('2d');
/* 1416 */ 			ctx.clearRect(0, 0, width, height);
/* 1417 */ 			
/* 1418 */ 			this.drawBoxCollapsed(ctx, width, height, shadowBlur, shadowOffset, shadows);
/* 1419 */ 			if (options.useCanvasControls == true) {
/* 1420 */ 				this.drawControls(width, height, shadows);
/* 1421 */ 			}
/* 1422 */ 			
/* 1423 */ 			// Invisible dummy object. The last element drawn is not rendered consistently while resizing in IE6 and IE7
/* 1424 */ 			if (Browser.Engine.trident){
/* 1425 */ 				MochaUI.triangle(ctx, 0, 0, 10, 10, options.resizableColor, 0);
/* 1426 */ 			}
/* 1427 */ 		}
/* 1428 */ 
/* 1429 */ 	},	
/* 1430 */ 	drawControls : function(width, height, shadows){
/* 1431 */ 		var options = this.options;
/* 1432 */ 		var shadowBlur = options.shadowBlur;
/* 1433 */ 		var shadowOffset = options.shadowOffset;
/* 1434 */ 		var controlsOffset = options.controlsOffset;
/* 1435 */ 		
/* 1436 */ 		// Make sure controls are placed correctly.
/* 1437 */ 		this.controlsEl.setStyles({
/* 1438 */ 			'right': shadowBlur + shadowOffset.x + controlsOffset.right,
/* 1439 */ 			'top': shadowBlur - shadowOffset.y + controlsOffset.top
/* 1440 */ 		});
/* 1441 */ 
/* 1442 */ 		this.canvasControlsEl.setStyles({
/* 1443 */ 			'right': shadowBlur + shadowOffset.x + controlsOffset.right,
/* 1444 */ 			'top': shadowBlur - shadowOffset.y + controlsOffset.top
/* 1445 */ 		});
/* 1446 */ 
/* 1447 */ 		// Calculate X position for controlbuttons
/* 1448 */ 		//var mochaControlsWidth = 52;
/* 1449 */ 		this.closebuttonX = options.closable ? this.mochaControlsWidth - 7 : this.mochaControlsWidth + 12;
/* 1450 */ 		this.maximizebuttonX = this.closebuttonX - (options.maximizable ? 19 : 0);

/* Window.js */

/* 1451 */ 		this.minimizebuttonX = this.maximizebuttonX - (options.minimizable ? 19 : 0);
/* 1452 */ 		
/* 1453 */ 		var ctx2 = this.canvasControlsEl.getContext('2d');
/* 1454 */ 		ctx2.clearRect(0, 0, 100, 100);
/* 1455 */ 
/* 1456 */ 		if (this.options.closable){
/* 1457 */ 			this.closebutton(
/* 1458 */ 				ctx2,
/* 1459 */ 				this.closebuttonX,
/* 1460 */ 				7,
/* 1461 */ 				options.closeBgColor,
/* 1462 */ 				1.0,
/* 1463 */ 				options.closeColor,
/* 1464 */ 				1.0
/* 1465 */ 			);
/* 1466 */ 		}
/* 1467 */ 		if (this.options.maximizable){
/* 1468 */ 			this.maximizebutton(
/* 1469 */ 				ctx2,
/* 1470 */ 				this.maximizebuttonX,
/* 1471 */ 				7,
/* 1472 */ 				options.maximizeBgColor,
/* 1473 */ 				1.0,
/* 1474 */ 				options.maximizeColor,
/* 1475 */ 				1.0
/* 1476 */ 			);
/* 1477 */ 		}
/* 1478 */ 		if (this.options.minimizable){
/* 1479 */ 			this.minimizebutton(
/* 1480 */ 				ctx2,
/* 1481 */ 				this.minimizebuttonX,
/* 1482 */ 				7,
/* 1483 */ 				options.minimizeBgColor,
/* 1484 */ 				1.0,
/* 1485 */ 				options.minimizeColor,
/* 1486 */ 				1.0
/* 1487 */ 			);
/* 1488 */ 		}
/* 1489 */ 		
/* 1490 */ 	},
/* 1491 */ 	drawBox: function(ctx, width, height, shadowBlur, shadowOffset, shadows){
/* 1492 */ 
/* 1493 */ 		var shadowBlur2x = shadowBlur * 2;
/* 1494 */ 		var cornerRadius = this.options.cornerRadius;
/* 1495 */ 
/* 1496 */ 		// This is the drop shadow. It is created onion style.
/* 1497 */ 		if ( shadows != false ) {	
/* 1498 */ 			for (var x = 0; x <= shadowBlur; x++){
/* 1499 */ 				MochaUI.roundedRect(
/* 1500 */ 					ctx,

/* Window.js */

/* 1501 */ 					shadowOffset.x + x,
/* 1502 */ 					shadowOffset.y + x,
/* 1503 */ 					width - (x * 2) - shadowOffset.x,
/* 1504 */ 					height - (x * 2) - shadowOffset.y,
/* 1505 */ 					cornerRadius + (shadowBlur - x),
/* 1506 */ 					[100, 100, 100],
/* 1507 */ 					x == shadowBlur ? .29 : .065 + (x * .01)
/* 1508 */ 				);
/* 1509 */ 			}
/* 1510 */ 		}
/* 1511 */ 		// Window body.
/* 1512 */ 		this.bodyRoundedRect(
/* 1513 */ 			ctx,                          // context
/* 1514 */ 			shadowBlur - shadowOffset.x,  // x
/* 1515 */ 			shadowBlur - shadowOffset.y,  // y
/* 1516 */ 			width - shadowBlur2x,         // width
/* 1517 */ 			height - shadowBlur2x,        // height
/* 1518 */ 			cornerRadius,                 // corner radius
/* 1519 */ 			this.options.bodyBgColor      // Footer color
/* 1520 */ 		);
/* 1521 */ 
/* 1522 */ 		if (this.options.type != 'notification'){
/* 1523 */ 		// Window header.
/* 1524 */ 			this.topRoundedRect(
/* 1525 */ 				ctx,                            // context
/* 1526 */ 				shadowBlur - shadowOffset.x,    // x
/* 1527 */ 				shadowBlur - shadowOffset.y,    // y
/* 1528 */ 				width - shadowBlur2x,           // width
/* 1529 */ 				this.options.headerHeight,      // height
/* 1530 */ 				cornerRadius,                   // corner radius
/* 1531 */ 				this.options.headerStartColor,  // Header gradient's top color
/* 1532 */ 				this.options.headerStopColor    // Header gradient's bottom color
/* 1533 */ 			);
/* 1534 */ 		}	
/* 1535 */ 	},
/* 1536 */ 	drawBoxCollapsed: function(ctx, width, height, shadowBlur, shadowOffset, shadows){
/* 1537 */ 
/* 1538 */ 		var options = this.options;
/* 1539 */ 		var shadowBlur2x = shadowBlur * 2;
/* 1540 */ 		var cornerRadius = options.cornerRadius;
/* 1541 */ 	
/* 1542 */ 		// This is the drop shadow. It is created onion style.
/* 1543 */ 		if ( shadows != false ){
/* 1544 */ 			for (var x = 0; x <= shadowBlur; x++){
/* 1545 */ 				MochaUI.roundedRect(
/* 1546 */ 					ctx,
/* 1547 */ 					shadowOffset.x + x,
/* 1548 */ 					shadowOffset.y + x,
/* 1549 */ 					width - (x * 2) - shadowOffset.x,
/* 1550 */ 					height - (x * 2) - shadowOffset.y,

/* Window.js */

/* 1551 */ 					cornerRadius + (shadowBlur - x),
/* 1552 */ 					[0, 0, 0],
/* 1553 */ 					x == shadowBlur ? .3 : .06 + (x * .01)
/* 1554 */ 				);
/* 1555 */ 			}
/* 1556 */ 		}
/* 1557 */ 
/* 1558 */ 		// Window header
/* 1559 */ 		this.topRoundedRect2(
/* 1560 */ 			ctx,                          // context
/* 1561 */ 			shadowBlur - shadowOffset.x,  // x
/* 1562 */ 			shadowBlur - shadowOffset.y,  // y
/* 1563 */ 			width - shadowBlur2x,         // width
/* 1564 */ 			options.headerHeight + 2,     // height
/* 1565 */ 			cornerRadius,                 // corner radius
/* 1566 */ 			options.headerStartColor,     // Header gradient's top color
/* 1567 */ 			options.headerStopColor       // Header gradient's bottom color
/* 1568 */ 		);
/* 1569 */ 
/* 1570 */ 	},	
/* 1571 */ 	drawGauge: function(ctx, width, height, shadowBlur, shadowOffset, shadows){
/* 1572 */ 		var options = this.options;
/* 1573 */ 		var radius = (width * .5) - (shadowBlur) + 16;
/* 1574 */ 		if (shadows != false) {	
/* 1575 */ 			for (var x = 0; x <= shadowBlur; x++){
/* 1576 */ 				MochaUI.circle(
/* 1577 */ 					ctx,
/* 1578 */ 					width * .5 + shadowOffset.x,
/* 1579 */ 					(height  + options.headerHeight) * .5 + shadowOffset.x,
/* 1580 */ 					(width *.5) - (x * 2) - shadowOffset.x,
/* 1581 */ 					[0, 0, 0],
/* 1582 */ 					x == shadowBlur ? .75 : .075 + (x * .04)
/* 1583 */ 				);
/* 1584 */ 			}
/* 1585 */ 		}
/* 1586 */ 		MochaUI.circle(
/* 1587 */ 			ctx,
/* 1588 */ 			width * .5  - shadowOffset.x,
/* 1589 */ 			(height + options.headerHeight) * .5  - shadowOffset.y,
/* 1590 */ 			(width *.5) - shadowBlur,
/* 1591 */ 			options.bodyBgColor,
/* 1592 */ 			1
/* 1593 */ 		);
/* 1594 */ 
/* 1595 */ 		// Draw gauge header
/* 1596 */ 		this.canvasHeaderEl.setStyles({
/* 1597 */ 			'top': shadowBlur - shadowOffset.y,
/* 1598 */ 			'left': shadowBlur - shadowOffset.x
/* 1599 */ 		});		
/* 1600 */ 		var ctx = this.canvasHeaderEl.getContext('2d');

/* Window.js */

/* 1601 */ 		ctx.clearRect(0, 0, width, 100);
/* 1602 */ 		ctx.beginPath();
/* 1603 */ 		ctx.lineWidth = 24;
/* 1604 */ 		ctx.lineCap = 'round';
/* 1605 */ 		ctx.moveTo(13, 13);
/* 1606 */ 		ctx.lineTo(width - (shadowBlur*2) - 13, 13);
/* 1607 */ 		ctx.strokeStyle = 'rgba(0, 0, 0, .65)';
/* 1608 */ 		ctx.stroke();
/* 1609 */ 	},
/* 1610 */ 	bodyRoundedRect: function(ctx, x, y, width, height, radius, rgb){
/* 1611 */ 		ctx.fillStyle = 'rgba(' + rgb.join(',') + ', 100)';
/* 1612 */ 		ctx.beginPath();
/* 1613 */ 		ctx.moveTo(x, y + radius);
/* 1614 */ 		ctx.lineTo(x, y + height - radius);
/* 1615 */ 		ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
/* 1616 */ 		ctx.lineTo(x + width - radius, y + height);
/* 1617 */ 		ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
/* 1618 */ 		ctx.lineTo(x + width, y + radius);
/* 1619 */ 		ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
/* 1620 */ 		ctx.lineTo(x + radius, y);
/* 1621 */ 		ctx.quadraticCurveTo(x, y, x, y + radius);
/* 1622 */ 		ctx.fill();
/* 1623 */ 
/* 1624 */ 	},
/* 1625 */ 	topRoundedRect: function(ctx, x, y, width, height, radius, headerStartColor, headerStopColor){
/* 1626 */ 		var lingrad = ctx.createLinearGradient(0, 0, 0, height);
/* 1627 */ 		lingrad.addColorStop(0, 'rgba(' + headerStartColor.join(',') + ', 1)');
/* 1628 */ 		lingrad.addColorStop(1, 'rgba(' + headerStopColor.join(',') + ', 1)');		
/* 1629 */ 		ctx.fillStyle = lingrad;
/* 1630 */ 		ctx.beginPath();
/* 1631 */ 		ctx.moveTo(x, y);
/* 1632 */ 		ctx.lineTo(x, y + height);
/* 1633 */ 		ctx.lineTo(x + width, y + height);
/* 1634 */ 		ctx.lineTo(x + width, y + radius);
/* 1635 */ 		ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
/* 1636 */ 		ctx.lineTo(x + radius, y);
/* 1637 */ 		ctx.quadraticCurveTo(x, y, x, y + radius);
/* 1638 */ 		ctx.fill();
/* 1639 */ 		/*
/* 1640 *| 		ctx.beginPath();
/* 1641 *| 		ctx.strokeStyle = '#000';
/* 1642 *| 		ctx.lineWidth = 1;
/* 1643 *| 		ctx.moveTo(x, y + height + .5);
/* 1644 *| 		ctx.lineTo(x + width, y + height + .5);
/* 1645 *| 		ctx.stroke();
/* 1646 *| 		*/
/* 1647 */ 
/* 1648 */ 	},
/* 1649 */ 	topRoundedRect2: function(ctx, x, y, width, height, radius, headerStartColor, headerStopColor){
/* 1650 */ 		var lingrad = ctx.createLinearGradient(0, this.options.shadowBlur - 1, 0, height + this.options.shadowBlur + 3);

/* Window.js */

/* 1651 */ 		lingrad.addColorStop(0, 'rgba(' + headerStartColor.join(',') + ', 1)');
/* 1652 */ 		lingrad.addColorStop(1, 'rgba(' + headerStopColor.join(',') + ', 1)');
/* 1653 */ 		ctx.fillStyle = lingrad;
/* 1654 */ 		ctx.beginPath();
/* 1655 */ 		ctx.moveTo(x, y + radius);
/* 1656 */ 		ctx.lineTo(x, y + height - radius);
/* 1657 */ 		ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
/* 1658 */ 		ctx.lineTo(x + width - radius, y + height);
/* 1659 */ 		ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
/* 1660 */ 		ctx.lineTo(x + width, y + radius);
/* 1661 */ 		ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
/* 1662 */ 		ctx.lineTo(x + radius, y);
/* 1663 */ 		ctx.quadraticCurveTo(x, y, x, y + radius);
/* 1664 */ 		ctx.fill();	
/* 1665 */ 	},
/* 1666 */ 	maximizebutton: function(ctx, x, y, rgbBg, aBg, rgb, a){
/* 1667 */ 		// Circle
/* 1668 */ 		ctx.beginPath();
/* 1669 */ 		ctx.moveTo(x, y);
/* 1670 */ 		ctx.arc(x, y, 7, 0, Math.PI*2, true);
/* 1671 */ 		ctx.fillStyle = 'rgba(' + rgbBg.join(',') + ',' + aBg + ')';
/* 1672 */ 		ctx.fill();
/* 1673 */ 		// X sign
/* 1674 */ 		ctx.strokeStyle = 'rgba(' + rgb.join(',') + ',' + a + ')';
/* 1675 */ 		ctx.beginPath();
/* 1676 */ 		ctx.moveTo(x, y - 4);
/* 1677 */ 		ctx.lineTo(x, y + 4);
/* 1678 */ 		ctx.stroke();
/* 1679 */ 		ctx.beginPath();
/* 1680 */ 		ctx.moveTo(x - 4, y);
/* 1681 */ 		ctx.lineTo(x + 4, y);
/* 1682 */ 		ctx.stroke();
/* 1683 */ 	},
/* 1684 */ 	closebutton: function(ctx, x, y, rgbBg, aBg, rgb, a){
/* 1685 */ 		// Circle
/* 1686 */ 		ctx.beginPath();
/* 1687 */ 		ctx.moveTo(x, y);
/* 1688 */ 		ctx.arc(x, y, 7, 0, Math.PI*2, true);
/* 1689 */ 		ctx.fillStyle = 'rgba(' + rgbBg.join(',') + ',' + aBg + ')';
/* 1690 */ 		ctx.fill();
/* 1691 */ 		// Plus sign
/* 1692 */ 		ctx.strokeStyle = 'rgba(' + rgb.join(',') + ',' + a + ')';
/* 1693 */ 		ctx.beginPath();
/* 1694 */ 		ctx.moveTo(x - 3, y - 3);
/* 1695 */ 		ctx.lineTo(x + 3, y + 3);
/* 1696 */ 		ctx.lineWidth="2";
/* 1697 */ 		ctx.stroke();
/* 1698 */ 		ctx.beginPath();
/* 1699 */ 		ctx.moveTo(x + 3, y - 3);
/* 1700 */ 		ctx.lineTo(x - 3, y + 3);

/* Window.js */

/* 1701 */ 		ctx.lineWidth="2";
/* 1702 */ 		ctx.stroke();
/* 1703 */ 	},
/* 1704 */ 	minimizebutton: function(ctx, x, y, rgbBg, aBg, rgb, a){
/* 1705 */ 		// Circle
/* 1706 */ 		ctx.beginPath();
/* 1707 */ 		ctx.moveTo(x,y);
/* 1708 */ 		ctx.arc(x, y, 7, 0, Math.PI*2, true);
/* 1709 */ 		ctx.fillStyle = 'rgba(' + rgbBg.join(',') + ',' + aBg + ')';
/* 1710 */ 		ctx.fill();
/* 1711 */ 		// Minus sign
/* 1712 */ 		ctx.strokeStyle = 'rgba(' + rgb.join(',') + ',' + a + ')';
/* 1713 */ 		ctx.beginPath();
/* 1714 */ 		ctx.moveTo(x - 4, y);
/* 1715 */ 		ctx.lineTo(x + 4, y);
/* 1716 */ 		ctx.stroke();
/* 1717 */ 	},
/* 1718 */ 	/*
/* 1719 *| 
/* 1720 *| 	Function: hideSpinner
/* 1721 *| 		Hides the spinner.
/* 1722 *| 		
/* 1723 *| 	*/	
/* 1724 */ 	hideSpinner: function(spinner) {
/* 1725 */ 		if ($(spinner))	$(spinner).setStyle('visibility', 'hidden');
/* 1726 */ 	},
/* 1727 */ 	/*
/* 1728 *| 
/* 1729 *| 	Function: showSpinner
/* 1730 *| 		Shows the spinner.
/* 1731 *| 	
/* 1732 *| 	*/	
/* 1733 */ 	showSpinner: function(spinner){
/* 1734 */ 		if (!this.options.useSpinner || this.options.shape == 'gauge' || this.options.type == 'notification') return;
/* 1735 */ 		$(spinner).setStyles({
/* 1736 */ 			'visibility': 'visible'
/* 1737 */ 		});
/* 1738 */ 	},
/* 1739 */ 	setMochaControlsWidth: function(){
/* 1740 */ 		this.mochaControlsWidth = 0;
/* 1741 */ 		var options = this.options;
/* 1742 */ 		if (options.minimizable){
/* 1743 */ 			this.mochaControlsWidth += (this.minimizeButtonEl.getStyle('margin-left').toInt() + this.minimizeButtonEl.getStyle('width').toInt());
/* 1744 */ 		}
/* 1745 */ 		if (options.maximizable){
/* 1746 */ 			this.mochaControlsWidth += (this.maximizeButtonEl.getStyle('margin-left').toInt() + this.maximizeButtonEl.getStyle('width').toInt());
/* 1747 */ 		}
/* 1748 */ 		if (options.closable){
/* 1749 */ 			this.mochaControlsWidth += (this.closeButtonEl.getStyle('margin-left').toInt() + this.closeButtonEl.getStyle('width').toInt());
/* 1750 */ 		}

/* Window.js */

/* 1751 */ 		this.controlsEl.setStyle('width', this.mochaControlsWidth);
/* 1752 */ 		if (options.useCanvasControls == true){
/* 1753 */ 			this.canvasControlsEl.setProperty('width', this.mochaControlsWidth);
/* 1754 */ 		}
/* 1755 */ 	}
/* 1756 */ });
/* 1757 */ MochaUI.Window.implement(new Options, new Events);
/* 1758 */ 
