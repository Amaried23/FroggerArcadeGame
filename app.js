//this function below is to control the slider bar for the enemies speed//

function updateSpeed(newValue)
{
  if (newValue=="50"){
    for  (var i=0;i<allEnemies.length;i++){ 
      allEnemies[i]=new Enemy(allEnemies[i].x,allEnemies[i].y,allEnemies[i].speed*2,allEnemies[i]);   
    }   
    }else{    
    for  (var i=0;i<allEnemies.length;i++){ 
      allEnemies[i]=new Enemy(allEnemies[i].x,allEnemies[i].y,allEnemies[i].speed/2,allEnemies[i]);   
    }     
  } 
};


// Below is Enemy function with x and y coordinates. Also speed and enemy image
var Enemy = function(x,y,speed,sprite) {
   
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    return this;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  //alert("x coordinate enemy:"+this.x+"::"+player.x);
  if(Math.abs(player.x-this.x) <50  &&  Math.abs(player.y-this.y) <50){  
        player.x=200;
        player.y=395;
    }


  // below is the enemies speed. If this enemy is this then 500 then this enemy equals -150 + enemy speed times a time delta between ticks//
  
  if (this.x>500)
    this.x=-150 + this.speed * dt;
  else
      this.x = this.x + this.speed * dt;


};

// This function is to draw enemy on screen
Enemy.prototype.render = function(x,y,speed) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Below is the player function that has the x and y coordinates. Also has movement pace and image.
var Player = function(x,y,movement) {
    this.x = 200;
    this.y = 395;
    this.movement = 83;
    this.sprite = 'images/char-boy.png';


};
 //Below is a player update.

Player.prototype.update = function(dt) {

    this.x * (dt);
    this.y * (dt);
};

// Below draws player on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.resetPlayer = function(x,y){
  this.x = 200;
  this.y = 400;
};

//Below is the function for the player movements using the keyboard.

Player.prototype.handleInput = function(direction){
  
if(direction === 'left' && this.x > 25){
    this.x -=100;
  }
if(direction === 'up' && this.y > 0){
    this.y -= 82.5;
  }
if(direction === 'right' && this.x < 400){
    this.x += 100;
  }
if(direction === 'down' && this.y < 400){
    this.y += 82.5;
  }

  if( this.y > 320){
    this.y = 395;
  }

  //Below that is states if the player reaches the end of the board put an alert on the screen stating " you win"
// and reset player back to beginning coordinate
    if( this.y < 0){
      this.x = 200;
    this.y = 395;
    alert('You Win!');
   }  

    //Below is for loop for when the enemies and player collide. Its states if the player is within 50 pixels of the bug
    // then alert splat and put player back to original coordinates
   for  (var i=0;i<allEnemies.length;i++){    
        if(Math.abs(allEnemies[i].x -this.x)  <50  && Math.abs(allEnemies[i].y -this.y) <50){
            player.x=200;
            player.y=395;
            alert('SPLAT!');
        }    
    }
    

};



// Below is each Enemy with is coordinates and speed
 
var Enemy1 = new Enemy(-100,100,80,"Enemy1");
var Enemy2 = new Enemy(-150,150,130,"Enemy2");
var Enemy3 = new Enemy(-180,180,90, "Enemy3");

//All Enemies Array

var allEnemies = [Enemy1,Enemy2,Enemy3];

//Player variable below with beginning coordinates
var player = new Player(200,395);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});