const question = document.getElementById("question"); //DOM querying
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score"); //dynamically update HUD counter and score
const progressBarFull = document.getElementById("progressBarFull"); //grabs reference to progressbarfull to update

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];
fetch("questions.json")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    questions = loadedQuestions;
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

//constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestions();
};

getNewQuestions = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //if out of questions go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = ` ${questionCounter}/${MAX_QUESTIONS}`;

  //UPDATE THE PROGRESS BAR

  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`; //converts to percentage

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];

  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1); //takes out question we just used
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; //  to detect if the answer is correct and apply the said class

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply); //Apply class

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestions();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
