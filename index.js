"use strict";

let turn = "⭕";

const gameBoard = [];

const $table = document.querySelector("table");
let winner;
const gameResult = (trId, tdId) => {
  // 승부가 났는가
  if (gameBoard[trId][0] === turn &&
    gameBoard[trId][1] === turn &&
    gameBoard[trId][2] === turn) {
    winner = turn;
  } else if (
    gameBoard[0][tdId] === turn &&
    gameBoard[1][tdId] === turn &&
    gameBoard[2][tdId] === turn) {
    winner = turn;
  } else if (
    gameBoard[0][0] === turn &&
    gameBoard[1][1] === turn &&
    gameBoard[2][2] === turn) {
    winner = turn;
  } else if (
    gameBoard[0][2] === turn &&
    gameBoard[1][1] === turn &&
    gameBoard[2][0] === turn) {
    winner = turn;
  }
  
  gameBoard.forEach((secondArr,i,arr) => {
    secondArr.forEach((v,i,arr) => {//every,some으로 바꿔서 draw값 구하기
      const type = typeof v; 
      console.log(type === 'string');
      
    })
  });
  
}

const clickBoard = (td) => (event) => {
  const $tr = td.parentElement;
  const trId = $tr.id; //===1차원 index
  let tdId; //===2차원 index
  const target = event.target;

  for (let i = 0; i < 3; i++) { //2차원 index, tdId값
    if ($tr.childNodes[i] === target) {
      tdId = i;
    }
  }

  if (target.textContent) return; //칸에 글자가 있나?
  target.textContent = turn; //현재 turn값 칸에 입력
  gameBoard[trId][tdId] = turn;
  gameResult(trId, tdId); //승부가 났는가?
  turn = turn === "⭕" ? "❌" : "⭕"; //turn값 변경
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
      $td.addEventListener('click', clickBoard($td));
    }
    gameBoard.push(row);
  }
}

function init() {
  createGameBoard();
}
init();