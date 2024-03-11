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

// Display of user welcome (exists across all pages)
const playerWelcomeElement = document.querySelector("#user-welcome");
playerName = localStorage.getItem("username") ?? "";
if (playerName) {
    playerWelcomeElement.textContent = "Welcome " + playerName + "!";
} else {
    playerWelcomeElement.textContent = "Welcome!";
}

// Display leaderboard values from local storage
loadDailyScoreboard();
loadAllTimeScoreboard();

// // Reset the daily leaderboard after midnight
// setInterval(function () {
//     let now = new Date();

//     if (!localStorage.getItem("currentMidnight")) {
//         let currentMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
//         localStorage.setItem("currentMidnight", JSON.stringify(currentMidnight.getTime()));
//     }

//     // This will execute when the current time passes the time for midnight that is currently stored in the localStorage
//     if (now.getTime() > JSON.parse(localStorage.getItem("currentMidnight"))) {
//         localStorage.removeItem("dailyScores")

//         let currentMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
//         localStorage.setItem("currentMidnight", JSON.stringify(currentMidnight.getTime()));
//     }
// }, 1000);