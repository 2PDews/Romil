// Add click event listeners for the options
document.getElementById('tournament-option').onclick = () => {
    window.location.href = "Tournament.html";
};

document.getElementById('players-option').onclick = () => {
    window.location.href = "MainAddPlayers.html";
};

document.getElementById('teams-option').onclick = () => {
    window.location.href = "MainAddTeams.html";
};

document.getElementById('follow-option').onclick = () => {
    window.location.href = "FollowTournament.html";
};

document.getElementById('jersey-option').onclick = () => {
    window.location.href = "ChooseJersey.html";
};
document.getElementById('number-option').onclick = () => {
    window.location.href = "JerseyNo.html";
};

        function toggleMenu(event) {
            event.stopPropagation(); // Prevents closing menu when clicking the menu icon
            document.getElementById("sidebar").classList.toggle("active");
        }

        function closeMenu(event) {
            let sidebar = document.getElementById("sidebar");
            if (sidebar.classList.contains("active") && !sidebar.contains(event.target)) {
                sidebar.classList.remove("active");
            }
        }

        document.body.addEventListener("click", closeMenu); // Close sidebar on body click
function closeSidebar() {
    document.getElementById("sidebar").classList.remove("active");
}
// Load Header and Footer
document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
        });

    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("beforeend", data);
        });
});

// Sidebar Toggle Function
function toggleMenu(event) {
    event.stopPropagation();
    document.getElementById("sidebar").classList.toggle("active");
}

// Close Sidebar when clicking outside
function closeSidebar() {
    document.getElementById("sidebar").classList.remove("active");
}
