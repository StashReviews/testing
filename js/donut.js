window.onresize = function(){

  var graph1 = $('#graph1').children();
  var graph2 = $('#graph2').children();
  var graph3 = $('#graph3').children();
  var graphs = graph1, graph2, graph3;
  // @todo = If donuts already exist, replace them.
  if (! graphs) {
    console.log('var of graphs does not exist. drawing donuts.');
    drawDonut("#graph1");
    drawDonut("#graph2");
    drawDonut("#graph3");
  } else {
    console.log('var of graphs does exist. replacing donuts.');
    graph1.remove();
    graph2.remove();
    graph3.remove();
    drawDonut("#graph1");
    drawDonut("#graph2");
    drawDonut("#graph3");
  }


  // drawDonut("#graph1");
  // drawDonut("#graph2");
  // drawDonut("#graph3");
  /* 
    TODO:
    add an addtional data attr called "data-backup" which will hold the src
    image backup for ie8...or maybe use: https://github.com/mhemesath/r2d3/
  */

  function drawDonut(elem){
    var node = document.querySelector(elem);
    var width = height = $('.flavors').width();
    // var width = height = node.getAttribute("data-size") || 100;
    var thickness = node.getAttribute("data-thickness") || 30;
    var duration = node.getAttribute('data-duration') || 850;
    var delay = node.getAttribute('data-delay') || 0;
    var amounts = node.getAttribute("data-amounts").split(",");
    var fills = node.getAttribute("data-fills").split(",");
    
    var radius = Math.min(width, height) / 2;
    var pie = d3.layout.pie().sort(null);
    
    var svg = d3.select(elem).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    
    var arc = d3.svg.arc()
        .innerRadius(radius - thickness)
        .outerRadius(radius);
    
    svg.selectAll("path")
      .data(pie(amounts))
      .enter()
      .append("path")
      .style("fill", function(d, i) { return fills[i]; })
      .attr("d", arc)
      .transition()
      .delay(delay)
      .duration(duration)
      .call(arcTween);
    
    function arcTween(transition) {
      transition.attrTween("d", function(d) {
        var interpolate = d3.interpolate(d.startAngle, d.endAngle);
        return function(t) {
          d.endAngle = interpolate(t);
          return arc(d);
        };
      });
    }
  }
};
