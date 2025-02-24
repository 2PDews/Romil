document.addEventListener("DOMContentLoaded", function () {
    const patterns = {
        "Basic Patterns": ["Solid", "Stripes", "Checkered", "Gradient", "Diagonal Stripes"],
        "Textured Patterns": ["Polka Dots", "Chevron"],
        "Special Effects": ["Fire", "Electric", "Watercolor", "Smoke", "Digital"]
    };

    let selectedPattern = "solid"; // Default pattern

    // Function to populate pattern buttons
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

    // Populate pattern sections
    populateDropdown("Basic Patterns", "basicPatterns");
    populateDropdown("Textured Patterns", "texturedPatterns");
    populateDropdown("Special Effects", "specialPatterns");

    // Ensure the first pattern button is selected by default
    const firstButton = document.querySelector(".pattern-btn");
    if (firstButton) {
        firstButton.classList.add("active");
    }

    // Function to update the jersey preview
    function updateJerseyPreview() {
        let primaryColor = document.getElementById("primaryColor").value;
        let secondaryColor = document.getElementById("secondaryColor").value;
        let jerseyPreview = document.getElementById("jerseyPreview");

        jerseyPreview.className = "jersey"; // Reset class
        jerseyPreview.style.setProperty('--primary', primaryColor);
        jerseyPreview.style.setProperty('--secondary', secondaryColor);
        jerseyPreview.classList.add(selectedPattern);

        // Special Effects Dynamic Behavior
        if (selectedPattern === "fire") {
            jerseyPreview.style.animation = "fireGlow 1.5s infinite alternate";
        } else if (selectedPattern === "electric") {
            jerseyPreview.style.animation = "electricPulse 1s infinite alternate";
        } else if (selectedPattern === "smoke") {
            jerseyPreview.style.animation = "smokeFade 3s infinite alternate";
        } else if (selectedPattern === "digital") {
            jerseyPreview.style.animation = "glitchEffect 0.5s infinite alternate";
        } else {
            jerseyPreview.style.animation = ""; // Remove animations for non-special patterns
        }
    }

    // Event listeners for color changes
    document.getElementById("primaryColor").addEventListener("input", updateJerseyPreview);
    document.getElementById("secondaryColor").addEventListener("input", updateJerseyPreview);

    // Confirm Selection
    window.confirmJersey = function () {
        const selectedJersey = {
            pattern: selectedPattern,
            primaryColor: document.getElementById("primaryColor").value,
            secondaryColor: document.getElementById("secondaryColor").value
        };

        localStorage.setItem("selectedJerseyPattern", JSON.stringify(selectedJersey));
        alert(`Jersey Confirmed with ${selectedPattern} pattern!`);
        window.location.href = "index.html";
    };

    // Back Button Functionality (Top Left Corner)
    const backButton = document.createElement("button");
    backButton.textContent = "← Back";
    backButton.classList.add("back-button");
    backButton.addEventListener("click", function () {
        window.history.back();
    });

    document.body.prepend(backButton);
});
