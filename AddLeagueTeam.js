document.addEventListener("DOMContentLoaded", () => {
    const teamsList = document.getElementById("teamsList");
    const selectedTeams = document.getElementById("selectedTeams");
    const generateScheduleBtn = document.getElementById("generateScheduleBtn");
    const matchSchedule = document.getElementById("matchSchedule");

    let teams = JSON.parse(localStorage.getItem("teams")) || [];
    let selectedLeagueTeams = [];

    function displayTeams() {
        teamsList.innerHTML = "";
        teams.forEach((team, index) => {
            const teamDiv = document.createElement("div");
            teamDiv.classList.add("team-card");
            teamDiv.innerHTML = `<strong>${team.name}</strong><br>Players: ${team.players.join(", ")}
                <br><button onclick="selectTeam(${index})">Add to League</button>`;
            teamsList.appendChild(teamDiv);
        });
    }

    window.selectTeam = (index) => {
        if (!selectedLeagueTeams.includes(teams[index])) {
            selectedLeagueTeams.push(teams[index]);
            updateSelectedTeams();
        }
    };

    function updateSelectedTeams() {
        selectedTeams.innerHTML = "";
        selectedLeagueTeams.forEach((team, index) => {
            const teamDiv = document.createElement("div");
            teamDiv.classList.add("team-card");
            teamDiv.innerHTML = `<strong>${team.name}</strong> 
                <button onclick="removeTeam(${index})">Remove</button>`;
            selectedTeams.appendChild(teamDiv);
        });
    }

    window.removeTeam = (index) => {
        selectedLeagueTeams.splice(index, 1);
        updateSelectedTeams();
    };

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
});
