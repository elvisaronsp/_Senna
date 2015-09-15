
/* atalhos.js */

/* 1   */ /**
/* 2   *|  * Copyright 2012 Craig Campbell
/* 3   *|  *
/* 4   *|  * Licensed under the Apache License, Version 2.0 (the "License");
/* 5   *|  * you may not use this file except in compliance with the License.
/* 6   *|  * You may obtain a copy of the License at
/* 7   *|  *
/* 8   *|  * http://www.apache.org/licenses/LICENSE-2.0
/* 9   *|  *
/* 10  *|  * Unless required by applicable law or agreed to in writing, software
/* 11  *|  * distributed under the License is distributed on an "AS IS" BASIS,
/* 12  *|  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/* 13  *|  * See the License for the specific language governing permissions and
/* 14  *|  * limitations under the License.
/* 15  *|  *
/* 16  *|  * Mousetrap is a simple keyboard shortcut library for Javascript with
/* 17  *|  * no external dependencies
/* 18  *|  *
/* 19  *|  * @url craig.is/killing/mice
/* 20  *|  */
/* 21  */ /* mousetrap v1.4.6 craig.is/killing/mice */
/* 22  */ (function(J,r,f){function s(a,b,d){a.addEventListener?a.addEventListener(b,d,!1):a.attachEvent("on"+b,d)}function A(a){if("keypress"==a.type){var b=String.fromCharCode(a.which);a.shiftKey||(b=b.toLowerCase());return b}return h[a.which]?h[a.which]:B[a.which]?B[a.which]:String.fromCharCode(a.which).toLowerCase()}function t(a){a=a||{};var b=!1,d;for(d in n)a[d]?b=!0:n[d]=0;b||(u=!1)}function C(a,b,d,c,e,v){var g,k,f=[],h=d.type;if(!l[a])return[];"keyup"==h&&w(a)&&(b=[a]);for(g=0;g<l[a].length;++g)if(k=
/* 23  */ l[a][g],!(!c&&k.seq&&n[k.seq]!=k.level||h!=k.action||("keypress"!=h||d.metaKey||d.ctrlKey)&&b.sort().join(",")!==k.modifiers.sort().join(","))){var m=c&&k.seq==c&&k.level==v;(!c&&k.combo==e||m)&&l[a].splice(g,1);f.push(k)}return f}function K(a){var b=[];a.shiftKey&&b.push("shift");a.altKey&&b.push("alt");a.ctrlKey&&b.push("ctrl");a.metaKey&&b.push("meta");return b}function x(a,b,d,c){m.stopCallback(b,b.target||b.srcElement,d,c)||!1!==a(b,d)||(b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation?
/* 24  */ b.stopPropagation():b.cancelBubble=!0)}function y(a){"number"!==typeof a.which&&(a.which=a.keyCode);var b=A(a);b&&("keyup"==a.type&&z===b?z=!1:m.handleKey(b,K(a),a))}function w(a){return"shift"==a||"ctrl"==a||"alt"==a||"meta"==a}function L(a,b,d,c){function e(b){return function(){u=b;++n[a];clearTimeout(D);D=setTimeout(t,1E3)}}function v(b){x(d,b,a);"keyup"!==c&&(z=A(b));setTimeout(t,10)}for(var g=n[a]=0;g<b.length;++g){var f=g+1===b.length?v:e(c||E(b[g+1]).action);F(b[g],f,c,a,g)}}function E(a,b){var d,
/* 25  */ c,e,f=[];d="+"===a?["+"]:a.split("+");for(e=0;e<d.length;++e)c=d[e],G[c]&&(c=G[c]),b&&"keypress"!=b&&H[c]&&(c=H[c],f.push("shift")),w(c)&&f.push(c);d=c;e=b;if(!e){if(!p){p={};for(var g in h)95<g&&112>g||h.hasOwnProperty(g)&&(p[h[g]]=g)}e=p[d]?"keydown":"keypress"}"keypress"==e&&f.length&&(e="keydown");return{key:c,modifiers:f,action:e}}function F(a,b,d,c,e){q[a+":"+d]=b;a=a.replace(/\s+/g," ");var f=a.split(" ");1<f.length?L(a,f,b,d):(d=E(a,d),l[d.key]=l[d.key]||[],C(d.key,d.modifiers,{type:d.action},
/* 26  */ c,a,e),l[d.key][c?"unshift":"push"]({callback:b,modifiers:d.modifiers,action:d.action,seq:c,level:e,combo:a}))}var h={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},B={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},H={"~":"`","!":"1",
/* 27  */ "@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},G={option:"alt",command:"meta","return":"enter",escape:"esc",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},p,l={},q={},n={},D,z=!1,I=!1,u=!1;for(f=1;20>f;++f)h[111+f]="f"+f;for(f=0;9>=f;++f)h[f+96]=f;s(r,"keypress",y);s(r,"keydown",y);s(r,"keyup",y);var m={bind:function(a,b,d){a=a instanceof Array?a:[a];for(var c=0;c<a.length;++c)F(a[c],b,d);return this},
/* 28  */ unbind:function(a,b){return m.bind(a,function(){},b)},trigger:function(a,b){if(q[a+":"+b])q[a+":"+b]({},a);return this},reset:function(){l={};q={};return this},stopCallback:function(a,b){return-1<(" "+b.className+" ").indexOf(" mousetrap ")?!1:"INPUT"==b.tagName||"SELECT"==b.tagName||"TEXTAREA"==b.tagName||b.isContentEditable},handleKey:function(a,b,d){var c=C(a,b,d),e;b={};var f=0,g=!1;for(e=0;e<c.length;++e)c[e].seq&&(f=Math.max(f,c[e].level));for(e=0;e<c.length;++e)c[e].seq?c[e].level==f&&(g=!0,
/* 29  */ b[c[e].seq]=1,x(c[e].callback,d,c[e].combo,c[e].seq)):g||x(c[e].callback,d,c[e].combo);c="keypress"==d.type&&I;d.type!=u||w(a)||c||t(b);I=g&&"keydown"==d.type}};J.Mousetrap=m;"function"===typeof define&&define.amd&&define(m)})(window,document);
/* 30  */ 
/* 31  */ //Pause
/* 32  */ Mousetrap=function(a){var c=a.stopCallback,b=!0;a.stopCallback=function(a,d,e){return b?c(a,d,e):!0};a.pause=function(){b=!1};a.unpause=function(){b=!0};return a}(Mousetrap);
/* 33  */ 
/* 34  */ //Global
/* 35  */ Mousetrap=function(a){var d={},e=a.stopCallback;a.stopCallback=function(b,c,a){return d[a]?!1:e(b,c,a)};a.bindGlobal=function(b,c,e){a.bind(b,c,e);if(b instanceof Array)for(c=0;c<b.length;c++)d[b[c]]=!0;else d[b]=!0};return a}(Mousetrap);
/* 36  */ 
/* 37  */ 
/* 38  */ /**
/* 39  *|  *  
/* 40  *|  * Adicionando eventos de Teclado
/* 41  *|  * 
/* 42  *|  * **************************************** */
/* 43  */ (function(){
/* 44  */ 	
/* 45  */ 	function shortcuts(){
/* 46  */ 		var p 			= $$(parent.document.body);
/* 47  */ 		
/* 48  */ 		
/* 49  */ 		if(!p.hasClass("main_body")){
/* 50  */ 			p			= p.parent.document.body;

/* atalhos.js */

/* 51  */ 		}
/* 52  */ 		if(!p.hasClass("main_body")){
/* 53  */ 			p			= p.parent.document.body;
/* 54  */ 		}
/* 55  */ 		
/* 56  */ 		var menu 		= p.getElement("#menu");
/* 57  */ 		var menu_modal 	= p.getElement("#menu_modal");
/* 58  */ 		var menu_itens 	= (menu_modal[0]) ? menu_modal.getElements("[shortcut]") : null;
/* 59  */ 		var mt 			= window.Mousetrap;
/* 60  */ 		
/* 61  */ 		/** Para o evento padrão **/
/* 62  */ 		function _stop_evt(evt){
/* 63  */ 			evt.stopPropagation();
/* 64  */ 			evt.preventDefault();
/* 65  */ 		};
/* 66  */ 		
/* 67  */ 		/** Adiciona a funcao de clique no item ao pressionar a tecla correspondente**/
/* 68  */ 		function _bind_click(keys, el){
/* 69  */ 			//verifica o atalho 
/* 70  */ 			if(keys=="") return;
/* 71  */ 			
/* 72  */ 			//previne ação
/* 73  */ 			mt.bindGlobal(keys, function(e){
/* 74  */ 				_stop_evt(e);
/* 75  */ 				return false;
/* 76  */ 			}, 'keydown');
/* 77  */ 			
/* 78  */ 			mt.bindGlobal(keys, function(e){
/* 79  */ 				_stop_evt(e);
/* 80  */ 				return false;
/* 81  */ 			}, 'keypress');
/* 82  */ 			
/* 83  */ 			//coloca o atalho
/* 84  */ 			mt.bindGlobal(keys, function(e){
/* 85  */ 				_stop_evt(e);
/* 86  */ 				switch (el.get('target')) {
/* 87  */ 				case "window":
/* 88  */ 					parent.MochaUI.newWindow(el);
/* 89  */ 					break;
/* 90  */ 				case "modal":
/* 91  */ 					parent.MochaUI.newModal(el);
/* 92  */ 					break;
/* 93  */ 				case "panel":
/* 94  */ 					parent.MochaUI.load(el);
/* 95  */ 					break;
/* 96  */ 				}
/* 97  */ 				return false;
/* 98  */ 			}, 'keyup');
/* 99  */ 		}
/* 100 */ 		

/* atalhos.js */

/* 101 */ 		/** Recupera os atalhos no menu **/
/* 102 */ 		var menu_shortcuts = function(){
/* 103 */ 			//valida os itens de menu
/* 104 */ 			if(!menu_itens) return;
/* 105 */ 			
/* 106 */ 			var mi = menu_itens[0];
/* 107 */ 			var bi = menu.getElements("[shortcut]")[0];
/* 108 */ 			
/* 109 */ 			//Itens do menu
/* 110 */ 			if(mi){
/* 111 */ 				Array.each(menu_itens[0], function(el, i){
/* 112 */ 					_bind_click($$(el).get("shortcut")[0], el);
/* 113 */ 				});
/* 114 */ 			}
/* 115 */ 			
/* 116 */ 			//Itens na barra do menu
/* 117 */ 			if(bi){
/* 118 */ 				Array.each(menu.getElements("[shortcut]")[0], function(el, i){
/* 119 */ 					_bind_click($$(el).get("shortcut")[0], el);
/* 120 */ 				});
/* 121 */ 			}
/* 122 */ 		};
/* 123 */ 		
/* 124 */ 		/** outras atribuições **/
/* 125 */ 		function other_shortcuts(){
/* 126 */ 			//Eventos diversos
/* 127 */ 			
/* 128 */ 			//Abre Menu
/* 129 */ 			mt.bindGlobal("f2", function(e){
/* 130 */ 				
/* 131 */ 				if(menu.hasClass('expandido')[0]){
/* 132 */ 					menu.fireEvent("hide");
/* 133 */ 				}else{
/* 134 */ 					menu.fireEvent("show");
/* 135 */ 				}
/* 136 */ 				return false;
/* 137 */ 			}, 'keyup');
/* 138 */ 			
/* 139 */ 			//Fecha Janela
/* 140 */ 			mt.bindGlobal("esc", function(e){
/* 141 */ 				var element 	= e.target;
/* 142 */ 				var tag_name 	= element.tagName; 
/* 143 */ 				var tag_type 	= element.type;
/* 144 */ 				
/* 145 */ 				//Se elemento do evento for um input, executa a ação padrão, chamando também o repectivo blur();
/* 146 */ 				if((tag_name == 'INPUT' && tag_type == 'text') || tag_name == 'SELECT' || tag_name == 'TEXTAREA' || (element.contentEditable && element.contentEditable == 'true')){
/* 147 */ 					$(e.target).fireEvent("blur");		//Mootools
/* 148 */ 					if(jQuery) jQuery(e.target).blur();	//jQuery
/* 149 */ 					return true;
/* 150 */ 				}

/* atalhos.js */

/* 151 */ 				
/* 152 */ 				//fecha Janela apenas se estiver na janela
/* 153 */ 				if(typeof(MochaUI) != 'undefined'){
/* 154 */ 					var windowId = MochaUI.getFrameWindowId();
/* 155 */ 					if(windowId && parent.$(windowId).hasClass('mocha')){
/* 156 */ 						parent.MochaUI.closeWindow(parent.$(windowId));
/* 157 */ 					}
/* 158 */ 				}
/* 159 */ 				
/* 160 */ 				//Coloca o foco na janela ou no painel
/* 161 */ 				var panel 		= parent.MochaUI.Panels.instances.get('mainPanel').iframeEl;
/* 162 */ 				var windowEl	= parent.MochaUI.Windows.instances.getLength() > 0 ? parent.MochaUI.getWindowWithHighestZindex() : null;
/* 163 */ 				
/* 164 */ 				if(windowEl == null){
/* 165 */ 					panel.contentWindow.focus();
/* 166 */ 				}else{
/* 167 */ 					$(windowEl).getElements('iframe')[0].contentWindow.focus();;
/* 168 */ 				}
/* 169 */ 				
/* 170 */ 				return false;
/* 171 */ 			}, 'keyup');
/* 172 */ 			
/* 173 */ 		}
/* 174 */ 		
/* 175 */ 		//Executando
/* 176 */ 		other_shortcuts();
/* 177 */ 		menu_shortcuts(); //TODO ainda em fase de testes
/* 178 */ 	}
/* 179 */ 	
/* 180 */ 	// Initialize MochaUI when the DOM is ready
/* 181 */ 	window.addEvent('load', function(){
/* 182 */ 		shortcuts();
/* 183 */ 	});
/* 184 */ })(); 
