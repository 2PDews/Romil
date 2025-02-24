document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("jersey-number");
    const submitButton = document.querySelector(".submit-btn");

    inputField.addEventListener("input", () => {
        inputField.value = inputField.value.replace(/\D/g, ""); // Allow only numbers
    });

    submitButton.addEventListener("click", () => {
        const number = inputField.value;
        if (number.length > 0 && number.length <= 3) {
            alert(`You selected jersey number: ${number}`);
        } else {
            alert("Please enter a valid jersey number (up to 3 digits).");
        }
    });
});