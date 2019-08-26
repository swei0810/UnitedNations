{/* <svg width="1200" height="1000"></svg>  */}
//https://blog.risingstack.com/d3-js-tutorial-bar-charts-with-javascript/
//https://www.d3-graph-gallery.com/graph/barplot_animation_start.html
export const graph  = () => {


        d3.csv("./src/assets/expenditure_category.csv", function(d) {
            return {
                year: +d.Year, 
                exp: +d["Expenditure"].split(",").join(""), 
                category: d["Expense Category"]
            }
        }).then(function(data) {
            var margin = {top: 118, right: 30, bottom: 200, left: 300},
            width = 1000 - margin.left - margin.right,
            height = 450 - margin.top - 30;

            var maxExp = d3.max(data, function(d){return d.exp})

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
                    .style("text-anchor", "end") 
                    .style("font-size", "14px")  
                    .style('font-family', "Signika")


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
                .attr("x", 150)
                .attr("y", -140)
                .attr("dy", "3.5em")
                .attr("text-anchor", "start")  
                .style("font-size", "28px")  
                .style("font-weight", "bold")
                .text("TOTAL EXPENDITURE BY CATEGORY IN 2015")


        //axis labels
        svg.append("text")      // text label for the x axis
                .attr("x", width/2 )
                .attr("y", height + 140 )
                .style("text-anchor", "middle")
                .text("Activities");
        
        
        svg.append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", -110 )
                    .attr("x",0 - (height / 2))
                    .attr("dy", "1em")
                    .style("text-anchor", "middle")
                    .text("Expenditure ($)");  
        
         
        svg.append("text")
                    .attr("y", height + 150 )
                    .attr("x", 0)
                    .attr("dy", "1em")
                    .style("font-size", "10px" )
                    .text('* refers to "Normative, treaty-related, knowledge creation activities" ');  
        

        })

}
