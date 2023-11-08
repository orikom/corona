const config = {
  type: 'bar', 
  data: {
      labels: ['A', 'B', 'C', 'D', 'E'],
      datasets: [
          {
              label: 'Bar Data',
              data: [5, 3, 7, 2, 8],
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
          },
          {
              type: 'line', 
              label: 'Line Data',
              data: [2, 4, 1, 5, 3],
              fill: false,
              borderColor: 'rgba(255, 99, 132, 1)', 
              tension: 0.4,
          },
      ],
  },
  
  options: {
      scales: {
          y: {
              beginAtZero: true,
          },
      },
  },
};

const ctxList = document.querySelectorAll('.dummy-chart-01');

for(let i = 0; i < ctxList.length; i++){
  ctxList[i].getContext('2d');
  new Chart(ctxList[i], config);
}

export { ctxList };

