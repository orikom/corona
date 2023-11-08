const data = {
  '5-11': { 
    vaccinated: 0,
    unvaccinated: 5, 
    expired:1
  },
  '12-15': { 
    vaccinated: 1,
    unvaccinated: 0, 
    expired: 0
  },
  '16-19': { 
    vaccinated: 4,
    unvaccinated: 2, 
    expired: 8
  },
  '20-29': { 
    vaccinated: 5,
    unvaccinated: 10, 
    expired:8
  },
  '30-39': { 
    vaccinated: 9,
    unvaccinated: 8, 
    expired:7
  },
  '40-49': { 
    vaccinated: 11,
    unvaccinated: 12, 
    expired:17
  },
  '50-59': { 
    vaccinated: 38,
    unvaccinated: 44, 
    expired:55
  },
  '60-69': { 
    vaccinated: 10,
    unvaccinated: 50, 
    expired:68
  },
  '70-79': { 
    vaccinated: 28,
    unvaccinated: 19, 
    expired:50
  },
  '80+': { 
    vaccinated: 33,
    unvaccinated: 24, 
    expired:60
  },
}

const a1 = []
const b1 = []
const c1 = []

const a2 = []
const b2 = []
const c2 = []

//init data
for(let category in data){
  a1.push(data[category].vaccinated);
  a2.push(Math.floor(data[category].vaccinated / 2));

  b1.push(data[category].unvaccinated);
  b2.push(Math.floor(data[category].unvaccinated / 3));

  c1.push(data[category].expired);
  c2.push(Math.floor(data[category].expired / 2.5));
}

const myCheckbox = document.querySelector('input[type="checkbox"]');

myCheckbox.addEventListener('click', () => {
  let selectedData = []; 

  if(myCheckbox.checked){
    selectedData = [a1, b1, c1];
  } else{
    selectedData = [a2, b2, c2];
  }

  for(let currSeries = 0; currSeries < 3; currSeries++){
        activeInfectedChart.series[currSeries].setData(selectedData[currSeries]);
  }
  console.log(a1)

})

// approveBtnFilter.addEventListener('click', () => {
  

//   if(activeInfectedCheckbox.checked){
//     selectedData = [unvaccinatedArr, expiredArr, vaccinatedArr]

//   } else { 
//     selectedData = [unvaccinatedArrSevereCondition, expiredArrSevereCondition, vaccinatedArrSevereCondition]
//   }
  
//   console.log(unvaccinatedArr);
//   console.log(expiredArr);
//   console.log(vaccinatedArr);

//   for(let currSeries = 0; currSeries < 3; currSeries++){
//     activeInfectedChart.series[currSeries].setData(selectedData[currSeries]);
//   }

// })

