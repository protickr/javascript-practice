'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// DISPLAY MOVEMENTS
const displayMovements = function (currAcc, sort=false) {
  containerMovements.innerHTML = '';
  let movs = sort ? currAcc.movements.slice().sort( (a, b) => a - b) : currAcc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type} </div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// CALC and DISPLAY SUMMARY
const calcDisplaySummary = function (currAcc) {
  // IN
  const income = currAcc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  // OUT
  const out = currAcc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);

  // INTEREST
  const interest = currAcc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * currAcc.interestRate) / 100)
    .filter(intrst => intrst >= 1)
    .reduce((acc, intrst) => acc + intrst, 0);

  labelSumIn.textContent = `${income}€`;
  labelSumOut.textContent = `${Math.abs(out)}€`;
  labelSumInterest.textContent = `${interest}€`;
};

// DISPLAY BALANCE
const calcDisplayBalance = function (currAcc){
  const balance = currAcc.movements.reduce((acc, item)=> acc += item, 0);
  currAcc.balance = balance;
  labelBalance.textContent = `${balance}€`;
};

// CREATE USERNAMES from full name
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createUsernames(accounts);

// UPDATE UI
const updateUI = function(acc){
  //calcualtions and display currencies
  displayMovements(acc);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);

  // reset login input elements
  inputLoginUsername.value = inputLoginPin.value = '';
  inputLoginPin.blur();

  // reset transfer input elements 
  inputTransferTo.value = '';
  inputTransferAmount.value = '';
  inputTransferTo.blur();
};

//LOGIN
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 1;
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    updateUI(currentAccount);
  }
});

// TRANSFER AMOUNT
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  let receiverAccUsername = inputTransferTo.value;
  let amountToTrnsfer = Number(inputTransferAmount.value) || 0;
  let receiverAcc;

  receiverAccUsername
    ? (receiverAcc = accounts.find(acc => acc.username === receiverAccUsername))
    : console.log('Plase input receivers username');

  if (
    amountToTrnsfer > 0 &&
    receiverAcc &&
    currentAccount?.balance > amountToTrnsfer &&
    receiverAccUsername !== currentAccount.username
  ) {
    currentAccount.movements.push( -1 * amountToTrnsfer );
    receiverAcc.movements.push(amountToTrnsfer);
    updateUI(currentAccount);
  }
});

// DELETE ACCOUNT
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  let userName = inputCloseUsername.value;
  let userPin = Number(inputClosePin.value);

  if (currentAccount.pin === userPin && currentAccount.username === userName) {
    let userIndex = accounts.findIndex(function (acc) {
      return acc.username === userName;
    });
    accounts.splice(userIndex, 1);
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = '';
  inputClosePin.value = '';
});

// LOAN
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some((mov)=> mov >= amount * 0.1)){
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// SORT MOVEMENTS
let sorted = false;
btnSort.addEventListener('click', function(e){
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

