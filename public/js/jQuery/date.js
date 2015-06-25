
/* date.js */

/* 1   */ /*
/* 2   *|  * Date prototype extensions. Doesn't depend on any
/* 3   *|  * other code. Doens't overwrite existing methods.
/* 4   *|  *
/* 5   *|  * Adds dayNames, abbrDayNames, monthNames and abbrMonthNames static properties and isLeapYear,
/* 6   *|  * isWeekend, isWeekDay, getDaysInMonth, getDayName, getMonthName, getDayOfYear, getWeekOfYear,
/* 7   *|  * setDayOfYear, addYears, addMonths, addDays, addHours, addMinutes, addSeconds methods
/* 8   *|  *
/* 9   *|  * Copyright (c) 2006 Jörn Zaefferer and Brandon Aaron (brandon.aaron@gmail.com || http://brandonaaron.net)
/* 10  *|  *
/* 11  *|  * Additional methods and properties added by Kelvin Luck: firstDayOfWeek, dateFormat, zeroTime, asString, fromString -
/* 12  *|  * I've added my name to these methods so you know who to blame if they are broken!
/* 13  *|  * 
/* 14  *|  * Dual licensed under the MIT and GPL licenses:
/* 15  *|  *   http://www.opensource.org/licenses/mit-license.php
/* 16  *|  *   http://www.gnu.org/licenses/gpl.html
/* 17  *|  *
/* 18  *|  */
/* 19  */ 
/* 20  */ /**
/* 21  *|  * An Array of day names starting with Sunday.
/* 22  *|  * 
/* 23  *|  * @example dayNames[0]
/* 24  *|  * @result 'Sunday'
/* 25  *|  *
/* 26  *|  * @name dayNames
/* 27  *|  * @type Array
/* 28  *|  * @cat Plugins/Methods/Date
/* 29  *|  */
/* 30  */ Date.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
/* 31  */ 
/* 32  */ /**
/* 33  *|  * An Array of abbreviated day names starting with Sun.
/* 34  *|  * 
/* 35  *|  * @example abbrDayNames[0]
/* 36  *|  * @result 'Sun'
/* 37  *|  *
/* 38  *|  * @name abbrDayNames
/* 39  *|  * @type Array
/* 40  *|  * @cat Plugins/Methods/Date
/* 41  *|  */
/* 42  */ Date.abbrDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
/* 43  */ 
/* 44  */ /**
/* 45  *|  * An Array of month names starting with Janurary.
/* 46  *|  * 
/* 47  *|  * @example monthNames[0]
/* 48  *|  * @result 'January'
/* 49  *|  *
/* 50  *|  * @name monthNames

/* date.js */

/* 51  *|  * @type Array
/* 52  *|  * @cat Plugins/Methods/Date
/* 53  *|  */
/* 54  */ Date.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
/* 55  */ 
/* 56  */ /**
/* 57  *|  * An Array of abbreviated month names starting with Jan.
/* 58  *|  * 
/* 59  *|  * @example abbrMonthNames[0]
/* 60  *|  * @result 'Jan'
/* 61  *|  *
/* 62  *|  * @name monthNames
/* 63  *|  * @type Array
/* 64  *|  * @cat Plugins/Methods/Date
/* 65  *|  */
/* 66  */ Date.abbrMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/* 67  */ 
/* 68  */ /**
/* 69  *|  * The first day of the week for this locale.
/* 70  *|  *
/* 71  *|  * @name firstDayOfWeek
/* 72  *|  * @type Number
/* 73  *|  * @cat Plugins/Methods/Date
/* 74  *|  * @author Kelvin Luck
/* 75  *|  */
/* 76  */ Date.firstDayOfWeek = 1;
/* 77  */ 
/* 78  */ /**
/* 79  *|  * The format that string dates should be represented as (e.g. 'dd/mm/yyyy' for UK, 'mm/dd/yyyy' for US, 'yyyy-mm-dd' for Unicode etc).
/* 80  *|  *
/* 81  *|  * @name format
/* 82  *|  * @type String
/* 83  *|  * @cat Plugins/Methods/Date
/* 84  *|  * @author Kelvin Luck
/* 85  *|  */
/* 86  */ Date.format = 'dd/mm/yyyy';
/* 87  */ //Date.format = 'mm/dd/yyyy';
/* 88  */ //Date.format = 'yyyy-mm-dd';
/* 89  */ //Date.format = 'dd mmm yy';
/* 90  */ 
/* 91  */ /**
/* 92  *|  * The first two numbers in the century to be used when decoding a two digit year. Since a two digit year is ambiguous (and date.setYear
/* 93  *|  * only works with numbers < 99 and so doesn't allow you to set years after 2000) we need to use this to disambiguate the two digit year codes.
/* 94  *|  *
/* 95  *|  * @name format
/* 96  *|  * @type String
/* 97  *|  * @cat Plugins/Methods/Date
/* 98  *|  * @author Kelvin Luck
/* 99  *|  */
/* 100 */ Date.fullYearStart = '20';

