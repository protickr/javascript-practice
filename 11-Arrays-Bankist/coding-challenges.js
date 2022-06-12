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

/* Coding challenge 4 */

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
  ];

  // eating okay 
  const checkIfEatingOkayAmount = dogObj =>
    dogObj.curFood > dogObj.recommendedFood * 0.9 &&
    dogObj.curFood < dogObj.recommendedFood * 1.1;

// eating too much
const checkIfEatingTooMuch = dogObj => dogObj.curFood > dogObj.recommendedFood * 1.1;

// eating too little 
const checkIfEatingTooLittle = dogObj => dogObj.curFood < dogObj.recommendedFood * 0.9;

// eating exact amount 
const checkIfEatingExact = dogObj => dogObj.curFood === dogObj.recommendedFood;


// 1.  
  dogs.forEach(
    obj => (obj.recommendedFood = Number(Math.trunc(obj.weight ** 0.75 * 28)))
  );

// 2. 
const sarahsDog = dogs.find((dog, i, arr) => dog.owners.includes('Sarah'));
console.log(
  `Sarah's dog eating too much: ${checkIfEatingTooMuch(sarahsDog)}, too little: ${checkIfEatingTooLittle(sarahsDog)}`
);

// 3. 
// 4. 
let ownersEatTooMuch = dogs.flatMap((dog) => checkIfEatingTooMuch(dog) ? dog.owners : [] );
let ownersEatTooLittle = dogs.flatMap((dog) => checkIfEatingTooLittle(dog) ? dog.owners : [] );

console.log(ownersEatTooMuch.join(' and ') + `'s dog eat too much`);
console.log(ownersEatTooLittle.join(' and ') + `'s dog eat too little`);

// 5. 
console.log(`Any dog eating exact: ` ,dogs.some(dog => checkIfEatingExact(dog)));

// 6. 
console.log(`Any dog eating okay: ` , dogs.some(dog => checkIfEatingOkayAmount(dog)));

// 7. 
let dogsEatingOkay = dogs.reduce(
  (accArr, currentDog, i, allDogs) => {
    checkIfEatingOkayAmount(currentDog) ? accArr.push(currentDog) : accArr;
    return accArr;

  }, new Array()
);
console.log(`Dogs Eating Okay`, dogsEatingOkay);

// let dogsEatingOkay2 = dogs.map(dog => checkIfEatingOkayAmount(dog) ? dog : null );
// console.log(dogsEatingOkay2);

// 8. 
let sortDogByRecFood = dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood );
console.log(sortDogByRecFood);
