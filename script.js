//UPDATE HERE
import { targetOnClick } from "./target/target.js";
import { citizenOnClick } from "./citizen/citizen.js";
import { detectiveOnClick } from "./detective/detective.js";

const ROWS = 8;
const COLS = 8;
// 必须确保num相加=ROWS*COLS
const NUMCONFIG = [1, 43, 20]; //UPDATE HERE
let randomPeople = [targetOnClick, citizenOnClick, detectiveOnClick]; //UPDATE HERE
let notes = ["target", "citizen", "detective"]; //UPDATE HERE
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
          //决定格子的职业
          let roleid = this.drawOne();
          if (roleid == 0) console.log(i, j);
          // 点击事件
          {
            box.onclick = (e) => {
              //减少一次猜测次数
              if (this.chances > 0) {
                this.chances--;
                //开始执行效果
                randomPeople[roleid](e, app);
              }
            };
          }
          // 悬浮框
          {
            var notesName = notes[roleid];
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
