document.addEventListener("DOMContentLoaded", function () {
    const patternButtons = document.querySelectorAll(".pattern-btn");
    const primaryColorPicker = document.getElementById("primaryColor");
    const secondaryColorPicker = document.getElementById("secondaryColor");
    const jerseyPreview = document.getElementById("jerseyPreview");

    let selectedPattern = "solid"; // Default pattern

    // Function to update jersey preview
    function updateJerseyPreview() {
        let primaryColor = primaryColorPicker.value;
        let secondaryColor = secondaryColorPicker.value;
        
        // Reset class and apply new colors
        jerseyPreview.className = "jersey";
        jerseyPreview.style.setProperty('--primary', primaryColor);
        jerseyPreview.style.setProperty('--secondary', secondaryColor);

        // Apply selected pattern
        if (selectedPattern) {
            jerseyPreview.classList.add(selectedPattern);
        }
    }

    // Event listener for pattern selection
    patternButtons.forEach(button => {
        button.addEventListener("click", function () {
            document.querySelectorAll(".pattern-btn").forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            selectedPattern = this.getAttribute("data-pattern");
            updateJerseyPreview();
        });
    });

    // Event listeners for color pickers
    primaryColorPicker.addEventListener("input", updateJerseyPreview);
    secondaryColorPicker.addEventListener("input", updateJerseyPreview);

    // Function to confirm jersey selection
    window.confirmJersey = function () {
        const selectedJersey = {
            pattern: selectedPattern,
            primaryColor: primaryColorPicker.value,
            secondaryColor: secondaryColorPicker.value
        };

        localStorage.setItem("selectedJerseyPattern", JSON.stringify(selectedJersey));
        alert(`Jersey Confirmed with ${selectedPattern} pattern!`);
        window.location.href = "index.html"; // Redirect after selection
    };

    // Initialize the preview on page load
    updateJerseyPreview();
});
