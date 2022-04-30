import * as COMMON from "../_common/common.js";
function jamOnClick(e, context, i, j) {
  // let i = e.srcElement.getAttribute("data-i");
  // let j = e.srcElement.getAttribute("data-j");
}
function jamCheck(context, curr) {
  if (curr.signs["jammed"]) return false;
  for (var near of COMMON.nearFour(context.boxArray, curr.i, curr.j)) {
    if (near && near.roleid == 3 && !near.shown) {
      curr.signs["jammed"] = true;
      curr.infos["jam-notes"] = true;
      return true;
    }
  }
  return false;
}
export { jamOnClick, jamCheck };
