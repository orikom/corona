import './charts/charts.js'
import './tables/tables.js'


//handle all filters buttons of the website
const allCollapsibleBtns = document.querySelectorAll('.collapsible-btn');

allCollapsibleBtns.forEach((btn) => {
  btn.addEventListener('click', ()=>{

    btn.nextElementSibling.classList.toggle("hide");
    const downCaret = btn.querySelector('.down-caret-icon');
    if(downCaret) downCaret.classList.toggle("rotated");
  })
})

const allCollapsibleWrappers = document.querySelectorAll('.collapsible-wrapper');
// const all
document.addEventListener('click', (event) => {

  const clickedCollapsableWrapper = getCollapsibeWrapper(event.target);
  allCollapsibleWrappers.forEach((wrapper) => {

    if(clickedCollapsableWrapper !== wrapper){ //if user clicked on collapsible menu

      wrapper.querySelector('.collapsible').classList.add("hide");

      const downCaret = wrapper.querySelector('.down-caret-icon');
      if(downCaret) downCaret.classList.remove("rotated");
      
    }
  })
})

function getCollapsibeWrapper (element){
  while(element){
    if(element.classList && element.classList.contains("collapsible-wrapper")) return element;
    element = element.parentNode;
  }
  return null;
}


//--sidebar logic
const sideMenuOverlay = document.querySelector('.side-menu-overlay');
const hamburgerBtn =  document.querySelector('.hamburger-icon');
const xIcon = document.querySelector('.x-icon');

hamburgerBtn.addEventListener('click', () =>{
  openSideMenu();
})

xIcon.addEventListener('click', () => {
  closeSideMenu();
})

sideMenuOverlay.addEventListener('click', (event) =>{
  if(event.target === sideMenuOverlay)   closeSideMenu();
})

function openSideMenu(){
  sideMenuOverlay.classList.remove('hide');
  document.body.style.overflow = 'hidden';
}

function closeSideMenu(){
  sideMenuOverlay.classList.add('hide');
  document.body.style.overflow = '';
}

// ---------------

// fixed positioned heading + navbar: 

const allnavLinks = document.querySelectorAll('.nav-link');
const navLinks = document.querySelector('.nav-links');
const allSectios = document.querySelectorAll('section');

navLinks.addEventListener('click', (event) => {
  const clickedNavLink = event.target.closest('.nav-link');

  if(clickedNavLink){
    allnavLinks.forEach( (navLink, index) => {
      if(clickedNavLink === navLink){

        allnavLinks[index].classList.add('nav-link-active');

        // document.querySelector(`#section-${index}`).scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })

        // const sectionToScrollTo = document.querySelector(`#section-${index}`);
        // const sectionPosition = sectionToScrollTo.getBoundingClientRect();
        // // const littleBitHigher = sectionPosition.top - 100;

        // window.scrollTo({
        //   top: sectionPosition,
        //   behavior: 'smooth'
        // })

      }
      
      else allnavLinks[index].classList.remove('nav-link-active');
    })
  }
})

function handleScrollEvent(){
  allSectios.forEach((section, index) =>{

    const sectionYStart = section.offsetTop;
    const sectionHeight = section.clientHeight
    
    if(window.scrollY >= sectionYStart - 250 && window.scrollY < sectionYStart + sectionHeight - 250){
      allnavLinks[index].classList.add('nav-link-active');
    } else {
      allnavLinks[index].classList.remove('nav-link-active');
    }
    
  })
}



window.addEventListener('scroll', handleScrollEvent)
//