const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _= require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  entended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://ritesh:ritesh11$@cluster0.9w68v.mongodb.net/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);


app.get("/", function(req, res) {
  const day = date.getDate();

  Item.find({}, function(err, foundItems) {
    if (foundItems.length === 0) {
      const item1 = new Item({
        name: " Welcome to your todolist!"
      });
      item1.save();
    } else {
      res.render('list', {
        listTitle: day,
        newitems: foundItems,
      });
    }
  })

});


app.get("/about", function(req, res) {
  res.render('about');
})

app.get("/:page", function(req, res) {
  const currentPage = _.capitalize(req.params.page);
  console.log(currentPage);
  List.findOne({name: currentPage}, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        console.log(foundList);
        const list1 = new List({
          name: currentPage,
          items: [
            {
              name:"Welcome to "+currentPage+" Page",
            }
          ]
        });
        list1.save();
        res.redirect("/"+currentPage);
      } else {
        res.render('list', {
          listTitle: foundList.name,
          newitems: foundList.items,
        });
      }
    }
  });
});


app.post("/delete", function(req, res) {
  const checkedId = req.body.checkbox;
  const listName=req.body.listName;
  const day=date.getDate();
  console.log(listName);
  console.log(day);
  if(day===listName){
    Item.findByIdAndRemove(checkedId, function(err) {
      if (!err) {
        console.log("sucessfully deleted");
        res.redirect("/");
      }
    });
  }else{
    List.findOneAndUpdate({name: listName},{$pull: {items: {_id: checkedId}}},function(err, result){
      if(!err){
        console.log("sucessfully removed using $pull");
        res.redirect("/"+listName);
      }

    });
  }
});


app.post("/", function(req, res) {

  const item = new Item({
    name: req.body.newItem,
  });
  const day=date.getDay()+","
  if(req.body.button===day){
    item.save();
    res.redirect("/");
  }else{
    List.findOne({name: req.body.button},function(err, foundItem){
      if(!err)
      {
        foundItem.items.push(item);
        foundItem.save();
        res.redirect("/"+foundItem.name);
      }
    });
  }

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started at port 3000");
});
