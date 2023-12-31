import { utils } from './utils.js'


const severeInfectedData = [];
const moderateInfectedData = [];
const mildInfectedData = [];

// init data
for(let day = 0; day < (365 * 2); day++){
  mildInfectedData.push(utils.generateNumber(200,300)) // MIN and MAX arguments.
  moderateInfectedData.push(utils.generateNumber(60,80))
  severeInfectedData.push(utils.generateNumber(10,50))
}

const lightModeOptions = {
  title: {
    text: ''
  },

  chart: {
    type: 'area',
    responsive: true,
    backgroundColor: '#fff',
  },

  xAxis: {
    title: {
        text: 'תאריך',
        style:{
          color: '#233333',
        }
    },
    
    labels: {
      formatter: function() {
        return Highcharts.dateFormat('%e.%m', this.value);
      },
      style:{
        color: '#233333'
      },
  
    }
  },

  yAxis: {
    title: {
      text: 'מספר המאושפזים',
      style:{
        color: '#233333'
      }
    },
    labels: {
      style:{
        color: '#233333'
      }
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
}

const darkModeOptions = {
  chart: {
    type: 'area',
    responsive: true,
    backgroundColor: '#374F60',
  },

  title: {
    text: ''
  },

  xAxis: {
    title: {
        text: 'תאריך',
        style:{
          color: '#fff'
        }
    },

    labels: {
      formatter: function() {
        return Highcharts.dateFormat('%e.%m', this.value);
      },
      style:{
        color: '#fff'
      }
    }
  },

  yAxis: {
    title: {
      text: 'מספר המאושפזים',
      style:{
        color: '#fff'
      }
    },
    labels: {
      style:{
        color: '#fff'
      }
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
    color: utils.COLORS.darkModeGreenGraph,
    
  }, {
    name: 'בינוני',
    data: moderateInfectedData.slice(-30),
    showInLegend: false,
    // color:  utils.COLORS.orangeFaded,
    color:  utils.COLORS.darkModeOrangeGraph,
    
  }, {
    name: 'קשה',
    data: severeInfectedData.slice(-30),
    showInLegend: false,
    color: utils.COLORS.darkModeBlueGraph,
  }],
  credits: {
    enabled: false
  },
}


const hospitalizedChart = Highcharts.chart('hospitalized-chart', lightModeOptions);

const hospitalizedCard = document.querySelector('.hospitalized-card-content');
const filtersMenu = hospitalizedCard.querySelector('.filters-container');
const approveBtnFilter = filtersMenu.querySelector('.approve-btn');
const cancelBtnFilter = filtersMenu.querySelector('.cancal-btn');
const conditionCheckboxesList = filtersMenu.querySelectorAll('.condition-checkbox');
const timeRangesList = filtersMenu.querySelectorAll('.time-range-checkbox');
const downCaret = hospitalizedCard.querySelector('.down-caret-icon');

approveBtnFilter.addEventListener('click', () => {
  let timePeriod;
  
  timeRangesList.forEach((timeRange) => {
    if(timeRange.checked){
      if(timeRange.id.includes("until-now")){
        timePeriod = -365 * 2;
      }
      else if(timeRange.id.includes("year")){
        timePeriod = -365;
      }
      else if(timeRange.id.includes("six-months")){
        timePeriod = -365 / 2;
     }
      else if(timeRange.id.includes("three-months")){
        timePeriod = -365 / 4;
      }
      else if(timeRange.id.includes("last-month")){
        timePeriod = -30;
      }
    } 
  })
  
  let conditionsArr = [mildInfectedData, moderateInfectedData, severeInfectedData]
  conditionCheckboxesList.forEach((checkbox, index) => {

    if(checkbox.checked){
      hospitalizedChart.series[index].setData(conditionsArr[index].slice(timePeriod));
    }

    else hospitalizedChart.series[index].setData([]);
  })

  filtersMenu.classList.add('hide');
  downCaret.classList.remove("rotated");
})

cancelBtnFilter.addEventListener('click', () => {
  filtersMenu.classList.add('hide');
  downCaret.classList.remove("rotated");
})


//do this on the charts.js file for every chart
document.querySelector('.dark-mode-icon').addEventListener('click', toggleChartDarkMode);

// Function to toggle between light and dark mode
function toggleChartDarkMode() {
  if (hospitalizedChart.options.chart.backgroundColor === '#374F60') {
    hospitalizedChart.update(lightModeOptions);
  } else {
    hospitalizedChart.update(darkModeOptions);
  }
}
