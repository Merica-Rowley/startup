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

class Quiz {
    allowUser;
    correctAnswer;
    currentImage;
    userAnswer;
    streak;

    constructor() {
        this.allowUser = false;
        this.correctAnswer = null;
        this.currentImage = null;
        this.userAnswer = null;
        this.streak = 0;
    }

    checkAnswer() {

    }

    questionSetUp() {
        let answerIndex = Math.floor(Math.random() * 26);
        this.currentImage = answerKey[answerIndex].image;
        this.correctAnswer = answerKey[answerIndex].answer;
        document.querySelector("#quiz-image").setAttribute("src", this.currentImage);
    }

    populateButtons(answer) {

    }

    streakManager(answeredCorrectly) {
        if (answeredCorrectly) streak++;
        else {
            streak = 0;
            // update database with new streak
        }
    }
}

quiz = new Quiz();

quiz.questionSetUp();

document.querySelector("#quiz-image").setAttribute("src", (`site_images/quiz_notes/${quiz.currentImage}`));

const possibleButtons = ["A", "B", "C", "D", "E", "F", "G"];

const playerWelcomeElement = document.querySelector("#user-welcome");
playerName = localStorage.getItem("username") ?? "";
playerWelcomeElement.textContent = "Welcome " + playerName + "!";

// INSERT WEBSOCKET PLACEHOLDER CODE HERE