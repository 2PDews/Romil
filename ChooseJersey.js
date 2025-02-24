document.addEventListener("DOMContentLoaded", function () {
    const patternContainer = document.querySelector(".patterns");
    const patterns = [
        "Solid", "Stripes", "Checkered", "Gradient", "Diagonal Stripes",
        "Polka Dots", "Wavy Lines", "Camouflage", "Hexagonal Grid", "Lightning Bolt",
        "Chevron", "Split Design", "Triangles", "Paisley", "Tribal",
        "Floral", "Waveform", "Carbon Fiber", "Cybernetic Mesh", "Circuit Board",
        "Fractal", "Abstract", "Maze", "Hoops", "Watercolor",
        "Retro Wave", "Grunge", "Smoke", "Lava", "Metallic",
        "Stardust", "Fire", "Electric", "Frost", "Rain",
        "Glitch", "Splatter", "Smoke Swirl", "Digital", "Illusion",
        "Barcode", "Kaleidoscope", "Galaxy", "Zebra", "Leopard",
        "Honeycomb", "Digital Camouflage"
    ];

    let selectedPattern = "solid";

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
