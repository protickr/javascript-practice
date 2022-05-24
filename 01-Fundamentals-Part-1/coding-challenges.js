/* Coding challenge 1 

let markWeight = 78;
let markHeight = 1.69;
let markBmi = markWeight / markHeight ** 2;

let johnWeight = 92;
let johnHeight = 1.95;
let johnBmi = johnWeight / johnHeight ** 2;

let markHigherBMI = markBmi > johnBmi;
console.log(markHigherBMI);

*/

/* Coding challenge 2 

let markWeight = 78;
let markHeight = 1.69;
let markBmi = markWeight / markHeight ** 2;

let johnWeight = 92;
let johnHeight = 1.95;
let johnBmi = johnWeight / johnHeight ** 2;

let markHigherBMI = markBmi > johnBmi;

if (markBmi > johnBmi) {
    console.log(`Mark's BMI (${markBmi}) is higher thatn John's (${johnBmi}) `);
} else {
    console.log(`John's BMI (${johnBmi}) is higher thatn Mark's (${markBmi}) `);
}
*/

/* Coding challenge 3 

dolphinTotalAvg = (96 + 108 + 89) / 3;
koalaTotalAvg = (88 + 91 + 110) / 3;

if(dolphinTotalAvg >= 100 && koalaTotalAvg >= 100 ){
    if(dolphinTotalAvg === koalaTotalAvg) {
        console.log("draw");
    }else if(dolphinTotalAvg > koalaTotalAvg) {
        console.log("Dolphins won");
    }else {
        console.log("Koalas won");
    }
}else if(dolphinTotalAvg < 100 && koalaTotalAvg < 100){
    console.log(`Dolphins and Koalas both are disqualified as their point is lower than 100! Dolphins: ${dolphinTotalAvg} and Koalas: ${koalaTotalAvg} `);
}else if(dolphinTotalAvg < 100){
    console.log(`Dolphins are disqualified as their score average is, ${dolphinTotalAvg} which is lower than 100` );
}else {
    console.log(`Koalas are disqualified as their score average is, ${koalaTotalAvg} which is lower than 100` );
}
*/

/* Coding challenge 4 

bill = 430;
tipPercent = bill >= 50 && bill <= 300 ? 15 : 20;

tip = bill * (tipPercent / 100);
totalBill = bill + tip;

console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${totalBill}`);
*/

