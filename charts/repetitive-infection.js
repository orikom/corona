Highcharts.chart('repetitive-infection-chart', {
  chart: {
    type: 'bar'
  },
  title: {
    text: ''
  },
  legend: {
    enabled: false
  },
  xAxis: {
    title: {
      text: 'קבוצת גיל'
    }, 

    categories: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90+'],

    gridLineWidth: 1,
  },

  yAxis: {
    title: {
      text: 'מספר החולים בתחלואה חוזרת'
    }
  },
  plotOptions: {
    bar: {
      stacking: 'grouped'
    }
  },
  series: [{
    name: 'מחוסנים',
    data: [5, 8, 12, 10,23,11,23,5,12,4]
  }, {
    name: 'לא מחוסנים',
    data: [3, 6, 10, 8,2,3,12,23,12,21]
  }]
});