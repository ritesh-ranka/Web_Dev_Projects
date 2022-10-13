const express = require("express");
const bodyParser = require("body-parser");
const date=require(__dirname+"/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({entended: true}));
app.use(express.static("public"));

const items=[];
const workItems=[];

app.get("/", function(req, res) {
  const day=date.getDate();
  res.render('list', {
    listTitle: day,
    newitems: items,
  });
});

app.get("/work",function(req, res){
  res.render('list',{
    listTitle: "Work List",
    newitems: workItems,
  });
});

app.get("/about",function(req, res){
  res.render('about');
})

app.post('/work',function(req,res){
  const item=req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});


app.post("/",function(req, res){

  const item=req.body.newItem;
  if(req.body.button==="Work")
  {
    workItems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect('/');
  }

});

app.listen(3000, function() {
  console.log("Server started at port 3000");
});
