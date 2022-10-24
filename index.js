"use strict"
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"]
  return choices[Math.floor(Math.random() * choices.length)]
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

function game() {
  const score = {
    player: 0,
    computer: 0
  }
  
  // Play game
  for (let i = 0; i < 5; i++) {
    // Get user input
    let playerChoice = null
    while (!playerChoice) {
      const p = prompt("Choose your weapon: rock, paper or scissors.")
      const userInput = p && p.trim().toLowerCase()
      if (!["rock", "paper", "scissors"].includes(userInput)) console.log("Invalid input. Try again.")
      else playerChoice = userInput
    }

    // Play round
    const round = playRound(playerChoice, getComputerChoice())
    if (round.winner) score[round.winner]++
    console.log(`Round ${i+1}: ${round.message}`)
  }

  // Game over - print results
  if (score.player === score.computer) {
    console.log("Game over. It was a draw.")
  }
  else {
    const winner = score.player > score.computer ? "You" : "The computer"
    console.log(`Game over. ${winner} won the game!`)
  }
  console.log(`Score: [Player: ${score.player}] [Computer: ${score.computer}]`)
}

game()
