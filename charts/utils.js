export const utils = {
  COLORS: {
    red: 'rgb(226, 29, 72)',
    musturd: 'rgb(230, 185, 87)',
    oliveGreen: 'rgb(182, 202, 81)',
    darkGreen: 'rgb(0, 127, 127)',
    lightBlue: 'rgb(80, 203, 253)',
    orange: 'rgb(255, 125, 103)',
    purple: 'rgb(186, 161, 239)',

    redFaded: 'rgba(226, 29, 72, 0.7)',
    musturdFaded: 'rgba(230, 185, 87, 0.7)',
    oliveGreenFaded: 'rgba(182, 202, 81, 0.7)',
    darkGreenFaded: 'rgba(0, 127, 127, 0.7)',
    lightBlueFaded: 'rgba(80, 203, 253, 0.7)',
    orangeFaded: 'rgba(255, 125, 103, 0.7)',
    purpleFaded: 'rgba(186, 161, 239, 0.7)',
  },
  
  generateNumber : function (min, max) {
    return min + Math.floor((max - min) * Math.random());
  }

};





//                                         // M - D - Y
// let datesArr = generateDatesArr(new Date("3-2-2020"), 
//                                 new Date("10-1-2023"));

// let hospitalizedArr = generateHospitalizedArr(5);
// console.log(datesArr.length);


