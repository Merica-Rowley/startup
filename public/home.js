(async () => {
    const playerWelcomeElement = document.querySelector("#user-welcome");
    playerName = localStorage.getItem("username") ?? "";
    if (playerName) {
        playerWelcomeElement.textContent = "Welcome " + playerName + "!";
    } else {
        playerWelcomeElement.textContent = "Welcome!";
    }
})();

(async () => {
    const username = localStorage.getItem('username');
    if (username) {
        const loginFormElement = document.querySelector("#login-form");
        if (loginFormElement) {
            loginFormElement.style.display = 'none';
        }

        const playButtonsElement = document.querySelector("#play-buttons");
        if (playButtonsElement) {
            playButtonsElement.style.display = 'block';
        }
    } else {
        const loginFormElement = document.querySelector("#login-form");
        if (loginFormElement) {
            loginFormElement.style.display = 'block';
        }

        const playButtonsElement = document.querySelector("#play-buttons");
        if (playButtonsElement) {
            playButtonsElement.style.display = 'none';
        }
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
    localStorage.removeItem('username');
}

function quiz() {
    window.location.href = 'quiz.html';
}