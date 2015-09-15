
/* live.js */

/* 1  */ /*
/* 2  *|  * Attach an event to an element and use bubbling to fire the event on the childs who match a CSS selector
/* 3  *|  * 
/* 4  *|  * Usage : parentElement.addLiveEvent(event, selector, function)
/* 5  *|  * 
/* 6  *|  * parentElement - The parent to bind
/* 7  *|  * event - The event name to monitor ('click', 'mouseover', etc) without the prefix 'on'
/* 8  *|  * selector - The CSS Selector the childs need to match
/* 9  *|  * function - The function to execute
/* 10 *|  * 
/* 11 *|  * Example :
/* 12 *|  * $(document.body).addLiveEvent('click', 'a', function(e){ alert('Alert'); });
/* 13 *|  * 
/* 14 *|  */
/* 15 */ Element.implement({	addLiveEvent: function(event, selector, fn){ this.addEvent(event, function(e){ var t = $(e.target); if (!t.match(selector)) return false; fn.apply(t, [e]); }.bindWithEvent(this, selector, fn)); }});
/* 16 */ 
