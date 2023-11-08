import { utils } from './utils.js'


const severeInfectedData = [];
const moderateInfectedData = [];
const mildInfectedData = [];

// init data
for(let day = 0; day < (365 * 2); day++){
  mildInfectedData.push(utils.generateNumber(200,300)) //generates a number between MIN and MAX.
  moderateInfectedData.push(utils.generateNumber(60,80))
  severeInfectedData.push(utils.generateNumber(10,50))
}

const hospitalizedChart = Highcharts.chart('hospitalized-chart', {
  title: {
    text: ''
  },
  chart: {
    type: 'area',
    responsive: true
  },
  yAxis: {
    title: {
      text: 'מספר המאושפזים'
    }
  },
  xAxis: {
    type: 'datetime',
    title: {
      text: 'תאריך'
    },
    dateTimeLabelFormats: {
      day: '%e.%m' // Set the date format for daily intervals
    }
  },
  tooltip: {
    shared: true,
    headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
  },
  plotOptions: {
    area: {
      stacking: 'normal',
      lineWidth: 2,
      marker: {
        // enabled: false,
        symbol: 'circle'
      },
      point: {
        events: {
          mouseOver: function () {
            const chart = this.series.chart;
            const xAxis = chart.xAxis[0];
            
            // Remove existing plot line
            if (xAxis.plotLinesAndBands.length > 0) {
              xAxis.removePlotLine('hover-line');
            }
            
            // Add new plot line at x position of the hovered point
            xAxis.addPlotLine({
              id: 'hover-line',
              value: this.x,
              width: 1,
              color: '#eee',
              zIndex: 5
            });
          },
          mouseOut: function () {
            const chart = this.series.chart;
            const xAxis = chart.xAxis[0];
            
            // Remove plot line on mouse out
            xAxis.removePlotLine('hover-line');
          }
        }
      }
    },
    series: {
      pointStart: Date.UTC(2012, 9, 1), // Set the start date
      pointInterval: 24 * 3600 * 1000 // Set the interval to 1 day (24 hours)
      }
  },
  series: [{
    name: 'קל',
    data: mildInfectedData.slice(-30),
    showInLegend: false,
    color: utils.COLORS.darkGreenFaded,
    
  }, {
    name: 'בינוני',
    data: moderateInfectedData.slice(-30),
    showInLegend: false,
    color:  utils.COLORS.oliveGreenFaded,
    
  }, {
    name: 'קשה',
    data: severeInfectedData.slice(-30),
    showInLegend: false,
    color: utils.COLORS.lightBlueFaded,
  }],
  credits: {
    enabled: false
  },
});



const hospitalizedCard = document.querySelector('.hospitalized-card-content');
const filtersMenu = hospitalizedCard.querySelector('.filters-container');
const approveBtnFilter = filtersMenu.querySelector('.approve-btn');
const cancelBtnFilter = filtersMenu.querySelector('.cancal-btn');
const conditionCheckboxesList = filtersMenu.querySelectorAll('input[type="checkbox"]');
const timeRangesList = filtersMenu.querySelectorAll('input[type="radio"]');
const downCaret = hospitalizedCard.querySelector('.down-caret-icon');

approveBtnFilter.addEventListener('click', () => {
  let timePeriod;
  
  timeRangesList.forEach((timeRange) => {
    if(timeRange.checked){
      if(timeRange.id.includes("until-now")){
        console.log('until-now');
        timePeriod = -365 * 2;
      }
      else if(timeRange.id.includes("year")){
        console.log('year');
        timePeriod = -365;

      }
      else if(timeRange.id.includes("six-months")){
        console.log('six');
        timePeriod = -365 / 2;

      }
      else if(timeRange.id.includes("three-months")){
        console.log('three');
        timePeriod = -365 / 4;

      }
      else if(timeRange.id.includes("last-month")){
        console.log('last');
        timePeriod = -30;

      }
    } 
  })
  
  conditionCheckboxesList.forEach((checkbox, index)=>{
    if(checkbox.checked)
      hospitalizedChart.series[index].setData(mildInfectedData.slice(timePeriod));

    else hospitalizedChart.series[index].setData([]);
  })

  filtersMenu.classList.add('hide');
  downCaret.classList.remove("rotated");
})

cancelBtnFilter.addEventListener('click', () => {
  filtersMenu.classList.add('hide');
  downCaret.classList.remove("rotated");
})
