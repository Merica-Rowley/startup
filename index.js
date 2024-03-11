const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Get Daily Scores
apiRouter.get('/scores/daily', (_req, res) => {
    resetMidnight();
    res.send(dailyScores);
});

// Get All Time Scores
apiRouter.get('/scores/allTime', (_req, res) => {
    res.send(allTimeScores);
});

// SubmitScore
apiRouter.post('/score', (req, res) => {
    if (req.body.leaderboard === "dailyScores") {
        dailyScores = updateLeaderboard(req.body, dailyScores);
        res.send(dailyScores);
    }
    else if (req.body.leaderboard === "allTimeScores") {
        allTimeScores = updateLeaderboard(req.body, allTimeScores);
        res.send(allTimeScores);
    }
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


let dailyScores = [];
let allTimeScores = [];
// let currentMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
let currentMidnight = new Date();
// currentMidnight.setHours(23, 59, 59, 999);
currentMidnight.setHours(12, 48, 0, 0);

function updateLeaderboard(newScoreObject, scores) {
    let found = false;
    for (const [i, prevScore] of scores.entries()) {
        if (newScoreObject.score > prevScore.score) {
            scores.splice(i, 0, newScoreObject);
            found = true;
            break;
        }
    }

    if (!found) {
        scores.push(newScoreObject);
    }

    if (scores.length > 10) {
        scores.length = 10;
    }

    return scores;
}

// Used to reset the daily leaderboard after midnight
function resetMidnight() {
    let now = new Date();
    // This will execute when the current time passes the currently stored midnight
    if (now.getTime() > currentMidnight) {
        dailyScores = [];
        currentMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    }
}