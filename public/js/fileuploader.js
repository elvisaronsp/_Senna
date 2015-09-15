
/* fileuploader.js */

/* 1    */ /**
/* 2    *|  * http://github.com/valums/file-uploader
/* 3    *|  * 
/* 4    *|  * Multiple file upload component with progress-bar, drag-and-drop. 
/* 5    *|  * © 2010 Andrew Valums ( andrew(at)valums.com ) 
/* 6    *|  * 
/* 7    *|  * Licensed under GNU GPL 2 or later, see license.txt.
/* 8    *|  */    
/* 9    */ 
/* 10   */ //
/* 11   */ // Helper functions
/* 12   */ //
/* 13   */ 
/* 14   */ var qq = qq || {};
/* 15   */ 
/* 16   */ /**
/* 17   *|  * Adds all missing properties from second obj to first obj
/* 18   *|  */ 
/* 19   */ qq.extend = function(first, second){
/* 20   */     for (var prop in second){
/* 21   */         first[prop] = second[prop];
/* 22   */     }
/* 23   */ };  
/* 24   */ 
/* 25   */ /**
/* 26   *|  * Searches for a given element in the array, returns -1 if it is not present.
/* 27   *|  * @param {Number} [from] The index at which to begin the search
/* 28   *|  */
/* 29   */ qq.indexOf = function(arr, elt, from){
/* 30   */     if (arr.indexOf) return arr.indexOf(elt, from);
/* 31   */     
/* 32   */     from = from || 0;
/* 33   */     var len = arr.length;    
/* 34   */     
/* 35   */     if (from < 0) from += len;  
/* 36   */ 
/* 37   */     for (; from < len; from++){  
/* 38   */         if (from in arr && arr[from] === elt){  
/* 39   */             return from;
/* 40   */         }
/* 41   */     }  
/* 42   */     return -1;  
/* 43   */ }; 
/* 44   */     
/* 45   */ qq.getUniqueId = (function(){
/* 46   */     var id = 0;
/* 47   */     return function(){ return id++; };
/* 48   */ })();
/* 49   */ 
/* 50   */ //

/* fileuploader.js */

/* 51   */ // Events
/* 52   */ 
/* 53   */ qq.attach = function(element, type, fn){
/* 54   */     if (element.addEventListener){
/* 55   */         element.addEventListener(type, fn, false);
/* 56   */     } else if (element.attachEvent){
/* 57   */         element.attachEvent('on' + type, fn);
/* 58   */     }
/* 59   */ };
/* 60   */ qq.detach = function(element, type, fn){
/* 61   */     if (element.removeEventListener){
/* 62   */         element.removeEventListener(type, fn, false);
/* 63   */     } else if (element.attachEvent){
/* 64   */         element.detachEvent('on' + type, fn);
/* 65   */     }
/* 66   */ };
/* 67   */ 
/* 68   */ qq.preventDefault = function(e){
/* 69   */     if (e.preventDefault){
/* 70   */         e.preventDefault();
/* 71   */     } else{
/* 72   */         e.returnValue = false;
/* 73   */     }
/* 74   */ };
/* 75   */ 
/* 76   */ //
/* 77   */ // Node manipulations
/* 78   */ 
/* 79   */ /**
/* 80   *|  * Insert node a before node b.
/* 81   *|  */
/* 82   */ qq.insertBefore = function(a, b){
/* 83   */     b.parentNode.insertBefore(a, b);
/* 84   */ };
/* 85   */ qq.remove = function(element){
/* 86   */     element.parentNode.removeChild(element);
/* 87   */ };
/* 88   */ 
/* 89   */ qq.contains = function(parent, descendant){       
/* 90   */     // compareposition returns false in this case
/* 91   */     if (parent == descendant) return true;
/* 92   */     
/* 93   */     if (parent.contains){
/* 94   */         return parent.contains(descendant);
/* 95   */     } else {
/* 96   */         return !!(descendant.compareDocumentPosition(parent) & 8);
/* 97   */     }
/* 98   */ };
/* 99   */ 
/* 100  */ /**

/* fileuploader.js */

