// This hides The Game until the Start Button is Clicked On
// $("#gameGrid").hide();

// Clicking the Start Button will Start the Game
$("#startBtn").on("click", function() {
  // $("#gameGrid").show();
  // $("#startBtn").hide();
  resetGame();
  playerScore = 0;
});
$("#resetBtn").on("click", function() {
  resetGame();
  playerScore = 0;
});


var numberOfQuestions = 30;

var results = "";
var question = "";
var correctAnswer = "";
var incorrectAnswer1 = "";
var incorrectAnswer2 = "";
var incorrectAnswer3 = "";

var playerScore = 0;

var pointValue = "";

// Wraped my ajax call code in a function
function getQuestion() {

  // The Function that renders the Question with Answer Choices
  var question = $(this).attr("data-name");
  var queryURL = "https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple";

  // Creating an AJAX call for the specific game baord button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    results = response.results;
    console.log(results);

    // Storing the question data
    question = response.results["0"].question;
    // console.log(question);

    correctAnswer = response.results["0"].correct_answer;
    // console.log(correctAnswer)

    incorrectAnswer1 = response.results["0"].incorrect_answers["0"];
    // console.log(incorrectAnswer1)

    incorrectAnswer2 = response.results["0"].incorrect_answers["1"];
    // console.log(incorrectAnswer2)

    incorrectAnswer3 = response.results["0"].incorrect_answers["2"];
    // console.log(incorrectAnswer3)

    var choicesOrder = [correctAnswer, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3];
    // console.log(choicesOrder)

    $("#gameGrid").hide();
    var questionDiv = $("<div>");
    questionDiv.addClass("question");
    questionDiv.html(response.results["0"].question);
    $(".question").html(question);



    var choices = [correctAnswer, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3];
    var arr = shuffle(choices);
    //console.log(arr);


    // Display the choices
    document.getElementById("choices-div").appendChild(makeUL(arr));


  }); //END ajax .done

} //END getQuestion



$(document).on("click", "li.answers", function() {
  var usersGuess = $(this).html();
  var correctAnswer = results["0"].correct_answer;

  if (usersGuess === correctAnswer) {


    $(".correctOrWrongText").text("CORRECT!");
    $(".correctOrWrongText").css("text-align", "center");
    $(".correctOrWrongText").css("color", "lime");
    // alert("correct!");

    console.log("point value: " + pointValue);
    playerScore = playerScore + pointValue;
    $("#choices-div").empty();
    $("#question").empty();
    $("#gameGrid").show();
    $("#playerScore").html(playerScore);
  } else {
    $(".correctOrWrongText").text("WRONG!");
    $(".correctOrWrongText").css("text-align", "center");
    $(".correctOrWrongText").css("color", "red");
    // alert("wrong!");

    console.log("point value: -" + pointValue);
    playerScore = playerScore - pointValue;
    $("#choices-div").empty();
    $("#question").empty();
    $("#gameGrid").show();
    $("#playerScore").html(playerScore);
  }
});

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

$("#gameGrid").on("click", ".gameButton", function() {
  $(".correctOrWrongText").empty();
  // **** THIS MERGED FROM OTHER .click *********
  $(this).prop('disabled', true);
  $(this).css("background-color", "#0069D9");
  $(this).css("border-color", "white");

  // *******************************************

  // this allows me to make an ajax call to my api to get a new question
  // every time I click a .gameButton
  getQuestion();


  // In the on click of the .gameButton we get the point value using its data-points
  // attribute. data-points will be a string so I parse it into an integer.
  pointValue = parseInt($(this).attr("data-points"));

  // I can verify my points value and make sure its of type number (integer).
  console.log("pointValue:", pointValue, "typeof:", typeof pointValue);

  // Display Answers
  var options = [
    choices = [correctAnswer, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3]
  ];

}); //END $("gameButton").click

function makeUL(array) {
  // Create the list element:
  var list = document.createElement("ul");

  for (var i = 0; i < array.length; i++) {
    // Create the list item:
    var item = document.createElement("li");

    // Set its contents:
    item.appendChild(document.createTextNode(array[i]));
    $(item).addClass("answers");
    $(item).val($(item).val() + pointValue);

    // Add it to the list:
    list.appendChild(item);
  }

  // Finally, return the constructed list:
  return list;
}

function resetGame() {
  $("#gameGrid").html('<tr><td><button class="gameButton easy" data-points="100">$100</button></td><td><button class="gameButton easy" data-points="100">$100</button></td><td><button class="gameButton easy" data-points="100">$100</button></td><td><button class="gameButton easy" data-points="100">$100</button></td><td><button class="gameButton easy" data-points="100">$100</button></td><td><button class="gameButton easy" data-points="100">$100</button></td></tr><tr><td><button class="gameButton easy" data-points="200">$200</button></td><td><button class="gameButton easy" data-points="200">$200</button></td><td><button class="gameButton easy" data-points="200">$200</button></td><td><button class="gameButton easy" data-points="200">$200</button></td><td><button class="gameButton easy" data-points="200">$200</button></td><td><button class="gameButton easy" data-points="200">$200</button></td></tr><tr><td><button class="gameButton medium" data-points="300">$300</button></td><td><button class="gameButton medium" data-points="300">$300</button></td><td><button class="gameButton medium" data-points="300">$300</button></td><td><button class="gameButton medium" data-points="300">$300</button></td><td><button class="gameButton medium" data-points="300">$300</button></td><td><button class="gameButton medium" data-points="300">$300</button></td></tr><tr><td><button class="gameButton medium" data-points="400">$400</button></td><td><button class="gameButton medium" data-points="400">$400</button></td><td><button class="gameButton medium" data-points="400">$400</button></td><td><button class="gameButton medium" data-points="400">$400</button></td><td><button class="gameButton medium" data-points="400">$400</button></td><td><button class="gameButton medium" data-points="400">$400</button></td></tr><tr><td><button class="gameButton hard" data-points="500">$500</button></td><td><button class="gameButton hard" data-points="500">$500</button></td><td><button class="gameButton hard" data-points="500">$500</button></td><td><button class="gameButton hard" data-points="500">$500</button></td><td><button class="gameButton hard" data-points="500">$500</button></td><td><button class="gameButton hard" data-points="500">$500</button></td></tr><tr><td><button class="gameButton hard" data-points="600">$600</button></td><td><button class="gameButton hard" data-points="600">$600</button></td><td><button class="gameButton hard" data-points="600">$600</button></td><td><button class="gameButton hard" data-points="600">$600</button></td><td><button class="gameButton hard" data-points="600">$600</button></td><td><button class="gameButton hard" data-points="600">$600</button></td></tr>')

  $(".correctOrWrongText").empty();
  $("#playerScore").empty();

}
