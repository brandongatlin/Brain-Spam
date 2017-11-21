$("#logOffFacebook").hide();

// Clicking the Start Button will Start the Game
$("#startBtn").on("click", function() {
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
  var queryURL = "https://opentdb.com/api.php?amount=1&category=20&type=multiple";

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

    $("this").css("color", "pink");
    $(".correctOrWrongText").text("CORRECT!");
    $(".correctOrWrongText").css("text-align", "center");
    $(".correctOrWrongText").css("color", "lime");
    $(".correctOrWrongText").addClass("animated bounce");
    $("#playerScore").addClass("animated bounce");
    $("#playerScore").css("color", "lime");

    // console.log("point value: " + pointValue);
    playerScore = playerScore + pointValue;
    $("#choices-div").empty();
    $("#question").empty();
    $("#playerScore").html(playerScore);
  } else {
    $(".correctOrWrongText").text("WRONG!");
    $(".correctOrWrongText").css("text-align", "center");
    $(".correctOrWrongText").css("color", "red");
    $(".correctOrWrongText").addClass("animated bounce");
    $("#playerScore").css("color", "red");
    $("#playerScore").addClass("animated bounce");



    console.log("point value: -" + pointValue);
    playerScore = playerScore - pointValue;
    $("#choices-div").empty();
    $("#question").empty();
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

$("#tableContainer").on("click", ".gameButton", function() {
  $(".correctOrWrongText").empty();
  $(this).prop('disabled', true);
  $(this).css("background-color", "#0069D9");
  $(this).css("border-color", "white");
  $("#playerScore").css("color", "black");
  $("#playerScore").removeClass("animated bounce");
  $(".correctOrWrongText").removeClass("animated bounce");




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

  $("#tableContainer").html('<div class="row"> <div class="col-md-2"> <div class="gameButton easy animated bounceInLeft" data-points="100"> $100 </div> </div><div class="col-md-2"> <div class="gameButton easy animated bounceInLeft" data-points="100"> $100 </div> </div><div class="col-md-2"> <div class="gameButton easy animated bounceInRight" data-points="100"> $100 </div> </div><div class="col-md-2"> <div class="gameButton easy animated bounceInLeft" data-points="100"> $100 </div> </div><div class="col-md-2"> <div class="gameButton easy animated bounceInRight" data-points="100"> $100 </div> </div><div class="col-md-2"> <div class="gameButton easy animated bounceInLeft" data-points="100"> $100 </div> </div> </div><div class="row"> <div class="col-md-2"> <div class="gameButton medium animated bounceInRight" data-points="200"> $200 </div> </div><div class="col-md-2"> <div class="gameButton medium animated bounceInLeft" data-points="200"> $200 </div> </div><div class="col-md-2"> <div class="gameButton medium animated bounceInLeft" data-points="200"> $200 </div> </div><div class="col-md-2"> <div class="gameButton medium animated bounceInRight" data-points="200"> $200 </div> </div><div class="col-md-2"> <div class="gameButton medium animated bounceInLeft" data-points="200"> $200 </div> </div><div class="col-md-2"> <div class="gameButton medium animated bounceInRight" data-points="200"> $200 </div> </div> </div><div class="row"> <div class="col-md-2"> <div class="gameButton hard animated bounceInLeft" data-points="300"> $300 </div> </div><div class="col-md-2"> <div class="gameButton hard animated bounceInRight" data-points="300"> $300 </div> </div><div class="col-md-2"> <div class="gameButton hard animated bounceInLeft" data-points="300"> $300 </div> </div><div class="col-md-2"> <div class="gameButton hard animated bounceInLeft" data-points="300"> $300 </div> </div><div class="col-md-2"> <div class="gameButton hard animated bounceInRight" data-points="300"> $300 </div> </div><div class="col-md-2"> <div class="gameButton hard animated bounceInLeft" data-points="300"> $300 </div> </div> </div>');

  $(".correctOrWrongText").empty();
  $("#playerScore").empty();


} // end reset game function
