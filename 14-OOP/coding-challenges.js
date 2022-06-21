'use strict';
/* Coding challenge 1 

const Car = function (make, speed) {
  this.make = make; 
  this.speed = speed; // km/h
};

Car.prototype.displayCurrentSpeed = function () {
  console.log(`Current Speed of ${this.make}: ${this.speed} km/h`);
}

Car.prototype.accelerate = function () {
  this.speed += 10; 
  this.displayCurrentSpeed();
};

Car.prototype.brake = function () {
  this.speed -= 5; 
  this.displayCurrentSpeed();
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

car1.brake(); 
car1.brake();
car2.accelerate();
car2.accelerate();
*/

/* Coding challenge 2 
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  displayCurrentSpeed() {
    console.log(`Current Speed of ${this.make}: ${this.speed} km/h`);
  }

  accelerate() {
    this.speed += 10;
    this.displayCurrentSpeed();
  }

  brake() {
    this.speed -= 5;
    this.displayCurrentSpeed();
  }

  get speedUS() {
    const spdus = this.speed / 1.6;
    console.log(`Current Speed of ${this.make}: ${spdus} Mph`);
    return spdus;
  }

  set speedUS(speedInMph) {
    this.speed = speedInMph * 1.6;
  }
}

const car1 = new CarCl('Ford', 120);
console.log(car1.speedUS);
*/

/* Coding challenge 3 
const Car = function (make, speed) {
  this.make = make; 
  this.speed = speed; // km/h
};

Car.prototype.accelerate = function () {
  this.speed += 10; 
  console.log(`Current Speed of ${this.make}: ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5; 
  console.log(`Current Speed of ${this.make}: ${this.speed} km/h`);
};

const EV = function (make, speed, charge){
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV; 

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo; 
  console.log(`${this.make} charged to ${this.charge}%`);
};

EV.prototype.accelerate = function () {
  this.speed += 20; 
  this.charge -= 1; 
  console.log(`${this.make} going at ${this.speed} km/h with a charge of ${this.charge}%`);
};

const tesla = new EV('Tesla', 120, 23);
tesla.accelerate();
tesla.brake();
tesla.chargeBattery(90);
*/


/* Coding challenge 4 

class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed; // km/h
    }

    accelerate() {
        this.speed += 10;
        console.log(`Current Speed of ${this.make}: ${this.speed} km/h`);
        return this;
    }

    brake() {
        this.speed -= 5;
        console.log(`Current Speed of ${this.make}: ${this.speed} km/h`);
        return this;
    }
}

class EVCl extends CarCl {
    #charge = 0;
    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    }

    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
        console.log(`${this.make} charged to ${this.#charge}%`);
        return this;
    }

    accelerate() {
        this.speed += 20;
        this.#charge -= 1;
        console.log(`${this.make} going at ${this.speed} km/h with a charge of ${this.#charge}%`);
        return this;
    }
}

const rivian = new EVCl('Rivian', 120, 23);
rivian.accelerate().brake().chargeBattery(90);
*/
