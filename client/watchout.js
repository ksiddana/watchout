var width = 500,
    height = 500;

var duration = 750;

var numberOfEnemies = 5;

//var viewBox = "0 0 500 500"

var color = "green";


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    //.attr("viewBox", viewBox);

var rectangle = svg.append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", color);

// Define drag beavior
function dragmove(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.event.sourceEvent.preventDefault();
  d3.select(".player").attr("transform", "translate(" + (x-250) + "," + (y-250) + ")");
  console.log("x",x,"y",y)
}
var drag = d3.behavior.drag().on("drag", dragmove);
var point = d3.select(".player")
var p = {x: point[0], y: point[1]};

//Define collision behavior

//function collideCount() {


//var collide = d3.behavior.


var player = svg.append("circle")
    .attr("cx", 250)
    .attr("cy", 250)
    .attr("r", 15)
    .attr("fill", "white")
    .attr("class", "player")
    .style("cursor", "pointer")
    .call(drag);
    //.call(collide);





//ENTER
function placeEnemies(n) {
  for (var i = 0; i <= n; i++) {
    var enemy = svg.append("circle")
      .attr("cx", Math.floor(Math.random() * 400))
      .attr("cy", Math.floor(Math.random() * 600))
      .attr("r", 10)
      .attr("fill", "purple")
      .attr("class", "enemy" + i);
  }
}





//UPDATE
function update() {

  

  for (var i = 0; i <= numberOfEnemies; i++){

    d3.select(".enemy" + i)
        //.attr("class", "enemy" + i)
        .transition()
        .duration(duration)
        .attr("cx", Math.floor(Math.random() * 600))
        .attr("cy", Math.floor(Math.random() * 600));


    // d3.select("data", i).transition()
    //   .duration(duration)
    //   .attr("cx", Math.floor(Math.random() * 400))
    //   .attr("cy", Math.floor(Math.random() * 400))
  }




// d3.selectAll("circle").transition()
//   .duration(duration)
//   .attr("cx", Math.floor(Math.random() * 400))
//   .attr("cy", Math.floor(Math.random() * 400))

// }


// The initial display.
//update();
}

placeEnemies(numberOfEnemies);

setInterval(function(){
  update()
}, 900);

