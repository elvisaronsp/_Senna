
/* barcode.js */

/* 1  */ /**
/* 2  *|  * @author Bruno Barbosa
/* 3  *|  */
/* 4  */ 
/* 5  */ /**
/* 6  *|  * Calculando ean 
/* 7  *|  * */
/* 8  */ function calc_ean_dv(value){
/* 9  */ 	
/* 10 */ 	var pares = 0 ;
/* 11 */ 	var impares = 0;
/* 12 */ 	var dv;
/* 13 */ 	var cod = value.replace('-','');
/* 14 */ 	
/* 15 */ 	/* verificando se tem todos os digitos, caso nao haja criando-o e fazendo verificacao caso tenha */
/* 16 */ 	if(cod.length <= 11) return false;
/* 17 */ 	/* fazendo verificacao*/
/* 18 */ 	for (i=0; i <= 11; i++){
/* 19 */ 		mod = i%2;
/* 20 */ 		if( mod == 0 ){
/* 21 */ 			pares += parseInt(value[i]);
/* 22 */ 		}else{
/* 23 */ 			impares += parseInt(value[i]) * 3;
/* 24 */ 		}	
/* 25 */ 	}
/* 26 */ 	dv = 10 - ((impares + pares) % 10);
/* 27 */ 	if (dv > 9){ dv=0; }
/* 28 */ 	return dv;
/* 29 */ }
/* 30 */ 
/* 31 */ /**
/* 32 *|  * Gera o ean
/* 33 *|  */
/* 34 */ 
/* 35 */ //gerando ean para o funcionario
/* 36 */ function gera_ean (){
/* 37 */ 	var data 	= new Date().getTime();
/* 38 */ 	var cod 	= (jQuery.randomBetween(1, 99999) * data)+"";
/* 39 */ 	cod = "27"+cod.substr(-10);
/* 40 */ 	cod += calc_ean_dv(cod);
/* 41 */ 	return cod;
/* 42 */ };
/* 43 */ 
/* 44 */ ///* Validando ean --------------------------------*/
/* 45 */ //jQuery.validator.addMethod("ean", function(value, element) {  
/* 46 */ //	var cod = value.replace('-','');
/* 47 */ //	var dv = calc_ean_dv(value);
/* 48 */ //	return (dv && cod.charAt(12)==dv);
/* 49 */ //}); 
/* 50 */ 

/* barcode.js */

/* 51 */ /*
/* 52 *|  * jQuery Random Plugin
/* 53 *|  * 
/* 54 *|  * Adds two random number functions to jQuery -
/* 55 *|  * one to find a random number and one to find a random number between a max and min limit.
/* 56 *|  */
/* 57 */ jQuery.extend({
/* 58 */ 	random: function(X) {
/* 59 */ 	    return Math.floor(X * (Math.random() % 1));
/* 60 */ 	},
/* 61 */ 	randomBetween: function(MinV, MaxV) {
/* 62 */ 	  return MinV + jQuery.random(MaxV - MinV + 1);
/* 63 */ 	}
/* 64 */ });
/* 65 */ 
/* 66 */ 
