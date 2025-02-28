// Theme Toggle Function
document.getElementById("themeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

// Load Saved Theme
window.onload = function () {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
};

// Reset Settings
document.getElementById("resetBtn").addEventListener("click", function () {
    localStorage.clear();
    alert("Settings Reset!");
    location.reload();
});
