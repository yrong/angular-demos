function Nvd3Control($scope){
    nv.addGraph(function() {
	  var chart = nv.models.lineChart();

	  chart.xAxis
		  .axisLabel('Time (ms)')
		  .tickFormat(d3.format(',r'));

	  chart.yAxis
		  .axisLabel('Voltage (v)')
		  .tickFormat(d3.format('.02f'));

	  d3.select('#nvd3-chart svg')
		  .datum(nvdsdata())
		.transition().duration(500)
		  .call(chart);

	  nv.utils.windowResize(chart.update);

	  return chart;
	});

	function nvdsdata() {
	  var sin = [],
		  cos = [];

	  for (var i = 0; i < 100; i++) {
		sin.push({x: i, y: Math.sin(i/10)});
		cos.push({x: i, y: .5 * Math.cos(i/10)});
	  }

	  return [
		{
		  values: sin,
		  key: 'Sine Wave',
		  color: '#ff7f0e'
		},
		{
		  values: cos,
		  key: 'Cosine Wave',
		  color: '#2ca02c'
		}
	  ];
	}
}