/* 101  *|  * Creates and returns element from html string
/* 102  *|  * Uses innerHTML to create an element
/* 103  *|  */
/* 104  */ qq.toElement = (function(){
/* 105  */     var div = document.createElement('div');
/* 106  */     return function(html){
/* 107  */         div.innerHTML = html;
/* 108  */         var element = div.firstChild;
/* 109  */         div.removeChild(element);
/* 110  */         return element;
/* 111  */     };
/* 112  */ })();
/* 113  */ 
/* 114  */ //
/* 115  */ // Node properties and attributes
/* 116  */ 
/* 117  */ /**
/* 118  *|  * Sets styles for an element.
/* 119  *|  * Fixes opacity in IE6-8.
/* 120  *|  */
/* 121  */ qq.css = function(element, styles){
/* 122  */     if (styles.opacity != null){
/* 123  */         if (typeof element.style.opacity != 'string' && typeof(element.filters) != 'undefined'){
/* 124  */             styles.filter = 'alpha(opacity=' + Math.round(100 * styles.opacity) + ')';
/* 125  */         }
/* 126  */     }
/* 127  */     qq.extend(element.style, styles);
/* 128  */ };
/* 129  */ qq.hasClass = function(element, name){
/* 130  */     var re = new RegExp('(^| )' + name + '( |$)');
/* 131  */     return re.test(element.className);
/* 132  */ };
/* 133  */ qq.addClass = function(element, name){
/* 134  */     if (!qq.hasClass(element, name)){
/* 135  */         element.className += ' ' + name;
/* 136  */     }
/* 137  */ };
/* 138  */ qq.removeClass = function(element, name){
/* 139  */     var re = new RegExp('(^| )' + name + '( |$)');
/* 140  */     element.className = element.className.replace(re, ' ').replace(/^\s+|\s+$/g, "");
/* 141  */ };
/* 142  */ qq.setText = function(element, text){
/* 143  */     element.innerText = text;
/* 144  */     element.textContent = text;
/* 145  */ };
/* 146  */ 
/* 147  */ //
/* 148  */ // Selecting elements
/* 149  */ 
/* 150  */ qq.children = function(element){

/* fileuploader.js */

/* 151  */     var children = [],
/* 152  */     child = element.firstChild;
/* 153  */ 
/* 154  */     while (child){
/* 155  */         if (child.nodeType == 1){
/* 156  */             children.push(child);
/* 157  */         }
/* 158  */         child = child.nextSibling;
/* 159  */     }
/* 160  */ 
/* 161  */     return children;
/* 162  */ };
/* 163  */ 
/* 164  */ qq.getByClass = function(element, className){
/* 165  */     if (element.querySelectorAll){
/* 166  */         return element.querySelectorAll('.' + className);
/* 167  */     }
/* 168  */ 
/* 169  */     var result = [];
/* 170  */     var candidates = element.getElementsByTagName("*");
/* 171  */     var len = candidates.length;
/* 172  */ 
/* 173  */     for (var i = 0; i < len; i++){
/* 174  */         if (qq.hasClass(candidates[i], className)){
/* 175  */             result.push(candidates[i]);
/* 176  */         }
/* 177  */     }
/* 178  */     return result;
/* 179  */ };
/* 180  */ 
/* 181  */ /**
/* 182  *|  * obj2url() takes a json-object as argument and generates
/* 183  *|  * a querystring. pretty much like jQuery.param()
/* 184  *|  * 
/* 185  *|  * how to use:
/* 186  *|  *
/* 187  *|  *    `qq.obj2url({a:'b',c:'d'},'http://any.url/upload?otherParam=value');`
/* 188  *|  *
/* 189  *|  * will result in:
/* 190  *|  *
/* 191  *|  *    `http://any.url/upload?otherParam=value&a=b&c=d`
/* 192  *|  *
/* 193  *|  * @param  Object JSON-Object
/* 194  *|  * @param  String current querystring-part
/* 195  *|  * @return String encoded querystring
/* 196  *|  */
/* 197  */ qq.obj2url = function(obj, temp, prefixDone){
/* 198  */     var uristrings = [],
/* 199  */         prefix = '&',
/* 200  */         add = function(nextObj, i){

/* fileuploader.js */

/* 201  */             var nextTemp = temp 
/* 202  */                 ? (/\[\]$/.test(temp)) // prevent double-encoding
/* 203  */                    ? temp
/* 204  */                    : temp+'['+i+']'
/* 205  */                 : i;
/* 206  */             if ((nextTemp != 'undefined') && (i != 'undefined')) {  
/* 207  */                 uristrings.push(
/* 208  */                     (typeof nextObj === 'object') 
/* 209  */                         ? qq.obj2url(nextObj, nextTemp, true)
/* 210  */                         : (Object.prototype.toString.call(nextObj) === '[object Function]')
/* 211  */                             ? encodeURIComponent(nextTemp) + '=' + encodeURIComponent(nextObj())
/* 212  */                             : encodeURIComponent(nextTemp) + '=' + encodeURIComponent(nextObj)                                                          
/* 213  */                 );
/* 214  */             }
/* 215  */         }; 
/* 216  */ 
/* 217  */     if (!prefixDone && temp) {
/* 218  */       prefix = (/\?/.test(temp)) ? (/\?$/.test(temp)) ? '' : '&' : '?';
/* 219  */       uristrings.push(temp);
/* 220  */       uristrings.push(qq.obj2url(obj));
/* 221  */     } else if ((Object.prototype.toString.call(obj) === '[object Array]') && (typeof obj != 'undefined') ) {
/* 222  */         // we wont use a for-in-loop on an array (performance)
/* 223  */         for (var i = 0, len = obj.length; i < len; ++i){
/* 224  */             add(obj[i], i);
/* 225  */         }
/* 226  */     } else if ((typeof obj != 'undefined') && (obj !== null) && (typeof obj === "object")){
/* 227  */         // for anything else but a scalar, we will use for-in-loop
/* 228  */         for (var i in obj){
/* 229  */             add(obj[i], i);
/* 230  */         }
/* 231  */     } else {
/* 232  */         uristrings.push(encodeURIComponent(temp) + '=' + encodeURIComponent(obj));
/* 233  */     }
/* 234  */ 
/* 235  */     return uristrings.join(prefix)
/* 236  */                      .replace(/^&/, '')
/* 237  */                      .replace(/%20/g, '+'); 
/* 238  */ };
/* 239  */ 
/* 240  */ //
/* 241  */ //
/* 242  */ // Uploader Classes
/* 243  */ //
/* 244  */ //
/* 245  */ 
/* 246  */ var qq = qq || {};
/* 247  */     
/* 248  */ /**
/* 249  *|  * Creates upload button, validates upload, but doesn't create file list or dd. 
/* 250  *|  */

/* fileuploader.js */

