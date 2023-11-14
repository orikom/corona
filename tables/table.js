export class Table {

  constructor(currTableWrapperElement, allData, parameterForFilter, prefix, hebrewHeaders){

    this.currTableWrapperElement = currTableWrapperElement;

    this.allData = allData;
    this.filteredData = allData.slice(); // the selected data in order it came from the DB 
    this.sortedData = allData.slice();   // the selected data in order user chose
    this.prefix = prefix; // like "hospital"

    this.headersNamesInDB = this.getKeysFromData();
    this.hebrewHeaders = hebrewHeaders;
    

    this.createParameterOnFilterSearchBar(parameterForFilter); // filterByParameters in the filter window
    this.createHeadersElements();
    
    this.renderData(this.allData);
    this.addEventListeners();
    this.updateNumOfSelected();
  }

  getKeysFromData(){
    let keysArr = [];
    for(let key in this.allData[0]){
      keysArr.push(key);
    }
    return keysArr;
  }

 updateNumOfSelected(){ //updates the 
  const numOfSelected = this.currTableWrapperElement.querySelectorAll('.num-of-selected');
  numOfSelected.forEach((element) =>{
    element.textContent = this.filteredData.length;
  })
 }

  addEventListeners(){

    const filtersMenu = this.currTableWrapperElement.querySelector('.filters-container');
    const approveBtnFilter = filtersMenu.querySelector('.approve-btn');
    const cancelBtnFilter = filtersMenu.querySelector('.cancal-btn');

    // for clicking accept on filters
    approveBtnFilter.addEventListener('click', () => {
      const allCheckedCheckboxes = filtersMenu.querySelectorAll('input[type="checkbox"]:checked');
      const selected = [];

      allCheckedCheckboxes.forEach((item) => selected.push(item.id))
      this.filterData(selected);
      filtersMenu.classList.add('hide');

      this.updateNumOfSelected();
    })

    cancelBtnFilter.addEventListener('click', () => {
      filtersMenu.classList.add('hide');
    })


    const searchBar = filtersMenu.querySelector('.user-text-input');
    
    searchBar.addEventListener('input', (event) => {
      const userInput = event.target.value;
      const allCheckboxes = filtersMenu.querySelectorAll('input[type="checkbox"]');
      
      allCheckboxes.forEach((checkbox) => { 
        const isVisible = checkbox.dataset.hebrewName.includes(userInput);
        checkbox.parentElement.classList.toggle('hide', !isVisible);
      })
    })

    const allHeadersWrapper = this.currTableWrapperElement.querySelector('.table-headers')
    const allHeaders = allHeadersWrapper.querySelectorAll('.table-header-category')
    const allHeadersCaretsElements = allHeadersWrapper.querySelectorAll('.down-caret-icon')

    this.headersCaretStates = ['invisible', 'visible', 'rotated']; 
    const sortingDirection = [];

    allHeaders.forEach((header, index) =>{
      sortingDirection[index] = 0; // starting sorting direction is 0 - ascending order

      header.addEventListener('click', () => {

        this.sortBy(this.headersNamesInDB[index], sortingDirection[index]);
        sortingDirection[index]++;
        sortingDirection[index] %= 3; 

        for(let headerIndex = 0; headerIndex < allHeaders.length; headerIndex++){
          if(headerIndex !== index) {
            sortingDirection[headerIndex] = 0;
            allHeadersCaretsElements[headerIndex].classList.remove('visible');
            allHeadersCaretsElements[headerIndex].classList.remove('rotated');
            allHeadersCaretsElements[headerIndex].classList.add('invisible');
          }          
          else {
            allHeadersCaretsElements[headerIndex].classList.remove(this.headersCaretStates[(sortingDirection[index] + 2) % 3]); // its because the index is 0, 1, 2 and if i remove index minus 1 i got -> -1,0,1 instead 0,1,2.
            allHeadersCaretsElements[headerIndex].classList.add(this.headersCaretStates[sortingDirection[index]]);
          }
        }

      })
    })

  }

  
  createParameterOnFilterSearchBar(parameterForFilter) {

      const searchBoxUL = this.currTableWrapperElement.querySelector('#filter-list');

      this.allData.forEach((dataPiece, index) =>{
        const li = document.createElement('li');
        const hebrewName = dataPiece[parameterForFilter];
  
        const htmlSearchBoxMarkup = `<input type="checkbox" id="${this.prefix}-${index}" data-hebrew-name="${hebrewName}" checked><label for="${this.prefix}-${index}">${hebrewName}</label>`;

        li.innerHTML = htmlSearchBoxMarkup;
        searchBoxUL.appendChild(li);

      })
  }

  
  createHeadersElements() {
    const tableHeadersElement = this.currTableWrapperElement.querySelector('.table-headers');

    this.hebrewHeaders.forEach((hebrewName, index) => {

      const headerElement = document.createElement('div');
      headerElement.innerHTML= 
      `<div class="table-header-category" data-categoty-hebrew-name="${hebrewName}">
          <div class="title">${hebrewName}</div>
          <img src="./images/down-caret.svg" class="down-caret-icon invisible">
       </div>`

      tableHeadersElement.appendChild(headerElement);
    })

  }

  // filter data 
  filterData(IDsArray) {  
    this.filteredData = this.allData.filter((data) => IDsArray.includes(data.id)); 
    this.renderData(this.filteredData);
  }

  /* 
    sortingDirection:
    0 - acsending
    1 - decsending
    2 - original order 
  */
  sortBy(parameter, sortingDirection) { 

    this.sortedData = this.filteredData.slice();

    if(sortingDirection !== 2){ 
      // elementToCheck
      if(typeof(this.sortedData[0][parameter]) === 'number'){
        if(sortingDirection === 0)
          this.sortedData.sort((a, b) => a[parameter] - b[parameter])
        else
          this.sortedData.sort((a, b) => b[parameter] - a[parameter])
      }
      else if(typeof(this.sortedData[0][parameter]) === 'string'){
        if(sortingDirection === 0)
          this.sortedData.sort((a,b) => a[parameter].localeCompare(b[parameter], 'he'));
        else
          this.sortedData.sort((a,b) => b[parameter].localeCompare(a[parameter], 'he'));
      }
    }

    this.renderData(this.sortedData)    
  } 

  
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
          htmlRecordMarkup += `<div class="data-item">${record[key]}</div>`
        }
      }

      tableData.innerHTML = htmlRecordMarkup;
      tableDataContainer.appendChild(tableData);
    })
  }

}




