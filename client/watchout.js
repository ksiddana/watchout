var width = 500,
    height = 500;

var duration = 750;

var numberOfEnemies = 4;

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
  console.log("x", x,"y", y);
}
var drag = d3.behavior.drag().on("drag", dragmove);
var point = d3.select(".player")
var p = { x: point[0], y: point[1] };

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




    // console.log(player[0])

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

function placeEnemyPosition() {
  
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
        
        // First grab all the enemies cx, and cy positions
        // Put them in an array
        // While the values are being overwritten
          // We want to check if it colides the current position of the Player
          //
        console.log(d3.select('.enemy1'));  
        var eX = d3.select('.enemy1')[0][0].attributes;
        // var eX = d3.select('.enemy' + i)[0][0];
        // var eY = d3.select('.enemy' + i)[0][0];
        
        
        console.log("Enemy" + i + " " + eX);
  }
}
       

placeEnemies(numberOfEnemies);

setInterval(function(){
  update()
}, 1000);

