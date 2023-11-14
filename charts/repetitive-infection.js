import { utils } from './utils.js'

const data = {
  '5-11': { //example:
    // vaccinated:{
    //   lastMonthRepetitiveInfected:22, 
    //   last3MonthsRepetitiveInfected: 29,
    //   last6MonthsRepetitiveInfected: 66,
    //   lastYearRepetitiveInfected: 166,
    //   untilNowRepetitiveInfected: 166,

    //   precentageLastMonthRepetitiveInfected:22, 
    //   precentageLast3MonthsRepetitiveInfected: 29,
    //   precentageLast6MonthsRepetitiveInfected: 66,
    //   precentageLastYearRepetitiveInfected: 166,
    //   precentageuntilNowRepetitiveInfected: 166,
    // },

    // unVaccinated: {}//same like vaccinated
  },
  '12-15': {},
  '16-19': {},
  '20-29': {},
  '30-39': {},
  '40-49': {},
  '50-59': {},
  '60-69': {},
  '70-79': {},
  '80+': {},
}

for(let ageGroup in data){

  data[ageGroup].vaccinated = {};
  data[ageGroup].unVaccinated = {};
  
  for(let category in data[ageGroup]){ // category : vaccinated, unVaccinated
    //number of infected
    data[ageGroup][category].lastMonthRepetitiveInfected = utils.generateNumber(1,100);
    data[ageGroup][category].last3MonthsRepetitiveInfected = utils.generateNumber(20,700);
    data[ageGroup][category].last6MonthsRepetitiveInfected = utils.generateNumber(20,1000);
    data[ageGroup][category].lastYearRepetitiveInfected = utils.generateNumber(500,8000);
    data[ageGroup][category].untilNowRepetitiveInfected = utils.generateNumber(5000,50000);

    //precentage
    data[ageGroup][category].precentagelastMonthRepetitiveInfected = utils.generateNumber(1,40); 
    data[ageGroup][category].precentagelast3MonthsRepetitiveInfected = utils.generateNumber(1,50);
    data[ageGroup][category].precentagelast6MonthsRepetitiveInfected = utils.generateNumber(1,50);
    data[ageGroup][category].precentagelastYearRepetitiveInfected = utils.generateNumber(1,50);
    data[ageGroup][category].precentageuntilNowRepetitiveInfected = utils.generateNumber(1,50);
    
  }
}

const lightModeOptions = {
  chart: {
    type: 'bar',
    responsive: true,
    backgroundColor: '#fff',
  },
  title: {
    text: ''
  },
  tooltip: {
    shared: true,
    headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
  },
  legend: {
    enabled: false
  },
  xAxis: {
    title: {
      text: 'קבוצת גיל',
      style:{
        color: '#233333',
      }
    }, 
    categories: ['80+', '70-79', '60-69', '50-59', '40-49', '30-39', '20-29','16-19','12-15', '5-11' ],
    
    gridLineWidth: 1,

    labels: {
      style:{
        color: '#233333'
      },
  
    }
  },

  yAxis: {
    title: {
      text: 'מספר החולים בתחלואה חוזרת',
      style:{
        color: '#233333'
      }
    },
    labels: {
      style:{
        color: '#233333'
      }
    }
    //add these properties when changing to precentages:

    // labels: {
    //   format: '{value}%'
    // },
    // tickInterval: 10
    
  },
  plotOptions: {
    bar: {
      stacking: 'grouped'
    }
  },
  series: [{
    name: 'מחוסנים',
    data: [3, 6, 10, 8,2,3,12,23,12,21],
    color: utils.COLORS.darkGreen,
  }, {
    name: 'לא מחוסנים',
    data: [3, 6, 10, 8,2,3,12,23,12,21],
    color: utils.COLORS.lightBlue,
  }],
  credits: {
    enabled: false
  },
}

