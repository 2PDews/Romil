document.addEventListener("DOMContentLoaded", function () {
    let numberInput = document.getElementById("numberInput");
    let errorMessage = document.createElement("div");
    errorMessage.id = "error-message";
    errorMessage.classList.add("error-message");
    errorMessage.textContent = "Please enter a valid jersey number!";
    numberInput.parentNode.insertBefore(errorMessage, numberInput.nextSibling);
    errorMessage.style.display = "none"; // Initially hidden

    // Allow only numbers & limit to 3 digits
    numberInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").slice(0, 3);
    });

    function displayJersey() {
        let jerseyNumber = numberInput.value.trim();
        let jerseyDisplay = document.getElementById("jerseyDisplay");
        let jerseyNumberSpan = document.getElementById("jerseyNumber");

        // Validation: Show error if empty or 0
        if (jerseyNumber === "" || isNaN(jerseyNumber) || Number(jerseyNumber) < 1) {
            errorMessage.style.display = "block";
            jerseyDisplay.style.display = "none"; // Hide display if error
            return;
        }

        // Hide error if input is valid
        errorMessage.style.display = "none";

        // Display jersey number
        jerseyNumberSpan.textContent = jerseyNumber;
        jerseyDisplay.style.display = "block";

        // Smooth fade-in animation
        jerseyDisplay.style.opacity = "0";
        setTimeout(() => {
            jerseyDisplay.style.opacity = "1";
            jerseyDisplay.style.transition = "opacity 0.5s ease-in-out";
        }, 100);
    }

    // Function to go back to the previous page
    function goBack() {
        window.history.back();
    }

    // Expose functions globally
    window.displayJersey = displayJersey;
    window.goBack = goBack;
});
