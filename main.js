/**
 * Questions sets of the quiz..
 */
const questions = [
  {
    id: 1,
    question: "Which is the National animal of India?",
    answers: [
      {
        text: "Tiger",
        correct: true,
      },
      {
        text: "Lion",
        correct: false,
      },
      {
        text: "Elephant",
        correct: false,
      },
      {
        text: "Dog",
        correct: false,
      },
    ],
  },
  {
    id: 2,
    question: "Which is the largest animal in the world?",
    answers: [
      {
        text: "Shark",
        correct: false,
      },
      {
        text: "Giraffe",
        correct: false,
      },
      {
        text: "Blue whale",
        correct: true,
      },
      {
        text: "Elephant",
        correct: false,
      },
    ],
  },
  {
    id: 3,
    question: "Which is the Current Capital of India?",
    answers: [
      {
        text: "Kolkata",
        correct: false,
      },
      {
        text: "Mumbai",
        correct: false,
      },
      {
        text: "Bangalore",
        correct: false,
      },
      {
        text: "New Delhi",
        correct: true,
      },
    ],
  },
  {
    id: 4,
    question: "Which city is known as city of joy in India?",
    answers: [
      {
        text: "Bangalore",
        correct: false,
      },
      {
        text: "Kolkata",
        correct: true,
      },
      {
        text: "Mumbai",
        correct: false,
      },
      {
        text: "Chennai",
        correct: false,
      },
    ],
  },
  {
    id: 5,
    question: "Which is the National flower of India?",
    answers: [
      {
        text: "Jasmine",
        correct: false,
      },
      {
        text: "Sunflower",
        correct: false,
      },
      {
        text: "Lotus",
        correct: true,
      },
      {
        text: "Rose",
        correct: false,
      },
    ],
  },
];

/**
 * question heading element
 */
const question = document.getElementById("question");
/**
 * answers buttons elements
 */
const answerButtons = document.getElementById("ans-buttons");
/**
 * next button element
 */
const nextButton = document.getElementById("next-btn");

/**
 * current question index variable
 */
let currentQuestionIndex = 0;
/**
 * score variable
 */
let score = 0;

/**
 * Function for starting quiz game ........
 * Where initial score = 0,
 * Current question index = 0 index,
 * and showing 1st question of the questions sets
 */
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

/**
 * Function for showing question ........
 */
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  question.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

/**
 * Function for reset state...
 */
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  question.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play again!";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
