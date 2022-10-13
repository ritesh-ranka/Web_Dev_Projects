var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];

var level=0;

var userClickedPattern=[];

$(".btn").click(function(event){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
    nextSequence();
});

function checkAnswer(currentlevel){
    console.log(currentlevel);
    if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {

        console.log("success");
  
        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length){
  
          //5. Call nextSequence() after a 1000 millisecond delay.
          setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
  
      } else {
  
        console.log("wrong");
        var audio=new Audio('sounds/wrong.mp3');
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over. Press any key to Restart.")
        level=0;
        gamePattern=[];
      }
}

function nextSequence(){
    userClickedPattern=[];
    $("h1").text("level "+level);
    level++;
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var randomid="#"+randomChosenColor;
    $(randomid).fadeOut().fadeIn();
    playSound(randomChosenColor);
}


function playSound(Sound){
    switch(Sound){
        case 'green': var green=new Audio('sounds/green.mp3');
                        green.play();
                    break;
        case 'red': var red=new Audio('sounds/red.mp3');
                        red.play();
                    break;
        case 'blue': var blue=new Audio('sounds/blue.mp3');
                        blue.play();
                    break;
        case 'yellow': var yellow=new Audio('sounds/yellow.mp3');
                        yellow.play();
                    break;
        default: console.log(Sound);
    }
}

function animatePress(currentColor){
    var randomid="#"+currentColor;
    $(randomid).addClass("pressed");
    setTimeout(function() {
        $(randomid).removeClass("pressed");
    }, 100);
}
