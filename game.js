var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var startGame = false;
var level = 0;
var bestRecord = 0;

$(".btn").click(function(event) {
  var chosenColorId = "#" + event.target.id;

  $(chosenColorId).addClass("pressed");
  setTimeout(function() {
    $(chosenColorId).removeClass("pressed")
  }, 100);

  makeSound(event.target.id);

  if (startGame) {
    userClickedPattern.push(event.target.id);
    if ((checkAnswer() === true) && (gamePattern.length === userClickedPattern.length)) {
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence()
      }, 1000);
      console.log("next level");
    } else if (checkAnswer() === false) {
      var currentRecord = level - 1;
      updateRecord(currentRecord);
      gameOver();
    }
  }
  if (!startGame) {
    wrongAnswerIndicator();
  }

});

$(document).keypress(function() {
  if (!startGame) {
    setTimeout(function() {
      nextSequence()
    }, 1000)
    startGame = true;
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  var randomChosenColorId = "#" + randomChosenColor;

  buttonFlash(randomChosenColorId);
  makeSound(randomChosenColor);
  gamePattern.push(randomChosenColor);

  level += 1;
  $("#level-title").text("Level " + level);

}

function checkAnswer() {
  if (gamePattern[userClickedPattern.length - 1] === userClickedPattern[userClickedPattern.length - 1]) {
    console.log("Correct");
    return true;
  } else {
    console.log("Wrong");
  }
  return false;
}

function gameOver() {
  startGame = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;

  wrongAnswerIndicator();
  $("#level-title").text("Game Over! Press Any Key to Restart...");

}

function updateRecord(currentRecord) {
  if (currentRecord > bestRecord) {
    $(".level-record").text("Level " + currentRecord);
    bestRecord = currentRecord;
  }
}

function buttonFlash(chosenColorId) {
  $(chosenColorId).fadeOut(100).fadeIn(100);
}


function makeSound(chosenColor) {
  switch (chosenColor) {
    case "red":
      var audio = new Audio("sounds/red.mp3");
      audio.play();
      break;
    case "blue":
      audio = new Audio("sounds/blue.mp3");
      audio.play();
      break;
    case "green":
      audio = new Audio("sounds/green.mp3");
      audio.play();
      break;
    case "yellow":
      audio = new Audio("sounds/yellow.mp3");
      audio.play();
      break;
    default:
      return -1;

  }
}

function wrongAnswerIndicator() {

  var audio = new Audio("sounds/wrong.mp3");
  audio.play();

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over")
  }, 300);
}
