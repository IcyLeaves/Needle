var RANK = {
  FREE: "#999999",
  COMMON: "#598933",
  UNCOMMON: "#29B1FD",
  RARE: "#646CFD",
  EPIC: "#6B4C8D",
  LEGEND: "#FE7225",
  SPECIAL: "#DD52CF",
};
var AWARDS = [
  {
    id: 0,
    title: "普通",
    color: RANK.FREE,
    note: "这里展示成就达成的条件",
  },
  {
    id: 1,
    title: "常见",
    color: RANK.COMMON,
    note: "这里展示成就达成的条件",
  },
  {
    id: 2,
    title: "稀有",
    color: RANK.UNCOMMON,
    note: "这里展示成就达成的条件",
  },
  {
    id: 3,
    title: "罕见",
    color: RANK.RARE,
    note: "这里展示成就达成的条件",
  },
  {
    id: 4,
    title: "史诗",
    color: RANK.EPIC,
    note: "这里展示成就达成的条件",
  },
  {
    id: 5,
    title: "传说",
    color: RANK.LEGEND,
    note: "这里展示成就达成的条件",
  },
  {
    id: 6,
    title: "特殊成就",
    color: RANK.SPECIAL,
    note: "这里展示成就达成的条件",
  },
];
var collects = [];
function collectAwards() {
  collects.push(AWARDS[0]);
  collects.push(AWARDS[1]);
  collects.push(AWARDS[2]);
  collects.push(AWARDS[3]);
  collects.push(AWARDS[4]);
  collects.push(AWARDS[5]);
  collects.push(AWARDS[6]);
  return collects;
}
export { collectAwards };
