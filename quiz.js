var question = document.getElementById("question");
var answers = Array.from(document.getElementsByClassName("answer-text"));
var countdown = document.querySelector(".time");
var score = document.getElementById("score");

var questionList = [];

var quizSet = [
    {
        question: "To which Hogwarts House does Luna Lovegood belong?",
        answer1: "Gryffindor",
        answer2: "Hufflepuff",
        answer3: "Ravenclaw",
        answer4: "Slytherin",
        correct: 3,
    },
  
    {
        question: "What shape is the scar on Harry Potter's forehead?",
        answer1: "Lightning bolt",
        answer2: "Squiggly line",
        answer3: "Star",
        answer4: "Cauldron",
        correct: 1,
    },
  
    {
        question: "What is Harry Potter's owl named?",
        answer1: "Hedgehog",
        answer2: "Hedwig",
        answer3: "Dobby",
        answer4: "Sirius",
        correct: 2,
    },

    {
        question: "Which creature runs the Hogwarts kitchen?",
        answer1: "Centaurs",
        answer2: "Hippogriffs",
        answer3: "Goblins",
        answer4: "House Elves",
        correct: 4,
    },

    {
        question: "Which color represents Hufflepuff?",
        answer1: "Yellow",
        answer2: "Green",
        answer3: "Red",
        answer4: "Blue",
        correct: 1,
    },

    {
        question: "What do the wands of Harry Potter and Voldemort have in common?",
        answer1: "The inscriptions are the same",
        answer2: "The wood is from the same tree",
        answer3: "The core is from the same creature",
        answer4: "They were sold on the same day",
        correct: 3,
    },

    {
        question: "What family owned Dobby before he was freed?",
        answer1: "The Malfoys",
        answer2: "The Blacks",
        answer3: "The Grangers",
        answer4: "The Weasleys",
        correct: 1,
    },

    {
        question: "Why did Dumbledore's hand go black and shrivel?",
        answer1: "He broke it playing rugby",
        answer2: "It is the first sign of death in the wizarding world",
        answer3: "He was cut by a poisonous plant",
        answer4: "He put on a ring which was also a horcrux",
        correct: 4,
    },

    {
        question: "Which of the following is a legitimate wizarding school?",
        answer1: "Drumstick",
        answer2: "Durmstrang",
        answer3: "Doorbell",
        answer4: "Karkaroff",
        correct: 2,
    },

    {
        question: "Who played in the Quidditch World Cup in the Goblet of Fire?",
        answer1: "Scotland and Canada",
        answer2: "Ireland and France",
        answer3: "Ireland and Bulgaria",
        answer4: "Scotland and Bulgaria",
        correct: 3,
    }

];

var currentQuestion = {};
var questionCounter = 0;

var correctPoints = 20;
var maxQuestions = 5
var totalScore = 0;
var secondsLeft = 101;

// resets the question counter and score to 0; pulls the list of questions into a new array, calls the getNextQuestion function
function startQuiz() {
    questionCounter = 0;
    totalScore = 0;
    questionList = [...quizSet];
    
    var timerInterval = setInterval(function() {
    secondsLeft--;
    countdown.textContent = "Time Remaining: " + secondsLeft;
    
    if(secondsLeft === 0) {
        clearInterval(timerInterval);
        return window.location.assign("highscores.html");
    }
    
    }, 1000);
    
    getNextQuestion();
};

// looks for a random number up to the number of available questions
function getNextQuestion() {
    if( questionList.length === 0) {
        localStorage.setItem("lastScore", totalScore);
        return window.location.assign("highscores.html");
    }
    
    questionCounter++;
    var questionIndex = Math.floor(Math.random() * questionList.length);
    currentQuestion = questionList[questionIndex];
    question.innerText = currentQuestion.question;

    // takes the answers list from the current question defined above, and using the data number assigned through HTML, assigns the answer defined in the current question back into the answers array for display
    answers.forEach(answer => {
        var number = answer.dataset["number"];
        answer.innerText = currentQuestion["answer" + number];
    });

    // removes the current question from the available list of questions defined in questionList
    questionList.splice(questionIndex, 1);
};

answers.forEach(answer => {
    answer.addEventListener("click", selectedAnswer => {
        console.log(selectedAnswer.target);
        var selectedAnswer = selectedAnswer.target;
        var answerNumber = selectedAnswer.dataset["number"];

        // sets the grade to incorrect by default unless the correct answer is selected...might not need
        var grade = "incorrect";
            if (answerNumber == currentQuestion.correct) {
                grade = "correct";
            }
        
            if (grade == "correct") {
                incrementScore(correctPoints);
                document.getElementById("correct-message").innerHTML = "That was right!";
                setTimeout(function (){
                    document.getElementById("correct-message").innerHTML = "";
                }, 1500);
            }

            if (grade != "correct") {
                secondsLeft -= 10;
                document.getElementById("incorrect-message").innerHTML = "Not quite";
                setTimeout(function (){
                    document.getElementById("incorrect-message").innerHTML = "";
                }, 1500);
            }

        getNextQuestion();
    });
});

function incrementScore(points) {
    totalScore += points;
    score.innerText = totalScore;
};

startQuiz();


// https://www.youtube.com/watch?v=zZdQGs62cR8&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx&index=4

// https://www.usefultrivia.com/literary_trivia/harry_potter_trivia_index.html