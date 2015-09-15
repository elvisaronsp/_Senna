
/* mootools-1.2-core.js */

/* 1   */ //MooTools, <http://mootools.net>, My Object Oriented (JavaScript) Tools. Copyright (c) 2006-2008 Valerio Proietti, <http://mad4milk.net>, MIT Style License.
/* 2   */ 
/* 3   */ String.prototype.contains = function(string, separator){return (separator) ? (separator + this + separator).indexOf(separator + string + separator) > -1 : String(this).indexOf(string) > -1;};
/* 4   */ 
/* 5   */ var MooTools={version:"1.2.0",build:""};var Native=function(J){J=J||{};var F=J.afterImplement||function(){};var G=J.generics;G=(G!==false);var H=J.legacy;
/* 6   */ var E=J.initialize;var B=J.protect;var A=J.name;var C=E||H;C.constructor=Native;C.$family={name:"native"};if(H&&E){C.prototype=H.prototype;}C.prototype.constructor=C;
/* 7   */ if(A){var D=A.toLowerCase();C.prototype.$family={name:D};Native.typize(C,D);}var I=function(M,K,N,L){if(!B||L||!M.prototype[K]){M.prototype[K]=N;}if(G){Native.genericize(M,K,B);
/* 8   */ }F.call(M,K,N);return M;};C.implement=function(L,K,N){if(typeof L=="string"){return I(this,L,K,N);}for(var M in L){I(this,M,L[M],K);}return this;};C.alias=function(M,K,N){if(typeof M=="string"){M=this.prototype[M];
/* 9   */ if(M){I(this,K,M,N);}}else{for(var L in M){this.alias(L,M[L],K);}}return this;};return C;};Native.implement=function(D,C){for(var B=0,A=D.length;B<A;B++){D[B].implement(C);
/* 10  */ }};Native.genericize=function(B,C,A){if((!A||!B[C])&&typeof B.prototype[C]=="function"){B[C]=function(){var D=Array.prototype.slice.call(arguments);return B.prototype[C].apply(D.shift(),D);
/* 11  */ };}};Native.typize=function(A,B){if(!A.type){A.type=function(C){return($type(C)===B);};}};Native.alias=function(E,B,A,F){for(var D=0,C=E.length;D<C;D++){E[D].alias(B,A,F);
/* 12  */ }};(function(B){for(var A in B){Native.typize(B[A],A);}})({"boolean":Boolean,"native":Native,object:Object});(function(B){for(var A in B){new Native({name:A,initialize:B[A],protect:true});
/* 13  */ }})({String:String,Function:Function,Number:Number,Array:Array,RegExp:RegExp,Date:Date});(function(B,A){for(var C=A.length;C--;C){Native.genericize(B,A[C],true);
/* 14  */ }return arguments.callee;})(Array,["pop","push","reverse","shift","sort","splice","unshift","concat","join","slice","toString","valueOf","indexOf","lastIndexOf"])(String,["charAt","charCodeAt","concat","indexOf","lastIndexOf","match","replace","search","slice","split","substr","substring","toLowerCase","toUpperCase","valueOf"]);
/* 15  */ function $chk(A){return !!(A||A===0);}function $clear(A){clearTimeout(A);clearInterval(A);return null;}function $defined(A){return(A!=undefined);}function $empty(){}function $arguments(A){return function(){return arguments[A];
/* 16  */ };}function $lambda(A){return(typeof A=="function")?A:function(){return A;};}function $extend(C,A){for(var B in (A||{})){C[B]=A[B];}return C;}function $unlink(C){var B;
/* 17  */ switch($type(C)){case"object":B={};for(var E in C){B[E]=$unlink(C[E]);}break;case"hash":B=$unlink(C.getClean());break;case"array":B=[];for(var D=0,A=C.length;
/* 18  */ D<A;D++){B[D]=$unlink(C[D]);}break;default:return C;}return B;}function $merge(){var E={};for(var D=0,A=arguments.length;D<A;D++){var B=arguments[D];if($type(B)!="object"){continue;
/* 19  */ }for(var C in B){var G=B[C],F=E[C];E[C]=(F&&$type(G)=="object"&&$type(F)=="object")?$merge(F,G):$unlink(G);}}return E;}function $pick(){for(var B=0,A=arguments.length;
/* 20  */ B<A;B++){if(arguments[B]!=undefined){return arguments[B];}}return null;}function $random(B,A){return Math.floor(Math.random()*(A-B+1)+B);}function $splat(B){var A=$type(B);
/* 21  */ return(A)?((A!="array"&&A!="arguments")?[B]:B):[];}var $time=Date.now||function(){return new Date().getTime();};function $try(){for(var B=0,A=arguments.length;
/* 22  */ B<A;B++){try{return arguments[B]();}catch(C){}}return null;}function $type(A){if(A==undefined){return false;}if(A.$family){return(A.$family.name=="number"&&!isFinite(A))?false:A.$family.name;
/* 23  */ }if(A.nodeName){switch(A.nodeType){case 1:return"element";case 3:return(/\S/).test(A.nodeValue)?"textnode":"whitespace";}}else{if(typeof A.length=="number"){if(A.callee){return"arguments";
/* 24  */ }else{if(A.item){return"collection";}}}}return typeof A;}var Hash=new Native({name:"Hash",initialize:function(A){if($type(A)=="hash"){A=$unlink(A.getClean());
/* 25  */ }for(var B in A){this[B]=A[B];}return this;}});Hash.implement({getLength:function(){var B=0;for(var A in this){if(this.hasOwnProperty(A)){B++;}}return B;
/* 26  */ },forEach:function(B,C){for(var A in this){if(this.hasOwnProperty(A)){B.call(C,this[A],A,this);}}},getClean:function(){var B={};for(var A in this){if(this.hasOwnProperty(A)){B[A]=this[A];
/* 27  */ }}return B;}});Hash.alias("forEach","each");function $H(A){return new Hash(A);}Array.implement({forEach:function(C,D){for(var B=0,A=this.length;B<A;B++){C.call(D,this[B],B,this);
/* 28  */ }}});Array.alias("forEach","each");function $A(C){if(C.item){var D=[];for(var B=0,A=C.length;B<A;B++){D[B]=C[B];}return D;}return Array.prototype.slice.call(C);
/* 29  */ }function $each(C,B,D){var A=$type(C);((A=="arguments"||A=="collection"||A=="array")?Array:Hash).each(C,B,D);}var Browser=new Hash({Engine:{name:"unknown",version:""},Platform:{name:(navigator.platform.match(/mac|win|linux/i)||["other"])[0].toLowerCase()},Features:{xpath:!!(document.evaluate),air:!!(window.runtime)},Plugins:{}});
/* 30  */ if(window.opera){Browser.Engine={name:"presto",version:(document.getElementsByClassName)?950:925};}else{if(window.ActiveXObject){Browser.Engine={name:"trident",version:(window.XMLHttpRequest)?5:4};
/* 31  */ }else{if(!navigator.taintEnabled){Browser.Engine={name:"webkit",version:(Browser.Features.xpath)?420:419};}else{if(document.getBoxObjectFor!=null){Browser.Engine={name:"gecko",version:(document.getElementsByClassName)?19:18};
/* 32  */ }}}}Browser.Engine[Browser.Engine.name]=Browser.Engine[Browser.Engine.name+Browser.Engine.version]=true;if(window.orientation!=undefined){Browser.Platform.name="ipod";
/* 33  */ }Browser.Platform[Browser.Platform.name]=true;Browser.Request=function(){return $try(function(){return new XMLHttpRequest();},function(){return new ActiveXObject("MSXML2.XMLHTTP");
/* 34  */ });};Browser.Features.xhr=!!(Browser.Request());Browser.Plugins.Flash=(function(){var A=($try(function(){return navigator.plugins["Shockwave Flash"].description;
/* 35  */ },function(){return new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version");})||"0 r0").match(/\d+/g);return{version:parseInt(A[0]||0+"."+A[1]||0),build:parseInt(A[2]||0)};
/* 36  */ })();function $exec(B){if(!B){return B;}if(window.execScript){window.execScript(B);}else{var A=document.createElement("script");A.setAttribute("type","text/javascript");
/* 37  */ A.text=B;document.head.appendChild(A);document.head.removeChild(A);}return B;}Native.UID=1;var $uid=(Browser.Engine.trident)?function(A){return(A.uid||(A.uid=[Native.UID++]))[0];
/* 38  */ }:function(A){return A.uid||(A.uid=Native.UID++);};var Window=new Native({name:"Window",legacy:(Browser.Engine.trident)?null:window.Window,initialize:function(A){$uid(A);
/* 39  */ if(!A.Element){A.Element=$empty;if(Browser.Engine.webkit){A.document.createElement("iframe");}A.Element.prototype=(Browser.Engine.webkit)?window["[[DOMElement.prototype]]"]:{};
/* 40  */ }return $extend(A,Window.Prototype);},afterImplement:function(B,A){window[B]=Window.Prototype[B]=A;}});Window.Prototype={$family:{name:"window"}};new Window(window);
/* 41  */ var Document=new Native({name:"Document",legacy:(Browser.Engine.trident)?null:window.Document,initialize:function(A){$uid(A);A.head=A.getElementsByTagName("head")[0];
/* 42  */ A.html=A.getElementsByTagName("html")[0];A.window=A.defaultView||A.parentWindow;if(Browser.Engine.trident4){$try(function(){A.execCommand("BackgroundImageCache",false,true);
/* 43  */ });}return $extend(A,Document.Prototype);},afterImplement:function(B,A){document[B]=Document.Prototype[B]=A;}});Document.Prototype={$family:{name:"document"}};
/* 44  */ new Document(document);Array.implement({every:function(C,D){for(var B=0,A=this.length;B<A;B++){if(!C.call(D,this[B],B,this)){return false;}}return true;
/* 45  */ },filter:function(D,E){var C=[];for(var B=0,A=this.length;B<A;B++){if(D.call(E,this[B],B,this)){C.push(this[B]);}}return C;},clean:function(){return this.filter($defined);
/* 46  */ },indexOf:function(C,D){var A=this.length;for(var B=(D<0)?Math.max(0,A+D):D||0;B<A;B++){if(this[B]===C){return B;}}return -1;},map:function(D,E){var C=[];
/* 47  */ for(var B=0,A=this.length;B<A;B++){C[B]=D.call(E,this[B],B,this);}return C;},some:function(C,D){for(var B=0,A=this.length;B<A;B++){if(C.call(D,this[B],B,this)){return true;
/* 48  */ }}return false;},associate:function(C){var D={},B=Math.min(this.length,C.length);for(var A=0;A<B;A++){D[C[A]]=this[A];}return D;},link:function(C){var A={};
/* 49  */ for(var E=0,B=this.length;E<B;E++){for(var D in C){if(C[D](this[E])){A[D]=this[E];delete C[D];break;}}}return A;},contains:function(A,B){return this.indexOf(A,B)!=-1;
/* 50  */ },extend:function(C){for(var B=0,A=C.length;B<A;B++){this.push(C[B]);}return this;},getLast:function(){return(this.length)?this[this.length-1]:null;},getRandom:function(){return(this.length)?this[$random(0,this.length-1)]:null;

/* mootools-1.2-core.js */

/* 51  */ },include:function(A){if(!this.contains(A)){this.push(A);}return this;},combine:function(C){for(var B=0,A=C.length;B<A;B++){this.include(C[B]);}return this;
/* 52  */ },erase:function(B){for(var A=this.length;A--;A){if(this[A]===B){this.splice(A,1);}}return this;},empty:function(){this.length=0;return this;},flatten:function(){var D=[];
/* 53  */ for(var B=0,A=this.length;B<A;B++){var C=$type(this[B]);if(!C){continue;}D=D.concat((C=="array"||C=="collection"||C=="arguments")?Array.flatten(this[B]):this[B]);
/* 54  */ }return D;},hexToRgb:function(B){if(this.length!=3){return null;}var A=this.map(function(C){if(C.length==1){C+=C;}return C.toInt(16);});return(B)?A:"rgb("+A+")";
/* 55  */ },rgbToHex:function(D){if(this.length<3){return null;}if(this.length==4&&this[3]==0&&!D){return"transparent";}var B=[];for(var A=0;A<3;A++){var C=(this[A]-0).toString(16);
/* 56  */ B.push((C.length==1)?"0"+C:C);}return(D)?B:"#"+B.join("");}});Function.implement({extend:function(A){for(var B in A){this[B]=A[B];}return this;},create:function(B){var A=this;
/* 57  */ B=B||{};return function(D){var C=B.arguments;C=(C!=undefined)?$splat(C):Array.slice(arguments,(B.event)?1:0);if(B.event){C=[D||window.event].extend(C);
/* 58  */ }var E=function(){return A.apply(B.bind||null,C);};if(B.delay){return setTimeout(E,B.delay);}if(B.periodical){return setInterval(E,B.periodical);}if(B.attempt){return $try(E);
/* 59  */ }return E();};},pass:function(A,B){return this.create({arguments:A,bind:B});},attempt:function(A,B){return this.create({arguments:A,bind:B,attempt:true})();
/* 60  */ },bind:function(B,A){return this.create({bind:B,arguments:A});},bindWithEvent:function(B,A){return this.create({bind:B,event:true,arguments:A});},delay:function(B,C,A){return this.create({delay:B,bind:C,arguments:A})();
/* 61  */ },periodical:function(A,C,B){return this.create({periodical:A,bind:C,arguments:B})();},run:function(A,B){return this.apply(B,$splat(A));}});Number.implement({limit:function(B,A){return Math.min(A,Math.max(B,this));
/* 62  */ },round:function(A){A=Math.pow(10,A||0);return Math.round(this*A)/A;},times:function(B,C){for(var A=0;A<this;A++){B.call(C,A,this);}},toFloat:function(){return parseFloat(this);
/* 63  */ },toInt:function(A){return parseInt(this,A||10);}});Number.alias("times","each");(function(B){var A={};B.each(function(C){if(!Number[C]){A[C]=function(){return Math[C].apply(null,[this].concat($A(arguments)));
/* 64  */ };}});Number.implement(A);})(["abs","acos","asin","atan","atan2","ceil","cos","exp","floor","log","max","min","pow","sin","sqrt","tan"]);String.implement({test:function(A,B){return((typeof A=="string")?new RegExp(A,B):A).test(this);
/* 65  */ },contains:function(A,B){return(B)?(B+this+B).indexOf(B+A+B)>-1:this.indexOf(A)>-1;},trim:function(){return this.replace(/^\s+|\s+$/g,"");},clean:function(){return this.replace(/\s+/g," ").trim();
/* 66  */ },camelCase:function(){return this.replace(/-\D/g,function(A){return A.charAt(1).toUpperCase();});},hyphenate:function(){return this.replace(/[A-Z]/g,function(A){return("-"+A.charAt(0).toLowerCase());
/* 67  */ });},capitalize:function(){return this.replace(/\b[a-z]/g,function(A){return A.toUpperCase();});},escapeRegExp:function(){return this.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1");
/* 68  */ },toInt:function(A){return parseInt(this,A||10);},toFloat:function(){return parseFloat(this);},hexToRgb:function(B){var A=this.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
/* 69  */ return(A)?A.slice(1).hexToRgb(B):null;},rgbToHex:function(B){var A=this.match(/\d{1,3}/g);return(A)?A.rgbToHex(B):null;},stripScripts:function(B){var A="";
/* 70  */ var C=this.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){A+=arguments[1]+"\n";return"";});if(B===true){$exec(A);}else{if($type(B)=="function"){B(A,C);
/* 71  */ }}return C;},substitute:function(A,B){return this.replace(B||(/\\?\{([^}]+)\}/g),function(D,C){if(D.charAt(0)=="\\"){return D.slice(1);}return(A[C]!=undefined)?A[C]:"";
/* 72  */ });}});Hash.implement({has:Object.prototype.hasOwnProperty,keyOf:function(B){for(var A in this){if(this.hasOwnProperty(A)&&this[A]===B){return A;}}return null;
/* 73  */ },hasValue:function(A){return(Hash.keyOf(this,A)!==null);},extend:function(A){Hash.each(A,function(C,B){Hash.set(this,B,C);},this);return this;},combine:function(A){Hash.each(A,function(C,B){Hash.include(this,B,C);
/* 74  */ },this);return this;},erase:function(A){if(this.hasOwnProperty(A)){delete this[A];}return this;},get:function(A){return(this.hasOwnProperty(A))?this[A]:null;
/* 75  */ },set:function(A,B){if(!this[A]||this.hasOwnProperty(A)){this[A]=B;}return this;},empty:function(){Hash.each(this,function(B,A){delete this[A];},this);
/* 76  */ return this;},include:function(B,C){var A=this[B];if(A==undefined){this[B]=C;}return this;},map:function(B,C){var A=new Hash;Hash.each(this,function(E,D){A.set(D,B.call(C,E,D,this));
/* 77  */ },this);return A;},filter:function(B,C){var A=new Hash;Hash.each(this,function(E,D){if(B.call(C,E,D,this)){A.set(D,E);}},this);return A;},every:function(B,C){for(var A in this){if(this.hasOwnProperty(A)&&!B.call(C,this[A],A)){return false;
/* 78  */ }}return true;},some:function(B,C){for(var A in this){if(this.hasOwnProperty(A)&&B.call(C,this[A],A)){return true;}}return false;},getKeys:function(){var A=[];
/* 79  */ Hash.each(this,function(C,B){A.push(B);});return A;},getValues:function(){var A=[];Hash.each(this,function(B){A.push(B);});return A;},toQueryString:function(A){var B=[];
/* 80  */ Hash.each(this,function(F,E){if(A){E=A+"["+E+"]";}var D;switch($type(F)){case"object":D=Hash.toQueryString(F,E);break;case"array":var C={};F.each(function(H,G){C[G]=H;
/* 81  */ });D=Hash.toQueryString(C,E);break;default:D=E+"="+encodeURIComponent(F);}if(F!=undefined){B.push(D);}});return B.join("&");}});Hash.alias({keyOf:"indexOf",hasValue:"contains"});
/* 82  */ var Event=new Native({name:"Event",initialize:function(A,F){F=F||window;var K=F.document;A=A||F.event;if(A.$extended){return A;}this.$extended=true;var J=A.type;
/* 83  */ var G=A.target||A.srcElement;while(G&&G.nodeType==3){G=G.parentNode;}if(J.test(/key/)){var B=A.which||A.keyCode;var M=Event.Keys.keyOf(B);if(J=="keydown"){var D=B-111;
/* 84  */ if(D>0&&D<13){M="f"+D;}}M=M||String.fromCharCode(B).toLowerCase();}else{if(J.match(/(click|mouse|menu)/i)){K=(!K.compatMode||K.compatMode=="CSS1Compat")?K.html:K.body;
/* 85  */ var I={x:A.pageX||A.clientX+K.scrollLeft,y:A.pageY||A.clientY+K.scrollTop};var C={x:(A.pageX)?A.pageX-F.pageXOffset:A.clientX,y:(A.pageY)?A.pageY-F.pageYOffset:A.clientY};
/* 86  */ if(J.match(/DOMMouseScroll|mousewheel/)){var H=(A.wheelDelta)?A.wheelDelta/120:-(A.detail||0)/3;}var E=(A.which==3)||(A.button==2);var L=null;if(J.match(/over|out/)){switch(J){case"mouseover":L=A.relatedTarget||A.fromElement;
/* 87  */ break;case"mouseout":L=A.relatedTarget||A.toElement;}if(!(function(){while(L&&L.nodeType==3){L=L.parentNode;}return true;}).create({attempt:Browser.Engine.gecko})()){L=false;
/* 88  */ }}}}return $extend(this,{event:A,type:J,page:I,client:C,rightClick:E,wheel:H,relatedTarget:L,target:G,code:B,key:M,shift:A.shiftKey,control:A.ctrlKey,alt:A.altKey,meta:A.metaKey});
/* 89  */ }});Event.Keys=new Hash({enter:13,up:38,down:40,left:37,right:39,esc:27,space:32,backspace:8,tab:9,"delete":46});Event.implement({stop:function(){return this.stopPropagation().preventDefault();
/* 90  */ },stopPropagation:function(){if(this.event.stopPropagation){this.event.stopPropagation();}else{this.event.cancelBubble=true;}return this;},preventDefault:function(){if(this.event.preventDefault){this.event.preventDefault();
/* 91  */ }else{this.event.returnValue=false;}return this;}});var Class=new Native({name:"Class",initialize:function(B){B=B||{};var A=function(E){for(var D in this){this[D]=$unlink(this[D]);
/* 92  */ }for(var F in Class.Mutators){if(!this[F]){continue;}Class.Mutators[F](this,this[F]);delete this[F];}this.constructor=A;if(E===$empty){return this;}var C=(this.initialize)?this.initialize.apply(this,arguments):this;
/* 93  */ if(this.options&&this.options.initialize){this.options.initialize.call(this);}return C;};$extend(A,this);A.constructor=Class;A.prototype=B;return A;}});
/* 94  */ Class.implement({implement:function(){Class.Mutators.Implements(this.prototype,Array.slice(arguments));return this;}});Class.Mutators={Implements:function(A,B){$splat(B).each(function(C){$extend(A,($type(C)=="class")?new C($empty):C);
/* 95  */ });},Extends:function(self,klass){var instance=new klass($empty);delete instance.parent;delete instance.parentOf;for(var key in instance){var current=self[key],previous=instance[key];
/* 96  */ if(current==undefined){self[key]=previous;continue;}var ctype=$type(current),ptype=$type(previous);if(ctype!=ptype){continue;}switch(ctype){case"function":if(!arguments.callee.caller){self[key]=eval("("+String(current).replace(/\bthis\.parent\(\s*(\))?/g,function(full,close){return"arguments.callee._parent_.call(this"+(close||", ");
/* 97  */ })+")");}self[key]._parent_=previous;break;case"object":self[key]=$merge(previous,current);}}self.parent=function(){return arguments.callee.caller._parent_.apply(this,arguments);
/* 98  */ };self.parentOf=function(descendant){return descendant._parent_.apply(this,Array.slice(arguments,1));};}};var Chain=new Class({chain:function(){this.$chain=(this.$chain||[]).extend(arguments);
/* 99  */ return this;},callChain:function(){return(this.$chain&&this.$chain.length)?this.$chain.shift().apply(this,arguments):false;},clearChain:function(){if(this.$chain){this.$chain.empty();
/* 100 */ }return this;}});var Events=new Class({addEvent:function(C,B,A){C=Events.removeOn(C);if(B!=$empty){this.$events=this.$events||{};this.$events[C]=this.$events[C]||[];

/* mootools-1.2-core.js */

/* 101 */ this.$events[C].include(B);if(A){B.internal=true;}}return this;},addEvents:function(A){for(var B in A){this.addEvent(B,A[B]);}return this;},fireEvent:function(C,B,A){C=Events.removeOn(C);
/* 102 */ if(!this.$events||!this.$events[C]){return this;}this.$events[C].each(function(D){D.create({bind:this,delay:A,"arguments":B})();},this);return this;},removeEvent:function(B,A){B=Events.removeOn(B);
/* 103 */ if(!this.$events||!this.$events[B]){return this;}if(!A.internal){this.$events[B].erase(A);}return this;},removeEvents:function(C){for(var D in this.$events){if(C&&C!=D){continue;
/* 104 */ }var B=this.$events[D];for(var A=B.length;A--;A){this.removeEvent(D,B[A]);}}return this;}});Events.removeOn=function(A){return A.replace(/^on([A-Z])/,function(B,C){return C.toLowerCase();
/* 105 */ });};var Options=new Class({setOptions:function(){this.options=$merge.run([this.options].extend(arguments));if(!this.addEvent){return this;}for(var A in this.options){if($type(this.options[A])!="function"||!(/^on[A-Z]/).test(A)){continue;
/* 106 */ }this.addEvent(A,this.options[A]);delete this.options[A];}return this;}});Document.implement({newElement:function(A,B){if(Browser.Engine.trident&&B){["name","type","checked"].each(function(C){if(!B[C]){return ;
/* 107 */ }A+=" "+C+'="'+B[C]+'"';if(C!="checked"){delete B[C];}});A="<"+A+">";}return $.element(this.createElement(A)).set(B);},newTextNode:function(A){return this.createTextNode(A);
/* 108 */ },getDocument:function(){return this;},getWindow:function(){return this.defaultView||this.parentWindow;},purge:function(){var C=this.getElementsByTagName("*");
/* 109 */ for(var B=0,A=C.length;B<A;B++){Browser.freeMem(C[B]);}}});var Element=new Native({name:"Element",legacy:window.Element,initialize:function(A,B){var C=Element.Constructors.get(A);
/* 110 */ if(C){return C(B);}if(typeof A=="string"){return document.newElement(A,B);}return $(A).set(B);},afterImplement:function(A,B){if(!Array[A]){Elements.implement(A,Elements.multi(A));
/* 111 */ }Element.Prototype[A]=B;}});Element.Prototype={$family:{name:"element"}};Element.Constructors=new Hash;var IFrame=new Native({name:"IFrame",generics:false,initialize:function(){var E=Array.link(arguments,{properties:Object.type,iframe:$defined});
/* 112 */ var C=E.properties||{};var B=$(E.iframe)||false;var D=C.onload||$empty;delete C.onload;C.id=C.name=$pick(C.id,C.name,B.id,B.name,"IFrame_"+$time());B=new Element(B||"iframe",C);
/* 113 */ var A=function(){var F=$try(function(){return B.contentWindow.location.host;});if(F&&F==window.location.host){var H=new Window(B.contentWindow);var G=new Document(B.contentWindow.document);
/* 114 */ $extend(H.Element.prototype,Element.Prototype);}D.call(B.contentWindow,B.contentWindow.document);};(!window.frames[C.id])?B.addListener("load",A):A();return B;
/* 115 */ }});var Elements=new Native({initialize:function(F,B){B=$extend({ddup:true,cash:true},B);F=F||[];if(B.ddup||B.cash){var G={},E=[];for(var C=0,A=F.length;
/* 116 */ C<A;C++){var D=$.element(F[C],!B.cash);if(B.ddup){if(G[D.uid]){continue;}G[D.uid]=true;}E.push(D);}F=E;}return(B.cash)?$extend(F,this):F;}});Elements.implement({filter:function(A,B){if(!A){return this;
/* 117 */ }return new Elements(Array.filter(this,(typeof A=="string")?function(C){return C.match(A);}:A,B));}});Elements.multi=function(A){return function(){var B=[];
/* 118 */ var F=true;for(var D=0,C=this.length;D<C;D++){var E=this[D][A].apply(this[D],arguments);B.push(E);if(F){F=($type(E)=="element");}}return(F)?new Elements(B):B;
/* 119 */ };};Window.implement({$:function(B,C){if(B&&B.$family&&B.uid){return B;}var A=$type(B);return($[A])?$[A](B,C,this.document):null;},$$:function(A){if(arguments.length==1&&typeof A=="string"){return this.document.getElements(A);
/* 120 */ }var F=[];var C=Array.flatten(arguments);for(var D=0,B=C.length;D<B;D++){var E=C[D];switch($type(E)){case"element":E=[E];break;case"string":E=this.document.getElements(E,true);
/* 121 */ break;default:E=false;}if(E){F.extend(E);}}return new Elements(F);},getDocument:function(){return this.document;},getWindow:function(){return this;}});
/* 122 */ $.string=function(C,B,A){C=A.getElementById(C);return(C)?$.element(C,B):null;};$.element=function(A,D){$uid(A);if(!D&&!A.$family&&!(/^object|embed$/i).test(A.tagName)){var B=Element.Prototype;
/* 123 */ for(var C in B){A[C]=B[C];}}return A;};$.object=function(B,C,A){if(B.toElement){return $.element(B.toElement(A),C);}return null;};$.textnode=$.whitespace=$.window=$.document=$arguments(0);
/* 124 */ Native.implement([Element,Document],{getElement:function(A,B){return $(this.getElements(A,true)[0]||null,B);},getElements:function(A,D){A=A.split(",");
/* 125 */ var C=[];var B=(A.length>1);A.each(function(E){var F=this.getElementsByTagName(E.trim());(B)?C.extend(F):C=F;},this);return new Elements(C,{ddup:B,cash:!D});
/* 126 */ }});Element.Storage={get:function(A){return(this[A]||(this[A]={}));}};Element.Inserters=new Hash({before:function(B,A){if(A.parentNode){A.parentNode.insertBefore(B,A);
/* 127 */ }},after:function(B,A){if(!A.parentNode){return ;}var C=A.nextSibling;(C)?A.parentNode.insertBefore(B,C):A.parentNode.appendChild(B);},bottom:function(B,A){A.appendChild(B);
/* 128 */ },top:function(B,A){var C=A.firstChild;(C)?A.insertBefore(B,C):A.appendChild(B);}});Element.Inserters.inside=Element.Inserters.bottom;Element.Inserters.each(function(C,B){var A=B.capitalize();
/* 129 */ Element.implement("inject"+A,function(D){C(this,$(D,true));return this;});Element.implement("grab"+A,function(D){C($(D,true),this);return this;});});Element.implement({getDocument:function(){return this.ownerDocument;
/* 130 */ },getWindow:function(){return this.ownerDocument.getWindow();},getElementById:function(D,C){var B=this.ownerDocument.getElementById(D);if(!B){return null;
/* 131 */ }for(var A=B.parentNode;A!=this;A=A.parentNode){if(!A){return null;}}return $.element(B,C);},set:function(D,B){switch($type(D)){case"object":for(var C in D){this.set(C,D[C]);
/* 132 */ }break;case"string":var A=Element.Properties.get(D);(A&&A.set)?A.set.apply(this,Array.slice(arguments,1)):this.setProperty(D,B);}return this;},get:function(B){var A=Element.Properties.get(B);
/* 133 */ return(A&&A.get)?A.get.apply(this,Array.slice(arguments,1)):this.getProperty(B);},erase:function(B){var A=Element.Properties.get(B);(A&&A.erase)?A.erase.apply(this,Array.slice(arguments,1)):this.removeProperty(B);
/* 134 */ return this;},match:function(A){return(!A||Element.get(this,"tag")==A);},inject:function(B,A){Element.Inserters.get(A||"bottom")(this,$(B,true));return this;
/* 135 */ },wraps:function(B,A){B=$(B,true);return this.replaces(B).grab(B,A);},grab:function(B,A){Element.Inserters.get(A||"bottom")($(B,true),this);return this;
/* 136 */ },appendText:function(B,A){return this.grab(this.getDocument().newTextNode(B),A);},adopt:function(){Array.flatten(arguments).each(function(A){A=$(A,true);
/* 137 */ if(A){this.appendChild(A);}},this);return this;},dispose:function(){return(this.parentNode)?this.parentNode.removeChild(this):this;},clone:function(D,C){switch($type(this)){case"element":var H={};
/* 138 */ for(var G=0,E=this.attributes.length;G<E;G++){var B=this.attributes[G],L=B.nodeName.toLowerCase();if(Browser.Engine.trident&&(/input/i).test(this.tagName)&&(/width|height/).test(L)){continue;
/* 139 */ }var K=(L=="style"&&this.style)?this.style.cssText:B.nodeValue;if(!$chk(K)||L=="uid"||(L=="id"&&!C)){continue;}if(K!="inherit"&&["string","number"].contains($type(K))){H[L]=K;
/* 140 */ }}var J=new Element(this.nodeName.toLowerCase(),H);if(D!==false){for(var I=0,F=this.childNodes.length;I<F;I++){var A=Element.clone(this.childNodes[I],true,C);
/* 141 */ if(A){J.grab(A);}}}return J;case"textnode":return document.newTextNode(this.nodeValue);}return null;},replaces:function(A){A=$(A,true);A.parentNode.replaceChild(this,A);
/* 142 */ return this;},hasClass:function(A){return this.className.contains(A," ");},addClass:function(A){if(!this.hasClass(A)){this.className=(this.className+" "+A).clean();
/* 143 */ }return this;},removeClass:function(A){this.className=this.className.replace(new RegExp("(^|\\s)"+A+"(?:\\s|$)"),"$1").clean();return this;},toggleClass:function(A){return this.hasClass(A)?this.removeClass(A):this.addClass(A);
/* 144 */ },getComputedStyle:function(B){if(this.currentStyle){return this.currentStyle[B.camelCase()];}var A=this.getWindow().getComputedStyle(this,null);return(A)?A.getPropertyValue([B.hyphenate()]):null;
/* 145 */ },empty:function(){$A(this.childNodes).each(function(A){Browser.freeMem(A);Element.empty(A);Element.dispose(A);},this);return this;},destroy:function(){Browser.freeMem(this.empty().dispose());
/* 146 */ return null;},getSelected:function(){return new Elements($A(this.options).filter(function(A){return A.selected;}));},toQueryString:function(){var A=[];
/* 147 */ this.getElements("input, select, textarea").each(function(B){if(!B.name||B.disabled){return ;}var C=(B.tagName.toLowerCase()=="select")?Element.getSelected(B).map(function(D){return D.value;
/* 148 */ }):((B.type=="radio"||B.type=="checkbox")&&!B.checked)?null:B.value;$splat(C).each(function(D){if(D){A.push(B.name+"="+encodeURIComponent(D));}});});return A.join("&");
/* 149 */ },getProperty:function(C){var B=Element.Attributes,A=B.Props[C];var D=(A)?this[A]:this.getAttribute(C,2);return(B.Bools[C])?!!D:(A)?D:D||null;},getProperties:function(){var A=$A(arguments);
/* 150 */ return A.map(function(B){return this.getProperty(B);},this).associate(A);},setProperty:function(D,E){var C=Element.Attributes,B=C.Props[D],A=$defined(E);

/* mootools-1.2-core.js */

/* 151 */ if(B&&C.Bools[D]){E=(E||!A)?true:false;}else{if(!A){return this.removeProperty(D);}}(B)?this[B]=E:this.setAttribute(D,E);return this;},setProperties:function(A){for(var B in A){this.setProperty(B,A[B]);
/* 152 */ }return this;},removeProperty:function(D){var C=Element.Attributes,B=C.Props[D],A=(B&&C.Bools[D]);(B)?this[B]=(A)?false:"":this.removeAttribute(D);return this;
/* 153 */ },removeProperties:function(){Array.each(arguments,this.removeProperty,this);return this;}});(function(){var A=function(D,B,I,C,F,H){var E=D[I||B];var G=[];
/* 154 */ while(E){if(E.nodeType==1&&(!C||Element.match(E,C))){G.push(E);if(!F){break;}}E=E[B];}return(F)?new Elements(G,{ddup:false,cash:!H}):$(G[0],H);};Element.implement({getPrevious:function(B,C){return A(this,"previousSibling",null,B,false,C);
/* 155 */ },getAllPrevious:function(B,C){return A(this,"previousSibling",null,B,true,C);},getNext:function(B,C){return A(this,"nextSibling",null,B,false,C);},getAllNext:function(B,C){return A(this,"nextSibling",null,B,true,C);
/* 156 */ },getFirst:function(B,C){return A(this,"nextSibling","firstChild",B,false,C);},getLast:function(B,C){return A(this,"previousSibling","lastChild",B,false,C);
/* 157 */ },getParent:function(B,C){return A(this,"parentNode",null,B,false,C);},getParents:function(B,C){return A(this,"parentNode",null,B,true,C);},getChildren:function(B,C){return A(this,"nextSibling","firstChild",B,true,C);
/* 158 */ },hasChild:function(B){B=$(B,true);return(!!B&&$A(this.getElementsByTagName(B.tagName)).contains(B));}});})();Element.Properties=new Hash;Element.Properties.style={set:function(A){this.style.cssText=A;
/* 159 */ },get:function(){return this.style.cssText;},erase:function(){this.style.cssText="";}};Element.Properties.tag={get:function(){return this.tagName.toLowerCase();
/* 160 */ }};Element.Properties.href={get:function(){return(!this.href)?null:this.href.replace(new RegExp("^"+document.location.protocol+"//"+document.location.host),"");
/* 161 */ }};Element.Properties.html={set:function(){return this.innerHTML=Array.flatten(arguments).join("");}};Native.implement([Element,Window,Document],{addListener:function(B,A){if(this.addEventListener){this.addEventListener(B,A,false);
/* 162 */ }else{this.attachEvent("on"+B,A);}return this;},removeListener:function(B,A){if(this.removeEventListener){this.removeEventListener(B,A,false);}else{this.detachEvent("on"+B,A);
/* 163 */ }return this;},retrieve:function(B,A){var D=Element.Storage.get(this.uid);var C=D[B];if($defined(A)&&!$defined(C)){C=D[B]=A;}return $pick(C);},store:function(B,A){var C=Element.Storage.get(this.uid);
/* 164 */ C[B]=A;return this;},eliminate:function(A){var B=Element.Storage.get(this.uid);delete B[A];return this;}});Element.Attributes=new Hash({Props:{html:"innerHTML","class":"className","for":"htmlFor",text:(Browser.Engine.trident)?"innerText":"textContent"},Bools:["compact","nowrap","ismap","declare","noshade","checked","disabled","readonly","multiple","selected","noresize","defer"],Camels:["value","accessKey","cellPadding","cellSpacing","colSpan","frameBorder","maxLength","readOnly","rowSpan","tabIndex","useMap"]});
/* 165 */ Browser.freeMem=function(A){if(!A){return ;}if(Browser.Engine.trident&&(/object/i).test(A.tagName)){for(var B in A){if(typeof A[B]=="function"){A[B]=$empty;
/* 166 */ }}Element.dispose(A);}if(A.uid&&A.removeEvents){A.removeEvents();}};(function(B){var C=B.Bools,A=B.Camels;B.Bools=C=C.associate(C);Hash.extend(Hash.combine(B.Props,C),A.associate(A.map(function(D){return D.toLowerCase();
/* 167 */ })));B.erase("Camels");})(Element.Attributes);window.addListener("unload",function(){window.removeListener("unload",arguments.callee);document.purge();
/* 168 */ if(Browser.Engine.trident){CollectGarbage();}});Element.Properties.events={set:function(A){this.addEvents(A);}};Native.implement([Element,Window,Document],{addEvent:function(E,G){var H=this.retrieve("events",{});
/* 169 */ H[E]=H[E]||{keys:[],values:[]};if(H[E].keys.contains(G)){return this;}H[E].keys.push(G);var F=E,A=Element.Events.get(E),C=G,I=this;if(A){if(A.onAdd){A.onAdd.call(this,G);
/* 170 */ }if(A.condition){C=function(J){if(A.condition.call(this,J)){return G.call(this,J);}return false;};}F=A.base||F;}var D=function(){return G.call(I);};var B=Element.NativeEvents[F]||0;
/* 171 */ if(B){if(B==2){D=function(J){J=new Event(J,I.getWindow());if(C.call(I,J)===false){J.stop();}};}this.addListener(F,D);}H[E].values.push(D);return this;},removeEvent:function(D,C){var B=this.retrieve("events");
/* 172 */ if(!B||!B[D]){return this;}var G=B[D].keys.indexOf(C);if(G==-1){return this;}var A=B[D].keys.splice(G,1)[0];var F=B[D].values.splice(G,1)[0];var E=Element.Events.get(D);
/* 173 */ if(E){if(E.onRemove){E.onRemove.call(this,C);}D=E.base||D;}return(Element.NativeEvents[D])?this.removeListener(D,F):this;},addEvents:function(A){for(var B in A){this.addEvent(B,A[B]);
/* 174 */ }return this;},removeEvents:function(B){var A=this.retrieve("events");if(!A){return this;}if(!B){for(var C in A){this.removeEvents(C);}A=null;}else{if(A[B]){while(A[B].keys[0]){this.removeEvent(B,A[B].keys[0]);
/* 175 */ }A[B]=null;}}return this;},fireEvent:function(D,B,A){var C=this.retrieve("events");if(!C||!C[D]){return this;}C[D].keys.each(function(E){E.create({bind:this,delay:A,"arguments":B})();
/* 176 */ },this);return this;},cloneEvents:function(D,A){D=$(D);var C=D.retrieve("events");if(!C){return this;}if(!A){for(var B in C){this.cloneEvents(D,B);}}else{if(C[A]){C[A].keys.each(function(E){this.addEvent(A,E);
/* 177 */ },this);}}return this;}});Element.NativeEvents={click:2,dblclick:2,mouseup:2,mousedown:2,contextmenu:2,mousewheel:2,DOMMouseScroll:2,mouseover:2,mouseout:2,mousemove:2,selectstart:2,selectend:2,keydown:2,keypress:2,keyup:2,focus:2,blur:2,change:2,reset:2,select:2,submit:2,load:1,unload:1,beforeunload:2,resize:1,move:1,DOMContentLoaded:1,readystatechange:1,error:1,abort:1,scroll:1};
/* 178 */ (function(){var A=function(B){var C=B.relatedTarget;if(C==undefined){return true;}if(C===false){return false;}return($type(this)!="document"&&C!=this&&C.prefix!="xul"&&!this.hasChild(C));
/* 179 */ };Element.Events=new Hash({mouseenter:{base:"mouseover",condition:A},mouseleave:{base:"mouseout",condition:A},mousewheel:{base:(Browser.Engine.gecko)?"DOMMouseScroll":"mousewheel"}});
/* 180 */ })();Element.Properties.styles={set:function(A){this.setStyles(A);}};Element.Properties.opacity={set:function(A,B){if(!B){if(A==0){if(this.style.visibility!="hidden"){this.style.visibility="hidden";
/* 181 */ }}else{if(this.style.visibility!="visible"){this.style.visibility="visible";}}}if(!this.currentStyle||!this.currentStyle.hasLayout){this.style.zoom=1;}if(Browser.Engine.trident){this.style.filter=(A==1)?"":"alpha(opacity="+A*100+")";
/* 182 */ }this.style.opacity=A;this.store("opacity",A);},get:function(){return this.retrieve("opacity",1);}};Element.implement({setOpacity:function(A){return this.set("opacity",A,true);
/* 183 */ },getOpacity:function(){return this.get("opacity");},setStyle:function(B,A){switch(B){case"opacity":return this.set("opacity",parseFloat(A));case"float":B=(Browser.Engine.trident)?"styleFloat":"cssFloat";
/* 184 */ }B=B.camelCase();if($type(A)!="string"){var C=(Element.Styles.get(B)||"@").split(" ");A=$splat(A).map(function(E,D){if(!C[D]){return"";}return($type(E)=="number")?C[D].replace("@",Math.round(E)):E;
/* 185 */ }).join(" ");}else{if(A==String(Number(A))){A=Math.round(A);}}this.style[B]=A;return this;},getStyle:function(G){switch(G){case"opacity":return this.get("opacity");
/* 186 */ case"float":G=(Browser.Engine.trident)?"styleFloat":"cssFloat";}G=G.camelCase();var A=this.style[G];if(!$chk(A)){A=[];for(var F in Element.ShortStyles){if(G!=F){continue;
/* 187 */ }for(var E in Element.ShortStyles[F]){A.push(this.getStyle(E));}return A.join(" ");}A=this.getComputedStyle(G);}if(A){A=String(A);var C=A.match(/rgba?\([\d\s,]+\)/);
/* 188 */ if(C){A=A.replace(C[0],C[0].rgbToHex());}}if(Browser.Engine.presto||(Browser.Engine.trident&&!$chk(parseInt(A)))){if(G.test(/^(height|width)$/)){var B=(G=="width")?["left","right"]:["top","bottom"],D=0;
/* 189 */ B.each(function(H){D+=this.getStyle("border-"+H+"-width").toInt()+this.getStyle("padding-"+H).toInt();},this);return this["offset"+G.capitalize()]-D+"px";
/* 190 */ }if(Browser.Engine.presto&&String(A).test("px")){return A;}if(G.test(/(border(.+)Width|margin|padding)/)){return"0px";}}return A;},setStyles:function(B){for(var A in B){this.setStyle(A,B[A]);
/* 191 */ }return this;},getStyles:function(){var A={};Array.each(arguments,function(B){A[B]=this.getStyle(B);},this);return A;}});Element.Styles=new Hash({left:"@px",top:"@px",bottom:"@px",right:"@px",width:"@px",height:"@px",maxWidth:"@px",maxHeight:"@px",minWidth:"@px",minHeight:"@px",backgroundColor:"rgb(@, @, @)",backgroundPosition:"@px @px",color:"rgb(@, @, @)",fontSize:"@px",letterSpacing:"@px",lineHeight:"@px",clip:"rect(@px @px @px @px)",margin:"@px @px @px @px",padding:"@px @px @px @px",border:"@px @ rgb(@, @, @) @px @ rgb(@, @, @) @px @ rgb(@, @, @)",borderWidth:"@px @px @px @px",borderStyle:"@ @ @ @",borderColor:"rgb(@, @, @) rgb(@, @, @) rgb(@, @, @) rgb(@, @, @)",zIndex:"@",zoom:"@",fontWeight:"@",textIndent:"@px",opacity:"@"});
/* 192 */ Element.ShortStyles={margin:{},padding:{},border:{},borderWidth:{},borderStyle:{},borderColor:{}};["Top","Right","Bottom","Left"].each(function(G){var F=Element.ShortStyles;
/* 193 */ var B=Element.Styles;["margin","padding"].each(function(H){var I=H+G;F[H][I]=B[I]="@px";});var E="border"+G;F.border[E]=B[E]="@px @ rgb(@, @, @)";var D=E+"Width",A=E+"Style",C=E+"Color";
/* 194 */ F[E]={};F.borderWidth[D]=F[E][D]=B[D]="@px";F.borderStyle[A]=F[E][A]=B[A]="@";F.borderColor[C]=F[E][C]=B[C]="rgb(@, @, @)";});(function(){Element.implement({scrollTo:function(H,I){if(B(this)){this.getWindow().scrollTo(H,I);
/* 195 */ }else{this.scrollLeft=H;this.scrollTop=I;}return this;},getSize:function(){if(B(this)){return this.getWindow().getSize();}return{x:this.offsetWidth,y:this.offsetHeight};
/* 196 */ },getScrollSize:function(){if(B(this)){return this.getWindow().getScrollSize();}return{x:this.scrollWidth,y:this.scrollHeight};},getScroll:function(){if(B(this)){return this.getWindow().getScroll();
/* 197 */ }return{x:this.scrollLeft,y:this.scrollTop};},getScrolls:function(){var I=this,H={x:0,y:0};while(I&&!B(I)){H.x+=I.scrollLeft;H.y+=I.scrollTop;I=I.parentNode;
/* 198 */ }return H;},getOffsetParent:function(){var H=this;if(B(H)){return null;}if(!Browser.Engine.trident){return H.offsetParent;}while((H=H.parentNode)&&!B(H)){if(D(H,"position")!="static"){return H;
/* 199 */ }}return null;},getOffsets:function(){var I=this,H={x:0,y:0};if(B(this)){return H;}while(I&&!B(I)){H.x+=I.offsetLeft;H.y+=I.offsetTop;if(Browser.Engine.gecko){if(!F(I)){H.x+=C(I);
/* 200 */ H.y+=G(I);}var J=I.parentNode;if(J&&D(J,"overflow")!="visible"){H.x+=C(J);H.y+=G(J);}}else{if(I!=this&&(Browser.Engine.trident||Browser.Engine.webkit)){H.x+=C(I);

/* mootools-1.2-core.js */

/* 201 */ H.y+=G(I);}}I=I.offsetParent;if(Browser.Engine.trident){while(I&&!I.currentStyle.hasLayout){I=I.offsetParent;}}}if(Browser.Engine.gecko&&!F(this)){H.x-=C(this);
/* 202 */ H.y-=G(this);}return H;},getPosition:function(K){if(B(this)){return{x:0,y:0};}var L=this.getOffsets(),I=this.getScrolls();var H={x:L.x-I.x,y:L.y-I.y};var J=(K&&(K=$(K)))?K.getPosition():{x:0,y:0};
/* 203 */ return{x:H.x-J.x,y:H.y-J.y};},getCoordinates:function(J){if(B(this)){return this.getWindow().getCoordinates();}var H=this.getPosition(J),I=this.getSize();
/* 204 */ var K={left:H.x,top:H.y,width:I.x,height:I.y};K.right=K.left+K.width;K.bottom=K.top+K.height;return K;},computePosition:function(H){return{left:H.x-E(this,"margin-left"),top:H.y-E(this,"margin-top")};
/* 205 */ },position:function(H){return this.setStyles(this.computePosition(H));}});Native.implement([Document,Window],{getSize:function(){var I=this.getWindow();
/* 206 */ if(Browser.Engine.presto||Browser.Engine.webkit){return{x:I.innerWidth,y:I.innerHeight};}var H=A(this);return{x:H.clientWidth,y:H.clientHeight};},getScroll:function(){var I=this.getWindow();
/* 207 */ var H=A(this);return{x:I.pageXOffset||H.scrollLeft,y:I.pageYOffset||H.scrollTop};},getScrollSize:function(){var I=A(this);var H=this.getSize();return{x:Math.max(I.scrollWidth,H.x),y:Math.max(I.scrollHeight,H.y)};
/* 208 */ },getPosition:function(){return{x:0,y:0};},getCoordinates:function(){var H=this.getSize();return{top:0,left:0,bottom:H.y,right:H.x,height:H.y,width:H.x};
/* 209 */ }});var D=Element.getComputedStyle;function E(H,I){return D(H,I).toInt()||0;}function F(H){return D(H,"-moz-box-sizing")=="border-box";}function G(H){return E(H,"border-top-width");
/* 210 */ }function C(H){return E(H,"border-left-width");}function B(H){return(/^(?:body|html)$/i).test(H.tagName);}function A(H){var I=H.getDocument();return(!I.compatMode||I.compatMode=="CSS1Compat")?I.html:I.body;
/* 211 */ }})();Native.implement([Window,Document,Element],{getHeight:function(){return this.getSize().y;},getWidth:function(){return this.getSize().x;},getScrollTop:function(){return this.getScroll().y;
/* 212 */ },getScrollLeft:function(){return this.getScroll().x;},getScrollHeight:function(){return this.getScrollSize().y;},getScrollWidth:function(){return this.getScrollSize().x;
/* 213 */ },getTop:function(){return this.getPosition().y;},getLeft:function(){return this.getPosition().x;}});Native.implement([Document,Element],{getElements:function(H,G){H=H.split(",");
/* 214 */ var C,E={};for(var D=0,B=H.length;D<B;D++){var A=H[D],F=Selectors.Utils.search(this,A,E);if(D!=0&&F.item){F=$A(F);}C=(D==0)?F:(C.item)?$A(C).concat(F):C.concat(F);
/* 215 */ }return new Elements(C,{ddup:(H.length>1),cash:!G});}});Element.implement({match:function(B){if(!B){return true;}var D=Selectors.Utils.parseTagAndID(B);
/* 216 */ var A=D[0],E=D[1];if(!Selectors.Filters.byID(this,E)||!Selectors.Filters.byTag(this,A)){return false;}var C=Selectors.Utils.parseSelector(B);return(C)?Selectors.Utils.filter(this,C,{}):true;
/* 217 */ }});var Selectors={Cache:{nth:{},parsed:{}}};Selectors.RegExps={id:(/#([\w-]+)/),tag:(/^(\w+|\*)/),quick:(/^(\w+|\*)$/),splitter:(/\s*([+>~\s])\s*([a-zA-Z#.*:\[])/g),combined:(/\.([\w-]+)|\[(\w+)(?:([!*^$~|]?=)["']?(.*?)["']?)?\]|:([\w-]+)(?:\(["']?(.*?)?["']?\)|$)/g)};
/* 218 */ Selectors.Utils={chk:function(B,C){if(!C){return true;}var A=$uid(B);if(!C[A]){return C[A]=true;}return false;},parseNthArgument:function(F){if(Selectors.Cache.nth[F]){return Selectors.Cache.nth[F];
/* 219 */ }var C=F.match(/^([+-]?\d*)?([a-z]+)?([+-]?\d*)?$/);if(!C){return false;}var E=parseInt(C[1]);var B=(E||E===0)?E:1;var D=C[2]||false;var A=parseInt(C[3])||0;
/* 220 */ if(B!=0){A--;while(A<1){A+=B;}while(A>=B){A-=B;}}else{B=A;D="index";}switch(D){case"n":C={a:B,b:A,special:"n"};break;case"odd":C={a:2,b:0,special:"n"};
/* 221 */ break;case"even":C={a:2,b:1,special:"n"};break;case"first":C={a:0,special:"index"};break;case"last":C={special:"last-child"};break;case"only":C={special:"only-child"};
/* 222 */ break;default:C={a:(B-1),special:"index"};}return Selectors.Cache.nth[F]=C;},parseSelector:function(E){if(Selectors.Cache.parsed[E]){return Selectors.Cache.parsed[E];
/* 223 */ }var D,H={classes:[],pseudos:[],attributes:[]};while((D=Selectors.RegExps.combined.exec(E))){var I=D[1],G=D[2],F=D[3],B=D[4],C=D[5],J=D[6];if(I){H.classes.push(I);
/* 224 */ }else{if(C){var A=Selectors.Pseudo.get(C);if(A){H.pseudos.push({parser:A,argument:J});}else{H.attributes.push({name:C,operator:"=",value:J});}}else{if(G){H.attributes.push({name:G,operator:F,value:B});
/* 225 */ }}}}if(!H.classes.length){delete H.classes;}if(!H.attributes.length){delete H.attributes;}if(!H.pseudos.length){delete H.pseudos;}if(!H.classes&&!H.attributes&&!H.pseudos){H=null;
/* 226 */ }return Selectors.Cache.parsed[E]=H;},parseTagAndID:function(B){var A=B.match(Selectors.RegExps.tag);var C=B.match(Selectors.RegExps.id);return[(A)?A[1]:"*",(C)?C[1]:false];
/* 227 */ },filter:function(F,C,E){var D;if(C.classes){for(D=C.classes.length;D--;D){var G=C.classes[D];if(!Selectors.Filters.byClass(F,G)){return false;}}}if(C.attributes){for(D=C.attributes.length;
/* 228 */ D--;D){var B=C.attributes[D];if(!Selectors.Filters.byAttribute(F,B.name,B.operator,B.value)){return false;}}}if(C.pseudos){for(D=C.pseudos.length;D--;D){var A=C.pseudos[D];
/* 229 */ if(!Selectors.Filters.byPseudo(F,A.parser,A.argument,E)){return false;}}}return true;},getByTagAndID:function(B,A,D){if(D){var C=(B.getElementById)?B.getElementById(D,true):Element.getElementById(B,D,true);
/* 230 */ return(C&&Selectors.Filters.byTag(C,A))?[C]:[];}else{return B.getElementsByTagName(A);}},search:function(J,I,O){var B=[];var C=I.trim().replace(Selectors.RegExps.splitter,function(Z,Y,X){B.push(Y);
/* 231 */ return":)"+X;}).split(":)");var K,F,E,V;for(var U=0,Q=C.length;U<Q;U++){var T=C[U];if(U==0&&Selectors.RegExps.quick.test(T)){K=J.getElementsByTagName(T);
/* 232 */ continue;}var A=B[U-1];var L=Selectors.Utils.parseTagAndID(T);var W=L[0],M=L[1];if(U==0){K=Selectors.Utils.getByTagAndID(J,W,M);}else{var D={},H=[];for(var S=0,R=K.length;
/* 233 */ S<R;S++){H=Selectors.Getters[A](H,K[S],W,M,D);}K=H;}var G=Selectors.Utils.parseSelector(T);if(G){E=[];for(var P=0,N=K.length;P<N;P++){V=K[P];if(Selectors.Utils.filter(V,G,O)){E.push(V);
/* 234 */ }}K=E;}}return K;}};Selectors.Getters={" ":function(H,G,I,A,E){var D=Selectors.Utils.getByTagAndID(G,I,A);for(var C=0,B=D.length;C<B;C++){var F=D[C];if(Selectors.Utils.chk(F,E)){H.push(F);
/* 235 */ }}return H;},">":function(H,G,I,A,F){var C=Selectors.Utils.getByTagAndID(G,I,A);for(var E=0,D=C.length;E<D;E++){var B=C[E];if(B.parentNode==G&&Selectors.Utils.chk(B,F)){H.push(B);
/* 236 */ }}return H;},"+":function(C,B,A,E,D){while((B=B.nextSibling)){if(B.nodeType==1){if(Selectors.Utils.chk(B,D)&&Selectors.Filters.byTag(B,A)&&Selectors.Filters.byID(B,E)){C.push(B);
/* 237 */ }break;}}return C;},"~":function(C,B,A,E,D){while((B=B.nextSibling)){if(B.nodeType==1){if(!Selectors.Utils.chk(B,D)){break;}if(Selectors.Filters.byTag(B,A)&&Selectors.Filters.byID(B,E)){C.push(B);
/* 238 */ }}}return C;}};Selectors.Filters={byTag:function(B,A){return(A=="*"||(B.tagName&&B.tagName.toLowerCase()==A));},byID:function(A,B){return(!B||(A.id&&A.id==B));
/* 239 */ },byClass:function(B,A){return(B.className&&B.className.contains(A," "));},byPseudo:function(A,D,C,B){return D.call(A,C,B);},byAttribute:function(C,D,B,E){var A=Element.prototype.getProperty.call(C,D);
/* 240 */ if(!A){return false;}if(!B||E==undefined){return true;}switch(B){case"=":return(A==E);case"*=":return(A.contains(E));case"^=":return(A.substr(0,E.length)==E);
/* 241 */ case"$=":return(A.substr(A.length-E.length)==E);case"!=":return(A!=E);case"~=":return A.contains(E," ");case"|=":return A.contains(E,"-");}return false;
/* 242 */ }};Selectors.Pseudo=new Hash({empty:function(){return !(this.innerText||this.textContent||"").length;},not:function(A){return !Element.match(this,A);},contains:function(A){return(this.innerText||this.textContent||"").contains(A);
/* 243 */ },"first-child":function(){return Selectors.Pseudo.index.call(this,0);},"last-child":function(){var A=this;while((A=A.nextSibling)){if(A.nodeType==1){return false;
/* 244 */ }}return true;},"only-child":function(){var B=this;while((B=B.previousSibling)){if(B.nodeType==1){return false;}}var A=this;while((A=A.nextSibling)){if(A.nodeType==1){return false;
/* 245 */ }}return true;},"nth-child":function(G,E){G=(G==undefined)?"n":G;var C=Selectors.Utils.parseNthArgument(G);if(C.special!="n"){return Selectors.Pseudo[C.special].call(this,C.a,E);
/* 246 */ }var F=0;E.positions=E.positions||{};var D=$uid(this);if(!E.positions[D]){var B=this;while((B=B.previousSibling)){if(B.nodeType!=1){continue;}F++;var A=E.positions[$uid(B)];
/* 247 */ if(A!=undefined){F=A+F;break;}}E.positions[D]=F;}return(E.positions[D]%C.a==C.b);},index:function(A){var B=this,C=0;while((B=B.previousSibling)){if(B.nodeType==1&&++C>A){return false;
/* 248 */ }}return(C==A);},even:function(B,A){return Selectors.Pseudo["nth-child"].call(this,"2n+1",A);},odd:function(B,A){return Selectors.Pseudo["nth-child"].call(this,"2n",A);
/* 249 */ }});Element.Events.domready={onAdd:function(A){if(Browser.loaded){A.call(this);}}};(function(){var B=function(){if(Browser.loaded){return ;}Browser.loaded=true;
/* 250 */ window.fireEvent("domready");document.fireEvent("domready");};switch(Browser.Engine.name){case"webkit":(function(){(["loaded","complete"].contains(document.readyState))?B():arguments.callee.delay(50);

/* mootools-1.2-core.js */

/* 251 */ })();break;case"trident":var A=document.createElement("div");(function(){($try(function(){A.doScroll("left");return $(A).inject(document.body).set("html","temp").dispose();
/* 252 */ }))?B():arguments.callee.delay(50);})();break;default:window.addEvent("load",B);document.addEvent("DOMContentLoaded",B);}})();var JSON=new Hash({encode:function(B){switch($type(B)){case"string":return'"'+B.replace(/[\x00-\x1f\\"]/g,JSON.$replaceChars)+'"';
/* 253 */ case"array":return"["+String(B.map(JSON.encode).filter($defined))+"]";case"object":case"hash":var A=[];Hash.each(B,function(E,D){var C=JSON.encode(E);if(C){A.push(JSON.encode(D)+":"+C);
/* 254 */ }});return"{"+A+"}";case"number":case"boolean":return String(B);case false:return"null";}return null;},$specialChars:{"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},$replaceChars:function(A){return JSON.$specialChars[A]||"\\u00"+Math.floor(A.charCodeAt()/16).toString(16)+(A.charCodeAt()%16).toString(16);
/* 255 */ },decode:function(string,secure){if($type(string)!="string"||!string.length){return null;}if(secure&&!(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(string.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"/g,""))){return null;
/* 256 */ }return eval("("+string+")");}});Native.implement([Hash,Array,String,Number],{toJSON:function(){return JSON.encode(this);}});var Cookie=new Class({Implements:Options,options:{path:false,domain:false,duration:false,secure:false,document:document},initialize:function(B,A){this.key=B;
/* 257 */ this.setOptions(A);},write:function(B){B=encodeURIComponent(B);if(this.options.domain){B+="; domain="+this.options.domain;}if(this.options.path){B+="; path="+this.options.path;
/* 258 */ }if(this.options.duration){var A=new Date();A.setTime(A.getTime()+this.options.duration*24*60*60*1000);B+="; expires="+A.toGMTString();}if(this.options.secure){B+="; secure";
/* 259 */ }this.options.document.cookie=this.key+"="+B;return this;},read:function(){var A=this.options.document.cookie.match("(?:^|;)\\s*"+this.key.escapeRegExp()+"=([^;]*)");
/* 260 */ return(A)?decodeURIComponent(A[1]):null;},dispose:function(){new Cookie(this.key,$merge(this.options,{duration:-1})).write("");return this;}});Cookie.write=function(B,C,A){return new Cookie(B,A).write(C);
/* 261 */ };Cookie.read=function(A){return new Cookie(A).read();};Cookie.dispose=function(B,A){return new Cookie(B,A).dispose();};var Swiff=new Class({Implements:[Options],options:{id:null,height:1,width:1,container:null,properties:{},params:{quality:"high",allowScriptAccess:"always",wMode:"transparent",swLiveConnect:true},callBacks:{},vars:{}},toElement:function(){return this.object;
/* 262 */ },initialize:function(L,M){this.instance="Swiff_"+$time();this.setOptions(M);M=this.options;var B=this.id=M.id||this.instance;var A=$(M.container);Swiff.CallBacks[this.instance]={};
/* 263 */ var E=M.params,G=M.vars,F=M.callBacks;var H=$extend({height:M.height,width:M.width},M.properties);var K=this;for(var D in F){Swiff.CallBacks[this.instance][D]=(function(N){return function(){return N.apply(K.object,arguments);
/* 264 */ };})(F[D]);G[D]="Swiff.CallBacks."+this.instance+"."+D;}E.flashVars=Hash.toQueryString(G);if(Browser.Engine.trident){H.classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
/* 265 */ E.movie=L;}else{H.type="application/x-shockwave-flash";H.data=L;}var J='<object id="'+B+'"';for(var I in H){J+=" "+I+'="'+H[I]+'"';}J+=">";for(var C in E){if(E[C]){J+='<param name="'+C+'" value="'+E[C]+'" />';
/* 266 */ }}J+="</object>";this.object=((A)?A.empty():new Element("div")).set("html",J).firstChild;},replaces:function(A){A=$(A,true);A.parentNode.replaceChild(this.toElement(),A);
/* 267 */ return this;},inject:function(A){$(A,true).appendChild(this.toElement());return this;},remote:function(){return Swiff.remote.apply(Swiff,[this.toElement()].extend(arguments));
/* 268 */ }});Swiff.CallBacks={};Swiff.remote=function(obj,fn){var rs=obj.CallFunction('<invoke name="'+fn+'" returntype="javascript">'+__flash__argumentsToXML(arguments,2)+"</invoke>");
/* 269 */ return eval(rs);};var Fx=new Class({Implements:[Chain,Events,Options],options:{fps:50,unit:false,duration:500,link:"ignore",transition:function(A){return -(Math.cos(Math.PI*A)-1)/2;
/* 270 */ }},initialize:function(A){this.subject=this.subject||this;this.setOptions(A);this.options.duration=Fx.Durations[this.options.duration]||this.options.duration.toInt();
/* 271 */ var B=this.options.wait;if(B===false){this.options.link="cancel";}},step:function(){var A=$time();if(A<this.time+this.options.duration){var B=this.options.transition((A-this.time)/this.options.duration);
/* 272 */ this.set(this.compute(this.from,this.to,B));}else{this.set(this.compute(this.from,this.to,1));this.complete();}},set:function(A){return A;},compute:function(C,B,A){return Fx.compute(C,B,A);
/* 273 */ },check:function(A){if(!this.timer){return true;}switch(this.options.link){case"cancel":this.cancel();return true;case"chain":this.chain(A.bind(this,Array.slice(arguments,1)));
/* 274 */ return false;}return false;},start:function(B,A){if(!this.check(arguments.callee,B,A)){return this;}this.from=B;this.to=A;this.time=0;this.startTimer();
/* 275 */ this.onStart();return this;},complete:function(){if(this.stopTimer()){this.onComplete();}return this;},cancel:function(){if(this.stopTimer()){this.onCancel();
/* 276 */ }return this;},onStart:function(){this.fireEvent("start",this.subject);},onComplete:function(){this.fireEvent("complete",this.subject);if(!this.callChain()){this.fireEvent("chainComplete",this.subject);
/* 277 */ }},onCancel:function(){this.fireEvent("cancel",this.subject).clearChain();},pause:function(){this.stopTimer();return this;},resume:function(){this.startTimer();
/* 278 */ return this;},stopTimer:function(){if(!this.timer){return false;}this.time=$time()-this.time;this.timer=$clear(this.timer);return true;},startTimer:function(){if(this.timer){return false;
/* 279 */ }this.time=$time()-this.time;this.timer=this.step.periodical(Math.round(1000/this.options.fps),this);return true;}});Fx.compute=function(C,B,A){return(B-C)*A+C;
/* 280 */ };Fx.Durations={"short":250,normal:500,"long":1000};Fx.CSS=new Class({Extends:Fx,prepare:function(D,E,B){B=$splat(B);var C=B[1];if(!$chk(C)){B[1]=B[0];
/* 281 */ B[0]=D.getStyle(E);}var A=B.map(this.parse);return{from:A[0],to:A[1]};},parse:function(A){A=$lambda(A)();A=(typeof A=="string")?A.split(" "):$splat(A);
/* 282 */ return A.map(function(C){C=String(C);var B=false;Fx.CSS.Parsers.each(function(F,E){if(B){return ;}var D=F.parse(C);if($chk(D)){B={value:D,parser:F};}});
/* 283 */ B=B||{value:C,parser:Fx.CSS.Parsers.String};return B;});},compute:function(D,C,B){var A=[];(Math.min(D.length,C.length)).times(function(E){A.push({value:D[E].parser.compute(D[E].value,C[E].value,B),parser:D[E].parser});
/* 284 */ });A.$family={name:"fx:css:value"};return A;},serve:function(C,B){if($type(C)!="fx:css:value"){C=this.parse(C);}var A=[];C.each(function(D){A=A.concat(D.parser.serve(D.value,B));
/* 285 */ });return A;},render:function(A,D,C,B){A.setStyle(D,this.serve(C,B));},search:function(A){if(Fx.CSS.Cache[A]){return Fx.CSS.Cache[A];}var B={};Array.each(document.styleSheets,function(E,D){var C=E.href;
/* 286 */ if(C&&C.contains("://")&&!C.contains(document.domain)){return ;}var F=E.rules||E.cssRules;Array.each(F,function(I,G){if(!I.style){return ;}var H=(I.selectorText)?I.selectorText.replace(/^\w+/,function(J){return J.toLowerCase();
/* 287 */ }):null;if(!H||!H.test("^"+A+"$")){return ;}Element.Styles.each(function(K,J){if(!I.style[J]||Element.ShortStyles[J]){return ;}K=String(I.style[J]);B[J]=(K.test(/^rgb/))?K.rgbToHex():K;
/* 288 */ });});});return Fx.CSS.Cache[A]=B;}});Fx.CSS.Cache={};Fx.CSS.Parsers=new Hash({Color:{parse:function(A){if(A.match(/^#[0-9a-f]{3,6}$/i)){return A.hexToRgb(true);
/* 289 */ }return((A=A.match(/(\d+),\s*(\d+),\s*(\d+)/)))?[A[1],A[2],A[3]]:false;},compute:function(C,B,A){return C.map(function(E,D){return Math.round(Fx.compute(C[D],B[D],A));
/* 290 */ });},serve:function(A){return A.map(Number);}},Number:{parse:parseFloat,compute:Fx.compute,serve:function(B,A){return(A)?B+A:B;}},String:{parse:$lambda(false),compute:$arguments(1),serve:$arguments(0)}});
/* 291 */ Fx.Tween=new Class({Extends:Fx.CSS,initialize:function(B,A){this.element=this.subject=$(B);this.parent(A);},set:function(B,A){if(arguments.length==1){A=B;
/* 292 */ B=this.property||this.options.property;}this.render(this.element,B,A,this.options.unit);return this;},start:function(C,E,D){if(!this.check(arguments.callee,C,E,D)){return this;
/* 293 */ }var B=Array.flatten(arguments);this.property=this.options.property||B.shift();var A=this.prepare(this.element,this.property,B);return this.parent(A.from,A.to);
/* 294 */ }});Element.Properties.tween={set:function(A){var B=this.retrieve("tween");if(B){B.cancel();}return this.eliminate("tween").store("tween:options",$extend({link:"cancel"},A));
/* 295 */ },get:function(A){if(A||!this.retrieve("tween")){if(A||!this.retrieve("tween:options")){this.set("tween",A);}this.store("tween",new Fx.Tween(this,this.retrieve("tween:options")));
/* 296 */ }return this.retrieve("tween");}};Element.implement({tween:function(A,C,B){this.get("tween").start(arguments);return this;},fade:function(C){var E=this.get("tween"),D="opacity",A;
/* 297 */ C=$pick(C,"toggle");switch(C){case"in":E.start(D,1);break;case"out":E.start(D,0);break;case"show":E.set(D,1);break;case"hide":E.set(D,0);break;case"toggle":var B=this.retrieve("fade:flag",this.get("opacity")==1);
/* 298 */ E.start(D,(B)?0:1);this.store("fade:flag",!B);A=true;break;default:E.start(D,arguments);}if(!A){this.eliminate("fade:flag");}return this;},highlight:function(C,A){if(!A){A=this.retrieve("highlight:original",this.getStyle("background-color"));
/* 299 */ A=(A=="transparent")?"#fff":A;}var B=this.get("tween");B.start("background-color",C||"#ffff88",A).chain(function(){this.setStyle("background-color",this.retrieve("highlight:original"));
/* 300 */ B.callChain();}.bind(this));return this;}});Fx.Morph=new Class({Extends:Fx.CSS,initialize:function(B,A){this.element=this.subject=$(B);this.parent(A);},set:function(A){if(typeof A=="string"){A=this.search(A);

/* mootools-1.2-core.js */

/* 301 */ }for(var B in A){this.render(this.element,B,A[B],this.options.unit);}return this;},compute:function(E,D,C){var A={};for(var B in E){A[B]=this.parent(E[B],D[B],C);
/* 302 */ }return A;},start:function(B){if(!this.check(arguments.callee,B)){return this;}if(typeof B=="string"){B=this.search(B);}var E={},D={};for(var C in B){var A=this.prepare(this.element,C,B[C]);
/* 303 */ E[C]=A.from;D[C]=A.to;}return this.parent(E,D);}});Element.Properties.morph={set:function(A){var B=this.retrieve("morph");if(B){B.cancel();}return this.eliminate("morph").store("morph:options",$extend({link:"cancel"},A));
/* 304 */ },get:function(A){if(A||!this.retrieve("morph")){if(A||!this.retrieve("morph:options")){this.set("morph",A);}this.store("morph",new Fx.Morph(this,this.retrieve("morph:options")));
/* 305 */ }return this.retrieve("morph");}};Element.implement({morph:function(A){this.get("morph").start(A);return this;}});(function(){var A=Fx.prototype.initialize;
/* 306 */ Fx.prototype.initialize=function(B){A.call(this,B);var C=this.options.transition;if(typeof C=="string"&&(C=C.split(":"))){var D=Fx.Transitions;D=D[C[0]]||D[C[0].capitalize()];
/* 307 */ if(C[1]){D=D["ease"+C[1].capitalize()+(C[2]?C[2].capitalize():"")];}this.options.transition=D;}};})();Fx.Transition=function(B,A){A=$splat(A);return $extend(B,{easeIn:function(C){return B(C,A);
/* 308 */ },easeOut:function(C){return 1-B(1-C,A);},easeInOut:function(C){return(C<=0.5)?B(2*C,A)/2:(2-B(2*(1-C),A))/2;}});};Fx.Transitions=new Hash({linear:$arguments(0)});
/* 309 */ Fx.Transitions.extend=function(A){for(var B in A){Fx.Transitions[B]=new Fx.Transition(A[B]);}};Fx.Transitions.extend({Pow:function(B,A){return Math.pow(B,A[0]||6);
/* 310 */ },Expo:function(A){return Math.pow(2,8*(A-1));},Circ:function(A){return 1-Math.sin(Math.acos(A));},Sine:function(A){return 1-Math.sin((1-A)*Math.PI/2);
/* 311 */ },Back:function(B,A){A=A[0]||1.618;return Math.pow(B,2)*((A+1)*B-A);},Bounce:function(D){var C;for(var B=0,A=1;1;B+=A,A/=2){if(D>=(7-4*B)/11){C=-Math.pow((11-6*B-11*D)/4,2)+A*A;
/* 312 */ break;}}return C;},Elastic:function(B,A){return Math.pow(2,10*--B)*Math.cos(20*B*Math.PI*(A[0]||1)/3);}});["Quad","Cubic","Quart","Quint"].each(function(B,A){Fx.Transitions[B]=new Fx.Transition(function(C){return Math.pow(C,[A+2]);
/* 313 */ });});var Request=new Class({Implements:[Chain,Events,Options],options:{url:"",data:"",headers:{"X-Requested-With":"XMLHttpRequest",Accept:"text/javascript, text/html, application/xml, text/xml, */*"},async:true,format:false,method:"post",link:"ignore",isSuccess:null,emulation:true,urlEncoded:true,encoding:"utf-8",evalScripts:false,evalResponse:false},initialize:function(A){this.xhr=new Browser.Request();
/* 314 */ this.setOptions(A);this.options.isSuccess=this.options.isSuccess||this.isSuccess;this.headers=new Hash(this.options.headers);},onStateChange:function(){if(this.xhr.readyState!=4||!this.running){return ;
/* 315 */ }this.running=false;this.status=0;$try(function(){this.status=this.xhr.status;}.bind(this));if(this.options.isSuccess.call(this,this.status)){this.response={text:this.xhr.responseText,xml:this.xhr.responseXML};
/* 316 */ this.success(this.response.text,this.response.xml);}else{this.response={text:null,xml:null};this.failure();}this.xhr.onreadystatechange=$empty;},isSuccess:function(){return((this.status>=200)&&(this.status<300));
/* 317 */ },processScripts:function(A){if(this.options.evalResponse||(/(ecma|java)script/).test(this.getHeader("Content-type"))){return $exec(A);}return A.stripScripts(this.options.evalScripts);
/* 318 */ },success:function(B,A){this.onSuccess(this.processScripts(B),A);},onSuccess:function(){this.fireEvent("complete",arguments).fireEvent("success",arguments).callChain();
/* 319 */ },failure:function(){this.onFailure();},onFailure:function(){this.fireEvent("complete").fireEvent("failure",this.xhr);},setHeader:function(A,B){this.headers.set(A,B);
/* 320 */ return this;},getHeader:function(A){return $try(function(){return this.xhr.getResponseHeader(A);}.bind(this));},check:function(A){if(!this.running){return true;
/* 321 */ }switch(this.options.link){case"cancel":this.cancel();return true;case"chain":this.chain(A.bind(this,Array.slice(arguments,1)));return false;}return false;
/* 322 */ },send:function(I){if(!this.check(arguments.callee,I)){return this;}this.running=true;var G=$type(I);if(G=="string"||G=="element"){I={data:I};}var D=this.options;
/* 323 */ I=$extend({data:D.data,url:D.url,method:D.method},I);var E=I.data,B=I.url,A=I.method;switch($type(E)){case"element":E=$(E).toQueryString();break;case"object":case"hash":E=Hash.toQueryString(E);
/* 324 */ }if(this.options.format){var H="format="+this.options.format;E=(E)?H+"&"+E:H;}if(this.options.emulation&&["put","delete"].contains(A)){var F="_method="+A;
/* 325 */ E=(E)?F+"&"+E:F;A="post";}if(this.options.urlEncoded&&A=="post"){var C=(this.options.encoding)?"; charset="+this.options.encoding:"";this.headers.set("Content-type","application/x-www-form-urlencoded"+C);
/* 326 */ }if(E&&A=="get"){B=B+(B.contains("?")?"&":"?")+E;E=null;}this.xhr.open(A.toUpperCase(),B,this.options.async);this.xhr.onreadystatechange=this.onStateChange.bind(this);
/* 327 */ this.headers.each(function(K,J){if(!$try(function(){this.xhr.setRequestHeader(J,K);return true;}.bind(this))){this.fireEvent("exception",[J,K]);}},this);
/* 328 */ this.fireEvent("request");this.xhr.send(E);if(!this.options.async){this.onStateChange();}return this;},cancel:function(){if(!this.running){return this;
/* 329 */ }this.running=false;this.xhr.abort();this.xhr.onreadystatechange=$empty;this.xhr=new Browser.Request();this.fireEvent("cancel");return this;}});(function(){var A={};
/* 330 */ ["get","post","put","delete","GET","POST","PUT","DELETE"].each(function(B){A[B]=function(){var C=Array.link(arguments,{url:String.type,data:$defined});
/* 331 */ return this.send($extend(C,{method:B.toLowerCase()}));};});Request.implement(A);})();Element.Properties.send={set:function(A){var B=this.retrieve("send");
/* 332 */ if(B){B.cancel();}return this.eliminate("send").store("send:options",$extend({data:this,link:"cancel",method:this.get("method")||"post",url:this.get("action")},A));
/* 333 */ },get:function(A){if(A||!this.retrieve("send")){if(A||!this.retrieve("send:options")){this.set("send",A);}this.store("send",new Request(this.retrieve("send:options")));
/* 334 */ }return this.retrieve("send");}};Element.implement({send:function(A){var B=this.get("send");B.send({data:this,url:A||B.options.url});return this;}});Request.HTML=new Class({Extends:Request,options:{update:false,evalScripts:true,filter:false},processHTML:function(C){var B=C.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
/* 335 */ C=(B)?B[1]:C;var A=new Element("div");return $try(function(){var D="<root>"+C+"</root>",G;if(Browser.Engine.trident){G=new ActiveXObject("Microsoft.XMLDOM");
/* 336 */ G.async=false;G.loadXML(D);}else{G=new DOMParser().parseFromString(D,"text/xml");}D=G.getElementsByTagName("root")[0];for(var F=0,E=D.childNodes.length;
/* 337 */ F<E;F++){var H=Element.clone(D.childNodes[F],true,true);if(H){A.grab(H);}}return A;})||A.set("html",C);},success:function(D){var C=this.options,B=this.response;
/* 338 */ B.html=D.stripScripts(function(E){B.javascript=E;});var A=this.processHTML(B.html);B.tree=A.childNodes;B.elements=A.getElements("*");if(C.filter){B.tree=B.elements.filter(C.filter);
/* 339 */ }if(C.update){$(C.update).empty().adopt(B.tree);}if(C.evalScripts){$exec(B.javascript);}this.onSuccess(B.tree,B.elements,B.html,B.javascript);}});Element.Properties.load={set:function(A){var B=this.retrieve("load");
/* 340 */ if(B){send.cancel();}return this.eliminate("load").store("load:options",$extend({data:this,link:"cancel",update:this,method:"get"},A));},get:function(A){if(A||!this.retrieve("load")){if(A||!this.retrieve("load:options")){this.set("load",A);
/* 341 */ }this.store("load",new Request.HTML(this.retrieve("load:options")));}return this.retrieve("load");}};Element.implement({load:function(){this.get("load").send(Array.link(arguments,{data:Object.type,url:String.type}));
/* 342 */ return this;}});Request.JSON=new Class({Extends:Request,options:{secure:true},initialize:function(A){this.parent(A);this.headers.extend({Accept:"application/json","X-Request":"JSON"});
/* 343 */ },success:function(A){this.response.json=JSON.decode(A,this.options.secure);this.onSuccess(this.response.json,A);}});

;
/* mootools-1.2-more.js */

/* 1   */ //MooTools More, <http://mootools.net/more>. Copyright (c) 2006-2008 Valerio Proietti, <http://mad4milk.net>, MIT Style License.
/* 2   */ 
/* 3   */ Fx.Slide=new Class({Extends:Fx,options:{mode:"vertical"},initialize:function(B,A){this.addEvent("complete",function(){this.open=(this.wrapper["offset"+this.layout.capitalize()]!=0);
/* 4   */ if(this.open&&Browser.Engine.webkit419){this.element.dispose().inject(this.wrapper);}},true);this.element=this.subject=$(B);this.parent(A);var C=this.element.retrieve("wrapper");
/* 5   */ this.wrapper=C||new Element("div",{styles:$extend(this.element.getStyles("margin","position"),{overflow:"hidden"})}).wraps(this.element);this.element.store("wrapper",this.wrapper).setStyle("margin",0);
/* 6   */ this.now=[];this.open=true;},vertical:function(){this.margin="margin-top";this.layout="height";this.offset=this.element.offsetHeight;},horizontal:function(){this.margin="margin-left";
/* 7   */ this.layout="width";this.offset=this.element.offsetWidth;},set:function(A){this.element.setStyle(this.margin,A[0]);this.wrapper.setStyle(this.layout,A[1]);
/* 8   */ return this;},compute:function(E,D,C){var B=[];var A=2;A.times(function(F){B[F]=Fx.compute(E[F],D[F],C);});return B;},start:function(B,E){if(!this.check(arguments.callee,B,E)){return this;
/* 9   */ }this[E||this.options.mode]();var D=this.element.getStyle(this.margin).toInt();var C=this.wrapper.getStyle(this.layout).toInt();var A=[[D,C],[0,this.offset]];
/* 10  */ var G=[[D,C],[-this.offset,0]];var F;switch(B){case"in":F=A;break;case"out":F=G;break;case"toggle":F=(this.wrapper["offset"+this.layout.capitalize()]==0)?A:G;
/* 11  */ }return this.parent(F[0],F[1]);},slideIn:function(A){return this.start("in",A);},slideOut:function(A){return this.start("out",A);},hide:function(A){this[A||this.options.mode]();
/* 12  */ this.open=false;return this.set([-this.offset,0]);},show:function(A){this[A||this.options.mode]();this.open=true;return this.set([0,this.offset]);},toggle:function(A){return this.start("toggle",A);
/* 13  */ }});Element.Properties.slide={set:function(B){var A=this.retrieve("slide");if(A){A.cancel();}return this.eliminate("slide").store("slide:options",$extend({link:"cancel"},B));
/* 14  */ },get:function(A){if(A||!this.retrieve("slide")){if(A||!this.retrieve("slide:options")){this.set("slide",A);}this.store("slide",new Fx.Slide(this,this.retrieve("slide:options")));
/* 15  */ }return this.retrieve("slide");}};Element.implement({slide:function(D,E){D=D||"toggle";var B=this.get("slide"),A;switch(D){case"hide":B.hide(E);break;case"show":B.show(E);
/* 16  */ break;case"toggle":var C=this.retrieve("slide:flag",B.open);B[(C)?"slideOut":"slideIn"](E);this.store("slide:flag",!C);A=true;break;default:B.start(D,E);
/* 17  */ }if(!A){this.eliminate("slide:flag");}return this;}});Fx.Scroll=new Class({Extends:Fx,options:{offset:{x:0,y:0},wheelStops:true},initialize:function(B,A){this.element=this.subject=$(B);
/* 18  */ this.parent(A);var D=this.cancel.bind(this,false);if($type(this.element)!="element"){this.element=$(this.element.getDocument().body);}var C=this.element;
/* 19  */ if(this.options.wheelStops){this.addEvent("start",function(){C.addEvent("mousewheel",D);},true);this.addEvent("complete",function(){C.removeEvent("mousewheel",D);
/* 20  */ },true);}},set:function(){var A=Array.flatten(arguments);this.element.scrollTo(A[0],A[1]);},compute:function(E,D,C){var B=[];var A=2;A.times(function(F){B.push(Fx.compute(E[F],D[F],C));
/* 21  */ });return B;},start:function(C,H){if(!this.check(arguments.callee,C,H)){return this;}var E=this.element.getSize(),F=this.element.getScrollSize();var B=this.element.getScroll(),D={x:C,y:H};
/* 22  */ for(var G in D){var A=F[G]-E[G];if($chk(D[G])){D[G]=($type(D[G])=="number")?D[G].limit(0,A):A;}else{D[G]=B[G];}D[G]+=this.options.offset[G];}return this.parent([B.x,B.y],[D.x,D.y]);
/* 23  */ },toTop:function(){return this.start(false,0);},toLeft:function(){return this.start(0,false);},toRight:function(){return this.start("right",false);},toBottom:function(){return this.start(false,"bottom");
/* 24  */ },toElement:function(B){var A=$(B).getPosition(this.element);return this.start(A.x,A.y);}});Fx.Elements=new Class({Extends:Fx.CSS,initialize:function(B,A){this.elements=this.subject=$$(B);
/* 25  */ this.parent(A);},compute:function(G,H,I){var C={};for(var D in G){var A=G[D],E=H[D],F=C[D]={};for(var B in A){F[B]=this.parent(A[B],E[B],I);}}return C;
/* 26  */ },set:function(B){for(var C in B){var A=B[C];for(var D in A){this.render(this.elements[C],D,A[D],this.options.unit);}}return this;},start:function(C){if(!this.check(arguments.callee,C)){return this;
/* 27  */ }var H={},I={};for(var D in C){var F=C[D],A=H[D]={},G=I[D]={};for(var B in F){var E=this.prepare(this.elements[D],B,F[B]);A[B]=E.from;G[B]=E.to;}}return this.parent(H,I);
/* 28  */ }});var Drag=new Class({Implements:[Events,Options],options:{snap:6,unit:"px",grid:false,style:true,limit:false,handle:false,invert:false,preventDefault:false,modifiers:{x:"left",y:"top"}},initialize:function(){var B=Array.link(arguments,{options:Object.type,element:$defined});
/* 29  */ this.element=$(B.element);this.document=this.element.getDocument();this.setOptions(B.options||{});var A=$type(this.options.handle);this.handles=(A=="array"||A=="collection")?$$(this.options.handle):$(this.options.handle)||this.element;
/* 30  */ this.mouse={now:{},pos:{}};this.value={start:{},now:{}};this.selection=(Browser.Engine.trident)?"selectstart":"mousedown";this.bound={start:this.start.bind(this),check:this.check.bind(this),drag:this.drag.bind(this),stop:this.stop.bind(this),cancel:this.cancel.bind(this),eventStop:$lambda(false)};
/* 31  */ this.attach();},attach:function(){this.handles.addEvent("mousedown",this.bound.start);return this;},detach:function(){this.handles.removeEvent("mousedown",this.bound.start);
/* 32  */ return this;},start:function(C){if(this.options.preventDefault){C.preventDefault();}this.fireEvent("beforeStart",this.element);this.mouse.start=C.page;
/* 33  */ var A=this.options.limit;this.limit={x:[],y:[]};for(var D in this.options.modifiers){if(!this.options.modifiers[D]){continue;}if(this.options.style){this.value.now[D]=this.element.getStyle(this.options.modifiers[D]).toInt();
/* 34  */ }else{this.value.now[D]=this.element[this.options.modifiers[D]];}if(this.options.invert){this.value.now[D]*=-1;}this.mouse.pos[D]=C.page[D]-this.value.now[D];
/* 35  */ if(A&&A[D]){for(var B=2;B--;B){if($chk(A[D][B])){this.limit[D][B]=$lambda(A[D][B])();}}}}if($type(this.options.grid)=="number"){this.options.grid={x:this.options.grid,y:this.options.grid};
/* 36  */ }this.document.addEvents({mousemove:this.bound.check,mouseup:this.bound.cancel});this.document.addEvent(this.selection,this.bound.eventStop);},check:function(A){if(this.options.preventDefault){A.preventDefault();
/* 37  */ }var B=Math.round(Math.sqrt(Math.pow(A.page.x-this.mouse.start.x,2)+Math.pow(A.page.y-this.mouse.start.y,2)));if(B>this.options.snap){this.cancel();this.document.addEvents({mousemove:this.bound.drag,mouseup:this.bound.stop});
/* 38  */ this.fireEvent("start",this.element).fireEvent("snap",this.element);}},drag:function(A){if(this.options.preventDefault){A.preventDefault();}this.mouse.now=A.page;
/* 39  */ for(var B in this.options.modifiers){if(!this.options.modifiers[B]){continue;}this.value.now[B]=this.mouse.now[B]-this.mouse.pos[B];if(this.options.invert){this.value.now[B]*=-1;
/* 40  */ }if(this.options.limit&&this.limit[B]){if($chk(this.limit[B][1])&&(this.value.now[B]>this.limit[B][1])){this.value.now[B]=this.limit[B][1];}else{if($chk(this.limit[B][0])&&(this.value.now[B]<this.limit[B][0])){this.value.now[B]=this.limit[B][0];
/* 41  */ }}}if(this.options.grid[B]){this.value.now[B]-=(this.value.now[B]%this.options.grid[B]);}if(this.options.style){this.element.setStyle(this.options.modifiers[B],this.value.now[B]+this.options.unit);
/* 42  */ }else{this.element[this.options.modifiers[B]]=this.value.now[B];}}this.fireEvent("drag",this.element);},cancel:function(A){this.document.removeEvent("mousemove",this.bound.check);
/* 43  */ this.document.removeEvent("mouseup",this.bound.cancel);if(A){this.document.removeEvent(this.selection,this.bound.eventStop);this.fireEvent("cancel",this.element);
/* 44  */ }},stop:function(A){this.document.removeEvent(this.selection,this.bound.eventStop);this.document.removeEvent("mousemove",this.bound.drag);this.document.removeEvent("mouseup",this.bound.stop);
/* 45  */ if(A){this.fireEvent("complete",this.element);}}});Element.implement({makeResizable:function(A){return new Drag(this,$merge({modifiers:{x:"width",y:"height"}},A));
/* 46  */ }});Drag.Move=new Class({Extends:Drag,options:{droppables:[],container:false},initialize:function(C,B){this.parent(C,B);this.droppables=$$(this.options.droppables);
/* 47  */ this.container=$(this.options.container);if(this.container&&$type(this.container)!="element"){this.container=$(this.container.getDocument().body);}C=this.element;
/* 48  */ var D=C.getStyle("position");var A=(D!="static")?D:"absolute";if(C.getStyle("left")=="auto"||C.getStyle("top")=="auto"){C.position(C.getPosition(C.offsetParent));
/* 49  */ }C.setStyle("position",A);this.addEvent("start",function(){this.checkDroppables();},true);},start:function(B){if(this.container){var D=this.element,J=this.container,E=J.getCoordinates(D.offsetParent),F={},A={};
/* 50  */ ["top","right","bottom","left"].each(function(K){F[K]=J.getStyle("padding-"+K).toInt();A[K]=D.getStyle("margin-"+K).toInt();},this);var C=D.offsetWidth+A.left+A.right,I=D.offsetHeight+A.top+A.bottom;

/* mootools-1.2-more.js */

/* 51  */ var H=[E.left+F.left,E.right-F.right-C];var G=[E.top+F.top,E.bottom-F.bottom-I];this.options.limit={x:H,y:G};}this.parent(B);},checkAgainst:function(B){B=B.getCoordinates();
/* 52  */ var A=this.mouse.now;return(A.x>B.left&&A.x<B.right&&A.y<B.bottom&&A.y>B.top);},checkDroppables:function(){var A=this.droppables.filter(this.checkAgainst,this).getLast();
/* 53  */ if(this.overed!=A){if(this.overed){this.fireEvent("leave",[this.element,this.overed]);}if(A){this.overed=A;this.fireEvent("enter",[this.element,A]);}else{this.overed=null;
/* 54  */ }}},drag:function(A){this.parent(A);if(this.droppables.length){this.checkDroppables();}},stop:function(A){this.checkDroppables();this.fireEvent("drop",[this.element,this.overed]);
/* 55  */ this.overed=null;return this.parent(A);}});Element.implement({makeDraggable:function(A){return new Drag.Move(this,A);}});Hash.Cookie=new Class({Extends:Cookie,options:{autoSave:true},initialize:function(B,A){this.parent(B,A);
/* 56  */ this.load();},save:function(){var A=JSON.encode(this.hash);if(!A||A.length>4096){return false;}if(A=="{}"){this.dispose();}else{this.write(A);}return true;
/* 57  */ },load:function(){this.hash=new Hash(JSON.decode(this.read(),true));return this;}});Hash.Cookie.implement((function(){var A={};Hash.each(Hash.prototype,function(C,B){A[B]=function(){var D=C.apply(this.hash,arguments);
/* 58  */ if(this.options.autoSave){this.save();}return D;};});return A;})());var Color=new Native({initialize:function(B,C){if(arguments.length>=3){C="rgb";B=Array.slice(arguments,0,3);
/* 59  */ }else{if(typeof B=="string"){if(B.match(/rgb/)){B=B.rgbToHex().hexToRgb(true);}else{if(B.match(/hsb/)){B=B.hsbToRgb();}else{B=B.hexToRgb(true);}}}}C=C||"rgb";
/* 60  */ switch(C){case"hsb":var A=B;B=B.hsbToRgb();B.hsb=A;break;case"hex":B=B.hexToRgb(true);break;}B.rgb=B.slice(0,3);B.hsb=B.hsb||B.rgbToHsb();B.hex=B.rgbToHex();
/* 61  */ return $extend(B,this);}});Color.implement({mix:function(){var A=Array.slice(arguments);var C=($type(A.getLast())=="number")?A.pop():50;var B=this.slice();
/* 62  */ A.each(function(D){D=new Color(D);for(var E=0;E<3;E++){B[E]=Math.round((B[E]/100*(100-C))+(D[E]/100*C));}});return new Color(B,"rgb");},invert:function(){return new Color(this.map(function(A){return 255-A;
/* 63  */ }));},setHue:function(A){return new Color([A,this.hsb[1],this.hsb[2]],"hsb");},setSaturation:function(A){return new Color([this.hsb[0],A,this.hsb[2]],"hsb");
/* 64  */ },setBrightness:function(A){return new Color([this.hsb[0],this.hsb[1],A],"hsb");}});function $RGB(C,B,A){return new Color([C,B,A],"rgb");}function $HSB(C,B,A){return new Color([C,B,A],"hsb");
/* 65  */ }function $HEX(A){return new Color(A,"hex");}Array.implement({rgbToHsb:function(){var B=this[0],C=this[1],J=this[2];var G,F,H;var I=Math.max(B,C,J),E=Math.min(B,C,J);
/* 66  */ var K=I-E;H=I/255;F=(I!=0)?K/I:0;if(F==0){G=0;}else{var D=(I-B)/K;var A=(I-C)/K;var L=(I-J)/K;if(B==I){G=L-A;}else{if(C==I){G=2+D-L;}else{G=4+A-D;}}G/=6;
/* 67  */ if(G<0){G++;}}return[Math.round(G*360),Math.round(F*100),Math.round(H*100)];},hsbToRgb:function(){var C=Math.round(this[2]/100*255);if(this[1]==0){return[C,C,C];
/* 68  */ }else{var A=this[0]%360;var E=A%60;var F=Math.round((this[2]*(100-this[1]))/10000*255);var D=Math.round((this[2]*(6000-this[1]*E))/600000*255);var B=Math.round((this[2]*(6000-this[1]*(60-E)))/600000*255);
/* 69  */ switch(Math.floor(A/60)){case 0:return[C,B,F];case 1:return[D,C,F];case 2:return[F,C,B];case 3:return[F,D,C];case 4:return[B,F,C];case 5:return[C,F,D];
/* 70  */ }}return false;}});String.implement({rgbToHsb:function(){var A=this.match(/\d{1,3}/g);return(A)?hsb.rgbToHsb():null;},hsbToRgb:function(){var A=this.match(/\d{1,3}/g);
/* 71  */ return(A)?A.hsbToRgb():null;}});var Group=new Class({initialize:function(){this.instances=Array.flatten(arguments);this.events={};this.checker={};},addEvent:function(B,A){this.checker[B]=this.checker[B]||{};
/* 72  */ this.events[B]=this.events[B]||[];if(this.events[B].contains(A)){return false;}else{this.events[B].push(A);}this.instances.each(function(C,D){C.addEvent(B,this.check.bind(this,[B,C,D]));
/* 73  */ },this);return this;},check:function(C,A,B){this.checker[C][B]=true;var D=this.instances.every(function(F,E){return this.checker[C][E]||false;},this);if(!D){return ;
/* 74  */ }this.checker[C]={};this.events[C].each(function(E){E.call(this,this.instances,A);},this);}});var Asset=new Hash({javascript:function(F,D){D=$extend({onload:$empty,document:document,check:$lambda(true)},D);
/* 75  */ var B=new Element("script",{src:F,type:"text/javascript"});var E=D.onload.bind(B),A=D.check,G=D.document;delete D.onload;delete D.check;delete D.document;
/* 76  */ B.addEvents({load:E,readystatechange:function(){if(["loaded","complete"].contains(this.readyState)){E();}}}).setProperties(D);if(Browser.Engine.webkit419){var C=(function(){if(!$try(A)){return ;
/* 77  */ }$clear(C);E();}).periodical(50);}return B.inject(G.head);},css:function(B,A){return new Element("link",$merge({rel:"stylesheet",media:"screen",type:"text/css",href:B},A)).inject(document.head);
/* 78  */ },image:function(C,B){B=$merge({onload:$empty,onabort:$empty,onerror:$empty},B);var D=new Image();var A=$(D)||new Element("img");["load","abort","error"].each(function(E){var F="on"+E;
/* 79  */ var G=B[F];delete B[F];D[F]=function(){if(!D){return ;}if(!A.parentNode){A.width=D.width;A.height=D.height;}D=D.onload=D.onabort=D.onerror=null;G.delay(1,A,A);
/* 80  */ A.fireEvent(E,A,1);};});D.src=A.src=C;if(D&&D.complete){D.onload.delay(1);}return A.setProperties(B);},images:function(D,C){C=$merge({onComplete:$empty,onProgress:$empty},C);
/* 81  */ if(!D.push){D=[D];}var A=[];var B=0;D.each(function(F){var E=new Asset.image(F,{onload:function(){C.onProgress.call(this,B,D.indexOf(F));B++;if(B==D.length){C.onComplete();
/* 82  */ }}});A.push(E);});return new Elements(A);}});var Sortables=new Class({Implements:[Events,Options],options:{snap:4,opacity:1,clone:false,revert:false,handle:false,constrain:false},initialize:function(A,B){this.setOptions(B);
/* 83  */ this.elements=[];this.lists=[];this.idle=true;this.addLists($$($(A)||A));if(!this.options.clone){this.options.revert=false;}if(this.options.revert){this.effect=new Fx.Morph(null,$merge({duration:250,link:"cancel"},this.options.revert));
/* 84  */ }},attach:function(){this.addLists(this.lists);return this;},detach:function(){this.lists=this.removeLists(this.lists);return this;},addItems:function(){Array.flatten(arguments).each(function(A){this.elements.push(A);
/* 85  */ var B=A.retrieve("sortables:start",this.start.bindWithEvent(this,A));(this.options.handle?A.getElement(this.options.handle)||A:A).addEvent("mousedown",B);
/* 86  */ },this);return this;},addLists:function(){Array.flatten(arguments).each(function(A){this.lists.push(A);this.addItems(A.getChildren());},this);return this;
/* 87  */ },removeItems:function(){var A=[];Array.flatten(arguments).each(function(B){A.push(B);this.elements.erase(B);var C=B.retrieve("sortables:start");(this.options.handle?B.getElement(this.options.handle)||B:B).removeEvent("mousedown",C);
/* 88  */ },this);return $$(A);},removeLists:function(){var A=[];Array.flatten(arguments).each(function(B){A.push(B);this.lists.erase(B);this.removeItems(B.getChildren());
/* 89  */ },this);return $$(A);},getClone:function(B,A){if(!this.options.clone){return new Element("div").inject(document.body);}if($type(this.options.clone)=="function"){return this.options.clone.call(this,B,A,this.list);
/* 90  */ }return A.clone(true).setStyles({margin:"0px",position:"absolute",visibility:"hidden",width:A.getStyle("width")}).inject(this.list).position(A.getPosition(A.getOffsetParent()));
/* 91  */ },getDroppables:function(){var A=this.list.getChildren();if(!this.options.constrain){A=this.lists.concat(A).erase(this.list);}return A.erase(this.clone).erase(this.element);
/* 92  */ },insert:function(C,B){var A="inside";if(this.lists.contains(B)){this.list=B;this.drag.droppables=this.getDroppables();}else{A=this.element.getAllPrevious().contains(B)?"before":"after";
/* 93  */ }this.element.inject(B,A);this.fireEvent("sort",[this.element,this.clone]);},start:function(B,A){if(!this.idle){return ;}this.idle=false;this.element=A;
/* 94  */ this.opacity=A.get("opacity");this.list=A.getParent();this.clone=this.getClone(B,A);this.drag=new Drag.Move(this.clone,{snap:this.options.snap,container:this.options.constrain&&this.element.getParent(),droppables:this.getDroppables(),onSnap:function(){B.stop();
/* 95  */ this.clone.setStyle("visibility","visible");this.element.set("opacity",this.options.opacity||0);this.fireEvent("start",[this.element,this.clone]);}.bind(this),onEnter:this.insert.bind(this),onCancel:this.reset.bind(this),onComplete:this.end.bind(this)});
/* 96  */ this.clone.inject(this.element,"before");this.drag.start(B);},end:function(){this.drag.detach();this.element.set("opacity",this.opacity);if(this.effect){var A=this.element.getStyles("width","height");
/* 97  */ var B=this.clone.computePosition(this.element.getPosition(this.clone.offsetParent));this.effect.element=this.clone;this.effect.start({top:B.top,left:B.left,width:A.width,height:A.height,opacity:0.25}).chain(this.reset.bind(this));
/* 98  */ }else{this.reset();}},reset:function(){this.idle=true;this.clone.destroy();this.fireEvent("complete",this.element);},serialize:function(){var C=Array.link(arguments,{modifier:Function.type,index:$defined});
/* 99  */ var B=this.lists.map(function(D){return D.getChildren().map(C.modifier||function(E){return E.get("id");},this);},this);var A=C.index;if(this.lists.length==1){A=0;
/* 100 */ }return $chk(A)&&A>=0&&A<this.lists.length?B[A]:B;}});var Tips=new Class({Implements:[Events,Options],options:{onShow:function(A){A.setStyle("visibility","visible");

/* mootools-1.2-more.js */

/* 101 */ },onHide:function(A){A.setStyle("visibility","hidden");},showDelay:100,hideDelay:100,className:null,offsets:{x:16,y:16},fixed:false},initialize:function(){var C=Array.link(arguments,{options:Object.type,elements:$defined});
/* 102 */ this.setOptions(C.options||null);this.tip=new Element("div").inject(document.body);if(this.options.className){this.tip.addClass(this.options.className);
/* 103 */ }var B=new Element("div",{"class":"tip-top"}).inject(this.tip);this.container=new Element("div",{"class":"tip"}).inject(this.tip);var A=new Element("div",{"class":"tip-bottom"}).inject(this.tip);
/* 104 */ this.tip.setStyles({position:"absolute",top:0,left:0,visibility:"hidden"});if(C.elements){this.attach(C.elements);}},attach:function(A){$$(A).each(function(D){var G=D.retrieve("tip:title",D.get("title"));
/* 105 */ var F=D.retrieve("tip:text",D.get("rel")||D.get("href"));var E=D.retrieve("tip:enter",this.elementEnter.bindWithEvent(this,D));var C=D.retrieve("tip:leave",this.elementLeave.bindWithEvent(this,D));
/* 106 */ D.addEvents({mouseenter:E,mouseleave:C});if(!this.options.fixed){var B=D.retrieve("tip:move",this.elementMove.bindWithEvent(this,D));D.addEvent("mousemove",B);
/* 107 */ }D.store("tip:native",D.get("title"));D.erase("title");},this);return this;},detach:function(A){$$(A).each(function(C){C.removeEvent("mouseenter",C.retrieve("tip:enter")||$empty);
/* 108 */ C.removeEvent("mouseleave",C.retrieve("tip:leave")||$empty);C.removeEvent("mousemove",C.retrieve("tip:move")||$empty);C.eliminate("tip:enter").eliminate("tip:leave").eliminate("tip:move");
/* 109 */ var B=C.retrieve("tip:native");if(B){C.set("title",B);}});return this;},elementEnter:function(B,A){$A(this.container.childNodes).each(Element.dispose);
/* 110 */ var D=A.retrieve("tip:title");if(D){this.titleElement=new Element("div",{"class":"tip-title"}).inject(this.container);this.fill(this.titleElement,D);}var C=A.retrieve("tip:text");
/* 111 */ if(C){this.textElement=new Element("div",{"class":"tip-text"}).inject(this.container);this.fill(this.textElement,C);}this.timer=$clear(this.timer);this.timer=this.show.delay(this.options.showDelay,this);
/* 112 */ this.position((!this.options.fixed)?B:{page:A.getPosition()});},elementLeave:function(A){$clear(this.timer);this.timer=this.hide.delay(this.options.hideDelay,this);
/* 113 */ },elementMove:function(A){this.position(A);},position:function(D){var B=window.getSize(),A=window.getScroll();var E={x:this.tip.offsetWidth,y:this.tip.offsetHeight};
/* 114 */ var C={x:"left",y:"top"};for(var F in C){var G=D.page[F]+this.options.offsets[F];if((G+E[F]-A[F])>B[F]){G=D.page[F]-this.options.offsets[F]-E[F];}this.tip.setStyle(C[F],G);
/* 115 */ }},fill:function(A,B){(typeof B=="string")?A.set("html",B):A.adopt(B);},show:function(){this.fireEvent("show",this.tip);},hide:function(){this.fireEvent("hide",this.tip);
/* 116 */ }});var SmoothScroll=new Class({Extends:Fx.Scroll,initialize:function(B,C){C=C||document;var E=C.getDocument(),D=C.getWindow();this.parent(E,B);this.links=(this.options.links)?$$(this.options.links):$$(E.links);
/* 117 */ var A=D.location.href.match(/^[^#]*/)[0]+"#";this.links.each(function(G){if(G.href.indexOf(A)!=0){return ;}var F=G.href.substr(A.length);if(F&&$(F)){this.useLink(G,F);
/* 118 */ }},this);if(!Browser.Engine.webkit419){this.addEvent("complete",function(){D.location.hash=this.anchor;},true);}},useLink:function(B,A){B.addEvent("click",function(C){this.anchor=A;
/* 119 */ this.toElement(A);C.stop();}.bind(this));}});var Slider=new Class({Implements:[Events,Options],options:{onTick:function(A){if(this.options.snap){A=this.toPosition(this.step);
/* 120 */ }this.knob.setStyle(this.property,A);},snap:false,offset:0,range:false,wheel:false,steps:100,mode:"horizontal"},initialize:function(E,A,D){this.setOptions(D);
/* 121 */ this.element=$(E);this.knob=$(A);this.previousChange=this.previousEnd=this.step=-1;this.element.addEvent("mousedown",this.clickedElement.bind(this));if(this.options.wheel){this.element.addEvent("mousewheel",this.scrolledElement.bindWithEvent(this));
/* 122 */ }var F,B={},C={x:false,y:false};switch(this.options.mode){case"vertical":this.axis="y";this.property="top";F="offsetHeight";break;case"horizontal":this.axis="x";
/* 123 */ this.property="left";F="offsetWidth";}this.half=this.knob[F]/2;this.full=this.element[F]-this.knob[F]+(this.options.offset*2);this.min=$chk(this.options.range[0])?this.options.range[0]:0;
/* 124 */ this.max=$chk(this.options.range[1])?this.options.range[1]:this.options.steps;this.range=this.max-this.min;this.steps=this.options.steps||this.full;this.stepSize=Math.abs(this.range)/this.steps;
/* 125 */ this.stepWidth=this.stepSize*this.full/Math.abs(this.range);this.knob.setStyle("position","relative").setStyle(this.property,-this.options.offset);C[this.axis]=this.property;
/* 126 */ B[this.axis]=[-this.options.offset,this.full-this.options.offset];this.drag=new Drag(this.knob,{snap:0,limit:B,modifiers:C,onDrag:this.draggedKnob.bind(this),onStart:this.draggedKnob.bind(this),onComplete:function(){this.draggedKnob();
/* 127 */ this.end();}.bind(this)});if(this.options.snap){this.drag.options.grid=Math.ceil(this.stepWidth);this.drag.options.limit[this.axis][1]=this.full;}},set:function(A){if(!((this.range>0)^(A<this.min))){A=this.min;
/* 128 */ }if(!((this.range>0)^(A>this.max))){A=this.max;}this.step=Math.round(A);this.checkStep();this.end();this.fireEvent("tick",this.toPosition(this.step));return this;
/* 129 */ },clickedElement:function(C){var B=this.range<0?-1:1;var A=C.page[this.axis]-this.element.getPosition()[this.axis]-this.half;A=A.limit(-this.options.offset,this.full-this.options.offset);
/* 130 */ this.step=Math.round(this.min+B*this.toStep(A));this.checkStep();this.end();this.fireEvent("tick",A);},scrolledElement:function(A){var B=(this.options.mode=="horizontal")?(A.wheel<0):(A.wheel>0);
/* 131 */ this.set(B?this.step-this.stepSize:this.step+this.stepSize);A.stop();},draggedKnob:function(){var B=this.range<0?-1:1;var A=this.drag.value.now[this.axis];
/* 132 */ A=A.limit(-this.options.offset,this.full-this.options.offset);this.step=Math.round(this.min+B*this.toStep(A));this.checkStep();},checkStep:function(){if(this.previousChange!=this.step){this.previousChange=this.step;
/* 133 */ this.fireEvent("change",this.step);}},end:function(){if(this.previousEnd!==this.step){this.previousEnd=this.step;this.fireEvent("complete",this.step+"");
/* 134 */ }},toStep:function(A){var B=(A+this.options.offset)*this.stepSize/this.full*this.steps;return this.options.steps?Math.round(B-=B%this.stepSize):B;},toPosition:function(A){return(this.full*Math.abs(this.min-A))/(this.steps*this.stepSize)-this.options.offset;
/* 135 */ }});var Scroller=new Class({Implements:[Events,Options],options:{area:20,velocity:1,onChange:function(A,B){this.element.scrollTo(A,B);}},initialize:function(B,A){this.setOptions(A);
/* 136 */ this.element=$(B);this.listener=($type(this.element)!="element")?$(this.element.getDocument().body):this.element;this.timer=null;this.coord=this.getCoords.bind(this);
/* 137 */ },start:function(){this.listener.addEvent("mousemove",this.coord);},stop:function(){this.listener.removeEvent("mousemove",this.coord);this.timer=$clear(this.timer);
/* 138 */ },getCoords:function(A){this.page=(this.listener.get("tag")=="body")?A.client:A.page;if(!this.timer){this.timer=this.scroll.periodical(50,this);}},scroll:function(){var B=this.element.getSize(),A=this.element.getScroll(),E=this.element.getPosition(),D={x:0,y:0};
/* 139 */ for(var C in this.page){if(this.page[C]<(this.options.area+E[C])&&A[C]!=0){D[C]=(this.page[C]-this.options.area-E[C])*this.options.velocity;}else{if(this.page[C]+this.options.area>(B[C]+E[C])&&B[C]+B[C]!=A[C]){D[C]=(this.page[C]-B[C]+this.options.area-E[C])*this.options.velocity;
/* 140 */ }}}if(D.y||D.x){this.fireEvent("change",[A.x+D.x,A.y+D.y]);}}});var Accordion=new Class({Extends:Fx.Elements,options:{display:0,show:false,height:true,width:false,opacity:true,fixedHeight:false,fixedWidth:false,wait:false,alwaysHide:false},initialize:function(){var C=Array.link(arguments,{container:Element.type,options:Object.type,togglers:$defined,elements:$defined});
/* 141 */ this.parent(C.elements,C.options);this.togglers=$$(C.togglers);this.container=$(C.container);this.previous=-1;if(this.options.alwaysHide){this.options.wait=true;
/* 142 */ }if($chk(this.options.show)){this.options.display=false;this.previous=this.options.show;}if(this.options.start){this.options.display=false;this.options.show=false;
/* 143 */ }this.effects={};if(this.options.opacity){this.effects.opacity="fullOpacity";}if(this.options.width){this.effects.width=this.options.fixedWidth?"fullWidth":"offsetWidth";
/* 144 */ }if(this.options.height){this.effects.height=this.options.fixedHeight?"fullHeight":"scrollHeight";}for(var B=0,A=this.togglers.length;B<A;B++){this.addSection(this.togglers[B],this.elements[B]);
/* 145 */ }this.elements.each(function(E,D){if(this.options.show===D){this.fireEvent("active",[this.togglers[D],E]);}else{for(var F in this.effects){E.setStyle(F,0);
/* 146 */ }}},this);if($chk(this.options.display)){this.display(this.options.display);}},addSection:function(E,C,G){E=$(E);C=$(C);var F=this.togglers.contains(E);
/* 147 */ var B=this.togglers.length;this.togglers.include(E);this.elements.include(C);if(B&&(!F||G)){G=$pick(G,B-1);E.inject(this.togglers[G],"before");C.inject(E,"after");
/* 148 */ }else{if(this.container&&!F){E.inject(this.container);C.inject(this.container);}}var A=this.togglers.indexOf(E);E.addEvent("click",this.display.bind(this,A));
/* 149 */ if(this.options.height){C.setStyles({"padding-top":0,"border-top":"none","padding-bottom":0,"border-bottom":"none"});}if(this.options.width){C.setStyles({"padding-left":0,"border-left":"none","padding-right":0,"border-right":"none"});
/* 150 */ }C.fullOpacity=1;if(this.options.fixedWidth){C.fullWidth=this.options.fixedWidth;}if(this.options.fixedHeight){C.fullHeight=this.options.fixedHeight;}C.setStyle("overflow","hidden");

/* mootools-1.2-more.js */

/* 151 */ if(!F){for(var D in this.effects){C.setStyle(D,0);}}return this;},display:function(A){A=($type(A)=="element")?this.elements.indexOf(A):A;if((this.timer&&this.options.wait)||(A===this.previous&&!this.options.alwaysHide)){return this;
/* 152 */ }this.previous=A;var B={};this.elements.each(function(E,D){B[D]={};var C=(D!=A)||(this.options.alwaysHide&&(E.offsetHeight>0));this.fireEvent(C?"background":"active",[this.togglers[D],E]);
/* 153 */ for(var F in this.effects){B[D][F]=C?0:E[this.effects[F]];}},this);return this.start(B);}});

;
/* Core.js */

/* 1   */ /* 
/* 2   *| 
/* 3   *| Script: Core.js
/* 4   *| 	MochaUI - A Web Applications User Interface Framework.
/* 5   *| 
/* 6   *| Copyright:
/* 7   *| 	Copyright (c) 2007-2008 Greg Houston, <http://greghoustondesign.com/>.
/* 8   *| 
/* 9   *| License:
/* 10  *| 	MIT-style license.
/* 11  *| 
/* 12  *| Contributors:
/* 13  *| 	- Scott F. Frederick
/* 14  *| 	- Joel Lindau
/* 15  *| 
/* 16  *| Note:
/* 17  *| 	This documentation is taken directly from the javascript source files. It is built using Natural Docs.
/* 18  *| 
/* 19  *| Todo:
/* 20  *| 	Consider making title tooltips optional and using them more often.
/* 21  *| 
/* 22  *| */
/* 23  */ 
/* 24  */ var MochaUI = new Hash({
/* 25  */ 	options: new Hash({
/* 26  */ 		useEffects: false  // Toggles the majority of window fade and move effects.
/* 27  */ 	}),
/* 28  */ 	Columns: {
/* 29  */ 		instances:      new Hash()
/* 30  */ 	},
/* 31  */ 	Panels: {
/* 32  */ 		instances:      new Hash()
/* 33  */ 	},		
/* 34  */ 	Windows: {	  
/* 35  */ 		instances:      new Hash(),
/* 36  */ 		indexLevel:     100,          // Used for z-Index
/* 37  */ 		windowIDCount:  0,	          // Used for windows without an ID defined by the user
/* 38  */ 		windowsVisible: true          // Ctrl-Alt-Q to toggle window visibility
/* 39  */ 	},	
/* 40  */ 	ieSupport:  'excanvas',   // Makes it easier to switch between Excanvas and Moocanvas for testing
/* 41  */ 	focusingWindow: 'false',
/* 42  */ 	/*
/* 43  *| 	
/* 44  *| 	Function: updateContent
/* 45  *| 		Replace the content of a window or panel.
/* 46  *| 		
/* 47  *| 	Arguments:
/* 48  *| 		element - The parent window or panel.
/* 49  *| 		childElement - The child element of the window or panel recieving the content.
/* 50  *| 		title - (string) Change this if you want to change the title of the window or panel.

/* Core.js */

/* 51  *| 		content - (string or element) An html loadMethod option.
/* 52  *| 		loadMethod - ('html', 'xhr', or 'iframe') Defaults to 'html'.
/* 53  *| 		url - Used if loadMethod is set to 'xhr' or 'iframe'.
/* 54  *| 		padding - (object)
/* 55  *| 
/* 56  *| 	*/	
/* 57  */ 	updateContent: function(updateOptions){
/* 58  */ 
/* 59  */ 		var options = {
/* 60  */ 			'element':      null,
/* 61  */ 			'childElement': null,
/* 62  */ 			'title':        null,
/* 63  */ 			'content':      null,
/* 64  */ 			'loadMethod':   null,
/* 65  */ 			'url':          null,
/* 66  */ 			'padding':      null
/* 67  */ 		};
/* 68  */ 		$extend(options, updateOptions);
/* 69  */ 
/* 70  */ 		if (!options.element) return;
/* 71  */ 		var element = options.element;
/* 72  */ 
/* 73  */ 		if (MochaUI.Windows.instances.get(element.id)) {
/* 74  */ 			var recipient = 'window';
/* 75  */ 			var currentInstance = MochaUI.Windows.instances.get(element.id);
/* 76  */ 			var spinnerEl = currentInstance.spinnerEl;
/* 77  */ 			if (options.title) {
/* 78  */ 				currentInstance.titleEl.set('html', options.title);
/* 79  */ 			}
/* 80  */ 		}
/* 81  */ 		else {
/* 82  */ 			var recipient = 'panel';
/* 83  */ 			var currentInstance = MochaUI.Panels.instances.get(element.id);
/* 84  */ 			if (options.title) {
/* 85  */ 				currentInstance.titleEl.set('html', options.title);
/* 86  */ 			}
/* 87  */ 		}
/* 88  */ 
/* 89  */ 		var contentEl = currentInstance.contentEl;
/* 90  */ 		if (options.childElement != null) {
/* 91  */ 			var contentContainer = options.childElement;
/* 92  */ 		}
/* 93  */ 		else {
/* 94  */ 			var contentContainer = currentInstance.contentEl;
/* 95  */ 		}
/* 96  */ 		
/* 97  */ 		var loadMethod = options.loadMethod != null ? options.loadMethod : currentInstance.options.loadMethod;
/* 98  */ 		
/* 99  */ 		// Set scrollbars if loading content in main content container.
/* 100 */ 		// Always use 'hidden' for iframe windows

/* Core.js */

/* 101 */ 		if (contentContainer == currentInstance.contentEl) {
/* 102 */ 			currentInstance.contentWrapperEl.setStyles({
/* 103 */ 				'overflow': currentInstance.options.scrollbars == true && loadMethod != 'iframe' ? 'auto' : 'hidden'
/* 104 */ 			});
/* 105 */ 		}
/* 106 */ 
/* 107 */ 		var contentWrapperEl = currentInstance.contentWrapperEl;
/* 108 */ 		
/* 109 */ 		if (options.padding != null) {
/* 110 */ 			contentEl.setStyles({
/* 111 */ 				'padding-top': options.padding.top,
/* 112 */ 				'padding-bottom': options.padding.bottom,
/* 113 */ 				'padding-left': options.padding.left,
/* 114 */ 				'padding-right': options.padding.right
/* 115 */ 			});
/* 116 */ 		}
/* 117 */ 
/* 118 */ 		// Remove old content.
/* 119 */ 		if (contentContainer == contentEl){
/* 120 */ 			contentEl.empty();
/* 121 */ 		}
/* 122 */ 
/* 123 */ 		// Load new content.
/* 124 */ 		switch(loadMethod){
/* 125 */ 			case 'xhr':
/* 126 */ 				new Request.HTML({
/* 127 */ 					url: options.url,
/* 128 */ 					update: contentContainer,
/* 129 */ 					evalScripts: currentInstance.options.evalScripts,
/* 130 */ 					evalResponse: currentInstance.options.evalResponse,
/* 131 */ 					onRequest: function(){
/* 132 */ 						if (recipient == 'window' && contentContainer == contentEl){
/* 133 */ 							currentInstance.showSpinner(spinnerEl);
/* 134 */ 						}
/* 135 */ 						else if (recipient == 'panel' && contentContainer == contentEl && $('spinner')){
/* 136 */ 							$('spinner').setStyle('visibility','visible');	
/* 137 */ 						}
/* 138 */ 					}.bind(this),
/* 139 */ 					onFailure: function(){
/* 140 */ 						if (contentContainer == contentEl){
/* 141 */ 							contentContainer.set('html','<p><strong>Error Loading XMLHttpRequest</strong></p>');
/* 142 */ 							if (recipient == 'window') {
/* 143 */ 								currentInstance.hideSpinner(spinnerEl);
/* 144 */ 							}
/* 145 */ 							else if (recipient == 'panel' && $('spinner')) {
/* 146 */ 								$('spinner').setStyle('visibility', 'hidden');
/* 147 */ 							}
/* 148 */ 						}
/* 149 */ 					}.bind(this),
/* 150 */ 					onException: function(){}.bind(this),

/* Core.js */

/* 151 */ 					onSuccess: function(){
/* 152 */ 						if (contentContainer == contentEl){
/* 153 */ 							if (recipient == 'window'){
/* 154 */ 								currentInstance.hideSpinner(spinnerEl);
/* 155 */ 							}
/* 156 */ 							else if (recipient == 'panel' && $('spinner')){
/* 157 */ 								$('spinner').setStyle('visibility', 'hidden');
/* 158 */ 							}
/* 159 */ 							currentInstance.fireEvent('onContentLoaded', element);
/* 160 */ 						}
/* 161 */ 					}.bind(this),
/* 162 */ 					onComplete: function(){}.bind(this)
/* 163 */ 				}).get();
/* 164 */ 				break;
/* 165 */ 			case 'iframe': // May be able to streamline this if the iframe already exists.
/* 166 */ 				if ( currentInstance.options.contentURL == '' || contentContainer != contentEl) {
/* 167 */ 					break;
/* 168 */ 				}
/* 169 */ 				currentInstance.iframeEl = new Element('iframe', {
/* 170 */ 					'id': currentInstance.options.id + '_iframe',
/* 171 */ 					'name':  currentInstance.options.id + '_iframe',
/* 172 */ 					'class': 'mochaIframe',
/* 173 */ 					'src': options.url,
/* 174 */ 					'marginwidth':  0,
/* 175 */ 					'marginheight': 0,
/* 176 */ 					'frameBorder':  0,
/* 177 */ 					'scrolling':    'auto',
/* 178 */ 					'styles': {
/* 179 */ 						'height': contentWrapperEl.offsetHeight - contentWrapperEl.getStyle('border-top').toInt() - contentWrapperEl.getStyle('border-bottom').toInt(),
/* 180 */ 						'width': currentInstance.panelEl ? contentWrapperEl.offsetWidth - contentWrapperEl.getStyle('border-left').toInt() - contentWrapperEl.getStyle('border-right').toInt() : '100%'	
/* 181 */ 					}
/* 182 */ 				}).injectInside(contentEl);
/* 183 */ 
/* 184 */ 				// Add onload event to iframe so we can hide the spinner and run onContentLoaded()
/* 185 */ 				currentInstance.iframeEl.addEvent('load', function(e) {
/* 186 */ 					if (recipient == 'window') {
/* 187 */ 						currentInstance.hideSpinner(spinnerEl);
/* 188 */ 					}
/* 189 */ 					else if (recipient == 'panel' && contentContainer == contentEl && $('spinner')) {
/* 190 */ 						$('spinner').setStyle('visibility', 'hidden');
/* 191 */ 					}
/* 192 */ 					currentInstance.fireEvent('onContentLoaded', element);
/* 193 */ 				}.bind(this));
/* 194 */ 				if (recipient == 'window') {
/* 195 */ 					currentInstance.showSpinner(spinnerEl);
/* 196 */ 				}
/* 197 */ 				else if (recipient == 'panel' && contentContainer == contentEl && $('spinner')){
/* 198 */ 					$('spinner').setStyle('visibility', 'visible');	
/* 199 */ 				}
/* 200 */ 				break;

/* Core.js */

/* 201 */ 			case 'html':
/* 202 */ 			default:
/* 203 */ 				// Need to test injecting elements as content.
/* 204 */ 				var elementTypes = new Array('element', 'textnode', 'whitespace', 'collection');
/* 205 */ 				if (elementTypes.contains($type(options.content))){
/* 206 */ 					options.content.inject(contentContainer);
/* 207 */ 				} else {
/* 208 */ 					contentContainer.set('html', options.content);
/* 209 */ 				}
/* 210 */ 				currentInstance.fireEvent('onContentLoaded', element);
/* 211 */ 				break;
/* 212 */ 		}
/* 213 */ 
/* 214 */ 	},
/* 215 */ 	/*
/* 216 *| 	
/* 217 *| 	Function: reloadIframe
/* 218 *| 		Reload an iframe. Fixes an issue in Firefox when trying to use location.reload on an iframe that has been destroyed and recreated.
/* 219 *| 
/* 220 *| 	Arguments:
/* 221 *| 		iframe - This should be both the name and the id of the iframe.
/* 222 *| 
/* 223 *| 	Syntax:
/* 224 *| 		(start code)
/* 225 *| 		MochaUI.reloadIframe(element);
/* 226 *| 		(end)
/* 227 *| 
/* 228 *| 	Example:
/* 229 *| 		To reload an iframe from within another iframe:
/* 230 *| 		(start code)
/* 231 *| 		parent.MochaUI.reloadIframe('myIframeName');
/* 232 *| 		(end)
/* 233 *| 
/* 234 *| 	*/
/* 235 */ 	reloadIframe: function(iframe){
/* 236 */ 		if (Browser.Engine.gecko) {
/* 237 */ 			$(iframe).src = $(iframe).src;
/* 238 */ 		}
/* 239 */ 		else {
/* 240 */ 			top.frames[iframe].location.reload(true);
/* 241 */ 		}
/* 242 */ 	},
/* 243 */ 	collapseToggle: function(windowEl){
/* 244 */ 		var instances = MochaUI.Windows.instances;
/* 245 */ 		var currentInstance = instances.get(windowEl.id);
/* 246 */ 		var handles = currentInstance.windowEl.getElements('.handle');
/* 247 */ 		if (currentInstance.isMaximized == true) return;		
/* 248 */ 		if (currentInstance.isCollapsed == false) {
/* 249 */ 			currentInstance.isCollapsed = true;
/* 250 */ 			handles.setStyle('display', 'none');

/* Core.js */

/* 251 */ 			if ( currentInstance.iframeEl ) {
/* 252 */ 				currentInstance.iframeEl.setStyle('visibility', 'hidden');
/* 253 */ 			}
/* 254 */ 			currentInstance.contentBorderEl.setStyles({
/* 255 */ 				visibility: 'hidden',
/* 256 */ 				position: 'absolute',
/* 257 */ 				top: -10000,
/* 258 */ 				left: -10000
/* 259 */ 			});
/* 260 */ 			if(currentInstance.toolbarWrapperEl){
/* 261 */ 				currentInstance.toolbarWrapperEl.setStyles({
/* 262 */ 					visibility: 'hidden',
/* 263 */ 					position: 'absolute',
/* 264 */ 					top: -10000,
/* 265 */ 					left: -10000
/* 266 */ 				});
/* 267 */ 			}
/* 268 */ 			currentInstance.drawWindowCollapsed(windowEl);
/* 269 */ 		}
/* 270 */ 		else {
/* 271 */ 			currentInstance.isCollapsed = false;
/* 272 */ 			currentInstance.drawWindow(windowEl);
/* 273 */ 			currentInstance.contentBorderEl.setStyles({
/* 274 */ 				visibility: 'visible',
/* 275 */ 				position: null,
/* 276 */ 				top: null,
/* 277 */ 				left: null
/* 278 */ 			});
/* 279 */ 			if(currentInstance.toolbarWrapperEl){
/* 280 */ 				currentInstance.toolbarWrapperEl.setStyles({
/* 281 */ 					visibility: 'visible',
/* 282 */ 					position: null,
/* 283 */ 					top: null,
/* 284 */ 					left: null
/* 285 */ 				});
/* 286 */ 			}
/* 287 */ 			if ( currentInstance.iframeEl ) {
/* 288 */ 				currentInstance.iframeEl.setStyle('visibility', 'visible');
/* 289 */ 			}
/* 290 */ 			handles.setStyle('display', 'block');
/* 291 */ 		}
/* 292 */ 	},
/* 293 */ 	/*
/* 294 *| 
/* 295 *| 	Function: closeWindow
/* 296 *| 		Closes a window.
/* 297 *| 
/* 298 *| 	Syntax:
/* 299 *| 	(start code)
/* 300 *| 		MochaUI.closeWindow();

/* Core.js */

/* 301 *| 	(end)
/* 302 *| 
/* 303 *| 	Arguments: 
/* 304 *| 		windowEl - the ID of the window to be closed
/* 305 *| 
/* 306 *| 	Returns:
/* 307 *| 		true - the window was closed
/* 308 *| 		false - the window was not closed
/* 309 *| 
/* 310 *| 	*/
/* 311 */ 	closeWindow: function(windowEl){
/* 312 */ 		// Does window exist and is not already in process of closing ?
/* 313 */ 		var instances = MochaUI.Windows.instances;
/* 314 */ 		var currentInstance = instances.get(windowEl.id);
/* 315 */ 		if (windowEl != $(windowEl) || currentInstance.isClosing) return;
/* 316 */ 
/* 317 */ 		currentInstance.isClosing = true;
/* 318 */ 		currentInstance.fireEvent('onClose', windowEl);
/* 319 */ 		if (currentInstance.check) currentInstance.check.destroy();
/* 320 */ 
/* 321 */ 		if ((currentInstance.options.type == 'modal' || currentInstance.options.type == 'modal2') && Browser.Engine.trident4){
/* 322 */ 				$('modalFix').setStyle('display', 'none');
/* 323 */ 		}
/* 324 */ 
/* 325 */ 		if (MochaUI.options.useEffects == false){
/* 326 */ 			if (currentInstance.options.type == 'modal' || currentInstance.options.type == 'modal2'){
/* 327 */ 				// Tratando contador de quantas modais estão abertas [jdrummond]
/* 328 */ 				modalOverlayCount--;
/* 329 */ 				// Caso seja última modal aberta, remove (opacity:0) o overlay
/* 330 */ 				if (modalOverlayCount == 0) {
/* 331 */ 					$('modalOverlay').setStyle('opacity', 0);
/* 332 */ 				}
/* 333 */ 				// Caso ainda exista modais abertas, faz com que o overlay fique na camada anterior à modal mais recente [jdrummond]
/* 334 */ 				else {
/* 335 */ 					$('modalOverlay').setStyle('zIndex',currentInstance.windowEl.style.zIndex - 3);
/* 336 */ 				}
/* 337 */ 			}
/* 338 */ 			MochaUI.closingJobs(windowEl);
/* 339 */ 			return true;	
/* 340 */ 		}
/* 341 */ 		else {
/* 342 */ 			// Redraws IE windows without shadows since IE messes up canvas alpha when you change element opacity
/* 343 */ 			if (Browser.Engine.trident) currentInstance.drawWindow(windowEl, false);
/* 344 */ 			if (currentInstance.options.type == 'modal' || currentInstance.options.type == 'modal2'){
/* 345 */ 				MochaUI.Modal.modalOverlayCloseMorph.start({
/* 346 */ 					'opacity': 0
/* 347 */ 				});
/* 348 */ 			}
/* 349 */ 			var closeMorph = new Fx.Morph(windowEl, {
/* 350 */ 				duration: 120,

/* Core.js */

/* 351 */ 				onComplete: function(){
/* 352 */ 					MochaUI.closingJobs(windowEl);
/* 353 */ 					return true;
/* 354 */ 				}.bind(this)
/* 355 */ 			});
/* 356 */ 			closeMorph.start({
/* 357 */ 				'opacity': .4
/* 358 */ 			});
/* 359 */ 		}
/* 360 */ 
/* 361 */ 	},
/* 362 */ 	closingJobs: function(windowEl){
/* 363 */ 
/* 364 */ 		var instances = MochaUI.Windows.instances;
/* 365 */ 		var currentInstance = instances.get(windowEl.id);
/* 366 */ 		windowEl.setStyle('visibility', 'hidden');
/* 367 */ 		windowEl.destroy();
/* 368 */ 		currentInstance.fireEvent('onCloseComplete');
/* 369 */ 		
/* 370 */ 		if (currentInstance.options.type != 'notification'){
/* 371 */ 			var newFocus = this.getWindowWithHighestZindex();
/* 372 */ 			this.focusWindow(newFocus);
/* 373 */ 		}
/* 374 */ 
/* 375 */ 		instances.erase(currentInstance.options.id);
/* 376 */ 		if (this.loadingWorkspace == true) {
/* 377 */ 			this.windowUnload();
/* 378 */ 		}
/* 379 */ 
/* 380 */ 		if (MochaUI.Dock && $(MochaUI.options.dock) && currentInstance.options.type == 'window') {
/* 381 */ 			var currentButton = $(currentInstance.options.id + '_dockTab');
/* 382 */ 			if (currentButton != null) {
/* 383 */ 				MochaUI.Dock.dockSortables.removeItems(currentButton).destroy();
/* 384 */ 			}
/* 385 */ 			// Need to resize everything in case the dock becomes smaller when a tab is removed
/* 386 */ 			MochaUI.Desktop.setDesktopSize();
/* 387 */ 		}
/* 388 */ 	},
/* 389 */ 	/*
/* 390 *| 	
/* 391 *| 	Function: closeAll	
/* 392 *| 		Close all open windows.
/* 393 *| 
/* 394 *| 	*/
/* 395 */ 	closeAll: function() {		
/* 396 */ 		$$('div.mocha').each(function(windowEl){
/* 397 */ 			this.closeWindow(windowEl);
/* 398 */ 		}.bind(this));
/* 399 */ 	},
/* 400 */ 	/*

/* Core.js */

/* 401 *| 
/* 402 *| 	Function: toggleWindowVisibility
/* 403 *| 		Toggle window visibility with Ctrl-Alt-Q.
/* 404 *| 
/* 405 *| 	*/	
/* 406 */ 	toggleWindowVisibility: function(){
/* 407 */ 		MochaUI.Windows.instances.each(function(instance){
/* 408 */ 			if (instance.options.type == 'modal' || instance.options.type == 'modal2' || instance.isMinimized == true) return;									
/* 409 */ 			var id = $(instance.options.id);
/* 410 */ 			if (id.getStyle('visibility') == 'visible'){
/* 411 */ 				if (instance.iframe){
/* 412 */ 					instance.iframeEl.setStyle('visibility', 'hidden');
/* 413 */ 				}
/* 414 */ 				if (instance.toolbarEl){
/* 415 */ 					instance.toolbarWrapperEl.setStyle('visibility', 'hidden');
/* 416 */ 				}
/* 417 */ 				instance.contentBorderEl.setStyle('visibility', 'hidden');
/* 418 */ 				id.setStyle('visibility', 'hidden');
/* 419 */ 				MochaUI.Windows.windowsVisible = false;
/* 420 */ 			}
/* 421 */ 			else {
/* 422 */ 				id.setStyle('visibility', 'visible');
/* 423 */ 				instance.contentBorderEl.setStyle('visibility', 'visible');
/* 424 */ 				if (instance.iframe){
/* 425 */ 					instance.iframeEl.setStyle('visibility', 'visible');
/* 426 */ 				}
/* 427 */ 				if (instance.toolbarEl){
/* 428 */ 					instance.toolbarWrapperEl.setStyle('visibility', 'visible');
/* 429 */ 				}
/* 430 */ 				MochaUI.Windows.windowsVisible = true;
/* 431 */ 			}
/* 432 */ 		}.bind(this));
/* 433 */ 
/* 434 */ 	},
/* 435 */ 	focusWindow: function(windowEl, fireEvent){
/* 436 */ 
/* 437 */ 		// This is used with blurAll
/* 438 */ 		MochaUI.focusingWindow = 'true';
/* 439 */ 		var windowClicked = function(){
/* 440 */ 			MochaUI.focusingWindow = 'false';
/* 441 */ 		};		
/* 442 */ 		windowClicked.delay(170, this);
/* 443 */ 
/* 444 */ 		// Only focus when needed
/* 445 */ 		if ($$('.mocha').length == 0) return;
/* 446 */ 		if (windowEl != $(windowEl) || windowEl.hasClass('isFocused')) return;
/* 447 */ 
/* 448 */ 		var instances =  MochaUI.Windows.instances;
/* 449 */ 		var currentInstance = instances.get(windowEl.id);
/* 450 */ 	

/* Core.js */

/* 451 */ 		if (currentInstance.options.type == 'notification'){ MochaUI.currentNotification = windowEl; windowEl.setStyle('zIndex',11001); return; }; 
/* 452 */ 
/* 453 */ 		MochaUI.Windows.indexLevel += 2;
/* 454 */ 
/* 455 */ 		// Se for modal, verifica se é a última modal, para que o z-index da janela anterior possa ser reajustado [jdrummond]
/* 456 */ 		if (typeof(modalOverlayCount) == 'undefined' || modalOverlayCount == 0 || currentInstance.options.type != 'modal')
/* 457 */ 			windowEl.setStyle('zIndex', MochaUI.Windows.indexLevel);
/* 458 */ 
/* 459 */ 		// Used when dragging and resizing windows
/* 460 */ 		$('windowUnderlay').setStyle('zIndex', MochaUI.Windows.indexLevel - 1).inject($(windowEl),'after');
/* 461 */ 
/* 462 */ 		// Fire onBlur for the window that lost focus.
/* 463 */ 		instances.each(function(instance){
/* 464 */ 			if (instance.windowEl.hasClass('isFocused')){
/* 465 */ 				instance.fireEvent('onBlur', instance.windowEl);
/* 466 */ 			}
/* 467 */ 			instance.windowEl.removeClass('isFocused');
/* 468 */ 		});
/* 469 */ 
/* 470 */ 		if (MochaUI.Dock && $(MochaUI.options.dock) && currentInstance.options.type == 'window') {
/* 471 */ 			MochaUI.Dock.makeActiveTab();
/* 472 */ 		}
/* 473 */ 		currentInstance.windowEl.addClass('isFocused');
/* 474 */ 
/* 475 */ 		if (fireEvent != false){
/* 476 */ 			currentInstance.fireEvent('onFocus', windowEl);
/* 477 */ 		}
/* 478 */ 
/* 479 */ 	},
/* 480 */ 	getWindowWithHighestZindex: function(){
/* 481 */ 		this.highestZindex = 0;
/* 482 */ 		$$('div.mocha').each(function(element){
/* 483 */ 			this.zIndex = parseInt(element.getStyle('zIndex'));
/* 484 */ 			if (this.zIndex >= this.highestZindex) {
/* 485 */ 				this.highestZindex = parseInt(this.zIndex);
/* 486 */ 			}	
/* 487 */ 		}.bind(this));
/* 488 */ 		$$('div.mocha').each(function(element){
/* 489 */ 			if (element.getStyle('zIndex') == this.highestZindex) {
/* 490 */ 				this.windowWithHighestZindex = element;
/* 491 */ 			}
/* 492 */ 		}.bind(this));
/* 493 */ 
/* 494 */ 		return this.windowWithHighestZindex;
/* 495 */ 	},
/* 496 */ 	blurAll: function(){
/* 497 */ 		if (MochaUI.focusingWindow == 'false') {
/* 498 */ 			$$('.mocha').each(function(windowEl){
/* 499 */ 				var instances =  MochaUI.Windows.instances;
/* 500 */ 				var currentInstance = instances.get(windowEl.id);

/* Core.js */

/* 501 */ 				if (currentInstance.options.type != 'modal' && currentInstance.options.type != 'modal2'){
/* 502 */ 					windowEl.removeClass('isFocused');
/* 503 */ 				}
/* 504 */ 			});
/* 505 */ 			$$('div.dockTab').removeClass('activeDockTab');
/* 506 */ 		}
/* 507 */ 	},
/* 508 */ 	roundedRect: function(ctx, x, y, width, height, radius, rgb, a){
/* 509 */ 		ctx.fillStyle = 'rgba(' + rgb.join(',') + ',' + a + ')';
/* 510 */ 		ctx.beginPath();
/* 511 */ 		ctx.moveTo(x, y + radius);
/* 512 */ 		ctx.lineTo(x, y + height - radius);
/* 513 */ 		ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
/* 514 */ 		ctx.lineTo(x + width - radius, y + height);
/* 515 */ 		ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
/* 516 */ 		ctx.lineTo(x + width, y + radius);
/* 517 */ 		ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
/* 518 */ 		ctx.lineTo(x + radius, y);
/* 519 */ 		ctx.quadraticCurveTo(x, y, x, y + radius);
/* 520 */ 		ctx.fill(); 
/* 521 */ 	},
/* 522 */ 	triangle: function(ctx, x, y, width, height, rgb, a){
/* 523 */ 		ctx.beginPath();
/* 524 */ 		ctx.moveTo(x + width, y);
/* 525 */ 		ctx.lineTo(x, y + height);
/* 526 */ 		ctx.lineTo(x + width, y + height);
/* 527 */ 		ctx.closePath();
/* 528 */ 		ctx.fillStyle = 'rgba(' + rgb.join(',') + ',' + a + ')';
/* 529 */ 		ctx.fill();
/* 530 */ 	},
/* 531 */ 	circle: function(ctx, x, y, diameter, rgb, a){
/* 532 */ 		ctx.beginPath();
/* 533 */ 		ctx.moveTo(x, y);
/* 534 */ 		ctx.arc(x, y, diameter, 0, Math.PI*2, true);
/* 535 */ 		ctx.fillStyle = 'rgba(' + rgb.join(',') + ',' + a + ')';
/* 536 */ 		ctx.fill();
/* 537 */ 	},
/* 538 */ 	/*
/* 539 *| 
/* 540 *| 	Function: centerWindow
/* 541 *| 		Center a window in it's container. If windowEl is undefined it will center the window that has focus.
/* 542 *| 
/* 543 *| 	*/
/* 544 */ 	centerWindow: function(windowEl){
/* 545 */ 		
/* 546 */ 		if(!windowEl){
/* 547 */ 			MochaUI.Windows.instances.each(function(instance){
/* 548 */ 				if (instance.windowEl.hasClass('isFocused')){
/* 549 */ 					windowEl = instance.windowEl;
/* 550 */ 				}

/* Core.js */

/* 551 */ 			});
/* 552 */ 		}
/* 553 */ 
/* 554 */ 		var currentInstance = MochaUI.Windows.instances.get(windowEl.id);
/* 555 */ 		var options = currentInstance.options;
/* 556 */ 		var dimensions = options.container.getCoordinates();
/* 557 */ 		var windowPosTop = (dimensions.height * .5) - ((options.height + currentInstance.headerFooterShadow) * .5);
/* 558 */ 		if (windowPosTop < 0) {
/* 559 */ 			windowPosTop = 0;
/* 560 */ 		}
/* 561 */ 		var windowPosLeft =	(dimensions.width * .5) - (options.width * .5);
/* 562 */ 		if (windowPosLeft < 0) {
/* 563 */ 			windowPosLeft = 0;
/* 564 */ 		}
/* 565 */ 		if (MochaUI.options.useEffects == true){
/* 566 */ 			currentInstance.morph.start({
/* 567 */ 				'top': windowPosTop,
/* 568 */ 				'left': windowPosLeft
/* 569 */ 			});
/* 570 */ 		}
/* 571 */ 		else {
/* 572 */ 			windowEl.setStyles({
/* 573 */ 				'top': windowPosTop,
/* 574 */ 				'left': windowPosLeft
/* 575 */ 			});
/* 576 */ 		}
/* 577 */ 	},
/* 578 */ 	notification: function(message){
/* 579 */ 			new MochaUI.Window({
/* 580 */ 				loadMethod: 'html',
/* 581 */ 				closeAfter: 1500,
/* 582 */ 				type: 'notification',
/* 583 */ 				addClass: 'notification',
/* 584 */ 				content: message,
/* 585 */ 				width: 220,
/* 586 */ 				height: 40,
/* 587 */ 				y: 53,
/* 588 */ 				padding:  { top: 10, right: 12, bottom: 10, left: 12 },
/* 589 */ 				shadowBlur: 5,
/* 590 */ 				bodyBgColor: [255, 255, 255]	
/* 591 */ 			});
/* 592 */ 	},
/* 593 */ 	/*
/* 594 *| 
/* 595 *| 	Function: dynamicResize
/* 596 *| 		Use with a timer to resize a window as the window's content size changes, such as with an accordian.
/* 597 *| 
/* 598 *| 	*/
/* 599 */ 	dynamicResize: function(windowEl){
/* 600 */ 		var currentInstance = MochaUI.Windows.instances.get(windowEl.id);

/* Core.js */

/* 601 */ 		var contentWrapperEl = currentInstance.contentWrapperEl;
/* 602 */ 		var contentEl = currentInstance.contentEl;
/* 603 */ 		
/* 604 */ 		contentWrapperEl.setStyle('height', contentEl.offsetHeight);
/* 605 */ 		contentWrapperEl.setStyle('width', contentEl.offsetWidth);			
/* 606 */ 		currentInstance.drawWindow(windowEl);
/* 607 */ 	},	
/* 608 */ 	/*
/* 609 *| 
/* 610 *| 	Function: garbageCleanUp
/* 611 *| 		Empties all windows of their children, and removes and garbages the windows. It is does not trigger onClose() or onCloseComplete(). This is useful to clear memory before the pageUnload.
/* 612 *| 
/* 613 *| 	Syntax:
/* 614 *| 	(start code)
/* 615 *| 		MochaUI.garbageCleanUp();
/* 616 *| 	(end)
/* 617 *| 	
/* 618 *| 	*/
/* 619 */ 	garbageCleanUp: function(){
/* 620 */ 		$$('div.mocha').each(function(el){
/* 621 */ 			el.destroy();
/* 622 */ 		}.bind(this));
/* 623 */ 	},
/* 624 */ 	/*
/* 625 *| 	
/* 626 *| 	The underlay is inserted directly under windows when they are being dragged or resized
/* 627 *| 	so that the cursor is not captured by iframes or other plugins (such as Flash)
/* 628 *| 	underneath the window.
/* 629 *| 	
/* 630 *| 	*/
/* 631 */ 	underlayInitialize: function(){
/* 632 */ 		var windowUnderlay = new Element('div', {
/* 633 */ 			'id': 'windowUnderlay',
/* 634 */ 			'styles': {
/* 635 */ 				'height': parent.getCoordinates().height,
/* 636 */ 				'opacity': .01,
/* 637 */ 				'display': 'none'
/* 638 */ 			}
/* 639 */ 		}).inject(document.body);
/* 640 */ 	},
/* 641 */ 	setUnderlaySize: function(){
/* 642 */ 		if ($('windowUnderlay')) {
/* 643 */ 			$('windowUnderlay').setStyle('height', parent.getCoordinates().height);
/* 644 */ 		}
/* 645 */ 	}
/* 646 */ });
/* 647 */ 
/* 648 */ /* 
/* 649 *| 
/* 650 *| function: fixPNG

/* Core.js */

/* 651 *| 	Bob Osola's PngFix for IE6.
/* 652 *| 
/* 653 *| example:
/* 654 *| 	(begin code)
/* 655 *| 	<img src="xyz.png" alt="foo" width="10" height="20" onload="fixPNG(this)">
/* 656 *| 	(end)
/* 657 *| 
/* 658 *| note:
/* 659 *| 	You must have the image height and width attributes specified in the markup.
/* 660 *| 
/* 661 *| */
/* 662 */ 
/* 663 */ function fixPNG(myImage){
/* 664 */ 	if (Browser.Engine.trident4 && document.body.filters){
/* 665 */ 		var imgID = (myImage.id) ? "id='" + myImage.id + "' " : "";
/* 666 */ 		var imgClass = (myImage.className) ? "class='" + myImage.className + "' " : "";
/* 667 */ 		var imgTitle = (myImage.title) ? "title='" + myImage.title  + "' " : "title='" + myImage.alt + "' ";
/* 668 */ 		var imgStyle = "display:inline-block;" + myImage.style.cssText;
/* 669 */ 		var strNewHTML = "<span " + imgID + imgClass + imgTitle
/* 670 */ 			+ " style=\"" + "width:" + myImage.width
/* 671 */ 			+ "px; height:" + myImage.height
/* 672 */ 			+ "px;" + imgStyle + ";"
/* 673 */ 			+ "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
/* 674 */ 			+ "(src=\'" + myImage.src + "\', sizingMethod='scale');\"></span>";
/* 675 */ 		myImage.outerHTML = strNewHTML;		
/* 676 */ 	}
/* 677 */ }
/* 678 */ 
/* 679 */ // Toggle window visibility with Ctrl-Alt-Q
/* 680 */ document.addEvent('keydown', function(event){
/* 681 */ 	if (event.key == 'q' && event.control && event.alt) {
/* 682 */ 		MochaUI.toggleWindowVisibility();
/* 683 */ 	}
/* 684 */ });
/* 685 */ 
/* 686 */ // Blur all windows if user clicks anywhere else on the page
/* 687 */ document.addEvent('mousedown', function(event){
/* 688 */ 	MochaUI.blurAll.delay(50);
/* 689 */ });
/* 690 */ 
/* 691 */ document.addEvent('domready', function(){
/* 692 */ 	MochaUI.underlayInitialize();
/* 693 */ });
/* 694 */ 
/* 695 */ window.addEvent('resize', function(){
/* 696 */ 		MochaUI.setUnderlaySize();
/* 697 */ });
/* 698 */ 

;
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
/* 190  */ 	collapsible:       true,
/* 191  */ 	minimizable:       true,
/* 192  */ 	maximizable:       true,
/* 193  */ 	closable:          true,
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

;
/* Modal.js */

/* 1  */ /*
/* 2  *| 
/* 3  *| Script: Modal.js
/* 4  *| 	Create modal dialog windows.
/* 5  *| 
/* 6  *| Copyright:
/* 7  *| 	Copyright (c) 2007-2008 Greg Houston, <http://greghoustondesign.com/>.	
/* 8  *| 
/* 9  *| License:
/* 10 *| 	MIT-style license.	
/* 11 *| 
/* 12 *| Requires:
/* 13 *| 	Core.js, Window.js
/* 14 *| 
/* 15 *| See Also:
/* 16 *| 	<Window>	
/* 17 *| 	
/* 18 *| */
/* 19 */ 
/* 20 */ MochaUI.Modal = new Class({
/* 21 */ 
/* 22 */ 	Extends: MochaUI.Window,
/* 23 */ 
/* 24 */ 	Implements: [Events, Options],
/* 25 */ 
/* 26 */ 	initialize: function(options){
/* 27 */ 
/* 28 */ 		this.modalInitialize();
/* 29 */ 		
/* 30 */ 		window.addEvent('resize', function(){
/* 31 */ 			this.setModalSize();
/* 32 */ 		}.bind(this));
/* 33 */ 
/* 34 */ 	},
/* 35 */ 	modalInitialize: function(){
/* 36 */ 		var modalOverlay = new Element('div', {
/* 37 */ 			'id': 'modalOverlay',
/* 38 */ 			'styles': {
/* 39 */ 				'height': document.getCoordinates().height,
/* 40 */ 				'opacity': .6
/* 41 */ 			}
/* 42 */ 		}).inject(document.body);
/* 43 */ 		
/* 44 */ 		/*modalOverlay.addEvent('click', function(e){
/* 45 *| 			MochaUI.closeWindow(MochaUI.currentModal);
/* 46 *| 		});*/
/* 47 */ 		
/* 48 */ 		if (Browser.Engine.trident4){
/* 49 */ 			var modalFix = new Element('iframe', {
/* 50 */ 				'id': 'modalFix',

/* Modal.js */

/* 51 */ 				'scrolling': 'no',
/* 52 */ 				'marginWidth': 0,
/* 53 */ 				'marginHeight': 0,
/* 54 */ 				'src': '',
/* 55 */ 				'styles': {
/* 56 */ 					'height': document.getCoordinates().height
/* 57 */ 				}
/* 58 */ 			}).inject(document.body);
/* 59 */ 		}
/* 60 */ 
/* 61 */ 		this.modalOverlayOpenMorph = new Fx.Morph($('modalOverlay'), {
/* 62 */ 				'duration': 150
/* 63 */ 				});
/* 64 */ 		this.modalOverlayCloseMorph = new Fx.Morph($('modalOverlay'), {
/* 65 */ 			'duration': 150,
/* 66 */ 			onComplete: function(){
/* 67 */ 				$('modalOverlay').setStyle('display', 'none');
/* 68 */ 				if (Browser.Engine.trident4){
/* 69 */ 					$('modalFix').setStyle('display', 'none');
/* 70 */ 				}
/* 71 */ 			}.bind(this)
/* 72 */ 		});
/* 73 */ 	},
/* 74 */ 	setModalSize: function(){
/* 75 */ 		$('modalOverlay').setStyle('height', document.getCoordinates().height);
/* 76 */ 		if (Browser.Engine.trident4){
/* 77 */ 			$('modalFix').setStyle('height', document.getCoordinates().height);
/* 78 */ 		}
/* 79 */ 	}
/* 80 */ });
/* 81 */ MochaUI.Modal.implement(new Options, new Events);
/* 82 */ 

;
/* Windows-from-html.js */

/* 1  */ /*
/* 2  *| 
/* 3  *| Script: Windows-from-html.js
/* 4  *| 	Create windows from html markup in page.
/* 5  *| 
/* 6  *| Copyright:
/* 7  *| 	Copyright (c) 2007-2008 Greg Houston, <http://greghoustondesign.com/>.	
/* 8  *| 
/* 9  *| License:
/* 10 *| 	MIT-style license.	
/* 11 *| 
/* 12 *| Requires:
/* 13 *| 	Core.js, Window.js
/* 14 *| 
/* 15 *| Example:
/* 16 *| 	HTML markup.
/* 17 *| 	(start code)
/* 18 *| <div class="mocha" id="mywindow" style="width:300px;height:255px;top:50px;left:350px">
/* 19 *| 	<h3 class="mochaTitle">My Window</h3>
/* 20 *| 	<p>My Window Content</p>
/* 21 *| </div>	
/* 22 *| 	(end)
/* 23 *| 
/* 24 *| See Also:
/* 25 *| 	<Window>
/* 26 *| 
/* 27 *| */
/* 28 */ 
/* 29 */ MochaUI.extend({
/* 30 */ 	NewWindowsFromHTML: function(){
/* 31 */ 		$$('div.mocha').each(function(el) {
/* 32 */ 			// Get the window title and destroy that element, so it does not end up in window content
/* 33 */ 			if ( Browser.Engine.presto || Browser.Engine.trident5 ){
/* 34 */ 				el.setStyle('display','block'); // Required by Opera, and probably IE7
/* 35 */ 			}
/* 36 */ 			var title = el.getElement('h3.mochaTitle');
/* 37 */ 			var elDimensions = el.getStyles('height', 'width');
/* 38 */ 			var properties = {
/* 39 */ 				id: el.getProperty('id'),
/* 40 */ 				height: elDimensions.height.toInt(),
/* 41 */ 				width: elDimensions.width.toInt(),
/* 42 */ 				x: el.getStyle('left').toInt(),
/* 43 */ 				y: el.getStyle('top').toInt()
/* 44 */ 			};
/* 45 */ 			// If there is a title element, set title and destroy the element so it does not end up in window content
/* 46 */ 			if ( title ) {
/* 47 */ 				properties.title = title.innerHTML;
/* 48 */ 				title.destroy();
/* 49 */ 			}
/* 50 */ 		

/* Windows-from-html.js */

/* 51 */ 			// Get content and destroy the element
/* 52 */ 			properties.content = el.innerHTML;
/* 53 */ 			el.destroy();
/* 54 */ 			
/* 55 */ 			// Create window
/* 56 */ 			new MochaUI.Window(properties, true);
/* 57 */ 		}.bind(this));
/* 58 */ 	}
/* 59 */ });
/* 60 */ 

;
/* Arrange-cascade.js */

/* 1  */ /*
/* 2  *| 
/* 3  *| Script: Arrange-cascade.js
/* 4  *| 	Cascade windows.
/* 5  *| 
/* 6  *| Copyright:
/* 7  *| 	Copyright (c) 2007-2008 Greg Houston, <http://greghoustondesign.com/>.	
/* 8  *| 
/* 9  *| License:
/* 10 *| 	MIT-style license.	
/* 11 *| 
/* 12 *| Requires:
/* 13 *| 	Core.js, Window.js
/* 14 *| 
/* 15 *| Syntax:
/* 16 *| 	(start code)
/* 17 *| 	MochaUI.arrangeCascade();
/* 18 *| 	(end)
/* 19 *| 
/* 20 *| */
/* 21 */ 
/* 22 */ MochaUI.options.extend({
/* 23 */ 	viewportTopOffset:  30,    // Use a negative number if neccessary to place first window where you want it
/* 24 */ 	viewportLeftOffset: 20,
/* 25 */ 	windowTopOffset:    50,    // Initial vertical spacing of each window
/* 26 */ 	windowLeftOffset:   40     // Initial horizontal spacing of each window	
/* 27 */ });
/* 28 */ 
/* 29 */ MochaUI.extend({   
/* 30 */ 	arrangeCascade: function(){
/* 31 */ 		// See how much space we have to work with
/* 32 */ 		var coordinates = document.getCoordinates();
/* 33 */ 		
/* 34 */ 		var openWindows = 0;
/* 35 */ 		MochaUI.Windows.instances.each(function(instance){
/* 36 */ 			if (!instance.isMinimized) openWindows ++; 
/* 37 */ 		});
/* 38 */ 		
/* 39 */ 		if ((this.options.windowTopOffset * (openWindows + 1)) >= (coordinates.height - this.options.viewportTopOffset)) {
/* 40 */ 			var topOffset = (coordinates.height - this.options.viewportTopOffset) / (openWindows + 1);
/* 41 */ 		}
/* 42 */ 		else {
/* 43 */ 			var topOffset = this.options.windowTopOffset;
/* 44 */ 		}
/* 45 */ 		
/* 46 */ 		if ((this.options.windowLeftOffset * (openWindows + 1)) >= (coordinates.width - this.options.viewportLeftOffset - 20)) {
/* 47 */ 			var leftOffset = (coordinates.width - this.options.viewportLeftOffset - 20) / (openWindows + 1);
/* 48 */ 		}
/* 49 */ 		else {
/* 50 */ 			var leftOffset = this.options.windowLeftOffset;

/* Arrange-cascade.js */

/* 51 */ 		}
/* 52 */ 
/* 53 */ 		var x = this.options.viewportLeftOffset;
/* 54 */ 		var y = this.options.viewportTopOffset;
/* 55 */ 		$$('div.mocha').each(function(windowEl){
/* 56 */ 			var currentWindowClass = MochaUI.Windows.instances.get(windowEl.id);
/* 57 */ 			if (!currentWindowClass.isMinimized && !currentWindowClass.isMaximized){
/* 58 */ 				id = windowEl.id;
/* 59 */ 				MochaUI.focusWindow(windowEl);
/* 60 */ 				x += leftOffset;
/* 61 */ 				y += topOffset;
/* 62 */ 
/* 63 */ 				if (MochaUI.options.useEffects == false){
/* 64 */ 					windowEl.setStyles({
/* 65 */ 						'top': y,
/* 66 */ 						'left': x
/* 67 */ 					});
/* 68 */ 				}
/* 69 */ 				else {
/* 70 */ 					var cascadeMorph = new Fx.Morph(windowEl, {
/* 71 */ 						'duration': 550
/* 72 */ 					});
/* 73 */ 					cascadeMorph.start({
/* 74 */ 						'top': y,
/* 75 */ 						'left': x
/* 76 */ 					});
/* 77 */ 				}
/* 78 */ 			}
/* 79 */ 		}.bind(this));
/* 80 */ 	}
/* 81 */ });
/* 82 */ 

;
/* Arrange-tile.js */

/* 1  */ /*
/* 2  *| 
/* 3  *| Script: Arrange-tile.js
/* 4  *| 	Cascade windows.
/* 5  *| 
/* 6  *| Authors:
/* 7  *| 	Harry Roberts and Greg Houston
/* 8  *| 
/* 9  *| License:
/* 10 *| 	MIT-style license.	
/* 11 *| 
/* 12 *| Requires:
/* 13 *| 	Core.js, Window.js
/* 14 *| 
/* 15 *| Syntax:
/* 16 *| 	(start code)
/* 17 *| 	MochaUI.arrangeTile();
/* 18 *| 	(end)
/* 19 *| 
/* 20 *| */
/* 21 */  
/* 22 */ MochaUI.extend({
/* 23 */ 	arrangeTile: function(){
/* 24 */ 		var x = 10;
/* 25 */ 		var y = 10;
/* 26 */ 	
/* 27 */ 		var instances =  MochaUI.Windows.instances;
/* 28 */ 
/* 29 */ 		var windowsNum = 0;
/* 30 */ 
/* 31 */ 		instances.each(function(instance){
/* 32 */ 			if (!instance.isMinimized && !instance.isMaximized){
/* 33 */ 				windowsNum++;
/* 34 */ 			}
/* 35 */ 		});
/* 36 */ 
/* 37 */ 		var cols = 3;
/* 38 */ 		var rows = Math.ceil(windowsNum / cols);
/* 39 */ 		
/* 40 */ 		var coordinates = document.getCoordinates();
/* 41 */ 	
/* 42 */ 		var col_width = ((coordinates.width - this.options.viewportLeftOffset) / cols);
/* 43 */ 		var col_height = ((coordinates.height - this.options.viewportTopOffset) / rows);
/* 44 */ 		
/* 45 */ 		var row = 0;
/* 46 */ 		var col = 0;
/* 47 */ 		
/* 48 */ 		instances.each(function(instance){
/* 49 */ 			if (!instance.isMinimized && !instance.isMaximized){
/* 50 */ 				

/* Arrange-tile.js */

/* 51 */ 				var content = instance.contentWrapperEl;
/* 52 */ 				var content_coords = content.getCoordinates();
/* 53 */ 				var window_coords = instance.windowEl.getCoordinates();
/* 54 */ 				
/* 55 */ 				// Calculate the amount of padding around the content window
/* 56 */ 				var padding_top = content_coords.top - window_coords.top;
/* 57 */ 				var padding_bottom = window_coords.height - content_coords.height - padding_top;
/* 58 */ 				var padding_left = content_coords.left - window_coords.left;
/* 59 */ 				var padding_right = window_coords.width - content_coords.width - padding_left;
/* 60 */ 
/* 61 */ 				/*
/* 62 *| 
/* 63 *| 				// This resizes the windows
/* 64 *| 				if (instance.options.shape != 'gauge' && instance.options.resizable == true){
/* 65 *| 					var width = (col_width - 3 - padding_left - padding_right);
/* 66 *| 					var height = (col_height - 3 - padding_top - padding_bottom);
/* 67 *| 
/* 68 *| 					if (width > instance.options.resizeLimit.x[0] && width < instance.options.resizeLimit.x[1]){
/* 69 *| 						content.setStyle('width', width);
/* 70 *| 					}
/* 71 *| 					if (height > instance.options.resizeLimit.y[0] && height < instance.options.resizeLimit.y[1]){
/* 72 *| 						content.setStyle('height', height);
/* 73 *| 					}
/* 74 *| 
/* 75 *| 				}*/
/* 76 */ 
/* 77 */ 				var left = (x + (col * col_width));
/* 78 */ 				var top = (y + (row * col_height));
/* 79 */ 
/* 80 */ 				instance.windowEl.setStyles({
/* 81 */ 					'left': left,
/* 82 */ 					'top': top
/* 83 */ 				});
/* 84 */ 
/* 85 */ 				instance.drawWindow(instance.windowEl);
/* 86 */ 
/* 87 */ 				MochaUI.focusWindow(instance.windowEl);
/* 88 */ 
/* 89 */ 				if (++col === cols) {
/* 90 */ 					row++;
/* 91 */ 					col = 0;
/* 92 */ 				}
/* 93 */ 			}
/* 94 */ 		}.bind(this));
/* 95 */ 	}
/* 96 */ });

;
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

;
/* Dock.js */

/* 1   */ /*
/* 2   *| 
/* 3   *| Script: Dock.js
/* 4   *| 	Implements the dock/taskbar. Enables window minimize.
/* 5   *| 
/* 6   *| Copyright:
/* 7   *| 	Copyright (c) 2007-2008 Greg Houston, <http://greghoustondesign.com/>.	
/* 8   *| 
/* 9   *| License:
/* 10  *| 	MIT-style license.
/* 11  *| 
/* 12  *| Requires:
/* 13  *| 	Core.js, Window.js, Layout.js	
/* 14  *| 
/* 15  *| Todo:
/* 16  *| 	- Make it so the dock requires no initial html markup.
/* 17  *| 
/* 18  *| */
/* 19  */ 
/* 20  */ MochaUI.options.extend({
/* 21  */ 		// Naming options:
/* 22  */ 		// If you change the IDs of the Mocha Desktop containers in your HTML, you need to change them here as well.
/* 23  */ 		dockWrapper: 'dockWrapper',
/* 24  */ 		dock:        'dock'
/* 25  */ });
/* 26  */ 
/* 27  */ // Used by Desktop.js before MochaUI.Dock is initialized.
/* 28  */ window.addEvent('domready', function(){	
/* 29  */ 	if ($('dockWrapper')) {
/* 30  */ 		MochaUI.dockVisible = true;
/* 31  */ 	}
/* 32  */ });
/* 33  */ 
/* 34  */ MochaUI.extend({
/* 35  */ 	/*
/* 36  *| 
/* 37  *| 	Function: minimizeAll
/* 38  *| 		Minimize all windows that are minimizable.
/* 39  *| 
/* 40  *| 	*/	
/* 41  */ 	minimizeAll: function() {
/* 42  */ 		$$('div.mocha').each(function(windowEl){
/* 43  */ 		var currentInstance = MochaUI.Windows.instances.get(windowEl.id);
/* 44  */ 			if (!currentInstance.isMinimized && currentInstance.options.minimizable == true){
/* 45  */ 				MochaUI.Dock.minimizeWindow(windowEl);
/* 46  */ 			}
/* 47  */ 		}.bind(this));
/* 48  */ 	}
/* 49  */ });
/* 50  */ 

/* Dock.js */

/* 51  */ MochaUI.Dock = new Class({
/* 52  */ 	Extends: MochaUI.Window,
/* 53  */ 
/* 54  */ 	Implements: [Events, Options],
/* 55  */ 
/* 56  */ 	options: {
/* 57  */ 		useControls:          true,      // Toggles autohide and dock placement controls.
/* 58  */ 		dockPosition:         'top',     // Position the dock starts in, top or bottom.
/* 59  */ 		// Style options
/* 60  */ 		dockTabColor:         [255, 255, 255],
/* 61  */ 		trueButtonColor:      [70, 245, 70],     // Color for autohide on
/* 62  */ 		enabledButtonColor:   [125, 208, 250], 
/* 63  */ 		disabledButtonColor:  [170, 170, 170]
/* 64  */ 	},
/* 65  */ 	initialize: function(options){
/* 66  */ 		// Stops if MochaUI.Desktop is not implemented
/* 67  */ 		if (!MochaUI.Desktop) return;
/* 68  */ 		this.setOptions(options);
/* 69  */ 		
/* 70  */ 		this.dockWrapper   = $(MochaUI.options.dockWrapper);
/* 71  */ 		this.dock          = $(MochaUI.options.dock);
/* 72  */ 		this.autoHideEvent = null;		
/* 73  */ 		this.dockAutoHide  = false;  // True when dock autohide is set to on, false if set to off
/* 74  */ 
/* 75  */ 		if (!this.dockWrapper) return;
/* 76  */ 
/* 77  */ 		if (!this.options.useControls){
/* 78  */ 			if($('dockPlacement')){
/* 79  */ 				$('dockPlacement').setStyle('cursor', 'default');
/* 80  */ 			}
/* 81  */ 			if($('dockAutoHide')){
/* 82  */ 				$('dockAutoHide').setStyle('cursor', 'default');
/* 83  */ 			}
/* 84  */ 		}
/* 85  */ 
/* 86  */ 		this.dockWrapper.setStyles({
/* 87  */ 			'display':  'block',
/* 88  */ 			'position': 'absolute',
/* 89  */ 			'top':      null,
/* 90  */ 			'bottom':   MochaUI.Desktop.desktopFooter ? MochaUI.Desktop.desktopFooter.offsetHeight : 0,
/* 91  */ 			'left':     0
/* 92  */ 		});
/* 93  */ 		
/* 94  */ 		if (this.options.useControls){
/* 95  */ 			this.initializeDockControls();
/* 96  */ 		}
/* 97  */ 
/* 98  */ 		// Add check mark to menu if link exists in menu
/* 99  */ 		if ($('dockLinkCheck')){
/* 100 */ 			this.sidebarCheck = new Element('div', {

/* Dock.js */

/* 101 */ 				'class': 'check',
/* 102 */ 				'id': 'dock_check'
/* 103 */ 			}).inject($('dockLinkCheck'));
/* 104 */ 		}
/* 105 */ 
/* 106 */ 		this.dockSortables = new Sortables('#dockSort', {
/* 107 */ 			opacity: Browser.Engine.trident ? 1 : .5,
/* 108 */ 			constrain: true,
/* 109 */ 			clone: false,
/* 110 */ 			revert: false
/* 111 */ 		});
/* 112 */ 
/* 113 */ 		MochaUI.Desktop.setDesktopSize();
/* 114 */ 	},
/* 115 */ 	initializeDockControls: function(){
/* 116 */ 		
/* 117 */ 		if (this.options.useControls){
/* 118 */ 			// Insert canvas
/* 119 */ 			var canvas = new Element('canvas', {
/* 120 */ 				'id':     'dockCanvas',
/* 121 */ 				'width':  '15',
/* 122 */ 				'height': '18'
/* 123 */ 			}).inject(this.dock);
/* 124 */ 
/* 125 */ 			// Dynamically initialize canvas using excanvas. This is only required by IE
/* 126 */ 			if (Browser.Engine.trident && MochaUI.ieSupport == 'excanvas'){
/* 127 */ 				G_vmlCanvasManager.initElement(canvas);
/* 128 */ 			}
/* 129 */ 		}
/* 130 */ 		
/* 131 */ 		var dockPlacement = $('dockPlacement');
/* 132 */ 		var dockAutoHide = $('dockAutoHide');
/* 133 */ 
/* 134 */ 		// Position top or bottom selector
/* 135 */ 		dockPlacement.setProperty('title','Position Dock Top');
/* 136 */ 
/* 137 */ 		// Attach event
/* 138 */ 		dockPlacement.addEvent('click', function(){
/* 139 */ 			this.moveDock();
/* 140 */ 		}.bind(this));
/* 141 */ 
/* 142 */ 		// Auto Hide toggle switch
/* 143 */ 		dockAutoHide.setProperty('title','Turn Auto Hide On');
/* 144 */ 		
/* 145 */ 		// Attach event Auto Hide 
/* 146 */ 		dockAutoHide.addEvent('click', function(event){
/* 147 */ 			if ( this.dockWrapper.getProperty('dockPosition') == 'top' )
/* 148 */ 				return false;
/* 149 */ 
/* 150 */ 			var ctx = $('dockCanvas').getContext('2d');

/* Dock.js */

/* 151 */ 			this.dockAutoHide = !this.dockAutoHide;	// Toggle
/* 152 */ 			if (this.dockAutoHide){
/* 153 */ 				$('dockAutoHide').setProperty('title', 'Turn Auto Hide Off');
/* 154 */ 				//ctx.clearRect(0, 11, 100, 100);
/* 155 */ 				MochaUI.circle(ctx, 5 , 14, 3, this.options.trueButtonColor, 1.0);
/* 156 */ 
/* 157 */ 				// Define event
/* 158 */ 				this.autoHideEvent = function(event) {
/* 159 */ 					if (!this.dockAutoHide)
/* 160 */ 						return;
/* 161 */ 					if (!MochaUI.Desktop.desktopFooter) {
/* 162 */ 						var dockHotspotHeight = this.dockWrapper.offsetHeight;
/* 163 */ 						if (dockHotspotHeight < 25) dockHotspotHeight = 25;
/* 164 */ 					}
/* 165 */ 					else if (MochaUI.Desktop.desktopFooter) {
/* 166 */ 						var dockHotspotHeight = this.dockWrapper.offsetHeight + MochaUI.Desktop.desktopFooter.offsetHeight;
/* 167 */ 						if (dockHotspotHeight < 25) dockHotspotHeight = 25;
/* 168 */ 					}						
/* 169 */ 					if (!MochaUI.Desktop.desktopFooter && event.client.y > (document.getCoordinates().height - dockHotspotHeight)){
/* 170 */ 						if (!MochaUI.dockVisible){
/* 171 */ 							this.dockWrapper.setStyle('display', 'block');
/* 172 */ 							MochaUI.dockVisible = true;
/* 173 */ 							MochaUI.Desktop.setDesktopSize();
/* 174 */ 						}
/* 175 */ 					}
/* 176 */ 					else if (MochaUI.Desktop.desktopFooter && event.client.y > (document.getCoordinates().height - dockHotspotHeight)){
/* 177 */ 						if (!MochaUI.dockVisible){
/* 178 */ 							this.dockWrapper.setStyle('display', 'block');
/* 179 */ 							MochaUI.dockVisible = true;
/* 180 */ 							MochaUI.Desktop.setDesktopSize();
/* 181 */ 						}
/* 182 */ 					}
/* 183 */ 					else if (MochaUI.dockVisible){
/* 184 */ 						this.dockWrapper.setStyle('display', 'none');
/* 185 */ 						MochaUI.dockVisible = false;
/* 186 */ 						MochaUI.Desktop.setDesktopSize();
/* 187 */ 						
/* 188 */ 					}
/* 189 */ 				}.bind(this);
/* 190 */ 
/* 191 */ 				// Add event
/* 192 */ 				document.addEvent('mousemove', this.autoHideEvent);
/* 193 */ 
/* 194 */ 			} else {
/* 195 */ 				$('dockAutoHide').setProperty('title', 'Turn Auto Hide On');
/* 196 */ 				//ctx.clearRect(0, 11, 100, 100);
/* 197 */ 				MochaUI.circle(ctx, 5 , 14, 3, this.options.enabledButtonColor, 1.0);
/* 198 */ 				// Remove event
/* 199 */ 				document.removeEvent('mousemove', this.autoHideEvent);
/* 200 */ 			}

/* Dock.js */

/* 201 */ 
/* 202 */ 		}.bind(this));
/* 203 */ 
/* 204 */ 		// Draw dock controls
/* 205 */ 		var ctx = $('dockCanvas').getContext('2d');
/* 206 */ 		ctx.clearRect(0, 0, 100, 100);
/* 207 */ 		MochaUI.circle(ctx, 5 , 4, 3, this.options.enabledButtonColor, 1.0);
/* 208 */ 		MochaUI.circle(ctx, 5 , 14, 3, this.options.enabledButtonColor, 1.0);
/* 209 */ 		
/* 210 */ 		if (this.options.dockPosition == 'top'){
/* 211 */ 			this.moveDock();
/* 212 */ 		}
/* 213 */ 
/* 214 */ 	},
/* 215 */ 	moveDock: function(){
/* 216 */ 			var ctx = $('dockCanvas').getContext('2d');
/* 217 */ 			// Move dock to top position
/* 218 */ 			if (this.dockWrapper.getStyle('position') != 'relative'){
/* 219 */ 				this.dockWrapper.setStyles({
/* 220 */ 					'position': 'relative',
/* 221 */ 					'bottom':   null
/* 222 */ 				});
/* 223 */ 				this.dockWrapper.addClass('top');
/* 224 */ 				MochaUI.Desktop.setDesktopSize();
/* 225 */ 				this.dockWrapper.setProperty('dockPosition','top');
/* 226 */ 				ctx.clearRect(0, 0, 100, 100);
/* 227 */ 				MochaUI.circle(ctx, 5, 4, 3, this.options.enabledButtonColor, 1.0);
/* 228 */ 				MochaUI.circle(ctx, 5, 14, 3, this.options.disabledButtonColor, 1.0);
/* 229 */ 				$('dockPlacement').setProperty('title', 'Position Dock Bottom');
/* 230 */ 				$('dockAutoHide').setProperty('title', 'Auto Hide Disabled in Top Dock Position');
/* 231 */ 				this.dockAutoHide = false;
/* 232 */ 			}
/* 233 */ 			// Move dock to bottom position
/* 234 */ 			else {
/* 235 */ 				this.dockWrapper.setStyles({
/* 236 */ 					'position':      'absolute',
/* 237 */ 					'bottom':        MochaUI.Desktop.desktopFooter ? MochaUI.Desktop.desktopFooter.offsetHeight : 0
/* 238 */ 				});
/* 239 */ 				this.dockWrapper.removeClass('top');
/* 240 */ 				MochaUI.Desktop.setDesktopSize();
/* 241 */ 				this.dockWrapper.setProperty('dockPosition', 'bottom');
/* 242 */ 				ctx.clearRect(0, 0, 100, 100);
/* 243 */ 				MochaUI.circle(ctx, 5, 4, 3, this.options.enabledButtonColor, 1.0);
/* 244 */ 				MochaUI.circle(ctx, 5 , 14, 3, this.options.enabledButtonColor, 1.0);
/* 245 */ 				$('dockPlacement').setProperty('title', 'Position Dock Top');
/* 246 */ 				$('dockAutoHide').setProperty('title', 'Turn Auto Hide On');
/* 247 */ 			}
/* 248 */ 	},
/* 249 */ 	createDockTab: function(windowEl){
/* 250 */ 

/* Dock.js */

/* 251 */ 		var currentInstance = MochaUI.Windows.instances.get(windowEl.id);
/* 252 */ 
/* 253 */ 		var dockTab = new Element('div', {
/* 254 */ 			'id': currentInstance.options.id + '_dockTab',
/* 255 */ 			'class': 'dockTab',
/* 256 */ 			'title': titleText
/* 257 */ 		}).inject($('dockClear'), 'before');
/* 258 */ 		
/* 259 */ 		dockTab.addEvent('mousedown', function(e){
/* 260 */ 			new Event(e).stop();
/* 261 */ 			this.timeDown = $time();
/* 262 */ 		});
/* 263 */ 		
/* 264 */ 		dockTab.addEvent('mouseup', function(e){
/* 265 */ 			this.timeUp = $time();
/* 266 */ 			if ((this.timeUp - this.timeDown) < 275){
/* 267 */ 				// If the visibility of the windows on the page are toggled off, toggle visibility on.
/* 268 */ 				if (MochaUI.Windows.windowsVisible == false) {
/* 269 */ 					MochaUI.toggleWindowVisibility();
/* 270 */ 					if (currentInstance.isMinimized == true) {
/* 271 */ 						MochaUI.Dock.restoreMinimized.delay(25, MochaUI.Dock, windowEl);
/* 272 */ 					}
/* 273 */ 					else {
/* 274 */ 						MochaUI.focusWindow(windowEl);
/* 275 */ 					}
/* 276 */ 					return;
/* 277 */ 				}
/* 278 */ 				// If window is minimized, restore window.
/* 279 */ 				if (currentInstance.isMinimized == true) {
/* 280 */ 					MochaUI.Dock.restoreMinimized.delay(25, MochaUI.Dock, windowEl);
/* 281 */ 				}
/* 282 */ 				else{
/* 283 */ 					// If window is not minimized and is focused, minimize window.
/* 284 */ 					if (currentInstance.windowEl.hasClass('isFocused') && currentInstance.options.minimizable == true){
/* 285 */ 						MochaUI.Dock.minimizeWindow(windowEl)
/* 286 */ 					}
/* 287 */ 					// If window is not minimized and is not focused, focus window.	
/* 288 */ 					else{
/* 289 */ 						MochaUI.focusWindow(windowEl);
/* 290 */ 					}
/* 291 */ 					// if the window is not minimized and is outside the viewport, center it in the viewport.
/* 292 */ 					var coordinates = document.getCoordinates();
/* 293 */ 					if (windowEl.getStyle('left').toInt() > coordinates.width || windowEl.getStyle('top').toInt() > coordinates.height){
/* 294 */ 						MochaUI.centerWindow(windowEl);	
/* 295 */ 					}
/* 296 */ 				}
/* 297 */ 			}
/* 298 */ 		});
/* 299 */ 
/* 300 */ 		this.dockSortables.addItems(dockTab);

/* Dock.js */

/* 301 */ 
/* 302 */ 		var titleText = currentInstance.titleEl.innerHTML;
/* 303 */ 
/* 304 */ 		var dockTabText = new Element('div', {
/* 305 */ 			'id': currentInstance.options.id + '_dockTabText',
/* 306 */ 			'class': 'dockText'
/* 307 */ 		}).set('html', titleText.substring(0,20) + (titleText.length > 20 ? '...' : '')).inject($(dockTab));
/* 308 */ 
/* 309 */ 		// If I implement this again, will need to also adjust the titleText truncate and the tab's
/* 310 */ 		// left padding.
/* 311 */ 		if (currentInstance.options.icon != false){
/* 312 */ 			// dockTabText.setStyle('background', 'url(' + currentInstance.options.icon + ') 4px 4px no-repeat');
/* 313 */ 		}
/* 314 */ 		
/* 315 */ 		// Need to resize everything in case the dock wraps when a new tab is added
/* 316 */ 		MochaUI.Desktop.setDesktopSize();
/* 317 */ 
/* 318 */ 	},
/* 319 */ 	makeActiveTab: function(){
/* 320 */ 
/* 321 */ 		// getWindowWith HighestZindex is used in case the currently focused window
/* 322 */ 		// is closed.		
/* 323 */ 		var windowEl = MochaUI.getWindowWithHighestZindex();
/* 324 */ 		var currentInstance = MochaUI.Windows.instances.get(windowEl.id);
/* 325 */ 		
/* 326 */ 		$$('div.dockTab').removeClass('activeDockTab');
/* 327 */ 		if (currentInstance.isMinimized != true) {
/* 328 */ 			
/* 329 */ 			currentInstance.windowEl.addClass('isFocused');
/* 330 */ 
/* 331 */ 			var currentButton = $(currentInstance.options.id + '_dockTab');
/* 332 */ 			if (currentButton != null) {
/* 333 */ 				currentButton.addClass('activeDockTab');
/* 334 */ 			}
/* 335 */ 		}
/* 336 */ 		else {
/* 337 */ 			currentInstance.windowEl.removeClass('isFocused');
/* 338 */ 		}	
/* 339 */ 	},	
/* 340 */ 	minimizeWindow: function(windowEl){
/* 341 */ 		if (windowEl != $(windowEl)) return;
/* 342 */ 		
/* 343 */ 		var currentInstance = MochaUI.Windows.instances.get(windowEl.id);
/* 344 */ 		currentInstance.isMinimized = true;
/* 345 */ 
/* 346 */ 		// Hide iframe
/* 347 */ 		// Iframe should be hidden when minimizing, maximizing, and moving for performance and Flash issues
/* 348 */ 		if ( currentInstance.iframeEl ) {
/* 349 */ 			currentInstance.iframeEl.setStyle('visibility', 'hidden');
/* 350 */ 		}

/* Dock.js */

/* 351 */ 
/* 352 */ 		// Hide window and add to dock	
/* 353 */ 		currentInstance.contentBorderEl.setStyle('visibility', 'hidden');
/* 354 */ 		if(currentInstance.toolbarWrapperEl){		
/* 355 */ 			currentInstance.toolbarWrapperEl.setStyle('visibility', 'hidden');
/* 356 */ 		}
/* 357 */ 		windowEl.setStyle('visibility', 'hidden');
/* 358 */ 
/* 359 */ 		 // Fixes a scrollbar issue in Mac FF2
/* 360 */ 		if (Browser.Platform.mac && Browser.Engine.gecko){
/* 361 */ 			if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
/* 362 */ 				var ffversion = new Number(RegExp.$1);
/* 363 */ 				if (ffversion < 3) {
/* 364 */ 					currentInstance.contentWrapperEl.setStyle('overflow', 'hidden');
/* 365 */ 				}
/* 366 */ 			}
/* 367 */ 		}
/* 368 */ 	
/* 369 */ 		MochaUI.Desktop.setDesktopSize();
/* 370 */ 
/* 371 */ 		// Have to use timeout because window gets focused when you click on the minimize button
/* 372 */ 		setTimeout(function(){
/* 373 */ 			windowEl.setStyle('zIndex', 1);
/* 374 */ 			windowEl.removeClass('isFocused');
/* 375 */ 			this.makeActiveTab();	
/* 376 */ 		}.bind(this),100);	
/* 377 */ 
/* 378 */ 		currentInstance.fireEvent('onMinimize', windowEl);
/* 379 */ 	},
/* 380 */ 	restoreMinimized: function(windowEl) {
/* 381 */ 
/* 382 */ 		var currentInstance = MochaUI.Windows.instances.get(windowEl.id);
/* 383 */ 
/* 384 */ 		if (currentInstance.isMinimized == false) return;
/* 385 */ 
/* 386 */ 		if (MochaUI.Windows.windowsVisible == false){
/* 387 */ 			MochaUI.toggleWindowVisibility();
/* 388 */ 		}
/* 389 */ 
/* 390 */ 		MochaUI.Desktop.setDesktopSize();
/* 391 */ 
/* 392 */ 		 // Part of Mac FF2 scrollbar fix
/* 393 */ 		if (currentInstance.options.scrollbars == true && !currentInstance.iframeEl){ 
/* 394 */ 			currentInstance.contentWrapperEl.setStyle('overflow', 'auto');
/* 395 */ 		}
/* 396 */ 
/* 397 */ 		if (currentInstance.isCollapsed) {
/* 398 */ 			MochaUI.collapseToggle(windowEl);
/* 399 */ 		}
/* 400 */ 

/* Dock.js */

/* 401 */ 		windowEl.setStyle('visibility', 'visible');
/* 402 */ 		currentInstance.contentBorderEl.setStyle('visibility', 'visible');
/* 403 */ 		if(currentInstance.toolbarWrapperEl){
/* 404 */ 			currentInstance.toolbarWrapperEl.setStyle('visibility', 'visible');
/* 405 */ 		}
/* 406 */ 
/* 407 */ 		// Show iframe
/* 408 */ 		if ( currentInstance.iframeEl ) {
/* 409 */ 			currentInstance.iframeEl.setStyle('visibility', 'visible');
/* 410 */ 		}
/* 411 */ 
/* 412 */ 		currentInstance.isMinimized = false;
/* 413 */ 		MochaUI.focusWindow(windowEl);
/* 414 */ 		currentInstance.fireEvent('onRestore', windowEl);
/* 415 */ 
/* 416 */ 	}
/* 417 */ });
/* 418 */ MochaUI.Dock.implement(new Options, new Events);
/* 419 */ 

;
/* Workspaces.js */

/* 1   */ /*
/* 2   *| 
/* 3   *| Script: Workspaces.js
/* 4   *| 	Save and load workspaces. The Workspaces emulate Adobe Illustrator functionality remembering what windows are open and where they are positioned. There will be two versions, a limited version that saves state to a cookie, and a fully functional version that saves state to a database.
/* 5   *| 
/* 6   *| Copyright:
/* 7   *| 	Copyright (c) 2007-2008 Greg Houston, <http://greghoustondesign.com/>.
/* 8   *| 
/* 9   *| License:
/* 10  *| 	MIT-style license.
/* 11  *| 
/* 12  *| Requires:
/* 13  *| 	Core.js, Window.js
/* 14  *| 
/* 15  *| To do:
/* 16  *| 	- Move to Window
/* 17  *| 
/* 18  *| */
/* 19  */ 
/* 20  */ MochaUI.extend({			   
/* 21  */ 	/*
/* 22  *| 	
/* 23  *| 	Function: saveWorkspace
/* 24  *| 		Save the current workspace.
/* 25  *| 	
/* 26  *| 	Syntax:
/* 27  *| 	(start code)
/* 28  *| 		MochaUI.saveWorkspace();
/* 29  *| 	(end)
/* 30  *| 	
/* 31  *| 	Notes:
/* 32  *| 		This is experimental. This version saves the ID of each open window to a cookie, and reloads those windows using the functions in mocha-init.js. This requires that each window have a function in mocha-init.js used to open them. Functions must be named the windowID + "Window". So if your window is called mywindow, it needs a function called mywindowWindow in mocha-init.js.
/* 33  *| 	
/* 34  *| 	*/
/* 35  */ 	saveWorkspace: function(){
/* 36  */ 		this.cookie = new Hash.Cookie('mochaUIworkspaceCookie', {duration: 3600});
/* 37  */ 		this.cookie.empty();
/* 38  */ 		MochaUI.Windows.instances.each(function(instance) {
/* 39  */ 			instance.saveValues();
/* 40  */ 			this.cookie.set(instance.options.id, {
/* 41  */ 				'id': instance.options.id,
/* 42  */ 				'top': instance.options.y,
/* 43  */ 				'left': instance.options.x
/* 44  */ 			});
/* 45  */ 		}.bind(this));
/* 46  */ 		this.cookie.save();
/* 47  */ 
/* 48  */ 		new MochaUI.Window({
/* 49  */ 			loadMethod: 'html',
/* 50  */ 			type: 'notification',

/* Workspaces.js */

/* 51  */ 			addClass: 'notification',
/* 52  */ 			content: 'Workspace saved.',
/* 53  */ 			closeAfter: '1400',
/* 54  */ 			width: 200,
/* 55  */ 			height: 40,
/* 56  */ 			y: 53,
/* 57  */ 			padding:  { top: 10, right: 12, bottom: 10, left: 12 },
/* 58  */ 			shadowBlur: 5,
/* 59  */ 			bodyBgColor: [255, 255, 255]
/* 60  */ 		});
/* 61  */ 		
/* 62  */ 	},
/* 63  */ 	windowUnload: function(){
/* 64  */ 		if ($$('div.mocha').length == 0 && this.myChain){
/* 65  */ 			this.myChain.callChain();
/* 66  */ 		}		
/* 67  */ 	},
/* 68  */ 	loadWorkspace2: function(workspaceWindows){		
/* 69  */ 		workspaceWindows.each(function(instance){
/* 70  */ 			windowFunction = eval('MochaUI.' + instance.id + 'Window');
/* 71  */ 			if (windowFunction){
/* 72  */ 				eval('MochaUI.' + instance.id + 'Window();');
/* 73  */ 				$(instance.id).setStyles({
/* 74  */ 					top: instance.top,
/* 75  */ 					left: instance.left
/* 76  */ 				});
/* 77  */ 			}
/* 78  */ 		}.bind(this));
/* 79  */ 		this.loadingWorkspace = false;
/* 80  */ 	},
/* 81  */ 	/*
/* 82  *| 
/* 83  *| 	Function: loadWorkspace
/* 84  *| 		Load the saved workspace.
/* 85  *| 
/* 86  *| 	Syntax:
/* 87  *| 	(start code)
/* 88  *| 		MochaUI.loadWorkspace();
/* 89  *| 	(end)
/* 90  *| 
/* 91  *| 	*/
/* 92  */ 	loadWorkspace: function(){
/* 93  */ 		cookie = new Hash.Cookie('mochaUIworkspaceCookie', {duration: 3600});
/* 94  */ 		workspaceWindows = cookie.load();
/* 95  */ 
/* 96  */ 		if(!cookie.getKeys().length){
/* 97  */ 			new MochaUI.Window({
/* 98  */ 				loadMethod: 'html',
/* 99  */ 				type: 'notification',
/* 100 */ 				addClass: 'notification',

/* Workspaces.js */

/* 101 */ 				content: 'You have no saved workspace.',
/* 102 */ 				closeAfter: '1400',
/* 103 */ 				width: 220,
/* 104 */ 				height: 40,
/* 105 */ 				y: 25,
/* 106 */ 				padding:  { top: 10, right: 12, bottom: 10, left: 12 },
/* 107 */ 				shadowBlur: 5,
/* 108 */ 				bodyBgColor: [255, 255, 255]
/* 109 */ 			});
/* 110 */ 			return;
/* 111 */ 		}
/* 112 */ 
/* 113 */ 		if ($$('div.mocha').length != 0){
/* 114 */ 			this.loadingWorkspace = true;
/* 115 */ 			this.myChain = new Chain();
/* 116 */ 			this.myChain.chain(
/* 117 */ 				function(){
/* 118 */ 					$$('div.mocha').each(function(el) {
/* 119 */ 						this.closeWindow(el);
/* 120 */ 					}.bind(this));
/* 121 */ 				}.bind(this),
/* 122 */ 				function(){
/* 123 */ 					this.loadWorkspace2(workspaceWindows);
/* 124 */ 				}.bind(this)
/* 125 */ 			);
/* 126 */ 			this.myChain.callChain();
/* 127 */ 		}
/* 128 */ 		else {
/* 129 */ 			this.loadWorkspace2(workspaceWindows);
/* 130 */ 		}
/* 131 */ 
/* 132 */ 	}
/* 133 */ });
/* 134 */ 

;
/* mocha-ext.js */

/* 1  */ /* Extendendo o Mocha ******************************/
/* 2  */ MochaUI.extend({ 
/* 3  */ 	/*Function: closeColumn Destroys/removes a column.
/* 4  *| 	Syntax: (start code) MochaUI.closeColumn(); (end)
/* 5  *| 	Arguments: columnEl - the ID of the column to be closed
/* 6  *| 	Returns: true - the column was closed false - the column was not closed*/ 
/* 7  */ 	closeColumn: function(columnEl){ /* Not implemented fully yet */ var instances = MochaUI.Columns.instances; var currentInstance = instances.get(columnEl.id); if (columnEl != $(columnEl) || currentInstance.isClosing) return; currentInstance.isClosing = true;
/* 8  */ 	// Destroy all the panels in the column. var panels = columnEl.getChildren('.panel'); panels.each(function(panel){ MochaUI.closePanel($(panel.id)); }.bind(this));
/* 9  */ 	if (Browser.Engine.trident) { columnEl.dispose(); if (currentInstance.handleEl != null) { currentInstance.handleEl.dispose(); } } else { columnEl.destroy(); if (currentInstance.handleEl != null) { currentInstance.handleEl.destroy(); } } if (MochaUI.Desktop) { MochaUI.Desktop.resizePanels(); } instances.erase(currentInstance.options.id); return true; }, 
/* 10 */ 	
/* 11 */ 	/*Function: closePanel Destroys/removes a panel.
/* 12 *| 	Syntax: (start code) MochaUI.closePanel(); (end)
/* 13 *| 	Arguments: panelEl - the ID of the panel to be closed
/* 14 *| 	Returns: true - the panel was closed false - the panel was not closed*/ 
/* 15 */ 	closePanel: function(panelEl){ var instances = MochaUI.Panels.instances; var currentInstance = instances.get(panelEl.id); if (panelEl != $(panelEl) || currentInstance.isClosing) return; currentInstance.isClosing = true;
/* 16 */ 	if (Browser.Engine.trident) { currentInstance.panelHeaderEl.dispose(); panelEl.dispose(); if (currentInstance.handleEl != null) { currentInstance.handleEl.dispose(); } } else { currentInstance.panelHeaderEl.destroy(); panelEl.destroy(); if (currentInstance.handleEl != null) { currentInstance.handleEl.destroy(); } } if (MochaUI.Desktop) { MochaUI.Desktop.resizePanels(); } instances.erase(currentInstance.options.id); return true; },
/* 17 */ 	
/* 18 */ 	/*Recupera o ID da janela a partir de um iFrame*/
/* 19 */ 	getFrameWindowId: function(){ return (window.frameElement) ? window.frameElement.id.split("_iframe")[0] : null;},
/* 20 */ 	
/* 21 */ 	/*Permite alterar o tamanho a janela*/
/* 22 */ 	resizeWindow: function (windowEl,windowWidth, windowHeight) {var currentInstance = MochaUI.Windows.instances.get(windowEl.id);var contentWrapperEl = currentInstance.contentWrapperEl;var contentEl = currentInstance.contentEl;if (!windowWidth){windowWidth = contentEl.offsetWidth;}if (!windowHeight){windowHeight = contentEl.offsetHeight;}contentWrapperEl.setStyle('height', windowHeight);contentWrapperEl.setStyle('width', windowWidth);currentInstance.drawWindow(windowEl);MochaUI.centerWindow(windowEl);},
/* 23 */ 
/* 24 */ 	/*Altera titulo da janela*/
/* 25 */ 	changeWindowTitle:function (newTitle) { var idTitle = this.getFrameWindowId()+'_title'; parent.$$('[id="'+idTitle+'"]').set("text",newTitle); }
/* 26 */ }); 
/* 27 */ 
/* 28 */ 

;
/* base.js */

/* 1   */ /** 
/* 2   *|  * @author Bruno
/* 3   *|  */
/* 4   */ /* Funcoes de padronização ******************************/
/* 5   */ //Janela
/* 6   */ MochaUI.openWindow = function(opt){
/* 7   */ 	//cria uma nova janela
/* 8   */ 	var windowDimensions 	= document.getCoordinates();
/* 9   */ 	var cor					= $$('#applicationColor').get('rel');
/* 10  */ 	var cor_cabecalho		= cor != null ? eval(cor[0]) : [68, 68, 68];
/* 11  */ 	new MochaUI.Window($extend({
/* 12  */ 		loadMethod: 		'iframe',
/* 13  */ 		width: 				1000,
/* 14  */ 		height: 			587,
/* 15  */ 		x: 					null,
/* 16  */ 		y: 					null,
/* 17  */ 		resizable: 			false,
/* 18  */ 		minimizable: 		true,
/* 19  */ 		maximizable: 		true,
/* 20  */ 		scrollbars:			true,
/* 21  */ 		cornerRadius: 		1,
/* 22  */ 		shadowBlur: 		3,
/* 23  */ 		shadowOffset:		{'x': 0, 'y': 1},
/* 24  */ 		footerHeight:		0,
/* 25  */ 		headerHeight:		30,
/* 26  */ 		headerStartColor:	cor_cabecalho,
/* 27  */ 		headerStopColor:	cor_cabecalho,
/* 28  */ 		resizableColor:		cor_cabecalho,
/* 29  */ 		controlsOffset:		{'right': 10, 'top': 8},
/* 30  */ 		closeColor:			[255, 255, 255],
/* 31  */ 		closeBgColor: 		cor_cabecalho,
/* 32  */ 		minimizeBgColor:   	cor_cabecalho,
/* 33  */ 		minimizeColor:     	[255, 255, 255],
/* 34  */ 		maximizeBgColor:   	cor_cabecalho,
/* 35  */ 		maximizeColor:     	[255, 255, 255],
/* 36  */ 		onDuplicated: 		function(){ MochaUI.notify("Janela já se encontra em uso"); }
/* 37  */ 	}, opt));
/* 38  */ };
/* 39  */ 
/* 40  */ MochaUI.newWindow = function(el){
/* 41  */ 	var me = $(el);
/* 42  */ 	var title = (me.get('window_title')) ? me.get('window_title') : (me.get('text')) ? me.get('text') : me.get('title'); 
/* 43  */ 	var opts = {
/* 44  */ 			id: me.href,
/* 45  */ 			title: title,
/* 46  */ 			contentURL: me.href
/* 47  */ 		};
/* 48  */ 	MochaUI.openWindow(opts);
/* 49  */ };
/* 50  */ 

/* base.js */

/* 51  */ //Modal
/* 52  */ MochaUI.openModal = function(opt){
/* 53  */ 	var windowDimensions = document.getCoordinates();
/* 54  */ 	MochaUI.openWindow($extend({
/* 55  */ 			type: 'modal',
/* 56  */ 			width: 760,
/* 57  */ 			height: windowDimensions.height-60,
/* 58  */ 			padding: 30,
/* 59  */ 			x: null,
/* 60  */ 			y: null
/* 61  */ 		}, opt));
/* 62  */ };
/* 63  */ 
/* 64  */ MochaUI.newModal = function(el){
/* 65  */ 	var me = $(el);
/* 66  */ 	var title = (me.get('window_title')) ? me.get('window_title') : (me.get('text')) ? me.get('text') : me.get('title');
/* 67  */ 	var opts = {
/* 68  */ 			id: me.href,
/* 69  */ 			title: title,
/* 70  */ 			contentURL: me.href
/* 71  */ 		};
/* 72  */ 	if(me.get("window_width")){
/* 73  */ 		opts.width = parseInt(me.get("window_width"));
/* 74  */ 	}
/* 75  */ 	MochaUI.openModal(opts);
/* 76  */ };
/* 77  */ 
/* 78  */ MochaUI.newModal2 = function(el){
/* 79  */ 	var me = $(el);
/* 80  */ 	var title = (me.get('window_title')) ? me.get('window_title') : (me.get('text')) ? me.get('text') : me.get('title');
/* 81  */ 	var opts = {
/* 82  */ 			id: 				me.href,
/* 83  */ 			title: 				title,
/* 84  */ 			contentURL: 		me.href,
/* 85  */ 			headerHeight:		30,
/* 86  */ 			headerStartColor:	[255,255,255],
/* 87  */ 			headerStopColor:	[255,255,255],
/* 88  */ 			closeColor:			[55, 55, 55],
/* 89  */ 			closeBgColor: 		[255,255,255],
/* 90  */ 			addClass:			"modal2",
/* 91  */ 			shadowBlur:			0,
/* 92  */ 			shadowOffset:		{'x': 0, 'y': 0}
/* 93  */ 	};
/* 94  */ 	MochaUI.openModal(opts);
/* 95  */ };
/* 96  */ 
/* 97  */ //Abrir uma pagina em um Painel
/* 98  */ MochaUI.loadPage = function(opt){
/* 99  */ 	var def = {
/* 100 */ 		element: $('mainPanel'),

/* base.js */

/* 101 */ 		loadMethod: 'iframe'
/* 102 */ 		};
/* 103 */ 	MochaUI.updateContent($extend(def,opt));
/* 104 */ 	$(def.element).setStyle('background', '#fff');
/* 105 */ };
/* 106 */ 
/* 107 */ MochaUI.load = function(el){
/* 108 */ 	var me = $(el);
/* 109 */ 	var tmp = me.clone();
/* 110 */ 	var img = tmp.getElement('img');
/* 111 */ 	var text = tmp.getElements('span.label');
/* 112 */ 	if(img!=null){
/* 113 */ 		img.set('style','width:22px; height:22px; margin-right: 7px;');
/* 114 */ 	}
/* 115 */ 	if(text!=null){
/* 116 */ 		text.set('style','display:block; float:right;');
/* 117 */ 	}
/* 118 */ 	MochaUI.loadPage({
/* 119 */ 		title: tmp.get('html'),
/* 120 */ 		url: me.href
/* 121 */ 	});
/* 122 */ };
/* 123 */ 
/* 124 */ //Notificação
/* 125 */ MochaUI.openNotification = function(opt){
/* 126 */ 	if(!opt.container) opt.container='desktop';
/* 127 */ 	new MochaUI.Window($extend({
/* 128 */ 			closeAfter: 		5000,
/* 129 */ 			type: 				'notification',
/* 130 */ 			width: 				600,
/* 131 */ 			height: 			50,
/* 132 */ 			y: 					-6,
/* 133 */ 			padding:  			{ top: 16, right: 1, bottom: 1, left: 65 },
/* 134 */ 			cornerRadius: 		0,
/* 135 */ 			shape: 				'gauge',
/* 136 */ 			footerHeight: 		0,
/* 137 */ 			headerHeight: 		0,
/* 138 */ 			shadowBlur: 		2,
/* 139 */ 			shadowOffset:		{'x': 0, 'y': 1},
/* 140 */ 			useCanvas: 			false
/* 141 */ 		}, opt));
/* 142 */ };
/* 143 */ 
/* 144 */ //Notificação - simples
/* 145 */ MochaUI.notify = function(message){
/* 146 */ 	new MochaUI.openNotification({
/* 147 */ 		content: message,
/* 148 */ 		addClass: 'notice'
/* 149 */ 	});
/* 150 */ };

/* base.js */

/* 151 */ 
/* 152 */ //Notificação - sucesso
/* 153 */ MochaUI.success = function(message, container){
/* 154 */ 	new MochaUI.openNotification({
/* 155 */ 		content: message,
/* 156 */ 		container: container,
/* 157 */ 		addClass: 'success'
/* 158 */ 	});
/* 159 */ };
/* 160 */ 
/* 161 */ 
/* 162 */ //Notificação - Info
/* 163 */ MochaUI.information = function(message, container){
/* 164 */ 	var dimensions = window.getSize();
/* 165 */ 	new MochaUI.openNotification({
/* 166 */ 		content: message,
/* 167 */ 		container: container,
/* 168 */ 		height: null,
/* 169 */ 		closeAfter: false,
/* 170 */ 		y: 1,
/* 171 */ 		x: 1,
/* 172 */ 		padding:  { top: 5, right: 5, bottom: 5, left: 5 },
/* 173 */ 		shadowBlur: 0,
/* 174 */ 		addClass: 'information'
/* 175 */ 		
/* 176 */ 	});
/* 177 */ };
/* 178 */ 
/* 179 */ window.addEvent('load', function(){
/* 180 */ 	$$("#loader").set("style", "display:none");
/* 181 */ });
/* 182 */ 
/* 183 */ 

;
/* links-init.js */

/* 1  */ /**
/* 2  *|  * @author Bruno
/* 3  *|  */
/* 4  */ var initializeWindows = function(){
/* 5  */ 	
/* 6  */ 	$$('a[target]').each(function(el){
/* 7  */ 		if(!el.retrieve('hasClick', false)){
/* 8  */ 			el.addEvent('click', function(e){
/* 9  */ 				
/* 10 */ 				switch (el.get('target')) {
/* 11 */ 				case "jswindow":
/* 12 */ 					new Event(e).stop();
/* 13 */ 					window.open($(el).href, '_blank', 'height=500, width=750, resizable=true');
/* 14 */ 					break;
/* 15 */ 				case "window":
/* 16 */ 					new Event(e).stop();
/* 17 */ 					parent.MochaUI.newWindow(this);
/* 18 */ 					break;
/* 19 */ 				case "modal":
/* 20 */ 					new Event(e).stop();
/* 21 */ 					parent.MochaUI.newModal(this);
/* 22 */ 					break;
/* 23 */ 				case "modal2":
/* 24 */ 					new Event(e).stop();
/* 25 */ 					parent.MochaUI.newModal2(this);
/* 26 */ 					break;
/* 27 */ 				case "panel":
/* 28 */ 					new Event(e).stop();
/* 29 */ 					parent.MochaUI.load(this);
/* 30 */ 					break;
/* 31 */ 				}
/* 32 */ 			});
/* 33 */ 			el.store('hasClick', true);
/* 34 */ 		}
/* 35 */ 	});
/* 36 */ 
/* 37 */ 	// Deactivate menu header links
/* 38 */ 	$$('a.returnFalse').each(function(el){
/* 39 */ 		el.addEvent('click', function(e){
/* 40 */ 			new Event(e).stop();
/* 41 */ 		});
/* 42 */ 	});
/* 43 */ 
/* 44 */ };
/* 45 */ 
/* 46 */ // Initialize when the DOM is ready
/* 47 */ window.addEvent('domready', function(){
/* 48 */ 	//inicializa metodos de abertura de janelas
/* 49 */ 	initializeWindows();
/* 50 */ });

;
/* erp-init.js */

/* 1  */ /**
/* 2  *|  * Inicializando Interface grafica do Oasis
/* 3  *|  * @author Bruno
/* 4  *|  * @since 07/08/2009
/* 5  *|  */
/* 6  */ 
/* 7  */ var fixDesktopPNG = function(){
/* 8  */ 	$$('#page a img').each(function(el){
/* 9  */ 		fixPNG(this);
/* 10 */ 	});
/* 11 */ };
/* 12 */ 
/* 13 */ 
/* 14 */ var addPanels = function(){
/* 15 */ 	new MochaUI.Column({
/* 16 */ 		id: 'mainColumn',
/* 17 */ 		placement: 'main',	
/* 18 */ 		width: null,
/* 19 */ 		height: '100%',
/* 20 */ 		sortable: false
/* 21 */ 	});
/* 22 */ 
/* 23 */ 	// Inserindo painel da coluna principal
/* 24 */ 	new MochaUI.Panel({
/* 25 */ 		id: 'mainPanel',
/* 26 */ 		title: "",
/* 27 */ 		column: 'mainColumn',
/* 28 */ 		padding: { top: 0, right: 0, bottom: 0, left: 0 },
/* 29 */ 		onContentLoaded: initializeWindows
/* 30 */ 	});
/* 31 */ 	
/* 32 */ 	MochaUI.load($$("#menu_inicio")[0]);
/* 33 */ };
/* 34 */ 
/* 35 */ 
/* 36 */ // Initialize MochaUI when the DOM is ready
/* 37 */ window.addEvent('domready', function(){
/* 38 */ 	//Instancia do desktop
/* 39 */ 	MochaUI.Desktop = new MochaUI.Desktop();
/* 40 */ 	MochaUI.Desktop.desktop.setStyles({
/* 41 */ 		'background': '#fff',
/* 42 */ 		'visibility': 'visible'
/* 43 */ 	});
/* 44 */ 	
/* 45 */ 	//instância do dock
/* 46 */ 	MochaUI.Dock = new MochaUI.Dock({
/* 47 */ 		dockPosition: 'bottom'
/* 48 */ 	});
/* 49 */ 	
/* 50 */ 	//Instancia dos modais

/* erp-init.js */

/* 51 */ 	MochaUI.Modal = new MochaUI.Modal();
/* 52 */ 	
/* 53 */ 	//instancia paineis
/* 54 */ 	addPanels();
/* 55 */ 	
/* 56 */ 	//acerta icones no desktop
/* 57 */ 	fixDesktopPNG();
/* 58 */ });
/* 59 */ 
/* 60 */ // This runs when a person leaves your page.
/* 61 */ window.addEvent('unload', function(){
/* 62 */ 	if (MochaUI) MochaUI.garbageCleanUp();
/* 63 */ });
/* 64 */ 

;
/* tree.js */

/* 1   */ /*
/* 2   *| 
/* 3   *| Script: Tree.js
/* 4   *| 	Create folder trees.
/* 5   *| 
/* 6   *| Copyright:
/* 7   *| 	Copyright (c) 2007-2008 Greg Houston, <http://greghoustondesign.com/>.	
/* 8   *| 
/* 9   *| License:
/* 10  *| 	MIT-style license.	
/* 11  *| 
/* 12  *| */
/* 13  */ 
/* 14  */ function buildTree(treeID, url){
/* 15  */ 
/* 16  */ 	$$('#'+treeID+' li').each(function(folder){
/* 17  */ 		var folderContents = folder.getChildren('ul');
/* 18  */ 		var folderImage = new Element('img', {
/* 19  */ 			'src': url+'icons/tree/_open.gif',
/* 20  */ 			'width': 18,
/* 21  */ 			'height': 18
/* 22  */ 		}).inject(folder, 'top');
/* 23  */ 
/* 24  */ 		// Determine which open and close graphic each folder gets
/* 25  */ 		
/* 26  */ 		if (folder.hasClass('returnFalse')) {
/* 27  */ 			folder.minus = url+'icons/tree/Rminus.gif'
/* 28  */ 			folder.plus = url+'icons/tree/Rplus.gif'
/* 29  */ 		}
/* 30  */ 		else 
/* 31  */ 			if (folder.getNext()) {
/* 32  */ 				folder.minus = url+'icons/tree/Tminus.gif'
/* 33  */ 				folder.plus = url+'icons/tree/Tplus.gif'
/* 34  */ 			}
/* 35  */ 			else {
/* 36  */ 				folder.minus = url+'icons/tree/Lminus.gif'
/* 37  */ 				folder.plus = url+'icons/tree/Lplus.gif'
/* 38  */ 			}
/* 39  */ 		
/* 40  */ 		var image = new Element('img', {
/* 41  */ 			'src': folder.minus,
/* 42  */ 			'width': 18,
/* 43  */ 			'height': 18
/* 44  */ 		}).addEvent('click', function(){
/* 45  */ 			if (folder.hasClass('f-open')) {
/* 46  */ 				image.setProperty('src', folder.plus);
/* 47  */ 				folderImage.setProperty('src', url+'icons/tree/_closed.gif');
/* 48  */ 				folderContents.each(function(el){
/* 49  */ 					el.setStyle('display', 'none');
/* 50  */ 				});

/* tree.js */

/* 51  */ 				folder.removeClass('f-open');
/* 52  */ 			}
/* 53  */ 			else {
/* 54  */ 				image.setProperty('src', folder.minus);
/* 55  */ 				folderImage.setProperty('src', url+'icons/tree/_open.gif');
/* 56  */ 				folderContents.each(function(el){
/* 57  */ 					el.setStyle('display', 'block');
/* 58  */ 				});
/* 59  */ 				folder.addClass('f-open');
/* 60  */ 			}
/* 61  */ 		}).inject(folder, 'top');
/* 62  */ 		
/* 63  */ 		if (!folder.hasClass('f-open')) {
/* 64  */ 			image.setProperty('src', folder.plus);
/* 65  */ 			folderContents.each(function(el){
/* 66  */ 				el.setStyle('display', 'none');
/* 67  */ 			});
/* 68  */ 			folder.removeClass('f-open');
/* 69  */ 		}
/* 70  */ 
/* 71  */ 		// Add connecting branches to each file node
/* 72  */ 
/* 73  */ 		folderContents.each(function(element){
/* 74  */ 			var docs = element.getChildren('li.doc');
/* 75  */ 			docs.each(function(el){
/* 76  */ 				if (el == docs.getLast() && !el.getNext()) {
/* 77  */ 					new Element('img', {
/* 78  */ 						'src': url+'icons/tree/L.gif',
/* 79  */ 						'width': 18,
/* 80  */ 						'height': 18
/* 81  */ 					}).inject(el.getElement('span'), 'before');
/* 82  */ 				}
/* 83  */ 				else {
/* 84  */ 					new Element('img', {
/* 85  */ 						'src': url+'icons/tree/T.gif',
/* 86  */ 						'width': 18,
/* 87  */ 						'height': 18
/* 88  */ 					}).inject(el.getElement('span'), 'before');
/* 89  */ 				}
/* 90  */ 			});
/* 91  */ 		});
/* 92  */ 		
/* 93  */ 	});
/* 94  */ 	
/* 95  */ 	// Add connecting branches to each node
/* 96  */ 
/* 97  */ 	$$('#'+treeID+' li').each(function(node){
/* 98  */ 		node.getParents('li').each(function(parent){
/* 99  */ 			if (parent.getNext()) {
/* 100 */ 				new Element('img', {

/* tree.js */

/* 101 */ 					'src': url+'icons/tree/I.gif',
/* 102 */ 					'width': 18,
/* 103 */ 					'height': 18
/* 104 */ 				}).inject(node, 'top');
/* 105 */ 			}
/* 106 */ 			else {
/* 107 */ 				new Element('img', {
/* 108 */ 					'src': url+'spacer.gif',
/* 109 */ 					'width': 18,
/* 110 */ 					'height': 18
/* 111 */ 				}).inject(node, 'top');
/* 112 */ 			}
/* 113 */ 		});
/* 114 */ 	});
/* 115 */ 
/* 116 */ 	$$('#'+treeID+' li').each(function(el){
/* 117 */ 		new Element('img', {
/* 118 */ 			'src': url+'icons/tree/_doc.gif',
/* 119 */ 			'width': 18,
/* 120 */ 			'height': 18
/* 121 */ 		}).inject(el.getElement('li'), 'before');
/* 122 */ 	});
/* 123 */ 	
/* 124 */ }
/* 125 */ 

;
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

;
/* core.js */

/* 1   */ /*!
/* 2   *|  * jQuery JavaScript Library v1.4.2 
/* 3   *|  * http://jquery.com/
/* 4   *|  *
/* 5   *|  * Copyright 2010, John Resig
/* 6   *|  * Dual licensed under the MIT or GPL Version 2 licenses.
/* 7   *|  * http://jquery.org/license
/* 8   *|  *
/* 9   *|  * Includes Sizzle.js
/* 10  *|  * http://sizzlejs.com/
/* 11  *|  * Copyright 2010, The Dojo Foundation
/* 12  *|  * Released under the MIT, BSD, and GPL Licenses.
/* 13  *|  *
/* 14  *|  * Date: Sat Feb 13 22:33:48 2010 -0500
/* 15  *|  */
/* 16  */ (function(A,w){function ma(){if(!c.isReady){try{s.documentElement.doScroll("left")}catch(a){setTimeout(ma,1);return}c.ready()}}function Qa(a,b){b.src?c.ajax({url:b.src,async:false,dataType:"script"}):c.globalEval(b.text||b.textContent||b.innerHTML||"");b.parentNode&&b.parentNode.removeChild(b)}function X(a,b,d,f,e,j){var i=a.length;if(typeof b==="object"){for(var o in b)X(a,o,b[o],f,e,d);return a}if(d!==w){f=!j&&f&&c.isFunction(d);for(o=0;o<i;o++)e(a[o],b,f?d.call(a[o],o,e(a[o],b)):d,j);return a}return i?
/* 17  */ e(a[0],b):w}function J(){return(new Date).getTime()}function Y(){return false}function Z(){return true}function na(a,b,d){d[0].type=a;return c.event.handle.apply(b,d)}function oa(a){var b,d=[],f=[],e=arguments,j,i,o,k,n,r;i=c.data(this,"events");if(!(a.liveFired===this||!i||!i.live||a.button&&a.type==="click")){a.liveFired=this;var u=i.live.slice(0);for(k=0;k<u.length;k++){i=u[k];i.origType.replace(O,"")===a.type?f.push(i.selector):u.splice(k--,1)}j=c(a.target).closest(f,a.currentTarget);n=0;for(r=
/* 18  */ j.length;n<r;n++)for(k=0;k<u.length;k++){i=u[k];if(j[n].selector===i.selector){o=j[n].elem;f=null;if(i.preType==="mouseenter"||i.preType==="mouseleave")f=c(a.relatedTarget).closest(i.selector)[0];if(!f||f!==o)d.push({elem:o,handleObj:i})}}n=0;for(r=d.length;n<r;n++){j=d[n];a.currentTarget=j.elem;a.data=j.handleObj.data;a.handleObj=j.handleObj;if(j.handleObj.origHandler.apply(j.elem,e)===false){b=false;break}}return b}}function pa(a,b){return"live."+(a&&a!=="*"?a+".":"")+b.replace(/\./g,"`").replace(/ /g,
/* 19  */ "&")}function qa(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function ra(a,b){var d=0;b.each(function(){if(this.nodeName===(a[d]&&a[d].nodeName)){var f=c.data(a[d++]),e=c.data(this,f);if(f=f&&f.events){delete e.handle;e.events={};for(var j in f)for(var i in f[j])c.event.add(this,j,f[j][i],f[j][i].data)}}})}function sa(a,b,d){var f,e,j;b=b&&b[0]?b[0].ownerDocument||b[0]:s;if(a.length===1&&typeof a[0]==="string"&&a[0].length<512&&b===s&&!ta.test(a[0])&&(c.support.checkClone||!ua.test(a[0]))){e=
/* 20  */ true;if(j=c.fragments[a[0]])if(j!==1)f=j}if(!f){f=b.createDocumentFragment();c.clean(a,b,f,d)}if(e)c.fragments[a[0]]=j?f:1;return{fragment:f,cacheable:e}}function K(a,b){var d={};c.each(va.concat.apply([],va.slice(0,b)),function(){d[this]=a});return d}function wa(a){return"scrollTo"in a&&a.document?a:a.nodeType===9?a.defaultView||a.parentWindow:false}var c=function(a,b){return new c.fn.init(a,b)},Ra=A.jQuery,Sa=A.$,s=A.document,T,Ta=/^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,Ua=/^.[^:#\[\.,]*$/,Va=/\S/,
/* 21  */ Wa=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,Xa=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,P=navigator.userAgent,xa=false,Q=[],L,$=Object.prototype.toString,aa=Object.prototype.hasOwnProperty,ba=Array.prototype.push,R=Array.prototype.slice,ya=Array.prototype.indexOf;c.fn=c.prototype={init:function(a,b){var d,f;if(!a)return this;if(a.nodeType){this.context=this[0]=a;this.length=1;return this}if(a==="body"&&!b){this.context=s;this[0]=s.body;this.selector="body";this.length=1;return this}if(typeof a==="string")if((d=Ta.exec(a))&&
/* 22  */ (d[1]||!b))if(d[1]){f=b?b.ownerDocument||b:s;if(a=Xa.exec(a))if(c.isPlainObject(b)){a=[s.createElement(a[1])];c.fn.attr.call(a,b,true)}else a=[f.createElement(a[1])];else{a=sa([d[1]],[f]);a=(a.cacheable?a.fragment.cloneNode(true):a.fragment).childNodes}return c.merge(this,a)}else{if(b=s.getElementById(d[2])){if(b.id!==d[2])return T.find(a);this.length=1;this[0]=b}this.context=s;this.selector=a;return this}else if(!b&&/^\w+$/.test(a)){this.selector=a;this.context=s;a=s.getElementsByTagName(a);return c.merge(this,
/* 23  */ a)}else return!b||b.jquery?(b||T).find(a):c(b).find(a);else if(c.isFunction(a))return T.ready(a);if(a.selector!==w){this.selector=a.selector;this.context=a.context}return c.makeArray(a,this)},selector:"",jquery:"1.4.2",length:0,size:function(){return this.length},toArray:function(){return R.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this.slice(a)[0]:this[a]},pushStack:function(a,b,d){var f=c();c.isArray(a)?ba.apply(f,a):c.merge(f,a);f.prevObject=this;f.context=this.context;if(b===
/* 24  */ "find")f.selector=this.selector+(this.selector?" ":"")+d;else if(b)f.selector=this.selector+"."+b+"("+d+")";return f},each:function(a,b){return c.each(this,a,b)},ready:function(a){c.bindReady();if(c.isReady)a.call(s,c);else Q&&Q.push(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(R.apply(this,arguments),"slice",R.call(arguments).join(","))},map:function(a){return this.pushStack(c.map(this,
/* 25  */ function(b,d){return a.call(b,d,b)}))},end:function(){return this.prevObject||c(null)},push:ba,sort:[].sort,splice:[].splice};c.fn.init.prototype=c.fn;c.extend=c.fn.extend=function(){var a=arguments[0]||{},b=1,d=arguments.length,f=false,e,j,i,o;if(typeof a==="boolean"){f=a;a=arguments[1]||{};b=2}if(typeof a!=="object"&&!c.isFunction(a))a={};if(d===b){a=this;--b}for(;b<d;b++)if((e=arguments[b])!=null)for(j in e){i=a[j];o=e[j];if(a!==o)if(f&&o&&(c.isPlainObject(o)||c.isArray(o))){i=i&&(c.isPlainObject(i)||
/* 26  */ c.isArray(i))?i:c.isArray(o)?[]:{};a[j]=c.extend(f,i,o)}else if(o!==w)a[j]=o}return a};c.extend({noConflict:function(a){A.$=Sa;if(a)A.jQuery=Ra;return c},isReady:false,ready:function(){if(!c.isReady){if(!s.body)return setTimeout(c.ready,13);c.isReady=true;if(Q){for(var a,b=0;a=Q[b++];)a.call(s,c);Q=null}c.fn.triggerHandler&&c(s).triggerHandler("ready")}},bindReady:function(){if(!xa){xa=true;if(s.readyState==="complete")return c.ready();if(s.addEventListener){s.addEventListener("DOMContentLoaded",
/* 27  */ L,false);A.addEventListener("load",c.ready,false)}else if(s.attachEvent){s.attachEvent("onreadystatechange",L);A.attachEvent("onload",c.ready);var a=false;try{a=A.frameElement==null}catch(b){}s.documentElement.doScroll&&a&&ma()}}},isFunction:function(a){return $.call(a)==="[object Function]"},isArray:function(a){return $.call(a)==="[object Array]"},isPlainObject:function(a){if(!a||$.call(a)!=="[object Object]"||a.nodeType||a.setInterval)return false;if(a.constructor&&!aa.call(a,"constructor")&&!aa.call(a.constructor.prototype,
/* 28  */ "isPrototypeOf"))return false;var b;for(b in a);return b===w||aa.call(a,b)},isEmptyObject:function(a){for(var b in a)return false;return true},error:function(a){throw a;},parseJSON:function(a){if(typeof a!=="string"||!a)return null;a=c.trim(a);if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return A.JSON&&A.JSON.parse?A.JSON.parse(a):(new Function("return "+
/* 29  */ a))();else c.error("Invalid JSON: "+a)},noop:function(){},globalEval:function(a){if(a&&Va.test(a)){var b=s.getElementsByTagName("head")[0]||s.documentElement,d=s.createElement("script");d.type="text/javascript";if(c.support.scriptEval)d.appendChild(s.createTextNode(a));else d.text=a;b.insertBefore(d,b.firstChild);b.removeChild(d)}},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,b,d){var f,e=0,j=a.length,i=j===w||c.isFunction(a);if(d)if(i)for(f in a){if(b.apply(a[f],
/* 30  */ d)===false)break}else for(;e<j;){if(b.apply(a[e++],d)===false)break}else if(i)for(f in a){if(b.call(a[f],f,a[f])===false)break}else for(d=a[0];e<j&&b.call(d,e,d)!==false;d=a[++e]);return a},trim:function(a){return(a||"").replace(Wa,"")},makeArray:function(a,b){b=b||[];if(a!=null)a.length==null||typeof a==="string"||c.isFunction(a)||typeof a!=="function"&&a.setInterval?ba.call(b,a):c.merge(b,a);return b},inArray:function(a,b){if(b.indexOf)return b.indexOf(a);for(var d=0,f=b.length;d<f;d++)if(b[d]===
/* 31  */ a)return d;return-1},merge:function(a,b){var d=a.length,f=0;if(typeof b.length==="number")for(var e=b.length;f<e;f++)a[d++]=b[f];else for(;b[f]!==w;)a[d++]=b[f++];a.length=d;return a},grep:function(a,b,d){for(var f=[],e=0,j=a.length;e<j;e++)!d!==!b(a[e],e)&&f.push(a[e]);return f},map:function(a,b,d){for(var f=[],e,j=0,i=a.length;j<i;j++){e=b(a[j],j,d);if(e!=null)f[f.length]=e}return f.concat.apply([],f)},guid:1,proxy:function(a,b,d){if(arguments.length===2)if(typeof b==="string"){d=a;a=d[b];b=w}else if(b&&
/* 32  */ !c.isFunction(b)){d=b;b=w}if(!b&&a)b=function(){return a.apply(d||this,arguments)};if(a)b.guid=a.guid=a.guid||b.guid||c.guid++;return b},uaMatch:function(a){a=a.toLowerCase();a=/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||!/compatible/.test(a)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}},browser:{}});P=c.uaMatch(P);if(P.browser){c.browser[P.browser]=true;c.browser.version=P.version}if(c.browser.webkit)c.browser.safari=
/* 33  */ true;if(ya)c.inArray=function(a,b){return ya.call(b,a)};T=c(s);if(s.addEventListener)L=function(){s.removeEventListener("DOMContentLoaded",L,false);c.ready()};else if(s.attachEvent)L=function(){if(s.readyState==="complete"){s.detachEvent("onreadystatechange",L);c.ready()}};(function(){c.support={};var a=s.documentElement,b=s.createElement("script"),d=s.createElement("div"),f="script"+J();d.style.display="none";d.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
/* 34  */ var e=d.getElementsByTagName("*"),j=d.getElementsByTagName("a")[0];if(!(!e||!e.length||!j)){c.support={leadingWhitespace:d.firstChild.nodeType===3,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/red/.test(j.getAttribute("style")),hrefNormalized:j.getAttribute("href")==="/a",opacity:/^0.55$/.test(j.style.opacity),cssFloat:!!j.style.cssFloat,checkOn:d.getElementsByTagName("input")[0].value==="on",optSelected:s.createElement("select").appendChild(s.createElement("option")).selected,
/* 35  */ parentNode:d.removeChild(d.appendChild(s.createElement("div"))).parentNode===null,deleteExpando:true,checkClone:false,scriptEval:false,noCloneEvent:true,boxModel:null};b.type="text/javascript";try{b.appendChild(s.createTextNode("window."+f+"=1;"))}catch(i){}a.insertBefore(b,a.firstChild);if(A[f]){c.support.scriptEval=true;delete A[f]}try{delete b.test}catch(o){c.support.deleteExpando=false}a.removeChild(b);if(d.attachEvent&&d.fireEvent){d.attachEvent("onclick",function k(){c.support.noCloneEvent=
/* 36  */ false;d.detachEvent("onclick",k)});d.cloneNode(true).fireEvent("onclick")}d=s.createElement("div");d.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";a=s.createDocumentFragment();a.appendChild(d.firstChild);c.support.checkClone=a.cloneNode(true).cloneNode(true).lastChild.checked;c(function(){var k=s.createElement("div");k.style.width=k.style.paddingLeft="1px";s.body.appendChild(k);c.boxModel=c.support.boxModel=k.offsetWidth===2;s.body.removeChild(k).style.display="none"});a=function(k){var n=
/* 37  */ s.createElement("div");k="on"+k;var r=k in n;if(!r){n.setAttribute(k,"return;");r=typeof n[k]==="function"}return r};c.support.submitBubbles=a("submit");c.support.changeBubbles=a("change");a=b=d=e=j=null}})();c.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};var G="jQuery"+J(),Ya=0,za={};c.extend({cache:{},expando:G,noData:{embed:true,object:true,
/* 38  */ applet:true},data:function(a,b,d){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var f=a[G],e=c.cache;if(!f&&typeof b==="string"&&d===w)return null;f||(f=++Ya);if(typeof b==="object"){a[G]=f;e[f]=c.extend(true,{},b)}else if(!e[f]){a[G]=f;e[f]={}}a=e[f];if(d!==w)a[b]=d;return typeof b==="string"?a[b]:a}},removeData:function(a,b){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var d=a[G],f=c.cache,e=f[d];if(b){if(e){delete e[b];c.isEmptyObject(e)&&c.removeData(a)}}else{if(c.support.deleteExpando)delete a[c.expando];
/* 39  */ else a.removeAttribute&&a.removeAttribute(c.expando);delete f[d]}}}});c.fn.extend({data:function(a,b){if(typeof a==="undefined"&&this.length)return c.data(this[0]);else if(typeof a==="object")return this.each(function(){c.data(this,a)});var d=a.split(".");d[1]=d[1]?"."+d[1]:"";if(b===w){var f=this.triggerHandler("getData"+d[1]+"!",[d[0]]);if(f===w&&this.length)f=c.data(this[0],a);return f===w&&d[1]?this.data(d[0]):f}else return this.trigger("setData"+d[1]+"!",[d[0],b]).each(function(){c.data(this,
/* 40  */ a,b)})},removeData:function(a){return this.each(function(){c.removeData(this,a)})}});c.extend({queue:function(a,b,d){if(a){b=(b||"fx")+"queue";var f=c.data(a,b);if(!d)return f||[];if(!f||c.isArray(d))f=c.data(a,b,c.makeArray(d));else f.push(d);return f}},dequeue:function(a,b){b=b||"fx";var d=c.queue(a,b),f=d.shift();if(f==="inprogress")f=d.shift();if(f){b==="fx"&&d.unshift("inprogress");f.call(a,function(){c.dequeue(a,b)})}}});c.fn.extend({queue:function(a,b){if(typeof a!=="string"){b=a;a="fx"}if(b===
/* 41  */ w)return c.queue(this[0],a);return this.each(function(){var d=c.queue(this,a,b);a==="fx"&&d[0]!=="inprogress"&&c.dequeue(this,a)})},dequeue:function(a){return this.each(function(){c.dequeue(this,a)})},delay:function(a,b){a=c.fx?c.fx.speeds[a]||a:a;b=b||"fx";return this.queue(b,function(){var d=this;setTimeout(function(){c.dequeue(d,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var Aa=/[\n\t]/g,ca=/\s+/,Za=/\r/g,$a=/href|src|style/,ab=/(button|input)/i,bb=/(button|input|object|select|textarea)/i,
/* 42  */ cb=/^(a|area)$/i,Ba=/radio|checkbox/;c.fn.extend({attr:function(a,b){return X(this,a,b,true,c.attr)},removeAttr:function(a){return this.each(function(){c.attr(this,a,"");this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(c.isFunction(a))return this.each(function(n){var r=c(this);r.addClass(a.call(this,n,r.attr("class")))});if(a&&typeof a==="string")for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1)if(e.className){for(var j=" "+e.className+" ",
/* 43  */ i=e.className,o=0,k=b.length;o<k;o++)if(j.indexOf(" "+b[o]+" ")<0)i+=" "+b[o];e.className=c.trim(i)}else e.className=a}return this},removeClass:function(a){if(c.isFunction(a))return this.each(function(k){var n=c(this);n.removeClass(a.call(this,k,n.attr("class")))});if(a&&typeof a==="string"||a===w)for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1&&e.className)if(a){for(var j=(" "+e.className+" ").replace(Aa," "),i=0,o=b.length;i<o;i++)j=j.replace(" "+b[i]+" ",
/* 44  */ " ");e.className=c.trim(j)}else e.className=""}return this},toggleClass:function(a,b){var d=typeof a,f=typeof b==="boolean";if(c.isFunction(a))return this.each(function(e){var j=c(this);j.toggleClass(a.call(this,e,j.attr("class"),b),b)});return this.each(function(){if(d==="string")for(var e,j=0,i=c(this),o=b,k=a.split(ca);e=k[j++];){o=f?o:!i.hasClass(e);i[o?"addClass":"removeClass"](e)}else if(d==="undefined"||d==="boolean"){this.className&&c.data(this,"__className__",this.className);this.className=
/* 45  */ this.className||a===false?"":c.data(this,"__className__")||""}})},hasClass:function(a){a=" "+a+" ";for(var b=0,d=this.length;b<d;b++)if((" "+this[b].className+" ").replace(Aa," ").indexOf(a)>-1)return true;return false},val:function(a){if(a===w){var b=this[0];if(b){if(c.nodeName(b,"option"))return(b.attributes.value||{}).specified?b.value:b.text;if(c.nodeName(b,"select")){var d=b.selectedIndex,f=[],e=b.options;b=b.type==="select-one";if(d<0)return null;var j=b?d:0;for(d=b?d+1:e.length;j<d;j++){var i=
/* 46  */ e[j];if(i.selected){a=c(i).val();if(b)return a;f.push(a)}}return f}if(Ba.test(b.type)&&!c.support.checkOn)return b.getAttribute("value")===null?"on":b.value;return(b.value||"").replace(Za,"")}return w}var o=c.isFunction(a);return this.each(function(k){var n=c(this),r=a;if(this.nodeType===1){if(o)r=a.call(this,k,n.val());if(typeof r==="number")r+="";if(c.isArray(r)&&Ba.test(this.type))this.checked=c.inArray(n.val(),r)>=0;else if(c.nodeName(this,"select")){var u=c.makeArray(r);c("option",this).each(function(){this.selected=
/* 47  */ c.inArray(c(this).val(),u)>=0});if(!u.length)this.selectedIndex=-1}else this.value=r}})}});c.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(a,b,d,f){if(!a||a.nodeType===3||a.nodeType===8)return w;if(f&&b in c.attrFn)return c(a)[b](d);f=a.nodeType!==1||!c.isXMLDoc(a);var e=d!==w;b=f&&c.props[b]||b;if(a.nodeType===1){var j=$a.test(b);if(b in a&&f&&!j){if(e){b==="type"&&ab.test(a.nodeName)&&a.parentNode&&c.error("type property can't be changed");
/* 48  */ a[b]=d}if(c.nodeName(a,"form")&&a.getAttributeNode(b))return a.getAttributeNode(b).nodeValue;if(b==="tabIndex")return(b=a.getAttributeNode("tabIndex"))&&b.specified?b.value:bb.test(a.nodeName)||cb.test(a.nodeName)&&a.href?0:w;return a[b]}if(!c.support.style&&f&&b==="style"){if(e)a.style.cssText=""+d;return a.style.cssText}e&&a.setAttribute(b,""+d);a=!c.support.hrefNormalized&&f&&j?a.getAttribute(b,2):a.getAttribute(b);return a===null?w:a}return c.style(a,b,d)}});var O=/\.(.*)$/,db=function(a){return a.replace(/[^\w\s\.\|`]/g,
/* 49  */ function(b){return"\\"+b})};c.event={add:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){if(a.setInterval&&a!==A&&!a.frameElement)a=A;var e,j;if(d.handler){e=d;d=e.handler}if(!d.guid)d.guid=c.guid++;if(j=c.data(a)){var i=j.events=j.events||{},o=j.handle;if(!o)j.handle=o=function(){return typeof c!=="undefined"&&!c.event.triggered?c.event.handle.apply(o.elem,arguments):w};o.elem=a;b=b.split(" ");for(var k,n=0,r;k=b[n++];){j=e?c.extend({},e):{handler:d,data:f};if(k.indexOf(".")>-1){r=k.split(".");
/* 50  */ k=r.shift();j.namespace=r.slice(0).sort().join(".")}else{r=[];j.namespace=""}j.type=k;j.guid=d.guid;var u=i[k],z=c.event.special[k]||{};if(!u){u=i[k]=[];if(!z.setup||z.setup.call(a,f,r,o)===false)if(a.addEventListener)a.addEventListener(k,o,false);else a.attachEvent&&a.attachEvent("on"+k,o)}if(z.add){z.add.call(a,j);if(!j.handler.guid)j.handler.guid=d.guid}u.push(j);c.event.global[k]=true}a=null}}},global:{},remove:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){var e,j=0,i,o,k,n,r,u,z=c.data(a),

/* core.js */

/* 51  */ C=z&&z.events;if(z&&C){if(b&&b.type){d=b.handler;b=b.type}if(!b||typeof b==="string"&&b.charAt(0)==="."){b=b||"";for(e in C)c.event.remove(a,e+b)}else{for(b=b.split(" ");e=b[j++];){n=e;i=e.indexOf(".")<0;o=[];if(!i){o=e.split(".");e=o.shift();k=new RegExp("(^|\\.)"+c.map(o.slice(0).sort(),db).join("\\.(?:.*\\.)?")+"(\\.|$)")}if(r=C[e])if(d){n=c.event.special[e]||{};for(B=f||0;B<r.length;B++){u=r[B];if(d.guid===u.guid){if(i||k.test(u.namespace)){f==null&&r.splice(B--,1);n.remove&&n.remove.call(a,u)}if(f!=
/* 52  */ null)break}}if(r.length===0||f!=null&&r.length===1){if(!n.teardown||n.teardown.call(a,o)===false)Ca(a,e,z.handle);delete C[e]}}else for(var B=0;B<r.length;B++){u=r[B];if(i||k.test(u.namespace)){c.event.remove(a,n,u.handler,B);r.splice(B--,1)}}}if(c.isEmptyObject(C)){if(b=z.handle)b.elem=null;delete z.events;delete z.handle;c.isEmptyObject(z)&&c.removeData(a)}}}}},trigger:function(a,b,d,f){var e=a.type||a;if(!f){a=typeof a==="object"?a[G]?a:c.extend(c.Event(e),a):c.Event(e);if(e.indexOf("!")>=0){a.type=
/* 53  */ e=e.slice(0,-1);a.exclusive=true}if(!d){a.stopPropagation();c.event.global[e]&&c.each(c.cache,function(){this.events&&this.events[e]&&c.event.trigger(a,b,this.handle.elem)})}if(!d||d.nodeType===3||d.nodeType===8)return w;a.result=w;a.target=d;b=c.makeArray(b);b.unshift(a)}a.currentTarget=d;(f=c.data(d,"handle"))&&f.apply(d,b);f=d.parentNode||d.ownerDocument;try{if(!(d&&d.nodeName&&c.noData[d.nodeName.toLowerCase()]))if(d["on"+e]&&d["on"+e].apply(d,b)===false)a.result=false}catch(j){}if(!a.isPropagationStopped()&&
/* 54  */ f)c.event.trigger(a,b,f,true);else if(!a.isDefaultPrevented()){f=a.target;var i,o=c.nodeName(f,"a")&&e==="click",k=c.event.special[e]||{};if((!k._default||k._default.call(d,a)===false)&&!o&&!(f&&f.nodeName&&c.noData[f.nodeName.toLowerCase()])){try{if(f[e]){if(i=f["on"+e])f["on"+e]=null;c.event.triggered=true;f[e]()}}catch(n){}if(i)f["on"+e]=i;c.event.triggered=false}}},handle:function(a){var b,d,f,e;a=arguments[0]=c.event.fix(a||A.event);a.currentTarget=this;b=a.type.indexOf(".")<0&&!a.exclusive;
/* 55  */ if(!b){d=a.type.split(".");a.type=d.shift();f=new RegExp("(^|\\.)"+d.slice(0).sort().join("\\.(?:.*\\.)?")+"(\\.|$)")}e=c.data(this,"events");d=e[a.type];if(e&&d){d=d.slice(0);e=0;for(var j=d.length;e<j;e++){var i=d[e];if(b||f.test(i.namespace)){a.handler=i.handler;a.data=i.data;a.handleObj=i;i=i.handler.apply(this,arguments);if(i!==w){a.result=i;if(i===false){a.preventDefault();a.stopPropagation()}}if(a.isImmediatePropagationStopped())break}}}return a.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
/* 56  */ fix:function(a){if(a[G])return a;var b=a;a=c.Event(b);for(var d=this.props.length,f;d;){f=this.props[--d];a[f]=b[f]}if(!a.target)a.target=a.srcElement||s;if(a.target.nodeType===3)a.target=a.target.parentNode;if(!a.relatedTarget&&a.fromElement)a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;if(a.pageX==null&&a.clientX!=null){b=s.documentElement;d=s.body;a.pageX=a.clientX+(b&&b.scrollLeft||d&&d.scrollLeft||0)-(b&&b.clientLeft||d&&d.clientLeft||0);a.pageY=a.clientY+(b&&b.scrollTop||
/* 57  */ d&&d.scrollTop||0)-(b&&b.clientTop||d&&d.clientTop||0)}if(!a.which&&(a.charCode||a.charCode===0?a.charCode:a.keyCode))a.which=a.charCode||a.keyCode;if(!a.metaKey&&a.ctrlKey)a.metaKey=a.ctrlKey;if(!a.which&&a.button!==w)a.which=a.button&1?1:a.button&2?3:a.button&4?2:0;return a},guid:1E8,proxy:c.proxy,special:{ready:{setup:c.bindReady,teardown:c.noop},live:{add:function(a){c.event.add(this,a.origType,c.extend({},a,{handler:oa}))},remove:function(a){var b=true,d=a.origType.replace(O,"");c.each(c.data(this,
/* 58  */ "events").live||[],function(){if(d===this.origType.replace(O,""))return b=false});b&&c.event.remove(this,a.origType,oa)}},beforeunload:{setup:function(a,b,d){if(this.setInterval)this.onbeforeunload=d;return false},teardown:function(a,b){if(this.onbeforeunload===b)this.onbeforeunload=null}}}};var Ca=s.removeEventListener?function(a,b,d){a.removeEventListener(b,d,false)}:function(a,b,d){a.detachEvent("on"+b,d)};c.Event=function(a){if(!this.preventDefault)return new c.Event(a);if(a&&a.type){this.originalEvent=
/* 59  */ a;this.type=a.type}else this.type=a;this.timeStamp=J();this[G]=true};c.Event.prototype={preventDefault:function(){this.isDefaultPrevented=Z;var a=this.originalEvent;if(a){a.preventDefault&&a.preventDefault();a.returnValue=false}},stopPropagation:function(){this.isPropagationStopped=Z;var a=this.originalEvent;if(a){a.stopPropagation&&a.stopPropagation();a.cancelBubble=true}},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z;this.stopPropagation()},isDefaultPrevented:Y,isPropagationStopped:Y,
/* 60  */ isImmediatePropagationStopped:Y};var Da=function(a){var b=a.relatedTarget;try{for(;b&&b!==this;)b=b.parentNode;if(b!==this){a.type=a.data;c.event.handle.apply(this,arguments)}}catch(d){}},Ea=function(a){a.type=a.data;c.event.handle.apply(this,arguments)};c.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){c.event.special[a]={setup:function(d){c.event.add(this,b,d&&d.selector?Ea:Da,a)},teardown:function(d){c.event.remove(this,b,d&&d.selector?Ea:Da)}}});if(!c.support.submitBubbles)c.event.special.submit=
/* 61  */ {setup:function(){if(this.nodeName.toLowerCase()!=="form"){c.event.add(this,"click.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="submit"||d==="image")&&c(b).closest("form").length)return na("submit",this,arguments)});c.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="text"||d==="password")&&c(b).closest("form").length&&a.keyCode===13)return na("submit",this,arguments)})}else return false},teardown:function(){c.event.remove(this,".specialSubmit")}};
/* 62  */ if(!c.support.changeBubbles){var da=/textarea|input|select/i,ea,Fa=function(a){var b=a.type,d=a.value;if(b==="radio"||b==="checkbox")d=a.checked;else if(b==="select-multiple")d=a.selectedIndex>-1?c.map(a.options,function(f){return f.selected}).join("-"):"";else if(a.nodeName.toLowerCase()==="select")d=a.selectedIndex;return d},fa=function(a,b){var d=a.target,f,e;if(!(!da.test(d.nodeName)||d.readOnly)){f=c.data(d,"_change_data");e=Fa(d);if(a.type!=="focusout"||d.type!=="radio")c.data(d,"_change_data",
/* 63  */ e);if(!(f===w||e===f))if(f!=null||e){a.type="change";return c.event.trigger(a,b,d)}}};c.event.special.change={filters:{focusout:fa,click:function(a){var b=a.target,d=b.type;if(d==="radio"||d==="checkbox"||b.nodeName.toLowerCase()==="select")return fa.call(this,a)},keydown:function(a){var b=a.target,d=b.type;if(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(d==="checkbox"||d==="radio")||d==="select-multiple")return fa.call(this,a)},beforeactivate:function(a){a=a.target;c.data(a,
/* 64  */ "_change_data",Fa(a))}},setup:function(){if(this.type==="file")return false;for(var a in ea)c.event.add(this,a+".specialChange",ea[a]);return da.test(this.nodeName)},teardown:function(){c.event.remove(this,".specialChange");return da.test(this.nodeName)}};ea=c.event.special.change.filters}s.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(f){f=c.event.fix(f);f.type=b;return c.event.handle.call(this,f)}c.event.special[b]={setup:function(){this.addEventListener(a,
/* 65  */ d,true)},teardown:function(){this.removeEventListener(a,d,true)}}});c.each(["bind","one"],function(a,b){c.fn[b]=function(d,f,e){if(typeof d==="object"){for(var j in d)this[b](j,f,d[j],e);return this}if(c.isFunction(f)){e=f;f=w}var i=b==="one"?c.proxy(e,function(k){c(this).unbind(k,i);return e.apply(this,arguments)}):e;if(d==="unload"&&b!=="one")this.one(d,f,e);else{j=0;for(var o=this.length;j<o;j++)c.event.add(this[j],d,i,f)}return this}});c.fn.extend({unbind:function(a,b){if(typeof a==="object"&&
/* 66  */ !a.preventDefault)for(var d in a)this.unbind(d,a[d]);else{d=0;for(var f=this.length;d<f;d++)c.event.remove(this[d],a,b)}return this},delegate:function(a,b,d,f){return this.live(b,d,f,a)},undelegate:function(a,b,d){return arguments.length===0?this.unbind("live"):this.die(b,null,d,a)},trigger:function(a,b){return this.each(function(){c.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){a=c.Event(a);a.preventDefault();a.stopPropagation();c.event.trigger(a,b,this[0]);return a.result}},
/* 67  */ toggle:function(a){for(var b=arguments,d=1;d<b.length;)c.proxy(a,b[d++]);return this.click(c.proxy(a,function(f){var e=(c.data(this,"lastToggle"+a.guid)||0)%d;c.data(this,"lastToggle"+a.guid,e+1);f.preventDefault();return b[e].apply(this,arguments)||false}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Ga={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};c.each(["live","die"],function(a,b){c.fn[b]=function(d,f,e,j){var i,o=0,k,n,r=j||this.selector,
/* 68  */ u=j?this:c(this.context);if(c.isFunction(f)){e=f;f=w}for(d=(d||"").split(" ");(i=d[o++])!=null;){j=O.exec(i);k="";if(j){k=j[0];i=i.replace(O,"")}if(i==="hover")d.push("mouseenter"+k,"mouseleave"+k);else{n=i;if(i==="focus"||i==="blur"){d.push(Ga[i]+k);i+=k}else i=(Ga[i]||i)+k;b==="live"?u.each(function(){c.event.add(this,pa(i,r),{data:f,selector:r,handler:e,origType:i,origHandler:e,preType:n})}):u.unbind(pa(i,r),e)}}return this}});c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),
/* 69  */ function(a,b){c.fn[b]=function(d){return d?this.bind(b,d):this.trigger(b)};if(c.attrFn)c.attrFn[b]=true});A.attachEvent&&!A.addEventListener&&A.attachEvent("onunload",function(){for(var a in c.cache)if(c.cache[a].handle)try{c.event.remove(c.cache[a].handle.elem)}catch(b){}});(function(){function a(g){for(var h="",l,m=0;g[m];m++){l=g[m];if(l.nodeType===3||l.nodeType===4)h+=l.nodeValue;else if(l.nodeType!==8)h+=a(l.childNodes)}return h}function b(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];
/* 70  */ if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1&&!p){t.sizcache=l;t.sizset=q}if(t.nodeName.toLowerCase()===h){y=t;break}t=t[g]}m[q]=y}}}function d(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1){if(!p){t.sizcache=l;t.sizset=q}if(typeof h!=="string"){if(t===h){y=true;break}}else if(k.filter(h,[t]).length>0){y=t;break}}t=t[g]}m[q]=y}}}var f=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
/* 71  */ e=0,j=Object.prototype.toString,i=false,o=true;[0,0].sort(function(){o=false;return 0});var k=function(g,h,l,m){l=l||[];var q=h=h||s;if(h.nodeType!==1&&h.nodeType!==9)return[];if(!g||typeof g!=="string")return l;for(var p=[],v,t,y,S,H=true,M=x(h),I=g;(f.exec(""),v=f.exec(I))!==null;){I=v[3];p.push(v[1]);if(v[2]){S=v[3];break}}if(p.length>1&&r.exec(g))if(p.length===2&&n.relative[p[0]])t=ga(p[0]+p[1],h);else for(t=n.relative[p[0]]?[h]:k(p.shift(),h);p.length;){g=p.shift();if(n.relative[g])g+=p.shift();
/* 72  */ t=ga(g,t)}else{if(!m&&p.length>1&&h.nodeType===9&&!M&&n.match.ID.test(p[0])&&!n.match.ID.test(p[p.length-1])){v=k.find(p.shift(),h,M);h=v.expr?k.filter(v.expr,v.set)[0]:v.set[0]}if(h){v=m?{expr:p.pop(),set:z(m)}:k.find(p.pop(),p.length===1&&(p[0]==="~"||p[0]==="+")&&h.parentNode?h.parentNode:h,M);t=v.expr?k.filter(v.expr,v.set):v.set;if(p.length>0)y=z(t);else H=false;for(;p.length;){var D=p.pop();v=D;if(n.relative[D])v=p.pop();else D="";if(v==null)v=h;n.relative[D](y,v,M)}}else y=[]}y||(y=t);y||k.error(D||
/* 73  */ g);if(j.call(y)==="[object Array]")if(H)if(h&&h.nodeType===1)for(g=0;y[g]!=null;g++){if(y[g]&&(y[g]===true||y[g].nodeType===1&&E(h,y[g])))l.push(t[g])}else for(g=0;y[g]!=null;g++)y[g]&&y[g].nodeType===1&&l.push(t[g]);else l.push.apply(l,y);else z(y,l);if(S){k(S,q,l,m);k.uniqueSort(l)}return l};k.uniqueSort=function(g){if(B){i=o;g.sort(B);if(i)for(var h=1;h<g.length;h++)g[h]===g[h-1]&&g.splice(h--,1)}return g};k.matches=function(g,h){return k(g,null,null,h)};k.find=function(g,h,l){var m,q;if(!g)return[];
/* 74  */ for(var p=0,v=n.order.length;p<v;p++){var t=n.order[p];if(q=n.leftMatch[t].exec(g)){var y=q[1];q.splice(1,1);if(y.substr(y.length-1)!=="\\"){q[1]=(q[1]||"").replace(/\\/g,"");m=n.find[t](q,h,l);if(m!=null){g=g.replace(n.match[t],"");break}}}}m||(m=h.getElementsByTagName("*"));return{set:m,expr:g}};k.filter=function(g,h,l,m){for(var q=g,p=[],v=h,t,y,S=h&&h[0]&&x(h[0]);g&&h.length;){for(var H in n.filter)if((t=n.leftMatch[H].exec(g))!=null&&t[2]){var M=n.filter[H],I,D;D=t[1];y=false;t.splice(1,1);if(D.substr(D.length-
/* 75  */ 1)!=="\\"){if(v===p)p=[];if(n.preFilter[H])if(t=n.preFilter[H](t,v,l,p,m,S)){if(t===true)continue}else y=I=true;if(t)for(var U=0;(D=v[U])!=null;U++)if(D){I=M(D,t,U,v);var Ha=m^!!I;if(l&&I!=null)if(Ha)y=true;else v[U]=false;else if(Ha){p.push(D);y=true}}if(I!==w){l||(v=p);g=g.replace(n.match[H],"");if(!y)return[];break}}}if(g===q)if(y==null)k.error(g);else break;q=g}return v};k.error=function(g){throw"Syntax error, unrecognized expression: "+g;};var n=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
/* 76  */ CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(g){return g.getAttribute("href")}},
/* 77  */ relative:{"+":function(g,h){var l=typeof h==="string",m=l&&!/\W/.test(h);l=l&&!m;if(m)h=h.toLowerCase();m=0;for(var q=g.length,p;m<q;m++)if(p=g[m]){for(;(p=p.previousSibling)&&p.nodeType!==1;);g[m]=l||p&&p.nodeName.toLowerCase()===h?p||false:p===h}l&&k.filter(h,g,true)},">":function(g,h){var l=typeof h==="string";if(l&&!/\W/.test(h)){h=h.toLowerCase();for(var m=0,q=g.length;m<q;m++){var p=g[m];if(p){l=p.parentNode;g[m]=l.nodeName.toLowerCase()===h?l:false}}}else{m=0;for(q=g.length;m<q;m++)if(p=g[m])g[m]=
/* 78  */ l?p.parentNode:p.parentNode===h;l&&k.filter(h,g,true)}},"":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("parentNode",h,m,g,p,l)},"~":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("previousSibling",h,m,g,p,l)}},find:{ID:function(g,h,l){if(typeof h.getElementById!=="undefined"&&!l)return(g=h.getElementById(g[1]))?[g]:[]},NAME:function(g,h){if(typeof h.getElementsByName!=="undefined"){var l=[];
/* 79  */ h=h.getElementsByName(g[1]);for(var m=0,q=h.length;m<q;m++)h[m].getAttribute("name")===g[1]&&l.push(h[m]);return l.length===0?null:l}},TAG:function(g,h){return h.getElementsByTagName(g[1])}},preFilter:{CLASS:function(g,h,l,m,q,p){g=" "+g[1].replace(/\\/g,"")+" ";if(p)return g;p=0;for(var v;(v=h[p])!=null;p++)if(v)if(q^(v.className&&(" "+v.className+" ").replace(/[\t\n]/g," ").indexOf(g)>=0))l||m.push(v);else if(l)h[p]=false;return false},ID:function(g){return g[1].replace(/\\/g,"")},TAG:function(g){return g[1].toLowerCase()},
/* 80  */ CHILD:function(g){if(g[1]==="nth"){var h=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2]==="even"&&"2n"||g[2]==="odd"&&"2n+1"||!/\D/.test(g[2])&&"0n+"+g[2]||g[2]);g[2]=h[1]+(h[2]||1)-0;g[3]=h[3]-0}g[0]=e++;return g},ATTR:function(g,h,l,m,q,p){h=g[1].replace(/\\/g,"");if(!p&&n.attrMap[h])g[1]=n.attrMap[h];if(g[2]==="~=")g[4]=" "+g[4]+" ";return g},PSEUDO:function(g,h,l,m,q){if(g[1]==="not")if((f.exec(g[3])||"").length>1||/^\w/.test(g[3]))g[3]=k(g[3],null,null,h);else{g=k.filter(g[3],h,l,true^q);l||m.push.apply(m,
/* 81  */ g);return false}else if(n.match.POS.test(g[0])||n.match.CHILD.test(g[0]))return true;return g},POS:function(g){g.unshift(true);return g}},filters:{enabled:function(g){return g.disabled===false&&g.type!=="hidden"},disabled:function(g){return g.disabled===true},checked:function(g){return g.checked===true},selected:function(g){return g.selected===true},parent:function(g){return!!g.firstChild},empty:function(g){return!g.firstChild},has:function(g,h,l){return!!k(l[3],g).length},header:function(g){return/h\d/i.test(g.nodeName)},
/* 82  */ text:function(g){return"text"===g.type},radio:function(g){return"radio"===g.type},checkbox:function(g){return"checkbox"===g.type},file:function(g){return"file"===g.type},password:function(g){return"password"===g.type},submit:function(g){return"submit"===g.type},image:function(g){return"image"===g.type},reset:function(g){return"reset"===g.type},button:function(g){return"button"===g.type||g.nodeName.toLowerCase()==="button"},input:function(g){return/input|select|textarea|button/i.test(g.nodeName)}},
/* 83  */ setFilters:{first:function(g,h){return h===0},last:function(g,h,l,m){return h===m.length-1},even:function(g,h){return h%2===0},odd:function(g,h){return h%2===1},lt:function(g,h,l){return h<l[3]-0},gt:function(g,h,l){return h>l[3]-0},nth:function(g,h,l){return l[3]-0===h},eq:function(g,h,l){return l[3]-0===h}},filter:{PSEUDO:function(g,h,l,m){var q=h[1],p=n.filters[q];if(p)return p(g,l,h,m);else if(q==="contains")return(g.textContent||g.innerText||a([g])||"").indexOf(h[3])>=0;else if(q==="not"){h=
/* 84  */ h[3];l=0;for(m=h.length;l<m;l++)if(h[l]===g)return false;return true}else k.error("Syntax error, unrecognized expression: "+q)},CHILD:function(g,h){var l=h[1],m=g;switch(l){case "only":case "first":for(;m=m.previousSibling;)if(m.nodeType===1)return false;if(l==="first")return true;m=g;case "last":for(;m=m.nextSibling;)if(m.nodeType===1)return false;return true;case "nth":l=h[2];var q=h[3];if(l===1&&q===0)return true;h=h[0];var p=g.parentNode;if(p&&(p.sizcache!==h||!g.nodeIndex)){var v=0;for(m=p.firstChild;m;m=
/* 85  */ m.nextSibling)if(m.nodeType===1)m.nodeIndex=++v;p.sizcache=h}g=g.nodeIndex-q;return l===0?g===0:g%l===0&&g/l>=0}},ID:function(g,h){return g.nodeType===1&&g.getAttribute("id")===h},TAG:function(g,h){return h==="*"&&g.nodeType===1||g.nodeName.toLowerCase()===h},CLASS:function(g,h){return(" "+(g.className||g.getAttribute("class"))+" ").indexOf(h)>-1},ATTR:function(g,h){var l=h[1];g=n.attrHandle[l]?n.attrHandle[l](g):g[l]!=null?g[l]:g.getAttribute(l);l=g+"";var m=h[2];h=h[4];return g==null?m==="!=":m===
/* 86  */ "="?l===h:m==="*="?l.indexOf(h)>=0:m==="~="?(" "+l+" ").indexOf(h)>=0:!h?l&&g!==false:m==="!="?l!==h:m==="^="?l.indexOf(h)===0:m==="$="?l.substr(l.length-h.length)===h:m==="|="?l===h||l.substr(0,h.length+1)===h+"-":false},POS:function(g,h,l,m){var q=n.setFilters[h[2]];if(q)return q(g,l,h,m)}}},r=n.match.POS;for(var u in n.match){n.match[u]=new RegExp(n.match[u].source+/(?![^\[]*\])(?![^\(]*\))/.source);n.leftMatch[u]=new RegExp(/(^(?:.|\r|\n)*?)/.source+n.match[u].source.replace(/\\(\d+)/g,function(g,
/* 87  */ h){return"\\"+(h-0+1)}))}var z=function(g,h){g=Array.prototype.slice.call(g,0);if(h){h.push.apply(h,g);return h}return g};try{Array.prototype.slice.call(s.documentElement.childNodes,0)}catch(C){z=function(g,h){h=h||[];if(j.call(g)==="[object Array]")Array.prototype.push.apply(h,g);else if(typeof g.length==="number")for(var l=0,m=g.length;l<m;l++)h.push(g[l]);else for(l=0;g[l];l++)h.push(g[l]);return h}}var B;if(s.documentElement.compareDocumentPosition)B=function(g,h){if(!g.compareDocumentPosition||
/* 88  */ !h.compareDocumentPosition){if(g==h)i=true;return g.compareDocumentPosition?-1:1}g=g.compareDocumentPosition(h)&4?-1:g===h?0:1;if(g===0)i=true;return g};else if("sourceIndex"in s.documentElement)B=function(g,h){if(!g.sourceIndex||!h.sourceIndex){if(g==h)i=true;return g.sourceIndex?-1:1}g=g.sourceIndex-h.sourceIndex;if(g===0)i=true;return g};else if(s.createRange)B=function(g,h){if(!g.ownerDocument||!h.ownerDocument){if(g==h)i=true;return g.ownerDocument?-1:1}var l=g.ownerDocument.createRange(),m=
/* 89  */ h.ownerDocument.createRange();l.setStart(g,0);l.setEnd(g,0);m.setStart(h,0);m.setEnd(h,0);g=l.compareBoundaryPoints(Range.START_TO_END,m);if(g===0)i=true;return g};(function(){var g=s.createElement("div"),h="script"+(new Date).getTime();g.innerHTML="<a name='"+h+"'/>";var l=s.documentElement;l.insertBefore(g,l.firstChild);if(s.getElementById(h)){n.find.ID=function(m,q,p){if(typeof q.getElementById!=="undefined"&&!p)return(q=q.getElementById(m[1]))?q.id===m[1]||typeof q.getAttributeNode!=="undefined"&&
/* 90  */ q.getAttributeNode("id").nodeValue===m[1]?[q]:w:[]};n.filter.ID=function(m,q){var p=typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id");return m.nodeType===1&&p&&p.nodeValue===q}}l.removeChild(g);l=g=null})();(function(){var g=s.createElement("div");g.appendChild(s.createComment(""));if(g.getElementsByTagName("*").length>0)n.find.TAG=function(h,l){l=l.getElementsByTagName(h[1]);if(h[1]==="*"){h=[];for(var m=0;l[m];m++)l[m].nodeType===1&&h.push(l[m]);l=h}return l};g.innerHTML="<a href='#'></a>";
/* 91  */ if(g.firstChild&&typeof g.firstChild.getAttribute!=="undefined"&&g.firstChild.getAttribute("href")!=="#")n.attrHandle.href=function(h){return h.getAttribute("href",2)};g=null})();s.querySelectorAll&&function(){var g=k,h=s.createElement("div");h.innerHTML="<p class='TEST'></p>";if(!(h.querySelectorAll&&h.querySelectorAll(".TEST").length===0)){k=function(m,q,p,v){q=q||s;if(!v&&q.nodeType===9&&!x(q))try{return z(q.querySelectorAll(m),p)}catch(t){}return g(m,q,p,v)};for(var l in g)k[l]=g[l];h=null}}();
/* 92  */ (function(){var g=s.createElement("div");g.innerHTML="<div class='test e'></div><div class='test'></div>";if(!(!g.getElementsByClassName||g.getElementsByClassName("e").length===0)){g.lastChild.className="e";if(g.getElementsByClassName("e").length!==1){n.order.splice(1,0,"CLASS");n.find.CLASS=function(h,l,m){if(typeof l.getElementsByClassName!=="undefined"&&!m)return l.getElementsByClassName(h[1])};g=null}}})();var E=s.compareDocumentPosition?function(g,h){return!!(g.compareDocumentPosition(h)&16)}:
/* 93  */ function(g,h){return g!==h&&(g.contains?g.contains(h):true)},x=function(g){return(g=(g?g.ownerDocument||g:0).documentElement)?g.nodeName!=="HTML":false},ga=function(g,h){var l=[],m="",q;for(h=h.nodeType?[h]:h;q=n.match.PSEUDO.exec(g);){m+=q[0];g=g.replace(n.match.PSEUDO,"")}g=n.relative[g]?g+"*":g;q=0;for(var p=h.length;q<p;q++)k(g,h[q],l);return k.filter(m,l)};c.find=k;c.expr=k.selectors;c.expr[":"]=c.expr.filters;c.unique=k.uniqueSort;c.text=a;c.isXMLDoc=x;c.contains=E})();var eb=/Until$/,fb=/^(?:parents|prevUntil|prevAll)/,
/* 94  */ gb=/,/;R=Array.prototype.slice;var Ia=function(a,b,d){if(c.isFunction(b))return c.grep(a,function(e,j){return!!b.call(e,j,e)===d});else if(b.nodeType)return c.grep(a,function(e){return e===b===d});else if(typeof b==="string"){var f=c.grep(a,function(e){return e.nodeType===1});if(Ua.test(b))return c.filter(b,f,!d);else b=c.filter(b,f)}return c.grep(a,function(e){return c.inArray(e,b)>=0===d})};c.fn.extend({find:function(a){for(var b=this.pushStack("","find",a),d=0,f=0,e=this.length;f<e;f++){d=b.length;
/* 95  */ c.find(a,this[f],b);if(f>0)for(var j=d;j<b.length;j++)for(var i=0;i<d;i++)if(b[i]===b[j]){b.splice(j--,1);break}}return b},has:function(a){var b=c(a);return this.filter(function(){for(var d=0,f=b.length;d<f;d++)if(c.contains(this,b[d]))return true})},not:function(a){return this.pushStack(Ia(this,a,false),"not",a)},filter:function(a){return this.pushStack(Ia(this,a,true),"filter",a)},is:function(a){return!!a&&c.filter(a,this).length>0},closest:function(a,b){if(c.isArray(a)){var d=[],f=this[0],e,j=
/* 96  */ {},i;if(f&&a.length){e=0;for(var o=a.length;e<o;e++){i=a[e];j[i]||(j[i]=c.expr.match.POS.test(i)?c(i,b||this.context):i)}for(;f&&f.ownerDocument&&f!==b;){for(i in j){e=j[i];if(e.jquery?e.index(f)>-1:c(f).is(e)){d.push({selector:i,elem:f});delete j[i]}}f=f.parentNode}}return d}var k=c.expr.match.POS.test(a)?c(a,b||this.context):null;return this.map(function(n,r){for(;r&&r.ownerDocument&&r!==b;){if(k?k.index(r)>-1:c(r).is(a))return r;r=r.parentNode}return null})},index:function(a){if(!a||typeof a===
/* 97  */ "string")return c.inArray(this[0],a?c(a):this.parent().children());return c.inArray(a.jquery?a[0]:a,this)},add:function(a,b){a=typeof a==="string"?c(a,b||this.context):c.makeArray(a);b=c.merge(this.get(),a);return this.pushStack(qa(a[0])||qa(b[0])?b:c.unique(b))},andSelf:function(){return this.add(this.prevObject)}});c.each({parent:function(a){return(a=a.parentNode)&&a.nodeType!==11?a:null},parents:function(a){return c.dir(a,"parentNode")},parentsUntil:function(a,b,d){return c.dir(a,"parentNode",
/* 98  */ d)},next:function(a){return c.nth(a,2,"nextSibling")},prev:function(a){return c.nth(a,2,"previousSibling")},nextAll:function(a){return c.dir(a,"nextSibling")},prevAll:function(a){return c.dir(a,"previousSibling")},nextUntil:function(a,b,d){return c.dir(a,"nextSibling",d)},prevUntil:function(a,b,d){return c.dir(a,"previousSibling",d)},siblings:function(a){return c.sibling(a.parentNode.firstChild,a)},children:function(a){return c.sibling(a.firstChild)},contents:function(a){return c.nodeName(a,"iframe")?
/* 99  */ a.contentDocument||a.contentWindow.document:c.makeArray(a.childNodes)}},function(a,b){c.fn[a]=function(d,f){var e=c.map(this,b,d);eb.test(a)||(f=d);if(f&&typeof f==="string")e=c.filter(f,e);e=this.length>1?c.unique(e):e;if((this.length>1||gb.test(f))&&fb.test(a))e=e.reverse();return this.pushStack(e,a,R.call(arguments).join(","))}});c.extend({filter:function(a,b,d){if(d)a=":not("+a+")";return c.find.matches(a,b)},dir:function(a,b,d){var f=[];for(a=a[b];a&&a.nodeType!==9&&(d===w||a.nodeType!==1||!c(a).is(d));){a.nodeType===
/* 100 */ 1&&f.push(a);a=a[b]}return f},nth:function(a,b,d){b=b||1;for(var f=0;a;a=a[d])if(a.nodeType===1&&++f===b)break;return a},sibling:function(a,b){for(var d=[];a;a=a.nextSibling)a.nodeType===1&&a!==b&&d.push(a);return d}});var Ja=/ jQuery\d+="(?:\d+|null)"/g,V=/^\s+/,Ka=/(<([\w:]+)[^>]*?)\/>/g,hb=/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,La=/<([\w:]+)/,ib=/<tbody/i,jb=/<|&#?\w+;/,ta=/<script|<object|<embed|<option|<style/i,ua=/checked\s*(?:[^=]|=\s*.checked.)/i,Ma=function(a,b,d){return hb.test(d)?

/* core.js */

/* 101 */ a:b+"></"+d+">"},F={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};F.optgroup=F.option;F.tbody=F.tfoot=F.colgroup=F.caption=F.thead;F.th=F.td;if(!c.support.htmlSerialize)F._default=[1,"div<div>","</div>"];c.fn.extend({text:function(a){if(c.isFunction(a))return this.each(function(b){var d=
/* 102 */ c(this);d.text(a.call(this,b,d.text()))});if(typeof a!=="object"&&a!==w)return this.empty().append((this[0]&&this[0].ownerDocument||s).createTextNode(a));return c.text(this)},wrapAll:function(a){if(c.isFunction(a))return this.each(function(d){c(this).wrapAll(a.call(this,d))});if(this[0]){var b=c(a,this[0].ownerDocument).eq(0).clone(true);this[0].parentNode&&b.insertBefore(this[0]);b.map(function(){for(var d=this;d.firstChild&&d.firstChild.nodeType===1;)d=d.firstChild;return d}).append(this)}return this},
/* 103 */ wrapInner:function(a){if(c.isFunction(a))return this.each(function(b){c(this).wrapInner(a.call(this,b))});return this.each(function(){var b=c(this),d=b.contents();d.length?d.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){c(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){c.nodeName(this,"body")||c(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.appendChild(a)})},
/* 104 */ prepend:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,this)});else if(arguments.length){var a=c(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,
/* 105 */ this.nextSibling)});else if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,c(arguments[0]).toArray());return a}},remove:function(a,b){for(var d=0,f;(f=this[d])!=null;d++)if(!a||c.filter(a,[f]).length){if(!b&&f.nodeType===1){c.cleanData(f.getElementsByTagName("*"));c.cleanData([f])}f.parentNode&&f.parentNode.removeChild(f)}return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++)for(b.nodeType===1&&c.cleanData(b.getElementsByTagName("*"));b.firstChild;)b.removeChild(b.firstChild);
/* 106 */ return this},clone:function(a){var b=this.map(function(){if(!c.support.noCloneEvent&&!c.isXMLDoc(this)){var d=this.outerHTML,f=this.ownerDocument;if(!d){d=f.createElement("div");d.appendChild(this.cloneNode(true));d=d.innerHTML}return c.clean([d.replace(Ja,"").replace(/=([^="'>\s]+\/)>/g,'="$1">').replace(V,"")],f)[0]}else return this.cloneNode(true)});if(a===true){ra(this,b);ra(this.find("*"),b.find("*"))}return b},html:function(a){if(a===w)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(Ja,
/* 107 */ ""):null;else if(typeof a==="string"&&!ta.test(a)&&(c.support.leadingWhitespace||!V.test(a))&&!F[(La.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Ka,Ma);try{for(var b=0,d=this.length;b<d;b++)if(this[b].nodeType===1){c.cleanData(this[b].getElementsByTagName("*"));this[b].innerHTML=a}}catch(f){this.empty().append(a)}}else c.isFunction(a)?this.each(function(e){var j=c(this),i=j.html();j.empty().append(function(){return a.call(this,e,i)})}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&
/* 108 */ this[0].parentNode){if(c.isFunction(a))return this.each(function(b){var d=c(this),f=d.html();d.replaceWith(a.call(this,b,f))});if(typeof a!=="string")a=c(a).detach();return this.each(function(){var b=this.nextSibling,d=this.parentNode;c(this).remove();b?c(b).before(a):c(d).append(a)})}else return this.pushStack(c(c.isFunction(a)?a():a),"replaceWith",a)},detach:function(a){return this.remove(a,true)},domManip:function(a,b,d){function f(u){return c.nodeName(u,"table")?u.getElementsByTagName("tbody")[0]||
/* 109 */ u.appendChild(u.ownerDocument.createElement("tbody")):u}var e,j,i=a[0],o=[],k;if(!c.support.checkClone&&arguments.length===3&&typeof i==="string"&&ua.test(i))return this.each(function(){c(this).domManip(a,b,d,true)});if(c.isFunction(i))return this.each(function(u){var z=c(this);a[0]=i.call(this,u,b?z.html():w);z.domManip(a,b,d)});if(this[0]){e=i&&i.parentNode;e=c.support.parentNode&&e&&e.nodeType===11&&e.childNodes.length===this.length?{fragment:e}:sa(a,this,o);k=e.fragment;if(j=k.childNodes.length===
/* 110 */ 1?(k=k.firstChild):k.firstChild){b=b&&c.nodeName(j,"tr");for(var n=0,r=this.length;n<r;n++)d.call(b?f(this[n],j):this[n],n>0||e.cacheable||this.length>1?k.cloneNode(true):k)}o.length&&c.each(o,Qa)}return this}});c.fragments={};c.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){c.fn[a]=function(d){var f=[];d=c(d);var e=this.length===1&&this[0].parentNode;if(e&&e.nodeType===11&&e.childNodes.length===1&&d.length===1){d[b](this[0]);
/* 111 */ return this}else{e=0;for(var j=d.length;e<j;e++){var i=(e>0?this.clone(true):this).get();c.fn[b].apply(c(d[e]),i);f=f.concat(i)}return this.pushStack(f,a,d.selector)}}});c.extend({clean:function(a,b,d,f){b=b||s;if(typeof b.createElement==="undefined")b=b.ownerDocument||b[0]&&b[0].ownerDocument||s;for(var e=[],j=0,i;(i=a[j])!=null;j++){if(typeof i==="number")i+="";if(i){if(typeof i==="string"&&!jb.test(i))i=b.createTextNode(i);else if(typeof i==="string"){i=i.replace(Ka,Ma);var o=(La.exec(i)||["",
/* 112 */ ""])[1].toLowerCase(),k=F[o]||F._default,n=k[0],r=b.createElement("div");for(r.innerHTML=k[1]+i+k[2];n--;)r=r.lastChild;if(!c.support.tbody){n=ib.test(i);o=o==="table"&&!n?r.firstChild&&r.firstChild.childNodes:k[1]==="<table>"&&!n?r.childNodes:[];for(k=o.length-1;k>=0;--k)c.nodeName(o[k],"tbody")&&!o[k].childNodes.length&&o[k].parentNode.removeChild(o[k])}!c.support.leadingWhitespace&&V.test(i)&&r.insertBefore(b.createTextNode(V.exec(i)[0]),r.firstChild);i=r.childNodes}if(i.nodeType)e.push(i);else e=
/* 113 */ c.merge(e,i)}}if(d)for(j=0;e[j];j++)if(f&&c.nodeName(e[j],"script")&&(!e[j].type||e[j].type.toLowerCase()==="text/javascript"))f.push(e[j].parentNode?e[j].parentNode.removeChild(e[j]):e[j]);else{e[j].nodeType===1&&e.splice.apply(e,[j+1,0].concat(c.makeArray(e[j].getElementsByTagName("script"))));d.appendChild(e[j])}return e},cleanData:function(a){for(var b,d,f=c.cache,e=c.event.special,j=c.support.deleteExpando,i=0,o;(o=a[i])!=null;i++)if(d=o[c.expando]){b=f[d];if(b.events)for(var k in b.events)e[k]?
/* 114 */ c.event.remove(o,k):Ca(o,k,b.handle);if(j)delete o[c.expando];else o.removeAttribute&&o.removeAttribute(c.expando);delete f[d]}}});var kb=/z-?index|font-?weight|opacity|zoom|line-?height/i,Na=/alpha\([^)]*\)/,Oa=/opacity=([^)]*)/,ha=/float/i,ia=/-([a-z])/ig,lb=/([A-Z])/g,mb=/^-?\d+(?:px)?$/i,nb=/^-?\d/,ob={position:"absolute",visibility:"hidden",display:"block"},pb=["Left","Right"],qb=["Top","Bottom"],rb=s.defaultView&&s.defaultView.getComputedStyle,Pa=c.support.cssFloat?"cssFloat":"styleFloat",ja=
/* 115 */ function(a,b){return b.toUpperCase()};c.fn.css=function(a,b){return X(this,a,b,true,function(d,f,e){if(e===w)return c.curCSS(d,f);if(typeof e==="number"&&!kb.test(f))e+="px";c.style(d,f,e)})};c.extend({style:function(a,b,d){if(!a||a.nodeType===3||a.nodeType===8)return w;if((b==="width"||b==="height")&&parseFloat(d)<0)d=w;var f=a.style||a,e=d!==w;if(!c.support.opacity&&b==="opacity"){if(e){f.zoom=1;b=parseInt(d,10)+""==="NaN"?"":"alpha(opacity="+d*100+")";a=f.filter||c.curCSS(a,"filter")||"";f.filter=
/* 116 */ Na.test(a)?a.replace(Na,b):b}return f.filter&&f.filter.indexOf("opacity=")>=0?parseFloat(Oa.exec(f.filter)[1])/100+"":""}if(ha.test(b))b=Pa;b=b.replace(ia,ja);if(e)f[b]=d;return f[b]},css:function(a,b,d,f){if(b==="width"||b==="height"){var e,j=b==="width"?pb:qb;function i(){e=b==="width"?a.offsetWidth:a.offsetHeight;f!=="border"&&c.each(j,function(){f||(e-=parseFloat(c.curCSS(a,"padding"+this,true))||0);if(f==="margin")e+=parseFloat(c.curCSS(a,"margin"+this,true))||0;else e-=parseFloat(c.curCSS(a,
/* 117 */ "border"+this+"Width",true))||0})}a.offsetWidth!==0?i():c.swap(a,ob,i);return Math.max(0,Math.round(e))}return c.curCSS(a,b,d)},curCSS:function(a,b,d){var f,e=a.style;if(!c.support.opacity&&b==="opacity"&&a.currentStyle){f=Oa.test(a.currentStyle.filter||"")?parseFloat(RegExp.$1)/100+"":"";return f===""?"1":f}if(ha.test(b))b=Pa;if(!d&&e&&e[b])f=e[b];else if(rb){if(ha.test(b))b="float";b=b.replace(lb,"-$1").toLowerCase();e=a.ownerDocument.defaultView;if(!e)return null;if(a=e.getComputedStyle(a,null))f=
/* 118 */ a.getPropertyValue(b);if(b==="opacity"&&f==="")f="1"}else if(a.currentStyle){d=b.replace(ia,ja);f=a.currentStyle[b]||a.currentStyle[d];if(!mb.test(f)&&nb.test(f)){b=e.left;var j=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;e.left=d==="fontSize"?"1em":f||0;f=e.pixelLeft+"px";e.left=b;a.runtimeStyle.left=j}}return f},swap:function(a,b,d){var f={};for(var e in b){f[e]=a.style[e];a.style[e]=b[e]}d.call(a);for(e in b)a.style[e]=f[e]}});if(c.expr&&c.expr.filters){c.expr.filters.hidden=function(a){var b=
/* 119 */ a.offsetWidth,d=a.offsetHeight,f=a.nodeName.toLowerCase()==="tr";return b===0&&d===0&&!f?true:b>0&&d>0&&!f?false:c.curCSS(a,"display")==="none"};c.expr.filters.visible=function(a){return!c.expr.filters.hidden(a)}}var sb=J(),tb=/<script(.|\s)*?\/script>/gi,ub=/select|textarea/i,vb=/color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,N=/=\?(&|$)/,ka=/\?/,wb=/(\?|&)_=.*?(&|$)/,xb=/^(\w+:)?\/\/([^\/?#]+)/,yb=/%20/g,zb=c.fn.load;c.fn.extend({load:function(a,b,d){if(typeof a!==
/* 120 */ "string")return zb.call(this,a);else if(!this.length)return this;var f=a.indexOf(" ");if(f>=0){var e=a.slice(f,a.length);a=a.slice(0,f)}f="GET";if(b)if(c.isFunction(b)){d=b;b=null}else if(typeof b==="object"){b=c.param(b,c.ajaxSettings.traditional);f="POST"}var j=this;c.ajax({url:a,type:f,dataType:"html",data:b,complete:function(i,o){if(o==="success"||o==="notmodified")j.html(e?c("<div />").append(i.responseText.replace(tb,"")).find(e):i.responseText);d&&j.each(d,[i.responseText,o,i])}});return this},
/* 121 */ serialize:function(){return c.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?c.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ub.test(this.nodeName)||vb.test(this.type))}).map(function(a,b){a=c(this).val();return a==null?null:c.isArray(a)?c.map(a,function(d){return{name:b.name,value:d}}):{name:b.name,value:a}}).get()}});c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
/* 122 */ function(a,b){c.fn[b]=function(d){return this.bind(b,d)}});c.extend({get:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b=null}return c.ajax({type:"GET",url:a,data:b,success:d,dataType:f})},getScript:function(a,b){return c.get(a,null,b,"script")},getJSON:function(a,b,d){return c.get(a,b,d,"json")},post:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b={}}return c.ajax({type:"POST",url:a,data:b,success:d,dataType:f})},ajaxSetup:function(a){c.extend(c.ajaxSettings,a)},ajaxSettings:{url:location.href,
/* 123 */ global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:A.XMLHttpRequest&&(A.location.protocol!=="file:"||!A.ActiveXObject)?function(){return new A.XMLHttpRequest}:function(){try{return new A.ActiveXObject("Microsoft.XMLHTTP")}catch(a){}},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},etag:{},ajax:function(a){function b(){e.success&&
/* 124 */ e.success.call(k,o,i,x);e.global&&f("ajaxSuccess",[x,e])}function d(){e.complete&&e.complete.call(k,x,i);e.global&&f("ajaxComplete",[x,e]);e.global&&!--c.active&&c.event.trigger("ajaxStop")}function f(q,p){(e.context?c(e.context):c.event).trigger(q,p)}var e=c.extend(true,{},c.ajaxSettings,a),j,i,o,k=a&&a.context||e,n=e.type.toUpperCase();if(e.data&&e.processData&&typeof e.data!=="string")e.data=c.param(e.data,e.traditional);if(e.dataType==="jsonp"){if(n==="GET")N.test(e.url)||(e.url+=(ka.test(e.url)?
/* 125 */ "&":"?")+(e.jsonp||"callback")+"=?");else if(!e.data||!N.test(e.data))e.data=(e.data?e.data+"&":"")+(e.jsonp||"callback")+"=?";e.dataType="json"}if(e.dataType==="json"&&(e.data&&N.test(e.data)||N.test(e.url))){j=e.jsonpCallback||"jsonp"+sb++;if(e.data)e.data=(e.data+"").replace(N,"="+j+"$1");e.url=e.url.replace(N,"="+j+"$1");e.dataType="script";A[j]=A[j]||function(q){o=q;b();d();A[j]=w;try{delete A[j]}catch(p){}z&&z.removeChild(C)}}if(e.dataType==="script"&&e.cache===null)e.cache=false;if(e.cache===
/* 126 */ false&&n==="GET"){var r=J(),u=e.url.replace(wb,"$1_="+r+"$2");e.url=u+(u===e.url?(ka.test(e.url)?"&":"?")+"_="+r:"")}if(e.data&&n==="GET")e.url+=(ka.test(e.url)?"&":"?")+e.data;e.global&&!c.active++&&c.event.trigger("ajaxStart");r=(r=xb.exec(e.url))&&(r[1]&&r[1]!==location.protocol||r[2]!==location.host);if(e.dataType==="script"&&n==="GET"&&r){var z=s.getElementsByTagName("head")[0]||s.documentElement,C=s.createElement("script");C.src=e.url;if(e.scriptCharset)C.charset=e.scriptCharset;if(!j){var B=
/* 127 */ false;C.onload=C.onreadystatechange=function(){if(!B&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){B=true;b();d();C.onload=C.onreadystatechange=null;z&&C.parentNode&&z.removeChild(C)}}}z.insertBefore(C,z.firstChild);return w}var E=false,x=e.xhr();if(x){e.username?x.open(n,e.url,e.async,e.username,e.password):x.open(n,e.url,e.async);try{if(e.data||a&&a.contentType)x.setRequestHeader("Content-Type",e.contentType);if(e.ifModified){c.lastModified[e.url]&&x.setRequestHeader("If-Modified-Since",
/* 128 */ c.lastModified[e.url]);c.etag[e.url]&&x.setRequestHeader("If-None-Match",c.etag[e.url])}r||x.setRequestHeader("X-Requested-With","XMLHttpRequest");x.setRequestHeader("Accept",e.dataType&&e.accepts[e.dataType]?e.accepts[e.dataType]+", */*":e.accepts._default)}catch(ga){}if(e.beforeSend&&e.beforeSend.call(k,x,e)===false){e.global&&!--c.active&&c.event.trigger("ajaxStop");x.abort();return false}e.global&&f("ajaxSend",[x,e]);var g=x.onreadystatechange=function(q){if(!x||x.readyState===0||q==="abort"){E||
/* 129 */ d();E=true;if(x)x.onreadystatechange=c.noop}else if(!E&&x&&(x.readyState===4||q==="timeout")){E=true;x.onreadystatechange=c.noop;i=q==="timeout"?"timeout":!c.httpSuccess(x)?"error":e.ifModified&&c.httpNotModified(x,e.url)?"notmodified":"success";var p;if(i==="success")try{o=c.httpData(x,e.dataType,e)}catch(v){i="parsererror";p=v}if(i==="success"||i==="notmodified")j||b();else c.handleError(e,x,i,p);d();q==="timeout"&&x.abort();if(e.async)x=null}};try{var h=x.abort;x.abort=function(){x&&h.call(x);
/* 130 */ g("abort")}}catch(l){}e.async&&e.timeout>0&&setTimeout(function(){x&&!E&&g("timeout")},e.timeout);try{x.send(n==="POST"||n==="PUT"||n==="DELETE"?e.data:null)}catch(m){c.handleError(e,x,null,m);d()}e.async||g();return x}},handleError:function(a,b,d,f){if(a.error)a.error.call(a.context||a,b,d,f);if(a.global)(a.context?c(a.context):c.event).trigger("ajaxError",[b,a,f])},active:0,httpSuccess:function(a){try{return!a.status&&location.protocol==="file:"||a.status>=200&&a.status<300||a.status===304||a.status===
/* 131 */ 1223||a.status===0}catch(b){}return false},httpNotModified:function(a,b){var d=a.getResponseHeader("Last-Modified"),f=a.getResponseHeader("Etag");if(d)c.lastModified[b]=d;if(f)c.etag[b]=f;return a.status===304||a.status===0},httpData:function(a,b,d){var f=a.getResponseHeader("content-type")||"",e=b==="xml"||!b&&f.indexOf("xml")>=0;a=e?a.responseXML:a.responseText;e&&a.documentElement.nodeName==="parsererror"&&c.error("parsererror");if(d&&d.dataFilter)a=d.dataFilter(a,b);if(typeof a==="string")if(b===
/* 132 */ "json"||!b&&f.indexOf("json")>=0)a=c.parseJSON(a);else if(b==="script"||!b&&f.indexOf("javascript")>=0)c.globalEval(a);return a},param:function(a,b){function d(i,o){if(c.isArray(o))c.each(o,function(k,n){b||/\[\]$/.test(i)?f(i,n):d(i+"["+(typeof n==="object"||c.isArray(n)?k:"")+"]",n)});else!b&&o!=null&&typeof o==="object"?c.each(o,function(k,n){d(i+"["+k+"]",n)}):f(i,o)}function f(i,o){o=c.isFunction(o)?o():o;e[e.length]=encodeURIComponent(i)+"="+encodeURIComponent(o)}var e=[];if(b===w)b=c.ajaxSettings.traditional;
/* 133 */ if(c.isArray(a)||a.jquery)c.each(a,function(){f(this.name,this.value)});else for(var j in a)d(j,a[j]);return e.join("&").replace(yb,"+")}});var la={},Ab=/toggle|show|hide/,Bb=/^([+-]=)?([\d+-.]+)(.*)$/,W,va=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];c.fn.extend({show:function(a,b){if(a||a===0)return this.animate(K("show",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");
/* 134 */ this[a].style.display=d||"";if(c.css(this[a],"display")==="none"){d=this[a].nodeName;var f;if(la[d])f=la[d];else{var e=c("<"+d+" />").appendTo("body");f=e.css("display");if(f==="none")f="block";e.remove();la[d]=f}c.data(this[a],"olddisplay",f)}}a=0;for(b=this.length;a<b;a++)this[a].style.display=c.data(this[a],"olddisplay")||"";return this}},hide:function(a,b){if(a||a===0)return this.animate(K("hide",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");!d&&d!=="none"&&c.data(this[a],
/* 135 */ "olddisplay",c.css(this[a],"display"))}a=0;for(b=this.length;a<b;a++)this[a].style.display="none";return this}},_toggle:c.fn.toggle,toggle:function(a,b){var d=typeof a==="boolean";if(c.isFunction(a)&&c.isFunction(b))this._toggle.apply(this,arguments);else a==null||d?this.each(function(){var f=d?a:c(this).is(":hidden");c(this)[f?"show":"hide"]()}):this.animate(K("toggle",3),a,b);return this},fadeTo:function(a,b,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,d)},
/* 136 */ animate:function(a,b,d,f){var e=c.speed(b,d,f);if(c.isEmptyObject(a))return this.each(e.complete);return this[e.queue===false?"each":"queue"](function(){var j=c.extend({},e),i,o=this.nodeType===1&&c(this).is(":hidden"),k=this;for(i in a){var n=i.replace(ia,ja);if(i!==n){a[n]=a[i];delete a[i];i=n}if(a[i]==="hide"&&o||a[i]==="show"&&!o)return j.complete.call(this);if((i==="height"||i==="width")&&this.style){j.display=c.css(this,"display");j.overflow=this.style.overflow}if(c.isArray(a[i])){(j.specialEasing=
/* 137 */ j.specialEasing||{})[i]=a[i][1];a[i]=a[i][0]}}if(j.overflow!=null)this.style.overflow="hidden";j.curAnim=c.extend({},a);c.each(a,function(r,u){var z=new c.fx(k,j,r);if(Ab.test(u))z[u==="toggle"?o?"show":"hide":u](a);else{var C=Bb.exec(u),B=z.cur(true)||0;if(C){u=parseFloat(C[2]);var E=C[3]||"px";if(E!=="px"){k.style[r]=(u||1)+E;B=(u||1)/z.cur(true)*B;k.style[r]=B+E}if(C[1])u=(C[1]==="-="?-1:1)*u+B;z.custom(B,u,E)}else z.custom(B,u,"")}});return true})},stop:function(a,b){var d=c.timers;a&&this.queue([]);
/* 138 */ this.each(function(){for(var f=d.length-1;f>=0;f--)if(d[f].elem===this){b&&d[f](true);d.splice(f,1)}});b||this.dequeue();return this}});c.each({slideDown:K("show",1),slideUp:K("hide",1),slideToggle:K("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(a,b){c.fn[a]=function(d,f){return this.animate(b,d,f)}});c.extend({speed:function(a,b,d){var f=a&&typeof a==="object"?a:{complete:d||!d&&b||c.isFunction(a)&&a,duration:a,easing:d&&b||b&&!c.isFunction(b)&&b};f.duration=c.fx.off?0:typeof f.duration===
/* 139 */ "number"?f.duration:c.fx.speeds[f.duration]||c.fx.speeds._default;f.old=f.complete;f.complete=function(){f.queue!==false&&c(this).dequeue();c.isFunction(f.old)&&f.old.call(this)};return f},easing:{linear:function(a,b,d,f){return d+f*a},swing:function(a,b,d,f){return(-Math.cos(a*Math.PI)/2+0.5)*f+d}},timers:[],fx:function(a,b,d){this.options=b;this.elem=a;this.prop=d;if(!b.orig)b.orig={}}});c.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this);(c.fx.step[this.prop]||
/* 140 */ c.fx.step._default)(this);if((this.prop==="height"||this.prop==="width")&&this.elem.style)this.elem.style.display="block"},cur:function(a){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];return(a=parseFloat(c.css(this.elem,this.prop,a)))&&a>-10000?a:parseFloat(c.curCSS(this.elem,this.prop))||0},custom:function(a,b,d){function f(j){return e.step(j)}this.startTime=J();this.start=a;this.end=b;this.unit=d||this.unit||"px";this.now=this.start;
/* 141 */ this.pos=this.state=0;var e=this;f.elem=this.elem;if(f()&&c.timers.push(f)&&!W)W=setInterval(c.fx.tick,13)},show:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());c(this.elem).show()},hide:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(a){var b=J(),d=true;if(a||b>=this.options.duration+this.startTime){this.now=
/* 142 */ this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var f in this.options.curAnim)if(this.options.curAnim[f]!==true)d=false;if(d){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;a=c.data(this.elem,"olddisplay");this.elem.style.display=a?a:this.options.display;if(c.css(this.elem,"display")==="none")this.elem.style.display="block"}this.options.hide&&c(this.elem).hide();if(this.options.hide||this.options.show)for(var e in this.options.curAnim)c.style(this.elem,
/* 143 */ e,this.options.orig[e]);this.options.complete.call(this.elem)}return false}else{e=b-this.startTime;this.state=e/this.options.duration;a=this.options.easing||(c.easing.swing?"swing":"linear");this.pos=c.easing[this.options.specialEasing&&this.options.specialEasing[this.prop]||a](this.state,e,0,1,this.options.duration);this.now=this.start+(this.end-this.start)*this.pos;this.update()}return true}};c.extend(c.fx,{tick:function(){for(var a=c.timers,b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||
/* 144 */ c.fx.stop()},stop:function(){clearInterval(W);W=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){c.style(a.elem,"opacity",a.now)},_default:function(a){if(a.elem.style&&a.elem.style[a.prop]!=null)a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit;else a.elem[a.prop]=a.now}}});if(c.expr&&c.expr.filters)c.expr.filters.animated=function(a){return c.grep(c.timers,function(b){return a===b.elem}).length};c.fn.offset="getBoundingClientRect"in s.documentElement?
/* 145 */ function(a){var b=this[0];if(a)return this.each(function(e){c.offset.setOffset(this,a,e)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);var d=b.getBoundingClientRect(),f=b.ownerDocument;b=f.body;f=f.documentElement;return{top:d.top+(self.pageYOffset||c.support.boxModel&&f.scrollTop||b.scrollTop)-(f.clientTop||b.clientTop||0),left:d.left+(self.pageXOffset||c.support.boxModel&&f.scrollLeft||b.scrollLeft)-(f.clientLeft||b.clientLeft||0)}}:function(a){var b=
/* 146 */ this[0];if(a)return this.each(function(r){c.offset.setOffset(this,a,r)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);c.offset.initialize();var d=b.offsetParent,f=b,e=b.ownerDocument,j,i=e.documentElement,o=e.body;f=(e=e.defaultView)?e.getComputedStyle(b,null):b.currentStyle;for(var k=b.offsetTop,n=b.offsetLeft;(b=b.parentNode)&&b!==o&&b!==i;){if(c.offset.supportsFixedPosition&&f.position==="fixed")break;j=e?e.getComputedStyle(b,null):b.currentStyle;
/* 147 */ k-=b.scrollTop;n-=b.scrollLeft;if(b===d){k+=b.offsetTop;n+=b.offsetLeft;if(c.offset.doesNotAddBorder&&!(c.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(b.nodeName))){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=d;d=b.offsetParent}if(c.offset.subtractsBorderForOverflowNotVisible&&j.overflow!=="visible"){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=j}if(f.position==="relative"||f.position==="static"){k+=o.offsetTop;n+=o.offsetLeft}if(c.offset.supportsFixedPosition&&
/* 148 */ f.position==="fixed"){k+=Math.max(i.scrollTop,o.scrollTop);n+=Math.max(i.scrollLeft,o.scrollLeft)}return{top:k,left:n}};c.offset={initialize:function(){var a=s.body,b=s.createElement("div"),d,f,e,j=parseFloat(c.curCSS(a,"marginTop",true))||0;c.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});b.innerHTML="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
/* 149 */ a.insertBefore(b,a.firstChild);d=b.firstChild;f=d.firstChild;e=d.nextSibling.firstChild.firstChild;this.doesNotAddBorder=f.offsetTop!==5;this.doesAddBorderForTableAndCells=e.offsetTop===5;f.style.position="fixed";f.style.top="20px";this.supportsFixedPosition=f.offsetTop===20||f.offsetTop===15;f.style.position=f.style.top="";d.style.overflow="hidden";d.style.position="relative";this.subtractsBorderForOverflowNotVisible=f.offsetTop===-5;this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==j;a.removeChild(b);
/* 150 */ c.offset.initialize=c.noop},bodyOffset:function(a){var b=a.offsetTop,d=a.offsetLeft;c.offset.initialize();if(c.offset.doesNotIncludeMarginInBodyOffset){b+=parseFloat(c.curCSS(a,"marginTop",true))||0;d+=parseFloat(c.curCSS(a,"marginLeft",true))||0}return{top:b,left:d}},setOffset:function(a,b,d){if(/static/.test(c.curCSS(a,"position")))a.style.position="relative";var f=c(a),e=f.offset(),j=parseInt(c.curCSS(a,"top",true),10)||0,i=parseInt(c.curCSS(a,"left",true),10)||0;if(c.isFunction(b))b=b.call(a,

/* core.js */

/* 151 */ d,e);d={top:b.top-e.top+j,left:b.left-e.left+i};"using"in b?b.using.call(a,d):f.css(d)}};c.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),d=this.offset(),f=/^body|html$/i.test(b[0].nodeName)?{top:0,left:0}:b.offset();d.top-=parseFloat(c.curCSS(a,"marginTop",true))||0;d.left-=parseFloat(c.curCSS(a,"marginLeft",true))||0;f.top+=parseFloat(c.curCSS(b[0],"borderTopWidth",true))||0;f.left+=parseFloat(c.curCSS(b[0],"borderLeftWidth",true))||0;return{top:d.top-
/* 152 */ f.top,left:d.left-f.left}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||s.body;a&&!/^body|html$/i.test(a.nodeName)&&c.css(a,"position")==="static";)a=a.offsetParent;return a})}});c.each(["Left","Top"],function(a,b){var d="scroll"+b;c.fn[d]=function(f){var e=this[0],j;if(!e)return null;if(f!==w)return this.each(function(){if(j=wa(this))j.scrollTo(!a?f:c(j).scrollLeft(),a?f:c(j).scrollTop());else this[d]=f});else return(j=wa(e))?"pageXOffset"in j?j[a?"pageYOffset":
/* 153 */ "pageXOffset"]:c.support.boxModel&&j.document.documentElement[d]||j.document.body[d]:e[d]}});c.each(["Height","Width"],function(a,b){var d=b.toLowerCase();c.fn["inner"+b]=function(){return this[0]?c.css(this[0],d,false,"padding"):null};c.fn["outer"+b]=function(f){return this[0]?c.css(this[0],d,false,f?"margin":"border"):null};c.fn[d]=function(f){var e=this[0];if(!e)return f==null?null:this;if(c.isFunction(f))return this.each(function(j){var i=c(this);i[d](f.call(this,j,i[d]()))});return"scrollTo"in
/* 154 */ e&&e.document?e.document.compatMode==="CSS1Compat"&&e.document.documentElement["client"+b]||e.document.body["client"+b]:e.nodeType===9?Math.max(e.documentElement["client"+b],e.body["scroll"+b],e.documentElement["scroll"+b],e.body["offset"+b],e.documentElement["offset"+b]):f===w?c.css(e,d):this.css(d,typeof f==="string"?f:f+"px")}});A.jQuery=A.$=c})(window);
/* 155 */ 
/* 156 */ 
/* 157 */ /*!
/* 158 *|  * jQuery i18n plugin
/* 159 *|  * @requires jQuery v1.1 or later
/* 160 *|  *
/* 161 *|  * See https://github.com/recurser/jquery-i18n
/* 162 *|  *
/* 163 *|  * Licensed under the MIT license.
/* 164 *|  *
/* 165 *|  * Version: 1.1.1 (Sun, 05 Jan 2014 05:26:50 GMT)
/* 166 *|  */
/* 167 */ !function(a){var b=Array.prototype.slice,c={dict:null,load:function(b){null!==this.dict?a.extend(this.dict,b):this.dict=b},_:function(a){return dict=this.dict,dict&&dict.hasOwnProperty(a)&&(a=dict[a]),args=b.call(arguments),args[0]=a,this.printf.apply(this,args)},printf:function(c,d){return arguments.length<2?c:(d=a.isArray(d)?d:b.call(arguments,1),c.replace(/([^%]|^)%(?:(\d+)\$)?s/g,function(a,b,c){return c?b+d[parseInt(c)-1]:b+d.shift()}).replace(/%%s/g,"%s"))}};a.fn._t=function(){return a(this).html(c._.apply(c,arguments))},a.i18n=c}(jQuery);

;
/* interface.js */

/* 1  */ /*
/* 2  *|  * Interface elements for jQuery - http://interface.eyecon.ro
/* 3  *|  *
/* 4  *|  * Copyright (c) 2006 Stefan Petre
/* 5  *|  * Dual licensed under the MIT (MIT-LICENSE.txt) 
/* 6  *|  * and GPL (GPL-LICENSE.txt) licenses.
/* 7  *|  */
/* 8  */  jQuery.noConflict();
/* 9  */  eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('6.15={3o:d(e){7 x=0;7 y=0;7 1Q=1A;7 A=e.L;8(6(e).H(\'Q\')==\'U\'){1E=A.1a;2y=A.O;A.1a=\'1F\';A.Q=\'1Y\';A.O=\'2e\';1Q=26}7 4=e;2P(4){x+=4.3B+(4.1I&&!6.3p.41?F(4.1I.2X)||0:0);y+=4.3x+(4.1I&&!6.3p.41?F(4.1I.2Z)||0:0);4=4.4e}4=e;2P(4&&4.4a&&4.4a.39()!=\'V\'){x-=4.1D||0;y-=4.1s||0;4=4.2x}8(1Q){A.Q=\'U\';A.O=2y;A.1a=1E}q{x:x,y:y}},4E:d(4){7 x=0,y=0;2P(4){x+=4.3B||0;y+=4.3x||0;4=4.4e}q{x:x,y:y}},35:d(e){7 w=6.H(e,\'1T\');7 h=6.H(e,\'36\');7 1e=0;7 1o=0;7 A=e.L;8(6(e).H(\'Q\')!=\'U\'){1e=e.1z;1o=e.2s}u{1E=A.1a;2y=A.O;A.1a=\'1F\';A.Q=\'1Y\';A.O=\'2e\';1e=e.1z;1o=e.2s;A.Q=\'U\';A.O=2y;A.1a=1E}q{w:w,h:h,1e:1e,1o:1o}},4P:d(4){q{1e:4.1z||0,1o:4.2s||0}},58:d(e){7 h,w,22;8(e){w=e.2a;h=e.29}u{22=D.Y;w=2z.3c||2N.3c||(22&&22.2a)||D.V.2a;h=2z.31||2N.31||(22&&22.29)||D.V.29}q{w:w,h:h}},3P:d(e){7 t,l,w,h,1J,1R;8(e&&e.2E.39()!=\'V\'){t=e.1s;l=e.1D;w=e.3j;h=e.3e;1J=0;1R=0}u{8(D.Y&&D.Y.1s){t=D.Y.1s;l=D.Y.1D;w=D.Y.3j;h=D.Y.3e}u 8(D.V){t=D.V.1s;l=D.V.1D;w=D.V.3j;h=D.V.3e}1J=2N.3c||D.Y.2a||D.V.2a||0;1R=2N.31||D.Y.29||D.V.29||0}q{t:t,l:l,w:w,h:h,1J:1J,1R:1R}},3L:d(e,1U){7 4=6(e);7 t=4.H(\'2j\')||\'\';7 r=4.H(\'2k\')||\'\';7 b=4.H(\'2n\')||\'\';7 l=4.H(\'2l\')||\'\';8(1U)q{t:F(t)||0,r:F(r)||0,b:F(b)||0,l:F(l)};u q{t:t,r:r,b:b,l:l}},56:d(e,1U){7 4=6(e);7 t=4.H(\'3w\')||\'\';7 r=4.H(\'3u\')||\'\';7 b=4.H(\'3s\')||\'\';7 l=4.H(\'3t\')||\'\';8(1U)q{t:F(t)||0,r:F(r)||0,b:F(b)||0,l:F(l)};u q{t:t,r:r,b:b,l:l}},4Z:d(e,1U){7 4=6(e);7 t=4.H(\'2Z\')||\'\';7 r=4.H(\'3G\')||\'\';7 b=4.H(\'3y\')||\'\';7 l=4.H(\'2X\')||\'\';8(1U)q{t:F(t)||0,r:F(r)||0,b:F(b)||0,l:F(l)||0};u q{t:t,r:r,b:b,l:l}},3T:d(2i){7 x=2i.53||(2i.52+(D.Y.1D||D.V.1D))||0;7 y=2i.51||(2i.54+(D.Y.1s||D.V.1s))||0;q{x:x,y:y}},3h:d(12,3g){3g(12);12=12.3F;2P(12){6.15.3h(12,3g);12=12.5a}},59:d(12){6.15.3h(12,d(4){S(7 1j 1q 4){8(2R 4[1j]===\'d\'){4[1j]=20}}})},57:d(4,27){7 1b=jQuery.15.3P();7 3l=jQuery.15.35(4);8(!27||27==\'4Y\')jQuery(4).H({X:1b.t+((1i.3S(1b.h,1b.1R)-1b.t-3l.1o)/2)+\'K\'});8(!27||27==\'4Q\')jQuery(4).H({N:1b.l+((1i.3S(1b.w,1b.1J)-1b.l-3l.1e)/2)+\'K\'})},4O:d(4,3U){7 3V=jQuery(\'3q[@2u*="2w"]\',4||D),2w;3V.1V(d(){2w=k.2u;k.2u=3U;k.L.4M="4N:4R.4S.4W(2u=\'"+2w+"\')"})}};[].4i||(4V.4U.4i=d(v,n){n=(n==20)?0:n;7 m=k.1m;S(7 i=n;i<m;i++)8(k[i]==v)q i;q-1});6.3A=d(e){8(/^4T$|^4L$|^5b$|^5c$|^5t$|^5s$|^5r$|^5q$|^5u$|^V$|^5v$|^5z$|^5y$|^5x$|^5w$|^5p$|^5o$/i.2q(e.2E))q 1A;u q 26};6.E.5h=d(e,1p){7 c=e.3F;7 1d=c.L;1d.O=1p.O;1d.2j=1p.18.t;1d.2l=1p.18.l;1d.2n=1p.18.b;1d.2k=1p.18.r;1d.X=1p.X+\'K\';1d.N=1p.N+\'K\';e.2x.4f(c,e);e.2x.5g(e)};6.E.5f=d(e){8(!6.3A(e))q 1A;7 t=6(e);7 A=e.L;7 1Q=1A;7 J={};J.O=t.H(\'O\');8(t.H(\'Q\')==\'U\'){1E=t.H(\'1a\');A.1a=\'1F\';A.Q=\'\';1Q=26}J.32=6.15.35(e);J.18=6.15.3L(e);7 2Y=e.1I?e.1I.4g:t.H(\'5d\');J.X=F(t.H(\'X\'))||0;J.N=F(t.H(\'N\'))||0;7 3J=\'5e\'+F(1i.5i()*4p);7 1x=D.5j(/^3q$|^5n$|^5m$|^5l$|^5k$|^5A$|^2V$|^4u$|^4y$|^4z$|^4x$|^4v$|^4s$|^4H$/i.2q(e.2E)?\'4J\':e.2E);6.1j(1x,\'4F\',3J);1x.3X=\'4B\';7 R=1x.L;7 X=0;7 N=0;8(J.O==\'33\'||J.O==\'2e\'){X=J.X;N=J.N}R.Q=\'U\';R.X=X+\'K\';R.N=N+\'K\';R.O=J.O!=\'33\'&&J.O!=\'2e\'?\'33\':J.O;R.2K=\'1F\';R.36=J.32.1o+\'K\';R.1T=J.32.1e+\'K\';R.2j=J.18.t;R.2k=J.18.r;R.2n=J.18.b;R.2l=J.18.l;8(6.3p.4G){R.4g=2Y}u{R.4D=2Y}e.2x.4f(1x,e);A.2j=\'1M\';A.2k=\'1M\';A.2n=\'1M\';A.2l=\'1M\';A.O=\'2e\';A.4C=\'U\';A.X=\'1M\';A.N=\'1M\';8(1Q){A.Q=\'U\';A.1a=1E}1x.4A(e);R.Q=\'1Y\';q{J:J,4I:6(1x)}};6.E.2f={4K:[0,B,B],4r:[3E,B,B],4w:[4l,4l,4t],4X:[0,0,0],60:[0,0,B],6P:[3H,42,42],6O:[0,B,B],6N:[0,0,1L],6L:[0,1L,1L],6M:[3b,3b,3b],6Q:[0,6R,0],6W:[6V,6U,4k],6S:[1L,0,1L],6T:[6K,4k,47],6J:[B,3I,0],6B:[6A,50,6z],6x:[1L,0,0],6Y:[6C,6D,6I],6H:[6G,0,2U],6E:[B,0,B],6F:[B,6X,0],7a:[0,1v,0],7j:[75,0,7i],7f:[3E,3v,3I],7e:[7h,7l,3v],7g:[3r,B,B],7c:[4c,7d,4c],72:[2U,2U,2U],71:[B,70,74],76:[B,B,3r],7b:[0,B,0],79:[B,0,B],77:[1v,0,0],78:[0,0,1v],6Z:[1v,1v,0],73:[B,3H,0],7k:[B,2I,6y],6v:[1v,0,1v],5V:[B,0,0],5U:[2I,2I,2I],5T:[B,B,B],5R:[B,B,0]};6.E.1w=d(16,3z){8(6.E.2f[16])q{r:6.E.2f[16][0],g:6.E.2f[16][1],b:6.E.2f[16][2]};u 8(M=/^1N\\(\\s*([0-9]{1,3})\\s*,\\s*([0-9]{1,3})\\s*,\\s*([0-9]{1,3})\\s*\\)$/.2A(16))q{r:F(M[1]),g:F(M[2]),b:F(M[3])};u 8(M=/1N\\(\\s*([0-9]+(?:\\.[0-9]+)?)\\%\\s*,\\s*([0-9]+(?:\\.[0-9]+)?)\\%\\s*,\\s*([0-9]+(?:\\.[0-9]+)?)\\%\\s*\\)$/.2A(16))q{r:Z(M[1])*2.55,g:Z(M[2])*2.55,b:Z(M[3])*2.55};u 8(M=/^#([a-1H-1B-9])([a-1H-1B-9])([a-1H-1B-9])$/.2A(16))q{r:F("1C"+M[1]+M[1]),g:F("1C"+M[2]+M[2]),b:F("1C"+M[3]+M[3])};u 8(M=/^#([a-1H-1B-9]{2})([a-1H-1B-9]{2})([a-1H-1B-9]{2})$/.2A(16))q{r:F("1C"+M[1]),g:F("1C"+M[2]),b:F("1C"+M[3])};u q 3z==26?1A:{r:B,g:B,b:B}};6.E.4n={3y:1,2X:1,3G:1,2Z:1,5S:1,5B:1,36:1,N:1,5W:1,5X:1,2n:1,2l:1,2k:1,2j:1,62:1,2T:1,61:1,6w:1,1f:1,5Y:1,5Z:1,3s:1,3t:1,3u:1,3w:1,38:1,5Q:1,X:1,1T:1,2O:1};6.E.49={5P:1,5G:1,5H:1,5F:1,5E:1,16:1,5C:1};6.E.25=[\'5D\',\'5I\',\'5J\',\'5O\'];6.E.3k={\'3d\':[\'24\',\'3W\'],\'2B\':[\'24\',\'3f\'],\'2D\':[\'2D\',\'\'],\'2C\':[\'2C\',\'\']};6.3Q.4b({5N:d(1h,1G,P,2v){q k.2d(d(){7 2t=6.1G(1G,P,2v);7 e=28 6.4m(k,2t,1h)})},37:d(1G,2v){q k.2d(d(){7 2t=6.1G(1G,2v);7 e=28 6.37(k,2t)})},5M:d(14){q k.1V(d(){8(k.1n)6.3m(k,14)})},5K:d(14){q k.1V(d(){8(k.1n)6.3m(k,14);8(k.2d&&k.2d[\'E\'])k.2d.E=[]})}});6.4b({37:d(C,o){7 z=k,4o;z.14=d(){8(6.43(o.2M))o.2M.3Z(C)};z.2h=3O(d(){z.14()},o.1k);C.1n=z},P:{4q:d(p,n,4j,4d,1k){q((-1i.5L(p*1i.63)/2)+0.5)*4d+4j}},4m:d(C,o,1h){7 z=k,4o;7 y=C.L;7 44=6.H(C,"2K");7 1O=6.H(C,"Q");7 G={};z.2L=(28 46()).48();o.P=o.P&&6.P[o.P]?o.P:\'4q\';z.2Q=d(I,W){8(6.E.4n[I]){8(W==\'2H\'||W==\'2G\'||W==\'3N\'){8(!C.1r)C.1r={};7 r=Z(6.1y(C,I));C.1r[I]=r&&r>-4p?r:(Z(6.H(C,I))||0);W=W==\'3N\'?(1O==\'U\'?\'2H\':\'2G\'):W;o[W]=26;G[I]=W==\'2H\'?[0,C.1r[I]]:[C.1r[I],0];8(I!=\'1f\')y[I]=G[I][0]+(I!=\'2O\'&&I!=\'34\'?\'K\':\'\');u 6.1j(y,"1f",G[I][0])}u{G[I]=[Z(6.1y(C,I)),Z(W)||0]}}u 8(6.E.49[I])G[I]=[6.E.1w(6.1y(C,I)),6.E.1w(W)];u 8(/^2D$|2C$|24$|2B$|3d$/i.2q(I)){7 m=W.1t(/\\s+/g,\' \').1t(/1N\\s*\\(\\s*/g,\'1N(\').1t(/\\s*,\\s*/g,\',\').1t(/\\s*\\)/g,\')\').64(/([^\\s]+)/g);6n(I){2b\'2D\':2b\'2C\':2b\'3d\':2b\'2B\':m[3]=m[3]||m[1]||m[0];m[2]=m[2]||m[0];m[1]=m[1]||m[0];S(7 i=0;i<6.E.25.1m;i++){7 1l=6.E.3k[I][0]+6.E.25[i]+6.E.3k[I][1];G[1l]=I==\'2B\'?[6.E.1w(6.1y(C,1l)),6.E.1w(m[i])]:[Z(6.1y(C,1l)),Z(m[i])]}3R;2b\'24\':S(7 i=0;i<m.1m;i++){7 3n=Z(m[i]);7 2r=!6m(3n)?\'3W\':(!/6l|U|1F|6j|6k|6o|6p|6u|6t|6s|6q/i.2q(m[i])?\'3f\':1A);8(2r){S(7 j=0;j<6.E.25.1m;j++){1l=\'24\'+6.E.25[j]+2r;G[1l]=2r==\'3f\'?[6.E.1w(6.1y(C,1l)),6.E.1w(m[i])]:[Z(6.1y(C,1l)),3n]}}u{y[\'6r\']=m[i]}}3R}}u{y[I]=W}q 1A};S(p 1q 1h){8(p==\'L\'){7 1c=6.30(1h[p]);S(1P 1q 1c){k.2Q(1P,1c[1P])}}u 8(p==\'3X\'){8(D.2S)S(7 i=0;i<D.2S.1m;i++){7 1K=D.2S[i].1K||D.2S[i].6i||20;8(1K){S(7 j=0;j<1K.1m;j++){8(1K[j].6h==\'.\'+1h[p]){7 1X=28 69(\'\\.\'+1h[p]+\' {\');7 1g=1K[j].L.68;7 1c=6.30(1g.1t(1X,\'\').1t(/}/g,\'\'));S(1P 1q 1c){k.2Q(1P,1c[1P])}}}}}}u{k.2Q(p,1h[p])}}y.Q=1O==\'U\'?\'1Y\':1O;y.2K=\'1F\';z.14=d(){7 t=(28 46()).48();8(t>o.1k+z.2L){4h(z.2h);z.2h=20;S(p 1q G){8(p=="1f")6.1j(y,"1f",G[p][1]);u 8(2R G[p][1]==\'2V\')y[p]=\'1N(\'+G[p][1].r+\',\'+G[p][1].g+\',\'+G[p][1].b+\')\';u y[p]=G[p][1]+(p!=\'2O\'&&p!=\'34\'?\'K\':\'\')}8(o.2G||o.2H)S(7 p 1q C.1r)8(p=="1f")6.1j(y,p,C.1r[p]);u y[p]="";y.Q=o.2G?\'U\':(1O!=\'U\'?1O:\'1Y\');y.2K=44;C.1n=20;8(6.43(o.2M))o.2M.3Z(C)}u{7 n=t-k.2L;7 2c=n/o.1k;S(p 1q G){8(2R G[p][1]==\'2V\'){y[p]=\'1N(\'+F(6.P[o.P](2c,n,G[p][0].r,(G[p][1].r-G[p][0].r),o.1k))+\',\'+F(6.P[o.P](2c,n,G[p][0].g,(G[p][1].g-G[p][0].g),o.1k))+\',\'+F(6.P[o.P](2c,n,G[p][0].b,(G[p][1].b-G[p][0].b),o.1k))+\')\'}u{7 2W=6.P[o.P](2c,n,G[p][0],(G[p][1]-G[p][0]),o.1k);8(p=="1f")6.1j(y,"1f",2W);u y[p]=2W+(p!=\'2O\'&&p!=\'34\'?\'K\':\'\')}}}};z.2h=3O(d(){z.14()},13);C.1n=z},3m:d(C,14){8(14)C.1n.2L-=67;u{2z.4h(C.1n.2h);C.1n=20;6.65(C,"E")}}});6.30=d(1g){7 1c={};8(2R 1g==\'66\'){1g=1g.39().40(\';\');S(7 i=0;i<1g.1m;i++){1X=1g[i].40(\':\');8(1X.1m==2){1c[6.45(1X[0].1t(/\\-(\\w)/g,d(m,c){q c.6a()}))]=6.45(1X[1])}}}q 1c};6.1u={3K:d(o){q k.1V(d(){7 4=k;4.f={10:6(o.10,k),23:6(o.23,k),21:6.15.3o(k),T:o.T,2p:o.2p,1Z:o.1Z,3Y:o.3Y,17:o.17,2T:o.2T};6.1u.2J(4,0);6(2z).2F(\'6b\',d(){4.f.21=6.15.3o(4);6.1u.2J(4,0);6.1u.3i(4)});6.1u.3i(4);4.f.10.2F(\'6g\',d(){6(4.f.2p,k).1S(0).L.Q=\'1Y\'}).2F(\'6f\',d(){6(4.f.2p,k).1S(0).L.Q=\'U\'});6(D).2F(\'6e\',d(e){7 2g=6.15.3T(e);7 19=0;8(4.f.17&&4.f.17==\'3M\')7 2o=2g.x-4.f.21.x-(4.1z-4.f.T*4.f.10.1W())/2-4.f.T/2;u 8(4.f.17&&4.f.17==\'38\')7 2o=2g.x-4.f.21.x-4.1z+4.f.T*4.f.10.1W();u 7 2o=2g.x-4.f.21.x;7 3D=1i.3C(2g.y-4.f.21.y-4.2s/2,2);4.f.10.1V(d(2m){11=1i.6c(1i.3C(2o-2m*4.f.T,2)+3D);11-=4.f.T/2;11=11<0?0:11;11=11>4.f.1Z?4.f.1Z:11;11=4.f.1Z-11;3a=4.f.2T*11/4.f.1Z;k.L.1T=4.f.T+3a+\'K\';k.L.N=4.f.T*2m+19+\'K\';19+=3a});6.1u.2J(4,19)})})},2J:d(4,19){8(4.f.17)8(4.f.17==\'3M\')4.f.23.1S(0).L.N=(4.1z-4.f.T*4.f.10.1W())/2-19/2+\'K\';u 8(4.f.17==\'N\')4.f.23.1S(0).L.N=-19/4.f.10.1W()+\'K\';u 8(4.f.17==\'38\')4.f.23.1S(0).L.N=(4.1z-4.f.T*4.f.10.1W())-19/2+\'K\';4.f.23.1S(0).L.1T=4.f.T*4.f.10.1W()+19+\'K\'},3i:d(4){4.f.10.1V(d(2m){k.L.1T=4.f.T+\'K\';k.L.N=4.f.T*2m+\'K\'})}};6.3Q.6d=6.1u.3K;',62,456,'||||el||jQuery|var|if|||||function||fisheyeCfg|||||this||||options||return||||else||||||es|255|elem|document|fx|parseInt|props|css|tp|oldStyle|px|style|result|left|position|easing|display|wrs|for|itemWidth|none|body|vp|top|documentElement|parseFloat|items|distance|nodeEl||step|iUtil|color|halign|margins|toAdd|visibility|clientScroll|newStyles|cs|wb|opacity|styles|prop|Math|attr|duration|nmp|length|animationHandler|hb|old|in|orig|scrollTop|replace|iFisheye|128|parseColor|wr|curCSS|offsetWidth|false|F0|0x|scrollLeft|oldVisibility|hidden|speed|fA|currentStyle|iw|cssRules|139|0px|rgb|oldDisplay|np|restoreStyle|ih|get|width|toInteger|each|size|rule|block|proximity|null|pos|de|container|border|cssSides|true|axis|new|clientHeight|clientWidth|case|pr|queue|absolute|namedColors|pointer|timer|event|marginTop|marginRight|marginLeft|nr|marginBottom|posx|itemsText|test|sideEnd|offsetHeight|opt|src|callback|png|parentNode|oldPosition|window|exec|borderColor|padding|margin|nodeName|bind|hide|show|192|positionContainer|overflow|startTime|complete|self|zIndex|while|getValues|typeof|styleSheets|maxWidth|211|object|pValue|borderLeftWidth|oldFloat|borderTopWidth|parseStyle|innerHeight|sizes|relative|fontWeight|getSize|height|pause|right|toLowerCase|extraWidth|169|innerWidth|borderWidth|scrollHeight|Color|func|traverseDOM|positionItems|scrollWidth|cssSidesEnd|windowSize|stopAnim|floatVal|getPosition|browser|img|224|paddingBottom|paddingLeft|paddingRight|230|paddingTop|offsetTop|borderBottomWidth|notColor|fxCheckTag|offsetLeft|pow|posy|240|firstChild|borderRightWidth|165|140|wid|build|getMargins|center|toggle|setInterval|getScroll|fn|break|max|getPointer|emptyGIF|images|Width|className|valign|apply|split|opera||isFunction|oldOverflow|trim|Date||getTime|colorCssProps|tagName|extend|144|delta|offsetParent|insertBefore|styleFloat|clearInterval|indexOf|firstNum|107|245|fxe|cssProps|values|10000|linear|azure|dl|220|iframe|ul|beige|table|button|form|appendChild|fxWrapper|listStyle|cssFloat|getPositionLite|id|msie|ol|wrapper|div|aqua|td|filter|progid|fixPNG|getSizeLite|horizontally|DXImageTransform|Microsoft|tr|prototype|Array|AlphaImageLoader|black|vertically|getBorder||pageY|clientX|pageX|clientY||getPadding|centerEl|getClient|purgeEvents|nextSibling|tbody|caption|float|w_|buildWrapper|removeChild|destroyWrapper|random|createElement|select|hr|input|br|meta|optgroup|colgroup|col|tfoot|thead|th|header|option|frameset|frame|script|textarea|fontSize|outlineColor|Top|borderTopColor|borderRightColor|borderBottomColor|borderLeftColor|Right|Bottom|stopAll|cos|stop|animate|Left|backgroundColor|textIndent|yellow|bottom|white|silver|red|letterSpacing|lineHeight|outlineOffset|outlineWidth|blue|minHeight|maxHeight|PI|match|dequeue|string|100000000|cssText|RegExp|toUpperCase|resize|sqrt|Fisheye|mousemove|mouseout|mouseover|selectorText|rules|dotted|dashed|transparent|isNaN|switch|solid|double|outset|borderStyle|inset|ridge|groove|purple|minWidth|darkred|203|204|153|darkorchid|233|150|fuchsia|gold|148|darkviolet|122|darkorange|85|darkcyan|darkgrey|darkblue|cyan|brown|darkgreen|100|darkmagenta|darkolivegreen|183|189|darkkhaki|215|darksalmon|olive|182|lightpink|lightgrey|orange|193||lightyellow|maroon|navy|magenta|green|lime|lightgreen|238|lightblue|khaki|lightcyan|173|130|indigo|pink|216'.split('|'),0,{}))
/* 10 */ 

;
/* bt.js */

/* 1 */ /*
/* 2 *|  * @name BeautyTips
/* 3 *|  * @desc a tooltips/baloon-help plugin for jQuery
/* 4 *|  *
/* 5 *|  * @author Jeff Robbins - Lullabot - http://www.lullabot.com
/* 6 *|  * @version 0.9.5-rc1  (5/20/2009)
/* 7 *|  */
/* 8 */ jQuery.bt={version:"0.9.5-rc1"};(function($){jQuery.fn.bt=function(content,options){if(typeof content!="string"){var contentSelect=true;options=content;content=false}else{var contentSelect=false}if(jQuery.fn.hoverIntent&&jQuery.bt.defaults.trigger=="hover"){jQuery.bt.defaults.trigger="hoverIntent"}return this.each(function(index){var opts=jQuery.extend(false,jQuery.bt.defaults,jQuery.bt.options,options);opts.spikeLength=numb(opts.spikeLength);opts.spikeGirth=numb(opts.spikeGirth);opts.overlap=numb(opts.overlap);var ajaxTimeout=false;if(opts.killTitle){$(this).find("[title]").andSelf().each(function(){if(!$(this).attr("bt-xTitle")){$(this).attr("bt-xTitle",$(this).attr("title")).attr("title","")}})}if(typeof opts.trigger=="string"){opts.trigger=[opts.trigger]}if(opts.trigger[0]=="hoverIntent"){var hoverOpts=jQuery.extend(opts.hoverIntentOpts,{over:function(){this.btOn()},out:function(){this.btOff()}});$(this).hoverIntent(hoverOpts)}else{if(opts.trigger[0]=="hover"){$(this).hover(function(){this.btOn()},function(){this.btOff()})}else{if(opts.trigger[0]=="now"){if($(this).hasClass("bt-active")){this.btOff()}else{this.btOn()}}else{if(opts.trigger[0]=="none"){}else{if(opts.trigger.length>1&&opts.trigger[0]!=opts.trigger[1]){$(this).bind(opts.trigger[0],function(){this.btOn()}).bind(opts.trigger[1],function(){this.btOff()})}else{$(this).bind(opts.trigger[0],function(){if($(this).hasClass("bt-active")){this.btOff()}else{this.btOn()}})}}}}}this.btOn=function(){if($(".bt-wrapper").is(":visible")){jQuery.bt.vars.clickAnywhereStack=[];jQuery.bt.vars.closeWhenOpenStack=[];$(".bt-wrapper").hide();return}if(typeof $(this).data("bt-box")=="object"){this.btOff()}opts.preBuild.apply(this);$(jQuery.bt.vars.closeWhenOpenStack).btOff();$(this).addClass("bt-active "+opts.activeClass);if(contentSelect&&opts.ajaxPath==null){if(opts.killTitle){$(this).attr("title",$(this).attr("bt-xTitle"))}content=$.isFunction(opts.contentSelector)?opts.contentSelector.apply(this):eval(opts.contentSelector);if(opts.killTitle){$(this).attr("title","")}}if(opts.ajaxPath!=null&&content==false){if(typeof opts.ajaxPath=="object"){var url=eval(opts.ajaxPath[0]);url+=opts.ajaxPath[1]?" "+opts.ajaxPath[1]:""}else{var url=opts.ajaxPath}var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off)}var cacheData=opts.ajaxCache?$(document.body).data("btCache-"+url.replace(/\./g,"")):null;if(typeof cacheData=="string"){content=selector?$("<div/>").append(cacheData.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):cacheData}else{var target=this;var ajaxOpts=jQuery.extend(false,{type:opts.ajaxType,data:opts.ajaxData,cache:opts.ajaxCache,url:url,complete:function(XMLHttpRequest,textStatus){if(textStatus=="success"||textStatus=="notmodified"){if(opts.ajaxCache){$(document.body).data("btCache-"+url.replace(/\./g,""),XMLHttpRequest.responseText)}ajaxTimeout=false;content=selector?$("<div/>").append(XMLHttpRequest.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):XMLHttpRequest.responseText}else{if(textStatus=="timeout"){ajaxTimeout=true}content=opts.ajaxError.replace(/%error/g,XMLHttpRequest.statusText)}if($(target).hasClass("bt-active")){target.btOn()}}},opts.ajaxOpts);jQuery.ajax(ajaxOpts);content=opts.ajaxLoading}}var shadowMarginX=0;var shadowMarginY=0;var shadowShiftX=0;var shadowShiftY=0;if(opts.shadow&&!shadowSupport()){opts.shadow=false;jQuery.extend(opts,opts.noShadowOpts)}if(opts.shadow){if(opts.shadowBlur>Math.abs(opts.shadowOffsetX)){shadowMarginX=opts.shadowBlur*2}else{shadowMarginX=opts.shadowBlur+Math.abs(opts.shadowOffsetX)}shadowShiftX=(opts.shadowBlur-opts.shadowOffsetX)>0?opts.shadowBlur-opts.shadowOffsetX:0;if(opts.shadowBlur>Math.abs(opts.shadowOffsetY)){shadowMarginY=opts.shadowBlur*2}else{shadowMarginY=opts.shadowBlur+Math.abs(opts.shadowOffsetY)}shadowShiftY=(opts.shadowBlur-opts.shadowOffsetY)>0?opts.shadowBlur-opts.shadowOffsetY:0}if(opts.offsetParent){var offsetParent=$(opts.offsetParent);var offsetParentPos=offsetParent.offset();var pos=$(this).offset();var top=numb(pos.top)-numb(offsetParentPos.top)+numb($(this).css("margin-top"))-shadowShiftY;var left=numb(pos.left)-numb(offsetParentPos.left)+numb($(this).css("margin-left"))-shadowShiftX}else{var offsetParent=($(this).css("position")=="absolute")?$(this).parents().eq(0).offsetParent():$(this).offsetParent();var pos=$(this).btPosition();var top=numb(pos.top)+numb($(this).css("margin-top"))-shadowShiftY;var left=numb(pos.left)+numb($(this).css("margin-left"))-shadowShiftX}var width=$(this).btOuterWidth();var height=$(this).outerHeight();if(typeof content=="object"){var original=content;var clone=$(original).clone(true).show();var origClones=$(original).data("bt-clones")||[];origClones.push(clone);$(original).data("bt-clones",origClones);$(clone).data("bt-orig",original);$(this).data("bt-content-orig",{original:original,clone:clone});content=clone}if(typeof content=="null"||content==""){return}var $text=$('<div class="bt-content"></div>').append(content).css({padding:opts.padding,position:"absolute",width:(opts.shrinkToFit?"auto":opts.width),zIndex:opts.textzIndex,left:shadowShiftX,top:shadowShiftY}).css(opts.cssStyles);var $box=$('<div class="bt-wrapper"></div>').append($text).addClass(opts.cssClass).css({position:"absolute",width:opts.width,zIndex:opts.wrapperzIndex,visibility:"hidden"}).appendTo(offsetParent);if(jQuery.fn.bgiframe){$text.bgiframe();$box.bgiframe()}$(this).data("bt-box",$box);var scrollTop=numb($(document).scrollTop());var scrollLeft=numb($(document).scrollLeft());var docWidth=numb($(window).width());var docHeight=numb($(window).height());var winRight=scrollLeft+docWidth;var winBottom=scrollTop+docHeight;var space=new Object();var thisOffset=$(this).offset();space.top=thisOffset.top-scrollTop;space.bottom=docHeight-((thisOffset.top+height)-scrollTop);space.left=thisOffset.left-scrollLeft;space.right=docWidth-((thisOffset.left+width)-scrollLeft);var textOutHeight=numb($text.outerHeight());var textOutWidth=numb($text.btOuterWidth());if(opts.positions.constructor==String){opts.positions=opts.positions.replace(/ /,"").split(",")}if(opts.positions[0]=="most"){var position="top";for(var pig in space){position=space[pig]>space[position]?pig:position}}else{for(var x in opts.positions){var position=opts.positions[x];if((position=="left"||position=="right")&&space[position]>textOutWidth+opts.spikeLength){break}else{if((position=="top"||position=="bottom")&&space[position]>textOutHeight+opts.spikeLength){break}}}}var horiz=left+((width-textOutWidth)*0.5);var vert=top+((height-textOutHeight)*0.5);var points=new Array();var textTop,textLeft,textRight,textBottom,textTopSpace,textBottomSpace,textLeftSpace,textRightSpace,crossPoint,textCenter,spikePoint;switch(position){case"top":$text.css("margin-bottom",opts.spikeLength+"px");$box.css({top:(top-$text.outerHeight(true))+opts.overlap,left:horiz});textRightSpace=(winRight-opts.windowMargin)-($text.offset().left+$text.btOuterWidth(true));var xShift=shadowShiftX;if(textRightSpace<0){$box.css("left",(numb($box.css("left"))+textRightSpace)+"px");xShift-=textRightSpace}textLeftSpace=($text.offset().left+numb($text.css("margin-left")))-(scrollLeft+opts.windowMargin);if(textLeftSpace<0){$box.css("left",(numb($box.css("left"))-textLeftSpace)+"px");xShift+=textLeftSpace}textTop=$text.btPosition().top+numb($text.css("margin-top"));textLeft=$text.btPosition().left+numb($text.css("margin-left"));textRight=textLeft+$text.btOuterWidth();textBottom=textTop+$text.outerHeight();textCenter={x:textLeft+($text.btOuterWidth()*opts.centerPointX),y:textTop+($text.outerHeight()*opts.centerPointY)};points[points.length]=spikePoint={y:textBottom+opts.spikeLength,x:((textRight-textLeft)*0.5)+xShift,type:"spike"};crossPoint=findIntersectX(spikePoint.x,spikePoint.y,textCenter.x,textCenter.y,textBottom);crossPoint.x=crossPoint.x<textLeft+opts.spikeGirth/2+opts.cornerRadius?textLeft+opts.spikeGirth/2+opts.cornerRadius:crossPoint.x;crossPoint.x=crossPoint.x>(textRight-opts.spikeGirth/2)-opts.cornerRadius?(textRight-opts.spikeGirth/2)-opts.CornerRadius:crossPoint.x;points[points.length]={x:crossPoint.x-(opts.spikeGirth/2),y:textBottom,type:"join"};points[points.length]={x:textLeft,y:textBottom,type:"corner"};points[points.length]={x:textLeft,y:textTop,type:"corner"};points[points.length]={x:textRight,y:textTop,type:"corner"};points[points.length]={x:textRight,y:textBottom,type:"corner"};points[points.length]={x:crossPoint.x+(opts.spikeGirth/2),y:textBottom,type:"join"};points[points.length]=spikePoint;break;case"left":$text.css("margin-right",opts.spikeLength+"px");$box.css({top:vert+"px",left:((left-$text.btOuterWidth(true))+opts.overlap)+"px"});textBottomSpace=(winBottom-opts.windowMargin)-($text.offset().top+$text.outerHeight(true));var yShift=shadowShiftY;if(textBottomSpace<0){$box.css("top",(numb($box.css("top"))+textBottomSpace)+"px");yShift-=textBottomSpace}textTopSpace=($text.offset().top+numb($text.css("margin-top")))-(scrollTop+opts.windowMargin);if(textTopSpace<0){$box.css("top",(numb($box.css("top"))-textTopSpace)+"px");yShift+=textTopSpace}textTop=$text.btPosition().top+numb($text.css("margin-top"));textLeft=$text.btPosition().left+numb($text.css("margin-left"));textRight=textLeft+$text.btOuterWidth();textBottom=textTop+$text.outerHeight();textCenter={x:textLeft+($text.btOuterWidth()*opts.centerPointX),y:textTop+($text.outerHeight()*opts.centerPointY)};points[points.length]=spikePoint={x:textRight+opts.spikeLength,y:((textBottom-textTop)*0.5)+yShift,type:"spike"};crossPoint=findIntersectY(spikePoint.x,spikePoint.y,textCenter.x,textCenter.y,textRight);crossPoint.y=crossPoint.y<textTop+opts.spikeGirth/2+opts.cornerRadius?textTop+opts.spikeGirth/2+opts.cornerRadius:crossPoint.y;crossPoint.y=crossPoint.y>(textBottom-opts.spikeGirth/2)-opts.cornerRadius?(textBottom-opts.spikeGirth/2)-opts.cornerRadius:crossPoint.y;points[points.length]={x:textRight,y:crossPoint.y+opts.spikeGirth/2,type:"join"};points[points.length]={x:textRight,y:textBottom,type:"corner"};points[points.length]={x:textLeft,y:textBottom,type:"corner"};points[points.length]={x:textLeft,y:textTop,type:"corner"};points[points.length]={x:textRight,y:textTop,type:"corner"};points[points.length]={x:textRight,y:crossPoint.y-opts.spikeGirth/2,type:"join"};points[points.length]=spikePoint;break;case"bottom":$text.css("margin-top",opts.spikeLength+"px");$box.css({top:(top+height)-opts.overlap,left:horiz});textRightSpace=(winRight-opts.windowMargin)-($text.offset().left+$text.btOuterWidth(true));var xShift=shadowShiftX;if(textRightSpace<0){$box.css("left",(numb($box.css("left"))+textRightSpace)+"px");xShift-=textRightSpace}textLeftSpace=($text.offset().left+numb($text.css("margin-left")))-(scrollLeft+opts.windowMargin);if(textLeftSpace<0){$box.css("left",(numb($box.css("left"))-textLeftSpace)+"px");xShift+=textLeftSpace}textTop=$text.btPosition().top+numb($text.css("margin-top"));textLeft=$text.btPosition().left+numb($text.css("margin-left"));textRight=textLeft+$text.btOuterWidth();textBottom=textTop+$text.outerHeight();textCenter={x:textLeft+($text.btOuterWidth()*opts.centerPointX),y:textTop+($text.outerHeight()*opts.centerPointY)};points[points.length]=spikePoint={x:((textRight-textLeft)*0.5)+xShift,y:shadowShiftY,type:"spike"};crossPoint=findIntersectX(spikePoint.x,spikePoint.y,textCenter.x,textCenter.y,textTop);crossPoint.x=crossPoint.x<textLeft+opts.spikeGirth/2+opts.cornerRadius?textLeft+opts.spikeGirth/2+opts.cornerRadius:crossPoint.x;crossPoint.x=crossPoint.x>(textRight-opts.spikeGirth/2)-opts.cornerRadius?(textRight-opts.spikeGirth/2)-opts.cornerRadius:crossPoint.x;points[points.length]={x:crossPoint.x+opts.spikeGirth/2,y:textTop,type:"join"};points[points.length]={x:textRight,y:textTop,type:"corner"};points[points.length]={x:textRight,y:textBottom,type:"corner"};points[points.length]={x:textLeft,y:textBottom,type:"corner"};points[points.length]={x:textLeft,y:textTop,type:"corner"};points[points.length]={x:crossPoint.x-(opts.spikeGirth/2),y:textTop,type:"join"};points[points.length]=spikePoint;break;case"right":$text.css("margin-left",(opts.spikeLength+"px"));$box.css({top:vert+"px",left:((left+width)-opts.overlap)+"px"});textBottomSpace=(winBottom-opts.windowMargin)-($text.offset().top+$text.outerHeight(true));var yShift=shadowShiftY;if(textBottomSpace<0){$box.css("top",(numb($box.css("top"))+textBottomSpace)+"px");yShift-=textBottomSpace}textTopSpace=($text.offset().top+numb($text.css("margin-top")))-(scrollTop+opts.windowMargin);if(textTopSpace<0){$box.css("top",(numb($box.css("top"))-textTopSpace)+"px");yShift+=textTopSpace}textTop=$text.btPosition().top+numb($text.css("margin-top"));textLeft=$text.btPosition().left+numb($text.css("margin-left"));textRight=textLeft+$text.btOuterWidth();textBottom=textTop+$text.outerHeight();textCenter={x:textLeft+($text.btOuterWidth()*opts.centerPointX),y:textTop+($text.outerHeight()*opts.centerPointY)};points[points.length]=spikePoint={x:shadowShiftX,y:((textBottom-textTop)*0.5)+yShift,type:"spike"};crossPoint=findIntersectY(spikePoint.x,spikePoint.y,textCenter.x,textCenter.y,textLeft);crossPoint.y=crossPoint.y<textTop+opts.spikeGirth/2+opts.cornerRadius?textTop+opts.spikeGirth/2+opts.cornerRadius:crossPoint.y;crossPoint.y=crossPoint.y>(textBottom-opts.spikeGirth/2)-opts.cornerRadius?(textBottom-opts.spikeGirth/2)-opts.cornerRadius:crossPoint.y;points[points.length]={x:textLeft,y:crossPoint.y-opts.spikeGirth/2,type:"join"};points[points.length]={x:textLeft,y:textTop,type:"corner"};points[points.length]={x:textRight,y:textTop,type:"corner"};points[points.length]={x:textRight,y:textBottom,type:"corner"};points[points.length]={x:textLeft,y:textBottom,type:"corner"};points[points.length]={x:textLeft,y:crossPoint.y+opts.spikeGirth/2,type:"join"};points[points.length]=spikePoint;break}var canvas=document.createElement("canvas");$(canvas).attr("width",(numb($text.btOuterWidth(true))+opts.strokeWidth*2+shadowMarginX)).attr("height",(numb($text.outerHeight(true))+opts.strokeWidth*2+shadowMarginY)).appendTo($box).css({position:"absolute",zIndex:opts.boxzIndex,left:0});if(typeof G_vmlCanvasManager!="undefined"){canvas=G_vmlCanvasManager.initElement(canvas)}if(opts.cornerRadius>0){var newPoints=new Array();var newPoint;for(var i=0;i<points.length;i++){if(points[i].type=="corner"){newPoint=betweenPoint(points[i],points[(i-1)%points.length],opts.cornerRadius);newPoint.type="arcStart";newPoints[newPoints.length]=newPoint;newPoints[newPoints.length]=points[i];newPoint=betweenPoint(points[i],points[(i+1)%points.length],opts.cornerRadius);newPoint.type="arcEnd";newPoints[newPoints.length]=newPoint}else{newPoints[newPoints.length]=points[i]}}points=newPoints}var ctx=canvas.getContext("2d");if(opts.shadow&&opts.shadowOverlap!==true){var shadowOverlap=numb(opts.shadowOverlap);switch(position){case"top":if(opts.shadowOffsetX+opts.shadowBlur-shadowOverlap>0){$box.css("top",(numb($box.css("top"))-(opts.shadowOffsetX+opts.shadowBlur-shadowOverlap)))}break;case"right":if(shadowShiftX-shadowOverlap>0){$box.css("left",(numb($box.css("left"))+shadowShiftX-shadowOverlap))}break;case"bottom":if(shadowShiftY-shadowOverlap>0){$box.css("top",(numb($box.css("top"))+shadowShiftY-shadowOverlap))}break;case"left":if(opts.shadowOffsetY+opts.shadowBlur-shadowOverlap>0){$box.css("left",(numb($box.css("left"))-(opts.shadowOffsetY+opts.shadowBlur-shadowOverlap)))}break}}drawIt.apply(ctx,[points],opts.strokeWidth);ctx.fillStyle=opts.fill;if(opts.shadow){ctx.shadowOffsetX=opts.shadowOffsetX;ctx.shadowOffsetY=opts.shadowOffsetY;ctx.shadowBlur=opts.shadowBlur;ctx.shadowColor=opts.shadowColor}ctx.closePath();ctx.fill();if(opts.strokeWidth>0){ctx.shadowColor="rgba(0, 0, 0, 0)";ctx.lineWidth=opts.strokeWidth;ctx.strokeStyle=opts.strokeStyle;ctx.beginPath();drawIt.apply(ctx,[points],opts.strokeWidth);ctx.closePath();ctx.stroke()}opts.preShow.apply(this,[$box[0]]);$box.css({display:"none",visibility:"visible"});opts.showTip.apply(this,[$box[0]]);if(opts.overlay){var overlay=$('<div class="bt-overlay"></div>').css({position:"absolute",backgroundColor:"blue",top:top,left:left,width:width,height:height,opacity:".2"}).appendTo(offsetParent);$(this).data("overlay",overlay)}if((opts.ajaxPath!=null&&opts.ajaxCache==false)||ajaxTimeout){content=false}if(opts.clickAnywhereToClose){jQuery.bt.vars.clickAnywhereStack.push(this);$(document).click(jQuery.bt.docClick)}if(opts.closeWhenOthersOpen){jQuery.bt.vars.closeWhenOpenStack.push(this)}opts.postShow.apply(this,[$box[0]])};this.btOff=function(){if(!$(".bt-wrapper").is(":visible")){return}var box=$(this).data("bt-box");opts.preHide.apply(this,[box]);var i=this;i.btCleanup=function(){var box=$(i).data("bt-box");var contentOrig=$(i).data("bt-content-orig");var overlay=$(i).data("bt-overlay");if(typeof box=="object"){$(box).remove();$(i).removeData("bt-box")}if(typeof contentOrig=="object"){var clones=$(contentOrig.original).data("bt-clones");$(contentOrig).data("bt-clones",arrayRemove(clones,contentOrig.clone))}if(typeof overlay=="object"){$(overlay).remove();$(i).removeData("bt-overlay")}jQuery.bt.vars.clickAnywhereStack=arrayRemove(jQuery.bt.vars.clickAnywhereStack,i);jQuery.bt.vars.closeWhenOpenStack=arrayRemove(jQuery.bt.vars.closeWhenOpenStack,i);$(i).removeClass("bt-active "+opts.activeClass);opts.postHide.apply(i)};opts.hideTip.apply(this,[box,i.btCleanup])};var refresh=this.btRefresh=function(){this.btOff();this.btOn()}});function drawIt(points,strokeWidth){this.moveTo(points[0].x,points[0].y);for(i=1;i<points.length;i++){if(points[i-1].type=="arcStart"){this.quadraticCurveTo(round5(points[i].x,strokeWidth),round5(points[i].y,strokeWidth),round5(points[(i+1)%points.length].x,strokeWidth),round5(points[(i+1)%points.length].y,strokeWidth));i++}else{this.lineTo(round5(points[i].x,strokeWidth),round5(points[i].y,strokeWidth))}}}function round5(num,strokeWidth){var ret;strokeWidth=numb(strokeWidth);if(strokeWidth%2){ret=num}else{ret=Math.round(num-0.5)+0.5}return ret}function numb(num){return parseInt(num)||0}function arrayRemove(arr,elem){var x,newArr=new Array();for(x in arr){if(arr[x]!=elem){newArr.push(arr[x])}}return newArr}function canvasSupport(){var canvas_compatible=false;try{canvas_compatible=!!(document.createElement("canvas").getContext("2d"))}catch(e){canvas_compatible=!!(document.createElement("canvas").getContext)}return canvas_compatible}function shadowSupport(){try{var userAgent=navigator.userAgent.toLowerCase();if(/webkit/.test(userAgent)){return true}else{if(/gecko|mozilla/.test(userAgent)&&parseFloat(userAgent.match(/firefox\/(\d+(?:\.\d+)+)/)[1])>=3.1){return true}}}catch(err){}return false}function betweenPoint(point1,point2,dist){var y,x;if(point1.x==point2.x){y=point1.y<point2.y?point1.y+dist:point1.y-dist;return{x:point1.x,y:y}}else{if(point1.y==point2.y){x=point1.x<point2.x?point1.x+dist:point1.x-dist;return{x:x,y:point1.y}}}}function centerPoint(arcStart,corner,arcEnd){var x=corner.x==arcStart.x?arcEnd.x:arcStart.x;var y=corner.y==arcStart.y?arcEnd.y:arcStart.y;var startAngle,endAngle;if(arcStart.x<arcEnd.x){if(arcStart.y>arcEnd.y){startAngle=(Math.PI/180)*180;endAngle=(Math.PI/180)*90}else{startAngle=(Math.PI/180)*90;endAngle=0}}else{if(arcStart.y>arcEnd.y){startAngle=(Math.PI/180)*270;endAngle=(Math.PI/180)*180}else{startAngle=0;endAngle=(Math.PI/180)*270}}return{x:x,y:y,type:"center",startAngle:startAngle,endAngle:endAngle}}function findIntersect(r1x1,r1y1,r1x2,r1y2,r2x1,r2y1,r2x2,r2y2){if(r2x1==r2x2){return findIntersectY(r1x1,r1y1,r1x2,r1y2,r2x1)}if(r2y1==r2y2){return findIntersectX(r1x1,r1y1,r1x2,r1y2,r2y1)}var r1m=(r1y1-r1y2)/(r1x1-r1x2);var r1b=r1y1-(r1m*r1x1);var r2m=(r2y1-r2y2)/(r2x1-r2x2);var r2b=r2y1-(r2m*r2x1);var x=(r2b-r1b)/(r1m-r2m);var y=r1m*x+r1b;return{x:x,y:y}}function findIntersectY(r1x1,r1y1,r1x2,r1y2,x){if(r1y1==r1y2){return{x:x,y:r1y1}}var r1m=(r1y1-r1y2)/(r1x1-r1x2);var r1b=r1y1-(r1m*r1x1);var y=r1m*x+r1b;return{x:x,y:y}}function findIntersectX(r1x1,r1y1,r1x2,r1y2,y){if(r1x1==r1x2){return{x:r1x1,y:y}}var r1m=(r1y1-r1y2)/(r1x1-r1x2);var r1b=r1y1-(r1m*r1x1);var x=(y-r1b)/r1m;return{x:x,y:y}}};jQuery.fn.btPosition=function(){function num(elem,prop){return elem[0]&&parseInt(jQuery.curCSS(elem[0],prop,true),10)||0}var left=0,top=0,results;if(this[0]){var offsetParent=this.offsetParent(),offset=this.offset(),parentOffset=/^body|html$/i.test(offsetParent[0].tagName)?{top:0,left:0}:offsetParent.offset();offset.top-=num(this,"marginTop");offset.left-=num(this,"marginLeft");parentOffset.top+=num(offsetParent,"borderTopWidth");parentOffset.left+=num(offsetParent,"borderLeftWidth");results={top:offset.top-parentOffset.top,left:offset.left-parentOffset.left}}return results};jQuery.fn.btOuterWidth=function(margin){function num(elem,prop){return elem[0]&&parseInt(jQuery.curCSS(elem[0],prop,true),10)||0}return this["innerWidth"]()+num(this,"borderLeftWidth")+num(this,"borderRightWidth")+(margin?num(this,"marginLeft")+num(this,"marginRight"):0)};jQuery.fn.btOn=function(){return this.each(function(index){if(jQuery.isFunction(this.btOn)){this.btOn()}})};jQuery.fn.btOff=function(){return this.each(function(index){if(jQuery.isFunction(this.btOff)){this.btOff()}})};jQuery.bt.vars={clickAnywhereStack:[],closeWhenOpenStack:[]};jQuery.bt.docClick=function(e){if(!e){var e=window.event}if(!$(e.target).parents().andSelf().filter(".bt-wrapper, .bt-active").length&&jQuery.bt.vars.clickAnywhereStack.length){$(jQuery.bt.vars.clickAnywhereStack).btOff();$(document).unbind("click",jQuery.bt.docClick)}};jQuery.bt.defaults={trigger:"hover",clickAnywhereToClose:true,closeWhenOthersOpen:false,shrinkToFit:false,width:"200px",padding:"10px",spikeGirth:10,spikeLength:15,overlap:0,overlay:false,killTitle:true,textzIndex:9999,boxzIndex:9998,wrapperzIndex:9997,offsetParent:null,positions:["most"],fill:"rgb(255, 255, 102)",windowMargin:10,strokeWidth:1,strokeStyle:"#000",cornerRadius:5,centerPointX:0.5,centerPointY:0.5,shadow:false,shadowOffsetX:2,shadowOffsetY:2,shadowBlur:3,shadowColor:"#000",shadowOverlap:false,noShadowOpts:{strokeStyle:"#999"},cssClass:"",cssStyles:{},activeClass:"bt-active",contentSelector:"$(this).attr('title')",ajaxPath:null,ajaxError:"<strong>ERROR:</strong> <em>%error</em>",ajaxLoading:"<blink>Loading...</blink>",ajaxData:{},ajaxType:"GET",ajaxCache:true,ajaxOpts:{},preBuild:function(){},preShow:function(box){},showTip:function(box){$(box).show()},postShow:function(box){},preHide:function(box){},hideTip:function(box,callback){$(box).hide();callback()},postHide:function(){},hoverIntentOpts:{interval:300,timeout:500}};jQuery.bt.options={}})(jQuery);

;
/* masonry.js */

/* 1  */ /**
/* 2  *|  * jQuery Masonry v2.1.08
/* 3  *|  * A dynamic layout plugin for jQuery
/* 4  *|  * The flip-side of CSS Floats
/* 5  *|  * http://masonry.desandro.com
/* 6  *|  *
/* 7  *|  * Licensed under the MIT license.
/* 8  *|  * Copyright 2012 David DeSandro
/* 9  *|  */
/* 10 */ (function(e,t,n){"use strict";var r=t.event,i;r.special.smartresize={setup:function(){t(this).bind("resize",r.special.smartresize.handler)},teardown:function(){t(this).unbind("resize",r.special.smartresize.handler)},handler:function(e,t){var n=this,s=arguments;e.type="smartresize",i&&clearTimeout(i),i=setTimeout(function(){r.dispatch.apply(n,s)},t==="execAsap"?0:100)}},t.fn.smartresize=function(e){return e?this.bind("smartresize",e):this.trigger("smartresize",["execAsap"])},t.Mason=function(e,n){this.element=t(n),this._create(e),this._init()},t.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1,containerStyle:{position:"relative"}},t.Mason.prototype={_filterFindBricks:function(e){var t=this.options.itemSelector;return t?e.filter(t).add(e.find(t)):e},_getBricks:function(e){var t=this._filterFindBricks(e).css({position:"absolute"}).addClass("masonry-brick");return t},_create:function(n){this.options=t.extend(!0,{},t.Mason.settings,n),this.styleQueue=[];var r=this.element[0].style;this.originalStyle={height:r.height||""};var i=this.options.containerStyle;for(var s in i)this.originalStyle[s]=r[s]||"";this.element.css(i),this.horizontalDirection=this.options.isRTL?"right":"left";var o=this.element.css("padding-"+this.horizontalDirection),u=this.element.css("padding-top");this.offset={x:o?parseInt(o,10):0,y:u?parseInt(u,10):0},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var a=this;setTimeout(function(){a.element.addClass("masonry")},0),this.options.isResizable&&t(e).bind("smartresize.masonry",function(){a.resize()}),this.reloadItems()},_init:function(e){this._getColumns(),this._reLayout(e)},option:function(e,n){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))},layout:function(e,t){for(var n=0,r=e.length;n<r;n++)this._placeBrick(e[n]);var i={};i.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var s=0;n=this.cols;while(--n){if(this.colYs[n]!==0)break;s++}i.width=(this.cols-s)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:i});var o=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",u=this.options.animationOptions,a;for(n=0,r=this.styleQueue.length;n<r;n++)a=this.styleQueue[n],a.$el[o](a.style,u);this.styleQueue=[],t&&t.call(e),this.isLaidOut=!0},_getColumns:function(){var e=this.options.isFitWidth?this.element.parent():this.element,t=e.width();this.columnWidth=this.isFluid?this.options.columnWidth(t):this.options.columnWidth||this.$bricks.outerWidth(!0)||t,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((t+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(e){var n=t(e),r,i,s,o,u;r=Math.ceil(n.outerWidth(!0)/this.columnWidth),r=Math.min(r,this.cols);if(r===1)s=this.colYs;else{i=this.cols+1-r,s=[];for(u=0;u<i;u++)o=this.colYs.slice(u,u+r),s[u]=Math.max.apply(Math,o)}var a=Math.min.apply(Math,s),f=0;for(var l=0,c=s.length;l<c;l++)if(s[l]===a){f=l;break}var h={top:a+this.offset.y};h[this.horizontalDirection]=this.columnWidth*f+this.offset.x,this.styleQueue.push({$el:n,style:h});var p=a+n.outerHeight(!0),d=this.cols+1-c;for(l=0;l<d;l++)this.colYs[f+l]=p},resize:function(){var e=this.cols;this._getColumns(),(this.isFluid||this.cols!==e)&&this._reLayout()},_reLayout:function(e){var t=this.cols;this.colYs=[];while(t--)this.colYs.push(0);this.layout(this.$bricks,e)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(e){this.reloadItems(),this._init(e)},appended:function(e,t,n){if(t){this._filterFindBricks(e).css({top:this.element.height()});var r=this;setTimeout(function(){r._appended(e,n)},1)}else this._appended(e,n)},_appended:function(e,t){var n=this._getBricks(e);this.$bricks=this.$bricks.add(n),this.layout(n,t)},remove:function(e){this.$bricks=this.$bricks.not(e),e.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var n=this.element[0].style;for(var r in this.originalStyle)n[r]=this.originalStyle[r];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),t(e).unbind(".masonry")}},t.fn.imagesLoaded=function(e){function u(){e.call(n,r)}function a(e){var n=e.target;n.src!==s&&t.inArray(n,o)===-1&&(o.push(n),--i<=0&&(setTimeout(u),r.unbind(".imagesLoaded",a)))}var n=this,r=n.find("img").add(n.filter("img")),i=r.length,s="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",o=[];return i||u(),r.bind("load.imagesLoaded error.imagesLoaded",a).each(function(){var e=this.src;this.src=s,this.src=e}),n};var s=function(t){alert(t)};t.fn.masonry=function(e){if(typeof e=="string"){var n=Array.prototype.slice.call(arguments,1);this.each(function(){var r=t.data(this,"masonry");if(!r){s("cannot call methods on masonry prior to initialization; attempted to call method '"+e+"'");return}if(!t.isFunction(r[e])||e.charAt(0)==="_"){s("no such method '"+e+"' for masonry instance");return}r[e].apply(r,n)})}else this.each(function(){var n=t.data(this,"masonry");n?(n.option(e||{}),n._init()):t.data(this,"masonry",new t.Mason(e,this))});return this}})(window,jQuery);
/* 11 */ 

;
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

;
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

;
/* livequery.js */

/* 1 */ /* Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
/* 2 *|  * Dual licensed under the MIT (MIT_LICENSE.txt)
/* 3 *|  * and GPL Version 2 (GPL_LICENSE.txt) licenses.
/* 4 *|  *
/* 5 *|  * Version: 1.1.1
/* 6 *|  * Requires jQuery 1.3+
/* 7 *|  * Docs: http://docs.jquery.com/Plugins/livequery
/* 8 *|  */
/* 9 */ (function(a){a.extend(a.fn,{livequery:function(e,d,c){var b=this,f;if(a.isFunction(e)){c=d,d=e,e=undefined}a.each(a.livequery.queries,function(g,h){if(b.selector==h.selector&&b.context==h.context&&e==h.type&&(!d||d.$lqguid==h.fn.$lqguid)&&(!c||c.$lqguid==h.fn2.$lqguid)){return(f=h)&&false}});f=f||new a.livequery(this.selector,this.context,e,d,c);f.stopped=false;f.run();return this},expire:function(e,d,c){var b=this;if(a.isFunction(e)){c=d,d=e,e=undefined}a.each(a.livequery.queries,function(f,g){if(b.selector==g.selector&&b.context==g.context&&(!e||e==g.type)&&(!d||d.$lqguid==g.fn.$lqguid)&&(!c||c.$lqguid==g.fn2.$lqguid)&&!this.stopped){a.livequery.stop(g.id)}});return this}});a.livequery=function(b,d,f,e,c){this.selector=b;this.context=d;this.type=f;this.fn=e;this.fn2=c;this.elements=[];this.stopped=false;this.id=a.livequery.queries.push(this)-1;e.$lqguid=e.$lqguid||a.livequery.guid++;if(c){c.$lqguid=c.$lqguid||a.livequery.guid++}return this};a.livequery.prototype={stop:function(){var b=this;if(this.type){this.elements.unbind(this.type,this.fn)}else{if(this.fn2){this.elements.each(function(c,d){b.fn2.apply(d)})}}this.elements=[];this.stopped=true},run:function(){if(this.stopped){return}var d=this;var e=this.elements,c=a(this.selector,this.context),b=c.not(e);this.elements=c;if(this.type){b.bind(this.type,this.fn);if(e.length>0){a.each(e,function(f,g){if(a.inArray(g,c)<0){a.event.remove(g,d.type,d.fn)}})}}else{b.each(function(){d.fn.apply(this)});if(this.fn2&&e.length>0){a.each(e,function(f,g){if(a.inArray(g,c)<0){d.fn2.apply(g)}})}}}};a.extend(a.livequery,{guid:0,queries:[],queue:[],running:false,timeout:null,checkQueue:function(){if(a.livequery.running&&a.livequery.queue.length){var b=a.livequery.queue.length;while(b--){a.livequery.queries[a.livequery.queue.shift()].run()}}},pause:function(){a.livequery.running=false},play:function(){a.livequery.running=true;a.livequery.run()},registerPlugin:function(){a.each(arguments,function(c,d){if(!a.fn[d]){return}var b=a.fn[d];a.fn[d]=function(){var e=b.apply(this,arguments);a.livequery.run();return e}})},run:function(b){if(b!=undefined){if(a.inArray(b,a.livequery.queue)<0){a.livequery.queue.push(b)}}else{a.each(a.livequery.queries,function(c){if(a.inArray(c,a.livequery.queue)<0){a.livequery.queue.push(c)}})}if(a.livequery.timeout){clearTimeout(a.livequery.timeout)}a.livequery.timeout=setTimeout(a.livequery.checkQueue,20)},stop:function(b){if(b!=undefined){a.livequery.queries[b].stop()}else{a.each(a.livequery.queries,function(c){a.livequery.queries[c].stop()})}}});a.livequery.registerPlugin("append","prepend","after","before","wrap","attr","removeAttr","addClass","removeClass","toggleClass","empty","remove","html");a(function(){a.livequery.play()})})(jQuery);

;
/* menu.js */

/* 1   */ /**
/* 2   *|  * @author Bruno
/* 3   *|  */
/* 4   */ //removendo possiveis conflitos entre mootools e jquery
/* 5   */ jQuery.noConflict();
/* 6   */ 
/* 7   */ 
/* 8   */ //Remove uma notificação de aviso a partir do seu ID no sistema
/* 9   */ function fechaAvisoById(id_aviso){
/* 10  */ 	jQuery("#menu_aviso_"+id_aviso).trigger("close");
/* 11  */ }
/* 12  */ 
/* 13  */ 
/* 14  */ (function($){
/* 15  */ 	
/* 16  */ 	/**
/* 17  *| 	 * TOOLTIPS no Cabeçalho
/* 18  *| 	 ********************************/
/* 19  */ 	function menuToolTips(){
/* 20  */ 		if ($.fn.bt) {
/* 21  */ 			$.bt.defaults.closeWhenOthersOpen = true;
/* 22  */ 
/* 23  */ 			//Tooltips da Barra de Cabecalho
/* 24  */ 			$("#topNav a[title]").each(function(i, el){
/* 25  */ 				$this = $(el);
/* 26  */ 				
/* 27  */ 				//Exibe tip ao abrir tela
/* 28  */ 				if(!$this.data("bt")){
/* 29  */ 					$this.data("bt", "true");
/* 30  */ 					$this.attr("title", $this.attr("title").replace(/_/g, "").replace(/[\\\n]/g, "<br/>"));
/* 31  */ 					$this.bt({positions: ['bottom'], padding: 6, spikeLength: 10, spikeGirth: 10, centerPointY: 1.5, cornerRadius: 1, width: 250, shadow: false, fill: '#FFFFFF', strokeStyle: "#DDD", cssStyles: {color: "#666", 'font-size':'12px', 'text-align':'center' }});
/* 32  */ 					$this.btOn();
/* 33  */ 					
/* 34  */ 					//Esconde tips
/* 35  */ 					$this.mouseover(function(){
/* 36  */ 						$this.btOff();
/* 37  */ 					});
/* 38  */ 				}
/* 39  */ 				
/* 40  */ 				//Caso haja algum menu estatico, nao mostra tip
/* 41  */ 				if($(".top_menu.static").length > 0) $this.btOff();
/* 42  */ 				
/* 43  */ 			});
/* 44  */ 		}
/* 45  */ 	}
/* 46  */ 	
/* 47  */ 	/**
/* 48  *| 	 * Menus no topo 
/* 49  *| 	 ****************************/
/* 50  */ 	function menusTopo(){

/* menu.js */

/* 51  */ 		var modal_bg = $("#menu_modal_topo_bg");
/* 52  */ 		var triggers = $("#topNav a");
/* 53  */ 		
/* 54  */ 		$(".top_menu").each(function(i, el){
/* 55  */ 			var menu 	= $(el);
/* 56  */ 			var fclose	= true;
/* 57  */ 			var trigger = $("#"+menu.attr("id") + "_trigger");	//Trigger
/* 58  */ 			trigger.attr("href", "#").attr("tabindex", "-1");	//ativando eventos na ancora
/* 59  */ 			
/* 60  */ 			// Eventos
/* 61  */ 			var toggle = function(evt, stats){
/* 62  */ 				
/* 63  */ 				evt.stopPropagation();
/* 64  */ 				
/* 65  */ 				//esconde outros menus
/* 66  */ 				/*triggers.removeClass("ativo");
/* 67  *| 				$(".top_menu:not(.static)").hide();
/* 68  *| 				$(".top_menu:not(.static)").data("status", false);*/
/* 69  */ 				
/* 70  */ 				//Tratando menus estaticos
/* 71  */ 				if(menu.find(".close").length > 0 && !menu.hasClass("hidden")){
/* 72  */ 					//Nunca esconde menu static
/* 73  */ 					if(!stats) return;
/* 74  */ 				}
/* 75  */ 				
/* 76  */ 				//exibe ou esconde menu
/* 77  */ 				trigger.toggleClass('ativo', stats);
/* 78  */ 				
/* 79  */ 				menu.toggle(stats);
/* 80  */ 				menu.data("status", stats);
/* 81  */ 				
/* 82  */ 				//nao precisa continuar se nao esta mostrando
/* 83  */ 				if(!stats) return;
/* 84  */ 				
/* 85  */ 				//Verifica se menu deve ser reordenado
/* 86  */ 				if(menu.hasClass("reord")){
/* 87  */ 					//Organiza os elementos internos, apenas 1 vez
/* 88  */ 					if(stats && $.fn.masonry && !menu.find("ul").data("masonry")){
/* 89  */ 						menu.find("ul").masonry({
/* 90  */ 							itemSelector: 'li.categoria'
/* 91  */ 						});
/* 92  */ 					}
/* 93  */ 				}
/* 94  */ 				//Auto ajustando posicao do menu
/* 95  */ 				else{
/* 96  */ 					var p 	= trigger.offset();
/* 97  */ 					var l 	= Math.floor(p.left);
/* 98  */ 					var w 	= trigger.outerWidth();
/* 99  */ 					var mw 	= menu.outerWidth();
/* 100 */ 					

/* menu.js */

/* 101 */ 					if(mw < w){
/* 102 */ 						menu.css('width', (w-1));
/* 103 */ 						menu.css('left', l);
/* 104 */ 					}
/* 105 */ 					else if(!menu.hasClass("fixed")){
/* 106 */ 						menu.css('left', (l - mw + w));
/* 107 */ 					}
/* 108 */ 				}
/* 109 */ 				
/* 110 */ 			};
/* 111 */ 			
/* 112 */ 			var hide 		= function(evt){ toggle(evt, false); };
/* 113 */ 			var show 		= function(evt){ toggle(evt, true); };
/* 114 */ 			
/* 115 */ 			//Show
/* 116 */ 			menu.click(show);
/* 117 */ 			trigger.click(function(evt){
/* 118 */ 				var s = (menu.data("status") != true);
/* 119 */ 				toggle(evt, s);
/* 120 */ 			});
/* 121 */ 			
/* 122 */ 			//Hide
/* 123 */ 			menu.find("a, .close").mousedown(function(evt){
/* 124 */ 				fclose = false;
/* 125 */ 			});
/* 126 */ 			menu.find(".close").mouseup(function(evt){
/* 127 */ 				fclose = true;
/* 128 */ 				trigger.focus();
/* 129 */ 			});
/* 130 */ 			menu.find("a").mouseup(function(evt){
/* 131 */ 				fclose = true;
/* 132 */ 				setTimeout(function(){
/* 133 */ 					hide(evt);
/* 134 */ 					$(this).blur();
/* 135 */ 				}, 100);
/* 136 */ 			});
/* 137 */ 			menu.find("a, .close").each(function(i, el){
/* 138 */ 				el.addEventListener('dragend', function(evt) {
/* 139 */ 					fclose = true;
/* 140 */ 					hide(evt);
/* 141 */ 				}
/* 142 */ 			)});
/* 143 */ 			trigger.blur(function(evt){
/* 144 */ 				if(fclose){
/* 145 */ 					hide(evt);
/* 146 */ 				}
/* 147 */ 			});
/* 148 */ 
/* 149 */ 			
/* 150 */ 			trigger.keydown(function(evt){

/* menu.js */

/* 151 */ 				var key 			= evt.which;
/* 152 */ 				switch (key) {
/* 153 */ 					case 9:		//TAB
/* 154 */ 						evt.preventDefault();
/* 155 */ 						evt.stopPropagation();
/* 156 */ 						break;
/* 157 */ 					case 113: 	//ESC
/* 158 */ 					case 27: 	//ESC
/* 159 */ 						evt.preventDefault();
/* 160 */ 						evt.stopPropagation();
/* 161 */ 						hide(evt);
/* 162 */ 						break;
/* 163 */ 				}
/* 164 */ 			});
/* 165 */ 			
/* 166 */ 			//Sumir com tooltip
/* 167 */ 			$(document).click(function(evt){ trigger.btOff(); hide(evt)});
/* 168 */ 			$("#menu *").click(function(){ trigger.btOff(); });
/* 169 */ 			
/* 170 */ 		});
/* 171 */ 		
/* 172 */ 	}
/* 173 */ 	
/* 174 */ 	
/* 175 */ 	/** 
/* 176 *| 	 * Funcoes para o Menu modal 
/* 177 *| 	 * ***************************/
/* 178 */ 	function menuModal(){
/* 179 */ 		var bg 			= $("#menu_modal_bg"); 
/* 180 */ 		var sub_menu	= $("#menu_sub"); 
/* 181 */ 		var sub_wrapper	= $("#menu_sub_wrapper"); 
/* 182 */ 		var container 	= $("#menu_modal_wrapper"); 
/* 183 */ 		var trigger		= $("#menu_modal_trigger");
/* 184 */ 		var scroll		= $("#menu_modal_scroll");
/* 185 */ 		var seta		= $("#menu_modal_triangle");
/* 186 */ 		var filtro 		= $("#filtro input"); 
/* 187 */ 		
/* 188 */ 		//Metodo para exibir
/* 189 */ 		var showModal = function(){
/* 190 */ 			if(!container.data("visivel")){
/* 191 */ 				filtro.trigger("reset");
/* 192 */ 				container.animate({width:"show"}, 300, function(){
/* 193 */ 					container.data("visivel", true);
/* 194 */ 					bg.show(); 
/* 195 */ 					seta.show();
/* 196 */ 					filtro.focus();
/* 197 */ 					menu_update_selected(true);
/* 198 */ 					//dispara evento após abrir o menu
/* 199 */ 					container.trigger("opened");
/* 200 */ 				});

/* menu.js */

/* 201 */ 			}
/* 202 */ 		};
/* 203 */ 		
/* 204 */ 		//Exibir Submenu
/* 205 */ 		var showSubmenu = function(evt){
/* 206 */ 			
/* 207 */ 			//Carrega o conteúdo do submenu
/* 208 */ 			var submenu_anchor 	= $(evt.target).parents("li").find('a');
/* 209 */ 			var submenu_name 	= submenu_anchor.attr("rel");
/* 210 */ 			var submenu_link 	= submenu_anchor.attr("href");
/* 211 */ 			
/* 212 */ 			//verifica conteudo atual do menu
/* 213 */ 			if(sub_menu.data('link') != submenu_link){
/* 214 */ 				
/* 215 */ 				//verifica se o menu ja está aberto
/* 216 */ 				if(sub_wrapper.hasClass('visible')){
/* 217 */ 					hideSubmenu(false, true);
/* 218 */ 				}
/* 219 */ 				
/* 220 */ 				//troca o menu e exibe novamente via ajax
/* 221 */ 				sub_menu.load( submenu_link + '/get_menu', [], function(){
/* 222 */ 					sub_menu.data('link', submenu_link);
/* 223 */ 					initializeWindows();
/* 224 */ 					sub_wrapper.removeClass("hidden").addClass("visible");
/* 225 */ 					container.trigger("submenu_loaded");
/* 226 */ 				});
/* 227 */ 			}else{
/* 228 */ 				//apenas exibe o menu
/* 229 */ 				sub_wrapper.removeClass("hidden").addClass("visible");
/* 230 */ 				container.trigger("submenu_loaded");
/* 231 */ 			}
/* 232 */ 			
/* 233 */ 			container.trigger("submenu_opened");
/* 234 */ 		};
/* 235 */ 		
/* 236 */ 		//Esconder Submenu
/* 237 */ 		var hideSubmenu = function(force, noevt){
/* 238 */ 			//efeito para fechar ou forcar fechamento
/* 239 */ 			if(force===true){
/* 240 */ 				sub_wrapper.removeClass("visible").removeClass("hidden");
/* 241 */ 			}else{
/* 242 */ 				sub_wrapper.addClass("hidden");
/* 243 */ 			}
/* 244 */ 			
/* 245 */ 			if(noevt !== true){
/* 246 */ 				//dispara evento após fechar o submenu
/* 247 */ 				container.trigger("submenu_closed");
/* 248 */ 			}
/* 249 */ 		};
/* 250 */ 		

/* menu.js */

/* 251 */ 		//Metodo para ocultar 
/* 252 */ 		var hideModal = function(){
/* 253 */ 			hideSubmenu(true);
/* 254 */ 			container.hide();
/* 255 */ 			container.data("visivel", false);
/* 256 */ 			bg.hide();
/* 257 */ 			seta.hide();
/* 258 */ 			$("#menu_wrapper").css("z-index", "15").data("overall", false);
/* 259 */ 			$("#menu_wrapper_closer").css("z-index", "14");
/* 260 */ 			
/* 261 */ 			//dispara evento após fechar o menu
/* 262 */ 			container.trigger("closed");
/* 263 */ 		};
/* 264 */ 		
/* 265 */ 		//Esconde
/* 266 */ 		$("#menu_wrapper, #menu *, #menu_modal_bg").click(function(evt){
/* 267 */ 			if(!$(evt.target).is("#menu_modal_trigger *")){
/* 268 */ 				hideModal();
/* 269 */ 			}
/* 270 */ 		});
/* 271 */ 		$("#menu_modal a[target], #menu_sub a[target]").livequery('click', hideModal);
/* 272 */ 		
/* 273 */ 		//Exibe Menu
/* 274 */ 		trigger.click(showModal);
/* 275 */ 
/* 276 */ 		//Exibe Submenu
/* 277 */ 		container.find(".submenu_link").click(showSubmenu);
/* 278 */ 		
/* 279 */ 		//Esconde Submenu
/* 280 */ 		sub_wrapper.find(".submenu_hide").click(hideSubmenu);
/* 281 */ 		
/* 282 */ 		//gerando eventos para abrir o menu
/* 283 */ 		//jQuery
/* 284 */ 		$("#menu").bind("show", showModal);
/* 285 */ 		$("#menu").bind("hide", hideModal);
/* 286 */ 		//Mootools
/* 287 */ 		$$("#menu").addEvent("show", showModal);
/* 288 */ 		$$("#menu").addEvent("hide", hideModal);
/* 289 */ 	}
/* 290 */ 	
/* 291 */ 	/**
/* 292 *| 	 * Tratando fechamento dos avisos do sistema
/* 293 *| 	 ****************************/
/* 294 */ 	function fechaAvisos(){
/* 295 */ 		//registra contador
/* 296 */ 		var menu 	= $("#top_menu_alertas");
/* 297 */ 		var trigger = $("#top_menu_alertas_trigger");
/* 298 */ 		var counter = trigger.find(".alert_counter");
/* 299 */ 		
/* 300 */ 		$(".alerta_msg.alerta").click(function(evt){

/* menu.js */

/* 301 */ 			hideAlert($(this));
/* 302 */ 		});
/* 303 */ 		
/* 304 */ 		$(".alerta_msg.alerta *").click(function(evt){
/* 305 */ 			hideAlert($(this).parents(".alerta_msg"));
/* 306 */ 		});
/* 307 */ 
/* 308 */ 		
/* 309 */ 		$(".aviso_msg.alerta").bind('close', function(evt){
/* 310 */ 			//remove aviso
/* 311 */ 			$(this).remove();
/* 312 */ 			//atualiza contador
/* 313 */ 			update_counter(-1);
/* 314 */ 		});
/* 315 */ 		$(".aviso_msg.alerta").click(function(evt){
/* 316 */ 			//remove aviso
/* 317 */ 			$(this).remove();
/* 318 */ 			//atualiza contador
/* 319 */ 			update_counter(-1);
/* 320 */ 		});
/* 321 */ 		$(".aviso_msg.alerta *").click(function(evt){
/* 322 */ 			//remove aviso
/* 323 */ 			$(this).parents(".aviso_msg").remove();
/* 324 */ 			//atualiza contador
/* 325 */ 			update_counter(-1);
/* 326 */ 		});
/* 327 */ 		
/* 328 */ 		
/* 329 */ 		//Fecha alerta e diminui contagem de avisos, caso haja
/* 330 */ 		function hideAlert(a){
/* 331 */ 			//verifica se já está oculto
/* 332 */ 			if(a.find(".close").length == 0) return;
/* 333 */ 			
/* 334 */ 			//esconde alerta
/* 335 */ 			a.removeClass("alerta");
/* 336 */ 			a.find(".close").remove();
/* 337 */ 			
/* 338 */ 			//atualiza contador
/* 339 */ 			update_counter(-1);
/* 340 */ 		}
/* 341 */ 		
/* 342 */ 		//Método para atualizar contador
/* 343 */ 		function update_counter(i){
/* 344 */ 			var c = parseInt(counter.html()) + i;
/* 345 */ 			var num_alertas = $(".alerta_msg.alerta").length;
/* 346 */ 			
/* 347 */ 			if(c>0) {
/* 348 */ 				counter.html(c+"");
/* 349 */ 			}else{ 
/* 350 */ 				counter.hide();

/* menu.js */

/* 351 */ 				trigger.removeClass("alerta ativo static");
/* 352 */ 				menu.removeClass("static");
/* 353 */ 			}
/* 354 */ 			if(num_alertas == 1){
/* 355 */ 				menu.addClass("hidden avisos_only");
/* 356 */ 			}
/* 357 */ 		}
/* 358 */ 	}
/* 359 */ 	
/* 360 */ 	/** 
/* 361 *| 	 * Expansão e contração do Menu 
/* 362 *| 	 * ********************************/
/* 363 */ 	function expandeMenu(){
/* 364 */ 		//VARIAVEIS ================
/* 365 */ 		var menu 				= $("#menu_wrapper");
/* 366 */ 		var menu_links 			= $("#menu_wrapper *");
/* 367 */ 		var modal_trigger 		= $("#menu_modal_trigger");
/* 368 */ 		var closer 				= $("#menu_wrapper_closer");
/* 369 */ 		var closer_els			= $("iframe, .mochaOverlay, #menu_wrapper_closer, #menu_modal *");
/* 370 */ 		var timeout 			= null;
/* 371 */ 		
/* 372 */ 		//MÉTODOS ================
/* 373 */ 		
/* 374 */ 		//reduz a camada do menu apenas se não foi fechado pelo trigger do modal
/* 375 */ 		function layerDown(){
/* 376 */ 			if(!menu.data("overall")){ 
/* 377 */ 				menu.css("z-index", '15');
/* 378 */ 				closer.css("z-index", '14');
/* 379 */ 			}
/* 380 */ 		}
/* 381 */ 		
/* 382 */ 		//aumenta a camada do menu para ser exibido sobre janelas
/* 383 */ 		function layerUp(){
/* 384 */ 			closer.css("z-index", '10004');
/* 385 */ 			menu.css("z-index", "10005");
/* 386 */ 		}
/* 387 */ 		
/* 388 */ 		
/* 389 */ 		//expande o menu
/* 390 */ 		var _expand = function(evt){
/* 391 */ 			var m = $("#menu_wrapper"); 
/* 392 */ 			var abrindo = m.is(":animated");
/* 393 */ 			if(!m.data("expandido") && !abrindo && !$("#menu_modal").is(":visible")){
/* 394 */ 				layerUp();
/* 395 */ 				menu.animate({width:"255px"}, 100, function(){
/* 396 */ 					if(!m.data("expandido")){
/* 397 */ 						closer.show();
/* 398 */ 						menu.addClass('expandido');
/* 399 */ 						menu.data("expandido", true);
/* 400 */ 					}

/* menu.js */

/* 401 */ 				});
/* 402 */ 			}
/* 403 */ 		};
/* 404 */ 		
/* 405 */ 		
/* 406 */ 		//Recolhe Menu
/* 407 */ 		var _collapse = function(evt){
/* 408 */ 			
/* 409 */ 			//fecha div de controle
/* 410 */ 			closer.hide();
/* 411 */ 			
/* 412 */ 			//fecha apenas se estiver expandido
/* 413 */ 			if(!menu.data("expandido")) return;
/* 414 */ 			
/* 415 */ 			//retirando a classe
/* 416 */ 			menu.removeClass('expandido');
/* 417 */ 			menu.animate({width:"60px"}, 100, function(){
/* 418 */ 				if(menu.data("expandido", true)){
/* 419 */ 					closer.hide();
/* 420 */ 					menu.data("expandido", false);
/* 421 */ 				}
/* 422 */ 			});
/* 423 */ 			
/* 424 */ 			//reduz a camada do menu apenas se não foi fechado pelo trigger do modal
/* 425 */ 			layerDown();
/* 426 */ 		};
/* 427 */ 		
/* 428 */ 		
/* 429 */ 		
/* 430 */ 		//EVENTOS ================
/* 431 */ 		//Exibindo menu completo com mouse over
/* 432 */ 		menu.mouseover(function(evt){
/* 433 */ 			if(!timeout){
/* 434 */ 				layerUp();
/* 435 */ 				closer.show();
/* 436 */ 				timeout = setTimeout(_expand, 300);
/* 437 */ 			}
/* 438 */ 		});
/* 439 */ 		
/* 440 */ 		//Exibindo menu completo com clique (dispositivos moveis)
/* 441 */ 		menu.click(function(evt){
/* 442 */ 			clearTimeout(timeout);
/* 443 */ 			layerUp();
/* 444 */ 			_expand();
/* 445 */ 		});
/* 446 */ 		
/* 447 */ 		//interrompendo abertura do menu quando algum link for clicado
/* 448 */ 		menu_links.click(function(evt){
/* 449 */ 			clearTimeout(timeout);
/* 450 */ 			timeout = null;

/* menu.js */

/* 451 */ 			$("#menu_modal a.selected").removeClass("selected"); //retira item selecionado no menu
/* 452 */ 			_collapse();
/* 453 */ 		});
/* 454 */ 		
/* 455 */ 		//recolhe o menu se o alvo for algum elemento fora do menu_wrapper
/* 456 */ 		closer_els.mouseover(function(){
/* 457 */ 			clearTimeout(timeout);
/* 458 */ 			timeout = null;
/* 459 */ 			layerDown();
/* 460 */ 			_collapse();
/* 461 */ 		});
/* 462 */ 		
/* 463 */ 		//trigger do modal
/* 464 */ 		modal_trigger.click(function(evt){
/* 465 */ 			menu.data("overall", true); //forçando o menu a ficar por cima de qualquer janela
/* 466 */ 			clearInterval(timeout);
/* 467 */ 			timeout = null;
/* 468 */ 			_collapse(evt);
/* 469 */ 		});
/* 470 */ 	}
/* 471 */ 	
/* 472 */ 	
/* 473 */ 	/** 
/* 474 *| 	 * Navegação por teclado no menu
/* 475 *| 	 * ***************************/
/* 476 */ 	var menu_link_itens 		= $("#menu_modal a.item:visible");
/* 477 */ 	var selected_index			= 0;
/* 478 */ 	
/* 479 */ 	var submenu_link_itens		= [];
/* 480 */ 	var submenu_selected_index	= false;
/* 481 */ 	
/* 482 */ 	/* Realiza o Scroll para mostrar o elemento */
/* 483 */ 	function menu_update_scroll(ontop){
/* 484 */ 		ontop 				= (ontop===true);
/* 485 */ 		var el				= menu_link_itens.eq(selected_index);
/* 486 */ 		var position 		= el.parent().position().top;
/* 487 */ 		var elHeight		= el.height();
/* 488 */ 		
/* 489 */ 		var scroll			= $("#menu_modal_scroll");
/* 490 */ 		var divHeight 		= scroll.height();
/* 491 */ 		var divScroll 		= scroll.scrollTop();
/* 492 */ 		
/* 493 */ 		//coloca item no topo caso ontop seja true
/* 494 */ 		if(ontop){
/* 495 */ 			scroll.scrollTop(Math.floor(position));
/* 496 */ 			return;
/* 497 */ 		}
/* 498 */ 		
/* 499 */ 		//se a posicao do elemento for maior que a altura do Div, aumenta o scroll em posicao + altura do elemento - altura da div
/* 500 */ 		if(Math.ceil(position + elHeight) > Math.floor(divScroll + divHeight)){

/* menu.js */

/* 501 */ 			scroll.scrollTop(Math.ceil(position + elHeight - divHeight));
/* 502 */ 		}
/* 503 */ 		//se a posicao for menor, coloca o elemento no topo
/* 504 */ 		else if(Math.floor(position) < Math.ceil(divScroll)){
/* 505 */ 			scroll.scrollTop(Math.floor(position));
/* 506 */ 		}
/* 507 */ 	}
/* 508 */ 	
/* 509 */ 	
/* 510 */ 	/* Atualiza o elemento selecionado para o primeiro da lista */
/* 511 */ 	function menu_update_selected(keep_last){
/* 512 */ 		//verificando parametro
/* 513 */ 		keep_last = (keep_last===true);
/* 514 */ 		
/* 515 */ 		//atualizando lista de elementos
/* 516 */ 		menu_link_itens 	= $("#menu_modal a.item:visible");
/* 517 */ 		selected_index 		= menu_find_current_selected();
/* 518 */ 		
/* 519 */ 		if(!keep_last || selected_index==0){ //mantém ultima selecao
/* 520 */ 			$("#menu_modal a.selected").removeClass("selected");
/* 521 */ 			$("#menu_modal a.item:visible:first").addClass("selected");
/* 522 */ 			$("#menu_modal_scroll").scrollTop(0);
/* 523 */ 		}else{
/* 524 */ 			//Da um scroll com gap de 150px pra cima para ficar mais visivel quando menu for aberto sem filtro com a ultima opcao selecionada
/* 525 */ 			menu_update_scroll(true); 
/* 526 */ 		}
/* 527 */ 	}
/* 528 */ 	
/* 529 */ 	
/* 530 */ 	/* Encontra o indice do item selecionado atualmente*/
/* 531 */ 	function menu_find_current_selected(){
/* 532 */ 		for(i=0; i<menu_link_itens.length; i++){
/* 533 */ 			if(menu_link_itens.eq(i).is(".selected")){
/* 534 */ 				return i;
/* 535 */ 			}
/* 536 */ 		}
/* 537 */ 		return 0;
/* 538 */ 	}
/* 539 */ 	
/* 540 */ 	
/* 541 */ 	/* Seleciona Item clicado */
/* 542 */ 	function menu_select_item(item){
/* 543 */ 		$("#menu_modal a.selected").removeClass("selected");
/* 544 */ 		item.addClass("selected");
/* 545 */ 	}
/* 546 */ 
/* 547 */ 	
/* 548 */ 	/* SubMenu: Encontra o indice do item selecionado atualmente*/
/* 549 */ 	function submenu_find_current_selected(){
/* 550 */ 		var submenu_link_itens = $("#menu_sub > ul a.item:visible");

/* menu.js */

/* 551 */ 		for(i=0; i<submenu_link_itens.length; i++){
/* 552 */ 			if(submenu_link_itens.eq(i).is(".selected")){
/* 553 */ 				return i;
/* 554 */ 			}
/* 555 */ 		}
/* 556 */ 		return 0;
/* 557 */ 	}
/* 558 */ 	
/* 559 */ 	/* SubMenu: Seleciona Item clicado */
/* 560 */ 	function submenu_select_item(item){
/* 561 */ 		$("#menu_sub > ul a.selected").removeClass("selected");
/* 562 */ 		item.addClass("selected");
/* 563 */ 	}
/* 564 */ 	
/* 565 */ 
/* 566 */ 	/* Submenu : ao abrir */
/* 567 */ 	function subopen(){
/* 568 */ 		submenu_link_itens		= $("#menu_sub a.item:visible");
/* 569 */ 		submenu_selected_index 	= 0;
/* 570 */ 		submenu_link_itens.eq(submenu_selected_index).addClass("selected");
/* 571 */ 	}
/* 572 */ 	
/* 573 */ 	/* Submenu : ao fechar */
/* 574 */ 	function subclose(){
/* 575 */ 		$("#menu_sub > ul a.selected").removeClass("selected");
/* 576 */ 		submenu_selected_index = false;
/* 577 */ 	}
/* 578 */ 	
/* 579 */ 	/* Trata eventos de teclado */
/* 580 */ 	function menu_key_action(evt){
/* 581 */ 		
/* 582 */ 		//encontra o elemento atualmente selecionado
/* 583 */ 		selected_index 		= menu_find_current_selected();
/* 584 */ 		
/* 585 */ 		var key 			= evt.which;
/* 586 */ 		var current			= menu_link_itens.eq(selected_index);
/* 587 */ 		var submenu_current = (submenu_selected_index !== false) ?submenu_link_itens.eq(submenu_selected_index) : null;
/* 588 */ 		var all_selected	= $("#menu_modal a.selected");
/* 589 */ 		var target			= $(evt.target);
/* 590 */ 		
/* 591 */ 		switch (key) {
/* 592 */ 		
/* 593 */ 		case 38:	//SETA CIMA
/* 594 */ 			evt.preventDefault();
/* 595 */ 			evt.stopPropagation();
/* 596 */ 			
/* 597 */ 			//está no submenu
/* 598 */ 			if(submenu_selected_index !== false){
/* 599 */ 				submenu_current.removeClass("selected");								//deseleciona todos os selected
/* 600 */ 				submenu_selected_index = (submenu_selected_index == 0) ? submenu_link_itens.length-1 : submenu_selected_index-1;

/* menu.js */

/* 601 */ 				submenu_link_itens.eq(submenu_selected_index).addClass("selected");		//seleciona o subitem anterior
/* 602 */ 			}
/* 603 */ 			
/* 604 */ 			//seleciona o item anterior se existir na lista
/* 605 */ 			else{
/* 606 */ 				current.removeClass("selected"); 									//deseleciona todos os selected
/* 607 */ 				selected_index = (selected_index == 0) ? menu_link_itens.length-1 : selected_index-1; 
/* 608 */ 				menu_link_itens.eq(selected_index).addClass("selected");			//seleciona o anterior
/* 609 */ 				
/* 610 */ 				//rola a tela caso o item esteja fora dela
/* 611 */ 				menu_update_scroll();
/* 612 */ 			}
/* 613 */ 			
/* 614 */ 			break;
/* 615 */ 			
/* 616 */ 		case 40:	//SETA BAIXO
/* 617 */ 			evt.preventDefault();
/* 618 */ 			evt.stopPropagation();
/* 619 */ 			
/* 620 */ 			//está no submenu
/* 621 */ 			if(submenu_selected_index !== false && submenu_current != null){
/* 622 */ 				submenu_current.removeClass("selected");									//deseleciona todos os selected
/* 623 */ 				submenu_selected_index = (submenu_selected_index == submenu_link_itens.length-1) ? 0 : submenu_selected_index+1;
/* 624 */ 				submenu_link_itens.eq(submenu_selected_index).addClass("selected");			//seleciona o proximo subitem	
/* 625 */ 			}
/* 626 */ 			
/* 627 */ 			//seleciona o proximo item se existir na lista
/* 628 */ 			else{ 
/* 629 */ 				current.removeClass("selected");									//deseleciona todos os selected
/* 630 */ 				selected_index = (selected_index == menu_link_itens.length-1) ? 0 : selected_index + 1;
/* 631 */ 				menu_link_itens.eq(selected_index).addClass("selected");			//seleciona o proximo item
/* 632 */ 				
/* 633 */ 				//rola a tela caso o item esteja fora dela
/* 634 */ 				menu_update_scroll();
/* 635 */ 			}
/* 636 */ 			break;
/* 637 */ 			
/* 638 */ 		case 39:	//SETA DIREITA
/* 639 */ 			
/* 640 */ 			//verifica se possui submenu
/* 641 */ 			if(current.attr("item_group") == "true"){
/* 642 */ 				
/* 643 */ 				//se o menu não estiver aberto, bloqueia navegação padrão
/* 644 */ 				if(submenu_selected_index === false){
/* 645 */ 					evt.preventDefault();
/* 646 */ 					evt.stopPropagation();
/* 647 */ 				}
/* 648 */ 				
/* 649 */ 				//abre o submenu
/* 650 */ 				current.next().click();

/* menu.js */

/* 651 */ 			}
/* 652 */ 			
/* 653 */ 			break;
/* 654 */ 			
/* 655 */ 		case 37:	//SETA ESQUERDA
/* 656 */ 			
/* 657 */ 			//verifica se o item selecionado atualmente está no submenu
/* 658 */ 			if(submenu_selected_index !== false){
/* 659 */ 				
/* 660 */ 				evt.preventDefault();
/* 661 */ 				evt.stopPropagation();
/* 662 */ 				
/* 663 */ 				//caso submenu esteja aberto, clica em fechar o submenu
/* 664 */ 				$("#menu_sub_wrapper .submenu_hide").click();
/* 665 */ 			}
/* 666 */ 			break;
/* 667 */ 			
/* 668 */ 		case 9:		//TAB 
/* 669 */ 			evt.preventDefault();
/* 670 */ 			evt.stopPropagation();
/* 671 */ 			break;
/* 672 */ 			
/* 673 */ 		case 13: 	//ENTER
/* 674 */ 			evt.preventDefault();
/* 675 */ 			evt.stopPropagation();
/* 676 */ 			
/* 677 */ 			if(submenu_selected_index !== false){
/* 678 */ 				 if(submenu_current.length == 1){
/* 679 */ 					//mootools
/* 680 */ 					$$(submenu_current.get())[0].fireEvent("click", new Event(evt));
/* 681 */ 					//jquery
/* 682 */ 					submenu_current.click();
/* 683 */ 				 }
/* 684 */ 			}
/* 685 */ 			//se há algum item selecionado, clica nele
/* 686 */ 			else if(current.length == 1){
/* 687 */ 				//mootools
/* 688 */ 				$$(current.get())[0].fireEvent("click", new Event(evt));
/* 689 */ 				//jquery
/* 690 */ 				current.click();
/* 691 */ 			}
/* 692 */ 			break;
/* 693 */ 			
/* 694 */ 		case 27: 	//ESC
/* 695 */ 			evt.preventDefault();
/* 696 */ 			evt.stopPropagation();
/* 697 */ 			$("#menu").trigger("hide");
/* 698 */ 			break;
/* 699 */ 		
/* 700 */ 		//Retorna dizendo que nao houve alterações na seleção

/* menu.js */

/* 701 */ 		default:
/* 702 */ 			if(key==8 || key==46 || (key >= 48 && key <= 90) || (key >= 96 && key <= 111) || (key >= 186 && key <= 222)){
/* 703 */ 				return false;
/* 704 */ 			}
/* 705 */ 			break;
/* 706 */ 		}
/* 707 */ 		
/* 708 */ 		//houve alguma alteração na seleção
/* 709 */ 		return true;
/* 710 */ 	}
/* 711 */ 	
/* 712 */ 	/** 
/* 713 *| 	 * Pesquisa no menu 
/* 714 *| 	 * ***************************/
/* 715 */ 	function menu_filtro(){
/* 716 */ 		var lista		= $("#menu_modal li.item");
/* 717 */ 		var lista_nomes	= $("#menu_modal li.item .label");
/* 718 */ 		var lista_cats	= $("#menu_modal li.categoria a.returnFalse");
/* 719 */ 		var num_cats 	= lista_cats.length;
/* 720 */ 		var filtro 		= $("#filtro input");
/* 721 */ 		var placeholder	= filtro.attr('placeholder');
/* 722 */ 		var bg 			= $("#menu_wrapper_bg");
/* 723 */ 		var subhide		= $("#menu_sub_wrapper").find(".submenu_hide");
/* 724 */ 		
/* 725 */ 		//Tratando Teclas
/* 726 */ 		filtro.keydown(function(evt){
/* 727 */ 			
/* 728 */ 			//executa rotina de navegação e tratamento de teclas
/* 729 */ 			filtro.data('sel_changed', menu_key_action(evt));
/* 730 */ 			
/* 731 */ 			//se classe vazia, limpa o campo
/* 732 */ 			if(!filtro.data('sel_changed') && filtro.is(".vazio")){
/* 733 */ 				filtro.removeClass("vazio");
/* 734 */ 				filtro.val("");
/* 735 */ 			}
/* 736 */ 			
/* 737 */ 			//esconde o submenu, caso esteja aberto
/* 738 */ 			if(!filtro.data('sel_changed') && submenu_selected_index!==false){
/* 739 */ 				subhide.click();
/* 740 */ 			}
/* 741 */ 			
/* 742 */ 		});
/* 743 */ 		
/* 744 */ 		//executando filtro ao teclar
/* 745 */ 		filtro.keyup(function(evt){
/* 746 */ 			var $this 	= $(this);
/* 747 */ 			var val 	= $this.val().toLowerCase();
/* 748 */ 			
/* 749 */ 			//verifica se foi digitado algo
/* 750 */ 			if(filtro.is(".vazio")) return;

/* menu.js */

/* 751 */ 			
/* 752 */ 			//itens
/* 753 */ 			lista.each(function(i, el){
/* 754 */ 				var $el 	= $(el); 
/* 755 */ 				var nome 	= lista_nomes.eq(i).text().toLowerCase();
/* 756 */ 				var keys 	= $el.attr("meta").toLowerCase();
/* 757 */ 				var regexp	= new RegExp("(?="+val+")", "g");
/* 758 */ 				
/* 759 */ 				//Se está fora da seleção, esconde
/* 760 */ 				if(val!="" && !regexp.test(nome) && !regexp.test(keys)){
/* 761 */ 					$el.hide();
/* 762 */ 				}else{
/* 763 */ 					$el.show();
/* 764 */ 				}
/* 765 */ 			});
/* 766 */ 			
/* 767 */ 			//categorias
/* 768 */ 			lista_cats.each(function(i, el){
/* 769 */ 				var $el = lista_cats.eq(num_cats-i-1);
/* 770 */ 				
/* 771 */ 				if($el.parent().find("ul:first > li > a.item:visible").length == 0){
/* 772 */ 					$el.hide();
/* 773 */ 				}else{
/* 774 */ 					$el.show();
/* 775 */ 				}
/* 776 */ 			});
/* 777 */ 			
/* 778 */ 			//atualiza o selecionado, caso nao tenha havido apenas uma troca de seleção
/* 779 */ 			if(!filtro.data('sel_changed')){
/* 780 */ 				menu_update_selected();
/* 781 */ 			}
/* 782 */ 			
/* 783 */ 			//colocando classe inativa
/* 784 */ 			if(filtro.val()==""){
/* 785 */ 				filtro.addClass("vazio");
/* 786 */ 				filtro.val(placeholder);
/* 787 */ 			}
/* 788 */ 		});
/* 789 */ 		
/* 790 */ 		//reseta o filtro
/* 791 */ 		filtro.bind("reset", function(){
/* 792 */ 			lista.show();
/* 793 */ 			lista_cats.show();
/* 794 */ 			filtro.val(filtro.attr('placeholder'));
/* 795 */ 			filtro.addClass("vazio");
/* 796 */ 			//$("#menu_modal a.selected").removeClass("selected");
/* 797 */ 		});
/* 798 */ 		
/* 799 */ 		//retirando classe inativa
/* 800 */ 		filtro.blur(function(){

/* menu.js */

/* 801 */ 			if(filtro.val()==""){
/* 802 */ 				filtro.addClass("vazio");
/* 803 */ 				filtro.val(placeholder);
/* 804 */ 			}
/* 805 */ 		});
/* 806 */ 		
/* 807 */ 		//inserindo evento de clique para atualizar elemento selecionado
/* 808 */ 		$("#menu_modal a.item").click(function(evt){
/* 809 */ 			menu_select_item($(this));
/* 810 */ 		});
/* 811 */ 		
/* 812 */ 		//voltando foco para filtro
/* 813 */ 		$("#menu_modal_wrapper, #menu_modal_scroll, #menu_modal, #menu_sub_modal_scroll, #menu_sub,.returnFalse, .submenu_hide").click(function(){
/* 814 */ 			$("#filtro input").focus();
/* 815 */ 		});
/* 816 */ 	}
/* 817 */ 
/* 818 */ 
/* 819 */ 	
/* 820 */ 	/** 
/* 821 *| 	 * Integração entre eventos de teclado e mouse no menu 
/* 822 *| 	 * ***************************/
/* 823 */ 	function acoesMenu(){
/* 824 */ 		var timer;
/* 825 */ 		var itens 		= $("#menu_modal a.item, #menu_modal .submenu_link");
/* 826 */ 		var container 	= $("#menu_modal_wrapper");
/* 827 */ 		var sub_wrapper	= $("#menu_sub_wrapper");
/* 828 */ 		var subhide		= sub_wrapper.find(".submenu_hide");
/* 829 */ 		
/* 830 */ 		//ao deixar o mouse sobre um elemento do menu por X segundos, coloca o foco no item
/* 831 */ 		itens.mouseenter(function(evt){
/* 832 */ 			var item 	= $(this).parent().find('a');
/* 833 */ 			var sublink = $(this).parent().find('.submenu_link');
/* 834 */ 			
/* 835 */ 		    timer = setTimeout(function(){
/* 836 */ 		    	menu_select_item(item);
/* 837 */ 		    	
/* 838 */ 		    	if(sublink.length > 0){
/* 839 */ 		    		sublink.click();
/* 840 */ 		    	}else{
/* 841 */ 		    		//Esconde Submenu
/* 842 */ 		    		subhide.click();
/* 843 */ 		    	}
/* 844 */ 		    	
/* 845 */ 		    }, 1000);
/* 846 */ 		}).mouseleave(function(){
/* 847 */ 		    clearTimeout(timer);
/* 848 */ 		});
/* 849 */ 		
/* 850 */ 		container.find(".submenu_link").click(function(evt){

/* menu.js */

/* 851 */ 			menu_select_item($(this).prev("a"));
/* 852 */ 		});
/* 853 */ 		
/* 854 */ 		//ao abrir o submenu pelo mouse click, coloca o foco de teclado no submenu, sem item selecionado 
/* 855 */ 		//adiciona evento ao abrir o submenu
/* 856 */ 		$("#menu_modal_wrapper").bind('submenu_loaded.subopen', subopen);
/* 857 */ 		
/* 858 */ 		//adiciona evento ao fechar o submenu
/* 859 */ 		$("#menu_modal_wrapper").bind('submenu_closed.subclose', subclose);
/* 860 */ 	}
/* 861 */ 	
/* 862 */ 	
/* 863 */ 	
/* 864 */ 	/** 
/* 865 *| 	 * Inicio
/* 866 *| 	 * ***************************/
/* 867 */ 	$(document).ready(function(){
/* 868 */ 		//modais
/* 869 */ 		menuModal();
/* 870 */ 		
/* 871 */ 		//menus topo
/* 872 */ 		menusTopo();
/* 873 */ 		
/* 874 */ 		//expandindo o menu com os nomes
/* 875 */ 		expandeMenu();
/* 876 */ 		
/* 877 */ 		//Filtragem do menu
/* 878 */ 		menu_filtro();
/* 879 */ 		
/* 880 */ 		//Integração de ações de teclado e mouse
/* 881 */ 		acoesMenu();
/* 882 */ 		
/* 883 */ 		//Fecha os avisos do sistema
/* 884 */ 		fechaAvisos();
/* 885 */ 		
/* 886 */ 		//tooltips
/* 887 */ 		//menuToolTips();
/* 888 */ 	});
/* 889 */ 	
/* 890 */ 	
/* 891 */ 	
/* 892 */ })(jQuery);