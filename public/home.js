(async () => {
    const playerWelcomeElement = document.querySelector("#user-welcome");
    playerName = localStorage.getItem("username") ?? "";
    if (playerName) {
        playerWelcomeElement.textContent = "Welcome " + playerName + "!";
    } else {
        playerWelcomeElement.textContent = "Welcome!";
    }
})();

function login() {
    const nameElement = document.querySelector("#usernameInput");
    localStorage.setItem("username", nameElement.value);
    window.location.href = 'quiz.html'; // TODO: fix this; doesn't go to quiz.html, not sure why
}

function create() {

}

function logout() {

}

function quiz() {
    window.location.href = 'quiz.html';
}