const body = document.querySelector("body");
const board = document.querySelector(".board");
let move = 0;
let boardItem = Array(9).fill(null);

const checkWin = () => {
  const winningCombo = [
    [0, 4, 8],
    [0, 3, 6],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]];

  let win = false;

  winningCombo.forEach(combo => {
    const chkArr = combo.map(index => boardItem[index]);
    if (chkArr[0] !== null && chkArr.every(value => value === chkArr[0])){
      win = true;
      if (chkArr[0] === "X"){
        displayWinner("X");
      } else {
        displayWinner("O");
      }
    } 
  });

  if (!win && boardItem.every(value => value !== null)) {
    displayWinner("Draw");
  }
}

const displayWinner = (winner) => {
  const popUp = document.createElement("dialog");
  popUp.classList.add("pop");

  const message = document.createElement("h2");
  message.innerHTML = winner === "Draw" ? "It's a Draw!" : `Player ${winner} Wins!`;
  popUp.appendChild(message);

  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "Close";
  closeBtn.addEventListener("click", () => {
    popUp.close();
    location.reload();
  });
  popUp.appendChild(closeBtn);

  body.appendChild(popUp);
  popUp.showModal();
}

const drawBoard = () => {

  const circle = "./images/circle.svg";
  const cross = "./images/cross.svg";
  const sec = 9;

  for(let i = 0; i < sec; i++){
    const cell = document.createElement("button");
    cell.classList.add("cell");
    board.append(cell);

    cell.addEventListener("click", () => {
      if (boardItem[i] === null){
        if ((move === 0 || move % 2 === 0) && move < 9){
          cell.innerHTML = `<img src="${cross}">`;
          boardItem[i] = "X";
        } 
        else if (move < 9) {
          cell.innerHTML = `<img src="${circle}">`;
          boardItem[i] = "O";
        }
        move++;
        checkWin();
      }
    })
  }

  const restart = document.createElement("div");
  restart.classList.add("restart-btn");
  restart.innerHTML = "RESTART";

  restart.addEventListener("click", () => RESTART())

  const RESTART = () => {
    boardItem = Array(9).fill(null);
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
      cell.innerHTML = "";
    })
  }

  body.append(restart);
  body.append(board);
}
drawBoard();