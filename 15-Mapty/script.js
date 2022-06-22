'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
    date = new Date();
    id = Date.now() + ''.slice(-10);

    constructor(coords, distance, duration){
        this.coords = coords;
        this.distance = distance; // in kms
        this.duration = duration; // in minutes
    }
}

class Running extends Workout {
    type = 'running';
    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence; 
        this.calcPace();
    }

    calcPace () {
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling';
    constructor(coords, distance, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain; 
        this.calcSpeed();
    }

    calcSpeed() {
        this.speed = this.distance / (this.duration / 60); // km/h
        return this.speed;
    }
}

class App {
  #map;
  #mapEvent;
  #workouts = [];

  constructor() {
    this._getPosition();
    inputType.addEventListener('change', this._toggleElevationField);
    form.addEventListener('submit', this._newWorkOut.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation) {
      // JavaScript will call this loadMap function after it gets current position of the user from navigator
      // at that time this._loadMap is just a regular function call which 'this' === undefined
      // as for all other normal 'function' call. so we need to bind 'this' to the currentObject on the function
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get current position');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, 13);
    this.#map.on('click', this._showForm.bind(this));

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(this.#map);
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('div.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('div.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkOut(e) {
    e.preventDefault();
    const validInput = (...inputs) => inputs.every((singleInput) => Number.isFinite(singleInput));
    const allPositive = (...inputs) => inputs.every((singleInput) => singleInput > 0);
    
    let workoutObj; 
    const { lat, lng } = this.#mapEvent.latlng;
    const type = inputType.value; 
    const distance = +inputDistance.value; 
    const duration = +inputDuration.value;
    
    if (type === 'running'){
        const cadence = +inputCadence.value;
        // gurad clause
        if(!validInput(distance, duration, cadence) || !allPositive(distance, duration, cadence))
            return alert('Inputs have to be positve numbers!');
        workoutObj = new Running([lat, lng], distance, duration, cadence);
        
    }

    if(type === 'cycling'){
        const elevation = +inputElevation.value; 
        if(!validInput(distance, duration, elevation) || !allPositive(distance, duration))
            return alert('Inputs have to be positve numbers!');
        workoutObj = new Cycling([lat, lng], distance, duration, elevation);
    }

    this.#workouts.push(workoutObj);
    this.renderWorkoutMarker(workoutObj);
    inputCadence.value = inputDistance.value = inputDuration.value = inputElevation.value = '';
  }

  renderWorkoutMarker(workout) {
    var marker = L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(`${workout.type}`)
      .openPopup();
  }
}

const app = new App();
