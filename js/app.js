/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const SECTIONS = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

const indexOfMax = (arr) => {
  if (arr.length === 0) {
    return -1;
  }

  let max = arr[0];
  let maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// initializer function
const initApp = () => {
  buildNav();
  mainScrollHandler();
}

// build the nav
const buildNav = () => {
  const ulElement = document.getElementById("navbar__list");
  
  const myDocFrag = document.createDocumentFragment();

  for (let i = 0; i < SECTIONS.length; i++){
    const listItem = document.createElement('li');
    listItem.innerHTML = `<a href="#${SECTIONS[i].id}" class="menu__link ${!i ? "active" : ""}" data-link="${SECTIONS[i].id}">
                            ${SECTIONS[i].dataset.nav}
                          </a>`;
    myDocFrag.appendChild(listItem);
  }
  ulElement.appendChild(myDocFrag);
}

// Main Scroll Handling Function
const mainScrollHandler = () => {
  const navbar = document.getElementsByClassName("page__header")[0];
  let prevScrollpos = window.pageYOffset;
  
  window.onscroll = () => {
    onScrollNavSectionHandler();
    activateScrollToTopBtn();    
    // Hiding navigation bar when user is not scrolling
    let currentScrollpos = window.pageYOffset;
    if(prevScrollpos > currentScrollpos) {
      navbar.style.top = "0";
    } else {
      navbar.style.top = `-${navbar.offsetHeight}px`;
    }

    prevScrollpos = currentScrollpos;
  };
}

// Adding class 'active-section' to section when near top of viewport and adding class 'active' to corresponding navigation link
const onScrollNavSectionHandler = () => {
  const navItems = document.getElementsByClassName("menu__link");
  const sectionsVisiblePartPercentageArr = [];
  
  for (let i = 0; i < navItems.length; i++) {
    const section = document.getElementById(navItems[i].dataset.link);
    const domRect = section.getBoundingClientRect();

    if (domRect.top > 0 && domRect.top < window.innerHeight) {
      const visiblePart = window.innerHeight - domRect.top;
      sectionsVisiblePartPercentageArr[i] = visiblePart / domRect.height;
    } 
    else if (domRect.top < 0 && Math.abs(domRect.top) < domRect.height) {
      const visiblePart = domRect.height - Math.abs(domRect.top);
      sectionsVisiblePartPercentageArr[i] = visiblePart / domRect.height;
    } 
    else sectionsVisiblePartPercentageArr[i] = 0;
  }
  
  for (let i = 0; i < navItems.length; i++) {
    const section = document.getElementById(navItems[i].dataset.link);
    if (i === indexOfMax(sectionsVisiblePartPercentageArr)) {
      navItems[i].classList.add('active');
      section.classList.add('active-section');
    } 
    else {
      navItems[i].classList.remove('active');
      section.classList.remove('active-section');
    }
  }
}

// Function to activate scroll to top button after last section appeared
const activateScrollToTopBtn = () => {
  const navItems = document.getElementsByClassName("menu__link");
  const lastSection = document.getElementById(navItems[navItems.length - 1].dataset.link);
  const lastSectionBottomPos = lastSection.getBoundingClientRect().bottom;
  const scrollToTopBtn = document.getElementById("scroll-to-top");
  
  if (lastSectionBottomPos < window.innerHeight) {
    scrollToTopBtn.style.display = "block";
  } else  scrollToTopBtn.style.display = "none";
}

// Adding event listener to Scroll to top button
const scrollToTopBtn = document.getElementById("scroll-to-top");
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
})
/**
 * End Main Functions
 * Begin Events
 *
 */

// initialize application
initApp()