'use strict';
/*
// lower level abstraction 
// so low level function
const oneWord = function (str){
    // return str.split(' ').join('').toLowerCase();
    return str.replace(/ /g, '').toLowerCase();
}

// lower level abstraction 
// so low level function
const upperFirstWord = function (str) {
    let [firstWord, ...others] =  str.split(' ');
    // return [ firstWord.replace(firstWord[0], firstWord[0].toUpperCase()), ...others ].join(' ');
    return [firstWord.toUpperCase(), ...others].join(' ');
}


// "first class function" is just a language feature which means functions are treated as First Class Citizens 
// which means functions are just values and we invoke it by functionValue();

// higher order function
// higher level of abstraction so higher level function 
const transFormer = function (str, transFormFunction){
    console.log(`transformed by: ${transFormFunction.name}`);
    return transFormFunction(str);
}

console.log(transFormer('This is a long string to be converted in a single word', upperFirstWord));
console.log(transFormer('This is a long string to be converted in a single word', oneWord));

// JS Uses Callback all the time
const high5 = function () {
    console.log(`something 👋`);
}

document.body.addEventListener('click', high5);

['Jonas', 'Adam', 'Eve'].forEach(high5);
*/

/*
const greet = function (greeting) {
    return function (name){
        return `${greeting} ${name} !!!`;
    }
}

// this works because of a concept in JS called Closure
const greeter = greet('Hello');
console.log(greeter('Protick'));

console.log(greet('Hey')('Stranger'));
*/

/*
// this is confusing
// the greet function is called a partial function
const greet = greeting => name => `${greeting} ${name} !!!`;

const greeter = greet('Hello');
console.log(greeter('Protick'));

console.log(greet('Hey')('Stranger'));
*/
/*
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode} ${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode} ${flightNum}`, name });
    //same variable and property name does not require to write it like name: name; enhanced object literals
  },
};

// const flight1 = lufthansa.book(239, 'Protick Roy');
// const flight2 = lufthansa.book(635, 'Someone other');
// console.log(lufthansa.bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// taking function out of an object
// const book = lufthansa.book;

//  call method's first param must be the "this" parameter and other parameters are comma seperated.
//  immediately calls the function 
//  book.call(eurowings, 240, 'John Doe'); 

//  call method's first param must be the "this" parameter and other parameters must be included in an array
//  immediately calls the function 
//  book.apply(eurowings, [240, 'John Doe']);

// bind method 
// does not immediately call the function rather bind parameters and returns a partially implemented function/ a new function
// pre initialized parameters as specified in the bind method where first parameter is 'this' reference
const newBook = book.bind(eurowings, 250); // partial application
newBook('Stranger White');
*/
/*
// with event listeners 
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    book(flightNum, name) {
      console.log(
        `${name} booked a seat on ${this.airline} flight ${this.iataCode} ${flightNum}`
      );
      this.bookings.push({ flight: `${this.iataCode} ${flightNum}`, name });
    },
  };

  lufthansa.planes = 300;
  lufthansa.buyPlane = function () {
    console.log(this);
    this.planes++;
    console.log(this.planes);
  };

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// lufthansa.buyPlane actually resolved to a function value not a method 
// so when JS engine calls it on click event the this keyword reference to the element itself not the 
// object
*/

/* Partial application without this 

const addTax = (rate, value) => value + value*rate;
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(200));
*/

/* solution 1
const addTax = rate => value => value + value*rate; 
console.log(addTax(0.23)(200));
*/

/* solution 2 
function addTax(rate) {
    return function (value){
        return value + value * rate;
    }
}

const addVat = addTax(0.23);
console.log(addVat(200));
*/

/*
const runOnce = function (){
    console.log('This function meant to execute only once');
}
runOnce();

// IIFE => immediately invoked function expression
(function () {
    console.log("this will run once");
})();

(()=>console.log('this will run only once'))();
*/

/*
// closures 
const secureBooking = function () {
    let passengerCount = 0;

    return function () {
        passengerCount++;
        console.log(passengerCount);
    }
};

const booker = secureBooking();
booker();
console.dir(booker);
*/

/* Example 1
let f;

const g = function () {
    const a = 23;

    f = function () {
       console.log( a * 2);
    }
};

const h = function () {
   const b = 777;
   f = function () {
    console.log( b * 2);
 }
}

g();
f();

// f is re-assigned to a different function
h();
f();
*/

/* Example 2 
const boardingPassengers = function (n, wait){
    const perGroup = n / 3;

    setTimeout(function () {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups each with ${perGroup} passengers`);
    }, wait * 1000);

    console.log(`Will start boarding in ${wait} seconds`);
}

const perGroup = 1000;
boardingPassengers(180, 3);
*/
// here setTimeout's call back function closes on variable environment 
// of it's parent scope boardingPassengers's variable environment 
// hence got access to parameters such as n, wait, perGroup 
// closure is not neccessarily a function but a function with enclosed VE of its parent scope. 
