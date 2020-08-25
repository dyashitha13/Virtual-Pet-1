var dog, dog1, happyDog;
var database;
var foodS,foodStock;

function preload(){
   dog1 = loadImage("Images/dogImg.png");
   happyDog = loadImage("Images/dogImg1.png");
  }

function setup() {
  database = firebase.database();
  createCanvas(500,500);

  dog = createSprite(250,420,20,20);
  dog.addImage (dog1);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  textSize(13); 
  stroke("black");
}

function draw(){
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  drawSprites();

  textSize(13);
  fill("black");
  stroke("black");
  text("Food remaining : "+foodS,180,200);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",110,10,300,20);
 
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 

  database.ref('/').update({
    Food:x
  })
}