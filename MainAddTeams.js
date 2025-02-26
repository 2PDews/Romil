document.addEventListener("DOMContentLoaded", () => {
    const teamNameInput = document.getElementById("teamNameInput");
    const addTeamBtn = document.getElementById("addTeamBtn");
    const teamsContainer = document.getElementById("teamsContainer");
    const saveTeamsBtn = document.getElementById("saveTeamsBtn");

    const playerModal = document.getElementById("playerModal");
    const closeModal = document.querySelector(".close");
    const selectedTeamName = document.getElementById("selectedTeamName");
    const playersList = document.getElementById("playersList");
    const confirmPlayersBtn = document.getElementById("confirmPlayersBtn");

    // Retrieve teams and players from localStorage
    let teams = JSON.parse(localStorage.getItem("teams")) || [];
    let players = JSON.parse(localStorage.getItem("players")) || ["Player1", "Player2", "Player3"]; // Sample Players
    let selectedTeam = null;

    // Display Teams on Page Load
    function displayTeams() {
        teamsContainer.innerHTML = "";
        teams.forEach((team, index) => {
            addTeamToDOM(team, index);
        });
    }

    // Add Team to DOM
    function addTeamToDOM(team, index) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="team-name">${team.name}</span>
            <div class="team-players"><strong>Players:</strong> ${team.players.length > 0 ? team.players.join(", ") : "None"}</div>
            <div class="buttons">
                <button class="add-players-btn" onclick="openPlayerModal(${index})">Add Players</button>
                <button class="delete-btn" onclick="removeTeam(${index})">Remove</button>
            </div>
        `;
        teamsContainer.appendChild(li);
    }

    // Add Team
    addTeamBtn.addEventListener("click", () => {
        const teamName = teamNameInput.value.trim();
        if (!teamName) return alert("Enter a team name");

        if (teams.some(team => team.name === teamName)) {
            return alert("Team already exists!");
        }

        const newTeam = { name: teamName, players: [] };
        teams.push(newTeam);
        saveData();
        teamNameInput.value = "";
        displayTeams();
    });

    // Remove Team
    window.removeTeam = (index) => {
        teams.splice(index, 1);
        saveData();
        displayTeams();
    };

    // Open Player Modal
    window.openPlayerModal = (teamIndex) => {
        selectedTeam = teamIndex;
        selectedTeamName.textContent = teams[teamIndex].name;
        loadPlayersList();
        playerModal.style.display = "block";
    };

    // Load Players List (For Selection)
    function loadPlayersList() {
        playersList.innerHTML = "";
        players.forEach(player => {
            const li = document.createElement("li");
            li.innerHTML = `<input type="checkbox" value="${player}" ${teams[selectedTeam].players.includes(player) ? "checked" : ""}> ${player}`;
            playersList.appendChild(li);
        });
    }

    // Confirm Player Selection
    confirmPlayersBtn.addEventListener("click", () => {
        let selectedPlayers = [];
        document.querySelectorAll("#playersList input:checked").forEach(checkbox => {
            selectedPlayers.push(checkbox.value);
        });

        teams[selectedTeam].players = selectedPlayers;
        saveData();
        displayTeams();
        playerModal.style.display = "none";
    });

    // Save Data (Teams & Players) to Local Storage
    function saveData() {
        localStorage.setItem("teams", JSON.stringify(teams));
        localStorage.setItem("players", JSON.stringify(players));
        console.log("Saved Data:", { teams, players });  // Debugging line
    }

    // Close Player Modal
    closeModal.addEventListener("click", () => {
        playerModal.style.display = "none";
    });

    // Load Teams on Page Load
    displayTeams();
});