/* date.js */

/* 101 */ 
/* 102 */ (function() {
/* 103 */ 
/* 104 */ 	/**
/* 105 *| 	 * Adds a given method under the given name 
/* 106 *| 	 * to the Date prototype if it doesn't
/* 107 *| 	 * currently exist.
/* 108 *| 	 *
/* 109 *| 	 * @private
/* 110 *| 	 */
/* 111 */ 	function add(name, method) {
/* 112 */ 		if( !Date.prototype[name] ) {
/* 113 */ 			Date.prototype[name] = method;
/* 114 */ 		}
/* 115 */ 	};
/* 116 */ 	
/* 117 */ 	/**
/* 118 *| 	 * Checks if the year is a leap year.
/* 119 *| 	 *
/* 120 *| 	 * @example var dtm = new Date("01/12/2008");
/* 121 *| 	 * dtm.isLeapYear();
/* 122 *| 	 * @result true
/* 123 *| 	 *
/* 124 *| 	 * @name isLeapYear
/* 125 *| 	 * @type Boolean
/* 126 *| 	 * @cat Plugins/Methods/Date
/* 127 *| 	 */
/* 128 */ 	add("isLeapYear", function() {
/* 129 */ 		var y = this.getFullYear();
/* 130 */ 		return (y%4==0 && y%100!=0) || y%400==0;
/* 131 */ 	});
/* 132 */ 	
/* 133 */ 	/**
/* 134 *| 	 * Checks if the day is a weekend day (Sat or Sun).
/* 135 *| 	 *
/* 136 *| 	 * @example var dtm = new Date("01/12/2008");
/* 137 *| 	 * dtm.isWeekend();
/* 138 *| 	 * @result false
/* 139 *| 	 *
/* 140 *| 	 * @name isWeekend
/* 141 *| 	 * @type Boolean
/* 142 *| 	 * @cat Plugins/Methods/Date
/* 143 *| 	 */
/* 144 */ 	add("isWeekend", function() {
/* 145 */ 		return this.getDay()==0 || this.getDay()==6;
/* 146 */ 	});
/* 147 */ 	
/* 148 */ 	/**
/* 149 *| 	 * Check if the day is a day of the week (Mon-Fri)
/* 150 *| 	 * 

/* date.js */

/* 151 *| 	 * @example var dtm = new Date("01/12/2008");
/* 152 *| 	 * dtm.isWeekDay();
/* 153 *| 	 * @result false
/* 154 *| 	 * 
/* 155 *| 	 * @name isWeekDay
/* 156 *| 	 * @type Boolean
/* 157 *| 	 * @cat Plugins/Methods/Date
/* 158 *| 	 */
/* 159 */ 	add("isWeekDay", function() {
/* 160 */ 		return !this.isWeekend();
/* 161 */ 	});
/* 162 */ 	
/* 163 */ 	/**
/* 164 *| 	 * Gets the number of days in the month.
/* 165 *| 	 * 
/* 166 *| 	 * @example var dtm = new Date("01/12/2008");
/* 167 *| 	 * dtm.getDaysInMonth();
/* 168 *| 	 * @result 31
/* 169 *| 	 * 
/* 170 *| 	 * @name getDaysInMonth
/* 171 *| 	 * @type Number
/* 172 *| 	 * @cat Plugins/Methods/Date
/* 173 *| 	 */
/* 174 */ 	add("getDaysInMonth", function() {
/* 175 */ 		return [31,(this.isLeapYear() ? 29:28),31,30,31,30,31,31,30,31,30,31][this.getMonth()];
/* 176 */ 	});
/* 177 */ 	
/* 178 */ 	/**
/* 179 *| 	 * Gets the name of the day.
/* 180 *| 	 * 
/* 181 *| 	 * @example var dtm = new Date("01/12/2008");
/* 182 *| 	 * dtm.getDayName();
/* 183 *| 	 * @result 'Saturday'
/* 184 *| 	 * 
/* 185 *| 	 * @example var dtm = new Date("01/12/2008");
/* 186 *| 	 * dtm.getDayName(true);
/* 187 *| 	 * @result 'Sat'
/* 188 *| 	 * 
/* 189 *| 	 * @param abbreviated Boolean When set to true the name will be abbreviated.
/* 190 *| 	 * @name getDayName
/* 191 *| 	 * @type String
/* 192 *| 	 * @cat Plugins/Methods/Date
/* 193 *| 	 */
/* 194 */ 	add("getDayName", function(abbreviated) {
/* 195 */ 		return abbreviated ? Date.abbrDayNames[this.getDay()] : Date.dayNames[this.getDay()];
/* 196 */ 	});
/* 197 */ 
/* 198 */ 	/**
/* 199 *| 	 * Gets the name of the month.
/* 200 *| 	 * 

/* date.js */

/* 201 *| 	 * @example var dtm = new Date("01/12/2008");
/* 202 *| 	 * dtm.getMonthName();
/* 203 *| 	 * @result 'Janurary'
/* 204 *| 	 *
/* 205 *| 	 * @example var dtm = new Date("01/12/2008");
/* 206 *| 	 * dtm.getMonthName(true);
/* 207 *| 	 * @result 'Jan'
/* 208 *| 	 * 
/* 209 *| 	 * @param abbreviated Boolean When set to true the name will be abbreviated.
/* 210 *| 	 * @name getDayName
/* 211 *| 	 * @type String
/* 212 *| 	 * @cat Plugins/Methods/Date
/* 213 *| 	 */
/* 214 */ 	add("getMonthName", function(abbreviated) {
/* 215 */ 		return abbreviated ? Date.abbrMonthNames[this.getMonth()] : Date.monthNames[this.getMonth()];
/* 216 */ 	});
/* 217 */ 
/* 218 */ 	/**
/* 219 *| 	 * Get the number of the day of the year.
/* 220 *| 	 * 
/* 221 *| 	 * @example var dtm = new Date("01/12/2008");
/* 222 *| 	 * dtm.getDayOfYear();
/* 223 *| 	 * @result 11
/* 224 *| 	 * 
/* 225 *| 	 * @name getDayOfYear
/* 226 *| 	 * @type Number
/* 227 *| 	 * @cat Plugins/Methods/Date
/* 228 *| 	 */
/* 229 */ 	add("getDayOfYear", function() {
/* 230 */ 		var tmpdtm = new Date("1/1/" + this.getFullYear());
/* 231 */ 		return Math.floor((this.getTime() - tmpdtm.getTime()) / 86400000);
/* 232 */ 	});
/* 233 */ 	
/* 234 */ 	/**
/* 235 *| 	 * Get the number of the week of the year.
/* 236 *| 	 * 
/* 237 *| 	 * @example var dtm = new Date("01/12/2008");
/* 238 *| 	 * dtm.getWeekOfYear();
/* 239 *| 	 * @result 2
/* 240 *| 	 * 
/* 241 *| 	 * @name getWeekOfYear
/* 242 *| 	 * @type Number
/* 243 *| 	 * @cat Plugins/Methods/Date
/* 244 *| 	 */
/* 245 */ 	add("getWeekOfYear", function() {
/* 246 */ 		return Math.ceil(this.getDayOfYear() / 7);
/* 247 */ 	});
/* 248 */ 
/* 249 */ 	/**
/* 250 *| 	 * Set the day of the year.

/* date.js */

/* 251 *| 	 * 
/* 252 *| 	 * @example var dtm = new Date("01/12/2008");
/* 253 *| 	 * dtm.setDayOfYear(1);
/* 254 *| 	 * dtm.toString();
/* 255 *| 	 * @result 'Tue Jan 01 2008 00:00:00'
/* 256 *| 	 * 
/* 257 *| 	 * @name setDayOfYear
/* 258 *| 	 * @type Date
/* 259 *| 	 * @cat Plugins/Methods/Date
/* 260 *| 	 */
/* 261 */ 	add("setDayOfYear", function(day) {
/* 262 */ 		this.setMonth(0);
/* 263 */ 		this.setDate(day);
/* 264 */ 		return this;
/* 265 */ 	});
/* 266 */ 	
/* 267 */ 	/**
/* 268 *| 	 * Add a number of years to the date object.
/* 269 *| 	 * 
/* 270 *| 	 * @example var dtm = new Date("01/12/2008");
/* 271 *| 	 * dtm.addYears(1);
/* 272 *| 	 * dtm.toString();
/* 273 *| 	 * @result 'Mon Jan 12 2009 00:00:00'
/* 274 *| 	 * 
/* 275 *| 	 * @name addYears
/* 276 *| 	 * @type Date
/* 277 *| 	 * @cat Plugins/Methods/Date
/* 278 *| 	 */
/* 279 */ 	add("addYears", function(num) {
/* 280 */ 		this.setFullYear(this.getFullYear() + num);
/* 281 */ 		return this;
/* 282 */ 	});
/* 283 */ 	
/* 284 */ 	/**
/* 285 *| 	 * Add a number of months to the date object.
/* 286 *| 	 * 
/* 287 *| 	 * @example var dtm = new Date("01/12/2008");
/* 288 *| 	 * dtm.addMonths(1);
/* 289 *| 	 * dtm.toString();
/* 290 *| 	 * @result 'Tue Feb 12 2008 00:00:00'
/* 291 *| 	 * 
/* 292 *| 	 * @name addMonths
/* 293 *| 	 * @type Date
/* 294 *| 	 * @cat Plugins/Methods/Date
/* 295 *| 	 */
/* 296 */ 	add("addMonths", function(num) {
/* 297 */ 		var tmpdtm = this.getDate();
/* 298 */ 		
/* 299 */ 		this.setMonth(this.getMonth() + num);
/* 300 */ 		

/* date.js */

/* 301 */ 		if (tmpdtm > this.getDate())
/* 302 */ 			this.addDays(-this.getDate());
/* 303 */ 		
/* 304 */ 		return this;
/* 305 */ 	});
/* 306 */ 	
/* 307 */ 	/**
/* 308 *| 	 * Add a number of days to the date object.
/* 309 *| 	 * 
/* 310 *| 	 * @example var dtm = new Date("01/12/2008");
/* 311 *| 	 * dtm.addDays(1);
/* 312 *| 	 * dtm.toString();
/* 313 *| 	 * @result 'Sun Jan 13 2008 00:00:00'
/* 314 *| 	 * 
/* 315 *| 	 * @name addDays
/* 316 *| 	 * @type Date
/* 317 *| 	 * @cat Plugins/Methods/Date
/* 318 *| 	 */
/* 319 */ 	add("addDays", function(num) {
/* 320 */ 		//this.setDate(this.getDate() + num);
/* 321 */ 		this.setTime(this.getTime() + (num*86400000) );
/* 322 */ 		return this;
/* 323 */ 	});
/* 324 */ 	
/* 325 */ 	/**
/* 326 *| 	 * Add a number of hours to the date object.
/* 327 *| 	 * 
/* 328 *| 	 * @example var dtm = new Date("01/12/2008");
/* 329 *| 	 * dtm.addHours(24);
/* 330 *| 	 * dtm.toString();
/* 331 *| 	 * @result 'Sun Jan 13 2008 00:00:00'
/* 332 *| 	 * 
/* 333 *| 	 * @name addHours
/* 334 *| 	 * @type Date
/* 335 *| 	 * @cat Plugins/Methods/Date
/* 336 *| 	 */
/* 337 */ 	add("addHours", function(num) {
/* 338 */ 		this.setHours(this.getHours() + num);
/* 339 */ 		return this;
/* 340 */ 	});
/* 341 */ 
/* 342 */ 	/**
/* 343 *| 	 * Add a number of minutes to the date object.
/* 344 *| 	 * 
/* 345 *| 	 * @example var dtm = new Date("01/12/2008");
/* 346 *| 	 * dtm.addMinutes(60);
/* 347 *| 	 * dtm.toString();
/* 348 *| 	 * @result 'Sat Jan 12 2008 01:00:00'
/* 349 *| 	 * 
/* 350 *| 	 * @name addMinutes

/* date.js */

/* 351 *| 	 * @type Date
/* 352 *| 	 * @cat Plugins/Methods/Date
/* 353 *| 	 */
/* 354 */ 	add("addMinutes", function(num) {
/* 355 */ 		this.setMinutes(this.getMinutes() + num);
/* 356 */ 		return this;
/* 357 */ 	});
/* 358 */ 	
/* 359 */ 	/**
/* 360 *| 	 * Add a number of seconds to the date object.
/* 361 *| 	 * 
/* 362 *| 	 * @example var dtm = new Date("01/12/2008");
/* 363 *| 	 * dtm.addSeconds(60);
/* 364 *| 	 * dtm.toString();
/* 365 *| 	 * @result 'Sat Jan 12 2008 00:01:00'
/* 366 *| 	 * 
/* 367 *| 	 * @name addSeconds
/* 368 *| 	 * @type Date
/* 369 *| 	 * @cat Plugins/Methods/Date
/* 370 *| 	 */
/* 371 */ 	add("addSeconds", function(num) {
/* 372 */ 		this.setSeconds(this.getSeconds() + num);
/* 373 */ 		return this;
/* 374 */ 	});
/* 375 */ 	
/* 376 */ 	/**
/* 377 *| 	 * Calcula a diferenca entre 2 datas e retorna a diferenca em dias
/* 378 *| 	 * 
/* 379 *| 	 * @result int
/* 380 *| 	 * @name diffDate
/* 381 *| 	 * @type Date
/* 382 *| 	 * @cat Plugins/Methods/Date
/* 383 *| 	 */
/* 384 */ 	add("diffDate", function(date) {
/* 385 */ 		var timeDiff = Math.abs(this.getTime() - date.getTime());
/* 386 */ 		return Math.ceil(timeDiff / (1000 * 3600 * 24));
/* 387 */ 	});
/* 388 */ 	
/* 389 */ 	/**
/* 390 *| 	 * Retorna o primeiro dia do mês
/* 391 *| 	 * 
/* 392 *| 	 * @result 'Sat Jan 12 2008 00:01:00'
/* 393 *| 	 * @name firstMonthDay
/* 394 *| 	 * @type Date
/* 395 *| 	 * @cat Plugins/Methods/Date
/* 396 *| 	 */
/* 397 */ 	add("firstMonthDay", function() {
/* 398 */ 		return new Date(this.getFullYear(), this.getMonth(), 1);
/* 399 */ 	});
/* 400 */ 	

/* date.js */

/* 401 */ 	/**
/* 402 *| 	 * Retorna o último dia do mês
/* 403 *| 	 * 
/* 404 *| 	 * @result 'Sat Jan 12 2008 00:01:00'
/* 405 *| 	 * @name lastMonthDay
/* 406 *| 	 * @type Date
/* 407 *| 	 * @cat Plugins/Methods/Date
/* 408 *| 	 */
/* 409 */ 	add("lastMonthDay", function() {
/* 410 */ 		return new Date(this.getFullYear(), this.getMonth() + 1, 0);
/* 411 */ 	});
/* 412 */ 	
/* 413 */ 	/**
/* 414 *| 	 * Retorna o primeiro dia do ano
/* 415 *| 	 * 
/* 416 *| 	 * @result 'Sat Jan 12 2008 00:01:00'
/* 417 *| 	 * @name firstYearDay
/* 418 *| 	 * @type Date
/* 419 *| 	 * @cat Plugins/Methods/Date
/* 420 *| 	 */
/* 421 */ 	add("firstYearDay", function() {
/* 422 */ 		return new Date(this.getFullYear(), 0, 1);
/* 423 */ 	});
/* 424 */ 	
/* 425 */ 	/**
/* 426 *| 	 * Retorna o último dia do ano
/* 427 *| 	 * 
/* 428 *| 	 * @result 'Sat Jan 12 2008 00:01:00'
/* 429 *| 	 * @name lastYearDay
/* 430 *| 	 * @type Date
/* 431 *| 	 * @cat Plugins/Methods/Date
/* 432 *| 	 */
/* 433 */ 	add("lastYearDay", function() {
/* 434 */ 		return new Date(this.getFullYear(), 11, 31);
/* 435 */ 	});
/* 436 */ 	
/* 437 */ 	/**
/* 438 *| 	 * Verifica se uma data é igual a outra
/* 439 *| 	 * 
/* 440 *| 	 * @result bool
/* 441 *| 	 * @name eq
/* 442 *| 	 * @type Date
/* 443 *| 	 * @cat Plugins/Methods/Date
/* 444 *| 	 */
/* 445 */ 	add("eq", function(date) {
/* 446 */ 		return (this.getTime() == date.getTime());
/* 447 */ 	});
/* 448 */ 	
/* 449 */ 	/**
/* 450 *| 	 * Sets the time component of this Date to zero for cleaner, easier comparison of dates where time is not relevant.

/* date.js */

/* 451 *| 	 * 
/* 452 *| 	 * @example var dtm = new Date();
/* 453 *| 	 * dtm.zeroTime();
/* 454 *| 	 * dtm.toString();
/* 455 *| 	 * @result 'Sat Jan 12 2008 00:01:00'
/* 456 *| 	 * 
/* 457 *| 	 * @name zeroTime
/* 458 *| 	 * @type Date
/* 459 *| 	 * @cat Plugins/Methods/Date
/* 460 *| 	 * @author Kelvin Luck
/* 461 *| 	 */
/* 462 */ 	add("zeroTime", function() {
/* 463 */ 		this.setMilliseconds(0);
/* 464 */ 		this.setSeconds(0);
/* 465 */ 		this.setMinutes(0);
/* 466 */ 		this.setHours(0);
/* 467 */ 		return this;
/* 468 */ 	});
/* 469 */ 	
/* 470 */ 	/**
/* 471 *| 	 * Returns a string representation of the date object according to Date.format.
/* 472 *| 	 * (Date.toString may be used in other places so I purposefully didn't overwrite it)
/* 473 *| 	 * 
/* 474 *| 	 * @example var dtm = new Date("01/12/2008");
/* 475 *| 	 * dtm.asString();
/* 476 *| 	 * @result '12/01/2008' // (where Date.format == 'dd/mm/yyyy'
/* 477 *| 	 * 
/* 478 *| 	 * @name asString
/* 479 *| 	 * @type Date
/* 480 *| 	 * @cat Plugins/Methods/Date
/* 481 *| 	 * @author Kelvin Luck
/* 482 *| 	 */
/* 483 */ 	add("asString", function(format) {
/* 484 */ 		var r = format || Date.format;
/* 485 */ 		return r
/* 486 */ 			.split('yyyy').join(this.getFullYear())
/* 487 */ 			.split('yy').join((this.getFullYear() + '').substring(2))
/* 488 */ 			.split('mmmm').join(this.getMonthName(false))
/* 489 */ 			.split('mmm').join(this.getMonthName(true))
/* 490 */ 			.split('mm').join(_zeroPad(this.getMonth()+1))
/* 491 */ 			.split('dd').join(_zeroPad(this.getDate()))
/* 492 */ 			.split('hh').join(_zeroPad(this.getHours()))
/* 493 */ 			.split('min').join(_zeroPad(this.getMinutes()))
/* 494 */ 			.split('ss').join(_zeroPad(this.getSeconds()));
/* 495 */ 	});
/* 496 */ 	
/* 497 */ 	/**
/* 498 *| 	 * Returns a new date object created from the passed String according to Date.format or false if the attempt to do this results in an invalid date object
/* 499 *| 	 * (We can't simple use Date.parse as it's not aware of locale and I chose not to overwrite it incase it's functionality is being relied on elsewhere)
/* 500 *| 	 *

/* date.js */

/* 501 *| 	 * @example var dtm = Date.fromString("12/01/2008");
/* 502 *| 	 * dtm.toString();
/* 503 *| 	 * @result 'Sat Jan 12 2008 00:00:00' // (where Date.format == 'dd/mm/yyyy'
/* 504 *| 	 * 
/* 505 *| 	 * @name fromString
/* 506 *| 	 * @type Date
/* 507 *| 	 * @cat Plugins/Methods/Date
/* 508 *| 	 * @author Kelvin Luck
/* 509 *| 	 */
/* 510 */ 	Date.fromString = function(s, format)
/* 511 */ 	{
/* 512 */ 		var f = format || Date.format;
/* 513 */ 		var d = new Date('01/01/1977');
/* 514 */ 		
/* 515 */ 		var mLength = 0;
/* 516 */ 
/* 517 */ 		var iM = f.indexOf('mmmm');
/* 518 */ 		if (iM > -1) {
/* 519 */ 			for (var i=0; i<Date.monthNames.length; i++) {
/* 520 */ 				var mStr = s.substr(iM, Date.monthNames[i].length);
/* 521 */ 				if (Date.monthNames[i] == mStr) {
/* 522 */ 					mLength = Date.monthNames[i].length - 4;
/* 523 */ 					break;
/* 524 */ 				}
/* 525 */ 			}
/* 526 */ 			d.setMonth(i);
/* 527 */ 		} else {
/* 528 */ 			iM = f.indexOf('mmm');
/* 529 */ 			if (iM > -1) {
/* 530 */ 				var mStr = s.substr(iM, 3);
/* 531 */ 				for (var i=0; i<Date.abbrMonthNames.length; i++) {
/* 532 */ 					if (Date.abbrMonthNames[i] == mStr) break;
/* 533 */ 				}
/* 534 */ 				d.setMonth(i);
/* 535 */ 			} else {
/* 536 */ 				d.setMonth(Number(s.substr(f.indexOf('mm'), 2)) - 1);
/* 537 */ 			}
/* 538 */ 		}
/* 539 */ 		
/* 540 */ 		var iY = f.indexOf('yyyy');
/* 541 */ 
/* 542 */ 		if (iY > -1) {
/* 543 */ 			if (iM < iY)
/* 544 */ 			{
/* 545 */ 				iY += mLength;
/* 546 */ 			}
/* 547 */ 			d.setFullYear(Number(s.substr(iY, 4)));
/* 548 */ 		} else {
/* 549 */ 			if (iM < iY)
/* 550 */ 			{

/* date.js */

/* 551 */ 				iY += mLength;
/* 552 */ 			}
/* 553 */ 			// TODO - this doesn't work very well - are there any rules for what is meant by a two digit year?
/* 554 */ 			d.setFullYear(Number(Date.fullYearStart + s.substr(f.indexOf('yy'), 2)));
/* 555 */ 		}
/* 556 */ 		var iD = f.indexOf('dd');
/* 557 */ 		if (iM < iD)
/* 558 */ 		{
/* 559 */ 			iD += mLength;
/* 560 */ 		}
/* 561 */ 		d.setDate(Number(s.substr(iD, 2)));
/* 562 */ 		if (isNaN(d.getTime())) {
/* 563 */ 			return false;
/* 564 */ 		}
/* 565 */ 		return d;
/* 566 */ 	};
/* 567 */ 	
/* 568 */ 	// utility method
/* 569 */ 	var _zeroPad = function(num) {
/* 570 */ 		var s = '0'+num;
/* 571 */ 		return s.substring(s.length-2)
/* 572 */ 		//return ('0'+num).substring(-2); // doesn't work on IE :(
/* 573 */ 	};
/* 574 */ 	
/* 575 */ })();
