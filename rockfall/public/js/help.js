 const toggleBtn = document.getElementById("toggleBtn");
    const appGrid = document.getElementById("appGrid");
    const sidebar = document.getElementById("sidebar");
    const contentFrame = document.getElementById("contentFrame");
    const links = document.querySelectorAll(".sidebar-menu a, .top-tabs a");

    toggleBtn.addEventListener("click", () => {
      if (window.innerWidth <= 820) {
        appGrid.classList.toggle("show-sidebar");
      } else {
        appGrid.classList.toggle("sidebar-collapsed");
      }
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