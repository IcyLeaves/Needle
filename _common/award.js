import * as MyCookies from "./cookie.js";
import * as COMMON from "./common.js";
var RANK = {
  FREE: "#999999",
  COMMON: "#7DAF0A",
  UNCOMMON: "#1E90FF",
  RARE: "#7D00FF",
  EPIC: "#DB3913",
  LEGEND: "#00000000",
  SPECIAL: "#DD52CF",
};
var ACHIEVE = {
  gameIsWin: undefined,
  metricsComplete: "0%", //完成度
  metricsRemainChances: 0, //剩余机会
  metricsUsedChances: 0, //调查次数
  cntChancesIsOne: 0, //线索为1的次数
  boardGameOver: undefined, //游戏结束时的地图
};

var AWARDS = [
  {
    seriesName: "剩余线索",
    seriesAwards: [
      {
        id: "0-0",
        title: "火烧眉毛",
        color: RANK.RARE,
        note: "剩余线索为0的情况下获胜",
      },
      {
        id: "0-1",
        title: "虚惊一场",
        color: RANK.UNCOMMON,
        note: "剩余线索至多5个的情况下获胜",
      },
      {
        id: "0-2",
        title: "意料之中",
        color: RANK.FREE,
        note: "剩余线索至多10个的情况下获胜",
      },
      {
        id: "0-3",
        title: "顺藤摸瓜",
        color: RANK.COMMON,
        note: "剩余线索至多20个的情况下获胜",
      },
      {
        id: "0-4",
        title: "心思缜密",
        color: RANK.UNCOMMON,
        note: "剩余线索至少40个的情况下获胜",
      },
      {
        id: "0-5",
        title: "明察秋毫",
        color: RANK.RARE,
        note: "剩余线索至少100个的情况下获胜",
      },
      {
        id: "0-6",
        title: "滑铁卢",
        color: RANK.UNCOMMON,
        note: "剩余线索至少20个的情况下失败",
      },
      {
        id: "0-7",
        title: "今天就到这里吧",
        color: RANK.RARE,
        note: "剩余线索至少100个的情况下失败",
      },
    ],
    checkFunc: () => {
      var win = ACHIEVE.gameIsWin;
      var chances = ACHIEVE.metricsRemainChances;
      switch (win) {
        case true:
          if (chances == 0) return "0-0";
          else if (chances <= 5) return "0-1";
          else if (chances <= 10) return "0-2";
          else if (chances <= 20) return "0-3";
          else if (chances >= 40 && chances < 100) return "0-4";
          else if (chances >= 100) return "0-5";
        case false:
          if (chances >= 100) return "0-7";
          else if (chances >= 20) return "0-6";
      }
    },
  },
  {
    seriesName: "完成度",
    seriesAwards: [
      {
        id: "1-0",
        title: "惊鸿一瞥",
        color: RANK.EPIC,
        note: "完成度不到10%的情况下获胜",
      },
      {
        id: "1-1",
        title: "永不加班",
        color: RANK.RARE,
        note: "完成度不到20%的情况下获胜",
      },
      {
        id: "1-2",
        title: "心有灵犀",
        color: RANK.UNCOMMON,
        note: "完成度不到30%的情况下获胜",
      },
      {
        id: "1-3",
        title: "小幸运",
        color: RANK.COMMON,
        note: "完成度不到40%的情况下获胜",
      },
      {
        id: "1-4",
        title: "不费力气",
        color: RANK.FREE,
        note: "完成度不到50%的情况下获胜",
      },
      {
        id: "1-5",
        title: "你在干什么",
        color: RANK.EPIC,
        note: "完成度不到10%的情况下失败",
      },
      {
        id: "1-6",
        title: "不知所措",
        color: RANK.RARE,
        note: "完成度不到20%的情况下失败",
      },
      {
        id: "1-7",
        title: "盲人摸象",
        color: RANK.RARE,
        note: "完成度至少80%的情况下失败",
      },
      {
        id: "1-8",
        title: "无功而返",
        color: RANK.RARE,
        note: "完成度至少90%的情况下失败",
      },
      {
        id: "1-9",
        title: "万人迷",
        color: RANK.EPIC,
        note: "完成度为100%的情况下成功",
      },
      {
        id: "1-10",
        title: "功亏一篑",
        color: RANK.LEGEND,
        note: "完成度为100%的情况下失败",
      },
      {
        id: "1-11",
        title: "苦尽甘来",
        color: RANK.UNCOMMON,
        note: "完成度至少80%的情况下成功",
      },
      {
        id: "1-12",
        title: "蓦然回首",
        color: RANK.RARE,
        note: "完成度至少90%的情况下成功",
      },
    ],
    checkFunc: () => {
      var win = ACHIEVE.gameIsWin;
      var complete = ACHIEVE.metricsComplete;
      switch (win) {
        case true:
          if (complete <= 10) return "1-0";
          else if (complete <= 20) return "1-1";
          else if (complete <= 30) return "1-2";
          else if (complete <= 40) return "1-3";
          else if (complete <= 50) return "1-4";
          else if (complete >= 80 && complete < 90) return "1-11";
          else if (complete >= 90 && complete < 100) return "1-12";
          else if (complete === 100) return "1-9";
        case false:
          if (complete <= 10) return "1-5";
          else if (complete <= 20) return "1-6";
          else if (complete >= 80 && complete < 90) return "1-7";
          else if (complete >= 90 && complete < 100) return "1-8";
          else if (complete === 100) return "1-10";
      }
    },
  },
  {
    seriesName: "技巧",
    seriesAwards: [
      {
        id: "2-0",
        title: "坚持不懈",
        color: RANK.COMMON,
        note: "至少出现3次剩余线索为1的情况，最后获胜",
      },
      {
        id: "2-1",
        title: "穷追不舍",
        color: RANK.UNCOMMON,
        note: "至少出现7次剩余线索为1的情况，最后获胜",
      },
      {
        id: "2-2",
        title: "苟延残喘",
        color: RANK.RARE,
        note: "至少出现10次剩余线索为1的情况，最后获胜",
      },
    ],
    checkFunc: () => {
      var times = ACHIEVE.cntChancesIsOne;
      if (times >= 10) return "2-2";
      else if (times >= 7) return "2-1";
      else if (times >= 3) return "2-0";
    },
  },
  {
    seriesName: "意外",
    seriesAwards: [
      {
        id: "3-0",
        title: "擦肩而过",
        color: RANK.FREE,
        note: "失败且完成度<90%时，与目标相邻的角色至少有1个已经现身",
      },
      {
        id: "3-1",
        title: "近在眼前",
        color: RANK.COMMON,
        note: "失败且完成度<90%时，与目标相邻的角色至少有2个已经现身",
      },
      {
        id: "3-2",
        title: "素不相识",
        color: RANK.UNCOMMON,
        note: "失败且完成度<90%时，与目标相邻的角色至少有3个已经现身",
      },
      {
        id: "3-3",
        title: "熟视无睹",
        color: RANK.RARE,
        note: "失败且完成度<90%时，与目标相邻的角色有4个且已经全部现身",
      },
      {
        id: "3-4",
        title: "最后的拼图",
        color: RANK.EPIC,
        note: "失败且完成度<90%时，在目标周围的角色有8个且已经全部现身",
      },
    ],
    checkFunc: () => {
      if (ACHIEVE.gameIsWin == false) {
        var res = 0;
        for (var i = 0; i < ACHIEVE.boardGameOver.length; i++) {
          for (var j = 0; j < ACHIEVE.boardGameOver[0].length; j++) {
            if (ACHIEVE.boardGameOver[i][j].roleid == 0) {
              for (var near of COMMON.nearEight(ACHIEVE.boardGameOver, i, j)) {
                if (near && near.shown) res++;
              }
              if (res == 8) return "3-4";
              else {
                res = 0;
                for (var near of COMMON.nearFour(ACHIEVE.boardGameOver, i, j)) {
                  if (near && near.shown) res++;
                }
                if (res > 0) return `3-${res - 1}`;
              }
            }
          }
        }
      }
    },
  },
];
var ALLAWARDS = AWARDS.map((series) => {
  var res = {};
  res.awards = series.seriesAwards.map((award) => {
    return award;
  });
  res["name"] = series.seriesName;
  return res;
});
var collects = [];
var myIdxOf = (arr, id) => {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id == id) return i;
  }
  return -1;
};
function collectAwards(isSaveCookies) {
  for (var award of AWARDS) {
    if (award.checkFunc) {
      var res = award.checkFunc();
      res = myIdxOf(award.seriesAwards, res);
      if (res >= 0) {
        var getAward = award.seriesAwards[res];
        collects.push(getAward);
        if (isSaveCookies) {
          var cookieAwards = MyCookies.getObj("awards");
          cookieAwards[getAward.id] = true;
          MyCookies.setObj("awards", cookieAwards);
        }
      }
    }
  }
  return collects;
}
export { collectAwards, ACHIEVE, ALLAWARDS, RANK };
