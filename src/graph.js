{/* <svg width="1200" height="1000"></svg>  */}
//https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/
//https://www.d3-graph-gallery.com/graph/barplot_animation_start.html

data = d3.csv("./src/assets/expenditure_category.csv", function(d) {
    return {
        year: +d.Year, 
        exp: +d["Expenditure"].split(",").join(""), 
        category: d["Expense Category"]
    }
}).then(function(data) {
    var margin = {top: 50, right: 50, bottom: 100, left: 100},
    width = 1000 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

    var maxExp = d3.max(data, function(d){return d.exp})
    var minExp = d3.min(data, function(d){return d.exp})

    var svg = d3.select("#category-graph")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data.map(function(d) { return d.category; }))
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");            

    var y = d3.scaleLinear()
    .domain([0, maxExp])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
            .attr("x", function(d) { return x(d.category); })
            // .attr("y", function(d) { return y(d.exp); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(0); })
            .attr("fill", '#b3cde3')
            .attr("y", function(d) { return y(0); })

    svg.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", function(d) {return y(d.exp); })
        .attr("height", function(d) {return height - y(d.exp);})
        .delay(function(d,i) { return(i*100)})

  svg.append("text")
        .attr("x", 200)
        .attr("y", -120)
        .attr("dy", "3.5em")
        .attr("text-anchor", "start")  
        .style("font-size", "28px")  
        .style("font-weight", "bold")
        .text("TOTAL EXPENDITURE BY CATEGORY IN 2015")

   

})


    // var margin = {top: 100, right: 30, bottom: 70, left: 100};
    // const width = 1100; 
    // const height = 400; 

    // const svg = d3.select('.graph');
    // const chart = svg.append('g')
    //     .attr('transform', 'translate(60, 60)');

    // var maxAmount = d3.max(data, function(d){return d.exp})


    // const yScale = d3.scaleLinear()
    // .range([height, 0])
    // .domain([0, maxAmount]);

    // chart.append('g')
    // .call(d3.axisLeft(yScale));


    // const xScale = d3.scaleBand()
    //     .range([0, width])
    //     .domain(data.map(function(d) { return d.category; }))
    //     .padding(0.2)

    // chart.append('g')
    // .attr('transform', `translate(0, ${height})`)
    // .call(d3.axisBottom(xScale));



    // var bar =  chart.selectAll('rect')
    //         .data(data)
    //         .enter()
    //         .append('rect')
    //         .attr('x', (d) => xScale(d.category))
    //         .attr('y', (d) => yScale(d.exp))
    //         .attr('height', (d) => height - yScale(d.exp))
    //         .attr('width', xScale.bandwidth())
    
    
        
    // //horizontal grid line
    // chart.append('g')
    //         .attr('class', 'grid')
    //         .call(d3.axisLeft()
    //             .scale(yScale)
    //             .tickSize(-width, 0, 0)
    //             .tickFormat(''))

    // // labels 
    // svg.append('text')
    //     .attr('x', -(height / 2) - margin.left)
    //     .attr('y', margin.left / 2.4)
    //     .attr('transform', 'rotate(-90)')
    //     .attr('text-anchor', 'middle')
    //     .text('Expenditure ($)')

    // svg.append('text')
    //     .attr('x', width / 2 + margin.left)
    //     .attr('y', 40)
    //     .attr('text-anchor', 'middle')
    //     .text('Expenditure by categories')
    


