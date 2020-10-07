// @TODO: YOUR CODE HERE!
// Define svg attributes
var svgWidth = 960;
var svgHeight = 560;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 60
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// data import
d3.csv("assets/data/data.csv").then(function(risksData) {

    // 1) parse the data
    // ==============================
    risksData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });

    // 2) create x and y scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([8, d3.max(risksData, d => d.poverty+2)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([4, d3.max(risksData, d => d.healthcare+2)])
      .range([height, 0]);

    // 3) create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // 4) append x and y axes 
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // 5) create circles in chart
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(risksData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "10")
    .attr("fill", "indigo")
    .attr("opacity", ".6");

    var text = chartGroup.append("g").selectAll("text")
    .data(risksData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .attr("dy", ".35em")
    .text(d => d.abbr)
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .attr("fill", "white")
    .attr("font-weight", "700");

    // create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 10)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Lacks Healthcare (%)")
      .attr("text-anchor", "middle")
      .attr("font-weight", "700");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty (%)")
      .attr("font-weight", "700");
  }).catch(function(error) {
    console.log(error);
  });
