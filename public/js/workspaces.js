
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
