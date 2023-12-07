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
const resetBtn = document.getElementById("resetBtn");

let playerName = ""; //Håller reda på spelarnamnet
let userScore = 0; //Poängen för användare
let computerScore = 0; //Poäng för dator

const storedPlayerName = localStorage.getItem("playerName"); //Hämtar tidigare sparad data från spelarnamn
const storedUserScore = localStorage.getItem("userScore"); //Hämtar tidigare sparad poäng
const storedComputerScore = localStorage.getItem("computerScore");

playerName = storedPlayerName || ""; //Värdet för spelarnamnet som hämtas från localStorage
userScore = parseInt(storedUserScore) || 0; //Innehåller värdet för användarens poäng
computerScore = parseInt(storedComputerScore) || 0;


//HEM-KNAPP FÖR NY ANVÄNDARE
homeBtn.addEventListener("click", function (event) {
  setTimeout(function () {
    startPage.style.display = "block"; //Visar startsidan
    gamePage.style.display = "none"; //Döljer spelarsidan
    resultDisplay.textContent = "";

    userScore = 0; //Återställer användarens poäng
    computerScore = 0; //Återställer datorns poäng

    localStorage.removeItem("playerName"); //Ta bort spelarnamn från localStorage
    localStorage.removeItem("userScore"); //Ta bort användarens poäng från localStorage
    localStorage.removeItem("computerScore"); //Ta bort datorns poäng från localStorage

    nameForm.reset();

    updateUI(); //Uppdaterar UI

    gamePage.classList.remove("hidden");
    startPage.classList.add("hidden");
  }, 100);
});

//STARTA SPEL KNAPP
startGameBtn.addEventListener("click", function (event) {
  event.preventDefault();
  playerName = document.getElementById("name").value; //Hämtar värdet i input och tilldelar det till playerName

  if (!playerName) {
    //Kontrollerar om spelarnamnet är tomt
    alert("Skriv in ditt namn");
    return;
  }

  localStorage.setItem("playerName", playerName); //Sparar spelarnamnet i localStorage för att komma ihåg det mellan sidladdningar
  playerNameDisplay.textContent = `Player: ${playerName}`; //Uppdaterar med det valda användarnamnet
  userLabel.textContent = playerName; //Uppdaterar med det valda användarnamnet

  startPage.style.display = "none"; //Döljer startsidan
  gamePage.style.display = "block"; //Visar spelarsidan
});



resetBtn.addEventListener("click", function () {
  // Nollställ poäng och uppdatera localStorage
  userScore = 0;
  computerScore = 0;
  localStorage.setItem("userScore", userScore);
  localStorage.setItem("computerScore", computerScore);

  resultDisplay.textContent = "";
  

  // Uppdatera UI
  updateUI();
});

choices.forEach((choice) => {
  choice.addEventListener("click", function () {
    console.log("Choice clicked");
    const playerChoice = choice.id; //Hämtar id för det val användaren klickade på
    const computerChoice = getComputerChoice(); //Datorns slummässiga val och tilldelar det åt computerChoice
    const result = winner(playerChoice, computerChoice); //Hämtar resultat från användare och dator och tilldelar resultat
    resultDisplay.textContent = "";
    resultDisplay.textContent = result; //Uppdaterar resultatet från användare och dator och tilldelar resultat

    if (result.includes("vann")) {
      //Uppdaterar användarens och datorns poäng beroende för resultat
      userScore++;
    } else if (result.includes("förlorade")) {
      computerScore++;
    }

    localStorage.setItem("userScore", userScore); //Sparar användarens poäng i localStorage
    localStorage.setItem("computerScore", computerScore); //Sparar datorns poäng i localStorage

    updateUI(); //Uppdaterar med dem nya poängen
  });
});

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"]; //Dem olika möjliga valen för datorn
  const randomIndex = Math.floor(Math.random() * choices.length); //Hämtar slummässiga val från datorn
  return choices[randomIndex]; //Retunerar slummässiga val från datorn
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
  //Uppdaterar poängen på webbsidan
  userScoreSpan.textContent = userScore;
  computerScoreSpan.textContent = computerScore;
}
updateUI();
