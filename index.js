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
document.getElementById('jersey-option').onclick = () => {
    window.location.href = "ChooseJersey.html";
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
document.addEventListener("DOMContentLoaded", function () {
    // Load Header
    fetch("header.html")
        .then(response => {
            if (!response.ok) throw new Error("Header file not found");
            return response.text();
        })
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
            attachMenuEvents();
        })
        .catch(error => console.error(error));

    // Load Footer
    fetch("footer.html")
        .then(response => {
            if (!response.ok) throw new Error("Footer file not found");
            return response.text();
        })
        .then(data => {
            document.body.insertAdjacentHTML("beforeend", data);
        })
        .catch(error => console.error(error));
});