const darkModeOptions = {
  chart: {
    type: 'bar',
    responsive: true,
    backgroundColor: '#374F60',
  },
  title: {
    text: ''
  },
  tooltip: {
    shared: true,
    headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
  },
  legend: {
    enabled: false
  },
  xAxis: {
    title: {
      text: 'קבוצת גיל',
      style:{
        color: '#fff'
      }
    }, 
    categories: ['80+', '70-79', '60-69', '50-59', '40-49', '30-39', '20-29','16-19','12-15', '5-11' ],
    labels: {
      style:{
        color: '#fff'
      }
    },
    gridLineWidth: 1,
  },

  yAxis: {
    title: {
      text: 'מספר החולים בתחלואה חוזרת',
      style:{
        color: '#fff'
      }
    },
    labels: {
      style:{
        color: '#fff'
      }
    }

    //add these properties when changing to precentages:

    // labels: {
    //   format: '{value}%'
    // },
    // tickInterval: 10
    
  },
  plotOptions: {
    bar: {
      stacking: 'grouped'
    }
  },
  series: [{
    name: 'מחוסנים',
    data: [3, 6, 10, 8,2,3,12,23,12,21],
    color: utils.COLORS.darkGreen,
  }, {
    name: 'לא מחוסנים',
    data: [3, 6, 10, 8,2,3,12,23,12,21],
    color: utils.COLORS.lightBlue,
  }],
  credits: {
    enabled: false
  },
}
const repetitiveInfectedChart = Highcharts.chart('repetitive-infection-chart', lightModeOptions);

const repetitiveInfectedCard = document.querySelector('.repetitive-infected-card-content');

const filtersMenu = repetitiveInfectedCard.querySelector('.filters-container');
const downCaret = repetitiveInfectedCard.querySelector('.down-caret-icon');
const approveBtnFilter = filtersMenu.querySelector('.approve-btn');
const cancelBtnFilter = filtersMenu.querySelector('.cancal-btn');

const absoluteNumberCheckbox = filtersMenu.querySelector('#number-in-age-range');
const precentageCheckbox = filtersMenu.querySelector('#precentage-from-total-age-range');

const timeRangesList = filtersMenu.querySelectorAll('.time-range');






approveBtnFilter.addEventListener('click', () => {
  let timePeriodString = '';
  
  timeRangesList.forEach((timeRange) => {   
    if(timeRange.checked){

      if(timeRange.id.includes("until-now")){
        timePeriodString += "untilNow";
      }
      else if(timeRange.id.includes("year")){
        timePeriodString += "lastYear";
      }
      else if(timeRange.id.includes("six-months")){
        timePeriodString += "last6Months";
      }
      else if(timeRange.id.includes("three-months")){
        timePeriodString += "last3Months";
      }
      else if(timeRange.id.includes("last-month")){
        timePeriodString += "lastMonth";
      }   
    }
  })

  timePeriodString += 'RepetitiveInfected';
  
  if(precentageCheckbox.checked){
    timePeriodString = 'precentage' + timePeriodString;

    //show % on the horizontal axis if its precentage
    repetitiveInfectedChart.update({
      yAxis: {
        labels: {
          formatter: function() {
            return this.value + '%';
          }
        },
        tickInterval: 10
      }
    });
  }
  else{
    repetitiveInfectedChart.update({
      yAxis: {
        labels: {
          formatter: function() {
            return this.value;
          }
        },
        tickInterval: null
      }
    });
  }

  let vaccinatedRelevantData = extractData("vaccinated",timePeriodString);
  let unVaccinatedRelevantData = extractData("unVaccinated",timePeriodString);


  repetitiveInfectedChart.series[0].setData(vaccinatedRelevantData.slice());
  repetitiveInfectedChart.series[1].setData(unVaccinatedRelevantData.slice());
  

  filtersMenu.classList.add('hide');
  downCaret.classList.remove("rotated");
  
})

cancelBtnFilter.addEventListener('click', () => {
  filtersMenu.classList.add('hide');
  downCaret.classList.remove("rotated");
})


function extractData(vaccinatedStr, timePeriodStr){
  let resultArr = [];
  for(let ageGroup in data){
    resultArr.push(data[ageGroup][vaccinatedStr][timePeriodStr]);
  }
  return resultArr;
}

//do this on the charts.js file for every chart
document.querySelector('.dark-mode-icon').addEventListener('click', toggleChartDarkMode);

// Function to toggle between light and dark mode
function toggleChartDarkMode() {
  if (repetitiveInfectedChart.options.chart.backgroundColor === '#374F60') {
    console.log('1')
    repetitiveInfectedChart.update(lightModeOptions);
  } else {
    console.log('2')
    repetitiveInfectedChart.update(darkModeOptions);
  }
}
