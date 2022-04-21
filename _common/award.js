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
        title: "火烧眉毛",
        color: RANK.RARE,
        note: "剩余线索为0的情况下获胜",
      },
      {
        title: "虚惊一场",
        color: RANK.UNCOMMON,
        note: "剩余线索不到5个的情况下获胜",
      },
      {
        title: "意料之中",
        color: RANK.FREE,
        note: "剩余线索不到10个的情况下获胜",
      },
      {
        title: "不慌不忙",
        color: RANK.COMMON,
        note: "剩余线索不到20个的情况下获胜",
      },
      {
        title: "心思缜密",
        color: RANK.UNCOMMON,
        note: "剩余线索至少40个的情况下获胜",
      },
      {
        title: "明察秋毫",
        color: RANK.RARE,
        note: "剩余线索至少100个的情况下获胜",
      },
      {
        title: "滑铁卢",
        color: RANK.UNCOMMON,
        note: "剩余线索至少20个的情况下失败",
      },
      {
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
  // {
  //   id: 1,

  //   checkFunc: () => {
  //     return (
  //       ACHIEVE.gameIsWin &&
  //       ACHIEVE.metricsRemainChances >= 1 &&
  //       ACHIEVE.metricsRemainChances <= 5
  //     );
  //   },
  // },
  // {
  //   id: 2,
  //   title: "心有灵犀",
  //   color: RANK.UNCOMMON,
  //   note: "完成度不足25%的情况下获胜",
  //   checkFunc: () => {
  //     return ACHIEVE.gameIsWin && ACHIEVE.metricsComplete < 25;
  //   },
  // },
  // {
  //   id: 3,
  //   title: "大费周章",
  //   color: RANK.RARE,
  //   note: "完成度为100%的情况下获胜",
  //   checkFunc: () => {
  //     return ACHIEVE.gameIsWin && ACHIEVE.metricsComplete == 100;
  //   },
  // },

  // {
  //   id: 4,
  //   title: "无头苍蝇",
  //   color: RANK.FREE,
  //   note: "调查次数不足20次的情况下用完线索失败",
  //   checkFunc: () => {
  //     return (
  //       !ACHIEVE.gameIsWin &&
  //       ACHIEVE.metricsUsedChances < 20 &&
  //       ACHIEVE.metricsUsedChances >= 10
  //     );
  //   },
  // },
  // {
  //   id: 5,
  //   title: "毫无头绪",
  //   color: RANK.UNCOMMON,
  //   note: "调查次数不足10次的情况下用完线索失败",
  //   checkFunc: () => {
  //     return (
  //       !ACHIEVE.gameIsWin &&
  //       ACHIEVE.metricsUsedChances < 10 &&
  //       ACHIEVE.metricsUsedChances >= 5
  //     );
  //   },
  // },
  // {
  //   id: 6,
  //   title: "霉运当头",
  //   color: RANK.RARE,
  //   note: "调查次数不足5次的情况下用完线索失败",
  //   checkFunc: () => {
  //     return (
  //       !ACHIEVE.gameIsWin &&
  //       ACHIEVE.metricsUsedChances < 10 &&
  //       ACHIEVE.metricsUsedChances >= 5
  //     );
  //   },
  // },
  // {
  //   id: 7,
  //   title: "永不加班",
  //   color: RANK.EPIC,
  //   note: "完成度不足10%的情况下获胜",
  //   checkFunc: () => {
  //     return ACHIEVE.gameIsWin && ACHIEVE.metricsComplete < 10;
  //   },
  // },
];
var collects = [];
function collectAwards() {
  for (var idx in AWARDS) {
    if (AWARDS[idx].checkFunc) {
      var res = AWARDS[idx].checkFunc();
      collects.push(AWARDS[idx].seriesAwards[res]);
    }
  }
  return collects;
}
export { collectAwards, ACHIEVE };
