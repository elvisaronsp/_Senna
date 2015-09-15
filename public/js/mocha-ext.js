
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
