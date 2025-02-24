document.addEventListener("DOMContentLoaded", function () {
    const patterns = {
        "Basic Patterns": ["Solid", "Stripes", "Checkered", "Gradient", "Diagonal Stripes"],
        "Textured Patterns": ["Polka Dots", "Camouflage", "Hexagonal Grid", "Chevron", "Galaxy"],
        "Special Effects": ["Fire", "Electric", "Watercolor", "Smoke", "Digital"]
    };

    let selectedPattern = "solid";

    // Function to populate dropdowns
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

    // Populate dropdowns
    populateDropdown("Basic Patterns", "basicPatterns");
    populateDropdown("Textured Patterns", "texturedPatterns");
    populateDropdown("Special Effects", "specialPatterns");

    // Initialize default selection
    document.querySelector(".pattern-btn").classList.add("active");

    function updateJerseyPreview() {
        let primaryColor = document.getElementById("primaryColor").value;
        let secondaryColor = document.getElementById("secondaryColor").value;
        let jerseyPreview = document.getElementById("jerseyPreview");

        jerseyPreview.className = "jersey"; // Reset class
        jerseyPreview.style.setProperty('--primary', primaryColor);
        jerseyPreview.style.setProperty('--secondary', secondaryColor);
        jerseyPreview.classList.add(selectedPattern);
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
});


