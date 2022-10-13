//jshint esversion:6

const express=require("express");

const app=express();

app.get("/",function(req, res){
  res.send("<h1>hello world</h1>");
});

app.get("/contact",function(req, res){
  res.send("Contact me at: riteshranka.engi@gmail.com");
});

app.get("/about",function(req, res){
  res.send('my name is ritesh ranka and i am a programmer');
});

app.get("/hobbies",function(req, res){
  res.send("cofee ,code");
});

app.listen(3000,function(){
  console.log("server started at port 3000");
});
