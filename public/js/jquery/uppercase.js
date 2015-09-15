
/* uppercase.js */

/* 1 */ /* Copyright (c) 2009 Mustafa OZCAN (http://www.mustafaozcan.net)
/* 2 *| * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
/* 3 *| * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
/* 4 *| * Version: 1.0
/* 5 *| * Requires: jquery.1.2.6+
/* 6 *| */
/* 7 */ (function($) { $.fn.bestupper = function(settings) { var defaults = { ln: 'en', clear: true }, settings = $.extend({}, defaults, settings); this.each(function() { var $this = $(this); if ($this.is('textarea') || $this.is('input:text')) { $this.keypress(function(e) { var pressedKey = e.charCode == undefined ? e.keyCode : e.charCode; var str = String.fromCharCode(pressedKey); if (pressedKey < 97 || pressedKey > 122) { if (settings.ln == 'en' || !isTRChar(pressedKey)) return; } if (settings.ln == 'tr' && pressedKey == 105) str = '\u0130'; if (this.createTextRange) { window.event.keyCode = str.toUpperCase().charCodeAt(0); return; } else { var startpos = this.selectionStart; var endpos = this.selectionEnd; this.value = this.value.substr(0, startpos) + str.toUpperCase() + this.value.substr(endpos); this.setSelectionRange(startpos + 1, startpos + 1); return false; } }); if (settings.clear) { $this.blur(function(e) { if (settings.ln == 'tr') this.value = this.value.replace(/i/g, "\u0130"); this.value = this.value.replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ").toUpperCase(); }); } } }); }; function isTRChar(key) { var trchar = [231, 246, 252, 287, 305, 351]; for (var i = 0; i < trchar.length; i++) { if (trchar[i] == key) return true; } return false; } })(jQuery);
