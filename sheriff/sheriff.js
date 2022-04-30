import * as COMMON from "../_common/common.js";
async function sheriffOnClick(e, context, i, j) {
  e.srcElement.classList.add("sheriff");
  context.boxArray[i][j].infos["sheriff"] = true;

  var init = 8;
  var nears = await COMMON.nearEight(context.boxArray, i, j);
  for (var near of nears) {
    if (!near || near.shown) init--;
  }
  context.boxArray[i][j].sheriffRemain = init;
  if (init == 0) await context.animateChances(context.chances + 2);
}
async function sheriffCheck(context, curr) {
  var nears = await COMMON.nearEight(context.boxArray, curr.i, curr.j);
  for (var near of nears) {
    if (!near) continue;
    if (near.roleid > 0 || (near.roleid == 0 && context.copiesTeam.length > 0))
      near.sheriffRemain--;
    if (near.sheriffRemain == 0 && near.shown == true)
      await context.animateChances(context.chances + 2);
  }
}
export { sheriffOnClick, sheriffCheck };
