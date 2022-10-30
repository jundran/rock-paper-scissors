"use strict"
/********** DOM NODES **********/
const topInfoText = document.querySelector('.top-info-text')
const resetButton = document.querySelector('.reset-button')
const selectionButtonsContainer = document.querySelector('.selection-buttons')
const selectionButtons = document.querySelectorAll('.selection-buttons button')
const roundMessage = document.querySelector('.round-message')

/********** GAME STATE VARIABLES **********/
const scoreToWin = 5
let roundNumber = 1
const score = {
  player: 0,
  computer: 0
}
const scoreText = {
  player: document.querySelector('.player-score').childNodes[1],
  computer: document.querySelector('.computer-score').childNodes[1]
}

/********** EVENT LISTENERS **********/
function setupEventListeners() {
  selectionButtons.forEach(button => button.addEventListener('click', handleRound))
  resetButton.addEventListener('click', handleResetButton)
}

/********** FUNCTIONS **********/
function endGame() {
  let winner = Object.keys(score).filter(key => score[key] === scoreToWin)[0]
  topInfoText.textContent = `Game over. ${winner.toUpperCase()} won the game!`

  selectionButtonsContainer.classList.add("hidden")
  resetButton.classList.remove("hidden")
}

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"]
  return choices[Math.floor(Math.random() * choices.length)]
}

function handleResetButton() {
  // Reset classes
  selectionButtonsContainer.classList.remove("hidden")
  resetButton.classList.add("hidden")

  // Reset variables
  Object.keys(score).forEach(key => score[key] = 0)
  roundNumber = 1

  // Reset UI
  Object.keys(scoreText).forEach(key => scoreText[key].textContent = 0)
  roundMessage.textContent = ""
  topInfoText.textContent = `Round 1`
}

function handleRound(e) {
  const round = playRound(e.target.className, getComputerChoice())
  if(round.winner) scoreText[round.winner].textContent = ++score[round.winner]
  roundMessage.textContent = round.message

  if(score[round.winner] === scoreToWin) endGame()
  else topInfoText.textContent = `Round ${++roundNumber}`
}

function playRound(playerChoice, computerChoice) {
  const LOGIC = {
    rock: "Rock smashes scissors.",
    paper: "Paper covers rock.",
    scissors: "Scissors cut paper."
  }

  let winner, message

  if (playerChoice === computerChoice) {
    winner = null
    message = `It's a draw. Both you and the computer chose ${playerChoice}.`
  }
  else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    winner = "player"
    message =  `You win! ${LOGIC[playerChoice]}`
  }
  else {
    winner = "computer"
    message =  `You lose. ${LOGIC[computerChoice]}`
  }

  return { winner, message }
}

// Entry point
setupEventListeners()
