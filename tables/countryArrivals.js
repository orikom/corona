import { Table } from './table.js'

const countryArrivalsData = [ 
  {
    country: 'ארה"ב', 
    color: 'placeholder',
    totalIncoming: 6512,
    infectedCitizens: 5528,
    infectedTourists: 92,
    infectedPercentage: 'placeholder',
    id:'country-0'
  },
  {
    country: 'צרפת', 
    color: 'placeholder',
    totalIncoming: 1912,
    infectedCitizens: 118,
    infectedTourists: 122,
    infectedPercentage: 'placeholder',
    id:'country-1'
  },

  {
    country: 'גרמניה', 
    color: 'placeholder',
    totalIncoming: 12,
    infectedCitizens: 1,
    infectedTourists: 2,
    infectedPercentage: 'placeholder',
    id:'country-2'
  },
  {
    country: 'בריטניה', 
    color: 'placeholder',
    totalIncoming: 213,
    infectedCitizens: 23,
    infectedTourists: 1,
    infectedPercentage: 'placeholder',
    id:'country-3'
  }
]


function processCountryArrivasData(allData){
  allData.forEach((dataObj) => {
    dataObj.infectedPercentage = Math.trunc((dataObj.infectedCitizens + dataObj.infectedTourists) /  dataObj.totalIncoming * 100);
    if(dataObj.infectedPercentage < 20) dataObj.color = 'color-1-yellow' 
    else if(dataObj.infectedPercentage < 50) dataObj.color = 'color-2-orange'
    else dataObj.color = 'color-3-red' 
  })
}





processCountryArrivasData(countryArrivalsData)

class CountryArrivalsTable extends Table{
  renderData(data) {
    
    const tableDataContainer = this.currTableWrapperElement.querySelector('.table-data-container')
    //remove all old data
    tableDataContainer.innerHTML ='';

    data.forEach((record) => {
      const tableData = document.createElement('div');
      tableData.classList.add('table-data');

      let htmlRecordMarkup = "";
      for(let key in record){
        if(key !== 'id'){
          if(key === 'color'){
            const words = record[key].split('-'); //eg. 'color-2-orange'-> orange
            htmlRecordMarkup += `<div class="data-item color-square ${words[2]}-square"></div>`
          }
          else{
            htmlRecordMarkup += `<div class="data-item">${record[key]}</div>`
          }
        }
      }

      tableData.innerHTML = htmlRecordMarkup;
      tableDataContainer.appendChild(tableData);

    })
  }
}






const countryArrivasTableWrapperElement = document.querySelector('#country-arrivals-table-wrapper');

new CountryArrivalsTable(
    countryArrivasTableWrapperElement, 
    countryArrivalsData, 
    'country', 
    'country', 
    ['מדינה','צבע', 'נכנסים לישראל', 'מאומתים אזרחים', 'מאומתים זרים', '% מאומתים מהנכנסים']
);

