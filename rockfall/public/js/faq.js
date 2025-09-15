 
    document.querySelectorAll(".faq-question").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = btn.parentElement;
        item.classList.toggle("active");
      });
    });


    const searchInput = document.getElementById("faqSearch");
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();

      document.querySelectorAll("[data-section]").forEach(section => {
        let hasMatch = false;
        section.querySelectorAll(".faq-item").forEach(item => {
          const text = item.innerText.toLowerCase();
          if (text.includes(query)) {
            item.style.display = "block";
            hasMatch = true;
          } else {
            item.style.display = "none";
            item.classList.remove("active");
          }
        });
        section.style.display = hasMatch ? "block" : "none";
      });
    });