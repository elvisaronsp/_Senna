
/* detect-zoom.js */

/* 1   */ /* Detect-zoom
/* 2   *|  * -----------
/* 3   *|  * Cross Browser Zoom and Pixel Ratio Detector
/* 4   *|  * Version 1.0.4 | Apr 1 2013
/* 5   *|  * dual-licensed under the WTFPL and MIT license
/* 6   *|  * Maintained by https://github/tombigel
/* 7   *|  * Original developer https://github.com/yonran
/* 8   *|  */
/* 9   */ 
/* 10  */ //AMD and CommonJS initialization copied from https://github.com/zohararad/audio5js
/* 11  */ (function (root, ns, factory) {
/* 12  */     "use strict";
/* 13  */ 
/* 14  */     if (typeof (module) !== 'undefined' && module.exports) { // CommonJS
/* 15  */         module.exports = factory(ns, root);
/* 16  */     } else if (typeof (define) === 'function' && define.amd) { // AMD
/* 17  */         define("detect-zoom", function () {
/* 18  */             return factory(ns, root);
/* 19  */         });
/* 20  */     } else {
/* 21  */         root[ns] = factory(ns, root);
/* 22  */     }
/* 23  */ 
/* 24  */ }(window, 'detectZoom', function () {
/* 25  */ 
/* 26  */     /**
/* 27  *|      * Use devicePixelRatio if supported by the browser
/* 28  *|      * @return {Number}
/* 29  *|      * @private
/* 30  *|      */
/* 31  */     var devicePixelRatio = function () {
/* 32  */         return window.devicePixelRatio || 1;
/* 33  */     };
/* 34  */ 
/* 35  */     /**
/* 36  *|      * Fallback function to set default values
/* 37  *|      * @return {Object}
/* 38  *|      * @private
/* 39  *|      */
/* 40  */     var fallback = function () {
/* 41  */         return {
/* 42  */             zoom: 1,
/* 43  */             devicePxPerCssPx: 1
/* 44  */         };
/* 45  */     };
/* 46  */     /**
/* 47  *|      * IE 8 and 9: no trick needed!
/* 48  *|      * TODO: Test on IE10 and Windows 8 RT
/* 49  *|      * @return {Object}
/* 50  *|      * @private

/* detect-zoom.js */

/* 51  *|      **/
/* 52  */     var ie8 = function () {
/* 53  */         var zoom = Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100) / 100;
/* 54  */         return {
/* 55  */             zoom: zoom,
/* 56  */             devicePxPerCssPx: zoom * devicePixelRatio()
/* 57  */         };
/* 58  */     };
/* 59  */ 
/* 60  */     /**
/* 61  *|      * For IE10 we need to change our technique again...
/* 62  *|      * thanks https://github.com/stefanvanburen
/* 63  *|      * @return {Object}
/* 64  *|      * @private
/* 65  *|      */
/* 66  */     var ie10 = function () {
/* 67  */         var zoom = Math.round((document.documentElement.offsetHeight / window.innerHeight) * 100) / 100;
/* 68  */         return {
/* 69  */             zoom: zoom,
/* 70  */             devicePxPerCssPx: zoom * devicePixelRatio()
/* 71  */         };
/* 72  */     };
/* 73  */ 
/* 74  */     /**
/* 75  *|      * Mobile WebKit
/* 76  *|      * the trick: window.innerWIdth is in CSS pixels, while
/* 77  *|      * screen.width and screen.height are in system pixels.
/* 78  *|      * And there are no scrollbars to mess up the measurement.
/* 79  *|      * @return {Object}
/* 80  *|      * @private
/* 81  *|      */
/* 82  */     var webkitMobile = function () {
/* 83  */         var deviceWidth = (Math.abs(window.orientation) == 90) ? screen.height : screen.width;
/* 84  */         var zoom = deviceWidth / window.innerWidth;
/* 85  */         return {
/* 86  */             zoom: zoom,
/* 87  */             devicePxPerCssPx: zoom * devicePixelRatio()
/* 88  */         };
/* 89  */     };
/* 90  */ 
/* 91  */     /**
/* 92  *|      * Desktop Webkit
/* 93  *|      * the trick: an element's clientHeight is in CSS pixels, while you can
/* 94  *|      * set its line-height in system pixels using font-size and
/* 95  *|      * -webkit-text-size-adjust:none.
/* 96  *|      * device-pixel-ratio: http://www.webkit.org/blog/55/high-dpi-web-sites/
/* 97  *|      *
/* 98  *|      * Previous trick (used before http://trac.webkit.org/changeset/100847):
/* 99  *|      * documentElement.scrollWidth is in CSS pixels, while
/* 100 *|      * document.width was in system pixels. Note that this is the

/* detect-zoom.js */

/* 101 *|      * layout width of the document, which is slightly different from viewport
/* 102 *|      * because document width does not include scrollbars and might be wider
/* 103 *|      * due to big elements.
/* 104 *|      * @return {Object}
/* 105 *|      * @private
/* 106 *|      */
/* 107 */     var webkit = function () {
/* 108 */         var important = function (str) {
/* 109 */             return str.replace(/;/g, " !important;");
/* 110 */         };
/* 111 */ 
/* 112 */         var div = document.createElement('div');
/* 113 */         div.innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0";
/* 114 */         div.setAttribute('style', important('font: 100px/1em sans-serif; -webkit-text-size-adjust: none; text-size-adjust: none; height: auto; width: 1em; padding: 0; overflow: visible;'));
/* 115 */ 
/* 116 */         // The container exists so that the div will be laid out in its own flow
/* 117 */         // while not impacting the layout, viewport size, or display of the
/* 118 */         // webpage as a whole.
/* 119 */         // Add !important and relevant CSS rule resets
/* 120 */         // so that other rules cannot affect the results.
/* 121 */         var container = document.createElement('div');
/* 122 */         container.setAttribute('style', important('width:0; height:0; overflow:hidden; visibility:hidden; position: absolute;'));
/* 123 */         container.appendChild(div);
/* 124 */ 
/* 125 */         document.body.appendChild(container);
/* 126 */         var zoom = 1000 / div.clientHeight;
/* 127 */         zoom = Math.round(zoom * 100) / 100;
/* 128 */         document.body.removeChild(container);
/* 129 */ 
/* 130 */         return{
/* 131 */             zoom: zoom,
/* 132 */             devicePxPerCssPx: zoom * devicePixelRatio()
/* 133 */         };
/* 134 */     };
/* 135 */ 
/* 136 */     /**
/* 137 *|      * no real trick; device-pixel-ratio is the ratio of device dpi / css dpi.
/* 138 *|      * (Note that this is a different interpretation than Webkit's device
/* 139 *|      * pixel ratio, which is the ratio device dpi / system dpi).
/* 140 *|      *
/* 141 *|      * Also, for Mozilla, there is no difference between the zoom factor and the device ratio.
/* 142 *|      *
/* 143 *|      * @return {Object}
/* 144 *|      * @private
/* 145 *|      */
/* 146 */     var firefox4 = function () {
/* 147 */         var zoom = mediaQueryBinarySearch('min--moz-device-pixel-ratio', '', 0, 10, 20, 0.0001);
/* 148 */         zoom = Math.round(zoom * 100) / 100;
/* 149 */         return {
/* 150 */             zoom: zoom,

/* detect-zoom.js */

/* 151 */             devicePxPerCssPx: zoom
/* 152 */         };
/* 153 */     };
/* 154 */ 
/* 155 */     /**
/* 156 *|      * Firefox 18.x
/* 157 *|      * Mozilla added support for devicePixelRatio to Firefox 18,
/* 158 *|      * but it is affected by the zoom level, so, like in older
/* 159 *|      * Firefox we can't tell if we are in zoom mode or in a device
/* 160 *|      * with a different pixel ratio
/* 161 *|      * @return {Object}
/* 162 *|      * @private
/* 163 *|      */
/* 164 */     var firefox18 = function () {
/* 165 */         return {
/* 166 */             zoom: firefox4().zoom,
/* 167 */             devicePxPerCssPx: devicePixelRatio()
/* 168 */         };
/* 169 */     };
/* 170 */ 
/* 171 */     /**
/* 172 *|      * works starting Opera 11.11
/* 173 *|      * the trick: outerWidth is the viewport width including scrollbars in
/* 174 *|      * system px, while innerWidth is the viewport width including scrollbars
/* 175 *|      * in CSS px
/* 176 *|      * @return {Object}
/* 177 *|      * @private
/* 178 *|      */
/* 179 */     var opera11 = function () {
/* 180 */         var zoom = window.top.outerWidth / window.top.innerWidth;
/* 181 */         zoom = Math.round(zoom * 100) / 100;
/* 182 */         return {
/* 183 */             zoom: zoom,
/* 184 */             devicePxPerCssPx: zoom * devicePixelRatio()
/* 185 */         };
/* 186 */     };
/* 187 */ 
/* 188 */     /**
/* 189 *|      * Use a binary search through media queries to find zoom level in Firefox
/* 190 *|      * @param property
/* 191 *|      * @param unit
/* 192 *|      * @param a
/* 193 *|      * @param b
/* 194 *|      * @param maxIter
/* 195 *|      * @param epsilon
/* 196 *|      * @return {Number}
/* 197 *|      */
/* 198 */     var mediaQueryBinarySearch = function (property, unit, a, b, maxIter, epsilon) {
/* 199 */         var matchMedia;
/* 200 */         var head, style, div;

/* detect-zoom.js */

/* 201 */         if (window.matchMedia) {
/* 202 */             matchMedia = window.matchMedia;
/* 203 */         } else {
/* 204 */             head = document.getElementsByTagName('head')[0];
/* 205 */             style = document.createElement('style');
/* 206 */             head.appendChild(style);
/* 207 */ 
/* 208 */             div = document.createElement('div');
/* 209 */             div.className = 'mediaQueryBinarySearch';
/* 210 */             div.style.display = 'none';
/* 211 */             document.body.appendChild(div);
/* 212 */ 
/* 213 */             matchMedia = function (query) {
/* 214 */                 style.sheet.insertRule('@media ' + query + '{.mediaQueryBinarySearch ' + '{text-decoration: underline} }', 0);
/* 215 */                 var matched = getComputedStyle(div, null).textDecoration == 'underline';
/* 216 */                 style.sheet.deleteRule(0);
/* 217 */                 return {matches: matched};
/* 218 */             };
/* 219 */         }
/* 220 */         var ratio = binarySearch(a, b, maxIter);
/* 221 */         if (div) {
/* 222 */             head.removeChild(style);
/* 223 */             document.body.removeChild(div);
/* 224 */         }
/* 225 */         return ratio;
/* 226 */ 
/* 227 */         function binarySearch(a, b, maxIter) {
/* 228 */             var mid = (a + b) / 2;
/* 229 */             if (maxIter <= 0 || b - a < epsilon) {
/* 230 */                 return mid;
/* 231 */             }
/* 232 */             var query = "(" + property + ":" + mid + unit + ")";
/* 233 */             if (matchMedia(query).matches) {
/* 234 */                 return binarySearch(mid, b, maxIter - 1);
/* 235 */             } else {
/* 236 */                 return binarySearch(a, mid, maxIter - 1);
/* 237 */             }
/* 238 */         }
/* 239 */     };
/* 240 */ 
/* 241 */     /**
/* 242 *|      * Generate detection function
/* 243 *|      * @private
/* 244 *|      */
/* 245 */     var detectFunction = (function () {
/* 246 */         var func = fallback;
/* 247 */         //IE8+
/* 248 */         if (!isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) {
/* 249 */             func = ie8;
/* 250 */         }

/* detect-zoom.js */

/* 251 */         // IE10+ / Touch
/* 252 */         else if (window.navigator.msMaxTouchPoints) {
/* 253 */             func = ie10;
/* 254 */         }
/* 255 */         //Mobile Webkit
/* 256 */         else if ('orientation' in window && typeof document.body.style.webkitMarquee === 'string') {
/* 257 */             func = webkitMobile;
/* 258 */         }
/* 259 */         //WebKit
/* 260 */         else if (document.body != null && typeof document.body.style.webkitMarquee === 'string') {
/* 261 */             func = webkit;
/* 262 */         }
/* 263 */         //Opera
/* 264 */         else if (navigator.userAgent.indexOf('Opera') >= 0) {
/* 265 */             func = opera11;
/* 266 */         }
/* 267 */         //Last one is Firefox
/* 268 */         //FF 18.x
/* 269 */         else if (window.devicePixelRatio) {
/* 270 */             func = firefox18;
/* 271 */         }
/* 272 */         //FF 4.0 - 17.x
/* 273 */         else if (firefox4().zoom > 0.001) {
/* 274 */             func = firefox4;
/* 275 */         }
/* 276 */ 
/* 277 */         return func;
/* 278 */     }());
/* 279 */ 
/* 280 */ 
/* 281 */     return ({
/* 282 */ 
/* 283 */         /**
/* 284 *|          * Ratios.zoom shorthand
/* 285 *|          * @return {Number} Zoom level
/* 286 *|          */
/* 287 */         zoom: function () {
/* 288 */             return detectFunction().zoom;
/* 289 */         },
/* 290 */ 
/* 291 */         /**
/* 292 *|          * Ratios.devicePxPerCssPx shorthand
/* 293 *|          * @return {Number} devicePxPerCssPx level
/* 294 *|          */
/* 295 */         device: function () {
/* 296 */             return detectFunction().devicePxPerCssPx;
/* 297 */         }
/* 298 */     });
/* 299 */ }));
/* 300 */ 

/* detect-zoom.js */

/* 301 */ 
/* 302 */ /*Alerta para o zoom na página*/
/* 303 */ window.addEvent('domready', function() {
/* 304 */ 	/*TODO Removido alerta. Geralmente no chrome não funciona, mas no firefox sim.
/* 305 *| 	 * Hoje dia 31/10/2014 alguns clientes entraram em contato sobre esse problema. Porém antes estava funcionando, creio que pode ser uma atualização do chrome
/* 306 *| 	*/
/* 307 */ 	/*if(detectZoom.device() != 1 && detectZoom.device() != 2){
/* 308 *| 		var sexy = (parent.Sexy != null) ? parent.Sexy : Sexy;
/* 309 *| 		var a = parent.document.getElementById("zoomAlert");
/* 310 *| 		sexy.error(a.innerHTML, {
/* 311 *| 			'textBoxBtnOk' : a.getAttribute("btn_label")
/* 312 *| 		});
/* 313 *| 	}*/
/* 314 */ });
/* 315 */ 
