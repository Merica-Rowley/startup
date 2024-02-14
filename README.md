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
- **Web service**: Saves scores in database. Retrieves correct answers. Endpoints for login, saving scores, determining correct answers, and submitting answers. Third party service to pull random images to appear on leaderboard page.
- **Authentication**: Securely register and login users. Authentication is required to play the game.
- **Database persistence**: Store login credentials securely in a database. Store user's total (lifetime) and daily number of correct matches.
- **WebSocket**: Broadcast username to other users when they begin a quiz session, e.g. "UserName started practicing with flashcards!"
- **Web framework**: Use React to create components and request routing.

## HTML Deliverable
For this deliverable, I built the structure of my application with HTML.

- HTML Pages: (COMPLETED) Four HTML pages that represent a home/login page, a quiz page, a leaderboard page, and an information (how to) page.
- Use of HTML Tags: (COMPLETED) I used BODY, NAV, MAIN, HEADER, and FOOTER tags in my design.
- Links: (COMPLETED) The navigation bar in the header links each page to the others. Also, when a user logs in, they are automatically sent to the quiz page.
- Textual Content: (COMPLETED) I have added labels for login information, a brief introduction to reading music on the information page, and other content, such as the "streak" counter on the quiz page, throughout the application.
- 3rd Party Service Calls: (COMPLETED) Represented by an image on the leaderboard page (eventually, the service will be called to get a random image for the page).
- Images: (COMPLETED) Images are found on each page (sheet music on home page, labeled staffs on information page, random third party image on leaderboard page, and note image on quiz page).
- Login: (COMPLETED) There are placeholders for the username and password input, as well as buttons to log in or create an account. On each page, the user's name is displayed with "Welcome, Username!"
- Database: (COMPLETED) I have placeholder scores on the leaderboards, eventually, these will be actual scores that come from the database.
- WebSocket: (COMPLETED) On the quiz page, I have inserted placeholder values for data that will be displayed in real-time with WebSocket (i.e. "User52 just started practicing with flashcards!").

## CSS Deliverable
For this deliverable, I styled my application with CSS.

- Prerequisite: (COMPLETED) Simon CSS deployed to your production environment .
- Prerequisite: (COMPLETED) A link to your GitHub startup repository prominently displayed on your application's home page.
- Prerequisite: (COMPLETED) Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. The TAs will only grade things that have been clearly described as being completed. Review the voter app as an example.
- Prerequisite: (COMPLETED) At least 10 git commits spread consistently throughout the assignment period.

- Header, Footer, and Main Content Body: (COMPLETED) I used Bootstrap to style my header (navigation), footer (name and GitHub link), and main content (different for each page) elements of the body element. 
- Navigation Elements: (COMPLETED) The text on my navigation changes color with hover. Also, an oval around the navigation element denotes the active page. 
- Responsive to Window Resizing: (COMPLETED) The site looks good on devices of various dimensions. 
- Application Elements: (COMPLETED) Buttons, images, tables, text, and other elements are styled using Bootstrap. I altered Bootstrap's color scheme for the buttons. Elements are responsive to window resizing.
- Application Text Content: (COMPLETED) Text is displayed from the following font family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif. The text's color is either a very dark blue or a very light blue, depending its contrast with the surrounding elements.
- Application Images: (COMPLETED) The home page is displayed with a background image. The placeholder image for the 3rd party service calls located on the leaderboard page has been styled and is ready to hold images. I resized the images for the information and quiz pages, as well.