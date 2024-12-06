const questions = [
  {
    question: "Ko je autor romana 'Točkovi u travi'?",
    answers: [
      { text: "Ivo Andrić", correct: false },
      { text: "Meša Selimović", correct: true },
      { text: "Danilo Kiš", correct: false },
      { text: "Dobrica Ćosić", correct: false },
      { text: "Miroslav Krleža", correct: false },
    ],
  },
  {
    question: "Koji je glavni grad Australije?",
    answers: [
      { text: "Sydney", correct: false },
      { text: "Melbourne", correct: false },
      { text: "Canberra", correct: true },
      { text: "Perth", correct: false },
      { text: "Brisbane", correct: false },
    ],
  },
  {
    question: "Koja je najduža reka u Evropi?",
    answers: [
      { text: "Dunav", correct: false },
      { text: "Volga", correct: true },
      { text: "Rajna", correct: false },
      { text: "Loara", correct: false },
      { text: "Tiber", correct: false },
    ],
  },
  {
    question: "Koji je hemijski simbol za zlato?",
    answers: [
      { text: "Ag", correct: false },
      { text: "Au", correct: true },
      { text: "Hg", correct: false },
      { text: "Pb", correct: false },
      { text: "Zn", correct: false },
    ],
  },
  {
    question: "Koja je najveća planina u sistemu Sunčevog sistema?",
    answers: [
      { text: "Olimp na Marsu", correct: true },
      { text: "Everest na Zemlji", correct: false },
      { text: "Denali u Severnoj Americi", correct: false },
      { text: "Kilimanjaro u Africi", correct: false },
      { text: "Mauna Kea na Havajima", correct: false },
    ],
  },
  {
    question: "Koji je najpopularniji programski jezik u svetu?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "C++", correct: false },
      { text: "JavaScript", correct: true },
      { text: "Ruby", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const Nextbutton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  Nextbutton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  Nextbutton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
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
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === true) {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  Nextbutton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You score ${score} out of ${questions.length}!`;
  Nextbutton.innerHTML = "Play Again";
  Nextbutton.style.display = "block";
}

function handleNextbutton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

Nextbutton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextbutton();
  } else {
    startQuiz();
  }
});

startQuiz();