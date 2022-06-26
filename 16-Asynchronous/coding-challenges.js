'use strict';
/* Coding challenge 1 */

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



btn.addEventListener('click', function(){
  const data = whereAmI();
});