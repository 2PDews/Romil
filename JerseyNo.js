document.getElementById("numberInput").addEventListener("input", function (e) {
    this.value = this.value.replace(/\D/g, ""); // Remove non-numeric characters
});

function displayJersey() {
    let numberInput = document.getElementById("numberInput").value.trim();

    if (numberInput === "" || isNaN(numberInput) || parseInt(numberInput) < 0) {
        alert("Please enter a valid jersey number.");
        return;
    }

    localStorage.setItem("playerJerseyNumber", numberInput);
    document.getElementById("jerseyNumber").innerText = numberInput;
    document.getElementById("jerseyDisplay").style.display = "block";
}

function goBack() {
    window.history.back();
}