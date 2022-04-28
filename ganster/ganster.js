import * as COMMON from "../_common/common.js";
function gansterOnClick(e, context, i, j) {
  e.srcElement.classList.add("ganster");
  context.boxArray[i][j].infos["ganster"] = true;

  context.gansters.push(COMMON.setPair(i, j));
  context.boxArray[i][j].signs["ganster-brother-sign"] = true;
  context.boxArray[i][j].infos["ganster-brother-info"] = true;
  for (var near of COMMON.nearEight(context.boxArray, i, j)) {
    if (!near) continue;
    near.infos["ganster-area-info"] = true;
    near.signs["ganster-area-sign"] = true;
  }
}
function gansterStep(context) {
  var resPair = [];
  for (var ganPair of context.gansters) {
    //获得小弟位置，清除小弟信息
    var [fx, fy] = COMMON.getPair(ganPair);
    var gan = context.boxArray[fx][fy];
    delete gan.signs["ganster-brother-sign"];
    delete gan.infos["ganster-brother-info"];
    for (var near of COMMON.nearEight(context.boxArray, fx, fy)) {
      if (!near) continue;
      //清除路障信息
      delete near.signs["ganster-area-sign"];
      delete near.infos["ganster-area-info"];
    }
    var allIdx = 0;
    for (var near of COMMON.nearFour(context.boxArray, fx, fy)) {
      if (near) allIdx++;
    }
    var idx = Math.floor(Math.random() * allIdx); //[0,len]
    var validIdx = 0;
    var hasNext = false;
    for (var near of COMMON.nearFour(context.boxArray, fx, fy)) {
      if (!near) continue;

      if (idx == validIdx && !hasNext) {
        //被选中了
        //移动前提：有这么个格子 && 上面没有另一个黑帮
        var nextLocation = COMMON.setPair(near.i, near.j);
        if (resPair.indexOf(nextLocation) == -1) {
          //如果下一步这一格不会有其他黑帮
          resPair.push(nextLocation);
          hasNext = true;
        }
      }
      validIdx++;
    }
    if (!hasNext) {
      //原地待命
      resPair.push(ganPair);
    }
  }
  for (var resIdx in resPair) {
    var res = resPair[resIdx];
    context.gansters[resIdx] = res;
    var [fx, fy] = COMMON.getPair(res);
    context.boxArray[fx][fy].signs["ganster-brother-sign"] = true;
    context.boxArray[fx][fy].infos["ganster-brother-info"] = true;
    for (var near of COMMON.nearEight(context.boxArray, fx, fy)) {
      if (!near) continue;
      near.signs["ganster-area-sign"] = true;
      near.infos["ganster-area-info"] = true;
    }
  }
}
function gansterCheck(context, curr) {
  return curr.signs["ganster-brother-sign"] || curr.signs["ganster-area-sign"];
}
export { gansterOnClick, gansterStep, gansterCheck };
