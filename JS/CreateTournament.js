document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const nextButton = document.getElementById("next-btn");
    const tournamentTypeButton = document.getElementById("tournamentTypeButton").querySelector("div"); // Get the inner div text
    const tournamentNameInput = document.getElementById("name");
    const charCount = document.getElementById("charCount");
    const maxLength = 40;
    
    let selectedType = null; // Stores selected tournament type

    // Initially hide the next button
    nextButton.style.display = "none";

    // Function to update character count dynamically
    tournamentNameInput.addEventListener("input", () => {
        let currentLength = tournamentNameInput.value.length;

        // Trim excess characters if input exceeds the maximum length
        if (currentLength > maxLength) {
            tournamentNameInput.value = tournamentNameInput.value.substring(0, maxLength);
            currentLength = maxLength;
        }

        // Update the character count display
        charCount.textContent = `${currentLength}/${maxLength}`;
    });

    // Function to open the tournament type selection popup
    window.openPopup = () => {
        popup.style.display = "block";
    };

    // Function to close the popup
    window.closePopup = () => {
        popup.style.display = "none";
    };

    // Function to select an option from the popup
    window.selectOption = (type) => {
        selectedType = type;
        closePopup();

        // Update "Tournament Type" button text
        tournamentTypeButton.textContent = type;

        // Enable and update next button text
        nextButton.style.display = "block";
        nextButton.textContent = type === "Individual" ? "Select League Players" : "Select League Teams";
    };

    // Function to save the tournament name and navigate to the appropriate page
    window.saveTournamentName = () => {
        const tournamentName = tournamentNameInput.value.trim();

        // Validate that the tournament name is not empty
        if (!tournamentName) {
            showCustomPopup("Please add a tournament name!");
            return;
        }

        // Validate that the tournament type is selected
        if (!selectedType) {
            showCustomPopup("Please select a tournament type first!");
            return;
        }

        // Create a tournament object
        const tournament = {
            name: tournamentName,
            type: selectedType,
            createdAt: new Date().toISOString(),
            players: [] // Players list can be updated later
        };

        // Store tournament data in localStorage
        localStorage.setItem("currentTournament", JSON.stringify(tournament));
        sessionStorage.setItem("currentTournament", JSON.stringify(tournament));

        // Redirect based on the selected tournament type
        window.location.href = selectedType === "Individual" ? "AddLeaguePlayers.html" : "AddLeagueTeams.html";
    };

    // Function to show a custom alert (can be replaced with a modal if needed)
    function showCustomPopup(message) {
        alert(message); // Replace with a styled modal popup if needed
    }
});
