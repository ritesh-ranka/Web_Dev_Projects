const express=require("express");
const ejs=require("ejs");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");

const app=express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser: true, useUnifiedTopology: true});

const articleSchema={
  title: String,
  content: String,
};

const Article = mongoose.model("Article",articleSchema);

app.route("/articles")

.get(
  function(req, res){
    Article.find({},function(err, foundItems){
      if(!err){
        res.send(foundItems);
      }else{
        res.send(err);
      }
    });
  })
.post(function(req, res){
    const newArticle=new Article({
      title: req.body.title,
      content: req.body.content,
    });
    newArticle.save(function(err){
      if(!err){
        res.send("Suceessfully submitted");
      }else{
        res.send(err);
      }
    });
  })
.delete(function(req, res){
    Article.deleteMany(function(err){
      if(!err){
        res.send("Suceessfully deleted all the articles");
      }else{
        res.send(err);
      }
    });
  });

app.route("/articles/:articleTitle")
.get(function(req, res){
  Article.findOne({title: req.params.articleTitle}, function(err, foundItem){
    if(!err){
      if(foundItem){
        res.send(foundItem);
      }else{
        res.send("Article not found");
      }
    }else{
      res.send(err);
    }
  });
})
.put(function(req, res){
  Article.update(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    function(err){
    if(!err){
      res.send("Successfully updated article 1");
    }else{
      res.send(err)
    }
  });
})
.patch(function(req, res){
  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Sucessfully updated artice 2");
      }else{
        res.send(err);
      }
    });
})
.delete(function(req, res){
  Article.deleteOne({title: req.params.articleTitle},function(err){
    if(!err){
      res.send("Successfully deleted article");
    }else{
      res.send(err);
    }
  });
});

app.listen(3000,function(){
  console.log("Server started at port 3000");
});
