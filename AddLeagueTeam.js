document.addEventListener("DOMContentLoaded", () => {
    const teamsList = document.getElementById("teamsList");
    const selectedTeams = document.getElementById("selectedTeams");
    const generateScheduleBtn = document.getElementById("generateScheduleBtn");
    const matchSchedule = document.getElementById("matchSchedule");
    const leagueTeamsContainer = document.getElementById("leagueTeamsContainer");
    const confirmLeagueSelectionBtn = document.getElementById("confirmLeagueSelectionBtn");

    // Retrieve teams from localStorage
    let teams = JSON.parse(localStorage.getItem("teams")) || [];
    let selectedLeagueTeams = JSON.parse(localStorage.getItem("selectedLeagueTeams")) || [];

    console.log("Loaded Teams:", teams);
    console.log("Loaded Selected League Teams:", selectedLeagueTeams);

    // ✅ Function to Display All Available Teams
    function displayTeams() {
        teamsList.innerHTML = "";
        teams.forEach((team, index) => {
            const teamDiv = document.createElement("div");
            teamDiv.classList.add("team-card");
            teamDiv.innerHTML = `
                <strong>${team.name}</strong><br>
                <div class="team-players"><strong>Players:</strong> ${team.players.length > 0 ? team.players.join(", ") : "None"}</div>
                <button class="add-league-btn" data-index="${index}">Add to League</button>`;
            teamsList.appendChild(teamDiv);
        });

        // ✅ Attach event listeners to all "Add to League" buttons
        document.querySelectorAll(".add-league-btn").forEach(button => {
            button.addEventListener("click", () => {
                let index = button.getAttribute("data-index");
                selectTeam(parseInt(index));
            });
        });
    }

    // ✅ Select Team for the League (Button Click)
    function selectTeam(index) {
        let team = teams[index];

        // Prevent duplicate selections
        if (!selectedLeagueTeams.some(t => t.name === team.name)) {
            selectedLeagueTeams.push(team);
            saveLeagueTeams();
            updateSelectedTeams();
        } else {
            alert("Team already added to the league!");
        }
    }

    // ✅ Load Teams for League Selection (Checkbox UI)
    function loadTeamsForLeagueSelection() {
        leagueTeamsContainer.innerHTML = "";

        teams.forEach(team => {
            const li = document.createElement("li");
            li.classList.add("team-item");
            li.innerHTML = `
                <label>
                    <input type="checkbox" class="team-select-checkbox" data-team="${team.name}" 
                        ${selectedLeagueTeams.some(t => t.name === team.name) ? "checked" : ""}>
                    <span class="team-name">${team.name}</span>
                </label>
                <div class="team-players"><strong>Players:</strong> ${team.players.length > 0 ? team.players.join(", ") : "None"}</div>
            `;
            leagueTeamsContainer.appendChild(li);
        });
    }

    // ✅ Update Selected Teams UI
    function updateSelectedTeams() {
        selectedTeams.innerHTML = "";
        selectedLeagueTeams.forEach((team, index) => {
            const teamDiv = document.createElement("div");
            teamDiv.classList.add("team-card");
            teamDiv.innerHTML = `
                <strong>${team.name}</strong><br>
                <div class="team-players"><strong>Players:</strong> ${team.players.length > 0 ? team.players.join(", ") : "None"}</div>
                <button class="remove-team-btn" data-index="${index}">Remove</button>`;
            selectedTeams.appendChild(teamDiv);
        });

        // ✅ Attach event listeners to "Remove" buttons
        document.querySelectorAll(".remove-team-btn").forEach(button => {
            button.addEventListener("click", () => {
                let index = button.getAttribute("data-index");
                removeTeam(parseInt(index));
            });
        });
    }

    // ✅ Remove Team from Selected League
    function removeTeam(index) {
        selectedLeagueTeams.splice(index, 1);
        saveLeagueTeams();
        updateSelectedTeams();
    }

    // ✅ Save Selected League Teams to Local Storage
    function saveLeagueTeams() {
        localStorage.setItem("selectedLeagueTeams", JSON.stringify(selectedLeagueTeams));
        console.log("Updated League Teams:", selectedLeagueTeams);
    }

    // ✅ Confirm League Selection (For Checkbox UI)
    confirmLeagueSelectionBtn.addEventListener("click", () => {
        selectedLeagueTeams = [];
        document.querySelectorAll(".team-select-checkbox:checked").forEach(checkbox => {
            let teamName = checkbox.getAttribute("data-team");
            let team = teams.find(t => t.name === teamName);
            if (team) selectedLeagueTeams.push(team);
        });

        if (selectedLeagueTeams.length === 0) {
            alert("Please select at least one team for the league.");
            return;
        }

        saveLeagueTeams();
        alert("Teams selected successfully!");
        updateSelectedTeams();
    });

    // ✅ Generate Match Schedule
    generateScheduleBtn.addEventListener("click", () => {
        matchSchedule.innerHTML = "<h2>Match Schedule</h2>";

        if (selectedLeagueTeams.length < 2) {
            alert("At least two teams are required to generate a schedule.");
            return;
        }

        for (let i = 0; i < selectedLeagueTeams.length; i++) {
            for (let j = i + 1; j < selectedLeagueTeams.length; j++) {
                const match = document.createElement("p");
                match.textContent = `${selectedLeagueTeams[i].name} vs ${selectedLeagueTeams[j].name}`;
                matchSchedule.appendChild(match);
            }
        }
    });

    // ✅ Initialize UI
    displayTeams();
    loadTeamsForLeagueSelection();
    updateSelectedTeams();
});
