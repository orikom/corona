import { Table } from './table.js'

const hospitalsVacancyData = [
  {
    hospitalName: 'בלינסון', 
    generalVacancyPercentage: 8,
    internalVacancyPercentage: 10,
    id: 'hospital-0',
  },

  {
    hospitalName: 'מאיר', 
    generalVacancyPercentage: 2,
    internalVacancyPercentage: 11,
    id: 'hospital-1',
  },

  {
    hospitalName: 'שיבא', 
    generalVacancyPercentage: 5,
    internalVacancyPercentage: 7,
    id: 'hospital-2',
  },

  {
    hospitalName: 'רמב"ם', 
    generalVacancyPercentage: 8,
    internalVacancyPercentage: 3,
    id: 'hospital-3',
  },

  {
    hospitalName: 'אסף הרופא', 
    generalVacancyPercentage: 15,
    internalVacancyPercentage: 20,
    id: 'hospital-4',
  },
  
];

class HospitalVacancyTable extends Table{

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

           //if key has precentage on it - need to add precentages bars
          if(key.includes("Percentage")){
            htmlRecordMarkup += `<div class="data-item data-item-with-precentage-bar">
                                    <div class="precentage-container">
                                      <div class="precentage-bar" style="width: ${record[key]}%;"></div>
                                    </div>
                                    
                                    ${record[key]}%
                                  </div>`
          } else{
            htmlRecordMarkup += `<div class="data-item">${record[key]}</div>`
          }
        }
      }

      tableData.innerHTML = htmlRecordMarkup;
      tableDataContainer.appendChild(tableData);
    })
  }

}







const hospitalsVacancyTableWrapperElement = document.querySelector('#hospitals-vacancy-table-wrapper');

new HospitalVacancyTable(
    hospitalsVacancyTableWrapperElement, 
    hospitalsVacancyData, 
    'hospitalName', 
    'hospital', 
    ['בית חולים','% תפוסה כללית', '% תפוסה מחלקה פנימית']
);


