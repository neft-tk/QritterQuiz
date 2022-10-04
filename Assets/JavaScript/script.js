const startButton = document.getElementById('startBtn');
const nextButton = document.getElementById('nextBtn');
const questionContainerEl = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answerButtons');
const timerEl = document.getElementById('timer');
const titleEl = document.getElementById('title');
const scoreButton = document.getElementById('highscoreBtn');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const playerName = document.getElementById('playerName');
const nameList = document.getElementById('saved-name');
const savedScore = document.getElementById('saved-score');



let shuffledQuestions;
let currentQuestionIndex;
let score = 0;
let timeLeft 

const questions = [
    {
        question: 'Who is always on guard?',
        answers: [
            {text: 'Olive', correct: true},
            {text: 'Frank', correct: false},
            {text: 'Zoe', correct: true},
            {text: 'Tater', correct: false}
        ]
    },
    {
        question: 'Who hates being told no?',
        answers: [
            {text: 'Olive', correct: false},
            {text: 'Zoe', correct: false},
            {text: 'Tater', correct: false},
            {text: 'Frank', correct: true}
        ]
    },
    {
        question: 'Who loves explorin?',
        answers: [
            {text: 'Olive', correct: false},
            {text: 'Zoe', correct: false},
            {text: 'Tater', correct: true},
            {text: 'Frank', correct: false}
        ]
    },
    {
        question: 'Who needs to pee every 5 minutes?',
        answers: [
            {text: 'Tater', correct: true},
            {text: 'Zoe', correct: false},
            {text: 'Olive', correct: false},
            {text: 'Frank', correct: false}
        ]
    },
    {
        question: 'Who always be sittin in da window?',
        answers: [
            {text: 'Olive', correct: true},
            {text: 'Zoe', correct: false},
            {text: 'Tater', correct: false},
            {text: 'Frank', correct: false}
        ]
    },
    {
        question: 'Who is the best boy?',
        answers: [
            {text: 'Tater', correct: true},
            {text: 'Frankie', correct: true},
            {text: 'Zoe', correct: true},
            {text: 'Olive', correct: true}
        ]
    },
    {
        question: 'Who has butthole breath?',
        answers: [
            {text: 'Frank', correct: false},
            {text: 'Zoe', correct: true},
            {text: 'Airbud', correct: false},
            {text: 'Frankenweenie', correct: false}
        ]
    },
    {
        question: 'Who never runs out of energy?',
        answers: [
            {text: 'Zoe', correct: true},
            {text: 'Tater', correct: false},
            {text: 'Frank', correct: false},
            {text: 'Airbud', correct: false}
        ]
    },
    {
        question: 'Who is afraid of limes?',
        answers: [
            {text: 'Tater', correct: false},
            {text: 'Frank', correct: false},
            {text: 'Zoe', correct: true},
            {text: 'Olive', correct: false}
        ]
    },
];


// Starts the game,
// Sets score to zero at the start of each new game
// Makes the start button "invisible"
// Randomizes the question pool to pull questions from
// sets the current index for the question pool to zero/the first question
// calls setNextQuestion
// starts the timer
function startGame() {
    score = 0;
    startButton.classList.add('hide');
    titleEl.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    setNextQuestion();
    countdown();
    console.log(score);
};


// Changes the text where questionEl is grabbing from to the 'question' attribute/element from the question pool
// Creates buttons(s) for each text attribute/element in that question's array that then displays the same text
// Adds a data element onto the button which determines whether the answer is correct
// Appends/creates the buttons onto the site
function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsEl.appendChild(button);
    });
};

// Resets the game state, returns classes/colors to neutral
// Displays the next question 
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

// Returns the body/background color back to neutral
// Hides the next button until it appears after the next question is answered
// Removes any answer button children (the previous function generated the buttons that we're now removing)
function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild
        (answerButtonsEl.firstChild)
    };
};

// Finds what the user clicked on
// Checks to see if the selected button has a correct value attached
// Setting the class to correct (if it's correct)
// Creating an array that runs a loop, takes each button's element/dataset to determine whether it's correct or not
// Once shuffledQuestions.length becomes equal to currentQuestionIndex, it removes the 'hide' class from the start button and changes the text inside the start button to 'Submit your score', startButton will now take the user to the highscore pages so they can submit their name and score
function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        timeLeft = 600;
        startButton.innerText = 'Submit your score!';
        startButton.classList.remove('hide');
        startButton.addEventListener('click', function () {
                location.href = "file:///C:/Users/Erik/code/QuizGame/Pages/highscores.html";
            });
              }
// if the button is pressed that contains a true correct value, then score goes up by one, if the wrong button is pressed then nothing else happens
    if (correct) {
        score++;
        localStorage.setItem("Score", score);
    }  else (
        timeLeft = timeLeft - 10
    )
    console.log(score);  
};

// Calls clearStatusClass
// If statement that adds the 'correct' class if the element has a correct value, and 'wrong' if the element has a false value.
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    };
};

// removes the 'correct' and/or 'wrong' classes that have been added to button elements
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// When the start button is pressed it runs the game
// When next button is pressed it takes currentQuestionIndex, adds 1, and then calls the setNextQuestion function which will pull a new question from the question array.
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})


// When the save button/form is pressed, runs saveHighScore
saveScoreBtn.addEventListener('click', saveHighScore);

// Gets the "PlayerName"
// Changes the name/space on the screen to match the value of "PlayerName"
// Takes the locally stored score and puts it in the score space
// Turns the start button into a reset button of sorts by changing the text, making it visible, and then changing it's function to set our locally stored score to zero, as well as make our name blank and display our locally stored score (which is now zero).
function displayRecord() {
    localStorage.getItem("PlayerName");
    nameList.textContent = playerName.value;
    savedScore.textContent = localStorage.getItem("Score") + "/5";
    startButton.innerHTML = "Clear your score :(";
    startButton.classList.remove('hide', 'startBtn');
    startButton.addEventListener('click', function () {
        localStorage.setItem("Score", 0);
        nameList.textContent = " ";
        savedScore.textContent = score.value;
    })
};


// Prevents the page from reloading
// sets the "PlayerName" object to whatever the player inputs in the form
// runs the displayRecord function
function saveHighScore(event) {
    event.preventDefault();
    localStorage.setItem("PlayerName", playerName.value);
    displayRecord();
};

// Button that takes you to the highscore page once your quiz is over
scoreButton.addEventListener('click', function () {
    location.href = "file:///C:/Users/Erik/code/QuizGame/Pages/highscores.html";

});





// install reset button for both names and score 

// Timer function
// Starts the timer off by making sure it's the --correct color
// Turns the text color to --wrong once the timer is 10 or less
// if the timer hits 1 then it removes the answer buttons and gives you a try again button. Couldn't figure out how to make it do this just at 0.
function countdown() {
    timeLeft = 60;

    var timeInterval = setInterval(function () {
      if (timeLeft > 1) {
        timerEl.setAttribute('style', 'color:var(--correct)');
        timerEl.textContent = timeLeft + ' seconds remaining';
        timeLeft--;
      } else if (timeLeft === 1) {
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else {
        timerEl.textContent = '';
        clearInterval(timeInterval);
      }

      if (timeLeft < 10) {
        timerEl.setAttribute('style', 'color:var(--wrong)');
      }

      if (timeLeft < 1) {
        startButton.classList.remove('hide');
        startButton.innerText = "You ran out of time, try again!";
        questionContainerEl.classList.add('hide');
      }
    }, 1000);
  }

// When the start button is pressed, it starts the game,
// Makes it so the next button will increase the index of our question array,
// and calls the setNextQuestion function
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
})
