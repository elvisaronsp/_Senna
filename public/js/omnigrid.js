
/* omnigrid.js */

/* 1    */ // Author: Marko Šantić
/* 2    */ // Web: http://www.omnisdata.com/omnigrid
/* 3    */ // Email: marko@omnisdata.com
/* 4    */ // Company: Omnisdata Ltd.
/* 5    */ // Licence: MIT licence
/* 6    */ // Required: Mootools 1.2
/* 7    */ // Version: OmniGrid 1.2.6
/* 8    */ // ****************************************************************************
/* 9    */ 
/* 10   */ var omniGrid = new Class({
/* 11   */ 	Implements: [Events,Options],
/* 12   */ 				  
/* 13   */ 	getOptions: function(){
/* 14   */ 		return {
/* 15   */ 			alternaterows: true,	
/* 16   */ 			showHeader:true,
/* 17   */ 			sortHeader:false,
/* 18   */ 			resizeColumns:true,
/* 19   */ 			selectable:true,
/* 20   */ 			serverSort:true,
/* 21   */ 			sortOn: null,
/* 22   */ 			sortBy: 'ASC',
/* 23   */ 			filterHide: true,
/* 24   */ 			filterHideCls: 'hide',
/* 25   */ 			filterSelectedCls: 'filter',
/* 26   */ 			multipleSelection:true,
/* 27   */ 			editable:false,
/* 28   */ 			editondblclick:false,
/* 29   */ 			// accordion
/* 30   */ 			accordion:false,
/* 31   */ 			accordionRenderer:null,
/* 32   */ 			autoSectionToggle:true, // if true just one section can be open/visible
/* 33   */ 			showtoggleicon:true,
/* 34   */ 			openAccordionOnDblClick:false,
/* 35   */ 			// pagination
/* 36   */ 			url:null,
/* 37   */ 			pagination:false,
/* 38   */ 			page:1,
/* 39   */ 			perPageOptions: [10, 20, 50, 100, 200],
/* 40   */ 			perPage:10,
/* 41   */ 			filterInput:false,
/* 42   */ 			// dataProvider
/* 43   */ 			dataProvider:null
/* 44   */ 		};
/* 45   */ 	},
/* 46   */ 	
/* 47   */ 	initialize: function(container, options){
/* 48   */ 		this.setOptions(this.getOptions(), options);
/* 49   */ 		this.container = $(container);
/* 50   */ 		

/* omnigrid.js */

/* 51   */ 		if (!this.container)
/* 52   */ 			return;
/* 53   */ 			
/* 54   */ 		this.draw();
/* 55   */ 		
/* 56   */ 		this.reset();
/* 57   */ 		
/* 58   */ 		this.loadData();
/* 59   */ 	},
/* 60   */ 	
/* 61   */ 	// API	
/* 62   */ 	reset: function(){
/* 63   */ 		
/* 64   */ 		this.renderData();
/* 65   */ 		
/* 66   */ 		this.refreshDelayID = null;
/* 67   */ 		this.dragging = false;
/* 68   */ 		this.selected = new Array();
/* 69   */ 		
/* 70   */ 		if (this.options.accordion)	
/* 71   */ 			this.elements = this.ulBody.getElements('li:nth-child(2n+1)'); // all li el. except accordian sections
/* 72   */ 		else
/* 73   */ 			this.elements = this.ulBody.getElements('li');
/* 74   */ 
/* 75   */ 		this.filtered = false;
/* 76   */ 		this.lastsection = null;
/* 77   */ 		
/* 78   */ 		if (this.options.alternaterows)	this.altRow();		
/* 79   */ 
/* 80   */ 		this.elements.each(function(el,i){
/* 81   */ 			
/* 82   */ 			el.addEvent('click', this.onRowClick.bind(this));
/* 83   */ 			el.addEvent('dblclick', this.onRowDblClick.bind(this));		
/* 84   */ 			el.addEvent('mouseover', this.onRowMouseOver.bind(this) );
/* 85   */ 			el.addEvent('mouseout',  this.onRowMouseOut.bind(this) );
/* 86   */ 			
/* 87   */ 		}, this);
/* 88   */ 
/* 89   */ 		// ******************************************************************
/* 90   */ 		// **************************** Setup header ************************
/* 91   */ 		// ******************************************************************
/* 92   */ 		this.container.getElements('.th').each(function(el,i){
/* 93   */ 			//alert(el.dataType);
/* 94   */ 			var dataType = el.retrieve('dataType');
/* 95   */ 			if(dataType){
/* 96   */ 
/* 97   */ 				el.getdate = function(str){
/* 98   */ 					// inner util function to convert 2-digit years to 4
/* 99   */ 					function fixYear(yr) {
/* 100  */ 						yr = +yr;

/* omnigrid.js */

/* 101  */ 						if (yr<50) { yr += 2000; }
/* 102  */ 						else if (yr<100) { yr += 1900; }
/* 103  */ 						return yr;
/* 104  */ 					};
/* 105  */ 					var ret;
/* 106  */ 					//
/* 107  */ 					if (str.length>12){
/* 108  */ 						strtime = str.substring(str.lastIndexOf(' ')+1);
/* 109  */ 						strtime = strtime.substring(0,2)+strtime.substr(-2);
/* 110  */ 					}else{
/* 111  */ 						strtime = '0000';
/* 112  */ 					}
/* 113  */ 					//
/* 114  */ 					// YYYY-MM-DD
/* 115  */ 					if (ret=str.match(/(\d{2,4})-(\d{1,2})-(\d{1,2})/)) {
/* 116  */ 						return (fixYear(ret[1])*10000) + (ret[2]*100) + (+ret[3]) + strtime;
/* 117  */ 					}
/* 118  */ 					// DD/MM/YY[YY] or DD-MM-YY[YY]
/* 119  */ 					if (ret=str.match(/(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})/)) {
/* 120  */ 						return (fixYear(ret[3])*10000) + (ret[2]*100) + (+ret[1]) + strtime;
/* 121  */ 					}
/* 122  */ 					return 999999990000; // So non-parsed dates will be last, not first
/* 123  */ 				};
/* 124  */ 				
/* 125  */ 				//
/* 126  */ 				el.findData = function(elem){
/* 127  */ 					var child = elem.getFirst();
/* 128  */ 					if(child){
/* 129  */ 						return el.findData(child);
/* 130  */ 					}else{
/* 131  */ 						return elem.innerHTML.trim();
/* 132  */ 					}
/* 133  */ 				};
/* 134  */ 				
/* 135  */ 				//
/* 136  */ 				el.compare = function(a, b){
/* 137  */ 					// a i b su LI elementi
/* 138  */ 					var x 		= a.getChildren()[i];
/* 139  */ 					var y 		= b.getChildren()[i];
/* 140  */ 					
/* 141  */ 					var xval 	= x.getChildren(".value")[0];
/* 142  */ 					var yval 	= y.getChildren(".value")[0];
/* 143  */ 					
/* 144  */ 					var xval 	= xval!=undefined ? xval : x;
/* 145  */ 					var yval 	= yval!=undefined ? yval : y;
/* 146  */ 					
/* 147  */ 					var var1 = xval.innerHTML.replace('&nbsp;','').trim();
/* 148  */ 					var var2 = yval.innerHTML.replace('&nbsp;','').trim();
/* 149  */ 					
/* 150  */ 					if(dataType == 'number'){

/* omnigrid.js */

/* 151  */ 						var1 = parseFloat(var1.replace(',','').replace('.',''));
/* 152  */ 						var2 = parseFloat(var2.replace(',','').replace('.',''));
/* 153  */ 						
/* 154  */ 						if(el.sortBy == 'ASC'){
/* 155  */ 							return var1-var2;
/* 156  */ 						}else{
/* 157  */ 							return var2-var1;
/* 158  */ 						}
/* 159  */ 						
/* 160  */ 					}else if(dataType == 'string'){
/* 161  */ 						var1 = var1.toUpperCase();
/* 162  */ 						var2 = var2.toUpperCase();
/* 163  */ 						
/* 164  */ 						if(var1==var2){return 0;};
/* 165  */ 						if(el.sortBy == 'ASC'){
/* 166  */ 							if(var1<var2){return -1;};
/* 167  */ 						}else{
/* 168  */ 							if(var1>var2){return -1;};
/* 169  */ 						}
/* 170  */ 						return 1;
/* 171  */ 						
/* 172  */ 					}else if(dataType == 'date'){
/* 173  */ 						var1 = parseFloat(el.getdate(var1));
/* 174  */ 						var2 = parseFloat(el.getdate(var2));
/* 175  */ 						
/* 176  */ 						if(el.sortBy == 'ASC'){
/* 177  */ 							return var1-var2;
/* 178  */ 						}else{
/* 179  */ 							return var2-var1;
/* 180  */ 						}
/* 181  */ 						
/* 182  */ 					}else if(dataType == 'currency'){
/* 183  */ 						var1 = parseFloat(var1.substr(1).replace(',','').replace('.',''));
/* 184  */ 						var2 = parseFloat(var2.substr(1).replace(',','').replace('.',''));
/* 185  */ 						
/* 186  */ 						if(el.sortBy == 'ASC'){
/* 187  */ 							return var1-var2;
/* 188  */ 						}else{
/* 189  */ 							return var2-var1;
/* 190  */ 						}
/* 191  */ 						
/* 192  */ 					}
/* 193  */ 					
/* 194  */ 				};
/* 195  */ 			}
/* 196  */ 		}, this);
/* 197  */ 	},
/* 198  */ 	
/* 199  */ 	// API	
/* 200  */ 	// pretvara zadanu columnu u inline edit mode

/* omnigrid.js */

/* 201  */ 	// options = {
/* 202  */ 	//		dataIndex:Number - column name || columnIndex:Number - column index 
/* 203  */ 	//}
/* 204  */ 	edit: function(options){
/* 205  */ 		
/* 206  */ 		var sels = this.getSelectedIndices();
/* 207  */ 
/* 208  */ 		if ( !sels || sels.length==0 || !this.options.editable ) return;
/* 209  */ 		
/* 210  */ 		this.finishEditing(); // ako je negde otvoren
/* 211  */ 		
/* 212  */ 		var li = this.elements[ sels[0] ];
/* 213  */ 		
/* 214  */ 		// nadi index u columnModel
/* 215  */ 		var c = options.columnIndex ? options.columnIndex : 0; // ako ne nade ili nije definiran pretpostavi 1.
/* 216  */ 		var colmod;
/* 217  */ 		if (options.dataIndex)
/* 218  */ 		{
/* 219  */ 			for (; c < this.options.columnModel.length; c++) 
/* 220  */ 			{
/* 221  */ 				colmod = this.options.columnModel[c];
/* 222  */ 				
/* 223  */ 				if (colmod.hidden) continue;
/* 224  */ 				//console.log(colmod.dataIndex+" "+options.dataIndex);
/* 225  */ 				if ( colmod.dataIndex == options.dataIndex ) break;
/* 226  */ 			}
/* 227  */ 		}
/* 228  */ 		
/* 229  */ 		if (c == this.options.columnModel.length) return; // znaci da nije nasao columnu
/* 230  */ 		
/* 231  */ 		colmod = this.options.columnModel[c];
/* 232  */ 
/* 233  */ 		if (!colmod.editable) return;
/* 234  */ 		
/* 235  */ 		var td = li.getElements('div.td')[c];
/* 236  */ 		var data = this.options.data[ sels[0] ];
/* 237  */ 		var width = td.getStyle('width').toInt()-5;
/* 238  */ 		var height = 30;
/* 239  */ 		var html = data[colmod.dataIndex];
/* 240  */ 		
/* 241  */ 		td.innerHTML = "";
/* 242  */ 		
/* 243  */ 		var input = new Element('input', {style:"width: "+width+"px; height: "+height+"px;", maxlength:254, value: html} );
/* 244  */ 		input.addClass('inline');
/* 245  */ 		input.addEvent("keyup", this.finishEditing.bind(this) );
/* 246  */ 		input.addEvent("blur", this.finishEditing.bind(this) );
/* 247  */ 		input.inject(td);
/* 248  */ 		input.focus();
/* 249  */ 		
/* 250  */ 		//td.innerHTML = " onkeypress=\"return fieldEnter(this,event,' actual.id ')\" onfocus=\"highLight(this);\" onblur=\"noLight(this); return fieldBlur(this,' actual.id ');\" />";

/* omnigrid.js */

/* 251  */ 		//td.innerHTML = '';
/* 252  */ 		
/* 253  */ 		this.inlineEditSafe = {row:sels[0], columnModel: colmod, td:td, input:input, oldvalue: html};
/* 254  */ 		
/* 255  */ 		this.inlineeditmode = true; // radi chromea jer poziva keyup i blur event skoro paralelno !?
/* 256  */ 		
/* 257  */ 		return this.inlineEditSafe;
/* 258  */ 		
/* 259  */ 		// global click za finish editing --> ne treba jer ima onblur event
/* 260  */ 		//(Browser.Engine.trident ? document : window).addEvent("click", this.finishEditing.bind(this) );
/* 261  */ 	},
/* 262  */ 	
/* 263  */ 	finishEditing: function(evt)
/* 264  */ 	{
/* 265  */ 		if (!this.inlineeditmode) return;
/* 266  */ 		
/* 267  */ 		if ( evt && evt.type == "keyup" && evt.key != 'enter' && evt.key != 'esc' ) return;
/* 268  */ 		
/* 269  */ 		//if (evt) console.log(evt.type+" "+this.inlineEditSafe.oldvalue+" "+this.editmode);
/* 270  */ 
/* 271  */ 		this.inlineeditmode = false;  // radi chromea
/* 272  */ 		
/* 273  */ 		var row = this.inlineEditSafe.row;
/* 274  */ 		var data = this.options.data[ row ];
/* 275  */ 		var colmod = this.inlineEditSafe.columnModel;
/* 276  */ 		var td = this.inlineEditSafe.td;
/* 277  */ 		
/* 278  */ 
/* 279  */ 		//alert(this.inlineEditSafe);
/* 280  */ 		// ako nije potvrdio sa ENTER vrati na staro
/* 281  */ 		data[colmod.dataIndex] = ( evt && evt.type == "keyup" && evt.key == 'enter') ? this.inlineEditSafe.input.value : this.inlineEditSafe.oldvalue;
/* 282  */ 		
/* 283  */ 		td.innerHTML = colmod.labelFunction ? colmod.labelFunction(data, row, colmod) : data[colmod.dataIndex];
/* 284  */ 		
/* 285  */ 		if (td.innerHTML.length == 0) td.innerHTML = "&nbsp;"; // bitno jer inace ne bi drugi put reagirao na dbl click
/* 286  */ 		
/* 287  */ 		// opali event samo za key=ENTER i ako je je napravljena promjena 
/* 288  */ 		if ( evt && evt.type == "keyup" && evt.key == 'enter' && this.inlineEditSafe.oldvalue != td.innerHTML )
/* 289  */ 		{
/* 290  */ 			// opali event za van
/* 291  */ 			this.inlineEditSafe.target = this; // ovo je mozda lose jer poslije brisem varijablu this.inlineEditSafe
/* 292  */ 			
/* 293  */ 			this.fireEvent("editcomplete", this.inlineEditSafe);
/* 294  */ 		}
/* 295  */ 		
/* 296  */ 		this.inlineEditSafe = null;
/* 297  */ 	},
/* 298  */ 
/* 299  */ 	
/* 300  */ 	toggle: function(el){

/* omnigrid.js */

/* 301  */ 		if ( el.getStyle('display') == 'block' )
/* 302  */ 		{
/* 303  */ 			el.setStyle('display', 'none');
/* 304  */ 		}else{
/* 305  */ 			el.setStyle('display', 'block');
/* 306  */ 		}
/* 307  */ 	},
/* 308  */ 	
/* 309  */ 	// API
/* 310  */ 	getSection: function(row){
/* 311  */ 		return this.ulBody.getElement('.section-'+row);
/* 312  */ 	},
/* 313  */ 	
/* 314  */ 	getLiParent: function (target){
/* 315  */ 		// ! ako se koristi labelFunction onda neki html elem. moze hvatati event, detektiraj pravi li
/* 316  */ 		target = $(target);
/* 317  */ 
/* 318  */ 		while ( target && !target.hasClass('td') ){
/* 319  */ 			target = target.getParent();
/* 320  */ 		}
/* 321  */ 		
/* 322  */ 		if (target)
/* 323  */ 			return target.getParent();
/* 324  */ 	},
/* 325  */ 	
/* 326  */ 	onRowMouseOver: function (evt){
/* 327  */ 		var li = this.getLiParent(evt.target);
/* 328  */ 		if (!li) return;
/* 329  */ 		
/* 330  */ 		if (!this.dragging)
/* 331  */ 			li.addClass('over');
/* 332  */ 			
/* 333  */ 		this.fireEvent("mouseover", {target:this, row:li.retrieve('row'), element:li });
/* 334  */ 	},
/* 335  */ 	
/* 336  */ 	onRowMouseOut: function (evt){
/* 337  */ 		var li = this.getLiParent(evt.target);
/* 338  */ 		if (!li) return;
/* 339  */ 		
/* 340  */ 		if (!this.dragging)
/* 341  */ 			li.removeClass('over');
/* 342  */ 			
/* 343  */ 		this.fireEvent("mouseout", {target:this, row:li.retrieve('row'), element:li });
/* 344  */ 	},
/* 345  */ 	
/* 346  */ 	onRowClick: function (evt){
/* 347  */ 	
/* 348  */ 		var li = this.getLiParent(evt.target);
/* 349  */ 		
/* 350  */ 		if (!li) return;

/* omnigrid.js */

/* 351  */ 		
/* 352  */ 		
/* 353  */ 		if (this.options.selectable)
/* 354  */ 		{
/* 355  */ 			var currentindex = li.retrieve('row');
/* 356  */ 			var selectedNum = this.selected.length;
/* 357  */ 			var dontselect = false;
/* 358  */ 			
/* 359  */ 			if ( (!evt.control && !evt.shift) || !this.options.multipleSelection )
/* 360  */ 			{
/* 361  */ 				// ocisti stari selection
/* 362  */ 				this.elements.each(function(el, i){ el.removeClass('selected'); }, this);
/* 363  */ 				
/* 364  */ 				//for (var i=0; i<this.selected.length; i++) this.elements[ this.selected[i] ].removeClass('selected');
/* 365  */ 				
/* 366  */ 				this.selected = new Array();
/* 367  */ 			}
/* 368  */ 		
/* 369  */ 			if ( evt.control )
/* 370  */ 			{
/* 371  */ 				for (var i=0; i<selectedNum; i++)
/* 372  */ 				{
/* 373  */ 					if ( currentindex == this.selected[i] ) // ako je vec selektiran unselectaj ga
/* 374  */ 					{
/* 375  */ 						this.elements[ currentindex ].removeClass('selected');
/* 376  */ 						this.selected.splice(i, 1 );
/* 377  */ 						dontselect = true;
/* 378  */ 					}
/* 379  */ 				}
/* 380  */ 			}
/* 381  */ 		
/* 382  */ 			if ( evt.shift && this.options.multipleSelection )
/* 383  */ 			{
/* 384  */ 				var si = 0;
/* 385  */ 				if (this.selected.length>0)
/* 386  */ 					si = this.selected[selectedNum-1]; // uzmi zadnjeg
/* 387  */ 					
/* 388  */ 				var endindex = currentindex;
/* 389  */ 				
/* 390  */ 				startindex = Math.min(si, endindex);
/* 391  */ 				endindex = Math.max(si, endindex);
/* 392  */ 				
/* 393  */ 				//if ( !evt.control ) this.unselectAll(); // ako ne drzi shift+ctrl ocisti select
/* 394  */ 				for (var i=startindex; i<=endindex; i++)
/* 395  */ 				{
/* 396  */ 					this.elements[i].addClass('selected');
/* 397  */ 					this.selected.push( Number(i) );
/* 398  */ 				}
/* 399  */ 			}
/* 400  */ 					

/* omnigrid.js */

/* 401  */ 			if (!dontselect)
/* 402  */ 			{
/* 403  */ 				li.addClass('selected');
/* 404  */ 				this.selected.push( Number(li.retrieve('row')) );
/* 405  */ 			}
/* 406  */ 			
/* 407  */ 			this.unique(this.selected, true); // izbaci sve duplikate iz selection arr.
/* 408  */ 		}
/* 409  */ 		
/* 410  */ 		//console.log(this.selected);
/* 411  */ 		
/* 412  */ 		if (this.options.accordion && !this.options.openAccordionOnDblClick)
/* 413  */ 		{
/* 414  */ 			this.accordianOpen(li);
/* 415  */ 		}
/* 416  */ 		
/* 417  */ 		this.fireEvent("click", {indices:this.selected, target:this, row:li.retrieve('row'), element:li });
/* 418  */ 	},
/* 419  */ 	
/* 420  */ 	toggleIconClick: function(evt)
/* 421  */ 	{
/* 422  */ 		var li = this.getLiParent(evt.target);
/* 423  */ 		
/* 424  */ 		this.accordianOpen(li);
/* 425  */ 	},
/* 426  */ 	
/* 427  */ 	accordianOpen: function(li)
/* 428  */ 	{
/* 429  */ 		var section = this.getSection(li.retrieve('row'));
/* 430  */ 	
/* 431  */ 		if (this.options.autoSectionToggle)
/* 432  */ 		{
/* 433  */ 			
/* 434  */ 			if (this.lastsection)
/* 435  */ 				if (this.lastsection != section)
/* 436  */ 				{
/* 437  */ 					this.lastsection.setStyle('display', 'none');
/* 438  */ 					this.lastsection.getPrevious().getElement('.toggleicon').setStyle('background-position', '0 0');
/* 439  */ 				}
/* 440  */ 			
/* 441  */ 			if (!this.options.accordionRenderer)
/* 442  */ 			{
/* 443  */ 				section.setStyle('display', 'block');
/* 444  */ 			}
/* 445  */ 		}
/* 446  */ 		
/* 447  */ 		if (this.options.accordionRenderer)
/* 448  */ 		{
/* 449  */ 			this.toggle( section );
/* 450  */ 		}

/* omnigrid.js */

/* 451  */ 		
/* 452  */ 		
/* 453  */ 		if (this.options.showtoggleicon)
/* 454  */ 		{
/* 455  */ 			li.getElement('.toggleicon').setStyle('background-position', section.getStyle('display') == 'block' ? '-16px 0' : '0 0');
/* 456  */ 		}
/* 457  */ 		
/* 458  */ 		
/* 459  */ 		this.lastsection = section;
/* 460  */ 	},
/* 461  */ 
/* 462  */ 	
/* 463  */ 	onRowDblClick: function (evt){
/* 464  */ 		
/* 465  */ 		var li = this.getLiParent(evt.target);
/* 466  */ 		if (!li) return;
/* 467  */ 		
/* 468  */ 		var t = evt.target;
/* 469  */ 		if ( this.options.editable && this.options.editondblclick && t.hasClass('td') )
/* 470  */ 		{
/* 471  */ 			var childs = li.getChildren();
/* 472  */ 			for(var i=0; i<childs.length; i++)
/* 473  */ 			{
/* 474  */ 				if (childs[i] == t) break;
/* 475  */ 			}
/* 476  */ 			
/* 477  */ 			var obj = this.edit({columnIndex:i});
/* 478  */ 			
/* 479  */ 			if (obj) obj.input.selectRange(0, obj.input.value.length);
/* 480  */ 		}
/* 481  */ 	
/* 482  */ 		if (this.options.accordion && this.options.openAccordionOnDblClick)
/* 483  */ 		{
/* 484  */ 			this.accordianOpen(li);
/* 485  */ 		}
/* 486  */ 		
/* 487  */ 		this.fireEvent("dblclick", {row:li.retrieve('row'), target:this, element:li});
/* 488  */ 	},
/* 489  */ 	
/* 490  */ 	onLoadData: function (data)
/* 491  */ 	{
/* 492  */ 		//this.hideLoader(); //u setData() jer mu nekad dosta treba da nacrta
/* 493  */ 			
/* 494  */ 		this.setData(data);
/* 495  */ 		
/* 496  */ 		// API
/* 497  */ 		this.fireEvent("loaddata", {target:this, pkey:data.pkey, data:data});	// jedino pkey salje van jer se on nigdje ne sprema trenutno unutar OMG
/* 498  */ 	},
/* 499  */ 		
/* 500  */ 	unique: function(a, asNumber)

/* omnigrid.js */

/* 501  */ 	{
/* 502  */ 		function om_sort_number(a, b)
/* 503  */ 		{
/* 504  */ 			return a - b;
/* 505  */ 		}
/* 506  */ 		
/* 507  */ 		var sf =  asNumber ? om_sort_number : function(){};
/* 508  */ 		
/* 509  */ 		a.sort( sf );
/* 510  */ 		
/* 511  */ 		for (var i = 1; i < a.length; i++)
/* 512  */ 		{
/* 513  */ 			if (a[i-1] == a[i])
/* 514  */ 			{
/* 515  */ 				a.splice(i, 1);
/* 516  */ 				i--;
/* 517  */ 			}
/* 518  */ 		}
/* 519  */ 		
/* 520  */ 		return a;
/* 521  */ 	},
/* 522  */ 	
/* 523  */ 	// API
/* 524  */ 	loadData: function (url)
/* 525  */ 	{
/* 526  */ 		if (!this.options.url && !this.options.dataProvider)
/* 527  */ 			return;
/* 528  */ 		
/* 529  */ 		var param = {};
/* 530  */ 		
/* 531  */ 		// ************* pagination *************************
/* 532  */ 		if (this.options.pagination)
/* 533  */ 			param = {page:this.options.page, perpage:this.options.perPage};
/* 534  */ 		
/* 535  */ 		// ************* server sorting *********************
/* 536  */ 		if (this.options.serverSort){
/* 537  */ 			param.sorton = this.options.sortOn;
/* 538  */ 			param.sortby = this.options.sortBy;
/* 539  */ 		}
/* 540  */ 		
/* 541  */ 		
/* 542  */ 		if (this.options.filterInput){
/* 543  */ 			var cfilter = this.container.getElement('input.cfilter');
/* 544  */ 			if (cfilter) param.filter = cfilter.value;
/* 545  */ 		}
/* 546  */ 		
/* 547  */ 		this.showLoader();
/* 548  */ 		
/* 549  */ 		if (this.options.dataProvider)
/* 550  */ 		{

/* omnigrid.js */

/* 551  */ 			// load data throw external class
/* 552  */ 			this.options.dataProvider(this, param);
/* 553  */ 		}else{
/* 554  */ 			var url = (url != null) ? url : this.options.url;
/* 555  */ 			var request = new Request.JSON({url:url, data:param});
/* 556  */ 
/* 557  */ 			request.addEvent("complete", this.onLoadData.bind(this) ) ;
/* 558  */ 
/* 559  */ 			request.get();
/* 560  */ 		}
/* 561  */ 	},
/* 562  */ 	
/* 563  */ 	// API
/* 564  */ 	refresh: function(){
/* 565  */ 		this.loadData();
/* 566  */ 	},
/* 567  */ 		
/* 568  */ 	// API
/* 569  */ 	setData: function(data, cm)
/* 570  */ 	{
/* 571  */ 		
/* 572  */ 		if (!data) return;
/* 573  */ 		
/* 574  */ 		this.options.data = data.data;
/* 575  */ 		
/* 576  */ 		// ako nije zadana columnModel napravi ga sam
/* 577  */ 		if (!this.options.columnModel) this.setAutoColumnModel();
/* 578  */ 		
/* 579  */ 		if (this.options.pagination)
/* 580  */ 		{
/* 581  */ 			this.options.page =  data.page*1;
/* 582  */ 			this.options.total =  data.total;
/* 583  */ 			this.options.maxpage = Math.ceil(this.options.total/this.options.perPage);
/* 584  */ 			
/* 585  */ 			this.container.getElement('div.pDiv input').value = data.page;
/* 586  */ 			var to = (data.page*this.options.perPage) > data.total ? data.total : (data.page*this.options.perPage);
/* 587  */ 			this.container.getElement('div.pDiv .pPageStat').set('html', ((data.page-1)*this.options.perPage+1)+'..'+to+' / '+data.total);
/* 588  */ 			this.container.getElement('div.pDiv .pcontrol span').set('html', this.options.maxpage);
/* 589  */ 		}
/* 590  */ 			
/* 591  */ 
/* 592  */ 		if (cm)
/* 593  */ 		{
/* 594  */ 			// first check is new columnModel different from active one
/* 595  */ 			if (this.options.columnModel != cm) 
/* 596  */ 			{
/* 597  */ 				this.options.columnModel = cm;
/* 598  */ 				// if we change columnModel then we must redraw entire component
/* 599  */ 				this.draw();
/* 600  */ 			}

/* omnigrid.js */

/* 601  */ 		}
/* 602  */ 		
/* 603  */ 		this.reset();
/* 604  */ 		
/* 605  */ 		this.hideLoader(); // kad je zavrsio sa loadanjem i crtanjem tek onda makni loader
/* 606  */ 	},
/* 607  */ 	
/* 608  */ 	// API
/* 609  */ 	getData: function(){
/* 610  */ 		return this.options.data;
/* 611  */ 	},
/* 612  */ 	
/* 613  */ 	// API
/* 614  */ 	getDataByRow: function(row){
/* 615  */ 		if (row >=0 && row<this.options.data.length)
/* 616  */ 			return this.options.data[row];
/* 617  */ 	},
/* 618  */ 	
/* 619  */ 	// API
/* 620  */ 	setDataByRow: function(row, data){
/* 621  */ 		if (row >=0 && row<this.options.data.length)
/* 622  */ 		{	
/* 623  */ 			this.options.data[row] = data;
/* 624  */ 			
/* 625  */ 			this.reset();
/* 626  */ 		}
/* 627  */ 	},
/* 628  */ 	
/* 629  */ 	// API
/* 630  */ 	setScroll: function(x, y)
/* 631  */ 	{
/* 632  */ 		var bDiv = this.container.getElement('.bDiv');
/* 633  */ 		
/* 634  */ 		new Fx.Scroll(bDiv).set(x, y);
/* 635  */ 	},
/* 636  */ 	
/* 637  */ 	// API
/* 638  */ 	addRow: function(data, row){
/* 639  */ 		if (row >=0)
/* 640  */ 		{	
/* 641  */ 			// ako podataci nisu inic. napravi novi array
/* 642  */ 			if (!this.options.data)
/* 643  */ 				this.options.data = [];
/* 644  */ 
/* 645  */ 			this.options.data.splice(row, 0, data);
/* 646  */ 
/* 647  */ 			this.reset();
/* 648  */ 		}
/* 649  */ 	},
/* 650  */ 	

/* omnigrid.js */

/* 651  */ 	// API
/* 652  */ 	deleteRow: function(row){
/* 653  */ 		if (row >=0 && row<this.options.data.length)
/* 654  */ 		{	
/* 655  */ 			this.options.data.splice(row, 1);
/* 656  */ 			this.reset();
/* 657  */ 		}
/* 658  */ 	},
/* 659  */ 	
/* 660  */ 	isHidden: function(i){
/* 661  */ 		return this.elements[i].hasClass( this.options.filterHideCls );
/* 662  */ 	},
/* 663  */ 	
/* 664  */ 	hideWhiteOverflow: function(i){
/* 665  */ 		if ( this.container.getElement('.gBlock') )
/* 666  */ 			this.container.getElement('.gBlock').dispose();
/* 667  */ 		
/* 668  */ 		var pReload = this.container.getElement('div.pDiv .pReload');
/* 669  */ 		if (pReload)
/* 670  */ 			pReload.removeClass('loading'); 
/* 671  */ 	},
/* 672  */ 	
/* 673  */ 	showWhiteOverflow: function(i){
/* 674  */ 		// ************* white overflow & loader ************
/* 675  */ 		if ( this.container.getElement('.gBlock') )
/* 676  */ 			this.container.getElement('.gBlock').dispose();
/* 677  */ 			
/* 678  */ 		var gBlock = new Element('div', {style:'top: 0px; left: 0px; background: white none repeat scroll 0% 0%;  -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; position: absolute; z-index: 999; opacity: 0.5; filter: alpha(opacity=50'} ) ;
/* 679  */ 		var bDiv = this.container.getElement('.bDiv');
/* 680  */ 		
/* 681  */ 		var top = 1;
/* 682  */ 		top += this.container.getElement('.tDiv') ? this.container.getElement('.tDiv').getSize().y : 0;
/* 683  */ 		top += this.container.getElement('.hDiv') ? this.container.getElement('.hDiv').getSize().y : 0;
/* 684  */ 		
/* 685  */ 		// height: (bDiv && bDiv.getSize().y ? bDiv.getSize().y:this.options.height)
/* 686  */ 		gBlock.setStyles({width:this.options.width, height: this.options.height-1, top:0});
/* 687  */ 		gBlock.addClass('gBlock');
/* 688  */ 		
/* 689  */ 		this.container.appendChild(gBlock);
/* 690  */ 		
/* 691  */ 		var pReload = this.container.getElement('div.pDiv .pReload');
/* 692  */ 		if (pReload)
/* 693  */ 			pReload.addClass('loading');
/* 694  */ 	},
/* 695  */ 		
/* 696  */ 	
/* 697  */ 	showLoader: function(){
/* 698  */ 		if (this.loader)
/* 699  */ 			return;
/* 700  */ 		

/* omnigrid.js */

/* 701  */ 		this.showWhiteOverflow(); // ovako bi cak mogao maknuti u sve staviti unutar showLoadera
/* 702  */ 		
/* 703  */ 		this.loader = new Element('div');
/* 704  */ 		
/* 705  */ 		this.loader.addClass('elementloader');
/* 706  */ 		this.loader.inject(this.container);
/* 707  */ 		
/* 708  */ 		// pozicioniranje loadera
/* 709  */ 		/*var gBlock = this.container.getElement('.gBlock');
/* 710  *| 		var sizeGBlock = gBlock.getSize();
/* 711  *| 
/* 712  *| 		var top = 0;
/* 713  *| 		top += this.container.getElement('.tDiv') ? this.container.getElement('.tDiv').getSize().y : 0;
/* 714  *| 		top += this.container.getElement('.hDiv') ? this.container.getElement('.hDiv').getSize().y : 0;
/* 715  *| 
/* 716  *| 		this.loader.setStyles({top:top+sizeGBlock.y/2-16, left: sizeGBlock.x/2});
/* 717  *| 		*/
/* 718  */ 		
/* 719  */ 		this.loader.setStyles({top:this.options.height/2-16, left:  this.options.width/2});
/* 720  */ 	},
/* 721  */ 	
/* 722  */ 	hideLoader: function(){
/* 723  */ 		if (!this.loader)
/* 724  */ 			return;
/* 725  */ 		
/* 726  */ 		this.hideWhiteOverflow();
/* 727  */ 		this.loader.dispose();
/* 728  */ 		this.loader = null;
/* 729  */ 		
/* 730  */ 	},
/* 731  */ 	
/* 732  */ 	// API
/* 733  */ 	selectAll: function(){
/* 734  */ 
/* 735  */ 		this.elements.each(function(el, i){ 
/* 736  */ 			this.selected.push(el.retrieve('row'));
/* 737  */ 			el.addClass('selected'); 
/* 738  */ 		}, this);
/* 739  */ 	},
/* 740  */ 	
/* 741  */ 	// API
/* 742  */ 	unselectAll: function(){
/* 743  */ 		this.elements.each(function(el, i){ 
/* 744  */ 			el.removeClass('selected'); 
/* 745  */ 		}, this);
/* 746  */ 		
/* 747  */ 		this.selected = [];
/* 748  */ 	},
/* 749  */ 	
/* 750  */ 	// API

/* omnigrid.js */

/* 751  */ 	getSelectedIndices: function(){
/* 752  */ 		return this.selected;
/* 753  */ 	},
/* 754  */ 	
/* 755  */ 	// API
/* 756  */ 	setSelectedIndices: function(arr){
/* 757  */ 		this.selected = arr;
/* 758  */ 		
/* 759  */ 		for (var i = 0; i < arr.length; i++) 
/* 760  */ 		{
/* 761  */ 			var li = this.elements[arr[i]];
/* 762  */ 			//el.addClass('selected');
/* 763  */ 			// simulate user click
/* 764  */ 			this.onRowClick({target:li.getFirst(), control:false}); 
/* 765  */ 		}
/* 766  */ 
/* 767  */ 	},
/* 768  */ 
/* 769  */ 	// mislim da je visak
/* 770  */ 	onMouseOver: function(obj){
/* 771  */ 		//alert(3);
/* 772  */ 		obj.columnModel.onMouseOver(obj.element, obj.data);
/* 773  */ 	},
/* 774  */ 	
/* 775  */ 	// API
/* 776  */ 	removeHeader: function(){
/* 777  */ 		var obj = this.container.getElement('.hDiv');
/* 778  */ 		
/* 779  */ 		if (obj) obj.empty();	//obj.set('html', '&nbsp;');
/* 780  */ 			
/* 781  */ 		this.options.columnModel = null;
/* 782  */ 	},	
/* 783  */ 	
/* 784  */ 	// API
/* 785  */ 	removeAll: function(){
/* 786  */ 		if (this.ulBody)
/* 787  */ 			this.ulBody.empty();
/* 788  */ 		
/* 789  */ 		this.selected = new Array();
/* 790  */ 		
/* 791  */ 		//this.options.data = null;
/* 792  */ 	},	
/* 793  */ 	
/* 794  */ 	// API
/* 795  */ 	setColumnModel: function(cmu){
/* 796  */ 		if ( !cmu )
/* 797  */ 			return;
/* 798  */ 				
/* 799  */ 		this.options.columnModel = cmu;	
/* 800  */ 		

/* omnigrid.js */

/* 801  */ 		this.draw();
/* 802  */ 	},
/* 803  */ 	
/* 804  */ 	// API
/* 805  */ 	setColumnProperty: function(columnName, property, value){
/* 806  */ 	
/* 807  */ 		var cmu = this.options.columnModel;
/* 808  */ 		
/* 809  */ 		if ( !cmu || !columnName || !property  ) return;
/* 810  */ 		
/* 811  */ 		columnName = columnName.toLowerCase();
/* 812  */ 		
/* 813  */ 		for (var i=0; i<cmu.length; i++)
/* 814  */ 		{
/* 815  */ 			if ( cmu[i].dataIndex.toLowerCase() == columnName )
/* 816  */ 			{
/* 817  */ 				cmu[i][property] = value;
/* 818  */ 				
/* 819  */ 				return;
/* 820  */ 			}
/* 821  */ 		}
/* 822  */ 	},
/* 823  */ 	
/* 824  */ 	// Automatsko odredivanje column modela ako nije zadan
/* 825  */ 	setAutoColumnModel: function(){
/* 826  */ 	
/* 827  */ 		if ( !this.options.data ) return;
/* 828  */ 			
/* 829  */ 		var rowCount = this.options.data.length;
/* 830  */ 		
/* 831  */ 		if ( !(rowCount>0) )
/* 832  */ 			return;
/* 833  */ 			
/* 834  */ 		this.options.columnModel = [];
/* 835  */ 		
/* 836  */ 		// uzmi schemu od prvog podatka
/* 837  */ 		for ( var cn in this.options.data[0] )
/* 838  */ 		{
/* 839  */ 			var dataType = typeof(this.options.data[0][cn]) == "number" ? "number" : "string";
/* 840  */ 			
/* 841  */ 			this.options.columnModel.push({header:cn, dataIndex:cn, dataType: dataType, editable:true});
/* 842  */ 		}
/* 843  */ 		
/* 844  */ 		this.fireEvent("autocolummodel", {target:this, columnModel:this.options.columnModel});
/* 845  */ 		
/* 846  */ 		this.draw();
/* 847  */ 	},
/* 848  */ 	
/* 849  */ 	// API
/* 850  */ 	setSize: function(w, h){

/* omnigrid.js */

/* 851  */ 		
/* 852  */ 		// Width
/* 853  */ 		this.options.width = w ? w : this.options.width;
/* 854  */ 		
/* 855  */ 		this.container.setStyle('width', this.options.width);
/* 856  */ 		
/* 857  */ 		var width = this.options.width-2;
/* 858  */ 		if (this.options.buttons) this.container.getElement('.tDiv').setStyle('width', width);
/* 859  */ 		
/* 860  */ 		var hDiv = this.container.getElement('.hDiv');
/* 861  */ 		if (this.options.showHeader && hDiv) hDiv.setStyle('width', width);
/* 862  */ 		
/* 863  */ 		var bodyEl = this.container.getElement('.bDiv');
/* 864  */ 		bodyEl.setStyle('width', width);
/* 865  */ 		this.container.getElement('.pDiv').setStyle('width', width);
/* 866  */ 		
/* 867  */ 		// Height
/* 868  */ 		this.options.height = h ? h : this.options.height;
/* 869  */ 
/* 870  */ 		bodyEl.setStyle('height', this.getBodyHeight() );
/* 871  */ 		this.container.setStyle('height', this.options.height);
/* 872  */ 		
/* 873  */ 		// ako je kojim slucajem whiteOverflow namjesti
/* 874  */ 		var gBlock = this.container.getElement('.gBlock');
/* 875  */ 		if (gBlock)
/* 876  */ 			gBlock.setStyles({width:this.options.width, height: bodyEl.getSize().y });
/* 877  */ 	},
/* 878  */ 	
/* 879  */ 	onBodyScroll: function(){
/* 880  */ 		var hbox = this.container.getElement('.hDivBox');
/* 881  */ 		
/* 882  */ 		var bbox = this.container.getElement('.bDiv');
/* 883  */ 		
/* 884  */ 		var xs = bbox.getScroll().x;
/* 885  */ 		
/* 886  */ 		//hbox.setStyle('position', 'relative');
/* 887  */ 		hbox.setStyle('left', -xs);
/* 888  */ 
/* 889  */ 		this.rePosDrag();
/* 890  */ 		//console.debug(xs);
/* 891  */ 	},
/* 892  */ 	
/* 893  */ 	onBodyClick: function(){
/* 894  */ 		
/* 895  */ 	},	
/* 896  */ 	
/* 897  */ 	onBodyMouseOver: function(){
/* 898  */ 		//console.debug(this.onBodyScrollID);
/* 899  */ 		
/* 900  */ 	},	

/* omnigrid.js */

/* 901  */ 	
/* 902  */ 	onBodyMouseOut: function(){
/* 903  */ 		
/* 904  */ 	},	
/* 905  */ 	
/* 906  */ 	// ************************************************************************
/* 907  */ 	// ************************* Drag columns events **************************
/* 908  */ 	// ************************************************************************
/* 909  */ 	
/* 910  */ 	rePosDrag: function(){
/* 911  */ 		if (!this.options.resizeColumns)
/* 912  */ 			return;
/* 913  */ 			
/* 914  */ 		var dragTempWidth = 0;
/* 915  */ 		var cDrags = this.container.getElements('.cDrag div');
/* 916  */ 		
/* 917  */ 		var scrollX = this.container.getElement('div.bDiv').getScroll().x;
/* 918  */ 		
/* 919  */ 		for (var c = 0; c < this.options.columnModel.length; c++) {
/* 920  */ 			var columnModel = this.options.columnModel[c];
/* 921  */ 			
/* 922  */ 			//if (columnModel.hidden) continue;
/* 923  */ 			
/* 924  */ 			// hidden-1
/* 925  */ 			var dragSt = cDrags[c];
/* 926  */ 		
/* 927  */ 			dragSt.setStyle('left', dragTempWidth+columnModel.width +1 -scrollX);
/* 928  */ 			//console.log(dragTempWidth+columnModel.width+2);
/* 929  */ 			
/* 930  */ 			if (!columnModel.hidden)
/* 931  */ 				dragTempWidth += columnModel.width;
/* 932  */ 		}
/* 933  */ 	},
/* 934  */ 	
/* 935  */ 	onColumnDragComplete: function(target){
/* 936  */ 		this.dragging = false;
/* 937  */ 		
/* 938  */ 		var colindex = target.retrieve('column');
/* 939  */ 		
/* 940  */ 		// nadi poziciju prvo
/* 941  */ 		var cDrag = this.container.getElement('div.cDrag');
/* 942  */ 		var dragSt = cDrag.getElements('div')[colindex];
/* 943  */ 		var scrollX = this.container.getElement('div.bDiv').getScroll().x;
/* 944  */ 		
/* 945  */ 		// izracunaj nove ukupne duljine 
/* 946  */ 		this.sumWidth = 0;
/* 947  */ 		for (var c = 0; c < this.options.columnModel.length; c++) {
/* 948  */ 			var columnModel = this.options.columnModel[c];
/* 949  */ 			
/* 950  */ 			//if (columnModel.hidden) continue;

/* omnigrid.js */

/* 951  */ 
/* 952  */ 			if (c == colindex)
/* 953  */ 			{
/* 954  */ 				// nova vrijednost pomaknute kolone
/* 955  */ 				var pos = dragSt.getStyle('left').toInt()+scrollX-this.sumWidth-(Browser.Engine.trident ? -1 : 1 ); // zato sto je u dragSt.left +2
/* 956  */ 			}else if (!columnModel.hidden)			
/* 957  */ 				this.sumWidth += columnModel.width;
/* 958  */ 		}
/* 959  */ 		//console.log(pos);
/* 960  */ 		
/* 961  */ 		if (pos<30) // minimalna velicina kolone
/* 962  */ 			pos = 30;
/* 963  */ 		
/* 964  */ 		this.options.columnModel[colindex].width = pos;
/* 965  */ 		
/* 966  */ 		this.sumWidth += pos;
/* 967  */ 		//console.log(this.sumWidth);
/* 968  */ 		
/* 969  */ 		this.ulBody.setStyle('width', this.sumWidth+this.visibleColumns*(Browser.Engine.trident ? 1 : 1 ));
/* 970  */ 		var hDivBox = this.container.getElement('div.hDivBox');
/* 971  */ 		
/* 972  */ 		hDivBox.setStyle('width', this.sumWidth+this.visibleColumns*2);
/* 973  */ 	
/* 974  */ 		// header
/* 975  */ 		var columns = hDivBox.getElements('div.th');
/* 976  */ 		var columnObj = columns[colindex];
/* 977  */ 		
/* 978  */ 		columnObj.setStyle('width', pos-(Browser.Engine.trident ? 6 : 6 ));
/* 979  */ 
/* 980  */ 		var visibleColumns = this.visibleColumns; // radi this. u each-u
/* 981  */ 		
/* 982  */ 		// radi accordiana
/* 983  */ 		var elements = this.ulBody.getElements('li.tr');
/* 984  */ 
/* 985  */ 		// sve kolone u body
/* 986  */ 		elements.each(function(el, i){
/* 987  */ 			el.setStyle('width', this.sumWidth+2*visibleColumns); // inace se Div-ovi wrapaju
/* 988  */ 			
/* 989  */ 			if (!el.hasClass('section'))	
/* 990  */ 			{
/* 991  */ 				var columns = el.getElements('div.td');
/* 992  */ 				var columnObj = columns[colindex];
/* 993  */ 				columnObj.setStyle('width', pos-(Browser.Engine.trident ? 6 : 6 ));
/* 994  */ 			}
/* 995  */ 			
/* 996  */ 		});
/* 997  */ 		
/* 998  */ 		this.rePosDrag();		
/* 999  */ 	},
/* 1000 */ 	

/* omnigrid.js */

/* 1001 */ 	onColumnDragStart: function(target){
/* 1002 */ 		this.dragging = true;
/* 1003 */ 	},
/* 1004 */ 	
/* 1005 */ 	onColumnDragging: function(target){
/* 1006 */ 		target.setStyle('top', 1);
/* 1007 */ 	},
/* 1008 */ 	
/* 1009 */ 	overDragColumn: function(evt){
/* 1010 */ 		evt.target.addClass('dragging');
/* 1011 */ 	},
/* 1012 */ 	
/* 1013 */ 	outDragColumn: function(evt){
/* 1014 */ 		evt.target.removeClass('dragging');
/* 1015 */ 	},
/* 1016 */ 	
/* 1017 */ 	// ************************************************************************
/* 1018 */ 	// ************************* Header events ********************************
/* 1019 */ 	// ************************************************************************
/* 1020 */ 
/* 1021 */ 	clickHeaderColumn: function(evt){
/* 1022 */ 		if (this.dragging) return;
/* 1023 */ 		
/* 1024 */ 		var colindex = evt.target.retrieve('column');
/* 1025 */ 		var columnModel = this.options.columnModel[colindex];
/* 1026 */ 		
/* 1027 */ 		evt.target.removeClass(columnModel.sort);
/* 1028 */ 		columnModel.sort = (columnModel.sort == 'ASC') ? 'DESC' : 'ASC';
/* 1029 */ 		evt.target.addClass(columnModel.sort);
/* 1030 */ 
/* 1031 */ 		//hidden-1
/* 1032 */ 		this.sort(colindex);
/* 1033 */ 	},
/* 1034 */ 	
/* 1035 */ 	overHeaderColumn: function(evt){
/* 1036 */ 		if (this.dragging) return;
/* 1037 */ 		
/* 1038 */ 		var colindex = evt.target.retrieve('column');
/* 1039 */ 		var columnModel = this.options.columnModel[colindex];
/* 1040 */ 
/* 1041 */ 		evt.target.addClass(columnModel.sort);
/* 1042 */ 	},
/* 1043 */ 	
/* 1044 */ 	outHeaderColumn: function(evt){
/* 1045 */ 		if (this.dragging) return;
/* 1046 */ 		
/* 1047 */ 		var colindex = evt.target.retrieve('column');
/* 1048 */ 		var columnModel = this.options.columnModel[colindex];
/* 1049 */ 		
/* 1050 */ 		evt.target.removeClass(columnModel.sort);

/* omnigrid.js */

/* 1051 */ 	},
/* 1052 */ 	
/* 1053 */ 	getBodyHeight: function(){
/* 1054 */ 		// da ukupna visina cijelog grida bude this.options.height za body moramo oduzeti header
/* 1055 */ 		
/* 1056 */ 		// header
/* 1057 */ 		var headerHeight = this.options.showHeader ? 30+2 : 0;  //+2 radi bordera
/* 1058 */ 		
/* 1059 */ 		// toolbar
/* 1060 */ 		var toolbarHeight = this.options.buttons ? this.container.getElement('.tDiv').getStyle('height').toInt() : 0;
/* 1061 */ 
/* 1062 */ 		// pagination toolbar height 25px + 1px bottom border
/* 1063 */ 		var paginationToolbar = this.options.pagination ? 30 : 0;
/* 1064 */ 			
/* 1065 */ 		return this.options.height-headerHeight-toolbarHeight-paginationToolbar-2; //+2 radi bordera
/* 1066 */ 	},		
/* 1067 */ 	
/* 1068 */ 	renderData: function(){
/* 1069 */ 		this.ulBody.empty();
/* 1070 */ 		this.inlineEditSafe = null;
/* 1071 */ 		
/* 1072 */ 		if (this.options.data && this.options.data.length)
/* 1073 */ 		{
/* 1074 */ 			
/* 1075 */ 			var columnCount = this.options.columnModel.length;
/* 1076 */ 			var rowCount = this.options.data.length;
/* 1077 */ 			
/* 1078 */ 			for (var r=0; r<rowCount; r++)
/* 1079 */ 			{
/* 1080 */ 				var rowdata = this.options.data[r];
/* 1081 */ 				
/* 1082 */ 				var li = new Element('li');
/* 1083 */ 				li.setStyle('width', this.sumWidth+2*this.visibleColumns); // inace se Div-ovi wrapaju, a u IE nastaje cudan 1px border ispod LI el.
/* 1084 */ 				li.store('row', r);
/* 1085 */ 				li.addClass('tr');
/* 1086 */ 				
/* 1087 */ 				//adiciona classe customizada na linha
/* 1088 */ 				if(rowdata._rowclass){
/* 1089 */ 					li.addClass(rowdata._rowclass);
/* 1090 */ 				}
/* 1091 */ 
/* 1092 */ 				
/* 1093 */ 				this.ulBody.appendChild(li);
/* 1094 */ 				
/* 1095 */ 				if (this.options.tooltip)
/* 1096 */ 				{
/* 1097 */ 					this.options.tooltip.attach( tr );											
/* 1098 */ 				}
/* 1099 */ 				
/* 1100 */ 				var firstvisible = -1;

/* omnigrid.js */

/* 1101 */ 				for (var c=0; c<columnCount; c++)
/* 1102 */ 				{
/* 1103 */ 					var columnModel = this.options.columnModel[c];
/* 1104 */ 					
/* 1105 */ 					//if (columnModel.hidden)
/* 1106 */ 					//	continue;
/* 1107 */ 					
/* 1108 */ 					var div = new Element('div');
/* 1109 */ 					div.addClass('td');
/* 1110 */ 					div.setStyle('width', columnModel.width-11); // zbog paddinga u ff
/* 1111 */ 					//div.setStyle('overflow-x', 'hidden');
/* 1112 */ 						
/* 1113 */ 					li.appendChild(div);
/* 1114 */ 					
/* 1115 */ 					firstvisible = (!columnModel.hidden && firstvisible == -1) ? c : firstvisible;
/* 1116 */ 					
/* 1117 */ 					var toggleicon = "";
/* 1118 */ 					if (firstvisible==c && this.options.accordion && this.options.showtoggleicon)
/* 1119 */ 					{					
/* 1120 */ 						toggleicon = "<div class='toggleicon'></div>";
/* 1121 */ 					}
/* 1122 */ 					
/* 1123 */ 					if (columnModel.hidden) div.setStyle('display', 'none');					
/* 1124 */ 					
/* 1125 */ 					if (columnModel.onMouseOver)
/* 1126 */ 					{
/* 1127 */ 						div.onmouseover = this.onMouseOver.bind(this, {element:div, columnModel:columnModel, data:rowdata });												
/* 1128 */ 					}
/* 1129 */ 					
/* 1130 */ 					// title
/* 1131 */ 					if (columnModel.title) div.title = rowdata[columnModel.title];
/* 1132 */ 
/* 1133 */ 					
/* 1134 */ 					if (columnModel.dataType == "checkbox")
/* 1135 */ 					{
/* 1136 */ 						
/* 1137 */ 						var input = new Element('input', {type:"checkbox"});
/* 1138 */ 							
/* 1139 */ 						
/* 1140 */ 						if (columnModel.onChange)
/* 1141 */ 						{
/* 1142 */ 							input.onclick = this.onSelect.bind(this, {columnModel:columnModel, row:r, input:input});												
/* 1143 */ 						}
/* 1144 */ 						
/* 1145 */ 						div.appendChild(input);
/* 1146 */ 						
/* 1147 */ 						var val = rowdata[columnModel.dataIndex];
/* 1148 */ 						if ( val == 1 || val=='t') {
/* 1149 */ 							input.set('checked', true);
/* 1150 */ 						}

/* omnigrid.js */

/* 1151 */ 					}else if (columnModel.labelFunction != null) {
/* 1152 */ 							div.innerHTML = columnModel.labelFunction(rowdata, r, columnModel);
/* 1153 */ 					}else {
/* 1154 */ 							var str = new String(rowdata[columnModel.dataIndex]); // mora biti string, jer ako dode 0 kao broj error
/* 1155 */ 
/* 1156 */ 							if (str == null || str == 'null' || str == 'undefined' || str == "" ) str = '&nbsp;';
/* 1157 */ 
/* 1158 */ 							var trimmed = str.replace(/^\s+|\s+$/g, ''); // ako je prazan string
/* 1159 */ 							if(trimmed.length==0) str = '&nbsp;';
/* 1160 */ 							
/* 1161 */ 							// Column text align propert.
/* 1162 */ 							// moram prije srediti racunanje width radi padding:0 kad se aling
/* 1163 */ 							if (columnModel.align){ 
/* 1164 */ 								div.setStyles({'text-align': columnModel.align});
/* 1165 */ 							}else if (columnModel.dataType == "image") {
/* 1166 */ 								div.setStyles({'text-align': 'center'});
/* 1167 */ 							}else if (columnModel.dataType == "date") {
/* 1168 */ 								div.setStyles({'text-align': 'center'});
/* 1169 */ 							}else if (columnModel.dataType == "number") {
/* 1170 */ 								div.setStyles({'text-align': 'right'});
/* 1171 */ 							}
/* 1172 */ 							
/* 1173 */ 							div.innerHTML = toggleicon+str;
/* 1174 */ 							
/* 1175 */ 							// *** reg. event to toggleicon ***
/* 1176 */ 							if (firstvisible==c && this.options.accordion && this.options.showtoggleicon)
/* 1177 */ 							{
/* 1178 */ 								div.getElement('.toggleicon').addEvent('click', this.toggleIconClick.bind(this));
/* 1179 */ 							}
/* 1180 */ 					}
/* 1181 */ 					
/* 1182 */ 				} // for column
/* 1183 */ 				
/* 1184 */ 				// ***********************
/* 1185 */ 				
/* 1186 */ 				if (this.options.accordion)
/* 1187 */ 				{
/* 1188 */ 				/*	var div = new Element('div');
/* 1189 *| 					div.addClass('section');
/* 1190 *| 					
/* 1191 *| 					li.appendChild(div);
/* 1192 *| 				*/
/* 1193 */ 					var li2 = new Element('li');
/* 1194 */ 					li2.addClass('section');
/* 1195 */ 					li2.addClass('section-'+r);
/* 1196 */ 					li2.setStyle('width', this.sumWidth+2*this.visibleColumns); // inace se Div-ovi wrapaju, a u IE nastaje cudan 1px border ispod LI el.
/* 1197 */ 					
/* 1198 */ 					this.ulBody.appendChild(li2);
/* 1199 */ 					
/* 1200 */ 					if (this.options.accordionRenderer)	

/* omnigrid.js */

/* 1201 */ 						this.options.accordionRenderer({parent:li2, row:r, grid:this, rowdata: rowdata});
/* 1202 */ 				}
/* 1203 */ 				
/* 1204 */ 			}
/* 1205 */ 		}
/* 1206 */ 	},
/* 1207 */ 	
/* 1208 */ 	// ************************************************************************
/* 1209 */ 	// ************************* Main draw function ***************************
/* 1210 */ 	// ************************************************************************
/* 1211 */ 	draw: function(){	
/* 1212 */ 		this.removeAll(); // reset variables and only empty ulBody 
/* 1213 */ 		this.container.empty(); // empty all 
/* 1214 */ 		
/* 1215 */ 		// ************************************************************************
/* 1216 */ 		// ************************* Common ***************************************
/* 1217 */ 		// ************************************************************************
/* 1218 */ 		var width = this.options.width - 2; //-2 radi borders
/* 1219 */ 		var columnCount = this.options.columnModel ? this.options.columnModel.length : 0;
/* 1220 */ 		
/* 1221 */ 		// ************************************************************************
/* 1222 */ 		// ************************* Container ************************************
/* 1223 */ 		// ************************************************************************
/* 1224 */ 		if (this.options.width)	this.container.setStyle('width', this.options.width);
/* 1225 */ 		
/* 1226 */ 		this.container.addClass('omnigrid');
/* 1227 */ 
/* 1228 */ 		// ************************************************************************
/* 1229 */ 		// ************************* Toolbar **************************************
/* 1230 */ 		// ************************************************************************
/* 1231 */ 		
/* 1232 */ 		if (this.options.buttons)
/* 1233 */ 		{
/* 1234 */ 			var tDiv = new Element('div');
/* 1235 */ 			tDiv.addClass('tDiv');
/* 1236 */ 			tDiv.setStyle('width', width); 
/* 1237 */ 			tDiv.setStyle('height', 30+(Browser.Engine.trident ? 2 : 0 ));// borderi u FF
/* 1238 */ 			this.container.appendChild(tDiv);
/* 1239 */ 			
/* 1240 */ 			var bt = this.options.buttons;
/* 1241 */ 			for (var i = 0; i < bt.length; i++) {
/* 1242 */ 				var fBt = new Element('div');
/* 1243 */ 				tDiv.appendChild(fBt);
/* 1244 */ 				if (bt[i].separator)
/* 1245 */ 				{
/* 1246 */ 					fBt.addClass('btnseparator');
/* 1247 */ 					continue;
/* 1248 */ 				}
/* 1249 */ 				
/* 1250 */ 				fBt.addClass('fbutton');

/* omnigrid.js */

/* 1251 */ 				
/* 1252 */ 				var cBt = new Element('div');
/* 1253 */ 				cBt.addEvent('click', bt[i].onclick.bind(this, [bt[i].bclass, this])); 
/* 1254 */ 				cBt.addEvent('mouseover', function(){this.addClass('fbOver'); }); 
/* 1255 */ 				cBt.addEvent('mouseout', function(){this.removeClass('fbOver'); }); 
/* 1256 */ 				
/* 1257 */ 				fBt.appendChild(cBt);
/* 1258 */ 				
/* 1259 */ 				var spanBt = new Element('span');
/* 1260 */ 				spanBt.addClass(bt[i].bclass);
/* 1261 */ 				spanBt.setStyle('padding-left', 20 );
/* 1262 */ 				spanBt.set('html', bt[i].name);
/* 1263 */ 				cBt.appendChild(spanBt);
/* 1264 */ 			}
/* 1265 */ 		}
/* 1266 */ 		
/* 1267 */ 		// ************************************************************************
/* 1268 */ 		// ************************* Header ***************************************
/* 1269 */ 		// ************************************************************************
/* 1270 */ 		var hDiv = new Element('div');
/* 1271 */ 		hDiv.addClass('hDiv');
/* 1272 */ 		hDiv.setStyle('width', width ); // borderi u FF
/* 1273 */ 		this.container.appendChild(hDiv);
/* 1274 */ 		
/* 1275 */ 		var hDivBox = new Element('div');
/* 1276 */ 		hDivBox.addClass('hDivBox');
/* 1277 */ 		
/* 1278 */ 		hDiv.appendChild(hDivBox);
/* 1279 */ 		
/* 1280 */ 		this.sumWidth = 0;
/* 1281 */ 		this.visibleColumns = 0; // razlikuje se od columnCount jer podaci za neke kolone su ocitani ali se ne prikazuju, npr. bitno kod li width
/* 1282 */ 		for (var c = 0; c < columnCount; c++) {
/* 1283 */ 			var columnModel = this.options.columnModel[c];
/* 1284 */ 			
/* 1285 */ 			var div = new Element('div');
/* 1286 */ 			// ******************************************
/* 1287 */ 			// ****** default postavke columnModela *****
/* 1288 */ 			if (columnModel.width == null)  this.options.columnModel[c].width = 100; 
/* 1289 */ 			columnModel.sort = 'ASC'; 
/* 1290 */ 			// ******************************************
/* 1291 */ 
/* 1292 */ 			
/* 1293 */ 			// ********************** Header events **************************
/* 1294 */ 			if (this.options.sortHeader)
/* 1295 */ 			{
/* 1296 */ 				div.addEvent('click', this.clickHeaderColumn.bind(this));
/* 1297 */ 				div.addEvent('mouseout', this.outHeaderColumn.bind(this));
/* 1298 */ 				div.addEvent('mouseover', this.overHeaderColumn.bind(this));
/* 1299 */ 			}
/* 1300 */ 			

/* omnigrid.js */

/* 1301 */ 			div.store('column', c);
/* 1302 */ 			div.store('dataType', columnModel.dataType);
/* 1303 */ 			div.addClass('th');
/* 1304 */ 			div.setStyle('width', columnModel.width-11);
/* 1305 */ 			hDivBox.appendChild(div);
/* 1306 */ 	
/* 1307 */ 			if (columnModel.hidden) 
/* 1308 */ 				div.setStyle('display', 'none');
/* 1309 */ 			else{
/* 1310 */ 				this.sumWidth += columnModel.width;
/* 1311 */ 				this.visibleColumns++;
/* 1312 */ 			}
/* 1313 */ 			
/* 1314 */ 			var header = columnModel.header;
/* 1315 */ 			
/* 1316 */ 			if (header){
/* 1317 */ 				div.innerHTML = header;
/* 1318 */ 				
/* 1319 */ 				if(!columnModel.hidden){
/* 1320 */ 					// Column text align propert.
/* 1321 */ 					if (columnModel.align){ 
/* 1322 */ 						div.setStyles({'text-align': columnModel.align});
/* 1323 */ 					}else if (columnModel.dataType == "image") {
/* 1324 */ 						div.setStyles({'text-align': 'center'});
/* 1325 */ 					}else if (columnModel.dataType == "date") {
/* 1326 */ 						div.setStyles({'text-align': 'center'});
/* 1327 */ 					}else if (columnModel.dataType == "number") {
/* 1328 */ 						div.setStyles({'text-align': 'right'});
/* 1329 */ 					}
/* 1330 */ 				}
/* 1331 */ 			}
/* 1332 */ 		}
/* 1333 */ 		hDivBox.setStyle('width', this.sumWidth+this.visibleColumns*2);
/* 1334 */ 		if (!this.options.showHeader)
/* 1335 */ 			hDiv.setStyle('display', 'none');
/* 1336 */ 		// ************************************************************************
/* 1337 */ 		// ************************* Column size drag *****************************
/* 1338 */ 		// ************************************************************************
/* 1339 */ 		
/* 1340 */ 		// odredivanje visine body dijela
/* 1341 */ 		
/* 1342 */ 		if (this.options.height)
/* 1343 */ 		{
/* 1344 */ 			var bodyHeight = this.getBodyHeight();
/* 1345 */ 			this.container.setStyle('height', this.options.height);
/* 1346 */ 		}
/* 1347 */ 		
/* 1348 */ 		if (this.options.resizeColumns)
/* 1349 */ 		{
/* 1350 */ 			var cDrag = new Element('div');

/* omnigrid.js */

/* 1351 */ 			cDrag.addClass('cDrag');
/* 1352 */ 			var toolbarHeight = this.options.buttons ? tDiv.getStyle('height').toInt() : 0; // toolbar
/* 1353 */ 			cDrag.setStyle('top', toolbarHeight);
/* 1354 */ 			this.container.appendChild(cDrag);
/* 1355 */ 			
/* 1356 */ 			var dragTempWidth = 0;
/* 1357 */ 			for (var c = 0; c < columnCount; c++) {
/* 1358 */ 				var columnModel = this.options.columnModel[c];
/* 1359 */ 				
/* 1360 */ 				//if (columnModel.hidden) continue;
/* 1361 */ 					
/* 1362 */ 				var dragSt = new Element('div');
/* 1363 */ 				
/* 1364 */ 				//alert(dragTempWidth+' '+columnModel.width);
/* 1365 */ 				// -(Browser.Engine.trident ? 10 : 0 )
/* 1366 */ 				var headerHeight = this.options.showHeader ? 30+2 : 0; // +2 border
/* 1367 */ 				
/* 1368 */ 				dragSt.setStyles({top:1,left: dragTempWidth+columnModel.width, height: headerHeight, display:'block'}); // bodyHeight+
/* 1369 */ 				dragSt.store('column', c);
/* 1370 */ 				cDrag.appendChild(dragSt);
/* 1371 */ 				
/* 1372 */ 				// Events
/* 1373 */ 				dragSt.addEvent('mouseout', this.outDragColumn.bind(this));
/* 1374 */ 				dragSt.addEvent('mouseover', this.overDragColumn.bind(this));
/* 1375 */ 				
/* 1376 */ 				var dragMove = new Drag(dragSt, {snap:0}); // , {container: this.container.getElement('.cDrag') }
/* 1377 */ 				dragMove.addEvent('drag', this.onColumnDragging.bind(this) );
/* 1378 */ 				dragMove.addEvent('start', this.onColumnDragStart.bind(this) );
/* 1379 */ 				dragMove.addEvent('complete', this.onColumnDragComplete.bind(this) );
/* 1380 */ 				
/* 1381 */ 				
/* 1382 */ 				if (columnModel.hidden) 
/* 1383 */ 					dragSt.setStyle('display', 'none');
/* 1384 */ 				else
/* 1385 */ 					dragTempWidth += columnModel.width;
/* 1386 */ 			}
/* 1387 */ 		}
/* 1388 */ 		
/* 1389 */ 		// ************************************************************************
/* 1390 */ 		// ************************* Body *****************************************
/* 1391 */ 		// ************************************************************************
/* 1392 */ 		
/* 1393 */ 		var bDiv = new Element('div');
/* 1394 */ 		bDiv.addClass('bDiv');
/* 1395 */ 		
/* 1396 */ 		if (this.options.width)
/* 1397 */ 			bDiv.setStyle('width', width);
/* 1398 */ 
/* 1399 */ 		bDiv.setStyle('height', bodyHeight);	
/* 1400 */ 		this.container.appendChild(bDiv);

/* omnigrid.js */

/* 1401 */ 
/* 1402 */ 		//  scroll event
/* 1403 */ 		this.onBodyScrollBind = this.onBodyScroll.bind(this);
/* 1404 */ 		bDiv.addEvent('scroll', this.onBodyScrollBind);
/* 1405 */ 		//alert(this.visibleColumns);
/* 1406 */ 		this.ulBody = new Element('ul');
/* 1407 */ 		this.ulBody.setStyle('width', this.sumWidth+this.visibleColumns*(Browser.Engine.trident ? 1 : 1 )); // da se ne vidi visak, ul je overflow hidden
/* 1408 */ 		bDiv.appendChild(this.ulBody);
/* 1409 */ 
/* 1410 */ 
/* 1411 */ 		if (this.options.pagination && !this.container.getElement('div.pDiv') )
/* 1412 */ 		{
/* 1413 */ 			var pDiv = new Element('div');
/* 1414 */ 			pDiv.addClass('pDiv');
/* 1415 */ 			pDiv.setStyle('width', width); 
/* 1416 */ 			pDiv.setStyle('height', 30);
/* 1417 */ 			this.container.appendChild(pDiv);
/* 1418 */ 			
/* 1419 */ 			var pDiv2 = new Element('div');
/* 1420 */ 			pDiv2.addClass('pDiv2');
/* 1421 */ 			pDiv.appendChild(pDiv2);
/* 1422 */ 			
/* 1423 */ 			var h = '<div class="pGroup"><select class="rp" name="rp">';
/* 1424 */ 			
/* 1425 */ 			// *****
/* 1426 */ 			var optIdx;
/* 1427 */ 			var setDefaultPerPage = false;
/* 1428 */ 			for (optIdx=0; optIdx<this.options.perPageOptions.length; optIdx++)
/* 1429 */ 			{
/* 1430 */ 				if (this.options.perPageOptions[optIdx] != this.options.perPage)
/* 1431 */ 					h += '<option value="' + this.options.perPageOptions[optIdx] + '">' + this.options.perPageOptions[optIdx] +'</option>';
/* 1432 */ 				else{
/* 1433 */ 					setDefaultPerPage = true;
/* 1434 */ 					h += '<option selected="selected" value="' + this.options.perPageOptions[optIdx] + '">' + this.options.perPageOptions[optIdx] +'</option>' ;
/* 1435 */ 				}
/* 1436 */ 			}
/* 1437 */ 			// *****
/* 1438 */ 
/* 1439 */ 			h += '</select></div>';
/* 1440 */ 			
/* 1441 */ 			h += '<div class="btnseparator"></div><div class="pGroup"><div class="pFirst pButton"></div><div class="pPrev pButton"></div></div>';
/* 1442 */ 			h += '<div class="btnseparator"></div><div class="pGroup"><span class="pcontrol"><input class="cpage" type="text" value="1" size="4" style="text-align:center"/> / <span></span></span></div>';
/* 1443 */ 			h += '<div class="btnseparator"></div><div class="pGroup"><div class="pNext pButton"></div><div class="pLast pButton"></div></div>';
/* 1444 */ 			h += '<div class="btnseparator"></div><div class="pGroup"><div class="pReload pButton"></div></div>';
/* 1445 */ 			h += '<div class="btnseparator"></div><div class="pGroup"><span class="pPageStat"></div>';
/* 1446 */ 			
/* 1447 */ 			if (this.options.filterInput) h += '<div class="btnseparator"></div><div class="pGroup"><span class="pcontrol"><input class="cfilter" type="text" value="" style="" /><span></div>';
/* 1448 */ 			
/* 1449 */ 			pDiv2.innerHTML = h;
/* 1450 */ 

/* omnigrid.js */

/* 1451 */ 			// set this.options.perPage value from this.options.perPageOptions array
/* 1452 */ 			var rpObj = pDiv2.getElement('.rp');
/* 1453 */ 			if (!setDefaultPerPage && rpObj.options.length>0)
/* 1454 */ 			{
/* 1455 */ 				this.options.perPage = rpObj.options[0].value;
/* 1456 */ 				rpObj.options[0].selected = true;
/* 1457 */ 			}
/* 1458 */ 			// ********
/* 1459 */ 
/* 1460 */ 			pDiv2.getElement('.pFirst').addEvent('click', this.firstPage.bind(this) );
/* 1461 */ 			pDiv2.getElement('.pPrev').addEvent('click', this.prevPage.bind(this) );
/* 1462 */ 			pDiv2.getElement('.pNext').addEvent('click', this.nextPage.bind(this) );
/* 1463 */ 			pDiv2.getElement('.pLast').addEvent('click', this.lastPage.bind(this) );
/* 1464 */ 			pDiv2.getElement('.pReload').addEvent('click', this.refresh.bind(this) );
/* 1465 */ 			pDiv2.getElement('.rp').addEvent('change', this.perPageChange.bind(this));
/* 1466 */ 			pDiv2.getElement('input.cpage').addEvent('keyup', this.pageChange.bind(this) );
/* 1467 */ 			
/* 1468 */ 			if (this.options.filterInput) pDiv2.getElement('input.cfilter').addEvent('change', this.firstPage.bind(this) ); // goto 1 & refresh
/* 1469 */ 		}
/* 1470 */ 
/* 1471 */ 	},
/* 1472 */ 	
/* 1473 */ 	firstPage: function(){
/* 1474 */ 		this.options.page = 1;		
/* 1475 */ 		this.refresh();
/* 1476 */ 	},
/* 1477 */ 	
/* 1478 */ 	prevPage: function(){
/* 1479 */ 		if (this.options.page>1){
/* 1480 */ 			this.options.page--;		
/* 1481 */ 			this.refresh();
/* 1482 */ 		}
/* 1483 */ 	},
/* 1484 */ 	
/* 1485 */ 	nextPage: function(){
/* 1486 */ 
/* 1487 */ 		if( (this.options.page+1) > this.options.maxpage)
/* 1488 */ 			return;
/* 1489 */ 		
/* 1490 */ 		this.options.page++;		
/* 1491 */ 		this.refresh();
/* 1492 */ 	},
/* 1493 */ 		
/* 1494 */ 	lastPage: function(){
/* 1495 */ 		this.options.page = this.options.maxpage;		
/* 1496 */ 		this.refresh();
/* 1497 */ 	},
/* 1498 */ 	
/* 1499 */ 	perPageChange: function(){
/* 1500 */ 		this.options.page = 1;

/* omnigrid.js */

/* 1501 */ 		this.options.perPage = this.container.getElement('.rp').value;		
/* 1502 */ 		this.refresh();
/* 1503 */ 	},
/* 1504 */ 		
/* 1505 */ 	pageChange: function(){
/* 1506 */ 		
/* 1507 */ 		var np = this.container.getElement('div.pDiv2 input').value;
/* 1508 */ 		
/* 1509 */ 		if (np>0 && np<=this.options.maxpage)
/* 1510 */ 		{
/* 1511 */ 			if (this.refreshDelayID)
/* 1512 */ 				$clear(this.refreshDelayID)
/* 1513 */ 			
/* 1514 */ 			this.options.page = np;
/* 1515 */ 			
/* 1516 */ 			this.refreshDelayID = this.refresh.delay(1000, this);
/* 1517 */ 		}
/* 1518 */ 	},
/* 1519 */ 	
/* 1520 */ 	// API
/* 1521 */ 	gotoPage: function(p){
/* 1522 */ 		if (p>0 && p<=this.options.maxpage)
/* 1523 */ 		{
/* 1524 */ 			this.options.page = p;
/* 1525 */ 			
/* 1526 */ 			this.refresh();
/* 1527 */ 		}
/* 1528 */ 	},
/* 1529 */ 	
/* 1530 */ 	setPerPage: function(p){
/* 1531 */ 		if (p>0)
/* 1532 */ 		{
/* 1533 */ 			this.options.perPage = p;
/* 1534 */ 			
/* 1535 */ 			this.refresh();
/* 1536 */ 		}
/* 1537 */ 	},
/* 1538 */ 	
/* 1539 */ 	// API, not doc
/* 1540 */ 	sort: function(index, by){
/* 1541 */ 		
/* 1542 */ 		if ( index<0 || index>=this.options.columnModel.length )
/* 1543 */ 			return;
/* 1544 */ 
/* 1545 */ 		if(this.options.onStart){
/* 1546 */ 			this.fireEvent('onStart');
/* 1547 */ 		}
/* 1548 */ 		
/* 1549 */ 		//
/* 1550 */ 		var header = this.container.getElements('.th');

/* omnigrid.js */

/* 1551 */ 		var el = header[index];
/* 1552 */ 		
/* 1553 */ 		if (by != null)
/* 1554 */ 			el.addClass(by.toLowerCase());
/* 1555 */ 		
/* 1556 */ 		if(el.hasClass('ASC')){
/* 1557 */ 			el.sortBy = 'ASC';
/* 1558 */ 		}else if(el.hasClass('DESC')){
/* 1559 */ 			el.sortBy = 'DESC';
/* 1560 */ 		}
/* 1561 */ 		
/* 1562 */ 		if (this.options.serverSort){
/* 1563 */ 			this.options.sortOn = this.options.columnModel[index].dataIndex;
/* 1564 */ 			this.options.sortBy = el.sortBy;
/* 1565 */ 			
/* 1566 */ 			this.refresh();
/* 1567 */ 		}else{
/* 1568 */ 			// Sorting...
/* 1569 */ 			this.elements.sort(el.compare);
/* 1570 */ 			this.elements.injectInside(this.ulBody);
/* 1571 */ 			
/* 1572 */ 			// Update selection array because indices has been changed
/* 1573 */ 			this.selected = new Array();
/* 1574 */ 			this.elements.each(function(el ,i){
/* 1575 */ 				if(el.hasClass('selected')){
/* 1576 */ 					this.selected.push(el.retrieve('row'));
/* 1577 */ 				}
/* 1578 */ 			}, this);
/* 1579 */ 			
/* 1580 */ 			// Filter
/* 1581 */ 			if(this.filtered){
/* 1582 */ 				this.filteredAltRow();
/* 1583 */ 			}else{
/* 1584 */ 				this.altRow();
/* 1585 */ 			}
/* 1586 */ 		}	
/* 1587 */ 	},
/* 1588 */ 	
/* 1589 */ 	altRow: function(){
/* 1590 */ 		this.elements.each(function(el,i){
/* 1591 */ 			
/* 1592 */ 			if(i % 2){
/* 1593 */ 				el.removeClass('erow');
/* 1594 */ 			}else{
/* 1595 */ 				el.addClass('erow');
/* 1596 */ 			}
/* 1597 */ 		});
/* 1598 */ 	},
/* 1599 */ 	
/* 1600 */ 	filteredAltRow: function(){

/* omnigrid.js */

/* 1601 */ 
/* 1602 */ 		this.ulBody.getElements('.'+this.options.filterSelectedCls).each(function(el,i){
/* 1603 */ 			if(i % 2){
/* 1604 */ 				el.removeClass('erow');
/* 1605 */ 			}else{
/* 1606 */ 				el.addClass('erow');
/* 1607 */ 			}
/* 1608 */ 		});
/* 1609 */ 	},
/* 1610 */ 	
/* 1611 */ 	// API
/* 1612 */ 	filter: function(form){
/* 1613 */ 		//var form = $(form);
/* 1614 */ 		var col = 0;
/* 1615 */ 		var key = '';
/* 1616 */ 		
/* 1617 */ 		if ( !(form.length>0) )
/* 1618 */ 			this.clearFilter();
/* 1619 */ 		
/* 1620 */ 		
/* 1621 */ 		key = form;
/* 1622 */ 		
/* 1623 */ 		if(key)
/* 1624 */ 		{			
/* 1625 */ 			for (var i=0; i<this.options.data.length; i++)
/* 1626 */ 			{
/* 1627 */ 				var dat = this.options.data[i];
/* 1628 */ 			
/* 1629 */ 				for (var c=0; c<this.options.columnModel.length; c++)
/* 1630 */ 				{
/* 1631 */ 					var columnModel = this.options.columnModel[c];
/* 1632 */ 					
/* 1633 */ 					if ( columnModel.type == "checkbox")
/* 1634 */ 						continue;
/* 1635 */ 					
/* 1636 */ 					var el = this.elements[i];
/* 1637 */ 					
/* 1638 */ 					if(this.options.filterHide){
/* 1639 */ 						el.removeClass('erow');
/* 1640 */ 					}
/* 1641 */ 					
/* 1642 */ 					if(dat[columnModel.dataIndex] != null && dat[columnModel.dataIndex].toLowerCase().indexOf(key) > -1)
/* 1643 */ 					{
/* 1644 */ 						el.addClass(this.options.filterSelectedCls);
/* 1645 */ 						if(this.options.filterHide){
/* 1646 */ 							el.removeClass(this.options.filterHideCls);
/* 1647 */ 						}
/* 1648 */ 						
/* 1649 */ 						break;
/* 1650 */ 					}else{

/* omnigrid.js */

/* 1651 */ 						el.removeClass(this.options.filterSelectedCls);
/* 1652 */ 						if(this.options.filterHide){
/* 1653 */ 							el.addClass(this.options.filterHideCls);
/* 1654 */ 						}
/* 1655 */ 					}
/* 1656 */ 				}				
/* 1657 */ 			}
/* 1658 */ 			
/* 1659 */ 			if(this.options.filterHide){
/* 1660 */ 				this.filteredAltRow();
/* 1661 */ 				this.filtered = true;
/* 1662 */ 			}
/* 1663 */ 		}
/* 1664 */ 	},
/* 1665 */ 	
/* 1666 */ 	// API
/* 1667 */ 	clearFilter: function(){
/* 1668 */ 		this.elements.each(function(el,i){
/* 1669 */ 			el.removeClass(this.options.filterSelectedCls);
/* 1670 */ 			if(this.options.filterHide){
/* 1671 */ 				el.removeClass(this.options.filterHideCls);
/* 1672 */ 			}
/* 1673 */ 		}, this);
/* 1674 */ 		if(this.options.filterHide){
/* 1675 */ 			this.altRow();
/* 1676 */ 			this.filtered = false;
/* 1677 */ 		}
/* 1678 */ 	}
/* 1679 */ 
/* 1680 */ });
/* 1681 */ 
/* 1682 */ 
/* 1683 */ /*************************************************************/
/* 1684 */ 
