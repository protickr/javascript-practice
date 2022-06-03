'use strict';
/* Coding challenge 1
const printGoals = function (...players) {
    for(let i = 0; i < players.length; i++) {
        console.log(players[i]);
    }
    console.log(`Number of goals: ${players.length}`);
}

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};


const [players1, players2] = game.players;
const [gk, ...fieldPlayers] = [...players1];
const allPlayers = [ ...players1, ...players2 ];
const players1Final = [ ...players1, 'Thiago', 'Coutinho', 'Perisic' ];
// const {team1, x:draw, team2} = game.odds;
const {odds: { team1, x: draw, team2 }} = game; 
printGoals(...game.scored);

team1 < team2 && console.log('team1 is more likely to win');
team1 > team2 && console.log('team2 is more likely to win');
*/

/* Coding challenge 2 

const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
      [
        'Neuer',
        'Pavard',
        'Martinez',
        'Alaba',
        'Davies',
        'Kimmich',
        'Goretzka',
        'Coman',
        'Muller',
        'Gnarby',
        'Lewandowski',
      ],
      [
        'Burki',
        'Schulz',
        'Hummels',
        'Akanji',
        'Hakimi',
        'Weigl',
        'Witsel',
        'Hazard',
        'Brandt',
        'Sancho',
        'Gotze',
      ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
      team1: 1.33,
      x: 3.25,
      team2: 6.5,
    },
  };

// 1
for (const [index, playerName] of game.scored.entries()) {
    console.log(`Goal ${index + 1}: ${playerName}`);
}

// 2
let sum = 0;
for (let odd of Object.values(game.odds)) {
    sum += odd;
}
console.log(`Average odd: ${sum / Object.keys(game.odds).length}`);

// 3
for (let [teamName, odd] of Object.entries(game.odds)) {
    console.log(`Odd of ${game[teamName] ? 'victory ' + game[teamName] : 'draw'}: ${odd}`);
}

// 4 
const scorers = {};
for (let player of game.scored) {
    scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);
*/

/* Coding challenge 3 

const gameEvents = new Map([
    [17, '⚽ GOAL'],
    [36, '🔃 Substitution'],
    [47, '⚽ GOAL'],
    [61, '🔃 Substitution'],
    [64, '🟨 Yellow card'],
    [69, '🟥 Red card'],
    [70, '🔃 Substitution'],
    [72, '🔃 Substitution'],
    [76, '⚽ GOAL'],
    [80, '⚽ GOAL'],
    [92, '🟨 Yellow card'],
    ]);

const events = [ ...new Set(gameEvents.values())];
gameEvents.delete(64);
let averageEventTime = 90 / gameEvents.size;
console.log(`An event happened, on average, every ${averageEventTime} minutes`);

for (const [time, gameEv] of gameEvents.entries() ){
  console.log( (time <= 45  ? '[FIRST HALF]' : '[SECOND HALF]') + ` ${time}: ${gameEv} `);
}

*/

/* Coding challenge 3 */

