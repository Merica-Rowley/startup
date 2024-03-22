const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

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
apiRouter.get('/scores/daily', async (_req, res) => {
    // resetMidnight(); // moved midnight functionality to database.js
    const dailyScores = await DB.getDailyScores();
    res.send(dailyScores);
});

// Get All Time Scores
apiRouter.get('/scores/allTime', async (_req, res) => {
    const allTimeScores = await DB.getAllTimeScores();
    res.send(allTimeScores);
});

// SubmitScore
apiRouter.post('/score', async (req, res) => {
    const newScore = {
        username: req.body.username,
        score: req.body.score
    }

    if (req.body.leaderboard === "dailyScores") {
        // const dailyScores = updateLeaderboard(req.body, dailyScores);
        await DB.addDailyScore(newScore);
        const dailyScores = await DB.getDailyScores();
        res.send(dailyScores);
    }
    else if (req.body.leaderboard === "allTimeScores") {
        // const allTimeScores = updateLeaderboard(req.body, allTimeScores);
        await DB.addAllTimeScore(newScore);
        const allTimeScores = await DB.getAllTimeScores();
        res.send(allTimeScores);
    }
});

// Create user

// Login user

// Logout user


// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// _-_-__-_-___-_-_-_--__-_--_--_-__-----__-_-__-____-__

/*

let dailyScores = [];
let allTimeScores = [];
// Moved midnight reset to database
// let currentMidnight = new Date();
// currentMidnight.setHours(23, 59, 59, 999);

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

*/

// Moved to database.js
// // Used to reset the daily leaderboard after midnight
// function resetMidnight() {
//     let now = new Date();
//     // This will execute when the current time passes the currently stored midnight
//     if (now.getTime() > currentMidnight) {
//         dailyScores = [];
//         currentMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
//     }
// }