function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors']
  const i = Math.floor(Math.random() * choices.length)
  return choices[i]
}

for (i = 0; i < 10; i++) {
  console.log(getComputerChoice())  
}