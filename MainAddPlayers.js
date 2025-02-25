document.addEventListener("DOMContentLoaded", () => {
    const playerNameInput = document.getElementById("playerNameInput");
    const addPlayerButton = document.getElementById("addPlayerButton");
    const playerList = document.getElementById("playerList");
    const goToTournamentButton = document.getElementById("goToTournamentButton");

    const deletePopup = document.getElementById("deletePopup");
    const deleteMessage = document.getElementById("deleteMessage");
    const confirmationCodeInput = document.getElementById("confirmationCodeInput");
    const confirmDeleteButton = document.getElementById("confirmDeleteButton");
    const cancelDeleteButton = document.getElementById("cancelDeleteButton");

    let players = JSON.parse(localStorage.getItem("players")) || [];
    let playerToDelete = null;
    let confirmationCode = "";

    // Load players from local storage
    function loadPlayers() {
        playerList.innerHTML = "";
        players.forEach((player, index) => addPlayerToList(player, index + 1));
    }

    // Save players to local storage
    function savePlayers() {
        localStorage.setItem("players", JSON.stringify(players));
    }

    // Update player numbering
    function updatePlayerNumbers() {
        Array.from(playerList.children).forEach((listItem, index) => {
            listItem.querySelector(".player-number").textContent = `${index + 1}.`;
        });
    }

    // Generate a 4-digit confirmation code
    function generateUniqueCode() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    // Add player to the list
    function addPlayerToList(playerName, number) {
        const listItem = document.createElement("li");
        listItem.classList.add("player-item");

        const playerInfo = document.createElement("div");
        playerInfo.classList.add("player-info");

        const playerNumber = document.createElement("span");
        playerNumber.classList.add("player-number");
        playerNumber.textContent = `${number}.`;

        const playerNameSpan = document.createElement("span");
        playerNameSpan.classList.add("player-name");
        playerNameSpan.textContent = playerName;

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        // Edit button
        const editButton = document.createElement("button");
        editButton.classList.add("edit-button");
        editButton.innerHTML = '✏️';
        editButton.addEventListener("click", () => {
            const newPlayerName = prompt("Edit Player Name:", playerName);
            if (newPlayerName) {
                players[players.indexOf(playerName)] = newPlayerName.trim();
                savePlayers();
                loadPlayers();
            }
        });

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = '❌';
        deleteButton.addEventListener("click", () => showDeletePopup(playerName));

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
        playerInfo.appendChild(playerNumber);
        playerInfo.appendChild(playerNameSpan);
        listItem.appendChild(playerInfo);
        listItem.appendChild(buttonContainer);
        playerList.appendChild(listItem);

        updatePlayerNumbers();
    }

    // Show delete confirmation popup
    function showDeletePopup(playerName) {
        playerToDelete = playerName;
        confirmationCode = generateUniqueCode();
        deleteMessage.textContent = `Enter the code "${confirmationCode}" to confirm deletion.`;
        deletePopup.style.display = "block";
    }

    // Restrict confirmation code input to numerical values only
    confirmationCodeInput.addEventListener("input", () => {
        confirmationCodeInput.value = confirmationCodeInput.value.replace(/\D/g, "");
    });

    // Confirm deletion
    confirmDeleteButton.addEventListener("click", () => {
        if (confirmationCodeInput.value.trim() === confirmationCode) {
            players = players.filter(player => player !== playerToDelete);
            savePlayers();
            loadPlayers();
            deletePopup.style.display = "none";
            confirmationCodeInput.value = "";
        } else {
            showCustomPopup("Incorrect confirmation code. Try again!");
        }
    });

    // Cancel deletion
    cancelDeleteButton.addEventListener("click", () => {
        deletePopup.style.display = "none";
        confirmationCodeInput.value = "";
    });

    // Add new player
    addPlayerButton.addEventListener("click", () => {
        const playerName = playerNameInput.value.trim();
        if (!playerName) {
            showCustomPopup("⚠️ Please enter a player name!");
            return;
        }
        if (players.includes(playerName)) {
            showCustomPopup("⚠️ Player name already exists!");
            return;
        }
        players.push(playerName);
        savePlayers();
        loadPlayers();
        playerNameInput.value = "";
    });

    // Start tournament validation
    goToTournamentButton.addEventListener("click", () => {
        if (players.length < 2) {
            showCustomPopup("⚠️ At least 2 players are required to start the tournament!");
        } else {
            window.location.href = "tournament.html";
        }
    });

    // Load existing players on page load
    loadPlayers();
});

// Custom cyberpunk-style pop-up
function showCustomPopup(message) {
    let existingPopup = document.querySelector(".custom-popup");
    if (existingPopup) {
        existingPopup.remove();
    }

    const popup = document.createElement("div");
    popup.classList.add("custom-popup");

    const messageText = document.createElement("p");
    messageText.textContent = message;

    const closeButton = document.createElement("button");
    closeButton.classList.add("popup-button");
    closeButton.textContent = "OK";
    closeButton.addEventListener("click", () => {
        document.body.removeChild(popup);
    });

    popup.appendChild(messageText);
    popup.appendChild(closeButton);
    document.body.appendChild(popup);
}
