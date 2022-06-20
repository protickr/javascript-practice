'use strict';
/*
const Person = function (firstName, birthYear) {
    this.firstName = firstName; 
    this.birthYear = birthYear;

    // defining function inside a constructor function is not a good practice
    /*
        this.calcAge = function (currYear){
            return currYear - this.birthYear;
        };
    */
   /*
};

Person.prototype.calcAge = function (currYear){
    return currYear - this.birthYear;
};

Person.hey = function () {
    console.log(`Static method / helper function`);
    // this === constructor function
};

Person.hey();

// prototypes
const protick = new Person('Protick', 1994);
// console.log(Person.prototype);
// console.log(protick.calcAge(2022));
// const h1 = document.querySelector('h1');
// console.dir(h1);
*/
/*
function someFunction(){
    console.log('some function');
};
*/
// console.dir(someFunction);
/*
class Person {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge(currYear) {
    return currYear - this.birthYear;
  }

  get age() {
    return new Date().getFullYear() - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else console.log('Provide your Full name');
  }
  get fullName() {
    return this._fullName;
  }

  static hey(){
    console.log(`Static method / helper function`);
    // this === Class on which it is called
  }
}

const protick = new Person('Protick Roy', 1994);

console.log(protick.calcAge(2022));
console.log(protick.age);
console.log(protick.fullName);
Person.hey();
*/

// prototypal inheritance using Object.crete(); 
// we can set the prototype manually for an object 

// object literal that will be prototype for Person 
const PersonProto = {
  // calcAge: function () {}, is similar to, but more simpler like,
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  },

  init(firstName, birthYear){
    this.firstName = firstName; 
    this.birthYear = birthYear;
  }
};

// creates a new object and sets it __proto__ property to specified prototype and returns that empty object
const protick = Object.create(PersonProto);

// initializing 
protick.init('Protick', 1994);
console.log(protick.calcAge());
