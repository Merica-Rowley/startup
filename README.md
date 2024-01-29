# Music Flashcards

## Specification Deliverable:

### Elevator Pitch

Do you play a musical instrument? Have you ever wanted to learn? A key component to a successful musician is the ability to read notes from sheet music. Learning to recognize notes on sight is a process that takes time and practice. The Music Flashcards application provides a simple way for users to learn and practice sight reading notes from a musical staff. Users can motivate themselves and their friends to practice as they compete for a spot on the leaderboards. As users use the application, they will grow in their confidence and ability to read sheet music and improve in their musicianship. 

### Design

![Home Page Layout](homepage.png)

Here is the layout of the login page (home page).

![Info Page Layout](infopage.png)

This is the layout of the information page (a basic overview of reading sheet music).

![Quiz Page Layout](quizpage.png)

The quiz page (interactive/game page) will look something similar to this.

![Leaderboard Page Layout](leaderboard.png)

Here is the basic layout of the leaderboard page.

### Key Features

- Quiz mode: Users will be presented with an image of a note on a sheet music staff. They will have four letter-name options to attempt to select the correct answer from. For each correct answer in a row, a user's "streak" will increase. Once a player selects an incorrect answer, their streak will reset.
- Leaderboard: Two leaderboard displays will be shown on the leaderboard page—a daily leaderboard and an all-time leaderboard. Scores are determined by the number of correct matches a user completes in quiz mode (incorrect answers do not lower the score). A user's total number of matches is persistently stored in the database. The daily number of matches is also stored in the database, but is reset every night at midnight.
- Information: A page with basic information on reading a music staff will be available to help users to learn.
- Login: Secure login over HTTPS. 

### Technologies

I will use these technologies in the following ways:

- **HTML**: Correctly use HTML to structure the application. Four HTML pages (home/login, information, quiz, leaderboard).
- **CSS**: Ensure the application looks good on various screen sizes. Apply appropriate styling (color, font, whitespace, etc.).
- **JavaScript**: Keeps track of score. Randomize and display answer choices and ensure that the correct answer is always among the options. Record users' input and determine if answer is correct. Backend endpoint calls.
- **Web service**: Saves scores in database. Retrieves correct answers. Endpoints for login, saving scores, determining correct answers, and submitting answers.
- **Authentication**: Securely register and login users. Authentication is required to play the game.
- **Database persistence**: Store login credentials securely in a database. Store user's total (lifetime) and daily number of correct matches.
- **WebSocket**: Broadcast username to other users when they begin a quiz session, e.g. "UserName started practicing with flashcards!"
- **Web framework**: Use React to create components and request routing.
