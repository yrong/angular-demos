function Nvd3Chart1Control($scope){
    var test_data = stream_layers(3,10+Math.random()*100,.1).map(function(data, i) {
	//var test_data = stream_layers(3,1,.1).map(function(data, i) { //for testing single data point
	  return {
		key: 'Stream' + i,
		values: data
	  };
	});

	console.log('td',test_data);

	var negative_test_data = new d3.range(0,2).map(function(d,i) { return {
	  key: 'Stream' + i,
	  values: new d3.range(0,11).map( function(f,j) {
		return { 
				 y: 10 + Math.random()*100 * (Math.floor(Math.random()*100)%2 ? 1 : -1),
				 x: j
			   }
	  })
	  };  
	});

	var chart;
	nv.addGraph(function() {
		chart = nv.models.multiBarChart()
		  .barColor(d3.scale.category20().range())
		  .margin({bottom: 100})
		  .transitionDuration(300)
		  .delay(0)
		  .rotateLabels(45)
		  .groupSpacing(0.1)
		  ;

		chart.multibar
		  .hideable(true);

		chart.reduceXTicks(false).staggerLabels(true);

		chart.xAxis
			.axisLabel("Current Index")
			.showMaxMin(true)
			.tickFormat(d3.format(',.6f'));

		chart.yAxis
			.tickFormat(d3.format(',.1f'));

		d3.select('#nvds-mychart1 svg')
			.datum(negative_test_data)
		   .call(chart);

		nv.utils.windowResize(chart.update);

		chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

		return chart;
	});
}


