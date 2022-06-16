const username = document.getElementById("username");

const saveScoreBtn = document.getElementById("saveScoreBtn");

const finalScore = document.getElementById("finalScore");

const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || []; // gets highscores from local storage or an empty array

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value; //disables save score button if no username is entered
});

saveHighScore = (e) => {
  e.preventDefault(); //prevents the form from taking default action i.e. submitting to new page

  const score = {
    score: mostRecentScore,
    name: username.value,
  }; //

  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score); //Sorts score based decreasing value
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("/");
};
console.log(highScores);
