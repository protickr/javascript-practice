'use strict';
/*Coding challenge 1 

function checkDogs(dogsJulia, dogsKate) {
  let dogsJuliaCopy = dogsJulia.slice().slice(1, -2);

  const printResult = cleanData => {
    cleanData.forEach(function (dogsAge, i, arr) {
      console.log(
        `Dog number ${i + 1} is ${
          dogsAge >= 3
            ? `an adult 🐕, and is ${dogsAge} years old`
            : `still a puppy 🐶`
        } `
      );
    });
  };

  printResult(dogsJuliaCopy);
  console.log('-'.repeat(30));
  printResult(dogsKate);
}

const dataJulia = [3, 5, 2, 12, 7];
const dataKate = [4, 1, 15, 8, 3];
checkDogs(dataJulia, dataKate);
*/

/*Coding challenge 2 

const calcAverageHumanAge = function (ages) {
  const humanAge = ages
    .map(function (dogAge) {
      return dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4;
    })
    .filter(function (hAge) {
      return hAge >= 18;
    }).reduce(function(acc, age){
      return acc + age;
    }, 0);
};
*/

/*
const calcAverageHumanAge = function (ages) {
  const humanAge = ages
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(hAge => hAge >= 18);
  console.log(humanAge.reduce((acc, age) => acc + age, 0) / humanAge.length);
};
*/

/*Coding challenge 3
const calcAverageHumanAge = function (ages) {
  const humanAgeAvg = ages
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(hAge => hAge >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
    console.log(humanAgeAvg);
    // (2 + 3) / 2 => 2.5 === 2/2 + 3/2 => 2.5
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
*/

