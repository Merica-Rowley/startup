function login() {
    const nameElement = document.querySelector("#usernameInput");
    localStorage.setItem("username", nameElement.value);
    window.location.href("quiz.html");
}

const playerWelcomeElement = document.querySelector("#user-welcome");
playerName = localStorage.getItem("username") ?? "";
playerWelcomeElement.textContent = "Welcome, " + playerName + "!";