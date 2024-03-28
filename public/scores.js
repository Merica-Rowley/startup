async function loadDailyScoreboard() {
    let dailyScores = [];
    try {
        // Get the latest high scores from the service
        const response = await fetch('/api/scores/daily');
        dailyScores = await response.json();

        // Save the scores in case we go offline in the future
        localStorage.setItem('dailyScores', JSON.stringify(dailyScores));
    } catch {
        // If there was an error then just use the last saved scores
        const dailyScoresText = localStorage.getItem('dailyScores');
        if (dailyScoresText) {
            dailyScores = JSON.parse(dailyScoresText);
        }
    }

    const dailyScoresTableElement = document.querySelector("#daily-leaders");

    displayTable(dailyScores, dailyScoresTableElement);
}

async function loadAllTimeScoreboard() {
    let allTimeScores = [];

    try {
        // Get the latest high scores from the service
        const response = await fetch('/api/scores/allTime');
        allTimeScores = await response.json();

        // Save the scores in case we go offline in the future
        localStorage.setItem('allTimeScores', JSON.stringify(allTimeScores));
    } catch {
        // If there was an error then just use the last saved scores
        const allTimeScoresText = localStorage.getItem("allTimeScores");
        if (allTimeScoresText) {
            allTimeScores = JSON.parse(allTimeScoresText);
        }
    }

    const allTimeScoresTableElement = document.querySelector("#all-time-leaders");

    displayTable(allTimeScores, allTimeScoresTableElement);
}

function displayTable(scores, tableElement) {
    if (scores.length) {
        for (const [i, score] of scores.entries()) {
            const rankTableDataElement = document.createElement('td');
            const nameTableDataElement = document.createElement('td');
            const scoreTableDataElement = document.createElement('td');

            rankTableDataElement.textContent = i + 1;
            nameTableDataElement.textContent = score.username;
            scoreTableDataElement.textContent = score.score;

            const tableRowElement = document.createElement('tr');
            tableRowElement.appendChild(rankTableDataElement);
            tableRowElement.appendChild(nameTableDataElement);
            tableRowElement.appendChild(scoreTableDataElement);

            tableElement.appendChild(tableRowElement);
        }
    } else {
        tableElement.innerHTML = "<tr>No one has scored yet!</tr>";
    }
}

// Display random image
function displayImage() {
    const random = Math.floor(Math.random() * 1000);
    // Gets a random page between page 0 and 1000 with one image on it
    fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
        .then((response) => response.json())
        .then((data) => {
            const containerEl = document.querySelector('#thirdpartypicture');

            const width = containerEl.offsetWidth;
            const height = containerEl.offsetHeight;

            const imgUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}`;
            const imgEl = document.createElement('img');
            imgEl.setAttribute('src', imgUrl);
            imgEl.setAttribute('class', "image-fluid rounded-5");
            containerEl.appendChild(imgEl);
        });
}

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

// Load and display leaderboard values
loadDailyScoreboard();
loadAllTimeScoreboard();
displayImage();