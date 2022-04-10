//UPDATE HERE
import { targetOnClick } from "./target/target.js";
import { citizenOnClick } from "./citizen/citizen.js";
import { detectiveOnClick } from "./detective/detective.js";
import { jamOnClick, jamCheck } from "./jam/jam.js";
const ROWS = 8;
const COLS = 8;
// 必须确保num相加=ROWS*COLS
const NUMCONFIG = [1, 43, 15, 5]; //UPDATE HERE
let randomPeople = [
  targetOnClick,
  citizenOnClick,
  detectiveOnClick,
  jamOnClick,
]; //UPDATE HERE
let notes = ["target", "citizen", "detective", "jam"]; //UPDATE HERE
let swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};
var app = new Vue({
  el: "#app",
  data: {
    chances: 16,
    decks: [],
    boxArray: [],
  },
  methods: {
    initDeck() {
      //生成洗牌数组
      this.decks = [];
      for (var i = 0; i < NUMCONFIG.length; i++) {
        for (var j = 0; j < NUMCONFIG[i]; j++) {
          this.decks.push(i);
        }
      }
    },
    drawOne() {
      var n = this.decks.length;
      var i = Math.floor(Math.random() * this.decks.length);
      swap(this.decks, i, n - 1);
      return this.decks.pop();
    },
    initBoard() {
      let board = document.getElementById("game-board");

      for (let i = 0; i < ROWS; i++) {
        let row = document.createElement("div");
        row.className = "letter-row";
        let boxRow = [];
        for (let j = 0; j < COLS; j++) {
          let box = document.createElement("div");
          box.className = "letter-box";
          // box.setAttribute("data-i", i);
          // box.setAttribute("data-j", j);
          //决定格子的职业
          let roleid = this.drawOne();
          // if (roleid == 0) console.log("target", i, j);
          if (roleid == 3) {
            // console.log("jam", i, j);
            box.jamUnshow = true;
          }
          // 点击事件
          {
            var that = this.boxArray;
            box.onclick = (e) => {
              //减少一次猜测次数
              if (this.chances > 0) {
                this.chances--;
                //[干扰者]
                if (!that[i][j].jammed && jamCheck(e, that, i, j)) {
                  that[i][j].jammed = true;
                  box.children[1].style.display = "inline";
                  return;
                }
                that[i][j].jammed = false;
                box.children[1].style.display = "none";
                //开始执行效果
                randomPeople[roleid](e, app, i, j);
              }
            };
          }
          // 悬浮框
          {
            var notesName = notes[roleid];
            let roleContent = document
              .getElementById(notesName)
              .cloneNode(true);
            let jamSign = document.getElementById("jam-sign").cloneNode(true);
            let jamNotes = document.getElementById("jam-notes").cloneNode(true);

            var timer = null;
            roleContent.setAttribute("id", `${notesName}-${i}-${j}`);
            box.appendChild(roleContent);
            box.appendChild(jamSign);
            box.appendChild(jamNotes);
            box.onmouseenter = function () {
              if (box.classList.length > 1) {
                //增加延迟事件
                timer = setTimeout(function () {
                  box.children[0].style.display = "flex";
                }, 1000);
              }
              if (box.jammed) {
                //[干扰者]
                timer = setTimeout(function () {
                  box.children[2].style.display = "flex";
                }, 1000);
              }
            };
            box.onmouseleave = function () {
              box.children[0].style.display = "none";
              box.children[2].style.display = "none";
              clearTimeout(timer);
            };
          }
          row.appendChild(box);
          boxRow.push(box);
        }

        board.appendChild(row);
        this.boxArray.push(boxRow);
      }
    },
  },
  mounted: function () {
    this.initDeck();
    this.initBoard();
  },
});
