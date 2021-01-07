var finalScore = document.querySelector("#final-score");
var initialsInput = document.querySelector("#initials-text");
var initialsForm = document.querySelector("#initials-form");
var initialsList = document.querySelector("#initials-list");
var clearScores = document.querySelector("#clear-scores"); 

var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

var latestScore = localStorage.getItem("lastScore");
finalScore.innerText = latestScore;

document.getElementById("clear-scores").hidden = true;

if (latestScore == null) {
  document.getElementById("log-score").hidden = true;
  document.getElementById("initials-form").hidden = true;
}


function renderHighScores() {
  initialsList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.initials}-${score.score}</li>`;
  }).join("");
};



function recordHighScore() {
    
  // Get stored highScores from localStorage
  // Parsing the JSON string to an object
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
  
  
  // When form is submitted...
  initialsForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Return from function early if submitted initialsText is blank
    if (initialsText === "") {
      return;
    }

    // then declare an initialsText variable to hold the initials and score
    var initialsText = {
      score: latestScore,
      initials: initialsInput.value.trim()
    } 
    
    // Add new initials to highScores array, clear the input
    highScores.push(initialsText);
    highScores.sort( (a,b) => {
      return b.score - a.score;
    });

    localStorage.setItem("highScores", JSON.stringify(highScores));

    initialsInput.value = "";
    document.getElementById("initials-text").hidden = true;
    document.getElementById("log-score").hidden = true;
    document.getElementById("clear-scores").hidden = false;

    renderHighScores();

    // Store updated highScores in localStorage
    storehighScores();
  });


  clearScores.addEventListener("click", function clearHighScores() {
    console.log("clicked");
    window.localStorage.clear();
    document.getElementById("initials-list").hidden = true;
  });
  
  renderHighScores();