
/* gchart.js */

/* 1   */ (function($){
/* 2   */ 
/* 3   */ 	/*var gchartSrc = $('<script type="text/javascript" src="https://www.google.com/jsapi"></script>');
/* 4   *| 	$(document).find("head script:first").after(gchartSrc);
/* 5   *| 	*/
/* 6   */ 	
/* 7   */ 	if(undefined==google) return;
/* 8   */ 	
/* 9   */ 	//Carregando Google Chart
/* 10  */ 	google.load("visualization", "1.0", {packages:["corechart", "table", "geochart"], 'language': 'ptbr'});
/* 11  */ 	google.setOnLoadCallback(init);
/* 12  */ 
/* 13  */ 	
/* 14  */ 	/**
/* 15  *| 	 * Inicializa os gráficos
/* 16  *| 	 */
/* 17  */ 	function init(){
/* 18  */ 
/* 19  */ 		//Datatables Visíveis
/* 20  */ 		$('.datatable:visible').not(".ready").each(function(k, el){
/* 21  */ 			init_datatable(el);
/* 22  */ 		});
/* 23  */ 		
/* 24  */ 		//COM ABAS: Verifica por abas para mostrar apenas quando ativar a aba
/* 25  */ 		$('.tab_selector').find('li').bind("activate", function(evt, aba){
/* 26  */ 			$(aba).find('.datatable').not(".ready").each(function(k, el){
/* 27  */ 				init_datatable(el);
/* 28  */ 			});
/* 29  */ 		});
/* 30  */ 	}
/* 31  */ 	
/* 32  */ 	
/* 33  */ 	/**
/* 34  *| 	 * Inicializa Datatables
/* 35  *| 	 * @param el
/* 36  *| 	 */
/* 37  */ 	function init_datatable(el){
/* 38  */ 		//marcando datatable para nao desenhar novo grafico 
/* 39  */ 		$(el).addClass("ready");
/* 40  */ 		
/* 41  */ 		//Monta grafico
/* 42  */ 		drawChart(el);
/* 43  */ 	}
/* 44  */ 	
/* 45  */ 	
/* 46  */ 	/**
/* 47  *| 	 * Monta graficos
/* 48  *| 	 * @param el
/* 49  *| 	 */
/* 50  */ 	function drawChart(el) {

/* gchart.js */

/* 51  */ 		
/* 52  */ 		//datatable
/* 53  */ 		var $el=$(el);
/* 54  */ 		
/* 55  */ 		//Recupera os dados da div
/* 56  */ 		var data = new google.visualization.DataTable();
/* 57  */ 		var cols 	= $el.find("c");
/* 58  */ 		var rows 	= $el.find("row");
/* 59  */ 
/* 60  */ 		//extraindo dados das colunas
/* 61  */ 		cols.each(function(i, col){
/* 62  */ 			var type = $(col).attr("type");
/* 63  */ 			var name = $(col).text();
/* 64  */ 			data.addColumn(type, name);
/* 65  */ 		});
/* 66  */ 		
/* 67  */ 		//extraindo dados das linhas de dados
/* 68  */ 		rows.each(function(i, row){
/* 69  */ 			var rowData = [];
/* 70  */ 			$(row).find("v").each(function(x, v){ //valores de cada linha
/* 71  */ 				var $v 	= $(v);
/* 72  */ 				var d 	= {v:$v.text()};
/* 73  */ 
/* 74  */ 				//inserindo atributos na linha
/* 75  */ 				if($v.attr("f")) d.f = $v.attr("f");
/* 76  */ 				if($v.attr("p")) d.p = $v.attr("p");
/* 77  */ 
/* 78  */ 				//validando tipo de dado e convertendo
/* 79  */ 				switch (data.getColumnType(x)) {
/* 80  */ 					case 'number':
/* 81  */ 						d.v = Number(d.v);
/* 82  */ 						break;
/* 83  */ 						
/* 84  */ 					case 'date':
/* 85  */ 					case 'datetime':
/* 86  */ 						d.v = Date(d.v);
/* 87  */ 						break;
/* 88  */ 						
/* 89  */ 					default:
/* 90  */ 						break;
/* 91  */ 				}
/* 92  */ 				rowData.push(d);
/* 93  */ 			});
/* 94  */ 			data.addRow(rowData);
/* 95  */ 		});
/* 96  */ 
/* 97  */ 		//limpa a div
/* 98  */ 		$el.html("").show();
/* 99  */ 
/* 100 */ 		//cria o grafico de acordo com o tipo definido

/* gchart.js */

/* 101 */ 		var chart 	= null;
/* 102 */ 		var version	= '0.6';
/* 103 */ 		var options = ($el.attr("options") != "") ? eval('['+$el.attr("options")+']') : [''];
/* 104 */ 		var o		= $.extend({
/* 105 */ 				backgroundColor:	'transparent',
/* 106 */ 				fontSize: 			12, 
/* 107 */ 				pointSize:			0, 
/* 108 */ 				lineWidth:			1,
/* 109 */ 				legend:				{
/* 110 */ 						position:		'top', 
/* 111 */ 						alignment:		'end'
/* 112 */ 				},
/* 113 */ 				colors:				['#096985', '#0FB1E0', '#E47F49', '#AD3A1D', '#E45149', '#AD1D49', '#006041', '#179C60']
/* 114 */ 		}, options[0], {});
/* 115 */ 		
/* 116 */ 		switch ($el.attr('type')) {
/* 117 */ 			case 'Bars':
/* 118 */ 			case 'bars':
/* 119 */ 			case 'Bar':
/* 120 */ 			case 'bar':
/* 121 */ 				chart = new google.visualization.BarChart(el, version);
/* 122 */ 				break;
/* 123 */ 				
/* 124 */ 			case 'Column':
/* 125 */ 			case 'Columns':
/* 126 */ 			case 'column':
/* 127 */ 			case 'columns':
/* 128 */ 				chart = new google.visualization.ColumnChart(el, version);
/* 129 */ 				break;
/* 130 */ 				
/* 131 */ 			case 'Pie':
/* 132 */ 			case 'pie':
/* 133 */ 				chart = new google.visualization.PieChart(el, version);
/* 134 */ 				break;
/* 135 */ 				
/* 136 */ 			case 'Line':
/* 137 */ 			case 'line':
/* 138 */ 				chart = new google.visualization.LineChart(el, version);
/* 139 */ 				break;
/* 140 */ 				
/* 141 */ 			case 'Area':
/* 142 */ 			case 'area':
/* 143 */ 				chart = new google.visualization.AreaChart(el, version);
/* 144 */ 				break;
/* 145 */ 				
/* 146 */ 			case 'Combo':
/* 147 */ 			case 'combo':
/* 148 */ 				chart = new google.visualization.ComboChart(el, version);
/* 149 */ 				break;
/* 150 */ 				

/* gchart.js */

/* 151 */ 			case 'Table':
/* 152 */ 			case 'table':
/* 153 */ 				chart = new google.visualization.Table(el, version);
/* 154 */ 				break;
/* 155 */ 				
/* 156 */ 			case 'Geo':
/* 157 */ 			case 'geo':
/* 158 */ 				chart = new google.visualization.GeoChart(el, version);
/* 159 */ 				break;
/* 160 */ 			
/* 161 */ 		}
/* 162 */ 		if(chart) chart.draw(data, o);
/* 163 */ 	}
/* 164 */ 	
/* 165 */ })(jQuery);
/* 166 */ 
