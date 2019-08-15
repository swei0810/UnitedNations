// http://duspviz.mit.edu/d3-workshop/mapping-data-with-d3/
// https://www.d3-graph-gallery.com/graph/choropleth_basic.html


document.addEventListener('DOMContentLoaded', ()=> {


    
   var svg = d3.select("#world-map");
   const width = 1000; 
   const height = 550; 

   var path = d3.geoPath();
   var projection = d3.geoMercator()
            .scale(100)
            .center([0,20])
            .translate([width/2, height/2]); 

    var data = d3.map(); 
    var colorScale = d3.scaleThreshold()
        .domain([1000, 10000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1000000000, 2000000000, 3000000000, 5000000000])
        //custom color scheme
        .range(['#d8e1e6', '#ebf2fc', '#d2e2fa', '#bdd6fc', '#a5c7fa', '#8eb9fa', '#77acfc', '#5798fa', '#438cfa', '#2d7df7', '#1b72f5', '#0057db', '#0243a6', '#002152'])

    Promise.all([
        
                // d3.json("src/assets/world-map.geo.json"), 
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
                        .on("mouseover", mouseOver )
                        .on("mouseleave", mouseLeave )
                })
    // d3.queue()
    //     .defer(d3.json, "src/assets/world-map.geo.json" )
    //     .defer(d3.csv, "src/assets/country_donation_full.csv", function(d) {data.set(d["Donor code"], +d["Math expression"])})
    //     .await(ready); 

    // function ready(error, topo) {
    //     svg.append("g")
    //     .selectAll("path")
    //     .data(topo.features)
    //     .enter()
    //     .append("path")
    //       // draw each country
    //       .attr("d", d3.geoPath()
    //         .projection(projection)
    //       )
    //       // set the color of each country
    //       .attr("fill", function (d) {
    //         d.total = data.get(d.id) || 0;
    //         return colorScale(d.total);
    //       });
    // }


            // svg.appened("g")
            // .selectAll("path")
            // .data(world_json.features)
            // .enter()
            // .append("path")
            //     .attr("d", d3.geoPath())
            //         .projection(projection)
            //     .attr("fill", function(d) {
            //         d.donation = data.get(d.id) || 0; 
            //             return colorScale(d.donation)
            //     })
        
        
})



// var svg = d3.select("#world-map");
// const width = 1000; 
// const height = 500; 

// var projection = d3.geoNaturalEarth()
// .scale(150)
// // .scale(width / 1.3 / Math.PI)
// .translate([width / 2, height / 2])


// svg.append("g")
//     .selectAll("path")
//     .data(world_map_json.features)
//     .enter()
//     .append("path")
//         .attr("fill", "#5b92e5")
//         .attr("d", d3.geoPath()
//             .projection(projection)
//         )
//         .style("stroke", "#fff")