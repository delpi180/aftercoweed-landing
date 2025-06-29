// Gráfico de progreso general (Consumido vs Restante)
const consumedProgressCtx = document.getElementById('consumedProgress').getContext('2d');
const consumedProgressChart = new Chart(consumedProgressCtx, {
  type: 'doughnut',
  data: {
    labels: ['Consumido', 'Restante'],
    datasets: [{
      data: [1291, 826],  // Datos simulados
      backgroundColor: ['#4caf50', '#e7e7e7'],
      borderWidth: 3,
    }]
  },
  options: {
    responsive: true,
    cutoutPercentage: 60,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return tooltipItem.raw + ' kcal';
          }
        }
      }
    }
  }
});




