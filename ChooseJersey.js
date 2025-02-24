document.addEventListener("DOMContentLoaded", function () {
    const basicPatterns = [
        "Solid", "Stripes", "Checkered", "Gradient", "Diagonal Stripes",
        "Polka Dots", "Chevron", "Triangles", "Paisley"
    ];

    const texturedPatterns = [
        "Carbon Fiber", "Cybernetic Mesh", "Circuit Board", "Honeycomb",
        "Waveform", "Camouflage", "Hexagonal Grid"
    ];

    const specialPatterns = [
        "Fire", "Galaxy", "Glitch", "Electric", "Frost", "Rain", "Barcode", "Illusion"
    ];

    function generateButtons(patternList, containerId) {
        const container = document.getElementById(containerId);
        patternList.forEach(pattern => {
            const button = document.createElement("button");
            button.classList.add("pattern-btn");
            button.setAttribute("data-pattern", pattern.toLowerCase().replace(/\s+/g, "-"));
            button.textContent = pattern;

            button.addEventListener("click", function () {
                document.querySelectorAll(".pattern-btn").forEach(btn => btn.classList.remove("active"));
                this.classList.add("active");
                updateJerseyPreview(this.getAttribute("data-pattern"));
            });

            container.appendChild(button);
        });
    }

    generateButtons(basicPatterns, "basicPatterns");
    generateButtons(texturedPatterns, "texturedPatterns");
    generateButtons(specialPatterns, "specialPatterns");

    // Toggle dropdowns
    document.querySelectorAll(".dropdown-btn").forEach(button => {
        button.addEventListener("click", function () {
            const content = this.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });

    function updateJerseyPreview(selectedPattern) {
        let jerseyPreview = document.getElementById("jerseyPreview");
        jerseyPreview.className = "jersey";
        jerseyPreview.classList.add(selectedPattern);
    }
});
