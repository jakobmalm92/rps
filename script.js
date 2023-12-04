const startPage = document.getElementById("startPage");
const gamePage = document.getElementById("gamePage");
const nameForm = document.getElementById("nameForm");
const startGameBtn = document.getElementById("startGameBtn");
const playerNameDisplay = document.getElementById("playerName");
const userLabel = document.getElementById("user-label");
const choices = document.querySelectorAll(".choice");
const resultDisplay = document.querySelector(".result");
const userScoreSpan = document.getElementById("user-score");
const computerScoreSpan = document.getElementById("computer-score");
const homeBtn = document.getElementById("homeBtn");

let playerName = "";
let userScore = 0;
let computerScore = 0;

homeBtn.addEventListener("click", function (event) {
    startPage.style.display = "block";
    gamePage.style.display = "none";

    userScore = 0;
    computerScore = 0;
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;
    resultDisplay.textContent = "";
    playerNameDisplay.textContent = "";
    userLabel.textContent = "";

    nameForm.reset();
});

startGameBtn.addEventListener("click", function (event) {
    event.preventDefault();
    playerName = document.getElementById("name").value;

    if (!playerName) {
        alert("Please enter your name before starting the game.");
        return;
    }

    playerNameDisplay.textContent = `Player: ${playerName}`;
    userLabel.textContent = playerName;
    startPage.style.display = "none";
    gamePage.style.display = "block";
});