/* 251  */ qq.FileUploaderBasic = function(o){
/* 252  */     this._options = {
/* 253  */         // set to true to see the server response
/* 254  */         debug: false,
/* 255  */         action: '/server/upload',
/* 256  */         params: {},
/* 257  */         button: null,
/* 258  */         multiple: true,
/* 259  */         maxConnections: 3,
/* 260  */         // validation        
/* 261  */         allowedExtensions: [],               
/* 262  */         sizeLimit: 0,   
/* 263  */         minSizeLimit: 0,                             
/* 264  */         // events
/* 265  */         // return false to cancel submit
/* 266  */         onSubmit: function(id, fileName){},
/* 267  */         onProgress: function(id, fileName, loaded, total){},
/* 268  */         onComplete: function(id, fileName, responseJSON){},
/* 269  */         onCancel: function(id, fileName){},
/* 270  */         // messages                
/* 271  */         messages: {
/* 272  */             typeError: "{file} has invalid extension. Only {extensions} are allowed.",
/* 273  */             sizeError: "{file} is too large, maximum file size is {sizeLimit}.",
/* 274  */             minSizeError: "{file} is too small, minimum file size is {minSizeLimit}.",
/* 275  */             emptyError: "{file} is empty, please select files again without it.",
/* 276  */             onLeave: "The files are being uploaded, if you leave now the upload will be cancelled."            
/* 277  */         },
/* 278  */         showMessage: function(message){
/* 279  */             alert(message);
/* 280  */         }               
/* 281  */     };
/* 282  */     qq.extend(this._options, o);
/* 283  */         
/* 284  */     // number of files being uploaded
/* 285  */     this._filesInProgress = 0;
/* 286  */     this._handler = this._createUploadHandler(); 
/* 287  */     
/* 288  */     if (this._options.button){ 
/* 289  */         this._button = this._createUploadButton(this._options.button);
/* 290  */     }
/* 291  */                         
/* 292  */     this._preventLeaveInProgress();         
/* 293  */ };
/* 294  */    
/* 295  */ qq.FileUploaderBasic.prototype = {
/* 296  */     setParams: function(params){
/* 297  */         this._options.params = params;
/* 298  */     },
/* 299  */     getInProgress: function(){
/* 300  */         return this._filesInProgress;         

/* fileuploader.js */

/* 301  */     },
/* 302  */     _createUploadButton: function(element){
/* 303  */         var self = this;
/* 304  */         
/* 305  */         return new qq.UploadButton({
/* 306  */             element: element,
/* 307  */             multiple: this._options.multiple && qq.UploadHandlerXhr.isSupported(),
/* 308  */             onChange: function(input){
/* 309  */                 self._onInputChange(input);
/* 310  */             }        
/* 311  */         });           
/* 312  */     },    
/* 313  */     _createUploadHandler: function(){
/* 314  */         var self = this,
/* 315  */             handlerClass;        
/* 316  */         
/* 317  */         if(qq.UploadHandlerXhr.isSupported()){           
/* 318  */             handlerClass = 'UploadHandlerXhr';                        
/* 319  */         } else {
/* 320  */             handlerClass = 'UploadHandlerForm';
/* 321  */         }
/* 322  */ 
/* 323  */         var handler = new qq[handlerClass]({
/* 324  */             debug: this._options.debug,
/* 325  */             action: this._options.action,         
/* 326  */             maxConnections: this._options.maxConnections,   
/* 327  */             onProgress: function(id, fileName, loaded, total){                
/* 328  */                 self._onProgress(id, fileName, loaded, total);
/* 329  */                 self._options.onProgress(id, fileName, loaded, total);                    
/* 330  */             },            
/* 331  */             onComplete: function(id, fileName, result){
/* 332  */                 self._onComplete(id, fileName, result);
/* 333  */                 self._options.onComplete(id, fileName, result);
/* 334  */             },
/* 335  */             onCancel: function(id, fileName){
/* 336  */                 self._onCancel(id, fileName);
/* 337  */                 self._options.onCancel(id, fileName);
/* 338  */             }
/* 339  */         });
/* 340  */ 
/* 341  */         return handler;
/* 342  */     },    
/* 343  */     _preventLeaveInProgress: function(){
/* 344  */         var self = this;
/* 345  */         
/* 346  */         qq.attach(window, 'beforeunload', function(e){
/* 347  */             if (!self._filesInProgress){return;}
/* 348  */             
/* 349  */             var e = e || window.event;
/* 350  */             // for ie, ff

/* fileuploader.js */

/* 351  */             e.returnValue = self._options.messages.onLeave;
/* 352  */             // for webkit
/* 353  */             return self._options.messages.onLeave;             
/* 354  */         });        
/* 355  */     },    
/* 356  */     _onSubmit: function(id, fileName){
/* 357  */         this._filesInProgress++;  
/* 358  */     },
/* 359  */     _onProgress: function(id, fileName, loaded, total){        
/* 360  */     },
/* 361  */     _onComplete: function(id, fileName, result){
/* 362  */         this._filesInProgress--;                 
/* 363  */         if (result.error){
/* 364  */             this._options.showMessage(result.error);
/* 365  */         }             
/* 366  */     },
/* 367  */     _onCancel: function(id, fileName){
/* 368  */         this._filesInProgress--;        
/* 369  */     },
/* 370  */     _onInputChange: function(input){
/* 371  */         if (this._handler instanceof qq.UploadHandlerXhr){                
/* 372  */             this._uploadFileList(input.files);                   
/* 373  */         } else {             
/* 374  */             if (this._validateFile(input)){                
/* 375  */                 this._uploadFile(input);                                    
/* 376  */             }                      
/* 377  */         }               
/* 378  */         this._button.reset();   
/* 379  */     },  
/* 380  */     _uploadFileList: function(files){
/* 381  */         for (var i=0; i<files.length; i++){
/* 382  */             if ( !this._validateFile(files[i])){
/* 383  */                 return;
/* 384  */             }            
/* 385  */         }
/* 386  */         
/* 387  */         for (var i=0; i<files.length; i++){
/* 388  */             this._uploadFile(files[i]);        
/* 389  */         }        
/* 390  */     },       
/* 391  */     _uploadFile: function(fileContainer){      
/* 392  */         var id = this._handler.add(fileContainer);
/* 393  */         var fileName = this._handler.getName(id);
/* 394  */         
/* 395  */         if (this._options.onSubmit(id, fileName) !== false){
/* 396  */             this._onSubmit(id, fileName);
/* 397  */             this._handler.upload(id, this._options.params);
/* 398  */         }
/* 399  */     },      
/* 400  */     _validateFile: function(file){

/* fileuploader.js */

/* 401  */         var name, size;
/* 402  */         
/* 403  */         if (file.value){
/* 404  */             // it is a file input            
/* 405  */             // get input value and remove path to normalize
/* 406  */             name = file.value.replace(/.*(\/|\\)/, "");
/* 407  */         } else {
/* 408  */             // fix missing properties in Safari
/* 409  */             name = file.fileName != null ? file.fileName : file.name;
/* 410  */             size = file.fileSize != null ? file.fileSize : file.size;
/* 411  */         }
/* 412  */                     
/* 413  */         if (! this._isAllowedExtension(name)){            
/* 414  */             this._error('typeError', name);
/* 415  */             return false;
/* 416  */             
/* 417  */         } else if (size === 0){            
/* 418  */             this._error('emptyError', name);
/* 419  */             return false;
/* 420  */                                                      
/* 421  */         } else if (size && this._options.sizeLimit && size > this._options.sizeLimit){            
/* 422  */             this._error('sizeError', name);
/* 423  */             return false;
/* 424  */                         
/* 425  */         } else if (size && size < this._options.minSizeLimit){
/* 426  */             this._error('minSizeError', name);
/* 427  */             return false;            
/* 428  */         }
/* 429  */         
/* 430  */         return true;                
/* 431  */     },
/* 432  */     _error: function(code, fileName){
/* 433  */         var message = this._options.messages[code];        
/* 434  */         function r(name, replacement){ message = message.replace(name, replacement); }
/* 435  */         
/* 436  */         r('{file}', this._formatFileName(fileName));        
/* 437  */         r('{extensions}', this._options.allowedExtensions.join(', '));
/* 438  */         r('{sizeLimit}', this._formatSize(this._options.sizeLimit));
/* 439  */         r('{minSizeLimit}', this._formatSize(this._options.minSizeLimit));
/* 440  */         
/* 441  */         this._options.showMessage(message);                
/* 442  */     },
/* 443  */     _formatFileName: function(name){
/* 444  */         if (name.length > 33){
/* 445  */             name = name.slice(0, 19) + '...' + name.slice(-13);    
/* 446  */         }
/* 447  */         return name;
/* 448  */     },
/* 449  */     _isAllowedExtension: function(fileName){
/* 450  */         var ext = (-1 !== fileName.indexOf('.')) ? fileName.replace(/.*[.]/, '').toLowerCase() : '';

/* fileuploader.js */

/* 451  */         var allowed = this._options.allowedExtensions;
/* 452  */         
/* 453  */         if (!allowed.length){return true;}        
/* 454  */         
/* 455  */         for (var i=0; i<allowed.length; i++){
/* 456  */             if (allowed[i].toLowerCase() == ext){ return true;}    
/* 457  */         }
/* 458  */         
/* 459  */         return false;
/* 460  */     },    
/* 461  */     _formatSize: function(bytes){
/* 462  */         var i = -1;                                    
/* 463  */         do {
/* 464  */             bytes = bytes / 1024;
/* 465  */             i++;  
/* 466  */         } while (bytes > 99);
/* 467  */         
/* 468  */         return Math.max(bytes, 0.1).toFixed(1) + ['kB', 'MB', 'GB', 'TB', 'PB', 'EB'][i];          
/* 469  */     }
/* 470  */ };
/* 471  */     
/* 472  */        
/* 473  */ /**
/* 474  *|  * Class that creates upload widget with drag-and-drop and file list
/* 475  *|  * @inherits qq.FileUploaderBasic
/* 476  *|  */
/* 477  */ qq.FileUploader = function(o){
/* 478  */     // call parent constructor
/* 479  */     qq.FileUploaderBasic.apply(this, arguments);
/* 480  */     
/* 481  */     // additional options    
/* 482  */     qq.extend(this._options, {
/* 483  */         element: null,
/* 484  */         // if set, will be used instead of qq-upload-list in template
/* 485  */         listElement: null,
/* 486  */                 
/* 487  */         template: '<div class="qq-uploader">' + 
/* 488  */                 '<div class="qq-upload-drop-area"><span>Drop files here to upload</span></div>' +
/* 489  */                 '<div class="qq-upload-button">Upload a file</div>' +
/* 490  */                 '<ul class="qq-upload-list"></ul>' + 
/* 491  */              '</div>',
/* 492  */ 
/* 493  */         // template for one item in file list
/* 494  */         fileTemplate: '<li>' +
/* 495  */                 '<span class="qq-upload-file"></span>' +
/* 496  */                 '<span class="qq-upload-spinner"></span>' +
/* 497  */                 '<span class="qq-upload-size"></span>' +
/* 498  */                 '<a class="qq-upload-cancel" href="#">Cancel</a>' +
/* 499  */                 '<span class="qq-upload-failed-text">Failed</span>' +
/* 500  */             '</li>',        

/* fileuploader.js */

/* 501  */         
/* 502  */         classes: {
/* 503  */             // used to get elements from templates
/* 504  */             button: 'qq-upload-button',
/* 505  */             drop: 'qq-upload-drop-area',
/* 506  */             dropActive: 'qq-upload-drop-area-active',
/* 507  */             list: 'qq-upload-list',
/* 508  */                         
/* 509  */             file: 'qq-upload-file',
/* 510  */             spinner: 'qq-upload-spinner',
/* 511  */             size: 'qq-upload-size',
/* 512  */             cancel: 'qq-upload-cancel',
/* 513  */ 
/* 514  */             // added to list item when upload completes
/* 515  */             // used in css to hide progress spinner
/* 516  */             success: 'qq-upload-success',
/* 517  */             fail: 'qq-upload-fail'
/* 518  */         }
/* 519  */     });
/* 520  */     // overwrite options with user supplied    
/* 521  */     qq.extend(this._options, o);       
/* 522  */ 
/* 523  */     this._element = this._options.element;
/* 524  */     this._element.innerHTML = this._options.template;        
/* 525  */     this._listElement = this._options.listElement || this._find(this._element, 'list');
/* 526  */     
/* 527  */     this._classes = this._options.classes;
/* 528  */         
/* 529  */     this._button = this._createUploadButton(this._find(this._element, 'button'));        
/* 530  */     
/* 531  */     this._bindCancelEvent();
/* 532  */     this._setupDragDrop();
/* 533  */ };
/* 534  */ 
/* 535  */ // inherit from Basic Uploader
/* 536  */ qq.extend(qq.FileUploader.prototype, qq.FileUploaderBasic.prototype);
/* 537  */ 
/* 538  */ qq.extend(qq.FileUploader.prototype, {
/* 539  */     /**
/* 540  *|      * Gets one of the elements listed in this._options.classes
/* 541  *|      **/
/* 542  */     _find: function(parent, type){                                
/* 543  */         var element = qq.getByClass(parent, this._options.classes[type])[0];        
/* 544  */         if (!element){
/* 545  */             throw new Error('element not found ' + type);
/* 546  */         }
/* 547  */         
/* 548  */         return element;
/* 549  */     },
/* 550  */     _setupDragDrop: function(){

/* fileuploader.js */

/* 551  */         var self = this,
/* 552  */             dropArea = this._find(this._element, 'drop');                        
/* 553  */ 
/* 554  */         var dz = new qq.UploadDropZone({
/* 555  */             element: dropArea,
/* 556  */             onEnter: function(e){
/* 557  */                 qq.addClass(dropArea, self._classes.dropActive);
/* 558  */                 e.stopPropagation();
/* 559  */             },
/* 560  */             onLeave: function(e){
/* 561  */                 e.stopPropagation();
/* 562  */             },
/* 563  */             onLeaveNotDescendants: function(e){
/* 564  */                 qq.removeClass(dropArea, self._classes.dropActive);  
/* 565  */             },
/* 566  */             onDrop: function(e){
/* 567  */                 dropArea.style.display = 'none';
/* 568  */                 qq.removeClass(dropArea, self._classes.dropActive);
/* 569  */                 self._uploadFileList(e.dataTransfer.files);    
/* 570  */             }
/* 571  */         });
/* 572  */                 
/* 573  */         dropArea.style.display = 'none';
/* 574  */ 
/* 575  */         qq.attach(document, 'dragenter', function(e){     
/* 576  */             if (!dz._isValidFileDrag(e)) return; 
/* 577  */             
/* 578  */             dropArea.style.display = 'block';            
/* 579  */         });                 
/* 580  */         qq.attach(document, 'dragleave', function(e){
/* 581  */             if (!dz._isValidFileDrag(e)) return;            
/* 582  */             
/* 583  */             var relatedTarget = document.elementFromPoint(e.clientX, e.clientY);
/* 584  */             // only fire when leaving document out
/* 585  */             if ( ! relatedTarget || relatedTarget.nodeName == "HTML"){               
/* 586  */                 dropArea.style.display = 'none';                                            
/* 587  */             }
/* 588  */         });                
/* 589  */     },
/* 590  */     _onSubmit: function(id, fileName){
/* 591  */         qq.FileUploaderBasic.prototype._onSubmit.apply(this, arguments);
/* 592  */         this._addToList(id, fileName);  
/* 593  */     },
/* 594  */     _onProgress: function(id, fileName, loaded, total){
/* 595  */         qq.FileUploaderBasic.prototype._onProgress.apply(this, arguments);
/* 596  */ 
/* 597  */         var item = this._getItemByFileId(id);
/* 598  */         var size = this._find(item, 'size');
/* 599  */         size.style.display = 'inline';
/* 600  */         

/* fileuploader.js */

/* 601  */         var text; 
/* 602  */         if (loaded != total){
/* 603  */             text = Math.round(loaded / total * 100) + '% from ' + this._formatSize(total);
/* 604  */         } else {                                   
/* 605  */             text = this._formatSize(total);
/* 606  */         }          
/* 607  */         
/* 608  */         qq.setText(size, text);         
/* 609  */     },
/* 610  */     _onComplete: function(id, fileName, result){
/* 611  */         qq.FileUploaderBasic.prototype._onComplete.apply(this, arguments);
/* 612  */ 
/* 613  */         // mark completed
/* 614  */         var item = this._getItemByFileId(id);                
/* 615  */         qq.remove(this._find(item, 'cancel'));
/* 616  */         qq.remove(this._find(item, 'spinner'));
/* 617  */         
/* 618  */         if (result.success){
/* 619  */             qq.addClass(item, this._classes.success);    
/* 620  */         } else {
/* 621  */             qq.addClass(item, this._classes.fail);
/* 622  */         }         
/* 623  */     },
/* 624  */     _addToList: function(id, fileName){
/* 625  */         var item = qq.toElement(this._options.fileTemplate);                
/* 626  */         item.qqFileId = id;
/* 627  */ 
/* 628  */         var fileElement = this._find(item, 'file');        
/* 629  */         qq.setText(fileElement, this._formatFileName(fileName));
/* 630  */         this._find(item, 'size').style.display = 'none';        
/* 631  */ 
/* 632  */         this._listElement.appendChild(item);
/* 633  */     },
/* 634  */     _getItemByFileId: function(id){
/* 635  */         var item = this._listElement.firstChild;        
/* 636  */         
/* 637  */         // there can't be txt nodes in dynamically created list
/* 638  */         // and we can  use nextSibling
/* 639  */         while (item){            
/* 640  */             if (item.qqFileId == id) return item;            
/* 641  */             item = item.nextSibling;
/* 642  */         }          
/* 643  */     },
/* 644  */     /**
/* 645  *|      * delegate click event for cancel link 
/* 646  *|      **/
/* 647  */     _bindCancelEvent: function(){
/* 648  */         var self = this,
/* 649  */             list = this._listElement;            
/* 650  */         

/* fileuploader.js */

/* 651  */         qq.attach(list, 'click', function(e){            
/* 652  */             e = e || window.event;
/* 653  */             var target = e.target || e.srcElement;
/* 654  */             
/* 655  */             if (qq.hasClass(target, self._classes.cancel)){                
/* 656  */                 qq.preventDefault(e);
/* 657  */                
/* 658  */                 var item = target.parentNode;
/* 659  */                 self._handler.cancel(item.qqFileId);
/* 660  */                 qq.remove(item);
/* 661  */             }
/* 662  */         });
/* 663  */     }    
/* 664  */ });
/* 665  */     
/* 666  */ qq.UploadDropZone = function(o){
/* 667  */     this._options = {
/* 668  */         element: null,  
/* 669  */         onEnter: function(e){},
/* 670  */         onLeave: function(e){},  
/* 671  */         // is not fired when leaving element by hovering descendants   
/* 672  */         onLeaveNotDescendants: function(e){},   
/* 673  */         onDrop: function(e){}                       
/* 674  */     };
/* 675  */     qq.extend(this._options, o); 
/* 676  */     
/* 677  */     this._element = this._options.element;
/* 678  */     
/* 679  */     this._disableDropOutside();
/* 680  */     this._attachEvents();   
/* 681  */ };
/* 682  */ 
/* 683  */ qq.UploadDropZone.prototype = {
/* 684  */     _disableDropOutside: function(e){
/* 685  */         // run only once for all instances
/* 686  */         if (!qq.UploadDropZone.dropOutsideDisabled ){
/* 687  */ 
/* 688  */             qq.attach(document, 'dragover', function(e){
/* 689  */                 if (e.dataTransfer){
/* 690  */                     e.dataTransfer.dropEffect = 'none';
/* 691  */                     e.preventDefault(); 
/* 692  */                 }           
/* 693  */             });
/* 694  */             
/* 695  */             qq.UploadDropZone.dropOutsideDisabled = true; 
/* 696  */         }        
/* 697  */     },
/* 698  */     _attachEvents: function(){
/* 699  */         var self = this;              
/* 700  */                   

/* fileuploader.js */

/* 701  */         qq.attach(self._element, 'dragover', function(e){
/* 702  */             if (!self._isValidFileDrag(e)) return;
/* 703  */             
/* 704  */             var effect = e.dataTransfer.effectAllowed;
/* 705  */             if (effect == 'move' || effect == 'linkMove'){
/* 706  */                 e.dataTransfer.dropEffect = 'move'; // for FF (only move allowed)    
/* 707  */             } else {                    
/* 708  */                 e.dataTransfer.dropEffect = 'copy'; // for Chrome
/* 709  */             }
/* 710  */                                                      
/* 711  */             e.stopPropagation();
/* 712  */             e.preventDefault();                                                                    
/* 713  */         });
/* 714  */         
/* 715  */         qq.attach(self._element, 'dragenter', function(e){
/* 716  */             if (!self._isValidFileDrag(e)) return;
/* 717  */                         
/* 718  */             self._options.onEnter(e);
/* 719  */         });
/* 720  */         
/* 721  */         qq.attach(self._element, 'dragleave', function(e){
/* 722  */             if (!self._isValidFileDrag(e)) return;
/* 723  */             
/* 724  */             self._options.onLeave(e);
/* 725  */             
/* 726  */             var relatedTarget = document.elementFromPoint(e.clientX, e.clientY);                      
/* 727  */             // do not fire when moving a mouse over a descendant
/* 728  */             if (qq.contains(this, relatedTarget)) return;
/* 729  */                         
/* 730  */             self._options.onLeaveNotDescendants(e); 
/* 731  */         });
/* 732  */                 
/* 733  */         qq.attach(self._element, 'drop', function(e){
/* 734  */             if (!self._isValidFileDrag(e)) return;
/* 735  */             
/* 736  */             e.preventDefault();
/* 737  */             self._options.onDrop(e);
/* 738  */         });          
/* 739  */     },
/* 740  */     _isValidFileDrag: function(e){
/* 741  */         var dt = e.dataTransfer,
/* 742  */             // do not check dt.types.contains in webkit, because it crashes safari 4            
/* 743  */             isWebkit = navigator.userAgent.indexOf("AppleWebKit") > -1;                        
/* 744  */ 
/* 745  */         // dt.effectAllowed is none in Safari 5
/* 746  */         // dt.types.contains check is for firefox            
/* 747  */         return dt && dt.effectAllowed != 'none' && 
/* 748  */             (dt.files || (!isWebkit && dt.types.contains && dt.types.contains('Files')));
/* 749  */         
/* 750  */     }        

/* fileuploader.js */

/* 751  */ }; 
/* 752  */ 
/* 753  */ qq.UploadButton = function(o){
/* 754  */     this._options = {
/* 755  */         element: null,  
/* 756  */         // if set to true adds multiple attribute to file input      
/* 757  */         multiple: false,
/* 758  */         // name attribute of file input
/* 759  */         name: 'file',
/* 760  */         onChange: function(input){},
/* 761  */         hoverClass: 'qq-upload-button-hover',
/* 762  */         focusClass: 'qq-upload-button-focus'                       
/* 763  */     };
/* 764  */     
/* 765  */     qq.extend(this._options, o);
/* 766  */         
/* 767  */     this._element = this._options.element;
/* 768  */     
/* 769  */     // make button suitable container for input
/* 770  */     qq.css(this._element, {
/* 771  */         position: 'relative',
/* 772  */         overflow: 'hidden',
/* 773  */         // Make sure browse button is in the right side
/* 774  */         // in Internet Explorer
/* 775  */         direction: 'ltr'
/* 776  */     });   
/* 777  */     
/* 778  */     this._input = this._createInput();
/* 779  */ };
/* 780  */ 
/* 781  */ qq.UploadButton.prototype = {
/* 782  */     /* returns file input element */    
/* 783  */     getInput: function(){
/* 784  */         return this._input;
/* 785  */     },
/* 786  */     /* cleans/recreates the file input */
/* 787  */     reset: function(){
/* 788  */         if (this._input.parentNode){
/* 789  */             qq.remove(this._input);    
/* 790  */         }                
/* 791  */         
/* 792  */         qq.removeClass(this._element, this._options.focusClass);
/* 793  */         this._input = this._createInput();
/* 794  */     },    
/* 795  */     _createInput: function(){                
/* 796  */         var input = document.createElement("input");
/* 797  */         
/* 798  */         if (this._options.multiple){
/* 799  */             input.setAttribute("multiple", "multiple");
/* 800  */         }

/* fileuploader.js */

/* 801  */                 
/* 802  */         input.setAttribute("type", "file");
/* 803  */         input.setAttribute("name", this._options.name);
/* 804  */         
/* 805  */         qq.css(input, {
/* 806  */             position: 'absolute',
/* 807  */             // in Opera only 'browse' button
/* 808  */             // is clickable and it is located at
/* 809  */             // the right side of the input
/* 810  */             right: 0,
/* 811  */             top: 0,
/* 812  */             fontFamily: 'Arial',
/* 813  */             // 4 persons reported this, the max values that worked for them were 243, 236, 236, 118
/* 814  */             fontSize: '118px',
/* 815  */             margin: 0,
/* 816  */             padding: 0,
/* 817  */             cursor: 'pointer',
/* 818  */             opacity: 0
/* 819  */         });
/* 820  */         
/* 821  */         this._element.appendChild(input);
/* 822  */ 
/* 823  */         var self = this;
/* 824  */         qq.attach(input, 'change', function(){
/* 825  */             self._options.onChange(input);
/* 826  */         });
/* 827  */                 
/* 828  */         qq.attach(input, 'mouseover', function(){
/* 829  */             qq.addClass(self._element, self._options.hoverClass);
/* 830  */         });
/* 831  */         qq.attach(input, 'mouseout', function(){
/* 832  */             qq.removeClass(self._element, self._options.hoverClass);
/* 833  */         });
/* 834  */         qq.attach(input, 'focus', function(){
/* 835  */             qq.addClass(self._element, self._options.focusClass);
/* 836  */         });
/* 837  */         qq.attach(input, 'blur', function(){
/* 838  */             qq.removeClass(self._element, self._options.focusClass);
/* 839  */         });
/* 840  */ 
/* 841  */         // IE and Opera, unfortunately have 2 tab stops on file input
/* 842  */         // which is unacceptable in our case, disable keyboard access
/* 843  */         if (window.attachEvent){
/* 844  */             // it is IE or Opera
/* 845  */             input.setAttribute('tabIndex', "-1");
/* 846  */         }
/* 847  */ 
/* 848  */         return input;            
/* 849  */     }        
/* 850  */ };

