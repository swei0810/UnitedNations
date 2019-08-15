data = d3.csv("./src/assets/expenditure_category.csv", function(d) {
    return {
        year: +d.Year, 
        exp: +d["Expenditure"].split(",").join(""), 
        category: d["Expense Category"]
    }
}).then(function(data) {


    var svg = d3.select(".exp-agency-bubble"), 
        width = +svg.attr("width"), 
        height = +svg.attr("height"); 
})