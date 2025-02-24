const API_URL = "https://quilted-enchanting-grade.glitch.me/api/jerseys";

async function loadJerseys() {
    try {
        const response = await fetch(API_URL);
        const jerseys = await response.json();

        console.log(jerseys); // Check if data is coming correctly

        const container = document.getElementById("jerseyContainer");
        container.innerHTML = ""; // Clear any existing content

        jerseys.forEach(jersey => {
            const jerseyDiv = document.createElement("div");
            jerseyDiv.classList.add("jersey-card");

            jerseyDiv.innerHTML = `
                <img src="${jersey.image}" alt="${jersey.name}" class="jersey-img">
                <h3>${jersey.name}</h3>
                <button class="select-btn" onclick="selectJersey('${jersey.name}', '${jersey.image}')">
                    Select
                </button>
            `;

            container.appendChild(jerseyDiv);
        });
    } catch (error) {
        console.error("Error loading jerseys:", error);
    }
}

function selectJersey(name, image) {
    localStorage.setItem("selectedJersey", JSON.stringify({ name, image }));
    alert(`You selected: ${name}`);
}

function confirmJersey() {
    const selectedJersey = JSON.parse(localStorage.getItem("selectedJersey"));

    if (selectedJersey) {
        alert(`Jersey Confirmed: ${selectedJersey.name}`);
        // Redirect or handle jersey selection confirmation here
    } else {
        alert("Please select a jersey before confirming!");
    }
}

// Load jerseys when the page loads
window.onload = loadJerseys;
