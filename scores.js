function loadDailyScoreboard() {
    let dailyScores = [];
    const dailyScoresText = localStorage.getItem("dailyScores");
    if (dailyScoresText) {
        dailyScores = JSON.parse(dailyScoresText);
    }

    const dailyScoresTableElement = document.querySelector("#daily-leaders");

    if (dailyScores.length) {
        for (const [i, score] of dailyScores.entries()) {
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

            dailyScoresTableElement.appendChild(tableRowElement);
        }
    } else {
        dailyScoresTableElement.innerHTML = "<tr>No one has scored yet!</tr>";
    }
}

function loadAllTimeScoreboard() {
    let allTimeScores = [];
    const allTimeScoresText = localStorage.getItem("allTimeScores");
    if (allTimeScoresText) {
        allTimeScores = JSON.parse(allTimeScoresText);
    }

    const allTimeScoresTableElement = document.querySelector("#all-time-leaders");

    if (allTimeScores.length) {
        for (const [i, score] of allTimeScores.entries()) {
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

            allTimeScoresTableElement.appendChild(tableRowElement);
        }
    } else {
        allTimeScoresTableElement.innerHTML = "<tr>No one has scored yet!</tr>";
    }
}

// function resetDailyBoard() {
//     localStorage.removeItem("dailyScores");
//     // localStorage.setItem("dailyScores", "");
// }

// Display of user welcome (exists across all pages)
const playerWelcomeElement = document.querySelector("#user-welcome");
playerName = localStorage.getItem("username") ?? "";
playerWelcomeElement.textContent = "Welcome " + playerName + "!";

// Display leaderboard values from local storage
loadDailyScoreboard();
loadAllTimeScoreboard();

// Reset the daily leaderboard at 23:59
setInterval(function () {
    let now = new Date();

    if (now.getTime() > JSON.parse(localStorage.getItem("currentMidnight"))) {
        localStorage.removeItem("dailyScores")

        let currentMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
        localStorage.setItem("currentMidnight", JSON.stringify(currentMidnight.getTime()));
    }
}, 1000);
