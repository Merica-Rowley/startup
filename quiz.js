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

    changeButtonColor(color) {
        document.getElementById("image-border").style.backgroundColor = color;
    }

    async checkAnswer() {
        return new Promise((resolve) => {
            if (this.userAnswer === this.correctAnswer) {
                this.answeredCorrectly = true;
                this.changeButtonColor("#007700")
                setTimeout(() => this.changeButtonColor("#012b48"), 250);
            }
            else {
                this.answeredCorrectly = false;
                this.changeButtonColor("#770000")
                setTimeout(() => this.changeButtonColor("#012b48"), 250);
            }
            resolve(true);
        })
    }

    populateButtons() {
        console.log("populating buttons");
    }

    questionSetUp() {
        let answerIndex = Math.floor(Math.random() * 26);
        this.currentImage = answerKey[answerIndex].image;
        this.correctAnswer = answerKey[answerIndex].answer;
        document.querySelector("#quiz-image").setAttribute("src", (`site_images/quiz_notes/${quiz.currentImage}`));
        this.populateButtons();
    }

    streakManager() {
        if (this.answeredCorrectly) this.streak++;
        else {
            this.streak = 0;
            // update database with new streak
        }
        document.querySelector("#streak").textContent = this.streak;
    }
}

const quiz = new Quiz();
quiz.questionSetUp();


const playerWelcomeElement = document.querySelector("#user-welcome");
playerName = localStorage.getItem("username") ?? "";
playerWelcomeElement.textContent = "Welcome " + playerName + "!";

// INSERT WEBSOCKET PLACEHOLDER CODE HERE