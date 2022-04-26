import * as COMMON from "./_common/common.js";
import { collectAwards, ACHIEVE, ALLAWARDS, RANK } from "./_common/award.js";
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
import { reporterOnClick } from "./reporter/reporter.js";
import {
  fortuneOnClick,
  fortuneTargetBonus,
  fortuneOver,
  fortuneCheck,
} from "./fortune/fortune.js";
const ROWS = 8;
const COLS = 8;
// 必须确保num相加=ROWS*COLS
const NUMCONFIG = [1, 18, 15, 5, 3, 5, 3, 3, 3, 2, 3, 3]; //UPDATE HERE
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
  reporterOnClick,
  fortuneOnClick,
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
  "reporter",
  "fortune",
]; //UPDATE HERE
let colors = [
  "#66bb6a",
  "#898989",
  "#512da8",
  "#81d4fa",
  "#ef9a9a",
  "#5d4037",
  "#ffe082",
  "#303F9F",
  "#FBC02D",
  "#80CBC4",
  "#0288D1",
  "#E64A19",
]; //UPDATE HERE
let names = [
  "目标",
  "市民",
  "侦探",
  "干扰者",
  "疯子",
  "警长",
  "杀手",
  "占卜师",
  "志愿者",
  "替身",
  "记者",
  "赏金猎人",
]; //UPDATE HERE
let keywords = {
  1: {
    name: "现身",
    content: "角色显示出自己的身份",
  },
  2: {
    name: "调查",
    content: "耗费一个🔍。使角色【现身】",
  },
  3: {
    name: "光明势力",
    content: "技能说明背景为白色的角色",
  },
  4: {
    name: "黑暗势力",
    content: "技能说明背景为黑色的角色",
  },
  5: {
    name: "周围",
    content: "特指角色周围8格的区域",
  },
  6: {
    name: "相邻",
    content: "特指角色相邻4格的区域",
  },
};
var RECORDS = ((nums, infos, colors, names) => {
  var res = [];
  for (var idx in nums) {
    res.push({
      color: colors[idx],
      allNum: nums[idx],
      infoName: infos[idx],
      showedNum: 0,
      name: names[idx],
    });
  }
  return res;
})(NUMCONFIG, notes, colors, names);
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
    showHelp: false,
    allAwardsIdx: 0,
    gifStatus: -2,
    keywordsShow: {},
    //全局数据
    seed: 0,
    customSeed: "",
    chances: 16,
    decks: [],
    boxArray: [],
    isGameOver: -1,
    gifData: 0,
    gifURL: "",
    records: RECORDS,
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
    SUNS: [0, 1, 2, 5, 7, 8, 10, 11], //UPDATE HERE
    MOONS: [3, 4, 6, 9], //UPDATE HERE
    //[替身]
    copiesArrow: ["↖️", "⬆️", "↗️", "⬅️", "", "➡️", "↙️", "⬇️", "↘️"],
    copiesTeam: [],
    copiesCurr: undefined,
    //[赏金猎人]
    fortuneBonusNow: false,
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
          box.setAttribute("id", `box-${i}-${j}`);
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
            var signDiv = `<div id='sign-${i}-${j}' class='sign-box'></div>`;
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
          if (this.chances == 1) ACHIEVE.cntChancesIsOne++;
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
            //[赏金猎人]
            fortuneTargetBonus(app, that[ii][jj]);
            //开始执行效果
            if (!randomPeople[that[ii][jj].roleid](e, app, ii, jj)) {
              that[ii][jj].shown = true;
              //[警长]
              sheriffCheck(app, that[ii][jj]);
              //[赏金猎人]
              fortuneCheck(app, that[ii][jj]);
              this.records[that[ii][jj].roleid].showedNum++;
            }

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
        ACHIEVE.boardGameOver = this.boxArray;
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
            this.boxArray[i][j].infos[
              this.records[this.boxArray[i][j].roleid].infoName
            ] = true;
            fortuneOver(app, i, j);
          }
        }
      }
      this.refreshAllSigns();
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
          gifURL: this.gifURL,
          gifStatus: this.gifStatus,
          seed: this.seed,
          records: this.records,
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
      this.metrics[0] = 0;
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

      this.keywordsShow = {};
    },
    addInfo(key) {
      var roleDiv = document.getElementById(key).cloneNode(true);
      roleDiv.setAttribute("id", `${key}-clone`);

      var infos = document.getElementById("infos");
      infos.appendChild(roleDiv);
      for (var key of roleDiv.dataset.keyword.split(",")) {
        this.keywordsShow[key] = true;
      }
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
      if (this.checkContest()) {
        if (load.seed != this.seed) return false;
        if (load.boxArray) {
          this.boxArray = load.boxArray;
          this.chances = load.chances;
          this.metrics = load.metrics;
          this.awards = load.awards;
          this.isGameOver = load.isGameOver;
          this.gifURL = load.gifURL;
          this.gifStatus = load.gifStatus;
          this.records = load.records;
          this.renderLatestBoard();
          this.refreshAllSigns();
          // var award = MyCookies.getObj("awards");
          // award["2-3"] = true;
          // MyCookies.setObj("awards", award);
          //调试成就
          // this.calculateMetrics();
          // collectAwards(true);
          return true;
        }
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
        this.showHelp = false;
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
          // 创建元素用于复制
          const aux = document.createElement("input");
          // 获取复制内容
          const content = response.data;
          // 设置元素内容
          aux.setAttribute("value", content);
          // 将元素插入页面进行调用
          document.body.appendChild(aux);
          // 复制内容
          aux.select();
          // 将内容复制到剪贴板
          document.execCommand("copy");
          // 删除创建元素
          document.body.removeChild(aux);
          app.$message({
            message: "动图链接已复制",
            type: "success",
          });
          this.gifStatus = 1;
        });
    },
    clickAwards(e) {
      this.showAwards = true;
    },
    clickHelp(e) {
      this.showHelp = true;
    },
    whenAwardsCarouselChange(e) {
      this.allAwardsIdx = e;
    },
    setAwardClass(item) {
      var res = ["modal-tag", "over"];
      var award = MyCookies.getObj("awards");
      if (award[item.id]) {
        res.pop();
      }
      if (item.color === RANK.LEGEND) {
        res.push("legend");
      }
      return res;
    },
    calRecordPercent(record) {
      return Math.floor((record.showedNum / record.allNum) * 100);
    },
    formatRecordStatus(item) {
      return (a) => {
        return `${item.showedNum} / ${item.allNum}`;
      };
    },
    mouseenterRecord(e) {
      this.addInfo(e.infoName);
    },
    mouseleaveRecord(e) {
      this.clearInfo();
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
