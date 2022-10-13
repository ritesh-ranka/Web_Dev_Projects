

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser: true , useUnifiedTopology: true } );

const fruitSchema =new mongoose.Schema({
  name: String,
  rating: Number,
  review: String,
});

const Fruit = mongoose.model("Fruit",fruitSchema);

const fruit=new Fruit({
  name: "Apple",
  rating: 7,
  review: "Eat better than having a doc at home",
});

//fruit.save();
const kiwi=new Fruit({
  name: "kiwi",
  rating: 10,
  review: " cured me",
});

const banana=new Fruit({
  name: "banana",
  rating: 9,
  review: "Awesome fruit!",
});

const orange=new Fruit({
  name: "orange",
  rating: 4,
  review: "could be better",
});

// Fruit.insertMany([kiwi,banana,orange],function(err){
//   if(err)
//     console.log(err);
//   else
//     console.log("Successfully created");
// });

Fruit.find(function(err, fruits){
  if(!err){
  mongoose.connection.close();
  fruits.forEach(function(fruit){
    console.log(fruit.name);
  })};
});
