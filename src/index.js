d3.csv("./src/assets/country_donation.csv", function(d) {
      return {
          country: d.Donor, 
          year: +d["Calendar year"], 
          amount: +d["Math expression"].split(",").join("")
      }; 
      
  }).then(function(data) {
        var height = 400; 
        var width = 600; 
        var maxAmount = d3.max(data, function(d){return d.amount})
            
        var y = d3.scaleLinear()
                    .domain([0, maxAmount])
                    .range([height, 0]);
        var x = d3.scale.ordinal()
                    .rangeRoundBand([0,width])

        var yAxis = d3.axisLeft(y);
        var xAxis = d3.axisBottom(x);

        var svg = d3.select('body').append('svg')
                    .attr('height', '100%')
                    .attr('width', '100%')

        var chartGroup = svg.append('g')
                            .attr('transform', 'translate(50, 50)');
        
        var line = d3.line()
                        .x(function(d) {return x(d.country)})
                        .y(function(d) {return y(d.amount)});
        
        debugger
        chartGroup.append('path').attr('d', line(data)); 

  })
  


