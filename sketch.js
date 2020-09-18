var play = 1;
var end = 0;
var monkey, monkey_running, ground;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, gamestate;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(400, 400);

  monkey = createSprite(100, 300, 20, 20);
  monkey.scale = 0.1;
  monkey.addAnimation("running", monkey_running);

  ground = createSprite(300, 340, 400, 10);
  ground.shapeColor = ("green");
  ground.velocityX = -2;
  ground.x = ground.width / 2;

  FoodGroup = new Group();
  obstacleGroup = new Group();

  score = 0;
}


function draw() {
  background("lightblue");
  fill("black");
  textFont("courier");
  textSize(15);
  text("Score: "+ score, 300,20);
  score = score + Math.round(getFrameRate()/60);
  if (keyDown("space") && monkey.y >= 304) {
    monkey.velocityY = -9;
  }

  console.log(ground.x);

  monkey.velocityY = monkey.velocityY + 0.4;

  monkey.collide(ground);
  ground.x = ground.width / 2;


  Obstacles();
  Bananas();

  if (monkey.isTouching(FoodGroup)) {
    FoodGroup.destroyEach();
  }

  //if(monkey.isTouching(
  if (gamestate === play) {

    if (keyDown("space") && monkey.y >= 304) {
      monkey.velocityY = -9;
    }

    console.log(ground.x);

    monkey.velocityY = monkey.velocityY + 0.4;

    monkey.collide(ground);
    ground.x = ground.width / 2;


    Obstacles();
    Bananas();

    if (monkey.isTouching(FoodGroup)) {
      FoodGroup.destroyEach();
    }



  }
  
  if (monkey.isTouching(obstacleGroup)) {
    gamestate = end;
  }
  
  if (gamestate === end) {
    background("lightblue");
    fill("black");
    textFont("courier");
    textSize(50);
    text("GAME OVER!",50,200);
    monkey.destroy();
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    ground.destroy();
   
  }

  drawSprites();
}

function Bananas() {

  if (frameCount % 100 === 0) {
    banana = createSprite(400, 230, 10, 10);
    banana.scale = 0.1;
    banana.addAnimation("banana", bananaImage);
    banana.y = Math.round(random(230, 320));
    banana.velocityX = -5;
    banana.lifetime = -1;

    FoodGroup.add(banana);




  }

}

function Obstacles() {

  if (frameCount % 100 === 0) {
    obstacle = createSprite(400, 316, 10, 10);
    obstacle.scale = 0.1;
    obstacle.addAnimation("stone", obstacleImage);
    obstacle.velocityX = -5;
    obstacle.lifetime = -1;

    obstacleGroup.add(obstacle);

  }




}