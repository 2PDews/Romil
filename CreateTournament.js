// Function to update the character count dynamically
function updateCharCount() {
    const input = document.getElementById("name");
    const charCount = document.getElementById("charCount");
    const maxLength = 40;
    const currentLength = input.value.length;

    // Trim excess characters if the input exceeds the maximum length
    if (currentLength > maxLength) {
        input.value = input.value.substring(0, maxLength);
    }

    // Update the character count display
    charCount.textContent = `${input.value.length}/${maxLength}`;
}

// Function to save the tournament name and navigate to the next page
function saveTournamentName() {
    const tournamentName = document.getElementById("name").value.trim();

    // Validate that the tournament name is not empty
    if (!tournamentName) {
        showCustomPopup("Please add a tournament name!");
        return; // Stop function execution
    }

    // Create a tournament object
    const tournament = {
        name: tournamentName,
        createdAt: new Date().toISOString(),
        players: [] // Players list can be updated later
    };

    // Store the tournament object in localStorage and sessionStorage
    localStorage.setItem("currentTournament", JSON.stringify(tournament));
    sessionStorage.setItem("currentTournament", JSON.stringify(tournament));

    // Determine the selected tournament type
    const tournamentTypeButton = document.getElementById("tournamentTypeButton");
    const selectedType = tournamentTypeButton.querySelector("div").textContent;

    // Redirect based on the selected tournament type
    if (selectedType === "Individual") {
        window.location.href = "AddLeaguePlayers.html";
    } else if (selectedType === "Teams") {
        window.location.href = "AddLeagueTeams.html";
    } else {
        showCustomPopup("Please select a valid tournament type.");
    }
}

// Function to open the popup
function openPopup() {
    document.getElementById("popup").style.display = "block";
}

// Function to close the popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Function to select an option from the popup and update the button texts
function selectOption(option) {
    const tournamentTypeButton = document.getElementById("tournamentTypeButton");
    const nextButton = document.getElementById("next-btn");

    // Update the "Tournament Type" button text
    tournamentTypeButton.querySelector("div").textContent = option;

    // Update the "Continue" button text based on the selected option
    if (option === "Individual") {
        nextButton.innerText = "Select League Players";
    } else if (option === "Teams") {
        nextButton.innerText = "Select League Teams";
    }

    // Close the popup after selection
    closePopup();
}

// Show a custom popup (if needed for alerts)
function showCustomPopup(message) {
    alert(message); // Replace with a custom popup implementation if desired
}