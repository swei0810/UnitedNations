

document.addEventListener('DOMContentLoaded', ()=> {
    var svg = d3.select("#world-map");
    const width = 1000; 
    const height = 500; 
    
    var projection = d3.geoNaturalEarth()
    .scale(150)
    // .scale(width / 1.3 / Math.PI)
    .translate([width / 2, height / 2])


    svg.append("g")
        .selectAll("path")
        .data(world_map_json.features)
        .enter().append("path")
            .attr("fill", "#5b92e5")
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            .style("stroke", "#fff")
        // var svg = d3.select("#world-map");
        // // debugger
        // const width = 400;
        // const height = 300;

        // var g = svg.append( "g" );

        // var albersProjection = d3.geoAlbers()
        //     .scale( 100 )
        //     .rotate( [71.057,0] )
        //     .center( [0, 42.313] )
        //     .translate( [width/2,height/2] );


        // var geoPath = d3.geoPath()
        //     .projection( albersProjection );
        
        // g.selectAll( "path" )
        //     .data(world_map_json.features)
        //     .enter()
        //     .append( "path" )
        //     .attr( "fill", "#ccc" )
        //     .attr( "stroke", "#333")
        //     .attr( "d", geoPath );
})

// d3.json("./src/assets/boston_neighborhoods.json", function(data){
        // var svg = d3.select("#world-map");
        // debugger
        // const width = 400;
        // const height = 300;

        // var g = svg.select('g').append( "g" );

        // var albersProjection = d3.geoAlbers()
        //     .scale( 190000 )
        //     .rotate( [71.057,0] )
        //     .center( [0, 42.313] )
        //     .translate( [width/2,height/2] );


        // var geoPath = d3.geoPath()
        //     .projection( albersProjection );
        
        // g.selectAll( "path" )
        //     .data(neighborhoods_json.features)
        //     .enter()
        //     .append( "path" )
        //     .attr( "fill", "#ccc" )
        //     .attr( "stroke", "#333")
        //     .attr( "d", geoPath );
       
// })

