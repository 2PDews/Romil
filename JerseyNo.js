const numberButtons = document.querySelectorAll('.number-btn');
const submitButton = document.querySelector('.submit-btn');

let selectedNumber = null;

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove selection from all buttons
        numberButtons.forEach(btn => btn.classList.remove('selected'));
        // Add selection to the clicked button
        button.classList.add('selected');
        selectedNumber = button.textContent;
    });
});

submitButton.addEventListener('click', () => {
    if (selectedNumber) {
        alert(`You selected number: ${selectedNumber}`);
    } else {
        alert('Please select a number!');
    }
});