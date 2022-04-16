import * as COMMON from "./_common/common.js";
//UPDATE HERE
import { targetOnClick } from "./target/target.js";
import { citizenOnClick } from "./citizen/citizen.js";
import { detectiveOnClick } from "./detective/detective.js";
import { jamOnClick, jamCheck } from "./jam/jam.js";
import { crazyOnClick } from "./crazy/crazy.js";
import { sheriffOnClick, sheriffCheck } from "./sheriff/sheriff.js";
import { killerOnClick, killerCountDown } from "./killer/killer.js";
import { augurOnClick, augurInit } from "./augur/augur.js";
import { volunteerOnClick, volunteerCheck } from "./volunteer/volunteer.js";
import { copiesOnClick } from "./copies/copies.js";
const ROWS = 8;
const COLS = 8;
// 必须确保num相加=ROWS*COLS
const NUMCONFIG = [1, 26, 15, 5, 3, 3, 3, 3, 3, 2]; //UPDATE HERE
let randomPeople = [
  targetOnClick,
  citizenOnClick,
  detectiveOnClick,
  jamOnClick,
  crazyOnClick,
  sheriffOnClick,
  killerOnClick,
  augurOnClick,
  volunteerOnClick,
  copiesOnClick,
]; //UPDATE HERE
let notes = [
  "target",
  "citizen",
  "detective",
  "jam",
  "crazy",
  "sheriff",
  "killer",
  "augur",
  "volunteer",
  "copies",
]; //UPDATE HERE
var app = new Vue({
  el: "#app",
  data: {
    chances: 16,
    infos: [],
    decks: [],
    boxArray: [],
    isGameOver: -1,
    //[疯子]
    isLastDark: false,
    //[杀手]
    killers: [],
    killerSigns: ["", "1️⃣", "2️⃣", "3️⃣"],
    currKillerTimer: 2,
    //[占卜师]
    augurDecks: [],
    SUNS: [0, 1, 2, 5, 7, 8], //UPDATE HERE
    MOONS: [3, 4, 6, 9], //UPDATE HERE
    //[替身]
    copiesArrow: ["↖️", "⬆️", "↗️", "⬅️", "", "➡️", "↙️", "⬇️", "↘️"],
    copiesTeam: [],
    copiesCurr: undefined,
  },
  methods: {
    gameover() {
      this.renderOverBoard();
    },
    renderOverBoard() {
      for (var i = 0; i < ROWS; i++) {
        for (var j = 0; j < COLS; j++) {
          if (!this.boxArray[i][j].shown) {
            var box =
              document.getElementById("game-board").children[i].children[j];
            box.classList.add(notes[this.boxArray[i][j].roleid]);
            box.classList.add("over");
          }
        }
      }
    },

    clearInfo() {
      var infos = document.getElementById("infos");
      infos.innerHTML = "";
    },
    addInfo(key) {
      var roleDiv = document.getElementById(key).cloneNode(true);
      roleDiv.setAttribute("id", `${key}-clone`);

      var infos = document.getElementById("infos");
      infos.appendChild(roleDiv);
    },
    refreshInfos(box) {
      this.clearInfo();
      for (var key in box.infos) {
        this.addInfo(key);
      }
    },
    deleteSign(i, j) {
      var signDiv = document.getElementById(`sign-${i}-${j}`);
      signDiv.innerHTML = "";
    },
    addSign(key, i, j) {
      var signDiv = document.getElementById(`sign-${i}-${j}`);
      var sign = document.getElementById(key).cloneNode(true);
      signDiv.appendChild(sign);
    },
    refreshSigns(i, j) {
      this.deleteSign(i, j);
      for (var key in this.boxArray[i][j].signs) {
        this.addSign(key, i, j);
      }
    },
    initDeck() {
      //生成洗牌数组
      this.decks = [];
      for (var i = 0; i < NUMCONFIG.length; i++) {
        for (var j = 0; j < NUMCONFIG[i]; j++) {
          this.decks.push(i);
        }
      }
    },
    drawBoard() {
      let board = document.getElementById("game-board");
      board.setAttribute(
        "style",
        `width:calc(${COLS} * 3rem + ${COLS} * 8px);`
      );
    },
    initBoard() {
      let board = document.getElementById("game-board");

      for (let i = 0; i < ROWS; i++) {
        let row = document.createElement("div");
        row.className = "letter-row";
        let boxRow = [];
        for (let j = 0; j < COLS; j++) {
          let box = document.createElement("div");
          box.i = i;
          box.j = j;
          box.infos = {};
          box.signs = {};
          box.className = "letter-box";
          // box.setAttribute("data-i", i);
          // box.setAttribute("data-j", j);
          //决定格子的职业
          let roleid = COMMON.withdraw(this.decks);
          box.roleid = roleid;
          if (roleid != 1) {
            if (roleid == 0) console.warn(notes[roleid], i, j);
            else console.log(notes[roleid], i, j);
          }

          if (roleid == 9) this.copiesTeam.push(COMMON.setPair(i, j));
          // 点击事件
          {
            var that = this.boxArray;
            box.onclick = (e, context, ii, jj) => {
              if (!ii) ii = e.currentTarget.i;
              if (!jj) jj = e.currentTarget.j;
              //减少一次猜测次数
              if (!this.boxArray[ii][jj].shown && this.chances > 0) {
                this.chances--;
                killerCountDown(app, this.refreshSigns); //[杀手]
                //[干扰者]
                if (!that[ii][jj].signs["jammed"] && jamCheck(app, box)) {
                  that[ii][jj].signs["jammed"] = true;
                  that[ii][jj].infos["jam-notes"] = true;
                  this.isLastDark = false;
                } else {
                  delete that[ii][jj].signs["jammed"];
                  delete that[ii][jj].infos["jam-notes"];
                  //[警长]
                  sheriffCheck(app, box);
                  //开始执行效果
                  randomPeople[roleid](e, app, ii, jj);
                  this.boxArray[ii][jj].shown = true;
                }
                //[志愿者]
                volunteerCheck(app, box);
                this.refreshInfos(box);
                this.refreshSigns(ii, jj);
              }
              if (this.chances == 0) this.isGameOver = 0;
              if (this.isGameOver != -1) {
                this.gameover();
              }
            };
          }
          // 孩子节点
          {
            var signDiv = `<div id='sign-${i}-${j}' style='display:flex;align-items:center;justify-content:center;'></div>`;
            box.innerHTML += signDiv;
            //悬浮框
            // {
            //   var notesName = notes[roleid];
            //   let roleContent = document
            //     .getElementById(notesName)
            //     .cloneNode(true);
            //   roleContent.setAttribute("id", `${notesName}-${i}-${j}`);
            //   box.appendChild(roleContent);
            // }
            //干扰标志
            // {
            //   let jamSign = document.getElementById("jam-sign").cloneNode(true);
            //   box.appendChild(jamSign);
            // }
            // //干扰说明
            // {
            //   let jamNotes = document
            //     .getElementById("jam-notes")
            //     .cloneNode(true);
            //   box.appendChild(jamNotes);
            // }
          }
          //信息展示事件
          {
            box.onmouseenter = () => {
              this.currKillerTimer = box.killerTimer;
              this.refreshInfos(box);
            };
            box.onmouseleave = () => {
              this.clearInfo();
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
    this.drawBoard();
    this.initBoard();

    this.augurDecks = augurInit(ROWS, COLS);
  },
});
window.vue = app;
