// 1. total sum of all deposits of all accounts
const totalDepositsSum = accounts
  .map(function (acc, index, arr) {
    return acc.movements
      .filter(function (mov, i, accs) {
        return mov > 0;
      })
      .reduce(function (acc, dep, i, deposits) {
        return acc + dep;
      }, 0);
  })
  .reduce((acc, depSum, i, allDepSum) => acc + depSum, 0);
console.log(totalDepositsSum);

// 2. number of deposits that are greater than 1000 USD
const numberOfDepositsOver1k = accounts
  .flatMap((acc, i, accs) => acc.movements)
  .filter(mov => mov >= 1000).length;
console.log(numberOfDepositsOver1k);

// same solution with reduce
const numDep1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => (mov >= 1000 ? acc + 1 : acc), 0);
console.log(numDep1000);

// 3. creating objects using reduce method
let sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sum, mov, i, arr) => {
      mov > 0 ? (sum.deposits += mov) : (sum.withdrawals += mov);
      return sum;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(sums.deposits, sums.withdrawals);

//optimize
let { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sum, mov) => {
      sum[mov > 0 ? 'deposits' : 'withdrawals'] += mov;
      return sum;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

// 4. captial case
const convertTitleCase = function (str) {
  const capitalizeFirstWord = str => str.at(0).toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'the', 'and', 'but', 'or', 'on', 'in', 'with'];
  return capitalizeFirstWord(
    str
      .toLowerCase()
      .split(' ')
      .map(word =>
        exceptions.includes(word)
          ? word
          : word.at(0).toUpperCase() + word.slice(1)
      )
      .join(' ')
  );
};
console.log(convertTitleCase('this is a nice string'));
console.log(convertTitleCase('this is a LONG title but not too Long'));
console.log(convertTitleCase('and here is another title with EXAMPLE'));
