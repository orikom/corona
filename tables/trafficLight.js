import { Table } from './table.js'

const trafficLightData = [ 
  {
    city: 'חיפה',
    trafficLightGrade: 7.5,
    newInfectedFor100000: 33.2,
    positivePrecentage: 57,
    positiveChangePrecentage: 2,
    activeInfected: 17,
    id: 'city-0'
  },
  {
    city: 'צור יצחק',
    trafficLightGrade: 3.5,
    newInfectedFor100000: 19.4,
    positivePrecentage: 10,
    positiveChangePrecentage: 60,
    activeInfected: 19,
    id: 'city-1'
  },
  {
    city: 'כפר-סבא',
    trafficLightGrade: 6.5,
    newInfectedFor100000: 22.4,
    positivePrecentage: 81,
    positiveChangePrecentage: 12,
    activeInfected: 18,
    id: 'city-2'
  },
  {
    city: 'תל אביב',
    trafficLightGrade: 9,
    newInfectedFor100000: 1.4,
    positivePrecentage: 65,
    positiveChangePrecentage: 72,
    activeInfected: 44,
    id: 'city-3'
  },
  {
    city: 'ירושלים',
    trafficLightGrade: 4.5,
    newInfectedFor100000: 52.4,
    positivePrecentage: 16.3,
    positiveChangePrecentage: 95,
    activeInfected: 22,
    id: 'city-4'
  }
]

class trafficLightTable extends Table{

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
          if(key === 'trafficLightGrade'){
            let trafficColorStr = '';
            if(record[key] < 4.5){
              trafficColorStr ='green';
            }
            else if(record[key] < 6){
              trafficColorStr ='yellow';
            }
            else if(record[key] < 7.5){
              trafficColorStr ='orange';
            }
            else{
              trafficColorStr ='red';
            }

            htmlRecordMarkup += `<div class="data-item ${trafficColorStr}-traffic-light">${record[key]}</div>`
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






const trafficLightTableWrapperElement = document.querySelector('#traffic-light-table-wrapper');

new trafficLightTable(
    trafficLightTableWrapperElement, 
    trafficLightData, 
    'city', 
    'city', 
    ['ישוב','ציון וצבע יומי', 'חולים חדשים לכל 10,000 נפש *', '% הבדיקות החיוביות', 'שיעור שינוי מאומתים *', 'חולים פעילים']
);

