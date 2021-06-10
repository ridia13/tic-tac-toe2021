"use strict";

let turn = "⭕";

const gameBoard = [];

const $table = document.querySelector("table");

const gameResult = () => {
  gameBoard.forEach((v, i, arr) => {
    const every = gameBoard[i].every((v, index, arr) => {
      console.log(v);
    });
    // console.log(every);
  })
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
  gameBoard[trId][tdId] = turn;
  target.textContent = turn;

  gameResult(); //승부가 났는가?
  turn === "⭕" ? turn = "❌" : turn = "⭕";
}

const createGameBoard = () => {//3x3 배열, 보드 그리기
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
  console.log(gameBoard);
}
init();