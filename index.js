"use strict";

let turn = "⭕";
const gameBoard = [];
for (let i = 0; i < 3; i++) {
  gameBoard.push([]);
  for(let j = 0; j < 3; j++){
    gameBoard[i].push(null);
  }
}
const $table = document.querySelector("table");

const gameResult = () => {
  gameBoard[0].forEach((v,i,arr) => {
      console.log(v,i,arr);
      console.log(arr.length);
  })
}
const clickBoard = (td) => (event) => {
  const $tr = td.parentElement;
  const trId = $tr.id;//===1차원 index
  let tdId;//===2차원 index
  const target = event.target;

  for(let i = 0; i < 3; i++){//2차원 index, tdId값
    if($tr.childNodes[i]===target){
      tdId = i;
    }
  }

  if(target.textContent)return;//칸에 글자가 있나?
    gameBoard[trId][tdId] = turn;
    target.textContent = turn;
  

  gameResult();//승부가 났는가?
  turn === "⭕"? turn = "❌" : turn = "⭕";
}

const createGameBoard = () => {
  for(let i = 0; i < 3; i++){
    const $tr = document.createElement("tr");
    $table.append($tr);
    $table.childNodes[i+1].id = i;
    
    for(let j = 0; j < 3; j++){
      const $td = document.createElement("td");
      $tr.append($td);
      $td.addEventListener('click', clickBoard($td));
    }
  }
}



function init() {
  console.log(gameBoard);
  createGameBoard();
}
init();