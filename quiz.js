const playerWelcomeElement = document.querySelector("#user-welcome");
playerName = localStorage.getItem("username") ?? "";
playerWelcomeElement.textContent = "Welcome " + playerName + "!";