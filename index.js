"use strict";

let turn = "⭕";
const gameBoard = [];
const $table = document.querySelector("table");
const $p = document.querySelector(".js-result");
let clickable = true;

const winnerComesOut = (target) => { //승부가 났나?
  let rowIndex = target.parentNode.rowIndex;
  let cellIndex = target.cellIndex;
  let hasWinner = false;
  // 3칸이 다 채워졌나
  if ( //가로
    gameBoard[rowIndex][0].textContent === turn &&
    gameBoard[rowIndex][1].textContent === turn &&
    gameBoard[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }
  if ( //세로
    gameBoard[0][cellIndex].textContent === turn &&
    gameBoard[1][cellIndex].textContent === turn &&
    gameBoard[2][cellIndex].textContent === turn
  ) {
    hasWinner = true;
  }
  if ( //대각선
    gameBoard[0][0].textContent === turn &&
    gameBoard[1][1].textContent === turn &&
    gameBoard[2][2].textContent === turn
  ) {
    hasWinner = true;
  }
  if ( //대각선2
    gameBoard[0][2].textContent === turn &&
    gameBoard[1][1].textContent === turn &&
    gameBoard[2][0].textContent === turn
  ) {
    hasWinner = true;
  }

  return hasWinner;
}

const haveBlank = () => { //빈칸 여부 draw
  const boardArr = gameBoard.flat();
  const draw = boardArr.every((cell) => cell.textContent);

  return draw;
}

const gameResult = (target) => {
  if (winnerComesOut(target)) { //승자있나
    $p.textContent = turn === "⭕" ? `Win!!` : "LOSE";
    $table.removeEventListener('click', clickBoard);
    return;
  }
  if (haveBlank()) { //무승부인가
    $p.textContent = `Draw`;
    return;
  }
  turn = turn === "⭕" ? "❌" : "⭕"; //turn 넘기기
}

const computerTurn = () => {
  const boardArr = gameBoard.flat();
  const blankArr = boardArr.filter((cell) => !cell.textContent);
  const randomNum = Math.floor(Math.random() * blankArr.length); //0~lenght
  let randomCell;
  setTimeout(() => {
    randomCell = blankArr[randomNum];
    randomCell.textContent = turn;
    gameResult(randomCell);
    clickable = true;
  }, 1000);
}

const clickBoard = (event) => {
  if (!clickable) return;
  const target = event.target;
  if (target.textContent) return; //칸에 글자가 있나?
  target.textContent = turn; //현재 turn값 칸에 입력
  gameResult(target); //승부가 났는가?
  if (turn === "❌") {//computer turn
    clickable = false;
    computerTurn();
  }
}

const createGameBoard = () => { //3x3 배열, 보드 그리기
  for (let i = 0; i < 3; i++) {
    const row = [];
    const $tr = document.createElement("tr");
    $table.append($tr);
    $table.childNodes[i + 1].id = i;

    for (let j = 0; j < 3; j++) {
      const $td = document.createElement("td");
      row.push($td);
      $tr.append($td);
    }
    gameBoard.push(row);
  }
}

function init() {
  createGameBoard();
  if (clickable) {
    $table.addEventListener('click', clickBoard);
  }
}
init();