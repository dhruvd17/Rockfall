  (function() {
      const form = document.querySelector('form[action="/register"]');
      if (!form) return;
      form.addEventListener('submit', function(e) {
        if (!form.checkValidity()) { e.preventDefault(); e.stopPropagation(); }
        form.classList.add('was-validated');
      }, false);
    })();