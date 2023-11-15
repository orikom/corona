// document.querySelector('button').addEventListener('click', () =>{
//   document.querySelector('.modal').classList.toggle('hide');
// })

// const allnavLinks = document.querySelectorAll('.nav-link');
// const navLinks = document.querySelector('.nav-links');
// const allSectios = document.querySelectorAll('section');

// navLinks.addEventListener('click', (event) => {
//   const clickedNavLink = event.target.closest('.nav-link');

//   if(clickedNavLink){
//     allnavLinks.forEach( navLink => {
//       if(clickedNavLink === navLink)
//         allnavLinks[index].classList.add('active');
      
//       else allnavLinks[index].classList.remove('active');
//     })
//   }
// })

// function handleScrollEvent(){
//   allSectios.forEach((section, index) =>{

//     const sectionYStart = section.offsetTop;
//     const sectionHeight = section.clientHeight
    
//     if(window.scrollY >= sectionYStart && window.scrollY < sectionYStart + sectionHeight){
//       allnavLinks[index].classList.add('active');
//     } else {
//       allnavLinks[index].classList.remove('active');
//     }
    
//   })

// }

// window.addEventListener('scroll', handleScrollEvent)
