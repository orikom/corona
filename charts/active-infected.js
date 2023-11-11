import { utils } from './utils.js'

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

const unvaccinatedArr = []
const expiredArr = []
const vaccinatedArr = []

const unvaccinatedArrSevereCondition = []
const expiredArrSevereCondition = []
const vaccinatedArrSevereCondition = []

//init data
for(let category in data){
  vaccinatedArr.push(data[category].vaccinated);
  vaccinatedArrSevereCondition.push(Math.floor(data[category].vaccinated / 2));

  unvaccinatedArr.push(data[category].unvaccinated);
  unvaccinatedArrSevereCondition.push(Math.floor(data[category].unvaccinated / 3));

  expiredArr.push(data[category].expired);
  expiredArrSevereCondition.push(Math.floor(data[category].expired / 2.5));
}

const activeInfectedChart = Highcharts.chart('active-infected-chart', {
  chart: {
    type: 'column'
  },
  title: {
    text: ''
  },
  xAxis: {
    categories: ['5-11', '12-15', '16-19','20-29', '30-39', '40-49','50-59', '60-69', '70-79','80+'],
    title: {
      text: 'קבוצת גיל'
    },
    gridLineWidth: 1,
  },
  yAxis: {
    title: {
      text: 'מספר חולים פעילים'
    }
  },
  series: [{
    name: 'לא מחוסנים',
    data: unvaccinatedArr.slice(),
    showInLegend: false,
    color: utils.COLORS.lightBlue,
  }, {
    name: 'מחוסנים ללא תוקף',
    data: expiredArr.slice(),
    showInLegend: false,
    color: utils.COLORS.oliveGreen,
  }, {
    name: 'מחוסנים',
    data: vaccinatedArr.slice(),
    showInLegend: false,
    color: utils.COLORS.darkGreen,
  }],
  plotOptions: {
    column: {
      grouping: true,
      pointPadding: 0,
      groupPadding: 0.1,

    }
  },
  credits: {
    enabled: false
  },
  tooltip: {
    shared: true,
    headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
  },
});

const activeInfectedCard = document.querySelector('.active-infected-card-content');
const filtersMenu = activeInfectedCard.querySelector('.filters-container');
const approveBtnFilter = filtersMenu.querySelector('.approve-btn');
const cancelBtnFilter = filtersMenu.querySelector('.cancal-btn');

const activeInfectedCheckbox = filtersMenu.querySelector('#active-infected');
const severeInfectedCheckbox = filtersMenu.querySelector('#severe-infected');
const absoluteNumberCheckbox = filtersMenu.querySelector('#absolute-number');
const for100000Checkbox = filtersMenu.querySelector('#for-100000');

const downCaret = activeInfectedCard.querySelector('.down-caret-icon');

approveBtnFilter.addEventListener('click', () => {
  
  let selectedData = []; 
  if(activeInfectedCheckbox.checked){
    
    // selectedData = [unvaccinatedArr.slice(), expiredArr.slice(), vaccinatedArr.slice()] 
    selectedData = [unvaccinatedArr.slice(), expiredArr.slice(), vaccinatedArr.slice()]
   
  } else{ //severeInfected checked
    selectedData = [unvaccinatedArrSevereCondition.slice(), expiredArrSevereCondition.slice(), vaccinatedArrSevereCondition.slice()]
  }
  
  if(for100000Checkbox.checked){ //absoluteNumberCheckbox was not checked
    selectedData.forEach((arr, index) => {
      selectedData[index] = selectedData[index].map((number) => number / 5);
    })
  }
  
  
  for(let currSeries = 0; currSeries < 3; currSeries++){
    activeInfectedChart.series[currSeries].setData(selectedData[currSeries]);
  }
 

  filtersMenu.classList.add('hide');
  downCaret.classList.remove("rotated");
})

cancelBtnFilter.addEventListener('click', () => {
  filtersMenu.classList.add('hide');
  downCaret.classList.remove("rotated");
})

