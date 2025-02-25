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
function updateCharCount() {
    const nameInput = document.getElementById('name');
    const charCount = document.getElementById('charCount');
    charCount.textContent = `${nameInput.value.length}/40`;
}

// Save tournament name to localStorage and sessionStorage as JSON
function saveTournamentName() {
    const tournamentName = document.getElementById("name").value.trim();

    if (tournamentName === "") {
        alert("Tournament name is required!");
        return; // Prevent navigation
    }

    // Create a tournament object (you can add more properties if needed)
    const tournament = {
        name: tournamentName,
        createdAt: new Date().toISOString(), // Add a creation timestamp (example)
        players: [] // You can add players or other properties as needed
    };

    // Store the tournament object as a JSON string
    localStorage.setItem("currentTournament", JSON.stringify(tournament));
    sessionStorage.setItem("currentTournament", JSON.stringify(tournament));

    // Redirect to the next page
    window.location.href = "AddLeaguePlayers.html";
}

// Optionally, you can retrieve the tournament from localStorage or sessionStorage and parse it
function getTournament() {
    const tournament = JSON.parse(localStorage.getItem("currentTournament") || sessionStorage.getItem("currentTournament"));
    
    if (tournament) {
        console.log("Tournament:", tournament);
    } else {
        console.log("No tournament found.");
    }
}
