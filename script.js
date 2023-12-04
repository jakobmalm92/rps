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