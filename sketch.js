var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground;
var bg, bgImage;
var survivalTime=0
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 bgImage = loadImage("jungle.jpg")
}



function setup() {
  createCanvas(400,200)
  bg = createSprite(300,100)
  bg.addImage(bgImage);
  bg.velocityX=-5;
  
  monkey = createSprite(50,150)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.08

ground = createSprite(300,180,600,20) 
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
background(255);
  if(gameState === PLAY){
  if(bg.x<0){
    bg.x=200;
  }
  if(keyDown("space")&&monkey.y>100) {
        monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
    
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
  }  
  
  spawnBanana();
  spawnObstacle();
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
  drawSprites();
   stroke("white");
    textSize=(20);
    fill("white");
    text("score:"+score,500,50);
    
    stroke("black");
    textSize=(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate())
    text("Survival Time:"+survivalTime ,100,50);
  }
  else if (gameState === END) {  
     
     
      bg.velocityX = 0;
      monkey.velocityY = 0
    text("GAME OVER",200,100);
      
     
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
    
   }
      
}
function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(300,120,40,10);
    banana.y = Math.round(random(60,100));
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
}
function spawnObstacle() {
  //write code here to spawn the clouds
  if (frameCount % 240 === 0) {
    var obstacle = createSprite(400,170,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
}










