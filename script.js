'use strcit';

// Elements :
const overlay = document.querySelector('.overlay');
const header = document.querySelector('.header');

// Modal Window :
const modalWindow = function () {
  const modalBox = document.querySelector('.modal');
  const modalWindowBtn = document.querySelectorAll('.btn--show-modal');
  const modalCloseBtn = document.querySelector('.btn--close-modal');

  const closeModal = function () {
    modalBox.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  const openModal = function (e) {
    e.preventDefault();
    modalBox.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };

  modalWindowBtn.forEach((btn) => {
    btn.addEventListener('click', openModal);
  });

  overlay.addEventListener('click', () => {
    if (!modalBox.classList.contains('hidden')) closeModal();
  });

  modalCloseBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modalBox.classList.contains('hidden')) {
      closeModal();
    }
  });
};
// Call the modalWindow :
modalWindow();

// Cookies :
const cookiesFunctionallity = function () {
  const cookiesMessage = document.createElement('div');

  document.querySelector('body').style.overflowY = 'hidden';
  cookiesMessage.classList.add('cookie-message');
  cookiesMessage.classList.add('hidden');

  // Adding Html :
  cookiesMessage.innerHTML = `We are use Cookies to improve our functionality and user services.
  <button class='btn btn--cookies'>Accept All</button>`;
  header.append(cookiesMessage);

  // Adding Style :
  cookiesMessage.style.backgroundColor = '#37383d'; // inline styles
  cookiesMessage.style.color = 'white';
  cookiesMessage.style.height =
    parseFloat(getComputedStyle(cookiesMessage).height) + 30 + 'px';

  // Appearing
  setTimeout(() => {
    overlay.classList.remove('hidden');
    cookiesMessage.classList.remove('hidden');
  }, 500);

  // Clicking On Accept  :
  document.querySelector('.btn--cookies').addEventListener('click', () => {
    document.querySelector('body').style.overflowY = 'scroll';
    cookiesMessage.remove();
    overlay.classList.add('hidden');
  });
};
// Call the CookiesFunctionallity :
cookiesFunctionallity();

// Smooth Scrooling By Learn More
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Smooth Scrooling By Navigation Links
const navLinks = document.querySelector('.nav--links');
navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav--link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed Component
const tabs = document.querySelectorAll('.operations--tab');
const tabsContainer = document.querySelector('.operations--tab-container');
const operationsTabs = document.querySelectorAll('.operations--content');

tabsContainer.addEventListener('click', function (e) {
  const clickOn = e.target.closest('.operations--tab');

  // Guard Clause
  if (!clickOn) return;

  // Removing active classes
  tabs.forEach((t) => t.classList.remove('operations--tab--active'));
  operationsTabs.forEach((t) =>
    t.classList.remove('operations--content--active')
  );

  // Active tab
  clickOn.classList.add('operations--tab--active');

  // Active tab content
  const currTabContent = document
    .querySelector(`.operations--content--${clickOn.dataset.tab}`)
    .classList.add('operations--content--active');
});

// Nav Links Opacity Control
const nav = document.querySelector('.nav');

const opactiyHandler = function (e) {
  if (e.target.classList.contains('nav--link')) {
    // select Active Link
    const activeLink = e.target;

    // Select all other links (inactiveLinks):
    const inActiveLinks = nav.querySelectorAll('.nav--link');

    // Apply Opacity
    inActiveLinks.forEach((link) => {
      if (activeLink != link) link.style.opacity = this;
    });
  }
};

navLinks.addEventListener('mouseover', opactiyHandler.bind(0.5));
navLinks.addEventListener('mouseout', opactiyHandler.bind(1));

// Sticky Navigation : The intersection observer API
const navHeight = nav.getBoundingClientRect().height;
const navHeight2 = nav.clientHeight;

const stickyNavbar = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNavbar, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.clientHeight}px`,
});
headerObserver.observe(header);

// Revealing Elements on Scroll
const allSection = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // Guard Clause
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Image Loading
const imgTargets = document.querySelectorAll('img[data-src]');

const lazyLoading = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace--img :
  entry.target.src = entry.target.dataset.src;
  // Loading Effect :
  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy--img');
  });

  observer.unobserve(entry.target);
};

const lazyObserver = new IntersectionObserver(lazyLoading, {
  root: null,
  threshold: 0.15,
});

imgTargets.forEach((img) => lazyObserver.observe(img));

// Imgae Content Loading :
const allFeatures = document.querySelectorAll('.features--feature');

const animateFeatures = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('features--hidden');
  observer.unobserve(entry.target);
};

const featruesObserver = new IntersectionObserver(animateFeatures, {
  root: null,
  threshold: 0.01,
});

allFeatures.forEach((feature) => {
  featruesObserver.observe(feature);
  feature.classList.add('features--hidden');
});

// Slider Component
const slidebarFunctionallity = function () {
  // Elements
  const allslides = document.querySelectorAll('.slide');
  const sliderBtnLeft = document.querySelector('.slider--btn--left');
  const sliderBtnRight = document.querySelector('.slider--btn--right');

  // Variables
  let currSlide = 0;
  const maxSlides = allslides.length - 1;

  // Functions :
  // GoTo Slide :
  const goToSlide = function (s) {
    allslides.forEach(
      (slide, i) => (slide.style.transform = `translateX(${100 * (i - s)}%)`)
    );
  };

  // Next Slide :
  const nextSlideChange = function () {
    currSlide < maxSlides ? currSlide++ : (currSlide = 0);
    goToSlide(currSlide);
    activeDot(currSlide);
  };

  // Previous Slide
  const prevSlideChange = function () {
    currSlide === 0 ? (currSlide = maxSlides) : currSlide--;
    goToSlide(currSlide);
    activeDot(currSlide);
  };

  // Implementing Arrow Keys :
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlideChange();
    if (e.key === 'ArrowRight') nextSlideChange();
  });

  // Calls
  sliderBtnRight.addEventListener('click', nextSlideChange);
  sliderBtnLeft.addEventListener('click', prevSlideChange);

  // Implementing Dots :
  // Elements :
  const dots = document.querySelector('.dots');

  // Functions :

  // Active Dot :
  const activeDot = function (slide) {
    document
      .querySelectorAll('.dots--dot')
      .forEach((dot) => dot.classList.remove('dots--dot--active'));
    document
      .querySelector(`.dots--dot[data-slide="${slide}"]`)
      .classList.add('dots--dot--active');
  };

  // Dynamically Creating Dots
  const createDots = function () {
    allslides.forEach((_, i) => {
      console.log(i);
      dots.insertAdjacentHTML(
        'beforeend',
        `<button class="dots--dot" data-slide="${i}"></button>`
      );
    });
  };

  // OnClick Functionallity
  dots.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots--dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDot(slide);
    }
  });

  // Initial Position of Slider :
  const init = function () {
    goToSlide(0);
    createDots();
    activeDot(0);
  };
  init();
};

// Call the slider :
slidebarFunctionallity();
