const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('game-status');
const restartButton = document.getElementById('restart-button');

let isPlayerX = true;
let gameActive = true;

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

function startGame() {
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  isPlayerX = true;
  gameActive = true;
  statusText.textContent = "Player X's turn";
}

function handleClick(e) {
  if (!gameActive) return;

  const cell = e.target;
  const currentClass = isPlayerX ? 'x' : 'o';

  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();

  if (checkWin(currentClass)) {
    statusText.textContent = `Player ${currentClass.toUpperCase()} wins!`;
    gameActive = false;
  } else if ([...cells].every(cell => cell.classList.contains('x') || cell.classList.contains('o'))) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    isPlayerX = !isPlayerX;
    statusText.textContent = `Player ${isPlayerX ? 'X' : 'O'}'s turn`;
  }
}

function checkWin(currentClass) {
  return winningCombos.some(combo => {
    return combo.every(index => cells[index].classList.contains(currentClass));
  });
}

restartButton.addEventListener('click', startGame);

startGame(); // initialize the game
