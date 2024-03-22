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

// Show or hide login/create or play/logout buttons
(async () => {
    const username = localStorage.getItem('username');
    if (username) {
        const loginFormElement = document.querySelector('#login-form');
        if (loginFormElement) {
            loginFormElement.style.display = 'none';
        }

        const playButtonsElement = document.querySelector('#play-buttons');
        if (playButtonsElement) {
            playButtonsElement.style.display = 'block';
        }
    } else {
        const loginFormElement = document.querySelector('#login-form');
        if (loginFormElement) {
            loginFormElement.style.display = 'block';
        }

        const playButtonsElement = document.querySelector('#play-buttons');
        if (playButtonsElement) {
            playButtonsElement.style.display = 'none';
        }
    }
})();

async function login() {
    loginOrCreate('/api/login');
}

async function create() {
    loginOrCreate('/api/create');
}

async function loginOrCreate(endpoint) {
    const username = document.querySelector('#usernameInput')?.value;
    const password = document.querySelector('#passwordInput')?.value;
    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ username: username, password: password }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });

    if (response.ok) {
        localStorage.setItem('username', username);
        window.location.href = 'quiz.html';
    } else {
        const body = await response.json();
        const modalEl = document.querySelector('#msgModal');
        modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
        const msgModal = new bootstrap.Modal(modalEl, {});
        msgModal.show();
    }
}

function logout() {
    localStorage.removeItem('username');
    fetch('/api/logout', {
        method: 'delete'
    }).then(() => (window.href.location = 'index.html'));
}

function quiz() {
    window.location.href = 'quiz.html';
}