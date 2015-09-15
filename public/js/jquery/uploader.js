
/* uploader.js */

/* 1   */ (function ($) {
/* 2   */ 
/* 3   */ 	/**
/* 4   *| 	 * PLUGIN PARA UPLOADS
/* 5   *| 	 */
/* 6   */     $.fn.uploader = function (options) {
/* 7   */ 
/* 8   */         var crlf = '\r\n';
/* 9   */         var boundary = "iloveigloo";
/* 10  */         var dashes = "--";
/* 11  */ 
/* 12  */         var settings = {
/* 13  */             "name": "file",
/* 14  */             "postUrl": "Upload.aspx",
/* 15  */             "onClientAbort": null,
/* 16  */             "onClientError": null,
/* 17  */             "onClientLoad": null,
/* 18  */             "onClientLoadEnd": null,
/* 19  */             "onClientLoadStart": null,
/* 20  */             "onClientProgress": null,
/* 21  */             "onServerAbort": null,
/* 22  */             "onServerError": null,
/* 23  */             "onServerLoad": null,
/* 24  */             "onServerLoadStart": null,
/* 25  */             "onServerProgress": null,
/* 26  */             "onServerReadyStateChange": null,
/* 27  */             "onSuccess": null,
/* 28  */             "onError": null,
/* 29  */             "onComplete": null,
/* 30  */             "validate": null,
/* 31  */             "onCancel": null
/* 32  */         };
/* 33  */ 
/* 34  */         if (options) {
/* 35  */             $.extend(settings, options);
/* 36  */         }
/* 37  */ 
/* 38  */         return this.each(function (options) {
/* 39  */             var $this = $(this);
/* 40  */             
/* 41  */             if ($this.is("[type=\"file\"]")) {
/* 42  */                 $this.bind("change", function (e) {
/* 43  */                     var files = this.files;
/* 44  */                     for (var i = 0; i < files.length; i++) {
/* 45  */                         fileHandler(files[i]);
/* 46  */                     }
/* 47  */                     $this.val("");
/* 48  */                 });
/* 49  */             } else {
/* 50  */             	$(document).bind("dragstart dragenter dragover", function (e) {

/* uploader.js */

/* 51  */             		$this.addClass('active');
/* 52  */             	}).bind("drop dragend", function (e) {
/* 53  */                 	$this.removeClass('active');
/* 54  */                 	return false;
/* 55  */                 });
/* 56  */             	
/* 57  */                 $this.bind("dragenter dragover", function (e) {
/* 58  */                 	$this.addClass('active');
/* 59  */                     return false;
/* 60  */                 }).bind("dragleave", function (e) {
/* 61  */                 	if($(e.target).is("span")) return;
/* 62  */                 	$this.removeClass('active');
/* 63  */                 }).bind("dragend drop", function (e) {
/* 64  */                 	$this.removeClass('active');
/* 65  */                 	return false;
/* 66  */                 }).bind("drop", function (e) {
/* 67  */                     var files = e.originalEvent.dataTransfer.files;
/* 68  */                     for (var i = 0; i < files.length; i++) {
/* 69  */                         fileHandler(files[i]);
/* 70  */                     }
/* 71  */                     return false;
/* 72  */                 });
/* 73  */             }
/* 74  */         });
/* 75  */ 
/* 76  */         
/* 77  */         /**
/* 78  *|          * Tratando e enviando arquivo
/* 79  *|          */
/* 80  */         function fileHandler(file) {
/* 81  */             var fileReader 		= new FileReader();
/* 82  */             var xmlHttpRequest 	= new XMLHttpRequest();
/* 83  */             var valid 			= true;
/* 84  */             
/* 85  */             fileReader.onabort = function (e) {
/* 86  */                 if (settings.onClientAbort) {
/* 87  */                     settings.onClientAbort(e, file);
/* 88  */                 }
/* 89  */             };
/* 90  */             fileReader.onerror = function (e) {
/* 91  */                 if (settings.onClientError) {
/* 92  */                     settings.onClientError(e, file);
/* 93  */                 }
/* 94  */             };
/* 95  */             fileReader.onload = function (e) {
/* 96  */             	if(!valid) return; 
/* 97  */             	
/* 98  */                 if (settings.onClientLoad) {
/* 99  */                     settings.onClientLoad(e, file);
/* 100 */                 }

/* uploader.js */

/* 101 */             };
/* 102 */             fileReader.onloadend = function (e) {
/* 103 */                 if (settings.onClientLoadEnd) {
/* 104 */                     settings.onClientLoadEnd(e, file);
/* 105 */                 }
/* 106 */                 //Envia
/* 107 */                 fileSend();
/* 108 */             };
/* 109 */             fileReader.onloadstart = function (e) {
/* 110 */             	if (settings.validate) {
/* 111 */             		valid = settings.validate(file);
/* 112 */             	}
/* 113 */             	
/* 114 */                 if (settings.onClientLoadStart) {
/* 115 */                     settings.onClientLoadStart(e, file);
/* 116 */                 }
/* 117 */             };
/* 118 */             fileReader.onprogress = function (e) {
/* 119 */                 if (settings.onClientProgress) {
/* 120 */                     settings.onClientProgress(e, file);
/* 121 */                 }
/* 122 */             };
/* 123 */             fileReader.readAsDataURL(file);
/* 124 */ 
/* 125 */             
/* 126 */             /**
/* 127 *|              * Realiza validação dos dados
/* 128 *|              */
/* 129 */             function validate(){
/* 130 */                 if(!valid){
/* 131 */                 	if (settings.onCancel) {
/* 132 */                     	settings.onCancel(file, fileReader, xmlHttpRequest);
/* 133 */                     }
/* 134 */                 }
/* 135 */                 return valid;
/* 136 */             }
/* 137 */             
/* 138 */ 	        
/* 139 */ 	        /**
/* 140 *| 	         * Envio
/* 141 *| 	         */
/* 142 */ 	        function fileSend(){
/* 143 */ 	            
/* 144 */ 	            xmlHttpRequest.upload.onabort = function (e) {
/* 145 */ 	                if (settings.onServerAbort) {
/* 146 */ 	                    settings.onServerAbort(e, file);
/* 147 */ 	                }
/* 148 */ 	            };
/* 149 */ 	            xmlHttpRequest.upload.onerror = function (e) {
/* 150 */ 	                if (settings.onServerError) {

/* uploader.js */

/* 151 */ 	                    settings.onServerError(e, file);
/* 152 */ 	                }
/* 153 */ 	            };
/* 154 */ 	            xmlHttpRequest.upload.onload = function (e) {
/* 155 */ 	                if (settings.onServerLoad) {
/* 156 */ 	                    settings.onServerLoad(e, file);
/* 157 */ 	                }
/* 158 */ 	            };
/* 159 */ 	            xmlHttpRequest.upload.onloadstart = function (e) {
/* 160 */ 	                if (settings.onServerLoadStart) {
/* 161 */ 	                    settings.onServerLoadStart(e, file);
/* 162 */ 	                }
/* 163 */ 	            };
/* 164 */ 	            xmlHttpRequest.upload.onprogress = function (e) {
/* 165 */ 	                if (settings.onServerProgress) {
/* 166 */ 	                	var progress = 0;
/* 167 */ 	                	var send = e.loaded || e.position;
/* 168 */ 	                	var total = e.total || e.totalSize;
/* 169 */ 	                	if(total>0){
/* 170 */ 	                		progress = Math.round((send/total) * 100);
/* 171 */ 	                	}
/* 172 */ 	                    settings.onServerProgress(e, file, progress);
/* 173 */ 	                }
/* 174 */ 	            };
/* 175 */ 	            xmlHttpRequest.onreadystatechange = function (e) {
/* 176 */ 	                if (settings.onServerReadyStateChange) {
/* 177 */ 	                    settings.onServerReadyStateChange(e, file, xmlHttpRequest.readyState);
/* 178 */ 	                }
/* 179 */ 	                
/* 180 */ 	                if(xmlHttpRequest.readyState == 4){
/* 181 */ 	                	var valid_response = (xmlHttpRequest.responseText.slice(0, 1) != "<");
/* 182 */ 	                	
/* 183 */ 	                	//Sucesso
/* 184 */ 		                if (settings.onSuccess && xmlHttpRequest.status == 200 && valid_response) {
/* 185 */ 		                    settings.onSuccess(e, file, xmlHttpRequest.responseText);
/* 186 */ 		                }
/* 187 */ 		                
/* 188 */ 		                //Erro
/* 189 */ 		                else if (settings.onError && (xmlHttpRequest.status != 200 || !valid_response)) {
/* 190 */ 		                	var text = (valid_response) ? xmlHttpRequest.responseText : "Resposta inválida do servidor";
/* 191 */ 		                	settings.onError(e, file, text);
/* 192 */ 		                }
/* 193 */ 		                
/* 194 */ 		                //Transacao Finalizada
/* 195 */ 		                if (settings.onComplete) {
/* 196 */ 		                	settings.onComplete(e, file, xmlHttpRequest);
/* 197 */ 		                }
/* 198 */ 	                }
/* 199 */ 	            };
/* 200 */ 	            

/* uploader.js */

/* 201 */ 	            xmlHttpRequest.open("POST", settings.postUrl, true);
/* 202 */ 	            
/* 203 */ 	            if (file.getAsBinary) { // Firefox
/* 204 */ 	
/* 205 */ 	            	if(!validate()) return;
/* 206 */ 	            	
/* 207 */ 	                var data = dashes + boundary + crlf +
/* 208 */ 	                    "Content-Disposition: form-data;" +
/* 209 */ 	                    "name=\"" + settings.name + "\";" +
/* 210 */ 	                    "filename=\"" + unescape(encodeURIComponent(file.name)) + "\"" + crlf +
/* 211 */ 	                    "Content-Type: application/octet-stream" + crlf + crlf +
/* 212 */ 	                    file.getAsBinary() + crlf +
/* 213 */ 	                    dashes + boundary + dashes;
/* 214 */ 	
/* 215 */ 	                xmlHttpRequest.setRequestHeader("Content-Type", "multipart/form-data;boundary=" + boundary);
/* 216 */ 	                xmlHttpRequest.sendAsBinary(data);
/* 217 */ 	
/* 218 */ 	            } else if (window.FormData) { // Chrome
/* 219 */ 	
/* 220 */ 	                var formData = new FormData();
/* 221 */ 	                formData.append(settings.name, file);
/* 222 */ 	
/* 223 */ 	                if(!validate()) return;
/* 224 */ 	                
/* 225 */ 	                xmlHttpRequest.send(formData);
/* 226 */ 	            }
/* 227 */ 	            
/* 228 */ 	        }
/* 229 */         }
/* 230 */     };
/* 231 */     
/* 232 */     
/* 233 */     
/* 234 */     /**
/* 235 *|      * IMAGE UPLOADER
/* 236 *|      */
/* 237 */     function image_uploader(i, el){
/* 238 */     	var $this	= $(this);
/* 239 */ 	    var input 	= $this.find('input[type=file]');
/* 240 */ 		var drop 	= $this.find('.dropbox');
/* 241 */ 		var caixa 	= $this.find('.thumbs');
/* 242 */ 		
/* 243 */ 		//Abrir caixa para upload
/* 244 */ 		caixa.find('a.novo').live('click', function(){
/* 245 */ 			input.click();
/* 246 */ 		});
/* 247 */ 		
/* 248 */ 		//Recuperar o nome do arquivo sem a extensao
/* 249 */ 		function getFileId(file){
/* 250 */ 			return file.name.substring(0, file.name.lastIndexOf("."));

/* uploader.js */

/* 251 */ 		}
/* 252 */ 		
/* 253 */ 		$this.find("input[type=file], .dropbox").uploader({
/* 254 */ 			//Url de envio
/* 255 */ 			postUrl: $this.attr("upload_url"),
/* 256 */ 			
/* 257 */ 			//Validação do arquivo sendo enviado
/* 258 */ 			validate: function(file){
/* 259 */ 				var formats = input.attr("accept").replace(" ", "");
/* 260 */ 				formats = formats.split(",", formats);
/* 261 */ 				return true;
/* 262 */ 				//return ($.inArray(file.type, formats) > -1);
/* 263 */ 			},
/* 264 */ 			
/* 265 */ 			//Carregar imagem
/* 266 */ 			onClientLoad: function(e, file){
/* 267 */ 				var div 		= $("<div />").addClass("active").attr('imgID', getFileId(file));
/* 268 */ 				var fade 		= $("<span />").addClass("fade");
/* 269 */ 				var progress 	= $("<span />").addClass("progress").append($("<span />"));
/* 270 */ 				var span 		= $("<span />").addClass("img");
/* 271 */ 				var select 		= $("<a />").addClass("select");
/* 272 */ 				$('<img />').attr({'src': e.target.result, 'alt': '' }).addClass('thumb').appendTo(span);
/* 273 */ 				span.appendTo(div);
/* 274 */ 				select.appendTo(div);
/* 275 */ 				fade.appendTo(div);
/* 276 */ 				progress.appendTo(div);
/* 277 */ 				div.appendTo(caixa);
/* 278 */ 			},
/* 279 */ 			
/* 280 */ 			//Progresso do Upload
/* 281 */ 	        onServerProgress: function(e, file, progress){
/* 282 */ 	        	$('div.active[imgID="'+getFileId(file)+'"] .progress span').css("width", progress+"%");
/* 283 */ 	        },
/* 284 */ 	        //Sucesso
/* 285 */ 	        onSuccess: function(e, file, text){ 
/* 286 */ 	        	$('div.active[imgID="'+getFileId(file)+'"]').addClass("success");
/* 287 */ 	        	$('div.active[imgID="'+getFileId(file)+'"]').attr("rel", text).append($("<a/>").addClass("delete"));
/* 288 */ 	        	
/* 289 */ 	        },
/* 290 */ 	        //Erro
/* 291 */ 	        onError: function(e, file, text){
/* 292 */ 	        	var info_error = $("<a>Erro!</a>").addClass("info").attr("title", text);
/* 293 */ 	        	$('div.active[imgID="'+getFileId(file)+'"]').addClass("error").append(info_error);
/* 294 */ 	        },
/* 295 */ 	        //Processo Finalizado
/* 296 */ 	        onComplete: function(e, file){
/* 297 */ 	        	$('div.active[imgID="'+getFileId(file)+'"]').removeClass("active").removeAttr("imgID");
/* 298 */ 	        },
/* 299 */ 	        //Processo Cancelado
/* 300 */ 	        onCancel: function(file){}

/* uploader.js */

/* 301 */ 		});
/* 302 */ 		
/* 303 */     }
/* 304 */     
/* 305 */     
/* 306 */     /**
/* 307 *|      * Ações
/* 308 *|      */
/* 309 */     function image_actions(){
/* 310 */     	
/* 311 */     	//Remoção
/* 312 */     	$(".thumbs .delete").live("click", function(evt){
/* 313 */     		evt.preventDefault();
/* 314 */     		
/* 315 */     		var $this 	= $(this);
/* 316 */     		var url 	= $this.parents(".uploader:first").attr("delete_url");
/* 317 */     		var file 	= $this.parent().attr("rel");
/* 318 */     		
/* 319 */     		if(!url) return;
/* 320 */     		
/* 321 */     		$.ajax({
/* 322 */ 				type: "POST",
/* 323 */ 				url: url, //efetua requisicao na pagina apontada pela action do formulario
/* 324 */ 				data: { 'file':file },
/* 325 */ 				success: function(data){
/* 326 */ 					if(data!="ok") return;
/* 327 */ 					if($this.parent().is(".selected")){
/* 328 */ 						$this.parents(".uploader:first").find("input[type=hidden]").val("");
/* 329 */ 						$this.parents(".uploader:first").next().find(".thumb span.img").html("");
/* 330 */ 					}
/* 331 */ 					$this.parent().fadeOut(300, function(){
/* 332 */ 						$this.parent().remove();
/* 333 */ 					});
/* 334 */ 				}
/* 335 */ 			});
/* 336 */     	});
/* 337 */     	
/* 338 */     	//Seleção
/* 339 */     	$(".thumbs .select").live("click", function(evt){
/* 340 */     		var $this = $(this);
/* 341 */     		var val = $this.parent().attr("rel");
/* 342 */     		var img = $this.parent().find(".img img").clone();
/* 343 */     		$this.parents(".uploader:first").find("input[type=hidden]").val(val);
/* 344 */     		$this.parents(".uploader:first").next().find(".thumb span.img").html("").append(img);
/* 345 */     		$this.parents(".uploader:first").find(".selected").removeClass("selected");
/* 346 */     		$this.parent().addClass("selected");
/* 347 */     	});
/* 348 */     	
/* 349 */     	//abrir
/* 350 */     	$(".file_manager .thumb *").click(function(e){

/* uploader.js */

/* 351 */     		
/* 352 */     		var upl = $(this).parents(".file_manager").prev(".uploader:first");
/* 353 */     		toggleLoading(true);
/* 354 */     		upl.toggle(true);
/* 355 */     		
/* 356 */     		//carrega imagens
/* 357 */     		var url = upl.attr("list_url");
/* 358 */     		upl.find('.thumbs').load(url, function() {
/* 359 */     			var val = upl.find('input[type=hidden]:first').val();
/* 360 */     			if(val!="") upl.find('.thumbs div[rel*="'+val+'"]').addClass("selected");
/* 361 */     			toggleLoading(false);
/* 362 */ 			});
/* 363 */     	});
/* 364 */     	
/* 365 */     	//fechar
/* 366 */     	var close = function(e){
/* 367 */     		$(this).parents(".uploader:first").toggle(false);
/* 368 */     	};
/* 369 */     	
/* 370 */     	$(".uploader_close").click(close);
/* 371 */     	$(".thumbs .select").live("dblclick", close);
/* 372 */     }
/* 373 */     
/* 374 */     
/* 375 */     /**
/* 376 *|      * Aplicando
/* 377 *|      */
/* 378 */     $(document).ready(function(){
/* 379 */     	$(".uploader.image").each(image_uploader);
/* 380 */     	image_actions();
/* 381 */ 	});
/* 382 */     
/* 383 */     
/* 384 */ 
/* 385 */ })(jQuery);
