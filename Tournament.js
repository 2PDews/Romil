
// Handle redirection on button clicks
document.getElementById('create-tournament-btn').addEventListener('click', () => {
    window.location.href = 'CreateTournament.html'; // Redirect to Create Tournament page
});

document.getElementById("saved-tournament-btn").addEventListener("click", function() {
    window.location.href = "SaveTournament.html";
});
