import * as COMMON from "../_common/common.js";
function volunteerOnClick(e, context, i, j) {
  e.srcElement.classList.add("volunteer");
  context.boxArray[i][j].infos["volunteer"] = true;

  context.isLastDark = false; //[疯子]
}
function volunteerCheck(context, curr) {
  if (context.chances != 1) return;
  for (var near of COMMON.nearFour(context.boxArray, curr.i, curr.j)) {
    if (!near) continue;
    if (near.roleid == 8 && near.shown == true) context.chances += 2;
  }
}
export { volunteerOnClick, volunteerCheck };
