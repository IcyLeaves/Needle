import { targetOnClick } from "./target/target.js";
const ROWS = 8;
const COLS = 8;

let targetX = Math.floor(Math.random() * ROWS);
let targetY = Math.floor(Math.random() * COLS);
console.log(targetX, targetY);
function initBoard() {
  let board = document.getElementById("game-board");

  for (let i = 0; i < ROWS; i++) {
    let row = document.createElement("div");
    row.className = "letter-row";

    for (let j = 0; j < COLS; j++) {
      let box = document.createElement("div");
      box.className = "letter-box";
      if (i == targetX && j == targetY) {
        box.onclick = targetOnClick;
      }

      row.appendChild(box);
    }

    board.appendChild(row);
  }
}

initBoard();
