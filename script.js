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

playerName = storedPlayerName || ""; //Värdet för spelarnamnet som hämtas från localStorage
userScore = parseInt(storedUserScore) || 0; //Innehåller värdet för användarens poäng
computerScore = parseInt(storedComputerScore) || 0;

homeBtn.addEventListener("click", function (event) {
  startPage.style.display = "block"; //Visar startsidan
  gamePage.style.display = "none"; //Döljer spelarsidan

  userScore = 0; //Återställer användarens poäng
  computerScore = 0; //Återställer datorns poäng

  localStorage.removeItem("playerName"); //Ta bort spelarnamn från localStorage
  localStorage.removeItem("userScore");//Ta bort användarens poäng från localStorage
  localStorage.removeItem("computerScore");//Ta bort datorns poäng från localStorage

  nameForm.reset();
});

startGameBtn.addEventListener("click", function (event) {
  event.preventDefault();
  playerName = document.getElementById("name").value;//Hämtar värdet i input och tilldelar det till playerName

  if (!playerName) { //Kontrollerar om spelarnamnet är tomt
    alert("Skriv in ditt namn");
    return;
  }

  localStorage.setItem("playerName", playerName); //Sparar spelarnamnet i localStorage för att komma ihåg det mellan sidladdningar

  playerNameDisplay.textContent = `Player: ${playerName}`; //Uppdaterar med det valda användarnamnet
  userLabel.textContent = playerName; //Uppdaterar med det valda användarnamnet
  startPage.style.display = "none"; //Döljer startsidan
  gamePage.style.display = "block"; //Visar spelarsidan
});

choices.forEach((choice) => {
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
updateUI();
