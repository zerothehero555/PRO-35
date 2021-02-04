//Create variables here
var dog,sadDog,happyDog, database; 
var foodS,foodStock; 
var fedTime,lastFed; 
var feed,addFood; 
var foodObj;

function preload(){
 sadDog = loadImage("images/dogImg.png")
 happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(1000, 400);
  database = firebase.database();
  dog = createSprite(400,250,10,10)
  dog.addImage(sadDog);
  dog.scale = 0.2
  foodObj = new Food()

  foodStock = database.ref('food')
  foodStock.on("value",readStock);

  feed = createButton("Feed The Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

}
function readStock(data){
  foodS = data.val()
  foodObj.updateFoodStock(foodS)
}

function draw() { 
  background(46,139,87); 
  foodObj.display(); 
  fedTime=database.ref('FeedTime'); 
  fedTime.on("value",function(data){ 
  lastFed=data.val(); 
  }); 
  fill(255,255,254); 
  textSize(15); 
  if(lastFed>=12){ 
  text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
  }else if(lastFed==0){ 
  text("Last Feed : 12 AM",350,30); 
  }else{ 
  text("Last Feed : "+ lastFed + " AM", 350,30); 
  } 
  drawSprites();
}
function writeStock(x){
  if(x<=0){
    x = 0
  }
else{
  x = x-1 
}
database.ref('/').update({
  food:x
})
}
//function to update food stock and last fed time 
function feedDog(){ 
dog.addImage(happyDog); 
if(foodObj.getFoodStock()<= 0){ 
  foodObj.updateFoodStock(foodObj.getFoodStock()*0); 
  }else{ 
  foodObj.updateFoodStock(foodObj.getFoodStock()-1); 
} 
database.ref('/').update({ food:foodObj.getFoodStock(), FeedTime:hour() }) 
}
//function to add food in stock 
function addFoods(){ 
  foodS++; 
  database.ref('/').update({ food:foodS }) 
}




