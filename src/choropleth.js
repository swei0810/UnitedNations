// http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/
// https://www.d3-graph-gallery.com/graph/choropleth_basic.html


document.addEventListener('DOMContentLoaded', ()=> {


    
   var svg = d3.select("#world-map");
   const width = 1000; 
   const height = 750; 

   svg.append("text")
   .attr("x", 200)
   .attr("y", -10)
   .attr("dy", "3.5em")
   .attr("text-anchor", "start")  
   .style("font-size", "28px")  
   .style("font-weight", "bold")
   .text("TOTAL REVENUE BY GOVERNMENT DONOR")





   var path = d3.geoPath();
   var projection = d3.geoMercator()
            .scale(100)
            .center([0,20])
            .translate([width/2, height/2]); 

    var data = d3.map(); 
    var dataRange = [1000, 10000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1000000000, 2000000000, 3000000000, 5000000000];
    var colorScheme = ['#d8e1e6', '#ebf2fc', '#d2e2fa', '#bdd6fc', '#a5c7fa', '#8eb9fa', '#77acfc', '#5798fa', '#438cfa', '#2d7df7', '#1b72f5', '#0057db', '#0243a6', '#002152'];
    
    //for legend
    var color = d3.scaleOrdinal()
        .domain(dataRange)
        .range(colorScheme);
    
    
    
    var colorScale = d3.scaleThreshold()
        .domain(dataRange)
        .range(colorScheme)

    Promise.all([
                d3.csv("src/assets/country_donation_full.csv", function(d) { data.set(d["Donor code"], +d["Math expression"].split(",").join(""))})
                ]).then(()=> {


                    let mouseOver = function(d) {
                        d3.selectAll(".Country")
                          .transition()
                          .duration(200)
                          .style("opacity", .5)
                        d3.select(this)
                          .transition()
                          .duration(200)
                          .style("opacity", 1)
                          .style("stroke", "black")
                      }

                      let mouseLeave = function(d) {
                        d3.selectAll(".Country")
                          .transition()
                          .duration(200)
                          .style("opacity", .8)
                        d3.select(this)
                          .transition()
                          .duration(200)
                          .style("stroke", "transparent")
                      }


                    svg.append("g")
                    .selectAll("path")
                    .data(world_map_json.features)
                    .enter()
                    .append("path")
                      // draw each country
                      .attr("d", d3.geoPath()
                        .projection(projection)
                      )
                      // set the color of each country
                      .attr("fill", function (d) {
                        d.total = data.get(d.id) || 0;
                        return colorScale(d.total);
                      })
                        .style("stroke", "transparent")
                        .attr("class", function(d){ return "Country" } )
                        .style("opacity", .8)
                        .on("mouseover", mouseOver)
                        .on("mouseleave", mouseLeave )



                //legend 
                    var legend = svg.selectAll(".legend")
                    .data(dataRange)
                    .enter()
                    .append("g")
                    .attr("class", "legend")
                    .attr("transform", "translate(" + 780 + "," + 120 +")")
                
                legend.append("rect")
                    .attr("x", 80) 
                    .attr("y", function(d, i) { return 17 * i; })
                    .attr("width", 17)
                    .attr("height", 17)
                    .style("fill", function(d) { return color(d)});

                    legend.append("text")
                    .attr("x", 100) 
                    .attr("text-anchor", "start")
                    .attr("dy", "1em") 
                    .attr("y", function(d, i) { return 17 * i; })
                    .text(function(d) {return d;})
                    .attr("font-size", "12px"); 
                })
})
