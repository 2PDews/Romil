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

    let selectedTeam = null;
    let players = JSON.parse(localStorage.getItem("players")) || [];
    let teams = JSON.parse(localStorage.getItem("teams")) || [];

    // Load saved teams on page load
    function loadTeams() {
        teamsContainer.innerHTML = "";
        teams.forEach(team => {
            addTeamToDOM(team.name, team.players);
        });
    }

    // Add Team
    addTeamBtn.addEventListener("click", () => {
        const teamName = teamNameInput.value.trim();
        if (teamName) {
            addTeamToDOM(teamName, []);
            teams.push({ name: teamName, players: [] });
            saveTeamsToLocalStorage();
            teamNameInput.value = "";
        }
    });

    // Function to add a team to the DOM
    function addTeamToDOM(teamName, teamPlayers) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="team-name">${teamName}</span>
            <div class="team-players"><strong>Players:</strong> ${teamPlayers.join(", ")}</div>
            <div class="buttons">
                <button class="add-players-btn" onclick="openPlayerModal(this)">Add Players</button>
                <button class="delete-btn" onclick="deleteTeam(this)">Remove</button>
            </div>
        `;
        teamsContainer.appendChild(li);
    }

    // Delete Team
    window.deleteTeam = (btn) => {
        const li = btn.closest("li");
        const teamName = li.querySelector(".team-name").textContent;

        // Remove from local storage
        teams = teams.filter(team => team.name !== teamName);
        saveTeamsToLocalStorage();

        // Remove from UI
        li.remove();
    };

    // Open Player Modal
    window.openPlayerModal = (btn) => {
        playerModal.style.display = "block";
        selectedTeam = btn.closest("li");
        selectedTeamName.textContent = selectedTeam.querySelector(".team-name").textContent;
        loadPlayersList();
    };

    // Load players from MainAddPlayers.html
    function loadPlayersList() {
        playersList.innerHTML = "";
        players.forEach((player) => {
            const li = document.createElement("li");
            li.innerHTML = `<input type="checkbox" value="${player}"> ${player}`;
            playersList.appendChild(li);
        });
    }

    // Confirm Player Selection
    confirmPlayersBtn.addEventListener("click", () => {
        const selectedPlayers = [];
        document.querySelectorAll("#playersList input:checked").forEach((checkbox) => {
            selectedPlayers.push(checkbox.value);
        });

        const teamName = selectedTeam.querySelector(".team-name").textContent;
        const teamIndex = teams.findIndex(team => team.name === teamName);
        if (teamIndex !== -1) {
            teams[teamIndex].players = selectedPlayers;
            saveTeamsToLocalStorage();
        }

        const teamPlayersDiv = selectedTeam.querySelector(".team-players");
        teamPlayersDiv.innerHTML = `<strong>Players:</strong> ${selectedPlayers.join(", ")}`;

        playerModal.style.display = "none";
    });

    // Save teams to local storage
    function saveTeamsToLocalStorage() {
        localStorage.setItem("teams", JSON.stringify(teams));
    }

    // Close Modal
    closeModal.addEventListener("click", () => {
        playerModal.style.display = "none";
    });

    // Load teams from local storage on page load
    loadTeams();
});
