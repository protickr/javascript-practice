'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
let btnScrollTo = document.querySelector('.btn--scroll-to');

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


// tabbed component 
tabsContainer.addEventListener('click', function(e){
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');

  // gurad clause
  if(!clicked) return;

  // remove active classes 
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // active tab
  clicked.classList.add('operations__tab--active');

  // activate content 
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const handleHover = function (e) {

  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      el !== link ? (el.style.opacity = this) : null;
    });
  }
  logo.style.opacity = this;  
}

// menu fade animation 
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


// sticky navigation
/*
window.addEventListener('scroll', function(e){
  const initialCoord = section1.getBoundingClientRect().top;
  if(window.scrollY > initialCoord)
    nav.classList.add('sticky');
  else
    nav.classList.remove('sticky');
});
*/

/* Better way */
/*
const obsCallBack = function (entries, observer) {
  entries.forEach(function (entry){
    console.log(entry);
  });
};

const obsOptions = {
  root: null,     
  threshold: 0.1
};                

const observer = new IntersectionObserver(obsCallBack, obsOptions);
observer.observe(section1);
*/
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries, obsObj) {
  const [entry] = entries;
  if( ! entry.isIntersecting )
    nav.classList.add('sticky');
  else 
    nav.classList.remove('sticky');
};

// header is being observed
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,       // when 0 percent of the header is visible here, then we want something to happen 
  rootMargin: `-${navHeight}px` // root is shortened by 90px; from all the sides 
});
headerObserver.observe(header);

// Reveal elements on scroll 

// observer callback 
const reavealOnScroll = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(reavealOnScroll, {
  root: null,
  threshold: 0.15,
});

const allSections = document.querySelectorAll('.section');
allSections.forEach(function (sec, i) {
  sectionObserver.observe(sec);
  sec.classList.add('section--hidden');
});

// lazy load images 
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  const src = entry.target.getAttribute('data-src');
  entry.target.setAttribute('src', src);
  entry.target.addEventListener('load',function (e){
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null, 
  threshold: 0,
  rootMargin: '200px'
});

const imgTargets = document.querySelectorAll('img[data-src]');
imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});


// Making a slider with transform: translate CSS property and JavaScript
const slider = function () {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  let maxSlide = slides.length;
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  const goToSlide = function (slideNumber) {
    slides.forEach(function (item, index, wholeCollection) {
      item.style.transform = `translateX(${(index - slideNumber) * 100}%)`;
    });
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const prevSlide = function () {
    if (!currentSlide) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  };

  const createDots = function () {
    slides.forEach((_, index) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide='${index}'> </button>`
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(function (item, i) {
      item.classList.remove('dots__dot--active');
    });
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      ?.classList.add('dots__dot--active');
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };

  init();

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

// it is a common practice to put everything of a component in a function and then call it 
// you can also pass an object to it as an argument list to initialize the component 
slider();
