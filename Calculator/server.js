//jshint enversion:6

const express=require("express");

const app=express();

const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname+"/public"));

app.get("/",function(req, res){
  res.sendFile(__dirname+"/bmiCalculator.html");
});

app.post("/",function(req, res){
  var w=Number(req.body.weight);
  var h=Number(req.body.height);
  var result=w/(h*h);
  res.send("Your BMI is: "+result);
});

app.listen(3000,function(){
  console.log("Server starting at port 3000");
});
