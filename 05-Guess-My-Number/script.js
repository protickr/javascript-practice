'use strict';
/*
console.log(document.querySelector(".message").textContent);

document.querySelector(".message").textContent = "🎉 Correct Number !";

document.querySelector(".number").textContent = 13;
document.querySelector(".score").textContent = 10;

document.querySelector(".guess").value = 23;
console.log(document.querySelector(".guess").value);
*/
const displayMessage = function (message) {
    document.querySelector('.message').textContent = message;
}

let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  // number is invalid
  if (!guess) {
    displayMessage( '⛔ No number !');

    // win
  } else if (guess === secretNumber) {
    displayMessage( '🎉 Correct number !');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

  } else if (guess !== secretNumber) {
    displayMessage( guess > secretNumber ? '📈 Too high !' : '📉 Too low !' );

    if (score > 1) {
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage( '💥 You lost !');
      document.querySelector('.score').textContent = 0;
    }

  } 
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  document.querySelector('.score').textContent = 20;
  displayMessage( 'Start guessing...');
  
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
});
