import { targetOnClick } from "./target/target.js";
import { citizenOnClick } from "./citizen/citizen.js";
const ROWS = 8;
const COLS = 8;

let targetX = Math.floor(Math.random() * ROWS);
let targetY = Math.floor(Math.random() * COLS);
console.log(targetX, targetY);
let randomPeople = [citizenOnClick];
let notes = ["citizen"];

function initBoard() {
  let board = document.getElementById("game-board");

  for (let i = 0; i < ROWS; i++) {
    let row = document.createElement("div");
    row.className = "letter-row";

    for (let j = 0; j < COLS; j++) {
      let box = document.createElement("div");
      box.className = "letter-box";
      //决定格子的职业
      let roleid = Math.floor(Math.random() * randomPeople.length);
      if (i == targetX && j == targetY) {
        roleid = -1;
      }
      // 点击事件
      box.onclick = roleid == -1 ? targetOnClick : randomPeople[roleid];
      // 悬浮框
      var notesName = roleid == -1 ? "target" : notes[roleid];
      let content = document.getElementById(notesName).cloneNode(true);
      var timer = null;
      content.setAttribute("id", `${notesName}-${i}-${j}`);
      box.appendChild(content);
      box.onmouseenter = function () {
        if (box.classList.length > 1) {
          //增加延迟事件
          timer = setTimeout(function () {
            box.children[0].style.display = "flex";
          }, 1500);
        }
      };
      box.onmouseleave = function () {
        box.children[0].style.display = "none";
        clearTimeout(timer);
      };
      row.appendChild(box);
    }

    board.appendChild(row);
  }
}

initBoard();
