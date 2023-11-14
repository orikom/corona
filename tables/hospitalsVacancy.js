import { Table } from './table.js'

const hospitalsVacancyData = [
  {
    hospitalName: 'בלינסון', 
    generalVacancyPercentage: 71,
    internalVacancyPercentage: 74,
    id: 'hospital-0',
  },

  {
    hospitalName: 'מאיר', 
    generalVacancyPercentage: 70,
    internalVacancyPercentage: 85,
    id: 'hospital-1',
  },

  {
    hospitalName: 'שיבא', 
    generalVacancyPercentage: 52,
    internalVacancyPercentage: 20,
    id: 'hospital-2',
  },

  {
    hospitalName: 'רמב"ם', 
    generalVacancyPercentage: 84,
    internalVacancyPercentage: 32,
    id: 'hospital-3',
  },

  {
    hospitalName: 'אסף הרופא', 
    generalVacancyPercentage: 3,
    internalVacancyPercentage: 11,
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
            const completionBarColor = record[key] < 30 ? '#8eb0c0' :  (record[key] < 75 ? '#69c3f5' : '#de7483')
            htmlRecordMarkup += `<div class="data-item data-item-with-precentage-bar">
                                    <div class="precentage-container">
                                      <div class="precentage-bar" style="width: ${record[key]}%; background-color: ${completionBarColor};"></div>
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