/* fileuploader.js */

/* 851  */ 
/* 852  */ /**
/* 853  *|  * Class for uploading files, uploading itself is handled by child classes
/* 854  *|  */
/* 855  */ qq.UploadHandlerAbstract = function(o){
/* 856  */     this._options = {
/* 857  */         debug: false,
/* 858  */         action: '/upload.php',
/* 859  */         // maximum number of concurrent uploads        
/* 860  */         maxConnections: 999,
/* 861  */         onProgress: function(id, fileName, loaded, total){},
/* 862  */         onComplete: function(id, fileName, response){},
/* 863  */         onCancel: function(id, fileName){}
/* 864  */     };
/* 865  */     qq.extend(this._options, o);    
/* 866  */     
/* 867  */     this._queue = [];
/* 868  */     // params for files in queue
/* 869  */     this._params = [];
/* 870  */ };
/* 871  */ qq.UploadHandlerAbstract.prototype = {
/* 872  */     log: function(str){
/* 873  */     },
/* 874  */     /**
/* 875  *|      * Adds file or file input to the queue
/* 876  *|      * @returns id
/* 877  *|      **/    
/* 878  */     add: function(file){},
/* 879  */     /**
/* 880  *|      * Sends the file identified by id and additional query params to the server
/* 881  *|      */
/* 882  */     upload: function(id, params){
/* 883  */         var len = this._queue.push(id);
/* 884  */ 
/* 885  */         var copy = {};        
/* 886  */         qq.extend(copy, params);
/* 887  */         this._params[id] = copy;        
/* 888  */                 
/* 889  */         // if too many active uploads, wait...
/* 890  */         if (len <= this._options.maxConnections){               
/* 891  */             this._upload(id, this._params[id]);
/* 892  */         }
/* 893  */     },
/* 894  */     /**
/* 895  *|      * Cancels file upload by id
/* 896  *|      */
/* 897  */     cancel: function(id){
/* 898  */         this._cancel(id);
/* 899  */         this._dequeue(id);
/* 900  */     },

/* fileuploader.js */

/* 901  */     /**
/* 902  *|      * Cancells all uploads
/* 903  *|      */
/* 904  */     cancelAll: function(){
/* 905  */         for (var i=0; i<this._queue.length; i++){
/* 906  */             this._cancel(this._queue[i]);
/* 907  */         }
/* 908  */         this._queue = [];
/* 909  */     },
/* 910  */     /**
/* 911  *|      * Returns name of the file identified by id
/* 912  *|      */
/* 913  */     getName: function(id){},
/* 914  */     /**
/* 915  *|      * Returns size of the file identified by id
/* 916  *|      */          
/* 917  */     getSize: function(id){},
/* 918  */     /**
/* 919  *|      * Returns id of files being uploaded or
/* 920  *|      * waiting for their turn
/* 921  *|      */
/* 922  */     getQueue: function(){
/* 923  */         return this._queue;
/* 924  */     },
/* 925  */     /**
/* 926  *|      * Actual upload method
/* 927  *|      */
/* 928  */     _upload: function(id){},
/* 929  */     /**
/* 930  *|      * Actual cancel method
/* 931  *|      */
/* 932  */     _cancel: function(id){},     
/* 933  */     /**
/* 934  *|      * Removes element from queue, starts upload of next
/* 935  *|      */
/* 936  */     _dequeue: function(id){
/* 937  */         var i = qq.indexOf(this._queue, id);
/* 938  */         this._queue.splice(i, 1);
/* 939  */                 
/* 940  */         var max = this._options.maxConnections;
/* 941  */         
/* 942  */         if (this._queue.length >= max){
/* 943  */             var nextId = this._queue[max-1];
/* 944  */             this._upload(nextId, this._params[nextId]);
/* 945  */         }
/* 946  */     }        
/* 947  */ };
/* 948  */ 
/* 949  */ /**
/* 950  *|  * Class for uploading files using form and iframe

/* fileuploader.js */

