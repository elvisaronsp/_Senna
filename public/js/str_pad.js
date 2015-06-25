
/* str_pad.js */

/* 1  */ /**
/* 2  *|  * Efetua o padding de uma string
/* 3  *|  * Returns input string padded on the left or right to specified length with pad_string  
/* 4  *|  * @param input
/* 5  *|  * @param pad_length
/* 6  *|  * @param pad_string
/* 7  *|  * @param pad_type
/* 8  *|  * @return
/* 9  *|  */
/* 10 */ function str_pad (input, pad_length, pad_string, pad_type) {
/* 11 */ 	var half = '', pad_to_go;
/* 12 */ 	var str_pad_repeater = function (s, len) {
/* 13 */ 		var collect = '', i;
/* 14 */ 
/* 15 */ 		while (collect.length < len) {collect += s;}
/* 16 */ 		collect = collect.substr(0,len); 
/* 17 */ 		return collect;
/* 18 */ 	};
/* 19 */ 	input += '';    pad_string = pad_string !== undefined ? pad_string : ' ';
/* 20 */ 	if (pad_type != 'STR_PAD_LEFT' && pad_type != 'STR_PAD_RIGHT' && pad_type != 'STR_PAD_BOTH') { pad_type = 'STR_PAD_RIGHT'; }
/* 21 */ 	if ((pad_to_go = pad_length - input.length) > 0) {
/* 22 */ 		if (pad_type == 'STR_PAD_LEFT') { input = str_pad_repeater(pad_string, pad_to_go) + input; }        else if (pad_type == 'STR_PAD_RIGHT') { input = input + str_pad_repeater(pad_string, pad_to_go); }
/* 23 */ 		else if (pad_type == 'STR_PAD_BOTH') {
/* 24 */ 			half = str_pad_repeater(pad_string, Math.ceil(pad_to_go/2));
/* 25 */ 			input = half + input + half;
/* 26 */ 			input = input.substr(0, pad_length);        }
/* 27 */ 	}
/* 28 */ 	return input;
/* 29 */ }
