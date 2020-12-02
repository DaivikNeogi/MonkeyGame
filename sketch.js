
var player, player_running
var back, backImage;

var bananaGroup, bananaImage;
var obstaclesGroup, obstacle;

localStorage ["highestScore"] = 0;

var score = 0;




function preload(){
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
 backImage = loadImage("jungle.png");
  
  bananaImage = loadImage("banana.png");
  
  obstacle = loadImage("stone.png");


}

function setup() {
  createCanvas(600, 200);
  
  player = createSprite(50,180,20,50);
  player.addAnimation("running", player_running);
  player.scale = 0.2;
  
  back = createSprite(200,200,400,400);
  back.addImage("background",backImage);
  back.x = back.width /2;
  back.velocityX = -4;
  

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(180);

stroke("white");  
textSize(20);    
fill("white")  
text("Score: "+ score, 500,50);
text("highScore: "+localStorage["highestScore"] , 480,80);
  

  
if (bananaGroup.isTouching(player)){
 score=score+2;
bananaGroup.destroyEach();
 
 switch(score) {
 case 10: player.scale = 0.12; 
         break;
 case 20: player.scale = 0.14; 
         break;
 case 30: player.scale = 0.16; 
         break;
 case 40: player.scale = 0.18; 
         break;
  
 default: break;
    }
      
}
  
   if(keyDown("space")&& player.y>159) {
    player.velocityY = -12;
  }
  
  player.velocityY = player.velocityY + 0.8
  
  if (back.x < 0){
    back.x = back.width/2;}
  
  spawnBanana();
  spawnObstacles();
  if (obstaclesGroup.isTouching(player)){
  player.scale = 0.2;
  }  

  

  drawSprites();
 }

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.5;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = player.depth;
    banana.depth = player.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(4+3*score/100);
  //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
