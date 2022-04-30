import * as COMMON from "../_common/common.js";
function reporterOnClick(e, context, i, j) {
  var init = 0;
  for (var near of COMMON.nearEight(context.boxArray, i, j)) {
    if (near && context.SUNS.indexOf(near.roleid) > -1) init++;
  }
  context.boxArray[i][j].infos[`reporter-notes-${init}`] = true;
  context.boxArray[i][j].signs[`reporter-signs-${init}`] = true;
}
export { reporterOnClick };
