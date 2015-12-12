var width = 500,
    height = 500;

var duration = 750;

var numberOfEnemies = 4;

//var viewBox = "0 0 500 500"

var color = "green";
var collisions = 0;


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
  //d3.select(".player").attr("transform", "translate(" + (x-250) + "," + (y-250) + ")");
  d3.select(".player").attr("cx", x );
  d3.select(".player").attr("cy", y );


  //console.log("x", x,"y", y);
}
var drag = d3.behavior.drag().on("drag", dragmove);
var point = d3.select(".player")
var p = { x: point[0], y: point[1] };



// var detectPosition = function(){
//   setInterval(function(){console.log(d3.selectAll(".enemy0").attr("cx"));
//   }, 10); }


var detectPlayer = function(){
      
    var playerPosition = [];

    var pX = d3.selectAll(".player").attr("cx"); 
    var pY = d3.selectAll(".player").attr("cy");

    playerPosition.push(pX, pY);

    return playerPosition;
}


var detectEnemies = function() {

   var enemyPosition = [];

   for (var i = 0; i < numberOfEnemies; i++){

    var eX = d3.select(".enemy" + i).attr("cx");
    var eY = d3.select(".enemy" + i).attr("cy");
  
    enemyPosition.push([eX, eY]); 

   }

   

   return enemyPosition;
}

var detectCollision = function() {
  
  var playerPosition = detectPlayer();

  var enemyPosition = detectEnemies();
  // console.log(enemyPosition[1]);

  for (var i = 0; i < enemyPosition.length; i++){
    var enemyPositionX = enemyPosition[i][0];
    var enemyPositionY = enemyPosition[i][1];




    if ((Math.abs(playerPosition[0] - enemyPositionX) < 35 ) && (Math.abs(playerPosition[1] - enemyPositionY) < 35 )) {

     collisions++
     console.log("Collision Detected: ", collisions);

    }  
  }

  



/*  if (Math.abs(playerPosition[0] - enemyPosition[0]) < 15  && Math.abs(playerPosition[1] - enemyPosition[1]) < 15)
  {
    console.log("Collision Detected");
  }*/

  // console.log(playerPosition);



}


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
  for (var i = 0; i < n; i++) {
    var enemy = svg.append("circle")
      .attr("cx", Math.floor(Math.random() * 500))
      .attr("cy", Math.floor(Math.random() * 500))
      .attr("r", 10)
      .attr("fill", "purple")
      .attr("class", "enemy" + i);

  }
}




  //check your own position
  //if your position == (or is close to) player's position
  //console.log Collision! 



//POSITION

//select all enemies with a for loop
  //for each enemy, store position
  //display position





//UPDATE
function update() {

  for (var i = 0; i <= numberOfEnemies; i++){

    d3.select(".enemy" + i)
        //.attr("class", "enemy" + i)
        .transition()
        .duration(duration)
        .attr("cx", Math.floor(Math.random() * 500))
        .attr("cy", Math.floor(Math.random() * 500));    
        
        // First grab all the enemies cx, and cy positions
        // Put them in an array
        // While the values are being overwritten
          // We want to check if it colides the current position of the Player
          //
        //console.log(d3.select('.enemy' + i)[0][0].attributes[0]  
        //******console.log(d3.select('.enemy' + i).attr("cx"));  
        // var eX = d3.select('.enemy' + i)[0][0].attributes;
        // var eX = d3.select('.enemy' + i)[0][0];
        // var eY = d3.select('.enemy' + i)[0][0];
        





        
        // console.log("Enemy" + i + " " + eX);
  }
}
       

//detectPosition();

setInterval(detectCollision, 250);

placeEnemies(numberOfEnemies);

setInterval(function(){
  update()
}, 1000);

