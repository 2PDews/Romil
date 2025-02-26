document.addEventListener("DOMContentLoaded", () => {
    const teamsList = document.getElementById("teamsList");
    const selectedTeams = document.getElementById("selectedTeams");
    const generateScheduleBtn = document.getElementById("generateScheduleBtn");
    const matchSchedule = document.getElementById("matchSchedule");
    const leagueTeamsContainer = document.getElementById("leagueTeamsContainer");
    const confirmLeagueSelectionBtn = document.getElementById("confirmLeagueSelectionBtn");

    let teams = JSON.parse(localStorage.getItem("teams")) || [];
    let selectedLeagueTeams = JSON.parse(localStorage.getItem("selectedLeagueTeams")) || [];

    function displayTeams() {
        teamsList.innerHTML = "";
        teams.forEach((team, index) => {
            const teamDiv = document.createElement("div");
            teamDiv.classList.add("team-card");
            teamDiv.innerHTML = `
                <strong>${team.name}</strong><br>Players: ${team.players.join(", ")}
                <br><button onclick="selectTeam(${index})">Add to League</button>`;
            teamsList.appendChild(teamDiv);
        });
    }

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
                <div class="team-players"><strong>Players:</strong> ${team.players.join(", ")}</div>
            `;
            leagueTeamsContainer.appendChild(li);
        });
    }

    window.selectTeam = (index) => {
        if (!selectedLeagueTeams.find(team => team.name === teams[index].name)) {
            selectedLeagueTeams.push(teams[index]);
            updateSelectedTeams();
        }
    };

    function updateSelectedTeams() {
        selectedTeams.innerHTML = "";
        selectedLeagueTeams.forEach((team, index) => {
            const teamDiv = document.createElement("div");
            teamDiv.classList.add("team-card");
            teamDiv.innerHTML = `
                <strong>${team.name}</strong> 
                <button onclick="removeTeam(${index})">Remove</button>`;
            selectedTeams.appendChild(teamDiv);
        });
    }

    window.removeTeam = (index) => {
        selectedLeagueTeams.splice(index, 1);
        updateSelectedTeams();
    };

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

        localStorage.setItem("selectedLeagueTeams", JSON.stringify(selectedLeagueTeams));
        alert("Teams selected successfully!");
        updateSelectedTeams();
    });

    generateScheduleBtn.addEventListener("click", () => {
        matchSchedule.innerHTML = "<h2>Match Schedule</h2>";
        for (let i = 0; i < selectedLeagueTeams.length; i++) {
            for (let j = i + 1; j < selectedLeagueTeams.length; j++) {
                const match = document.createElement("p");
                match.textContent = `${selectedLeagueTeams[i].name} vs ${selectedLeagueTeams[j].name}`;
                matchSchedule.appendChild(match);
            }
        }
    });

    displayTeams();
    loadTeamsForLeagueSelection();
    updateSelectedTeams();
});
