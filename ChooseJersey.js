// Fetch jerseys from API
async function loadJerseys() {
    try {
        const response = await fetch("http://localhost:5000/api/jerseys");
        const jerseys = await response.json();
        
        const container = document.getElementById("jerseyContainer");
        container.innerHTML = ""; // Clear existing content

        jerseys.forEach(jersey => {
            const jerseyDiv = document.createElement("div");
            jerseyDiv.classList.add("jersey-card");

            jerseyDiv.innerHTML = `
                <img src="${jersey.image}" alt="${jersey.name}" class="jersey-img">
                <h3>${jersey.name}</h3>
                <input type="color" value="${jersey.color}" class="color-picker" 
                       onchange="changeColor(this, '${jersey.image}')">
            `;

            container.appendChild(jerseyDiv);
        });
    } catch (error) {
        console.error("Error loading jerseys:", error);
    }
}

// Change Jersey Color (Future Feature)
function changeColor(input, jerseyId) {
    document.getElementById(jerseyId).style.filter = `hue-rotate(${input.value}deg)`;
}

// Confirm Selection
function confirmJersey() {
    alert("Jersey selection confirmed!");
}

// Load jerseys on page load
window.onload = loadJerseys;
