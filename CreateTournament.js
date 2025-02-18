// Updates the character count dynamically
function updateCharCount() {
    const nameInput = document.getElementById('name');
    const charCount = document.getElementById('charCount');
    charCount.textContent = `${nameInput.value.length}/40`;
}

// Saves the tournament name to localStorage and navigates to the next page


 function updateCharCount() {
            const charCount = document.getElementById('name').value.length;
            document.getElementById('charCount').textContent = `${charCount}/40`;
        }

        // Save tournament name to localStorage and redirect
 // Load players from local storage
    function loadTournament() {
        const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
        storedPlayers.forEach(player => {
            addPlayerToList(player);
        });
        updatePlayerNumbers(); // Ensure numbering is correct after loading
    }

    // Save players to local storage
    function savePlayers() {
        const players = Array.from(playerList.children).map(listItem => 
            listItem.querySelector(".player-name").textContent
        );
        localStorage.setItem("players", JSON.stringify(players));
    }
        // JavaScript for CreateTournament.js
        function saveTournamentName() {
            const tournamentName = document.getElementById("name").value.trim();
            
            if (tournamentName === "") {
              alert("Tournament name is required!");
              return; // Prevent navigation
            }
            
            // Store the tournament name (if required)
            sessionStorage.setItem("currentTournamentName", tournamentName);
            
            // Redirect to the next page
            window.location.href = "SelectFormat.html";
          }
          
