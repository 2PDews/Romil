document.getElementById("profile-pic-upload").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("profile-pic").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Jersey Number Update
document.getElementById("jersey-number").addEventListener("input", function () {
    document.getElementById("jersey-no-preview").textContent = this.value;
});

// Load Stats (Example Data)
const statsData = {
    runs: 250,
    wickets: 10,
    catches: 5
};

const ctx = document.getElementById("stats-chart").getContext("2d");
new Chart(ctx, {
    type: "pie",
    data: {
        labels: ["Runs", "Wickets", "Catches"],
        datasets: [{
            data: [statsData.runs, statsData.wickets, statsData.catches],
            backgroundColor: ["#00FFFF", "#C026D3", "#FF00FF"]
        }]
    }
});

// Load Previous Matches (Example Data)
const matches = [
    "Match 1: 50 Runs, 2 Wickets",
    "Match 2: 30 Runs, 1 Wicket",
    "Match 3: 70 Runs, 3 Wickets"
];

const matchesList = document.getElementById("matches-list");
matches.forEach(match => {
    const li = document.createElement("li");
    li.textContent = match;
    matchesList.appendChild(li);
});
