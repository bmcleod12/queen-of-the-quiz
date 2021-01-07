var finalScore = document.querySelector("#final-score");
var initialsInput = document.querySelector("#initials-text");
var initialsForm = document.querySelector("#initials-form");
var initialsList = document.querySelector("#initials-list");
var clearScores = document.querySelector("#clear-scores"); 

// parses out the existing highscores or creates an empty array in anticipation of them
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

var latestScore = localStorage.getItem("lastScore");
finalScore.innerText = latestScore;

// hides the button to clear scores when the page loads
document.getElementById("clear-scores").hidden = true;

// checks to see if there is an existing score and hides both the instructions to hide the score and the initials input field
if (latestScore == null) {
  document.getElementById("log-score").hidden = true;
  document.getElementById("initials-form").hidden = true;
}

// maps highscores (array list with key value pairs that combines both initals and score) to individual line items to display on screen
function renderHighScores() {
  initialsList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.initials}-${score.score}</li>`;
  }).join("");
};


// adds high scores to an array of stored scores
function recordHighScore() {
    
  // Get stored highScores from localStorage and parse the JSON string to the highscores array
  var storedhighScores = JSON.parse(localStorage.getItem("highScores"));

  // If highScores were retrieved from localStorage, update the highScores array to it
  if (storedhighScores !== null) {
      highScores = storedhighScores;
  }
}

function storehighScores() {
  // Stringify and set "highScores" key in localStorage to highScores array
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

  
// When the initials are submitted...
initialsForm.addEventListener("submit", function(event) {
  event.preventDefault();
  
  // Return from function early if submitted initialsText is blank
  if (initialsText === "") {
    return;
  }

  // then declare an initialsText variable to hold the initials and score in an object
  var initialsText = {
    score: latestScore,
    initials: initialsInput.value.trim()
  } 
  
  // Add new initials to the highScores array
  highScores.push(initialsText);
  highScores.sort( (a,b) => {
    return b.score - a.score;
  });

  // adds the new array value to local storage
  localStorage.setItem("highScores", JSON.stringify(highScores));

  // sets initials input to blank and hides the other informational elements
  initialsInput.value = "";
  document.getElementById("initials-text").hidden = true;
  document.getElementById("log-score").hidden = true;
  document.getElementById("clear-scores").hidden = false;

  // reprints the highscores list
  renderHighScores();

  // Store updated highScores in localStorage
  storehighScores();
});

// clears local storage if the Clear High Scores button is clicked and hides the input form
clearScores.addEventListener("click", function clearHighScores() {
  window.localStorage.clear();
  document.getElementById("initials-list").hidden = true;
});

// displays any existing high scores to the user upon page load
renderHighScores();