// declare variables
let score = [0, 0];
// let winR = [0, 0];
let player0 = document.querySelector(".player-0");
let player1 = document.querySelector(".player-1");
let score0 = document.getElementById("score-0");
let score1 = document.getElementById("score-1");
let current0 = document.getElementById("current-0");
let current1 = document.getElementById("current-1");
let winRate0 = document.getElementById("win-0");
let winRate1 = document.getElementById("win-1");
let dice = document.querySelector(".dice");
let playing = true;
let activePlayer;
let currentScore;
let diceNumber;

// =============== Timer ============================//
const timer = document.querySelector(".timer");
let timeSecond;
let min;
let sec;
let interval = false;
let running = false;

const countDown = () => {
  if (timeSecond > 0) {
    timeSecond = timeSecond - 0.1;
    min = Math.floor(timeSecond / 60);
    sec = Math.floor(timeSecond % 60);
    console.log(min, sec);
    timer.innerHTML = `⏳${min < 10 ? "0" : ""}${min}:${
      sec < 10 ? "0" : ""
    }${sec}`;
  } else {
    timer.classList.add("time-out");
    timer.innerHTML = "⌛️ Time Over";
    setTimeout(() => {
      clearInterval(interval);
      running = false;
      document.getElementById("score-0").textContent = "⌛️";
      document.getElementById("score-1").textContent = "⌛️";
    }, 1000);
  }
};

const countDown2 = () => {
  if (running) return;
  timeSecond = 100;
  running = true;
  interval = setInterval(countDown, 100);
};

// pick a number

// default-restart game
const start = () => {
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  winRate0.textContent = 0;
  winRate1.textContent = 0;
  score = [0, 0];
  winR = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  dice.src = "/img/dice-1.png";
  document.querySelector(".robot").classList.remove("winner");
  document.querySelector(".human").classList.remove("winner");
  player0.classList.add("player-active");
  player1.classList.remove("player-active");
  player0.classList.remove("player-break");
  player1.classList.add("player-break");
  document.querySelectorAll(".win-possibility-score")[0].style.color = "black";
  document.querySelectorAll(".win-possibility-score")[1].style.color = "black";
  document.querySelector(".timer").classList.remove("time-out");
  timer.innerHTML = "⏳ Go";
};

const reset = () => {
  //   console.log(document.getElementById("display-main").className);
  if (document.getElementById("display-main").className) {
    document
      .querySelector(".user-input")
      .addEventListener("click", function () {
        diceNumber = event.target.value;
        if (diceNumber == "?") {
          diceNumber = Math.trunc(Math.random() * 25 + 1);
        }
        // console.log(diceNumber);
        document.getElementById("display-main").classList.remove("display");
        document.querySelector(".user-input").style.display = "none";
      });
  } else {
    document.getElementById("display-main").classList.add("display");
    document.querySelector(".user-input").style.display = "";
    document
      .querySelector(".user-input")
      .addEventListener("click", function () {
        diceNumber = event.target.value;
        if (diceNumber == "?") {
          diceNumber = Math.trunc(Math.random() * 25 + 1);
        }
        // console.log(diceNumber);
        document.getElementById("display-main").classList.remove("display");
        document.querySelector(".user-input").style.display = "none";
      });
  }
  console.log("diceNumber:", diceNumber);
  start();
};
reset();

//  ===================== switching users ==================//
const switchingPlayer = () => {
  //   score[activePlayer] = 0;
  timer.classList.remove("time-out");
  activePlayer = activePlayer == 0 ? 1 : 0;
  dice.src = "/img/dice-1.png";
  currentScore = 0;
  player0.classList.toggle("player-active");
  player1.classList.toggle("player-active");
  player0.classList.toggle("player-break");
  player1.classList.toggle("player-break");
  winRate0.textContent = ((score[0] / diceNumber) * 100).toFixed(2) + "%";
  winRate1.textContent = ((score[1] / diceNumber) * 100).toFixed(2) + "%";
  almostWin();
};

//===================== rolling the dice========================//
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (playing) {
    let number = Math.trunc(Math.random() * 6 + 1);
    dice.src = `/img/dice-${number}.png`;
    // score[activePlayer] = score[activePlayer] + number;
    //   `score${activePlayer}`.textContent = number; < string 'score0'
    currentScore = currentScore + number;
    document.getElementById(`score-${activePlayer}`).textContent = currentScore;
    if (activePlayer == 0)
      winRate0.textContent =
        (((currentScore + score[0]) / diceNumber) * 100).toFixed(2) + "%";
    else if (activePlayer == 1)
      winRate1.textContent =
        (((currentScore + score[1]) / diceNumber) * 100).toFixed(2) + "%";
    almostWin();
    if (number == 1) {
      // console.log(currentScore);
      document.getElementById(`score-${activePlayer}`).textContent = 0;

      switchingPlayer();
    }
    countDown2();
  }
});

//=============================hold===========================//
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (playing) {
    score[activePlayer] = score[activePlayer] + currentScore;
    document.getElementById(`current-${activePlayer}`).textContent =
      score[activePlayer];
    document.getElementById(`score-${activePlayer}`).textContent = 0;

    // console.log(score[activePlayer], currentScore);
  }
  if (Number(score[0]) >= diceNumber || Number(score[1] >= diceNumber)) {
    let winner;
    console.log("win!");
    winner = activePlayer == 0 ? "human" : "robot";
    document.querySelector(`.${winner}`).classList.add("winner");
    document.getElementById(`score-${activePlayer}`).textContent = "WIN!";
    playing = false;
  } else switchingPlayer();
});

//==========================restart=========================//
document.querySelector(".btn-restart").addEventListener("click", reset);

// ===================change color to red when you're almost winning====//
const almostWin = () => {
  if ((score[0] / diceNumber) * 100 >= 80) {
    console.log("helo");
    document.querySelectorAll(".win-possibility-score")[0].style.color = "red";
  } else if ((score[1] / diceNumber) * 100 >= 80) {
    document.querySelectorAll(".win-possibility-score")[1].style.color = "red";
  }
};
