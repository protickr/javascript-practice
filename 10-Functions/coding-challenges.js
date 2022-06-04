'use strict';
/*Coding challenge 1 

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),

  registerAnswer: function registerNewAnswer() {
    let promptQuestionStr = this.question + '\n';
    for (const answer of this.options) {
      promptQuestionStr += `${answer} \n`;
    }

    let choiceStr = prompt(promptQuestionStr);
    let choice = choiceStr !== '' ? Number(choiceStr) : null;
    choice >= 0 && choice <= 3 ? this.answers[choice]++ : '';

    this.displayResults('string');
  },

  displayResults: function displayResults(type = 'array') {
    console.log(
      type === 'string'
        ? `Poll results are ${this.answers.join(', ')}`
        : this.answers
    );
  },
};

const obj1 = {
  answers: [5, 2, 3]
};

const obj2 = {
  answers: [1, 5, 3, 9, 6, 1]
};

document.querySelector('.poll').addEventListener('click', poll.registerAnswer.bind(poll));
const displayPollRes = poll.displayResults;
displayPollRes.call(obj1, 'string');
displayPollRes.call(obj2, 'array');
*/

/*Coding challenge 2

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
  })();
*/
