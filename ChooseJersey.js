document.addEventListener("DOMContentLoaded", function () {
    const primaryColorPicker = document.getElementById("primaryColor");
    const secondaryColorPicker = document.getElementById("secondaryColor");
    const jerseyFill = document.getElementById("jerseyFill");

    let selectedPattern = "solid"; // Default pattern

    const patterns = {
        "Basic Patterns": ["Solid", "Stripes", "Checkered", "Gradient", "Diagonal Stripes"],
        "Textured Patterns": ["Polka Dots", "Chevron"]
    };

    function populateDropdown(category, containerId) {
        const container = document.getElementById(containerId);
        patterns[category].forEach(pattern => {
            const button = document.createElement("button");
            button.classList.add("pattern-btn");
            button.setAttribute("data-pattern", pattern.toLowerCase().replace(/\s+/g, "-"));
            button.textContent = pattern;

            button.addEventListener("click", function () {
                document.querySelectorAll(".pattern-btn").forEach(btn => btn.classList.remove("active"));
                this.classList.add("active");
                selectedPattern = this.getAttribute("data-pattern");
                updateJerseyPreview();
            });

            container.appendChild(button);
        });
    }

    populateDropdown("Basic Patterns", "basicPatterns");
    populateDropdown("Textured Patterns", "texturedPatterns");

    // Select first pattern by default
    const firstButton = document.querySelector(".pattern-btn");
    if (firstButton) {
        firstButton.classList.add("active");
        selectedPattern = firstButton.getAttribute("data-pattern");
    }

    function updateJerseyPreview() {
        const primaryColor = primaryColorPicker.value;
        const secondaryColor = secondaryColorPicker.value;

        // Apply patterns inside the cutout
        switch (selectedPattern) {
            case "solid":
                jerseyFill.style.fill = primaryColor;
                break;
            case "stripes":
                jerseyFill.style.fill = `url(data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><rect width='10' height='10' fill='${secondaryColor}'/><path d='M0,0 L10,10 M-5,5 L5,15 M5,-5 L15,5' stroke='${primaryColor}' stroke-width='2'/></svg>)`;
                break;
            case "checkered":
                jerseyFill.style.fill = `url(data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><rect width='10' height='10' fill='${primaryColor}'/><rect x='10' y='10' width='10' height='10' fill='${primaryColor}'/><rect x='10' width='10' height='10' fill='${secondaryColor}'/><rect y='10' width='10' height='10' fill='${secondaryColor}'/></svg>)`;
                break;
            case "gradient":
                jerseyFill.style.fill = `url(#gradientFill)`;
                break;
            case "diagonal-stripes":
                jerseyFill.style.fill = `url(data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><path d='M0,0 L10,10 M-5,5 L5,15 M5,-5 L15,5' stroke='${primaryColor}' stroke-width='3'/></svg>)`;
                break;
            case "polka-dots":
                jerseyFill.style.fill = `url(data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'><circle cx='5' cy='5' r='2' fill='${primaryColor}'/><circle cx='0' cy='0' r='2' fill='${secondaryColor}'/></svg>)`;
                break;
            case "chevron":
                jerseyFill.style.fill = `url(data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><path d='M0,10 L10,0 L20,10 L10,20 Z' fill='${primaryColor}' stroke='${secondaryColor}' stroke-width='1'/></svg>)`;
                break;
            default:
                jerseyFill.style.fill = `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`;
        }
    }

    // Function to confirm Jersey selection
    window.confirmJersey = function () {
        const selectedJersey = {
            pattern: selectedPattern,
            primaryColor: primaryColorPicker.value,
            secondaryColor: secondaryColorPicker.value
        };

        localStorage.setItem("selectedJerseyPattern", JSON.stringify(selectedJersey));
        alert(`Jersey Confirmed with ${selectedPattern} pattern!`);
        window.location.href = "index.html"; // Redirect after confirmation
    };

    // Event Listeners for color selection
    primaryColorPicker.addEventListener("input", updateJerseyPreview);
    secondaryColorPicker.addEventListener("input", updateJerseyPreview);

    // Initial Preview Update
    updateJerseyPreview();

    // Back Button
    const backButton = document.createElement("button");
    backButton.textContent = "← Back";
    backButton.classList.add("back-button");
    backButton.addEventListener("click", function () {
        window.history.back();
    });

    document.body.prepend(backButton);
});
