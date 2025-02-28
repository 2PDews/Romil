document.addEventListener("DOMContentLoaded", function () {
    const patterns = {
        "Basic Patterns": ["Solid", "Stripes", "Checkered", "Gradient", "Diagonal Stripes"],
        "Textured Patterns": ["Polka Dots", "Chevron"],
    };

    let selectedPattern = "solid"; // Default pattern

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

    const firstButton = document.querySelector(".pattern-btn");
    if (firstButton) {
        firstButton.classList.add("active");
    }

    function updateJerseyPreview() {
        let primaryColor = document.getElementById("primaryColor").value;
        let secondaryColor = document.getElementById("secondaryColor").value;
        let jerseyPreview = document.getElementById("jerseyPreview");

        // Reset previous classes
        jerseyPreview.className = "jersey";

        // Apply primary and secondary colors
        jerseyPreview.style.setProperty('--primary', primaryColor);
        jerseyPreview.style.setProperty('--secondary', secondaryColor);

        // Add selected pattern class
        jerseyPreview.classList.add(selectedPattern);
    }

    document.getElementById("primaryColor").addEventListener("input", updateJerseyPreview);
    document.getElementById("secondaryColor").addEventListener("input", updateJerseyPreview);

    window.confirmJersey = function () {
        const jerseyNumber = document.getElementById("jerseyNumber").value.trim(); // Get the Jersey Number

        if (jerseyNumber === "") {
            alert("Please enter the jersey number before confirming!"); // Show Error Message
            return;
        }

        const selectedJersey = {
            pattern: selectedPattern,
            primaryColor: document.getElementById("primaryColor").value,
            secondaryColor: document.getElementById("secondaryColor").value,
            jerseyNumber: jerseyNumber, // Save Jersey Number
        };

        localStorage.setItem("selectedJerseyPattern", JSON.stringify(selectedJersey));
        alert(`Jersey Confirmed with ${selectedPattern} pattern and Number ${jerseyNumber}!`);
        window.location.href = "index.html";
    };

    // Back Button (Top Left Corner)
    const backButton = document.createElement("button");
    backButton.textContent = "← Back";
    backButton.classList.add("back-button");
    backButton.addEventListener("click", function () {
        window.history.back();
    });

    document.body.prepend(backButton);
});
