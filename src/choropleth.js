// http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/
// https://www.d3-graph-gallery.com/graph/choropleth_basic.html
export const choropleth  = () => {



  const width = 1000; 
  const height = 450; 

  var svg = d3.select("#world-map")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
        
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
                            tooltip.text(d.properties.name + " : $ " + Number(d.total).toLocaleString())
                            tooltip.style("visibility", "visible");
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
                            tooltip.style("visibility", "hidden")
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
                        .text(function(d) {return Number(d).toLocaleString();})
                        .attr("font-size", "12px"); 

                    legend.append("text")
                        .attr("x", 80)
                        .attr("y", -10)
                        .text("Donations ($)")
                    })



        var tooltip = d3.select("div")
                    .append("div")
                    .style("position", "absolute")
                    .style("left", "70%")
                    .style("top", "250px")
                    .style("z-index", "10")
                    .style("visibility", "hidden")
                    .style("color", "white")
                    .style("padding", "8px")
                    .style("background-color", "rgba(0, 0, 0, 0.75)")
                    .style("border-radius", "6px")
                    .style("font", "20px")
                    .text("tooltip");
      
            
            
       
       
       
        //slider 
        var inputValue = null;
        var year = ["2010","2011","2012","2013","2014","2015", "2016"];

        d3.select("#timeslide").on("input", function() {
          update(+this.value);
        });
      
      // update the fill of each SVG of class "incident" with value
      function update(value) {
          document.getElementById("range").innerHTML=year[value];
          inputValue = year[value];
          d3.selectAll(".incident")
              .attr("fill", dateMatch);
      }

          function dateMatch(data, value) {
            var d = new Date(data.properties.OPEN_DT);
            var m = year[d.getYear()];
          
        }        
  }
