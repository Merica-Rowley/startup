const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('musicards');
const userCollection = db.collection('user');
const dailyScoreCollection = db.collection('dailyScores');
const allTimeScoreCollection = db.collection('allTimeScores');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
})().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

// Now defining functions that will be performed on the database

// Returns a user based on their username
function getUser(username) {
    return userCollection.findOne({ username: username });
}

// Returns a user based on their auth token
function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

// Creates a new user with a given username and password and inserts it into the userCollection of the database
async function createUser(username, password) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        username: username,
        password: passwordHash,
        token: uuid.v4(),
    };
    await userCollection.insertOne(user);

    return user;
}

// Inserts a score into both daily and allTime score collections
function addDailyScore(score) {
    dailyScoreCollection.insertOne(score);
}

function addAllTimeScore(score) {
    allTimeScoreCollection.insertOne(score);
}

// Return the top 10 scores from the dailyScoreCollection as an array
function getDailyScores() {
    resetMidnight();
    const query = { score: { $gt: 0, $lt: 900 } };
    const options = {
        sort: { score: -1 },
        limit: 10,
    };
    const cursor = dailyScoreCollection.find(query, options);
    return cursor.toArray();
}

// Return the top 10 scores from the allTimeScoreCollection as an array
function getAllTimeScores() {
    const query = { score: { $gt: 0, $lt: 900 } };
    const options = {
        sort: { score: -1 },
        limit: 10,
    };
    const cursor = allTimeScoreCollection.find(query, options);
    return cursor.toArray();
}

let currentMidnight = new Date();
currentMidnight.setHours(23, 59, 59, 999);

// Used to reset the daily leaderboard after midnight
function resetMidnight() {
    let now = new Date();
    // This will execute when the current time passes the currently stored midnight
    if (now.getTime() > currentMidnight) {
        dailyScoreCollection.deleteMany({})
        currentMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    }
}

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    addDailyScore,
    addAllTimeScore,
    getDailyScores,
    getAllTimeScores
};