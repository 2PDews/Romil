// Wait for the DOM to fully load before attaching event listeners
document.addEventListener("DOMContentLoaded", function () {
    
    // Get the button elements
    const createTournamentBtn = document.getElementById("create-tournament-btn");
    const savedTournamentBtn = document.getElementById("saved-tournament-btn");

    // Check if elements exist before adding event listeners
    if (createTournamentBtn) {
        createTournamentBtn.addEventListener("click", function () {
            window.location.href = "CreateTournament.html"; // Redirect to Create Tournament page
        });
    } else {
        console.error("Create Tournament button not found!");
    }

    if (savedTournamentBtn) {
        savedTournamentBtn.addEventListener("click", function () {
            window.location.href = "SaveTournament.html"; // Redirect to Saved Tournaments page
        });
    } else {
        console.error("Saved Tournament button not found!");
    }
});
