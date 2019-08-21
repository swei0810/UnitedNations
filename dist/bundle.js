!function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist/",n(n.s=0)}([function(t,e,n){"use strict";var r=n(1),a=n(2),o=n(3),i=n(4);document.addEventListener("DOMContentLoaded",function(){document.getElementById("sliderContainer").style.display="none",document.getElementsByClassName("home")[0].addEventListener("click",function(){document.getElementById("sliderContainer").style.display="none";for(var t=document.getElementById("container");t.firstChild;)t.removeChild(t.firstChild);var e=document.createElement("img");e.setAttribute("class","wordcloud"),e.setAttribute("src","src/assets/wordcloud (1).svg"),document.getElementById("container").appendChild(e)}),document.getElementsByClassName("button1")[0].addEventListener("click",function(){document.getElementById("sliderContainer").style.display="none";for(var t=document.getElementById("container");t.firstChild;)t.removeChild(t.firstChild);var e=document.createElement("div");e.setAttribute("id","lollipop"),document.getElementById("container").appendChild(e),(0,r.lollipop)()}),document.getElementsByClassName("button2")[0].addEventListener("click",function(){document.getElementById("sliderContainer").style.display="none";for(var t=document.getElementById("container");t.firstChild;)t.removeChild(t.firstChild);var e=document.createElement("div");e.setAttribute("id","category-graph"),document.getElementById("container").appendChild(e),(0,a.graph)()}),document.getElementsByClassName("button3")[0].addEventListener("click",function(){document.getElementById("sliderContainer").style.display="block";for(var t=document.getElementById("container");t.firstChild;)t.removeChild(t.firstChild);var e=document.createElement("div"),n=document.createElement("div");n.setAttribute("class","title"),n.innerHTML="TOTAL REVENUE BY GOVERNMENT DONOR",document.getElementById("container").appendChild(n),e.setAttribute("id","world-map"),document.getElementById("container").appendChild(e),(0,i.choropleth)("src/assets/country_donation_full.csv")}),document.getElementsByClassName("button4")[0].addEventListener("click",function(){document.getElementById("sliderContainer").style.display="none";for(var t=document.getElementById("container");t.firstChild;)t.removeChild(t.firstChild);var e=document.createElement("div");e.setAttribute("id","bubble-chart"),document.getElementById("container").appendChild(e),(0,o.bubble)()})})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.lollipop=function(){d3.csv("./src/assets/country_donation.csv",function(t){return{country:t["Donor code"],year:+t["Calendar year"],donation:+t["Math expression"].split(",").join("")}}).then(function(t){var e=100,n=30,r=90,a=300,o=1e3-a-n,i=600-e-r,l=d3.max(t,function(t){return t.donation}),d=d3.select("#lollipop").append("svg").attr("width",o+a+n).attr("height",i+e+r).append("g").attr("transform","translate("+a+","+e+")"),s=d3.scaleLinear().domain([0,l]).range([0,o]);d.append("g").attr("transform","translate(0,"+i+")").call(d3.axisBottom(s)).selectAll("text").attr("transform","translate(-10,0)rotate(-45)").style("text-anchor","end");var c=d3.scaleBand().range([0,i]).domain(t.map(function(t){return t.country})).padding(1);d.append("g").call(d3.axisLeft(c)),d.selectAll("myline").data(t).enter().append("line").attr("x1",s(0)).attr("x2",s(0)).attr("y1",function(t){return c(t.country)}).attr("y2",function(t){return c(t.country)}).attr("stroke","grey"),d.selectAll("mycircle").data(t).enter().append("circle").attr("cx",s(0)).attr("cy",function(t){return c(t.country)}).attr("r","5").style("fill","#ccebc5").attr("stroke","black"),d.selectAll("circle").transition().duration(2e3).attr("cx",function(t){return s(t.donation)}),d.selectAll("line").transition().duration(2e3).attr("x1",function(t){return s(t.donation)}),d.append("text").attr("x",150).attr("y",-120).attr("dy","3.5em").attr("text-anchor","start").style("font-size","28px").style("font-weight","bold").text("TOP 22 GOVERNMENT DONORS IN 2015"),d.append("text").attr("x",o/2).attr("y",i+80).style("text-anchor","middle").text("Donation ($)"),d.append("text").attr("transform","rotate(-90)").attr("y",-60).attr("x",0-i/2).attr("dy","1em").style("text-anchor","middle").text("Country Codes")})}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.graph=function(){d3.csv("./src/assets/expenditure_category.csv",function(t){return{year:+t.Year,exp:+t.Expenditure.split(",").join(""),category:t["Expense Category"]}}).then(function(t){var e=118,n=30,r=200,a=300,o=1e3-a-n,i=450-e-30,l=d3.max(t,function(t){return t.exp}),d=d3.select("#category-graph").append("svg").attr("width",o+a+n).attr("height",i+e+r).append("g").attr("transform","translate("+a+","+e+")"),s=d3.scaleBand().range([0,o]).domain(t.map(function(t){return t.category})).padding(.2);d.append("g").attr("transform","translate(0,"+i+")").call(d3.axisBottom(s)).selectAll("text").attr("transform","translate(-10,0)rotate(-45)").style("text-anchor","end");var c=d3.scaleLinear().domain([0,l]).range([i,0]);d.append("g").call(d3.axisLeft(c)),d.selectAll("mybar").data(t).enter().append("rect").attr("x",function(t){return s(t.category)}).attr("width",s.bandwidth()).attr("height",function(t){return i-c(0)}).attr("fill","#b3cde3").attr("y",function(t){return c(0)}),d.selectAll("rect").transition().duration(800).attr("y",function(t){return c(t.exp)}).attr("height",function(t){return i-c(t.exp)}).delay(function(t,e){return 100*e}),d.append("text").attr("x",150).attr("y",-140).attr("dy","3.5em").attr("text-anchor","start").style("font-size","28px").style("font-weight","bold").text("TOTAL EXPENDITURE BY CATEGORY IN 2015"),d.append("text").attr("x",o/2).attr("y",i+100).style("text-anchor","middle").text("Activities"),d.append("text").attr("transform","rotate(-90)").attr("y",-110).attr("x",0-i/2).attr("dy","1em").style("text-anchor","middle").text("Expenditure ($)"),d.append("text").attr("y",i+110).attr("x",0).attr("dy","1em").style("font-size","10px").text('* refers to "Normative, treaty-related, knowledge creation activities" ')})}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.bubble=function(){d3.csv("../src/assets/expenditure_by_agency.csv",function(t){return{agency:t["Agency description"],year:+t.Year,exp:+t.Expenditure.split(",").join(""),exp2:t.Expenditure,acronym:t.Acronym,category:t.Category}}).then(function(t){var e=d3.select("#bubble-chart").append("svg").attr("width",1e3).attr("height",960).attr("text-anchor","middle").attr("transform","translate(230,10)");e.append("text").attr("x",200).attr("y",-30).attr("dy","3.5em").attr("text-anchor","start").style("font-size","28px").style("font-weight","bold").text("TOTAL EXPENDITURE BY AGENCY");var n=d3.pack().size([850,960]).padding(1.5),r=d3.scaleOrdinal().domain(t.map(function(t){return t.category})).range(["#fbb4ae","#b3cde3","#ccebc5","#ffe9a8"]),a=d3.hierarchy({children:t}).sum(function(t){return t.exp}),o=e.selectAll(".node").data(n(a).leaves()).enter().append("g").attr("class","node").attr("transform",function(t){return"translate("+t.x+","+t.y+")"});o.append("circle").attr("id",function(t){return t.id}).attr("r",function(t){return t.r}).style("fill",function(t){return r(t.data.category)}).on("mouseover",function(t){l.text(t.data.agency+": $ "+t.data.exp2),l.style("visibility","visible")}).on("mousemove",function(){return l.style("top",d3.event.pageY-10+"px").style("left",d3.event.pageX+10+"px")}).on("mouseout",function(){return l.style("visibility","hidden")}),o.append("text").text(function(t){return t.data.acronym});var i=e.selectAll(".legend").data(["United Nations","Secretariat","General Assembly","Economic and Social Council"]).enter().append("g").attr("class","legend").attr("transform","translate(780,120)");i.append("rect").attr("x",40).attr("y",function(t,e){return 20*e}).attr("width",15).attr("height",15).style("fill",function(t){return r(t)}),i.append("text").attr("x",60).attr("text-anchor","start").attr("dy","1em").attr("y",function(t,e){return 20*e}).text(function(t){return t}).attr("font-size","12px"),i.append("text").attr("x",80).attr("dy","-.2em").attr("y",-10).text("Agency Category").attr("font-size","17px");var l=d3.select("body").append("div").style("position","absolute").style("z-index","10").style("visibility","hidden").style("color","white").style("padding","8px").style("background-color","rgba(0, 0, 0, 0.75)").style("border-radius","6px").text("tooltip")})}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.choropleth=function t(e){d3.selectAll("svg").remove();var n=d3.select("#world-map").append("svg").attr("width",1e3).attr("height",450),r=d3.geoMercator().scale(100).center([0,20]).translate([500,225]),a=d3.map(),o=[1e3,1e4,1e5,5e5,1e6,5e6,1e7,5e7,1e8,5e8,1e9,2e9,3e9,5e9],i=["#d8e1e6","#ebf2fc","#d2e2fa","#bdd6fc","#a5c7fa","#8eb9fa","#77acfc","#5798fa","#438cfa","#2d7df7","#1b72f5","#0057db","#0243a6","#002152"],l=d3.scaleOrdinal().domain(o).range(i),d=d3.scaleThreshold().domain(o).range(i);Promise.all([d3.csv(e,function(t){a.set(t["Donor code"],+t["Math expression"].split(",").join(""))})]).then(function(){n.append("g").selectAll("path").data(world_map_json.features).enter().append("path").attr("d",d3.geoPath().projection(r)).attr("fill",function(t){return t.total=a.get(t.id)||0,d(t.total)}).style("stroke","transparent").attr("class",function(t){return"Country"}).style("opacity",.8).on("mouseover",function(t){d3.selectAll(".Country").transition().duration(200).style("opacity",.5),d3.select(this).transition().duration(200).style("opacity",1).style("stroke","black"),s.text(t.properties.name+" : $ "+Number(t.total).toLocaleString()),s.style("visibility","visible")}).on("mouseleave",function(t){d3.selectAll(".Country").transition().duration(200).style("opacity",.8),d3.select(this).transition().duration(200).style("stroke","transparent"),s.style("visibility","hidden")});var t=n.selectAll(".legend").data(o).enter().append("g").attr("class","legend").attr("transform","translate(780,120)");t.append("rect").attr("x",80).attr("y",function(t,e){return 17*e}).attr("width",17).attr("height",17).style("fill",function(t){return l(t)}),t.append("text").attr("x",100).attr("text-anchor","start").attr("dy","1em").attr("y",function(t,e){return 17*e}).text(function(t){return Number(t).toLocaleString()}).attr("font-size","12px"),t.append("text").attr("x",80).attr("y",-10).text("Donations ($)")});var s=d3.select("div").append("div").style("position","absolute").style("left","70%").style("top","320px").style("z-index","10").style("visibility","hidden").style("color","white").style("padding","8px").style("background-color","rgba(0, 0, 0, 0.75)").style("border-radius","6px").style("font","20px").text("tooltip"),c=null,u=["2010","2011","2012","2013","2014","2015"];d3.select("#timeslide").on("input",function(){!function(e){document.getElementById("range").innerHTML=u[e],c=u[e];var n=void 0;switch(c){case"2010":n="src/assets/2010.csv";break;case"2011":n="src/assets/2011.csv";break;case"2012":n="src/assets/2012.csv";break;case"2013":n="src/assets/2013.csv";break;case"2014":n="src/assets/2014.csv";break;default:n="src/assets/country_donation_full.csv"}t(n)}(+this.value)})}}]);
//# sourceMappingURL=bundle.js.map