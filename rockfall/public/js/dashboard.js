  document.addEventListener('DOMContentLoaded', function() {
    const stabilityCtx = document.getElementById('stabilityChartCanvas').getContext('2d');
    const stabilityChart = new Chart(stabilityCtx, {
      type: 'line',
      data: {
        labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
        datasets: [{
          label: 'Displacement (mm)',
          data: [2.1, 2.3, 2.5, 2.8, 3.2, 3.8, 4.5, 5.2],
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Displacement (mm)'
            }
          }
        }
      }
    });

    const environmentCtx = document.getElementById('environmentChartCanvas').getContext('2d');
    const environmentChart = new Chart(environmentCtx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Rainfall (mm)',
          data: [12, 19, 15, 27, 22, 18, 14],
          backgroundColor: 'rgba(52, 152, 219, 0.7)',
          borderColor: 'rgba(52, 152, 219, 1)',
          borderWidth: 1,
          yAxisID: 'y'
        }, {
          label: 'Temperature (°C)',
          data: [22, 24, 26, 28, 25, 23, 21],
          type: 'line',
          borderColor: '#e74c3c',
          backgroundColor: 'rgba(231, 76, 60, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          yAxisID: 'y1'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Rainfall (mm)'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false
            },
            title: {
              display: true,
              text: 'Temperature (°C)'
            }
          }
        }
      }
    });

    function updateTime() {
      const now = new Date();
      const timeString = now.toLocaleTimeString();
      document.querySelector('.stat-card:last-child .stat-card-value').textContent = timeString;
    }
    setInterval(updateTime, 1000);
    updateTime();

    setInterval(() => {
      const stabilityData = stabilityChart.data.datasets[0].data;
      stabilityData.push((Math.random() * 2) + stabilityData[stabilityData.length - 1]);
      stabilityData.shift();
      stabilityChart.update();

      document.querySelectorAll('.sensor-value').forEach(sensor => {
        const currentValue = parseFloat(sensor.textContent);
        const newValue = (currentValue + (Math.random() * 0.4 - 0.2)).toFixed(1);
        sensor.textContent = newValue + ' mm';

        const statusElement = sensor.nextElementSibling;
        const valueNum = parseFloat(newValue);

        if (valueNum > 8) {
          statusElement.textContent = 'Critical';
          statusElement.className = 'sensor-status priority-high';
        } else if (valueNum > 5) {
          statusElement.textContent = 'Warning';
          statusElement.className = 'sensor-status';
        } else {
          statusElement.textContent = 'Normal';
          statusElement.className = 'sensor-status';
        }
      });
    }, 5000);
  });