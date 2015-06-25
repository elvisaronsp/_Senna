
/* datepicker.js */

/* 1    */ /**
/* 2    *|  * Copyright (c) 2008 Kelvin Luck (http://www.kelvinluck.com/)
/* 3    *|  * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
/* 4    *|  * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
/* 5    *|  * .
/* 6    *|  * $Id: jquery.datePicker.js 108 2011-11-17 21:19:57Z kelvin.luck@gmail.com $
/* 7    *|  * 
/* 8    *|  * 
/* 9    *|  * Documentação em:
/* 10   *|  * http://2008.kelvinluck.com/assets/jquery/datePicker/v2/demo/documentation.html
/* 11   *|  * 
/* 12   *|  * 
/* 13   *|  **/
/* 14   */ 
/* 15   */ (function($){
/* 16   */     
/* 17   */ 	$.fn.extend({
/* 18   */ /**
/* 19   *|  * Render a calendar table into any matched elements.
/* 20   *|  * 
/* 21   *|  * @manual http://2008.kelvinluck.com/assets/jquery/datePicker/v2/demo/
/* 22   *|  * 
/* 23   *|  * @param Object s (optional) Customize your calendars.
/* 24   *|  * @option Number month The month to render (NOTE that months are zero based). Default is today's month.
/* 25   *|  * @option Number year The year to render. Default is today's year.
/* 26   *|  * @option Function renderCallback A reference to a function that is called as each cell is rendered and which can add classes and event listeners to the created nodes. Default is no callback.
/* 27   *|  * @option Number showHeader Whether or not to show the header row, possible values are: $.dpConst.SHOW_HEADER_NONE (no header), $.dpConst.SHOW_HEADER_SHORT (first letter of each day) and $.dpConst.SHOW_HEADER_LONG (full name of each day). Default is $.dpConst.SHOW_HEADER_SHORT.
/* 28   *|  * @option String hoverClass The class to attach to each cell when you hover over it (to allow you to use hover effects in IE6 which doesn't support the :hover pseudo-class on elements other than links). Default is dp-hover. Pass false if you don't want a hover class.
/* 29   *|  * @type jQuery
/* 30   *|  * @name renderCalendar
/* 31   *|  * @cat plugins/datePicker
/* 32   *|  * @author Kelvin Luck (http://www.kelvinluck.com/)
/* 33   *|  *
/* 34   *|  * @example $('#calendar-me').renderCalendar({month:0, year:2007});
/* 35   *|  * @desc Renders a calendar displaying January 2007 into the element with an id of calendar-me.
/* 36   *|  *
/* 37   *|  * @example
/* 38   *|  * var testCallback = function($td, thisDate, month, year)
/* 39   *|  * {
/* 40   *|  * if ($td.is('.current-month') && thisDate.getDay() == 4) {
/* 41   *|  *		var d = thisDate.getDate();
/* 42   *|  *		$td.bind(
/* 43   *|  *			'click',
/* 44   *|  *			function()
/* 45   *|  *			{
/* 46   *|  *				alert('You clicked on ' + d + '/' + (Number(month)+1) + '/' + year);
/* 47   *|  *			}
/* 48   *|  *		).addClass('thursday');
/* 49   *|  *	} else if (thisDate.getDay() == 5) {
/* 50   *|  *		$td.html('Friday the ' + $td.html() + 'th');

/* datepicker.js */

/* 51   *|  *	}
/* 52   *|  * }
/* 53   *|  * $('#calendar-me').renderCalendar({month:0, year:2007, renderCallback:testCallback});
/* 54   *|  * 
/* 55   *|  * @desc Renders a calendar displaying January 2007 into the element with an id of calendar-me. Every Thursday in the current month has a class of "thursday" applied to it, is clickable and shows an alert when clicked. Every Friday on the calendar has the number inside replaced with text.
/* 56   *|  **/
/* 57   */ 		renderCalendar  :   function(s)
/* 58   */ 		{
/* 59   */ 			var dc = function(a)
/* 60   */ 			{
/* 61   */ 				return document.createElement(a);
/* 62   */ 			};
/* 63   */ 
/* 64   */ 			s = $.extend({}, $.fn.datePicker.defaults, s);
/* 65   */ 			
/* 66   */ 			if (s.showHeader != $.dpConst.SHOW_HEADER_NONE) {
/* 67   */ 				var headRow = $(dc('tr'));
/* 68   */ 				for (var i=Date.firstDayOfWeek; i<Date.firstDayOfWeek+7; i++) {
/* 69   */ 					var weekday = i%7;
/* 70   */ 					var day = Date.dayNames[weekday];
/* 71   */ 					headRow.append(
/* 72   */ 						jQuery(dc('th')).attr({'scope':'col', 'abbr':day, 'title':day, 'class':(weekday == 0 || weekday == 6 ? 'weekend' : 'weekday')}).html(s.showHeader == $.dpConst.SHOW_HEADER_SHORT ? day.substr(0, 1) : day)
/* 73   */ 					);
/* 74   */ 				}
/* 75   */ 			};
/* 76   */ 			
/* 77   */ 			var calendarTable = $(dc('table'))
/* 78   */ 									.attr(
/* 79   */ 										{
/* 80   */ 											'cellspacing':2
/* 81   */ 										}
/* 82   */ 									)
/* 83   */ 									.addClass('jCalendar')
/* 84   */ 									.append(
/* 85   */ 										(s.showHeader != $.dpConst.SHOW_HEADER_NONE ? 
/* 86   */ 											$(dc('thead'))
/* 87   */ 												.append(headRow)
/* 88   */ 											:
/* 89   */ 											dc('thead')
/* 90   */ 										)
/* 91   */ 									);
/* 92   */ 			var tbody = $(dc('tbody'));
/* 93   */ 			
/* 94   */ 			var today = (new Date()).zeroTime();
/* 95   */ 			today.setHours(12);
/* 96   */ 			
/* 97   */ 			var month = s.month == undefined ? today.getMonth() : s.month;
/* 98   */ 			var year = s.year || today.getFullYear();
/* 99   */ 			
/* 100  */ 			var currentDate = (new Date(year, month, 1, 12, 0, 0));

/* datepicker.js */

/* 101  */ 			
/* 102  */ 			
/* 103  */ 			var firstDayOffset = Date.firstDayOfWeek - currentDate.getDay() + 1;
/* 104  */ 			if (firstDayOffset > 1) firstDayOffset -= 7;
/* 105  */ 			var weeksToDraw = Math.ceil(( (-1*firstDayOffset+1) + currentDate.getDaysInMonth() ) /7);
/* 106  */ 			currentDate.addDays(firstDayOffset-1);
/* 107  */ 			
/* 108  */ 			var doHover = function(firstDayInBounds)
/* 109  */ 			{
/* 110  */ 				return function()
/* 111  */ 				{
/* 112  */ 					if (s.hoverClass) {
/* 113  */ 						var $this = $(this);
/* 114  */ 						if (!s.selectWeek) {
/* 115  */ 							$this.addClass(s.hoverClass);
/* 116  */ 						} else if (firstDayInBounds && !$this.is('.disabled')) {
/* 117  */ 							$this.parent().addClass('activeWeekHover');
/* 118  */ 						}
/* 119  */ 					}
/* 120  */ 				}
/* 121  */ 			};
/* 122  */ 			var unHover = function()
/* 123  */ 			{
/* 124  */ 				if (s.hoverClass) {
/* 125  */ 					var $this = $(this);
/* 126  */ 					$this.removeClass(s.hoverClass);
/* 127  */ 					$this.parent().removeClass('activeWeekHover');
/* 128  */ 				}
/* 129  */ 			};
/* 130  */ 
/* 131  */ 			var w = 0;
/* 132  */ 			while (w++<weeksToDraw) {
/* 133  */ 				var r = jQuery(dc('tr'));
/* 134  */ 				var firstDayInBounds = s.dpController ? currentDate > s.dpController.startDate : false;
/* 135  */ 				for (var i=0; i<7; i++) {
/* 136  */ 					var thisMonth = currentDate.getMonth() == month;
/* 137  */ 					var d = $(dc('td'))
/* 138  */ 								.text(currentDate.getDate() + '')
/* 139  */ 								.addClass((thisMonth ? 'current-month ' : 'other-month ') +
/* 140  */ 													(currentDate.isWeekend() ? 'weekend ' : 'weekday ') +
/* 141  */ 													(thisMonth && currentDate.getTime() == today.getTime() ? 'today ' : '')
/* 142  */ 								)
/* 143  */ 								.data('datePickerDate', currentDate.asString())
/* 144  */ 								.hover(doHover(firstDayInBounds), unHover)
/* 145  */ 							;
/* 146  */ 					r.append(d);
/* 147  */ 					if (s.renderCallback) {
/* 148  */ 						s.renderCallback(d, currentDate, month, year);
/* 149  */ 					}
/* 150  */ 					// addDays(1) fails in some locales due to daylight savings. See issue 39.

/* datepicker.js */

/* 151  */ 					//currentDate.addDays(1);
/* 152  */ 					// set the time to midday to avoid any weird timezone issues??
/* 153  */ 					currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1, 12, 0, 0);
/* 154  */ 				}
/* 155  */ 				tbody.append(r);
/* 156  */ 			}
/* 157  */ 			calendarTable.append(tbody);
/* 158  */ 			
/* 159  */ 			return this.each(
/* 160  */ 				function()
/* 161  */ 				{
/* 162  */ 					$(this).empty().append(calendarTable);
/* 163  */ 				}
/* 164  */ 			);
/* 165  */ 		},
/* 166  */ /**
/* 167  *|  * Create a datePicker associated with each of the matched elements.
/* 168  *|  *
/* 169  *|  * The matched element will receive a few custom events with the following signatures:
/* 170  *|  *
/* 171  *|  * dateSelected(event, date, $td, status)
/* 172  *|  * Triggered when a date is selected. event is a reference to the event, date is the Date selected, $td is a jquery object wrapped around the TD that was clicked on and status is whether the date was selected (true) or deselected (false)
/* 173  *|  * 
/* 174  *|  * dpClosed(event, selected)
/* 175  *|  * Triggered when the date picker is closed. event is a reference to the event and selected is an Array containing Date objects.
/* 176  *|  *
/* 177  *|  * dpMonthChanged(event, displayedMonth, displayedYear)
/* 178  *|  * Triggered when the month of the popped up calendar is changed. event is a reference to the event, displayedMonth is the number of the month now displayed (zero based) and displayedYear is the year of the month.
/* 179  *|  *
/* 180  *|  * dpDisplayed(event, $datePickerDiv)
/* 181  *|  * Triggered when the date picker is created. $datePickerDiv is the div containing the date picker. Use this event to add custom content/ listeners to the popped up date picker.
/* 182  *|  *
/* 183  *|  * @param Object s (optional) Customize your date pickers.
/* 184  *|  * @option Number month The month to render when the date picker is opened (NOTE that months are zero based). Default is today's month.
/* 185  *|  * @option Number year The year to render when the date picker is opened. Default is today's year.
/* 186  *|  * @option String|Date startDate The first date date can be selected.
/* 187  *|  * @option String|Date endDate The last date that can be selected.
/* 188  *|  * @option Boolean inline Whether to create the datePicker as inline (e.g. always on the page) or as a model popup. Default is false (== modal popup)
/* 189  *|  * @option Boolean createButton Whether to create a .dp-choose-date anchor directly after the matched element which when clicked will trigger the showing of the date picker. Default is true.
/* 190  *|  * @option Boolean showYearNavigation Whether to display buttons which allow the user to navigate through the months a year at a time. Default is true.
/* 191  *|  * @option Boolean closeOnSelect Whether to close the date picker when a date is selected. Default is true.
/* 192  *|  * @option Boolean displayClose Whether to create a "Close" button within the date picker popup. Default is false.
/* 193  *|  * @option Boolean selectMultiple Whether a user should be able to select multiple dates with this date picker. Default is false.
/* 194  *|  * @option Number numSelectable The maximum number of dates that can be selected where selectMultiple is true. Default is a very high number.
/* 195  *|  * @option Boolean clickInput If the matched element is an input type="text" and this option is true then clicking on the input will cause the date picker to appear.
/* 196  *|  * @option Boolean rememberViewedMonth Whether the datePicker should remember the last viewed month and open on it. If false then the date picker will always open with the month for the first selected date visible.
/* 197  *|  * @option Boolean selectWeek Whether to select a complete week at a time...
/* 198  *|  * @option Number verticalPosition The vertical alignment of the popped up date picker to the matched element. One of $.dpConst.POS_TOP and $.dpConst.POS_BOTTOM. Default is $.dpConst.POS_TOP.
/* 199  *|  * @option Number horizontalPosition The horizontal alignment of the popped up date picker to the matched element. One of $.dpConst.POS_LEFT and $.dpConst.POS_RIGHT.
/* 200  *|  * @option Number verticalOffset The number of pixels offset from the defined verticalPosition of this date picker that it should pop up in. Default in 0.

/* datepicker.js */

/* 201  *|  * @option Number horizontalOffset The number of pixels offset from the defined horizontalPosition of this date picker that it should pop up in. Default in 0.
/* 202  *|  * @option (Function|Array) renderCallback A reference to a function (or an array of separate functions) that is called as each cell is rendered and which can add classes and event listeners to the created nodes. Each callback function will receive four arguments; a jquery object wrapping the created TD, a Date object containing the date this TD represents, a number giving the currently rendered month and a number giving the currently rendered year. Default is no callback.
/* 203  *|  * @option String hoverClass The class to attach to each cell when you hover over it (to allow you to use hover effects in IE6 which doesn't support the :hover pseudo-class on elements other than links). Default is dp-hover. Pass false if you don't want a hover class.
/* 204  *|  * @option String autoFocusNextInput Whether focus should be passed onto the next input in the form (true) or remain on this input (false) when a date is selected and the calendar closes
/* 205  *|  * @type jQuery
/* 206  *|  * @name datePicker
/* 207  *|  * @cat plugins/datePicker
/* 208  *|  * @author Kelvin Luck (http://www.kelvinluck.com/)
/* 209  *|  *
/* 210  *|  * @example $('input.date-picker').datePicker();
/* 211  *|  * @desc Creates a date picker button next to all matched input elements. When the button is clicked on the value of the selected date will be placed in the corresponding input (formatted according to Date.format).
/* 212  *|  *
/* 213  *|  * @example demo/index.html
/* 214  *|  * @desc See the projects homepage for many more complex examples...
/* 215  *|  **/
/* 216  */ 		datePicker : function(s)
/* 217  */ 		{			
/* 218  */ 			if (!$.event._dpCache) $.event._dpCache = [];
/* 219  */ 			
/* 220  */ 			// initialise the date picker controller with the relevant settings...
/* 221  */ 			s = $.extend({}, $.fn.datePicker.defaults, s);
/* 222  */ 			
/* 223  */ 			return this.each(
/* 224  */ 				function()
/* 225  */ 				{
/* 226  */ 					var $this = $(this);
/* 227  */ 					var alreadyExists = true;
/* 228  */ 					
/* 229  */ 					if (!this._dpId) {
/* 230  */ 						this._dpId = $.guid++;
/* 231  */ 						$.event._dpCache[this._dpId] = new DatePicker(this);
/* 232  */ 						alreadyExists = false;
/* 233  */ 					}
/* 234  */ 					
/* 235  */ 					if (s.inline) {
/* 236  */ 						s.createButton = false;
/* 237  */ 						s.displayClose = false;
/* 238  */ 						s.closeOnSelect = false;
/* 239  */ 						$this.empty();
/* 240  */ 					}
/* 241  */ 					
/* 242  */ 					var controller = $.event._dpCache[this._dpId];
/* 243  */ 					
/* 244  */ 					controller.init(s);
/* 245  */ 					
/* 246  */ 					if (!alreadyExists && s.createButton) {
/* 247  */ 						// create it!
/* 248  */ 						controller.button = $('<a href="#" class="dp-choose-date" title="' + $.dpText.TEXT_CHOOSE_DATE + '"></a>')
/* 249  */ 								.bind(
/* 250  */ 									'click',

/* datepicker.js */

/* 251  */ 									function()
/* 252  */ 									{
/* 253  */ 										$this.dpDisplay(this);
/* 254  */ 										this.blur();
/* 255  */ 										return false;
/* 256  */ 									}
/* 257  */ 								);
/* 258  */ 						$this.after(controller.button);
/* 259  */ 					}
/* 260  */ 					
/* 261  */ 					if (!alreadyExists && $this.is(':text')) {
/* 262  */ 						$this
/* 263  */ 							.bind(
/* 264  */ 								'dateSelected',
/* 265  */ 								function(e, selectedDate, $td)
/* 266  */ 								{
/* 267  */ 									this.value = selectedDate.asString();
/* 268  */ 								}
/* 269  */ 							).bind(
/* 270  */ 								'change',
/* 271  */ 								function()
/* 272  */ 								{
/* 273  */ 									if (this.value == '') {
/* 274  */ 										controller.clearSelected();
/* 275  */ 									} else {
/* 276  */ 										var d = Date.fromString(this.value);
/* 277  */ 										if (d) {
/* 278  */ 											controller.setSelected(d, true, true);
/* 279  */ 										}
/* 280  */ 									}
/* 281  */ 								}
/* 282  */ 							);
/* 283  */ 						if (s.clickInput) {
/* 284  */ 							$this.bind(
/* 285  */ 								'click',
/* 286  */ 								function()
/* 287  */ 								{
/* 288  */ 									// The change event doesn't happen until the input loses focus so we need to manually trigger it...
/* 289  */ 									$this.trigger('change');
/* 290  */ 									$this.dpDisplay();
/* 291  */ 								}
/* 292  */ 							);
/* 293  */ 						}
/* 294  */ 						var d = Date.fromString(this.value);
/* 295  */ 						if (this.value != '' && d) {
/* 296  */ 							controller.setSelected(d, true, true);
/* 297  */ 						}
/* 298  */ 					}
/* 299  */ 					
/* 300  */ 					$this.addClass('dp-applied');

/* datepicker.js */

/* 301  */ 					
/* 302  */ 				}
/* 303  */ 			)
/* 304  */ 		},
/* 305  */ /**
/* 306  *|  * Disables or enables this date picker
/* 307  *|  *
/* 308  *|  * @param Boolean s Whether to disable (true) or enable (false) this datePicker
/* 309  *|  * @type jQuery
/* 310  *|  * @name dpSetDisabled
/* 311  *|  * @cat plugins/datePicker
/* 312  *|  * @author Kelvin Luck (http://www.kelvinluck.com/)
/* 313  *|  *
/* 314  *|  * @example $('.date-picker').datePicker();
/* 315  *|  * $('.date-picker').dpSetDisabled(true);
/* 316  *|  * @desc Prevents this date picker from displaying and adds a class of dp-disabled to it (and it's associated button if it has one) for styling purposes. If the matched element is an input field then it will also set the disabled attribute to stop people directly editing the field.
/* 317  *|  **/
/* 318  */ 		dpSetDisabled : function(s)
/* 319  */ 		{
/* 320  */ 			return _w.call(this, 'setDisabled', s);
/* 321  */ 		},
/* 322  */ /**
/* 323  *|  * Updates the first selectable date for any date pickers on any matched elements.
/* 324  *|  *
/* 325  *|  * @param String|Date d A Date object or string representing the first selectable date (formatted according to Date.format).
/* 326  *|  * @type jQuery
/* 327  *|  * @name dpSetStartDate
/* 328  *|  * @cat plugins/datePicker
/* 329  *|  * @author Kelvin Luck (http://www.kelvinluck.com/)
/* 330  *|  *
/* 331  *|  * @example $('.date-picker').datePicker();
/* 332  *|  * $('.date-picker').dpSetStartDate('01/01/2000');
/* 333  *|  * @desc Creates a date picker associated with all elements with a class of "date-picker" then sets the first selectable date for each of these to the first day of the millenium.
/* 334  *|  **/
/* 335  */ 		dpSetStartDate : function(d)
/* 336  */ 		{
/* 337  */ 			return _w.call(this, 'setStartDate', d);
/* 338  */ 		},
/* 339  */ /**
/* 340  *|  * Updates the last selectable date for any date pickers on any matched elements.
/* 341  *|  *
/* 342  *|  * @param String|Date d A Date object or string representing the last selectable date (formatted according to Date.format).
/* 343  *|  * @type jQuery
/* 344  *|  * @name dpSetEndDate
/* 345  *|  * @cat plugins/datePicker
/* 346  *|  * @author Kelvin Luck (http://www.kelvinluck.com/)
/* 347  *|  *
/* 348  *|  * @example $('.date-picker').datePicker();
/* 349  *|  * $('.date-picker').dpSetEndDate('01/01/2010');
/* 350  *|  * @desc Creates a date picker associated with all elements with a class of "date-picker" then sets the last selectable date for each of these to the first Janurary 2010.

/* datepicker.js */

/* 351  *|  **/
/* 352  */ 		dpSetEndDate : function(d)
/* 353  */ 		{
/* 354  */ 			return _w.call(this, 'setEndDate', d);
/* 355  */ 		},
/* 356  */ /**
/* 357  *|  * Gets a list of Dates currently selected by this datePicker. This will be an empty array if no dates are currently selected or NULL if there is no datePicker associated with the matched element.
/* 358  *|  *
/* 359  *|  * @type Array
/* 360  *|  * @name dpGetSelected
/* 361  *|  * @cat plugins/datePicker
/* 362  *|  * @author Kelvin Luck (http://www.kelvinluck.com/)
/* 363  *|  *
/* 364  *|  * @example $('.date-picker').datePicker();
/* 365  *|  * alert($('.date-picker').dpGetSelected());
/* 366  *|  * @desc Will alert an empty array (as nothing is selected yet)
/* 367  *|  **/
/* 368  */ 		dpGetSelected : function()
/* 369  */ 		{
/* 370  */ 			var c = _getController(this[0]);
/* 371  */ 			if (c) {
/* 372  */ 				return c.getSelected();
/* 373  */ 			}
/* 374  */ 			return null;
/* 375  */ 		},
/* 376  */ /**
/* 377  *|  * Selects or deselects a date on any matched element's date pickers. Deselcting is only useful on date pickers where selectMultiple==true. Selecting will only work if the passed date is within the startDate and endDate boundries for a given date picker.
/* 378  *|  *
/* 379  *|  * @param String|Date d A Date object or string representing the date you want to select (formatted according to Date.format).
/* 380  *|  * @param Boolean v Whether you want to select (true) or deselect (false) this date. Optional - default = true.
/* 381  *|  * @param Boolean m Whether you want the date picker to open up on the month of this date when it is next opened. Optional - default = true.
/* 382  *|  * @param Boolean e Whether you want the date picker to dispatch events related to this change of selection. Optional - default = true.
/* 383  *|  * @type jQuery
/* 384  *|  * @name dpSetSelected
/* 385  *|  * @cat plugins/datePicker
/* 386  *|  * @author Kelvin Luck (http://www.kelvinluck.com/)
/* 387  *|  *
/* 388  *|  * @example $('.date-picker').datePicker();
/* 389  *|  * $('.date-picker').dpSetSelected('01/01/2010');
/* 390  *|  * @desc Creates a date picker associated with all elements with a class of "date-picker" then sets the selected date on these date pickers to the first Janurary 2010. When the date picker is next opened it will display Janurary 2010.
/* 391  *|  **/
/* 392  */ 		dpSetSelected : function(d, v, m, e)
/* 393  */ 		{
/* 394  */ 			if (v == undefined) v=true;
/* 395  */ 			if (m == undefined) m=true;
/* 396  */ 			if (e == undefined) e=true;
/* 397  */ 			return _w.call(this, 'setSelected', Date.fromString(d), v, m, e);
/* 398  */ 		},
/* 399  */ /**
/* 400  *|  * Sets the month that will be displayed when the date picker is next opened. If the passed month is before startDate then the month containing startDate will be displayed instead. If the passed month is after endDate then the month containing the endDate will be displayed instead.

/* datepicker.js */

/* 401  *|  *
/* 402  *|  * @param Number m The month you want the date picker to display. Optional - defaults to the currently displayed month.
/* 403  *|  * @param Number y The year you want the date picker to display. Optional - defaults to the currently displayed year.
/* 404  *|  * @type jQuery
/* 405  *|  * @name dpSetDisplayedMonth
/* 406  *|  * @cat plugins/datePicker
/* 407  *|  * @author Kelvin Luck (http://www.kelvinluck.com/)
/* 408  *|  *
/* 409  *|  * @example $('.date-picker').datePicker();
/* 410  *|  * $('.date-picker').dpSetDisplayedMonth(10, 2008);
/* 411  *|  * @desc Creates a date picker associated with all elements with a class of "date-picker" then sets the selected date on these date pickers to the first Janurary 2010. When the date picker is next opened it will display Janurary 2010.
/* 412  *|  **/
/* 413  */ 		dpSetDisplayedMonth : function(m, y)
/* 414  */ 		{
/* 415  */ 			return _w.call(this, 'setDisplayedMonth', Number(m), Number(y), true);
/* 416  */ 		},
/* 417  */ /**
/* 418  *|  * Displays the date picker associated with the matched elements. Since only one date picker can be displayed at once then the date picker associated with the last matched element will be the one that is displayed.
/* 419  *|  *
/* 420  *|  * @param HTMLElement e An element that you want the date picker to pop up relative in position to. Optional - default behaviour is to pop up next to the element associated with this date picker.
/* 421  *|  * @type jQuery
/* 422  *|  * @name dpDisplay
/* 423  *|  * @cat plugins/datePicker
/* 424  *|  * @author Kelvin Luck (http://www.kelvinluck.com/)
/* 425  *|  *
/* 426  *|  * @example $('#date-picker').datePicker();
/* 427  *|  * $('#date-picker').dpDisplay();
/* 428  *|  * @desc Creates a date picker associated with the element with an id of date-picker and then causes it to pop up.
/* 429  *|  **/
/* 430  */ 		dpDisplay : function(e)
/* 431  */ 		{
/* 432  */ 			return _w.call(this, 'display', e);
/* 433  */ 		},
/* 434  */ /**
/* 435  *|  * Sets a function or array of functions that is called when each TD of the date picker popup is rendered to the page
/* 436  *|  *
/* 437  *|  * @param (Function|Array) a A function or an array of functions that are called when each td is rendered. Each function will receive four arguments; a jquery object wrapping the created TD, a Date object containing the date this TD represents, a number giving the currently rendered month and a number giving the currently rendered year.
/* 438  *|  * @type jQuery
/* 439  *|  * @name dpSetRenderCallback
/* 440  *|  * @cat plugins/datePicker
/* 441  *|  * @author Kelvin Luck (http://www.kelvinluck.com/)
/* 442  *|  *
/* 443  *|  * @example $('#date-picker').datePicker();
/* 444  *|  * $('#date-picker').dpSetRenderCallback(function($td, thisDate, month, year)
/* 445  *|  * {
/* 446  *|  * 	// do stuff as each td is rendered dependant on the date in the td and the displayed month and year
/* 447  *|  * });
/* 448  *|  * @desc Creates a date picker associated with the element with an id of date-picker and then creates a function which is called as each td is rendered when this date picker is displayed.
/* 449  *|  **/
/* 450  */ 		dpSetRenderCallback : function(a)

/* datepicker.js */

/* 451  */ 		{
/* 452  */ 			return _w.call(this, 'setRenderCallback', a);
/* 453  */ 		},
/* 454  */ /**
/* 455  *|  * Sets the position that the datePicker will pop up (relative to it's associated element)
/* 456  *|  *
/* 457  *|  * @param Number v The vertical alignment of the created date picker to it's associated element. Possible values are $.dpConst.POS_TOP and $.dpConst.POS_BOTTOM
/* 458  *|  * @param Number h The horizontal alignment of the created date picker to it's associated element. Possible values are $.dpConst.POS_LEFT and $.dpConst.POS_RIGHT
/* 459  *|  * @type jQuery
/* 460  *|  * @name dpSetPosition
/* 461  *|  * @cat plugins/datePicker
/* 462  *|  * @author Kelvin Luck (http://www.kelvinluck.com/)
/* 463  *|  *
/* 464  *|  * @example $('#date-picker').datePicker();
/* 465  *|  * $('#date-picker').dpSetPosition($.dpConst.POS_BOTTOM, $.dpConst.POS_RIGHT);
/* 466  *|  * @desc Creates a date picker associated with the element with an id of date-picker and makes it so that when this date picker pops up it will be bottom and right aligned to the #date-picker element.
/* 467  *|  **/
/* 468  */ 		dpSetPosition : function(v, h)
/* 469  */ 		{
/* 470  */ 			return _w.call(this, 'setPosition', v, h);
/* 471  */ 		},
/* 472  */ /**
/* 473  *|  * Sets the offset that the popped up date picker will have from it's default position relative to it's associated element (as set by dpSetPosition)
/* 474  *|  *
/* 475  *|  * @param Number v The vertical offset of the created date picker.
/* 476  *|  * @param Number h The horizontal offset of the created date picker.
/* 477  *|  * @type jQuery
/* 478  *|  * @name dpSetOffset
/* 479  *|  * @cat plugins/datePicker
/* 480  *|  * @author Kelvin Luck (http://www.kelvinluck.com/)
/* 481  *|  *
/* 482  *|  * @example $('#date-picker').datePicker();
/* 483  *|  * $('#date-picker').dpSetOffset(-20, 200);
/* 484  *|  * @desc Creates a date picker associated with the element with an id of date-picker and makes it so that when this date picker pops up it will be 20 pixels above and 200 pixels to the right of it's default position.
/* 485  *|  **/
/* 486  */ 		dpSetOffset : function(v, h)
/* 487  */ 		{
/* 488  */ 			return _w.call(this, 'setOffset', v, h);
/* 489  */ 		},
/* 490  */ /**
/* 491  *|  * Closes the open date picker associated with this element.
/* 492  *|  *
/* 493  *|  * @type jQuery
/* 494  *|  * @name dpClose
/* 495  *|  * @cat plugins/datePicker
/* 496  *|  * @author Kelvin Luck (http://www.kelvinluck.com/)
/* 497  *|  *
/* 498  *|  * @example $('.date-pick')
/* 499  *|  *		.datePicker()
/* 500  *|  *		.bind(

/* datepicker.js */

/* 501  *|  *			'focus',
/* 502  *|  *			function()
/* 503  *|  *			{
/* 504  *|  *				$(this).dpDisplay();
/* 505  *|  *			}
/* 506  *|  *		).bind(
/* 507  *|  *			'blur',
/* 508  *|  *			function()
/* 509  *|  *			{
/* 510  *|  *				$(this).dpClose();
/* 511  *|  *			}
/* 512  *|  *		);
/* 513  *|  **/
/* 514  */ 		dpClose : function()
/* 515  */ 		{
/* 516  */ 			return _w.call(this, '_closeCalendar', false, this[0]);
/* 517  */ 		},
/* 518  */ 
/* 519  */ /**
/* 520  *|  * Limpa a Seleção
/* 521  *|  */		
/* 522  */ 		dpClear : function()
/* 523  */ 		{
/* 524  */ 			return _w.call(this, 'clearSelected');
/* 525  */ 		},
/* 526  */ /**
/* 527  *|  * Rerenders the date picker's current month (for use with inline calendars and renderCallbacks).
/* 528  *|  *
/* 529  *|  * @type jQuery
/* 530  *|  * @name dpRerenderCalendar
/* 531  *|  * @cat plugins/datePicker
/* 532  *|  * @author Kelvin Luck (http://www.kelvinluck.com/)
/* 533  *|  *
/* 534  *|  **/
/* 535  */ 		dpRerenderCalendar : function()
/* 536  */ 		{
/* 537  */ 			return _w.call(this, '_rerenderCalendar');
/* 538  */ 		},
/* 539  */ 		// private function called on unload to clean up any expandos etc and prevent memory links...
/* 540  */ 		_dpDestroy : function()
/* 541  */ 		{
/* 542  */ 			// TODO - implement this?
/* 543  */ 		}
/* 544  */ 	});
/* 545  */ 	
/* 546  */ 	// private internal function to cut down on the amount of code needed where we forward
/* 547  */ 	// dp* methods on the jQuery object on to the relevant DatePicker controllers...
/* 548  */ 	var _w = function(f, a1, a2, a3, a4)
/* 549  */ 	{
/* 550  */ 		return this.each(

/* datepicker.js */

/* 551  */ 			function()
/* 552  */ 			{
/* 553  */ 				var c = _getController(this);
/* 554  */ 				if (c) {
/* 555  */ 					c[f](a1, a2, a3, a4);
/* 556  */ 				}
/* 557  */ 			}
/* 558  */ 		);
/* 559  */ 	};
/* 560  */ 	
/* 561  */ 	function DatePicker(ele)
/* 562  */ 	{
/* 563  */ 		this.ele = ele;
/* 564  */ 		
/* 565  */ 		// initial values...
/* 566  */ 		this.displayedMonth		=	null;
/* 567  */ 		this.displayedYear		=	null;
/* 568  */ 		this.startDate			=	null;
/* 569  */ 		this.endDate			=	null;
/* 570  */ 		this.showYearNavigation	=	null;
/* 571  */ 		this.closeOnSelect		=	null;
/* 572  */ 		this.displayClose		=	null;
/* 573  */ 		this.rememberViewedMonth=	null;
/* 574  */ 		this.selectMultiple		=	null;
/* 575  */ 		this.numSelectable		=	null;
/* 576  */ 		this.numSelected		=	null;
/* 577  */ 		this.verticalPosition	=	null;
/* 578  */ 		this.horizontalPosition	=	null;
/* 579  */ 		this.verticalOffset		=	null;
/* 580  */ 		this.horizontalOffset	=	null;
/* 581  */ 		this.button				=	null;
/* 582  */ 		this.renderCallback		=	[];
/* 583  */ 		this.selectedDates		=	{};
/* 584  */ 		this.inline				=	null;
/* 585  */ 		this.context			=	'#dp-popup';
/* 586  */ 		this.settings			=	{};
/* 587  */ 	};
/* 588  */ 	$.extend(
/* 589  */ 		DatePicker.prototype,
/* 590  */ 		{	
/* 591  */ 			init : function(s)
/* 592  */ 			{
/* 593  */ 				this.setStartDate(s.startDate);
/* 594  */ 				this.setEndDate(s.endDate);
/* 595  */ 				this.setDisplayedMonth(Number(s.month), Number(s.year));
/* 596  */ 				this.setRenderCallback(s.renderCallback);
/* 597  */ 				this.showYearNavigation = s.showYearNavigation;
/* 598  */ 				this.closeOnSelect = s.closeOnSelect;
/* 599  */ 				this.displayClose = s.displayClose;
/* 600  */ 				this.rememberViewedMonth =	s.rememberViewedMonth;

/* datepicker.js */

/* 601  */ 				this.selectMultiple = s.selectMultiple;
/* 602  */ 				this.numSelectable = s.selectMultiple ? s.numSelectable : 1;
/* 603  */ 				this.numSelected = 0;
/* 604  */ 				this.verticalPosition = s.verticalPosition;
/* 605  */ 				this.horizontalPosition = s.horizontalPosition;
/* 606  */ 				this.hoverClass = s.hoverClass;
/* 607  */ 				this.setOffset(s.verticalOffset, s.horizontalOffset);
/* 608  */ 				this.inline = s.inline;
/* 609  */ 				this.settings = s;
/* 610  */ 				if (this.inline) {
/* 611  */ 					this.context = this.ele;
/* 612  */ 					this.display();
/* 613  */ 				}
/* 614  */ 			},
/* 615  */ 			setStartDate : function(d)
/* 616  */ 			{
/* 617  */ 				if (d) {
/* 618  */ 					if (d instanceof Date) {
/* 619  */ 						this.startDate = d;
/* 620  */ 					} else {
/* 621  */ 						this.startDate = Date.fromString(d);
/* 622  */ 					}
/* 623  */ 				}
/* 624  */ 				if (!this.startDate) {
/* 625  */ 					this.startDate = (new Date()).zeroTime();
/* 626  */ 				}
/* 627  */ 				this.setDisplayedMonth(this.displayedMonth, this.displayedYear);
/* 628  */ 			},
/* 629  */ 			setEndDate : function(d)
/* 630  */ 			{
/* 631  */ 				if (d) {
/* 632  */ 					if (d instanceof Date) {
/* 633  */ 						this.endDate = d;
/* 634  */ 					} else {
/* 635  */ 						this.endDate = Date.fromString(d);
/* 636  */ 					}
/* 637  */ 				}
/* 638  */ 				if (!this.endDate) {
/* 639  */ 					this.endDate = (new Date('12/31/2999')); // using the JS Date.parse function which expects mm/dd/yyyy
/* 640  */ 				}
/* 641  */ 				if (this.endDate.getTime() < this.startDate.getTime()) {
/* 642  */ 					this.endDate = this.startDate;
/* 643  */ 				}
/* 644  */ 				this.setDisplayedMonth(this.displayedMonth, this.displayedYear);
/* 645  */ 			},
/* 646  */ 			setPosition : function(v, h)
/* 647  */ 			{
/* 648  */ 				this.verticalPosition = v;
/* 649  */ 				this.horizontalPosition = h;
/* 650  */ 			},

/* datepicker.js */

/* 651  */ 			setOffset : function(v, h)
/* 652  */ 			{
/* 653  */ 				this.verticalOffset = parseInt(v) || 0;
/* 654  */ 				this.horizontalOffset = parseInt(h) || 0;
/* 655  */ 			},
/* 656  */ 			setDisabled : function(s)
/* 657  */ 			{
/* 658  */ 				$e = $(this.ele);
/* 659  */ 				$e[s ? 'addClass' : 'removeClass']('dp-disabled');
/* 660  */ 				if (this.button) {
/* 661  */ 					$but = $(this.button);
/* 662  */ 					$but[s ? 'addClass' : 'removeClass']('dp-disabled');
/* 663  */ 					$but.attr('title', s ? '' : $.dpText.TEXT_CHOOSE_DATE);
/* 664  */ 				}
/* 665  */ 				if ($e.is(':text')) {
/* 666  */ 					$e.attr('disabled', s ? 'disabled' : '');
/* 667  */ 				}
/* 668  */ 			},
/* 669  */ 			setDisplayedMonth : function(m, y, rerender)
/* 670  */ 			{
/* 671  */ 				if (this.startDate == undefined || this.endDate == undefined) {
/* 672  */ 					return;
/* 673  */ 				}
/* 674  */ 				var s = new Date(this.startDate.getTime());
/* 675  */ 				s.setDate(1);
/* 676  */ 				var e = new Date(this.endDate.getTime());
/* 677  */ 				e.setDate(1);
/* 678  */ 				
/* 679  */ 				var t;
/* 680  */ 				if ((!m && !y) || (isNaN(m) && isNaN(y))) {
/* 681  */ 					// no month or year passed - default to current month
/* 682  */ 					t = new Date().zeroTime();
/* 683  */ 					t.setDate(1);
/* 684  */ 				} else if (isNaN(m)) {
/* 685  */ 					// just year passed in - presume we want the displayedMonth
/* 686  */ 					t = new Date(y, this.displayedMonth, 1);
/* 687  */ 				} else if (isNaN(y)) {
/* 688  */ 					// just month passed in - presume we want the displayedYear
/* 689  */ 					t = new Date(this.displayedYear, m, 1);
/* 690  */ 				} else {
/* 691  */ 					// year and month passed in - that's the date we want!
/* 692  */ 					t = new Date(y, m, 1)
/* 693  */ 				}
/* 694  */ 				// check if the desired date is within the range of our defined startDate and endDate
/* 695  */ 				if (t.getTime() < s.getTime()) {
/* 696  */ 					t = s;
/* 697  */ 				} else if (t.getTime() > e.getTime()) {
/* 698  */ 					t = e;
/* 699  */ 				}
/* 700  */ 				var oldMonth = this.displayedMonth;

/* datepicker.js */

/* 701  */ 				var oldYear = this.displayedYear;
/* 702  */ 				this.displayedMonth = t.getMonth();
/* 703  */ 				this.displayedYear = t.getFullYear();
/* 704  */ 
/* 705  */ 				if (rerender && (this.displayedMonth != oldMonth || this.displayedYear != oldYear))
/* 706  */ 				{
/* 707  */ 					this._rerenderCalendar();
/* 708  */ 					$(this.ele).trigger('dpMonthChanged', [this.displayedMonth, this.displayedYear]);
/* 709  */ 				}
/* 710  */ 			},
/* 711  */ 			setSelected : function(d, v, moveToMonth, dispatchEvents)
/* 712  */ 			{
/* 713  */ 				if (d < this.startDate || d.zeroTime() > this.endDate.zeroTime()) {
/* 714  */ 					// Don't allow people to select dates outside range...
/* 715  */ 					return;
/* 716  */ 				}
/* 717  */ 				var s = this.settings;
/* 718  */ 				if (s.selectWeek)
/* 719  */ 				{
/* 720  */ 					d = d.addDays(- (d.getDay() - Date.firstDayOfWeek + 7) % 7);
/* 721  */ 					if (d < this.startDate) // The first day of this week is before the start date so is unselectable...
/* 722  */ 					{
/* 723  */ 						return;
/* 724  */ 					}
/* 725  */ 				}
/* 726  */ 				if (v == this.isSelected(d)) // this date is already un/selected
/* 727  */ 				{
/* 728  */ 					return;
/* 729  */ 				}
/* 730  */ 				if (this.selectMultiple == false) {
/* 731  */ 					this.clearSelected();
/* 732  */ 				} else if (v && this.numSelected == this.numSelectable) {
/* 733  */ 					// can't select any more dates...
/* 734  */ 					return;
/* 735  */ 				}
/* 736  */ 				if (moveToMonth && (this.displayedMonth != d.getMonth() || this.displayedYear != d.getFullYear())) {
/* 737  */ 					this.setDisplayedMonth(d.getMonth(), d.getFullYear(), true);
/* 738  */ 				}
/* 739  */ 				this.selectedDates[d.asString()] = v;
/* 740  */ 				this.numSelected += v ? 1 : -1;
/* 741  */ 				var selectorString = 'td.' + (d.getMonth() == this.displayedMonth ? 'current-month' : 'other-month');
/* 742  */ 				var $td;
/* 743  */ 				$(selectorString, this.context).each(
/* 744  */ 					function()
/* 745  */ 					{
/* 746  */ 						if ($(this).data('datePickerDate') == d.asString()) {
/* 747  */ 							$td = $(this);
/* 748  */ 							if (s.selectWeek)
/* 749  */ 							{
/* 750  */ 								$td.parent()[v ? 'addClass' : 'removeClass']('selectedWeek');

/* datepicker.js */

/* 751  */ 							}
/* 752  */ 							$td[v ? 'addClass' : 'removeClass']('selected'); 
/* 753  */ 						}
/* 754  */ 					}
/* 755  */ 				);
/* 756  */ 				$('td', this.context).not('.selected')[this.selectMultiple &&  this.numSelected == this.numSelectable ? 'addClass' : 'removeClass']('unselectable');
/* 757  */ 				
/* 758  */ 				if (dispatchEvents)
/* 759  */ 				{
/* 760  */ 					var s = this.isSelected(d);
/* 761  */ 					$e = $(this.ele);
/* 762  */ 					var dClone = Date.fromString(d.asString());
/* 763  */ 					$e.trigger('dateSelected', [dClone, $td, s]);
/* 764  */ 					$e.trigger('change');
/* 765  */ 				}
/* 766  */ 			},
/* 767  */ 			isSelected : function(d)
/* 768  */ 			{
/* 769  */ 				return this.selectedDates[d.asString()];
/* 770  */ 			},
/* 771  */ 			getSelected : function()
/* 772  */ 			{
/* 773  */ 				var r = [];
/* 774  */ 				for(var s in this.selectedDates) {
/* 775  */ 					if (this.selectedDates[s] == true) {
/* 776  */ 						r.push(Date.fromString(s));
/* 777  */ 					}
/* 778  */ 				}
/* 779  */ 				return r;
/* 780  */ 			},
/* 781  */ 			clearSelected : function()
/* 782  */ 			{
/* 783  */ 				this.selectedDates = {};
/* 784  */ 				this.numSelected = 0;
/* 785  */ 				$('td.selected', this.context).removeClass('selected').parent().removeClass('selectedWeek');
/* 786  */ 			},
/* 787  */ 			display : function(eleAlignTo)
/* 788  */ 			{
/* 789  */ 				if ($(this.ele).is('.dp-disabled')) return;
/* 790  */ 				
/* 791  */ 				eleAlignTo = eleAlignTo || this.ele;
/* 792  */ 				var c = this;
/* 793  */ 				var $h = $(document).height();
/* 794  */ 				var $w = $(document).width();
/* 795  */ 				var $ele = $(eleAlignTo);
/* 796  */ 				var eleOffset = $ele.offset();
/* 797  */ 				
/* 798  */ 				var $createIn;
/* 799  */ 				var attrs;
/* 800  */ 				var attrsCalendarHolder;

/* datepicker.js */

/* 801  */ 				var cssRules;
/* 802  */ 				
/* 803  */ 				if (c.inline) {
/* 804  */ 					$createIn = $(this.ele);
/* 805  */ 					attrs = {
/* 806  */ 						'id'		:	'calendar-' + this.ele._dpId,
/* 807  */ 						'class'	:	'dp-popup dp-popup-inline'
/* 808  */ 					};
/* 809  */ 
/* 810  */ 					$('.dp-popup', $createIn).remove();
/* 811  */ 					cssRules = {
/* 812  */ 					};
/* 813  */ 				} else {
/* 814  */ 					$createIn = $('body');
/* 815  */ 					attrs = {
/* 816  */ 						'id'		:	'dp-popup',
/* 817  */ 						'class'	:	'dp-popup'
/* 818  */ 					};
/* 819  */ 					cssRules = {
/* 820  */ 						'top'	:	eleOffset.top + c.verticalOffset,
/* 821  */ 						'left'	:	eleOffset.left + c.horizontalOffset
/* 822  */ 					};
/* 823  */ 					
/* 824  */ 					var _checkMouse = function(e)
/* 825  */ 					{
/* 826  */ 						var el = e.target;
/* 827  */ 						var cal = $('#dp-popup')[0];
/* 828  */ 						
/* 829  */ 						while (true){
/* 830  */ 							if (el == cal) {
/* 831  */ 								return true;
/* 832  */ 							} else if (el == document) {
/* 833  */ 								c._closeCalendar();
/* 834  */ 								return false;
/* 835  */ 							} else {
/* 836  */ 								el = $(el).parent()[0];
/* 837  */ 							}
/* 838  */ 						}
/* 839  */ 					};
/* 840  */ 					this._checkMouse = _checkMouse;
/* 841  */ 					
/* 842  */ 					c._closeCalendar(true);
/* 843  */ 					$(document).bind(
/* 844  */ 						'keydown.datepicker', 
/* 845  */ 						function(event)
/* 846  */ 						{
/* 847  */ 							if (event.keyCode == 27) {
/* 848  */ 								c._closeCalendar();
/* 849  */ 							}
/* 850  */ 						}

/* datepicker.js */

/* 851  */ 					);
/* 852  */ 				}
/* 853  */ 				
/* 854  */ 				if (!c.rememberViewedMonth)
/* 855  */ 				{
/* 856  */ 					var selectedDate = this.getSelected()[0];
/* 857  */ 					if (selectedDate) {
/* 858  */ 						selectedDate = new Date(selectedDate);
/* 859  */ 						this.setDisplayedMonth(selectedDate.getMonth(), selectedDate.getFullYear(), false);
/* 860  */ 					}
/* 861  */ 				}
/* 862  */ 				
/* 863  */ 				$createIn
/* 864  */ 					.append(
/* 865  */ 						$('<div></div>')
/* 866  */ 							.attr(attrs)
/* 867  */ 							.css(cssRules)
/* 868  */ 							.append(
/* 869  */ //								$('<a href="#" class="selecteee">aaa</a>'),
/* 870  */ 								$('<h2></h2>'),
/* 871  */ 								$('<div class="dp-nav-prev"></div>')
/* 872  */ 									.append(
/* 873  */ 										$('<a class="dp-nav-prev-year" href="#" title="' + $.dpText.TEXT_PREV_YEAR + '">&lt;&lt;</a>')
/* 874  */ 											.bind(
/* 875  */ 												'click',
/* 876  */ 												function()
/* 877  */ 												{
/* 878  */ 													return c._displayNewMonth.call(c, this, 0, -1);
/* 879  */ 												}
/* 880  */ 											),
/* 881  */ 										$('<a class="dp-nav-prev-month" href="#" title="' + $.dpText.TEXT_PREV_MONTH + '">&laquo;</a>')
/* 882  */ 											.bind(
/* 883  */ 												'click',
/* 884  */ 												function()
/* 885  */ 												{
/* 886  */ 													return c._displayNewMonth.call(c, this, -1, 0);
/* 887  */ 												}
/* 888  */ 											)
/* 889  */ 									),
/* 890  */ 								$('<div class="dp-nav-next"></div>')
/* 891  */ 									.append(
/* 892  */ 										$('<a class="dp-nav-next-year" href="#" title="' + $.dpText.TEXT_NEXT_YEAR + '">&gt;&gt;</a>')
/* 893  */ 											.bind(
/* 894  */ 												'click',
/* 895  */ 												function()
/* 896  */ 												{
/* 897  */ 													return c._displayNewMonth.call(c, this, 0, 1);
/* 898  */ 												}
/* 899  */ 											),
/* 900  */ 										$('<a class="dp-nav-next-month" href="#" title="' + $.dpText.TEXT_NEXT_MONTH + '">&raquo;</a>')

/* datepicker.js */

/* 901  */ 											.bind(
/* 902  */ 												'click',
/* 903  */ 												function()
/* 904  */ 												{
/* 905  */ 													return c._displayNewMonth.call(c, this, 1, 0);
/* 906  */ 												}
/* 907  */ 											)
/* 908  */ 									),
/* 909  */ 								$('<div class="dp-calendar"></div>')
/* 910  */ 							)
/* 911  */ 							.bgIframe()
/* 912  */ 						);
/* 913  */ 					
/* 914  */ 				var $pop = this.inline ? $('.dp-popup', this.context) : $('#dp-popup');
/* 915  */ 				
/* 916  */ 				if (this.showYearNavigation == false) {
/* 917  */ 					$('.dp-nav-prev-year, .dp-nav-next-year', c.context).css('display', 'none');
/* 918  */ 				}
/* 919  */ 				if (this.displayClose) {
/* 920  */ 					$pop.append(
/* 921  */ 						$('<a href="#" id="dp-close">' + $.dpText.TEXT_CLOSE + '</a>')
/* 922  */ 							.bind(
/* 923  */ 								'click',
/* 924  */ 								function()
/* 925  */ 								{
/* 926  */ 									c._closeCalendar();	
/* 927  */ 									return false;
/* 928  */ 								}
/* 929  */ 							)
/* 930  */ 					);
/* 931  */ 				}
/* 932  */ 				c._renderCalendar();
/* 933  */ 
/* 934  */ 				$(this.ele).trigger('dpDisplayed', $pop);
/* 935  */ 				
/* 936  */ 				if (!c.inline) {
/* 937  */ 					//Vertical
/* 938  */ 					if (this.verticalPosition == $.dpConst.POS_BOTTOM) {
/* 939  */ 						$pop.css('top', eleOffset.top + $ele.height() - $pop.height() + c.verticalOffset);
/* 940  */ 					}else{
/* 941  */ 						var pos		= eleOffset.top + $pop.outerHeight() + c.verticalOffset;
/* 942  */ 						var diff 	= ($h < pos) ? $h - pos - 15 : 0;
/* 943  */ 						$pop.css('top', eleOffset.top + c.verticalOffset + diff);
/* 944  */ 					}
/* 945  */ 					
/* 946  */ 					//Horizontal
/* 947  */ 					if (this.horizontalPosition == $.dpConst.POS_RIGHT) {
/* 948  */ 						$pop.css('left', eleOffset.left + $ele.width() - $pop.width() + c.horizontalOffset);
/* 949  */ 					}else{
/* 950  */ 						var pos		= eleOffset.left + $pop.outerWidth() + c.horizontalOffset;

/* datepicker.js */

/* 951  */ 						var diff 	= ($w < pos) ? $w - pos - 23 : 0;
/* 952  */ 						$pop.css('left', eleOffset.left + c.horizontalOffset + diff);
/* 953  */ 					}
/* 954  */ //					$('.selectee', this.context).focus();
/* 955  */ 					$(document).bind('mousedown.datepicker', this._checkMouse);
/* 956  */ 				}
/* 957  */ 				
/* 958  */ 			},
/* 959  */ 			setRenderCallback : function(a)
/* 960  */ 			{
/* 961  */ 				if (a == null) return;
/* 962  */ 				if (a && typeof(a) == 'function') {
/* 963  */ 					a = [a];
/* 964  */ 				}
/* 965  */ 				this.renderCallback = this.renderCallback.concat(a);
/* 966  */ 			},
/* 967  */ 			cellRender : function ($td, thisDate, month, year) {
/* 968  */ 				var c = this.dpController;
/* 969  */ 				var d = new Date(thisDate.getTime());
/* 970  */ 				
/* 971  */ 				// add our click handlers to deal with it when the days are clicked...
/* 972  */ 				
/* 973  */ 				$td.bind(
/* 974  */ 					'click',
/* 975  */ 					function()
/* 976  */ 					{
/* 977  */ 						var $this = $(this);
/* 978  */ 						if (!$this.is('.disabled')) {
/* 979  */ 							c.setSelected(d, !$this.is('.selected') || !c.selectMultiple, false, true);
/* 980  */ 							if (c.closeOnSelect) {
/* 981  */ 								// Focus the next input in the formâ€¦
/* 982  */ 								if (c.settings.autoFocusNextInput) {
/* 983  */ 									var ele = c.ele;
/* 984  */ 									var found = false;
/* 985  */ 									$(':input', ele.form).each(
/* 986  */ 										function()
/* 987  */ 										{
/* 988  */ 											if (found) {
/* 989  */ 												$(this).focus();
/* 990  */ 												return false;
/* 991  */ 											}
/* 992  */ 											if (this == ele) {
/* 993  */ 												found = true;
/* 994  */ 											}
/* 995  */ 										}
/* 996  */ 									);
/* 997  */ 								} else {
/* 998  */ 									c.ele.focus();
/* 999  */ 								}
/* 1000 */ 								c._closeCalendar();

/* datepicker.js */

/* 1001 */ 							}
/* 1002 */ 						}
/* 1003 */ 					}
/* 1004 */ 				);
/* 1005 */ 				if (c.isSelected(d)) {
/* 1006 */ 					$td.addClass('selected');
/* 1007 */ 					if (c.settings.selectWeek)
/* 1008 */ 					{
/* 1009 */ 						$td.parent().addClass('selectedWeek');
/* 1010 */ 					}
/* 1011 */ 				} else  if (c.selectMultiple && c.numSelected == c.numSelectable) {
/* 1012 */ 					$td.addClass('unselectable');
/* 1013 */ 				}
/* 1014 */ 				
/* 1015 */ 			},
/* 1016 */ 			_applyRenderCallbacks : function()
/* 1017 */ 			{
/* 1018 */ 				var c = this;
/* 1019 */ 				$('td', this.context).each(
/* 1020 */ 					function()
/* 1021 */ 					{
/* 1022 */ 						for (var i=0; i<c.renderCallback.length; i++) {
/* 1023 */ 							$td = $(this);
/* 1024 */ 							c.renderCallback[i].apply(this, [$td, Date.fromString($td.data('datePickerDate')), c.displayedMonth, c.displayedYear]);
/* 1025 */ 						}
/* 1026 */ 					}
/* 1027 */ 				);
/* 1028 */ 				return;
/* 1029 */ 			},
/* 1030 */ 			// ele is the clicked button - only proceed if it doesn't have the class disabled...
/* 1031 */ 			// m and y are -1, 0 or 1 depending which direction we want to go in...
/* 1032 */ 			_displayNewMonth : function(ele, m, y) 
/* 1033 */ 			{
/* 1034 */ 				if (!$(ele).is('.disabled')) {
/* 1035 */ 					this.setDisplayedMonth(this.displayedMonth + m, this.displayedYear + y, true);
/* 1036 */ 				}
/* 1037 */ 				ele.blur();
/* 1038 */ 				return false;
/* 1039 */ 			},
/* 1040 */ 			_rerenderCalendar : function()
/* 1041 */ 			{
/* 1042 */ 				this._clearCalendar();
/* 1043 */ 				this._renderCalendar();
/* 1044 */ 			},
/* 1045 */ 			_renderCalendar : function()
/* 1046 */ 			{
/* 1047 */ 				// set the title...
/* 1048 */ 				$('h2', this.context).html((new Date(this.displayedYear, this.displayedMonth, 1)).asString($.dpText.HEADER_FORMAT));
/* 1049 */ 				
/* 1050 */ 				// render the calendar...

/* datepicker.js */

/* 1051 */ 				$('.dp-calendar', this.context).renderCalendar(
/* 1052 */ 					$.extend(
/* 1053 */ 						{},
/* 1054 */ 						this.settings, 
/* 1055 */ 						{
/* 1056 */ 							month			: this.displayedMonth,
/* 1057 */ 							year			: this.displayedYear,
/* 1058 */ 							renderCallback	: this.cellRender,
/* 1059 */ 							dpController	: this,
/* 1060 */ 							hoverClass		: this.hoverClass
/* 1061 */ 						})
/* 1062 */ 				);
/* 1063 */ 				
/* 1064 */ 				// update the status of the control buttons and disable dates before startDate or after endDate...
/* 1065 */ 				// TODO: When should the year buttons be disabled? When you can't go forward a whole year from where you are or is that annoying?
/* 1066 */ 				if (this.displayedYear == this.startDate.getFullYear() && this.displayedMonth == this.startDate.getMonth()) {
/* 1067 */ 					$('.dp-nav-prev-year', this.context).addClass('disabled');
/* 1068 */ 					$('.dp-nav-prev-month', this.context).addClass('disabled');
/* 1069 */ 					$('.dp-calendar td.other-month', this.context).each(
/* 1070 */ 						function()
/* 1071 */ 						{
/* 1072 */ 							var $this = $(this);
/* 1073 */ 							if (Number($this.text()) > 20) {
/* 1074 */ 								$this.addClass('disabled');
/* 1075 */ 							}
/* 1076 */ 						}
/* 1077 */ 					);
/* 1078 */ 					var d = this.startDate.getDate();
/* 1079 */ 					$('.dp-calendar td.current-month', this.context).each(
/* 1080 */ 						function()
/* 1081 */ 						{
/* 1082 */ 							var $this = $(this);
/* 1083 */ 							if (Number($this.text()) < d) {
/* 1084 */ 								$this.addClass('disabled');
/* 1085 */ 							}
/* 1086 */ 						}
/* 1087 */ 					);
/* 1088 */ 				} else {
/* 1089 */ 					$('.dp-nav-prev-year', this.context).removeClass('disabled');
/* 1090 */ 					$('.dp-nav-prev-month', this.context).removeClass('disabled');
/* 1091 */ 					var d = this.startDate.getDate();
/* 1092 */ 					if (d > 20) {
/* 1093 */ 						// check if the startDate is last month as we might need to add some disabled classes...
/* 1094 */ 						var st = this.startDate.getTime();
/* 1095 */ 						var sd = new Date(st);
/* 1096 */ 						sd.addMonths(1);
/* 1097 */ 						if (this.displayedYear == sd.getFullYear() && this.displayedMonth == sd.getMonth()) {
/* 1098 */ 							$('.dp-calendar td.other-month', this.context).each(
/* 1099 */ 								function()
/* 1100 */ 								{

/* datepicker.js */

/* 1101 */ 									var $this = $(this);
/* 1102 */ 									if (Date.fromString($this.data('datePickerDate')).getTime() < st) {
/* 1103 */ 										$this.addClass('disabled');
/* 1104 */ 									}
/* 1105 */ 								}
/* 1106 */ 							);
/* 1107 */ 						}
/* 1108 */ 					}
/* 1109 */ 				}
/* 1110 */ 				if (this.displayedYear == this.endDate.getFullYear() && this.displayedMonth == this.endDate.getMonth()) {
/* 1111 */ 					$('.dp-nav-next-year', this.context).addClass('disabled');
/* 1112 */ 					$('.dp-nav-next-month', this.context).addClass('disabled');
/* 1113 */ 					$('.dp-calendar td.other-month', this.context).each(
/* 1114 */ 						function()
/* 1115 */ 						{
/* 1116 */ 							var $this = $(this);
/* 1117 */ 							if (Number($this.text()) < 14) {
/* 1118 */ 								$this.addClass('disabled');
/* 1119 */ 							}
/* 1120 */ 						}
/* 1121 */ 					);
/* 1122 */ 					var d = this.endDate.getDate();
/* 1123 */ 					$('.dp-calendar td.current-month', this.context).each(
/* 1124 */ 						function()
/* 1125 */ 						{
/* 1126 */ 							var $this = $(this);
/* 1127 */ 							if (Number($this.text()) > d) {
/* 1128 */ 								$this.addClass('disabled');
/* 1129 */ 							}
/* 1130 */ 						}
/* 1131 */ 					);
/* 1132 */ 				} else {
/* 1133 */ 					$('.dp-nav-next-year', this.context).removeClass('disabled');
/* 1134 */ 					$('.dp-nav-next-month', this.context).removeClass('disabled');
/* 1135 */ 					var d = this.endDate.getDate();
/* 1136 */ 					if (d < 13) {
/* 1137 */ 						// check if the endDate is next month as we might need to add some disabled classes...
/* 1138 */ 						var ed = new Date(this.endDate.getTime());
/* 1139 */ 						ed.addMonths(-1);
/* 1140 */ 						if (this.displayedYear == ed.getFullYear() && this.displayedMonth == ed.getMonth()) {
/* 1141 */ 							$('.dp-calendar td.other-month', this.context).each(
/* 1142 */ 								function()
/* 1143 */ 								{
/* 1144 */ 									var $this = $(this);
/* 1145 */ 									var cellDay = Number($this.text());
/* 1146 */ 									if (cellDay < 13 && cellDay > d) {
/* 1147 */ 										$this.addClass('disabled');
/* 1148 */ 									}
/* 1149 */ 								}
/* 1150 */ 							);

/* datepicker.js */

/* 1151 */ 						}
/* 1152 */ 					}
/* 1153 */ 				}
/* 1154 */ 				this._applyRenderCallbacks();
/* 1155 */ 			},
/* 1156 */ 			_closeCalendar : function(programatic, ele)
/* 1157 */ 			{
/* 1158 */ 				if (!ele || ele == this.ele)
/* 1159 */ 				{
/* 1160 */ 					$(document).unbind('mousedown.datepicker');
/* 1161 */ 					$(document).unbind('keydown.datepicker');
/* 1162 */ 					this._clearCalendar();
/* 1163 */ 					$('#dp-popup a').unbind();
/* 1164 */ 					$('#dp-popup').empty().remove();
/* 1165 */ 					if (!programatic) {
/* 1166 */ 						$(this.ele).trigger('dpClosed', [this.getSelected()]);
/* 1167 */ 					}
/* 1168 */ 				}
/* 1169 */ 			},
/* 1170 */ 			// empties the current dp-calendar div and makes sure that all events are unbound
/* 1171 */ 			// and expandos removed to avoid memory leaks...
/* 1172 */ 			_clearCalendar : function()
/* 1173 */ 			{
/* 1174 */ 				// TODO.
/* 1175 */ 				$('.dp-calendar td', this.context).unbind();
/* 1176 */ 				$('.dp-calendar', this.context).empty();
/* 1177 */ 			}
/* 1178 */ 		}
/* 1179 */ 	);
/* 1180 */ 	
/* 1181 */ 	// static constants
/* 1182 */ 	$.dpConst = {
/* 1183 */ 		SHOW_HEADER_NONE	:	0,
/* 1184 */ 		SHOW_HEADER_SHORT	:	1,
/* 1185 */ 		SHOW_HEADER_LONG	:	2,
/* 1186 */ 		POS_TOP				:	0,
/* 1187 */ 		POS_BOTTOM			:	1,
/* 1188 */ 		POS_LEFT			:	0,
/* 1189 */ 		POS_RIGHT			:	1,
/* 1190 */ 		DP_INTERNAL_FOCUS	:	'dpInternalFocusTrigger'
/* 1191 */ 	};
/* 1192 */ 	// localisable text
/* 1193 */ 	$.dpText = {
/* 1194 */ 		TEXT_PREV_YEAR		:	'Previous year',
/* 1195 */ 		TEXT_PREV_MONTH		:	'Previous month',
/* 1196 */ 		TEXT_NEXT_YEAR		:	'Next year',
/* 1197 */ 		TEXT_NEXT_MONTH		:	'Next month',
/* 1198 */ 		TEXT_CLOSE			:	'Close',
/* 1199 */ 		TEXT_CHOOSE_DATE	:	'Choose date',
/* 1200 */ 		HEADER_FORMAT		:	'mmmm yyyy'

/* datepicker.js */

/* 1201 */ 	};
/* 1202 */ 	// version
/* 1203 */ 	$.dpVersion = '$Id: jquery.datePicker.js 108 2011-11-17 21:19:57Z kelvin.luck@gmail.com $';
/* 1204 */ 
/* 1205 */ 	$.fn.datePicker.defaults = {
/* 1206 */ 		month				: undefined,
/* 1207 */ 		year				: undefined,
/* 1208 */ 		showHeader			: $.dpConst.SHOW_HEADER_SHORT,
/* 1209 */ 		startDate			: undefined,
/* 1210 */ 		endDate				: undefined,
/* 1211 */ 		inline				: false,
/* 1212 */ 		renderCallback		: null,
/* 1213 */ 		createButton		: true,
/* 1214 */ 		showYearNavigation	: true,
/* 1215 */ 		closeOnSelect		: true,
/* 1216 */ 		displayClose		: false,
/* 1217 */ 		selectMultiple		: false,
/* 1218 */ 		numSelectable		: Number.MAX_VALUE,
/* 1219 */ 		clickInput			: false,
/* 1220 */ 		rememberViewedMonth	: true,
/* 1221 */ 		selectWeek			: false,
/* 1222 */ 		verticalPosition	: $.dpConst.POS_TOP,
/* 1223 */ 		horizontalPosition	: $.dpConst.POS_LEFT,
/* 1224 */ 		verticalOffset		: 0,
/* 1225 */ 		horizontalOffset	: 0,
/* 1226 */ 		hoverClass			: 'dp-hover',
/* 1227 */ 		autoFocusNextInput  : false
/* 1228 */ 	};
/* 1229 */ 
/* 1230 */ 	function _getController(ele)
/* 1231 */ 	{
/* 1232 */ 		if (ele._dpId) return $.event._dpCache[ele._dpId];
/* 1233 */ 		return false;
/* 1234 */ 	};
/* 1235 */ 	
/* 1236 */ 	// make it so that no error is thrown if bgIframe plugin isn't included (allows you to use conditional
/* 1237 */ 	// comments to only include bgIframe where it is needed in IE without breaking this plugin).
/* 1238 */ 	if ($.fn.bgIframe == undefined) {
/* 1239 */ 		$.fn.bgIframe = function() {return this; };
/* 1240 */ 	};
/* 1241 */ 
/* 1242 */ 
/* 1243 */ 	// clean-up
/* 1244 */ 	$(window)
/* 1245 */ 		.bind('unload', function() {
/* 1246 */ 			var els = $.event._dpCache || [];
/* 1247 */ 			for (var i in els) {
/* 1248 */ 				$(els[i].ele)._dpDestroy();
/* 1249 */ 			}
/* 1250 */ 		});

/* datepicker.js */

/* 1251 */ 		
/* 1252 */ 	
/* 1253 */ })(jQuery);
