
/* dump.js */

/* 1   */ /**
/* 2   *|  * jquery.dump.js
/* 3   *|  * @author Torkild Dyvik Olsen
/* 4   *|  * @version 1.0
/* 5   *|  * 
/* 6   *|  * A simple debug function to gather information about an object.
/* 7   *|  * Returns a nested tree with information.
/* 8   *|  * 
/* 9   *|  */
/* 10  */ (function($) {
/* 11  */ 
/* 12  */ $.fn.dump = function() {
/* 13  */    return $.dump(this);
/* 14  */ }
/* 15  */ 
/* 16  */ $.dump = function(object) {
/* 17  */    var recursion = function(obj, level) {
/* 18  */       if(!level) level = 0;
/* 19  */       var dump = '', p = '';
/* 20  */       for(i = 0; i < level; i++) p += "\t";
/* 21  */       
/* 22  */       t = type(obj);
/* 23  */       switch(t) {
/* 24  */          case "string":
/* 25  */             return '"' + obj + '"';
/* 26  */             break;
/* 27  */          case "number":
/* 28  */             return obj.toString();
/* 29  */             break;
/* 30  */          case "boolean":
/* 31  */             return obj ? 'true' : 'false';
/* 32  */          case "date":
/* 33  */             return "Date: " + obj.toLocaleString();
/* 34  */          case "array":
/* 35  */             dump += 'Array ( \n';
/* 36  */             $.each(obj, function(k,v) {
/* 37  */                dump += p +'\t' + k + ' => ' + recursion(v, level + 1) + '\n';
/* 38  */             });
/* 39  */             dump += p + ')';
/* 40  */             break;
/* 41  */          case "object":
/* 42  */             dump += 'Object { \n';
/* 43  */             $.each(obj, function(k,v) {
/* 44  */                dump += p + '\t' + k + ': ' + recursion(v, level + 1) + '\n';
/* 45  */             });
/* 46  */             dump += p + '}';
/* 47  */             break;
/* 48  */          case "jquery":
/* 49  */             dump += 'jQuery Object { \n';
/* 50  */             $.each(obj, function(k,v) {

/* dump.js */

/* 51  */                dump += p + '\t' + k + ' = ' + recursion(v, level + 1) + '\n';
/* 52  */             });
/* 53  */             dump += p + '}';
/* 54  */             break;
/* 55  */          case "regexp":
/* 56  */             return "RegExp: " + obj.toString();
/* 57  */          case "error":
/* 58  */             return obj.toString();
/* 59  */          case "document":
/* 60  */          case "domelement":
/* 61  */             dump += 'DOMElement [ \n'
/* 62  */                   + p + '\tnodeName: ' + obj.nodeName + '\n'
/* 63  */                   + p + '\tnodeValue: ' + obj.nodeValue + '\n'
/* 64  */                   + p + '\tinnerHTML: [ \n';
/* 65  */             $.each(obj.childNodes, function(k,v) {
/* 66  */                if(k < 1) var r = 0;
/* 67  */                if(type(v) == "string") {
/* 68  */                   if(v.textContent.match(/[^\s]/)) {
/* 69  */                      dump += p + '\t\t' + (k - (r||0)) + ' = String: ' + trim(v.textContent) + '\n';
/* 70  */                   } else {
/* 71  */                      r--;
/* 72  */                   }
/* 73  */                } else {
/* 74  */                   dump += p + '\t\t' + (k - (r||0)) + ' = ' + recursion(v, level + 2) + '\n';
/* 75  */                }
/* 76  */             });
/* 77  */             dump += p + '\t]\n'
/* 78  */                   + p + ']';
/* 79  */             break;
/* 80  */          case "function":
/* 81  */             var match = obj.toString().match(/^(.*)\(([^\)]*)\)/im);
/* 82  */             match[1] = trim(match[1].replace(new RegExp("[\\s]+", "g"), " "));
/* 83  */             match[2] = trim(match[2].replace(new RegExp("[\\s]+", "g"), " "));
/* 84  */             return match[1] + "(" + match[2] + ")";
/* 85  */          case "window":
/* 86  */          default:
/* 87  */             dump += 'N/A: ' + t;
/* 88  */             break;
/* 89  */       }
/* 90  */       
/* 91  */       return dump;
/* 92  */    }
/* 93  */    
/* 94  */    var type = function(obj) {
/* 95  */       var type = typeof(obj);
/* 96  */       
/* 97  */       if(type != "object") {
/* 98  */          return type;
/* 99  */       }
/* 100 */       

/* dump.js */

/* 101 */       switch(obj) {
/* 102 */          case null:
/* 103 */             return 'null';
/* 104 */          case window:
/* 105 */             return 'window';
/* 106 */          case document:
/* 107 */             return 'document';
/* 108 */          case window.event:
/* 109 */             return 'event';
/* 110 */          default:
/* 111 */             break;
/* 112 */       }
/* 113 */       
/* 114 */       if(obj.jquery) {
/* 115 */          return 'jquery';
/* 116 */       }
/* 117 */       
/* 118 */       switch(obj.constructor) {
/* 119 */          case Array:
/* 120 */             return 'array';
/* 121 */          case Boolean:
/* 122 */             return 'boolean';
/* 123 */          case Date:
/* 124 */             return 'date';
/* 125 */          case Object:
/* 126 */             return 'object';
/* 127 */          case RegExp:
/* 128 */             return 'regexp';
/* 129 */          case ReferenceError:
/* 130 */          case Error:
/* 131 */             return 'error';
/* 132 */          case null:
/* 133 */          default:
/* 134 */             break;
/* 135 */       }
/* 136 */       
/* 137 */       switch(obj.nodeType) {
/* 138 */          case 1:
/* 139 */             return 'domelement';
/* 140 */          case 3:
/* 141 */             return 'string';
/* 142 */          case null:
/* 143 */          default:
/* 144 */             break;
/* 145 */       }
/* 146 */       
/* 147 */       return 'Unknown';
/* 148 */    }
/* 149 */    
/* 150 */    return recursion(object);

/* dump.js */

/* 151 */ }
/* 152 */ 
/* 153 */ function trim(str) {
/* 154 */    return ltrim(rtrim(str));
/* 155 */ }
/* 156 */ 
/* 157 */ function ltrim(str) {
/* 158 */    return str.replace(new RegExp("^[\\s]+", "g"), "");
/* 159 */ }
/* 160 */ 
/* 161 */ function rtrim(str) {
/* 162 */    return str.replace(new RegExp("[\\s]+$", "g"), "");
/* 163 */ }
/* 164 */ 
/* 165 */ })(jQuery);