/* 951  *|  * @inherits qq.UploadHandlerAbstract
/* 952  *|  */
/* 953  */ qq.UploadHandlerForm = function(o){
/* 954  */     qq.UploadHandlerAbstract.apply(this, arguments);
/* 955  */        
/* 956  */     this._inputs = {};
/* 957  */ };
/* 958  */ // @inherits qq.UploadHandlerAbstract
/* 959  */ qq.extend(qq.UploadHandlerForm.prototype, qq.UploadHandlerAbstract.prototype);
/* 960  */ 
/* 961  */ qq.extend(qq.UploadHandlerForm.prototype, {
/* 962  */     add: function(fileInput){
/* 963  */         fileInput.setAttribute('name', 'qqfile');
/* 964  */         var id = 'qq-upload-handler-iframe' + qq.getUniqueId();       
/* 965  */         
/* 966  */         this._inputs[id] = fileInput;
/* 967  */         
/* 968  */         // remove file input from DOM
/* 969  */         if (fileInput.parentNode){
/* 970  */             qq.remove(fileInput);
/* 971  */         }
/* 972  */                 
/* 973  */         return id;
/* 974  */     },
/* 975  */     getName: function(id){
/* 976  */         // get input value and remove path to normalize
/* 977  */         return this._inputs[id].value.replace(/.*(\/|\\)/, "");
/* 978  */     },    
/* 979  */     _cancel: function(id){
/* 980  */         this._options.onCancel(id, this.getName(id));
/* 981  */         
/* 982  */         delete this._inputs[id];        
/* 983  */ 
/* 984  */         var iframe = document.getElementById(id);
/* 985  */         if (iframe){
/* 986  */             // to cancel request set src to something else
/* 987  */             // we use src="javascript:false;" because it doesn't
/* 988  */             // trigger ie6 prompt on https
/* 989  */             iframe.setAttribute('src', 'javascript:false;');
/* 990  */ 
/* 991  */             qq.remove(iframe);
/* 992  */         }
/* 993  */     },     
/* 994  */     _upload: function(id, params){                        
/* 995  */         var input = this._inputs[id];
/* 996  */         
/* 997  */         if (!input){
/* 998  */             throw new Error('file with passed id was not added, or already uploaded or cancelled');
/* 999  */         }                
/* 1000 */ 

/* fileuploader.js */

/* 1001 */         var fileName = this.getName(id);
/* 1002 */                 
/* 1003 */         var iframe = this._createIframe(id);
/* 1004 */         var form = this._createForm(iframe, params);
/* 1005 */         form.appendChild(input);
/* 1006 */ 
/* 1007 */         var self = this;
/* 1008 */         this._attachLoadEvent(iframe, function(){                                 
/* 1009 */             self.log('iframe loaded');
/* 1010 */             
/* 1011 */             var response = self._getIframeContentJSON(iframe);
/* 1012 */ 
/* 1013 */             self._options.onComplete(id, fileName, response);
/* 1014 */             self._dequeue(id);
/* 1015 */             
/* 1016 */             delete self._inputs[id];
/* 1017 */             // timeout added to fix busy state in FF3.6
/* 1018 */             setTimeout(function(){
/* 1019 */                 qq.remove(iframe);
/* 1020 */             }, 1);
/* 1021 */         });
/* 1022 */ 
/* 1023 */         form.submit();        
/* 1024 */         qq.remove(form);        
/* 1025 */         
/* 1026 */         return id;
/* 1027 */     }, 
/* 1028 */     _attachLoadEvent: function(iframe, callback){
/* 1029 */         qq.attach(iframe, 'load', function(){
/* 1030 */             // when we remove iframe from dom
/* 1031 */             // the request stops, but in IE load
/* 1032 */             // event fires
/* 1033 */             if (!iframe.parentNode){
/* 1034 */                 return;
/* 1035 */             }
/* 1036 */ 
/* 1037 */             // fixing Opera 10.53
/* 1038 */             if (iframe.contentDocument &&
/* 1039 */                 iframe.contentDocument.body &&
/* 1040 */                 iframe.contentDocument.body.innerHTML == "false"){
/* 1041 */                 // In Opera event is fired second time
/* 1042 */                 // when body.innerHTML changed from false
/* 1043 */                 // to server response approx. after 1 sec
/* 1044 */                 // when we upload file with iframe
/* 1045 */                 return;
/* 1046 */             }
/* 1047 */ 
/* 1048 */             callback();
/* 1049 */         });
/* 1050 */     },

/* fileuploader.js */

/* 1051 */     /**
/* 1052 *|      * Returns json object received by iframe from server.
/* 1053 *|      */
/* 1054 */     _getIframeContentJSON: function(iframe){
/* 1055 */         // iframe.contentWindow.document - for IE<7
/* 1056 */         var doc = iframe.contentDocument ? iframe.contentDocument: iframe.contentWindow.document,
/* 1057 */             response;
/* 1058 */         
/* 1059 */         this.log("converting iframe's innerHTML to JSON");
/* 1060 */         this.log("innerHTML = " + doc.body.innerHTML);
/* 1061 */                         
/* 1062 */         try {
/* 1063 */             response = eval("(" + doc.body.innerHTML + ")");
/* 1064 */         } catch(err){
/* 1065 */             response = {};
/* 1066 */         }        
/* 1067 */ 
/* 1068 */         return response;
/* 1069 */     },
/* 1070 */     /**
/* 1071 *|      * Creates iframe with unique name
/* 1072 *|      */
/* 1073 */     _createIframe: function(id){
/* 1074 */         // We can't use following code as the name attribute
/* 1075 */         // won't be properly registered in IE6, and new window
/* 1076 */         // on form submit will open
/* 1077 */         // var iframe = document.createElement('iframe');
/* 1078 */         // iframe.setAttribute('name', id);
/* 1079 */ 
/* 1080 */         var iframe = qq.toElement('<iframe src="javascript:false;" name="' + id + '" />');
/* 1081 */         // src="javascript:false;" removes ie6 prompt on https
/* 1082 */ 
/* 1083 */         iframe.setAttribute('id', id);
/* 1084 */ 
/* 1085 */         iframe.style.display = 'none';
/* 1086 */         document.body.appendChild(iframe);
/* 1087 */ 
/* 1088 */         return iframe;
/* 1089 */     },
/* 1090 */     /**
/* 1091 *|      * Creates form, that will be submitted to iframe
/* 1092 *|      */
/* 1093 */     _createForm: function(iframe, params){
/* 1094 */         // We can't use the following code in IE6
/* 1095 */         // var form = document.createElement('form');
/* 1096 */         // form.setAttribute('method', 'post');
/* 1097 */         // form.setAttribute('enctype', 'multipart/form-data');
/* 1098 */         // Because in this case file won't be attached to request
/* 1099 */         var form = qq.toElement('<form method="post" enctype="multipart/form-data"></form>');
/* 1100 */ 

/* fileuploader.js */

/* 1101 */         var queryString = qq.obj2url(params, this._options.action);
/* 1102 */ 
/* 1103 */         form.setAttribute('action', queryString);
/* 1104 */         form.setAttribute('target', iframe.name);
/* 1105 */         form.style.display = 'none';
/* 1106 */         document.body.appendChild(form);
/* 1107 */ 
/* 1108 */         return form;
/* 1109 */     }
/* 1110 */ });
/* 1111 */ 
/* 1112 */ /**
/* 1113 *|  * Class for uploading files using xhr
/* 1114 *|  * @inherits qq.UploadHandlerAbstract
/* 1115 *|  */
/* 1116 */ qq.UploadHandlerXhr = function(o){
/* 1117 */     qq.UploadHandlerAbstract.apply(this, arguments);
/* 1118 */ 
/* 1119 */     this._files = [];
/* 1120 */     this._xhrs = [];
/* 1121 */     
/* 1122 */     // current loaded size in bytes for each file 
/* 1123 */     this._loaded = [];
/* 1124 */ };
/* 1125 */ 
/* 1126 */ // static method
/* 1127 */ qq.UploadHandlerXhr.isSupported = function(){
/* 1128 */     var input = document.createElement('input');
/* 1129 */     input.type = 'file';        
/* 1130 */     
/* 1131 */     return (
/* 1132 */         'multiple' in input &&
/* 1133 */         typeof File != "undefined" &&
/* 1134 */         typeof (new XMLHttpRequest()).upload != "undefined" );       
/* 1135 */ };
/* 1136 */ 
/* 1137 */ // @inherits qq.UploadHandlerAbstract
/* 1138 */ qq.extend(qq.UploadHandlerXhr.prototype, qq.UploadHandlerAbstract.prototype)
/* 1139 */ 
/* 1140 */ qq.extend(qq.UploadHandlerXhr.prototype, {
/* 1141 */     /**
/* 1142 *|      * Adds file to the queue
/* 1143 *|      * Returns id to use with upload, cancel
/* 1144 *|      **/    
/* 1145 */     add: function(file){
/* 1146 */         if (!(file instanceof File)){
/* 1147 */             throw new Error('Passed obj in not a File (in qq.UploadHandlerXhr)');
/* 1148 */         }
/* 1149 */                 
/* 1150 */         return this._files.push(file) - 1;        

/* fileuploader.js */

/* 1151 */     },
/* 1152 */     getName: function(id){        
/* 1153 */         var file = this._files[id];
/* 1154 */         // fix missing name in Safari 4
/* 1155 */         return file.fileName != null ? file.fileName : file.name;       
/* 1156 */     },
/* 1157 */     getSize: function(id){
/* 1158 */         var file = this._files[id];
/* 1159 */         return file.fileSize != null ? file.fileSize : file.size;
/* 1160 */     },    
/* 1161 */     /**
/* 1162 *|      * Returns uploaded bytes for file identified by id 
/* 1163 *|      */    
/* 1164 */     getLoaded: function(id){
/* 1165 */         return this._loaded[id] || 0; 
/* 1166 */     },
/* 1167 */     /**
/* 1168 *|      * Sends the file identified by id and additional query params to the server
/* 1169 *|      * @param {Object} params name-value string pairs
/* 1170 *|      */    
/* 1171 */     _upload: function(id, params){
/* 1172 */         var file = this._files[id],
/* 1173 */             name = this.getName(id),
/* 1174 */             size = this.getSize(id);
/* 1175 */                 
/* 1176 */         this._loaded[id] = 0;
/* 1177 */                                 
/* 1178 */         var xhr = this._xhrs[id] = new XMLHttpRequest();
/* 1179 */         var self = this;
/* 1180 */                                         
/* 1181 */         xhr.upload.onprogress = function(e){
/* 1182 */             if (e.lengthComputable){
/* 1183 */                 self._loaded[id] = e.loaded;
/* 1184 */                 self._options.onProgress(id, name, e.loaded, e.total);
/* 1185 */             }
/* 1186 */         };
/* 1187 */ 
/* 1188 */         xhr.onreadystatechange = function(){            
/* 1189 */             if (xhr.readyState == 4){
/* 1190 */                 self._onComplete(id, xhr);                    
/* 1191 */             }
/* 1192 */         };
/* 1193 */ 
/* 1194 */         // build query string
/* 1195 */         params = params || {};
/* 1196 */         params['qqfile'] = name;
/* 1197 */         var queryString = qq.obj2url(params, this._options.action);
/* 1198 */ 
/* 1199 */         xhr.open("POST", queryString, true);
/* 1200 */         xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

/* fileuploader.js */

/* 1201 */         xhr.setRequestHeader("X-File-Name", encodeURIComponent(name));
/* 1202 */         xhr.setRequestHeader("Content-Type", "application/octet-stream");
/* 1203 */         xhr.send(file);
/* 1204 */     },
/* 1205 */     _onComplete: function(id, xhr){
/* 1206 */         // the request was aborted/cancelled
/* 1207 */         if (!this._files[id]) return;
/* 1208 */         
/* 1209 */         var name = this.getName(id);
/* 1210 */         var size = this.getSize(id);
/* 1211 */         
/* 1212 */         this._options.onProgress(id, name, size, size);
/* 1213 */                 
/* 1214 */         if (xhr.status == 200){
/* 1215 */             this.log("xhr - server response received");
/* 1216 */             this.log("responseText = " + xhr.responseText);
/* 1217 */                         
/* 1218 */             var response;
/* 1219 */                     
/* 1220 */             try {
/* 1221 */                 response = eval("(" + xhr.responseText + ")");
/* 1222 */             } catch(err){
/* 1223 */                 response = {};
/* 1224 */             }
/* 1225 */             
/* 1226 */             this._options.onComplete(id, name, response);
/* 1227 */                         
/* 1228 */         } else {                   
/* 1229 */             this._options.onComplete(id, name, {});
/* 1230 */         }
/* 1231 */                 
/* 1232 */         this._files[id] = null;
/* 1233 */         this._xhrs[id] = null;    
/* 1234 */         this._dequeue(id);                    
/* 1235 */     },
/* 1236 */     _cancel: function(id){
/* 1237 */         this._options.onCancel(id, this.getName(id));
/* 1238 */         
/* 1239 */         this._files[id] = null;
/* 1240 */         
/* 1241 */         if (this._xhrs[id]){
/* 1242 */             this._xhrs[id].abort();
/* 1243 */             this._xhrs[id] = null;                                   
/* 1244 */         }
/* 1245 */     }
/* 1246 */ });
