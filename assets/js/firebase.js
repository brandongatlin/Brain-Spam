console.log("ts6");
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCnD00DCXAEUzyEJQVNwA7yI7G5OUstYHs",
  authDomain: "chat-test-56e7c.firebaseapp.com",
  databaseURL: "https://chat-test-56e7c.firebaseio.com",
  projectId: "chat-test-56e7c",
  storageBucket: "chat-test-56e7c.appspot.com",
  messagingSenderId: "1003382859041"
};
firebase.initializeApp(config);

var database = firebase.database();

database.ref("/scores").orderByChild("high_score").limitToLast(1).on("value", function(snapshot) {


  var arr = Object.keys(snapshot.val());
  var highScore = snapshot.val()[arr[0]].high_score;
  // console.log("highScore:", highScore);

  $("#allTimeHigh").html(highScore);

});

//begin database js File
var loginData = database.ref("/login");
var scoreData = database.ref("/scores");

//auth js File

var provider = new firebase.auth.FacebookAuthProvider();
var provider2 = new firebase.auth.GithubAuthProvider();

var displayName = "";
var highestScore = "";

//api links
var easyURL = "https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple";

var mediumURL = "https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple";

var hardURL = "https://opentdb.com/api.php?amount=1&difficulty=hard&type=multiple";


// performing our GET request
$.ajax({
    url: easyURL,
    method: "GET"
  })

  // after the data request
  .done(function(response) {
    // console.log(response);

    //storing the array of results in the variable
    var results = response.results;
    // console.log("easy" + JSON.stringify(results));

    for (var i = 0; i < results.length; i++) {
      // console.log(results[i].question);
      var easy = $("button");
      easy.attr("data-question", results[i].question);

      // console.log(results[i].correct_answer);

    }
  });

$.ajax({
    url: mediumURL,
    method: "GET"
  })

  // after the data request
  .done(function(response) {
    // console.log(response);

    //storing the array of results in the variable
    var results = response.results;
    // console.log("medium" + JSON.stringify(results));

    for (var i = 0; i < results.length; i++) {
      // console.log(results[i].question);
      var medium = $("button");
      medium.attr("data-question", results[i].question);

      // console.log(results[i].correct_answer);

    }
  });

$.ajax({
    url: hardURL,
    method: "GET"
  })

  // after the data request
  .done(function(response) {
    console.log(response);

    //storing the array of results in the variable
    var results = response.results;
    // console.log("hard" + JSON.stringify(results));

    for (var i = 0; i < results.length; i++) {
      // console.log(results[i].question);
      var hard = $("button");
      hard.attr("data-question", results[i].question);

      // console.log(results[i].correct_answer);

    }
  });

var loginObj = {
  name: displayName,
  time: firebase.database.ServerValue.TIMESTAMP

};
firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // ...
    // console.log(token);
    displayName = result.user.displayName;
    $("#player1").html(displayName);
    $("#facebookBtn").hide();
    $("#logOffFacebook").show();


    //order result by value to get highest score
    highestScore = result.scores.high_score;
    $("#highestScore").html(highestScore);

    console.log(displayName);
    console.log(highestScore);
    console.log("connected to Facebook");

  }
  // The signed-in user info.
  var user = result.user;
  console.log(user);
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  console.log("error code: " + errorCode);
  console.log("error message: " + errorMessage);

  // ...
});

firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});

//log on and log off button on click events

$("#facebookBtn").on("click", function() {
  firebase.auth().signInWithRedirect(provider);
  console.log(loginObj);
  console.log("logged in with FB");


  loginData.push(loginObj);
});

$("#logOffFacebook").on("click", function() {
  firebase.auth().signOut().then(function() {

    var scoreObj = {
      name: displayName,
      high_score: playerScore,
      time: firebase.database.ServerValue.TIMESTAMP

    };

    console.log(scoreObj);
    $("#facebookBtn").show();
    $("#logOffFacebook").hide();
    scoreData.push(scoreObj);
    console.log("logged Out of FB");


    //reset score to 0 after being pushed to firebase
    resetGame();

    // $("#player1").html("Player Name");

    // $("#logOffFacebook").hide();


    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });

}); //end log off on click fx

//start github auth
firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    var token = result.credential.accessToken;
    // ...
  }
  // The signed-in user info.
  var user = result.user;
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
}); //end gh sign in

//start gh on cick events
$("#ghIn").on("click", function() {
  firebase.auth().signInWithRedirect(provider2);
  console.log(loginObj);
  console.log("gh in success");
  loginData.push(loginObj);
  console.log(result);
  // displayName = result.user.displayName;
  // $("#player1").html(displayName);
});

$("#ghOut").on("click", function() {
  firebase.auth().signOut().then(function() {

    var scoreObj = {
      name: displayName,
      high_score: playerScore,
      time: firebase.database.ServerValue.TIMESTAMP

    };

    console.log(scoreObj);
    $("#ghIn").show();
    $("#ghOut").hide();
    scoreData.push(scoreObj);
    console.log("gh out success");


    //reset score to 0 after being pushed to firebase
    resetGame();
  });
});
