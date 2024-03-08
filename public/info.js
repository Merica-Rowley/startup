const playerWelcomeElement = document.querySelector("#user-welcome");
playerName = localStorage.getItem("username") ?? "";
if (playerName) {
    playerWelcomeElement.textContent = "Welcome " + playerName + "!";
} else {
    playerWelcomeElement.textContent = "Welcome!";
}