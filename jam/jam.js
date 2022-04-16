import * as COMMON from "../_common/common.js";
function jamOnClick(e, context, i, j) {
  e.srcElement.classList.add("jam");
  context.boxArray[i][j].infos["jam"] = true;

  // let i = e.srcElement.getAttribute("data-i");
  // let j = e.srcElement.getAttribute("data-j");

  context.isLastDark = true; //[疯子]
}
function jamCheck(context, curr) {
  for (var near of COMMON.nearFour(context.boxArray, curr.i, curr.j)) {
    if (near && near.roleid == 3 && !near.shown) return true;
  }
  return false;
}
export { jamOnClick, jamCheck };
