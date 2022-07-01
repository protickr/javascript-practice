// import anyName,  {addToCart as toCart} from './shoppingCart.js';

// console.log('imporitng module');
// toCart('bread', 5);
// anyName();

// importing a module without a module bundler
/*
import cloneDepp from '../node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],

  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const lodashClone = cloneDepp(state);
state.user.loggedIn = false; 

console.log(stateClone);
console.log(lodashClone)
*/


// parcel module bundler test
import cloneDepp from 'lodash-es';
import {addToCart as toCart} from './shoppingCart.js';

// shoppingCart module function
toCart('bread', 5);

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],

  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
// lodash module
const lodashClone = cloneDepp(state);
state.user.loggedIn = false; 

console.log(stateClone);
console.log(lodashClone);

// hot module replacement for parcel 
if(module.hot){
    module.hot.accept();
}

console.log('hello');

// transpiling is done by babel which taken care of by pacel automatically 
// polyfilling newest features that can not be transpiled 
// core-js for array.find(), promise 
import 'core-js/stable';
// regenerator runtime for async functions
import 'regenerator-runtime/runtime'; 