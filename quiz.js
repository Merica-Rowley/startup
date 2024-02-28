// 26 possible images
const answerKey = [
    { image: "Bass A3.png", answer: "A" },
    { image: "Bass A4.png", answer: "A" },
    { image: "Bass B3.png", answer: "B" },
    { image: "Bass B4.png", answer: "B" },
    { image: "Bass C3.png", answer: "C" },
    { image: "Bass C4.png", answer: "C" },
    { image: "Bass D3.png", answer: "D" },
    { image: "Bass E2.png", answer: "E" },
    { image: "Bass E3.png", answer: "E" },
    { image: "Bass F2.png", answer: "F" },
    { image: "Bass F3.png", answer: "F" },
    { image: "Bass G2.png", answer: "G" },
    { image: "Bass G3.png", answer: "G" },
    { image: "Treble - A5.png", answer: "A" },
    { image: "Treble - A6.png", answer: "A" },
    { image: "Treble - B5.png", answer: "B" },
    { image: "Treble - C4.png", answer: "C" },
    { image: "Treble - C5.png", answer: "C" },
    { image: "Treble - D4.png", answer: "D" },
    { image: "Treble - D5.png", answer: "D" },
    { image: "Treble - E4.png", answer: "E" },
    { image: "Treble - E5.png", answer: "E" },
    { image: "Treble - F4.png", answer: "F" },
    { image: "Treble - F5.png", answer: "F" },
    { image: "Treble - G4.png", answer: "G" },
    { image: "Treble - G5.png", answer: "G" },
];

const possibleButtons = ["A", "B", "C", "D", "E", "F", "G"];

class Quiz {
    allowUser;
    correctAnswer;
    currentImage;
    userAnswer;
    streak;
    answeredCorrectly;

    constructor() {
        this.allowUser = false;
        this.correctAnswer = null;
        this.currentImage = null;
        this.userAnswer = null;
        this.streak = 0;
        this.answeredCorrectly = null;
    }

    async pressButton(buttonPressed) {
        this.userAnswer = buttonPressed.textContent
        await this.checkAnswer();
        this.streakManager();
        this.questionSetUp();
    }

    changeBorderColor(color) {
        document.getElementById("image-border").style.backgroundColor = color;
    }

    async checkAnswer() {
        return new Promise((resolve) => {
            if (this.userAnswer === this.correctAnswer) {
                this.answeredCorrectly = true;
                this.changeBorderColor("#007700")
                setTimeout(() => this.changeBorderColor("#012b48"), 250);
            }
            else {
                this.answeredCorrectly = false;
                this.changeBorderColor("#770000")
                setTimeout(() => this.changeBorderColor("#012b48"), 250);
            }
            resolve(true);
        })
    }

    populateButtons() {
        let buttonAssignment = [false, false, false, false]

        let correctButtonIndex = Math.floor(Math.random() * 4);
        // Assign button at correctButtonIndex with the correct answer label
        buttonAssignment[correctButtonIndex] = true;

        document.getElementById(`button_${correctButtonIndex + 1}`).textContent = this.correctAnswer;

        // Assign other buttons, check to ensure no duplicate values are used
        let availableValues = possibleButtons.filter(x => x != this.correctAnswer);

        for (let i = 0; i < 4; i++) {
            if (!buttonAssignment[i]) {
                let buttonValueIndex = Math.floor(Math.random() * availableValues.length);
                document.getElementById(`button_${i + 1}`).textContent = availableValues[buttonValueIndex];
                availableValues.splice(buttonValueIndex, 1);
            }
        }
    }

    questionSetUp() {
        let answerIndex = Math.floor(Math.random() * 26);
        this.currentImage = answerKey[answerIndex].image;
        this.correctAnswer = answerKey[answerIndex].answer;
        document.querySelector("#quiz-image").setAttribute("src", (`site_images/quiz_notes/${quiz.currentImage}`));
        this.populateButtons();
    }

    streakManager() {
        if (this.answeredCorrectly) {
            this.streak++;
        } else {
            this.saveScore(); // saves user's score to leaderboard (if applicable) before reseting the streak to 0
            this.streak = 0;
        }
        document.querySelector("#streak").textContent = this.streak;
    }

    saveScore() {
        if (!this.streak === 0) {
            const username = localStorage.getItem("username");

            this.updateScores(username, "dailyScores");
            this.updateScores(username, "allTimeScores");
        }
    }

    updateScores(username, scoreboard) {
        let scores = [];
        const scoresText = localStorage.getItem(scoreboard);
        if (scoresText) {
            scores = JSON.parse(scoresText);
        }
        scores = this.updateLeaderboard(username, this.streak, scores);

        localStorage.setItem(scoreboard, JSON.stringify(scores));
    }

    updateLeaderboard(username, score, scores) {
        const newScore = { username: username, score: score };

        let found = false;
        for (const [i, prevScore] of scores.entries()) {
            if (score > prevScore.score) {
                scores.splice(i, 0, newScore);
                found = true;
                break;
            }
        }

        if (!found) {
            scores.push(newScore);
        }

        if (scores.length > 10) {
            scores.length = 10;
        }

        return scores;
    }
}

const quiz = new Quiz();
quiz.questionSetUp();

const playerWelcomeElement = document.querySelector("#user-welcome");
playerName = localStorage.getItem("username") ?? "";
playerWelcomeElement.textContent = "Welcome " + playerName + "!";

// WEBSOCKET PLACEHOLDER CONTENT
