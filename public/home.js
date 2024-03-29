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

        const navElement = document.querySelector('#navigationMenu');
        navElement.innerHTML = `
                            <li class="nav-item"><a class="nav-link active" href="index.html">Home</a></li>
                            <li class="nav-item"><a class="nav-link" href="quiz.html">Quiz</a></li>
                            <li class="nav-item"><a class="nav-link" href="scores.html">Scores</a></li>
                            <li class="nav-item"><a class="nav-link" href="info.html">Info</a></li>`;

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
        const modalElement = document.querySelector('#errorModal');
        modalElement.querySelector('.modal-body').textContent = `${body.msg}`;
        const msgModal = new bootstrap.Modal(modalElement, {});
        msgModal.show();
    }
}

function logout() {
    localStorage.removeItem('username');
    fetch('/api/logout', {
        method: 'delete'
    }).then(() => (window.location.href = 'index.html'));
}

function quiz() {
    window.location.href = 'quiz.html';
}