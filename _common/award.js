import * as MyCookies from "./cookie.js";
var RANK = {
  FREE: "#999999",
  COMMON: "#598933",
  UNCOMMON: "#29B1FD",
  RARE: "#646CFD",
  EPIC: "#6B4C8D",
  LEGEND: "#FE7225",
  SPECIAL: "#DD52CF",
};
var ACHIEVE = {
  gameIsWin: undefined,
  metricsComplete: "0%", //完成度
  metricsRemainChances: 0, //剩余机会
  metricsUsedChances: 0, //调查次数
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
        note: "剩余线索不到5个的情况下获胜",
      },
      {
        id: "0-2",
        title: "意料之中",
        color: RANK.FREE,
        note: "剩余线索不到10个的情况下获胜",
      },
      {
        id: "0-3",
        title: "不慌不忙",
        color: RANK.COMMON,
        note: "剩余线索不到20个的情况下获胜",
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
        title: "功亏一篑",
        color: RANK.RARE,
        note: "剩余线索至少100个的情况下失败",
      },
    ],
    checkFunc: () => {
      var win = ACHIEVE.gameIsWin;
      var chances = ACHIEVE.metricsRemainChances;
      switch (win) {
        case true:
          if (chances == 0) return 0;
          else if (chances <= 5) return 1;
          else if (chances <= 10) return 2;
          else if (chances <= 20) return 3;
          else if (chances >= 40 && chances < 100) return 4;
          else if (chances >= 100) return 5;
        case false:
          if (chances >= 100) return 7;
          else if (chances >= 20) return 6;
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
console.log(ALLAWARDS);
var collects = [];
function collectAwards() {
  for (var idx in AWARDS) {
    if (AWARDS[idx].checkFunc) {
      var res = AWARDS[idx].checkFunc();
      if (res >= 0) {
        var getAward = AWARDS[idx].seriesAwards[res];
        collects.push(getAward);
        var cookieAwards = MyCookies.getObj("awards");
        cookieAwards[getAward.id] = true;
        MyCookies.setObj("awards", cookieAwards);
      }
    }
  }
  return collects;
}
export { collectAwards, ACHIEVE, ALLAWARDS };
