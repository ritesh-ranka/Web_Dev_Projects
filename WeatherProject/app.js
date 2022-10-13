

const express=require("express");

const app=express();

const https=require("https");

const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
      res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req, res){
  const query=req.body.cityName;
  const appKey="572ff27cbcdd08645e139fae8eefc308";
  const unit="metric";
  const url="https:/api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+appKey;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      console.log(weatherData);
      const temp=weatherData.main.temp;
      const description=weatherData.weather[0].description;
      res.write("<h1>Weather at "+weatherData.name+" is "+temp+" degree Celcius</h1>");
      res.write("<img src=http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png>")
      res.send();
    });
  });
});



app.listen(3000,function(){
  console.log("server started at port 3000");
});
