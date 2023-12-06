const startPage = document.getElementById("startPage"); //Hämtar in alla mina HTML-element
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

let playerName = ""; //Håller reda på spelarnamnet
let userScore = 0; //Poängen för användare
let computerScore = 0; //Poäng för dator

const storedPlayerName = localStorage.getItem("playerName"); //Hämtar tidigare sparad data från spelarnamn
const storedUserScore = localStorage.getItem("userScore"); //Hämtar tidigare sparad poäng
const storedComputerScore = localStorage.getItem("computerScore");


playerName = storedPlayerName || ""; //Finns det inget sparat används en tom sträng
userScore = parseInt(storedUserScore) || 0;
computerScore = parseInt(storedComputerScore) || 0;

updateUI();

homeBtn.addEventListener("click", function (event) {
    startPage.style.display = "block";
    gamePage.style.display = "none";

    
    userScore = 0;
    computerScore = 0;

    updateUI();

    localStorage.removeItem("playerName");
    localStorage.removeItem("userScore");
    localStorage.removeItem("computerScore");

    nameForm.reset();
});

startGameBtn.addEventListener("click", function (event) {
    event.preventDefault();
    playerName = document.getElementById("name").value;

    if (!playerName) {
        alert("Skriv in ditt namn");
        return;
    }

    localStorage.setItem("playerName", playerName);

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

        
        localStorage.setItem("userScore", userScore);
        localStorage.setItem("computerScore", computerScore);

        updateUI();
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

function updateUI() {
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;
}


