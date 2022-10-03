const startButton = document.getElementById('startBtn');
const nextButton = document.getElementById('nextBtn');
const questionContainerEl = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answerButtons');
const timerEl = document.getElementById('timer');
const titleEl = document.getElementById('title');



let shuffledQuestions;
let currentQuestionIndex;
let score = 0;
let timeLeft 



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

// Resets the game state, returns classes/colors to neutral
// Displays the next question 
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
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
// Once shuffledQuestions.length becomes equal to currentQuestionIndex, it removes the 'hide' class from the start button and changes the text inside the start button to 'Restart', which then will restart the quiz
function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'Try again (Score will reset)';
        startButton.classList.remove('hide');
    }
// if the button is pressed that contains a true correct value, then score goes up by one, if the wrong button is pressed then nothing else happens
    if (correct) {
        score++;
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


// Highscore consts
// TODO: Score stuff
// store score locally
// our score value is score


const saveScoreBtn = document.getElementById('saveScoreBtn');
const playerName = document.getElementById('playerName');

saveScoreBtn.addEventListener('click', saveHighScore);


function saveHighScore(event) {
    event.preventDefault();
    console.log("Clicked the Save button");
    console.log(playerName.value);
};








// install reset button for both names and score 

//  Timer function
// Turns the text red once the timer is 10 or less
function countdown() {
    timeLeft = 60;

    var timeInterval = setInterval(function () {
      if (timeLeft > 1) {
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

const questions = [
    {
        question: 'Who always be sittin in da window?',
        answers: [
            {text: 'Olive', correct: true},
            {text: 'Zoe', correct: false},
            {text: 'Tatey', correct: false},
            {text: 'Frank', correct: false}
        ]
    },
    {
        question: 'Who is the best boy?',
        answers: [
            {text: 'Tatey', correct: true},
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
            {text: 'Tatey', correct: false},
            {text: 'Frank', correct: false},
            {text: 'Airbud', correct: false}
        ]
    },
    {
        question: 'Who is afraid of limes?',
        answers: [
            {text: 'Tatey', correct: false},
            {text: 'Frank', correct: false},
            {text: 'Zoe', correct: true},
            {text: 'Olive', correct: false}
        ]
    },
];