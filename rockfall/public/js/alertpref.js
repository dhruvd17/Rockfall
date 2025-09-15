  
    document.getElementById("emailToggle").addEventListener("change", function () {
      document.getElementById("emailInput").disabled = !this.checked;
    });

    document.getElementById("smsToggle").addEventListener("change", function () {
      document.getElementById("smsInput").disabled = !this.checked;
    });

    document.getElementById("criticalToggle").addEventListener("change", function () {
      document.getElementById("frequencySelect").disabled = !this.checked;
    });

   
    const slider = document.getElementById("thresholdSlider");
    const thresholdValue = document.getElementById("thresholdValue");
    slider.addEventListener("input", () => {
      thresholdValue.textContent = slider.value + "%";
    });