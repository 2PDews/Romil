document.addEventListener("DOMContentLoaded", () => {
    const playerNameInput = document.getElementById("playerNameInput");
    const addPlayerButton = document.getElementById("addPlayerButton");
    const playerList = document.getElementById("playerList");

    const deletePopup = document.getElementById("deletePopup");
    const deleteMessage = document.getElementById("deleteMessage");
    const confirmationCodeInput = document.getElementById("confirmationCodeInput");
    const confirmDeleteButton = document.getElementById("confirmDeleteButton");
    const cancelDeleteButton = document.getElementById("cancelDeleteButton");

    let playerToDelete = null;
    let confirmationCode = "";
    let currentPlayerNameSpan = null;

    // Create Edit Pop-up dynamically
    const editPopup = document.createElement("div");
    editPopup.classList.add("edit-popup");
    editPopup.innerHTML = `
        <h3>Edit Player Name</h3>
        <input type="text" id="editPlayerInput" placeholder="Enter new name">
        <br>
        <button class="save-edit" id="saveEditButton">Save</button>
        <button class="cancel-edit" id="cancelEditButton">Cancel</button>
    `;
    document.body.appendChild(editPopup);

    function showEditPopup(playerSpan) {
        currentPlayerNameSpan = playerSpan;
        document.getElementById("editPlayerInput").value = playerSpan.textContent;
        editPopup.style.display = "block";
        document.body.classList.add("blur-background"); // Apply blur to background
    }

    function hideEditPopup() {
        editPopup.style.display = "none";
        document.body.classList.remove("blur-background");
    }

    document.getElementById("saveEditButton").addEventListener("click", () => {
        const newPlayerName = document.getElementById("editPlayerInput").value.trim();
        if (newPlayerName && currentPlayerNameSpan) {
            currentPlayerNameSpan.textContent = newPlayerName;
            savePlayers();
            hideEditPopup();
        } else {
            alert("Please enter a valid name!");
        }
    });

    document.getElementById("cancelEditButton").addEventListener("click", hideEditPopup);

    // Load players from local storage
    function loadPlayers() {
        const storedPlayers = JSON.parse(localStorage.getItem("players")) || [];
        storedPlayers.forEach(player => addPlayerToList(player));
        updatePlayerNumbers(); // Ensure numbering is correct after loading
    }

    // Save players to local storage
    function savePlayers() {
        const players = Array.from(playerList.children).map(listItem => 
            listItem.querySelector(".player-name").textContent
        );
        localStorage.setItem("players", JSON.stringify(players));
    }

    // Function to generate a 4-digit code
    function generateUniqueCode() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    // Update player numbering
    function updatePlayerNumbers() {
        const players = playerList.children;
        Array.from(players).forEach((listItem, index) => {
            listItem.querySelector(".player-number").textContent = `${index + 1}.`;
        });
    }

    // Add player to the list
    function addPlayerToList(playerName) {
        const listItem = document.createElement("li");
        listItem.classList.add("player-item");

        // Create container for number and name
        const playerInfo = document.createElement("div");
        playerInfo.classList.add("player-info");

        // Player number
        const playerNumber = document.createElement("span");
        playerNumber.classList.add("player-number");

        // Player name
        const playerNameSpan = document.createElement("span");
        playerNameSpan.classList.add("player-name");
        playerNameSpan.textContent = playerName;

        // Button container (edit & delete in one row)
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        // Edit button
        const editButton = document.createElement("button");
        editButton.classList.add("edit-button");
        editButton.innerHTML = '<span class="edit-icon">✏️</span>';
        editButton.addEventListener("click", () => showEditPopup(playerNameSpan));

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = '❌';
        deleteButton.addEventListener("click", () => showDeletePopup(listItem));

        // Append buttons to the button container
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);

        // Append number and name inside player info div
        playerInfo.appendChild(playerNumber);
        playerInfo.appendChild(playerNameSpan);

        // Append everything to list item
        listItem.appendChild(playerInfo);
        listItem.appendChild(buttonContainer);

        playerList.appendChild(listItem);
        updatePlayerNumbers(); // Update numbering after adding a player
    }

    // Show delete confirmation popup
    function showDeletePopup(listItem) {
        playerToDelete = listItem;
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
        const enteredCode = confirmationCodeInput.value.trim();
        if (enteredCode === confirmationCode) {
            playerList.removeChild(playerToDelete);
            playerToDelete = null;
            confirmationCode = "";
            deletePopup.style.display = "none";
            confirmationCodeInput.value = "";
            savePlayers(); 
            updatePlayerNumbers(); // Update numbering after deletion
        } else {
            alert("Incorrect confirmation code. Try again.");
        }
    });

    // Cancel deletion
    cancelDeleteButton.addEventListener("click", () => {
        playerToDelete = null;
        confirmationCode = "";
        deletePopup.style.display = "none";
        confirmationCodeInput.value = "";
    });

    // Add new player
    addPlayerButton.addEventListener("click", () => {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            addPlayerToList(playerName); 
            savePlayers(); 
            playerNameInput.value = "";  
        } else {
            alert("Please enter a player name!");
        }
    });

    // Load existing players on page load
    loadPlayers();
});
