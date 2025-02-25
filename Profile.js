document.addEventListener("DOMContentLoaded", function () {
    // Profile Picture Upload
    const profilePicInput = document.getElementById("profile-pic-input");
    const profilePic = document.getElementById("profile-pic");

    profilePicInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Jersey Upload & Preview
    const jerseyUpload = document.getElementById("jersey-upload");
    const jerseyPreview = document.getElementById("jersey-preview-img");

    jerseyUpload.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                jerseyPreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // DOB Validation (Player must be at least 12 years old)
    const dobInput = document.getElementById("dob");
    dobInput.addEventListener("change", function () {
        const dob = new Date(this.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        if (age < 12) {
            alert("Player must be at least 12 years old.");
            this.value = "";
        }
    });

    // Fetch player stats from saved tournaments
    function fetchPlayerStats() {
        let totalRuns = 0;
        let totalWickets = 0;
        let totalCatches = 0;

        // Get saved tournaments from localStorage
        const savedTournaments = JSON.parse(localStorage.getItem("savedTournaments")) || [];

        // Get player name from profile input field
        const playerName = document.getElementById("player-name").value.trim();

        savedTournaments.forEach(tournament => {
            tournament.players.forEach(player => {
                if (player.name === playerName) {
                    totalRuns += parseInt(player.runs) || 0;
                    totalWickets += parseInt(player.wickets) || 0;
                    totalCatches += parseInt(player.catches) || 0;
                }
            });
        });

        updatePieChart(totalRuns, totalWickets, totalCatches);
    }

    // Update the Pie Chart
    function updatePieChart(runs, wickets, catches) {
        const ctx = document.getElementById("statsChart").getContext("2d");

        new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Runs", "Wickets", "Catches"],
                datasets: [{
                    data: [runs, wickets, catches],
                    backgroundColor: ["#00FFFF", "#8A2BE2", "#FF4500"]
                }]
            },
            options: { responsive: true }
        });
    }

    // Fetch stats when profile is loaded
    document.getElementById("player-name").addEventListener("change", fetchPlayerStats);

    // Load Previous Matches
    function loadPreviousMatches() {
        const prevMatches = document.getElementById("previous-matches");
        const savedTournaments = JSON.parse(localStorage.getItem("savedTournaments")) || [];
        const playerName = document.getElementById("player-name").value.trim();
        
        let matchList = [];

        savedTournaments.forEach(tournament => {
            tournament.players.forEach(player => {
                if (player.name === playerName) {
                    matchList.push(`Match: ${tournament.name} - Runs: ${player.runs}, Wickets: ${player.wickets}`);
                }
            });
        });

        if (matchList.length > 0) {
            prevMatches.innerHTML = matchList.map(match => `<p>${match}</p>`).join("");
        } else {
            prevMatches.innerHTML = "<p>No previous matches available.</p>";
        }
    }

    // Trigger fetching previous matches on player name change
    document.getElementById("player-name").addEventListener("change", loadPreviousMatches);
});
