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
/*
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
*/








// inheritance between classes

// using constructor function 
/*
// ------------------ Person -------------------
const Person = function (firstName, birthYear) {
    this.firstName = firstName; 
    this.birthYear = birthYear;
};

Person.prototype.calcAge = function (){
    return new Date().getFullYear() - this.birthYear;
};

// ------------------ Student -------------------
const Student = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);
    this.course = course;
};

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student; 

// or this ? 
// Student.prototype.__proto__ = Person.prototype; 

Student.prototype.introduce = function () {
  console.log(` I'm ${this.firstName}, studying ${this.course}`);
};

// ------------------ Objects -------------------
const trevor = new Student('Trevor Noah', 1991, 'Computer Science'); 
console.log(trevor.calcAge());
trevor.introduce();
console.dir(trevor);
*/

// using ES6 class - extends and super()
/*
// ------------------ Person -------------------
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

  static hey() {
    console.log(`Static method / helper function`);
  }
}

class Student extends Person {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(` I'm ${this.fullName}, studying ${this.course}`);
  }
}

const protick = new Student('Protick Roy', 1994, 'Computer Science');
console.log(protick.calcAge(2022));
console.log(protick.age);
console.log(protick.fullName);
protick.introduce();
*/

/*
// Using Object.create()
const PersonProto = {
  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const StudentProto = Object.create(PersonProto);

StudentProto.init = function(firstName, birthYear, course){
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
};

StudentProto.introduce = function () {
    console.log(` I'm ${this.firstName}, studying ${this.course}`);
}; 

// initializing
const jay = Object.create(StudentProto);
jay.init('Jay Williams', 1994, 'Computer Science');
jay.calcAge();
jay.introduce();
*/

// another class example 
// 1. Public field
// 2. Private field
// 3. Public method
// 4. Private method 
// 5. - 8. (There are also 'static' version of this four types as well)


class Account {
  // public fields (instance properties not prototype's)
  // 1. Public fields
  locale = navigator.language;

  // private fields (instance properties not prototype's)
  // 2. Private fields 
  #pin;
  #movements = [];

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    this.#movements = [];   
    // Protected property
    // this._pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;
    console.log(`Thanks for opening an account ${owner}`);
  }

  // APIs / accessor functions
  // Public Interface of our objects
  // 3. Public method
  getMovements() {
    return this.#movements;
  }

  deposit(value) {
    this.#movements.push(value);
    return this;
  }

  // abstraction : that withdraw is a negative movement
  withdraw(value) {
    this.deposit(value * -1);
    return this;
  }

  // encapsulatation of protected method: that should not be accessed from outside of the class as per convention
  // _approveLoan(val) {
  //   return true;
  // }

  // 4. Private method 
  // private method on the instance itself not on the object's prototype's
  #approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
    }
    return this;
  }
}

const accProtick = new Account('Protick Roy', 'BDT', 1234);
console.log(accProtick.deposit(100).withdraw(50).requestLoan(1000).getMovements());