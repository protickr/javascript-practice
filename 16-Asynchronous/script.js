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

// simplified to arrow function 


const renderError = function (err){
    console.log(err.message);
    countriesContainer.insertAdjacentText('beforeend', `An error happened: ${err.message}`);
};

const getCountryDetails = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json()/* , failCallback() */)
    .then(data => {
      renderCountry(data?.[0]);
      const neighbour = data?.[0]?.borders?.[0];

      if(!neighbour) return;

      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(function(err){
        console.error(`${err} 💥`);
        renderError(err);

    }).finally(function (){
        countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function (e) {
  getCountryDetails('bangladesh');
});
