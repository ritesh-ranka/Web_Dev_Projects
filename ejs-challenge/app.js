//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");



const homeStartingContent ="Welcome to your Personnal Blog Website. You can write, edit and delete your bolgs or ideas whenever you want. You can use this site to write whatever comes to your mind and show others when you are comletely sure of sharing. Thank you and Enjoy Writing ✌.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(session({
  secret: "Our Little secret.",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/journalDB",{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex",true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const itemSchema= new mongoose.Schema({
  username: String,
  email: String,
  title: String,
  body: String,
  status: Number,
});

userSchema.plugin(passportLocalMongoose);

const User=mongoose.model('user',userSchema);
const Item=mongoose.model('item',itemSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req, res){
    res.render("login");
});

app.get("/signup",function(req,res){
  res.render("signup");
});

app.get("/about",function(req, res){
  res.render("about",{about: aboutContent});
});

app.get("/contact",function(req, res){
  res.render("contact",{contact: contactContent,});
});

app.get("/compose",function(req, res){
  res.render("compose");
});

app.get("/posts/:topic",function(req, res){

  const checkedId=req.params.topic;
  Item.find({_id:checkedId},function(err, foundItem){
    if(!err){
      res.render("post",{postTitle: foundItem[0].title, postBody: foundItem[0].body,})
    }else{
      res.render("post",{postTitle: "Something went Wrong😕",postBody: "404 Unavailaible"})
    }
  });
});

app.get("/home",function(req,res){
  if(req.isAuthenticated()){
    res.render("home");
  }else{
    res.render("login");
  }
});

app.post("/signup",function(request,resp){
  User.register({username: request.body.email}, request.body.password,function(err, user){
    if(err){
      console.log(err);
      res.redirect("/signup");
    }else{
      passport.authenticate("local")(request,resp,function(err){
        console.log(err);
        resp.redirect("/home");
      });
    } 
  });
});

app.post("/compose",function(req, res){
  const post=new Item({
    title:req.body.postTitle,
    body:req.body.postBody,
  });
  post.save();
  res.redirect('/')
});

app.post("/delete",function(req, res){
  const postTitle=req.body.delete;
  Item.findOneAndRemove({title:postTitle},function(err){
    if(!err)
    {
      console.log("successfully deleted");
      res.redirect("/");
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
