//Global Variables
const navbar = document.querySelector('nav');
const navbarList = document.querySelector('.navbar__list');
const sections = document.querySelectorAll('section');
const fragment = document.createDocumentFragment();
const anchorlinks = navbarList.querySelectorAll('a[href^="#"]');


// FUNCTIONS
//Function to create menu items, with each navbart item pointing to the corresponding section id

function addNavbarList() {
  sections.forEach((section, i) => {
    var item = document.createElement('li');
    // item = 11;
    // items = item;
    item.setAttribute('class', 'menu__item');
    item.innerHTML = `<a href=#section${i} class="menu__link">${section.dataset.nav}</a>`;
    fragment.appendChild(item);
  });
}
addNavbarList();
navbarList.appendChild(fragment);

// function to scroll to each section while menu is clicked in the navbar
function scrollTo(e) {
  anchorlinks.forEach(anchor => {
    if (anchor === e.target) {
      e.preventDefault();
      document.querySelector(e.target.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    }
  })
}

// <----addActive---->
// highlights section either when scrolled to or clicked
function Active() {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const Links = document.querySelector(`a[href="#${section.getAttribute('id')}"]`);
    const sectionHalf = section.offsetTop - (section.offsetHeight / 2);
    const sectionBehind = section.offsetTop + (section.offsetHeight / 2);
    if (
      (rect.top >= 0) &&
      (rect.left >= 0) &&
      (Math.floor(rect.right) <= window.innerWidth) &&
      (window.pageYOffset > sectionHalf) && (window.pageYOffset <= sectionBehind)) {
      section.classList.add('active');
      Links.classList.add('current');
    } else if (window.pageYOffset >= sectionBehind || window.pageYOffset < section.offsetTop) {
      section.classList.remove('active');
      Links.classList.remove('current');
    }
  })
}


// EVENT LISTENERS
window.addEventListener('scroll', Active);
navbarList.addEventListener('click', scrollTo);