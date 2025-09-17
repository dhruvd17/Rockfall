 const confidenceSlider = document.getElementById("confidence");
    const confidenceValue = document.getElementById("confidenceValue");

    if (confidenceSlider) {
      confidenceSlider.addEventListener("input", function() {
        confidenceValue.textContent = this.value + "%";
      });
    }

    const riskCtx = document.getElementById('riskChart') && document.getElementById('riskChart').getContext('2d');
    if (riskCtx) {
      new Chart(riskCtx, {
        type: 'line',
        data: {
          labels: ['Now', '6h', '12h', '18h', '24h', '48h', '72h'],
          datasets: [{
            label: 'Risk Level',
            data: [65, 68, 74, 77, 72, 64, 58],
            fill: true,
            backgroundColor: 'rgba(231, 76, 60, 0.2)',
            borderColor: '#e74c3c',
            tension: 0.4,
            pointBackgroundColor: '#e74c3c',
            pointBorderColor: '#fff'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: { enabled: true, mode: 'nearest' },
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: true, max: 100, ticks: { color: '#ccc' }, grid: { color: 'rgba(255,255,255,0.1)' } },
            x: { ticks: { color: '#ccc' }, grid: { color: 'rgba(255,255,255,0.1)' } }
          }
        }
      });
    }

    const confCtx = document.getElementById('confidenceChart') && document.getElementById('confidenceChart').getContext('2d');
    if (confCtx) {
      new Chart(confCtx, {
        type: 'line',
        data: {
          labels: ['Now', '6h', '12h', '18h', '24h', '48h', '72h'],
          datasets: [{
            label: 'Confidence',
            data: [85, 82, 78, 75, 72, 68, 65],
            fill: false,
            borderColor: '#2ecc71',
            tension: 0.4,
            pointBackgroundColor: '#2ecc71',
            pointBorderColor: '#fff'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: { enabled: true, mode: 'nearest' },
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: true, max: 100, ticks: { color: '#ccc' }, grid: { color: 'rgba(255,255,255,0.1)' } },
            x: { ticks: { color: '#ccc' }, grid: { color: 'rgba(255,255,255,0.1)' } }
          }
        }
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
      const contentFrame = document.querySelector('.content-frame');

      sidebarLinks.forEach(link => {
        link.addEventListener('click', e => {
          sidebarLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');

          const href = link.getAttribute('href');
          if (!href || href.trim() === '' || href.startsWith('#')) {
            e.preventDefault();
            return;
          }

          if (contentFrame) {
            e.preventDefault();
            contentFrame.src = href;
          }
        });
      });
    });


     (function () {
      const appGrid = document.getElementById('appGrid');
      const toggleBtn = document.getElementById('toggleBtn');

      toggleBtn && toggleBtn.addEventListener('click', () => {
        appGrid.classList.toggle('sidebar-collapsed');
      });
    })();