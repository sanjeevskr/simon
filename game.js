
var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;


$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

sb();

function sb(){
$(".start-button").click(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started=true;
  }
});
}


$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started=true;
  }
});

function nextSequence(){
  userClickedPattern = [];
  $("#level-title").text("Level " + level);

  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  level++;
}


function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}


function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },100);
    $("#level-title").html("Game Over, Press<button class='start-button' type='button' name='button'><b>Any</b></button> Key to Restart");
    startOver();
    sb();
  }
}


function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
