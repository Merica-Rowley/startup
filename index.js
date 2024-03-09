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

// GetScores
apiRouter.get('/scores', (_req, res) => {
    res.send(scores);
});

// SubmitScore
apiRouter.post('/score', (req, res) => {
    // scoreObject = JSON.parse(req.body);
    scoreObject = req.body;

    if (scoreObject.leaderboard === "dailyScores") {
        dailyScores = updateLeaderboard(req.body, dailyScores);
        res.send(dailyScores);
    }
    else if (scoreObject.leaderboard === "allTimeScores") {
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