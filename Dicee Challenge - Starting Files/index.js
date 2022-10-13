function random(){
var randomnumber1=Math.random();
randomnumber1=randomnumber1*6+1;
randomnumber1=Math.floor(randomnumber1);
return randomnumber1;
}

function generate(number){
  var value="images/dice"+number+".png";
  return value;
}


var image1=document.querySelectorAll("img")[0];
var image2=document.querySelectorAll("img")[1];

image1num=random();
image2num=random();

if(image1num>image2num)
  document.querySelector("h1").innerHTML="📢Player 1 wins";
if(image1num<image2num)
  document.querySelector("h1").innerHTML="Player 2 wins📢";
if(image1num==image2num)
  document.querySelector("h1").innerHTML="Draw";

image1.setAttribute("src",generate(image1num));
image2.setAttribute("src",generate(image2num));
