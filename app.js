let buttons = document.querySelectorAll(".game-btns");
let winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let turnX = true;

let winningTitle = document.querySelector(".winner-declaration");
winningTitle.classList.remove("winner-declaration");

let newGameButton = document.querySelector(".new-game-btn");

let resetGameButton = document.querySelector(".reset-btn");
resetGameButton.addEventListener("click", resetGame);

let winnerFound = false;

buttons.forEach((button) => {
  button.onclick = () => {
    button.style.backgroundColor = "orange";
    if (turnX === true) {
      button.innerText = "X";
      turnX = false;
      button.disabled = true;
    } else {
      button.innerText = "O";
      turnX = true;
      button.disabled = true;
    }
    checkWinner();
  };
});

function checkWinner() {
  
  winningCombinations.forEach((combos) => {
    if (
      buttons[combos[0]].innerText == buttons[combos[1]].innerText &&
      buttons[combos[2]].innerText == buttons[combos[1]].innerText &&
      buttons[combos[1]].innerText === "X"
    ) {
      disableButtons();
      declareWinner("X");
      newGame();
    }
    if (
      buttons[combos[0]].innerText == buttons[combos[1]].innerText &&
      buttons[combos[1]].innerText == buttons[combos[2]].innerText &&
      buttons[combos[2]].innerText === "O"
    ) {
      disableButtons();
      declareWinner("O");
      newGame();
    }

    if (winnerFound === false && [...buttons].every((button) => { return button.innerText !== ""; })) {
      drawMatch();
      newGame();
    }
    
  });
}

function disableButtons() {
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

function declareWinner(winner) {
  winningTitle.classList.add("winner-declaration");
  winningTitle.innerText = `The Winner is ${winner}`;
  winnerFound = true;
}

function resetGame() {
  buttons.forEach((button) => {
    button.disabled = false;
    button.innerText = "";
    button.style.backgroundColor = "#1E3E62";
  });

  newGameButton.addEventListener(
    "click",
    winningTitle.classList.remove("winner-declaration")
  );
  winningTitle.innerText = "";
}

function newGame() {
  newGameButton.addEventListener("click", resetGame);
}

function drawMatch() {
  winningTitle.classList.add("winner-declaration");
  winningTitle.innerText = "Match Draw..!!";
  disableButtons();
}
