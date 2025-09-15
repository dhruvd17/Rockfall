 (function() {
    const activeTab = document.getElementById('activeTab');
    const historyTab = document.getElementById('historyTab');
    const activeContent = document.getElementById('activeContent');
    const historyContent = document.getElementById('historyContent');

    if (activeTab && historyTab && activeContent && historyContent) {
      activeTab.addEventListener('click', () => {
        activeTab.classList.add('active');
        historyTab.classList.remove('active');
        activeContent.classList.remove('hidden');
        historyContent.classList.add('hidden');
      });

      historyTab.addEventListener('click', () => {
        historyTab.classList.add('active');
        activeTab.classList.remove('active');
        historyContent.classList.remove('hidden');
        activeContent.classList.add('hidden');
      });
    }

    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('acknowledge-btn')) {
        e.preventDefault();
        alert('Alert acknowledged!');
      }

      if (e.target.classList.contains('note-btn')) {
        e.preventDefault();
        const note = prompt('Add a note for this alert:');
        if (note) {
          alert('Note added: ' + note);
        }
      }

      if (e.target.classList.contains('notify-btn')) {
        e.preventDefault();
        alert('Notification sent!');
      }

      if (e.target.classList.contains('export-btn')) {
        e.preventDefault();
        alert('Exporting alerts...');
      }

      if (e.target.classList.contains('filter-btn')) {
        e.preventDefault();
        alert('Opening filter options...');
      }

      if (e.target.classList.contains('notification-settings-btn')) {
        e.preventDefault();
        alert('Opening notification settings...');
      }
    });
  })();