var width = 500,
    height = 500;
var score = 0;
var duration = 750;

var numberOfEnemies = 10;
var collisions = 0;

// Selected the body, append an SVG component to the body. Add the Attributes of width
// Height to the SVG element.

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "backgroundImage");
    //.attr("viewBox", viewBox);

// Select the SVG Element Tag on the HTML Page, and Append a Rectangle to the 
// Add the Attributes of the Rectange to the Rectangle.
var rectangle = svg.append("body")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 500)
    .attr("height", 500);

// Function for 
// Define drag beavior for the Mouse and the Player. Dragmove returns the X and Y
// Coordinaes of the Mouse and sets those to the player new cX and cY values by selecting the .player class.
function dragmove() {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(".player").attr("cx", x );
  d3.select(".player").attr("cy", y );
}

// Define the drag function for the Mouse Behavior which is native to the d3 library.
var drag = d3.behavior.drag().on("drag", dragmove);

// Add a Player Variable and Append it to the SVG Element and give it
// Attributes of a circle element
// Style the Circle so that it looks like pointer, when the mouse is over it.
// We identified the player circle element as a "Class" "Player"
// Then we also gave it a function called .drag on the player which has to be defined before the player is created and is invoked by moving the player around.

var player = svg.append("circle")
    .attr("cx", 250)
    .attr("cy", 250)
    .attr("r", 15)
    .attr("fill", "white")
    .attr("class", "player")
    .style("cursor", "pointer")
    .call(drag);



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
    
    score+= .5;
    d3.select(".current").select("span").text(score);

   }

   return enemyPosition;
}



var detectCollision = function() {
  
  var playerPosition = detectPlayer();

  var enemyPosition = detectEnemies();

  for (var i = 0; i < enemyPosition.length; i++){
    var enemyPositionX = enemyPosition[i][0];
    var enemyPositionY = enemyPosition[i][1];

    if ((Math.abs(playerPosition[0] - enemyPositionX) < 35 ) && (Math.abs(playerPosition[1] - enemyPositionY) < 35 )) {

      
     collisions++
     d3.select(".collisions").select("span").text(collisions);
     score = 0;
     duration = 500;
     d3.select("svg").select(".player").attr("fill", "orange");
     d3.select("svg").select(".player").transition().duration(500).attr("fill", "white");
    }  
  }
}

//ENTER
// We made a function to place the enemies on the board, using the settings or the pass
// parameter of the numberOfenemies from the global settings.
// It creates n number enemies and appends them to the SVG Component using circle elements
// We also added the attributes of Position of cX adn cY using the Math.random and multiplied it by the board size so that the circles stay within the board.
// We gave all the enemies unique classes "enemies" + i

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

placeEnemies(numberOfEnemies);

// Update runs every 1000ms or every second and is invoked by the setInterval function defined below.
function update() {

  // Iterate through the number of enemies and because we assigned enemies different classes
  // They had different positions based on Math.random(), since the time is determined by the computer clock. 
  for (var i = 0; i <= numberOfEnemies; i++){

      d3.select(".enemy" + i)
        .transition()
        .duration(duration)
        .attr("cx", Math.floor(Math.random() * 500))
        .attr("cy", Math.floor(Math.random() * 500));    
  }
}

// Detect collisions functions is invoked every 250 ms, so that we can capture a collision, while the enemy is moving within 750 ms.       
setInterval(detectCollision, 250);

setInterval(update, 1000);

