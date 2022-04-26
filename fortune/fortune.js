import * as COMMON from "../_common/common.js";

function fortuneOnClick(e, context, i, j) {
  e.srcElement.classList.add("fortune");
  context.boxArray[i][j].infos["fortune"] = true;

  var deck = [];
  for (var m = 0; m < context.boxArray.length; m++) {
    for (var n = 0; n < context.boxArray[0].length; n++) {
      if (m == i && n == j) continue;
      !context.boxArray[m][n].shown &&
        !context.boxArray[m][n].fortuneTarget &&
        deck.push(COMMON.setPair(m, n));
    }
  }
  var pair = COMMON.withdraw(deck);
  var [fx, fy] = COMMON.getPair(pair);
  context.boxArray[fx][fy].fortuneTarget = true;

  context.isLastDark = false; //[疯子]
}
function fortuneTargetBonus(context, curr) {
  if (context.fortuneLastBonus == true) {
    context.fortuneLastBonus = false;
    for (var near of COMMON.nearFour(context.boxArray, curr.i, curr.j)) {
      if (!near || near.shown) continue;
      var e = document.getElementById(`box-${near.i}-${near.j}`);
      e.classList.add(context.records[near.roleid].infoName);
      e.classList.add("over");
      near.infos[context.records[near.roleid].infoName] = true;
    }
  }
}
function fortuneCheck(context, curr) {
  $(`#box-${curr.i}-${curr.j}`).removeClass("over");
  if (curr.fortuneTarget == true) {
    context.chances++;
    context.fortuneLastBonus = true;
    curr.infos["fortune-notes"] = true;
    curr.signs["fortune-signs"] = true;
  }
}
function fortuneOver(context, i, j) {
  if (context.boxArray[i][j].fortuneTarget == true) {
    context.boxArray[i][j].signs["fortune-signs"] = true;
    context.boxArray[i][j].infos["fortune-notes"] = true;
  }
}
export { fortuneOnClick, fortuneTargetBonus, fortuneOver, fortuneCheck };
