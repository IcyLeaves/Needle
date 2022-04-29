import * as COMMON from "../_common/common.js";
function volunteerOnClick(e, context, i, j) {
  e.srcElement.classList.add("volunteer");
  context.boxArray[i][j].infos["volunteer"] = true;
}
async function volunteerCheck(context, curr) {
  if (context.chances != 1) return;
  var nears = await COMMON.nearFour(context.boxArray, curr.i, curr.j);
  for (var near of nears) {
    if (!near) continue;
    if (near.roleid == 8 && near.shown == true) await context.animateChances(2);
  }
}
export { volunteerOnClick, volunteerCheck };
