 const slider = document.getElementById("retentionSlider");
    const retentionValue = document.getElementById("retentionValue");

    function updateSlider() {
      retentionValue.textContent = slider.value;
      let percent = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
      slider.style.background = `linear-gradient(to right, black ${percent}%, white ${percent}%)`;
    }

    slider.addEventListener("input", updateSlider);
    updateSlider();