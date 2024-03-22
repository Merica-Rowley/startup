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
const midnightCollection = db.collection('midnight');

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
    resetDailyScores()
    const query = { score: { $gt: 0 } };
    const options = {
        sort: { score: -1 },
        limit: 10,
    };
    const cursor = dailyScoreCollection.find(query, options);
    return cursor.toArray();
}

// Return the top 10 scores from the allTimeScoreCollection as an array
function getAllTimeScores() {
    const query = { score: { $gt: 0 } };
    const options = {
        sort: { score: -1 },
        limit: 10,
    };
    const cursor = allTimeScoreCollection.find(query, options);
    return cursor.toArray();
}

// Functions to help reset the daily leaderboard at midnight
function setMidnight(newMidnight) {
    midnightCollection.deleteMany({});
    midnightCollection.insertOne({ midnight: newMidnight });
}

async function getMidnight() {
    const cursor = midnightCollection.find();
    const midnightArray = await cursor.toArray();

    if (midnightArray.length == 0) {
        let currentMidnight = new Date(Date.now());
        currentMidnight.setUTCHours(23, 59, 59, 999);
        await setMidnight(currentMidnight);
        return currentMidnight;
    }

    return midnightArray[0].midnight;
}

// Used to reset the daily leaderboard after midnight
async function resetDailyScores() {
    let now = new Date(Date.now());
    let currentMidnight = await getMidnight();
    // This will execute when the current time passes the currently stored midnight
    if (now.getTime() > currentMidnight.getTime()) {
        dailyScoreCollection.deleteMany({})
        const newMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
        setMidnight(newMidnight);
    }
}

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    addDailyScore,
    addAllTimeScore,
    getDailyScores,
    getAllTimeScores,
    setMidnight
};