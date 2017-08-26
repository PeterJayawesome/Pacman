var map =[[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
          [2,0,1,1,1,1,1,2,2,1,1,1,1,1,1,2],
          [2,1,2,2,2,1,1,2,2,1,1,2,2,2,1,2],
          [2,1,2,1,1,1,1,1,1,1,1,1,1,2,1,2],
          [2,1,2,1,2,2,2,5,5,2,2,2,1,2,2,2],
          [2,2,2,1,2,2,2,5,5,2,2,2,1,2,1,2],
          [2,1,2,1,1,1,1,1,1,1,1,1,1,2,1,2],
          [2,1,2,2,2,1,1,2,2,1,1,2,2,2,1,2],
          [2,1,1,0,1,1,1,2,2,1,1,1,1,1,1,2],
          [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]];
var total = 0;
function displayMap(arr){
  var output="";
  for(var i=0;i<arr.length;i++){
    output += "<div class='row'>"
    for (var j = 0; j < arr[i].length; j++) {
      if(arr[i][j]==2){
        output += "<div class='brick'></div>";
      }
      else if (arr[i][j]==1) {
        output += "<div class='coin'></div>";
      }
      else if(arr[i][j]==0){
        output += "<div class='empty'></div>";
      }
      else if (arr[i][j]==5) {
        output += "<div class='cherry'></div>";
      }
    }
    output += "</div>";
  }
  document.getElementById("map").innerHTML = output;
}
function countScore(arr){
  for(var i=0;i<arr.length;i++){
    for (var j = 0; j < arr[i].length; j++) {
      if(arr[i][j]==1){
        total +=10;
      }
      else if(arr[i][j]==5){
        total +=50;
      }
    }
  }
}
var ghost = [];
var pacman = {x:1,y:1};
var score = 0;
var life = 2;
function generateGhost(){
  for(var i = 0; i < 3; i++){
    ghost.push({x:Math.floor(1+Math.random()*(map[0].length-2)),y:Math.floor(1+Math.random()*(map.length-2))});
    if(map[ghost[i].y][ghost[i].x]==2){
      console.log(ghost[i]);
      ghost.pop();
      i--;
    }
  }
}
function displayGhost(){
  var output ="";
  for(var i = 0; i < ghost.length; i++){
    output += "<div class='ghost' id='ghost"+i+"' style='top:"+ghost[i].y*20+"px; left:"+ghost[i].x*20+"px;'></div>";
  }
  document.getElementById('ghosts').innerHTML = output;
}
function moveGhost(){
  for(var i=0; i< ghost.length; i++){
    var dirN =[];
    var x= ghost[i].x;
    var y= ghost[i].y;
    if(map[y-1][x] == 2){
      dirN.push(0);
    }else {
      dirN.push(Math.random());
    }
    if(map[y][x+1] == 2){
      dirN.push(0);
    }else {
      dirN.push(Math.random());
    }
    if(map[y+1][x] == 2){
      dirN.push(0);
    }else {
      dirN.push(Math.random());
    }
    if(map[y][x-1] == 2){
      dirN.push(0);
    }else {
      dirN.push(Math.random());
    }
    var max = dirN[0], index = 0;
    for(var j=0;j<4;j++){
      if(dirN[j]>max){
        max = dirN[j];
        index = j;
      }
    }
    // console.log(dirN);
    // console.log(index);
    // console.log(i);
    if(index == 0){ghost[i].y--;};
    if(index == 1){ghost[i].x++;};
    if(index == 2){ghost[i].y++;};
    if(index == 3){ghost[i].x--;};
    detectCollision();
  }
}
function detectCollision(){
  for(var i=0; i< ghost.length; i++){
    if(ghost[i].x == pacman.x && ghost[i].y == pacman.y){
      life --;
      if(life< 0){
        document.getElementById("score").innerHTML = "<h2>You Lose...</h2>";
      }
    }
  }
}
function gameLoop(){
  moveGhost();
  displayMap(map);
  displayGhost();
  displayPac();
}
function displayPac(){
  document.getElementById('pacman').style.top= pacman.y*20+"px";
  document.getElementById('pacman').style.left= pacman.x*20+"px";
}
if(life< 0){
  document.getElementById("score").innerHTML = "<h2>You Lose...</h2>";
}
else {
  document.onkeydown = function(e){
    if(e.keyCode == 39){
      document.getElementById('pacman').style.transform = "rotate(0deg)";
      if(map[pacman.y][pacman.x+1] != 2){
        pacman.x++;
        if(map[pacman.y][pacman.x]==1){
          score += 10;
          map[pacman.y][pacman.x]=0;
          document.getElementById('points').innerHTML = score;
        }
        if(map[pacman.y][pacman.x]==5){
          score += 50;
          map[pacman.y][pacman.x]=0;
          document.getElementById('points').innerHTML = score;
        }
      }
    }
    else if (e.keyCode == 37) {
      document.getElementById('pacman').style.transform = "rotate(180deg)";
      if(map[pacman.y][pacman.x-1] != 2){
        pacman.x--;
        if(map[pacman.y][pacman.x]==1){
          score += 10;
          map[pacman.y][pacman.x]=0;
          document.getElementById('points').innerHTML = score;
        }
        if(map[pacman.y][pacman.x]==5){
          score += 50;
          map[pacman.y][pacman.x]=0;
          document.getElementById('points').innerHTML = score;
        }
      }
    }
    else if (e.keyCode == 40) {
      document.getElementById('pacman').style.transform = "rotate(90deg)";
      if (map[pacman.y+1][pacman.x] != 2) {
        pacman.y++;
        if(map[pacman.y][pacman.x]==1){
          score += 10;
          map[pacman.y][pacman.x]=0;
          document.getElementById('points').innerHTML = score;
        }
        if(map[pacman.y][pacman.x]==5){
          score += 50;
          map[pacman.y][pacman.x]=0;
          document.getElementById('points').innerHTML = score;
        }
      }
    }
    else if (e.keyCode == 38) {
      document.getElementById('pacman').style.transform = "rotate(270deg)";
      if (map[pacman.y-1][pacman.x] != 2) {
        pacman.y--;
        if(map[pacman.y][pacman.x]==1){
          score += 10;
          map[pacman.y][pacman.x]=0;
          document.getElementById('points').innerHTML = score;
        }
        if(map[pacman.y][pacman.x]==5){
          score += 50;
          map[pacman.y][pacman.x]=0;
          document.getElementById('points').innerHTML = score;
        }
      }
    }
    if(score == total){
      document.getElementById("score").innerHTML = "<h2>You Win!</h2>";
    }
    console.log(life);
    displayPac();
    displayMap(map);
    detectCollision();
  }
}

countScore(map);
displayMap(map);
generateGhost();
setInterval(gameLoop,1000);
