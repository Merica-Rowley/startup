// Strings to signal different events
const QuizStartEvent = "quizStart";
const QuizMilestoneEvent = "quizMilestone";
const QuizEndEvent = "quizEnd";

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
    correctAnswer;
    currentImage;
    userAnswer;
    streak;
    answeredCorrectly;
    userName;
    socket;

    constructor() {
        this.correctAnswer = null;
        this.currentImage = null;
        this.userAnswer = null;
        this.streak = 0;
        this.answeredCorrectly = null;
        this.userName = localStorage.getItem("username");
        this.configureWebSocket();
    }

    async pressButton(buttonPressed) {
        if (this.userName) { // ensures that only signed-in users can play the quiz
            this.userAnswer = buttonPressed.textContent
            await this.checkAnswer();
            await this.streakManager();
            if ((this.streak > 0) && (this.streak % 10 === 0)) {
                this.broadcastEvent(this.userName, QuizMilestoneEvent, this.streak);
            }
            this.questionSetUp();
        } else {
            const modalElement = document.querySelector('#errorModal');
            modalElement.querySelector('.modal-body').textContent = 'Please sign in to play!';
            const msgModal = new bootstrap.Modal(modalElement, {});
            msgModal.show();
        }
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

    async streakManager() {
        if (this.answeredCorrectly) {
            this.streak++;
        } else {
            await this.saveScore(); // saves user's score to leaderboard before reseting the streak to 0
            this.streak = 0;
        }
        document.querySelector("#streak").textContent = this.streak;
    }

    async saveScore() {
        if (!(this.streak === 0)) {
            const username = localStorage.getItem("username");
            const score = this.streak;
            this.broadcastEvent(username, QuizEndEvent, score);
            await this.updateScores(username, score, "dailyScores");
            await this.updateScores(username, score, "allTimeScores");
        }
    }

    async updateScores(username, score, scoreboard) {
        const newScoreObject = { username: username, score: score, leaderboard: scoreboard };

        try {
            const response = await fetch('/api/score', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(newScoreObject),
            });

            // Store service response as leaderboard
            const scores = await response.json();
            localStorage.setItem(scoreboard, JSON.stringify(scores));
        }
        catch {
            this.localUpdateLeaderboard(newScoreObject, scoreboard);
        }
    }

    localUpdateLeaderboard(newScoreObject) {
        let scores = [];
        const scoresText = localStorage.getItem(newScoreObject.leaderboard);
        if (scoresText) {
            scores = JSON.parse(scoresText);
        }

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

        localStorage.setItem(newScoreObject.leaderboard, JSON.stringify(scores));
    }

    // WebSocket functions
    configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        this.socket.onopen = async (event) => {
            this.broadcastEvent(this.userName, QuizStartEvent, {});
        }
        this.socket.onmessage = async (event) => {
            const msg = JSON.parse(await event.data.text());
            if (msg.type === QuizStartEvent) {
                this.displayMessage(`${msg.from} just started practicing with flashcards!`);
            }
            else if (msg.type === QuizEndEvent) {
                this.displayMessage(`${msg.from} scored ${msg.value}`);
            }
            else if (msg.type === QuizMilestoneEvent) {
                this.displayMessage(`${msg.from} just reached a streak of ${msg.value}`);
            }
        }

    }

    displayMessage(messageText) {
        const websocketElement = document.querySelector("#websocket-placeholder");
        websocketElement.innerHTML = `<p>${messageText}</p>` + websocketElement.innerHTML;
        while (websocketElement.children.length > 3) {
            websocketElement.removeChild(websocketElement.lastChild);
        }
    }

    broadcastEvent(from, type, value) {
        const event = {
            from: from,
            type: type,
            value: value,
        };
        this.socket.send(JSON.stringify(event));
    }
}

const quiz = new Quiz();
quiz.questionSetUp();
quiz.broadcastEvent(this.userName, QuizStartEvent, {});