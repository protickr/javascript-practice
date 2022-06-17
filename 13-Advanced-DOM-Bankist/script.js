'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
let btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// create and add element to the DOM 
// create Cookie message element
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'we use cookies for improved functionality and analytics <button class="btn btn--close-cookie"> Accept all</button>';
header.append(message);

// style the cookie message 
message.style.backgroundColor = '#37383d';
message.style.width = '98.8vw';
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// close cookie button event listener
document.querySelector('.btn--close-cookie').addEventListener('click', function(e){
  e.preventDefault();
  // this.parentNode.remove();
  message.remove();
});

// changing alt text of bankist logo 
let logo = document.querySelector('.nav__logo');
logo.alt = 'Beautiful Minimalist Logo';

// smooth scrolling for
// 'learn more' button's click event handler function
btnScrollTo.addEventListener('click', function (e) {
  e.preventDefault();
    // new way 
    section1.scrollIntoView({behavior: 'smooth'});

  /*
  const section1Coords = section1.getBoundingClientRect();
  window.scrollTo(
    Number.parseFloat(section1Coords.left + window.pageXOffset),
    Number.parseFloat(section1Coords.top + window.pageYOffset)
  );
  */

  // smooth scrolling
  // old way
  /*
  window.scrollTo({
    left: section1Coords.left + window.scrollX,
    top:  section1Coords.top + window.scrollY,
    behavior: 'smooth',
  });
  */
});

// adding event listener 
/*
let h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', function(){
  console.log('You are reading heading');
});
*/
// 2.
// h1.onmouseenter = function () { console.log('added event listener via on event property, onmouseenter')};
/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

const changeColor = function (e) {
  this.style.backgroundColor = randomColor(); 
  e.stopPropagation();
};

  document.querySelector('.nav__link').addEventListener('click', changeColor);
  document.querySelector('.nav__links').addEventListener('click', changeColor);
  document.querySelector('.nav').addEventListener('click', changeColor);
*/


// page navigation 
/* Normal solution 
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(function (item, index, wholeCollection) {
  item.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  });
});
*/
/* Event Delegation Solution */
document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
  
  // matching stratagy 
  if (e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});
