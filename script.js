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
    startPage.style.display = "block"; //Visas
    gamePage.style.display = "none"; //Göms

    userScore = 0;
    computerScore = 0;
    userScoreSpan.textContent = userScore; //Nollställer spelet vid ny omgång
    computerScoreSpan.textContent = computerScore; //Nollställer spelet vid ny omgång
    resultDisplay.textContent = "";
    playerNameDisplay.textContent = "";
    userLabel.textContent = "";

    nameForm.reset(); //Återställer alla inmatade värden till 0
});

startGameBtn.addEventListener("click", function (event) {
    event.preventDefault();
    playerName = document.getElementById("name").value;

    if (!playerName) {
        alert("Skriv in ditt namn");
        return;
    }

    playerNameDisplay.textContent = `Player: ${playerName}`;
    userLabel.textContent = playerName;
    startPage.style.display = "none";
    gamePage.style.display = "block";
});

choices.forEach(choice => {
    choice.addEventListener("click", function () {
        const playerChoice = choice.id;
        const computerChoice = getComputerChoice();
        const result = winner(playerChoice, computerChoice);
        resultDisplay.textContent = result;

        if (result.includes("vann")) {
            userScore++;
        } else if (result.includes("förlorade")) {
            computerScore++;
        }

        userScoreSpan.textContent = userScore;
        computerScoreSpan.textContent = computerScore;
    });
});

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function winner(player, computer) {
    if (player === computer) {
        return "Oavgjort!";
    } else if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "Du vann!";
    } else {
        return "Du förlorade!";
    }
}

