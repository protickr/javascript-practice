'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data, neighbour='') {
    const html = `
    <article class="country ${neighbour}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 10000000).toFixed(1)}M people</p>
        <p class="country__row"><span>🗣️</span>${data.languages?.[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies?.[0].name}</p>
        </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
};

// old way of ajax call
/*
const getContryAndNeighbour = function (country){
    const apiUrl = `https://restcountries.com/v2/name/${country}`;
    const request = new XMLHttpRequest();
    request.open('GET', apiUrl);
    request.send();

    request.addEventListener('load', function(e){
        const [data] = JSON.parse(request.responseText);
        console.log(data);

        // render contry
        renderCountry(data);

        // render neighbours country
        const neighbour = data.borders?.[0];
        if(!neighbour) return;
        
        const apiUrl2 = `https://restcountries.com/v2/alpha/${neighbour}`;
        const request2 = new XMLHttpRequest();
        request2.open('GET', apiUrl2);
        request2.send();
        // event listener inside event listener === 'callBack Hell'
        request2.addEventListener('load', function(e){
            const data2 = JSON.parse(request2.responseText);
            renderCountry(data2, 'neighbour');
        });
        
    })
}; 

getContryAndNeighbour('bangladesh');
*/

// fetch and promises for ajax call 
/*
const getCountryDetails = function (country){
    const promises = fetch(`https://restcountries.com/v2/name/bangladesh`);

    promises.then(function(response){
        return response.json();

    }).then(function(data){
        renderCountry(data);

    });
};
*/

// simplified to arrow function  and Error Handling
/*
const getJSON = function (url, errorMsg = 'Something went wrong !!!') {
  return fetch(url).then(
    response => {
      if (!response.ok)
        throw new Error(
          `${errorMsg}, ${response.status}: ${response.statusText}`
        );

      return response.json();
    } // , failCallback() 
  );
};

const renderError = function (err) {
  console.log(err.message);
  countriesContainer.insertAdjacentText(
    'beforeend',
    `${err.message}`
  );
};

const getCountryDetails = function (country) {
  getJSON(
    `https://restcountries.com/v2/name/${country}`,
    'Country not found !!!'
  )
    .then(data => {
      renderCountry(data?.[0]);
      const neighbour = data?.[0]?.borders?.[0];
      if (!neighbour) throw new Error('This country has no neighbours !!!');
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found !!!'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(function (err) {
      console.error(`${err} 💥`);
      renderError(err);
    })
    .finally(function () {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function (e) {
  getCountryDetails('bangladesh');
});
*/

/* Microtask queue has higher priority over callback queue. top-level-code > microtask queue > callback queue
console.log('Test start');
setTimeout(() => {
    console.log('0 sec timer');
}, 0);
Promise.resolve('Promise Resolved in 0 second 1').then((res)=>{ console.log(res);});
Promise.resolve('Promise Resolved in 0 second 2').then((res)=>{ 
    for(let i = 0; i < 1000000000; i++) {} 
    console.log(res);
});
console.log('Test end');
*/

/* Creating new promise
const lotteryDraw = new Promise(function(resolve, reject){
    console.log('Lottery draw is happening... 🔮');
    setTimeout(function(){
        if(Math.random() >= 0.5)
            resolve('You won !!! 🎉');
        else 
            reject(new Error('You lost !!! 😒'));
            // reject('You lost !!! 😞');
    }, 2000);
});

lotteryDraw
  .then(res => console.log(res))
  .catch(function (err) {
    console.error(err.message);
  });
*/


/* Promisifying setTimeout timer function */
// timer should never fail so no reject state 

/* 1. 
const wait = function (seconds) {
    return new Promise(function(resolve){
        setTimeout(resolve, seconds * 1000);
    });
};


// 2. short version
const wait = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));

wait(2).then(() => {
  console.log('Wait 2 seconds before execution');
  return wait(1); 
}).then(function(){ console.log('Wait 1 seconds before execution'); });

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 seconds passed');
    return wait(1);
  });
  */

// promisifying geolocation API 
/*
const getLocation = function (){
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(function(pos){
            resolve(pos);
        }, function(err){
            reject(err);
        });
    });
};

getLocation()
  .then(function (location) {
    console.log(location);
  })
  .catch(function (err) {
    console.log(err.message);
  });
*/

// simplifying previous solution
/*
const getLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getLocation().then(position => console.log(position)).catch(err => console.log(err.message));
*/

// async await for promise consumption
const getPosition = () => {
    countriesContainer.style.opacity = 1;
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

const whereAmI = async function () {
  try {
    const auth = '374814015862821267415x118332';
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=${auth}`);
    
    if(!resGeo.ok)
        throw new Error(`Problem with reverse geocoding API ${resGeo.status}: ${resGeo.statusText}`);
    const dataGeo = await resGeo.json();


    const res = await fetch(`https://restcountries.com/v2/name/${dataGeo.country}`);
    if(!res.ok)
        throw new Error(`Problem with countries API ${dataGeo.status}: ${dataGeo.statusText}`);

    const data = await res.json();
    renderCountry(data[0]);
  } catch (err) {
      console.error(`${err} 💥`);
  }
};

whereAmI();
console.log('First');
