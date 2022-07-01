/*
console.log('exporting module');

const sihpmentCost = 10;
const cart = [];

export const addToCart = function (product, quantity) {
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart`);
};
*/

// named export 
// export { addToCart, cart };

// default export: at most 1 per module
// export default function () {
//     console.log('default export');
// };

/* Top level await

  const data = await fetch('https://jsonplaceholder.typicode.com/posts');
  console.log( await data.json() );
*/


/* The module pattern */
// you can access the returned properties using the returned object. 
// it works because of closure
/*
const shipment = (function () {
  const sihpmentCost = 10;
  const cart = [];

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
  };
  return {
      cart, addToCart
  };
})();
*/

/* Commonjs module */
// module system used in node.js, this syntax is not supported by JavaScript in the browser. 

// export
/*
    export.addToCart = function (product, quantity) {
        cart.push({ product, quantity });
        console.log(`${quantity} ${product} added to cart`);
    };
*/
// import
// const { addToCart } =  require('./shoppingCart.js');




// parcel module bundler test
const sihpmentCost = 10;
const cart = [];

export const addToCart = function (product, quantity) {
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart`);
};

export { cart };
