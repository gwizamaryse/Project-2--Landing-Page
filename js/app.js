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
const sections = document.querySelectorAll("section");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// Create navigation elements
function createNavigationList() {
    let navigationList = document.getElementById("navbar__list");
    for (let i = 0; i < sections.length; i++) {
        navigationList.appendChild(createNavigationItem(sections[i]))
    }
}
// Create navigation item
function createNavigationItem(navigationItem) {
    let liNode = document.createElement("LI");
    let divNode = document.createElement("DIV");
    divNode.classList.add("menu__link");
    let textNode = document.createTextNode(navigationItem.dataset.nav);
    divNode.appendChild(textNode);
    liNode.appendChild(divNode);
    return liNode;
}
// Get page navigation height
function getPageHeaderHeight() {
    return document.getElementsByClassName("page__header")[0].getBoundingClientRect().height;
}

function addActive() {
    sections.forEach(section => {
      const bounding = section.getBoundingClientRect();
      const sectionLink = document.querySelector(`a[href="#${section.getAttribute('id')}"]`);
      const sectionHalfShown = section.offsetTop - (section.offsetHeight / 2);
      const sectionBehind = section.offsetTop + (section.offsetHeight / 2);
      if (
        (bounding.top >= 0) &&
        (bounding.left >= 0) &&
        (Math.floor(bounding.right) <= window.innerWidth) &&
        (window.pageYOffset > sectionHalfShown) && (window.pageYOffset <= sectionBehind)) {
        section.classList.add('active');
        sectionLink.classList.add('current');
      } else if (window.pageYOffset >= sectionBehind || window.pageYOffset < section.offsetTop) {
        section.classList.remove('active');
        sectionLink.classList.remove('current');
      }
    })
  }
// Set the active class on navigation item and section

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
createNavigationList();

// Add class 'active' to section when near top of viewport

// // Scroll to anchor ID using scrollTO event
function scrollPage(index) {
    let sections = document.getElementsByTagName("SECTION");
    let sectionBounding = sections[index].getBoundingClientRect();
    let sectionHeightFromTop = sectionBounding.top - getPageHeaderHeight() + 1;
    window.scrollBy(0, sectionHeightFromTop)
}

function scrollToSection(e) {
    navbarList.querySelectorAll('a[href^="#"]').forEach(anchor => {
      e.preventDefault();
      if (anchor === e.target) {
        console.log(anchor);
        document.querySelector(e.target.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
        });
      }
    })
  }

/**
 * End Main Functions
 * Begin Events
 *
 */
// Build menu
function addClickEventListenerToNavigationItems() {
    let navigationItems = document.getElementsByTagName("LI");
    for (let i = 0; i < navigationItems.length; i++) {
        navigationItems[i].addEventListener("click", () => scrollPage(i));
    }
}

// Scroll to section on link click
window.addEventListener('scroll', addActive);


addClickEventListenerToNavigationItems();
