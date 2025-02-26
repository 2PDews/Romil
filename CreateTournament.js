// Updates the character count dynamically
/*function updateCharCount() {
    const nameInput = document.getElementById('name');
    const charCount = document.getElementById('charCount');
    charCount.textContent = `${nameInput.value.length}/40`;
}

// Saves the tournament name to localStorage and navigates to the next page


 function UpdateCharCount() {
            const charCount = document.getElementById('name').value.length;
            document.getElementById('charCount').textContent = `${charCount}/40`;
        }

        // Save tournament name to localStorage and redirect

        // JavaScript for CreateTournament.js
        function saveTournamentName() {
            const tournamentName = document.getElementById("name").value.trim();
            
            if (tournamentName === "") {
              alert("Tournament name is required!");
              return; // Prevent navigation
            }
            
            // Store the tournament name (if required)
            localStorage.setItem("currentTournamentName", tournamentName);
            sessionStorage.setItem("currentTournamentName", tournamentName);
            
            // Redirect to the next page
            window.location.href = "SelectFormat.html";
          }
          
*/
// Updates the character count dynamically
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

    // Redirect to the next page
    window.location.href = "AddLeaguePlayers.html";
}

// Function to retrieve and log the tournament data
function getTournament() {
    const tournament = JSON.parse(
        localStorage.getItem("currentTournament") || sessionStorage.getItem("currentTournament")
    );

    if (tournament) {
        console.log("Tournament:", tournament);
    } else {
        console.log("No tournament found.");
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

// Function to update button text based on selection
function selectOption(type) {
    let nextButton = document.getElementById("next-btn");

    if (type === "Teams") {
        nextButton.innerText = "Select Teams";
    } else if (type === "Individual") {
        nextButton.innerText = "Select League Players";
    }

    // Close the popup after selection
    closePopup();
}


// Select an option from the popup and update the button text
function selectOption(option) {
    const tournamentTypeButton = document.getElementById("tournamentTypeButton");
    tournamentTypeButton.querySelector("div").textContent = option; // Update the button text
    closePopup();
}

// Show a custom popup (if needed for alerts)
function showCustomPopup(message) {
    alert(message); // Replace with a custom popup implementation if desired
}