document.addEventListener("DOMContentLoaded", () => {
    const availablePlayersList = document.getElementById("availablePlayersList");
    const selectedPlayersList = document.getElementById("selectedPlayersList");

    let selectedPlayers = JSON.parse(localStorage.getItem("selectedPlayers")) || [];
    let availablePlayers = JSON.parse(localStorage.getItem("players")) || [];

    // Load the available players from localStorage
    function loadAvailablePlayers() {
        availablePlayersList.innerHTML = "";

        availablePlayers.forEach(player => {
            if (!selectedPlayers.includes(player)) {
                const li = document.createElement("li");
                li.innerHTML = `<span class="player-name">${player}</span> 
                                <button class="select-button">Select</button>`;
                li.querySelector(".select-button").addEventListener("click", () => selectPlayer(player, li));
                availablePlayersList.appendChild(li);
            }
        });
    }

    // Select player and move to the selected list
    function selectPlayer(playerName, listItem) {
        selectedPlayers.push(playerName);
        availablePlayersList.removeChild(listItem);
        renderSelectedPlayers();
        localStorage.setItem("selectedPlayers", JSON.stringify(selectedPlayers));
    }

    // Remove player from selected list
    function removePlayer(playerName) {
        selectedPlayers = selectedPlayers.filter(player => player !== playerName);
        renderSelectedPlayers();
        loadAvailablePlayers(); // Reload available players
        localStorage.setItem("selectedPlayers", JSON.stringify(selectedPlayers));
    }

    // Render selected players
    function renderSelectedPlayers() {
        selectedPlayersList.innerHTML = "";
        selectedPlayers.forEach(player => {
            const li = document.createElement("li");
            li.innerHTML = `<span class="player-name">${player}</span> 
                            <button class="remove-button">Remove</button>`;
            li.querySelector(".remove-button").addEventListener("click", () => removePlayer(player));
            selectedPlayersList.appendChild(li);
        });
    }

    // Handle the next button click to proceed
    document.querySelector(".next-button").addEventListener("click", () => {
        if (selectedPlayers.length > 0) {
            localStorage.setItem("selectedPlayers", JSON.stringify(selectedPlayers));
            window.location.href = "SelectFormat.html"; // Redirect to the shuffle page
        } else {
            showCustomPopup("Please select at least one player before proceeding.");
        }
    });

    // Load the tournament name if it's set in sessionStorage
    window.onload = function () {
        const tournamentName = sessionStorage.getItem("tournamentName");
        if (tournamentName) {
            document.getElementById("tournamentInput").value = tournamentName;
        }
    };

    // Initial load and render of available and selected players
    loadAvailablePlayers();
    renderSelectedPlayers();

    // Check if there are no players and redirect
    let players = JSON.parse(localStorage.getItem("MainAddPlayers")) || [];
    if (players.length === 0) {
        showCustomPopup("No players found! Redirecting to MainAddPlayers...", () => {
            window.location.href = "MainAddPlayers.html"; // Redirect to MainAddPlayers
        });
    }
});

// Function to display a custom pop-up with neon styling
function showCustomPopup(message, callback = null) {
    const popup = document.createElement("div");
    popup.className = "custom-popup";
    popup.innerHTML = `
        <p>${message}</p>
        <button class="popup-button">OK</button>
    `;
    document.body.appendChild(popup);

    document.querySelector(".popup-button").addEventListener("click", () => {
        popup.remove();
        if (callback) callback(); // Execute callback if provided (e.g., redirect)
    });
}
