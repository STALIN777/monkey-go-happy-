var PLAY =1;
var END  =0;
var monkey , monkeyImage;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var ground ;
var bg , endbg;
var rand;
var GameState = PLAY;

function preload(){
  
  
  monkeyImage =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bg=loadImage("bg3.JPG");
  endbg=loadImage("maxresdefault (1).jpg");
  
  
 
}



function setup() {
 createCanvas(590,450);
 
 monkey=createSprite(100,370,10,10);
 monkey.addAnimation("running",monkeyImage); 
 monkey.scale=0.15;
  
  
 ground = createSprite(590,410,1900,30);
 ground.visible=false; 
  
 obstacleGroup = createGroup();
 FoodGroup     = createGroup(); 
  
  

  
  

  score=0;
}


function draw() {
 background(bg);
 fill("white");
 textSize(19); 
 text("Survival Time:-" +"  "+score,240,90); 
 score = score + Math.round(getFrameRate()/60); 
    
  
 if (GameState === PLAY) 
 {
    ground.velocityX = -(4 + 3* score/100)
  if (ground.x < 0)
  {
    ground.x = ground.width/2;
  
  } 
   
  if (keyDown("space"))
  {
    monkey.velocityY=-15;
  } 
   
    monkey.velocityY = monkey.velocityY +0.8;
   
  if (monkey.isTouching(obstacleGroup))
  {
    GameState=END;
  } 
 
    if (monkey.isTouching(FoodGroup))
    {
      FoodGroup.destroyEach();
    }  
   
    monkey.collide(ground);
   
 } 
  
  else if (GameState === END)
  {
    background(endbg);
    ground.velocityX=0;
    obstacleGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    monkey.velocityX=0
    monkey.destroy();
    
  }
  
  
  stones();
  food();  
  drawSprites();
}

function stones()
{
  if (frameCount % 300 ===0)
  {
    obstacles = createSprite(590,370,30,30);
    obstacles.addImage(obstacleImage);
    obstacles.scale=0.2;
    obstacles.velocityX=-6;
    obstacles.Lifetime=300;
    obstacleGroup.add(obstacles);
  }
}

function food()
{
  if (frameCount % 80 === 0)
  {
    banana = createSprite(590,10,10,10);
    banana.addImage(bananaImage);
    var rand = Math.round(random(210,280));
    banana.y=Math.round(random(210,280));
    banana.velocityX=-6;
    banana.scale=0.1;
    FoodGroup.add(banana);
  }  
}



