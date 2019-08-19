

var margin = {top: 20, right: 90, bottom: 30, left: 90},
width = 660 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// declares a tree layout and assigns the size
var treemap = d3.tree()
.size([height, width]);

// load the external data
d3.csv("./src/assets/example.csv", function(error, flatData) {
if (error) throw error;

// assign null correctly
flatData.forEach(function(d) {
  if (d.parent == "null") { d.parent = null};
});

// convert the flat data into a hierarchy 
var treeData = d3.stratify()
.id(function(d) { return d.name; })
.parentId(function(d) { return d.parent; })
(flatData);

// assign the name to each node
treeData.each(function(d) {
  d.name = d.id;
});

//  assigns the data to a hierarchy using parent-child relationships
var nodes = d3.hierarchy(treeData, function(d) {
return d.children;
});

// maps the node data to the tree layout
nodes = treemap(nodes);

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom),
g = svg.append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// adds the links between the nodes
var link = g.selectAll(".link")
.data( nodes.descendants().slice(1))
.enter().append("path")
.attr("class", "link")
.attr("d", function(d) {
   return "M" + d.y + "," + d.x
   + "C" + (d.y + d.parent.y) / 2 + "," + d.x
   + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
   + " " + d.parent.y + "," + d.parent.x;
   });

// adds each node as a group
var node = g.selectAll(".node")
.data(nodes.descendants())
.enter().append("g")
.attr("class", function(d) { 
  return "node" + 
  (d.children ? " node--internal" : " node--leaf"); })
.attr("transform", function(d) { 
  return "translate(" + d.y + "," + d.x + ")"; });

// adds the circle to the node
node.append("circle")
.attr("r", 10);

// adds the text to the node
node.append("text")
.attr("dy", ".35em")
.attr("x", function(d) { return d.children ? -13 : 13; })
.style("text-anchor", function(d) { 
return d.children ? "end" : "start"; })
.text(function(d) { return d.data.name; });

});