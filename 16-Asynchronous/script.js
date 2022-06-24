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
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
};

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

        // https://restcountries.com/v2/alpha/col

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
