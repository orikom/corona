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
document.addEventListener('click', (event) =>{

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


