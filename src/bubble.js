// Bubble Chart: https://bl.ocks.org/carlvlewis/53d42df2300231c1daacdaf9067043c0

//Expenditure by Agency 
export const bubble  = () => {


        d3.csv("./src/assets/expenditure_by_agency.csv", function(d) {
            return {
                agency: d["Agency description"], 
                year: +d.Year, 
                exp: +d["Expenditure"].split(",").join(""),
                exp2: d.Expenditure,
                acronym: d.Acronym,
                category: d.Category
            }
        }).then(function(data) {
            var width = 1000; 
            var height = 960; 

            var svg = d3.select("#bubble-chart")
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("text-anchor", "middle")
                .attr("transform",
                "translate(" + 230+ "," + 10 + ")");
                

            svg.append("text")
                .attr("x", 200)
                .attr("y", -30)
                .attr("dy", "3.5em")
                .attr("text-anchor", "start")  
                .style("font-size", "28px")  
                .style("font-weight", "bold")
                .text("TOTAL EXPENDITURE BY AGENCY")

            var pack = d3.pack()
                .size([width-150, height])
                .padding(1.5); 



            /////choosing color 
            var categories = ["United Nations", "Secretariat", "General Assembly", "Economic and Social Council"]

            var color = d3.scaleOrdinal()
                .domain(data.map(function(d) {return d.category;}))
                .range(['#fbb4ae','#b3cde3','#ccebc5',
                '#ffe9a8']);
                //need 4 colors 



            
            //draw circles
            var root = d3.hierarchy({children: data})
                .sum(function(d) {return d.exp})

            var node =svg.selectAll(".node")
                .data(pack(root).leaves())
                .enter().append("g")
                    .attr("class", "node")
                    .attr("transform", function(d) {return "translate("+ d.x + ',' + d.y + ")"})
            
            node.append("circle")
                .attr("id", function(d) {return d.id; })
                .attr("r", function(d) {return d.r; })
                .style("fill", function(d) {return color(d.data.category)})
                .on("mouseover", function(d) {
                    tooltip.text(d.data.agency + ": $ " + d.data.exp2);
                    tooltip.style("visibility", "visible");
                })
                .on("mousemove", function() {
                    return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
                })
                .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
            

                
                node.append("text")
                        .text(function(d) {return d.data.acronym});

                // would be overlapping 
                // node.append("text")
                //         .text(function(d) {return d.data.exp});



                //Legends
                var legend = svg.selectAll(".legend")
                    .data(categories)
                    .enter()
                    .append("g")
                    .attr("class", "legend")
                    .attr("transform", "translate(" + 780 + "," + 120 +")")
                
                legend.append("rect")
                    .attr("x", 40) 
                    .attr("y", function(d, i) { return 20 * i; })
                    .attr("width", 15)
                    .attr("height", 15)
                    .style("fill", function(d) { return color(d)});
                
                legend.append("text")
                    .attr("x", 60) 
                    .attr("text-anchor", "start")
                    .attr("dy", "1em") 
                    .attr("y", function(d, i) { return 20 * i; })
                    .text(function(d) {return d;})
                    .attr("font-size", "12px"); 
            



                legend.append("text")
                .attr("x",80) 
                .attr("dy", "-.2em")
                .attr("y",-10)
                .text("Agency Category")
                .attr("font-size", "17px"); 
            



                //tooptip
            var tooltip = d3.select("body")
                .append("div")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("visibility", "hidden")
                .style("color", "white")
                .style("padding", "8px")
                .style("background-color", "rgba(0, 0, 0, 0.75)")
                .style("border-radius", "6px")
                .text("tooltip");
        })
}



  


