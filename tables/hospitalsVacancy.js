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


const hospitalsVacancyTableWrapperElement = document.querySelector('#hospitals-vacancy-table-wrapper');

new Table(
    hospitalsVacancyTableWrapperElement, 
    hospitalsVacancyData, 
    'hospitalName', 
    'hospital', 
    ['בית חולים','% תפוסה כללית', '% תפוסה מחלקה פנימית']
);


