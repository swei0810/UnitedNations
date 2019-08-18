// // Donation by countries, top 22 in 2015
// code: https://www.d3-graph-gallery.com/graph/lollipop_animationStart.html

export const lollipop = () => {
    d3.csv("./src/assets/country_donation.csv", function(d) {
        return {
            country: d["Donor code"], 
            year: +d["Calendar year"], 
            donation: +d["Math expression"].split(",").join("")
        }; 
        
    }).then(function(data) {
      var margin = {top: 100, right: 30, bottom: 70, left: 100},
      width = 1000 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;
      var maxDon = d3.max(data, function(d){return d.donation})
  
  
  // append the svg object to the body of the page
      var svg = d3.select("#lollipop")
      .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
      .append("g")
          .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
  
      var x = d3.scaleLinear()
          .domain([0, maxDon])
          .range([ 0, width]);
      svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
          .selectAll("text")
              .attr("transform", "translate(-10,0)rotate(-45)")
              .style("text-anchor", "end");
  
      var y = d3.scaleBand()
              .range([ 0, height ])
              .domain(data.map(function(d) { return d.country; }))
              .padding(1);
            svg.append("g")
              .call(d3.axisLeft(y))
            
      svg.selectAll("myline")
              .data(data)
              .enter()
              .append("line")
                 .attr("x1", x(0))
                .attr("x2", x(0))
                .attr("y1", function(d) { return y(d.country); })
                .attr("y2", function(d) { return y(d.country); })
                .attr("stroke", "grey")
                
  
      svg.selectAll("mycircle")
                .data(data)
                .enter()
                .append("circle")
                  .attr("cx", x(0))
                  .attr("cy", function(d) { return y(d.country); })
                  .attr("r", "5")
                  .style("fill", "#ccebc5")
                  .attr("stroke", "black")
  
      //animation 
      svg.selectAll("circle")
          .transition()
          .duration(2000)
          .attr("cx", function(d) { return x(d.donation); })
  
      svg.selectAll("line")
          .transition()
          .duration(2000)
          .attr("x1", function(d) { return x(d.donation); })
  
      svg.append("text")
          .attr("x", 200)
          .attr("y", -120)
          .attr("dy", "3.5em")
          .attr("text-anchor", "start")  
          .style("font-size", "28px")  
          .style("font-weight", "bold")
          .text("TOP 22 GOVERNMENT DONORS IN 2015")
  
  
    })

}


