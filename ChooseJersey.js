document.addEventListener("DOMContentLoaded", function () {
    const patternContainer = document.querySelector(".patterns");
    const jerseyPreview = document.getElementById("jerseyPreview");
    const primaryColorInput = document.getElementById("primaryColor");
    const secondaryColorInput = document.getElementById("secondaryColor");

const patterns = [
    "Solid", "Stripes", "Checkered", "Gradient", "Diagonal Stripes",
    "Polka Dots", "Wavy Lines", "Hexagonal Grid", "Chevron", "Triangles",
    "Tribal", "Floral", "Carbon Fiber", "Circuit Board", "Maze",
    "Watercolor", "Grunge", "Smoke", "Metallic", "Fire",
    "Electric", "Frost", "Rain", "Glitch", "Splatter",
    "Digital", "Illusion", "Barcode", "Galaxy", "Honeycomb"
];

    let selectedPattern = "solid"; // Default selection

    // Generate buttons dynamically
    patterns.forEach(pattern => {
        const button = document.createElement("button");
        button.classList.add("pattern-btn");
        button.setAttribute("data-pattern", pattern.toLowerCase().replace(/\s+/g, "-"));
        button.textContent = pattern;

        // Click event to select pattern
        button.addEventListener("click", function () {
            document.querySelectorAll(".pattern-btn").forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            selectedPattern = this.getAttribute("data-pattern");
            updateJerseyPreview();
        });

        patternContainer.appendChild(button);
    });

    // Select first button as default
    const firstButton = document.querySelector(".pattern-btn");
    if (firstButton) {
        firstButton.classList.add("active");
        selectedPattern = firstButton.getAttribute("data-pattern");
    }

    function updateJerseyPreview() {
        let primaryColor = primaryColorInput.value;
        let secondaryColor = secondaryColorInput.value;

        // Reset class and apply selected pattern
        jerseyPreview.className = "jersey"; 
        jerseyPreview.style.setProperty('--primary', primaryColor);
        jerseyPreview.style.setProperty('--secondary', secondaryColor);
        jerseyPreview.classList.add(selectedPattern);
    }

    // Event listeners for color changes
    primaryColorInput.addEventListener("input", updateJerseyPreview);
    secondaryColorInput.addEventListener("input", updateJerseyPreview);

    // Confirm Selection
    window.confirmJersey = function () {
        const selectedJersey = {
            pattern: selectedPattern,
            primaryColor: primaryColorInput.value,
            secondaryColor: secondaryColorInput.value
        };

        localStorage.setItem("selectedJerseyPattern", JSON.stringify(selectedJersey));
        alert(`Jersey Confirmed with ${selectedPattern} pattern!`);
        window.location.href = "index.html";
    };

    // Apply default jersey preview
    updateJerseyPreview();
});
