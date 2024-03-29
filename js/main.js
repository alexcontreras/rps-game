const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');
const scoreboard = {
  player: 0,
  computer: 0
};

// Play game
function play(e) {
  restart.style.display = 'inline-block';
  const playerChoice = e.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);

  showWinner(winner, computerChoice);
}

// Get computer's choice
function getComputerChoice() {
  const rand = Math.random();

  if(rand < 0.34) {
    return 'rock';
  } else if (rand <= 0.67) {
    return 'paper';
  } else {
    return 'scissors';
  }
}

// Get game winner
function getWinner(p, c) {
  if (p === c) { // draw
    return 'draw';
  } else if (p == 'rock') {
    if (c === 'paper') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'paper') {
    if (c === 'scissors') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'scissors') {
    if (c === 'rock') {
      return 'computer';
    } else {
      return 'player';
    }
  }
}

function showWinner(winner, computerChoice) {
  if (winner === 'player') {
    // increment player score
    scoreboard.player++;

    // show modal result
    result.innerHTML = `
      <h1 class="text-win">You Win!</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer chose <strong>${computerChoice.toUpperCase()}</strong></p>
    `;
  } else if (winner === 'computer') {
    // increment player score
    scoreboard.computer++;

    // show modal result
    result.innerHTML = `
      <h1 class="text-lose">You lose!</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer chose <strong>${computerChoice.toUpperCase()}</strong></p>
    `;
  } else {
    // show modal result
    result.innerHTML = `
      <h1>Draw!</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer chose <strong>${computerChoice.toUpperCase()}</strong></p>
    `;
  }

  // Show score
  score.innerHTML = `
    <p>Player: ${scoreboard.player}</p>
    <p>Computer: ${scoreboard.computer}</p>
  `;

  modal.style.display = 'block';
}

// restart game
function restartGame() {
  scoreboard.player = 0;
  scoreboard.computer = 0;
  score.innerHTML = `
    <p>Player: 0</p>
    <p>Computer: 0</p>
  `;
}

// clear modal
function clearModal(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

// Event listeners
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);