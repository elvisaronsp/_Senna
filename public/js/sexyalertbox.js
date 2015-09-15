
/* sexyalertbox.js */

/* 1   */ /**
/* 2   *|  * Sexy Alert Box - for mootools 1.2 - jQUery 1.3
/* 3   *|  * @name sexyalertbox.v1.2.js
/* 4   *|  * @author Eduardo D. Sada - http://www.coders.me/web-js-html/javascript/sexy-alert-box
/* 5   *|  * @version 1.2.2
/* 6   *|  * @date 25-May-2009
/* 7   *|  * @copyright (c) 2009 Eduardo D. Sada (www.coders.me)
/* 8   *|  * @license MIT - http://es.wikipedia.org/wiki/Licencia_MIT
/* 9   *|  * @example http://www.coders.me/ejemplos/sexy-alert-box/
/* 10  *|  * @based in <PBBAcpBox> (Pokemon_JOJO, <http://www.mibhouse.org/pokemon_jojo>)
/* 11  *|  * @thanks to Pokemon_JOJO!
/* 12  *|  * @features:
/* 13  *|  * * Chain Implemented (Cola de mensajes)
/* 14  *|  * * More styles (info, error, alert, prompt, confirm)
/* 15  *|  * * ESC would close the window
/* 16  *|  * * Focus on a default button
/* 17  *| */
/* 18  */ 
/* 19  */ var SexyAlertBox = new Class(
/* 20  */ 		{
/* 21  */ 			Implements : [ Options, Chain ],
/* 22  */ 			getOptions : function() {
/* 23  */ 				return {
/* 24  */ 					name : 'SexyAlertBox',
/* 25  */ 					zIndex : 65555,
/* 26  */ 					onReturn : false,
/* 27  */ 					onReturnFunction : $empty,
/* 28  */ 					BoxStyles : {},
/* 29  */ 					BoxClass : '',
/* 30  */ 					OverlayStyles : {
/* 31  */ 						'background-color' : '#999',
/* 32  */ 						'opacity' : 0.7
/* 33  */ 					},
/* 34  */ 					showDuration : 200,
/* 35  */ 					showEffect : Fx.Transitions.linear,
/* 36  */ 					closeDuration : 100,
/* 37  */ 					closeEffect : Fx.Transitions.linear,
/* 38  */ 					moveDuration : 500,
/* 39  */ 					moveEffect : Fx.Transitions.linear,
/* 40  */ 					onShowStart : $empty,
/* 41  */ 					onShowComplete : $empty,
/* 42  */ 					onCloseStart : $empty,
/* 43  */ 					onCloseComplete : function(a) {
/* 44  */ 						this.options.onReturnFunction(this.options.onReturn);
/* 45  */ 						document.getElementById('BoxOverlay').style.display = 'none';
/* 46  */ 					}.bind(this)
/* 47  */ 				};
/* 48  */ 			},
/* 49  */ 			initialize : function(b) {
/* 50  */ 				this.i = 0;

/* sexyalertbox.js */

/* 51  */ 				this.setOptions(this.getOptions(), b);
/* 52  */ 				this.Overlay = new Element(
/* 53  */ 						'div',
/* 54  */ 						{
/* 55  */ 							'id' : 'BoxOverlay',
/* 56  */ 							'styles' : {
/* 57  */ 								'display': 	'none',
/* 58  */ 								'position': 'absolute',
/* 59  */ 								'top': 		'0',
/* 60  */ 								'left': 	'0',
/* 61  */ 								'opacity': 	0,
/* 62  */ 								'z-index': 	this.options.zIndex,
/* 63  */ 								'background-color' : this.options.OverlayStyles['background-color'],
/* 64  */ 								'height': 	'100%',
/* 65  */ 								'width': 	'100%'
/* 66  */ 							}
/* 67  */ 						});
/* 68  */ 				this.Content = new Element('div', {
/* 69  */ 					'id' : this.options.name + '-BoxContenedor'
/* 70  */ 				});
/* 71  */ 				this.Contenedor = new Element('div', {
/* 72  */ 					'id' : this.options.name + '-BoxContent'
/* 73  */ 				}).adopt(this.Content);
/* 74  */ 				this.InBox = new Element('div', {
/* 75  */ 					'id' : this.options.name + '-InBox'
/* 76  */ 				}).adopt(this.Contenedor);
/* 77  */ 				this.Box = new Element('div', {
/* 78  */ 					'id' : this.options.name + '-Box',
/* 79  */ 					'styles' : {
/* 80  */ 						'display': 	'none',
/* 81  */ 						'z-index': 	this.options.zIndex + 2,
/* 82  */ 						'position': 'absolute',
/* 83  */ 						'top': 		'0',
/* 84  */ 						'left': 	'0',
/* 85  */ 						'width': 	'100%',
/* 86  */ 						'height': 	'100%'
/* 87  */ 					}
/* 88  */ 				}).adopt(this.InBox);
/* 89  */ 				this.Overlay.injectInside(document.body);
/* 90  */ 				this.Box.injectInside(document.body);
/* 91  */ 				this.Box.addEvent('keyup', function(a) {
/* 92  */ 					if (a.key == 'esc') {
/* 93  */ 						this.options.onReturn = false;
/* 94  */ 						this.display(0);
/* 95  */ 					}
/* 96  */ 				}.bind(this));
/* 97  */ 			},
/* 98  */ 			togFlashObjects : function(a) {
/* 99  */ 				var b = new Array("embed", "iframe", "object");
/* 100 */ 				for (y = 0; y < b.length; y++) {

/* sexyalertbox.js */

/* 101 */ 					var c = document.getElementsByTagName(b[y]);
/* 102 */ 					for (i = 0; i < c.length; i++) {
/* 103 */ 						c[i].style.visibility = a;
/* 104 */ 					}
/* 105 */ 				}
/* 106 */ 			},
/* 107 */ 			display : function(a) {
/* 108 */ 				if (this.Transition)
/* 109 */ 					this.Transition.cancel();
/* 110 */ 				if (this.options.display == 0 && a != 0 || a == 1) {
/* 111 */ 					if (Browser.Engine.trident4)
/* 112 */ 						$$('select', 'object', 'embed').each(function(node) {
/* 113 */ 							node.style.visibility = 'hidden';
/* 114 */ 						});
/* 115 */ 					this.togFlashObjects('hidden');
/* 116 */ 					this.Overlay.setStyle('display', 'block');
/* 117 */ 					this.options.display = 1;
/* 118 */ 					this.fireEvent('onShowStart', [ this.Overlay ]);
/* 119 */ 					this.Transition = new Fx.Tween(this.Overlay, {
/* 120 */ 						property : 'opacity',
/* 121 */ 						duration : this.options.showDuration,
/* 122 */ 						transition : this.options.showEffect,
/* 123 */ 						onComplete : function() {
/* 124 */ 							this.Box.setStyles({
/* 125 */ 								'display' : 'block'
/* 126 */ 							});
/* 127 */ 							this.focusin();
/* 128 */ 							this.fireEvent('onShowComplete', [ this.Overlay ]);
/* 129 */ 						}.bind(this)
/* 130 */ 					}).start(this.options.OverlayStyles['opacity']);
/* 131 */ 				} else {
/* 132 */ 					if (Browser.Engine.trident4)
/* 133 */ 						$$('select', 'object', 'embed').each(function(node) {
/* 134 */ 							node.style.visibility = 'visible';
/* 135 */ 						});
/* 136 */ 					this.togFlashObjects('visible');
/* 137 */ 					this.queue.delay(500, this);
/* 138 */ 					this.Box.setStyles({
/* 139 */ 						'display' : 'none',
/* 140 */ 						'top' : 0
/* 141 */ 					});
/* 142 */ 					this.Content.empty();
/* 143 */ 					this.options.display = 0;
/* 144 */ 					this.fireEvent('onCloseStart', [ this.Overlay ]);
/* 145 */ 					if (this.i == 1) {
/* 146 */ 						this.Transition = new Fx.Tween(this.Overlay, {
/* 147 */ 							property : 'opacity',
/* 148 */ 							duration : this.options.closeDuration,
/* 149 */ 							transition : this.options.closeEffect,
/* 150 */ 							onComplete : function() {

/* sexyalertbox.js */

/* 151 */ 								this.fireEvent('onCloseComplete', [ this.Overlay ]);
/* 152 */ 							}.bind(this)
/* 153 */ 						}).start(0);
/* 154 */ 					}
/* 155 */ 				}
/* 156 */ 			},
/* 157 */ 			focusin : function() {
/* 158 */ 				if ($chk($('BoxAlertBtnOk'))) {
/* 159 */ 					$('BoxAlertBtnOk').focus();
/* 160 */ 				} else if ($chk($('BoxPromptInput'))) {
/* 161 */ 					var i = $('BoxPromptInput').getElement('input[name=inputPrompt]:checked');
/* 162 */ 					if(i==undefined){
/* 163 */ 						i = $('BoxPromptInput');
/* 164 */ 					}
/* 165 */ 					i.focus();
/* 166 */ 				} else if ($chk($('BoxConfirmBtnOk'))) {
/* 167 */ 					$('BoxConfirmBtnOk').focus();
/* 168 */ 				}
/* 169 */ 			},
/* 170 */ 			queue : function() {
/* 171 */ 				this.i--;
/* 172 */ 				this.callChain();
/* 173 */ 			},
/* 174 */ 			messageBox : function(a, b, c, d) {
/* 175 */ 				this.chain(function() {
/* 176 */ 					c = $extend({
/* 177 */ 						'textBoxBtnOk' : 'OK',
/* 178 */ 						'textBoxBtnCancel' : 'Cancelar',
/* 179 */ 						'textBoxInputPrompt' : null,
/* 180 */ 						'inputType' : 'text',
/* 181 */ 						'inputAttrs' : {},
/* 182 */ 						'promptOptions' : [],
/* 183 */ 						'BoxClass' : '',
/* 184 */ 						'onComplete' : $empty
/* 185 */ 					}, c || {});
/* 186 */ 					this.options.onReturnFunction = c.onComplete;
/* 187 */ 					this.ContenedorBotones = new Element('div', {
/* 188 */ 						'id' : this.options.name + '-Buttons'
/* 189 */ 					});
/* 190 */ 					if (a == 'alert' || a == 'info' || a == 'error') {
/* 191 */ 						this.AlertBtnOk = new Element('input', {
/* 192 */ 							'id' : 'BoxAlertBtnOk',
/* 193 */ 							'type' : 'submit',
/* 194 */ 							'value' : c.textBoxBtnOk
/* 195 */ 						});
/* 196 */ 						this.AlertBtnOk.addEvent('click', function() {
/* 197 */ 							this.options.onReturn = true;
/* 198 */ 							this.display(0);
/* 199 */ 						}.bind(this));
/* 200 */ 						if (c.BoxClass != "") 	this.clase = c.BoxClass;

/* sexyalertbox.js */

/* 201 */ 						else if (a == 'alert') 	this.clase = 'BoxAlert';
/* 202 */ 						else if (a == 'error') 	this.clase = 'BoxError';
/* 203 */ 						else if (a == 'info') 	this.clase = 'BoxInfo';
/* 204 */ 						this.Content.setProperty('class', this.clase).set('html', b);
/* 205 */ 						this.AlertBtnOk.injectInside(this.ContenedorBotones);
/* 206 */ 						this.ContenedorBotones.injectInside(this.Content);
/* 207 */ 						this.display(1);
/* 208 */ 					} else if (a == 'confirm') {
/* 209 */ 						this.ConfirmBtnOk = new Element('input', {
/* 210 */ 							'id' : 'BoxConfirmBtnOk',
/* 211 */ 							'type' : 'submit',
/* 212 */ 							'value' : c.textBoxBtnOk
/* 213 */ 						});
/* 214 */ 						this.ConfirmBtnCancel = new Element('input', {
/* 215 */ 							'id' : 'BoxConfirmBtnCancel',
/* 216 */ 							'type' : 'submit',
/* 217 */ 							'value' : c.textBoxBtnCancel
/* 218 */ 						});
/* 219 */ 						this.ConfirmBtnOk.addEvent('click', function() {
/* 220 */ 							this.options.onReturn = true;
/* 221 */ 							this.display(0);
/* 222 */ 						}.bind(this));
/* 223 */ 						this.ConfirmBtnCancel.addEvent('click', function() {
/* 224 */ 							this.options.onReturn = false;
/* 225 */ 							this.display(0);
/* 226 */ 						}.bind(this));
/* 227 */ 						this.Content.setProperty('class', (c.BoxClass != "") ? c.BoxClass : 'BoxConfirm').set('html', b);
/* 228 */ 						this.ConfirmBtnOk.injectInside(this.ContenedorBotones);
/* 229 */ 						this.ConfirmBtnCancel.injectInside(this.ContenedorBotones);
/* 230 */ 						this.ContenedorBotones.injectInside(this.Content);
/* 231 */ 						this.display(1);
/* 232 */ 					} else if (a == 'prompt') {
/* 233 */ 						this.PromptBtnOk = new Element('input', {
/* 234 */ 							'id' : 'BoxPromptBtnOk',
/* 235 */ 							'type' : 'submit',
/* 236 */ 							'value' : c.textBoxBtnOk
/* 237 */ 						});
/* 238 */ 						this.PromptBtnCancel = new Element('input', {
/* 239 */ 							'id' : 'BoxPromptBtnCancel',
/* 240 */ 							'type' : 'submit',
/* 241 */ 							'value' : c.textBoxBtnCancel
/* 242 */ 						});
/* 243 */ 						
/* 244 */ 						a = c.inputType;
/* 245 */ 						switch (a) {
/* 246 */ 							//Inputs
/* 247 */ 							case "text":
/* 248 */ 							case "password":
/* 249 */ 							default:
/* 250 */ 								this.PromptInput = new Element('input', {

/* sexyalertbox.js */

/* 251 */ 									'id' : 'BoxPromptInput',
/* 252 */ 									'type' : a,
/* 253 */ 									'value' : d,
/* 254 */ 									'class' : 'inputPrompt'
/* 255 */ 								});
/* 256 */ 								
/* 257 */ 								break;
/* 258 */ 	
/* 259 */ 							//Select
/* 260 */ 							case "select":
/* 261 */ 								var o = $extend(c.inputAttrs, {
/* 262 */ 									'id' : 'BoxPromptInput',
/* 263 */ 									'class' : 'inputPrompt'
/* 264 */ 								});
/* 265 */ 								this.PromptInput = new Element('select', o);
/* 266 */ 								
/* 267 */ 								//inclui as opções no select
/* 268 */ 								for(var i=0; i<c.promptOptions.length; i++){
/* 269 */ 									var v = c.promptOptions[i];
/* 270 */ 									v.selected = (v.value == d  || (d=="" && i==0))? "selected" : "";   
/* 271 */ 									new Element('option', v).inject(this.PromptInput);
/* 272 */ 									
/* 273 */ 								}
/* 274 */ 								break;
/* 275 */ 								
/* 276 */ 							//Radio
/* 277 */ 							case "radio":
/* 278 */ 								var o = $extend(c.inputAttrs, {
/* 279 */ 									'id' : 'BoxPromptInput',
/* 280 */ 									'class' : 'inputPrompt form radio'
/* 281 */ 								});
/* 282 */ 								this.PromptInput 	= new Element('div', o);
/* 283 */ 								for(var i=0; i<c.promptOptions.length; i++){
/* 284 */ 									var opts = $extend(c.promptOptions[i], {
/* 285 */ 										'type' : 'radio',
/* 286 */ 										'class' : 'inputPrompt',
/* 287 */ 										'name' : 'inputPrompt'
/* 288 */ 									});
/* 289 */ 									opts.checked = (opts.value == d || (d=="" && i==0))? "1" : "";
/* 290 */ 									var span 		= new Element('span', {'class': 'input radio'}).inject(this.PromptInput);
/* 291 */ 									var label 		= new Element('label', {'class':''}).inject(span);
/* 292 */ 									new Element('input', opts).inject(label);
/* 293 */ 									new Element('span', {text: opts.text}).inject(label);
/* 294 */ 								}
/* 295 */ 								break;
/* 296 */ 						}
/* 297 */ 						
/* 298 */ 						this.PromptBtnOk.addEvent('click', function() {
/* 299 */ 							if(c.inputType == "radio"){
/* 300 */ 								this.options.onReturn = this.PromptInput.getElement('input[name=inputPrompt]:checked').get('value');

/* sexyalertbox.js */

/* 301 */ 							}else{
/* 302 */ 								this.options.onReturn = this.PromptInput.value;
/* 303 */ 							}
/* 304 */ 							this.display(0);
/* 305 */ 						}.bind(this));
/* 306 */ 						this.PromptBtnCancel.addEvent('click', function() {
/* 307 */ 							this.options.onReturn = false;
/* 308 */ 							this.display(0);
/* 309 */ 						}.bind(this));
/* 310 */ 						this.Content.setProperty('class', 'BoxPrompt').set('html', b + '<br />');
/* 311 */ 						this.PromptInput.injectInside(this.Content);
/* 312 */ 						this.PromptBtnOk.injectInside(this.ContenedorBotones);
/* 313 */ 						this.PromptBtnCancel.injectInside(this.ContenedorBotones);
/* 314 */ 						this.ContenedorBotones.injectInside(this.Content);
/* 315 */ 						this.display(1);
/* 316 */ 					} else {
/* 317 */ 						this.options.onReturn = false;
/* 318 */ 						this.display(0);
/* 319 */ 					}
/* 320 */ 				});
/* 321 */ 				this.i++;
/* 322 */ 				if (this.i == 1) this.callChain();
/* 323 */ 			},
/* 324 */ 			alert : function(a, b) {
/* 325 */ 				this.messageBox('alert', a, b);
/* 326 */ 			},
/* 327 */ 			info : function(a, b) {
/* 328 */ 				this.messageBox('info', a, b);
/* 329 */ 			},
/* 330 */ 			error : function(a, b) {
/* 331 */ 				this.messageBox('error', a, b);
/* 332 */ 			},
/* 333 */ 			confirm : function(a, b) {
/* 334 */ 				this.messageBox('confirm', a, b);
/* 335 */ 			},
/* 336 */ 			prompt : function(a, b, c) {
/* 337 */ 				this.messageBox('prompt', a, c, b);
/* 338 */ 			}
/* 339 */ 		});
/* 340 */ SexyAlertBox.implement(new Events, new Options);
/* 341 */ window.addEvent('domready', function() {
/* 342 */ 	Sexy = new SexyAlertBox();
/* 343 */ });
