/* Coding challenge 1 

const calcAverage = (val1, val2, val3) => (val1 + val2 + val3) / 3;
const doubleIt = (val) => val * 2;

function checkWinner(avgDolphins, avgKoalas) {

    if(avgDolphins > doubleIt(avgKoalas)){
        console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);

    } else if (avgKoalas > doubleIt(avgDolphins)){
        console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);

    } else {
        console.log(`No one wins Koalas ${avgKoalas}, Dolphins ${avgDolphins}`);
    }
}

let avgDolphins = calcAverage(44, 23, 71);
let avgKoalas = calcAverage(65, 54, 49);

// let avgDolphins = calcAverage(85, 54, 41);
// let avgKoalas = calcAverage(23, 34, 27);

checkWinner(avgDolphins, avgKoalas);

*/

/* Coding challenge 2 
'use strict';

const calcTip = function (bill) {
    let tipPercent = bill >= 50 && bill <= 300 ? 15 : 20;
    return bill * (tipPercent / 100);
}

const bills = new Array(125, 555, 44);
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[bills.length - 1])];
const totalBills = [ bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

console.log(bills);
console.log(tips);
console.log(totalBills);
*/

/* Coding challenge 3 
'use strict';

const john = {
    firstName: "John", 
    lastName: "Smith",
    mass: 92,
    height: 1.95, 
    calBMI: function (){
        this.BMI = (this.mass / this.height ** 2).toFixed(2);
        return this.BMI;
    }
}

const mark = {
    firstName: "Mark", 
    lastName: "Miller",
    mass: 78,
    height: 1.69, 
    calBMI: function (){
        this.BMI = (this.mass / this.height ** 2).toFixed(2);
        return this.BMI;
    }
}

function higherBMI(person1, person2) {
    if(person1.BMI > person2.BMI)
        return `${person1.firstName}'s BMI (${person1.BMI}) is higher than ${person2.firstName}'s (${person2.BMI})!`;
    else 
        return `${person2.firstName}'s BMI (${person2.BMI}) is higher than ${person1.firstName}'s (${person1.BMI})!`;
}

john.calBMI();
mark.calBMI();

console.log(higherBMI(john, mark));
*/


/* Coding challenge 4 
'use strict';

const calcTip = function (bill) {
    let tipPercent = bill >= 50 && bill <= 300 ? 15 : 20;
    return bill * (tipPercent / 100);
}

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

let tips = [];
let totals = [];
let sum = 0;

for(let i = 0; i < bills.length; i++){
    let tip = calcTip(bills[i]);
    let total = tip + bills[i];

    tips.push(tip);
    totals.push(total);
    sum = sum + total;
}

const totalAvg = sum / totals.length;

console.log(bills);
console.log(tips);
console.log(totals);
console.log(totalAvg);

*/