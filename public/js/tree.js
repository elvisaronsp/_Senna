
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
