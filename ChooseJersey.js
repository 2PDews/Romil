document.addEventListener("DOMContentLoaded", function () {
    const patternButtons = document.querySelectorAll(".pattern-btn");
    const primaryColorPicker = document.getElementById("primaryColor");
    const secondaryColorPicker = document.getElementById("secondaryColor");
    const jerseyPreview = document.getElementById("jerseyPreview");

    let selectedPattern = "solid"; // Default pattern

    // Apply pattern selection
    patternButtons.forEach(button => {
        button.addEventListener("click", function () {
            document.querySelectorAll(".pattern-btn").forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            selectedPattern = this.getAttribute("data-pattern");
            updateJerseyPreview();
        });
    });

    // Update Jersey Preview
    function updateJerseyPreview() {
        let primaryColor = primaryColorPicker.value;
        let secondaryColor = secondaryColorPicker.value;

        if (selectedPattern === "solid") {
            jerseyPreview.style.background = primaryColor;
        } else if (selectedPattern === "stripes") {
            jerseyPreview.style.background = `repeating-linear-gradient(
                45deg, ${primaryColor}, ${primaryColor} 10px, ${secondaryColor} 10px, ${secondaryColor} 20px)`;
        } else if (selectedPattern === "checkered") {
            jerseyPreview.style.background = `linear-gradient(45deg, ${primaryColor} 25%, ${secondaryColor} 25%, 
                ${secondaryColor} 50%, ${primaryColor} 50%, ${primaryColor} 75%, ${secondaryColor} 75%)`;
            jerseyPreview.style.backgroundSize = "40px 40px";
        } else if (selectedPattern === "gradient") {
            jerseyPreview.style.background = `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`;
        }
    }

    // Update Preview on Color Change
    primaryColorPicker.addEventListener("input", updateJerseyPreview);
    secondaryColorPicker.addEventListener("input", updateJerseyPreview);

    // Confirm Jersey Selection
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

    // Initialize Default Preview
    updateJerseyPreview();
});
