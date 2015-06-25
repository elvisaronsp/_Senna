
/* tablestyle.js */

/* 1   */ /**
/* 2   *| * jQuery.colorize
/* 3   *| * Copyright (c) 2008-2009 Eric Karimov - ekarim57(at)gmail(dot)com | http://franca.exofire.net/jq/
/* 4   *| * Dual licensed under MIT and GPL.
/* 5   *| * Date: 9/15/2009
/* 6   *| *
/* 7   *| * @projectDescription Table colorize using jQuery.
/* 8   *| * http://franca.exofire.net/jq/colorize
/* 9   *| *
/* 10  *| * @author Eric Karimov, contributor Aymeric Augustin
/* 11  *| * @version 2.0.0
/* 12  *| */
/* 13  */ 
/* 14  */ jQuery.fn.colorize = function(params) {
/* 15  */ 	options = {
/* 16  */ 		altColor: '#FFF',
/* 17  */ 		bgColor: '#F1F1F1',
/* 18  */ 		hoverColor: '#FFF1D3',
/* 19  */ 		hoverClass:'',
/* 20  */ 		hiliteColor: '#FFE5AA',
/* 21  */ 		hiliteClass:'',
/* 22  */ 		oneClick: true,
/* 23  */ 		hover:'row',
/* 24  */ 		click:'row',
/* 25  */ 		banColumns: [],
/* 26  */ 		banRows:[],
/* 27  */ 		banDataClick:true,
/* 28  */ 		ignoreHeaders:true,
/* 29  */ 		nested:false
/* 30  */ 	};
/* 31  */ 	jQuery.extend(options, params);
/* 32  */ 
/* 33  */ 	var colorHandler = {
/* 34  */ 
/* 35  */ 		addHoverClass: function(){
/* 36  */ 			this.origColor = this.style.backgroundColor;
/* 37  */ 			this.style.backgroundColor='';
/* 38  */ 			jQuery(this).addClass(options.hoverClass);
/* 39  */ 		},
/* 40  */ 
/* 41  */ 		addBgHover:function (){
/* 42  */ 			this.origColor = this.style.backgroundColor;
/* 43  */ 			this.style.backgroundColor= options.hoverColor;
/* 44  */ 		},
/* 45  */ 
/* 46  */ 		removeHoverClass: function(){
/* 47  */ 			jQuery(this).removeClass(options.hoverClass);
/* 48  */ 			this.style.backgroundColor=this.origColor;
/* 49  */ 		},
/* 50  */ 

/* tablestyle.js */

/* 51  */ 		removeBgHover: function(){
/* 52  */ 			  this.style.backgroundColor=this.origColor;
/* 53  */ 		},
/* 54  */ 
/* 55  */ 		checkHover: function() {
/* 56  */ 			if(checkRowBan(this)) return;
/* 57  */ 			if (!this.onfire) this.hover();
/* 58  */ 		},
/* 59  */ 
/* 60  */ 		checkHoverOut: function() {
/* 61  */ 			if (!this.onfire) this.removeHover();
/* 62  */ 		},
/* 63  */ 
/* 64  */ 		highlight: function() {
/* 65  */ 			if(options.hiliteClass.length>0 || options.hiliteColor != 'none')
/* 66  */ 			{
/* 67  */ 				if(checkRowBan(this)) return;
/* 68  */ 				this.onfire = true;
/* 69  */ 
/* 70  */ 				if(options.hiliteClass.length>0){
/* 71  */ 					this.style.backgroundColor='';
/* 72  */ 					jQuery(this).addClass(options.hiliteClass).removeClass(options.hoverClass);
/* 73  */ 				}
/* 74  */ 				else if (options.hiliteColor != 'none') {
/* 75  */ 			         this.style.backgroundColor= options.hiliteColor;
/* 76  */ 					if(options.hoverClass.length>0) jQuery(this).removeClass(options.hoverClass);
/* 77  */ 				}
/* 78  */ 			}
/* 79  */ 		},
/* 80  */ 		stopHighlight: function() {
/* 81  */ 		    this.onfire = false;
/* 82  */ 			this.style.backgroundColor = (this.origColor)?this.origColor:'';
/* 83  */ 			jQuery(this).removeClass(options.hiliteClass).removeClass(options.hoverClass);
/* 84  */ 		}
/* 85  */ 	}
/* 86  */ 
/* 87  */ 
/* 88  */ 	 function  processCells (cells, idx, func) {
/* 89  */ 		var colCells = getColCells(cells, idx);
/* 90  */ 
/* 91  */ 		jQuery.each(colCells, function(index, cell2) {
/* 92  */ 			func.call(cell2);
/* 93  */ 		});
/* 94  */ 
/* 95  */ 	    function getColCells (cells, idx) {
/* 96  */ 			var arr = [];
/* 97  */ 			for (var i = 0; i < cells.length; i++) {
/* 98  */ 				if (cells[i].cellIndex == idx)
/* 99  */ 					arr.push(cells[i]);
/* 100 */ 			}

/* tablestyle.js */

/* 101 */ 			return arr;
/* 102 */ 		}
/* 103 */ 	}
/* 104 */ 
/* 105 */ 	function processAdapter(cells, cell, func) {
/* 106 */ 		processCells(cells, cell.cellIndex, func);
/* 107 */ 	}
/* 108 */ 
/* 109 */ 
/* 110 */ 
/* 111 */   var clickHandler = {
/* 112 */ 	toggleColumnClick : function (cells) {
/* 113 */ 		var func = (!this.onfire) ? colorHandler.highlight : colorHandler.stopHighlight;
/* 114 */ 		processAdapter(cells, this, func);
/* 115 */ 	},
/* 116 */ 
/* 117 */ 	toggleRowClick: function(cells) {
/* 118 */ 		row = jQuery(this).parent().get(0);
/* 119 */ 		if (!row.onfire)
/* 120 */ 			colorHandler.highlight.call(row);
/* 121 */ 		else
/* 122 */ 			colorHandler.stopHighlight.call(row);
/* 123 */ 	},
/* 124 */ 
/* 125 */      oneClick : function (clicked){
/* 126 */ 			if(clicked != null) {
/* 127 */ 				   if (this.isRepeatClick())
/* 128 */ 				   {
/* 129 */ 					   this.stopHilite();
/* 130 */ 					   this.cancel ();
/* 131 */ 				   }
/* 132 */ 				   else{
/* 133 */ 					   this.stopHilite();
/* 134 */ 					   this.hilite();
/* 135 */ 				   }
/* 136 */ 			   }
/* 137 */ 			   else{
/* 138 */ 				   this.hilite();
/* 139 */ 			   }
/* 140 */       },
/* 141 */ 
/* 142 */ 	   oneColumnClick : function (cells) {
/* 143 */ 	       var indx = this.cellIndex;
/* 144 */ 		   function repeat (){
/* 145 */ 		   	  return (cells.clicked == indx);
/* 146 */ 		   }
/* 147 */ 		   Column.handleClick (this, cells, indx, repeat);
/* 148 */ 	   },
/* 149 */ 
/* 150 */ 	    oneRowClick  : function (cells) {

/* tablestyle.js */

/* 151 */ 	           var row = jQuery(this).parent().get(0);
/* 152 */ 	           var indx = row.rowIndex;
/* 153 */ 	           function repeat (){
/* 154 */ 	                 return (cells.rowClicked == indx);
/* 155 */ 	            }
/* 156 */ 	           Row.handleClick (this, cells, row.rowIndex, repeat);
/* 157 */ 	    },
/* 158 */ 
/* 159 */ 	    oneColumnRowClick : function (cells) {
/* 160 */ 
/* 161 */ 				   var indx = this.cellIndex;
/* 162 */ 				   var row = jQuery(this).parent().get(0);
/* 163 */ 
/* 164 */ 				   function isRepeatColumn(){
/* 165 */ 					   return (cells.clicked == indx && cells.rowClicked  == row.rowIndex) ;
/* 166 */ 				   }
/* 167 */ 
/* 168 */ 				   function isRepeatRow(){
/* 169 */ 					   return (cells.rowClicked  == row.rowIndex && this.cellIndex == cells.clicked) ;
/* 170 */ 				   }
/* 171 */ 
/* 172 */ 			    Column.handleClick (this, cells,indx, isRepeatColumn);
/* 173 */ 				Row.handleClick (this, cells,row.rowIndex, isRepeatRow);
/* 174 */            }
/* 175 */ 	 }
/* 176 */ 
/* 177 */ 	var Column ={
/* 178 */ 
/* 179 */ 	      init: function(cell, cells, indx){
/* 180 */ 			  this.cell = cell;
/* 181 */ 			  this.cells = cells;
/* 182 */ 		 	  this.indx = indx;
/* 183 */ 		  },
/* 184 */ 
/* 185 */ 		  handleClick: function(cell, cells, indx, func){
/* 186 */               this.init(cell, cells, indx);
/* 187 */               this.isRepeatClick = func;
/* 188 */               clickHandler.oneClick.call (this, cells.clicked);
/* 189 */ 		  },
/* 190 */ 	     stopHilite : function(){
/* 191 */ 	        processCells(this.cells, this.cells.clicked, colorHandler.stopHighlight);
/* 192 */ 	    },
/* 193 */ 	    hilite : function(){
/* 194 */ 	        processAdapter(this.cells, this.cell, colorHandler.highlight);
/* 195 */ 	        this.cells.clicked  = this.indx;
/* 196 */ 	    },
/* 197 */ 	    cancel: function(){
/* 198 */ 	         this.cells.clicked = null;
/* 199 */ 	     }
/* 200 */ 	 }

/* tablestyle.js */

/* 201 */ 
/* 202 */ 	var Row ={
/* 203 */ 	      init: function(cell, cells, indx){
/* 204 */ 		  		this.cell = cell;
/* 205 */ 		  		this.cells = cells;
/* 206 */ 		  		this.indx = indx;
/* 207 */ 		  },
/* 208 */ 		  handleClick: function(cell, cells, indx, func){
/* 209 */ 		        this.init(cell, cells, indx);
/* 210 */ 		        this.isRepeatClick = func;
/* 211 */ 		        clickHandler.oneClick.call (this, cells.rowClicked);
/* 212 */ 		  },
/* 213 */ 	      stopHilite : function(){
/* 214 */ 	         colorHandler.stopHighlight.call(clickHandler.tbl.rows[this.cells.rowClicked]); // delete the selected row
/* 215 */ 	     },
/* 216 */ 	     hilite : function(){
/* 217 */ 	          var row = jQuery(this.cell).parent().get(0);
/* 218 */ 			  if(options.hover=='column')  colorHandler.addBgHover.call (row);
/* 219 */ 	          colorHandler.highlight.call(row); // the current row is set to select
/* 220 */ 	          this.cells.rowClicked = this.indx; //the current row is recorded
/* 221 */ 
/* 222 */ 	     },
/* 223 */ 	     cancel: function(){
/* 224 */ 	         this.cells.rowClicked = null;
/* 225 */ 	     }
/* 226 */ 	 }
/* 227 */ 
/* 228 */     function isDataCell(){
/* 229 */ 	     return (this.nodeName == 'TD');
/* 230 */     }
/* 231 */ 
/* 232 */ 	function checkBan() {
/* 233 */ 		return (jQuery.inArray(this.cellIndex, options.banColumns) != -1) ;
/* 234 */ 	}
/* 235 */ 
/* 236 */ 	function checkRowBan(cell){
/* 237 */ 			if(options.banRows.length>0){
/* 238 */ 				var row = jQuery(cell).parent().get(0);
/* 239 */ 				return jQuery.inArray(row.rowIndex, options.banRows) != -1;
/* 240 */ 			}
/* 241 */ 			else
/* 242 */ 				return false;
/* 243 */ 	}
/* 244 */ 
/* 245 */ 	function attachHoverHandler(){
/* 246 */ 		this.hover = optionsHandler.hover;
/* 247 */ 		this.removeHover = optionsHandler.removeHover;
/* 248 */ 	}
/* 249 */ 
/* 250 */ 	function handleColumnHoverEvents(cell, cells){

/* tablestyle.js */

/* 251 */ 		attachHoverHandler.call (cell);
/* 252 */ 		cell.onmouseover = function() {
/* 253 */ 			if (checkBan.call(this)) return;
/* 254 */ 			processAdapter(cells, this, colorHandler.checkHover);
/* 255 */ 		}
/* 256 */ 		cell.onmouseout = function() {
/* 257 */ 			if (checkBan.call(this)) return;
/* 258 */ 			processAdapter(cells, this, colorHandler.checkHoverOut);
/* 259 */ 		}
/* 260 */ 	}
/* 261 */ 
/* 262 */ 	function handleRowHoverEvents(cell, cells){
/* 263 */ 		row = jQuery(cell).parent().get(0);
/* 264 */ 		attachHoverHandler.call (row);
/* 265 */ 		row.onmouseover = colorHandler.checkHover ;
/* 266 */ 		row.onmouseout = colorHandler.checkHoverOut ;
/* 267 */ 	}
/* 268 */ 
/* 269 */ 	function handleRowColHoverEvents(cell, cells){
/* 270 */ 		handleRowHoverEvents(cell, cells);
/* 271 */ 		handleColumnHoverEvents(cell, cells);
/* 272 */ 	}
/* 273 */ 
/* 274 */ 
/* 275 */ 	var optionsHandler ={
/* 276 */ 		setHover: function(){
/* 277 */ 			if(options.hoverClass.length>0){
/* 278 */ 				this.hover = colorHandler.addHoverClass;
/* 279 */ 				this.removeHover = colorHandler.removeHoverClass;
/* 280 */ 			}
/* 281 */ 			else{
/* 282 */ 				this.hover = colorHandler.addBgHover;
/* 283 */ 				this.removeHover = colorHandler.removeBgHover;
/* 284 */ 			}
/* 285 */ 		},
/* 286 */ 
/* 287 */ 		getRowClick : 	function (){
/* 288 */ 			if(options.oneClick)
/* 289 */ 				return clickHandler.oneRowClick;
/* 290 */ 			else
/* 291 */ 				return clickHandler.toggleRowClick;
/* 292 */ 		},
/* 293 */ 
/* 294 */ 		getColumnClick : 	function (){
/* 295 */ 			if(options.oneClick)
/* 296 */ 				return clickHandler.oneColumnClick;
/* 297 */ 			else
/* 298 */ 				return clickHandler.toggleColumnClick;
/* 299 */ 		},
/* 300 */ 		getRowColClick:function(){

/* tablestyle.js */

/* 301 */ 			return clickHandler.oneColumnRowClick;
/* 302 */ 		}
/* 303 */ 	}
/* 304 */ 
/* 305 */ 	var handler = {
/* 306 */ 		clickFunc : getClickHandler(),
/* 307 */ 		handleHoverEvents :getHoverHandler()
/* 308 */ 	};
/* 309 */ 
/* 310 */ 	function getHoverHandler(){
/* 311 */ 		if(options.hover=='column')
/* 312 */ 			return handleColumnHoverEvents;
/* 313 */ 		else if(options.hover=='cross')
/* 314 */ 			return handleRowColHoverEvents;
/* 315 */ 		else
/* 316 */ 			return handleRowHoverEvents;
/* 317 */ 	}
/* 318 */ 
/* 319 */ 	function getClickHandler(){
/* 320 */ 		if(options.click=='column')
/* 321 */ 			return optionsHandler.getColumnClick();
/* 322 */ 		else if(options.click =='cross')
/* 323 */ 			return optionsHandler.getRowColClick();
/* 324 */ 		else
/* 325 */ 			return  optionsHandler.getRowClick();
/* 326 */ 	}
/* 327 */ 
/* 328 */ 	return this.each(function() {
/* 329 */ 
/* 330 */ 		if (options.altColor!='none') {
/* 331 */ 			var odd, even;
/* 332 */ 			odd = even =(options.ignoreHeaders)? 'tr:has(td)': 'tr';
/* 333 */ 			if(options.nested){
/* 334 */ 				odd  +=  ':nth-child(odd)';
/* 335 */ 				even += ':nth-child(even)';
/* 336 */ 			}
/* 337 */ 			else{
/* 338 */ 				odd+= ':odd';
/* 339 */ 				even += ':even';
/* 340 */ 			}
/* 341 */ 		     jQuery(this).find(odd).css('background', options.bgColor);
/* 342 */ 		     jQuery(this).find(even).css('background', options.altColor);
/* 343 */         }
/* 344 */ 
/* 345 */ 		if(options.columns)
/* 346 */ 			alert("The 'columns' option is deprecated.\nPlease use the 'click' and 'hover' options instead.");
/* 347 */ 
/* 348 */     	if (jQuery(this).find('thead tr:last th').length > 0)
/* 349 */ 			 var cells = jQuery(this).find('td, thead tr:last th');
/* 350 */ 		else

/* tablestyle.js */

/* 351 */ 			var cells = jQuery(this).find('td,th');
/* 352 */ 
/* 353 */ 		cells.clicked = null;
/* 354 */ 
/* 355 */ 		if (jQuery.inArray('last', options.banColumns) != -1){
/* 356 */ 			if(this.rows.length>0){
/* 357 */ 				options.banColumns.push(this.rows[0].cells.length-1);
/* 358 */ 			}
/* 359 */ 		}
/* 360 */ 
/* 361 */ 	    optionsHandler.setHover();
/* 362 */ 		clickHandler.tbl = this;
/* 363 */ 
/* 364 */ 		jQuery.each(cells, function(i, cell) {
/* 365 */ 			 handler.handleHoverEvents (this, cells);
/* 366 */ 			 jQuery(this).bind("click", function(e) {
/* 367 */ 				if(checkBan.call(this)) return;
/* 368 */ 			 	if(options.banDataClick && isDataCell.call(this)) return;
/* 369 */ 				handler.clickFunc.call(this, cells);
/* 370 */ 			});
/* 371 */ 		});
/* 372 */ 	});
/* 373 */  }
/* 374 */ 
/* 375 */ 
