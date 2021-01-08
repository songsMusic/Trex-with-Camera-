var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;


function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

  ground.setCollider('rectangle',0,0,ground.width,3)

}

function draw() {
  background(255);

  text("Score: "+ score, camera.position.x+230,50);

  
  
  trex.x=camera.position.x-250;


  console.log(trex.y)
  
 
  
  if (gameState===PLAY){
    if(frameCount%4==0)
  {
    score++;
  }


    camera.position.x+=6;

    
    if(camera.position.x>ground.width/2+300)
    {
      camera.position.x=300;
      obstaclesGroup.destroyEach();
      cloudsGroup.destroyEach();
    }
   
    if(keyDown("space") && trex.y >= 150) {
      trex.velocityY = -14;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    
    trex.collide(ground);
    spawnClouds();
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
        
    }
  }
  else if (gameState === END) {
    gameOver.x=camera.position.x;
    restart.x=camera.position.x;
    gameOver.visible = true;
    restart.visible = true;

    trex.velocityY = 0;
    trex.velocityY = 0;
    cloudsGroup.velocityY = 0;
    cloudsGroup.velocityX = 0 ;
    ground.velocityX= 0;
  
    trex.changeAnimation("collided",trex_collided);
  
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  
  if (frameCount % 150 === 0) {
    var cloud = createSprite(camera.position.x+300,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    
    cloud.lifetime = 100;
  
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudsGroup.add(cloud);
    
  }
  
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(camera.position.x+300,165,10,40);
    
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
            
    obstacle.scale = 0.5;
    obstacle.lifetime = 350;
    
    obstaclesGroup.add(obstacle);
   
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);

  camera.position.x=300;
  
  score = 0;
  
}