// const playerWelcomeElement = document.querySelector("#user-welcome");
// playerName = localStorage.getItem("username") ?? "";
// if (playerName) {
//     playerWelcomeElement.textContent = "Welcome " + playerName + "!";
// } else {
//     playerWelcomeElement.textContent = "Welcome!";
// }

// Set "Welcome user!" element in top right
(async () => {
    const playerWelcomeElement = document.querySelector("#user-welcome");
    playerName = localStorage.getItem("username") ?? "";
    if (playerName) {
        playerWelcomeElement.textContent = "Welcome " + playerName + "!";
    } else {
        playerWelcomeElement.textContent = "Welcome!";
    }
})();