import * as COMMON from "../_common/common.js";
function sheriffOnClick(e, context, i, j) {
  e.srcElement.classList.add("sheriff");
  context.boxArray[i][j].infos["sheriff"] = true;

  var init = 8;
  for (var near of COMMON.nearEight(context.boxArray, i, j)) {
    if (!near || near.shown) init--;
  }
  context.boxArray[i][j].sheriffRemain = init;
  if (init == 0) context.chances *= 2;

  context.isLastDark = false; //[疯子]
}
function sheriffCheck(context, curr) {
  for (var near of COMMON.nearEight(context.boxArray, curr.i, curr.j)) {
    if (!near) continue;
    near.sheriffRemain--;
    if (near.sheriffRemain == 0 && near.shown == true) context.chances *= 2;
  }
}
export { sheriffOnClick, sheriffCheck };
