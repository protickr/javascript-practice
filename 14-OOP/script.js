'use strict';
const Person = function (firstName, birthYear) {
    this.firstName = firstName; 
    this.birthYear = birthYear;

    // defining function inside a constructor function is not a good practice
    /*
        this.calcAge = function (currYear){
            return currYear - this.birthYear;
        };
    */
};

Person.prototype.calcAge = function (currYear){
    return currYear - this.birthYear;
};

// prototypes
const protick = new Person('Protick', 1994);
// console.log(Person.prototype);
// console.log(protick.calcAge(2022));
// const h1 = document.querySelector('h1');
// console.dir(h1);

/*
function someFunction(){
    console.log('some function');
};
*/
// console.dir(someFunction);
