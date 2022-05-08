'use strict';

let scores = [0, 0];
let score0 = document.getElementById('score--0');
let score1 = document.getElementById('score--1');
let current0 = document.getElementById('current--0');
let current1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let activePlayer = 0;
let playing = true;

diceEl.classList.add('hidden');
let currentScore;

//default condition
const defaultCondition = function () {
  scores = [0, 0];
  currentScore = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  playing = true;
  diceEl.src = 'dice-1.png';

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

defaultCondition();

//Switch users when a player encounters dice 1 or clicks hold button.
const switchUser = function () {
  activePlayer = activePlayer === 0 ? 1 : 0; //Switch the active player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//Dice hold button
document.querySelector('.btn--hold').addEventListener('click', function () {
  diceEl.src = 'dice-1.png';

  //Hold button works only when the game is still playing.
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;
  }
  //If the score is higher than 20, that player wins.
  if (Number(score0.textContent) >= 20) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    console.log('win!');
    playing = false; //To stop playing
  } else switchUser();
});

//Dice rolling
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playing) {
    diceEl.classList.remove('hidden');
    let diceNumber = Math.trunc(Math.random() * 6 + 1); //Generate the random number 1~6
    diceEl.src = `dice-${diceNumber}.png`; //Display the proper dice picture

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else if (diceNumber == 1) {
      //If the user gets dice 1, change the user and lose all the current score!!!!!!!!
      switchUser();
    }
  }
});
//To start the new game.
document.querySelector('.btn--new').addEventListener('click', defaultCondition);
