 document.addEventListener('DOMContentLoaded', () => {
     
      const appGrid = document.getElementById('appGrid');
      const toggleBtn = document.getElementById('toggleBtn');
      const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
      const mainContentPages = document.querySelectorAll('.main-content-page');

      toggleBtn.addEventListener('click', () => {
        appGrid.classList.toggle('sidebar-collapsed');
      });

      sidebarLinks.forEach(link => {
        link.addEventListener('click', e => {
        
          if (link.getAttribute('target') === '_blank') {
            return;
          }
        
        });
      });

      
      const dmTabs = document.querySelectorAll('.dm-tab-btn');
      const dmContents = document.querySelectorAll('.dm-tab-content');
      dmTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          dmTabs.forEach(item => item.classList.remove('active'));
          dmContents.forEach(item => item.classList.remove('active'));
          tab.classList.add('active');
          document.getElementById(tab.dataset.tab).classList.add('active');
        });
      });
      const fileInputs = document.querySelectorAll('.file-input');
      const saveUploadBtn = document.getElementById('saveUploadBtn');

      fileInputs.forEach(input => {
        input.addEventListener('change', () => {
          // If
          if (input.files.length > 0) {
            saveUploadBtn.style.display = 'inline-flex';
          }
        });
      });

      saveUploadBtn.addEventListener('click', () => {
        alert('File saved successfully!');
        console.log("Simulating file save and database entry...");
        
        saveUploadBtn.style.display = 'none';
      });

    });