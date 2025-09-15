 (function () {
      const appGrid = document.getElementById('appGrid');
      const contentFrame = document.getElementById('contentFrame');
      const toggleBtn = document.getElementById('toggleBtn');

      
      toggleBtn.addEventListener('click', () => {
        appGrid.classList.toggle('sidebar-collapsed');
      });

     
      const tabLinks = document.querySelectorAll('.top-tabs a');
      tabLinks.forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          tabLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
          contentFrame.src = link.getAttribute('data-src');
        });
      });
    })();