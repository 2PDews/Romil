document.getElementById("numberInput").addEventListener("input", function (e) {
    // Remove non-numeric characters and limit to 3 digits
    this.value = this.value.replace(/\D/g, "").slice(0, 3);
});

function isNumberKey(event) {
    let charCode = event.which ? event.which : event.keyCode;
    return charCode >= 48 && charCode <= 57; // Only allow numbers (0-9)
}

function displayJersey() {
    let numberInput = document.getElementById("numberInput").value.trim();

    if (numberInput === "" || isNaN(numberInput) || parseInt(numberInput) < 0) {
        alert("Please enter a valid jersey number (0-999).");
        return;
    }

    localStorage.setItem("playerJerseyNumber", numberInput);
    document.getElementById("jerseyNumber").innerText = numberInput;
    
    let displaySection = document.getElementById("jerseyDisplay");
    displaySection.style.display = "block";

    // Smooth fade-in animation
    displaySection.style.opacity = "0";
    setTimeout(() => {
        displaySection.style.opacity = "1";
        displaySection.style.transition = "opacity 0.5s ease-in-out";
    }, 100);
}

function goBack() {
    window.history.back();
}
