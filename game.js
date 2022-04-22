import * as COMMON from "./_common/common.js";
import { collectAwards, ACHIEVE, ALLAWARDS } from "./_common/award.js";
import * as MyCookies from "./_common/cookie.js";
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
const NUMCONFIG = [1, 24, 15, 5, 3, 5, 3, 3, 3, 2]; //UPDATE HERE
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
// https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
var gifImages = [];

// gif.addFrame(c);
// gif.render();
// gif.on("finished", function (blob) {
//   console.log(blob);
//   let url = URL.createObjectURL(blob);
//   // 这里是blob
//   document.getElementById("result-image").src = url;
//   //
// });

var app = new Vue({
  el: "#app",
  data: {
    //全局UI
    isMobile: false,
    showRank: false,
    showAwards: false,
    allAwardsIdx: 0,
    gifStatus: -2,
    //全局数据
    seed: 0,
    customSeed: "",
    chances: 16,
    decks: [],
    boxArray: [],
    isGameOver: -1,
    gifData: 0,
    gifURL: "",
    //统计指标
    metrics: [0, 0, 0],
    metricsMap: ["完成度", "剩余线索", "调查次数"],
    awards: [],
    allAwards: ALLAWARDS,
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
    //游戏初始化
    initGame() {
      this.initDeck();
      this.drawBoard();
      this.initBoard();
      this.augurDecks = augurInit(ROWS, COLS);
      this.drawCanvas();
      this.loadCookies();
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
        let boxDataRow = [];
        for (let j = 0; j < COLS; j++) {
          let box = document.createElement("div");
          let boxData = {};
          box.i = i;
          box.j = j;
          boxData.i = i;
          boxData.j = j;
          boxData.infos = {};
          boxData.signs = {};
          box.className = "letter-box";
          //决定格子的职业
          let roleid = COMMON.withdraw(this.decks);
          boxData.roleid = roleid;
          // if (roleid != 1) {
          //   if (roleid == 0) console.warn(notes[roleid], i, j);
          //   else console.log(notes[roleid], i, j);
          // }

          if (roleid == 9) this.copiesTeam.push(COMMON.setPair(i, j));
          // 点击事件
          {
            box.onclick = this.step;
          }
          // 孩子节点
          {
            var signDiv = `<div id='sign-${i}-${j}' style='display:flex;align-items:center;justify-content:center;'></div>`;
            box.innerHTML += signDiv;
          }
          //信息展示事件
          {
            box.onmouseenter = () => {
              this.refreshInfos(box.i, box.j);
            };
            box.onmouseleave = () => {
              this.clearInfo();
            };
          }
          row.appendChild(box);
          boxRow.push(box);
          boxDataRow.push(boxData);
        }

        board.appendChild(row);
        this.boxArray.push(boxDataRow);
      }
    },
    //主逻辑
    step(e, context, ii, jj) {
      if (this.isGameOver == -1) {
        var that = this.boxArray;
        if (!ii) ii = e.currentTarget.i;
        if (!jj) jj = e.currentTarget.j;
        //减少一次猜测次数
        if (!that[ii][jj].shown && this.chances > 0) {
          //[志愿者]
          volunteerCheck(app, that[ii][jj]);
          this.chances--;
          this.metrics[2]++;

          killerCountDown(app); //[杀手]
          //[干扰者]
          if (!that[ii][jj].signs["jammed"] && jamCheck(app, that[ii][jj])) {
            that[ii][jj].signs["jammed"] = true;
            that[ii][jj].infos["jam-notes"] = true;
            this.isLastDark = false;
          } else {
            //[警长]
            sheriffCheck(app, that[ii][jj]);
            //开始执行效果
            randomPeople[that[ii][jj].roleid](e, app, ii, jj);
            that[ii][jj].shown = true;

            delete that[ii][jj].signs["jammed"];
            delete that[ii][jj].infos["jam-notes"];
          }
          this.refreshInfos(ii, jj);
          this.refreshAllSigns();
          this.drawCanvas();
        }
        if (this.isGameOver == -1 && this.chances == 0) this.isGameOver = 0;
        if (this.isGameOver != -1) {
          this.gameover();
        }
        this.checkContest() && this.saveCookies();
      }
    },
    drawCanvas(isLast) {
      var gameBoard = document.getElementById("main-image");
      var show = document.getElementById("show-image");
      domtoimage
        .toPng(gameBoard)
        .then((dataUrl) => {
          var img = new Image();
          img.src = dataUrl;
          show.innerHTML = "";
          show.appendChild(img);

          const blob = b64toBlob(dataUrl.substr(22), "image/png");
          const blobUrl = URL.createObjectURL(blob);
          gifImages.push(blobUrl);
          if (isLast) {
            gifshot.createGIF(
              {
                gifWidth: 336,
                gifHeight: 369,
                images: gifImages,
                interval: 0.5,
                numFrames: 10,
                frameDuration: 1,
                sampleInterval: 10,
                numWorkers: 2,
              },
              (obj) => {
                if (!obj.error) {
                  var blob = b64toBlob(obj.image.substr(22), "image/gif");
                  this.gifData = blob;
                  blob.lastModifiedDate = new Date();
                  this.gifStatus = -1;
                }
              }
            );
          }
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });
    },
    //gameover
    gameover() {
      this.renderOverBoard();
      this.drawCanvas(true);
      setTimeout(() => {
        this.calculateMetrics();
        this.awards = collectAwards(this.checkContest());
        this.showRank = true;
        this.checkContest() && this.saveCookies();
      }, 1000);
    },
    renderOverBoard() {
      for (var i = 0; i < ROWS; i++) {
        for (var j = 0; j < COLS; j++) {
          if (!this.boxArray[i][j].shown) {
            this.boxArray[i][j].shown = false;
            var box =
              document.getElementById("game-board").children[i].children[j];
            box.classList.add(notes[this.boxArray[i][j].roleid]);
            box.classList.add("over");
          }
        }
      }
    },
    checkContest() {
      var d = new Date();
      var contestSeed = Math.log(Math.floor(d.getTime() / (1000 * 60 * 60)));
      if (this.seed == contestSeed) {
        return true;
      }
      return false;
    },
    saveCookies() {
      if (this.checkContest()) {
        MyCookies.setObj("contest-data", {
          boxArray: this.boxArray,
          chances: this.chances,
          metrics: this.metrics,
          awards: this.awards,
          isGameOver: this.isGameOver,
        });

        return true;
      }
      return false;
    },
    calculateMetrics() {
      ACHIEVE.gameIsWin = this.isGameOver == 1;
      ACHIEVE.metricsUsedChances = this.metrics[2];
      this.metrics[1] = this.chances;
      ACHIEVE.metricsRemainChances = this.chances;
      for (var i = 0; i < ROWS; i++) {
        for (var j = 0; j < COLS; j++) {
          if (this.boxArray[i][j].shown) {
            this.metrics[0]++;
          }
        }
      }
      var percent = Math.floor((this.metrics[0] * 100) / ROWS / COLS);
      ACHIEVE.metricsComplete = percent;
      this.metrics[0] = percent + "%";
    },
    //UI帧更新
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
    refreshInfos(i, j) {
      this.clearInfo();
      for (var key in this.boxArray[i][j].infos) {
        this.addInfo(key);
      }
    },
    refreshAllSigns() {
      for (var boxRow of this.boxArray) {
        for (var box of boxRow) {
          this.refreshSigns(box.i, box.j);
        }
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
    //init
    listenWindowResize() {
      var that = this;
      const getWindowInfo = () => {
        const windowInfo = {
          width: window.innerWidth,
          hight: window.innerHeight,
        };
        if (windowInfo.width < 900) that.isMobile = true;
        else that.isMobile = false;
      };
      getWindowInfo();
      window.addEventListener("resize", getWindowInfo);
    },
    initRandom() {
      // 创建一个URLSearchParams实例
      const urlSearchParams = new URLSearchParams(window.location.search);
      // 把键值对列表转换为一个对象
      const params = Object.fromEntries(urlSearchParams.entries());
      if (!params || !params.seed) {
        this.clickContest();
      }
      return params.seed;
    },
    loadCookies() {
      var load = MyCookies.getObj("contest-data");
      if (this.checkContest() && load.boxArray) {
        this.boxArray = load.boxArray;
        this.chances = load.chances;
        this.metrics = load.metrics;
        this.awards = load.awards;
        this.isGameOver = load.isGameOver;
        this.renderLatestBoard();
        this.refreshAllSigns();
        return true;
      }
      return false;
    },
    renderLatestBoard() {
      for (var i = 0; i < ROWS; i++) {
        for (var j = 0; j < COLS; j++) {
          var box =
            document.getElementById("game-board").children[i].children[j];
          if (
            this.boxArray[i][j].shown === true ||
            this.boxArray[i][j].shown === false
          ) {
            box.classList.add(notes[this.boxArray[i][j].roleid]);
          }
          if (this.boxArray[i][j].shown === false) box.classList.add("over");
        }
      }
    },
    //html直接引用的事件
    createRandomSeed() {
      var res = "";
      var chs = "qwertyuiopasdfghjklzxcvbnm1234567890";
      for (var i = 0; i < 16; i++) {
        res += chs[Math.floor(Math.random() * chs.length)];
      }
      return res;
    },
    clickPractice() {
      window.location.href = "/?seed=" + this.createRandomSeed();
    },
    clickContest() {
      var d = new Date();
      var idx = Math.log(Math.floor(d.getTime() / (1000 * 60 * 60)));
      window.location.href = "/?seed=" + idx;
    },
    submitSeed(e) {
      window.location.href = "/?seed=" + this.customSeed;
    },
    clickOverlay(e) {
      if (e.target.className == "modal-overlay") {
        this.showRank = false;
        this.showAwards = false;
      }
    },
    clickMetrics(e) {
      this.showRank = true;
    },
    clickShare(e) {
      this.gifStatus = 0;
      //上传gifData
      var formData = new FormData();
      formData.append("image", this.gifData);
      axios
        .post("/api", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.gifURL = response.data;
          this.gifStatus = 1;
        });
    },
    clickAwards(e) {
      this.showAwards = true;
    },
    whenAwardsCarouselChange(e) {
      this.allAwardsIdx = e;
    },
    setAwardClass(i, j) {
      var res = ["modal-tag", "over"];
      var award = MyCookies.getObj("awards");
      if (award[COMMON.setPair(i, j)]) {
        res.pop();
      }
      return res;
    },
  },
  mounted: function () {
    this.listenWindowResize();
    this.seed = this.initRandom();
    Math.seedrandom(this.seed); //look http://davidbau.com/archives/2010/01/30/random_seeds_coded_hints_and_quintillions.html

    this.initGame();
    var all = document.getElementById("app");
    all.style.cssText = "";
  },
});
window.vue = app;
