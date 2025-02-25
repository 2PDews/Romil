// Updates the character count dynamically
/*function updateCharCount() {
    const nameInput = document.getElementById('name');
    const charCount = document.getElementById('charCount');
    charCount.textContent = `${nameInput.value.length}/40`;
}

// Saves the tournament name to localStorage and navigates to the next page


 function UpdateCharCount() {
            const charCount = document.getElementById('name').value.length;
            document.getElementById('charCount').textContent = `${charCount}/40`;
        }

        // Save tournament name to localStorage and redirect

        // JavaScript for CreateTournament.js
        function saveTournamentName() {
            const tournamentName = document.getElementById("name").value.trim();
            
            if (tournamentName === "") {
              alert("Tournament name is required!");
              return; // Prevent navigation
            }
            
            // Store the tournament name (if required)
            localStorage.setItem("currentTournamentName", tournamentName);
            sessionStorage.setItem("currentTournamentName", tournamentName);
            
            // Redirect to the next page
            window.location.href = "SelectFormat.html";
          }
          
*/
// Updates the character count dynamically
// Function to update the character count dynamically
function updateCharCount() {
    const nameInput = document.getElementById("name");
    const charCount = document.getElementById("charCount");
    charCount.textContent = `${nameInput.value.length}/40`;
}

// Function to save the tournament name and navigate to AddLeaguePlayers.html
function saveTournamentName() {
    const tournamentName = document.getElementById("name").value.trim();

    if (tournamentName === "") {
        showCustomPopup("Please add a tournament name!");
        return; // Stop function execution
    }

    // Create a tournament object
    const tournament = {
        name: tournamentName,
        createdAt: new Date().toISOString(),
        players: [] // Players list can be updated later
    };

    // Store the tournament object in localStorage and sessionStorage
    localStorage.setItem("currentTournament", JSON.stringify(tournament));
    sessionStorage.setItem("currentTournament", JSON.stringify(tournament));

    // Redirect to the next page
    window.location.href = "AddLeaguePlayers.html";
}

// Function to retrieve and log the tournament data
function getTournament() {
    const tournament = JSON.parse(localStorage.getItem("currentTournament") || sessionStorage.getItem("currentTournament"));
    
    if (tournament) {
        console.log("Tournament:", tournament);
    } else {
        console.log("No tournament found.");
    }
}

// Function to display a custom pop-up message with neon styling
function showCustomPopup(message) {
    const popup = document.createElement("div");
    popup.className = "custom-popup";
    popup.innerHTML = `
        <p>${message}</p>
        <button onclick="this.parentElement.remove()">OK</button>
    `;
    document.body.appendChild(popup);
}
