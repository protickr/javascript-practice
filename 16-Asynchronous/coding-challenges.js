'use strict';
/* Coding challenge 1

const getJSON = function(url, errorMsg = ''){
  return fetch(url).then(response => {
    if (!response.ok)
      throw new Error(
        `${errorMsg}: ${response.status}: ${response.statusText}`
      );
      return response.json();
  });
};

const renderError = function (err){
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

const whereAmI = function () {
  const auth = '374814015862821267415x118332';
  const latlng = prompt('Enter lattitude and longitude seperated by comma');
  const [lat, lng] = latlng.split(',').map((item)=> Number.parseFloat(item.trim()));
  // const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
  const url = `https://geocode.xyz/${lat},${lng}?geoit=json&auth=${auth}`;

  getJSON(url, 'Can not find information on provided lattitude longitude')
  .then((data) => {
    const country = data?.country; 
    const city = data?.city; 
    console.log(`You are in ${city}, ${country}`);
    getCountryDetails(country);
  })
  .catch((err)=>{
    renderError(err);
  }).finally(function(){

  });
};
 */

// const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
// exercise on complete promise chain for getting current country information of the user
/*
const renderError = function (err) {
  console.log(err.message);
  countriesContainer.insertAdjacentText('beforeend', `${err.message}`);
};

const getLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = function () {
  const auth = '374814015862821267415x118332';

  getLocation()
    .then(position => {
      const { latitude: lat, longitude: lng } = position.coords;
      const url = `https://geocode.xyz/${lat},${lng}?geoit=json&auth=${auth}`;
      return fetch(url);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    })
    .then(data => {
      const country = data?.country;
      const city = data?.city;
      console.log(data);
      console.log(`You are in ${city}, ${country}`);
      return fetch(`https://restcountries.com/v2/name/${country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`${response.status}: ${response.statusText}`);
      return response.json();
    })
    .then(countryData => renderCountry(countryData[0]))
    .catch(err => {
      renderError(err);
    })
    .finally(function () {
      countriesContainer.style.opacity = 1;
    });
};


btn.addEventListener('click', whereAmI);
*/

/* Coding challenge 1 */
btn.style.display = 'none';
const imgContainer = document.querySelector('.images');
let currentImg;

// wait promise 
const wait = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

// part 1
const createImage = function (imgPath) {
  const image = document.createElement('img');
  return new Promise(function (resolve, reject) {
    image.src = `img/${imgPath}`;
    image.addEventListener('load', function (e) {
      imgContainer.append(image);
      image.classList.add('images');
      resolve(image);
    });

    image.addEventListener('error', function (e) {
      reject(new Error('Image could not be loaded !!!'));
    });
  });
};

// part 2
// logical but do not work
/*
createImage('img-1.jpg')
  .then(imgEl => {
    wait(2).then(() => {
      imgEl.style.display = 'none';
    });
    return createImage('img-2.jpg');
  })
  .then(imgEl => {
    wait(2).then(() => {
      imgEl.style.display = 'none';
    });
  })
  .catch(err => console.log(err));
*/

// this works
createImage('img-1.jpg')
  .then(imageEl => {
    currentImg = imageEl;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img-2.jpg');
  })
  .then(imageEl => {
    currentImg = imageEl;
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));